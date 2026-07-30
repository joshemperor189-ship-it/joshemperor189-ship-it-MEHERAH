export interface FinancialInsight {
  category: 'FEE_SAVINGS' | 'ROUTE_OPTIMIZATION' | 'BUDGET_PATTERN' | 'LIQUIDITY_HEALTH';
  title: string;
  description: string;
  potentialSavingsUGX: number;
  actionableStep: string;
}

export class FinancialAdvisorService {
  private static instance: FinancialAdvisorService;

  private constructor() {}

  public static getInstance(): FinancialAdvisorService {
    if (!FinancialAdvisorService.instance) {
      FinancialAdvisorService.instance = new FinancialAdvisorService();
    }
    return FinancialAdvisorService.instance;
  }

  public getPersonalizedInsights(userId: string = 'usr_a_uganda'): {
    spendingSummary: {
      totalVolume30dUGX: number;
      totalFeesPaidUGX: number;
      savedFeesByAiRoutingUGX: number;
      topMethod: string;
    };
    suggestions: FinancialInsight[];
  } {
    return {
      spendingSummary: {
        totalVolume30dUGX: 14250000,
        totalFeesPaidUGX: 114000,
        savedFeesByAiRoutingUGX: 42500,
        topMethod: 'MTN Mobile Money Core'
      },
      suggestions: [
        {
          category: 'FEE_SAVINGS',
          title: 'Batch Micro-Payments to Cut Provider Overhead',
          description: 'You executed 18 transfers under UGX 20,000 this week. Combining micro-payments into fewer daily batches can reduce total carrier fees.',
          potentialSavingsUGX: 18500,
          actionableStep: 'Enable MEHERAH Smart Batching for daily payroll and supplier payouts.'
        },
        {
          category: 'ROUTE_OPTIMIZATION',
          title: 'Use Direct Bank Clearing for Large Transfers (> UGX 5M)',
          description: 'Transfers above UGX 5,000,000 incurred card processing fees. Direct Bank Settlement Pool charges zero percentage markups for institutional volume.',
          potentialSavingsUGX: 75000,
          actionableStep: 'Set default route for transfers > UGX 5M to Direct Bank Settlement Pool.'
        },
        {
          category: 'BUDGET_PATTERN',
          title: 'Friday Evening Liquidity Spike Detected',
          description: 'Transaction volume increases by 340% on Friday between 17:00 and 21:00 EAT. Pre-funding MTN Mobile Money pools prevents peak-hour congestion delays.',
          potentialSavingsUGX: 12000,
          actionableStep: 'Schedule automatic Friday morning treasury rebalancing.'
        }
      ]
    };
  }
}

export const financialAdvisor = FinancialAdvisorService.getInstance();
