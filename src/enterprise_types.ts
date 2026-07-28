export enum UserRole {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  AUDITOR = "AUDITOR",
  READ_ONLY = "READ_ONLY"
}

export interface UserSession {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  token?: string;
}

export interface AIProvider {
  id: string;
  name: string;
  reasoningQuality: number; // 1-10
  speed: number;            // tokens/sec
  costPerMillion: number;   // USD
  contextLength: string;    // e.g. "128k"
  availability: number;     // percentage (e.g. 99.9)
  latencyMs: number;
  status: "ONLINE" | "OFFLINE";
}

export interface ToolConnector {
  id: string;
  name: string;
  category: "vcs" | "storage" | "comms" | "database" | "api" | "webhook";
  status: "CONNECTED" | "DISCONNECTED" | "UNAUTHORIZED";
  authConfigured: boolean;
  permissions: string[];
  logs: { timestamp: string; action: string; status: "success" | "failed"; detail: string }[];
}

export interface SQLTableSchema {
  tableName: string;
  columns: { name: string; type: string; constraints?: string }[];
  indexes: string[];
  foreignKeys?: string[];
  rowCount: number;
}

export interface ISO20022Message {
  id: string;
  type: "pacs.008.001.08" | "pain.001.001.09" | "camt.053.001.08";
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  xmlContent: string;
  timestamp: string;
}

export interface KGNode {
  id: string;
  label: string;
  type: "agent" | "mission" | "memory" | "connector" | "zk_log" | "user";
  val: number; // For rendering size
}

export interface KGEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface MarketplacePlugin {
  id: string;
  name: string;
  description: string;
  category: "intelligence" | "connector" | "security" | "financial";
  enabled: boolean;
  rating: number;
  installedAt?: string;
}

export interface TelemetryPrediction {
  timestamp: string;
  predictedMtnLatency: number;
  predictedAirtelLatency: number;
  anomalyScore: number; // 0-100
  recommendation: string;
}
