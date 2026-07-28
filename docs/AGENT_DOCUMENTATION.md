# MEHERAH OS - AGENT DOCUMENTATION

MEHERAH OS incorporates a multi-agent modular architecture. Each agent is a specialized cognitive node with distinct skills, responsibilities, and statuses.

---

## 1. Agent Inventory & Specifications

### 🤖 Chief Orchestrator (`chief`)
*   **Role**: Primary System dispatcher and cognitive task decomposer.
*   **Description**: Handles front-end user goals, decomposes them into logical, multi-step sub-tasks, delegates work to specialized sub-agents, and enforces compliance gates.
*   **Key Skills**: 
    *   Goal Decompositions (NLP/LLM reasoning logic)
    *   Sub-Agent Task Delegation
    *   Human-In-The-Loop Workflow Arbitration
    *   State Machine Integrity Control
*   **Icon**: `🧠` / `🤖`

### 💸 Disbursement Specialist (`disburse`)
*   **Role**: Transaction dispatching and bulk payment grouping.
*   **Description**: Manages outgoing payments, monitors regional mobile money providers, groups single transfers into optimized batches, and sweeps batch buffers into regional gateways.
*   **Key Skills**:
    *   Tiered UGX Transaction Fee Optimization
    *   Batch Aggregation & Sweeping
    *   Disbursement Queue Buffer Management
*   **Icon**: `💸`

### 🔬 Fintech Intelligence Specialist (`intel`)
*   **Role**: Real-time network auditing and path optimizations.
*   **Description**: Monitiors and analyzes network latency metrics. Instantly activates cognitive routing failover to redirect financial packets from congested pipelines to healthier alternatives.
*   **Key Skills**:
    *   Statistical Latency Trend Analysis
    *   Dynamic Cost-Router Optimizations
    *   Mobile Money Network Outage Prediction
*   **Icon**: `🔬`

### 🛡️ Compliance & ZK Security Auditor (`security`)
*   **Role**: Cryptographic hashing and immutability verification.
*   **Description**: Inspects system operations, isolates private financial transfer metadata, generates secure salted SHA-256 ZK Proof signatures, and appends proof elements to the audit trail.
*   **Key Skills**:
    *   One-way Salted SHA-256 Hashing
    *   Tamper & Corruption Auditing
    *   Compliance Verification Ledger Maintenance
*   **Icon**: `🛡️`

---

## 2. Agent Status Life-Cycle

Agents transition between 5 core operational statuses:
1.  **IDLE**: Sleeping; waiting for tasks from the Chief Orchestrator.
2.  **RUNNING**: Actively parsing logs, dispatching transactions, or executing ZK proofs.
3.  **NEEDS_APPROVAL**: Paused on a compliance gate; waiting for human confirmation.
4.  **COMPLETED**: Successfully finalized the assigned task and delivered the results payload back.
5.  **FAILED**: Encountered critical connectivity issues or validation errors.
