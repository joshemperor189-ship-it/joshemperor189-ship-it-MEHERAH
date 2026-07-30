export enum AgentStatus {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  NEEDS_APPROVAL = "NEEDS_APPROVAL",
  FAILED = "FAILED"
}

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  purpose: string;
  skills: string[];
  status: AgentStatus;
  lastActiveTask?: string;
}

export enum TaskStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  NEEDS_APPROVAL = "NEEDS_APPROVAL",
  FAILED = "FAILED"
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedAgent: string; // Agent name/emoji or ID
  status: TaskStatus;
  result?: string;
  thinkingTrace?: string[];
  approvalMessage?: string;
  approved?: boolean;
}

export enum MissionStatus {
  NOT_STARTED = "NOT_STARTED",
  PLANNING = "PLANNING",
  RUNNING = "RUNNING",
  PAUSED_APPROVAL = "PAUSED_APPROVAL",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

export interface Mission {
  id: string;
  goal: string;
  tasks: Task[];
  status: MissionStatus;
  createdAt: string;
  updatedAt: string;
  providerName?: string;
  tokensUsed?: number;
  latencyMs?: number;
  activeReasoning?: string[];
}

export interface ZKAuditLog {
  id: string;
  timestamp: string;
  text: string;
  proofHash: string; // Simulated SHA-256 ZK Proof hash
  operationType: string; // e.g. "CONSENT_RECORD", "ROUTING_DECISION", "DISBURSEMENT_BATCH"
  payload: Record<string, any>; // Hidden details in ZK-Proof
}

export interface LatencyMetric {
  timestamp: string;
  mtnLatency: number;
  airtelLatency: number;
  selectedProvider: "MTN" | "AIRTEL";
  stateDescription: string;
}

export interface MemoryItem {
  id: string;
  type: "preference" | "project" | "conversation" | "decision" | "file" | "lesson";
  title: string;
  content: string;
  timestamp: string;
}

export interface Connector {
  id: string;
  name: string;
  type: "MOBILE_MONEY" | "BANK_WIRE" | "OPEN_BANKING";
  provider: "MTN" | "AIRTEL" | "STANBIC" | "SOCIETE_GENERALE";
  status: "ONLINE" | "OFFLINE" | "DEGRADED";
  latencyMs: number;
  rateLimitPerSec: number;
  currentQueueSize: number;
}
