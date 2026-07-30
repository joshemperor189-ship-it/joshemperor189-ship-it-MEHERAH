import { LedgerService, LedgerEntry } from '../wallet/LedgerService';
import { eventBus } from './event-bus.service';

export interface SandboxUserWallet {
  userId: string;
  name: string;
  phone: string;
  accountNumber: string;
  currency: string;
  balance: number;
  status: 'ACTIVE' | 'FROZEN';
  createdAt: string;
}

export class SandboxWalletManager {
  private static instance: SandboxWalletManager;
  private users: Map<string, SandboxUserWallet> = new Map();

  private constructor() {
    // Seed Phase 3 Test Users
    const userA: SandboxUserWallet = {
      userId: 'usr_a_uganda',
      name: 'User A (Kampala Merchant)',
      phone: '+256770001122',
      accountNumber: 'ACC-UG-700112',
      currency: 'UGX',
      balance: 500000,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    const userB: SandboxUserWallet = {
      userId: 'usr_b_uganda',
      name: 'User B (Entebbe Trader)',
      phone: '+256788990011',
      accountNumber: 'ACC-UG-889001',
      currency: 'UGX',
      balance: 100000,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    this.users.set(userA.userId, userA);
    this.users.set(userB.userId, userB);
  }

  public static getInstance(): SandboxWalletManager {
    if (!SandboxWalletManager.instance) {
      SandboxWalletManager.instance = new SandboxWalletManager();
    }
    return SandboxWalletManager.instance;
  }

  public getAllUsers(): SandboxUserWallet[] {
    return Array.from(this.users.values());
  }

  public getUser(userId: string): SandboxUserWallet | undefined {
    return this.users.get(userId);
  }

  public getUserByPhoneOrAccount(identifier: string): SandboxUserWallet | undefined {
    for (const u of this.users.values()) {
      if (u.phone === identifier || u.accountNumber === identifier || u.userId === identifier) {
        return u;
      }
    }
    return undefined;
  }

  public updateBalance(userId: string, deltaAmount: number): number {
    const user = this.users.get(userId);
    if (!user) return 0;
    user.balance += deltaAmount;
    return user.balance;
  }

  public executeCrossProviderPayment(params: {
    senderId: string;
    destinationPhoneOrAccount: string;
    amountUGX: number;
    chosenProviderName: string;
    feeUGX: number;
    aiReasoning: string;
  }) {
    const sender = this.users.get(params.senderId) || Array.from(this.users.values())[0];
    const totalDeduction = params.amountUGX + params.feeUGX;

    if (sender.balance < totalDeduction) {
      throw new Error(`Insufficient funds in ${sender.name} wallet. Available: UGX ${sender.balance.toLocaleString()}, Required: UGX ${totalDeduction.toLocaleString()}`);
    }

    const txRef = 'MEHERAH-P3-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    // Deduct sender balance
    sender.balance -= totalDeduction;

    // Credit recipient if internal or credit provider clearing pool
    const recipient = this.getUserByPhoneOrAccount(params.destinationPhoneOrAccount);
    let recipientAccount = params.destinationPhoneOrAccount;
    if (recipient) {
      recipient.balance += params.amountUGX;
      recipientAccount = recipient.accountNumber;
    }

    // Double-entry ledger recording
    const ledger = LedgerService.recordDoubleEntry({
      transactionRef: txRef,
      debitAccount: sender.accountNumber,
      debitType: 'CUSTOMER_WALLET',
      debitBalanceAfter: sender.balance,
      creditAccount: recipientAccount,
      creditType: recipient ? 'CUSTOMER_WALLET' : 'GATEWAY_CLEARING',
      creditBalanceAfter: recipient ? recipient.balance : 1000000 + params.amountUGX,
      amount: params.amountUGX,
      currency: 'UGX',
      description: `Cross-Provider Payment via ${params.chosenProviderName} to ${params.destinationPhoneOrAccount}`
    });

    eventBus.publish('payment.executed', 'Payment Execution Agent', {
      txRef,
      sender: sender.name,
      destination: params.destinationPhoneOrAccount,
      amountUGX: params.amountUGX,
      feeUGX: params.feeUGX,
      provider: params.chosenProviderName,
      status: 'SUCCESS'
    });

    return {
      txRef,
      senderUserId: sender.userId,
      senderNewBalance: sender.balance,
      recipientAccount,
      amountUGX: params.amountUGX,
      feeUGX: params.feeUGX,
      provider: params.chosenProviderName,
      ledger,
      aiReasoning: params.aiReasoning,
      timestamp: new Date().toISOString()
    };
  }
}

export const sandboxWalletManager = SandboxWalletManager.getInstance();
