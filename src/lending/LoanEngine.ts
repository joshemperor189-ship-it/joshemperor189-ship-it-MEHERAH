import { CreditRisk, CreditRiskAssessment } from './CreditRisk';
import { RepaymentPlanner, RepaymentScheduleItem } from './RepaymentPlanner';

export interface LoanOffer {
  offerId: string;
  lenderName: string;
  maxAmount: number;
  interestRateAnnual: number;
  tenureMonths: number;
  monthlyRepayment: number;
  totalRepayment: number;
  originationFee: number;
  recommendationReason: string;
  isRecommended: boolean;
  schedule: RepaymentScheduleItem[];
}

export class LoanEngine {
  private static instance: LoanEngine;

  public static getInstance(): LoanEngine {
    if (!LoanEngine.instance) {
      LoanEngine.instance = new LoanEngine();
    }
    return LoanEngine.instance;
  }

  public getLoanOffers(userId: string = 'usr_demo_001', requestedAmount: number = 5000): {
    assessment: CreditRiskAssessment;
    offers: LoanOffer[];
  } {
    const assessment = CreditRisk.evaluateUserRisk(userId, requestedAmount);

    const rawLenders = [
      {
        id: 'LEND-STANBIC-BUSINESS',
        name: 'Stanbic Bank SME Credit',
        rate: 12.5,
        tenure: 12,
        feePercent: 1.0,
        reason: 'Lowest APR for prime credit tier; direct bank clearance.'
      },
      {
        id: 'LEND-MTN-CAPITAL',
        name: 'MTN MoMo Business Advance',
        rate: 14.2,
        tenure: 6,
        feePercent: 0.5,
        reason: 'Instant 30-second mobile money disbursement with flexible 6-month terms.'
      },
      {
        id: 'LEND-MEHERAH-CREDIT',
        name: 'MEHERAH Autonomous Liquidity Facility',
        rate: 10.8,
        tenure: 12,
        feePercent: 0.2,
        reason: 'MEHERAH AI Recommended: Lowest total cost of capital with zero early repayment penalty.'
      }
    ];

    const offers: LoanOffer[] = rawLenders.map((lender) => {
      const schedule = RepaymentPlanner.generateSchedule(requestedAmount, lender.rate, lender.tenure);
      const monthlyRepayment = schedule.length > 0 ? schedule[0].totalInstallment : 0;
      const totalRepayment = schedule.reduce((acc, curr) => acc + curr.totalInstallment, 0);
      const originationFee = Number((requestedAmount * (lender.feePercent / 100)).toFixed(2));

      return {
        offerId: lender.id,
        lenderName: lender.name,
        maxAmount: Math.min(requestedAmount, assessment.maxEligibleAmount),
        interestRateAnnual: lender.rate,
        tenureMonths: lender.tenure,
        monthlyRepayment,
        totalRepayment: Number(totalRepayment.toFixed(2)),
        originationFee,
        recommendationReason: lender.reason,
        isRecommended: lender.id === 'LEND-MEHERAH-CREDIT',
        schedule
      };
    }).sort((a, b) => a.interestRateAnnual - b.interestRateAnnual);

    return { assessment, offers };
  }
}

export const loanEngine = LoanEngine.getInstance();
