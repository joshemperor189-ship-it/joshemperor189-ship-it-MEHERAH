export interface ConnectorConfig {
  connectorId: string;
  providerName: string;
  baseUrl: string;
  apiKey: string;
  secretKey: string;
  environment: 'sandbox' | 'production';
  timeoutMs?: number;
}

export interface StandardizedPaymentPayload {
  merchantReference: string;
  amount: number;
  currency: string;
  recipientIdentifier: string;
  senderIdentifier: string;
  callbackUrl?: string;
}

export interface StandardizedPaymentResponse {
  success: boolean;
  providerTransactionRef: string;
  meherahRef: string;
  settledAmount: number;
  feeAmount: number;
  latencyMs: number;
  rawStatus: string;
  timestamp: string;
}

export abstract class BaseConnectorSDK {
  protected config: ConnectorConfig;

  constructor(config: ConnectorConfig) {
    this.config = config;
  }

  abstract ping(): Promise<{ ok: boolean; latencyMs: number }>;
  abstract executePayment(payload: StandardizedPaymentPayload): Promise<StandardizedPaymentResponse>;
  abstract checkStatus(providerTxRef: string): Promise<{ status: 'SUCCESS' | 'PENDING' | 'FAILED'; details?: string }>;
}

export class ConnectorSDKFactory {
  public static createTemplateCode(providerName: string, category: string): string {
    return `import { BaseConnectorSDK, StandardizedPaymentPayload, StandardizedPaymentResponse } from './ConnectorSDK';

export class ${providerName.replace(/[^a-zA-Z0-9]/g, '')}Connector extends BaseConnectorSDK {
  public async ping(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    // Execute heartbeat request
    return { ok: true, latencyMs: Date.now() - start };
  }

  public async executePayment(payload: StandardizedPaymentPayload): Promise<StandardizedPaymentResponse> {
    const start = Date.now();
    const meherahRef = 'TX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    
    // Call external ${category} endpoint using config.baseUrl & API Keys
    const fee = Math.round(payload.amount * 0.01);
    
    return {
      success: true,
      providerTransactionRef: 'GW-' + Date.now(),
      meherahRef,
      settledAmount: payload.amount - fee,
      feeAmount: fee,
      latencyMs: Date.now() - start,
      rawStatus: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
  }

  public async checkStatus(providerTxRef: string): Promise<{ status: 'SUCCESS' | 'PENDING' | 'FAILED'; details?: string }> {
    return { status: 'SUCCESS', details: 'Transaction verified by ${providerName} connector.' };
  }
}`;
  }
}
