import { DepositService, DepositRequest, DepositResult } from './DepositService';
import { WithdrawalService, WithdrawalRequest, WithdrawalResult } from './WithdrawalService';
import { TransferService, TransferRequest, TransferResult } from './TransferService';
import { LedgerService, LedgerEntry } from './LedgerService';

export interface Wallet {
  walletId: string;
  userId: string;
  accountNumber: string;
  currency: string;
  balance: number;
  status: 'ACTIVE' | 'FROZEN' | 'RESTRICTED';
  createdAt: string;
}

export class WalletService {
  private static instance: WalletService;
  private wallets: Map<string, Wallet> = new Map();

  private constructor() {
    // Seed a primary default wallet for demo/testing
    const demoWallet: Wallet = {
      walletId: 'WAL-MEHERAH-001',
      userId: 'usr_demo_001',
      accountNumber: 'ACC-256-788102',
      currency: 'USD',
      balance: 14250.00,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    this.wallets.set(demoWallet.walletId, demoWallet);
  }

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  public getOrCreateWallet(userId: string = 'usr_demo_001', currency: string = 'USD'): Wallet {
    for (const w of this.wallets.values()) {
      if (w.userId === userId && w.currency === currency) {
        return w;
      }
    }

    const newWallet: Wallet = {
      walletId: 'WAL-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      userId,
      accountNumber: 'ACC-256-' + Math.floor(100000 + Math.random() * 900000),
      currency,
      balance: 500.00,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    this.wallets.set(newWallet.walletId, newWallet);
    return newWallet;
  }

  public getBalance(walletId: string = 'WAL-MEHERAH-001'): Wallet | null {
    return this.wallets.get(walletId) || Array.from(this.wallets.values())[0] || null;
  }

  public deposit(walletId: string, req: DepositRequest): DepositResult {
    const wallet = this.wallets.get(walletId) || Array.from(this.wallets.values())[0];
    return DepositService.processDeposit(wallet, req);
  }

  public withdraw(walletId: string, req: WithdrawalRequest): WithdrawalResult {
    const wallet = this.wallets.get(walletId) || Array.from(this.wallets.values())[0];
    return WithdrawalService.processWithdrawal(wallet, req);
  }

  public transfer(req: TransferRequest): TransferResult {
    const sender = this.wallets.get(req.senderWalletId) || Array.from(this.wallets.values())[0];
    
    // Find recipient by account number
    let recipient: Wallet | null = null;
    for (const w of this.wallets.values()) {
      if (w.accountNumber === req.recipientAccountNumberOrEmail || w.userId === req.recipientAccountNumberOrEmail) {
        recipient = w;
        break;
      }
    }

    return TransferService.processP2PTransfer(sender, recipient, req);
  }

  public getLedgerForWallet(walletId: string): LedgerEntry[] {
    const wallet = this.wallets.get(walletId) || Array.from(this.wallets.values())[0];
    return LedgerService.getEntriesForAccount(wallet.accountNumber);
  }
}

export const walletService = WalletService.getInstance();
