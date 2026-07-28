import { eventBus } from '../services/event-bus.service';

export interface RebalanceInstruction {
  id: string;
  sourceProviderId: string;
  sourceProviderName: string;
  targetProviderId: string;
  targetProviderName: string;
  amount: number;
  currency: string;
  estimatedFee: number;
  reason: string;
  status: 'PROPOSED' | 'EXECUTING' | 'COMPLETED' | 'REJECTED';
  timestamp: string;
  requiresOperatorApproval: boolean;
}

export class RebalancingEngine {
  private static rebalanceHistory: RebalanceInstruction[] = [];

  public static proposeRebalancing(
    sourceId: string, 
    sourceName: string, 
    targetId: string, 
    targetName: string, 
    amount: number, 
    currency: string = 'USD', 
    reason: string = 'Automated Liquidity Shortage Defense'
  ): RebalanceInstruction {
    const requiresApproval = amount > 50000;

    const instruction: RebalanceInstruction = {
      id: 'REBAL-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      sourceProviderId: sourceId,
      sourceProviderName: sourceName,
      targetProviderId: targetId,
      targetProviderName: targetName,
      amount,
      currency,
      estimatedFee: Math.round(amount * 0.001 * 100) / 100,
      reason,
      status: requiresApproval ? 'PROPOSED' : 'EXECUTING',
      timestamp: new Date().toISOString(),
      requiresOperatorApproval: requiresApproval
    };

    if (!requiresApproval) {
      setTimeout(() => {
        instruction.status = 'COMPLETED';
        eventBus.publish('treasury.rebalanced', 'Rebalancing Engine', {
          rebalanceId: instruction.id,
          amount,
          source: sourceName,
          target: targetName,
          status: 'COMPLETED'
        });
      }, 1500);
    }

    this.rebalanceHistory.unshift(instruction);
    return instruction;
  }

  public static executeRebalance(id: string): RebalanceInstruction | null {
    const item = this.rebalanceHistory.find(r => r.id === id);
    if (!item) return null;

    item.status = 'COMPLETED';
    eventBus.publish('treasury.rebalanced', 'Rebalancing Engine', {
      rebalanceId: item.id,
      amount: item.amount,
      source: item.sourceProviderName,
      target: item.targetProviderName,
      status: 'COMPLETED'
    });

    return item;
  }

  public static getHistory(): RebalanceInstruction[] {
    return this.rebalanceHistory;
  }
}
