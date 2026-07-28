import { IPaymentProvider, RouteEvaluation, TransactionExecutionRequest, TransactionExecutionResult } from './base.provider';

export class AirtelMoneyProvider implements IPaymentProvider {
  public providerId = 'airtel_money';
  public providerName = 'Airtel Money Express';
  public supportedMethods = ['mobile_money', 'momo'];

  async evaluateRoute(amount: number, currency: string, method: string): Promise<RouteEvaluation> {
    const feePct = 0.75;
    const estimatedFee = Math.round((amount * (feePct / 100)) * 100) / 100;

    return {
      providerId: this.providerId,
      providerName: this.providerName,
      paymentMethod: 'mobile_money',
      estimatedFee,
      estimatedFeePercentage: feePct,
      estimatedLatencySeconds: 4, // Very fast execution speed
      historicalSuccessRate: 98.9,
      isAvailable: true,
      riskIndex: 0.015
    };
  }

  async executeTransaction(req: TransactionExecutionRequest): Promise<TransactionExecutionResult> {
    const route = await this.evaluateRoute(req.amount, req.currency, req.paymentMethod);
    return {
      success: true,
      reference: req.reference,
      gatewayTransactionId: 'AIRTEL-' + Math.random().toString(36).substring(2, 11).toUpperCase(),
      settledAmount: req.amount - route.estimatedFee,
      feeDeducted: route.estimatedFee,
      currency: req.currency,
      providerName: this.providerName,
      status: 'success',
      executionTimestamp: new Date().toISOString()
    };
  }
}
