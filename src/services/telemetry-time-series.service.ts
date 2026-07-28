import { eventBus, MeherahSystemEvent } from './event-bus.service';
import { agentOrchestrator } from './agent-orchestrator.service';
import { circuitBreakerService } from './circuit-breaker.service';

export interface TelemetryMetricPoint {
  timestamp: string;
  eventsPerSec: number;
  avgLatencyMs: number;
  confidenceScore: number;
  cpuLoadPercent: number;
  memoryUsageMb: number;
  totalEventsIngested: number;
}

export interface ProviderHeatmapItem {
  providerId: string;
  name: string;
  type: string;
  latencyMs: number;
  successRate: number;
  totalRequests: number;
  failedRequests: number;
  circuitState: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  healthIndex: number; // 0-100
}

export class TelemetryTimeSeriesService {
  private static instance: TelemetryTimeSeriesService;
  private timeSeriesBuffer: TelemetryMetricPoint[] = [];
  private eventLogsBuffer: MeherahSystemEvent[] = [];
  private maxBufferSize = 100;
  private sseClients: Array<{ id: string; res: any }> = [];
  private isKillSwitchEngaged = false;
  private killSwitchLog: Array<{ timestamp: string; action: 'ENGAGED' | 'DISENGAGED'; operator: string; reason: string }> = [];

  private constructor() {
    // Attach listener to event bus for asynchronous telemetry ingestion
    eventBus.subscribe('*', (event) => {
      this.ingestEvent(event);
    });

    // Start background time-series metric collector every 2 seconds
    setInterval(() => {
      this.collectMetricPoint();
    }, 2000);
  }

  public static getInstance(): TelemetryTimeSeriesService {
    if (!TelemetryTimeSeriesService.instance) {
      TelemetryTimeSeriesService.instance = new TelemetryTimeSeriesService();
    }
    return TelemetryTimeSeriesService.instance;
  }

  private ingestEvent(event: MeherahSystemEvent): void {
    this.eventLogsBuffer.unshift(event);
    if (this.eventLogsBuffer.length > this.maxBufferSize) {
      this.eventLogsBuffer.pop();
    }

    // Broadcast to SSE connected subscribers
    this.broadcastToSse({
      type: 'EVENT',
      event,
      timestamp: new Date().toISOString()
    });
  }

  private collectMetricPoint(): void {
    const cbMetrics = circuitBreakerService.getAllMetrics();
    const avgCbLatency = cbMetrics.length > 0 
      ? Math.round(cbMetrics.reduce((acc, c) => acc + c.avgLatencyMs, 0) / cbMetrics.length)
      : 120;

    const simulatedCpu = Math.round(18 + Math.random() * 15);
    const simulatedMem = Math.round(310 + Math.random() * 45);

    const point: TelemetryMetricPoint = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      eventsPerSec: Math.round(5 + Math.random() * 25),
      avgLatencyMs: avgCbLatency + Math.round((Math.random() - 0.5) * 30),
      confidenceScore: Number((98.5 + Math.random() * 1.4).toFixed(2)),
      cpuLoadPercent: simulatedCpu,
      memoryUsageMb: simulatedMem,
      totalEventsIngested: this.eventLogsBuffer.length
    };

    this.timeSeriesBuffer.push(point);
    if (this.timeSeriesBuffer.length > 30) {
      this.timeSeriesBuffer.shift();
    }

    this.broadcastToSse({
      type: 'METRIC',
      metricPoint: point,
      killSwitchEngaged: this.isKillSwitchEngaged,
      timestamp: new Date().toISOString()
    });
  }

  public registerSseClient(id: string, res: any): void {
    this.sseClients.push({ id, res });
    // Send initial snapshot
    res.write(`data: ${JSON.stringify({
      type: 'INITIAL_SNAPSHOT',
      history: this.timeSeriesBuffer,
      recentEvents: this.eventLogsBuffer.slice(0, 20),
      killSwitchEngaged: this.isKillSwitchEngaged,
      agents: agentOrchestrator.getAgentsList(),
      providers: this.getProviderHeatmap()
    })}\n\n`);
  }

  public removeSseClient(id: string): void {
    this.sseClients = this.sseClients.filter(c => c.id !== id);
  }

  private broadcastToSse(data: any): void {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    this.sseClients.forEach(client => {
      try {
        client.res.write(payload);
      } catch (e) {
        // Handle client disconnection
      }
    });
  }

  public toggleKillSwitch(engaged: boolean, operator: string = 'Chief Administrator', reason: string = 'Manual Safety Override'): { engaged: boolean; log: any } {
    this.isKillSwitchEngaged = engaged;
    eventBus.setKillSwitch(engaged);

    const logEntry = {
      timestamp: new Date().toISOString(),
      action: engaged ? ('ENGAGED' as const) : ('DISENGAGED' as const),
      operator,
      reason
    };
    this.killSwitchLog.unshift(logEntry);

    // Emit event on bus
    eventBus.publish(
      'agent.directive',
      'Telemetry Time-Series Service',
      { command: engaged ? 'KILL_SWITCH_ENGAGED' : 'KILL_SWITCH_DISENGAGED', operator, reason }
    );

    this.broadcastToSse({
      type: 'KILL_SWITCH_STATUS',
      killSwitchEngaged: this.isKillSwitchEngaged,
      logEntry
    });

    return { engaged: this.isKillSwitchEngaged, log: logEntry };
  }

  public getKillSwitchStatus() {
    return {
      engaged: this.isKillSwitchEngaged,
      history: this.killSwitchLog
    };
  }

  public getTimeSeriesHistory(): TelemetryMetricPoint[] {
    return this.timeSeriesBuffer;
  }

  public getRecentLogs(limit: number = 30): MeherahSystemEvent[] {
    return this.eventLogsBuffer.slice(0, limit);
  }

  public getProviderHeatmap(): ProviderHeatmapItem[] {
    const cbMetrics = circuitBreakerService.getAllMetrics();
    const providersList = [
      { id: 'flutterwave', name: 'Flutterwave Gateway Adapter', type: 'Card & Bank API', defaultLat: 145 },
      { id: 'mtn_momo', name: 'MTN Mobile Money Core', type: 'USSD Telecom Gateway', defaultLat: 210 },
      { id: 'airtel_money', name: 'Airtel Money Express', type: 'Mobile Wallet API', defaultLat: 180 },
      { id: 'direct_bank', name: 'Direct Bank ACH/Swift', type: 'Settlement Network', defaultLat: 420 }
    ];

    return providersList.map(p => {
      const cb = cbMetrics.find(c => c.providerId === p.id);
      const circuitState = cb ? cb.state : 'CLOSED';
      const latencyMs = cb && cb.avgLatencyMs > 0 ? cb.avgLatencyMs : p.defaultLat + Math.round((Math.random() - 0.5) * 40);
      const failedRequests = cb ? cb.failedRequests : Math.floor(Math.random() * 3);
      const totalRequests = cb ? cb.totalRequests : 120 + Math.floor(Math.random() * 50);
      const successRate = totalRequests > 0 
        ? Number((((totalRequests - failedRequests) / totalRequests) * 100).toFixed(1)) 
        : 99.2;
      
      const healthIndex = circuitState === 'OPEN' ? 20 : Math.min(100, Math.max(10, Math.round(successRate - (latencyMs / 20))));

      return {
        providerId: p.id,
        name: p.name,
        type: p.type,
        latencyMs,
        successRate,
        totalRequests,
        failedRequests,
        circuitState,
        healthIndex
      };
    });
  }
}

export const telemetryTimeSeriesService = TelemetryTimeSeriesService.getInstance();
