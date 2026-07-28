# MEHERAH OS - ARCHITECTURE DOCUMENTATION

MEHERAH OS is an enterprise-grade, cloud-native Agentic AI Operating System designed to orchestrate autonomous AI agents, manage local preference memories, secure compliance audit logs via cryptographic zero-knowledge proofs, and interface with regional financial connectors (e.g., MTN, Airtel, Stanbic) in East Africa and globally.

## 1. High-Level System Architecture

The operating system operates on a decoupled multi-layer architecture consisting of:
- **Presentation Layer (React SPA)**: A gorgeous, luxury matte gold/black interface rendered in the browser. Uses Lucide icons and Tailwind CSS. Connects to the Core Engine via secure API endpoints.
- **Orchestration Layer (Express + Node.js)**: Runs server-side. Coordinates agent states, decomposes goals into sequential task chains, manages batch transaction sweep loops, and monitors gateway latency metrics.
- **Cognitive Agent Layer**: Multi-agent framework containing the Chief Orchestrator, Disbursement Specialist, Compliance Auditor, and Financial Intelligence specialist.
- **Crypto-Auditing Layer (ZK Simulator)**: Generates one-way cryptographic SHA-256 signatures with secure salting, simulating zero-knowledge proofs (ZKP) to protect sensitive transactional parameters (recipient names, phone numbers, exact amounts) while exposing a public proof hash.
- **Durable Local Storage Layer**: A JSON-based database engine that replicates PostgreSQL schemas locally to manage persistent records including agent profiles, memories, audit logs, active/historical missions, and live gateway telemetry metrics.

```
       [ Client React App ] (Vite, Tailwind, Lucide, Recharts)
                │
                ▼ (Secure HTTP & WebSocket Proxy)
      [ Express Core Engine ] (Port 3000)
       ┌────────┼────────┬────────┐
       ▼        ▼        ▼        ▼
    [Agents] [Memory] [Audit] [Connectors]
       │        │        │        │
       ▼        ▼        ▼        ▼
  [Cognitive] [JSON DB] [ZK Proof] [MTN/Airtel API]
```

## 2. Key Components & Separation of Concerns

### A. Chief Orchestrator
The central cognitive dispatcher of MEHERAH OS. On mission registration, it:
1. Validates input payloads using strict schema constraints.
2. Interrogates Memory Stores for user preferences or regional constraints.
3. Decomposes the mission goal into highly specific operational tasks.
4. Spawns and delegates tasks to specialized sub-agents.
5. Monitors execution and handles compliance check blocks requiring human intervention.

### B. Disbursement Specialist Agent
Directs transaction flows. Manages a **Disbursement Batch Buffer Queue**. Instead of firing expensive real-time API calls individually, it pools transactions matching particular providers, executes a bulk "Sweep", and registers the operation in the ledger.

### C. Compliance Auditor (ZK Proof Builder)
Intercepts database writes. Creates a secure hash representation of the transfer. Logs the public metadata and the hash to the `zkLogs` collection, protecting details from simple eavesdropping or tamper attempts.

### D. Gateway Latency Metric Router
Monitors connection latencies of the MTN and Airtel network gateways. Instantly triggers **Cognitive Failover** if the latency of a primary gateway spikes, routing transactions dynamically through the optimal provider channel.
