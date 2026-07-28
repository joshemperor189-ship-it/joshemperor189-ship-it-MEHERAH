export interface LedgerEntry {
  id: string;
  transactionRef: string;
  accountNumber: string;
  accountType: 'CUSTOMER_WALLET' | 'TREASURY_POOL' | 'GATEWAY_CLEARING' | 'FEE_REVENUE';
  direction: 'DEBIT' | 'CREDIT';
  amount: number;
  currency: string;
  balanceAfter: number;
  timestamp: string;
  description: string;
  signatureZk: string;
}

export class LedgerService {
  private static entries: LedgerEntry[] = [];

  public static recordDoubleEntry(params: {
    transactionRef: string;
    debitAccount: string;
    debitType: 'CUSTOMER_WALLET' | 'TREASURY_POOL' | 'GATEWAY_CLEARING' | 'FEE_REVENUE';
    debitBalanceAfter: number;
    creditAccount: string;
    creditType: 'CUSTOMER_WALLET' | 'TREASURY_POOL' | 'GATEWAY_CLEARING' | 'FEE_REVENUE';
    creditBalanceAfter: number;
    amount: number;
    currency: string;
    description: string;
  }): { debitEntry: LedgerEntry; creditEntry: LedgerEntry } {
    const now = new Date().toISOString();

    const debitEntry: LedgerEntry = {
      id: 'LEDGER-D-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      transactionRef: params.transactionRef,
      accountNumber: params.debitAccount,
      accountType: params.debitType,
      direction: 'DEBIT',
      amount: params.amount,
      currency: params.currency,
      balanceAfter: params.debitBalanceAfter,
      timestamp: now,
      description: params.description,
      signatureZk: 'zkp_0x' + Math.random().toString(36).substring(2, 12)
    };

    const creditEntry: LedgerEntry = {
      id: 'LEDGER-C-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      transactionRef: params.transactionRef,
      accountNumber: params.creditAccount,
      accountType: params.creditType,
      direction: 'CREDIT',
      amount: params.amount,
      currency: params.currency,
      balanceAfter: params.creditBalanceAfter,
      timestamp: now,
      description: params.description,
      signatureZk: 'zkp_0x' + Math.random().toString(36).substring(2, 12)
    };

    this.entries.unshift(debitEntry, creditEntry);
    return { debitEntry, creditEntry };
  }

  public static getEntriesForAccount(accountNumber: string): LedgerEntry[] {
    return this.entries.filter(e => e.accountNumber === accountNumber);
  }

  public static getAllEntries(limit: number = 50): LedgerEntry[] {
    return this.entries.slice(0, limit);
  }
}
