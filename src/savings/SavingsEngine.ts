import { InterestComparator, SavingsProduct } from './InterestComparator';
import { eventBus } from '../services/event-bus.service';

export interface UserSavingsAllocation {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  partnerName: string;
  amountAllocated: number;
  currency: string;
  apyPercent: number;
  status: 'PENDING_USER_APPROVAL' | 'ACTIVE' | 'MATURED' | 'WITHDRAWN';
  approvalRequiredMessage: string;
  createdAt: string;
}

export class SavingsEngine {
  private static instance: SavingsEngine;
  private userAllocations: UserSavingsAllocation[] = [];

  public static getInstance(): SavingsEngine {
    if (!SavingsEngine.instance) {
      SavingsEngine.instance = new SavingsEngine();
    }
    return SavingsEngine.instance;
  }

  public getAvailableOptions(amount: number = 1000, currency: string = 'USD'): SavingsProduct[] {
    return InterestComparator.compareSavingsProducts(amount, currency);
  }

  public proposeSavingsAllocation(userId: string, productId: string, amount: number, currency: string = 'USD'): UserSavingsAllocation {
    const products = this.getAvailableOptions(amount, currency);
    const chosen = products.find(p => p.productId === productId) || products[0];

    const allocation: UserSavingsAllocation = {
      id: 'SAV-ALLOC-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      userId,
      productId: chosen.productId,
      productTitle: chosen.productTitle,
      partnerName: chosen.partnerName,
      amountAllocated: amount,
      currency,
      apyPercent: chosen.apyPercent,
      status: 'PENDING_USER_APPROVAL',
      approvalRequiredMessage: `Confirm moving ${amount} ${currency} to ${chosen.productTitle} at ${chosen.apyPercent}% APY (Est. +$${chosen.projectedEarnings1yr}/yr)?`,
      createdAt: new Date().toISOString()
    };

    this.userAllocations.unshift(allocation);

    eventBus.publish('savings.proposed', 'Savings Intelligence Agent', {
      allocationId: allocation.id,
      product: chosen.productTitle,
      amount,
      status: allocation.status
    });

    return allocation;
  }

  public approveSavingsAllocation(allocationId: string): UserSavingsAllocation | null {
    const item = this.userAllocations.find(a => a.id === allocationId);
    if (!item) return null;

    item.status = 'ACTIVE';

    eventBus.publish('savings.approved', 'Savings Intelligence Agent', {
      allocationId: item.id,
      product: item.productTitle,
      amount: item.amountAllocated,
      status: 'ACTIVE'
    });

    return item;
  }

  public getUserAllocations(userId: string = 'usr_demo_001'): UserSavingsAllocation[] {
    return this.userAllocations.filter(a => a.userId === userId || userId === 'all');
  }
}

export const savingsEngine = SavingsEngine.getInstance();
