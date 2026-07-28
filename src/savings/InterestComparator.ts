export interface SavingsProduct {
  productId: string;
  partnerName: string;
  productTitle: string;
  apyPercent: number; // Annual Percentage Yield e.g. 8.5%
  lockupPeriodDays: number; // e.g. 30 days
  minimumDeposit: number;
  currency: string;
  riskRating: 'LOW' | 'VERY_LOW' | 'MODERATE';
  projectedEarnings30d: number;
  projectedEarnings1yr: number;
  isRecommended: boolean;
  features: string[];
}

export class InterestComparator {
  public static compareSavingsProducts(depositAmount: number, currency: string = 'USD'): SavingsProduct[] {
    const rawPartners = [
      {
        id: 'SAV-STANBIC-FLEX',
        partnerName: 'Stanbic Bank Open Vault',
        productTitle: 'FlexiEarn Fixed Deposit',
        apy: 8.5,
        lockupDays: 30,
        min: 100,
        risk: 'VERY_LOW' as const,
        features: ['Instant liquidity after 30 days', 'Government Deposit Protected', 'Zero monthly maintenance fee']
      },
      {
        id: 'SAV-MTN-INVEST',
        partnerName: 'MTN MoMo Invest Node',
        productTitle: 'High-Yield Treasury Fund',
        apy: 11.2,
        lockupDays: 90,
        min: 50,
        risk: 'LOW' as const,
        features: ['Daily compound interest', 'Automated MoMo payout', 'Capital guaranteed']
      },
      {
        id: 'SAV-MEHERAH-AI',
        partnerName: 'MEHERAH Autonomous Treasury Yield',
        productTitle: 'Optimized Liquidity Yield Vault',
        apy: 13.8,
        lockupDays: 14,
        min: 250,
        risk: 'LOW' as const,
        features: ['Dynamic AI provider rebalancing', 'Ultra-short 14-day cycle', 'Automated interest distribution']
      }
    ];

    return rawPartners.map(p => {
      const earn30d = (depositAmount * (p.apy / 100) * (30 / 365));
      const earn1yr = (depositAmount * (p.apy / 100));

      return {
        productId: p.id,
        partnerName: p.partnerName,
        productTitle: p.productTitle,
        apyPercent: p.apy,
        lockupPeriodDays: p.lockupDays,
        minimumDeposit: p.min,
        currency,
        riskRating: p.risk,
        projectedEarnings30d: Number(earn30d.toFixed(2)),
        projectedEarnings1yr: Number(earn1yr.toFixed(2)),
        isRecommended: p.id === 'SAV-MEHERAH-AI',
        features: p.features
      };
    }).sort((a, b) => b.apyPercent - a.apyPercent);
  }
}
