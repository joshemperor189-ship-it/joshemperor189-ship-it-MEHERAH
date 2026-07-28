# MEHERAH Security & Compliance Architecture

MEHERAH implements a zero-trust, human-in-the-loop security paradigm designed specifically to pass strict supervisory audits by regulatory authorities like the Bank of Uganda (BOU).

## 1. Zero-Trust Security Guardrails

### A. Explicit Intent Evidence Enforcement
- **Rule**: No transaction, transfer, or liquidity adjustment can execute purely on automated triggers.
- **Verification**: The payment engine requires `evidence_of_intent` (cryptographic session signature or authenticated operator OTP) in every execution payload. Missing intent evidence immediately halts execution with status `BLOCKED`.

### B. Role-Based Access Control (RBAC) Matrix
| Role | Read Ledger | Trigger Transfer | AI Override | System Reset |
|---|---|---|---|---|
| **BANK_OPERATOR** | ✅ | ✅ | ❌ | ❌ |
| **COMPLIANCE_OFFICER** | ✅ | ❌ | ✅ | ❌ |
| **SYSTEM_ADMIN** | ✅ | ❌ | ❌ | ✅ |

Unauthenticated tokens or insufficient clearance levels trigger the **Flight Recorder** diagnostic logger and freeze the executing process.

### C. AI Confidence Threshold Guardrail
- **Threshold**: 90.0% confidence score minimum.
- **Rule**: If the AI model or rule engine generates an output below 0.90 confidence, automated execution is intercepted and routed to a human Bank Operator for manual review.

## 2. Secrets Management & Credential Protection

- **Environment Separation**: No production secrets, private keys, database connection strings, or telecom gateway tokens are hardcoded.
- **`.env.example` Template**: Serves as the sole blueprint for environment variables.
- **Git Ignore Safeguards**: `.gitignore` strictly excludes `.env`, `.env.local`, `*.pem`, `*.key`, `node_modules`, and `venv`.

## 3. Cryptographic Audit Immutability

- Every ledger mutation is written to an append-only, ZK-hash sealed ledger with nanosecond timestamping.
- Audit logs contain full provenance: `log_id`, `actor`, `scope`, `details`, `metadata`, and `sealed_at` timestamp.
