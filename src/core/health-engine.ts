import * as os from 'os';
import type * as amqp from 'amqplib';

export interface HealthReport {
  status: 'HEALTHY' | 'DEGRADED' | 'CRITICAL';
  timestamp: string;
  telemetry: {
    cpu: { usagePercent: number; cores: number; uptime: number };
    ram: { totalGB: number; freeGB: number; usagePercent: number };
    redis: { connected: boolean; latencyMs: number; memoryUsedBytes: number };
    rabbitmq: { connected: boolean; queueDepth: number; consumerCount: number };
    agentStatus: string;
    missionQueue: number;
    overallScore: number;
  };
}

export class HealthEngine {
  private redisClient: any; 
  private rabbitChannel: amqp.Channel | null = null;

  constructor(redisClient: any = null, rabbitChannel: amqp.Channel | null = null) {
    this.redisClient = redisClient;
    this.rabbitChannel = rabbitChannel;
  }

  private getCpuUsage(): number {
    const cpus = os.cpus();
    if (!cpus || cpus.length === 0) return 0;

    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((core) => {
      for (const type in core.times) {
        totalTick += (core.times as any)[type];
      }
      totalIdle += core.times.idle;
    });

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    return parseFloat(((1 - idle / (total || 1)) * 100).toFixed(2));
  }

  public async generateRealReport(activeMissions: number = 0): Promise<HealthReport> {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const ramUsage = parseFloat(((1 - freeMem / totalMem) * 100).toFixed(2));

    // Redis Health Check
    let redisConnected = false;
    let redisLatency = -1;
    let redisMem = 0;
    try {
      if (this.redisClient) {
        const start = Date.now();
        const pingResponse = typeof this.redisClient.ping === 'function' ? await this.redisClient.ping() : null;
        if (pingResponse === 'PONG' || pingResponse === 'OK' || pingResponse) {
          redisConnected = true;
          redisLatency = Date.now() - start;
          if (typeof this.redisClient.info === 'function') {
            const info = await this.redisClient.info('memory');
            const match = typeof info === 'string' ? info.match(/used_memory:(\d+)/) : null;
            if (match) redisMem = parseInt(match[1], 10);
          }
        }
      }
    } catch (err) {
      redisConnected = false;
    }

    // RabbitMQ Health Check
    let rabbitConnected = false;
    let queueDepth = 0;
    let consumerCount = 0;
    try {
      if (this.rabbitChannel) {
        // Use checkQueue or assertQueue to inspect infrastructure queue status
        const queueInfo = typeof (this.rabbitChannel as any).checkQueue === 'function'
          ? await (this.rabbitChannel as any).checkQueue('mission_queue')
          : await this.rabbitChannel.assertQueue('mission_queue', { durable: true });
        rabbitConnected = true;
        queueDepth = queueInfo.messageCount;
        consumerCount = queueInfo.consumerCount;
      }
    } catch (err) {
      rabbitConnected = false;
    }

    // Score Calculation
    let criticalFailures = 0;
    if (!redisConnected && this.redisClient) criticalFailures++;
    if (!rabbitConnected && this.rabbitChannel) criticalFailures++;
    if (ramUsage > 90) criticalFailures++;

    const cpuUsage = this.getCpuUsage();
    const overallScore = Math.max(0, 100 - (criticalFailures * 35) - (cpuUsage * 0.2));
    const status = overallScore > 75 ? 'HEALTHY' : overallScore > 40 ? 'DEGRADED' : 'CRITICAL';

    return {
      status,
      timestamp: new Date().toISOString(),
      telemetry: {
        cpu: { usagePercent: cpuUsage, cores: os.cpus().length, uptime: os.uptime() },
        ram: { 
          totalGB: parseFloat((totalMem / 1024 / 1024 / 1024).toFixed(2)), 
          freeGB: parseFloat((freeMem / 1024 / 1024 / 1024).toFixed(2)), 
          usagePercent: ramUsage 
        },
        redis: { connected: redisConnected, latencyMs: redisLatency, memoryUsedBytes: redisMem },
        rabbitmq: { connected: rabbitConnected, queueDepth, consumerCount },
        agentStatus: status === 'CRITICAL' ? 'PAUSED_BY_SYSTEM' : 'ACTIVE',
        missionQueue: activeMissions,
        overallScore: Math.round(overallScore)
      }
    };
  }
}
