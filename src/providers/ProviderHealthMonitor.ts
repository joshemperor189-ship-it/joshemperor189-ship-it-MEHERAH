export interface HealthMetrics {
  providerId: string;
  providerName: string;
  healthState: 'HEALTHY' | 'DEGRADED' | 'OUTAGE';
  latencyP95Ms: number;
  successRate5mPct: number;
  consecutiveTimeouts: number;
  circuitBreakerTripped: boolean;
  lastHeartbeatTime: string;
}

export class ProviderHealthMonitorService {
  private static instance: ProviderHealthMonitorService;
  private healthStateMap: Map<string, HealthMetrics> = new Map();

  private constructor() {
    this.seedHealthState();
  }

  public static getInstance(): ProviderHealthMonitorService {
    if (!ProviderHealthMonitorService.instance) {
      ProviderHealthMonitorService.instance = new ProviderHealthMonitorService();
    }
    return ProviderHealthMonitorService.instance;
  }

  private seedHealthState(): void {
    const defaultStates: HealthMetrics[] = [
      {
        providerId: 'flutterwave',
        providerName: 'Flutterwave Gateway Core',
        healthState: 'HEALTHY',
        latencyP95Ms: 1420,
        successRate5mPct: 98.6,
        consecutiveTimeouts: 0,
        circuitBreakerTripped: false,
        lastHeartbeatTime: new Date().toISOString()
      },
      {
        providerId: 'mtn_momo',
        providerName: 'MTN Mobile Money Direct API',
        healthState: 'HEALTHY',
        latencyP95Ms: 820,
        successRate5mPct: 99.4,
        consecutiveTimeouts: 0,
        circuitBreakerTripped: false,
        lastHeartbeatTime: new Date().toISOString()
      },
      {
        providerId: 'airtel_money',
        providerName: 'Airtel Money Express Rail',
        healthState: 'HEALTHY',
        latencyP95Ms: 980,
        successRate5mPct: 98.1,
        consecutiveTimeouts: 0,
        circuitBreakerTripped: false,
        lastHeartbeatTime: new Date().toISOString()
      },
      {
        providerId: 'direct_bank',
        providerName: 'Direct Bank Settlement ACH Pool',
        healthState: 'HEALTHY',
        latencyP95Ms: 3100,
        successRate5mPct: 99.9,
        consecutiveTimeouts: 0,
        circuitBreakerTripped: false,
        lastHeartbeatTime: new Date().toISOString()
      }
    ];

    for (const h of defaultStates) {
      this.healthStateMap.set(h.providerId, h);
    }
  }

  public getAllHealthMetrics(): HealthMetrics[] {
    return Array.from(this.healthStateMap.values());
  }

  public simulateProviderDegradation(providerId: string, state: 'HEALTHY' | 'DEGRADED' | 'OUTAGE'): HealthMetrics {
    const current = this.healthStateMap.get(providerId);
    if (!current) throw new Error(`Provider ${providerId} not found`);

    current.healthState = state;
    current.circuitBreakerTripped = state === 'OUTAGE';
    current.successRate5mPct = state === 'OUTAGE' ? 42.0 : state === 'DEGRADED' ? 84.5 : 99.1;
    current.latencyP95Ms = state === 'OUTAGE' ? 8500 : state === 'DEGRADED' ? 4200 : 900;
    current.lastHeartbeatTime = new Date().toISOString();

    return current;
  }
}

export const providerHealthMonitor = ProviderHealthMonitorService.getInstance();
