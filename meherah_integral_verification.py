"""
MEHERAH Day 1 — Stage 2: Integral Engine Verification Engine (Python)
Evaluates historical reliability, failure memory, gradual recovery memory, persistence recovery, and closed-loop feedback learning.
"""

import hashlib
import time
import json
import copy
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, asdict

@dataclass
class ProviderHistoricalRecord:
    provider_id: str
    provider_name: str
    total_transactions: int
    successful_transactions: int
    failed_transactions: int
    accumulated_latency_ms: float
    failed_settlements_count: int
    liquidity_depletion_events: int
    sla_compliance_pct: float
    recovery_streak: int
    trust_multiplier: float
    last_updated: float

@dataclass
class IntegralEvaluationResult:
    provider_id: str
    provider_name: str
    total_transactions: int
    historical_reliability_pct: float
    average_latency_ms: float
    integral_score: float
    sla_compliance_pct: float
    routing_weight: float
    recovery_status: str  # HEALTHY, DEGRADED_FAILURE_MEMORY, GRADUAL_RECOVERING, CRITICAL_UNTRUSTED
    reasoning: str
    audit_hash: str

class IntegralEngine:
    def __init__(self, initial_records: Optional[List[ProviderHistoricalRecord]] = None):
        self.records: Dict[str, ProviderHistoricalRecord] = {}
        if initial_records:
            for rec in initial_records:
                self.records[rec.provider_id] = copy.deepcopy(rec)

    def evaluate_single_provider(self, rec: ProviderHistoricalRecord) -> IntegralEvaluationResult:
        total = rec.total_transactions or 1
        rel_pct = (rec.successful_transactions / total) * 100.0
        avg_latency = rec.accumulated_latency_ms / total

        score = rel_pct
        failure_penalty = (rec.failed_transactions / total) * 40.0
        settlement_penalty = rec.failed_settlements_count * 2.0
        depletion_penalty = rec.liquidity_depletion_events * 5.0

        score -= (failure_penalty + settlement_penalty + depletion_penalty)
        combined_score = (score * 0.7) + (rec.sla_compliance_pct * 0.3)

        recovery_status = "HEALTHY"
        if rec.trust_multiplier < 1.0:
            combined_score *= rec.trust_multiplier
            recovery_status = "GRADUAL_RECOVERING"
        elif (rec.failed_transactions / total) > 0.05:
            recovery_status = "DEGRADED_FAILURE_MEMORY"
        elif combined_score < 60.0:
            recovery_status = "CRITICAL_UNTRUSTED"

        final_score = round(max(0.0, min(100.0, combined_score)), 2)
        routing_weight = round(final_score / 100.0, 4)

        audit_hash = self._generate_hash(rec.provider_id, final_score, rec.total_transactions)

        return IntegralEvaluationResult(
            provider_id=rec.provider_id,
            provider_name=rec.provider_name,
            total_transactions=rec.total_transactions,
            historical_reliability_pct=round(rel_pct, 2),
            average_latency_ms=round(avg_latency, 2),
            integral_score=final_score,
            sla_compliance_pct=rec.sla_compliance_pct,
            routing_weight=routing_weight,
            recovery_status=recovery_status,
            reasoning=f"History: {rec.successful_transactions}/{total} success ({rel_pct:.1f}%), SLA={rec.sla_compliance_pct}%, trustMultiplier={rec.trust_multiplier:.2f}",
            audit_hash=audit_hash
        )

    def record_transaction_outcome(
        self,
        provider_id: str,
        provider_name: str,
        success: bool,
        latency_ms: float,
        liquidity_depleted: bool = False
    ) -> IntegralEvaluationResult:
        rec = self.records.get(provider_id)
        if not rec:
            rec = ProviderHistoricalRecord(
                provider_id=provider_id,
                provider_name=provider_name,
                total_transactions=0,
                successful_transactions=0,
                failed_transactions=0,
                accumulated_latency_ms=0.0,
                failed_settlements_count=0,
                liquidity_depletion_events=0,
                sla_compliance_pct=100.0,
                recovery_streak=0,
                trust_multiplier=1.0,
                last_updated=time.time()
            )

        rec.total_transactions += 1
        rec.accumulated_latency_ms += latency_ms
        rec.last_updated = time.time()

        if success:
            rec.successful_transactions += 1
            if rec.trust_multiplier < 1.0:
                rec.recovery_streak += 1
                rec.trust_multiplier = min(1.0, rec.trust_multiplier + 0.02)
        else:
            rec.failed_transactions += 1
            rec.failed_settlements_count += 1
            rec.recovery_streak = 0
            rec.trust_multiplier = max(0.2, rec.trust_multiplier - 0.25)

        if liquidity_depleted:
            rec.liquidity_depletion_events += 1

        rec.sla_compliance_pct = round((rec.successful_transactions / rec.total_transactions) * 100.0, 2)
        self.records[provider_id] = rec
        return self.evaluate_single_provider(rec)

    def export_snapshot(self) -> str:
        data = {k: asdict(v) for k, v in self.records.items()}
        return json.dumps({"snapshot_id": f"SNAP-{uuid_str()}", "records": data})

    def import_snapshot(self, snapshot_json: str):
        self.records.clear()
        data = json.loads(snapshot_json)["records"]
        for k, v in data.items():
            self.records[k] = ProviderHistoricalRecord(**v)

    def _generate_hash(self, provider_id: str, score: float, total_tx: int) -> str:
        raw = f"{provider_id}:{score}:{total_tx}:MAFE_INTEGRAL_V2"
        return "0x" + hashlib.sha256(raw.encode()).hexdigest()[:32].upper()

def uuid_str():
    return hashlib.md5(str(time.time()).encode()).hexdigest()[:8].upper()

def run_stage2_integral_verification():
    engine = IntegralEngine()

    # Test 1: Historical Reliability Learning
    pA = ProviderHistoricalRecord("MTN_UG_01", "MTN Momo", 10000, 9980, 20, 1200000.0, 0, 0, 99.8, 100, 1.0, time.time())
    pB = ProviderHistoricalRecord("AIRTEL_UG_01", "Airtel Money", 10000, 9200, 800, 1800000.0, 15, 2, 92.0, 0, 1.0, time.time())

    resA = engine.evaluate_single_provider(pA)
    resB = engine.evaluate_single_provider(pB)
    t1_pass = resA.integral_score > resB.integral_score and resA.routing_weight > resB.routing_weight

    # Test 2: Failure Memory
    e2 = IntegralEngine([pA])
    score_before = e2.evaluate_single_provider(pA).integral_score
    for _ in range(10):
        e2.record_transaction_outcome("MTN_UG_01", "MTN Momo", False, 950.0)
    
    rec_after = copy.deepcopy(e2.records["MTN_UG_01"])
    res_after = e2.evaluate_single_provider(rec_after)
    t2_pass = rec_after.failed_transactions == 30 and res_after.integral_score < score_before and rec_after.trust_multiplier < 1.0

    # Test 3: Recovery Memory
    for _ in range(5):
        e2.record_transaction_outcome("MTN_UG_01", "MTN Momo", True, 120.0)
    rec_recov = copy.deepcopy(e2.records["MTN_UG_01"])
    res_recov = e2.evaluate_single_provider(rec_recov)
    t3_pass = rec_recov.trust_multiplier > rec_after.trust_multiplier and rec_recov.trust_multiplier < 1.0 and res_recov.integral_score > res_after.integral_score

    # Test 4: Persistence Recovery
    snap = e2.export_snapshot()
    e_reloaded = IntegralEngine()
    e_reloaded.import_snapshot(snap)
    res_reloaded = e_reloaded.evaluate_single_provider(e_reloaded.records["MTN_UG_01"])
    t4_pass = res_reloaded.integral_score == res_recov.integral_score and res_reloaded.audit_hash == res_recov.audit_hash

    # Test 5: Closed-Loop Feedback
    e5 = IntegralEngine()
    e5.record_transaction_outcome("STANBIC_UG_01", "Stanbic Bank", True, 110.0)
    res5 = e5.evaluate_single_provider(e5.records["STANBIC_UG_01"])
    t5_pass = res5.total_transactions == 1 and res5.integral_score > 0

    return {
        "test1_passed": t1_pass,
        "test2_passed": t2_pass,
        "test3_passed": t3_pass,
        "test4_passed": t4_pass,
        "test5_passed": t5_pass,
        "providerA_score": resA.integral_score,
        "providerB_score": resB.integral_score,
        "all_passed": t1_pass and t2_pass and t3_pass and t4_pass and t5_pass
    }

if __name__ == "__main__":
    report = run_stage2_integral_verification()
    print("=== MEHERAH DAY 1 STAGE 2 INTEGRAL ENGINE VERIFICATION ===")
    print(f"Test 1 Historical Reliability Learning: {'PASSED' if report['test1_passed'] else 'FAILED'}")
    print(f"Test 2 Failure Memory: {'PASSED' if report['test2_passed'] else 'FAILED'}")
    print(f"Test 3 Recovery Memory: {'PASSED' if report['test3_passed'] else 'FAILED'}")
    print(f"Test 4 Persistence Recovery: {'PASSED' if report['test4_passed'] else 'FAILED'}")
    print(f"Test 5 Closed-Loop Feedback: {'PASSED' if report['test5_passed'] else 'FAILED'}")
    print(f"Provider A (MTN 99.8%): {report['providerA_score']} | Provider B (Airtel 92.0%): {report['providerB_score']}")
    print(f"OVERALL STAGE 2 STATUS: {'VERIFIED & AUDITED' if report['all_passed'] else 'FAILED'}")
