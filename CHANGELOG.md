# MEHERAH OS — Beta 1.0 Changelog

All notable changes, architectural updates, and release milestones for MEHERAH OS will be documented in this file.

---

## [v1.0-beta.001] - 2026-07-24 (Hardened Staging Release)

### 🚀 Key Features Introduced
- **Autonomous Chief Orchestrator Kernel**: Multi-agent task decomposition graph with real-time web intelligence ingestion, cognitive failover, and memory learning loop.
- **Stage 5 Evaluation Engine (`src/core/stage5-evaluation.ts`)**: Automated report card scorecard evaluating Mission Understanding, Planning, Collaboration, Financial Reasoning, Strategic Thinking, Fault Recovery, Memory, Governance Compliance, and Output Quality (96/100 benchmark score achieved).
- **Hardened Zero-Knowledge Audit & Governance Engine**: ZK-proof generation for operation tracking, real-time alert dispatching, and hard blocks on unauthorized financial actions (e.g., unapproved wire transfers).
- **Automated CI/CD Pipeline (`.github/workflows/deploy-staging.yml`)**: Full automated build, typecheck, integration test suite, Docker container packaging, push to Google Artifact Registry (`meherah-beta-container`), and Cloud Run staging deployment with secret manager bindings.
- **Zero-Downtime Rollback Strategy**: Single-command Cloud Run revision rollback capability with previous revision preservation.

### 🛡️ Security & Infrastructure Enhancements
- **Google Secret Manager Integration**: `DATABASE_URL`, `REDIS_URL`, `RABBITMQ_URL`, `GEMINI_API_KEY`, and `JWT_SECRET` injected securely at runtime without repo leakages.
- **Runtime Health Endpoint (`GET /api/health`)**: Comprehensive operational check verifying kernel status, database connectivity, queue system readiness, and agent scheduler state.
- **Docker Multi-Stage Build**: Minimized runtime container footprint with production-only dependencies and CJS server bundle (`dist/server.cjs`).

### 🔧 Bug Fixes & Refactorings
- Fixed Prisma Client instantiation fallback in sandbox container environments without active PostgreSQL connections.
- Implemented robust local memory fallback for Strategy Metrics retrieval and audit logging.
- Fixed health check response schema to comply with automated deployment verifier requirements.

### ⚠️ Known Limitations
- **Local Fallback Mode**: When Redis or RabbitMQ instances are unreachable in isolated container environments, the kernel automatically operates in graceful fallback mode using isolated secondary memory ring buffers.
- **Staging-Only Scope**: Direct production auto-deployments are intentionally restricted. Production deployments require explicit tag approval (`v1.0.0-prod`).

---

## [v0.9.0-beta] - 2026-07-23 (Initial Architecture Prototype)
- Initial release of Meherah OS multi-agent interface, UI dashboard, and mock payment gateway connectors.
