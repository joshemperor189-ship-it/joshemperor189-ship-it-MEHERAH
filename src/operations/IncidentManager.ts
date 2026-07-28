export interface IncidentEvent {
  incidentId: string;
  detectedAt: string;
  affectedService: string;
  triggerCondition: string;
  severity: 'P1_CRITICAL_FAILOVER' | 'P2_HIGH_DEGRADATION' | 'P3_LOW_TIMING';
  autoHealingActionTaken: string;
  resolutionStatus: 'RESOLVED_AUTO_HEALED' | 'MITIGATED_FAILOVER_ACTIVE' | 'PENDING_INVESTIGATION';
  explainedReasoning: string;
  failoverTargetRail?: string;
  trafficShiftPct?: number;
}

export class IncidentManagerService {
  private static instance: IncidentManagerService;

  private incidents: IncidentEvent[] = [
    {
      incidentId: 'INC-2026-8801',
      detectedAt: new Date(Date.now() - 3600000).toISOString(),
      affectedService: 'Flutterwave ACH Gateway Connector',
      triggerCondition: 'Latency spike 300% (4,200ms) & HTTP 504 timeout burst (>15% errors)',
      severity: 'P1_CRITICAL_FAILOVER',
      autoHealingActionTaken: 'Activated Circuit Breaker FLW-CB-01. Auto-shifted 100% clearing flow to MTN MoMo Direct & Stanbic ACH.',
      resolutionStatus: 'RESOLVED_AUTO_HEALED',
      explainedReasoning: 'Gemini SRE Healer detected Fiber degradation at Lagos peering point. Routing around Flutterwave prevented 1,420 transaction drops valued at UGX 2.4B.',
      failoverTargetRail: 'MTN_MOMO_PRIMARY',
      trafficShiftPct: 100
    }
  ];

  private constructor() {}

  public static getInstance(): IncidentManagerService {
    if (!IncidentManagerService.instance) {
      IncidentManagerService.instance = new IncidentManagerService();
    }
    return IncidentManagerService.instance;
  }

  public getActiveIncidents(): IncidentEvent[] {
    return [...this.incidents];
  }

  public triggerAutonomousHealingScenario(providerName: string = 'Airtel Money API'): IncidentEvent {
    const newInc: IncidentEvent = {
      incidentId: 'INC-' + Math.floor(Math.random() * 90000 + 10000),
      detectedAt: new Date().toISOString(),
      affectedService: `${providerName} Core Clearing Rail`,
      triggerCondition: `Sudden regional downtime detected. Webhook response timeouts exceeding 5,000ms.`,
      severity: 'P1_CRITICAL_FAILOVER',
      autoHealingActionTaken: `Tripped circuit breaker. Executed dynamic liquidity reroute to Stanbic ACH & MTN MoMo rail.`,
      resolutionStatus: 'RESOLVED_AUTO_HEALED',
      explainedReasoning: `Autonomous Incident Manager isolated ${providerName} within 140ms. Zero transactions lost; customer latency unaffected.`,
      failoverTargetRail: 'STANBIC_ACH_DIRECT',
      trafficShiftPct: 100
    };

    this.incidents.unshift(newInc);
    return newInc;
  }
}

export const incidentManager = IncidentManagerService.getInstance();
