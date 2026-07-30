export interface LiquidityCapacityForecast {
  railId: string;
  railName: string;
  currentLiquidityReserveUGX: number;
  projectedPeakDemandUGX: number;
  recommendedSweepAmountUGX: number;
  bufferHealthPct: number;
  predictedRiskLevel: 'LOW_RESERVE' | 'OPTIMAL_CAPACITY' | 'SURPLUS_LIQUIDITY';
  forecastHorizonHours: number;
}

export interface NetworkTrafficLoadPrediction {
  region: 'UGANDA_CENTRAL' | 'EAST_AFRICA_REGIONAL' | 'WEST_AFRICA_HUB' | 'SOUTHERN_AFRICA';
  currentTps: number;
  predictedPeakTps: number;
  networkRiskScorePct: number;
  bottleneckWarning?: string;
  recommendedRoutingPolicy: string;
}

export class CapacityPlannerService {
  private static instance: CapacityPlannerService;

  private forecasts: LiquidityCapacityForecast[] = [
    {
      railId: 'RAIL-MTN-01',
      railName: 'MTN Mobile Money UG Reserve Pool',
      currentLiquidityReserveUGX: 1850000000, // UGX 1.85B
      projectedPeakDemandUGX: 2400000000, // UGX 2.4B peak expected during 5 PM payroll
      recommendedSweepAmountUGX: 550000000,
      bufferHealthPct: 77.08,
      predictedRiskLevel: 'LOW_RESERVE',
      forecastHorizonHours: 6
    },
    {
      railId: 'RAIL-STB-02',
      railName: 'Stanbic Bank BOU Clearing Escrow',
      currentLiquidityReserveUGX: 12500000000, // UGX 12.5B
      projectedPeakDemandUGX: 8000000000,
      recommendedSweepAmountUGX: 0,
      bufferHealthPct: 156.25,
      predictedRiskLevel: 'SURPLUS_LIQUIDITY',
      forecastHorizonHours: 24
    },
    {
      railId: 'RAIL-AIRTEL-03',
      railName: 'Airtel Money Regional Liquidity Buffer',
      currentLiquidityReserveUGX: 950000000,
      projectedPeakDemandUGX: 900000000,
      recommendedSweepAmountUGX: 100000000,
      bufferHealthPct: 105.55,
      predictedRiskLevel: 'OPTIMAL_CAPACITY',
      forecastHorizonHours: 12
    }
  ];

  private trafficPredictions: NetworkTrafficLoadPrediction[] = [
    {
      region: 'UGANDA_CENTRAL',
      currentTps: 12400,
      predictedPeakTps: 28500,
      networkRiskScorePct: 12.4,
      bottleneckWarning: 'High MoMo agent cash-out volume anticipated in Kampala Metro area.',
      recommendedRoutingPolicy: 'Pre-fund Stanbic ACH Direct for large batch disbursements (>UGX 50M).'
    },
    {
      region: 'EAST_AFRICA_REGIONAL',
      currentTps: 6000,
      predictedPeakTps: 15000,
      networkRiskScorePct: 22.1,
      bottleneckWarning: 'Cross-border KES/UGX corridor volume growing at 18% hour-over-hour.',
      recommendedRoutingPolicy: 'Activate Automated FX Buffer Hedge on Flutterwave Gateway.'
    }
  ];

  private constructor() {}

  public static getInstance(): CapacityPlannerService {
    if (!CapacityPlannerService.instance) {
      CapacityPlannerService.instance = new CapacityPlannerService();
    }
    return CapacityPlannerService.instance;
  }

  public getCapacityOverview() {
    return {
      forecasts: [...this.forecasts],
      trafficPredictions: [...this.trafficPredictions]
    };
  }

  public executeLiquiditySweep(railId: string): LiquidityCapacityForecast {
    const f = this.forecasts.find(item => item.railId === railId);
    if (!f) throw new Error('Rail forecast not found');
    f.currentLiquidityReserveUGX += f.recommendedSweepAmountUGX;
    f.recommendedSweepAmountUGX = 0;
    f.bufferHealthPct = (f.currentLiquidityReserveUGX / f.projectedPeakDemandUGX) * 100;
    f.predictedRiskLevel = f.bufferHealthPct >= 100 ? 'OPTIMAL_CAPACITY' : 'LOW_RESERVE';
    return { ...f };
  }
}

export const capacityPlanner = CapacityPlannerService.getInstance();
