/**
 * MEHERAH Fraud Evidence Fusion Engine
 * Fuses multi-factor signals (device identity, location velocity, historical behavioral pattern, network reputation)
 * to make explainable risk-based authentication and payment clearance decisions.
 */

export interface FraudFusionInput {
  transactionId: string;
  senderWalletId: string;
  amountUgx: number;
  deviceFingerprint: string;
  isRecognizedDevice: boolean;
  ipGeoRegion: string;
  userHomeRegion: string;
  velocityTxCountPastHour: number;
  behavioralAnomalyScorePct: number; // 0 (normal) to 100 (highly anomalous)
  networkReputationScorePct: number; // 0 (bad reputation) to 100 (clean)
}

export interface FraudFusionResult {
  transactionId: string;
  combinedRiskScorePct: number;
  decision: 'CLEAR_AUTO_APPROVE' | 'STEP_UP_MFA_REQUIRED' | 'FREEZE_SUSPECT_HOLD';
  evidenceBreakdown: {
    deviceRisk: string;
    locationVelocityRisk: string;
    behavioralAnomalyRisk: string;
    networkReputationRisk: string;
  };
  explainableRegulatoryLog: string;
}

export class FraudFusionEngine {
  /**
   * Fuses evidence across multiple fraud vectors into a single explainable assessment.
   */
  public evaluateFraudRisk(input: FraudFusionInput): FraudFusionResult {
    let riskPoints = 0;

    // Device identity vector
    const deviceRisk = input.isRecognizedDevice ? 'LOW' : 'HIGH_UNRECOGNIZED';
    if (!input.isRecognizedDevice) riskPoints += 30;

    // Geofence & Velocity vector
    const locationVelocityRisk = input.ipGeoRegion !== input.userHomeRegion ? 'GEOGRAPHIC_DISCREPANCY' : 'MATCHED';
    if (input.ipGeoRegion !== input.userHomeRegion) riskPoints += 25;
    if (input.velocityTxCountPastHour > 5) riskPoints += 20;

    // Behavioral Anomaly
    const behavioralAnomalyRisk = input.behavioralAnomalyScorePct > 60 ? 'ANOMALOUS_PATTERN' : 'STANDARD_PATTERN';
    if (input.behavioralAnomalyScorePct > 60) riskPoints += 25;

    // Network Reputation
    const networkReputationRisk = input.networkReputationScorePct < 70 ? 'SUSPECT_IP_NETWORK' : 'CLEAN_NETWORK';
    if (input.networkReputationScorePct < 70) riskPoints += 20;

    const combinedRiskScorePct = Math.min(100, riskPoints);

    let decision: FraudFusionResult['decision'] = 'CLEAR_AUTO_APPROVE';
    if (combinedRiskScorePct >= 65) {
      decision = 'FREEZE_SUSPECT_HOLD';
    } else if (combinedRiskScorePct >= 35) {
      decision = 'STEP_UP_MFA_REQUIRED';
    }

    return {
      transactionId: input.transactionId,
      combinedRiskScorePct,
      decision,
      evidenceBreakdown: {
        deviceRisk: `${deviceRisk} (${input.deviceFingerprint.slice(0, 8)}...)`,
        locationVelocityRisk: `${locationVelocityRisk} [IP: ${input.ipGeoRegion}, Home: ${input.userHomeRegion}, Velocity: ${input.velocityTxCountPastHour}/hr]`,
        behavioralAnomalyRisk: `${behavioralAnomalyRisk} [Anomaly Score: ${input.behavioralAnomalyScorePct}%]`,
        networkReputationRisk: `${networkReputationRisk} [Reputation Score: ${input.networkReputationScorePct}%]`,
      },
      explainableRegulatoryLog: `Fraud Fusion Decision (${decision}) calculated with combined risk ${combinedRiskScorePct}%. Multimodal evidence grounds decision in device recognition, geographic velocity, and behavioral history.`,
    };
  }
}
