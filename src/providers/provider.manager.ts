import { IPaymentProvider, RouteEvaluation } from './base.provider';
import { FlutterwaveProvider } from './flutterwave.provider';
import { MtnMomoProvider } from './mtn.provider';
import { AirtelMoneyProvider } from './airtel.provider';
import { BankTransferProvider } from './bank.provider';

export interface RouteOption extends RouteEvaluation {
  score: number; // 0 to 100 calculated suitability score
  aiRecommendation: string;
}

export class ProviderManager {
  private providers: Map<string, IPaymentProvider> = new Map();

  constructor() {
    this.registerProvider(new FlutterwaveProvider());
    this.registerProvider(new MtnMomoProvider());
    this.registerProvider(new AirtelMoneyProvider());
    this.registerProvider(new BankTransferProvider());
  }

  public registerProvider(provider: IPaymentProvider): void {
    this.providers.set(provider.providerId, provider);
  }

  public getProvider(providerId: string): IPaymentProvider | undefined {
    return this.providers.get(providerId);
  }

  public async evaluateAllRoutes(amount: number, currency: string = 'USD', preferredMethod?: string): Promise<RouteOption[]> {
    const evaluations: RouteOption[] = [];

    for (const provider of this.providers.values()) {
      const methodsToTest = preferredMethod ? [preferredMethod] : provider.supportedMethods;
      for (const method of methodsToTest) {
        if (!provider.supportedMethods.includes(method) && preferredMethod) continue;
        try {
          const evalResult = await provider.evaluateRoute(amount, currency, method);
          
          // Calculate composite AI Routing Score
          // Weight factors: Success Rate (40%), Low Fee (30%), Low Latency (20%), Low Risk (10%)
          const feeFactor = Math.max(0, 100 - (evalResult.estimatedFeePercentage * 30));
          const latencyFactor = Math.max(0, 100 - (evalResult.estimatedLatencySeconds * 3));
          const successFactor = evalResult.historicalSuccessRate;
          const riskFactor = (1 - evalResult.riskIndex) * 100;

          const score = Math.round((successFactor * 0.4) + (feeFactor * 0.3) + (latencyFactor * 0.2) + (riskFactor * 0.1));

          let aiRecommendation = `Optimal speed (${evalResult.estimatedLatencySeconds}s) & high stability (${evalResult.historicalSuccessRate}%)`;
          if (evalResult.estimatedFeePercentage <= 0.8) {
            aiRecommendation = `Lowest transaction fee tier (${evalResult.estimatedFeePercentage}%) selected for liquidity optimization`;
          } else if (evalResult.riskIndex > 0.5) {
            aiRecommendation = `Flagged for secondary risk clearance before release`;
          }

          evaluations.push({
            ...evalResult,
            score,
            aiRecommendation
          });
        } catch (e) {
          // Ignore unavailable route evaluations safely
        }
      }
    }

    // Sort by AI composite score descending
    return evaluations.sort((a, b) => b.score - a.score);
  }
}

export const providerManager = new ProviderManager();
