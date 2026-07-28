# MEHERAH OS - DATABASE SCHEMA

MEHERAH OS utilizes a durable, schema-validated JSON database model at `/meherah_db.json`, mirroring a relational PostgreSQL/Drizzle ORM schema to ensure seamless, cold-start safe, container-friendly local deployments with production upgrade paths.

---

## 1. Entities Definition & Schemas

### A. Table: `missions`
Tracks overall mission objectives, current statuses, timestamps, and nested task executions.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `VARCHAR(255)` / `PRIMARY KEY` | Unique identifier (prefixed with `m_` or `mission-`) |
| `goal` | `TEXT` | Human language goal of the mission |
| `status` | `ENUM` | One of `NOT_STARTED`, `PLANNING`, `RUNNING`, `PAUSED_APPROVAL`, `COMPLETED`, `FAILED` |
| `createdAt` | `TIMESTAMP` | Record creation timestamp |
| `updatedAt` | `TIMESTAMP` | Record last modification timestamp |
| `tasks` | `JSON` | Array of Task items (see Task schema below) |

#### Nested Structure: `tasks`
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  assignedAgent: string; // The Agent assigned
  status: "PENDING" | "RUNNING" | "COMPLETED" | "NEEDS_APPROVAL" | "FAILED";
  result?: string;
  thinkingTrace?: string[];
  approvalMessage?: string;
  approved?: boolean;
}
```

---

### B. Table: `memories`
Stores conversational preference extractions, semantic system parameters, and episodic transaction histories.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `VARCHAR(255)` / `PRIMARY KEY` | Unique memory identifier |
| `type` | `ENUM` | One of `preference`, `project`, `conversation`, `decision`, `file`, `lesson` |
| `title` | `VARCHAR(100)` | Descriptive tag of the memory |
| `content` | `TEXT` | Payload details of preference or history context |
| `timestamp` | `TIMESTAMP` | Record creation timestamp |

---

### C. Table: `zkLogs` (Cryptographic Audit Trail)
Secures immutable operational sequences using one-way cryptographic SHA-256 hashes representing ZK Proofs.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `VARCHAR(255)` / `PRIMARY KEY` | Unique log entry identifier |
| `timestamp` | `TIMESTAMP` | Audit log creation timestamp |
| `text` | `VARCHAR(255)` | Human-readable log summary |
| `proofHash` | `VARCHAR(128)` | Simulated hex salt proof hash starting with `zkp_0x` |
| `operationType` | `VARCHAR(50)` | Action type: e.g. `CONSENT_RECORD`, `ROUTING_DECISION`, `DISBURSEMENT_BATCH` |
| `payload` | `JSON` | Nested key-values protected by hash signature |

---

### D. Table: `connectors`
Tracks health status and real-time connectivity parameters of East African regional payment/mobile money channels.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `VARCHAR(255)` / `PRIMARY KEY` | Gateway ID (e.g. `c1`, `c2`) |
| `name` | `VARCHAR(100)` | Custom name of the integration |
| `type` | `ENUM` | One of `MOBILE_MONEY`, `BANK_WIRE`, `OPEN_BANKING` |
| `provider` | `ENUM` | One of `MTN`, `AIRTEL`, `STANBIC`, `SOCIETE_GENERALE` |
| `status` | `ENUM` | One of `ONLINE`, `OFFLINE`, `DEGRADED` |
| `latencyMs` | `INT` | Real-time connection response latency in milliseconds |
| `rateLimitPerSec`| `INT` | Maximum API requests allowed per second |
| `currentQueueSize`| `INT` | Transactions currently queued in the pipeline buffer |

---

### E. Table: `metrics` (Telemetry Store)
Maintains high-frequency system telemetry for network gateways and backend worker loops.

| Field | Type | Description |
| :--- | :--- | :--- |
| `timestamp` | `TIMESTAMP` | Telemetry capture timestamp |
| `mtnLatency` | `INT` | Response latency for MTN gateway in milliseconds |
| `airtelLatency`| `INT` | Response latency for Airtel gateway in milliseconds |
| `selectedProvider`| `VARCHAR(10)` | Dynamic router decision choice (`MTN` or `AIRTEL`) |
| `stateDescription`| `TEXT` | Text description explaining routing decisions |
