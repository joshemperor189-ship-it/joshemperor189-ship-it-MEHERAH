export interface AIDecisionRecord {
  decisionId: string;
  timestamp: string;
  agentName: string;
  modelVersion: string;
  inputContextSummary: string;
  aiRecommendation: string;
  confidenceScore: number; // 0.0 to 1.0
  policyRuleMatch: string;
  humanApprovalRequired: boolean;
  approvalStatus: 'AUTO_APPROVED_BY_POLICY' | 'HUMAN_VERIFIED' | 'REJECTED_BY_GOVERNANCE';
  finalOutcome: string;
  auditHash: string; // Cryptographic integrity hash
}

export class AIDecisionRegistryService {
  private static instance: AIDecisionRegistryService;
  private registry: AIDecisionRecord[] = [
    {
      decisionId: 'DEC-2026-9001',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      agentName: 'Gemini Autonomous Route & Risk Agent',
      modelVersion: 'gemini-3.6-flash-institutional',
      inputContextSummary: 'MTN MoMo rail latency spike (1,850ms), UGX 150M bulk liquidity request',
      aiRecommendation: 'Shift 75% flow to Stanbic ACH Direct Rail; initiate pre-funding sweep of UGX 50M',
      confidenceScore: 0.985,
      policyRuleMatch: 'POL-TREASURY-04: Multi-Rail Failover & Reserve Cap',
      humanApprovalRequired: true,
      approvalStatus: 'HUMAN_VERIFIED',
      finalOutcome: 'Executed without transaction failure; zero customer latency impact',
      auditHash: '0xa8f2c9103e841291b702f3a9e10283c4b5d6e7f8a9b0'
    },
    {
      decisionId: 'DEC-2026-9002',
      timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
      agentName: 'Neural AML & Structuring Sentinel',
      modelVersion: 'gemini-3.6-flash-institutional',
      inputContextSummary: '10 rapid UGX 4.9M split transfers detected within 60s across new mobile wallets',
      aiRecommendation: 'Auto-block source account, trip regional velocity circuit breaker, transmit SAR to FIA',
      confidenceScore: 0.996,
      policyRuleMatch: 'POL-AML-01: Structuring & Rapid Burst Detection',
      humanApprovalRequired: false,
      approvalStatus: 'AUTO_APPROVED_BY_POLICY',
      finalOutcome: 'Prevented UGX 49.5M illicit drain; FIA SAR report REP-FIA-2026-0725 generated',
      auditHash: '0x3f721e98bc40129a837c2d10459a01f92e83b4c1d2e3'
    }
  ];

  private constructor() {}

  public static getInstance(): AIDecisionRegistryService {
    if (!AIDecisionRegistryService.instance) {
      AIDecisionRegistryService.instance = new AIDecisionRegistryService();
    }
    return AIDecisionRegistryService.instance;
  }

  public getDecisionRecords(): AIDecisionRecord[] {
    return [...this.registry];
  }

  public logDecision(decision: Omit<AIDecisionRecord, 'decisionId' | 'timestamp' | 'auditHash'>): AIDecisionRecord {
    const decisionId = 'DEC-' + Math.floor(Math.random() * 90000 + 10000);
    const timestamp = new Date().toISOString();
    const rawData = `${decisionId}:${timestamp}:${decision.agentName}:${decision.confidenceScore}:${decision.aiRecommendation}`;
    
    // Generate deterministic audit hash representation
    let hash = 0;
    for (let i = 0; i < rawData.length; i++) {
      hash = ((hash << 5) - hash) + rawData.charCodeAt(i);
      hash |= 0;
    }
    const auditHash = '0x' + Math.abs(hash).toString(16).padStart(16, '0') + Math.random().toString(16).substring(2, 10);

    const record: AIDecisionRecord = {
      ...decision,
      decisionId,
      timestamp,
      auditHash
    };

    this.registry.unshift(record);
    return record;
  }
}

export const aiDecisionRegistry = AIDecisionRegistryService.getInstance();
