export interface KYCRecord {
  userId: string;
  fullName: string;
  nationalIdNumber: string;
  tier: 'TIER_1_BASIC' | 'TIER_2_VERIFIED' | 'TIER_3_INSTITUTIONAL';
  dailyTransactionLimitUGX: number;
  biometricVerified: boolean;
  pepSanctionCheckPassed: boolean;
  lastVerifiedDate: string;
}

export class KYCEngineService {
  private static instance: KYCEngineService;
  private kycRecords: Map<string, KYCRecord> = new Map();

  private constructor() {
    this.seedRecords();
  }

  public static getInstance(): KYCEngineService {
    if (!KYCEngineService.instance) {
      KYCEngineService.instance = new KYCEngineService();
    }
    return KYCEngineService.instance;
  }

  private seedRecords(): void {
    const defaultRecords: KYCRecord[] = [
      {
        userId: 'MEHERAH-ID-UG-884291',
        fullName: 'Kato Mark Mukasa',
        nationalIdNumber: 'CM920184719284',
        tier: 'TIER_3_INSTITUTIONAL',
        dailyTransactionLimitUGX: 1000000000,
        biometricVerified: true,
        pepSanctionCheckPassed: true,
        lastVerifiedDate: '2026-01-10T10:00:00Z'
      },
      {
        userId: 'MEHERAH-ID-UG-110294',
        fullName: 'Kampala Coffee Roasters Ltd',
        nationalIdNumber: 'TIN-891048201',
        tier: 'TIER_3_INSTITUTIONAL',
        dailyTransactionLimitUGX: 500000000,
        biometricVerified: true,
        pepSanctionCheckPassed: true,
        lastVerifiedDate: '2026-02-14T09:30:00Z'
      }
    ];

    for (const r of defaultRecords) {
      this.kycRecords.set(r.userId, r);
    }
  }

  public getKYC(userId: string): KYCRecord | null {
    return this.kycRecords.get(userId) || null;
  }

  public verifyLimitCompliance(userId: string, requestedAmountUGX: number): { allowed: boolean; maxLimitUGX: number } {
    const record = this.getKYC(userId);
    if (!record) return { allowed: false, maxLimitUGX: 5000000 }; // Tier 1 fallback
    return {
      allowed: requestedAmountUGX <= record.dailyTransactionLimitUGX,
      maxLimitUGX: record.dailyTransactionLimitUGX
    };
  }
}

export const kycEngine = KYCEngineService.getInstance();
