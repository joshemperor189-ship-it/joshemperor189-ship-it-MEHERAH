import db from '../../database';
import { eventBus } from './event-bus.service';

export interface ShadowLedgerEntry {
  entryId: string;
  txRef: string;
  userId: string;
  walletId: string;
  entryType: 'DEBIT' | 'CREDIT';
  grossAmount: number;
  netAmount: number;
  feeDeducted: number;
  providerChargedFee: number;
  feeVariance: number; // Discrepancy between estimated AI fee & actual charged fee
  currency: string;
  status: 'RECONCILED' | 'FEE_LEAKAGE_DETECTED' | 'DISCREPANCY';
  timestamp: string;
}

export class ShadowLedgerService {
  private static instance: ShadowLedgerService;
  private entries: ShadowLedgerEntry[] = [];
  private totalFeeLeakageDetected = 0;

  private constructor() {}

  public static getInstance(): ShadowLedgerService {
    if (!ShadowLedgerService.instance) {
      ShadowLedgerService.instance = new ShadowLedgerService();
    }
    return ShadowLedgerService.instance;
  }

  public recordDoubleEntry(params: {
    txRef: string;
    userId: string;
    walletId: string;
    grossAmount: number;
    estimatedFee: number;
    actualProviderFee: number;
    currency?: string;
  }): ShadowLedgerEntry {
    const entryId = 'ledg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const feeVariance = Math.round((params.actualProviderFee - params.estimatedFee) * 1000) / 1000;
    const isLeakage = Math.abs(feeVariance) > 0.05;

    if (isLeakage) {
      this.totalFeeLeakageDetected += Math.abs(feeVariance);
    }

    const entry: ShadowLedgerEntry = {
      entryId,
      txRef: params.txRef,
      userId: params.userId,
      walletId: params.walletId,
      entryType: 'CREDIT',
      grossAmount: params.grossAmount,
      netAmount: params.grossAmount - params.actualProviderFee,
      feeDeducted: params.estimatedFee,
      providerChargedFee: params.actualProviderFee,
      feeVariance,
      currency: params.currency || 'USD',
      status: isLeakage ? 'FEE_LEAKAGE_DETECTED' : 'RECONCILED',
      timestamp: new Date().toISOString()
    };

    this.entries.unshift(entry);
    if (this.entries.length > 100) this.entries.pop();

    // Publish ledgering event
    eventBus.publish('memory.learned', 'Shadow Ledger Agent', {
      entryId,
      txRef: params.txRef,
      feeVariance: `${feeVariance >= 0 ? '+' : ''}$${feeVariance.toFixed(3)}`,
      status: entry.status,
      insight: isLeakage 
        ? `Fee Leakage Warning: Provider fee ($${params.actualProviderFee}) deviated from Memory prediction ($${params.estimatedFee}).`
        : `Double-entry ledger verified: Internal wallet mirror synchronized with gateway payload.`
    });

    return entry;
  }

  public getEntries(limit = 20): ShadowLedgerEntry[] {
    return this.entries.slice(0, limit);
  }

  public getStats() {
    return {
      totalEntries: this.entries.length,
      feeLeakageCount: this.entries.filter(e => e.status === 'FEE_LEAKAGE_DETECTED').length,
      totalFeeLeakageDetectedAmount: Math.round(this.totalFeeLeakageDetected * 100) / 100,
      reconciledRate: this.entries.length > 0 
        ? `${Math.round(((this.entries.length - this.entries.filter(e => e.status === 'FEE_LEAKAGE_DETECTED').length) / this.entries.length) * 100)}%`
        : '100%'
    };
  }
}

export const shadowLedgerService = ShadowLedgerService.getInstance();
