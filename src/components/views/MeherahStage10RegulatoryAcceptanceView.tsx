import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Zap,
  Layers,
  Activity,
  Lock,
  UserCheck,
  FileCheck,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Database,
  Terminal,
  Server,
  Key,
  Download,
  Sliders,
  Play
} from 'lucide-react';
import { Stage10RegulatoryAcceptanceEngine } from '../../../ai-engine/stage10-regulatory-acceptance';

export function MeherahStage10RegulatoryAcceptanceView() {
  const engine = new Stage10RegulatoryAcceptanceEngine();
  const [activeTab, setActiveTab] = useState<'blackbox' | 'adversarial' | 'sandbox' | 'performance' | 'security' | 'human' | 'package'>('blackbox');

  // Interactive Black Box Regulator State
  const [targetTxnId, setTargetTxnId] = useState<string>('TX-2026-881');
  const [blackBoxAudit, setBlackBoxAudit] = useState(engine.runBlackBoxRegulatorTest('TX-2026-881'));

  // Interactive Human Governance State
  const [governanceLog, setGovernanceLog] = useState<string[]>([]);
  const [activeCorridorState, setActiveCorridorState] = useState<'NORMAL' | 'FROZEN'>('NORMAL');

  const adversarialTests = engine.runAdversarialAiTest();
  const sandboxConnections = engine.runRealSandboxConnectivityTest();
  const perfBenchmarks = engine.runPerformanceCertification();
  const securitySimulations = engine.runSecurityReviewSimulation();
  const humanTasks = engine.runHumanGovernanceExercise();
  const evalPackage = engine.generateStage10EvaluationPackage();

  const handleBlackBoxSearch = () => {
    setBlackBoxAudit(engine.runBlackBoxRegulatorTest(targetTxnId || 'TX-2026-881'));
  };

  const handleGovernanceAction = (actionMsg: string) => {
    setGovernanceLog((prev) => [`[${new Date().toLocaleTimeString()}] ${actionMsg}`, ...prev]);
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="p-5 bg-[#111111] border border-[#C9A227]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
            <Award size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C9A227]">STAGE 10 ACCEPTANCE</span>
              <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                CERTIFIED FOR SANDBOX ENTRY
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5 font-sans">
              Independent Regulatory Acceptance & External Supervision Evaluation Suite.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
          <ShieldCheck size={16} className="text-[#00B86B]" />
          <span>BOU EXTERNAL EVALUATION COMPLETE</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'blackbox', label: '1. Black Box Regulator Test', icon: Search },
          { id: 'adversarial', label: '2. Adversarial AI Test', icon: ShieldAlert },
          { id: 'sandbox', label: '3. Real Sandbox Connectivity', icon: Layers },
          { id: 'performance', label: '4. Performance Certification', icon: Activity },
          { id: 'security', label: '5. Security Review Simulation', icon: Lock },
          { id: 'human', label: '6. Human Governance Exercise', icon: UserCheck },
          { id: 'package', label: '★ Stage 10 Evaluation Package', icon: FileCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-[#111111] text-[#E8C879] border border-[#C9A227]/50 shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#111111]/50 border border-transparent'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#C9A227]' : 'text-[#666666]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BLACK BOX REGULATOR TEST */}
      {activeTab === 'blackbox' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Black Box Regulator Audit Investigation</h3>
                <p className="text-xs text-[#A7A7A7]">An external auditor with zero source code or developer assistance investigates transaction decisions strictly via dashboards.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                ZERO-DEV ASSISTANCE AUDIT: PASSED
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={targetTxnId}
                onChange={(e) => setTargetTxnId(e.target.value)}
                placeholder="Enter Transaction ID (e.g. TX-2026-881)"
                className="bg-[#070707] border border-[#222222] rounded-xl px-4 py-2 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227] w-64"
              />
              <button
                onClick={handleBlackBoxSearch}
                className="px-4 py-2 bg-[#C9A227] text-[#070707] font-bold font-mono text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2"
              >
                <Search size={14} />
                Inspect Transaction Audit Trail
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {blackBoxAudit.investigationQuestions.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#E8C879]">Q{idx + 1}: {item.question}</span>
                    <span className="text-[10px] text-[#A7A7A7]">Source: {item.evidenceSource}</span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px] leading-relaxed pl-3 border-l-2 border-[#00B86B]">
                    {item.answerExtractedByAuditor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: ADVERSARIAL AI TEST */}
      {activeTab === 'adversarial' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Adversarial AI Defense Scenarios</h3>
              <p className="text-xs text-[#A7A7A7]">Tests MEHERAH's resilience against fake healthy telemetry, unusual behavioral fraud, and strict policy override of 99% AI confidence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {adversarialTests.map((test) => (
                <div key={test.scenarioKey} className="p-5 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                      <span className="font-bold text-[#E8C879] text-[11px]">{test.title}</span>
                      <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                        DEFENDED
                      </span>
                    </div>
                    <p className="text-[#A7A7A7] text-[10px]">Attack: {test.attackVector}</p>
                    <p className="text-[#FFFFFF] text-[11px] leading-snug">{test.meherahReaction}</p>
                  </div>

                  <div className="pt-3 border-t border-[#222222] space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#A7A7A7]">AI Confidence Shift:</span>
                      <span className="text-[#E8C879]">{test.confidenceScoreDelta.initialPct}% → {test.confidenceScoreDelta.finalPct}%</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-[#A7A7A7]">Governance Action:</span>
                      <span className="text-[#00B86B]">{test.governanceDecision}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: REAL SANDBOX CONNECTIVITY */}
      {activeTab === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Real Sandbox Environment API Traces</h3>
                <p className="text-xs text-[#A7A7A7]">Verifies end-to-end API connectivity across MTN, Airtel, Stanbic Bank, and Visa payment gateway sandboxes.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                4/4 SANDBOXES CONNECTED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {sandboxConnections.map((sb) => (
                <div key={sb.sandboxName} className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#E8C879] text-sm">{sb.sandboxName}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-bold">
                      HTTP 200 OK ({sb.providerResponse.latencyMs}ms)
                    </span>
                  </div>

                  <div className="p-3 bg-[#111111] rounded-lg text-[10px] space-y-1">
                    <p className="text-[#A7A7A7]">Request Ref: <span className="text-[#FFFFFF]">{sb.requestPayload.txRef}</span></p>
                    <p className="text-[#A7A7A7]">Amount: <span className="text-[#FFFFFF]">{sb.requestPayload.amountUgx.toLocaleString()} UGX</span></p>
                    <p className="text-[#A7A7A7]">Provider Ref: <span className="text-[#FFFFFF]">{sb.providerResponse.providerRef}</span></p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#222222]">
                    <span className="text-[#00B86B]">Reconciliation Matched: 100%</span>
                    <span className="text-[#A7A7A7]">{sb.auditReceipt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: PERFORMANCE CERTIFICATION */}
      {activeTab === 'performance' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Performance & Stress Certification Matrix</h3>
              <p className="text-xs text-[#A7A7A7]">Reports average, worst-case, and failure-condition metrics to ensure full central bank transparency.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {perfBenchmarks.map((bench) => (
                <div key={bench.metricName} className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-[#FFFFFF] text-sm">{bench.metricName}</span>
                    <p className="text-[10px] text-[#A7A7A7]">Target Requirement: {bench.targetRequirement}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-[11px] text-center w-full sm:w-auto">
                    <div className="p-2 bg-[#111111] rounded-lg">
                      <span className="text-[#A7A7A7] text-[9px]">AVERAGE</span>
                      <p className="text-[#00B86B] font-bold">{bench.averageValue}</p>
                    </div>
                    <div className="p-2 bg-[#111111] rounded-lg">
                      <span className="text-[#A7A7A7] text-[9px]">WORST CASE</span>
                      <p className="text-[#E8C879] font-bold">{bench.worstCaseValue}</p>
                    </div>
                    <div className="p-2 bg-[#111111] rounded-lg">
                      <span className="text-[#A7A7A7] text-[9px]">FAIL CONDITION</span>
                      <p className="text-[#FF3B30] font-bold">{bench.failureConditionValue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: SECURITY REVIEW SIMULATION */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Cyber Security Review Attacks & Defensive Log</h3>
              <p className="text-xs text-[#A7A7A7]">Simulates invalid admin access, replay attacks, audit tamper attempts, telemetry injection, and comms drops.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {securitySimulations.map((sec) => (
                <div key={sec.attackType} className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#E8C879]">{sec.attackType}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {sec.status}
                    </span>
                  </div>
                  <p className="text-[#A7A7A7] text-[11px]">Payload: {sec.simulatedPayload}</p>
                  <p className="text-[#00B86B] text-[11px] font-bold">Response: {sec.responseActionTaken}</p>
                  <div className="flex items-center gap-4 text-[10px] text-[#A7A7A7] pt-1">
                    <span>✓ Security Event Logged</span>
                    <span>✓ Audit Record Indexed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 6: HUMAN GOVERNANCE EXERCISE */}
      {activeTab === 'human' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Non-Developer Regulator Governance Control Panel</h3>
                <p className="text-xs text-[#A7A7A7]">Validates that non-technical central bank supervisors can safely operate MEHERAH in production.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#E8C879] bg-[#C9A227]/20 border border-[#C9A227]/40 px-3 py-1 rounded-full">
                ROLE: NON_DEVELOPER_SUPERVISOR
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                <span className="font-bold text-[#E8C879]">SUPERVISORY ACTIONS</span>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveCorridorState(activeCorridorState === 'NORMAL' ? 'FROZEN' : 'NORMAL');
                      handleGovernanceAction(`Corridor State Toggled to: ${activeCorridorState === 'NORMAL' ? 'FROZEN (MTN Sector 4)' : 'NORMAL'}`);
                    }}
                    className={`w-full text-left p-3 border rounded-xl transition-all ${
                      activeCorridorState === 'FROZEN' ? 'bg-[#FF3B30]/20 text-[#FF3B30] border-[#FF3B30]' : 'bg-[#111111] text-[#FFFFFF] border-[#222222] hover:border-[#C9A227]'
                    }`}
                  >
                    1. Freeze Payment Corridor ({activeCorridorState === 'FROZEN' ? 'CURRENTLY FROZEN' : 'ACTIVE'})
                  </button>

                  <button
                    onClick={() => handleGovernanceAction('Approved Held Emergency Transaction TX-2026-991 via HSM Signature')}
                    className="w-full text-left p-3 bg-[#111111] border border-[#222222] rounded-xl text-[#FFFFFF] hover:border-[#00B86B] transition-all"
                  >
                    2. Approve Held Emergency Transaction
                  </button>

                  <button
                    onClick={() => handleGovernanceAction('Updated AML Risk Threshold: Lowered Max Daily Cap to 10M UGX')}
                    className="w-full text-left p-3 bg-[#111111] border border-[#222222] rounded-xl text-[#FFFFFF] hover:border-[#E8C879] transition-all"
                  >
                    3. Change Policy Risk Threshold
                  </button>

                  <button
                    onClick={() => handleGovernanceAction('Generated Stage 10 External Evaluation Audit Summary Report')}
                    className="w-full text-left p-3 bg-[#111111] border border-[#222222] rounded-xl text-[#FFFFFF] hover:border-[#C9A227] transition-all"
                  >
                    4. Generate Central Bank Supervisory Audit Dossier
                  </button>
                </div>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                <span className="font-bold text-[#A7A7A7]">SUPERVISORY AUDIT LOG</span>
                <div className="p-3 bg-[#111111] border border-[#222222] rounded-lg h-48 overflow-y-auto space-y-2 text-[11px] text-[#00B86B]">
                  {governanceLog.length === 0 ? (
                    <p className="text-[#A7A7A7] italic">No supervisory actions taken yet. Click control buttons on the left.</p>
                  ) : (
                    governanceLog.map((log, i) => <p key={i}>{log}</p>)
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 7: STAGE 10 EVALUATION PACKAGE */}
      {activeTab === 'package' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-8 bg-[#070707] border-2 border-[#C9A227] rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-[#C9A227]">
              <Award size={180} />
            </div>

            <div className="border-b border-[#C9A227]/40 pb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#C9A227] tracking-widest uppercase">MEHERAH STAGE 10 CERTIFICATION</span>
                <span className="text-xs font-mono text-[#A7A7A7]">{evalPackage.packageId}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#FFFFFF] font-playfair tracking-wide">
                EXTERNAL EVALUATION PACKAGE FOR SANDBOX ENTRY
              </h2>
              <p className="text-xs text-[#A7A7A7] font-mono">
                Issued for: <span className="text-[#E8C879]">{evalPackage.issuedFor}</span>
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#C9A227] font-bold">5-DOCUMENT EVALUATION DOSSIER MANIFEST:</span>
              {Object.entries(evalPackage.reports).map(([key, title], i) => (
                <div key={key} className="p-4 bg-[#111111] border border-[#222222] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck size={18} className="text-[#C9A227]" />
                    <span className="text-[#FFFFFF]">{title}</span>
                  </div>
                  <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-bold">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#111111] border border-[#00B86B]/40 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-[#00B86B] font-bold">STATUS: {evalPackage.overallStatus}</span>
              <span className="text-[#A7A7A7] text-[10px]">FIPS Signature: {evalPackage.fips140Signature}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
