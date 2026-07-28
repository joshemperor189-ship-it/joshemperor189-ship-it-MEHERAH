import { IPaymentProvider, RouteEvaluation, TransactionExecutionRequest, TransactionExecutionResult } from './base.provider';

export class BankTransferProvider implements IPaymentProvider {
  public providerId = 'direct_bank';
  public providerName = 'Direct Bank ACH/Swift Network';
  public supportedMethods = ['bank_transfer', 'wire'];

  async evaluateRoute(amount: number, currency: string, method: string): Promise<RouteEvaluation> {
    const feePct = 0.5; // Fixed lower rate for high-value banking transfers
    const estimatedFee = Math.round((amount * (feePct / 100)) * 100) / 100;

    return {
      providerId: this.providerId,
      providerName: this.providerName,
      paymentMethod: 'bank_transfer',
      estimatedFee,
      estimatedFeePercentage: feePct,
      estimatedLatencySeconds: amount > 20000 ? 120 : 15,
      historicalSuccessRate: 99.5,
      isAvailable: true,
      riskIndex: amount > 10000 ? 0.05 : 0.01
    };
  }

  async executeTransaction(req: TransactionExecutionRequest): Promise<TransactionExecutionResult> {
    const route = await this.evaluateRoute(req.amount, req.currency, req.paymentMethod);
    return {
      success: true,
      reference: req.reference,
      gatewayTransactionId: 'BANK-' + Date.now().toString(36).toUpperCase(),
      settledAmount: req.amount - route.estimatedFee,
      feeDeducted: route.estimatedFee,
      currency: req.currency,
      providerName: this.providerName,
      status: 'success',
      executionTimestamp: new Date().toISOString()
    };
  }
}
