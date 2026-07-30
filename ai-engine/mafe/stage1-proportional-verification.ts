/**
 * Day 1 — Stage 1: Proportional Engine Verification Test Suite
 * Executes the 5 institutional test scenarios specified by Bank of Uganda requirements:
 * Test 1: Healthy Provider (120ms latency, 99.8% success, 0.8% fee, High liquidity, UP)
 * Test 2: High Latency (850ms latency -> Warning generated & reroute considered)
 * Test 3: Low Liquidity (Liquidity nearly exhausted -> Score & confidence reduced)
 * Test 4: Provider Down (Status DOWN -> Score 0, Circuit breaker activated, Excluded)
 * Test 5: Missing Telemetry (No data -> UNKNOWN status, Auto-routing suspended, HITL fallback)
 */

import { ProportionalEngine, ProviderTelemetryInput, ProportionalEvaluationResult } from './proportional';

export interface Stage1VerificationSummary {
  stageName: string;
  totalTests: number;
  passedTests: number;
  scorePct: number;
  allCriteriaMet: boolean;
  results: Record<string, ProportionalEvaluationResult>;
}

export class Stage1ProportionalVerifier {
  private engine: ProportionalEngine;

  constructor() {
    this.engine = new ProportionalEngine();
  }

  public runAllStage1Tests(): Stage1VerificationSummary {
    const results: Record<string, ProportionalEvaluationResult> = {};

    // Test 1: Healthy Provider
    const test1Input: ProviderTelemetryInput = {
      providerId: 'MTN_UG_01',
      providerName: 'MTN Mobile Money Uganda',
      currentLatencyMs: 120,
      currentSuccessRatePct: 99.8,
      currentFeePct: 0.8,
      activeLiquidityUgx: 85000000,
      healthStatus: 'UP',
    };
    results['Test1_HealthyProvider'] = this.engine.evaluateProvider(test1Input);

    // Test 2: High Latency
    const test2Input: ProviderTelemetryInput = {
      providerId: 'MTN_UG_01',
      providerName: 'MTN Mobile Money Uganda',
      currentLatencyMs: 850,
      currentSuccessRatePct: 99.7,
      currentFeePct: 0.8,
      activeLiquidityUgx: 85000000,
      healthStatus: 'UP',
    };
    results['Test2_HighLatency'] = this.engine.evaluateProvider(test2Input);

    // Test 3: Low Liquidity
    const test3Input: ProviderTelemetryInput = {
      providerId: 'AIRTEL_UG_01',
      providerName: 'Airtel Money Uganda',
      currentLatencyMs: 110,
      currentSuccessRatePct: 99.5,
      currentFeePct: 0.7,
      activeLiquidityUgx: 450000, // < 1M UGX threshold
      healthStatus: 'UP',
    };
    results['Test3_LowLiquidity'] = this.engine.evaluateProvider(test3Input);

    // Test 4: Provider Down
    const test4Input: ProviderTelemetryInput = {
      providerId: 'STANBIC_UG_01',
      providerName: 'Stanbic Bank Direct API',
      currentLatencyMs: 0,
      currentSuccessRatePct: 0,
      currentFeePct: 0.5,
      activeLiquidityUgx: 50000000,
      healthStatus: 'DOWN',
    };
    results['Test4_ProviderDown'] = this.engine.evaluateProvider(test4Input);

    // Test 5: Missing Telemetry
    const test5Input: ProviderTelemetryInput = {
      providerId: 'UNKNOWN_GATEWAY',
      providerName: 'Unverified Regional Gateway',
      currentLatencyMs: null,
      currentSuccessRatePct: null,
      currentFeePct: null,
      activeLiquidityUgx: null,
      healthStatus: 'UNKNOWN',
    };
    results['Test5_MissingTelemetry'] = this.engine.evaluateProvider(test5Input);

    // Verification Criteria Assertions
    const t1 = results['Test1_HealthyProvider'];
    const t2 = results['Test2_HighLatency'];
    const t3 = results['Test3_LowLiquidity'];
    const t4 = results['Test4_ProviderDown'];
    const t5 = results['Test5_MissingTelemetry'];

    const criteria = [
      t1.proportionalScore >= 85 && t1.eligibleForAutoRouting && t1.routingDecision === 'AUTOMATIC_ROUTING',
      t2.proportionalScore < t1.proportionalScore && t2.warningMessage?.includes('High latency') && t2.routingDecision === 'ALTERNATIVE_PROVIDER_PREFERRED',
      t3.warningMessage?.includes('liquidity') && t3.proportionalScore < 85,
      t4.proportionalScore === 0 && t4.routingDecision === 'EXCLUDED_CIRCUIT_BREAKER' && t4.policyDecision === 'BLOCKED_CIRCUIT_OPEN',
      t5.proportionalScore === 0 && t5.routingDecision === 'SUSPENDED_HUMAN_REVIEW' && t5.policyDecision === 'HUMAN_INTERCEPT_REQUIRED',
    ];

    const passedCount = criteria.filter(Boolean).length;
    const allCriteriaMet = passedCount === 5;

    return {
      stageName: 'Day 1 — Stage 1: Proportional Engine Verification',
      totalTests: 5,
      passedTests: passedCount,
      scorePct: (passedCount / 5) * 100,
      allCriteriaMet,
      results,
    };
  }
}
