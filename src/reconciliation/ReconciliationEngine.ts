export interface ReconciliationDiscrepancyItem {
  discrepancyId: string;
  transactionRef: string;
  providerId: string;
  providerAmountUGX: number;
  meherahLedgerAmountUGX: number;
  bankSettlementAmountUGX: number;
  feeDiscrepancyUGX: number;
  discrepancyType: 'FEE_RATE_MISMATCH' | 'MISSING_IN_BANK_STATEMENT' | 'DUPLICATE_SETTLEMENT' | 'SETTLEMENT_DELAY';
  severity: 'HIGH_AUDIT_ALERT' | 'MEDIUM_CORRECTION' | 'LOW_TIMING_DIFFERENCE';
  resolutionStatus: 'UNRESOLVED' | 'AUTO_BALANCED_VIA_JOURNAL' | 'MANUAL_AUDIT_PENDING';
  balancingJournalEntryId?: string;
}

export interface ThreeWayReconciliationBatch {
  reconciliationBatchId: string;
  executedAt: string;
  periodStart: string;
  periodEnd: string;
  totalTransactionsProcessed: number;
  totalVolumeUGX: number;
  matchedTransactionsCount: number;
  discrepanciesCount: number;
  matchRatePct: number;
  unreconciledNetExposureUGX: number;
  discrepancies: ReconciliationDiscrepancyItem[];
}

export class ReconciliationEngineService {
  private static instance: ReconciliationEngineService;
  private currentBatch: ThreeWayReconciliationBatch;

  private constructor() {
    this.currentBatch = this.generateInitialBatch();
  }

  public static getInstance(): ReconciliationEngineService {
    if (!ReconciliationEngineService.instance) {
      ReconciliationEngineService.instance = new ReconciliationEngineService();
    }
    return ReconciliationEngineService.instance;
  }

  private generateInitialBatch(): ThreeWayReconciliationBatch {
    return {
      reconciliationBatchId: 'REC-3WAY-2026-0725-A',
      executedAt: new Date(Date.now() - 1800000).toISOString(),
      periodStart: new Date(Date.now() - 86400000).toISOString(),
      periodEnd: new Date().toISOString(),
      totalTransactionsProcessed: 14820,
      totalVolumeUGX: 4850000000, // UGX 4.85 Billion
      matchedTransactionsCount: 14818,
      discrepanciesCount: 2,
      matchRatePct: 99.986,
      unreconciledNetExposureUGX: 12500,
      discrepancies: [
        {
          discrepancyId: 'DISC-2026-001',
          transactionRef: 'TX-MTN-998201',
          providerId: 'mtn_momo',
          providerAmountUGX: 5000000,
          meherahLedgerAmountUGX: 5000000,
          bankSettlementAmountUGX: 5000000,
          feeDiscrepancyUGX: 12500, // Provider charged UGX 12,500 fee instead of agreed UGX 0 promo rate
          discrepancyType: 'FEE_RATE_MISMATCH',
          severity: 'MEDIUM_CORRECTION',
          resolutionStatus: 'UNRESOLVED'
        },
        {
          discrepancyId: 'DISC-2026-002',
          transactionRef: 'TX-FLW-881204',
          providerId: 'flutterwave',
          providerAmountUGX: 15000000,
          meherahLedgerAmountUGX: 15000000,
          bankSettlementAmountUGX: 0, // Delayed in ACH T+1 queue
          feeDiscrepancyUGX: 0,
          discrepancyType: 'SETTLEMENT_DELAY',
          severity: 'LOW_TIMING_DIFFERENCE',
          resolutionStatus: 'UNRESOLVED'
        }
      ]
    };
  }

  public getReconciliationBatch(): ThreeWayReconciliationBatch {
    return { ...this.currentBatch };
  }

  public runThreeWayReconciliation(): ThreeWayReconciliationBatch {
    // Generate fresh batch run
    this.currentBatch = {
      reconciliationBatchId: 'REC-3WAY-' + Math.floor(Math.random() * 90000 + 10000),
      executedAt: new Date().toISOString(),
      periodStart: new Date(Date.now() - 86400000).toISOString(),
      periodEnd: new Date().toISOString(),
      totalTransactionsProcessed: 18450,
      totalVolumeUGX: 6200000000,
      matchedTransactionsCount: 18449,
      discrepanciesCount: 1,
      matchRatePct: 99.995,
      unreconciledNetExposureUGX: 3500,
      discrepancies: [
        {
          discrepancyId: 'DISC-' + Math.floor(Math.random() * 90000 + 10000),
          transactionRef: 'TX-STB-110294',
          providerId: 'direct_bank',
          providerAmountUGX: 25000000,
          meherahLedgerAmountUGX: 25000000,
          bankSettlementAmountUGX: 25000000,
          feeDiscrepancyUGX: 3500,
          discrepancyType: 'FEE_RATE_MISMATCH',
          severity: 'LOW_TIMING_DIFFERENCE',
          resolutionStatus: 'UNRESOLVED'
        }
      ]
    };
    return { ...this.currentBatch };
  }

  public resolveDiscrepancyViaJournal(discrepancyId: string): ReconciliationDiscrepancyItem {
    const disc = this.currentBatch.discrepancies.find(d => d.discrepancyId === discrepancyId);
    if (!disc) throw new Error('Discrepancy not found');

    disc.resolutionStatus = 'AUTO_BALANCED_VIA_JOURNAL';
    disc.balancingJournalEntryId = 'JRN-ADJ-' + Math.floor(Math.random() * 90000 + 10000);

    // Recalculate unreconciled exposure
    const unresolved = this.currentBatch.discrepancies.filter(d => d.resolutionStatus === 'UNRESOLVED');
    this.currentBatch.unreconciledNetExposureUGX = unresolved.reduce((sum, d) => sum + d.feeDiscrepancyUGX, 0);

    return { ...disc };
  }
}

export const reconciliationEngine = ReconciliationEngineService.getInstance();
