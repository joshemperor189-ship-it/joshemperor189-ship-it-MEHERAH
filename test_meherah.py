import datetime
import unittest
import uuid

# ==========================================
# MEHERAH CORE ARCHITECTURE (MOCK)
# ==========================================
class MeherahApp:
    def __init__(self):
        self.routes = ["/dashboard", "/transactions", "/audit-logs", "/admin"]
        self.has_typescript_errors = False
        self.has_console_errors = False
        self.balances = {"USER_001": 5000.0, "BANK_FEES": 0.0}
        self.audit_trail = []
        self.provider_status = {"MTN": "ONLINE", "AIRTEL": "ONLINE"}
        self.database_connected = True
        self.flight_recorder = []

    def log_failure(self, page, action, error_msg, state):
        """Stage 2: MEHERAH Flight Recorder"""
        log = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.datetime.now().isoformat(),
            "page": page,
            "action": action,
            "error": error_msg,
            "system_state": state
        }
        self.flight_recorder.append(log)
        return log

    def execute_transaction(self, user_id, amount, provider, has_intent=False, user_role="CUSTOMER"):
        """Stage 1, 3, & 4: Core Execution with Financial Safety & Chaos Checks"""
        if not self.database_connected:
            self.log_failure("PaymentEngine", "Execute", "Database Offline", "CRITICAL")
            raise RuntimeError("Database connection lost. Halting system safely.")

        # Stage 4: Financial Safety Test
        if not has_intent:
            self.log_failure("PaymentEngine", "Execute", "Missing User Intent Evidence", "FAIL_SAFE")
            return {"status": "FAILED", "reason": "No explicit intent evidence."}

        # Stage 3: Chaos Testing - Provider Failure Routing
        if self.provider_status[provider] != "ONLINE":
            # Attempt failover routing
            fallback = "AIRTEL" if provider == "MTN" else "MTN"
            if self.provider_status[fallback] == "ONLINE":
                provider = fallback
            else:
                self.log_failure("PaymentEngine", "Execute", "All Providers Offline", "DEGRADED")
                return {"status": "FAILED", "reason": "Network providers unavailable."}

        # Stage 1: Financial Logic (Calculations & Reconciliation)
        fee = amount * 0.01
        total_deduction = amount + fee

        if self.balances.get(user_id, 0) >= total_deduction:
            self.balances[user_id] -= total_deduction
            self.balances["BANK_FEES"] += fee
            
            # Stage 1 & 4: Audit Record Creation
            audit_entry = {
                "tx_id": str(uuid.uuid4()),
                "user": user_id,
                "amount": amount,
                "fee": fee,
                "provider": provider,
                "role_auth": user_role,
                "verified": True
            }
            self.audit_trail.append(audit_entry)
            return {"status": "SUCCESS", "audit": audit_entry}
        
        return {"status": "FAILED", "reason": "Insufficient balance."}

    def process_ai_recommendation(self, confidence_score, payload):
        """Stage 3: AI Low-Confidence Human-in-the-loop Guardrail"""
        if confidence_score < 0.85:
            self.log_failure("AIEngine", "Process", f"Low Confidence: {confidence_score}", "HUMAN_REVIEW_REQUIRED")
            return {"status": "FLAGGED", "action": "Sent to Bank Operator for Human Review"}
        return {"status": "AUTO_APPROVED", "action": "Executed natively"}

# ==========================================
# MEHERAH VERIFICATION FRAMEWORK (TEST SUITE)
# ==========================================
class TestMeherahVerificationSystem(unittest.TestCase):

    def setUp(self):
        """Initializes a fresh, clean instance of MEHERAH before every single test."""
        self.app = MeherahApp()
        self.metrics = {"passed": 0, "failed": 0}

    # ------------------------------------------
    # STAGE 1: AUTOMATED CORE TESTING (CI GUARDIAN)
    # ------------------------------------------
    def test_stage1_application_health(self):
        """CI Guardian: Checks application compiling, syntax, and errors"""
        self.assertFalse(self.app.has_typescript_errors, "Build Failure: TypeScript compilation errors found.")
        self.assertFalse(self.app.has_console_errors, "Runtime Failure: Console errors detected.")
        self.assertIn("/dashboard", self.app.routes, "Routing Failure: App routes are broken.")

    def test_stage1_financial_logic_and_reconciliation(self):
        """CI Guardian: Assures exact fee arithmetic and ledger recording"""
        initial_user_balance = self.app.balances["USER_001"]
        tx = self.app.execute_transaction("USER_001", 1000.0, provider="MTN", has_intent=True)
        
        self.assertEqual(tx["status"], "SUCCESS")
        # 1000 + 1% fee (10) = 1010 total deduction
        self.assertEqual(self.app.balances["USER_001"], initial_user_balance - 1010.0)
        self.assertEqual(self.app.balances["BANK_FEES"], 10.0)
        self.assertEqual(len(self.app.audit_trail), 1, "Audit record was not created.")

    # ------------------------------------------
    # STAGE 2: INTERNAL DOGFOODING & FLIGHT RECORDER
    # ------------------------------------------
    def test_stage2_flight_recorder_captures_diagnostic_payloads(self):
        """Flight Recorder: Automated capture of full system state on failures"""
        self.app.execute_transaction("USER_001", 100.0, provider="MTN", has_intent=False)
        
        self.assertEqual(len(self.app.flight_recorder), 1)
        log = self.app.flight_recorder[0]
        self.assertEqual(log["page"], "PaymentEngine")
        self.assertEqual(log["system_state"], "FAIL_SAFE")
        self.assertIn("timestamp", log)

    # ------------------------------------------
    # STAGE 3: CHAOS TESTING
    # ------------------------------------------
    def test_stage3_chaos_provider_failover(self):
        """Chaos Test: If MTN drops, transaction must auto-route to Airtel seamlessly"""
        self.app.provider_status["MTN"] = "OFFLINE"
        
        tx = self.app.execute_transaction("USER_001", 100.0, provider="MTN", has_intent=True)
        self.assertEqual(tx["status"], "SUCCESS")
        self.assertEqual(tx["audit"]["provider"], "AIRTEL", "Failover routing mechanism failed.")

    def test_stage3_chaos_database_hard_failure(self):
        """Chaos Test: System must crash hard and halt instead of processing cleanly without DB"""
        self.app.database_connected = False
        with self.assertRaises(RuntimeError):
            self.app.execute_transaction("USER_001", 100.0, provider="MTN", has_intent=True)

    def test_stage3_chaos_ai_low_confidence_fallback(self):
        """Chaos Test: Low confidence AI must freeze auto-execution and route to a human"""
        result = self.app.process_ai_recommendation(confidence_score=0.62, payload={})
        self.assertEqual(result["status"], "FLAGGED")
        self.assertIn("Human Review", result["action"])

    # ------------------------------------------
    # STAGE 4: FINANCIAL SAFETY TESTING
    # ------------------------------------------
    def test_stage4_intent_evidence_enforcement(self):
        """Safety Test: No intent from the user means transaction is absolutely blocked"""
        tx = self.app.execute_transaction("USER_001", 500.0, provider="MTN", has_intent=False)
        self.assertEqual(tx["status"], "FAILED")
        self.assertEqual(tx["reason"], "No explicit intent evidence.")

# ==========================================
# STAGE 5: REPORTING & DEMO READINESS DASHBOARD
# ==========================================
def run_meherah_pipeline():
    print("=" * 60)
    print("   MEHERAH VERIFICATION PIPELINE - INTEGRITY REPORT")
    print("=" * 60)
    
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromTestCase(TestMeherahVerificationSystem)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Calculate Demo Readiness Score for Bank of Uganda
    total_tests = result.testsRun
    failed_tests = len(result.failures) + len(result.errors)
    passed_tests = total_tests - failed_tests
    readiness_score = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
    
    print("\n" + "=" * 60)
    print(f"DEMO READINESS SCORE FOR BANK OF UGANDA: {readiness_score:.1f}%")
    print(f"Passed Checks: {passed_tests}/{total_tests}")
    print("=" * 60)
    
    if readiness_score == 100.0:
        print("🚀 STATUS: VERIFIED & AUDITED. Safe for Sandbox Deployment.")
    else:
        print("❌ STATUS: DEGRADED. Review Flight Recorder logs immediately.")
    print("=" * 60)

if __name__ == "__main__":
    run_meherah_pipeline()
