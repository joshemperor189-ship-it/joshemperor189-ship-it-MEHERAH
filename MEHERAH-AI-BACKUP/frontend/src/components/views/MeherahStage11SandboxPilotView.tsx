import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Eye,
  Zap,
  Layers,
  Activity,
  Server,
  FileText,
  Award,
  CheckCircle2,
  AlertTriangle,
  Flame,
  TrendingUp,
  Sliders,
  Play,
  Download
} from 'lucide-react';
import { Stage11SandboxPilotEngine } from '../../../ai-engine/stage11-sandbox-pilot';

export function MeherahStage11SandboxPilotView() {
  const engine = new Stage11SandboxPilotEngine();
  const [activeTab, setActiveTab] = useState<'shadow' | 'live' | 'drill' | 'monitoring' | 'disaster' | 'deliverables'>('shadow');

  // Interactive Pilot Simulation State
  const [livePilotLog, setLivePilotLog] = useState<string[]>([]);
  const [isSimulatingLive, setIsSimulatingLive] = useState<boolean>(false);

  const shadowData = engine.runShadowModeOperation();
  const livePilotData = engine.runLimitedLivePilot();
  const drillData = engine.runRegulatoryControlRoomDrill();
  const modelData = engine.runModelBehaviourMonitoring();
  const disasterData = engine.runDisasterRecoveryCert();
  const deliverables = engine.generateStage11Deliverables();

  const handleRunLiveTransaction = () => {
    setIsSimulatingLive(true);
    setTimeout(() => {
      const newTxnId = `TXN_PILOT_${Math.floor(100 + Math.random() * 900)}`;
      const amount = (Math.floor(Math.random() * 10) + 1) * 20000;
      setLivePilotLog((prev) => [
        `[${new Date().toLocaleTimeString()}] Executed Live Pilot Txn: ${newTxnId} (${amount.toLocaleString()} UGX) -> Route: Airtel Money -> Rec: Matched 100%`,
        ...prev,
      ]);
      setIsSimulatingLive(false);
    }, 400);
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
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C9A227]">STAGE 11 PILOT OPERATIONS</span>
              <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                PROCEED TO EXPANDED PILOT
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5 font-sans">
              Controlled Sandbox Pilot Operations & Regulatory Observation Under Central Bank Constraints.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
          <ShieldCheck size={16} className="text-[#00B86B]" />
          <span>BOU REGULATOR SUPERVISION ACTIVE</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'shadow', label: '1. Shadow Mode Operation', icon: Eye },
          { id: 'live', label: '2. Limited Live Pilot', icon: Zap },
          { id: 'drill', label: '3. Regulatory Control Room Drill', icon: Sliders },
          { id: 'monitoring', label: '4. Model Behaviour & Drift', icon: TrendingUp },
          { id: 'disaster', label: '5. Disaster Recovery Drills', icon: Flame },
          { id: 'deliverables', label: '★ Stage 11 Pilot Deliverables', icon: FileText },
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

      {/* TAB 1: SHADOW MODE OPERATION */}
      {activeTab === 'shadow' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Shadow Mode Evaluation (Zero Financial Risk)</h3>
                <p className="text-xs text-[#A7A7A7]">MEHERAH scores live payments in shadow mode, comparing recommendations against actual settlement without executing traffic.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                {shadowData.shadowModeStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">TOTAL SHADOW EVALUATIONS</span>
                <p className="text-xl font-bold text-[#FFFFFF]">{shadowData.totalShadowEvaluations.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">ROUTE ACCURACY</span>
                <p className="text-xl font-bold text-[#00B86B]">{shadowData.routeRecommendationAccuracyPct}%</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">COST OPTIMIZATION SAVINGS</span>
                <p className="text-xl font-bold text-[#E8C879]">{shadowData.costOptimizationSavingsPct}%</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">CALIBRATION SCORE</span>
                <p className="text-xl font-bold text-[#00B86B]">{shadowData.confidenceCalibrationScore}</p>
              </div>
            </div>

            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-[#A7A7A7]">Predicted vs Actual Failures Matched:</span>
                <span className="text-[#00B86B] font-bold">{shadowData.predictedVsActualFailuresMatched} / 500</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#A7A7A7]">False Alerts Triggered:</span>
                <span className="text-[#E8C879] font-bold">{shadowData.falseAlertsCount} (0.006%)</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: LIMITED LIVE PILOT */}
      {activeTab === 'live' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Limited Live Transaction Pilot Execution</h3>
                <p className="text-xs text-[#A7A7A7]">Controlled live payments capped at 500k UGX per transaction under full human supervisory oversight.</p>
              </div>
              <button
                onClick={handleRunLiveTransaction}
                disabled={isSimulatingLive}
                className="px-4 py-2 bg-[#C9A227] text-[#070707] font-bold font-mono text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2"
              >
                <Play size={14} />
                {isSimulatingLive ? 'Processing Live Txn...' : 'Simulate Live Pilot Transaction'}
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#E8C879] font-bold">PILOT BATCH: {livePilotData.pilotBatchId}</span>
              <p className="text-[#A7A7A7] text-[11px]">Corridor: {livePilotData.selectedCorridor} | Max Limit: {livePilotData.maxTxnValueLimitUgx.toLocaleString()} UGX</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {livePilotData.liveTransactionsProcessed.map((tx) => (
                  <div key={tx.txnId} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#FFFFFF]">{tx.txnId}</span>
                      <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                        SETTLED
                      </span>
                    </div>
                    <p className="text-[#E8C879] text-[11px]">{tx.amountUgx.toLocaleString()} UGX → {tx.chosenProvider}</p>
                    <p className="text-[#A7A7A7] text-[10px]">Reason: {tx.selectionReason}</p>
                    <p className="text-[#00B86B] text-[10px]">Audit Receipt: {tx.auditReceipt}</p>
                  </div>
                ))}
              </div>
            </div>

            {livePilotLog.length > 0 && (
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2 font-mono text-xs">
                <span className="text-[#A7A7A7] font-bold">LIVE SIMULATION AUDIT LOG</span>
                <div className="p-3 bg-[#111111] rounded-lg text-[#00B86B] space-y-1 text-[11px] max-h-36 overflow-y-auto">
                  {livePilotLog.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 3: REGULATORY CONTROL ROOM DRILL */}
      {activeTab === 'drill' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Bank of Uganda Control Room Operational Drills</h3>
              <p className="text-xs text-[#A7A7A7]">Demonstrates non-technical central bank supervisors performing emergency freezes and risk sensitivity adjustments.</p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {drillData.map((drill, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#E8C879] text-sm">{drill.drillName}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-bold">
                      {drill.status}
                    </span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px]">{drill.actionTakenBySupervisor}</p>
                  <p className="text-[#A7A7A7] text-[11px]">Routing Impact: {drill.routingImpact}</p>
                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#222222]">
                    <span className="text-[#E8C879]">Intercepted Transfers: {drill.interceptedTxnCount}</span>
                    <span className="text-[#A7A7A7]">Evidence Hash: {drill.auditEvidenceHash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: MODEL BEHAVIOUR & DRIFT */}
      {activeTab === 'monitoring' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">AI Model Behaviour & Market Bias Monitoring</h3>
              <p className="text-xs text-[#A7A7A7]">Ensures confidence score calibration, drift detection under high volume, and zero market provider bias.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {modelData.map((m) => (
                <div key={m.metric} className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-[#FFFFFF] text-sm">{m.metric}</span>
                    <p className="text-[10px] text-[#A7A7A7]">{m.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-[#A7A7A7]">OBSERVED / BENCHMARK</span>
                      <p className="text-[#00B86B] font-bold">{m.observedScore} (Threshold: {m.benchmarkThreshold})</p>
                    </div>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-3 py-1 rounded-full font-bold">
                      {m.driftStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: DISASTER RECOVERY DRILLS */}
      {activeTab === 'disaster' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Scheduled Disaster Recovery Certification Drills</h3>
              <p className="text-xs text-[#A7A7A7]">Simulates primary DB crash, split-brain network partition, telco gateway drop, HSM key lock, and telemetry corruption.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {disasterData.map((d) => (
                <div key={d.disasterScenario} className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-[#FFFFFF] text-sm">{d.disasterScenario}</span>
                    <div className="flex items-center gap-3 text-[10px] text-[#A7A7A7]">
                      <span>✓ Transaction Safety Guaranteed</span>
                      <span>✓ Audit Trail Preserved</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[#E8C879] font-bold">Recovery: {d.recoveryTimeMs} ms</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-3 py-1 rounded-full font-bold">
                      {d.certificationStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 6: STAGE 11 PILOT DELIVERABLES */}
      {activeTab === 'deliverables' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-8 bg-[#070707] border-2 border-[#C9A227] rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-[#C9A227]">
              <Award size={180} />
            </div>

            <div className="border-b border-[#C9A227]/40 pb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#C9A227] tracking-widest uppercase">MEHERAH STAGE 11 PILOT DELIVERABLE DOSSIER</span>
                <span className="text-xs font-mono text-[#A7A7A7]">{deliverables.deliverableId}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#FFFFFF] font-playfair tracking-wide">
                BANK OF UGANDA PILOT OBSERVATION REPORT & RECOMMENDATION
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">1. SANDBOX OPERATIONS REPORT</span>
                <p className="text-[#A7A7A7] text-[11px]">Volume Tested: {deliverables.sandboxOperationsReport.totalVolumeTestedUgx.toLocaleString()} UGX</p>
                <p className="text-[#00B86B] text-[11px]">Success Rate: {deliverables.sandboxOperationsReport.successRatePct}%</p>
                <p className="text-[#00B86B] text-[11px]">Reconciliation: {deliverables.sandboxOperationsReport.reconciliationAccuracyPct}%</p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">2. AI GOVERNANCE REPORT</span>
                <p className="text-[#A7A7A7] text-[11px]">Autonomous Decisions: {deliverables.aiGovernanceReport.autonomousDecisionsCount.toLocaleString()}</p>
                <p className="text-[#E8C879] text-[11px]">Human Interventions: {deliverables.aiGovernanceReport.humanInterventionsCount}</p>
                <p className="text-[#00B86B] text-[11px]">Confidence Score: {deliverables.aiGovernanceReport.confidencePerformanceScore}</p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">3. SECURITY OPERATIONS REPORT</span>
                <p className="text-[#A7A7A7] text-[11px]">Attacks Neutralized: {deliverables.securityOperationsReport.simulatedAttacksNeutralized}</p>
                <p className="text-[#00B86B] text-[11px]">Active Controls: {deliverables.securityOperationsReport.securityControlsActive}</p>
                <p className="text-[#00B86B] text-[11px]">Audit Evidence: {deliverables.securityOperationsReport.auditEvidenceGeneratedPct}%</p>
              </div>
            </div>

            <div className="p-5 bg-[#111111] border border-[#00B86B]/40 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                <span className="text-[#00B86B] font-bold text-sm">FINAL REGULATORY RECOMMENDATION: {deliverables.regulatoryPilotRecommendation}</span>
                <span className="text-[10px] text-[#A7A7A7]">{deliverables.cryptographicSignature}</span>
              </div>
              <p className="text-[#FFFFFF] text-[11px] leading-relaxed">
                {deliverables.recommendationJustification}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
