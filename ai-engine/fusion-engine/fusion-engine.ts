/**
 * MEHERAH Multimodal Fusion Engine (MFE)
 * Fuses financial, operational, and external environmental signals (weather, grid power, holidays)
 * into grounded, explainable routing & risk mitigation advisories.
 */

export interface FinancialSignal {
  providerId: string;
  latencyMs: number;
  settlementRatePct: number;
  activeLiquidityUgx: number;
  fxRateVariancePct: number;
}

export interface OperationalSignal {
  providerId: string;
  maintenanceScheduled: boolean;
  maintenanceWindowStart?: string;
  apiHealthStatus: 'OPTIMAL' | 'DEGRADED' | 'DOWN';
  activeCircuitBreaker: boolean;
}

export interface EnvironmentalSignal {
  regionId: string; // e.g. "WESTERN_UGANDA_MBARARA"
  weatherAlertSeverity: 'NONE' | 'MODERATE' | 'HEAVY_RAINFALL' | 'SEVERE_STORM';
  powerGridStatus: 'STABLE' | 'FLICKERING' | 'BLACKOUT_WARNING';
  isPublicHoliday: boolean;
  fuelPriceIndexChangePct: number;
}

export interface MultimodalFusionAdvisory {
  fusedAdvisoryId: string;
  targetProviderId: string;
  targetRegion: string;
  overallRiskIndexPct: number; // 0 to 100
  fusedInsightSummary: string;
  contributingFactors: {
    financialFactor: string;
    operationalFactor: string;
    environmentalFactor: string;
  };
  recommendedRoutingAction: string;
  explainableRegulatoryJustification: string;
}

export class MultimodalFusionEngine {
  /**
   * Fuses financial, operational, and environmental telemetry vectors.
   */
  public fuseContext(
    financial: FinancialSignal,
    operational: OperationalSignal,
    environmental: EnvironmentalSignal
  ): MultimodalFusionAdvisory {
    let riskPoints = 0;
    const insights: string[] = [];

    // 1. Financial vector evaluation
    if (financial.latencyMs > 3500) {
      riskPoints += 20;
      insights.push(`High financial latency (${financial.latencyMs}ms)`);
    }
    if (financial.settlementRatePct < 98.5) {
      riskPoints += 15;
      insights.push(`Degraded settlement rate (${financial.settlementRatePct}%)`);
    }

    // 2. Operational vector evaluation
    if (operational.maintenanceScheduled) {
      riskPoints += 25;
      insights.push(`Provider has scheduled maintenance active`);
    }
    if (operational.apiHealthStatus === 'DEGRADED') {
      riskPoints += 20;
    }

    // 3. Environmental vector evaluation
    if (environmental.weatherAlertSeverity === 'HEAVY_RAINFALL' || environmental.weatherAlertSeverity === 'SEVERE_STORM') {
      riskPoints += 25;
      insights.push(`Heavy rainfall in ${environmental.regionId} impairing telecom tower backhaul`);
    }
    if (environmental.powerGridStatus === 'BLACKOUT_WARNING') {
      riskPoints += 15;
      insights.push(`Regional power grid flickering`);
    }

    const overallRiskIndexPct = Math.min(100, riskPoints);

    let routingAction = 'Maintain standard route.';
    if (overallRiskIndexPct >= 50) {
      routingAction = `Elevated multi-domain risk (${overallRiskIndexPct}%). Throttling ${financial.providerId} traffic by 60% and pre-loading liquidity float to secondary rail.`;
    }

    return {
      fusedAdvisoryId: `MFE-ADV-${financial.providerId}-${Date.now()}`,
      targetProviderId: financial.providerId,
      targetRegion: environmental.regionId,
      overallRiskIndexPct,
      fusedInsightSummary: insights.join(' | ') || 'All multi-domain telemetry vectors operating within nominal parameters.',
      contributingFactors: {
        financialFactor: `Latency: ${financial.latencyMs}ms, Settlement: ${financial.settlementRatePct}%`,
        operationalFactor: `API Status: ${operational.apiHealthStatus}, Maintenance: ${operational.maintenanceScheduled ? 'ACTIVE' : 'NONE'}`,
        environmentalFactor: `Weather: ${environmental.weatherAlertSeverity}, Grid: ${environmental.powerGridStatus}`,
      },
      recommendedRoutingAction: routingAction,
      explainableRegulatoryJustification: `Multimodal Fusion evaluated cross-domain signals (Financial + Ops + Weather). Risk score ${overallRiskIndexPct}% triggers defensible preemptive traffic rebalancing.`,
    };
  }
}
