import { IPaymentProvider } from './base.provider';
import { FlutterwaveProvider } from './flutterwave.provider';
import { MtnMomoProvider } from './mtn.provider';
import { AirtelMoneyProvider } from './airtel.provider';
import { BankTransferProvider } from './bank.provider';

export interface ConnectorManifest {
  connectorId: string;
  name: string;
  category: 'MOBILE_MONEY' | 'BANK_ACH' | 'CARD_GATEWAY' | 'CRYPTO_RAIL' | 'REMITTANCE';
  countryCode: string;
  supportedCurrencies: string[];
  apiVersion: string;
  status: 'ACTIVE' | 'SANDBOX' | 'MAINTENANCE' | 'DEPRECATED';
  authType: 'OAUTH2' | 'API_KEY' | 'MTLS_CERTIFICATE' | 'BEARER_TOKEN';
  latencyAvgMs: number;
  successRate24hPct: number;
}

export class ProviderRegistryService {
  private static instance: ProviderRegistryService;
  private registeredConnectors: Map<string, ConnectorManifest> = new Map();
  private activeProviders: Map<string, IPaymentProvider> = new Map();

  private constructor() {
    // Register default core payment providers
    this.registerCoreProviders();
  }

  public static getInstance(): ProviderRegistryService {
    if (!ProviderRegistryService.instance) {
      ProviderRegistryService.instance = new ProviderRegistryService();
    }
    return ProviderRegistryService.instance;
  }

  private registerCoreProviders(): void {
    const defaultConnectors: ConnectorManifest[] = [
      {
        connectorId: 'flutterwave',
        name: 'Flutterwave Gateway Core',
        category: 'CARD_GATEWAY',
        countryCode: 'UG',
        supportedCurrencies: ['UGX', 'USD', 'KES', 'NGN'],
        apiVersion: 'v3.2.0',
        status: 'ACTIVE',
        authType: 'BEARER_TOKEN',
        latencyAvgMs: 1400,
        successRate24hPct: 98.4
      },
      {
        connectorId: 'mtn_momo',
        name: 'MTN Mobile Money Direct API',
        category: 'MOBILE_MONEY',
        countryCode: 'UG',
        supportedCurrencies: ['UGX'],
        apiVersion: 'v2.1.0',
        status: 'ACTIVE',
        authType: 'OAUTH2',
        latencyAvgMs: 850,
        successRate24hPct: 99.2
      },
      {
        connectorId: 'airtel_money',
        name: 'Airtel Money Express Rail',
        category: 'MOBILE_MONEY',
        countryCode: 'UG',
        supportedCurrencies: ['UGX'],
        apiVersion: 'v1.8.4',
        status: 'ACTIVE',
        authType: 'OAUTH2',
        latencyAvgMs: 920,
        successRate24hPct: 97.9
      },
      {
        connectorId: 'direct_bank',
        name: 'Direct Bank Settlement ACH Pool',
        category: 'BANK_ACH',
        countryCode: 'UG',
        supportedCurrencies: ['UGX', 'USD'],
        apiVersion: 'v4.0.0',
        status: 'ACTIVE',
        authType: 'MTLS_CERTIFICATE',
        latencyAvgMs: 3200,
        successRate24hPct: 99.9
      },
      {
        connectorId: 'equity_bank_express',
        name: 'Equity Bank Uganda Open API',
        category: 'BANK_ACH',
        countryCode: 'UG',
        supportedCurrencies: ['UGX', 'USD'],
        apiVersion: 'v1.0.0',
        status: 'SANDBOX',
        authType: 'OAUTH2',
        latencyAvgMs: 1100,
        successRate24hPct: 99.5
      },
      {
        connectorId: 'mpesa_global',
        name: 'Safaricom M-PESA Cross-Border',
        category: 'REMITTANCE',
        countryCode: 'KE',
        supportedCurrencies: ['KES', 'UGX'],
        apiVersion: 'v2.0.0',
        status: 'SANDBOX',
        authType: 'API_KEY',
        latencyAvgMs: 1500,
        successRate24hPct: 98.9
      }
    ];

    for (const c of defaultConnectors) {
      this.registeredConnectors.set(c.connectorId, c);
    }

    this.activeProviders.set('flutterwave', new FlutterwaveProvider());
    this.activeProviders.set('mtn_momo', new MtnMomoProvider());
    this.activeProviders.set('airtel_money', new AirtelMoneyProvider());
    this.activeProviders.set('direct_bank', new BankTransferProvider());
  }

  public getAllConnectors(): ConnectorManifest[] {
    return Array.from(this.registeredConnectors.values());
  }

  public registerNewConnector(manifest: ConnectorManifest): { success: boolean; message: string } {
    this.registeredConnectors.set(manifest.connectorId, manifest);
    return {
      success: true,
      message: `Connector ${manifest.name} (${manifest.connectorId}) successfully registered in MEHERAH Marketplace.`
    };
  }
}

export const providerRegistry = ProviderRegistryService.getInstance();
