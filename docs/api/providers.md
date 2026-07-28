# MEHERAH Payment Provider Integration Framework

MEHERAH unifies telecom mobile money gateways, banking rails, and regional payment providers into a standardized adapter layer.

---

## 1. Supported Provider Adapters

| Provider | Integration Type | Currency | Avg Latency | SLA Guarantee |
|---|---|---|---|---|
| **MTN Mobile Money** | Open API v2.0 (OAuth 2.0) | UGX, USD | 4.2s | 99.5% |
| **Airtel Money** | Enterprise API v1.4 | UGX, KES | 1.8s | 99.8% |
| **Flutterwave Payouts** | ISO REST API v3 | Multi-Currency | 6.5s | 99.0% |
| **Beyonic B2B** | B2B Mobile Money Gateway | UGX, TZS, RWF | 3.5s | 99.2% |
| **National Bank ACH** | ISO 20022 Financial Messaging | UGX | 45.0s | 99.9% |

---

## 2. Standard Provider Adapter Interface

Every payment gateway connector inside `/providers/` implements a uniform contract:

```typescript
export interface PaymentProviderAdapter {
  providerId: string;
  providerName: string;

  /**
   * Ping provider endpoint and retrieve current network status & latency
   */
  getHealthStatus(): Promise<{
    isAvailable: boolean;
    latencyMs: number;
    errorRatePct: number;
  }>;

  /**
   * Fetch current fee schedule for transaction tier
   */
  getQuote(amountUgx: number): Promise<{
    estimatedFeeUgx: number;
    estimatedSpeedSeconds: number;
  }>;

  /**
   * Execute payout or liquidity transfer
   */
  executePayout(payload: {
    transactionId: string;
    amountUgx: number;
    recipientWallet: string;
    reference: string;
  }): Promise<{
    success: boolean;
    providerReference: string;
    executedAt: number;
  }>;
}
```

---

## 3. Circuit Breaker & Automatic Rerouting Logic

When a provider's error rate exceeds 15% or latency spikes above 10,000ms:
1. The provider is flagged as `DEGRADED`.
2. The AI Route Intelligence Engine adjusts its weight penalty.
3. Subsequent payouts are automatically rerouted to the healthiest alternative channel.
