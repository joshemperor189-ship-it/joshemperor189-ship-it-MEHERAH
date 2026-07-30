"""
MEHERAH Day 1 — Stage 1: Proportional Engine Verification Engine
Evaluates real-time health, latency, fees, success rate, and active liquidity.
Executes 5 core institutional test scenarios for Bank of Uganda verification:
1. Test 1 — Healthy Provider (High score, auto routing)
2. Test 2 — High Latency (Score decreases, warning generated, alternative providers evaluated)
3. Test 3 — Low Liquidity (Confidence reduced, prefers alternate rails)
4. Test 4 — Provider Down (Score = 0, Circuit breaker activated, Excluded)
5. Test 5 — Missing Telemetry (No autonomous routing, Human review fallback)
"""

import hashlib
import time
from typing import Dict, Any, Optional
from dataclasses import dataclass

@dataclass
class ProviderTelemetryInput:
    provider_id: str
    provider_name: str
    current_latency_ms: Optional[float]
    current_success_rate_pct: Optional[float]
    current_fee_pct: Optional[float]
    active_liquidity_ugx: Optional[float]
    health_status: Optional[str]  # UP, DEGRADED, DOWN, UNKNOWN

@dataclass
class ProportionalEvaluationResult:
    timestamp: float
    provider_id: str
    provider_name: str
    input_telemetry: Dict[str, Any]
    proportional_score: float
    is_healthy: bool
    eligible_for_auto_routing: bool
    routing_decision: str
    confidence_score: float
    policy_decision: str
    warning_message: str
    audit_hash: str

class ProportionalEngine:
    def evaluate_provider(self, telemetry: ProviderTelemetryInput) -> ProportionalEvaluationResult:
        now = time.time()
        
        # Test 5: Missing Telemetry Check
        if (
            telemetry.health_status in [None, "UNKNOWN"] or
            telemetry.current_latency_ms is None or
            telemetry.current_success_rate_pct is None
        ):
            audit_hash = self._generate_hash(now, telemetry.provider_id, 0.0, "SUSPENDED_HUMAN_REVIEW")
            return ProportionalEvaluationResult(
                timestamp=now,
                provider_id=telemetry.provider_id,
                provider_name=telemetry.provider_name,
                input_telemetry=telemetry.__dict__,
                proportional_score=0.0,
                is_healthy=False,
                eligible_for_auto_routing=False,
                routing_decision="SUSPENDED_HUMAN_REVIEW",
                confidence_score=0.0,
                policy_decision="HUMAN_INTERCEPT_REQUIRED",
                warning_message="Telemetry missing or invalid. Automatic routing suspended for human review or fallback policy.",
                audit_hash=audit_hash
            )

        # Test 4: Provider Down Check
        if telemetry.health_status == "DOWN":
            audit_hash = self._generate_hash(now, telemetry.provider_id, 0.0, "EXCLUDED_CIRCUIT_BREAKER")
            return ProportionalEvaluationResult(
                timestamp=now,
                provider_id=telemetry.provider_id,
                provider_name=telemetry.provider_name,
                input_telemetry=telemetry.__dict__,
                proportional_score=0.0,
                is_healthy=False,
                eligible_for_auto_routing=False,
                routing_decision="EXCLUDED_CIRCUIT_BREAKER",
                confidence_score=0.0,
                policy_decision="BLOCKED_CIRCUIT_OPEN",
                warning_message="Provider status is DOWN. Circuit breaker activated; provider excluded from routing.",
                audit_hash=audit_hash
            )

        score = 100.0
        warnings = []

        # Latency Penalty (Baseline 200ms)
        latency = telemetry.current_latency_ms
        if latency > 200:
            penalty = ((latency - 200) / 200) * 10
            score -= penalty
            if latency >= 500:
                warnings.append(f"High latency observed ({latency}ms). MAFE considering alternative providers.")

        # Success Rate Penalty
        success_rate = telemetry.current_success_rate_pct
        if success_rate < 99.0:
            score -= (99.0 - success_rate) * 5

        # Fee Deduction
        fee = telemetry.current_fee_pct or 0.0
        score -= fee * 5

        # Test 3: Liquidity Check (< 1M UGX)
        liquidity = telemetry.active_liquidity_ugx or 0.0
        if liquidity < 1000000:
            score -= 30.0
            warnings.append(f"Active liquidity nearly exhausted ({liquidity:,.0f} UGX). Confidence reduced.")

        # Health Degraded Penalty
        if telemetry.health_status == "DEGRADED":
            score -= 20.0
            warnings.append("Provider health is DEGRADED.")

        proportional_score = round(max(0.0, min(100.0, score)), 2)
        confidence_score = round(proportional_score * (success_rate / 100.0), 1)

        if proportional_score >= 85.0 and confidence_score >= 90.0:
            routing_decision = "AUTOMATIC_ROUTING"
            policy_decision = "AUTO_APPROVED"
            eligible_for_auto = True
            is_healthy = True
        elif proportional_score >= 50.0:
            routing_decision = "ALTERNATIVE_PROVIDER_PREFERRED"
            policy_decision = "REROUTED"
            eligible_for_auto = False
            is_healthy = False
        else:
            routing_decision = "SUSPENDED_HUMAN_REVIEW"
            policy_decision = "HUMAN_INTERCEPT_REQUIRED"
            eligible_for_auto = False
            is_healthy = False

        audit_hash = self._generate_hash(now, telemetry.provider_id, proportional_score, routing_decision)

        return ProportionalEvaluationResult(
            timestamp=now,
            provider_id=telemetry.provider_id,
            provider_name=telemetry.provider_name,
            input_telemetry=telemetry.__dict__,
            proportional_score=proportional_score,
            is_healthy=is_healthy,
            eligible_for_auto_routing=eligible_for_auto,
            routing_decision=routing_decision,
            confidence_score=confidence_score,
            policy_decision=policy_decision,
            warning_message=" | ".join(warnings) if warnings else "",
            audit_hash=audit_hash
        )

    def _generate_hash(self, ts: float, provider_id: str, score: float, decision: str) -> str:
        raw = f"{ts}:{provider_id}:{score}:{decision}:FIPS_140_3"
        return "0x" + hashlib.sha256(raw.encode()).hexdigest()[:32].upper()

if __name__ == "__main__":
    engine = ProportionalEngine()
    print("--- MEHERAH STAGE 1: PROPORTIONAL ENGINE VERIFICATION RUNNER ---")
    
    t1 = engine.evaluate_provider(ProviderTelemetryInput("MTN_UG_01", "MTN Momo", 120, 99.8, 0.8, 85000000, "UP"))
    print(f"[Test 1 Healthy] Score: {t1.proportional_score} | Decision: {t1.routing_decision} | Hash: {t1.audit_hash[:16]}...")
    
    t2 = engine.evaluate_provider(ProviderTelemetryInput("MTN_UG_01", "MTN Momo", 850, 99.7, 0.8, 85000000, "UP"))
    print(f"[Test 2 High Latency] Score: {t2.proportional_score} | Decision: {t2.routing_decision} | Warning: {t2.warning_message}")
    
    t3 = engine.evaluate_provider(ProviderTelemetryInput("AIRTEL_UG_01", "Airtel Money", 110, 99.5, 0.7, 450000, "UP"))
    print(f"[Test 3 Low Liquidity] Score: {t3.proportional_score} | Decision: {t3.routing_decision} | Warning: {t3.warning_message}")
    
    t4 = engine.evaluate_provider(ProviderTelemetryInput("STANBIC_UG_01", "Stanbic Bank", 0, 0, 0.5, 50000000, "DOWN"))
    print(f"[Test 4 Provider Down] Score: {t4.proportional_score} | Decision: {t4.routing_decision} | Policy: {t4.policy_decision}")
    
    t5 = engine.evaluate_provider(ProviderTelemetryInput("UNKNOWN_GATEWAY", "Unknown Gateway", None, None, None, None, "UNKNOWN"))
    print(f"[Test 5 Missing Telemetry] Score: {t5.proportional_score} | Decision: {t5.routing_decision} | Policy: {t5.policy_decision}")
