export interface ConstitutionArticle {
  article: string;
  title: string;
  statement: string;
}

export interface EternalPrinciple {
  num: number;
  title: string;
  description: string;
}

export interface KernelIdentity {
  name: string;
  tagline: string;
  questionAnswered: string;
  definition: string;
  mission: string;
  values: string[];
  constitution: ConstitutionArticle[];
  eternalPrinciples: EternalPrinciple[];
}

export interface ReasoningEvaluation {
  amount: number;
  currency: string;
  evaluatedRoutes: Array<{
    provider: string;
    speedMs: number;
    fee: number;
    riskScore: number;
    compositeScore: number;
    recommended: boolean;
  }>;
  riskAnalysis: {
    volatilityIndex: number;
    liquidityDepth: string;
    sanctionCheckPassed: boolean;
    overallRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  whySelectedNarrative: string;
}

export interface TranslationAdapter {
  providerName: string;
  rawStatusFormat: string;
  canonicalMapping: string;
  exampleRaw: any;
  exampleUniversal: any;
}

export interface MemoryLesson {
  id: string;
  category: 'PROVIDER_BEHAVIOR' | 'USER_PREFERENCE' | 'HISTORICAL_PATTERN' | 'SYSTEM_KNOWLEDGE';
  patternName: string;
  observedInsight: string;
  learnedAction: string;
  confidencePct: number;
}

export interface GuardianCheckResult {
  actionAllowed: boolean;
  securityChecksPassed: boolean;
  complianceChecksPassed: boolean;
  requiresHumanApproval: boolean;
  trustScore: number;
  activeGuardrails: string[];
  blockReason?: string;
}

export class MeherahKernelService {

  // 1. IDENTITY ENGINE ("What is MEHERAH?")
  public getIdentityEngine(): KernelIdentity {
    return {
      name: 'MEHERAH Kernel — Permanent System Heart',
      tagline: 'Universal Financial Intelligence Architecture',
      questionAnswered: 'What is MEHERAH?',
      definition: 'MEHERAH is a living, sovereign financial intelligence kernel that unifies disparate global banking rails, mobile money switches, and payment networks into a single canonical language, autonomous reasoning engine, and immutable audit ledger.',
      mission: 'To create enduring global infrastructure that moves value transparently, securely, and intelligently for every human and institution on Earth.',
      values: [
        'Purpose Before Power',
        'Service Before Profit',
        'Transparency Before Complexity',
        'Integrity Before Convenience',
        'Intelligence With Understanding',
        'One Language, Many Systems'
      ],
      constitution: [
        { article: 'Article I', title: 'Purpose', statement: 'Every action executed by MEHERAH must create genuine value for a human or institutional user.' },
        { article: 'Article II', title: 'Service', statement: 'The user and asset security always take precedence over technology or profit.' },
        { article: 'Article III', title: 'Transparency', statement: 'Every AI decision and route selection must be explainable in simple human language.' },
        { article: 'Article IV', title: 'Integrity', statement: 'Every transaction must be double-entry balanced, cryptographically verified, and fully auditable.' },
        { article: 'Article V', title: 'Translation', statement: 'All external systems are translated into the Language of MEHERAH before processing.' },
        { article: 'Article VI', title: 'Intelligence', statement: 'Understand context first. Decide second. Execute third.' },
        { article: 'Article VII', title: 'Reliability', statement: 'Always choose the safest verified route over speculative shortcuts.' },
        { article: 'Article VIII', title: 'Learning', statement: 'Every completed transaction refines the platform memory graph.' },
        { article: 'Article IX', title: 'Unity', statement: 'Many systems. One language. One intelligence.' },
        { article: 'Article X', title: 'Global Purpose', statement: 'MEHERAH exists to serve humanity through trusted, friction-free value movement.' }
      ],
      eternalPrinciples: [
        { num: 1, title: 'Purpose before power', description: 'Capability exists solely to serve human and financial needs.' },
        { num: 2, title: 'Service before profit', description: 'Data privacy and asset security precede monetizable efficiency.' },
        { num: 3, title: 'Transparency before complexity', description: 'No black-box execution; every choice is plain-language justified.' },
        { num: 4, title: 'Integrity before convenience', description: 'Double-entry balancing is strictly mandatory across all rails.' },
        { num: 5, title: 'Intelligence with understanding', description: 'Analyze market conditions and provider telemetry before taking action.' },
        { num: 6, title: 'One language, many systems', description: 'Absorb technical dialects into a single canonical schema.' },
        { num: 7, title: 'Learn continuously', description: 'Every execution yields immutable memory for continuous self-optimization.' },
        { num: 8, title: 'Build trust through every decision', description: 'Sub-second speed and zero asset leakage form the bedrock of institutional trust.' }
      ]
    };
  }

  // 2. REASONING ENGINE ("Why should MEHERAH do this?")
  public evaluateReasoning(amount: number = 500000, currency: string = 'UGX'): ReasoningEvaluation {
    const routes = [
      {
        provider: 'Airtel Money Direct Rail',
        speedMs: 190,
        fee: amount * 0.002,
        riskScore: 0.12,
        compositeScore: 98.4,
        recommended: true
      },
      {
        provider: 'MTN Mobile Money Switch',
        speedMs: 280,
        fee: amount * 0.0035,
        riskScore: 0.18,
        compositeScore: 94.1,
        recommended: false
      },
      {
        provider: 'Stanbic Bank ACH Bridge',
        speedMs: 850,
        fee: 0,
        riskScore: 0.05,
        compositeScore: 92.8,
        recommended: false
      },
      {
        provider: 'Flutterwave Inter-Corridor',
        speedMs: 420,
        fee: amount * 0.005,
        riskScore: 0.22,
        compositeScore: 89.5,
        recommended: false
      }
    ];

    return {
      amount,
      currency,
      evaluatedRoutes: routes,
      riskAnalysis: {
        volatilityIndex: 0.04,
        liquidityDepth: 'EXCELLENT (UGX 2.4B Float Available)',
        sanctionCheckPassed: true,
        overallRiskLevel: 'LOW'
      },
      whySelectedNarrative: `MEHERAH selected 'Airtel Money Direct Rail' for ${amount.toLocaleString()} ${currency} because it provides the optimal balance of 190ms ultra-low latency, 0.2% low fee tier, and a 99.92% historical completion rate during the current network window.`
    };
  }

  // 3. TRANSLATION ENGINE ("How do different systems understand each other?")
  public getTranslationAdapters(): TranslationAdapter[] {
    return [
      {
        providerName: 'Flutterwave Gateway',
        rawStatusFormat: 'string ("successful" | "failed" | "pending")',
        canonicalMapping: 'MEHERAH_STATUS.SUCCESS | MEHERAH_STATUS.FAILED | MEHERAH_STATUS.IN_FLIGHT',
        exampleRaw: { status: 'successful', data: { tx_ref: 'FLW-99120', amount: 150000 } },
        exampleUniversal: { meherahStatus: 'SUCCESS', transactionRef: 'FLW-99120', amount: 150000, currency: 'UGX', confidenceScore: 100 }
      },
      {
        providerName: 'MTN Mobile Money API v2',
        rawStatusFormat: 'string ("COMPLETED" | "FAILED" | "PENDING")',
        canonicalMapping: 'MEHERAH_STATUS.SUCCESS | MEHERAH_STATUS.FAILED | MEHERAH_STATUS.IN_FLIGHT',
        exampleRaw: { financialTransactionId: 'MTN-881293', status: 'COMPLETED' },
        exampleUniversal: { meherahStatus: 'SUCCESS', transactionRef: 'MTN-881293', confidenceScore: 99.8 }
      },
      {
        providerName: 'Airtel Money Switch',
        rawStatusFormat: 'numeric_code ("00" | "01" | "99")',
        canonicalMapping: '00 -> SUCCESS, 01 -> PENDING, 99 -> FAILED',
        exampleRaw: { responseCode: '00', airtelTxnId: 'ATL-773829' },
        exampleUniversal: { meherahStatus: 'SUCCESS', transactionRef: 'ATL-773829', confidenceScore: 99.9 }
      },
      {
        providerName: 'Stanbic Commercial Bank ISO20022',
        rawStatusFormat: 'XML/JSON ("ACCP" | "RJCT" | "PDNG")',
        canonicalMapping: 'ACCP -> SUCCESS, RJCT -> FAILED, PDNG -> IN_FLIGHT',
        exampleRaw: { StmtId: 'STB-2026-001', TxStatus: 'ACCP' },
        exampleUniversal: { meherahStatus: 'SUCCESS', transactionRef: 'STB-2026-001', confidenceScore: 100 }
      }
    ];
  }

  // 4. MEMORY ENGINE ("What has MEHERAH learned?")
  public getMemoryInsights(): MemoryLesson[] {
    return [
      {
        id: 'MEM-001',
        category: 'PROVIDER_BEHAVIOR',
        patternName: 'Noon Payroll Network Congestion',
        observedInsight: 'Airtel and MTN mobile switches experience +340ms latency spikes between 12:00 and 12:30 UTC during end-of-month payrolls.',
        learnedAction: 'Auto-shift non-urgent bulk payouts to Stanbic Bank ACH during 12:00-12:30 UTC window.',
        confidencePct: 99.4
      },
      {
        id: 'MEM-002',
        category: 'HISTORICAL_PATTERN',
        patternName: 'Weekend Cross-Border Liquidity Surge',
        observedInsight: 'UGX-KES cross-border remittance demand surges 42% on Saturday afternoons.',
        learnedAction: 'Pre-allocate KES float buffer in Equity Bank Kenya vault every Friday at 18:00 UTC.',
        confidencePct: 98.9
      },
      {
        id: 'MEM-003',
        category: 'USER_PREFERENCE',
        patternName: 'Enterprise Instant Rejection Guardrail',
        observedInsight: 'Enterprise corporate users prefer 0ms delay with higher fee over 2000ms delay with lower fee.',
        learnedAction: 'Prioritize ultra-low latency direct rails (<250ms) for Enterprise API keys.',
        confidencePct: 97.8
      },
      {
        id: 'MEM-004',
        category: 'SYSTEM_KNOWLEDGE',
        patternName: 'Flutterwave Rate Limit Smooth Curve',
        observedInsight: 'Flutterwave sandbox endpoint drops requests above 120 req/sec.',
        learnedAction: 'Throttling bucket limits outgoing webhook dispatches to 95 req/sec with exponential backoff.',
        confidencePct: 99.9
      }
    ];
  }

  // 5. GUARDIAN ENGINE ("Should this action be allowed?")
  public evaluateGuardian(actionType: string = 'DISBURSEMENT', amount: number = 2500000, riskScore: number = 0.08): GuardianCheckResult {
    const isHighValue = amount > 10000000; // > 10M UGX triggers human check
    const isHighRisk = riskScore > 0.35;

    let allowed = true;
    let blockReason = undefined;

    if (isHighRisk) {
      allowed = false;
      blockReason = 'Risk score exceeds Guardian threshold (0.35 max allowed).';
    }

    return {
      actionAllowed: allowed && !isHighValue,
      securityChecksPassed: true,
      complianceChecksPassed: true,
      requiresHumanApproval: isHighValue || isHighRisk,
      trustScore: 99.8,
      activeGuardrails: [
        'Zero-Trust Hardware Security Module (HSM) Key Signing',
        'OFAC/AML Real-Time Sanctions Screening',
        'Double-Entry Audit Ledger Mirroring',
        'Idempotency Key Uniqueness Verification',
        'Human-in-the-Loop High-Value Authorization (>10,000,000 UGX)'
      ],
      blockReason
    };
  }
}

export const meherahKernelService = new MeherahKernelService();
