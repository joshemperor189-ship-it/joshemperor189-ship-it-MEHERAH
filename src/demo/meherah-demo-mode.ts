import { PersonalityExplainerEngine, AnalyticalExplanation } from '../core/personality-explainer';

export interface DemoMissionPreset {
  id: string;
  title: string;
  category: string;
  prompt: string;
  assignedAgents: string[];
  executionSteps: {
    step: number;
    agentName: string;
    actionDescription: string;
    outputSnippet: string;
  }[];
  explanation: AnalyticalExplanation;
  finalDeliverables: {
    title: string;
    content: string;
  }[];
}

export class MeherahDemoEngine {
  public static readonly DEMO_LABEL = 'DEMO DATA — NO REAL TRANSACTIONS EXECUTED';

  private static demoPresets: DemoMissionPreset[] = [
    {
      id: 'demo_uganda_coffee',
      title: 'Coffee Export Expansion Strategy (Uganda → East Africa)',
      category: 'BUSINESS & TRADE',
      prompt: 'Create a coffee export expansion strategy for Uganda entering Kenya, Tanzania, and Rwanda.',
      assignedAgents: ['Chief Agent', 'Research Specialist', 'Financial Analyst', 'Executive Writer'],
      executionSteps: [
        {
          step: 1,
          agentName: 'Chief Agent',
          actionDescription: 'Formulating multi-agent strategy DAG and setting governance boundary checks.',
          outputSnippet: 'Plan established: 3-phase regional rollout with B2B warehousing prioritization.'
        },
        {
          step: 2,
          agentName: 'Research Specialist',
          actionDescription: 'Ingesting East African Community (EAC) Trade Accords & Mombasa/Dar es Salaam port traffic data.',
          outputSnippet: 'Section 4.2 EAC tariff exemption verified for agricultural export cooperatives.'
        },
        {
          step: 3,
          agentName: 'Financial Analyst',
          actionDescription: 'Building 10-year cash flow model and multi-currency (UGX/KES/TZS/RWF) hedging bounds.',
          outputSnippet: 'Projected 22% reduction in initial capex by utilizing pre-vetted B2B hub partners.'
        },
        {
          step: 4,
          agentName: 'Executive Writer',
          actionDescription: 'Synthesizing Executive Strategy Report and policy compliance audit trail.',
          outputSnippet: 'Final Briefing complete with 97.5% empirical confidence score.'
        }
      ],
      explanation: PersonalityExplainerEngine.synthesizeExplanation('Ugandan Coffee EAC Expansion', 97.5),
      finalDeliverables: [
        {
          title: 'Executive Briefing & Strategic Corridor Roadmap',
          content: 'Recommended initializing Mombasa B2B hub before establishing retail channels, securing 14% market share within 18 months.'
        },
        {
          title: 'Financial Model & FX Exposure Limits',
          content: 'UGX/USD hedging bounds configured with +/- 4.2% tolerance buffer to protect against inflation spikes.'
        },
        {
          title: 'Governance & Compliance Verification',
          content: 'All actions passed zero-trust policy checks. Zero unauthorized financial disbursements attempted.'
        }
      ]
    },
    {
      id: 'demo_financial_health',
      title: 'Corporate Financial Health & Liquidity Stress Test',
      category: 'FINANCIAL ANALYSIS',
      prompt: 'Analyse a company\'s financial health and perform liquidity burn rate stress tests.',
      assignedAgents: ['Chief Agent', 'Financial Analyst', 'Security Specialist'],
      executionSteps: [
        {
          step: 1,
          agentName: 'Chief Agent',
          actionDescription: 'Initializing financial metrics ingestion pipeline.',
          outputSnippet: 'Metrics ingested: Balance Sheet, Cash Flow, Accounts Receivable aging.'
        },
        {
          step: 2,
          agentName: 'Financial Analyst',
          actionDescription: 'Running 12-month burn rate scenarios under 15% revenue decline assumptions.',
          outputSnippet: 'Current runway: 18.4 months. Working capital ratio stands at 2.1x.'
        },
        {
          step: 3,
          agentName: 'Security Specialist',
          actionDescription: 'Auditing banking permissions and credential rotation logs.',
          outputSnippet: 'Zero unauthorized access logs detected. Policy compliance score: 100%.'
        }
      ],
      explanation: PersonalityExplainerEngine.synthesizeExplanation('Corporate Liquidity Stress Test', 95.0),
      finalDeliverables: [
        {
          title: 'Financial Health & Burn Analysis Report',
          content: 'Company maintains healthy 18.4-month runway. Working capital turnover is optimal.'
        },
        {
          title: 'Capital Optimization Recommendations',
          content: 'Recommend restructuring short-term debt to extend runway to 24+ months without dilutive equity.'
        }
      ]
    },
    {
      id: 'demo_tech_roadmap',
      title: 'Enterprise Technology Architecture Roadmap',
      category: 'SOFTWARE PLATFORM',
      prompt: 'Create a technology roadmap and microservices architecture design for high-concurrency platforms.',
      assignedAgents: ['Chief Agent', 'Coding Specialist', 'Security Specialist'],
      executionSteps: [
        {
          step: 1,
          agentName: 'Chief Agent',
          actionDescription: 'Parsing platform requirements and system SLA requirements.',
          outputSnippet: 'Requirement set: 99.99% uptime, sub-50ms API response latency.'
        },
        {
          step: 2,
          agentName: 'Coding Specialist',
          actionDescription: 'Drafting event-driven microservices schema with Redis caching and PostgreSQL storage.',
          outputSnippet: 'API specs compiled: 14 REST endpoints + WebSocket real-time channel.'
        },
        {
          step: 3,
          agentName: 'Security Specialist',
          actionDescription: 'Verifying zero-trust JWT authentication and rate-limiting boundaries.',
          outputSnippet: 'OAuth2/OIDC integration verified with strict role-based access control (RBAC).'
        }
      ],
      explanation: PersonalityExplainerEngine.synthesizeExplanation('Enterprise Platform Architecture', 98.0),
      finalDeliverables: [
        {
          title: '4-Phase Development Roadmap',
          content: 'Phase 1: Core API & DB Schema (Sprints 1-3). Phase 2: Microservices & Redis Caching (Sprints 4-6).'
        },
        {
          title: 'Security & Compliance Blueprint',
          content: 'Zero-trust network architecture with end-to-end payload encryption and automated audit logs.'
        }
      ]
    },
    {
      id: 'demo_emerging_market',
      title: 'Emerging Market Intelligence Study',
      category: 'GLOBAL RESEARCH',
      prompt: 'Research an emerging market opportunity in West African fintech and logistics.',
      assignedAgents: ['Chief Agent', 'Research Specialist', 'Financial Analyst'],
      executionSteps: [
        {
          step: 1,
          agentName: 'Chief Agent',
          actionDescription: 'Setting research scope across West African economic zones.',
          outputSnippet: 'Scope locked: Nigeria, Ghana, Senegal commercial tech sectors.'
        },
        {
          step: 2,
          agentName: 'Research Specialist',
          actionDescription: 'Analyzing cross-border mobile money interoperability and regulatory guidelines.',
          outputSnippet: 'PAPSS settlement adoption growing at 38% YoY across regional central banks.'
        },
        {
          step: 3,
          agentName: 'Financial Analyst',
          actionDescription: 'Modeling transaction volume forecasts and foreign exchange conversion costs.',
          outputSnippet: 'Estimated annual market opportunity: $420M addressable digital trade volume.'
        }
      ],
      explanation: PersonalityExplainerEngine.synthesizeExplanation('West African Market Opportunity', 94.0),
      finalDeliverables: [
        {
          title: 'Emerging Market Intelligence Brief',
          content: 'High growth potential in cross-border trade settlement with 38% annual expansion.'
        },
        {
          title: 'Strategic Market Entry Advice',
          content: 'Partner with licensed local clearing houses to satisfy regulatory capital requirements.'
        }
      ]
    }
  ];

  public static getDemoPresets(): DemoMissionPreset[] {
    return this.demoPresets;
  }

  public static getDemoPresetById(id: string): DemoMissionPreset | undefined {
    return this.demoPresets.find((p) => p.id === id);
  }
}
