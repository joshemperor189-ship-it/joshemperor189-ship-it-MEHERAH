/**
 * MEHERAH Decision Replay & Flight Recorder (DRFR) - Replay Engine
 * Provides central bank regulators and institutional auditors step-by-step temporal
 * decision reconstruction, displaying exact environment state, AI PID metrics, policy rules, and audit receipts.
 */

import { FlightRecorder } from './flight-recorder';
import { DecisionValidator } from './validator';
import { ReplayAnalysisResult, DecisionRecord } from './decision-schema';

export class DecisionReplayEngine {
  private flightRecorder: FlightRecorder;
  private validator: DecisionValidator;

  constructor(flightRecorder?: FlightRecorder) {
    this.flightRecorder = flightRecorder || new FlightRecorder();
    this.validator = new DecisionValidator();
  }

  /**
   * Reconstructs a historical decision event for an auditor given a decision ID.
   */
  public replayDecision(decisionId: string): ReplayAnalysisResult {
    const record = this.flightRecorder.getDecisionRecord(decisionId);

    if (!record) {
      throw new Error(`Decision Replay Error: Decision ID '${decisionId}' not found in black box storage.`);
    }

    const valReport = this.validator.validateRecord(record);

    const env = record.environmentSnapshot;
    const mafe = record.mafeState;
    const policy = record.policyState;
    const tx = record.transactionContext;

    const systemStateSummary = `Latency: MTN (${env.providerLatencyMs.MTN || 'N/A'}ms), Airtel (${env.providerLatencyMs.AIRTEL || 'N/A'}ms) | Success Rate: MTN (${env.providerSuccessRate.MTN || 'N/A'}%), Airtel (${env.providerSuccessRate.AIRTEL || 'N/A'}%) | Liquidity: ${JSON.stringify(env.liquidityState)}`;

    const aiReasoningSummary = `MAFE Confidence: ${mafe.confidenceScore}% (P: ${mafe.proportionalScore}, I: ${mafe.integralScore}, D: ${mafe.derivativeScore}) | Selected Route: ${mafe.selectedRoute}`;

    const policyEvaluationSummary = `Policy Version: ${policy.policyVersion} | Threshold: ${policy.threshold}% | Rules: [${policy.appliedRules.join(', ')}]`;

    const finalAction = `Transaction ${tx.transactionId} (${tx.amount.toLocaleString()} ${tx.currency}) routed via ${mafe.selectedRoute} -> ${policy.decision}`;

    return {
      decisionId: record.decisionId,
      timestamp: record.timestamp,
      systemStateSummary,
      aiReasoningSummary,
      policyEvaluationSummary,
      finalAction,
      integrityVerification: {
        hashVerified: valReport.hashMatch,
        signatureVerified: valReport.signatureVerified,
        ledgerConfirmed: valReport.ledgerIndexValid,
        status: valReport.isValid ? 'PASSED' : 'FAILED_TAMPERED',
      },
      record,
    };
  }

  public getFlightRecorder(): FlightRecorder {
    return this.flightRecorder;
  }
}
