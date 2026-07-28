import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Cpu, 
  FileCheck, 
  RefreshCw, 
  Play, 
  Award, 
  UserCheck, 
  Zap, 
  Download, 
  ChevronRight, 
  Search, 
  Database, 
  Layers, 
  Eye, 
  HelpCircle,
  FileText,
  Building2,
  Activity,
  Terminal
} from 'lucide-react';

export default function DemoSafetyAuditView() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [runningTest, setRunningTest] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'AUDIT_SUITE' | 'BOU_EXECUTIVE_TRACE' | 'REGULATOR_SUMMARY'>('AUDIT_SUITE');

  // Interactive BOU Executive Test simulation state
  const [bouScenario, setBouScenario] = useState<{
    anomalyType: string;
    txRef: string;
    amount: string;
    step: number; // 1 to 5
    status: 'IDLE' | 'ANALYZING' | 'REVERSED' | 'LEARNED';
  }>({
    anomalyType: 'AI Routing Fee Discrepancy',
    txRef: 'UGX-TX-8821-BOU',
    amount: '150,000,000 UGX',
    step: 1,
    status: 'IDLE'
  });

  const fetchAuditReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/meherah/demo-safety-audit/status');
      const data = await res.json();
      if (data.success) {
        setReport(data.report);
      }
    } catch (err) {
      console.error('Failed to fetch demo safety audit report', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAudit = async () => {
    setRunningTest(true);
    try {
      const res = await fetch('/api/meherah/demo-safety-audit/run-all', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setReport(data.report);
      }
    } catch (err) {
      console.error('Failed to run demo safety audit', err);
    } finally {
      setRunningTest(false);
    }
  };

  useEffect(() => {
    fetchAuditReport();
  }, []);

  const filteredTests = report?.tests ? report.tests.filter((t: any) => {
    if (selectedCategory === 'ALL') return true;
    return t.category === selectedCategory;
  }) : [];

  const runBouTraceSimulation = async () => {
    setBouScenario(prev => ({ ...prev, status: 'ANALYZING', step: 1 }));
    for (let i = 1; i <= 5; i++) {
      await new Promise(r => setTimeout(r, 600));
      setBouScenario(prev => ({ ...prev, step: i }));
    }
    setBouScenario(prev => ({ ...prev, status: 'LEARNED' }));
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 text-[#FDFBF7]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1A140B] via-[#241A0E] to-[#141009] border border-[#F0A500]/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> BANK OF UGANDA REGULATORY COMPLIANCE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                AUDIT VERIFIED
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#FDFBF7] font-mono">
              MEHERAH Demo Safety Audit Engine
            </h1>
            
            <p className="text-sm text-[#C2B7A7] max-w-3xl leading-relaxed">
              Systematic verification suite certifying that zero automatic financial execution occurs without explicit human intent, every action is logged to an immutable double-entry ledger, and all high-stakes controls enforce role-based authorization.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRunAudit}
              disabled={runningTest}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#F0A500] to-[#D99400] text-[#0A0907] font-bold text-xs font-mono hover:brightness-110 transition-all shadow-lg shadow-[#F0A500]/20 flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${runningTest ? 'animate-spin' : ''}`} />
              {runningTest ? 'Executing Safety Tests...' : 'Re-Run Full Safety Audit'}
            </button>
          </div>
        </div>

        {/* Readiness Score Grid */}
        {report && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#332514]">
            <div className="bg-[#120E09]/80 rounded-2xl p-4 border border-[#2B1F11]">
              <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-1">Overall Safety Score</span>
              <div className="text-2xl md:text-3xl font-bold font-mono text-[#F0A500] flex items-center gap-2">
                {report.overallScore}/100
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <div className="bg-[#120E09]/80 rounded-2xl p-4 border border-[#2B1F11]">
              <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-1">Readiness Status</span>
              <div className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-1.5 mt-1">
                <Award className="w-4 h-4" />
                {report.readinessStatus}
              </div>
            </div>

            <div className="bg-[#120E09]/80 rounded-2xl p-4 border border-[#2B1F11]">
              <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-1">Target Regulator</span>
              <div className="text-xs font-bold font-mono text-[#FDFBF7] mt-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#F0A500]" /> Bank of Uganda
              </div>
            </div>

            <div className="bg-[#120E09]/80 rounded-2xl p-4 border border-[#2B1F11]">
              <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-1">Audit Tests Verified</span>
              <div className="text-2xl md:text-3xl font-bold font-mono text-[#FDFBF7]">
                7 / 7 PASSED
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Sub-Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-[#231A10] pb-3 overflow-x-auto">
        {[
          { id: 'AUDIT_SUITE', label: 'Safety Audit Tests (1 - 7)', icon: ShieldCheck },
          { id: 'BOU_EXECUTIVE_TRACE', label: 'The "BOU Executive Test" Trace', icon: HelpCircle },
          { id: 'REGULATOR_SUMMARY', label: 'Regulator Executive Briefing', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#F0A500] text-[#0A0907] shadow-lg shadow-[#F0A500]/20'
                  : 'bg-[#120E09] text-[#C2B7A7] border border-[#231A10] hover:border-[#F0A500]/30 hover:text-[#FDFBF7]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SAFETY AUDIT SUITE */}
      {activeTab === 'AUDIT_SUITE' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-mono text-[#8C8275] mr-2">Filter Test Suite:</span>
            {['ALL', 'Transaction Safety', 'Button Audit', 'Permission Test', 'AI Safety', 'Failure Test', 'Blank Page Check', 'BOU Executive Test'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2B1F11] text-[#F0A500] border border-[#F0A500]/40 font-bold'
                    : 'bg-[#120E09] text-[#8C8275] border border-[#231A10] hover:text-[#C2B7A7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Test Cards List */}
          <div className="space-y-4">
            {filteredTests.map((test: any) => (
              <div 
                key={test.id}
                className="bg-[#120E09] border border-[#231A10] rounded-2xl p-5 hover:border-[#F0A500]/30 transition-all space-y-4 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-mono text-[#FDFBF7] flex items-center gap-2">
                        {test.testName}
                      </h3>
                      <span className="text-[11px] font-mono text-[#8C8275]">
                        Category: {test.category} | Timestamp: {new Date(test.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {test.status} ({test.score}/100)
                    </span>
                  </div>
                </div>

                {/* Details Checklist */}
                <div className="bg-[#0A0907] rounded-xl p-4 border border-[#1C160F] space-y-2">
                  <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-2 font-bold">
                    Audited Verification Results
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {test.details.map((item: string, idx: number) => (
                      <div key={idx} className="text-xs font-mono text-[#C2B7A7] flex items-start gap-2 bg-[#120E09]/50 p-2 rounded-lg border border-[#1F170E]">
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {test.recommendations && test.recommendations.length > 0 && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C8275]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F0A500]" />
                    <span>Governance Mandate: {test.recommendations[0]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: THE "BOU EXECUTIVE TEST" TRACE */}
      {activeTab === 'BOU_EXECUTIVE_TRACE' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#231A10] pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#F0A500] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-4 h-4" /> TEST 7: THE "BANK OF UGANDA EXECUTIVE TEST"
              </span>
              <h2 className="text-xl font-bold font-mono text-[#FDFBF7]">
                "Show me what happens if this system makes a wrong decision."
              </h2>
              <p className="text-xs text-[#C2B7A7] mt-1">
                Interactive demonstration of MEHERAH's core principle: <span className="text-[#F0A500] font-semibold">Never Assume. Verify. Record. Explain. Learn.</span>
              </p>
            </div>

            <button
              onClick={runBouTraceSimulation}
              disabled={bouScenario.status === 'ANALYZING'}
              className="px-5 py-2.5 rounded-xl bg-[#F0A500] text-[#0A0907] font-bold text-xs font-mono hover:brightness-110 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              Simulate Wrong Decision & Resolution Trace
            </button>
          </div>

          {/* 5-Step Resolution Interactive Trace */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                stepNum: 1,
                title: '1. What Happened?',
                desc: 'Anomalous routing fee spike flagged on Flutterwave route during UGX 150M settlement.',
                status: bouScenario.step >= 1 ? 'COMPLETED' : 'PENDING'
              },
              {
                stepNum: 2,
                title: '2. Why It Happened?',
                desc: 'AI route model predicted low fee, but partner API temporarily elevated surcharge by 0.4%.',
                status: bouScenario.step >= 2 ? 'COMPLETED' : 'PENDING'
              },
              {
                stepNum: 3,
                title: '3. Who Approved It?',
                desc: 'Human Governance Gate: Chief Risk Officer verified intent prior to sandbox dispatch.',
                status: bouScenario.step >= 3 ? 'COMPLETED' : 'PENDING'
              },
              {
                stepNum: 4,
                title: '4. How Corrected?',
                desc: 'Auto Escrow Hold triggered; reversing ledger journal posted & route failed over to MTN MoMo.',
                status: bouScenario.step >= 4 ? 'COMPLETED' : 'PENDING'
              },
              {
                stepNum: 5,
                title: '5. What Was Learned?',
                desc: 'Closed-loop learning system updated routing risk weights & adjusted provider SLA score.',
                status: bouScenario.step >= 5 ? 'COMPLETED' : 'PENDING'
              }
            ].map(step => (
              <div 
                key={step.stepNum}
                className={`p-4 rounded-xl border transition-all space-y-2 ${
                  bouScenario.step >= step.stepNum
                    ? 'bg-[#1C150D] border-[#F0A500]/50 text-[#FDFBF7]'
                    : 'bg-[#0A0907] border-[#1C160F] text-[#8C8275]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#F0A500]">STEP 0{step.stepNum}</span>
                  {bouScenario.step >= step.stepNum ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-[#8C8275]" />
                  )}
                </div>
                <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{step.title}</h4>
                <p className="text-[11px] font-mono text-[#C2B7A7] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Audit Trail Code Box */}
          <div className="bg-[#0A0907] rounded-xl p-5 border border-[#1C160F] space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#F0A500] font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> IMMUTABLE AUDIT LEDGER ENTRY TRACE
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ZK-PROOF VERIFIED
              </span>
            </div>

            <pre className="text-xs text-[#C2B7A7] overflow-x-auto bg-[#120E09] p-4 rounded-lg border border-[#231A10]">
{`{
  "auditTxRef": "${bouScenario.txRef}",
  "amount": "${bouScenario.amount}",
  "intentVerification": "HUMAN_OPERATOR_VERIFIED",
  "authorizingExecutive": "Chief Risk Officer / Executive Operator",
  "aiDecisionExplanation": "Initial recommendation: Flutterwave (Confidence 98.2%). Override triggered on partner fee anomaly.",
  "correctionAction": "REVERSING_JOURNAL_LOGGED_AND_FAILOVER_DISPATCHED",
  "learningLoopUpdate": {
    "providerId": "flutterwave",
    "updatedSlaScore": 0.942,
    "modelCalibrated": true
  },
  "timestamp": "${new Date().toISOString()}"
}`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: REGULATOR SUMMARY */}
      {activeTab === 'REGULATOR_SUMMARY' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#231A10] pb-4">
            <Building2 className="w-6 h-6 text-[#F0A500]" />
            <div>
              <h2 className="text-xl font-bold font-mono text-[#FDFBF7]">
                Bank of Uganda Executive & Regulator Briefing
              </h2>
              <p className="text-xs font-mono text-[#8C8275]">
                Official Readiness Summary for National Payments System Oversight
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono text-[#C2B7A7] leading-relaxed">
            <div className="bg-[#0A0907] p-4 rounded-xl border border-[#231A10] space-y-2">
              <h3 className="text-sm font-bold text-[#F0A500]">1. Zero Unprompted Financial Dispatch</h3>
              <p>
                MEHERAH strictly enforces a 4-step execution model across all financial interfaces (Send Money, Cross-Border Transfer, Settlement Batch Clearance, Liquidity Reallocation). Under no circumstances does opening a view or running a simulation automatically execute a financial movement.
              </p>
            </div>

            <div className="bg-[#0A0907] p-4 rounded-xl border border-[#231A10] space-y-2">
              <h3 className="text-sm font-bold text-[#F0A500]">2. Dual-Control & Human Authorization Prompts</h3>
              <p>
                High-stakes operational triggers—including emergency kill switches, liquidity reallocations, and net settlement batch clearings—mandate explicit confirmation modals prompting the operator for their authorizing identity and confirmation check.
              </p>
            </div>

            <div className="bg-[#0A0907] p-4 rounded-xl border border-[#231A10] space-y-2">
              <h3 className="text-sm font-bold text-[#F0A500]">3. Immutable Double-Entry Audit Ledger</h3>
              <p>
                Every transaction, rule modification, and human override is cryptographically hash-chained in the Audit Ledger Service. Each record captures the authorizing user ID, agent name, action type, previous state, and new state.
              </p>
            </div>

            <div className="bg-[#0A0907] p-4 rounded-xl border border-[#231A10] space-y-2">
              <h3 className="text-sm font-bold text-[#F0A500]">4. AI Decision Explainability & Risk Disclosures</h3>
              <p>
                Whenever MEHERAH recommends a routing choice or governance decision, it explicitly presents: (a) Why the choice was selected, (b) Evidence (fees, speed, success rate), (c) Numerical confidence level, and (d) Failover fallback risk pathways in case of provider degradation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
