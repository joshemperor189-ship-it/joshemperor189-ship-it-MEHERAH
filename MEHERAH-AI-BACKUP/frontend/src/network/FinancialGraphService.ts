export interface GraphNode {
  id: string;
  label: string;
  type: 'USER' | 'WALLET' | 'BANK' | 'MOBILE_MONEY' | 'GATEWAY' | 'LIQUIDITY_POOL';
  status: 'HEALTHY' | 'DEGRADED' | 'CONGESTED' | 'OUTAGE';
  balanceOrThroughputUGX: number;
  location: string;
  reliabilityScorePct: number;
}

export interface GraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  flowVolume24hUGX: number;
  averageLatencyMs: number;
  activeStatus: 'OPTIMAL' | 'FALLBACK_ACTIVE' | 'THROTTLED';
  failureRatePct: number;
}

export interface FinancialGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  summary: {
    totalActiveNodes: number;
    totalEdges: number;
    networkHealthIndexPct: number;
    totalNetworkVolumeUGX: number;
    topBottleneckNode: string;
  };
}

export class FinancialGraphService {
  private static instance: FinancialGraphService;

  private graphData: FinancialGraphData = {
    nodes: [
      { id: 'node_usr_01', label: 'User Kato (MEHERAH ID)', type: 'USER', status: 'HEALTHY', balanceOrThroughputUGX: 184500000, location: 'Kampala, UG', reliabilityScorePct: 100 },
      { id: 'node_wal_01', label: 'MEHERAH Master Wallet', type: 'WALLET', status: 'HEALTHY', balanceOrThroughputUGX: 84000000, location: 'Cloud Edge UG', reliabilityScorePct: 99.9 },
      { id: 'node_momo_mtn', label: 'MTN MoMo Core', type: 'MOBILE_MONEY', status: 'HEALTHY', balanceOrThroughputUGX: 50000000, location: 'MTN Telecom Node', reliabilityScorePct: 99.2 },
      { id: 'node_momo_airtel', label: 'Airtel Money Express', type: 'MOBILE_MONEY', status: 'HEALTHY', balanceOrThroughputUGX: 35000000, location: 'Airtel Core', reliabilityScorePct: 97.9 },
      { id: 'node_gw_flw', label: 'Flutterwave Gateway', type: 'GATEWAY', status: 'HEALTHY', balanceOrThroughputUGX: 120000000, location: 'Lagos & London Edge', reliabilityScorePct: 98.4 },
      { id: 'node_bnk_stanbic', label: 'Stanbic Bank ACH', type: 'BANK', status: 'HEALTHY', balanceOrThroughputUGX: 300000000, location: 'Bank ACH Clearing', reliabilityScorePct: 99.9 },
      { id: 'node_pool_treasury', label: 'MEHERAH Treasury Pool', type: 'LIQUIDITY_POOL', status: 'HEALTHY', balanceOrThroughputUGX: 589000000, location: 'Multi-Vault Reserve', reliabilityScorePct: 100 }
    ],
    edges: [
      { id: 'e1', sourceNodeId: 'node_usr_01', targetNodeId: 'node_wal_01', flowVolume24hUGX: 14250000, averageLatencyMs: 120, activeStatus: 'OPTIMAL', failureRatePct: 0.01 },
      { id: 'e2', sourceNodeId: 'node_wal_01', targetNodeId: 'node_momo_mtn', flowVolume24hUGX: 28500000, averageLatencyMs: 850, activeStatus: 'OPTIMAL', failureRatePct: 0.8 },
      { id: 'e3', sourceNodeId: 'node_wal_01', targetNodeId: 'node_momo_airtel', flowVolume24hUGX: 18200000, averageLatencyMs: 920, activeStatus: 'OPTIMAL', failureRatePct: 1.5 },
      { id: 'e4', sourceNodeId: 'node_wal_01', targetNodeId: 'node_gw_flw', flowVolume24hUGX: 42000000, averageLatencyMs: 1400, activeStatus: 'OPTIMAL', failureRatePct: 1.2 },
      { id: 'e5', sourceNodeId: 'node_wal_01', targetNodeId: 'node_bnk_stanbic', flowVolume24hUGX: 95000000, averageLatencyMs: 3200, activeStatus: 'OPTIMAL', failureRatePct: 0.1 },
      { id: 'e6', sourceNodeId: 'node_pool_treasury', targetNodeId: 'node_wal_01', flowVolume24hUGX: 150000000, averageLatencyMs: 450, activeStatus: 'OPTIMAL', failureRatePct: 0.0 }
    ],
    summary: {
      totalActiveNodes: 7,
      totalEdges: 6,
      networkHealthIndexPct: 99.2,
      totalNetworkVolumeUGX: 347950000,
      topBottleneckNode: 'Flutterwave Gateway (High Peak Latency)'
    }
  };

  private constructor() {}

  public static getInstance(): FinancialGraphService {
    if (!FinancialGraphService.instance) {
      FinancialGraphService.instance = new FinancialGraphService();
    }
    return FinancialGraphService.instance;
  }

  public getGraph(): FinancialGraphData {
    return this.graphData;
  }
}

export const financialGraphService = FinancialGraphService.getInstance();
