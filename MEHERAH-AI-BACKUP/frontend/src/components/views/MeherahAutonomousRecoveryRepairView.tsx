import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Stethoscope, Wrench, CheckCircle2, AlertTriangle, 
  RefreshCw, Activity, Cpu, Server, Database, Network, Zap, 
  Lock, Check, X, Sliders, FileText, Sparkles, Flame, Eye, ArrowRight, Brain
} from 'lucide-react';

export interface HealthSentinelData {
  appHealth: {
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    frontendErrorRate: string;
    routeAvailabilityPct: number;
    failedComponentsCount: number;
    renderingLatencyMs: number;
  };
  infrastructureHealth: {
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    serverStatus: string;
    databaseConnection: string;
    memoryUsagePct: number;
    cpuLoadPct: number;
    serviceAvailabilityPct: number;
  };
  financialNetworkHealth: {
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    paymentProviderAvailabilityPct: number;
    avgGatewayLatencyMs: number;
    settlementFailureRatePct: number;
    liquidityBufferStatus: string;
  };
  overallStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  lastUpdated: string;
}

export interface IncidentDiagnostic {
  incidentId: string;
  title: string;
  category: 'APP_FRONTEND' | 'INFRASTRUCTURE' | 'PAYMENT_NETWORK' | 'DATABASE_CORE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedAt: string;
  symptoms: string[];
  evidenceGathered: string[];
  investigationSteps: string[];
  rootCause: string;
  rootCauseConfidencePct: number;
}

export interface RepairProposal {
  repairId: string;
  incidentId: string;
  title: string;
  proposedAction: string;
  affectedComponents: string[];
  riskAssessment: 'LOW' | 'MEDIUM' | 'HIGH';
  expectedResult: string;
  automatedRollbackGuarantee: boolean;
  governanceRequired: boolean;
}

export interface RepairVerificationResult {
  verified: boolean;
  beforeState: string;
  afterState: string;
  testsPassed: string[];
  verificationTimestamp: string;
  auditHash: string;
}

export interface RepairMemoryRecord {
  repairId: string;
  incidentId: string;
  title: string;
  rootCause: string;
  repairApplied: string;
  governanceOperator: string;
  resolutionTimeSeconds: number;
  verificationPassed: boolean;
  learnedRule: string;
  timestamp: string;
  auditHash: string;
}

export function MeherahAutonomousRecoveryRepairView() {
  const [sentinel, setSentinel] = useState<HealthSentinelData | null>(null);
  const [activeIncident, setActiveIncident] = useState<IncidentDiagnostic | null>(null);
  const [activeRepairPlan, setActiveRepairPlan] = useState<RepairProposal | null>(null);
  const [verificationResult, setVerificationResult] = useState<RepairVerificationResult | null>(null);
  const [repairMemory, setRepairMemory] = useState<RepairMemoryRecord[]>([]);

  // UI state
  const [loading, setLoading] = useState<boolean>(true);
  const [isInjectingChaos, setIsInjectingChaos] = useState<boolean>(false);
  const [isExecutingRepair, setIsExecutingRepair] = useState<boolean>(false);
  const [operatorName, setOperatorName] = useState<string>('Chief Risk Officer / Executive Doctor');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Active Tab View: 'CENTRE' | 'REPAIR_MEMORY'
  const [activeTab, setActiveTab] = useState<'CENTRE' | 'REPAIR_MEMORY'>('CENTRE');

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 5000);
  };

  const fetchSentinelData = async () => {
    try {
      const res = await fetch('/api/v1/recovery-repair/sentinel');
      const data = await res.json();
      if (data.success) {
        setSentinel(data.sentinel);
        setActiveIncident(data.activeIncident);
        setActiveRepairPlan(data.activeRepairPlan);
        setVerificationResult(data.activeVerification);
      }
    } catch (err) {
      console.error('Failed to fetch health sentinel data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepairMemory = async () => {
    try {
      const res = await fetch('/api/v1/recovery-repair/memory');
      const data = await res.json();
      if (data.success) {
        setRepairMemory(data.memory);
      }
    } catch (err) {
      console.error('Failed to fetch repair memory:', err);
    }
  };

  useEffect(() => {
    fetchSentinelData();
    fetchRepairMemory();
    const interval = setInterval(fetchSentinelData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Inject Chaos Test Failure
  const handleInjectChaos = async (failureType: 'ADMIN_BLANK_SCREEN' | 'GATEWAY_TIMEOUT' | 'DATABASE_POOL_EXHAUSTED') => {
    setIsInjectingChaos(true);
    try {
      const res = await fetch('/api/v1/recovery-repair/inject-chaos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ failureType })
      });
      const data = await res.json();
      if (data.success) {
        setActiveIncident(data.incident);
        setActiveRepairPlan(data.repairPlan);
        setVerificationResult(null);
        showFeedback(`Test chaos failure (${failureType}) injected into sentinel! Doctor Agent diagnosed root cause.`);
        fetchSentinelData();
      }
    } catch (err: any) {
      alert(`Chaos injection failed: ${err.message}`);
    } finally {
      setIsInjectingChaos(false);
    }
  };

  // Execute Repair with Human Governance
  const handleExecuteRepair = async (action: 'APPROVE' | 'MODIFY' | 'REJECT') => {
    if (!activeRepairPlan) return;
    setIsExecutingRepair(true);
    try {
      const res = await fetch('/api/v1/recovery-repair/governance-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repairId: activeRepairPlan.repairId,
          operatorName,
          action
        })
      });
      const data = await res.json();
      if (data.success) {
        setVerificationResult(data.verification || null);
        setActiveIncident(null);
        setActiveRepairPlan(null);
        showFeedback(data.message);
        fetchSentinelData();
        fetchRepairMemory();
      } else {
        alert(data.error || 'Failed to execute repair action');
      }
    } catch (err: any) {
      alert(`Repair execution failed: ${err.message}`);
    } finally {
      setIsExecutingRepair(false);
    }
  };

  const getStatusBadge = (status?: 'HEALTHY' | 'WARNING' | 'CRITICAL') => {
    if (status === 'HEALTHY') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#06271A] text-[#34D399] border border-[#10B981]/40 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          🟢 HEALTHY
        </span>
      );
    }
    if (status === 'WARNING') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#1C1305] text-[#FBBF24] border border-[#F59E0B]/40 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></span>
          🟡 WARNING
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#270606] text-[#F87171] border border-[#EF4444]/40 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
        🔴 CRITICAL
      </span>
    );
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER BANNER */}
      <div className="p-8 bg-gradient-to-r from-[#070A11] via-[#0D1527] to-[#070A11] border-2 border-[#10B981]/40 rounded-3xl space-y-6 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center text-[#34D399]">
                <Stethoscope size={28} />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#34D399] uppercase font-bold block">
                AUTONOMOUS SYSTEM RESILIENCE MODULE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#FFFFFF]">
                Autonomous Recovery & Repair Centre
              </h2>
              <p className="text-xs font-mono text-[#94A3B8] mt-1">
                "Detect. Understand. Recommend. Repair. Verify." — Self-healing infrastructure with executive governance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(sentinel?.overallStatus)}
          </div>
        </div>

        {/* 5-STEP RECOVERY LIFECYCLE INDICATOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 font-mono text-[11px]">
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#60A5FA] font-bold block">1. Detect</span>
            <span className="text-[#94A3B8] text-[10px]">Health Sentinel</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#A78BFA] font-bold block">2. Diagnose</span>
            <span className="text-[#94A3B8] text-[10px]">Root Cause Agent</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#E5C76B] font-bold block">3. Recommend</span>
            <span className="text-[#94A3B8] text-[10px]">Repair Planner</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#F472B6] font-bold block">4. Approve</span>
            <span className="text-[#94A3B8] text-[10px]">Human Gate</span>
          </div>
          <div className="p-3 bg-[#030712]/80 border border-[#1E293B] rounded-xl text-center space-y-0.5">
            <span className="text-[#34D399] font-bold block">5. Verify & Learn</span>
            <span className="text-[#94A3B8] text-[10px]">Proof & Memory</span>
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
          onClick={() => setActiveTab('CENTRE')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'CENTRE'
              ? 'bg-[#181818] text-[#34D399] border border-[#10B981]/40'
              : 'text-[#A7A7A7] hover:text-[#FFFFFF]'
          }`}
        >
          <Activity size={14} />
          <span>LIVE RECOVERY CENTRE</span>
        </button>

        <button
          onClick={() => setActiveTab('REPAIR_MEMORY')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'REPAIR_MEMORY'
              ? 'bg-[#181818] text-[#60A5FA] border border-[#60A5FA]/40'
              : 'text-[#A7A7A7] hover:text-[#FFFFFF]'
          }`}
        >
          <Brain size={14} />
          <span>REPAIR MEMORY & LEARNING LOG ({repairMemory.length})</span>
        </button>
      </div>

      {activeTab === 'CENTRE' && (
        <div className="space-y-8">
          
          {/* SECTION 1: HEALTH SENTINEL MONITORING GRID */}
          {sentinel && (
            <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-3xl space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#34D399] flex items-center justify-center text-[#34D399]">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">1. Health Sentinel Telemetry</h3>
                    <p className="text-xs font-mono text-[#94A3B8]">Continuous 24/7 monitoring across Application, Infrastructure, and Financial Network layers</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#64748B]">
                  Last Telemetry Pulse: {new Date(sentinel.lastUpdated).toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                
                {/* CARD 1: APP HEALTH */}
                <div className={`p-5 rounded-2xl border space-y-3 transition-all ${
                  sentinel.appHealth.status === 'CRITICAL' 
                    ? 'bg-[#270606] border-[#EF4444] text-[#F87171]' 
                    : 'bg-[#030712] border-[#1E293B] text-[#FFFFFF]'
                }`}>
                  <div className="flex justify-between items-center border-b border-current/20 pb-2">
                    <strong className="font-sans font-bold flex items-center gap-2">
                      <Cpu size={16} className="text-[#60A5FA]" />
                      <span>Application Layer</span>
                    </strong>
                    {getStatusBadge(sentinel.appHealth.status)}
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Frontend Error Rate:</span>
                      <strong className={sentinel.appHealth.failedComponentsCount > 0 ? 'text-[#EF4444]' : 'text-[#34D399]'}>
                        {sentinel.appHealth.frontendErrorRate}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Route Availability:</span>
                      <strong className="text-[#E2E8F0]">{sentinel.appHealth.routeAvailabilityPct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Failed Components:</span>
                      <strong className={sentinel.appHealth.failedComponentsCount > 0 ? 'text-[#EF4444]' : 'text-[#34D399]'}>
                        {sentinel.appHealth.failedComponentsCount}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Render Latency:</span>
                      <strong className="text-[#E2E8F0]">{sentinel.appHealth.renderingLatencyMs} ms</strong>
                    </div>
                  </div>
                </div>

                {/* CARD 2: INFRASTRUCTURE HEALTH */}
                <div className={`p-5 rounded-2xl border space-y-3 transition-all ${
                  sentinel.infrastructureHealth.status === 'WARNING' 
                    ? 'bg-[#1C1305] border-[#F59E0B] text-[#FBBF24]' 
                    : 'bg-[#030712] border-[#1E293B] text-[#FFFFFF]'
                }`}>
                  <div className="flex justify-between items-center border-b border-current/20 pb-2">
                    <strong className="font-sans font-bold flex items-center gap-2">
                      <Server size={16} className="text-[#E5C76B]" />
                      <span>Infrastructure Layer</span>
                    </strong>
                    {getStatusBadge(sentinel.infrastructureHealth.status)}
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Server Status:</span>
                      <strong className="text-[#34D399]">{sentinel.infrastructureHealth.serverStatus}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Database Connection:</span>
                      <strong className="text-[#E2E8F0]">{sentinel.infrastructureHealth.databaseConnection}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Memory / CPU Load:</span>
                      <strong className="text-[#E5C76B]">{sentinel.infrastructureHealth.memoryUsagePct}% RAM | {sentinel.infrastructureHealth.cpuLoadPct}% CPU</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Service Uptime:</span>
                      <strong className="text-[#34D399]">{sentinel.infrastructureHealth.serviceAvailabilityPct}%</strong>
                    </div>
                  </div>
                </div>

                {/* CARD 3: FINANCIAL NETWORK HEALTH */}
                <div className={`p-5 rounded-2xl border space-y-3 transition-all ${
                  sentinel.financialNetworkHealth.status === 'CRITICAL' 
                    ? 'bg-[#270606] border-[#EF4444] text-[#F87171]' 
                    : 'bg-[#030712] border-[#1E293B] text-[#FFFFFF]'
                }`}>
                  <div className="flex justify-between items-center border-b border-current/20 pb-2">
                    <strong className="font-sans font-bold flex items-center gap-2">
                      <Network size={16} className="text-[#34D399]" />
                      <span>Financial Network Layer</span>
                    </strong>
                    {getStatusBadge(sentinel.financialNetworkHealth.status)}
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Provider Availability:</span>
                      <strong className="text-[#E2E8F0]">{sentinel.financialNetworkHealth.paymentProviderAvailabilityPct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Gateway Latency:</span>
                      <strong className={sentinel.financialNetworkHealth.avgGatewayLatencyMs > 1000 ? 'text-[#EF4444]' : 'text-[#34D399]'}>
                        {sentinel.financialNetworkHealth.avgGatewayLatencyMs} ms
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Settlement Failures:</span>
                      <strong className={sentinel.financialNetworkHealth.settlementFailureRatePct > 0 ? 'text-[#EF4444]' : 'text-[#34D399]'}>
                        {sentinel.financialNetworkHealth.settlementFailureRatePct}%
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Liquidity Reserve:</span>
                      <strong className="text-[#34D399]">{sentinel.financialNetworkHealth.liquidityBufferStatus}</strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SECTION 2: INTENTIONAL CHAOS INJECTOR (INTERACTIVE DEMO TEST) */}
          <div className="p-6 bg-[#030712] border border-[#1E293B] rounded-3xl space-y-4 font-mono text-xs shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2 text-[#EF4444]">
                <Flame size={20} className="animate-pulse" />
                <h4 className="text-sm font-bold font-serif text-[#FFFFFF]">Interactive Chaos Failure Injector</h4>
              </div>
              <span className="text-[10px] text-[#94A3B8]">
                Intentionally break a safe demo subsystem to test the autonomous recovery loop
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleInjectChaos('ADMIN_BLANK_SCREEN')}
                disabled={isInjectingChaos}
                className="p-3 bg-[#111827] hover:bg-[#1E293B] border border-[#EF4444]/40 rounded-xl text-left space-y-1 group transition-all"
              >
                <div className="flex justify-between items-center text-[#F87171] font-bold">
                  <span>1. App Component Crash</span>
                  <AlertTriangle size={14} />
                </div>
                <p className="text-[10px] text-[#94A3B8]">Inject Admin Dashboard permissions undefined error</p>
              </button>

              <button
                onClick={() => handleInjectChaos('GATEWAY_TIMEOUT')}
                disabled={isInjectingChaos}
                className="p-3 bg-[#111827] hover:bg-[#1E293B] border border-[#F59E0B]/40 rounded-xl text-left space-y-1 group transition-all"
              >
                <div className="flex justify-between items-center text-[#FBBF24] font-bold">
                  <span>2. Gateway Latency Timeout</span>
                  <Zap size={14} />
                </div>
                <p className="text-[10px] text-[#94A3B8]">Spike MNO Gateway socket delay to 4,200ms</p>
              </button>

              <button
                onClick={() => handleInjectChaos('DATABASE_POOL_EXHAUSTED')}
                disabled={isInjectingChaos}
                className="p-3 bg-[#111827] hover:bg-[#1E293B] border border-[#3B82F6]/40 rounded-xl text-left space-y-1 group transition-all"
              >
                <div className="flex justify-between items-center text-[#60A5FA] font-bold">
                  <span>3. DB Pool Starvation</span>
                  <Database size={14} />
                </div>
                <p className="text-[10px] text-[#94A3B8]">Exhaust Prisma DB connection pool to 50/50</p>
              </button>
            </div>
          </div>

          {/* SECTION 3: DIAGNOSIS AGENT (THE DOCTOR) */}
          {activeIncident && (
            <div className="p-6 bg-[#0B0F19] border-2 border-[#A78BFA]/50 rounded-3xl space-y-6 font-mono text-xs shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#A78BFA] flex items-center justify-center text-[#A78BFA]">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-widest block">
                      2. DIAGNOSIS AGENT (ROOT CAUSE ANALYSIS)
                    </span>
                    <h4 className="text-base font-bold font-serif text-[#FFFFFF]">{activeIncident.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1F0707] text-[#F87171] border border-[#EF4444] text-xs font-bold">
                    Severity: {activeIncident.severity}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/40 text-xs font-bold">
                    Confidence: {activeIncident.rootCauseConfidencePct}%
                  </span>
                </div>
              </div>

              {/* ROOT CAUSE FINDING BANNER */}
              <div className="p-4 bg-[#030712] border border-[#A78BFA]/40 rounded-2xl space-y-2">
                <strong className="text-[#A78BFA] font-bold block uppercase text-[10px]">
                  Root Cause Diagnosis Finding:
                </strong>
                <p className="text-sm font-sans font-bold text-[#FFFFFF] leading-relaxed">
                  "{activeIncident.rootCause}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SYMPTOMS & EVIDENCE */}
                <div className="p-4 bg-[#030712] border border-[#1E293B] rounded-2xl space-y-2">
                  <strong className="text-[#FFFFFF] font-bold block">Symptoms Detected:</strong>
                  <ul className="space-y-1 text-[#94A3B8] text-[11px] list-disc list-inside">
                    {activeIncident.symptoms.map((sym, i) => (
                      <li key={i}>{sym}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#030712] border border-[#1E293B] rounded-2xl space-y-2">
                  <strong className="text-[#34D399] font-bold block">Evidence Gathered ("Never Assume"):</strong>
                  <ul className="space-y-1 text-[#94A3B8] text-[11px] list-disc list-inside">
                    {activeIncident.evidenceGathered.map((ev, i) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: REPAIR PLANNER & HUMAN GOVERNANCE GATE */}
          {activeRepairPlan && (
            <div className="p-6 bg-[#0B0F19] border-2 border-[#10B981]/50 rounded-3xl space-y-6 font-mono text-xs shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#10B981] flex items-center justify-center text-[#34D399]">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#34D399] tracking-widest block">
                      3 & 4. REPAIR PLANNER & GOVERNANCE GATE
                    </span>
                    <h4 className="text-base font-bold font-serif text-[#FFFFFF]">{activeRepairPlan.title}</h4>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#06271A] text-[#34D399] border border-[#10B981] text-xs font-bold">
                  Risk Level: {activeRepairPlan.riskAssessment}
                </span>
              </div>

              <div className="space-y-3 p-4 bg-[#030712] border border-[#1E293B] rounded-2xl">
                <div>
                  <strong className="text-[#94A3B8] block text-[10px]">Proposed Repair Action:</strong>
                  <p className="text-xs text-[#E2E8F0] font-bold mt-1">{activeRepairPlan.proposedAction}</p>
                </div>
                <div>
                  <strong className="text-[#94A3B8] block text-[10px]">Expected Functional Result:</strong>
                  <p className="text-xs text-[#34D399] mt-0.5">{activeRepairPlan.expectedResult}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#64748B] pt-2 border-t border-[#1E293B]">
                  <span>Affected Components: {activeRepairPlan.affectedComponents.join(', ')}</span>
                  <span>Automated Rollback Guarantee: ✓ ACTIVE</span>
                </div>
              </div>

              {/* EXECUTIVE AUTHORIZATION FORM */}
              <div className="p-4 bg-[#030712] border border-[#10B981]/40 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <label className="text-[#94A3B8]">Executive Authorizer Name</label>
                  <input
                    type="text"
                    value={operatorName}
                    onChange={(e) => setOperatorName(e.target.value)}
                    className="w-full bg-[#0F172A] border border-[#1E293B] text-[#FFFFFF] p-2.5 rounded-xl outline-none focus:border-[#10B981]"
                  />
                </div>

                <div className="flex flex-wrap gap-3 justify-end">
                  <button
                    onClick={() => handleExecuteRepair('REJECT')}
                    disabled={isExecutingRepair}
                    className="px-5 py-2.5 rounded-xl bg-[#270606] hover:bg-[#3D0A0A] text-[#F87171] border border-[#EF4444]/40 font-bold flex items-center gap-2 transition-all"
                  >
                    <X size={16} />
                    <span>REJECT REPAIR</span>
                  </button>

                  <button
                    onClick={() => handleExecuteRepair('APPROVE')}
                    disabled={isExecutingRepair}
                    className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#000000] font-bold flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Check size={16} />
                    <span>AUTHORIZE & EXECUTE REPAIR</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: VERIFICATION AGENT PROOF OUTPUT */}
          {verificationResult && (
            <div className="p-6 bg-[#06271A] border-2 border-[#10B981] rounded-3xl space-y-6 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#10B981]/30 pb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-[#34D399]" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#34D399] tracking-widest block">
                      5. VERIFICATION AGENT PROOF ("VERIFY WITH EVIDENCE")
                    </span>
                    <h4 className="text-base font-bold font-serif text-[#FFFFFF]">Repair Execution & Evidence Verified</h4>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-black/40 text-[#34D399] border border-[#10B981] text-xs font-bold">
                  VERIFIED 100%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-black/50 rounded-2xl border border-[#10B981]/30 space-y-1">
                  <strong className="text-[#F87171] block text-[10px]">Before State:</strong>
                  <p className="text-[11px] text-[#E2E8F0]">{verificationResult.beforeState}</p>
                </div>
                <div className="p-4 bg-black/50 rounded-2xl border border-[#10B981]/30 space-y-1">
                  <strong className="text-[#34D399] block text-[10px]">After State:</strong>
                  <p className="text-[11px] text-[#E2E8F0]">{verificationResult.afterState}</p>
                </div>
              </div>

              <div className="p-4 bg-black/60 rounded-2xl border border-[#10B981]/40 space-y-2">
                <strong className="text-[#34D399] font-bold block text-[11px]">Automated Verification Tests Completed:</strong>
                <ul className="space-y-1 text-[#E2E8F0] text-[11px]">
                  {verificationResult.testsPassed.map((test, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#34D399] font-bold">{test}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#A7F3D0]">
                <span>Timestamp: {new Date(verificationResult.verificationTimestamp).toLocaleString()}</span>
                <span>Audit ZK Hash: {verificationResult.auditHash}</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* VIEW 2: REPAIR MEMORY & LEARNING LOG */}
      {activeTab === 'REPAIR_MEMORY' && (
        <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-3xl space-y-6 font-mono text-xs shadow-xl">
          <div className="flex justify-between items-center border-b border-[#1E293B] pb-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">Autonomous Repair Memory</h3>
              <p className="text-xs text-[#94A3B8]">MEHERAH learns from past incidents to prevent repeat failures and optimize future diagnoses</p>
            </div>
            <span className="text-xs text-[#34D399] font-bold">{repairMemory.length} Learned Rules</span>
          </div>

          <div className="space-y-4">
            {repairMemory.map((mem, idx) => (
              <div key={idx} className="p-5 bg-[#030712] border border-[#1E293B] rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#60A5FA] font-bold uppercase">{mem.incidentId} • {mem.repairId}</span>
                    <h4 className="text-sm font-sans font-bold text-[#FFFFFF]">{mem.title}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#06271A] text-[#34D399] text-[10px] font-bold border border-[#10B981]/40">
                    Resolution Time: {mem.resolutionTimeSeconds}s
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <strong className="text-[#94A3B8] block text-[10px]">Root Cause:</strong>
                    <p className="text-[#E2E8F0]">{mem.rootCause}</p>
                  </div>
                  <div>
                    <strong className="text-[#94A3B8] block text-[10px]">Repair Applied:</strong>
                    <p className="text-[#34D399]">{mem.repairApplied}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A] rounded-xl border border-[#3B82F6]/30 text-[11px] space-y-1">
                  <strong className="text-[#60A5FA] font-bold block text-[10px]">Learned Systemic Prevention Rule:</strong>
                  <p className="text-[#FFFFFF]">"{mem.learnedRule}"</p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-[#64748B] pt-2 border-t border-[#1E293B]">
                  <span>Authorized By: <strong className="text-[#E2E8F0]">{mem.governanceOperator}</strong></span>
                  <span>ZK Hash: {mem.auditHash.substring(0, 16)}...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
