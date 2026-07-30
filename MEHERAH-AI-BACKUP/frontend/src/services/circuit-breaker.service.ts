import { eventBus } from './event-bus.service';

export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface ProviderHealthMetrics {
  providerId: string;
  providerName: string;
  state: CircuitBreakerState;
  consecutiveFailures: number;
  totalRequests: number;
  failedRequests: number;
  failureRate: number; // Percentage
  avgLatencyMs: number;
  lastTripTime: string | null;
  lastSuccessTime: string | null;
}

export class CircuitBreakerService {
  private static instance: CircuitBreakerService;
  private metricsMap: Map<string, ProviderHealthMetrics> = new Map();
  private failureThreshold = 3; // Trip after 3 consecutive errors or >30% error rate
  private cooldownMs = 15000; // 15s in OPEN state before testing HALF_OPEN

  private constructor() {
    this.initializeProviders();
  }

  public static getInstance(): CircuitBreakerService {
    if (!CircuitBreakerService.instance) {
      CircuitBreakerService.instance = new CircuitBreakerService();
    }
    return CircuitBreakerService.instance;
  }

  private initializeProviders() {
    const defaultProviders = [
      { id: 'flutterwave', name: 'Flutterwave Sandbox Gateway' },
      { id: 'mtn_momo', name: 'MTN Mobile Money Core' },
      { id: 'airtel_money', name: 'Airtel Money Express' },
      { id: 'direct_bank', name: 'Direct Bank ACH/Swift' }
    ];

    for (const p of defaultProviders) {
      this.metricsMap.set(p.id, {
        providerId: p.id,
        providerName: p.name,
        state: 'CLOSED',
        consecutiveFailures: 0,
        totalRequests: 20,
        failedRequests: 0,
        failureRate: 0,
        avgLatencyMs: 1200,
        lastTripTime: null,
        lastSuccessTime: new Date().toISOString()
      });
    }
  }

  public getMetrics(providerId: string): ProviderHealthMetrics | undefined {
    return this.metricsMap.get(providerId);
  }

  public getAllMetrics(): ProviderHealthMetrics[] {
    return Array.from(this.metricsMap.values());
  }

  public isAllowed(providerId: string): boolean {
    const metric = this.metricsMap.get(providerId);
    if (!metric) return true;

    if (metric.state === 'CLOSED') return true;

    if (metric.state === 'OPEN') {
      const timeInOpen = metric.lastTripTime ? Date.now() - new Date(metric.lastTripTime).getTime() : 0;
      if (timeInOpen > this.cooldownMs) {
        metric.state = 'HALF_OPEN';
        eventBus.publish('agent.directive', 'Healer Agent', {
          action: 'CIRCUIT_HALF_OPEN',
          providerId,
          insight: `Cooldown elapsed (${Math.round(timeInOpen / 1000)}s). Circuit set to HALF_OPEN for probe transaction.`
        });
        return true;
      }
      return false; // Isolated
    }

    // HALF_OPEN allows single probe
    return true;
  }

  public recordSuccess(providerId: string, latencyMs: number) {
    const metric = this.metricsMap.get(providerId);
    if (!metric) return;

    metric.totalRequests += 1;
    metric.consecutiveFailures = 0;
    metric.avgLatencyMs = Math.round((metric.avgLatencyMs * 0.7) + (latencyMs * 0.3));
    metric.failureRate = Math.round((metric.failedRequests / metric.totalRequests) * 100);
    metric.lastSuccessTime = new Date().toISOString();

    if (metric.state === 'HALF_OPEN') {
      metric.state = 'CLOSED';
      eventBus.publish('agent.directive', 'Healer Agent', {
        action: 'CIRCUIT_RESTORED',
        providerId,
        insight: `Probe transaction succeeded (${latencyMs}ms). Circuit BREAKER restored to CLOSED (Healthy).`
      });
    }
  }

  public recordFailure(providerId: string, errorReason: string): { tripped: boolean; reroutedProvider?: string } {
    const metric = this.metricsMap.get(providerId);
    if (!metric) return { tripped: false };

    metric.totalRequests += 1;
    metric.failedRequests += 1;
    metric.consecutiveFailures += 1;
    metric.failureRate = Math.round((metric.failedRequests / metric.totalRequests) * 100);

    let tripped = false;
    if (metric.consecutiveFailures >= this.failureThreshold || metric.failureRate > 35) {
      if (metric.state !== 'OPEN') {
        metric.state = 'OPEN';
        metric.lastTripTime = new Date().toISOString();
        tripped = true;

        eventBus.publish('agent.directive', 'Healer Agent', {
          action: 'CIRCUIT_TRIPPED',
          providerId,
          errorReason,
          failureRate: `${metric.failureRate}%`,
          insight: `Circuit Breaker TRIPPED for ${metric.providerName}! Gateway isolated to prevent cascade failures.`
        });
      }
    }

    // Select healthy fallback provider for dynamic step-down rerouting
    const healthyFallback = Array.from(this.metricsMap.values()).find(
      p => p.providerId !== providerId && p.state === 'CLOSED'
    );

    return {
      tripped,
      reroutedProvider: healthyFallback ? healthyFallback.providerName : 'Direct Bank ACH/Swift'
    };
  }

  public forceState(providerId: string, newState: CircuitBreakerState) {
    const metric = this.metricsMap.get(providerId);
    if (metric) {
      metric.state = newState;
      if (newState === 'OPEN') metric.lastTripTime = new Date().toISOString();
      eventBus.publish('agent.directive', 'Healer Agent', {
        action: 'MANUAL_CIRCUIT_MUTATION',
        providerId,
        newState
      });
    }
  }
}

export const circuitBreakerService = CircuitBreakerService.getInstance();
