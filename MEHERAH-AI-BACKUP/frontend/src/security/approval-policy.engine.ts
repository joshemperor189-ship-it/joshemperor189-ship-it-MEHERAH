import { AuditLedgerService } from '../services/audit-ledger.service.ts';

export interface GovernanceTransactionRequest {
  orgId: string;
  userId: string;
  amountUgx: number;
  actionType: 'FINANCIAL_SETTLEMENT' | 'SECRET_ROTATION' | 'LLM_PROVIDER_SWITCH' | 'AGENT_CONFIG_CHANGE';
}

export class ApprovalPolicyEngine {
  private static FINANCIAL_APPROVAL_THRESHOLD_UGX = 10000000; // 10M UGX Trigger Point

  /**
   * Evaluates if a request can execute instantly or requires an enterprise validation step.
   */
  public static async evaluateActionRequest(request: GovernanceTransactionRequest): Promise<{ requireApproval: boolean; systemLock: boolean; reason: string }> {
    
    // Rule A: Financial settlement threshold limit verification checks
    if (request.actionType === 'FINANCIAL_SETTLEMENT' && request.amountUgx > this.FINANCIAL_APPROVAL_THRESHOLD_UGX) {
      return { requireApproval: true, systemLock: false, reason: 'Transaction volume exceeds multi-sig corporate verification threshold.' };
    }

    // Rule B: Intercept infrastructure provider modifications
    if (request.actionType === 'LLM_PROVIDER_SWITCH' || request.actionType === 'SECRET_ROTATION') {
      return { requireApproval: true, systemLock: false, reason: 'Core cryptographic environment mutations require dual-operator signing keys.' };
    }

    // Default: Clear transaction to pass for execution immediately
    return { requireApproval: false, systemLock: false, reason: 'Operation verified under standard compliance limits.' };
  }
}
