export interface SettlementBatch {
  batchId: string;
  providerId: string;
  providerName: string;
  grossVolumeUGX: number;
  providerFeeUGX: number;
  meherahTakeUGX: number;
  netSettlementUGX: number;
  transactionCount: number;
  status: 'PENDING_RECONCILIATION' | 'SETTLED' | 'DISCREPANCY_FLAGGED';
  settledAt: string;
}

export class SettlementAdapterService {
  private static instance: SettlementAdapterService;
  private batches: SettlementBatch[] = [];

  private constructor() {
    this.seedSettlements();
  }

  public static getInstance(): SettlementAdapterService {
    if (!SettlementAdapterService.instance) {
      SettlementAdapterService.instance = new SettlementAdapterService();
    }
    return SettlementAdapterService.instance;
  }

  private seedSettlements(): void {
    this.batches = [
      {
        batchId: 'SET-2026-0725-01',
        providerId: 'mtn_momo',
        providerName: 'MTN Mobile Money Direct API',
        grossVolumeUGX: 45000000,
        providerFeeUGX: 360000,
        meherahTakeUGX: 180000,
        netSettlementUGX: 44460000,
        transactionCount: 312,
        status: 'SETTLED',
        settledAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        batchId: 'SET-2026-0725-02',
        providerId: 'flutterwave',
        providerName: 'Flutterwave Gateway Core',
        grossVolumeUGX: 82000000,
        providerFeeUGX: 1148000,
        meherahTakeUGX: 410000,
        netSettlementUGX: 80442000,
        transactionCount: 540,
        status: 'SETTLED',
        settledAt: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        batchId: 'SET-2026-0725-03',
        providerId: 'airtel_money',
        providerName: 'Airtel Money Express Rail',
        grossVolumeUGX: 28000000,
        providerFeeUGX: 280000,
        meherahTakeUGX: 112000,
        netSettlementUGX: 27608000,
        transactionCount: 195,
        status: 'PENDING_RECONCILIATION',
        settledAt: new Date().toISOString()
      }
    ];
  }

  public getBatches(): SettlementBatch[] {
    return [...this.batches];
  }

  public triggerAutoReconciliation(): { reconciledCount: number; totalVolumeSettledUGX: number } {
    let totalVolume = 0;
    let count = 0;

    for (const b of this.batches) {
      if (b.status === 'PENDING_RECONCILIATION') {
        b.status = 'SETTLED';
        totalVolume += b.netSettlementUGX;
        count += 1;
      }
    }

    return { reconciledCount: count, totalVolumeSettledUGX: totalVolume };
  }
}

export const settlementAdapter = SettlementAdapterService.getInstance();
