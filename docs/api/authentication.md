# MEHERAH Authentication & Security Model

MEHERAH operates under a Zero-Trust, Human-in-the-Loop security protocol designed for regulatory sandbox auditing.

---

## 1. Authentication Mechanisms

- **Bearer JWT Tokens**: Issued upon successful multi-factor authentication for operators and central bank compliance reviewers.
- **Role-Based Access Control (RBAC)**:
  - `BANK_OPERATOR`: Initiate transfer requests, view balances, request routing evaluation.
  - `COMPLIANCE_OFFICER`: Review low-confidence AI intercepts, override route decisions, view audit logs.
  - `SYSTEM_ADMIN`: Manage environment bindings, inspect flight recorder diagnostics.

---

## 2. Explicit Intent Evidence Requirement

To prevent unauthorized background triggers or automated prompt exploits:
- Every execution payload must include `evidenceOfIntent`.
- `evidenceOfIntent` consists of an operator's session signature or time-based OTP token.
- Missing or malformed intent proof results in immediate HTTP `403 Forbidden` with diagnostic incident ID logged to the **Flight Recorder**.

---

## 3. Flight Recorder Diagnostic Incident Logging

When security anomalies, unauthenticated requests, or missing intent evidence occur:
1. The incident is logged to the immutable flight recorder system state.
2. An incident object is generated:
   ```json
   {
     "incidentId": "INC-46A440",
     "timestamp": 1785227765.776,
     "component": "API_ROUTER",
     "action": "TRANS_AUTH",
     "errorPayload": "MISSING_INTENT_EVIDENCE",
     "criticality": "CRITICAL"
   }
   ```
3. The transaction pipeline halts instantly to prevent unauthorized fund displacement.
