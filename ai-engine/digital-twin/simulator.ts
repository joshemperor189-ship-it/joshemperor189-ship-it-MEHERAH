/**
 * MEHERAH Digital Twin - Network Condition Simulator
 * Continuously models provider health, liquidity levels, latency variations, and congestion dynamics.
 */

export interface NetworkNodeState {
  providerId: string;
  providerName: string;
  activeLiquidityUgx: number;
  currentLatencyMs: number;
  errorRatePct: number;
  feePct: number;
  isOnline: boolean;
  congested: boolean;
}

export interface SystemStressScenario {
  scenarioId: string;
  scenarioName: string;
  description: string;
  simulatedNodeStates: NetworkNodeState[];
  predictedOutcome: {
    recommendedFallback: string;
    systemImpactSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    estimatedCongestionMinutes: number;
    recommendedLiquidityShiftUgx: number;
  };
}

export class DigitalTwinSimulator {
  private baseNodeStates: Map<string, NetworkNodeState> = new Map();

  constructor() {
    this.initializeBaselineTopology();
  }

  private initializeBaselineTopology(): void {
    this.baseNodeStates.set('MTN_MOMO', {
      providerId: 'MTN_MOMO',
      providerName: 'MTN Mobile Money',
      activeLiquidityUgx: 1200000000,
      currentLatencyMs: 4200,
      errorRatePct: 1.8,
      feePct: 1.2,
      isOnline: true,
      congested: false,
    });

    this.baseNodeStates.set('AIRTEL_MONEY', {
      providerId: 'AIRTEL_MONEY',
      providerName: 'Airtel Money',
      activeLiquidityUgx: 950000000,
      currentLatencyMs: 1800,
      errorRatePct: 0.6,
      feePct: 0.9,
      isOnline: true,
      congested: false,
    });

    this.baseNodeStates.set('BANK_ACH', {
      providerId: 'BANK_ACH',
      providerName: 'National Bank ACH',
      activeLiquidityUgx: 5000000000,
      currentLatencyMs: 45000,
      errorRatePct: 0.1,
      feePct: 2.5,
      isOnline: true,
      congested: false,
    });
  }

  /**
   * Returns current baseline digital twin topology state.
   */
  public getTopology(): NetworkNodeState[] {
    return Array.from(this.baseNodeStates.values());
  }

  /**
   * Simulates a stress scenario (e.g. "What if MTN drops in 5 minutes?").
   */
  public simulateOutage(failingProviderId: string): SystemStressScenario {
    const nodes = this.getTopology().map(node => {
      if (node.providerId === failingProviderId) {
        return {
          ...node,
          isOnline: false,
          currentLatencyMs: 99999,
          errorRatePct: 100.0,
          congested: true,
        };
      }
      return node;
    });

    const healthiestFallback = nodes.find(n => n.isOnline && n.providerId !== failingProviderId)?.providerId || 'BANK_ACH';

    return {
      scenarioId: `SIM-OUTAGE-${failingProviderId}-${Date.now()}`,
      scenarioName: `Simulated Provider Outage: ${failingProviderId}`,
      description: `Predicting network flow if ${failingProviderId} undergoes total disconnection.`,
      simulatedNodeStates: nodes,
      predictedOutcome: {
        recommendedFallback: healthiestFallback,
        systemImpactSeverity: 'MEDIUM',
        estimatedCongestionMinutes: 12,
        recommendedLiquidityShiftUgx: 350000000,
      },
    };
  }

  /**
   * Simulates a fee spike scenario (e.g. "What if Airtel fees increase by 15%?").
   */
  public simulateFeeSpike(providerId: string, feeMultiplier: number): SystemStressScenario {
    const nodes = this.getTopology().map(node => {
      if (node.providerId === providerId) {
        return {
          ...node,
          feePct: parseFloat((node.feePct * feeMultiplier).toFixed(2)),
        };
      }
      return node;
    });

    const cheapestNode = nodes.reduce((prev, curr) => (curr.feePct < prev.feePct ? curr : prev));

    return {
      scenarioId: `SIM-FEESPIKE-${providerId}-${Date.now()}`,
      scenarioName: `Simulated Fee Spike: ${providerId} (${(feeMultiplier * 100 - 100).toFixed(0)}% Increase)`,
      description: `Evaluating cost-optimal routing changes if ${providerId} increases transaction fees.`,
      simulatedNodeStates: nodes,
      predictedOutcome: {
        recommendedFallback: cheapestNode.providerId,
        systemImpactSeverity: 'LOW',
        estimatedCongestionMinutes: 0,
        recommendedLiquidityShiftUgx: 120000000,
      },
    };
  }
}
