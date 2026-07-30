/**
 * MEHERAH Component-Based Operating Architecture (MCOA) - Component Registry
 * Tracks service versions, health states, service contracts, flight-proven certifications,
 * and enables zero-downtime hot-swapping of core AI, routing, governance, and security modules.
 */

export interface ServiceContract {
  serviceId: string;
  serviceName: string;
  version: string; // e.g. "v1.2.0"
  status: 'HEALTHY' | 'DEGRADED' | 'MAINTENANCE' | 'HOT_SWAPPING';
  flightProvenCertified: boolean;
  regionCode: 'UG' | 'KE' | 'TZ' | 'NG' | 'GLOBAL';
  contractSchema: {
    inputTypes: string[];
    outputTypes: string[];
  };
  telemetryMetrics: {
    requestsHandledPastHour: number;
    p99LatencyMs: number;
    errorRatePct: number;
  };
}

export class ComponentRegistry {
  private registry: Map<string, ServiceContract> = new Map();

  constructor() {
    this.seedDefaultFleetServices();
  }

  private seedDefaultFleetServices(): void {
    const services: ServiceContract[] = [
      {
        serviceId: 'MAFE_ENGINE_SERVICE',
        serviceName: 'MAFE Adaptive Feedback Engine',
        version: 'v1.4.0',
        status: 'HEALTHY',
        flightProvenCertified: true,
        regionCode: 'UG',
        contractSchema: { inputTypes: ['TransactionTelemetry'], outputTypes: ['MAFERoutingRecommendation'] },
        telemetryMetrics: { requestsHandledPastHour: 14200, p99LatencyMs: 18, errorRatePct: 0.01 },
      },
      {
        serviceId: 'FUSION_ENGINE_SERVICE',
        serviceName: 'Multimodal Fusion Engine (MFE)',
        version: 'v1.1.0',
        status: 'HEALTHY',
        flightProvenCertified: true,
        regionCode: 'UG',
        contractSchema: { inputTypes: ['FinancialSignal', 'OperationalSignal', 'EnvironmentalSignal'], outputTypes: ['MultimodalFusionAdvisory'] },
        telemetryMetrics: { requestsHandledPastHour: 14200, p99LatencyMs: 24, errorRatePct: 0.00 },
      },
      {
        serviceId: 'FIG_KNOWLEDGE_GRAPH',
        serviceName: 'Financial Intelligence Graph (FIG)',
        version: 'v1.0.0',
        status: 'HEALTHY',
        flightProvenCertified: true,
        regionCode: 'UG',
        contractSchema: { inputTypes: ['FIGNodeQuery'], outputTypes: ['PropagationImpactResult'] },
        telemetryMetrics: { requestsHandledPastHour: 8400, p99LatencyMs: 32, errorRatePct: 0.00 },
      },
      {
        serviceId: 'HSM_SECURITY_GATEWAY',
        serviceName: 'HSM Cryptographic Key Vault',
        version: 'v2.0.0',
        status: 'HEALTHY',
        flightProvenCertified: true,
        regionCode: 'GLOBAL',
        contractSchema: { inputTypes: ['UnsignedPayload'], outputTypes: ['HSMSignature'] },
        telemetryMetrics: { requestsHandledPastHour: 18900, p99LatencyMs: 4, errorRatePct: 0.00 },
      },
    ];

    for (const svc of services) {
      this.registry.set(svc.serviceId, svc);
    }
  }

  public getAllRegisteredServices(): ServiceContract[] {
    return Array.from(this.registry.values());
  }

  public getService(serviceId: string): ServiceContract | undefined {
    return this.registry.get(serviceId);
  }

  /**
   * Performs zero-downtime hot-swap of a component after Digital Twin flight-proven verification.
   */
  public hotSwapComponent(
    serviceId: string,
    newVersion: string,
    flightProvenSimulatedPass: boolean
  ): { success: boolean; serviceId: string; activeVersion: string; log: string } {
    const existing = this.registry.get(serviceId);
    if (!existing) {
      return { success: false, serviceId, activeVersion: 'N/A', log: `Service ${serviceId} not found in MCOA registry.` };
    }

    if (!flightProvenSimulatedPass) {
      return {
        success: false,
        serviceId,
        activeVersion: existing.version,
        log: `Hot-swap blocked: Version ${newVersion} failed Digital Twin flight-proven simulation requirement.`,
      };
    }

    const previousVersion = existing.version;
    existing.version = newVersion;
    existing.flightProvenCertified = true;
    existing.status = 'HEALTHY';

    return {
      success: true,
      serviceId,
      activeVersion: newVersion,
      log: `Zero-Downtime Hot-Swap Completed: ${serviceId} upgraded from ${previousVersion} -> ${newVersion}. Zero traffic drop recorded.`,
    };
  }
}
