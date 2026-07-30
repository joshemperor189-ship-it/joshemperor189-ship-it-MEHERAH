export interface IntelligenceAgentPackage {
  agentId: string;
  name: string;
  category: 'LIQUIDITY' | 'MERCHANT' | 'FRAUD_PREVENTION' | 'SME_LENDING' | 'FX_TRADE';
  description: string;
  author: string;
  version: string;
  status: 'ACTIVE_DEPLOYED' | 'AVAILABLE_IN_MARKETPLACE' | 'PAUSED';
  deploymentTarget: 'MEHERAH_CORE_KERNEL' | 'BANK_EDGE_NODE' | 'ENTERPRISE_PRIVATE_CLOUD';
  accuracyMetricPct: number;
  monthlyCostUSD: number;
}

export class IntelligenceMarketplaceService {
  private static instance: IntelligenceMarketplaceService;

  private agents: IntelligenceAgentPackage[] = [
    {
      agentId: 'agent_bank_liquidity',
      name: 'Bank Treasury Liquidity Rebalancer Agent',
      category: 'LIQUIDITY',
      description: 'Predicts high-value interbank clearing bottlenecks and automates ACH reserve rebalancing.',
      author: 'MEHERAH AI Labs',
      version: 'v3.1.0',
      status: 'ACTIVE_DEPLOYED',
      deploymentTarget: 'BANK_EDGE_NODE',
      accuracyMetricPct: 99.2,
      monthlyCostUSD: 1200
    },
    {
      agentId: 'agent_merchant_checkout',
      name: 'Smart Merchant Checkout & Route Splitter',
      category: 'MERCHANT',
      description: 'Splits retail cart checkouts dynamically across mobile money rails based on fee caps.',
      author: 'MEHERAH AI Labs',
      version: 'v2.4.1',
      status: 'ACTIVE_DEPLOYED',
      deploymentTarget: 'MEHERAH_CORE_KERNEL',
      accuracyMetricPct: 98.8,
      monthlyCostUSD: 450
    },
    {
      agentId: 'agent_fraud_sentinel',
      name: 'Neural AML & Structuring Sentinel Agent',
      category: 'FRAUD_PREVENTION',
      description: 'Monitors split transactions and velocity spikes in real-time with zero false positives.',
      author: 'FinTech Guard Systems',
      version: 'v4.0.0',
      status: 'ACTIVE_DEPLOYED',
      deploymentTarget: 'MEHERAH_CORE_KERNEL',
      accuracyMetricPct: 99.6,
      monthlyCostUSD: 2100
    },
    {
      agentId: 'agent_sme_underwriter',
      name: 'Autonomous SME Working Capital Credit Agent',
      category: 'SME_LENDING',
      description: 'Evaluates merchant cashflow history across linked mobile wallets to issue micro-lines.',
      author: 'MEHERAH Capital',
      version: 'v1.9.0',
      status: 'AVAILABLE_IN_MARKETPLACE',
      deploymentTarget: 'ENTERPRISE_PRIVATE_CLOUD',
      accuracyMetricPct: 96.4,
      monthlyCostUSD: 800
    },
    {
      agentId: 'agent_cross_border_fx',
      name: 'UGX/KES/USD Cross-Border FX Arbitrage Agent',
      category: 'FX_TRADE',
      description: 'Monitors regional central bank FX rate shifts and optimizes inter-currency corridors.',
      author: 'East Africa FX Hub',
      version: 'v2.0.2',
      status: 'AVAILABLE_IN_MARKETPLACE',
      deploymentTarget: 'ENTERPRISE_PRIVATE_CLOUD',
      accuracyMetricPct: 97.9,
      monthlyCostUSD: 1500
    }
  ];

  private constructor() {}

  public static getInstance(): IntelligenceMarketplaceService {
    if (!IntelligenceMarketplaceService.instance) {
      IntelligenceMarketplaceService.instance = new IntelligenceMarketplaceService();
    }
    return IntelligenceMarketplaceService.instance;
  }

  public getAgents(): IntelligenceAgentPackage[] {
    return [...this.agents];
  }

  public toggleAgentDeployment(agentId: string) {
    const ag = this.agents.find(a => a.agentId === agentId);
    if (ag) {
      ag.status = ag.status === 'ACTIVE_DEPLOYED' ? 'PAUSED' : 'ACTIVE_DEPLOYED';
    }
    return [...this.agents];
  }
}

export const intelligenceMarketplace = IntelligenceMarketplaceService.getInstance();
