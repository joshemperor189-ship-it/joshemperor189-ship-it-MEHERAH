/**
 * MAFE - Integral Engine (Stage 2: Historical Memory Evaluation)
 * Evaluates accumulated historical latency, reliability trends, failure memory, damped recovery momentum,
 * persistence recovery, and closed-loop feedback learning across transaction lifecycles.
 */

export interface ProviderHistoricalRecord {
  providerId: string;
  providerName?: string;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions?: number;
  accumulatedLatencyMs: number;
  failedSettlementsCount: number;
  liquidityDepletionEvents: number;
  slaCompliancePct: number;
  recoveryStreak?: number; // Consecutive successful transactions during recovery phase
  trustMultiplier?: number; // Gradual trust recovery factor [0.1 to 1.0]
  lastUpdated?: string;
}

export interface IntegralScore {
  providerId: string;
  historicalReliabilityPct: number;
  averageLatencyMs: number;
  integralScore: number; // 0 to 100
  historicalPenalty?: number;
  reasoning: string;
}

export interface IntegralEvaluationResult extends IntegralScore {
  providerName: string;
  totalTransactions: number;
  slaCompliancePct: number;
  routingWeight: number; // 0.0 to 1.0
  recoveryStatus: 'HEALTHY' | 'DEGRADED_FAILURE_MEMORY' | 'GRADUAL_RECOVERING' | 'CRITICAL_UNTRUSTED';
  auditHash: string;
}

export interface IntegralSnapshot {
  snapshotId: string;
  timestamp: string;
  records: Record<string, ProviderHistoricalRecord>;
}

export class IntegralEngine {
  private records: Map<string, ProviderHistoricalRecord> = new Map();

  constructor(initialRecords?: ProviderHistoricalRecord[]) {
    if (initialRecords) {
      initialRecords.forEach((r) => this.records.set(r.providerId, this.normalizeRecord(r)));
    }
  }

  private normalizeRecord(r: ProviderHistoricalRecord): ProviderHistoricalRecord {
    const total = r.totalTransactions || 1;
    const failedTx = r.failedTransactions !== undefined ? r.failedTransactions : Math.max(0, total - r.successfulTransactions);
    return {
      providerId: r.providerId,
      providerName: r.providerName || r.providerId,
      totalTransactions: r.totalTransactions,
      successfulTransactions: r.successfulTransactions,
      failedTransactions: failedTx,
      accumulatedLatencyMs: r.accumulatedLatencyMs,
      failedSettlementsCount: r.failedSettlementsCount,
      liquidityDepletionEvents: r.liquidityDepletionEvents,
      slaCompliancePct: r.slaCompliancePct,
      recoveryStreak: r.recoveryStreak !== undefined ? r.recoveryStreak : 0,
      trustMultiplier: r.trustMultiplier !== undefined ? r.trustMultiplier : 1.0,
      lastUpdated: r.lastUpdated || new Date().toISOString(),
    };
  }

  /**
   * Evaluates historical stability accumulated over transaction history.
   */
  public evaluateHistory(historyRecords?: ProviderHistoricalRecord[]): IntegralEvaluationResult[] {
    const targets = historyRecords || Array.from(this.records.values());
    return targets.map((record) => this.evaluateSingleProvider(record));
  }

  /**
   * Evaluates a single provider's historical score.
   */
  public evaluateSingleProvider(inputRecord: ProviderHistoricalRecord): IntegralEvaluationResult {
    const record = this.normalizeRecord(inputRecord);
    const total = record.totalTransactions || 1;
    const historicalReliabilityPct = (record.successfulTransactions / total) * 100;
    const averageLatencyMs = record.accumulatedLatencyMs / total;

    let score = historicalReliabilityPct;

    // Failure memory penalties
    const failurePenalty = ((record.failedTransactions || 0) / total) * 40;
    const settlementPenalty = record.failedSettlementsCount * 2;
    const depletionPenalty = record.liquidityDepletionEvents * 5;
    const historicalPenalty = failurePenalty + settlementPenalty + depletionPenalty;

    score -= historicalPenalty;

    // SLA compliance weighting (70% operational history + 30% SLA)
    let combinedScore = score * 0.7 + record.slaCompliancePct * 0.3;

    // Gradual Recovery Memory Guard (Test 3)
    const trustMultiplier = record.trustMultiplier !== undefined ? record.trustMultiplier : 1.0;
    let recoveryStatus: IntegralEvaluationResult['recoveryStatus'] = 'HEALTHY';
    if (trustMultiplier < 1.0) {
      combinedScore *= trustMultiplier;
      recoveryStatus = 'GRADUAL_RECOVERING';
    } else if ((record.failedTransactions || 0) / total > 0.05) {
      recoveryStatus = 'DEGRADED_FAILURE_MEMORY';
    } else if (combinedScore < 60) {
      recoveryStatus = 'CRITICAL_UNTRUSTED';
    }

    const finalIntegralScore = Math.max(0, Math.min(100, parseFloat(combinedScore.toFixed(2))));
    const routingWeight = parseFloat((finalIntegralScore / 100).toFixed(4));

    const auditHash = this.generateAuditHash(record.providerId, finalIntegralScore, record.totalTransactions);

    return {
      providerId: record.providerId,
      providerName: record.providerName || record.providerId,
      totalTransactions: record.totalTransactions,
      historicalReliabilityPct: parseFloat(historicalReliabilityPct.toFixed(2)),
      averageLatencyMs: parseFloat(averageLatencyMs.toFixed(2)),
      integralScore: finalIntegralScore,
      slaCompliancePct: record.slaCompliancePct,
      historicalPenalty: parseFloat(historicalPenalty.toFixed(2)),
      routingWeight,
      recoveryStatus,
      reasoning: `History: ${record.successfulTransactions}/${total} success (${historicalReliabilityPct.toFixed(1)}%), SLA=${record.slaCompliancePct}%, trustMultiplier=${trustMultiplier.toFixed(2)}`,
      auditHash,
    };
  }

  /**
   * Closed-loop feedback update (Test 5)
   */
  public recordTransactionOutcome(
    providerId: string,
    providerName: string,
    success: boolean,
    latencyMs: number,
    liquidityDepleted: boolean = false
  ): IntegralEvaluationResult {
    let rec = this.records.get(providerId);

    if (!rec) {
      rec = {
        providerId,
        providerName,
        totalTransactions: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        accumulatedLatencyMs: 0,
        failedSettlementsCount: 0,
        liquidityDepletionEvents: 0,
        slaCompliancePct: 100.0,
        recoveryStreak: 0,
        trustMultiplier: 1.0,
        lastUpdated: new Date().toISOString(),
      };
    } else {
      rec = this.normalizeRecord(rec);
    }

    rec.totalTransactions += 1;
    rec.accumulatedLatencyMs += latencyMs;
    rec.lastUpdated = new Date().toISOString();

    let currentTrust = rec.trustMultiplier !== undefined ? rec.trustMultiplier : 1.0;

    if (success) {
      rec.successfulTransactions += 1;
      if (currentTrust < 1.0) {
        rec.recoveryStreak = (rec.recoveryStreak || 0) + 1;
        rec.trustMultiplier = Math.min(1.0, currentTrust + 0.02);
      }
    } else {
      rec.failedTransactions = (rec.failedTransactions || 0) + 1;
      rec.failedSettlementsCount += 1;
      rec.recoveryStreak = 0;
      rec.trustMultiplier = Math.max(0.2, currentTrust - 0.25);
    }

    if (liquidityDepleted) {
      rec.liquidityDepletionEvents += 1;
    }

    // Dynamic SLA calculation
    rec.slaCompliancePct = parseFloat(((rec.successfulTransactions / rec.totalTransactions) * 100).toFixed(2));

    this.records.set(providerId, rec);
    return this.evaluateSingleProvider(rec);
  }

  /**
   * Persistence export (Test 4)
   */
  public exportSnapshot(): IntegralSnapshot {
    const rawRecords: Record<string, ProviderHistoricalRecord> = {};
    this.records.forEach((v, k) => {
      rawRecords[k] = { ...v };
    });

    return {
      snapshotId: `SNAP-MAFE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      records: rawRecords,
    };
  }

  /**
   * Persistence recovery reload (Test 4)
   */
  public importSnapshot(snapshot: IntegralSnapshot): void {
    this.records.clear();
    Object.entries(snapshot.records).forEach(([k, v]) => {
      this.records.set(k, this.normalizeRecord(v));
    });
  }

  public getRecord(providerId: string): ProviderHistoricalRecord | undefined {
    return this.records.get(providerId);
  }

  private generateAuditHash(providerId: string, score: number, totalTx: number): string {
    const payload = `${providerId}:${score}:${totalTx}:MAFE_INTEGRAL_V2`;
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      hash = (hash << 5) - hash + payload.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    return `0x${hex}B77C4011`.substring(0, 34);
  }
}
