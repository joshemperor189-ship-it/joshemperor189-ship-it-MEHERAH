import { Request, Response, NextFunction } from 'express';
import { sanitizeLogData } from './auth.ts';

export interface AIGatewayLogEntry {
  id: string;
  timestamp: string;
  provider: string;
  model: string;
  agentId?: string;
  promptPreview: string;
  latency_ms: number;
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  success: boolean;
  retryCount: number;
  errorMessage?: string;
  clientIp?: string;
}

class GatewayLoggerStore {
  private logs: AIGatewayLogEntry[] = [];
  private maxLogs: number = 100;

  public addLog(entry: Omit<AIGatewayLogEntry, 'id' | 'timestamp'>): AIGatewayLogEntry {
    const fullEntry: AIGatewayLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...entry,
      promptPreview: sanitizeLogData({ text: entry.promptPreview }).text
    };

    this.logs.unshift(fullEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Console output with masked details
    const statusIcon = fullEntry.success ? '✅' : '❌';
    console.log(
      `[AI GATEWAY LOG] ${statusIcon} [${fullEntry.provider}:${fullEntry.model}] ` +
      `Agent: ${fullEntry.agentId || 'Direct'} | Latency: ${fullEntry.latency_ms}ms | ` +
      `Tokens: In:${fullEntry.tokens.input} Out:${fullEntry.tokens.output} | Retries: ${fullEntry.retryCount}`
    );

    return fullEntry;
  }

  public getLogs(limit: number = 50): AIGatewayLogEntry[] {
    return this.logs.slice(0, limit);
  }

  public getMetrics() {
    const totalRequests = this.logs.length;
    if (totalRequests === 0) {
      return {
        totalRequests: 0,
        successRate: 100,
        avgLatencyMs: 0,
        totalTokens: 0,
        providersUsed: {}
      };
    }

    const successful = this.logs.filter(l => l.success).length;
    const totalLatency = this.logs.reduce((acc, l) => acc + l.latency_ms, 0);
    const totalTokens = this.logs.reduce((acc, l) => acc + l.tokens.total, 0);

    const providersUsed: Record<string, number> = {};
    for (const log of this.logs) {
      providersUsed[log.provider] = (providersUsed[log.provider] || 0) + 1;
    }

    return {
      totalRequests,
      successRate: Number(((successful / totalRequests) * 100).toFixed(1)),
      avgLatencyMs: Math.round(totalLatency / totalRequests),
      totalTokens,
      providersUsed
    };
  }

  public clearLogs() {
    this.logs = [];
  }
}

export const gatewayLogger = new GatewayLoggerStore();

export function gatewayLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api/ai')) {
      console.log(`[HTTP AI GATEWAY] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
}
