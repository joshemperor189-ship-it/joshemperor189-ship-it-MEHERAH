import { IPaymentProvider, RouteEvaluation, TransactionExecutionRequest, TransactionExecutionResult } from './base.provider';

export class FlutterwaveProvider implements IPaymentProvider {
  public providerId = 'flutterwave';
  public providerName = 'Flutterwave Gateway';
  public supportedMethods = ['card', 'bank_transfer', 'momo'];

  async evaluateRoute(amount: number, currency: string, method: string): Promise<RouteEvaluation> {
    const isCard = method === 'card';
    const feePct = isCard ? 1.4 : 1.1;
    const estimatedFee = Math.round((amount * (feePct / 100)) * 100) / 100;

    return {
      providerId: this.providerId,
      providerName: this.providerName,
      paymentMethod: method,
      estimatedFee,
      estimatedFeePercentage: feePct,
      estimatedLatencySeconds: isCard ? 3 : 8,
      historicalSuccessRate: 98.6,
      isAvailable: true,
      riskIndex: amount > 5000 ? 0.12 : 0.02
    };
  }

  async executeTransaction(req: TransactionExecutionRequest): Promise<TransactionExecutionResult> {
    const route = await this.evaluateRoute(req.amount, req.currency, req.paymentMethod);
    const settledAmount = req.amount - route.estimatedFee;

    return {
      success: true,
      reference: req.reference,
      gatewayTransactionId: 'FLW-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      settledAmount,
      feeDeducted: route.estimatedFee,
      currency: req.currency,
      providerName: this.providerName,
      status: 'success',
      executionTimestamp: new Date().toISOString()
    };
  }
}
