/**
 * MAFE - Adaptive Feedback Engine (Main Orchestrator & Closed-Loop Memory Updater)
 * Coordinates P-I-D evaluation, confidence calculation, policy check, and post-transaction learning feedback loops.
 */

import { ProportionalEngine, ProviderPresentState } from './proportional';
import { IntegralEngine, ProviderHistoricalRecord } from './integral';
import { DerivativeEngine, ProviderTrendDelta } from './derivative';
import { ConfidenceEngine, MAFEConfidenceEvaluation } from './confidence';
import { PolicyEngine, PolicyDecision } from './policy';

export interface MAFERoutingRecommendation {
  providerId: string;
  confidence: MAFEConfidenceEvaluation;
  policy: PolicyDecision;
  explainedReasoning: string;
}

export interface SettlementFeedbackPayload {
  providerId: string;
  expectedLatencyMs: number;
  actualLatencyMs: number;
  expectedFeeUgx: number;
  actualFeeUgx: number;
  isSuccessful: boolean;
  timestamp: number;
}

export class MAFEFeedbackEngine {
  private pEngine = new ProportionalEngine();
  private iEngine = new IntegralEngine();
  private dEngine = new DerivativeEngine();
  private confidenceEngine = new ConfidenceEngine();
  private policyEngine = new PolicyEngine();

  // Closed-loop memory store
  private historicalStore: Map<string, ProviderHistoricalRecord> = new Map();

  constructor() {
    this.initializeDefaultMemory();
  }

  private initializeDefaultMemory(): void {
    this.historicalStore.set('MTN_MOMO', {
      providerId: 'MTN_MOMO',
      totalTransactions: 100,
      successfulTransactions: 98,
      accumulatedLatencyMs: 420000,
      failedSettlementsCount: 2,
      liquidityDepletionEvents: 0,
      slaCompliancePct: 98.2,
    });

    this.historicalStore.set('AIRTEL_MONEY', {
      providerId: 'AIRTEL_MONEY',
      totalTransactions: 100,
      successfulTransactions: 99,
      accumulatedLatencyMs: 180000,
      failedSettlementsCount: 1,
      liquidityDepletionEvents: 0,
      slaCompliancePct: 99.4,
    });
  }

  /**
   * Evaluates all candidate providers using MAFE adaptive feedback logic.
   */
  public evaluateRoutes(
    pStates: ProviderPresentState[],
    deltas: ProviderTrendDelta[]
  ): MAFERoutingRecommendation[] {
    const pScores = this.pEngine.evaluatePresent(pStates);
    const dScores = this.dEngine.evaluatePrediction(deltas);

    const historyRecords = pStates.map(p => 
      this.historicalStore.get(p.providerId) || {
        providerId: p.providerId,
        totalTransactions: 10,
        successfulTransactions: 10,
        accumulatedLatencyMs: 20000,
        failedSettlementsCount: 0,
        liquidityDepletionEvents: 0,
        slaCompliancePct: 95.0,
      }
    );

    const iScores = this.iEngine.evaluateHistory(historyRecords);

    return pStates.map(pState => {
      const pScore = pScores.find(s => s.providerId === pState.providerId)!;
      const iScore = iScores.find(s => s.providerId === pState.providerId)!;
      const dScore = dScores.find(s => s.providerId === pState.providerId)!;

      const confidence = this.confidenceEngine.calculateConfidence(pScore, iScore, dScore);
      const policy = this.policyEngine.evaluatePolicy(confidence);

      return {
        providerId: pState.providerId,
        confidence,
        policy,
        explainedReasoning: `${confidence.summaryJustification} -> Policy: ${policy.policyCode} (${policy.actionInstruction})`,
      };
    });
  }

  /**
   * Closed-loop feedback: Updates historical memory with post-transaction settlement outcomes.
   */
  public recordPostTransactionOutcome(feedback: SettlementFeedbackPayload): void {
    const existing = this.historicalStore.get(feedback.providerId) || {
      providerId: feedback.providerId,
      totalTransactions: 0,
      successfulTransactions: 0,
      accumulatedLatencyMs: 0,
      failedSettlementsCount: 0,
      liquidityDepletionEvents: 0,
      slaCompliancePct: 95.0,
    };

    existing.totalTransactions += 1;
    if (feedback.isSuccessful) {
      existing.successfulTransactions += 1;
    } else {
      existing.failedSettlementsCount += 1;
    }
    existing.accumulatedLatencyMs += feedback.actualLatencyMs;

    // Recalculate dynamic SLA compliance score
    existing.slaCompliancePct = parseFloat(((existing.successfulTransactions / existing.totalTransactions) * 100).toFixed(2));

    this.historicalStore.set(feedback.providerId, existing);
  }

  public getHistoricalRecord(providerId: string): ProviderHistoricalRecord | undefined {
    return this.historicalStore.get(providerId);
  }
}
