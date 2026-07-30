import { db, schema } from './index.ts';
import { eq, desc } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

// Define the fallback JSON file
const DB_FILE = path.join(process.cwd(), 'meherah_db.json');

// Read JSON fallback
function readJsonFallback(): any {
  if (!fs.existsSync(DB_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (err) {
    return {};
  }
}

// Write JSON fallback
function writeJsonFallback(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write JSON DB fallback:', err);
  }
}

// Check if PostgreSQL is available at runtime
const isPostgresAvailable = (): boolean => {
  return !!(process.env.SQL_HOST && process.env.SQL_USER && process.env.SQL_PASSWORD && process.env.SQL_DB_NAME);
};

// -------------------------------------------------------------------------
// USERS SERVICE
// -------------------------------------------------------------------------
export async function dbGetUsers() {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    return data.users || [];
  }
  try {
    return await db.select().from(schema.users);
  } catch (err) {
    console.warn('PostgreSQL getUsers error, falling back to JSON:', err);
    const data = readJsonFallback();
    return data.users || [];
  }
}

export async function dbGetOrCreateUser(uid: string, email: string, role: string = 'user') {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (!data.users) data.users = [];
    let user = data.users.find((u: any) => u.uid === uid);
    if (!user) {
      user = { id: data.users.length + 1, uid, email, role, createdAt: new Date().toISOString() };
      data.users.push(user);
      writeJsonFallback(data);
    }
    return user;
  }
  try {
    const result = await db.insert(schema.users)
      .values({ uid, email, role })
      .onConflictDoUpdate({
        target: schema.users.uid,
        set: { email, role }
      })
      .returning();
    return result[0];
  } catch (err) {
    console.warn('PostgreSQL getOrCreateUser error, using JSON fallback:', err);
    const data = readJsonFallback();
    if (!data.users) data.users = [];
    let user = data.users.find((u: any) => u.uid === uid);
    if (!user) {
      user = { id: data.users.length + 1, uid, email, role, createdAt: new Date().toISOString() };
      data.users.push(user);
      writeJsonFallback(data);
    }
    return user;
  }
}

// -------------------------------------------------------------------------
// MEMORIES SERVICE
// -------------------------------------------------------------------------
export async function dbGetMemories() {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    return data.memories || [];
  }
  try {
    const items = await db.select().from(schema.memory).orderBy(desc(schema.memory.createdAt));
    return items.map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      content: item.content,
      timestamp: item.createdAt.toISOString()
    }));
  } catch (err) {
    console.warn('PostgreSQL getMemories error, falling back to JSON:', err);
    const data = readJsonFallback();
    return data.memories || [];
  }
}

export async function dbCreateMemory(id: string, title: string, type: string, content: string) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (!data.memories) data.memories = [];
    const newItem = { id, title, type, content, timestamp: new Date().toISOString() };
    data.memories.unshift(newItem);
    writeJsonFallback(data);
    return newItem;
  }
  try {
    const result = await db.insert(schema.memory)
      .values({
        id,
        title,
        type,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    return {
      id: result[0].id,
      type: result[0].type,
      title: result[0].title,
      content: result[0].content,
      timestamp: result[0].createdAt.toISOString()
    };
  } catch (err) {
    console.warn('PostgreSQL createMemory error, falling back to JSON:', err);
    const data = readJsonFallback();
    if (!data.memories) data.memories = [];
    const newItem = { id, title, type, content, timestamp: new Date().toISOString() };
    data.memories.unshift(newItem);
    writeJsonFallback(data);
    return newItem;
  }
}

export async function dbDeleteMemory(id: string) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (data.memories) {
      data.memories = data.memories.filter((m: any) => m.id !== id);
      writeJsonFallback(data);
    }
    return true;
  }
  try {
    await db.delete(schema.memory).where(eq(schema.memory.id, id));
    return true;
  } catch (err) {
    console.warn('PostgreSQL deleteMemory error:', err);
    const data = readJsonFallback();
    if (data.memories) {
      data.memories = data.memories.filter((m: any) => m.id !== id);
      writeJsonFallback(data);
    }
    return true;
  }
}

// -------------------------------------------------------------------------
// MISSIONS SERVICE
// -------------------------------------------------------------------------
export async function dbGetMissions() {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    return data.missions || [];
  }
  try {
    const sqlMissions = await db.select().from(schema.missions).orderBy(desc(schema.missions.createdAt));
    const allMissions = [];
    
    for (const m of sqlMissions) {
      const sqlTasks = await db.select().from(schema.tasks).where(eq(schema.tasks.missionId, m.id));
      allMissions.push({
        id: m.id,
        goal: m.goal,
        status: m.status,
        providerName: m.providerName || undefined,
        tokensUsed: m.tokensUsed || undefined,
        latencyMs: m.latencyMs || undefined,
        activeReasoning: m.activeReasoning || undefined,
        createdAt: m.createdAt.toISOString(),
        updatedAt: m.updatedAt.toISOString(),
        tasks: sqlTasks.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description,
          assignedAgent: t.assignedAgent,
          status: t.status,
          result: t.result || undefined,
          thinkingTrace: t.thinkingTrace || undefined,
          approvalMessage: t.approvalMessage || undefined,
          approved: t.approved
        }))
      });
    }
    return allMissions;
  } catch (err) {
    console.warn('PostgreSQL getMissions error, falling back to JSON:', err);
    const data = readJsonFallback();
    return data.missions || [];
  }
}

export async function dbCreateMission(
  id: string,
  goal: string,
  status: string,
  providerName?: string,
  tokensUsed?: number,
  latencyMs?: number,
  activeReasoning?: string[]
) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (!data.missions) data.missions = [];
    const newMission = {
      id,
      goal,
      status,
      providerName,
      tokensUsed,
      latencyMs,
      activeReasoning,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: []
    };
    data.missions.unshift(newMission);
    writeJsonFallback(data);
    return newMission;
  }
  try {
    await db.insert(schema.missions)
      .values({
        id,
        goal,
        status,
        providerName,
        tokensUsed,
        latencyMs,
        activeReasoning,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    return {
      id,
      goal,
      status,
      providerName,
      tokensUsed,
      latencyMs,
      activeReasoning,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: []
    };
  } catch (err) {
    console.warn('PostgreSQL createMission error:', err);
    const data = readJsonFallback();
    if (!data.missions) data.missions = [];
    const newMission = {
      id,
      goal,
      status,
      providerName,
      tokensUsed,
      latencyMs,
      activeReasoning,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: []
    };
    data.missions.unshift(newMission);
    writeJsonFallback(data);
    return newMission;
  }
}

export async function dbUpdateMission(id: string, updates: any) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (data.missions) {
      const idx = data.missions.findIndex((m: any) => m.id === id);
      if (idx !== -1) {
        data.missions[idx] = { ...data.missions[idx], ...updates, updatedAt: new Date().toISOString() };
        writeJsonFallback(data);
      }
    }
    return;
  }
  try {
    const dbUpdates: any = { updatedAt: new Date() };
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.providerName !== undefined) dbUpdates.providerName = updates.providerName;
    if (updates.tokensUsed !== undefined) dbUpdates.tokensUsed = updates.tokensUsed;
    if (updates.latencyMs !== undefined) dbUpdates.latencyMs = updates.latencyMs;
    if (updates.activeReasoning !== undefined) dbUpdates.activeReasoning = updates.activeReasoning;

    await db.update(schema.missions)
      .set(dbUpdates)
      .where(eq(schema.missions.id, id));
  } catch (err) {
    console.warn('PostgreSQL updateMission error:', err);
    const data = readJsonFallback();
    if (data.missions) {
      const idx = data.missions.findIndex((m: any) => m.id === id);
      if (idx !== -1) {
        data.missions[idx] = { ...data.missions[idx], ...updates, updatedAt: new Date().toISOString() };
        writeJsonFallback(data);
      }
    }
  }
}

// -------------------------------------------------------------------------
// TASKS SERVICE
// -------------------------------------------------------------------------
export async function dbSaveTask(task: any) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (data.missions) {
      const mission = data.missions.find((m: any) => m.id === task.missionId);
      if (mission) {
        const existingTaskIdx = mission.tasks.findIndex((t: any) => t.id === task.id);
        if (existingTaskIdx !== -1) {
          mission.tasks[existingTaskIdx] = { ...mission.tasks[existingTaskIdx], ...task };
        } else {
          mission.tasks.push(task);
        }
        writeJsonFallback(data);
      }
    }
    return;
  }
  try {
    await db.insert(schema.tasks)
      .values({
        id: task.id,
        missionId: task.missionId,
        title: task.title,
        description: task.description,
        assignedAgent: task.assignedAgent,
        status: task.status,
        result: task.result || null,
        thinkingTrace: task.thinkingTrace || null,
        approvalMessage: task.approvalMessage || null,
        approved: task.approved || false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .onConflictDoUpdate({
        target: schema.tasks.id,
        set: {
          status: task.status,
          result: task.result || null,
          thinkingTrace: task.thinkingTrace || null,
          approved: task.approved || false,
          updatedAt: new Date()
        }
      });
  } catch (err) {
    console.warn('PostgreSQL saveTask error:', err);
    const data = readJsonFallback();
    if (data.missions) {
      const mission = data.missions.find((m: any) => m.id === task.missionId);
      if (mission) {
        const existingTaskIdx = mission.tasks.findIndex((t: any) => t.id === task.id);
        if (existingTaskIdx !== -1) {
          mission.tasks[existingTaskIdx] = { ...mission.tasks[existingTaskIdx], ...task };
        } else {
          mission.tasks.push(task);
        }
        writeJsonFallback(data);
      }
    }
  }
}

// -------------------------------------------------------------------------
// AUDIT LOGS SERVICE
// -------------------------------------------------------------------------
export async function dbGetAuditLogs() {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    return data.zkLogs || [];
  }
  try {
    const logs = await db.select().from(schema.auditLogs).orderBy(desc(schema.auditLogs.id));
    return logs.map(l => ({
      id: 'zk-' + l.id,
      timestamp: l.timestamp,
      text: l.message,
      operationType: l.type,
      proofHash: (l.metadata as any)?.proofHash || '',
      payload: (l.metadata as any)?.payload || {}
    }));
  } catch (err) {
    console.warn('PostgreSQL getAuditLogs error:', err);
    const data = readJsonFallback();
    return data.zkLogs || [];
  }
}

export async function dbAddAuditLog(type: string, message: string, metadata?: any) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (!data.zkLogs) data.zkLogs = [];
    const newLog = {
      id: 'zk-' + Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
      text: message,
      operationType: type,
      proofHash: metadata?.proofHash || '',
      payload: metadata?.payload || {}
    };
    data.zkLogs.unshift(newLog);
    if (data.zkLogs.length > 50) data.zkLogs.pop();
    writeJsonFallback(data);
    return;
  }
  try {
    await db.insert(schema.auditLogs)
      .values({
        type,
        message,
        timestamp: new Date().toISOString(),
        metadata
      });
  } catch (err) {
    console.warn('PostgreSQL addAuditLog error:', err);
    const data = readJsonFallback();
    if (!data.zkLogs) data.zkLogs = [];
    const newLog = {
      id: 'zk-' + Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
      text: message,
      operationType: type,
      proofHash: metadata?.proofHash || '',
      payload: metadata?.payload || {}
    };
    data.zkLogs.unshift(newLog);
    if (data.zkLogs.length > 50) data.zkLogs.pop();
    writeJsonFallback(data);
  }
}

// -------------------------------------------------------------------------
// INITIAL SEEDING HELPERS FOR RELATIONAL DB
// -------------------------------------------------------------------------
export async function seedRelationalDbIfEmpty(initialAgents: any[], initialConnectors: any[], initialMemories: any[]) {
  if (!isPostgresAvailable()) return;
  try {
    // Check & Seed Agents
    const agentsCount = await db.select().from(schema.agents);
    if (agentsCount.length === 0) {
      console.log('[SEED] Seeding Agents into PostgreSQL...');
      for (const a of initialAgents) {
        await db.insert(schema.agents).values({
          id: a.id,
          name: a.name,
          emoji: a.emoji,
          status: a.status,
          capability: a.purpose || '',
          rating: 98,
          type: 'core'
        });
      }
    }

    // Check & Seed Connectors
    const connectorsCount = await db.select().from(schema.connectors);
    if (connectorsCount.length === 0) {
      console.log('[SEED] Seeding Connector Registry into PostgreSQL...');
      for (const c of initialConnectors) {
        await db.insert(schema.connectors).values({
          id: c.id,
          name: c.name,
          type: c.type,
          status: c.status,
          iconName: c.type === 'MOBILE_MONEY' ? 'Smartphone' : 'Globe',
          loggingEnabled: true,
          authConfig: { provider: c.provider },
          permissions: { allowed_roles: ['operator', 'executive'] },
          retryConfig: { max_attempts: 3, delay_seconds: 5 }
        });
      }
    }

    // Check & Seed Memories
    const memoriesCount = await db.select().from(schema.memory);
    if (memoriesCount.length === 0) {
      console.log('[SEED] Seeding Operating Memories into PostgreSQL...');
      for (const m of initialMemories) {
        await db.insert(schema.memory).values({
          id: m.id,
          title: m.title,
          type: m.type,
          content: m.content,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
  } catch (err) {
    console.error('[SEED] Seeding error on PostgreSQL database setup:', err);
  }
}

// -------------------------------------------------------------------------
// STAGE 4 LEARNING SYSTEMS SERVICE
// -------------------------------------------------------------------------
export async function dbGetStrategyMetrics() {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    return data.strategyMetrics || [];
  }
  try {
    return await db.select().from(schema.strategyMetrics);
  } catch (err) {
    console.warn('PostgreSQL getStrategyMetrics error:', err);
    const data = readJsonFallback();
    return data.strategyMetrics || [];
  }
}

export async function dbSaveStrategyMetrics(
  strategyId: string,
  strategyName: string,
  successRate: number,
  confidenceScore: number,
  totalMissionsExecuted: number
) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (!data.strategyMetrics) data.strategyMetrics = [];
    const idx = data.strategyMetrics.findIndex((s: any) => s.strategyId === strategyId);
    const item = {
      strategyId,
      strategyName,
      successRate,
      confidenceScore,
      totalMissionsExecuted,
      lastUpdatedAt: new Date().toISOString()
    };
    if (idx !== -1) {
      data.strategyMetrics[idx] = item;
    } else {
      data.strategyMetrics.push(item);
    }
    writeJsonFallback(data);
    return item;
  }
  try {
    const result = await db.insert(schema.strategyMetrics)
      .values({
        strategyId,
        strategyName,
        successRate: Math.round(successRate),
        confidenceScore: Math.round(confidenceScore),
        totalMissionsExecuted,
        lastUpdatedAt: new Date()
      })
      .onConflictDoUpdate({
        target: schema.strategyMetrics.strategyId,
        set: {
          successRate: Math.round(successRate),
          confidenceScore: Math.round(confidenceScore),
          totalMissionsExecuted,
          lastUpdatedAt: new Date()
        }
      })
      .returning();
    return result[0];
  } catch (err) {
    console.warn('PostgreSQL saveStrategyMetrics error:', err);
    const data = readJsonFallback();
    if (!data.strategyMetrics) data.strategyMetrics = [];
    const item = {
      strategyId,
      strategyName,
      successRate,
      confidenceScore,
      totalMissionsExecuted,
      lastUpdatedAt: new Date().toISOString()
    };
    data.strategyMetrics.push(item);
    writeJsonFallback(data);
    return item;
  }
}

export async function dbAddLearningHistoryLog(
  strategyId: string,
  agentId: string,
  missionId: string,
  outcome: string,
  previousConfidence?: number,
  newConfidence?: number,
  adjustmentReason?: string
) {
  if (!isPostgresAvailable()) {
    const data = readJsonFallback();
    if (!data.learningLogs) data.learningLogs = [];
    const log = {
      logId: data.learningLogs.length + 1,
      strategyId,
      agentId,
      missionId,
      outcome,
      previousConfidence,
      newConfidence,
      adjustmentReason,
      recordedAt: new Date().toISOString()
    };
    data.learningLogs.unshift(log);
    writeJsonFallback(data);
    return log;
  }
  try {
    const result = await db.insert(schema.learningHistoryLogs)
      .values({
        strategyId,
        agentId,
        missionId,
        outcome,
        previousConfidence: previousConfidence ? Math.round(previousConfidence) : null,
        newConfidence: newConfidence ? Math.round(newConfidence) : null,
        adjustmentReason,
        recordedAt: new Date()
      })
      .returning();
    return result[0];
  } catch (err) {
    console.warn('PostgreSQL addLearningHistoryLog error:', err);
    const data = readJsonFallback();
    if (!data.learningLogs) data.learningLogs = [];
    const log = {
      logId: data.learningLogs.length + 1,
      strategyId,
      agentId,
      missionId,
      outcome,
      previousConfidence,
      newConfidence,
      adjustmentReason,
      recordedAt: new Date().toISOString()
    };
    data.learningLogs.unshift(log);
    writeJsonFallback(data);
    return log;
  }
}

