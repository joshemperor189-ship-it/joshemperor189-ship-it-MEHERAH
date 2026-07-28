# MEHERAH Core System Map & Algorithmic Flow

This document details the architectural topology and data flow across the MEHERAH Financial Operating Layer.

```
+-----------------------------------------------------------------------------------+
|                        1. INSTITUTIONAL & CLIENT LAYER                            |
|  +------------------------+  +--------------------------+  +-------------------+  |
|  | Executive Control Unit |  | Financial Inst. Console  |  | Bank of Uganda    |  |
|  | (React / Tailwind UI)  |  | (API & Admin Dashboard)  |  | Regulatory Portal |  |
|  +-----------+------------+  +------------+-------------+  +---------+---------+  |
+--------------|---------------------------|--------------------------|-------------+
               |                           |                          |
               +-------------------+-------+--------------------------+
                                   | REST / JSON APIs
                                   v
+-----------------------------------------------------------------------------------+
|                        2. APPLICATION GATEWAY & RBAC                              |
|  +-----------------------------------------------------------------------------+  |
|  | Express Router + Intent Evidence Middleware + JWT Auth Session Guard       |  |
|  +-------------------------------------+---------------------------------------+  |
+----------------------------------------|------------------------------------------+
                                         | Verified Intent Payload
                                         v
+-----------------------------------------------------------------------------------+
|                       3. MEHERAH AI INTELLIGENCE KERNEL                          |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|  | AI Route Optimization |  | Explainable AI (XAI)  |  | Closed-Loop Historical|  |
|  | (Cost/Speed/SLA)      |  | Reasoning Log Engine  |  | Performance Memory    |  |
|  +-----------+-----------+  +-----------+-----------+  +-----------+-----------+  |
+--------------|----------------------|--------------------------|------------------+
               |                      |                          |
               +----------------------+                          |
                                      v                          v
+-----------------------------------------------------------------------------------+
|                      4. GOVERNANCE & INTERCEPT THRESHOLD                          |
|  +-----------------------------------------------------------------------------+  |
|  | Confidence Threshold Intercept (< 90.0% -> Route to Human Compliance Review) |  |
|  +-------------------------------------+---------------------------------------+  |
+----------------------------------------| Approved Action
                                         v
+-----------------------------------------------------------------------------------+
|                      5. PROVIDER ADAPTER & FAILOVER LAYER                         |
|  +---------------+  +---------------+  +-------------------+  +-----------------+  |
|  | MTN MoMo      |  | Airtel Money  |  | Flutterwave / ACH |  | Beyonic B2B     |  |
|  | Adapter       |  | Adapter       |  | Connector         |  | Gateway         |  |
|  +-------+-------+  +-------+-------+  +---------+---------+  +--------+--------+  |
+----------|------------------|--------------------+-------------------|------------+
           +------------------+--------------------+-------------------+
                                                   |
                                                   v
+-----------------------------------------------------------------------------------+
|                  6. IMMUTABLE DOUBLE-ENTRY LEDGER & AUDIT TRAIL                   |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|  | Reversing Journals    |  | ZK-Hash Chain Audit   |  | Flight Recorder       |  |
|  | Balancing Core        |  | Log Sealer            |  | Diagnostic Engine     |  |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
+-----------------------------------------------------------------------------------+
```

## Data Lifecycle Sequence

1. **Intent Generation**: The operator or client signs a transaction intent payload containing exact amount, destination, purpose, and cryptographic proof of authorization (`evidence_of_intent`).
2. **Gateway Authorization**: Middlewares evaluate JWT token validity and role clearance.
3. **AI Route Evaluation**: The Route Intelligence Engine scores active telecom/payout routes based on current fee structures, latency benchmarks, and provider degradation alerts.
4. **Governance Threshold**: Decisions with confidence $\ge 90\%$ pass to automatic execution. Decisions $< 90\%$ are suspended and placed in the Human Officer Review queue.
5. **Provider Execution**: The selected payment provider adapter handles execution with automatic circuit-breaker fallback (e.g. MTN $\rightarrow$ Airtel if latency spikes).
6. **Ledger Sealing**: A balanced double-entry record is committed and sealed with an immutable hash.
