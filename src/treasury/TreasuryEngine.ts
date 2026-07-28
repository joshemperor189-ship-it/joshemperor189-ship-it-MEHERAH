import { LiquidityPredictor, LiquidityPrediction } from './LiquidityPredictor';
import { EfficiencyScorer, ProviderEfficiencyScore } from './EfficiencyScorer';
import { FXOptimizer, FXRouteOption } from './FXOptimizer';
import { RebalancingEngine, RebalanceInstruction } from './RebalancingEngine';

export class TreasuryEngine {
  private static instance: TreasuryEngine;

  public static getInstance(): TreasuryEngine {
    if (!TreasuryEngine.instance) {
      TreasuryEngine.instance = new TreasuryEngine();
    }
    return TreasuryEngine.instance;
  }

  public getLiquidityOverview() {
    const predictions = LiquidityPredictor.predictProviderShortages();
    const totalLiquidity = predictions.reduce((acc, p) => acc + p.currentLiquidity, 0);
    const criticalProviders = predictions.filter(p => p.urgency === 'CRITICAL' || p.urgency === 'MEDIUM');

    return {
      totalLiquidityUSD: totalLiquidity,
      activeProvidersCount: predictions.length,
      criticalShortageAlertsCount: criticalProviders.length,
      predictions
    };
  }

  public getEfficiencyScores(): ProviderEfficiencyScore[] {
    const metrics = [
      { providerId: 'flutterwave', name: 'Flutterwave Gateway Adapter', latencyMs: 145, successRate: 99.2, feePercent: 0.8, fixedFee: 0.25, liquidityAvailable: 285000 },
      { providerId: 'mtn_momo', name: 'MTN Mobile Money Core', latencyMs: 210, successRate: 98.7, feePercent: 0.5, fixedFee: 0.10, liquidityAvailable: 42000 },
      { providerId: 'airtel_money', name: 'Airtel Money Express', latencyMs: 180, successRate: 97.9, feePercent: 0.5, fixedFee: 0.10, liquidityAvailable: 18500 },
      { providerId: 'direct_bank', name: 'Direct Bank ACH/Swift', latencyMs: 420, successRate: 99.8, feePercent: 0.2, fixedFee: 1.50, liquidityAvailable: 650000 }
    ];

    return EfficiencyScorer.calculateScores(metrics);
  }

  public getFxOptimization(source: string, target: string, amount: number): FXRouteOption[] {
    return FXOptimizer.getOptimalRoute(source, target, amount);
  }

  public triggerRebalance(sourceId: string, sourceName: string, targetId: string, targetName: string, amount: number) {
    return RebalancingEngine.proposeRebalancing(sourceId, sourceName, targetId, targetName, amount);
  }
}

export const treasuryEngine = TreasuryEngine.getInstance();
