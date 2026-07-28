import { LedgerService } from './LedgerService';

export interface TransferRequest {
  senderWalletId: string;
  recipientAccountNumberOrEmail: string;
  amount: number;
  currency: string;
  note?: string;
}

export interface TransferResult {
  transferId: string;
  txRef: string;
  senderWalletId: string;
  recipientAccount: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'FAILED_INSUFFICIENT_FUNDS' | 'REJECTED';
  senderNewBalance: number;
  timestamp: string;
}

export class TransferService {
  public static processP2PTransfer(
    senderWallet: { walletId: string; accountNumber: string; balance: number; currency: string },
    recipientWallet: { walletId: string; accountNumber: string; balance: number; currency: string } | null,
    req: TransferRequest
  ): TransferResult {
    if (senderWallet.balance < req.amount) {
      return {
        transferId: 'TRF-FAIL',
        txRef: 'TRF-FAIL-REF',
        senderWalletId: senderWallet.walletId,
        recipientAccount: req.recipientAccountNumberOrEmail,
        amount: req.amount,
        currency: req.currency,
        status: 'FAILED_INSUFFICIENT_FUNDS',
        senderNewBalance: senderWallet.balance,
        timestamp: new Date().toISOString()
      };
    }

    const txRef = 'TRF-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const senderNewBal = senderWallet.balance - req.amount;
    senderWallet.balance = senderNewBal;

    let recipientAccountNum = req.recipientAccountNumberOrEmail;
    if (recipientWallet) {
      recipientAccountNum = recipientWallet.accountNumber;
      recipientWallet.balance += req.amount;
    }

    LedgerService.recordDoubleEntry({
      transactionRef: txRef,
      debitAccount: senderWallet.accountNumber,
      debitType: 'CUSTOMER_WALLET',
      debitBalanceAfter: senderNewBal,
      creditAccount: recipientAccountNum,
      creditType: 'CUSTOMER_WALLET',
      creditBalanceAfter: recipientWallet ? recipientWallet.balance : 0,
      amount: req.amount,
      currency: req.currency,
      description: `P2P Transfer to ${recipientAccountNum}`
    });

    return {
      transferId: 'TRF-ID-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      txRef,
      senderWalletId: senderWallet.walletId,
      recipientAccount: recipientAccountNum,
      amount: req.amount,
      currency: req.currency,
      status: 'COMPLETED',
      senderNewBalance: senderNewBal,
      timestamp: new Date().toISOString()
    };
  }
}
