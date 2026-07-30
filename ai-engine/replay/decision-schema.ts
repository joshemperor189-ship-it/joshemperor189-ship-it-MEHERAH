/**
 * MEHERAH Decision Replay & Flight Recorder (DRFR) - Decision Schema
 * Defines the immutable data contract for the financial black box, storing full
 * transaction context, environmental telemetry snapshots, MAFE PID scores, governance policy evaluation,
 * human-readable explanations, and HSM cryptographic receipts.
 */

export interface TransactionContext {
  transactionId: string;
  amount: number;
  currency: string; // e.g., 'UGX', 'KES', 'USD'
  sourceProvider: string; // e.g., 'MTN_MOMO', 'AIRTEL_MONEY'
  destinationAccount: string; // e.g., 'BANK_ACCOUNT_BOU_0921'
  userId?: string;
  initiatedAt: string;
}

export interface EnvironmentSnapshot {
  providerLatencyMs: Record<string, number>; // e.g., { MTN: 180, AIRTEL: 240 }
  providerSuccessRate: Record<string, number>; // e.g., { MTN: 99.2, AIRTEL: 98.7 }
  liquidityState: Record<string, 'HEALTHY' | 'NORMAL' | 'LOW' | 'CRITICAL'>;
  networkCongestionLevel: 'LOW' | 'MODERATE' | 'HIGH';
  capturedAt: string;
}

export interface MafeState {
  proportionalScore: number;
  integralScore: number;
  derivativeScore: number;
  confidenceScore: number; // 0 - 100
  selectedRoute: string;
  historicalSampleCount: number;
}

export interface PolicyState {
  policyVersion: string; // e.g., 'MEHERAH_POLICY_1.0'
  threshold: number; // e.g., 90
  decision: 'AUTO_APPROVED' | 'STEP_UP_MFA' | 'HUMAN_REVIEW_REQUIRED' | 'BLOCKED_NO_INTENT';
  appliedRules: string[];
}

export interface DecisionExplanation {
  primaryReason: string;
  contributingFactors: string[];
  recommendedFollowup?: string;
}

export interface CryptographicReceipt {
  hash: string; // SHA-256 digest of record contents
  signature: string; // FIPS 140-2 Level 3 HSM signature
  keyId: string;
  signedAt: string;
  auditLedgerBlockIndex: number;
}

export interface DecisionRecord {
  decisionId: string;
  transactionContext: TransactionContext;
  environmentSnapshot: EnvironmentSnapshot;
  mafeState: MafeState;
  policyState: PolicyState;
  explanation: DecisionExplanation;
  cryptographicReceipt: CryptographicReceipt;
  timestamp: string;
}

export interface ReplayAnalysisResult {
  decisionId: string;
  timestamp: string;
  systemStateSummary: string;
  aiReasoningSummary: string;
  policyEvaluationSummary: string;
  finalAction: string;
  integrityVerification: {
    hashVerified: boolean;
    signatureVerified: boolean;
    ledgerConfirmed: boolean;
    status: 'PASSED' | 'FAILED_TAMPERED' | 'UNVERIFIED';
  };
  record: DecisionRecord;
}
