export interface FXRouteOption {
  routeId: string;
  sourceCurrency: string;
  targetCurrency: string;
  rate: number;
  spreadPercent: number;
  estimatedFee: number;
  provider: string;
  netAmountReceived: number;
  isOptimal: boolean;
  savingsVsBenchmark: number;
}

export class FXOptimizer {
  private static mockRates: Record<string, number> = {
    'USD_UGX': 3720,
    'UGX_USD': 0.0002688,
    'USD_KES': 130,
    'KES_USD': 0.00769,
    'EUR_USD': 1.08,
    'USD_EUR': 0.925,
    'USD_GHS': 15.2,
    'GHS_USD': 0.0657
  };

  public static getOptimalRoute(sourceCurrency: string, targetCurrency: string, amount: number): FXRouteOption[] {
    if (sourceCurrency === targetCurrency) {
      return [{
        routeId: 'FX-DIRECT-1',
        sourceCurrency,
        targetCurrency,
        rate: 1.0,
        spreadPercent: 0,
        estimatedFee: 0,
        provider: 'MEHERAH Direct Liquidity Node',
        netAmountReceived: amount,
        isOptimal: true,
        savingsVsBenchmark: 0
      }];
    }

    const pairKey = `${sourceCurrency}_${targetCurrency}`;
    const baseRate = this.mockRates[pairKey] || 1.0;

    const providers = [
      { id: 'p1', name: 'MEHERAH P2P Internal Netting Pool', spread: 0.002, fixedFee: 0.50 },
      { id: 'p2', name: 'Flutterwave Interbank Corridor', spread: 0.008, fixedFee: 1.20 },
      { id: 'p3', name: 'Standard Bank FX Vault', spread: 0.015, fixedFee: 2.50 }
    ];

    const options: FXRouteOption[] = providers.map((prov, index) => {
      const effectiveRate = baseRate * (1 - prov.spread);
      const grossTarget = amount * effectiveRate;
      const feeInTarget = prov.fixedFee * baseRate;
      const netAmountReceived = Math.max(0, grossTarget - feeInTarget);
      
      const benchmarkGross = amount * baseRate * (1 - 0.018); // 1.8% benchmark spread
      const savingsVsBenchmark = Math.max(0, netAmountReceived - benchmarkGross);

      return {
        routeId: `FX-OPT-${prov.id}`,
        sourceCurrency,
        targetCurrency,
        rate: Number(effectiveRate.toFixed(4)),
        spreadPercent: Number((prov.spread * 100).toFixed(2)),
        estimatedFee: Number(feeInTarget.toFixed(2)),
        provider: prov.name,
        netAmountReceived: Number(netAmountReceived.toFixed(2)),
        isOptimal: index === 0,
        savingsVsBenchmark: Number(savingsVsBenchmark.toFixed(2))
      };
    });

    return options.sort((a, b) => b.netAmountReceived - a.netAmountReceived);
  }
}
