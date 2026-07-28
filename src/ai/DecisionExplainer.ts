import { GeminiDecisionResponse } from './GeminiConnector';

export interface ExplanationOutput {
  transactionSummary: string;
  selectedProvider: string;
  confidenceFormatted: string;
  reasons: string[];
  policyStatus: string;
  safetyHierarchy: string;
}

export class DecisionExplainer {
  public static explainRouteChoice(
    amountUGX: number,
    destination: string,
    decision: GeminiDecisionResponse,
    policyCheckPassed: boolean = true
  ): ExplanationOutput {
    return {
      transactionSummary: `UGX ${amountUGX.toLocaleString()} to ${destination}`,
      selectedProvider: decision.providerName,
      confidenceFormatted: `${decision.confidence}%`,
      reasons: decision.keyFactors && decision.keyFactors.length > 0 
        ? decision.keyFactors 
        : [
            `Highest success probability (${decision.confidence}%)`,
            `Healthy provider status & low latency`,
            `Lower expected failure cost`
          ],
      policyStatus: policyCheckPassed ? 'PASSED (MEHERAH Rules & Risk Engine)' : 'FLAGGED FOR MANUAL APPROVAL',
      safetyHierarchy: 'Gemini Advises → MEHERAH Rules Engine → Risk Agent → Compliance Gate → Execution'
    };
  }
}
