import { LedgerService } from './LedgerService';

export interface DepositRequest {
  walletId: string;
  amount: number;
  currency: string;
  channel: 'MTN_MOMO' | 'AIRTEL_MONEY' | 'BANK_ACH' | 'FLUTTERWAVE';
  referencePhoneOrAccount?: string;
}

export interface DepositResult {
  depositId: string;
  txRef: string;
  walletId: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  newBalance: number;
  timestamp: string;
  channel: string;
}

export class DepositService {
  public static processDeposit(
    wallet: { walletId: string; accountNumber: string; balance: number; currency: string },
    req: DepositRequest
  ): DepositResult {
    const txRef = 'DEP-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const newBalance = wallet.balance + req.amount;

    // Record double entry in ledger
    LedgerService.recordDoubleEntry({
      transactionRef: txRef,
      debitAccount: `GATEWAY_POOL_${req.channel}`,
      debitType: 'GATEWAY_CLEARING',
      debitBalanceAfter: 1000000 + req.amount,
      creditAccount: wallet.accountNumber,
      creditType: 'CUSTOMER_WALLET',
      creditBalanceAfter: newBalance,
      amount: req.amount,
      currency: req.currency,
      description: `Wallet Deposit via ${req.channel}`
    });

    wallet.balance = newBalance;

    return {
      depositId: 'DEP-ID-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      txRef,
      walletId: wallet.walletId,
      amount: req.amount,
      currency: req.currency,
      status: 'COMPLETED',
      newBalance,
      timestamp: new Date().toISOString(),
      channel: req.channel
    };
  }
}
