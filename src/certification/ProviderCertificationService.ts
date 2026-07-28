export interface ProviderCertificationScorecard {
  providerId: string;
  providerName: string;
  certificationBadge: 'TIER_1_CERTIFIED_INSTITUTION' | 'TIER_2_VERIFIED_PARTNER' | 'SANDBOX_PROBATIONARY';
  technicalScorePct: number; // 0-100
  financialScorePct: number; // 0-100
  trustScorePct: number; // 0-100
  overallCompositeScore: number; // 0-100
  auditDetails: {
    uptimeSla30d: number;
    meanLatencyMs: number;
    feeCompetitivenessIndex: number;
    settlementDiscrepancyPct: number;
    pciDssCompliant: boolean;
    iso27001Certified: boolean;
  };
  certifiedUntil: string;
}

export class ProviderCertificationService {
  private static instance: ProviderCertificationService;

  private scorecards: ProviderCertificationScorecard[] = [
    {
      providerId: 'direct_bank',
      providerName: 'Stanbic Bank ACH Direct Pool',
      certificationBadge: 'TIER_1_CERTIFIED_INSTITUTION',
      technicalScorePct: 99.4,
      financialScorePct: 99.8,
      trustScorePct: 100.0,
      overallCompositeScore: 99.7,
      auditDetails: {
        uptimeSla30d: 99.98,
        meanLatencyMs: 3100,
        feeCompetitivenessIndex: 98.0,
        settlementDiscrepancyPct: 0.001,
        pciDssCompliant: true,
        iso27001Certified: true
      },
      certifiedUntil: '2027-12-31T23:59:59Z'
    },
    {
      providerId: 'mtn_momo',
      providerName: 'MTN Mobile Money Direct API',
      certificationBadge: 'TIER_1_CERTIFIED_INSTITUTION',
      technicalScorePct: 98.8,
      financialScorePct: 98.5,
      trustScorePct: 99.2,
      overallCompositeScore: 98.8,
      auditDetails: {
        uptimeSla30d: 99.91,
        meanLatencyMs: 820,
        feeCompetitivenessIndex: 96.5,
        settlementDiscrepancyPct: 0.012,
        pciDssCompliant: true,
        iso27001Certified: true
      },
      certifiedUntil: '2027-06-30T23:59:59Z'
    },
    {
      providerId: 'flutterwave',
      providerName: 'Flutterwave Gateway Core',
      certificationBadge: 'TIER_2_VERIFIED_PARTNER',
      technicalScorePct: 96.2,
      financialScorePct: 95.8,
      trustScorePct: 96.0,
      overallCompositeScore: 96.0,
      auditDetails: {
        uptimeSla30d: 99.45,
        meanLatencyMs: 1420,
        feeCompetitivenessIndex: 94.0,
        settlementDiscrepancyPct: 0.045,
        pciDssCompliant: true,
        iso27001Certified: true
      },
      certifiedUntil: '2026-11-15T23:59:59Z'
    }
  ];

  private constructor() {}

  public static getInstance(): ProviderCertificationService {
    if (!ProviderCertificationService.instance) {
      ProviderCertificationService.instance = new ProviderCertificationService();
    }
    return ProviderCertificationService.instance;
  }

  public getCertificationScorecards(): ProviderCertificationScorecard[] {
    return [...this.scorecards];
  }
}

export const providerCertification = ProviderCertificationService.getInstance();
