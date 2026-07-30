/**
 * MEHERAH Financial Intelligence Graph (FIG)
 * Maps systemic relationships, node dependencies, liquidity flow paths, and cascade propagation vectors
 * across Central Banks, Commercial Banks, Mobile Money Operators, Merchants, and Wallets.
 */

export type FIGNodeType = 
  | 'CENTRAL_BANK'
  | 'COMMERCIAL_BANK'
  | 'MOBILE_MONEY'
  | 'PAYMENT_RAIL'
  | 'SETTLEMENT_ACCOUNT'
  | 'MERCHANT'
  | 'WALLET';

export interface FIGNode {
  id: string;
  name: string;
  type: FIGNodeType;
  resilienceScorePct: number;
  activeLiquidityUgx: number;
  criticalityTier: 'SYSTEMIC' | 'HIGH' | 'MEDIUM' | 'STANDARD';
}

export interface FIGEdge {
  sourceId: string;
  targetId: string;
  relationship: 'REGULATES' | 'SETTLES_THROUGH' | 'PROVIDES_LIQUIDITY_TO' | 'ROUTES_VIA' | 'HOLDS_FLOAT';
  volumeFlowUgxPerDay: number;
  latencyDependencyMs: number;
}

export interface PropagationImpactResult {
  failedNodeId: string;
  directlyImpactedNodeIds: string[];
  indirectlyImpactedNodeIds: string[];
  totalLiquidityAtRiskUgx: number;
  propagationRiskSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'SYSTEMIC_CRITICAL';
  suggestedMitigationRail: string;
}

export class FinancialIntelligenceGraph {
  private nodes: Map<string, FIGNode> = new Map();
  private edges: FIGEdge[] = [];

  constructor() {
    this.buildSovereignTopology();
  }

  private buildSovereignTopology(): void {
    // 1. Central Bank
    this.nodes.set('BOU', { id: 'BOU', name: 'Bank of Uganda (Central Bank)', type: 'CENTRAL_BANK', resilienceScorePct: 99.99, activeLiquidityUgx: 50000000000, criticalityTier: 'SYSTEMIC' });

    // 2. Payment Rails & Settlement Clearing
    this.nodes.set('RTGS_CLEARING', { id: 'RTGS_CLEARING', name: 'National RTGS Settlement Rail', type: 'PAYMENT_RAIL', resilienceScorePct: 99.95, activeLiquidityUgx: 30000000000, criticalityTier: 'SYSTEMIC' });
    this.nodes.set('ACH_CLEARING', { id: 'ACH_CLEARING', name: 'Automated Clearing House (ACH)', type: 'PAYMENT_RAIL', resilienceScorePct: 99.8, activeLiquidityUgx: 15000000000, criticalityTier: 'HIGH' });

    // 3. Commercial Banks
    this.nodes.set('STANBIC', { id: 'STANBIC', name: 'Stanbic Bank Uganda', type: 'COMMERCIAL_BANK', resilienceScorePct: 99.5, activeLiquidityUgx: 8000000000, criticalityTier: 'HIGH' });
    this.nodes.set('CENTENARY', { id: 'CENTENARY', name: 'Centenary Bank', type: 'COMMERCIAL_BANK', resilienceScorePct: 99.1, activeLiquidityUgx: 6000000000, criticalityTier: 'HIGH' });

    // 4. Mobile Money Operators
    this.nodes.set('MTN_MOMO', { id: 'MTN_MOMO', name: 'MTN Mobile Money', type: 'MOBILE_MONEY', resilienceScorePct: 98.2, activeLiquidityUgx: 1200000000, criticalityTier: 'HIGH' });
    this.nodes.set('AIRTEL_MONEY', { id: 'AIRTEL_MONEY', name: 'Airtel Money Uganda', type: 'MOBILE_MONEY', resilienceScorePct: 99.8, activeLiquidityUgx: 950000000, criticalityTier: 'HIGH' });

    // 5. Settlement Accounts & Merchants
    this.nodes.set('FLW_SETTLE', { id: 'FLW_SETTLE', name: 'Flutterwave Omnibus Vault', type: 'SETTLEMENT_ACCOUNT', resilienceScorePct: 99.0, activeLiquidityUgx: 2100000000, criticalityTier: 'MEDIUM' });
    this.nodes.set('ENTERPRISE_MERCHANT_1', { id: 'ENTERPRISE_MERCHANT_1', name: 'Jumia Uganda Corporate', type: 'MERCHANT', resilienceScorePct: 97.5, activeLiquidityUgx: 450000000, criticalityTier: 'STANDARD' });

    // Edges (Relationships)
    this.edges = [
      { sourceId: 'BOU', targetId: 'RTGS_CLEARING', relationship: 'REGULATES', volumeFlowUgxPerDay: 50000000000, latencyDependencyMs: 100 },
      { sourceId: 'RTGS_CLEARING', targetId: 'STANBIC', relationship: 'SETTLES_THROUGH', volumeFlowUgxPerDay: 8000000000, latencyDependencyMs: 1200 },
      { sourceId: 'RTGS_CLEARING', targetId: 'CENTENARY', relationship: 'SETTLES_THROUGH', volumeFlowUgxPerDay: 6000000000, latencyDependencyMs: 1500 },
      { sourceId: 'STANBIC', targetId: 'MTN_MOMO', relationship: 'PROVIDES_LIQUIDITY_TO', volumeFlowUgxPerDay: 1200000000, latencyDependencyMs: 4200 },
      { sourceId: 'CENTENARY', targetId: 'AIRTEL_MONEY', relationship: 'PROVIDES_LIQUIDITY_TO', volumeFlowUgxPerDay: 950000000, latencyDependencyMs: 1800 },
      { sourceId: 'AIRTEL_MONEY', targetId: 'FLW_SETTLE', relationship: 'ROUTES_VIA', volumeFlowUgxPerDay: 500000000, latencyDependencyMs: 2400 },
      { sourceId: 'FLW_SETTLE', targetId: 'ENTERPRISE_MERCHANT_1', relationship: 'HOLDS_FLOAT', volumeFlowUgxPerDay: 450000000, latencyDependencyMs: 500 }
    ];
  }

  /**
   * Analyzes network propagation if a specific node undergoes catastrophic failure or disconnection.
   */
  public analyzePropagation(targetNodeId: string): PropagationImpactResult {
    const directlyImpactedNodeIds: string[] = [];
    const indirectlyImpactedNodeIds: string[] = [];
    let totalLiquidityAtRiskUgx = 0;

    // Find direct dependents (where targetNodeId is the source)
    for (const edge of this.edges) {
      if (edge.sourceId === targetNodeId) {
        directlyImpactedNodeIds.push(edge.targetId);
        totalLiquidityAtRiskUgx += edge.volumeFlowUgxPerDay;
      }
    }

    // Find indirect dependents (second hop)
    for (const directId of directlyImpactedNodeIds) {
      for (const edge of this.edges) {
        if (edge.sourceId === directId && !directlyImpactedNodeIds.includes(edge.targetId) && edge.targetId !== targetNodeId) {
          indirectlyImpactedNodeIds.push(edge.targetId);
          totalLiquidityAtRiskUgx += edge.volumeFlowUgxPerDay * 0.5;
        }
      }
    }

    let severity: PropagationImpactResult['propagationRiskSeverity'] = 'LOW';
    if (totalLiquidityAtRiskUgx > 10000000000) {
      severity = 'SYSTEMIC_CRITICAL';
    } else if (totalLiquidityAtRiskUgx > 1000000000) {
      severity = 'HIGH';
    } else if (totalLiquidityAtRiskUgx > 200000000) {
      severity = 'MEDIUM';
    }

    const fallbackRail = targetNodeId === 'MTN_MOMO' ? 'AIRTEL_MONEY' : 'STANBIC_RTGS';

    return {
      failedNodeId: targetNodeId,
      directlyImpactedNodeIds,
      indirectlyImpactedNodeIds,
      totalLiquidityAtRiskUgx,
      propagationRiskSeverity: severity,
      suggestedMitigationRail: fallbackRail,
    };
  }

  /**
   * Calculates structural resilience & criticality ranking for all nodes in the financial network.
   */
  public getCriticalityRanking(): FIGNode[] {
    return Array.from(this.nodes.values()).sort((a, b) => b.activeLiquidityUgx - a.activeLiquidityUgx);
  }

  public getAllNodes(): FIGNode[] {
    return Array.from(this.nodes.values());
  }

  public getAllEdges(): FIGEdge[] {
    return this.edges;
  }
}
