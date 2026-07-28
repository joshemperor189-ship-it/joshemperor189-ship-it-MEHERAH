export interface RouteEvaluation {
  providerId: string;
  providerName: string;
  paymentMethod: string;
  estimatedFee: number;
  estimatedFeePercentage: number;
  estimatedLatencySeconds: number;
  historicalSuccessRate: number;
  isAvailable: boolean;
  riskIndex: number; // 0.0 (safest) to 1.0 (highest risk)
}

export interface TransactionExecutionRequest {
  reference: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  userId: string;
  walletId: string;
}

export interface TransactionExecutionResult {
  success: boolean;
  reference: string;
  gatewayTransactionId: string;
  settledAmount: number;
  feeDeducted: number;
  currency: string;
  providerName: string;
  status: 'success' | 'pending' | 'failed';
  errorMessage?: string;
  executionTimestamp: string;
}

export interface IPaymentProvider {
  providerId: string;
  providerName: string;
  supportedMethods: string[];
  
  evaluateRoute(amount: number, currency: string, method: string): Promise<RouteEvaluation>;
  executeTransaction(request: TransactionExecutionRequest): Promise<TransactionExecutionResult>;
}
