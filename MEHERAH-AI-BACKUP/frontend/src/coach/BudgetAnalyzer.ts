export interface CategorySpending {
  category: string;
  spentAmount: number;
  budgetAmount: number;
  percentUsed: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  anomalyDetected: boolean;
  anomalyDetails?: string;
}

export interface BudgetHealthReport {
  totalSpentMonth: number;
  totalBudgetMonth: number;
  healthScore: number; // 0 - 100
  categories: CategorySpending[];
  unusualActivityAlerts: string[];
  savingsOpportunities: string[];
}

export class BudgetAnalyzer {
  public static analyzeUserBudget(userId: string): BudgetHealthReport {
    const categories: CategorySpending[] = [
      {
        category: 'Cross-Border Gateway Fees',
        spentAmount: 185.20,
        budgetAmount: 250.00,
        percentUsed: 74,
        trend: 'DOWN',
        anomalyDetected: false
      },
      {
        category: 'Mobile Money Disbursements',
        spentAmount: 1420.00,
        budgetAmount: 1500.00,
        percentUsed: 94,
        trend: 'UP',
        anomalyDetected: true,
        anomalyDetails: 'Unexpected 40% surge in late-night USSD transfer fees detected on Airtel corridor.'
      },
      {
        category: 'Operational Liquidity Reserves',
        spentAmount: 3200.00,
        budgetAmount: 4000.00,
        percentUsed: 80,
        trend: 'STABLE',
        anomalyDetected: false
      },
      {
        category: 'Partner Settlement Clearing',
        spentAmount: 890.00,
        budgetAmount: 1200.00,
        percentUsed: 74,
        trend: 'DOWN',
        anomalyDetected: false
      }
    ];

    const totalSpent = categories.reduce((acc, c) => acc + c.spentAmount, 0);
    const totalBudget = categories.reduce((acc, c) => acc + c.budgetAmount, 0);
    const healthScore = 88;

    const unusualActivityAlerts = categories
      .filter(c => c.anomalyDetected && c.anomalyDetails)
      .map(c => c.anomalyDetails!);

    const savingsOpportunities = [
      'Switching $1,420 in Airtel MoMo transfers to MEHERAH P2P Netting saves ~$42.60/mo in USSD network fees.',
      'Moving $2,500 idle wallet liquidity to MEHERAH High-Yield Treasury Vault earns +$28.75/month in automated interest.'
    ];

    return {
      totalSpentMonth: Number(totalSpent.toFixed(2)),
      totalBudgetMonth: Number(totalBudget.toFixed(2)),
      healthScore,
      categories,
      unusualActivityAlerts,
      savingsOpportunities
    };
  }
}
