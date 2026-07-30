import { eventBus } from './event-bus.service';
import { circuitBreakerService } from './circuit-breaker.service';

export interface ChaosConfig {
  latencyInjectionEnabled: boolean;
  latencyMs: number; // Artificial delay added to provider calls
  faultRatePercent: number; // e.g. 20% forced failure
  trafficShadowingEnabled: boolean; // Dark launch duplicate traffic to sandbox
  shadowRatioPercent: number; // e.g., 25% of traffic shadowed
}

export class ChaosEngineeringService {
  private static instance: ChaosEngineeringService;
  private config: ChaosConfig = {
    latencyInjectionEnabled: false,
    latencyMs: 3500,
    faultRatePercent: 0,
    trafficShadowingEnabled: true,
    shadowRatioPercent: 30
  };

  private shadowedCount = 0;
  private injectedLatencyCount = 0;
  private forcedFaultsCount = 0;

  private constructor() {}

  public static getInstance(): ChaosEngineeringService {
    if (!ChaosEngineeringService.instance) {
      ChaosEngineeringService.instance = new ChaosEngineeringService();
    }
    return ChaosEngineeringService.instance;
  }

  public getConfig(): ChaosConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<ChaosConfig>): ChaosConfig {
    this.config = { ...this.config, ...newConfig };
    eventBus.publish('agent.directive', 'Chaos Agent', {
      action: 'CHAOS_CONFIG_UPDATED',
      config: this.config
    });
    return this.config;
  }

  public async evaluateBeforeProviderCall(providerId: string): Promise<{ injectedLatencyMs: number; forceFault: boolean }> {
    let injectedLatencyMs = 0;
    let forceFault = false;

    // 1. Latency Injection
    if (this.config.latencyInjectionEnabled) {
      injectedLatencyMs = this.config.latencyMs;
      this.injectedLatencyCount += 1;
      await new Promise(r => setTimeout(r, injectedLatencyMs));

      eventBus.publish('risk.analyzed', 'Chaos Agent', {
        providerId,
        injectedLatencyMs,
        action: 'LATENCY_INJECTED',
        insight: `Chaos Engineering injected artificial ${injectedLatencyMs}ms delay into provider request.`
      });
    }

    // 2. Forced Fault Injection
    if (this.config.faultRatePercent > 0) {
      const roll = Math.random() * 100;
      if (roll < this.config.faultRatePercent) {
        forceFault = true;
        this.forcedFaultsCount += 1;

        eventBus.publish('risk.analyzed', 'Chaos Agent', {
          providerId,
          action: 'FORCED_FAULT_INJECTED',
          insight: `Chaos Engineering triggered simulated network dropout/failure for ${providerId}.`
        });
      }
    }

    return { injectedLatencyMs, forceFault };
  }

  public maybeShadowTraffic(payload: any) {
    if (!this.config.trafficShadowingEnabled) return;

    const roll = Math.random() * 100;
    if (roll < this.config.shadowRatioPercent) {
      this.shadowedCount += 1;

      // Dark Launch duplicate async execution
      setTimeout(() => {
        eventBus.publish('agent.directive', 'Traffic Shadowing Agent', {
          action: 'DARK_LAUNCH_SHADOWED',
          shadowTxRef: 'SHADOW-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
          amount: payload.amount,
          currency: payload.currency || 'USD',
          insight: `Production metadata shadowed into Sandbox Adapter without affecting live ledger.`
        });
      }, 200);
    }
  }

  public getStats() {
    return {
      config: this.config,
      shadowedCount: this.shadowedCount,
      injectedLatencyCount: this.injectedLatencyCount,
      forcedFaultsCount: this.forcedFaultsCount
    };
  }
}

export const chaosEngineeringService = ChaosEngineeringService.getInstance();
