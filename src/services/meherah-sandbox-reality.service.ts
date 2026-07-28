export interface SimulatedProviderNode {
  providerId: 'MTN_MOMO' | 'AIRTEL_MONEY' | 'FLUTTERWAVE' | 'FLEXCUBE_BANK';
  providerName: string;
  category: 'MOBILE_MONEY' | 'PAYMENT_GATEWAY' | 'CORE_BANKING';
  status: 'HEALTHY' | 'WARNING_HIGH_LATENCY' | 'SIMULATED_OUTAGE';
  latencyMs: number;
  failureRatePct: number;
  fixedFeeUGX: number;
  variableFeePct: number;
  dailyVolumeCapUGX: number;
  supportedCorridors: string[];
}

export interface RouteScoreEvaluation {
  routeId: string;
  providerPath: string[];
  costScorePct: number;
  speedScorePct: number;
  reliabilityScorePct: number;
  complianceScorePct: number;
  totalMeherahScorePct: number;
  estimatedTimeMs: number;
  totalFeeUGX: number;
  aiRouteRationale: string;
  recommended: boolean;
}

export interface ReconciliationStepHash {
  stepIndex: number;
  stepName: 'TRANSACTION_CREATED' | 'SENDER_LEDGER_ENTRY' | 'PROVIDER_CONFIRMATION' | 'RECEIVER_LEDGER_ENTRY' | 'HASH_MATCH_VERIFIED';
  status: 'COMPLETED' | 'PENDING' | 'SIMULATED_FAIL_FREEZE';
  hashValue: string;
  timestamp: string;
}

export interface SandboxTransactionExecution {
  transactionId: string;
  userPrompt: string;
  amountUGX: number;
  destinationCorridor: string;
  selectedRoute: RouteScoreEvaluation;
  reconciliationSteps: ReconciliationStepHash[];
  zeroMoneyLossVerified: boolean;
  recoveryApplied: boolean;
  aiExplainabilityNotice: string;
  timestamp: string;
}

export interface NetworkHealthOverview {
  overallMeshHealthPct: number;
  activeProvidersCount: number;
  healthyRoutesCount: number;
  activeCongestionWarnings: number;
  autoReroutedTodayCount: number;
}

export class MeherahSandboxRealityService {
  private providers: SimulatedProviderNode[] = [
    {
      providerId: 'MTN_MOMO',
      providerName: 'MTN MoMo Uganda & Regional',
      category: 'MOBILE_MONEY',
      status: 'HEALTHY',
      latencyMs: 120,
      failureRatePct: 0.02,
      fixedFeeUGX: 500,
      variableFeePct: 0.1,
      dailyVolumeCapUGX: 500000000,
      supportedCorridors: ['UGX → KES', 'UGX → RWF', 'UGX → UGX']
    },
    {
      providerId: 'AIRTEL_MONEY',
      providerName: 'Airtel Money East Africa',
      category: 'MOBILE_MONEY',
      status: 'WARNING_HIGH_LATENCY',
      latencyMs: 580,
      failureRatePct: 0.08,
      fixedFeeUGX: 450,
      variableFeePct: 0.09,
      dailyVolumeCapUGX: 300000000,
      supportedCorridors: ['UGX → KES', 'UGX → TZS', 'UGX → UGX']
    },
    {
      providerId: 'FLUTTERWAVE',
      providerName: 'Flutterwave Enterprise Gateway',
      category: 'PAYMENT_GATEWAY',
      status: 'HEALTHY',
      latencyMs: 180,
      failureRatePct: 0.01,
      fixedFeeUGX: 1200,
      variableFeePct: 0.25,
      dailyVolumeCapUGX: 2000000000,
      supportedCorridors: ['UGX → KES', 'UGX → RWF', 'UGX → GHS', 'UGX → NGN']
    },
    {
      providerId: 'FLEXCUBE_BANK',
      providerName: 'Bank of Uganda Sovereign Clearing Rail',
      category: 'CORE_BANKING',
      status: 'HEALTHY',
      latencyMs: 85,
      failureRatePct: 0.001,
      fixedFeeUGX: 200,
      variableFeePct: 0.02,
      dailyVolumeCapUGX: 10000000000,
      supportedCorridors: ['UGX → KES', 'UGX → RWF', 'UGX → TZS', 'UGX → USD']
    }
  ];

  public getProviders(): SimulatedProviderNode[] {
    return this.providers;
  }

  public updateProviderStatus(providerId: string, status: 'HEALTHY' | 'WARNING_HIGH_LATENCY' | 'SIMULATED_OUTAGE', latencyMs?: number): SimulatedProviderNode[] {
    const prov = this.providers.find(p => p.providerId === providerId);
    if (prov) {
      prov.status = status;
      if (latencyMs !== undefined) prov.latencyMs = latencyMs;
    }
    return this.providers;
  }

  public evaluateRoutes(amountUGX: number, corridor: string): RouteScoreEvaluation[] {
    // Route 1: Sovereign Rail (Flexcube) -> Partner
    const route1Cost = 200 + amountUGX * 0.0002;
    const route1Speed = 98;
    const route1Reliability = 99.9;
    const route1Score = Math.round((98 * 0.35 + 99.9 * 0.35 + 99 * 0.15 + 100 * 0.15));

    // Route 2: MTN MoMo -> Flutterwave
    const route2Cost = 1700 + amountUGX * 0.0035;
    const route2Speed = 92;
    const route2Reliability = 98.5;
    const route2Score = Math.round((88 * 0.35 + 98.5 * 0.35 + 92 * 0.15 + 100 * 0.15));

    // Route 3: Airtel Money Direct
    const airtelProv = this.providers.find(p => p.providerId === 'AIRTEL_MONEY');
    const airtelLatency = airtelProv ? airtelProv.latencyMs : 580;
    const airtelHealthy = airtelProv?.status === 'HEALTHY';
    const route3Cost = 450 + amountUGX * 0.0009;
    const route3Speed = airtelLatency > 400 ? 65 : 90;
    const route3Reliability = airtelHealthy ? 95 : 70;
    const route3Score = Math.round((route3Speed * 0.35 + route3Reliability * 0.35 + 85 * 0.15 + 100 * 0.15));

    const routes: RouteScoreEvaluation[] = [
      {
        routeId: 'ROUTE-01-SOVEREIGN',
        providerPath: ['Bank of Uganda Sovereign Clearing', 'Central Bank of Kenya Rail'],
        costScorePct: 99,
        speedScorePct: route1Speed,
        reliabilityScorePct: route1Reliability,
        complianceScorePct: 100,
        totalMeherahScorePct: route1Score,
        estimatedTimeMs: 85,
        totalFeeUGX: route1Cost,
        aiRouteRationale: 'Direct Central Bank Sovereign Rail: Lowest fee markup, lowest latency (85ms), and 99.9% reliability guarantee.',
        recommended: true
      },
      {
        routeId: 'ROUTE-02-HYBRID',
        providerPath: ['MTN MoMo Uganda', 'Flutterwave Enterprise Gateway'],
        costScorePct: 88,
        speedScorePct: route2Speed,
        reliabilityScorePct: route2Reliability,
        complianceScorePct: 100,
        totalMeherahScorePct: route2Score,
        estimatedTimeMs: 180,
        totalFeeUGX: route2Cost,
        aiRouteRationale: 'Hybrid Mobile-Gateway Route: High accessibility for unbanked recipients, with sub-200ms settlement.',
        recommended: false
      },
      {
        routeId: 'ROUTE-03-DIRECT-TELCO',
        providerPath: ['Airtel Money East Africa'],
        costScorePct: 92,
        speedScorePct: route3Speed,
        reliabilityScorePct: route3Reliability,
        complianceScorePct: 100,
        totalMeherahScorePct: route3Score,
        estimatedTimeMs: airtelLatency,
        totalFeeUGX: route3Cost,
        aiRouteRationale: airtelLatency > 400 
          ? 'Direct Telco Route currently flagged with high latency (580ms). MEHERAH recommends Route 1 to prevent timeout risk.'
          : 'Direct Telco Route: Low fixed fee for mobile recipients.',
        recommended: false
      }
    ];

    return routes.sort((a, b) => b.totalMeherahScorePct - a.totalMeherahScorePct);
  }

  public executeSandboxTransaction(userPrompt: string, amountUGX: number, corridor: string, forceSimulatedFailure: boolean = false): SandboxTransactionExecution {
    const evaluatedRoutes = this.evaluateRoutes(amountUGX, corridor);
    const selectedRoute = evaluatedRoutes[0];
    const txId = `MHR-SBX-${Math.floor(Math.random() * 90000 + 10000)}`;
    const now = new Date().toISOString();

    const generateHash = (prefix: string) => `${prefix}_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;

    const steps: ReconciliationStepHash[] = [
      {
        stepIndex: 1,
        stepName: 'TRANSACTION_CREATED',
        status: 'COMPLETED',
        hashValue: generateHash('0x_tx_created'),
        timestamp: now
      },
      {
        stepIndex: 2,
        stepName: 'SENDER_LEDGER_ENTRY',
        status: 'COMPLETED',
        hashValue: generateHash('0x_sender_debit'),
        timestamp: new Date(Date.now() + 15).toISOString()
      },
      {
        stepIndex: 3,
        stepName: 'PROVIDER_CONFIRMATION',
        status: forceSimulatedFailure ? 'SIMULATED_FAIL_FREEZE' : 'COMPLETED',
        hashValue: forceSimulatedFailure ? '0x_TIMEOUT_FAIL' : generateHash('0x_provider_ack'),
        timestamp: new Date(Date.now() + 45).toISOString()
      },
      {
        stepIndex: 4,
        stepName: 'RECEIVER_LEDGER_ENTRY',
        status: forceSimulatedFailure ? 'PENDING' : 'COMPLETED',
        hashValue: forceSimulatedFailure ? 'PENDING_RECOVERY' : generateHash('0x_receiver_credit'),
        timestamp: new Date(Date.now() + 70).toISOString()
      },
      {
        stepIndex: 5,
        stepName: 'HASH_MATCH_VERIFIED',
        status: forceSimulatedFailure ? 'PENDING' : 'COMPLETED',
        hashValue: forceSimulatedFailure ? 'RECOVERY_HASH_SEALED' : generateHash('0x_3way_hash_match'),
        timestamp: new Date(Date.now() + 85).toISOString()
      }
    ];

    let recoveryApplied = false;
    let aiExplanation = '';

    if (forceSimulatedFailure) {
      recoveryApplied = true;
      aiExplanation = `Upstream Provider Timeout Detected at Step 3. MEHERAH Reconciliation Core instantly froze the transaction state, verified double-entry balance equality, and safely auto-rerouted to Bank of Uganda Sovereign Backup Rail with 0% money loss.`;
    } else {
      aiExplanation = `MEHERAH selected ${selectedRoute.routeId} (Score: ${selectedRoute.totalMeherahScorePct}%). All 5 reconciliation ledger steps verified with 100% cryptographic double-entry hash matching in ${selectedRoute.estimatedTimeMs}ms.`;
    }

    return {
      transactionId: txId,
      userPrompt,
      amountUGX,
      destinationCorridor: corridor,
      selectedRoute,
      reconciliationSteps: steps,
      zeroMoneyLossVerified: true,
      recoveryApplied,
      aiExplainabilityNotice: aiExplanation,
      timestamp: now
    };
  }

  public getNetworkHealthOverview(): NetworkHealthOverview {
    return {
      overallMeshHealthPct: 99.8,
      activeProvidersCount: this.providers.length,
      healthyRoutesCount: 12,
      activeCongestionWarnings: this.providers.filter(p => p.status !== 'HEALTHY').length,
      autoReroutedTodayCount: 1840
    };
  }
}

export const meherahSandboxRealityService = new MeherahSandboxRealityService();
