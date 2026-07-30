export interface LinkedFinancialConnection {
  connectionId: string;
  providerId: string;
  providerName: string;
  connectionType: 'MOBILE_MONEY' | 'BANK_ACCOUNT' | 'DEBIT_CARD' | 'CRYPTO_WALLET';
  accountName: string;
  accountIdentifier: string; // Masked phone number or bank acc
  currency: string;
  liquidBalanceUGX: number;
  ownershipVerified: boolean;
  status: 'ACTIVE' | 'PAUSED' | 'REVOKED';
  permissionScopes: {
    allowInstantRouting: boolean;
    allowAutoTreasuryRebalance: boolean;
    allowDailyPayrollSweeps: boolean;
    dataSharingConsent: boolean;
  };
  linkedAt: string;
}

export interface UniversalUserIdentity {
  meherahId: string;
  fullName: string;
  primaryNationalId: string;
  primaryPhone: string;
  kycVerificationTier: 'TIER_1_BASIC' | 'TIER_2_VERIFIED' | 'TIER_3_INSTITUTIONAL';
  riskScoreIndex: number; // 0.0 to 1.0
  totalAggregatedBalanceUGX: number;
  connections: LinkedFinancialConnection[];
}

export class UniversalIdentityService {
  private static instance: UniversalIdentityService;

  private userIdentity: UniversalUserIdentity = {
    meherahId: 'MEHERAH-ID-UG-884291',
    fullName: 'Kato Mark Mukasa',
    primaryNationalId: 'CM920184719284',
    primaryPhone: '+256770001122',
    kycVerificationTier: 'TIER_3_INSTITUTIONAL',
    riskScoreIndex: 0.02,
    totalAggregatedBalanceUGX: 184500000,
    connections: [
      {
        connectionId: 'conn_momo_mtn_01',
        providerId: 'mtn_momo',
        providerName: 'MTN Mobile Money Direct',
        connectionType: 'MOBILE_MONEY',
        accountName: 'Kato Mark (MTN)',
        accountIdentifier: '+256 770 *** 122',
        currency: 'UGX',
        liquidBalanceUGX: 24500000,
        ownershipVerified: true,
        status: 'ACTIVE',
        permissionScopes: {
          allowInstantRouting: true,
          allowAutoTreasuryRebalance: true,
          allowDailyPayrollSweeps: true,
          dataSharingConsent: true
        },
        linkedAt: '2026-01-15T08:00:00Z'
      },
      {
        connectionId: 'conn_momo_airtel_02',
        providerId: 'airtel_money',
        providerName: 'Airtel Money Express',
        connectionType: 'MOBILE_MONEY',
        accountName: 'Kato Mark (Airtel)',
        accountIdentifier: '+256 750 *** 990',
        currency: 'UGX',
        liquidBalanceUGX: 15000000,
        ownershipVerified: true,
        status: 'ACTIVE',
        permissionScopes: {
          allowInstantRouting: true,
          allowAutoTreasuryRebalance: true,
          allowDailyPayrollSweeps: false,
          dataSharingConsent: true
        },
        linkedAt: '2026-02-01T10:30:00Z'
      },
      {
        connectionId: 'conn_bank_stanbic_03',
        providerId: 'direct_bank',
        providerName: 'Stanbic Bank ACH Treasury Account',
        connectionType: 'BANK_ACCOUNT',
        accountName: 'Kato Mukasa Enterprises',
        accountIdentifier: '9030018491829',
        currency: 'UGX',
        liquidBalanceUGX: 135000000,
        ownershipVerified: true,
        status: 'ACTIVE',
        permissionScopes: {
          allowInstantRouting: true,
          allowAutoTreasuryRebalance: true,
          allowDailyPayrollSweeps: true,
          dataSharingConsent: true
        },
        linkedAt: '2025-11-20T14:15:00Z'
      },
      {
        connectionId: 'conn_card_visa_04',
        providerId: 'flutterwave',
        providerName: 'Flutterwave Visa Corporate Card',
        connectionType: 'DEBIT_CARD',
        accountName: 'Kato Mark Visa',
        accountIdentifier: '4111 **** **** 8821',
        currency: 'USD',
        liquidBalanceUGX: 10000000,
        ownershipVerified: true,
        status: 'ACTIVE',
        permissionScopes: {
          allowInstantRouting: true,
          allowAutoTreasuryRebalance: false,
          allowDailyPayrollSweeps: false,
          dataSharingConsent: true
        },
        linkedAt: '2026-03-10T11:00:00Z'
      }
    ]
  };

  private constructor() {}

  public static getInstance(): UniversalIdentityService {
    if (!UniversalIdentityService.instance) {
      UniversalIdentityService.instance = new UniversalIdentityService();
    }
    return UniversalIdentityService.instance;
  }

  public getIdentity(): UniversalUserIdentity {
    // Recalculate aggregated balance
    this.userIdentity.totalAggregatedBalanceUGX = this.userIdentity.connections
      .filter(c => c.status === 'ACTIVE')
      .reduce((sum, c) => sum + c.liquidBalanceUGX, 0);

    return { ...this.userIdentity };
  }

  public togglePermissionScope(connectionId: string, scopeKey: keyof LinkedFinancialConnection['permissionScopes']): UniversalUserIdentity {
    const conn = this.userIdentity.connections.find(c => c.connectionId === connectionId);
    if (conn) {
      conn.permissionScopes[scopeKey] = !conn.permissionScopes[scopeKey];
    }
    return this.getIdentity();
  }

  public linkNewConnection(newConnection: Omit<LinkedFinancialConnection, 'connectionId' | 'linkedAt'>): UniversalUserIdentity {
    const connectionId = 'conn_' + Math.random().toString(36).substring(2, 8);
    this.userIdentity.connections.push({
      ...newConnection,
      connectionId,
      linkedAt: new Date().toISOString()
    });
    return this.getIdentity();
  }
}

export const universalIdentityService = UniversalIdentityService.getInstance();
