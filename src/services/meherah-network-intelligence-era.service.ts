export interface GraphNode {
  id: string;
  name: string;
  category: 'COMMERCIAL_BANK' | 'CENTRAL_BANK' | 'MOBILE_MONEY' | 'PAYMENT_GATEWAY' | 'SOVEREIGN_NODE';
  country: string;
  reliabilityScore: number; // e.g. 99.8
  averageLatencyMs: number; // e.g. 140
  liquidityHealth: 'OPTIMAL' | 'MODERATE' | 'CRITICAL';
  activeConnectionsCount: number;
}

export interface GraphEdge {
  sourceId: string;
  targetId: string;
  corridor: string;
  throughputTps: number;
  successRatePct: number;
  avgLatencyMs: number;
  frictionScore: number; // 0 to 10 (0 = zero friction, 10 = severe friction)
  status: 'ACTIVE_OPTIMAL' | 'REROUTED_RECOMMENDED' | 'DEGRADED';
}

export interface AutonomousOptimizationAlert {
  id: string;
  timestamp: string;
  type: 'ROUTE_ADJUSTMENT' | 'FRICTION_WARNING' | 'LIQUIDITY_REBALANCE' | 'LATENCY_OPTIMIZATION';
  message: string;
  recommendedAction: string;
  impactEstimate: string;
  status: 'PROPOSED' | 'AUTO_EXECUTED' | 'ACKNOWLEDGED';
}

export interface GlobalCorridor {
  code: string;
  name: string;
  fromCurrency: string;
  toCurrency: string;
  dailyVolume: string;
  avgConversionRate: number;
  primaryRoute: string;
  fallbackRoute: string;
  settlementLatency: string;
  zeroLossGuarantee: boolean;
}

export interface DigitalStandardSpecification {
  pillar: string;
  standardName: string;
  codeReference: string;
  description: string;
  compatibilityStatus: 'UNIVERSAL_STANDARD' | 'FULLY_COMPLIANT';
}

export interface MarketplaceIntelligenceApp {
  id: string;
  name: string;
  author: string;
  category: 'TREASURY_AUTOMATION' | 'CROSS_BORDER_ANALYTICS' | 'PREDICTIVE_LIQUIDITY' | 'BUSINESS_PAYMENTS';
  description: string;
  activeDeployments: number;
  rating: number;
}

export class MeherahNetworkIntelligenceEraService {
  private nodes: GraphNode[] = [
    { id: 'node-postbank-ug', name: 'PostBank Uganda Ltd', category: 'COMMERCIAL_BANK', country: 'Uganda', reliabilityScore: 99.8, averageLatencyMs: 180, liquidityHealth: 'OPTIMAL', activeConnectionsCount: 8 },
    { id: 'node-bou-central', name: 'Bank of Uganda Sovereign Rail', category: 'CENTRAL_BANK', country: 'Uganda', reliabilityScore: 99.99, averageLatencyMs: 95, liquidityHealth: 'OPTIMAL', activeConnectionsCount: 14 },
    { id: 'node-safaricom-mpesa', name: 'Safaricom M-Pesa Enterprise', category: 'MOBILE_MONEY', country: 'Kenya', reliabilityScore: 99.9, averageLatencyMs: 140, liquidityHealth: 'OPTIMAL', activeConnectionsCount: 12 },
    { id: 'node-mtn-momo', name: 'MTN Mobile Money Uganda', category: 'MOBILE_MONEY', country: 'Uganda', reliabilityScore: 99.5, averageLatencyMs: 190, liquidityHealth: 'OPTIMAL', activeConnectionsCount: 9 },
    { id: 'node-flutterwave', name: 'Flutterwave Pan-Africa Gateway', category: 'PAYMENT_GATEWAY', country: 'Pan-Africa', reliabilityScore: 99.4, averageLatencyMs: 280, liquidityHealth: 'MODERATE', activeConnectionsCount: 15 },
    { id: 'node-bank-kigali', name: 'Bank of Kigali Vault', category: 'COMMERCIAL_BANK', country: 'Rwanda', reliabilityScore: 99.7, averageLatencyMs: 210, liquidityHealth: 'OPTIMAL', activeConnectionsCount: 6 },
    { id: 'node-ecobank', name: 'Ecobank Pan-African Rail', category: 'COMMERCIAL_BANK', country: 'Pan-Africa', reliabilityScore: 99.6, averageLatencyMs: 220, liquidityHealth: 'OPTIMAL', activeConnectionsCount: 11 }
  ];

  private edges: GraphEdge[] = [
    { sourceId: 'node-postbank-ug', targetId: 'node-safaricom-mpesa', corridor: 'UGX → KES', throughputTps: 450, successRatePct: 99.8, avgLatencyMs: 180, frictionScore: 0.8, status: 'ACTIVE_OPTIMAL' },
    { sourceId: 'node-mtn-momo', targetId: 'node-safaricom-mpesa', corridor: 'UGX → KES', throughputTps: 820, successRatePct: 99.4, avgLatencyMs: 195, frictionScore: 1.2, status: 'ACTIVE_OPTIMAL' },
    { sourceId: 'node-postbank-ug', targetId: 'node-bou-central', corridor: 'UGX Sovereign Clearing', throughputTps: 1200, successRatePct: 99.99, avgLatencyMs: 95, frictionScore: 0.1, status: 'ACTIVE_OPTIMAL' },
    { sourceId: 'node-flutterwave', targetId: 'node-bank-kigali', corridor: 'UGX → RWF', throughputTps: 310, successRatePct: 97.2, avgLatencyMs: 340, frictionScore: 4.5, status: 'REROUTED_RECOMMENDED' },
    { sourceId: 'node-ecobank', targetId: 'node-safaricom-mpesa', corridor: 'KES → TZS', throughputTps: 640, successRatePct: 99.6, avgLatencyMs: 220, frictionScore: 1.0, status: 'ACTIVE_OPTIMAL' }
  ];

  private alerts: AutonomousOptimizationAlert[] = [
    {
      id: 'OPT-2026-001',
      timestamp: new Date().toISOString(),
      type: 'ROUTE_ADJUSTMENT',
      message: 'Route success through Flutterwave → Bank of Kigali decreased by 2.8% due to intermediate gateway latency.',
      recommendedAction: 'Reroute UGX → RWF settlement directly through Bank of Uganda Sovereign Rail to Bank of Kigali Vault.',
      impactEstimate: 'Reduces latency by 130ms, restores success rate to 99.8%, saves 0.15% FX friction.',
      status: 'AUTO_EXECUTED'
    },
    {
      id: 'OPT-2026-002',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      type: 'LIQUIDITY_REBALANCE',
      message: 'Predictive model forecasts 40B UGX peak remittance volume in Kenya corridor between 12:00 - 15:00 EAT.',
      recommendedAction: 'Pre-allocate 5 Billion UGX pre-funding reserve at Safaricom M-Pesa Enterprise Rail.',
      impactEstimate: 'Prevents queue delays during peak hours, guarantees sub-200ms instant clearing.',
      status: 'AUTO_EXECUTED'
    },
    {
      id: 'OPT-2026-003',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      type: 'FRICTION_WARNING',
      message: 'Micro-friction detected on cross-border tax compliance check payload schema v1.2.',
      recommendedAction: 'Apply automated MEHERAH Universal Schema translation patch to normalize VAT field tags.',
      impactEstimate: 'Eliminates manual regulatory review holds for cross-border enterprise invoices.',
      status: 'PROPOSED'
    }
  ];

  public getIntelligenceGraphData() {
    return {
      nodes: this.nodes,
      edges: this.edges,
      networkIntelligenceScore: 99.6,
      totalActiveCorridors: 8,
      totalGraphThroughputTps: 3420
    };
  }

  public getAutonomousAlerts(): AutonomousOptimizationAlert[] {
    return this.alerts;
  }

  public getGlobalCorridors(): GlobalCorridor[] {
    return [
      { code: 'CORR-UG-KE', name: 'Uganda → Kenya', fromCurrency: 'UGX', toCurrency: 'KES', dailyVolume: '18.5 Billion UGX', avgConversionRate: 0.036, primaryRoute: 'PostBank ↔ Safaricom M-Pesa Direct', fallbackRoute: 'Bank of Uganda Sovereign Rail', settlementLatency: '180ms', zeroLossGuarantee: true },
      { code: 'CORR-KE-TZ', name: 'Kenya → Tanzania', fromCurrency: 'KES', toCurrency: 'TZS', dailyVolume: '12.4 Million KES', avgConversionRate: 18.2, primaryRoute: 'Safaricom ↔ Vodacom M-Pesa', fallbackRoute: 'Ecobank Pan-African Rail', settlementLatency: '220ms', zeroLossGuarantee: true },
      { code: 'CORR-NG-UG', name: 'Nigeria → Uganda', fromCurrency: 'NGN', toCurrency: 'UGX', dailyVolume: '₦420 Million NGN', avgConversionRate: 2.45, primaryRoute: 'Flutterwave ↔ MTN MoMo Direct', fallbackRoute: 'PostBank Vault', settlementLatency: '290ms', zeroLossGuarantee: true },
      { code: 'CORR-AF-GLOB', name: 'Africa → Global Markets', fromCurrency: 'UGX/KES', toCurrency: 'USD/GBP/EUR', dailyVolume: '$14.8 Million USD', avgConversionRate: 0.00027, primaryRoute: 'Sovereign Bank Clearing ↔ London Hub', fallbackRoute: 'Pan-African Treasury Reserve', settlementLatency: '380ms', zeroLossGuarantee: true }
    ];
  }

  public getDigitalStandardSpecs(): DigitalStandardSpecification[] {
    return [
      { pillar: 'COMMUNICATION', standardName: 'MEHERAH Universal Financial Language', codeReference: 'MHR-STD-101', description: 'Standardized ISO 20022 JSON/XML schema mapping eliminating custom adapter overhead.', compatibilityStatus: 'UNIVERSAL_STANDARD' },
      { pillar: 'VERIFICATION', standardName: 'Zero-Trust FIPS 140-2 HSM Proof', codeReference: 'MHR-STD-102', description: 'Mandatory FIPS 140-2 Level 3 Hardware Security Module payload signing.', compatibilityStatus: 'FULLY_COMPLIANT' },
      { pillar: 'TRANSACTION MEANING', standardName: 'Intent-Based Double-Entry Hash Ledger', codeReference: 'MHR-STD-103', description: 'Immutable hash-chained transaction semantics guaranteeing zero money loss.', compatibilityStatus: 'UNIVERSAL_STANDARD' },
      { pillar: 'INTELLIGENCE', standardName: 'Real-Time Telemetry & Outage Radar Protocol', codeReference: 'MHR-STD-104', description: '100ms provider latency and health reporting for self-healing route optimization.', compatibilityStatus: 'FULLY_COMPLIANT' }
    ];
  }

  public getMarketplaceApps(): MarketplaceIntelligenceApp[] {
    return [
      { id: 'APP-01', name: 'Multi-Sovereign Automated Treasury Sweeper', author: 'MEHERAH Labs', category: 'TREASURY_AUTOMATION', description: 'Automatically sweeps idle end-of-day balances across commercial bank accounts into central bank sovereign yield vaults.', activeDeployments: 42, rating: 4.9 },
      { id: 'APP-02', name: 'Predictive Cross-Border FX Liquidity Optimizer', author: 'Vanguard Quantum Labs', category: 'PREDICTIVE_LIQUIDITY', description: 'Forecasts corridor liquidity demand 24 hours in advance and auto-balances pre-funded buffer pools.', activeDeployments: 28, rating: 4.8 },
      { id: 'APP-03', name: 'Enterprise Instant Supplier Settlement Rail', author: 'Pan-African Trade Engine', category: 'BUSINESS_PAYMENTS', description: 'Enables instant zero-loss enterprise supplier payouts with automated tax and regulatory compliance receipts.', activeDeployments: 64, rating: 5.0 }
    ];
  }
}

export const meherahNetworkIntelligenceEraService = new MeherahNetworkIntelligenceEraService();
