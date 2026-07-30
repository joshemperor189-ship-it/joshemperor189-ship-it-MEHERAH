import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, ShieldAlert, Cpu, Activity, Play, CheckCircle2, AlertTriangle, 
  RefreshCw, Scale, Landmark, Layers, Network, Zap, Check, X, Sliders, 
  FileText, ShieldCheck, ArrowRight, Eye, Sparkles, Lock, GitBranch, AlertCircle, HelpCircle
} from 'lucide-react';

export interface Scenario {
  id: string;
  title: string;
  category: string;
  description: string;
  proposedBy: string;
  targetRail?: string;
  magnitudeDelta: number;
  parameters: Record<string, any>;
}

export interface GovernanceRecord {
  scenarioId: string;
  scenarioTitle: string;
  analysis: {
    financialImpact: {
      avgCostChangePct: number;
      liquidityShiftUGX: string;
      settlementSpeedDeltaMs: number;
      estimatedMonthlySystemSavingsUGX: string;
    };
    networkImpact: {
      providerConcentrationRiskPct: number;
      gatewayDependency: string;
      systemCongestionRisk: 'LOW' | 'MODERATE' | 'HIGH';
      singlePointOfFailureCreated: boolean;
    };
    inclusionImpact: {
      ruralAccessIndexDelta: number;
      smallBankInclusion: 'BENEFICIAL' | 'NEUTRAL' | 'ADVERSE';
      excludedDemographicsRisk: string;
    };
    riskImpact: {
      fraudExposureChangePct: number;
      regulatoryComplianceScore: number;
      operationalRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    };
    cobraEffect: {
      detected: boolean;
      severity: 'NONE' | 'MILD' | 'SEVERE';
      unintendedConsequenceDescription: string;
      incentiveDistortionWarning?: string;
      suggestedCounterConstraint?: string;
    };
    confidenceScore: number;
    overallRecommendation: 'PROCEED_UNCONDITIONAL' | 'PROCEED_WITH_CONSTRAINTS' | 'REJECT_HIGH_RISK';
    evidenceReferences: string[];
  };
  assumptions: {
    assumption: string;
    verified: boolean;
    evidence: string;
    riskIfUnverified: string;
    verificationSource: string;
  }[];
  evidenceGraph: {
    nodeId: string;
    type: string;
    label: string;
    connections: string[];
  }[];
  governanceStatus: 'PENDING_HUMAN_APPROVAL' | 'APPROVED' | 'MODIFIED' | 'REJECTED';
  humanOperator?: string;
  humanComments?: string;
  decidedAt?: string;
  auditHash: string;
}

export function MeherahSystemImpactSimulatorView() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scen-001');
  const [activeRecord, setActiveRecord] = useState<GovernanceRecord | null>(null);
  const [history, setHistory] = useState<GovernanceRecord[]>([]);

  // Loading & Action States
  const [loadingScenarios, setLoadingScenarios] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isSubmittingDecision, setIsSubmittingDecision] = useState<boolean>(false);

  // Custom Scenario Builder State
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('Increase MTN MoMo liquidity allocation by 30%');
  const [customCategory, setCustomCategory] = useState<string>('LIQUIDITY_BUFFER');
  const [customDescription, setCustomDescription] = useState<string>('Adjust buffer ratios to protect against weekend cash-out spikes');
  const [customDelta, setCustomDelta] = useState<number>(30);
  const [customRail, setCustomRail] = useState<string>('MTN MoMo');

  // Governance Form State
  const [operatorName, setOperatorName] = useState<string>('Governor / Chief Risk Officer');
  const [operatorComments, setOperatorComments] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Active Tab View: 'SIMULATOR' | 'EVIDENCE_GRAPH' | 'HISTORY'
  const [activeTab, setActiveTab] = useState<'SIMULATOR' | 'EVIDENCE_GRAPH' | 'HISTORY'>('SIMULATOR');

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 5000);
  };

  // 1. Fetch Preset Scenarios & History
  const loadSimulatorData = async () => {
    setLoadingScenarios(true);
    try {
      const [scenRes, histRes] = await Promise.all([
        fetch('/api/v1/impact-simulator/scenarios').then(r => r.json()).catch(() => ({ scenarios: [] })),
        fetch('/api/v1/impact-simulator/governance-history').then(r => r.json()).catch(() => ({ history: [] }))
      ]);

      if (scenRes.scenarios) setScenarios(scenRes.scenarios);
      if (histRes.history) setHistory(histRes.history);

      // Auto simulate first scenario
      if (scenRes.scenarios && scenRes.scenarios.length > 0) {
        runSimulation(scenRes.scenarios[0]);
      }
    } catch (err: any) {
      console.error('Failed to load simulator scenarios:', err);
    } finally {
      setLoadingScenarios(false);
    }
  };

  useEffect(() => {
    loadSimulatorData();
  }, []);

  // 2. Trigger Impact Simulation
  const runSimulation = async (scenarioToRun?: Partial<Scenario>) => {
    setIsSimulating(true);
    try {
      let payload = scenarioToRun;
      if (!payload) {
        if (isCustomMode) {
          payload = {
            title: customTitle,
            category: customCategory,
            description: customDescription,
            proposedBy: 'Executive System Operator',
            targetRail: customRail,
            magnitudeDelta: customDelta,
            parameters: { customDelta }
          };
        } else {
          const found = scenarios.find(s => s.id === selectedScenarioId);
          payload = found || scenarios[0];
        }
      }

      const res = await fetch('/api/v1/impact-simulator/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.record) {
        setActiveRecord(data.record);
        // Refresh governance history
        fetch('/api/v1/impact-simulator/governance-history')
          .then(r => r.json())
          .then(h => { if (h.history) setHistory(h.history); });
      }
    } catch (err: any) {
      alert(`Simulation failed: ${err.message}`);
    } finally {
      setIsSimulating(false);
    }
  };

  // 3. Human Governance Gate Action
  const handleGovernanceGate = async (action: 'APPROVE' | 'MODIFY' | 'REJECT') => {
    if (!activeRecord) return;
    setIsSubmittingDecision(true);
    try {
      const res = await fetch('/api/v1/impact-simulator/governance-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: activeRecord.scenarioId,
          action,
          operatorName,
          comments: operatorComments || `Decision (${action}) executed by ${operatorName}`
        })
      });
      const data = await res.json();
      if (data.success && data.record) {
        setActiveRecord(data.record);
        showFeedback(`Governance decision recorded! ZK Audit Hash: ${data.record.auditHash.substring(0, 16)}...`);
        // Refresh history
        fetch('/api/v1/impact-simulator/governance-history')
          .then(r => r.json())
          .then(h => { if (h.history) setHistory(h.history); });
      } else {
        alert(data.error || 'Failed to submit governance gate decision');
      }
    } catch (err: any) {
      alert(`Governance decision failed: ${err.message}`);
    } finally {
      setIsSubmittingDecision(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER BANNER */}
      <div className="p-8 bg-gradient-to-r from-[#080B10] via-[#0E131F] to-[#080B10] border-2 border-[#60A5FA]/40 rounded-3xl space-y-6 shadow-[0_0_40px_rgba(96,165,250,0.12)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center text-[#60A5FA]">
                <Brain size={28} />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#60A5FA] uppercase font-bold block">
                MEHERAH SYSTEM GOVERNANCE MODULE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#FFFFFF]">
                System Impact Simulator
              </h2>
              <p className="text-xs font-mono text-[#94A3B8] mt-1">
                "Think Before The System Acts" — Evaluating second-order effects before execution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => runSimulation()}
              disabled={isSimulating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-[#030712] font-mono font-bold text-xs flex items-center gap-2 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all"
            >
              <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
              <span>{isSimulating ? 'SIMULATING SYSTEM IMPACT...' : 'RUN IMPACT SIMULATION'}</span>
            </button>
          </div>
        </div>

        {/* 5 GOVERNING LAWS DISPLAY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 font-mono text-[11px]">
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#60A5FA] font-bold block">1. Never Assume</span>
            <span className="text-[#94A3B8] text-[10px]">Verify with evidence</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#34D399] font-bold block">2. Explainable</span>
            <span className="text-[#94A3B8] text-[10px]">No black box logic</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#E5C76B] font-bold block">3. Auditable</span>
            <span className="text-[#94A3B8] text-[10px]">Immutable ZK trail</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#A78BFA] font-bold block">4. Learn & Adapt</span>
            <span className="text-[#94A3B8] text-[10px]">Feedback loop</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#F472B6] font-bold block">5. Wider Impact</span>
            <span className="text-[#94A3B8] text-[10px]">Cobra effect guard</span>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-[#06271A] border border-[#10B981] rounded-xl text-[#34D399] font-mono text-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{feedback}</span>
              </div>
              <button onClick={() => setFeedback(null)}>✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TOP NAVIGATION TABS */}
      <div className="flex items-center gap-3 border-b border-[#222222] pb-3 font-mono text-xs font-bold">
        <button
          onClick={() => setActiveTab('SIMULATOR')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'SIMULATOR'
              ? 'bg-[#181818] text-[#60A5FA] border border-[#60A5FA]/40'
              : 'text-[#A7A7A7] hover:text-[#FFFFFF]'
          }`}
        >
          <Sliders size={14} />
          <span>SCENARIO & IMPACT ENGINE</span>
        </button>

        <button
          onClick={() => setActiveTab('EVIDENCE_GRAPH')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'EVIDENCE_GRAPH'
              ? 'bg-[#181818] text-[#E5C76B] border border-[#C8A64D]/40'
              : 'text-[#A7A7A7] hover:text-[#FFFFFF]'
          }`}
        >
          <GitBranch size={14} />
          <span>EVIDENCE GRAPH TRACE</span>
        </button>

        <button
          onClick={() => setActiveTab('HISTORY')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'HISTORY'
              ? 'bg-[#181818] text-[#34D399] border border-[#10B981]/40'
              : 'text-[#A7A7A7] hover:text-[#FFFFFF]'
          }`}
        >
          <FileText size={14} />
          <span>GOVERNANCE HISTORY ({history.length})</span>
        </button>
      </div>

      {/* VIEW 1: SCENARIO BUILDER & IMPACT ENGINE */}
      {activeTab === 'SIMULATOR' && (
        <div className="space-y-8">
          
          {/* SECTION 1: SCENARIO SELECTOR / BUILDER */}
          <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-3xl space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#60A5FA] flex items-center justify-center text-[#60A5FA]">
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">1. Scenario Builder</h3>
                  <p className="text-xs font-mono text-[#94A3B8]">Select a proposed system change or design a custom scenario</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCustomMode(!isCustomMode)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    isCustomMode 
                      ? 'bg-[#3B82F6] text-[#FFFFFF]' 
                      : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#FFFFFF]'
                  }`}
                >
                  {isCustomMode ? '✓ CUSTOM SCENARIO ACTIVE' : '+ CREATE CUSTOM SCENARIO'}
                </button>
              </div>
            </div>

            {/* PRESET SCENARIO CARDS */}
            {!isCustomMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                {scenarios.map((scen) => {
                  const isSelected = selectedScenarioId === scen.id;
                  return (
                    <button
                      key={scen.id}
                      onClick={() => {
                        setSelectedScenarioId(scen.id);
                        runSimulation(scen);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all space-y-3 ${
                        isSelected
                          ? 'bg-[#1E293B] border-[#60A5FA] shadow-lg text-[#FFFFFF]'
                          : 'bg-[#030712] border-[#1E293B] text-[#94A3B8] hover:bg-[#0F172A] hover:text-[#FFFFFF]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#60A5FA] text-[10px] font-bold">
                          {scen.category}
                        </span>
                        <span className="text-[10px] text-[#64748B]">{scen.id}</span>
                      </div>
                      <strong className="text-sm font-sans font-bold text-[#FFFFFF] block">{scen.title}</strong>
                      <p className="text-[11px] text-[#94A3B8] line-clamp-2">{scen.description}</p>
                      <div className="pt-2 border-t border-[#1E293B] flex justify-between text-[10px] text-[#64748B]">
                        <span>Target: <strong className="text-[#E2E8F0]">{scen.targetRail}</strong></span>
                        <span className="text-[#60A5FA] font-bold">{scen.magnitudeDelta > 0 ? `+${scen.magnitudeDelta}%` : `${scen.magnitudeDelta}%`}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* CUSTOM SCENARIO FORM */
              <div className="p-6 bg-[#030712] border border-[#3B82F6]/40 rounded-2xl space-y-4 font-mono text-xs">
                <h4 className="text-sm font-bold text-[#60A5FA]">Design Custom System Parameter Adjustment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#94A3B8]">Scenario Title</label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#1E293B] text-[#FFFFFF] p-2.5 rounded-xl outline-none focus:border-[#60A5FA]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#94A3B8]">Category</label>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#1E293B] text-[#FFFFFF] p-2.5 rounded-xl outline-none focus:border-[#60A5FA]"
                    >
                      <option value="ROUTING_PREFERENCE">ROUTING_PREFERENCE</option>
                      <option value="FEE_STRUCTURE">FEE_STRUCTURE</option>
                      <option value="GATEWAY_ADDITION">GATEWAY_ADDITION</option>
                      <option value="FRAUD_THRESHOLD">FRAUD_THRESHOLD</option>
                      <option value="LIQUIDITY_BUFFER">LIQUIDITY_BUFFER</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#94A3B8]">Target Rail / Provider</label>
                    <input
                      type="text"
                      value={customRail}
                      onChange={(e) => setCustomRail(e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#1E293B] text-[#FFFFFF] p-2.5 rounded-xl outline-none focus:border-[#60A5FA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#94A3B8]">Description</label>
                    <input
                      type="text"
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#1E293B] text-[#FFFFFF] p-2.5 rounded-xl outline-none focus:border-[#60A5FA]"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-[#94A3B8]">Magnitude Delta</label>
                      <span className="text-[#60A5FA] font-bold">{customDelta}%</span>
                    </div>
                    <input
                      type="range"
                      min={-50}
                      max={100}
                      value={customDelta}
                      onChange={(e) => setCustomDelta(Number(e.target.value))}
                      className="w-full accent-[#3B82F6]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => runSimulation()}
                    disabled={isSimulating}
                    className="px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-[#FFFFFF] font-bold rounded-xl flex items-center gap-2"
                  >
                    <Play size={14} />
                    <span>SIMULATE CUSTOM SCENARIO</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: COBRA EFFECT & SYSTEMIC IMPACT ANALYSIS ENGINE */}
          {activeRecord && (
            <div className="space-y-6">
              
              {/* COBRA EFFECT WARNING BANNER */}
              <div className={`p-6 rounded-3xl border-2 space-y-4 transition-all shadow-xl ${
                activeRecord.analysis.cobraEffect.severity === 'SEVERE'
                  ? 'bg-[#1F0707] border-[#EF4444] text-[#F87171]'
                  : activeRecord.analysis.cobraEffect.severity === 'MILD'
                  ? 'bg-[#1C1305] border-[#F59E0B] text-[#FBBF24]'
                  : 'bg-[#062016] border-[#10B981] text-[#34D399]'
              }`}>
                <div className="flex items-center justify-between border-b border-current/20 pb-3 font-mono">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={24} className="animate-pulse" />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                        BEHAVIOURAL IMPACT & COBRA EFFECT DETECTION ENGINE
                      </span>
                      <h4 className="text-lg font-bold font-serif text-[#FFFFFF]">
                        {activeRecord.analysis.cobraEffect.detected
                          ? `⚠️ Cobra Effect Detected (${activeRecord.analysis.cobraEffect.severity} Risk)`
                          : '✓ Zero Systemic Incentive Distortion Detected'}
                      </h4>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-black/40 border border-current">
                    Confidence: {activeRecord.analysis.confidenceScore}%
                  </span>
                </div>

                <p className="text-xs font-mono leading-relaxed text-[#FFFFFF]">
                  {activeRecord.analysis.cobraEffect.unintendedConsequenceDescription}
                </p>

                {activeRecord.analysis.cobraEffect.incentiveDistortionWarning && (
                  <div className="p-4 bg-black/50 rounded-2xl border border-current/30 font-mono text-xs space-y-1">
                    <strong className="block text-[#FFFFFF] font-bold">Unintended Second-Order Risk:</strong>
                    <p className="opacity-90">{activeRecord.analysis.cobraEffect.incentiveDistortionWarning}</p>
                  </div>
                )}

                {activeRecord.analysis.cobraEffect.suggestedCounterConstraint && (
                  <div className="p-4 bg-black/60 rounded-2xl border border-current/40 font-mono text-xs space-y-1">
                    <strong className="block text-[#FFFFFF] font-bold">Suggested AI Counter-Constraint:</strong>
                    <p className="text-[#34D399]">{activeRecord.analysis.cobraEffect.suggestedCounterConstraint}</p>
                  </div>
                )}
              </div>

              {/* 4 IMPACT VECTORS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
                
                {/* V1: FINANCIAL IMPACT */}
                <div className="p-5 bg-[#0B0F19] border border-[#1E293B] rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 text-[#60A5FA]">
                    <Landmark size={18} />
                    <strong className="font-sans font-bold">Financial Impact</strong>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Avg Transaction Fee:</span>
                      <strong className={activeRecord.analysis.financialImpact.avgCostChangePct <= 0 ? 'text-[#34D399]' : 'text-[#EF4444]'}>
                        {activeRecord.analysis.financialImpact.avgCostChangePct}%
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Liquidity Movement:</span>
                      <strong className="text-[#E2E8F0]">{activeRecord.analysis.financialImpact.liquidityShiftUGX} UGX</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Settlement Speed:</span>
                      <strong className="text-[#34D399]">{activeRecord.analysis.financialImpact.settlementSpeedDeltaMs} ms</strong>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-[#1E293B]">
                      <span className="text-[#94A3B8]">Est. System Savings:</span>
                      <strong className="text-[#E5C76B]">UGX {activeRecord.analysis.financialImpact.estimatedMonthlySystemSavingsUGX}/mo</strong>
                    </div>
                  </div>
                </div>

                {/* V2: NETWORK IMPACT */}
                <div className="p-5 bg-[#0B0F19] border border-[#1E293B] rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 text-[#A78BFA]">
                    <Network size={18} />
                    <strong className="font-sans font-bold">Network & Gateway Impact</strong>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Concentration Risk:</span>
                      <strong className={activeRecord.analysis.networkImpact.providerConcentrationRiskPct > 70 ? 'text-[#EF4444]' : 'text-[#34D399]'}>
                        {activeRecord.analysis.networkImpact.providerConcentrationRiskPct}%
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Congestion Index:</span>
                      <strong className="text-[#E2E8F0]">{activeRecord.analysis.networkImpact.systemCongestionRisk}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Single Failure Point:</span>
                      <strong className={activeRecord.analysis.networkImpact.singlePointOfFailureCreated ? 'text-[#EF4444]' : 'text-[#34D399]'}>
                        {activeRecord.analysis.networkImpact.singlePointOfFailureCreated ? '⚠️ CREATED' : '✓ NONE'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* V3: INCLUSION IMPACT */}
                <div className="p-5 bg-[#0B0F19] border border-[#1E293B] rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 text-[#34D399]">
                    <Sparkles size={18} />
                    <strong className="font-sans font-bold">Inclusion Impact</strong>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Rural Access Delta:</span>
                      <strong className="text-[#34D399]">+{activeRecord.analysis.inclusionImpact.ruralAccessIndexDelta}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Small Bank Inclusion:</span>
                      <strong className="text-[#E2E8F0]">{activeRecord.analysis.inclusionImpact.smallBankInclusion}</strong>
                    </div>
                    <p className="text-[10px] text-[#94A3B8] pt-1 border-t border-[#1E293B]">
                      {activeRecord.analysis.inclusionImpact.excludedDemographicsRisk}
                    </p>
                  </div>
                </div>

                {/* V4: RISK & COMPLIANCE */}
                <div className="p-5 bg-[#0B0F19] border border-[#1E293B] rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 text-[#F472B6]">
                    <Scale size={18} />
                    <strong className="font-sans font-bold">Risk & Regulatory Compliance</strong>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Fraud Exposure Delta:</span>
                      <strong className="text-[#34D399]">{activeRecord.analysis.riskImpact.fraudExposureChangePct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">BOU Compliance Score:</span>
                      <strong className="text-[#E5C76B]">{activeRecord.analysis.riskImpact.regulatoryComplianceScore}/100</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Operational Risk:</span>
                      <strong className="text-[#E2E8F0]">{activeRecord.analysis.riskImpact.operationalRiskLevel}</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* SECTION 3: ASSUMPTIONS ENGINE VERIFICATION TABLE */}
              <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-3xl space-y-4 font-mono text-xs shadow-xl">
                <div className="flex justify-between items-center border-b border-[#1E293B] pb-3">
                  <h4 className="text-sm font-bold font-serif text-[#FFFFFF] flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#34D399]" />
                    <span>Assumptions Engine Verification ("Never Assume")</span>
                  </h4>
                  <span className="text-[10px] text-[#94A3B8]">
                    {activeRecord.assumptions.filter(a => a.verified).length} / {activeRecord.assumptions.length} Verified
                  </span>
                </div>

                <div className="divide-y divide-[#1E293B]">
                  {activeRecord.assumptions.map((a, idx) => (
                    <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <strong className="text-[#FFFFFF] block">{a.assumption}</strong>
                        <span className="text-[10px] text-[#94A3B8]">Evidence: {a.evidence} ({a.verificationSource})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.verified ? 'bg-[#06271A] text-[#34D399]' : 'bg-[#270606] text-[#F87171]'
                        }`}>
                          {a.verified ? '✓ VERIFIED' : '⚠️ UNVERIFIED'}
                        </span>
                        <span className="text-[10px] text-[#64748B]">Risk if wrong: {a.riskIfUnverified}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: HUMAN GOVERNANCE GATE */}
              <div className="p-6 bg-[#0B0F19] border-2 border-[#60A5FA]/40 rounded-3xl space-y-6 font-mono text-xs shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#60A5FA] flex items-center justify-center text-[#60A5FA]">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-serif text-[#FFFFFF]">Human Governance Gate</h4>
                      <p className="text-[11px] text-[#94A3B8]">High-impact decisions require explicit executive approval before execution</p>
                    </div>
                  </div>

                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                    activeRecord.governanceStatus === 'APPROVED' ? 'bg-[#06271A] border-[#10B981] text-[#34D399]' :
                    activeRecord.governanceStatus === 'REJECTED' ? 'bg-[#270606] border-[#EF4444] text-[#F87171]' :
                    'bg-[#1C1305] border-[#F59E0B] text-[#FBBF24]'
                  }`}>
                    STATUS: {activeRecord.governanceStatus}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#94A3B8]">Authorizing Executive / Operator Name</label>
                    <input
                      type="text"
                      value={operatorName}
                      onChange={(e) => setOperatorName(e.target.value)}
                      className="w-full bg-[#030712] border border-[#1E293B] text-[#FFFFFF] p-2.5 rounded-xl outline-none focus:border-[#60A5FA]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#94A3B8]">Governance Decision Comments</label>
                    <input
                      type="text"
                      placeholder="Add executive rationale or counter-constraint instructions..."
                      value={operatorComments}
                      onChange={(e) => setOperatorComments(e.target.value)}
                      className="w-full bg-[#030712] border border-[#1E293B] text-[#FFFFFF] p-2.5 rounded-xl outline-none focus:border-[#60A5FA]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-end pt-2">
                  <button
                    onClick={() => handleGovernanceGate('REJECT')}
                    disabled={isSubmittingDecision}
                    className="px-5 py-2.5 rounded-xl bg-[#270606] hover:bg-[#3D0A0A] text-[#F87171] border border-[#EF4444]/40 font-bold flex items-center gap-2 transition-all"
                  >
                    <X size={16} />
                    <span>REJECT PROPOSAL</span>
                  </button>

                  <button
                    onClick={() => handleGovernanceGate('MODIFY')}
                    disabled={isSubmittingDecision}
                    className="px-5 py-2.5 rounded-xl bg-[#1C1305] hover:bg-[#2D1F08] text-[#FBBF24] border border-[#F59E0B]/40 font-bold flex items-center gap-2 transition-all"
                  >
                    <Sliders size={16} />
                    <span>APPROVE WITH CONSTRAINTS</span>
                  </button>

                  <button
                    onClick={() => handleGovernanceGate('APPROVE')}
                    disabled={isSubmittingDecision}
                    className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#000000] font-bold flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Check size={16} />
                    <span>APPROVE & EXECUTE</span>
                  </button>
                </div>

                <div className="p-3 bg-[#030712] rounded-xl border border-[#1E293B] flex justify-between items-center text-[10px] text-[#64748B]">
                  <span>Cryptographic ZK Verification Hash:</span>
                  <span className="text-[#60A5FA] font-mono">{activeRecord.auditHash}</span>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* VIEW 2: EVIDENCE GRAPH TRACE */}
      {activeTab === 'EVIDENCE_GRAPH' && activeRecord && (
        <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-3xl space-y-6 font-mono text-xs shadow-xl">
          <div className="border-b border-[#1E293B] pb-4">
            <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">MEHERAH Evidence Graph</h3>
            <p className="text-xs text-[#94A3B8]">Traceable graph linking proposal, evidence, Cobra detection, and decision</p>
          </div>

          <div className="space-y-4">
            {activeRecord.evidenceGraph.map((node, idx) => (
              <div key={idx} className="p-4 bg-[#030712] border border-[#1E293B] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#3B82F6]/20 text-[#60A5FA] flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] text-[#64748B] block uppercase font-bold">{node.type}</span>
                    <strong className="text-sm text-[#E2E8F0] font-sans">{node.label}</strong>
                  </div>
                </div>

                {node.connections.length > 0 && (
                  <div className="text-[10px] text-[#60A5FA] flex items-center gap-1">
                    <span>Flows to:</span>
                    <strong>{node.connections.join(', ')}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: HISTORICAL GOVERNANCE DECISIONS */}
      {activeTab === 'HISTORY' && (
        <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-3xl space-y-6 font-mono text-xs shadow-xl">
          <div className="flex justify-between items-center border-b border-[#1E293B] pb-4">
            <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">Immutable Governance Decision Log</h3>
            <span className="text-xs text-[#34D399] font-bold">{history.length} Decision Records</span>
          </div>

          {history.length === 0 ? (
            <div className="p-8 text-center bg-[#030712] border border-[#1E293B] rounded-2xl text-[#64748B]">
              No governance decisions recorded yet. Run a simulation and execute a governance gate decision.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#030712] text-[#64748B] border-b border-[#1E293B] uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Scenario</th>
                    <th className="p-4">Confidence</th>
                    <th className="p-4">Cobra Risk</th>
                    <th className="p-4">Governance Status</th>
                    <th className="p-4">Operator</th>
                    <th className="p-4 text-right">Audit Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B] text-[#E2E8F0]">
                  {history.map((rec, idx) => (
                    <tr key={idx} className="hover:bg-[#030712]">
                      <td className="p-4 font-bold font-sans">{rec.scenarioTitle}</td>
                      <td className="p-4 text-[#60A5FA]">{rec.analysis.confidenceScore}%</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rec.analysis.cobraEffect.severity === 'SEVERE' ? 'bg-[#270606] text-[#F87171]' :
                          rec.analysis.cobraEffect.severity === 'MILD' ? 'bg-[#1C1305] text-[#FBBF24]' :
                          'bg-[#06271A] text-[#34D399]'
                        }`}>
                          {rec.analysis.cobraEffect.severity}
                        </span>
                      </td>
                      <td className="p-4 font-bold">{rec.governanceStatus}</td>
                      <td className="p-4 text-[#94A3B8]">{rec.humanOperator || 'System'}</td>
                      <td className="p-4 text-right text-[10px] text-[#60A5FA] truncate max-w-[120px]">{rec.auditHash.substring(0, 14)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
