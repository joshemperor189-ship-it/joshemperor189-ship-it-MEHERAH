# MEHERAH OS - REGIONAL INTEGRATION CONNECTORS

MEHERAH OS interfaces with East African regional banking channels and mobile money networks using modular integration connectors. These connectors enforce strict rate limits, manage individual queue buffers, and record latency trends to prevent congested network path issues.

---

## 1. Supported Regional Gateways

### A. MTN Mobile Money API (Uganda / Rwanda)
*   **Provider**: MTN Group
*   **Protocol**: REST / JSON with OAuth 2.0 Client Credentials
*   **Default Rate Limit**: 100 requests per second
*   **Simulated Nominal Latency**: 40-55 ms
*   **Tiered Transfer Fee (UGX)**:
    *   `< 5,000 UGX`: 100 UGX
    *   `5,000 - 50,000 UGX`: 500 UGX
    *   `50,000 - 500,000 UGX`: 1,500 UGX
    *   `> 500,000 UGX`: 5,000 UGX

### B. Airtel Money Channel (East Africa Region)
*   **Provider**: Airtel Africa
*   **Protocol**: REST with HMAC SHA-256 Request Signatures
*   **Default Rate Limit**: 120 requests per second
*   **Simulated Nominal Latency**: 45-60 ms
*   **Tiered Transfer Fee (UGX)**: Identical tiered parameters matching MTN to ensure standard regional fee processing parity.

### C. Stanbic Bank Wire Integration
*   **Provider**: Standard Bank Group / Stanbic Uganda
*   **Protocol**: ISO 20022 XML Messaging via secure SFTP or HTTPS SOAP API
*   **Default Rate Limit**: 10 requests per second
*   **Simulated Nominal Latency**: 250-400 ms
*   **Fee Structure**: Flat bank transaction fee of 5,000 UGX.

### D. Société Générale Open Banking Channel
*   **Provider**: Société Générale Group
*   **Protocol**: Open Banking REST API (PSD2 Compliant)
*   **Default Rate Limit**: 50 requests per second
*   **Simulated Nominal Latency**: 120-180 ms
*   **Fee Structure**: Flat payment fee of €1.50.

---

## 2. Dynamic Failover Operations (Cognitive Routing)

MEHERAH OS monitors connection latencies constantly:
1.  **Metric Sweep Loop**: Every 10 seconds, the engine polls the latency of active mobile money gateways (MTN and Airtel).
2.  **Congestion Detection**: If a primary mobile money network (e.g. MTN) experiences network congestion causing its latency to spike above **85ms - 90ms**, the router flags the connector state.
3.  **Instant Failover**: Future transactions are routed dynamically through the backup gateway (e.g., Airtel) to ensure uninterrupted disbursement workflows.
4.  **Automatic Healing**: Once MTN's latency cools back below standard thresholds, the router restores the default MTN-primary layout balance.
