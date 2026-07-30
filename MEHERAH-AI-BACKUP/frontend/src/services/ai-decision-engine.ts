import { providerManager, RouteOption } from '../providers/provider.manager';
import { AuditLedgerService } from './audit-ledger.service';
import db from '../../database';

export interface DecisionEngineParams {
  userId: string;
  amount: number;
  currency: string;
  paymentMethod?: string;
  ipAddress?: string;
}

export interface DecisionEngineResult {
  decisionId: string;
  transactionRef: string;
  fraudScore: number; // 0.0 to 1.0
  confidenceScore: number; // 0 to 100
  chosenRoute: RouteOption;
  fallbackRoutes: RouteOption[];
  reasoning: string;
  approved: boolean;
  timestamp: string;
}

export class AIDecisionEngine {
  public static async analyzeAndRoute(params: DecisionEngineParams): Promise<DecisionEngineResult> {
    const { userId, amount, currency, paymentMethod } = params;
    
    // 1. Calculate Multi-Factor Fraud Score
    let fraudScore = 0.02;
    if (amount > 10000) fraudScore += 0.45;
    if (amount > 50000) fraudScore += 0.40;

    // 2. Evaluate Multi-Provider Network Routes (Flutterwave, MTN MoMo, Airtel Money, Bank)
    const evaluatedRoutes = await providerManager.evaluateAllRoutes(amount, currency, paymentMethod);
    const chosenRoute = evaluatedRoutes[0] || {
      providerId: 'flutterwave',
      providerName: 'Flutterwave Gateway',
      paymentMethod: paymentMethod || 'card',
      estimatedFee: Math.round(amount * 0.014 * 100) / 100,
      estimatedFeePercentage: 1.4,
      estimatedLatencySeconds: 3,
      historicalSuccessRate: 98.5,
      isAvailable: true,
      riskIndex: fraudScore,
      score: 95,
      aiRecommendation: 'Default sandbox route engaged'
    };

    const fallbackRoutes = evaluatedRoutes.slice(1);

    // 3. Compute AI Confidence Score
    const confidenceScore = fraudScore > 0.5 ? 45.0 : Math.min(99.9, Math.round((chosenRoute.score * 0.95 + 5) * 10) / 10);
    const approved = fraudScore <= 0.5;

    const transactionRef = 'MEHERAH-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const decisionId = 'dec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

    let reasoning = `Optimal route auto-selected: ${chosenRoute.providerName} via ${chosenRoute.paymentMethod.toUpperCase()} (Fee: ${chosenRoute.estimatedFeePercentage}%, Speed: ${chosenRoute.estimatedLatencySeconds}s, Success Rate: ${chosenRoute.historicalSuccessRate}%).`;
    if (!approved) {
      reasoning = `High risk transaction flagged (${Math.round(fraudScore * 100)}% fraud risk index). Execution paused for secondary identity verification.`;
    }

    // 4. Log to Audit Ledger
    await AuditLedgerService.recordEvent({
      orgId: 'meherah-core',
      userId,
      agentName: 'MEHERAH_ROUTER_V2',
      action: approved ? 'TRANSACTION_ROUTE_APPROVED' : 'TRANSACTION_ROUTE_BLOCKED',
      previousState: { amount, currency, paymentMethod },
      newState: { decisionId, transactionRef, fraudScore, chosenRoute: chosenRoute.providerId, approved }
    });

    // 5. Store in Database
    try {
      db.run(
        `INSERT INTO AI_Decisions (id, transaction_ref, fraud_score, chosen_route_id, confidence_score, reasoning) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [decisionId, transactionRef, fraudScore, chosenRoute.providerId, confidenceScore, reasoning]
      );

      db.run(
        `INSERT OR REPLACE INTO Memories (id, key_metric, value_data) VALUES ('last_ai_decision', 'global', ?)`,
        [JSON.stringify({ decisionId, chosenRoute: chosenRoute.providerName, confidenceScore, timestamp: new Date().toISOString() })]
      );
    } catch (e) {
      console.warn('[AIDecisionEngine DB Storage Warning]', e);
    }

    return {
      decisionId,
      transactionRef,
      fraudScore,
      confidenceScore,
      chosenRoute,
      fallbackRoutes,
      reasoning,
      approved,
      timestamp: new Date().toISOString()
    };
  }
}
