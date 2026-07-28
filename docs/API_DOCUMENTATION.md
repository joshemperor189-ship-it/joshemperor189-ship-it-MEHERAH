# MEHERAH OS - API DOCUMENTATION

MEHERAH OS exposes a series of REST endpoints under `/api/*` to coordinate operations, inspect database states, manage agent workflows, and view system metrics.

## 1. Authentication & Security
*   **Protocol**: HTTPS (TLS 1.3 / TLS 1.2)
*   **mTLS (Optional)**: Direct connection termination via client certificates (`x-client-cert-verified` header pass-through in development / test).
*   **Authorization**: Bearer tokens via standard `Authorization` header.

---

## 2. Missions API

### GET `/api/missions`
*   **Description**: Retrieves all registered active, pending, or historical missions.
*   **Response Headers**: `Content-Type: application/json`
*   **Response Body**:
    ```json
    [
      {
        "id": "m_1721548000000",
        "goal": "Prepare Kampala expansion proposal copy",
        "status": "COMPLETED",
        "createdAt": "2026-07-21T06:40:00.000Z",
        "updatedAt": "2026-07-21T06:42:15.000Z",
        "tasks": [
          {
            "id": "t1",
            "title": "Analyze Kampala Fintech Landscape",
            "description": "Examine MTN & Airtel network coverage parameters.",
            "assignedAgent": "🤖 Intel Specialist",
            "status": "COMPLETED",
            "result": "Identified high density corridors in Kampala Central."
          }
        ]
      }
    ]
    ```

### POST `/api/missions`
*   **Description**: Dispatches a new global mission goal to the Chief Orchestrator for task decomposition.
*   **Request Body**:
    ```json
    {
      "goal": "Disburse 500,000 UGX to regional developers"
    }
    ```
*   **Response Body**:
    ```json
    {
      "status": "success",
      "missionId": "m_1721549111222",
      "goal": "Disburse 500,000 UGX to regional developers",
      "initialStatus": "PLANNING"
    }
    ```

### POST `/api/missions/:id/approve`
*   **Description**: Resumes a mission currently stalled in the `PAUSED_APPROVAL` compliance gate.
*   **Response Body**:
    ```json
    {
      "status": "success",
      "missionId": "m_1721549111222",
      "newStatus": "RUNNING"
    }
    ```

---

## 3. Memories API

### GET `/api/memories`
*   **Description**: Retrieves all saved preference, episodic, semantic, or project-related memory blocks.
*   **Response Body**:
    ```json
    [
      {
        "id": "m1",
        "type": "preference",
        "title": "Aesthetic Preferences",
        "content": "User prefers custom black & gold accents.",
        "timestamp": "2026-07-21T06:50:00.000Z"
      }
    ]
    ```

### POST `/api/memories`
*   **Description**: Adds a new preference, conversation, or decision block to the local database.
*   **Request Body**:
    ```json
    {
      "type": "preference",
      "title": "Default Corridor",
      "content": " Kampala Corridor via MTN primary"
    }
    ```
*   **Response Body**:
    ```json
    {
      "status": "success",
      "id": "mem_1721549333"
    }
    ```

---

## 4. Connectors API

### GET `/api/connectors`
*   **Description**: Fetch real-time health, status, and queue depth of regional banking/mobile money gateways.
*   **Response Body**:
    ```json
    [
      {
        "id": "c1",
        "name": "MTN Mobile Money API",
        "type": "MOBILE_MONEY",
        "provider": "MTN",
        "status": "ONLINE",
        "latencyMs": 42,
        "rateLimitPerSec": 100,
        "currentQueueSize": 0
      }
    ]
    ```

---

## 5. Audit & Compliance Logs API

### GET `/api/zk-logs`
*   **Description**: Retrieves cryptographically secured zero-knowledge simulated compliance logs.
*   **Response Body**:
    ```json
    [
      {
        "id": "zk-1",
        "timestamp": "2026-07-21T06:40:12.000Z",
        "text": "Completed MTN gateway disbursement batch",
        "proofHash": "zkp_0x5c8e3aa7f00d83bc7492beefc0ffe",
        "operationType": "DISBURSEMENT_BATCH",
        "payload": {
          "totalAmount": 1200000,
          "batchSize": 4
        }
      }
    ]
    ```
