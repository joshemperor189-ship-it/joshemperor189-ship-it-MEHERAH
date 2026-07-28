import { BudgetAnalyzer, BudgetHealthReport } from './BudgetAnalyzer';

export interface FinancialCoachInsight {
  id: string;
  type: 'COST_SAVING' | 'LIQUIDITY_OPTIMIZATION' | 'ANOMALY_WARNING' | 'GOAL_PROGRESS';
  title: string;
  description: string;
  actionableRecommendation: string;
  estimatedMonthlyImpactUSD: number;
  confidenceScore: number;
  timestamp: string;
}

export class FinancialCoach {
  private static instance: FinancialCoach;

  public static getInstance(): FinancialCoach {
    if (!FinancialCoach.instance) {
      FinancialCoach.instance = new FinancialCoach();
    }
    return FinancialCoach.instance;
  }

  public getFinancialHealthOverview(userId: string = 'usr_demo_001'): {
    report: BudgetHealthReport;
    insights: FinancialCoachInsight[];
    coachingSummary: string;
  } {
    const report = BudgetAnalyzer.analyzeUserBudget(userId);

    const insights: FinancialCoachInsight[] = [
      {
        id: 'COACH-001',
        type: 'COST_SAVING',
        title: 'Route Optimization Opportunity',
        description: 'Detected 18 transactions routed through high-fee gateways during peak hours.',
        actionableRecommendation: 'Enable MEHERAH Financial Optimiser Agent to automatically select P2P Netting routes.',
        estimatedMonthlyImpactUSD: 48.50,
        confidenceScore: 98.4,
        timestamp: new Date().toISOString()
      },
      {
        id: 'COACH-002',
        type: 'LIQUIDITY_OPTIMIZATION',
        title: 'Idle Liquidity Auto-Yield Recommendation',
        description: '$8,500 of wallet balance remained idle for >14 days without earning interest.',
        actionableRecommendation: 'Allocate $5,000 to MEHERAH Treasury Yield Vault at 13.8% APY.',
        estimatedMonthlyImpactUSD: 57.50,
        confidenceScore: 99.1,
        timestamp: new Date().toISOString()
      },
      {
        id: 'COACH-003',
        type: 'ANOMALY_WARNING',
        title: 'Unusual Fee Spike Flagged',
        description: 'Airtel Money USSD gateway fees surged 40% between 23:00 and 02:00 UTC.',
        actionableRecommendation: 'Schedule batch disbursements during non-peak windows or switch fallback to MTN MoMo.',
        estimatedMonthlyImpactUSD: 24.10,
        confidenceScore: 95.8,
        timestamp: new Date().toISOString()
      }
    ];

    const coachingSummary = `Overall Financial Health Score: ${report.healthScore}/100. MEHERAH Coach Agent identified 3 actionable optimizations saving up to $${insights.reduce((acc, i) => acc + i.estimatedMonthlyImpactUSD, 0).toFixed(2)}/month.`;

    return {
      report,
      insights,
      coachingSummary
    };
  }
}

export const financialCoach = FinancialCoach.getInstance();
