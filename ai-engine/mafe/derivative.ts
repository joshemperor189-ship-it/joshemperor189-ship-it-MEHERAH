/**
 * MAFE - Derivative Engine (Stage 3: Predictive Intelligence & Trend Acceleration)
 * Analyzes the rate of change (deltas), latency acceleration, error rate velocity, and transaction load surges
 * to predict payment infrastructure failures before they occur.
 */

export interface ProviderTrendDelta {
  providerId: string;
  latencyChangeRateMsPerSec: number; // Positive = worsening latency
  errorRateSpikeDeltaPct: number;    // Positive = spiking errors
  liquidityDropRateUgxPerMin: number; // Positive = rapid depletion
  trafficSurgeRatio: number;          // Current load / Average capacity
  timeSeriesLatenciesMs?: number[];
  timeSeriesErrorRatesPct?: number[];
  currentTpm?: number;
  avgTpm?: number;
  projectedTpm?: number;
  capacityTpm?: number;
}

export interface DerivativeScore {
  providerId: string;
  predictedStabilityScore: number; // 0 to 100
  failureRiskPct: number;
  rateOfChangePenalty: number;
  latencyAccelerationMs: number;
  errorVelocityPct: number;
  surgeRatio: number;
  predictedTrend: 'IMPROVING' | 'STABLE' | 'DEGRADED_WARNING' | 'IMMINENT_FAILURE';
  actionRecommendation: string;
  reasoning: string;
  auditHash: string;
}

export interface LatencyAccelerationResult {
  providerId: string;
  initialLatencyMs: number;
  finalLatencyMs: number;
  accelerationMs: number;
  trend: 'STABLE' | 'DEGRADED_WARNING' | 'IMMINENT_FAILURE';
  failureProbabilityPct: number;
  action: string;
}

export interface ErrorVelocityResult {
  providerId: string;
  initialErrorPct: number;
  finalErrorPct: number;
  errorVelocityPct: number;
  isExponential: boolean;
  velocityStatus: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
  action: string;
}

export interface TransactionSurgeResult {
  providerId: string;
  currentTpm: number;
  projectedTpm: number;
  capacityTpm: number;
  surgeRatio: number;
  capacityStress: boolean;
  forecast: string;
  recommendation: string;
}

export interface PIDFusionResult {
  providerId: string;
  proportionalScore: number;
  integralScore: number;
  derivativeScore: number;
  fusedConfidenceScore: number;
  currentStatus: string;
  historicalStatus: string;
  forecastStatus: string;
  finalAction: 'FULL_AUTO_ROUTING' | 'CONTROLLED_TRAFFIC_REDUCTION' | 'ALTERNATIVE_PROVIDER_PREFERRED' | 'HUMAN_INTERCEPT_REQUIRED';
  reasoning: string;
  auditHash: string;
}

export class DerivativeEngine {
  /**
   * Evaluates rate of change (deltas) to predict near-future provider failure or instability.
   */
  public evaluatePrediction(deltas: ProviderTrendDelta[]): DerivativeScore[] {
    return deltas.map((delta) => {
      let failureRiskPct = 0;

      // Latency acceleration risk
      const accel = delta.timeSeriesLatenciesMs && delta.timeSeriesLatenciesMs.length >= 2
        ? delta.timeSeriesLatenciesMs[delta.timeSeriesLatenciesMs.length - 1] - delta.timeSeriesLatenciesMs[0]
        : delta.latencyChangeRateMsPerSec;

      if (accel > 300 || delta.latencyChangeRateMsPerSec > 50) {
        failureRiskPct += 45;
      } else if (accel > 100 || delta.latencyChangeRateMsPerSec > 10) {
        failureRiskPct += 20;
      }

      // Error rate velocity risk
      const errorVel = delta.timeSeriesErrorRatesPct && delta.timeSeriesErrorRatesPct.length >= 2
        ? delta.timeSeriesErrorRatesPct[delta.timeSeriesErrorRatesPct.length - 1] - delta.timeSeriesErrorRatesPct[0]
        : delta.errorRateSpikeDeltaPct;

      if (errorVel > 5.0 || delta.errorRateSpikeDeltaPct > 5.0) {
        failureRiskPct += 45;
      } else if (errorVel > 1.0 || delta.errorRateSpikeDeltaPct > 1.0) {
        failureRiskPct += 20;
      }

      // Traffic surge congestion risk
      const surgeRatio = delta.trafficSurgeRatio || (delta.projectedTpm && delta.avgTpm ? delta.projectedTpm / delta.avgTpm : 1.0);
      if (surgeRatio > 2.0) {
        failureRiskPct += 25;
      } else if (surgeRatio > 1.5) {
        failureRiskPct += 10;
      }

      failureRiskPct = Math.min(100, Math.max(0, failureRiskPct));
      const predictedStabilityScore = Math.max(0, 100 - failureRiskPct);

      let predictedTrend: DerivativeScore['predictedTrend'] = 'STABLE';
      let actionRecommendation = 'MAINTAIN_CURRENT_ROUTING';

      if (failureRiskPct >= 60) {
        predictedTrend = 'IMMINENT_FAILURE';
        actionRecommendation = 'PREVENTIVE_TRAFFIC_SHIFT_AND_ALTERNATIVE_RAIL_ACTIVATION';
      } else if (failureRiskPct >= 25) {
        predictedTrend = 'DEGRADED_WARNING';
        actionRecommendation = 'REDUCE_ROUTING_EXPOSURE';
      } else if (delta.latencyChangeRateMsPerSec < 0 && delta.errorRateSpikeDeltaPct <= 0) {
        predictedTrend = 'IMPROVING';
        actionRecommendation = 'GRADUAL_TRAFFIC_RESTORATION';
      }

      const auditHash = this.generateAuditHash(delta.providerId, predictedStabilityScore, predictedTrend);

      return {
        providerId: delta.providerId,
        predictedStabilityScore: parseFloat(predictedStabilityScore.toFixed(2)),
        failureRiskPct: parseFloat(failureRiskPct.toFixed(2)),
        rateOfChangePenalty: parseFloat(failureRiskPct.toFixed(2)),
        latencyAccelerationMs: parseFloat(accel.toFixed(2)),
        errorVelocityPct: parseFloat(errorVel.toFixed(2)),
        surgeRatio: parseFloat(surgeRatio.toFixed(2)),
        predictedTrend,
        actionRecommendation,
        reasoning: `Derivative prediction: Trend is ${predictedTrend}, failure risk ${failureRiskPct.toFixed(1)}% (acceleration: +${accel.toFixed(0)}ms, error velocity: +${errorVel.toFixed(1)}%)`,
        auditHash,
      };
    });
  }

  /**
   * Test 1 — Latency Acceleration Prediction
   */
  public evaluateLatencyAcceleration(providerId: string, timeSeriesLatenciesMs: number[]): LatencyAccelerationResult {
    if (timeSeriesLatenciesMs.length < 2) {
      return {
        providerId,
        initialLatencyMs: timeSeriesLatenciesMs[0] || 0,
        finalLatencyMs: timeSeriesLatenciesMs[0] || 0,
        accelerationMs: 0,
        trend: 'STABLE',
        failureProbabilityPct: 0,
        action: 'MAINTAIN_MONITORING',
      };
    }

    const initialLatencyMs = timeSeriesLatenciesMs[0];
    const finalLatencyMs = timeSeriesLatenciesMs[timeSeriesLatenciesMs.length - 1];
    const accelerationMs = finalLatencyMs - initialLatencyMs;

    let trend: LatencyAccelerationResult['trend'] = 'STABLE';
    let failureProbabilityPct = 10;
    let action = 'MAINTAIN_NORMAL_ROUTING';

    if (accelerationMs >= 400 || finalLatencyMs >= 500) {
      trend = 'IMMINENT_FAILURE';
      failureProbabilityPct = 92.5;
      action = 'REDUCE_ROUTING_EXPOSURE_AND_ACTIVATE_ALTERNATIVE_RAIL';
    } else if (accelerationMs >= 150) {
      trend = 'DEGRADED_WARNING';
      failureProbabilityPct = 45.0;
      action = 'PREVENTIVE_TRAFFIC_THROTTLING';
    }

    return {
      providerId,
      initialLatencyMs,
      finalLatencyMs,
      accelerationMs,
      trend,
      failureProbabilityPct,
      action,
    };
  }

  /**
   * Test 2 — Error Rate Velocity Detection
   */
  public evaluateErrorVelocity(providerId: string, timeSeriesErrorRatesPct: number[]): ErrorVelocityResult {
    if (timeSeriesErrorRatesPct.length < 2) {
      return {
        providerId,
        initialErrorPct: timeSeriesErrorRatesPct[0] || 0,
        finalErrorPct: timeSeriesErrorRatesPct[0] || 0,
        errorVelocityPct: 0,
        isExponential: false,
        velocityStatus: 'NORMAL',
        action: 'MONITOR',
      };
    }

    const initialErrorPct = timeSeriesErrorRatesPct[0];
    const finalErrorPct = timeSeriesErrorRatesPct[timeSeriesErrorRatesPct.length - 1];
    const errorVelocityPct = finalErrorPct - initialErrorPct;

    // Check if error rate increases exponentially (e.g. deltas increasing)
    let isExponential = true;
    for (let i = 1; i < timeSeriesErrorRatesPct.length - 1; i++) {
      const delta1 = timeSeriesErrorRatesPct[i] - timeSeriesErrorRatesPct[i - 1];
      const delta2 = timeSeriesErrorRatesPct[i + 1] - timeSeriesErrorRatesPct[i];
      if (delta2 <= delta1) {
        isExponential = false;
        break;
      }
    }

    let velocityStatus: ErrorVelocityResult['velocityStatus'] = 'NORMAL';
    let action = 'MAINTAIN_MONITORING';

    if (finalErrorPct >= 8.0 || errorVelocityPct >= 7.0) {
      velocityStatus = 'CRITICAL';
      action = 'PREVENTIVE_TRAFFIC_SHIFT';
    } else if (finalErrorPct >= 3.0 || errorVelocityPct >= 2.0) {
      velocityStatus = 'ELEVATED';
      action = 'STEP_UP_MONITORING_AND_CAP_LOAD';
    }

    return {
      providerId,
      initialErrorPct,
      finalErrorPct,
      errorVelocityPct: parseFloat(errorVelocityPct.toFixed(2)),
      isExponential,
      velocityStatus,
      action,
    };
  }

  /**
   * Test 3 — Transaction Surge Prediction
   */
  public evaluateTransactionSurge(
    providerId: string,
    currentTpm: number,
    avgTpm: number,
    projectedTpm: number,
    capacityTpm: number
  ): TransactionSurgeResult {
    const surgeRatio = parseFloat((projectedTpm / avgTpm).toFixed(2));
    const capacityStress = projectedTpm >= capacityTpm * 0.85;

    let forecast = 'NORMAL_LOAD';
    let recommendation = 'MAINTAIN_STANDARD_DISTRIBUTION';

    if (capacityStress) {
      forecast = 'CAPACITY_STRESS_INCOMING';
      recommendation = 'INCREASE_LIQUIDITY_PREPARATION_AND_BALANCE_ROUTING_DISTRIBUTION';
    } else if (surgeRatio > 1.5) {
      forecast = 'ELEVATED_DEMAND_EXPECTED';
      recommendation = 'PRE_ALLOCATE_BUFFER_CAPACITY';
    }

    return {
      providerId,
      currentTpm,
      projectedTpm,
      capacityTpm,
      surgeRatio,
      capacityStress,
      forecast,
      recommendation,
    };
  }

  /**
   * Test 4 — PID Intelligence Fusion
   */
  public evaluatePIDFusion(
    providerId: string,
    proportionalScore: number, // Present condition (e.g., 85/100, latency 350ms)
    integralScore: number,    // Historical memory (e.g., 99.8% success, 98/100)
    derivativeScore: DerivativeScore // Future trend (e.g., rapidly worsening)
  ): PIDFusionResult {
    // Weighted Fusion: Present 40%, History 30%, Future Trend 30%
    const fusedConfidenceScore = parseFloat(
      (proportionalScore * 0.4 + integralScore * 0.3 + derivativeScore.predictedStabilityScore * 0.3).toFixed(2)
    );

    const currentStatus = proportionalScore >= 80 ? 'Healthy' : proportionalScore >= 50 ? 'Degraded' : 'Down';
    const historicalStatus = integralScore >= 90 ? 'Trusted' : integralScore >= 60 ? 'Moderate' : 'Untrusted';
    const forecastStatus = derivativeScore.predictedTrend === 'STABLE' || derivativeScore.predictedTrend === 'IMPROVING'
      ? 'Stable'
      : derivativeScore.predictedTrend === 'DEGRADED_WARNING'
      ? 'Risk Increasing'
      : 'Imminent Failure';

    let finalAction: PIDFusionResult['finalAction'] = 'FULL_AUTO_ROUTING';

    if (derivativeScore.predictedTrend === 'IMMINENT_FAILURE' || fusedConfidenceScore < 50) {
      finalAction = 'ALTERNATIVE_PROVIDER_PREFERRED';
    } else if (derivativeScore.predictedTrend === 'DEGRADED_WARNING' || (proportionalScore >= 80 && derivativeScore.failureRiskPct >= 40)) {
      finalAction = 'CONTROLLED_TRAFFIC_REDUCTION';
    }

    const reasoning = `PID Fusion: Present=${currentStatus} (${proportionalScore}), History=${historicalStatus} (${integralScore}), Forecast=${forecastStatus} (${derivativeScore.predictedStabilityScore}). Action: ${finalAction}`;

    const auditHash = this.generateAuditHash(providerId, fusedConfidenceScore, finalAction);

    return {
      providerId,
      proportionalScore,
      integralScore,
      derivativeScore: derivativeScore.predictedStabilityScore,
      fusedConfidenceScore,
      currentStatus,
      historicalStatus,
      forecastStatus,
      finalAction,
      reasoning,
      auditHash,
    };
  }

  private generateAuditHash(providerId: string, score: number, identifier: string): string {
    const payload = `${providerId}:${score}:${identifier}:MAFE_DERIVATIVE_V3`;
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      hash = (hash << 5) - hash + payload.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    return `0x${hex}C88D5022`.substring(0, 34);
  }
}
