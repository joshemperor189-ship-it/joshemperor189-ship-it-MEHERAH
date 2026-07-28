# MEHERAH Repository Contribution Policies
Thank you for collaborating on MEHERAH. To preserve the operational trust required for central banking sandbox integration (e.g., Bank of Uganda), all incoming pull requests must strictly pass our active automated pipeline barriers.

## Architectural Rules
1. Zero Secret Leakage Policy: Never check in plaintext private network parameters, server connection paths, or test access secrets. Use .env.example configurations.
2. Intent Evidence Verification: Any modification altering ledger data or financial payout operations must cleanly wire back to an explicit user confirmation or tracking record parameter.
3. Active Radar Evaluation: Ensure your structural transformations clear local diagnostics (python testing/meherah_radar.py) with zero unresolved flags before requesting engineering reviews.
