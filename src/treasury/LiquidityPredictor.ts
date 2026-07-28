export interface LiquidityPrediction {
  providerId: string;
  providerName: string;
  currentLiquidity: number;
  predicted24hVolume: number;
  predictedDeficit: number;
  shortageProbabilityPercent: number;
  timeToDepletionHours: number;
  recommendedTopUp: number;
  urgency: 'NONE' | 'LOW' | 'MEDIUM' | 'CRITICAL';
  reasoning: string;
}

export class LiquidityPredictor {
  public static predictProviderShortages(): LiquidityPrediction[] {
    const providers = [
      { id: 'flutterwave', name: 'Flutterwave Gateway Adapter', current: 285000, avgHourlyBurn: 18000 },
      { id: 'mtn_momo', name: 'MTN Mobile Money Core', current: 42000, avgHourlyBurn: 4500 },
      { id: 'airtel_money', name: 'Airtel Money Express', current: 18500, avgHourlyBurn: 3200 },
      { id: 'direct_bank', name: 'Direct Bank ACH/Swift', current: 650000, avgHourlyBurn: 22000 }
    ];

    return providers.map(p => {
      const predicted24hVolume = Math.round(p.avgHourlyBurn * 24 * (1 + (Math.random() - 0.5) * 0.2));
      const deficit = Math.max(0, predicted24hVolume - p.current);
      const hoursLeft = Number((p.current / p.avgHourlyBurn).toFixed(1));
      
      let urgency: 'NONE' | 'LOW' | 'MEDIUM' | 'CRITICAL' = 'NONE';
      let probability = 5;

      if (hoursLeft < 6) {
        urgency = 'CRITICAL';
        probability = 92;
      } else if (hoursLeft < 12) {
        urgency = 'MEDIUM';
        probability = 65;
      } else if (hoursLeft < 24) {
        urgency = 'LOW';
        probability = 35;
      }

      const recommendedTopUp = deficit > 0 ? Math.ceil(deficit * 1.2 / 5000) * 5000 : (urgency === 'MEDIUM' ? 10000 : 0);

      return {
        providerId: p.id,
        providerName: p.name,
        currentLiquidity: p.current,
        predicted24hVolume,
        predictedDeficit: deficit,
        shortageProbabilityPercent: probability,
        timeToDepletionHours: hoursLeft,
        recommendedTopUp,
        urgency,
        reasoning: urgency === 'NONE' 
          ? `Current pool sufficient for ~${hoursLeft} hours of peak volume.`
          : `High transaction burn rate (~$${p.avgHourlyBurn}/hr). Predicted buffer depletion in ${hoursLeft} hours.`
      };
    });
  }
}
