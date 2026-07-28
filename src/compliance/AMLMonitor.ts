export interface AMLAlert {
  alertId: string;
  timestamp: string;
  sourceAccount: string;
  targetAccount: string;
  amountUGX: number;
  flagType: 'STRUCTURING_RAPID_SPLIT' | 'SANCTION_NAME_MATCH' | 'HIGH_VELOCITY_BURST' | 'CROSS_BORDER_ANOMALY';
  riskScore: number; // 0.0 to 1.0
  status: 'PENDING_REVIEW' | 'AUTO_BLOCKED' | 'CLEARED' | 'ESCALATED_TO_REGULATOR';
  details: string;
}

export class AMLMonitorService {
  private static instance: AMLMonitorService;
  private alerts: AMLAlert[] = [
    {
      alertId: 'AML-2026-9041',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      sourceAccount: '+256788***901 (Anonymous SIM)',
      targetAccount: 'Stanbic ACH #903001849',
      amountUGX: 49500000,
      flagType: 'STRUCTURING_RAPID_SPLIT',
      riskScore: 0.92,
      status: 'AUTO_BLOCKED',
      details: 'Detected 10 sequential UGX 4.95M transactions within 120 seconds below UGX 5M threshold.'
    },
    {
      alertId: 'AML-2026-9042',
      timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
      sourceAccount: 'Flutterwave Card Visa ****8821',
      targetAccount: 'MEHERAH Master Wallet',
      amountUGX: 120000000,
      flagType: 'CROSS_BORDER_ANOMALY',
      riskScore: 0.65,
      status: 'PENDING_REVIEW',
      details: 'Unusual rapid USD-UGX conversion velocity from new IP range (Frankfurt, DE).'
    }
  ];

  private constructor() {}

  public static getInstance(): AMLMonitorService {
    if (!AMLMonitorService.instance) {
      AMLMonitorService.instance = new AMLMonitorService();
    }
    return AMLMonitorService.instance;
  }

  public getAlerts(): AMLAlert[] {
    return [...this.alerts];
  }

  public scanTransaction(tx: { amountUGX: number; source: string; target: string }): AMLAlert | null {
    if (tx.amountUGX > 100000000) {
      const alert: AMLAlert = {
        alertId: 'AML-' + Math.floor(Math.random() * 90000 + 10000),
        timestamp: new Date().toISOString(),
        sourceAccount: tx.source,
        targetAccount: tx.target,
        amountUGX: tx.amountUGX,
        flagType: 'HIGH_VELOCITY_BURST',
        riskScore: 0.88,
        status: 'PENDING_REVIEW',
        details: 'High-value single transfer exceeding UGX 100M threshold requiring dual approval.'
      };
      this.alerts.unshift(alert);
      return alert;
    }
    return null;
  }
}

export const amlMonitor = AMLMonitorService.getInstance();
