export interface SystemComponentHealth {
  componentId: string;
  componentName: 'CORE_KERNEL' | 'DOUBLE_ENTRY_LEDGER' | 'PROVIDER_CONNECTOR_MESH' | 'GEMINI_COGNITIVE_AGENT' | 'RECONCILIATION_ENGINE' | 'HSM_SECURITY_VAULT';
  status: 'ONLINE_OPTIMAL' | 'DEGRADED_LATENCY' | 'CIRCUIT_TRIPPED' | 'STANDBY_FAILOVER';
  uptimeSla30dPct: number;
  currentLatencyMs: number;
  queueDepthMessages: number;
  errorRate30sPct: number;
  lastHeartbeat: string;
}

export interface NetworkHealthOverview {
  overallSystemStatus: 'HEALTHY_ALL_SYSTEMS_GO' | 'AUTONOMOUS_HEALING_ACTIVE' | 'CRITICAL_OUTAGE';
  activeComponentCount: number;
  systemThroughputTps: number;
  avgNetworkLatencyMs: number;
  components: SystemComponentHealth[];
}

export class HealthOrchestratorService {
  private static instance: HealthOrchestratorService;

  private components: SystemComponentHealth[] = [
    {
      componentId: 'CMP-KERNEL-01',
      componentName: 'CORE_KERNEL',
      status: 'ONLINE_OPTIMAL',
      uptimeSla30dPct: 99.998,
      currentLatencyMs: 1.2,
      queueDepthMessages: 12,
      errorRate30sPct: 0.00,
      lastHeartbeat: new Date().toISOString()
    },
    {
      componentId: 'CMP-LEDGER-02',
      componentName: 'DOUBLE_ENTRY_LEDGER',
      status: 'ONLINE_OPTIMAL',
      uptimeSla30dPct: 100.0,
      currentLatencyMs: 2.8,
      queueDepthMessages: 0,
      errorRate30sPct: 0.00,
      lastHeartbeat: new Date().toISOString()
    },
    {
      componentId: 'CMP-MESH-03',
      componentName: 'PROVIDER_CONNECTOR_MESH',
      status: 'ONLINE_OPTIMAL',
      uptimeSla30dPct: 99.95,
      currentLatencyMs: 14.5,
      queueDepthMessages: 48,
      errorRate30sPct: 0.01,
      lastHeartbeat: new Date().toISOString()
    },
    {
      componentId: 'CMP-GEMINI-04',
      componentName: 'GEMINI_COGNITIVE_AGENT',
      status: 'ONLINE_OPTIMAL',
      uptimeSla30dPct: 99.98,
      currentLatencyMs: 320,
      queueDepthMessages: 3,
      errorRate30sPct: 0.00,
      lastHeartbeat: new Date().toISOString()
    },
    {
      componentId: 'CMP-REC-05',
      componentName: 'RECONCILIATION_ENGINE',
      status: 'ONLINE_OPTIMAL',
      uptimeSla30dPct: 99.99,
      currentLatencyMs: 8.4,
      queueDepthMessages: 0,
      errorRate30sPct: 0.00,
      lastHeartbeat: new Date().toISOString()
    },
    {
      componentId: 'CMP-HSM-06',
      componentName: 'HSM_SECURITY_VAULT',
      status: 'ONLINE_OPTIMAL',
      uptimeSla30dPct: 100.0,
      currentLatencyMs: 0.8,
      queueDepthMessages: 0,
      errorRate30sPct: 0.00,
      lastHeartbeat: new Date().toISOString()
    }
  ];

  private constructor() {}

  public static getInstance(): HealthOrchestratorService {
    if (!HealthOrchestratorService.instance) {
      HealthOrchestratorService.instance = new HealthOrchestratorService();
    }
    return HealthOrchestratorService.instance;
  }

  public getHealthOverview(): NetworkHealthOverview {
    const degraded = this.components.filter(c => c.status !== 'ONLINE_OPTIMAL');
    return {
      overallSystemStatus: degraded.length > 0 ? 'AUTONOMOUS_HEALING_ACTIVE' : 'HEALTHY_ALL_SYSTEMS_GO',
      activeComponentCount: this.components.length,
      systemThroughputTps: 18400,
      avgNetworkLatencyMs: 4.8,
      components: this.components.map(c => ({ ...c, lastHeartbeat: new Date().toISOString() }))
    };
  }

  public simulateComponentDegradation(componentName: SystemComponentHealth['componentName']): SystemComponentHealth {
    const comp = this.components.find(c => c.componentName === componentName);
    if (comp) {
      comp.status = 'DEGRADED_LATENCY';
      comp.currentLatencyMs = 2800;
      comp.queueDepthMessages = 1250;
      comp.errorRate30sPct = 8.5;
    }
    return { ...comp! };
  }

  public restoreAllOptimal(): NetworkHealthOverview {
    for (const c of this.components) {
      c.status = 'ONLINE_OPTIMAL';
      c.currentLatencyMs = Math.floor(Math.random() * 10 + 2);
      c.queueDepthMessages = Math.floor(Math.random() * 5);
      c.errorRate30sPct = 0;
    }
    return this.getHealthOverview();
  }
}

export const healthOrchestrator = HealthOrchestratorService.getInstance();
