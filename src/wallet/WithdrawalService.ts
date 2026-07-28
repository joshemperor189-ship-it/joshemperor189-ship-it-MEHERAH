import { LedgerService } from './LedgerService';

export interface WithdrawalRequest {
  walletId: string;
  amount: number;
  currency: string;
  destinationChannel: 'MTN_MOMO' | 'AIRTEL_MONEY' | 'BANK_ACH';
  destinationAccount: string;
}

export interface WithdrawalResult {
  withdrawalId: string;
  txRef: string;
  walletId: string;
  amount: number;
  feeDeducted: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED_INSUFFICIENT_FUNDS';
  newBalance: number;
  timestamp: string;
  destinationAccount: string;
}

export class WithdrawalService {
  public static processWithdrawal(
    wallet: { walletId: string; accountNumber: string; balance: number; currency: string },
    req: WithdrawalRequest
  ): WithdrawalResult {
    const fee = Math.min(1.50, Math.round(req.amount * 0.005 * 100) / 100);
    const totalDeduction = req.amount + fee;

    if (wallet.balance < totalDeduction) {
      return {
        withdrawalId: 'WD-REJ-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        txRef: 'WD-FAIL',
        walletId: wallet.walletId,
        amount: req.amount,
        feeDeducted: 0,
        currency: req.currency,
        status: 'REJECTED_INSUFFICIENT_FUNDS',
        newBalance: wallet.balance,
        timestamp: new Date().toISOString(),
        destinationAccount: req.destinationAccount
      };
    }

    const txRef = 'WD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const newBalance = wallet.balance - totalDeduction;

    LedgerService.recordDoubleEntry({
      transactionRef: txRef,
      debitAccount: wallet.accountNumber,
      debitType: 'CUSTOMER_WALLET',
      debitBalanceAfter: newBalance,
      creditAccount: `DESTINATION_${req.destinationChannel}`,
      creditType: 'GATEWAY_CLEARING',
      creditBalanceAfter: 500000 + req.amount,
      amount: req.amount,
      currency: req.currency,
      description: `Wallet Withdrawal to ${req.destinationChannel} (${req.destinationAccount})`
    });

    wallet.balance = newBalance;

    return {
      withdrawalId: 'WD-ID-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      txRef,
      walletId: wallet.walletId,
      amount: req.amount,
      feeDeducted: fee,
      currency: req.currency,
      status: 'COMPLETED',
      newBalance,
      timestamp: new Date().toISOString(),
      destinationAccount: req.destinationAccount
    };
  }
}
