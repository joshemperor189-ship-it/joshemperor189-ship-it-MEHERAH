import db from '../../database';
import { eventBus } from './event-bus.service';
import { RouteOption } from '../providers/provider.manager';

export interface TransactionOutcome {
  transactionRef: string;
  providerId: string;
  providerName: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  success: boolean;
  latencyMs: number;
  feeDeducted: number;
  fraudScore: number;
  userId: string;
}

export interface SystemMemoryMetric {
  providerId: string;
  totalVolume: number;
  totalCount: number;
  successfulCount: number;
  failedCount: number;
  calculatedSuccessRate: number;
  avgLatencyMs: number;
  lastUpdated: string;
}

export class LearningLoopService {
  private static memoriesMap: Map<string, SystemMemoryMetric> = new Map();

  public static async recordOutcomeAndLearn(outcome: TransactionOutcome): Promise<SystemMemoryMetric> {
    const { providerId, success, latencyMs, amount } = outcome;

    let metric = this.memoriesMap.get(providerId) || {
      providerId,
      totalVolume: 0,
      totalCount: 0,
      successfulCount: 0,
      failedCount: 0,
      calculatedSuccessRate: 98.5,
      avgLatencyMs: 3500,
      lastUpdated: new Date().toISOString()
    };

    metric.totalCount += 1;
    metric.totalVolume += amount;
    if (success) {
      metric.successfulCount += 1;
    } else {
      metric.failedCount += 1;
    }

    metric.calculatedSuccessRate = Math.round((metric.successfulCount / metric.totalCount) * 1000) / 10;
    metric.avgLatencyMs = Math.round((metric.avgLatencyMs * 0.7) + (latencyMs * 0.3));
    metric.lastUpdated = new Date().toISOString();

    this.memoriesMap.set(providerId, metric);

    // Save state memory to SQLite
    try {
      db.run(
        `INSERT OR REPLACE INTO Memories (id, key_metric, value_data, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
        [
          `memory_provider_${providerId}`,
          'provider_performance',
          JSON.stringify(metric)
        ]
      );
    } catch (e) {
      console.warn('[LearningLoop DB Error]', e);
    }

    // Publish learning event
    eventBus.publish('memory.learned', 'Memory Agent', {
      providerId,
      newSuccessRate: `${metric.calculatedSuccessRate}%`,
      avgLatency: `${(metric.avgLatencyMs / 1000).toFixed(2)}s`,
      totalTransactionsProcessed: metric.totalCount,
      insight: `Learning loop incorporated transaction ${outcome.transactionRef}. Route efficiency model calibrated.`
    });

    return metric;
  }

  public static getMemoryForProvider(providerId: string): SystemMemoryMetric | undefined {
    return this.memoriesMap.get(providerId);
  }
}
