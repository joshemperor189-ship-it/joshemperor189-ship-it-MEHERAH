# MEHERAH OS BETA 1.5 — REAL INFRASTRUCTURE MIGRATION PLAN
**Document Status:** Production Migration Roadmap  
**Target Release:** MEHERAH OS Enterprise v2.0  

---

## 1. ARCHITECTURAL OBJECTIVE
This document outlines the migration strategy to transition MEHERAH OS from its current **single-container development/pilot topology** into a **highly available, fault-tolerant enterprise production architecture**.

Crucially, **the fallback systems will NOT be removed**. MEHERAH OS will maintain a **Dual Operating Mode Architecture**:
1. **Local / Pilot Mode**: Fully self-contained inside a single container using SQLite and in-memory Redis/RabbitMQ adapters.
2. **Production Enterprise Mode**: Connected to managed Cloud SQL (PostgreSQL), Cloud Memorystore (Redis), and Cloud Pub/Sub / RabbitMQ cluster.

---

## 2. COMPONENT-BY-COMPONENT MIGRATION MATRIX

| Infrastructure Layer | Current Pilot Implementation | Target Production Implementation | Migration Strategy & Zero-Downtime Fallback |
| :--- | :--- | :--- | :--- |
| **Caching & Latency Mesh** | **Redis: SIMULATED**<br>*(In-memory JS map adapter with sub-ms telemetry)* | **Managed Redis Instance**<br>*(Google Cloud Memorystore / AWS ElastiCache)* | Environmental check (`process.env.REDIS_URL`). Fallback to in-memory adapter if connection fails or unconfigured. |
| **Event Broker & Queue** | **RabbitMQ: SIMULATED**<br>*(In-memory JS async queue broker)* | **Production RabbitMQ Cluster / Cloud Pub/Sub** | Abstracted via `IEventBroker` interface. Toggles between AMQP driver and memory fallback automatically. |
| **Relational Database** | **SQLite via Prisma ORM**<br>*(Local file persistence `dev.db`)* | **Managed PostgreSQL (Cloud SQL / Supabase)** | Prisma multi-provider support. Switch `DATABASE_URL` in `.env` to PostgreSQL URL without code changes. |
| **Observability & Logging** | **Custom Telemetry Grid**<br>*(In-memory event log & console telemetry)* | **OpenTelemetry + Prometheus + Grafana** | Standardized OpenTelemetry exporter middleware added to Express server. |
| **AI LLM Engine** | **Gemini API via `@google/genai`** | **Gemini Enterprise API + Vertex AI Fallback** | Automated retry handler with exponential backoff and Vertex AI failover routes. |

---

## 3. DUAL OPERATING MODE IMPLEMENTATION

### A. Environment Configuration (`.env.example`)
```env
# Operating Mode: LOCAL_PILOT or PRODUCTION_ENTERPRISE
MEHERAH_OPERATING_MODE=LOCAL_PILOT

# Database Configuration (SQLite default for local, PostgreSQL for prod)
DATABASE_URL="file:./dev.db"

# Redis Configuration (Leave blank for in-memory simulation)
REDIS_URL=""

# RabbitMQ / Message Broker Configuration (Leave blank for in-memory simulation)
RABBITMQ_URL=""

# Observability Exporter (Optional)
OTEL_EXPORTER_OTLP_ENDPOINT=""
```

### B. Graceful Fallback Strategy Pattern
```typescript
// Example: Caching Layer Adapter Switcher
export class CacheManager {
  private static redisClient: any = null;

  public static async getClient() {
    if (process.env.REDIS_URL && !this.redisClient) {
      try {
        const { createClient } = await import('redis');
        this.redisClient = createClient({ url: process.env.REDIS_URL });
        await this.redisClient.connect();
        console.log('✅ Connected to Real Managed Redis Cluster');
        return this.redisClient;
      } catch (err) {
        console.warn('⚠️ Real Redis connection failed, reverting to In-Memory Simulator:', err);
      }
    }
    // Fallback to in-memory simulator
    return InMemoryCacheSimulator;
  }
}
```

---

## 4. DEPLOYMENT PIPELINE & PILOT SAFETY GUARANTEES
1. **Isolated Container Sandbox**: Container image compiled with `npm run build` static bundler.
2. **Zero Direct Fiat Mutation**: Live SWIFT/PAPSS disbursement routes remain feature-flagged off until banking partner APIs are verified.
3. **Automatic Disaster Recovery**: SQLite `dev.db` snapshotting via `scripts/db-backup.sh`.
