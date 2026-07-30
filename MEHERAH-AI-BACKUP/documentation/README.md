# MEHERAH AI

> **The Intelligence Behind Everything**

MEHERAH is an institutional-grade financial intelligence operating layer that unifies banks, mobile money, wallets, and payment networks into a single, cohesive, self-healing ecosystem. Built for central banking regulatory sandboxes and cross-border liquidity automation, MEHERAH optimizes payment routing in real time while providing complete explainability and zero-trust security guardrails.

---

## 🌟 Vision

Modern cross-border and regional financial rails remain fragmented across incompatible payment networks, telecom mobile money APIs, and legacy banking systems. MEHERAH acts as a **Universal Financial Language Layer** that sits between financial institutions and payment gateways, eliminating liquidity bottlenecks, reducing transaction fees, and ensuring total audit transparency for central banks and regulatory authorities like the Bank of Uganda.

---

## 🏛️ System Topology & Architecture

```text
[ Central Banks & Regulators ] ─── [ Commercial Banks ] ─── [ Mobile Money ] ─── [ Regional Gateways ]
                                              │
                                              ▼
                             +----------------------------------+
                             |   MEHERAH APPLICATION GATEWAY    |
                             |   (RBAC & Intent Evidence Guard) |
                             +----------------+-----------------+
                                              │
                                              ▼
                             +----------------------------------+
                             |   MEHERAH AI INTELLIGENCE KERNEL  |
                             |   - Dynamic Route Optimization   |
                             |   - Explainable AI (XAI) Engine  |
                             |   - 90% Confidence Intercept     |
                             +----------------+-----------------+
                                              │
                                              ▼
                             +----------------------------------+
                             |   PROVIDER ADAPTER & FAILOVER    |
                             |   (MTN / Airtel / Flutterwave)   |
                             +----------------+-----------------+
                                              │
                                              ▼
                             +----------------------------------+
                             |   IMMUTABLE DOUBLE-ENTRY LEDGER  |
                             |   (Cryptographic ZK-Hash Sealing)|
                             +----------------------------------+
```

*For detailed architectural flow maps, consult [`docs/architecture/system-map.md`](docs/architecture/system-map.md).*

---

## ⚡ Key Capabilities

- **Executive Control Units**: Real-time web console providing central bank operators with instant visibility into liquidity pools, circuit breaker states, and risk alerts.
- **AI Route Intelligence Panel**: Evaluates fee tiers, network latency, and provider degradation metrics in real time to route transactions along the optimal path.
- **Explainable AI (XAI) Framework**: Emits transparent, human-readable justification logs for every automated routing decision.
- **Human-in-the-Loop Intercept**: Automatically freezes any AI route recommendation scoring below **90.0% confidence** and routes it to a human compliance officer.
- **Telecom Circuit Breaker & Auto-Failover**: Automatically shifts settlement volume from primary providers (e.g. MTN) to secondary channels (e.g. Airtel) if network degradation is detected.
- **Double-Entry Micro-Ledger**: Multi-currency, atomic accounting engine backed by cryptographic ZK-hash audit log sealing.
- **Active Verification Radar**: Integrated self-healing static analyzer (`meherah_radar.py`) and verification suite (`meherah_verify.py`).

---

## 🛡️ Security & Compliance Model

1. **Zero Hardcoded Credentials**: Secrets, API keys, and database tokens are loaded strictly from environment variables.
2. **Explicit Intent Evidence**: Automated fund displacement without cryptographically verified user intent (`evidence_of_intent`) is strictly blocked.
3. **Flight Recorder Diagnostics**: Captures instant full system snapshot upon security or authorization failures.
4. **Audit Log Immutability**: All ledger entries are appended to a read-only, cryptographically hash-sealed ledger.

---

## 📂 Repository Layout

```text
MEHERAH/
│
├── frontend/                   # Executive Control Units & Web Console (React / Vite)
├── backend/                    # Express REST API gateway & middleware
├── ai-engine/                  # XAI reasoning kernel & decision record logger
├── providers/                  # Telecom adapters (MTN, Airtel, Flutterwave, Beyonic)
├── database/                   # Double-entry ledger schema & migration models
├── security/                   # RBAC authorization & cryptographic audit sealer
├── testing/                    # Verification suite & self-healing Radar scanner
├── demo/simulation/            # Institutional terminal simulation (`institutional_demo.py`)
├── docs/                       # Architecture diagrams, security policies, & API docs
├── .github/workflows/          # Automated CI verification workflow (`test.yml`)
├── CHANGELOG.md                # Release versioning history
├── GOVERNANCE.md               # Maintainer and regulatory oversight policies
├── .env.example                # Safe environment configuration template
└── package.json                # NPM dependencies & operational scripts
```

---

## 💻 Running the Institutional Demo

Experience MEHERAH's decision engine and XAI justification logs locally using the terminal simulator:

```bash
python3 demo/simulation/institutional_demo.py
```

---

## 🧪 Testing, Verification, & Self-Healing Radar

Run the automated test suite with Bank of Uganda readiness scoring:
```bash
python3 test_meherah.py -v
```

Execute the live production active verification engine:
```bash
python3 meherah_verify.py
```

Run the self-healing static analysis Radar scanner:
```bash
python3 meherah_radar.py
```

---

## 📖 API & System Documentation

- [System Map & Architecture Diagram](docs/architecture/system-map.md)
- [Security & Trust Center](documentation/security/TRUST_CENTER.md)
- [REST API Routes Reference](docs/api/routes.md)
- [Payment Provider Integrations](docs/api/providers.md)
- [Authentication & RBAC Model](docs/api/authentication.md)
- [Project Roadmap](docs/roadmap.md)
- [System Governance](GOVERNANCE.md)
- [Changelog](CHANGELOG.md)
