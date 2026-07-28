# MEHERAH OS - USER GUIDE

MEHERAH OS combines cognitive agents and enterprise ledger transparency into an intuitive, high-performance web dashboard. This guide explains how to operate the system.

---

## 1. Navigating the Dashboard Layout

The interface is styled in a luxury, modern matte gold and slate black aesthetic, optimized for clarity and negative space.
*   **A. Primary Controls Pane (Top Left)**: Enter mission goals, view active running tasks, and approve pending human-in-the-loop compliance checks.
*   **B. Agent Status Room (Top Right)**: View live statuses (`IDLE`, `RUNNING`, `NEEDS_APPROVAL`) and thinking traces of active agents.
*   **C. Network Latency Monitor (Middle Left)**: Monitor real-time connection telemetry and cost-routing decisions of MTN and Airtel money channels.
*   **D. Mobile Money Connectors (Middle Right)**: Control online statuses, rate limits, and queue queues of individual gateways.
*   **E. Cryptographic ZK Ledger (Bottom)**: View immutable transaction logs with verification proofs (hex hashes starting with `zkp_0x`) to verify ledger integrity.

---

## 2. Standard Workflows

### Workflow A: Launching a New Mission
1.  Navigate to the **Mission Input Panel** in the top left.
2.  Type a clear operational goal (e.g., *"Draft executive proposal copy"* or *"Disburse 200,000 UGX to Nairobi corridor"*).
3.  Click **Dispatch Goal**.
4.  The Chief Orchestrator will instantly activate, transition its status to `RUNNING`, decompose your goal into a sequence of tasks, and assign them to specialized sub-agents.
5.  Watch real-time task cards update from `PENDING` to `RUNNING` and eventually `COMPLETED`.

---

### Workflow B: Approving a Human-In-The-Loop Compliance Gate
If a task involves high-risk actions (such as cross-border mobile money transfers, or competitor intelligence search), the Compliance Auditor agent triggers a warning.
1.  The mission status will transition to **PAUSED_APPROVAL**.
2.  The task requiring confirmation will turn yellow, displaying an **Approval Required** banner.
3.  An **Approve Action** button will emerge on the mission card.
4.  Review the task details. Click **Approve Action** to authorize the agent.
5.  The Chief Orchestrator immediately resumes the operation, and transitions the mission back to **RUNNING** until finalized.

---

### Workflow C: Interrogating Core Memory
1.  Navigate to the **Memory Room** tab or component.
2.  Review existing user preferences, episodic logs, or system rules saved during previous runs.
3.  To record a new preference, enter the details in the input field (e.g., Type: `preference`, Title: `Default Corridor`, Content: `Always favor Airtel for Rwanda transfers`) and click **Commit Memory**.
4.  Future AI decisions will adapt to this committed preference dynamically.
