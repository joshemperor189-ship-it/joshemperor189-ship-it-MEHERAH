"""
MEHERAH Day 1 — Stage 3: Derivative Engine Verification Engine (Python)
Evaluates latency acceleration, error rate velocity, transaction surge prediction, PID intelligence fusion,
and generates certification evidence reports.
"""

import hashlib
import time
from typing import Dict, Any, List, Optional
from dataclasses import dataclass

@dataclass
class LatencyAccelerationResult:
    provider_id: str
    initial_latency_ms: float
    final_latency_ms: float
    acceleration_ms: float
    trend: str  # STABLE, DEGRADED_WARNING, IMMINENT_FAILURE
    failure_probability_pct: float
    action: str

@dataclass
class ErrorVelocityResult:
    provider_id: str
    initial_error_pct: float
    final_error_pct: float
    error_velocity_pct: float
    is_exponential: bool
    velocity_status: str  # NORMAL, ELEVATED, CRITICAL
    action: str

@dataclass
class TransactionSurgeResult:
    provider_id: str
    current_tpm: int
    projected_tpm: int
    capacity_tpm: int
    surge_ratio: float
    capacity_stress: bool
    forecast: str
    recommendation: str

@dataclass
class PIDFusionResult:
    provider_id: str
    proportional_score: float
    integral_score: float
    derivative_score: float
    fused_confidence_score: float
    current_status: str
    historical_status: str
    forecast_status: str
    final_action: str
    reasoning: str
    audit_hash: str

class DerivativeEngine:
    def evaluate_latency_acceleration(self, provider_id: str, latencies: List[float]) -> LatencyAccelerationResult:
        if len(latencies) < 2:
            return LatencyAccelerationResult(provider_id, latencies[0], latencies[0], 0.0, "STABLE", 0.0, "MONITOR")

        initial_lat = latencies[0]
        final_lat = latencies[-1]
        accel = final_lat - initial_lat

        trend = "STABLE"
        fail_prob = 10.0
        action = "MAINTAIN_NORMAL_ROUTING"

        if accel >= 400.0 or final_lat >= 500.0:
            trend = "IMMINENT_FAILURE"
            fail_prob = 92.5
            action = "REDUCE_ROUTING_EXPOSURE_AND_ACTIVATE_ALTERNATIVE_RAIL"
        elif accel >= 150.0:
            trend = "DEGRADED_WARNING"
            fail_prob = 45.0
            action = "PREVENTIVE_TRAFFIC_THROTTLING"

        return LatencyAccelerationResult(
            provider_id=provider_id,
            initial_latency_ms=initial_lat,
            final_latency_ms=final_lat,
            acceleration_ms=accel,
            trend=trend,
            failure_probability_pct=fail_prob,
            action=action
        )

    def evaluate_error_velocity(self, provider_id: str, errors: List[float]) -> ErrorVelocityResult:
        if len(errors) < 2:
            return ErrorVelocityResult(provider_id, errors[0], errors[0], 0.0, False, "NORMAL", "MONITOR")

        initial_err = errors[0]
        final_err = errors[-1]
        velocity = final_err - initial_err

        is_exp = True
        for i in range(1, len(errors) - 1):
            d1 = errors[i] - errors[i - 1]
            d2 = errors[i + 1] - errors[i]
            if d2 <= d1:
                is_exp = False
                break

        status = "NORMAL"
        action = "MONITOR"

        if final_err >= 8.0 or velocity >= 7.0:
            status = "CRITICAL"
            action = "PREVENTIVE_TRAFFIC_SHIFT"
        elif final_err >= 3.0 or velocity >= 2.0:
            status = "ELEVATED"
            action = "STEP_UP_MONITORING_AND_CAP_LOAD"

        return ErrorVelocityResult(
            provider_id=provider_id,
            initial_error_pct=initial_err,
            final_error_pct=final_err,
            error_velocity_pct=round(velocity, 2),
            is_exponential=is_exp,
            velocity_status=status,
            action=action
        )

    def evaluate_transaction_surge(
        self,
        provider_id: str,
        current_tpm: int,
        avg_tpm: int,
        projected_tpm: int,
        capacity_tpm: int
    ) -> TransactionSurgeResult:
        surge_ratio = round(projected_tpm / avg_tpm, 2)
        capacity_stress = projected_tpm >= (capacity_tpm * 0.85)

        forecast = "NORMAL_LOAD"
        recommendation = "MAINTAIN_STANDARD_DISTRIBUTION"

        if capacity_stress:
            forecast = "CAPACITY_STRESS_INCOMING"
            recommendation = "INCREASE_LIQUIDITY_PREPARATION_AND_BALANCE_ROUTING_DISTRIBUTION"
        elif surge_ratio > 1.5:
            forecast = "ELEVATED_DEMAND_EXPECTED"
            recommendation = "PRE_ALLOCATE_BUFFER_CAPACITY"

        return TransactionSurgeResult(
            provider_id=provider_id,
            current_tpm=current_tpm,
            projected_tpm=projected_tpm,
            capacity_tpm=capacity_tpm,
            surge_ratio=surge_ratio,
            capacity_stress=capacity_stress,
            forecast=forecast,
            recommendation=recommendation
        )

    def evaluate_pid_fusion(
        self,
        provider_id: str,
        proportional_score: float,
        integral_score: float,
        derivative_risk_pct: float
    ) -> PIDFusionResult:
        derivative_stability = max(0.0, 100.0 - derivative_risk_pct)
        fused = round((proportional_score * 0.4) + (integral_score * 0.3) + (derivative_stability * 0.3), 2)

        cur_stat = "Healthy" if proportional_score >= 80.0 else "Degraded" if proportional_score >= 50.0 else "Down"
        hist_stat = "Trusted" if integral_score >= 90.0 else "Moderate" if integral_score >= 60.0 else "Untrusted"
        
        forecast_stat = "Stable"
        if derivative_risk_pct >= 60.0:
            forecast_stat = "Imminent Failure"
        elif derivative_risk_pct >= 25.0:
            forecast_stat = "Risk Increasing"

        final_act = "FULL_AUTO_ROUTING"
        if forecast_stat == "Imminent Failure" or fused < 50.0:
            final_act = "ALTERNATIVE_PROVIDER_PREFERRED"
        elif forecast_stat == "Risk Increasing" or (proportional_score >= 80.0 and derivative_risk_pct >= 40.0):
            final_act = "CONTROLLED_TRAFFIC_REDUCTION"

        audit_hash = "0x" + hashlib.sha256(f"{provider_id}:{fused}:{final_act}".encode()).hexdigest()[:32].upper()

        return PIDFusionResult(
            provider_id=provider_id,
            proportional_score=proportional_score,
            integral_score=integral_score,
            derivative_score=derivative_stability,
            fused_confidence_score=fused,
            current_status=cur_stat,
            historical_status=hist_stat,
            forecast_status=forecast_stat,
            final_action=final_act,
            reasoning=f"PID Fusion: Present={cur_stat} ({proportional_score}), History={hist_stat} ({integral_score}), Forecast={forecast_stat} ({derivative_stability}). Action: {final_act}",
            audit_hash=audit_hash
        )

def run_stage3_derivative_verification() -> Dict[str, Any]:
    engine = DerivativeEngine()

    # Test 1: Latency Acceleration
    t1_res = engine.evaluate_latency_acceleration("MTN_UG_01", [100.0, 180.0, 320.0, 600.0])
    t1_pass = t1_res.acceleration_ms == 500.0 and t1_res.trend == "IMMINENT_FAILURE" and t1_res.failure_probability_pct >= 90.0

    # Test 2: Error Velocity
    t2_res = engine.evaluate_error_velocity("AIRTEL_UG_01", [0.5, 1.5, 4.0, 8.5])
    t2_pass = t2_res.error_velocity_pct == 8.0 and t2_res.is_exponential and t2_res.velocity_status == "CRITICAL"

    # Test 3: Transaction Surge
    t3_res = engine.evaluate_transaction_surge("STANBIC_UG_01", 25000, 10000, 45000, 50000)
    t3_pass = t3_res.surge_ratio == 4.5 and t3_res.capacity_stress and t3_res.forecast == "CAPACITY_STRESS_INCOMING"

    # Test 4: PID Intelligence Fusion
    t4_res = engine.evaluate_pid_fusion("CENTENARY_UG_01", 80.0, 98.0, 45.0)
    t4_pass = t4_res.current_status == "Healthy" and t4_res.historical_status == "Trusted" and t4_res.forecast_status == "Risk Increasing" and t4_res.final_action == "CONTROLLED_TRAFFIC_REDUCTION"

    return {
        "test1_passed": t1_pass,
        "test2_passed": t2_pass,
        "test3_passed": t3_pass,
        "test4_passed": t4_pass,
        "all_passed": t1_pass and t2_pass and t3_pass and t4_pass,
        "t1_result": t1_res,
        "t2_result": t2_res,
        "t3_result": t3_res,
        "t4_result": t4_res
    }

if __name__ == "__main__":
    report = run_stage3_derivative_verification()
    print("=== MEHERAH DAY 1 STAGE 3 DERIVATIVE ENGINE VERIFICATION ===")
    print(f"Test 1 Latency Acceleration Prediction: {'PASSED' if report['test1_passed'] else 'FAILED'}")
    print(f"Test 2 Error Velocity Detection: {'PASSED' if report['test2_passed'] else 'FAILED'}")
    print(f"Test 3 Transaction Surge Prediction: {'PASSED' if report['test3_passed'] else 'FAILED'}")
    print(f"Test 4 PID Intelligence Fusion: {'PASSED' if report['test4_passed'] else 'FAILED'}")
    print(f"OVERALL STAGE 3 STATUS: {'VERIFIED & AUDITED' if report['all_passed'] else 'FAILED'}")
