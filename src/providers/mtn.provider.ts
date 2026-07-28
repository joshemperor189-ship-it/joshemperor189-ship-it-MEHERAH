import { IPaymentProvider, RouteEvaluation, TransactionExecutionRequest, TransactionExecutionResult } from './base.provider';

export class MtnMomoProvider implements IPaymentProvider {
  public providerId = 'mtn_momo';
  public providerName = 'MTN Mobile Money Core';
  public supportedMethods = ['mobile_money', 'momo'];

  async evaluateRoute(amount: number, currency: string, method: string): Promise<RouteEvaluation> {
    const feePct = 0.8; // Lower fees for mobile money in East/West Africa
    const estimatedFee = Math.round((amount * (feePct / 100)) * 100) / 100;

    return {
      providerId: this.providerId,
      providerName: this.providerName,
      paymentMethod: 'mobile_money',
      estimatedFee,
      estimatedFeePercentage: feePct,
      estimatedLatencySeconds: 6,
      historicalSuccessRate: 99.2,
      isAvailable: true,
      riskIndex: 0.01 // Very low risk for direct carrier PIN auth
    };
  }

  async executeTransaction(req: TransactionExecutionRequest): Promise<TransactionExecutionResult> {
    const route = await this.evaluateRoute(req.amount, req.currency, req.paymentMethod);
    return {
      success: true,
      reference: req.reference,
      gatewayTransactionId: 'MTN-' + Math.floor(1000000000 + Math.random() * 9000000000),
      settledAmount: req.amount - route.estimatedFee,
      feeDeducted: route.estimatedFee,
      currency: req.currency,
      providerName: this.providerName,
      status: 'success',
      executionTimestamp: new Date().toISOString()
    };
  }
}
