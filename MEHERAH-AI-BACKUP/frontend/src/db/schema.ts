import { pgTable, text, timestamp, boolean, integer, jsonb, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  role: text('role').default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Projects Table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Missions Table
export const missions = pgTable('missions', {
  id: text('id').primaryKey(), // We use standard generated string IDs (e.g. m-...)
  goal: text('goal').notNull(),
  status: text('status').notNull(),
  providerName: text('provider_name'),
  tokensUsed: integer('tokens_used'),
  latencyMs: integer('latency_ms'),
  activeReasoning: jsonb('active_reasoning').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tasks Table
export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(), // e.g. task-m-1
  missionId: text('mission_id').references(() => missions.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  assignedAgent: text('assigned_agent').notNull(),
  status: text('status').notNull(),
  result: text('result'),
  thinkingTrace: jsonb('thinking_trace').$type<string[]>(),
  approvalMessage: text('approval_message'),
  approved: boolean('approved').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Agents Table
export const agents = pgTable('agents', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status').notNull(),
  emoji: text('emoji'),
  capability: text('capability'),
  costRating: integer('cost_rating'),
  latencyRating: integer('latency_rating'),
  availabilityRating: integer('availability_rating'),
  providerId: text('provider_id'),
  rating: integer('rating'),
  type: text('type'),
});

// Memory Table
export const memory = pgTable('memory', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Connector Registry Table
export const connectors = pgTable('connectors', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status').notNull(),
  type: text('type').notNull(),
  iconName: text('icon_name'),
  authConfig: jsonb('auth_config'),
  permissions: jsonb('permissions'),
  errorLog: jsonb('error_log'),
  loggingEnabled: boolean('logging_enabled').default(true).notNull(),
  retryConfig: jsonb('retry_config'),
});

// Audit Logs Table
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(),
  message: text('message').notNull(),
  timestamp: text('timestamp').notNull(),
  metadata: jsonb('metadata'),
});

// API Keys Table
export const apiKeys = pgTable('api_keys', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  provider: text('provider').notNull(),
  value: text('value').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Settings Table
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  description: text('description'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Strategy Metrics Table (Stage 4 Learning Systems)
export const strategyMetrics = pgTable('strategy_metrics', {
  strategyId: text('strategy_id').primaryKey(),
  strategyName: text('strategy_name').notNull(),
  successRate: integer('success_rate').default(0),
  confidenceScore: integer('confidence_score').default(0),
  totalMissionsExecuted: integer('total_missions_executed').default(0),
  lastUpdatedAt: timestamp('last_updated_at').defaultNow().notNull(),
});

// Learning History Logs Table (Stage 4 Learning Systems)
export const learningHistoryLogs = pgTable('learning_history_logs', {
  logId: serial('log_id').primaryKey(),
  strategyId: text('strategy_id').references(() => strategyMetrics.strategyId),
  agentId: text('agent_id').notNull(),
  missionId: text('mission_id').notNull(),
  outcome: text('outcome').notNull(), // 'SUCCESS', 'FAILED', 'RECOVERED'
  previousConfidence: integer('previous_confidence'),
  newConfidence: integer('new_confidence'),
  adjustmentReason: text('adjustment_reason'),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
});

// Relations
export const missionsRelations = relations(missions, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  mission: one(missions, {
    fields: [tasks.missionId],
    references: [missions.id],
  }),
}));

export const strategyMetricsRelations = relations(strategyMetrics, ({ many }) => ({
  logs: many(learningHistoryLogs),
}));

export const learningHistoryLogsRelations = relations(learningHistoryLogs, ({ one }) => ({
  strategy: one(strategyMetrics, {
    fields: [learningHistoryLogs.strategyId],
    references: [strategyMetrics.strategyId],
  }),
}));
