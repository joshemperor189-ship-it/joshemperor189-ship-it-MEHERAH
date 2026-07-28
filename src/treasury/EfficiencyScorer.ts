export interface ProviderMetric {
  providerId: string;
  name: string;
  latencyMs: number;
  successRate: number; // 0-100
  feePercent: number; // e.g. 0.5%
  fixedFee: number; // e.g. 0.10
  liquidityAvailable: number;
}

export interface ProviderEfficiencyScore {
  providerId: string;
  name: string;
  score: number; // 0 - 100 overall score
  latencyScore: number;
  successScore: number;
  costScore: number;
  liquidityScore: number;
  recommendation: 'PRIMARY' | 'SECONDARY' | 'FALLBACK' | 'SUSPENDED';
}

export class EfficiencyScorer {
  public static calculateScores(providers: ProviderMetric[]): ProviderEfficiencyScore[] {
    return providers.map(p => {
      // Latency score (under 100ms = 100, >1000ms = 0)
      const latencyScore = Math.max(0, Math.min(100, Math.round(100 - (p.latencyMs / 10))));

      // Success score
      const successScore = Math.max(0, Math.min(100, p.successRate));

      // Cost score (lower fee is better; 0% fee = 100, 3% fee = 0)
      const costScore = Math.max(0, Math.min(100, Math.round(100 - (p.feePercent * 30 + p.fixedFee * 10))));

      // Liquidity score (>1,000,000 = 100)
      const liquidityScore = Math.max(0, Math.min(100, Math.round((p.liquidityAvailable / 500000) * 100)));

      // Weighted overall efficiency score
      const score = Math.round(
        successScore * 0.40 +
        latencyScore * 0.25 +
        costScore * 0.20 +
        liquidityScore * 0.15
      );

      let recommendation: 'PRIMARY' | 'SECONDARY' | 'FALLBACK' | 'SUSPENDED' = 'FALLBACK';
      if (score >= 85) recommendation = 'PRIMARY';
      else if (score >= 70) recommendation = 'SECONDARY';
      else if (score >= 40) recommendation = 'FALLBACK';
      else recommendation = 'SUSPENDED';

      return {
        providerId: p.providerId,
        name: p.name,
        score,
        latencyScore,
        successScore,
        costScore,
        liquidityScore,
        recommendation
      };
    });
  }
}
