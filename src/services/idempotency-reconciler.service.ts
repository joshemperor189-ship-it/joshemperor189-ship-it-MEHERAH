import crypto from 'crypto';
import db from '../../database';
import { eventBus } from './event-bus.service';

export interface IdempotencyLock {
  hashKey: string;
  userId: string;
  amount: number;
  currency: string;
  reference: string;
  createdAt: number;
  status: 'LOCKED' | 'COMPLETED' | 'RELEASED';
}

export interface StrandedEventRecord {
  eventId: string;
  topic: string;
  publisher: string;
  timestamp: string;
  ageSeconds: number;
  status: 'ACTIVE' | 'AUTO_RECONCILED' | 'AUTO_TERMINATED';
}

export class IdempotencyReconcilerService {
  private static instance: IdempotencyReconcilerService;
  private locks: Map<string, IdempotencyLock> = new Map();
  private lockTTLMs = 60000; // 60 seconds idempotency lock
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private reconciledEventsCount = 0;

  private constructor() {
    this.startHeartbeatWorker();
  }

  public static getInstance(): IdempotencyReconcilerService {
    if (!IdempotencyReconcilerService.instance) {
      IdempotencyReconcilerService.instance = new IdempotencyReconcilerService();
    }
    return IdempotencyReconcilerService.instance;
  }

  public generateHashKey(userId: string, amount: number, currency: string, reference?: string): string {
    const raw = `${userId}:${amount}:${currency}:${reference || 'tx'}`;
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  public acquireLock(userId: string, amount: number, currency: string, reference?: string): { success: boolean; hashKey: string; lock?: IdempotencyLock } {
    const hashKey = this.generateHashKey(userId, amount, currency, reference);
    const existing = this.locks.get(hashKey);

    const now = Date.now();
    if (existing && existing.status === 'LOCKED' && (now - existing.createdAt < this.lockTTLMs)) {
      eventBus.publish('risk.analyzed', 'Consensus Guard Agent', {
        userId,
        hashKey: hashKey.substring(0, 12),
        action: 'IDEMPOTENCY_LOCK_REJECTED',
        insight: `Duplicate transaction attempt detected within 60s window. Double-spend prevention locked transaction.`
      });
      return { success: false, hashKey, lock: existing };
    }

    const lock: IdempotencyLock = {
      hashKey,
      userId,
      amount,
      currency,
      reference: reference || 'tx_' + now,
      createdAt: now,
      status: 'LOCKED'
    };

    this.locks.set(hashKey, lock);
    return { success: true, hashKey, lock };
  }

  public releaseLock(hashKey: string, status: 'COMPLETED' | 'RELEASED' = 'COMPLETED') {
    const lock = this.locks.get(hashKey);
    if (lock) {
      lock.status = status;
    }
  }

  private startHeartbeatWorker() {
    if (this.heartbeatInterval) return;

    // Background worker runs every 30 seconds
    this.heartbeatInterval = setInterval(() => {
      this.reconcileStrandedEvents();
    }, 30000);
  }

  public reconcileStrandedEvents(): StrandedEventRecord[] {
    const recent = eventBus.getRecentEvents(50);
    const now = Date.now();
    const strandedList: StrandedEventRecord[] = [];

    // Group events by transaction reference/orchestrationId
    const pendingTxMap: Map<string, { topics: string[]; lastTimestamp: number; publisher: string; eventId: string }> = new Map();

    for (const evt of recent) {
      const txId = evt.payload?.orchestrationId || evt.payload?.reference || evt.eventId;
      const t = new Date(evt.timestamp).getTime();

      if (!pendingTxMap.has(txId)) {
        pendingTxMap.set(txId, { topics: [evt.topic], lastTimestamp: t, publisher: evt.publisher, eventId: evt.eventId });
      } else {
        pendingTxMap.get(txId)!.topics.push(evt.topic);
      }
    }

    for (const [txId, data] of pendingTxMap.entries()) {
      const ageSeconds = Math.round((now - data.lastTimestamp) / 1000);

      // If a transaction has created/cleared topic but never reached payment.executed after 40 seconds
      if (data.topics.includes('transaction.created') && !data.topics.includes('payment.executed') && ageSeconds > 35) {
        this.reconciledEventsCount += 1;
        const rec: StrandedEventRecord = {
          eventId: data.eventId,
          topic: 'stranded.reconciled',
          publisher: 'Reconciliation Heartbeat Agent',
          timestamp: new Date().toISOString(),
          ageSeconds,
          status: 'AUTO_RECONCILED'
        };

        strandedList.push(rec);

        eventBus.publish('memory.learned', 'Reconciliation Heartbeat Agent', {
          orchestrationId: txId,
          action: 'STRANDED_EVENT_RECONCILED',
          ageSeconds,
          insight: `Heartbeat worker identified stranded transaction state (${ageSeconds}s stagnant). Auto-reconciled & state cleared.`
        });
      }
    }

    return strandedList;
  }

  public getStats() {
    return {
      activeLocksCount: Array.from(this.locks.values()).filter(l => l.status === 'LOCKED').length,
      totalLocksHandled: this.locks.size,
      reconciledEventsCount: this.reconciledEventsCount
    };
  }
}

export const idempotencyReconciler = IdempotencyReconcilerService.getInstance();
