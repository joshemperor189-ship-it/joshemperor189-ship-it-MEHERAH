export interface PartnerTenantConfig {
  tenantId: string;
  tenantName: string;
  partnerType: 'BANK_TIER_1' | 'ENTERPRISE_MERCHANT' | 'FINTECH_AGGREGATOR' | 'GOVERNMENT_SERVICE';
  apiKeyPrefix: string;
  webhookUrl: string;
  rateLimitReqPerSec: number;
  slaTargetUptimePct: number;
  currentUptimePct: number;
  mtlsCertificateStatus: 'VALID_ACTIVE' | 'EXPIRED' | 'NOT_CONFIGURED';
  productionStatus: 'CERTIFIED_LIVE_PRODUCTION' | 'STAGE_ONBOARDING';
}

export class PartnerReadinessService {
  private static instance: PartnerReadinessService;

  private tenants: PartnerTenantConfig[] = [
    {
      tenantId: 'TNT-STB-001',
      tenantName: 'Stanbic Bank Uganda Treasury Portal',
      partnerType: 'BANK_TIER_1',
      apiKeyPrefix: 'mhr_live_stb_9918...',
      webhookUrl: 'https://core.stanbic.co.ug/api/v1/meherah-settlements',
      rateLimitReqPerSec: 5000,
      slaTargetUptimePct: 99.99,
      currentUptimePct: 99.998,
      mtlsCertificateStatus: 'VALID_ACTIVE',
      productionStatus: 'CERTIFIED_LIVE_PRODUCTION'
    },
    {
      tenantId: 'TNT-URA-002',
      tenantName: 'Uganda Revenue Authority (URA) E-Tax Gateway',
      partnerType: 'GOVERNMENT_SERVICE',
      apiKeyPrefix: 'mhr_live_ura_4412...',
      webhookUrl: 'https://etax.ura.go.ug/meherah-webhooks',
      rateLimitReqPerSec: 2000,
      slaTargetUptimePct: 99.95,
      currentUptimePct: 99.970,
      mtlsCertificateStatus: 'VALID_ACTIVE',
      productionStatus: 'CERTIFIED_LIVE_PRODUCTION'
    },
    {
      tenantId: 'TNT-[#F0A500]-003',
      tenantName: 'Jumia East Africa E-Commerce Portal',
      partnerType: 'ENTERPRISE_MERCHANT',
      apiKeyPrefix: 'mhr_live_jum_8820...',
      webhookUrl: 'https://payments.jumia.co.ug/meherah/ipn',
      rateLimitReqPerSec: 1000,
      slaTargetUptimePct: 99.90,
      currentUptimePct: 99.920,
      mtlsCertificateStatus: 'VALID_ACTIVE',
      productionStatus: 'CERTIFIED_LIVE_PRODUCTION'
    }
  ];

  private constructor() {}

  public static getInstance(): PartnerReadinessService {
    if (!PartnerReadinessService.instance) {
      PartnerReadinessService.instance = new PartnerReadinessService();
    }
    return PartnerReadinessService.instance;
  }

  public getTenants(): PartnerTenantConfig[] {
    return [...this.tenants];
  }

  public onboardNewTenant(name: string, type: PartnerTenantConfig['partnerType']): PartnerTenantConfig {
    const tenant: PartnerTenantConfig = {
      tenantId: 'TNT-' + Math.floor(Math.random() * 9000 + 1000),
      tenantName: name,
      partnerType: type,
      apiKeyPrefix: 'mhr_live_' + Math.random().toString(36).substring(2, 8) + '...',
      webhookUrl: `https://${name.toLowerCase().replace(/[^a-z]/g, '')}.com/webhooks`,
      rateLimitReqPerSec: type === 'BANK_TIER_1' ? 5000 : 1000,
      slaTargetUptimePct: 99.95,
      currentUptimePct: 100.0,
      mtlsCertificateStatus: 'VALID_ACTIVE',
      productionStatus: 'STAGE_ONBOARDING'
    };
    this.tenants.push(tenant);
    return tenant;
  }
}

export const partnerReadiness = PartnerReadinessService.getInstance();
