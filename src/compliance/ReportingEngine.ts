export interface RegulatoryReport {
  reportId: string;
  reportType: 'CENTRAL_BANK_DAILY_LIQUIDITY' | 'AML_SUSPICIOUS_ACTIVITY_SAR' | 'CROSS_BORDER_REMITTANCE_SUMMARY' | 'SYSTEMIC_OUTAGE_INCIDENT';
  generatedAt: string;
  regulatorRecipient: 'Bank of Uganda (BOU)' | 'Financial Intelligence Authority (FIA)' | 'Capital Markets Authority (CMA)';
  summaryData: any;
  downloadPackageFormat: 'XML_BOU_STDS_v2' | 'JSON_FIA_COMPLIANT' | 'PDF_AUDIT_EXECUTIVE';
}

export class ReportingEngineService {
  private static instance: ReportingEngineService;
  private reports: RegulatoryReport[] = [];

  private constructor() {
    this.seedReports();
  }

  public static getInstance(): ReportingEngineService {
    if (!ReportingEngineService.instance) {
      ReportingEngineService.instance = new ReportingEngineService();
    }
    return ReportingEngineService.instance;
  }

  private seedReports(): void {
    this.reports = [
      {
        reportId: 'REP-BOU-2026-0725-01',
        reportType: 'CENTRAL_BANK_DAILY_LIQUIDITY',
        generatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        regulatorRecipient: 'Bank of Uganda (BOU)',
        summaryData: {
          totalNetSettlementUGX: 485000000,
          reserveRatioPct: 18.5,
          topRail: 'Stanbic ACH / MTN MoMo',
          outageMinutes: 0
        },
        downloadPackageFormat: 'XML_BOU_STDS_v2'
      },
      {
        reportId: 'REP-FIA-2026-0725-02',
        reportType: 'AML_SUSPICIOUS_ACTIVITY_SAR',
        generatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        regulatorRecipient: 'Financial Intelligence Authority (FIA)',
        summaryData: {
          flaggedAlertsCount: 1,
          autoBlockedVolumeUGX: 49500000,
          reason: 'Structuring Rapid Split'
        },
        downloadPackageFormat: 'JSON_FIA_COMPLIANT'
      }
    ];
  }

  public getReports(): RegulatoryReport[] {
    return [...this.reports];
  }

  public generateReport(type: RegulatoryReport['reportType']): RegulatoryReport {
    const report: RegulatoryReport = {
      reportId: 'REP-' + Math.floor(Math.random() * 90000 + 10000),
      reportType: type,
      generatedAt: new Date().toISOString(),
      regulatorRecipient: type === 'AML_SUSPICIOUS_ACTIVITY_SAR' ? 'Financial Intelligence Authority (FIA)' : 'Bank of Uganda (BOU)',
      summaryData: {
        timestamp: new Date().toISOString(),
        status: 'VERIFIED_BY_MEHERAH_COMPLIANCE_AGENT',
        auditHash: '0x' + Math.random().toString(16).substring(2, 18)
      },
      downloadPackageFormat: 'PDF_AUDIT_EXECUTIVE'
    };
    this.reports.unshift(report);
    return report;
  }
}

export const reportingEngine = ReportingEngineService.getInstance();
