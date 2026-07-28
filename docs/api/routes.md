# MEHERAH Core API Reference - Endpoints & Routing

The MEHERAH application gateway exposes REST API routes for route optimization, ledger queries, governance approvals, and system health verification.

---

## 1. Route Optimization & Transfer Execution

### `POST /api/route-transfer`
Requests MEHERAH AI Kernel to calculate the optimal routing path for a transaction and execute if governance thresholds are satisfied.

**Request Body:**
```json
{
  "amountUgx": 500000,
  "destination": "+256770001122",
  "purpose": "LIQUIDITY_SETTLEMENT",
  "evidenceOfIntent": "SIG-UGX-500K-9831A"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "decisionId": "DEC-98F1A2",
  "selectedProvider": "AIRTEL_MONEY",
  "confidenceScore": 0.96,
  "estimatedFeeUgx": 4500,
  "humanApprovalRequired": false,
  "auditHash": "HASH-A1882FC09811A311",
  "timestamp": 1785229800000
}
```

---

## 2. Governance & Human Approval Intercept

### `GET /api/governance/pending-approvals`
Retrieves all transaction routing decisions intercepted by the AI Engine due to low confidence (< 90%).

**Response (200 OK):**
```json
{
  "pendingCount": 1,
  "items": [
    {
      "decisionId": "DEC-42A981",
      "amountUgx": 12000000,
      "confidenceScore": 0.74,
      "reason": "High fee volatility across primary networks during peak hours",
      "recommendedRoute": "MTN_MOMO",
      "status": "PENDING"
    }
  ]
}
```

### `POST /api/governance/approve`
Approves or rejects a pending transaction route.

**Request Body:**
```json
{
  "decisionId": "DEC-42A981",
  "action": "APPROVE",
  "operatorNotes": "Manually verified liquidity capacity with Bank of Uganda clearing house."
}
```

---

## 3. Double-Entry Micro-Ledger & Balances

### `GET /api/ledger/balance`
Retrieves live multi-account balance sheets and reconciliation states.

**Response (200 OK):**
```json
{
  "currency": "UGX",
  "accounts": [
    { "accountName": "OPERATIONAL_SETTLEMENT_POOL", "balance": 4500000000 },
    { "accountName": "MTN_MOMO_CLEARING_ACCOUNT", "balance": 820000000 },
    { "accountName": "AIRTEL_MONEY_CLEARING_ACCOUNT", "balance": 650000000 }
  ],
  "isReconciled": true,
  "lastBalancedAt": "2026-07-28T02:14:00Z"
}
```

---

## 4. Platform Health & Radar Verification

### `GET /api/health`
Returns system component integrity, active database pool status, and verification metrics.

**Response (200 OK):**
```json
{
  "status": "ok",
  "stabilityIndexScore": 100.0,
  "demoReadiness": "APPROVED",
  "components": {
    "databasePool": "HEALTHY",
    "transactionRouter": "HEALTHY",
    "aiGuardEngine": "ACTIVE",
    "radarScanner": "OPTIMAL"
  }
}
```
