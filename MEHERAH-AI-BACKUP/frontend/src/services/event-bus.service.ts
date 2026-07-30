import { EventEmitter } from 'events';
import db from '../../database';
import { AuditLedgerService } from './audit-ledger.service';

export interface MeherahSystemEvent {
  eventId: string;
  topic: 'transaction.created' | 'risk.analyzed' | 'compliance.cleared' | 'liquidity.checked' | 'route.selected' | 'payment.executed' | 'memory.learned' | 'agent.directive' | 'savings.proposed' | 'savings.approved' | 'treasury.rebalanced' | string;
  publisher: string;
  payload: any;
  timestamp: string;
}

export type EventSubscriberCallback = (event: MeherahSystemEvent) => Promise<void> | void;

export class EventBusService {
  private static instance: EventBusService;
  private emitter: EventEmitter;
  private recentEvents: MeherahSystemEvent[] = [];
  private maxHistory = 100;
  private isKillSwitchEngaged = false;

  private constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(50);
  }

  public setKillSwitch(engaged: boolean): void {
    this.isKillSwitchEngaged = engaged;
  }

  public isKillSwitchActive(): boolean {
    return this.isKillSwitchEngaged;
  }

  public static getInstance(): EventBusService {
    if (!EventBusService.instance) {
      EventBusService.instance = new EventBusService();
    }
    return EventBusService.instance;
  }

  public publish(topic: MeherahSystemEvent['topic'], publisher: string, payload: any): MeherahSystemEvent {
    const event: MeherahSystemEvent = {
      eventId: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      topic,
      publisher,
      payload,
      timestamp: new Date().toISOString()
    };

    this.recentEvents.unshift(event);
    if (this.recentEvents.length > this.maxHistory) {
      this.recentEvents.pop();
    }

    // Emit internally
    this.emitter.emit(topic, event);
    this.emitter.emit('*', event);

    // Record into Audit Trail
    AuditLedgerService.recordEvent({
      orgId: 'meherah-event-bus',
      userId: payload?.userId || 'system-event-bus',
      agentName: publisher,
      action: topic.toUpperCase().replace('.', '_'),
      previousState: null,
      newState: payload
    }).catch(() => {});

    // Save to Database Logs
    try {
      db.run(
        `INSERT INTO Logs (id, level, message, timestamp) VALUES (?, ?, ?, ?)`,
        [event.eventId, 'INFO', `[${topic}] ${publisher}: ${JSON.stringify(payload).substring(0, 250)}`, event.timestamp]
      );
    } catch (e) {
      // Non-blocking
    }

    return event;
  }

  public subscribe(topic: MeherahSystemEvent['topic'] | '*', callback: EventSubscriberCallback): void {
    this.emitter.on(topic, callback);
  }

  public unsubscribe(topic: MeherahSystemEvent['topic'] | '*', callback: EventSubscriberCallback): void {
    this.emitter.off(topic, callback);
  }

  public getRecentEvents(limit: number = 20): MeherahSystemEvent[] {
    return this.recentEvents.slice(0, limit);
  }
}

export const eventBus = EventBusService.getInstance();
