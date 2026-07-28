import { aiGateway, AIProviderResponse } from '../ai/gateway.ts';

export interface MeherahAgentSpec {
  id: string;
  name: string;
  emoji: string;
  role: string;
  description: string;
  systemInstruction: string;
}

export const MEHERAH_AGENTS: MeherahAgentSpec[] = [
  {
    id: 'chief_agent',
    name: 'Chief Agent',
    emoji: '🧠',
    role: 'Central Orchestrator',
    description: 'Central goal analyzer, task decomposer, and quality gatekeeper',
    systemInstruction: 'You are Chief Agent (🧠) of MEHERAH OS. You orchestrate tasks, decompose complex user directives, and coordinate specialized sub-agents.'
  },
  {
    id: 'research_agent',
    name: 'Research Agent',
    emoji: '🔎',
    role: 'Market Intelligence',
    description: 'Scrapes market dynamics, competitor intelligence, and regulatory frameworks',
    systemInstruction: 'You are Research Agent (🔎) of MEHERAH OS. You analyze market data, competitor landscapes, regulatory compliance, and web findings.'
  },
  {
    id: 'knowledge_agent',
    name: 'Knowledge Agent',
    emoji: '📝',
    role: 'Memory & Context Indexer',
    description: 'Retrieves long-term memories, preferences, and synthesizes operating context',
    systemInstruction: 'You are Knowledge Agent (📝) of MEHERAH OS. You index operating memories, extract key facts, and maintain persistent system context.'
  },
  {
    id: 'finance_agent',
    name: 'Finance Agent',
    emoji: '💳',
    role: 'Treasury & Liquidity Engine',
    description: 'Calculates non-linear fee curves, optimizes cross-border sweeps, and manages liquidity',
    systemInstruction: 'You are Finance Agent (💳) of MEHERAH OS. You specialize in financial treasury operations, mobile money routing, zero-knowledge proofs, and yield optimization.'
  },
  {
    id: 'planning_agent',
    name: 'Planning Agent',
    emoji: '📅',
    role: 'Timeline & Milestones',
    description: 'Formulates strategy phases, milestone timelines, and resource budgets',
    systemInstruction: 'You are Planning Agent (📅) of MEHERAH OS. You structure step-by-step milestones, execution timelines, and resource allocation graphs.'
  },
  {
    id: 'strategy_agent',
    name: 'Strategy Agent',
    emoji: '🎯',
    role: 'Strategic Growth Engine',
    description: 'Builds go-to-market strategies, growth blueprints, and positioning roadmaps',
    systemInstruction: 'You are Strategy Agent (🎯) of MEHERAH OS. You formulate competitive positioning, growth frameworks, and high-impact strategic proposals.'
  },
  {
    id: 'creative_agent',
    name: 'Creative Agent',
    emoji: '🎨',
    role: 'Branding & Copywriting',
    description: 'Synthesizes branding, premium concept proposals, slogans, and marketing collateral',
    systemInstruction: 'You are Creative Agent (🎨) of MEHERAH OS. You craft luxury copy, brand identities, slogans, and visual marketing assets.'
  },
  {
    id: 'operations_agent',
    name: 'Operations Agent',
    emoji: '⚙️',
    role: 'Process & Compliance Inspector',
    description: 'Executes automated workflows, checks system SLAs, and performs risk stress-tests',
    systemInstruction: 'You are Operations Agent (⚙️) of MEHERAH OS. You verify system processes, audit SLA performance, and ensure smooth operational execution.'
  }
];

export class AIService {
  public getAgents(): MeherahAgentSpec[] {
    return MEHERAH_AGENTS;
  }

  public getAgentById(id: string): MeherahAgentSpec | undefined {
    return MEHERAH_AGENTS.find(a => a.id === id || a.name.toLowerCase().includes(id.toLowerCase()));
  }

  // Unified Agent Prompt Execution (ALL agents call Cloud AI Gateway)
  public async executeAgentPrompt(
    agentId: string,
    prompt: string,
    options?: {
      provider?: string;
      model?: string;
      temperature?: number;
    }
  ): Promise<{ agent: MeherahAgentSpec; response: AIProviderResponse }> {
    const agent = this.getAgentById(agentId) || MEHERAH_AGENTS[0];

    // Format prompt with agent persona
    const fullPrompt = `[AGENT ${agent.name.toUpperCase()} (${agent.emoji})] Task Request: ${prompt}`;

    // Pass through Cloud AI Gateway
    const gatewayResponse = await aiGateway.executeRequest({
      prompt: fullPrompt,
      provider: options?.provider,
      model: options?.model,
      agentId: agent.id,
      systemInstruction: agent.systemInstruction,
      temperature: options?.temperature ?? 0.7
    });

    return {
      agent,
      response: gatewayResponse
    };
  }
}

export const aiService = new AIService();
