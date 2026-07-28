# MEHERAH OS - DEVELOPER GUIDE

Welcome, MEHERAH OS core developer! This guide walks you through setting up your local environment, adding new cognitive agents, building custom regional payment connectors, and extending the automated test suite.

---

## 1. Local Development Setup

To run MEHERAH OS locally for development or debugging:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Dev Server**:
    Starts the full-stack system on port 3000. It runs both the Express backend and Vite frontend dynamically using TSX:
    ```bash
    npm run dev
    ```

3.  **Run Code Linter**:
    Ensures syntax correctness, type safety, and clean formatting conventions:
    ```bash
    npm run lint
    ```

4.  **Execute Tests**:
    Triggers the 8-domain automated integration and unit test suite:
    ```bash
    npm test
    ```

---

## 2. Adding a New Agent

To register a new cognitive agent node in MEHERAH OS:

1.  **Define Agent Type & Schema**:
    Add the agent's core identification key, name, emoji, and default skills to `/src/types.ts`.
2.  **Initialize Agent State**:
    Add the agent to the default initialized collection in `server.ts` or `meherah_db.json`.
3.  **Add Delegation Logic**:
    In `server.ts`, expand the Chief Orchestrator's task decomposition generator. Map specific task patterns or keywords to your newly created agent ID.

---

## 3. Adding a New Financial Connector

To integrate a new banking or regional mobile money channel:

1.  **Register the Provider**:
    Extend the `Connector` types inside `/src/types.ts` to include the new provider (e.g. `MPESA`, `EQUITY_BANK`).
2.  **Construct Default Connector Parameters**:
    Append a default connector object inside `server.ts` under the init flow (setting queue thresholds, rate limits, and starting latencies).
3.  **Write Routing Integrations**:
    In the disbursement module inside `server.ts`, add custom endpoint handlers to manage outbound network payloads matching your provider's API formats.

---

## 4. Expanding the Automated Test Suite

Every new feature must have matching automated tests inside `/test_integration.ts`:
1.  Identify which of the **8 Test Domains** (Unit, Integration, API, Security, Database, Agent, Memory, or Mission) your feature belongs to.
2.  Locate the matching `runTestGroup` block in `/test_integration.ts`.
3.  Add an assertion block checking your logic outputs against expected outcomes.
4.  Run `npm test` to verify no regressions were introduced.
