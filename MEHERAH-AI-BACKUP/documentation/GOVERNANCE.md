# MEHERAH System Governance & Maintainer Guidelines

MEHERAH is designed as institutional financial infrastructure. System integrity, algorithmic transparency, and strict change management are maintained through this governance model.

---

## 1. Regulatory Alignment & Oversight

MEHERAH operates under the supervision of institutional banking partners and central banking regulatory authorities (e.g. Bank of Uganda Financial Innovation Sandbox).

Key Governance Principles:
1. **No Silent Code Execution**: Every financial displacement must trace to a verified human operator intent or signed regulatory directive.
2. **Explainability First**: Every AI route choice must emit an immutable XAI reasoning log stating cost savings, speed delta, and reliability scores.
3. **Audit Trail Immutability**: Cryptographic hash chains sealing ledger entries must never be modified, deleted, or rewritten.

---

## 2. Security Disclosures & Vulnerability Reporting

If a vulnerability or safety concern is discovered:
- **Do NOT** open a public GitHub issue.
- Email security reports directly to the core engineering team (`security@meherah.ai`).
- Include detailed steps to reproduce, component affected, and potential impact.

---

## 3. Pull Request & Code Review Process

All code modifications to MEHERAH must satisfy the following criteria before merging into main:

1. **Automated Verification**: `python3 test_meherah.py -v` must pass with 100% Demo Readiness Score.
2. **Active Verification Engine**: `python3 meherah_verify.py` must run without any unresolved critical incidents.
3. **Radar Core Static Analysis**: `python3 meherah_radar.py` must report an optimal codebase health state.
4. **Secret Scanning**: Pull requests containing API keys, private certificates, or hardcoded passwords will be automatically rejected.
5. **Two-Maintainer Approval**: Changes to `/ai-engine/` or `/security/` require explicit sign-off from two Lead System Architects.
