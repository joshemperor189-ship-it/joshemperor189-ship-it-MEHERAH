/**
 * MAFE - Proportional Engine (Stage 1: Present State Evaluation)
 * Evaluates real-time health, latency, fees, success rate, active liquidity, and telemetry integrity
 * to produce defensible proportional scores, routing decisions, and audit evidence receipts.
 */

export type ProviderHealthStatus = 'UP' | 'DEGRADED' | 'DOWN' | 'UNKNOWN';

export interface ProviderPresentState {
  providerId: string;
  providerName: string;
  currentLatencyMs: number;
  currentFeePct: number;
  currentSuccessRatePct: number;
  activeLiquidityUgx: number;
  apiHealthStatus: 'OPTIMAL' | 'DEGRADED' | 'DOWN';
}

export interface ProportionalScore {
  providerId: string;
  rawScore: number; // 0 to 100
  latencyPenalty: number;
  feePenalty: number;
  healthBonus: number;
  reasoning: string;
}

export interface ProviderTelemetryInput {
  providerId: string;
  providerName: string;
  currentLatencyMs?: number | null;
  currentFeePct?: number | null;
  currentSuccessRatePct?: number | null;
  activeLiquidityUgx?: number | null;
  healthStatus?: ProviderHealthStatus | null;
}

export interface ProportionalEvaluationResult {
  timestamp: string;
  providerId: string;
  providerName: string;
  inputTelemetry: ProviderTelemetryInput;
  proportionalScore: number; // 0 to 100
  isHealthy: boolean;
  eligibleForAutoRouting: boolean;
  routingDecision: 'AUTOMATIC_ROUTING' | 'ALTERNATIVE_PROVIDER_PREFERRED' | 'EXCLUDED_CIRCUIT_BREAKER' | 'SUSPENDED_HUMAN_REVIEW';
  confidenceScore: number;
  policyDecision: 'AUTO_APPROVED' | 'REROUTED' | 'BLOCKED_CIRCUIT_OPEN' | 'HUMAN_INTERCEPT_REQUIRED';
  warningMessage?: string;
  auditHash: string;
}

export class ProportionalEngine {
  /**
   * Evaluates instantaneous performance of active financial providers for feedback engine compatibility.
   */
  public evaluatePresent(providers: ProviderPresentState[]): ProportionalScore[] {
    return providers.map((provider) => {
      let score = 100;

      // Latency penalty: -1 point per 100ms over 1000ms baseline
      const latencyPenalty = Math.max(0, (provider.currentLatencyMs - 1000) / 100);
      score -= latencyPenalty;

      // Fee penalty: -10 points per 1% fee
      const feePenalty = provider.currentFeePct * 10;
      score -= feePenalty;

      // API Health Modifier
      let healthBonus = 0;
      if (provider.apiHealthStatus === 'OPTIMAL') {
        healthBonus = 10;
      } else if (provider.apiHealthStatus === 'DEGRADED') {
        score -= 25;
      } else if (provider.apiHealthStatus === 'DOWN') {
        score = 0;
      }

      score = Math.max(0, Math.min(100, score + healthBonus));

      return {
        providerId: provider.providerId,
        rawScore: parseFloat(score.toFixed(2)),
        latencyPenalty: parseFloat(latencyPenalty.toFixed(2)),
        feePenalty: parseFloat(feePenalty.toFixed(2)),
        healthBonus,
        reasoning: `Present state: ${provider.providerName} latency=${provider.currentLatencyMs}ms, fee=${provider.currentFeePct}%, health=${provider.apiHealthStatus}`,
      };
    });
  }

  /**
   * Day 1 — Stage 1: Evaluates provider with telemetry integrity, liquidity checks, circuit breaker, and audit hashes.
   */
  public evaluateProvider(input: ProviderTelemetryInput): ProportionalEvaluationResult {
    const timestamp = new Date().toISOString();

    // Test 5 Check: Missing or Invalid Telemetry
    if (
      !input ||
      input.healthStatus === 'UNKNOWN' ||
      input.healthStatus === null ||
      input.healthStatus === undefined ||
      input.currentLatencyMs === null ||
      input.currentLatencyMs === undefined ||
      input.currentSuccessRatePct === null ||
      input.currentSuccessRatePct === undefined
    ) {
      const auditHash = this.generateAuditHash(timestamp, input?.providerId || 'UNKNOWN', 0, 'SUSPENDED_HUMAN_REVIEW');
      return {
        timestamp,
        providerId: input?.providerId || 'UNKNOWN',
        providerName: input?.providerName || 'Unknown Provider',
        inputTelemetry: input,
        proportionalScore: 0,
        isHealthy: false,
        eligibleForAutoRouting: false,
        routingDecision: 'SUSPENDED_HUMAN_REVIEW',
        confidenceScore: 0.0,
        policyDecision: 'HUMAN_INTERCEPT_REQUIRED',
        warningMessage: 'Telemetry missing or invalid. Automatic routing suspended for human review or fallback policy.',
        auditHash,
      };
    }

    // Test 4 Check: Provider Down
    if (input.healthStatus === 'DOWN') {
      const auditHash = this.generateAuditHash(timestamp, input.providerId, 0, 'EXCLUDED_CIRCUIT_BREAKER');
      return {
        timestamp,
        providerId: input.providerId,
        providerName: input.providerName,
        inputTelemetry: input,
        proportionalScore: 0,
        isHealthy: false,
        eligibleForAutoRouting: false,
        routingDecision: 'EXCLUDED_CIRCUIT_BREAKER',
        confidenceScore: 0.0,
        policyDecision: 'BLOCKED_CIRCUIT_OPEN',
        warningMessage: 'Provider status is DOWN. Circuit breaker activated; provider excluded from routing.',
        auditHash,
      };
    }

    let score = 100.0;
    const warnings: string[] = [];

    // Latency Deduction: Baseline is 200ms. -10 points per 200ms over 200ms.
    const latency = input.currentLatencyMs;
    if (latency > 200) {
      const penalty = ((latency - 200) / 200) * 10;
      score -= penalty;
      if (latency >= 500) {
        warnings.push(`High latency observed (${latency} ms). MAFE considering alternative providers.`);
      }
    }

    // Success Rate Modifier
    const successRate = input.currentSuccessRatePct;
    if (successRate < 99.0) {
      score -= (99.0 - successRate) * 5;
    }

    // Fee Deduction: -5 points per 1% fee
    const fee = input.currentFeePct || 0;
    score -= fee * 5;

    // Liquidity Check (Test 3)
    const liquidity = input.activeLiquidityUgx || 0;
    const minLiquidityThreshold = 1000000; // 1,000,000 UGX
    if (liquidity < minLiquidityThreshold) {
      score -= 30.0;
      warnings.push(`Active liquidity nearly exhausted (${liquidity.toLocaleString()} UGX). Confidence reduced.`);
    }

    // Health Status Modifier
    if (input.healthStatus === 'DEGRADED') {
      score -= 20.0;
      warnings.push('Provider health is DEGRADED.');
    }

    const proportionalScore = Math.max(0, Math.min(100, parseFloat(score.toFixed(2))));
    const confidenceScore = parseFloat((proportionalScore * (successRate / 100)).toFixed(1));

    let routingDecision: ProportionalEvaluationResult['routingDecision'];
    let policyDecision: ProportionalEvaluationResult['policyDecision'];
    let eligibleForAutoRouting = false;
    let isHealthy = false;

    if (proportionalScore >= 85.0 && confidenceScore >= 90.0) {
      routingDecision = 'AUTOMATIC_ROUTING';
      policyDecision = 'AUTO_APPROVED';
      eligibleForAutoRouting = true;
      isHealthy = true;
    } else if (proportionalScore >= 50.0) {
      routingDecision = 'ALTERNATIVE_PROVIDER_PREFERRED';
      policyDecision = 'REROUTED';
      isHealthy = false;
    } else {
      routingDecision = 'SUSPENDED_HUMAN_REVIEW';
      policyDecision = 'HUMAN_INTERCEPT_REQUIRED';
      isHealthy = false;
    }

    const auditHash = this.generateAuditHash(timestamp, input.providerId, proportionalScore, routingDecision);

    return {
      timestamp,
      providerId: input.providerId,
      providerName: input.providerName,
      inputTelemetry: input,
      proportionalScore,
      isHealthy,
      eligibleForAutoRouting,
      routingDecision,
      confidenceScore,
      policyDecision,
      warningMessage: warnings.length > 0 ? warnings.join(' | ') : undefined,
      auditHash,
    };
  }

  private generateAuditHash(timestamp: string, providerId: string, score: number, decision: string): string {
    const payload = `${timestamp}:${providerId}:${score}:${decision}:FIPS_140_3`;
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    const suffix = Math.abs((hash * 31) | 0).toString(16).padStart(8, '0').toUpperCase();
    return `0x${hex}${suffix}A99F2041`.substring(0, 34);
  }
}
