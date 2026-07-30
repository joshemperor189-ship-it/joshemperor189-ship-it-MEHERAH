import { LearningLoopService } from '../services/learning-loop.service';

export interface LearnedPattern {
  id: string;
  patternType: 'TIME_OF_DAY' | 'VOLUME_THRESHOLD' | 'PROVIDER_RELIABILITY' | 'USER_PREFERENCE';
  providerId: string;
  providerName: string;
  observedBehavior: string;
  actionTakenByAi: string;
  confidenceScorePct: number;
  sampleCount: number;
}

export class KnowledgeMemoryEngine {
  private static instance: KnowledgeMemoryEngine;

  private learnedPatterns: LearnedPattern[] = [
    {
      id: 'pat_001',
      patternType: 'TIME_OF_DAY',
      providerId: 'flutterwave',
      providerName: 'Flutterwave Gateway',
      observedBehavior: 'Provider experiences 3.8% higher timeout latency during batch processing hours (02:00-04:00 EAT).',
      actionTakenByAi: 'Automatically down-weights Flutterwave priority by 15% between 02:00-04:00 EAT.',
      confidenceScorePct: 98,
      sampleCount: 10420
    },
    {
      id: 'pat_002',
      patternType: 'VOLUME_THRESHOLD',
      providerId: 'mtn_momo',
      providerName: 'MTN Mobile Money Core',
      observedBehavior: 'MTN MoMo Core yields 99.8% instant success rate for micro-transfers under UGX 100,000.',
      actionTakenByAi: 'Elevates MTN MoMo Core to default primary route for micro-payments < UGX 100,000.',
      confidenceScorePct: 99,
      sampleCount: 24500
    },
    {
      id: 'pat_003',
      patternType: 'PROVIDER_RELIABILITY',
      providerId: 'airtel_money',
      providerName: 'Airtel Money Express',
      observedBehavior: 'Airtel Money Express maintains zero downtime during telecom maintenance windows.',
      actionTakenByAi: 'Selected as primary failover target when MTN or Flutterwave endpoints experience network jitter.',
      confidenceScorePct: 96,
      sampleCount: 8900
    },
    {
      id: 'pat_004',
      patternType: 'VOLUME_THRESHOLD',
      providerId: 'direct_bank',
      providerName: 'Direct Bank Settlement Pool',
      observedBehavior: 'Transactions over UGX 10,000,000 process with 100% clearing security via direct bank ACH.',
      actionTakenByAi: 'Routes high-value treasury settlement transfers exclusively through Bank ACH.',
      confidenceScorePct: 99,
      sampleCount: 3100
    }
  ];

  private constructor() {}

  public static getInstance(): KnowledgeMemoryEngine {
    if (!KnowledgeMemoryEngine.instance) {
      KnowledgeMemoryEngine.instance = new KnowledgeMemoryEngine();
    }
    return KnowledgeMemoryEngine.instance;
  }

  public getLearnedPatterns(): LearnedPattern[] {
    return [...this.learnedPatterns];
  }

  public recordTransactionOutcome(data: {
    transactionRef: string;
    providerId: string;
    providerName: string;
    success: boolean;
    amount: number;
    latencyMs: number;
  }): void {
    // Pass through to LearningLoopService
    LearningLoopService.recordOutcomeAndLearn({
      transactionRef: data.transactionRef,
      providerId: data.providerId,
      providerName: data.providerName,
      paymentMethod: 'mobile_money',
      amount: data.amount,
      currency: 'UGX',
      success: data.success,
      latencyMs: data.latencyMs,
      feeDeducted: Math.round(data.amount * 0.01),
      fraudScore: 0.02,
      userId: 'usr_a_uganda'
    });
  }
}

export const knowledgeMemoryEngine = KnowledgeMemoryEngine.getInstance();
