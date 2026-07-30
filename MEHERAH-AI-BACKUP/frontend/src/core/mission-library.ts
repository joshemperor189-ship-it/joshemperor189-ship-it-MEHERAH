export type MissionCategory = 'BUSINESS' | 'FINANCE' | 'RESEARCH' | 'SOFTWARE';
export type MissionRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface MissionTemplate {
  id: string;
  title: string;
  category: MissionCategory;
  description: string;
  prompt: string;
  requiredAgents: string[];
  expectedOutputs: string[];
  estimatedCompletionTimeMinutes: number;
  riskLevel: MissionRiskLevel;
  requiresGovernanceApproval: boolean;
}

export class MissionLibrary {
  private static templates: MissionTemplate[] = [
    // --- BUSINESS CATEGORY ---
    {
      id: 'biz_expansion_strat',
      title: 'Create a business expansion strategy',
      category: 'BUSINESS',
      description: 'Formulate a regional market entry roadmap, B2B distribution model, and risk mitigation framework.',
      prompt: 'Create a comprehensive expansion strategy for entering high-growth regional markets with B2B distribution and risk hedges.',
      requiredAgents: ['Chief', 'Research Specialist', 'Financial Analyst', 'Executive Writer'],
      expectedOutputs: [
        'Market Entry Corridor Prioritization Matrix',
        'B2B Logistics & Warehousing Blueprint',
        '3-Year Expansion Roadmap & Risk Mitigations'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },
    {
      id: 'biz_competitor_analysis',
      title: 'Analyse competitors',
      category: 'BUSINESS',
      description: 'Evaluate competitive landscape, pricing dynamics, market share, and strategic moats.',
      prompt: 'Conduct an in-depth competitor analysis identifying market positioning, pricing structures, and competitive advantages.',
      requiredAgents: ['Chief', 'Research Specialist', 'Executive Writer'],
      expectedOutputs: [
        'Competitor Feature & Pricing Benchmark Grid',
        'SWOT Matrix across Top 5 Market Competitors',
        'Strategic Positioning & Differentiation Guidance'
      ],
      estimatedCompletionTimeMinutes: 1,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },
    {
      id: 'biz_market_opportunities',
      title: 'Find new market opportunities',
      category: 'BUSINESS',
      description: 'Identify underserved market niches, customer pain points, and high-margin product extensions.',
      prompt: 'Identify top unaddressed market opportunities and high-growth niches within the regional commercial landscape.',
      requiredAgents: ['Chief', 'Research Specialist', 'Financial Analyst'],
      expectedOutputs: [
        'Top 3 High-Growth Niche Profiles',
        'Addressable Market (TAM/SAM/SOM) Estimates',
        'Go-to-Market Action Plan'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },
    {
      id: 'biz_investment_proposal',
      title: 'Create investment proposal',
      category: 'BUSINESS',
      description: 'Synthesize pitch decks, valuation metrics, capital requirements, and investor exit projections.',
      prompt: 'Draft an executive investment proposal complete with market opportunity analysis, capital request, and return projections.',
      requiredAgents: ['Chief', 'Financial Analyst', 'Executive Writer'],
      expectedOutputs: [
        'Executive Investment Memo',
        'Use of Funds & Capital Structure Breakdown',
        '5-Year Projected IRR & Valuation Sensitivity Analysis'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'MEDIUM',
      requiresGovernanceApproval: true
    },

    // --- FINANCE CATEGORY ---
    {
      id: 'fin_cashflow_analysis',
      title: 'Analyse cash flow',
      category: 'FINANCE',
      description: 'Examine operating cash flows, working capital cycles, and burn rates under stress conditions.',
      prompt: 'Perform a comprehensive cash flow analysis evaluating operational burn, liquidity buffers, and working capital efficiency.',
      requiredAgents: ['Chief', 'Financial Analyst'],
      expectedOutputs: [
        'Monthly Operational Cash Flow Schedule',
        'Working Capital Turnover & Burn Analysis',
        'Liquidity Runway Stress Test Report'
      ],
      estimatedCompletionTimeMinutes: 1,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },
    {
      id: 'fin_risk_identification',
      title: 'Identify financial risks',
      category: 'FINANCE',
      description: 'Audit foreign exchange exposures, interest rate volatility, and counterparty credit risks.',
      prompt: 'Audit current financial operations for currency risk, inflation exposures, and credit default hazards.',
      requiredAgents: ['Chief', 'Financial Analyst', 'Security Specialist'],
      expectedOutputs: [
        'FX Exposure & Inflation Vulnerability Matrix',
        'Counterparty Risk Index',
        'Recommended Hedging & Buffer Strategies'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'MEDIUM',
      requiresGovernanceApproval: false
    },
    {
      id: 'fin_forecast_model',
      title: 'Create financial forecast',
      category: 'FINANCE',
      description: 'Build multi-year revenue projections, expense modeling, and breakeven timelines.',
      prompt: 'Build a 5-year financial forecast model detailing revenue drivers, gross margins, and net EBITDA trajectories.',
      requiredAgents: ['Chief', 'Financial Analyst', 'Executive Writer'],
      expectedOutputs: [
        '5-Year Income Statement & Balance Sheet Projections',
        'Breakeven Analysis & Margin Thresholds',
        'Key Performance Metrics Summary'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },

    // --- RESEARCH CATEGORY ---
    {
      id: 'res_industry_study',
      title: 'Research an industry',
      category: 'RESEARCH',
      description: 'Gather macro industry trends, regulatory frameworks, supply chain bottlenecks, and growth drivers.',
      prompt: 'Conduct a thorough industry study analyzing regulatory accords, demand trends, supply chains, and growth drivers.',
      requiredAgents: ['Chief', 'Research Specialist', 'Executive Writer'],
      expectedOutputs: [
        'Industry Value Chain Map',
        'Regulatory Accord & Compliance Summary',
        '5-Year Industry Growth Outlook'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },
    {
      id: 'res_regional_markets',
      title: 'Analyse regional markets',
      category: 'RESEARCH',
      description: 'Evaluate cross-border trade accords, tariff structures, transit frequency, and regional demand dynamics.',
      prompt: 'Analyse regional markets across East Africa focusing on cross-border logistics, customs tariffs, and local demand.',
      requiredAgents: ['Chief', 'Research Specialist'],
      expectedOutputs: [
        'Cross-Border Transit & Tariff Index',
        'Regional Port & Logistics Hub Ranking',
        'Demand Volatility Assessment'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },
    {
      id: 'res_economic_trends',
      title: 'Summarize economic trends',
      category: 'RESEARCH',
      description: 'Synthesize macroeconomic indicators, inflation trends, central bank policies, and trade balances.',
      prompt: 'Synthesize current macroeconomic indicators, inflation trajectories, and monetary policy impacts for strategic planning.',
      requiredAgents: ['Chief', 'Research Specialist', 'Financial Analyst'],
      expectedOutputs: [
        'Macroeconomic Benchmark Summary',
        'Inflation & Interest Rate Impact Assessment',
        'Executive Economic Outlook Report'
      ],
      estimatedCompletionTimeMinutes: 1,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    },

    // --- SOFTWARE CATEGORY ---
    {
      id: 'soft_app_design',
      title: 'Design an application',
      category: 'SOFTWARE',
      description: 'Architect a modern software platform blueprint with API specifications, database schema, and deployment pipeline.',
      prompt: 'Architect a software application design including user interface components, API endpoints, database schema, and security layers.',
      requiredAgents: ['Chief', 'Coding Specialist', 'Security Specialist'],
      expectedOutputs: [
        'System Component & Data Flow Diagram',
        'REST / GraphQL API Endpoint Specifications',
        'Database Schema (Drizzle / Prisma) Definition'
      ],
      estimatedCompletionTimeMinutes: 2,
      riskLevel: 'MEDIUM',
      requiresGovernanceApproval: false
    },
    {
      id: 'soft_arch_review',
      title: 'Review architecture',
      category: 'SOFTWARE',
      description: 'Audit cloud infrastructure, microservices security, database index efficiency, and API scalability.',
      prompt: 'Perform a comprehensive technical architecture review identifying bottlenecks, security gaps, and scaling recommendations.',
      requiredAgents: ['Chief', 'Coding Specialist', 'Security Specialist'],
      expectedOutputs: [
        'Architectural Health & Security Scorecard',
        'Identified Bottlenecks & Vulnerability Log',
        'Refactoring & Infrastructure Optimization Plan'
      ],
      estimatedCompletionTimeMinutes: 1,
      riskLevel: 'MEDIUM',
      requiresGovernanceApproval: false
    },
    {
      id: 'soft_dev_roadmap',
      title: 'Create development roadmap',
      category: 'SOFTWARE',
      description: 'Structure sprint milestones, technical debt remediation, and feature delivery timelines.',
      prompt: 'Develop an engineering execution roadmap detailing sprint phases, resource allocation, and feature delivery milestones.',
      requiredAgents: ['Chief', 'Coding Specialist', 'Executive Writer'],
      expectedOutputs: [
        '4-Phase Engineering Sprint Plan',
        'Resource Estimation & Tech Stack Dependencies',
        'Risk & Quality Assurance Checklist'
      ],
      estimatedCompletionTimeMinutes: 1,
      riskLevel: 'LOW',
      requiresGovernanceApproval: false
    }
  ];

  public static getTemplatesByCategory(category?: MissionCategory): MissionTemplate[] {
    if (!category) return this.templates;
    return this.templates.filter((t) => t.category === category);
  }

  public static getTemplateById(id: string): MissionTemplate | undefined {
    return this.templates.find((t) => t.id === id);
  }

  public static getAllTemplates(): MissionTemplate[] {
    return this.templates;
  }
}
