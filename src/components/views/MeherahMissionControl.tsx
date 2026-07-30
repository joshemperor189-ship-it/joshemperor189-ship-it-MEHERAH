import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Shield, Cpu, Network, Database, Lock, Scale, Brain, 
  CheckCircle2, AlertTriangle, RefreshCw, Zap, ArrowRight, Play, Eye, 
  BarChart3, Layers, Server, Radio, ShieldCheck, Terminal, Compass, Sparkles, Sliders
} from 'lucide-react';
import { NeuralMemoryEngine, NeuralMemoryQueryResponse } from '../../../ai-engine/neural-memory/neural-memory';
import { MAFEFeedbackEngine, MAFERoutingRecommendation } from '../../../ai-engine/mafe/feedback-engine';
import { DigitalTwinScenarioEngine, PredictiveQueryResult } from '../../../ai-engine/digital-twin/scenario-engine';
import { FinancialIntelligenceGraph, FIGNode, FIGEdge, PropagationImpactResult } from '../../../ai-engine/knowledge-graph/financial-graph';
import { MultimodalFusionEngine, MultimodalFusionAdvisory } from '../../../ai-engine/fusion-engine/fusion-engine';
import { FraudFusionEngine, FraudFusionResult } from '../../../ai-engine/fusion-engine/fraud-fusion';
import { PolicySandboxEngine, PolicySandboxSimulationResult } from '../../../ai-engine/governance/policy-sandbox';
import { DecisionReplayEngine, HistoricalDecisionRecord } from '../../../ai-engine/governance/decision-replay';
import { HSMAdapter } from '../../../security/hsm/hsm-adapter';
import { ZeroTrustGateway, AccessDecision } from '../../../security/identity/zero-trust-gateway';
import { CryptographicReceiptGenerator, AuditReceipt } from '../../../security/audit/cryptographic-receipt';
import { RecoveryEngine, RecoveryPlanResult } from '../../../resilience/recovery-engine';
import { RegulatoryReportingEngine, RegulatoryMonthlyReport } from '../../../compliance/regulatory-reporting-engine';
import { MeherahSentinel, SentinelTelemetrySnapshot } from '../../../observability/sentinel';
import { ComponentRegistry, ServiceContract } from '../../../mcoa/component-registry';
import { ServiceMesh, ServiceMeshDispatchResult } from '../../../mcoa/service-mesh';

export function MeherahMissionControl() {
  const [activeTab, setActiveTab] = useState<'exec' | 'noc' | 'aioc' | 'twin' | 'fig' | 'mfe' | 'mitl' | 'mcoa' | 'finoc' | 'soc' | 'compliance' | 'neural'>('exec');

  // Engine Instances
  const [neuralEngine] = useState(() => new NeuralMemoryEngine());
  const [mafeEngine] = useState(() => new MAFEFeedbackEngine());
  const [scenarioEngine] = useState(() => new DigitalTwinScenarioEngine());
  const [figEngine] = useState(() => new FinancialIntelligenceGraph());
  const [fusionEngine] = useState(() => new MultimodalFusionEngine());
  const [fraudEngine] = useState(() => new FraudFusionEngine());
  const [policyEngine] = useState(() => new PolicySandboxEngine());
  const [replayEngine] = useState(() => new DecisionReplayEngine());

  // Institutional Trust Layer Instances
  const [hsmAdapter] = useState(() => new HSMAdapter());
  const [zeroTrustGateway] = useState(() => new ZeroTrustGateway());
  const [receiptGenerator] = useState(() => new CryptographicReceiptGenerator());
  const [recoveryEngine] = useState(() => new RecoveryEngine());
  const [regulatoryReportEngine] = useState(() => new RegulatoryReportingEngine());
  const [sentinel] = useState(() => new MeherahSentinel());

  // MCOA Instances & State
  const [mcoaRegistry] = useState(() => new ComponentRegistry());
  const [mcoaMesh] = useState(() => new ServiceMesh(mcoaRegistry));
  const [mcoaServices, setMcoaServices] = useState<ServiceContract[]>([]);
  const [mcoaDispatchResult, setMcoaDispatchResult] = useState<ServiceMeshDispatchResult | null>(null);
  const [hotSwapLog, setHotSwapLog] = useState<string | null>(null);

  // Trust Layer State
  const [hsmStatus, setHsmStatus] = useState<any>(null);
  const [lastAccessDecision, setLastAccessDecision] = useState<AccessDecision | null>(null);
  const [auditReceipt, setAuditReceipt] = useState<AuditReceipt | null>(null);
  const [recoveryPlan, setRecoveryPlan] = useState<RecoveryPlanResult | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<RegulatoryMonthlyReport | null>(null);
  const [sentinelSnapshot, setSentinelSnapshot] = useState<SentinelTelemetrySnapshot | null>(null);

  // MFE State
  const [mfeAdvisory, setMfeAdvisory] = useState<MultimodalFusionAdvisory | null>(null);
  const [fraudResult, setFraudResult] = useState<FraudFusionResult | null>(null);

  // Policy & Replay State
  const [fraudSensitivity, setFraudSensitivity] = useState<number>(1.2); // +20% by default
  const [policyResult, setPolicyResult] = useState<PolicySandboxSimulationResult | null>(null);
  const [replayRecord, setReplayRecord] = useState<HistoricalDecisionRecord | null>(null);

  // FIG state
  const [selectedFigNode, setSelectedFigNode] = useState<string>('MTN_MOMO');
  const [figPropagation, setFigPropagation] = useState<PropagationImpactResult | null>(null);

  // State
  const [neuralQuery, setNeuralQuery] = useState('Which provider has been the most reliable over the last six months?');
  const [neuralResult, setNeuralResult] = useState<NeuralMemoryQueryResponse | null>(null);

  const [mafeRoutes, setMafeRoutes] = useState<MAFERoutingRecommendation[]>([]);
  const [simQuery, setSimQuery] = useState('If MTN becomes unavailable in the next 5 minutes, what happens?');
  const [simResult, setSimResult] = useState<PredictiveQueryResult | null>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    runMafeEvaluation();
    runNeuralQuery(neuralQuery);
    runDigitalTwinQuery(simQuery);
    runFigPropagation(selectedFigNode);
    runMfeFusion();
    runPolicySimulation(fraudSensitivity);
    runDecisionReplay('DEC-2026-0727-1432');
    runTrustLayerOps();
    runMcoaOps();
  }, []);

  const runMcoaOps = () => {
    setMcoaServices(mcoaRegistry.getAllRegisteredServices());

    const dispatchRes = mcoaMesh.dispatch(
      'MAFE_ENGINE_SERVICE',
      'HSM_SECURITY_GATEWAY',
      { transactionId: 'TX-9021', amount: 150000 },
      'MEHERAH_UGANDA'
    );
    setMcoaDispatchResult(dispatchRes);
  };

  const handleHotSwapMafe = () => {
    const res = mcoaRegistry.hotSwapComponent('MAFE_ENGINE_SERVICE', 'v2.0.0-PROD', true);
    setHotSwapLog(res.log);
    setMcoaServices(mcoaRegistry.getAllRegisteredServices());
  };

  const runTrustLayerOps = () => {
    setHsmStatus(hsmAdapter.getKeyStatus());

    const decision = zeroTrustGateway.evaluateRequest({
      principalId: 'GOV-OFFICER-449',
      role: 'CENTRAL_BANK_REGULATOR',
      requestedAction: 'MODIFY_ROUTING_POLICY',
      justificationReason: 'Emergency liquidity intervention for regional bank corridor',
      sessionToken: 'SESS-BOU-REG-882190'
    });
    setLastAccessDecision(decision);

    const sig = hsmAdapter.signPayload('PAYLOAD-TX-88490');
    const receipt = receiptGenerator.generateReceipt('TX-88490', 'PAYLOAD-TX-88490', sig, decision.cryptographicAuditToken);
    setAuditReceipt(receipt);

    const recResult = recoveryEngine.executeRecoveryPlan({
      eventId: 'ERR-PROVIDER-99',
      subsystem: 'PROVIDER_API',
      severity: 'HIGH',
      errorMessage: 'MTN_MOMO gateway connection timeout',
      timestamp: new Date().toISOString()
    });
    setRecoveryPlan(recResult);

    setMonthlyReport(regulatoryReportEngine.generateMonthlyReport('2026-07'));
    setSentinelSnapshot(sentinel.captureSnapshot());
  };

  const runPolicySimulation = (multiplier: number) => {
    setFraudSensitivity(multiplier);
    const result = policyEngine.simulatePolicyAdjustment({
      fraudSensitivityMultiplier: multiplier,
    });
    setPolicyResult(result);
  };

  const runDecisionReplay = (id: string) => {
    const record = replayEngine.replayDecision(id);
    setReplayRecord(record);
  };

  const runMfeFusion = () => {
    const advisory = fusionEngine.fuseContext(
      { providerId: 'AIRTEL_MONEY', latencyMs: 3800, settlementRatePct: 97.8, activeLiquidityUgx: 950000000, fxRateVariancePct: 0.1 },
      { providerId: 'AIRTEL_MONEY', maintenanceScheduled: true, apiHealthStatus: 'DEGRADED', activeCircuitBreaker: false },
      { regionId: 'WESTERN_UGANDA_MBARARA', weatherAlertSeverity: 'HEAVY_RAINFALL', powerGridStatus: 'BLACKOUT_WARNING', isPublicHoliday: false, fuelPriceIndexChangePct: 2.4 }
    );
    setMfeAdvisory(advisory);

    const fraud = fraudEngine.evaluateFraudRisk({
      transactionId: 'TX-FUSION-9902',
      senderWalletId: 'WAL-UG-4811',
      amountUgx: 15000000,
      deviceFingerprint: 'DEV-FINGERPRINT-88A92B',
      isRecognizedDevice: false,
      ipGeoRegion: 'KAMPALA_CENTRAL',
      userHomeRegion: 'MBALE_EAST',
      velocityTxCountPastHour: 6,
      behavioralAnomalyScorePct: 78,
      networkReputationScorePct: 62
    });
    setFraudResult(fraud);
  };

  const runFigPropagation = (nodeId: string) => {
    setSelectedFigNode(nodeId);
    const result = figEngine.analyzePropagation(nodeId);
    setFigPropagation(result);
  };

  const runMafeEvaluation = () => {
    setIsRefreshing(true);
    const routes = mafeEngine.evaluateRoutes(
      [
        { providerId: 'AIRTEL_MONEY', providerName: 'Airtel Money', currentLatencyMs: 1800, currentFeePct: 0.9, currentSuccessRatePct: 99.8, activeLiquidityUgx: 950000000, apiHealthStatus: 'OPTIMAL' },
        { providerId: 'MTN_MOMO', providerName: 'MTN Mobile Money', currentLatencyMs: 4200, currentFeePct: 1.2, currentSuccessRatePct: 98.2, activeLiquidityUgx: 1200000000, apiHealthStatus: 'OPTIMAL' },
        { providerId: 'BANK_ACH', providerName: 'National Bank ACH', currentLatencyMs: 45000, currentFeePct: 2.5, currentSuccessRatePct: 99.9, activeLiquidityUgx: 5000000000, apiHealthStatus: 'OPTIMAL' }
      ],
      [
        { providerId: 'AIRTEL_MONEY', latencyChangeRateMsPerSec: -5, errorRateSpikeDeltaPct: 0.0, liquidityDropRateUgxPerMin: 1200000, trafficSurgeRatio: 1.1 },
        { providerId: 'MTN_MOMO', latencyChangeRateMsPerSec: 15, errorRateSpikeDeltaPct: 0.2, liquidityDropRateUgxPerMin: 3400000, trafficSurgeRatio: 1.4 },
        { providerId: 'BANK_ACH', latencyChangeRateMsPerSec: 0, errorRateSpikeDeltaPct: 0.0, liquidityDropRateUgxPerMin: 500000, trafficSurgeRatio: 0.9 }
      ]
    );
    setMafeRoutes(routes);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const runNeuralQuery = (question: string) => {
    setNeuralQuery(question);
    const result = neuralEngine.queryMemory(question);
    setNeuralResult(result);
  };

  const runDigitalTwinQuery = (query: string) => {
    setSimQuery(query);
    const result = scenarioEngine.queryScenario(query);
    setSimResult(result);
  };

  return (
    <div className="space-y-6 text-[#FFFFFF] font-sans antialiased">
      {/* Top Banner & Title */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF87]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[#00FF87] text-xs font-mono uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" /> Sovereign Financial Infrastructure Core
            </div>
            <h1 className="text-3xl font-light tracking-tight text-white font-serif">
              MEHERAH Mission Control <span className="text-[#00FF87] font-mono text-xl font-normal">(MMC)</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 max-w-2xl">
              Central Intelligence & Operational Command Centre for Multi-Rail Payment Orchestration, MAFE Feedback Loops, Digital Twin Simulations, and Neural Memory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runMafeEvaluation}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#262626] border border-[#333333] rounded-xl text-xs font-mono text-gray-300 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#00FF87] ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Telemetry
            </button>
            <div className="px-3 py-1.5 bg-[#00FF87]/10 border border-[#00FF87]/30 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
              <span className="text-xs font-mono text-[#00FF87] font-medium">SYSTEM OPERATIONAL 99.99%</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mt-6 border-b border-[#262626] overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'exec', label: 'Executive Overview', icon: Activity },
            { id: 'noc', label: 'Network Ops (NOC)', icon: Network },
            { id: 'aioc', label: 'AI Operations (MAFE)', icon: Cpu },
            { id: 'twin', label: 'Digital Twin Centre', icon: Radio },
            { id: 'fig', label: 'Financial Graph (FIG)', icon: Compass },
            { id: 'mfe', label: 'Multimodal Fusion (MFE)', icon: Sparkles },
            { id: 'mitl', label: 'Institutional Trust (MITL)', icon: ShieldCheck },
            { id: 'mcoa', label: 'Component Architecture (MCOA)', icon: Layers },
            { id: 'neural', label: 'Neural Memory', icon: Brain },
            { id: 'finoc', label: 'Financial Ops', icon: Database },
            { id: 'soc', label: 'Security Ops (SOC)', icon: Lock },
            { id: 'compliance', label: 'Compliance & Audit', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#00FF87] text-black font-semibold shadow-lg shadow-[#00FF87]/20'
                    : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      <AnimatePresence mode="wait">
        {/* 1. EXECUTIVE INTELLIGENCE SUMMARY */}
        {activeTab === 'exec' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Overall System Health', value: '99.9%', sub: 'Zero System Degradation', color: 'text-[#00FF87]' },
                { label: 'Active Providers Online', value: '7 / 7', sub: 'MTN, Airtel, Bank ACH, FLW', color: 'text-white' },
                { label: 'Average SLA Latency', value: '315 ms', sub: '25x Faster than Legacy ACH', color: 'text-[#00FF87]' },
                { label: "Today's Transactions", value: '1,243,882', sub: 'UGX 8.4 Billion Settled', color: 'text-white' },
                { label: 'Settlement Success Rate', value: '99.97%', sub: 'Double-Entry Verified', color: 'text-[#00FF87]' },
                { label: 'MAFE AI Confidence', value: '95.8%', sub: 'Autonomous Routing Active', color: 'text-[#00FF87]' },
                { label: 'Critical Security Alerts', value: '0', sub: 'Zero-Trust Policy Locked', color: 'text-green-400' },
                { label: 'Audit Trail Ledger', value: 'IMMOVABLE', sub: '100% XAI Log Integrity', color: 'text-cyan-400' }
              ].map((metric, idx) => (
                <div key={idx} className="bg-[#121212] border border-[#262626] rounded-xl p-4">
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">{metric.label}</div>
                  <div className={`text-2xl font-mono font-semibold mt-1 ${metric.color}`}>{metric.value}</div>
                  <div className="text-[11px] text-gray-500 mt-1">{metric.sub}</div>
                </div>
              ))}
            </div>

            {/* Quick Strategic Summary Panel */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-2 font-serif flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00FF87]" /> Executive Command Verdict
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                MEHERAH Mission Control provides real-time sovereign visibility across all active payment corridors. The system is operating in <strong className="text-[#00FF87]">Autonomous Tier 1 Mode</strong> with active MAFE P-I-D feedback loop optimization, continuous Digital Twin simulation monitoring, and automated double-entry ledger reconciliation.
              </p>
            </div>
          </motion.div>
        )}

        {/* 2. NETWORK OPERATIONS CENTRE (NOC) */}
        {activeTab === 'noc' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-[#00FF87]" /> Real-Time Payment Provider Telemetry (NOC)
                </h3>
                <span className="text-xs font-mono text-gray-400">7 Active Connectors</span>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'AIRTEL_MONEY', name: 'Airtel Money Adapter', latency: 1800, success: 99.8, fee: '0.9%', status: 'OPTIMAL', float: '950M UGX', circuit: 'CLOSED' },
                  { id: 'MTN_MOMO', name: 'MTN Mobile Money Adapter', latency: 4200, success: 98.2, fee: '1.2%', status: 'DEGRADED_WARNING', float: '1.2B UGX', circuit: 'CLOSED' },
                  { id: 'BANK_ACH', name: 'National Bank ACH Adapter', latency: 45000, success: 99.9, fee: '2.5%', status: 'OPTIMAL', float: '5.0B UGX', circuit: 'CLOSED' },
                  { id: 'FLUTTERWAVE', name: 'Flutterwave Global Gateway', latency: 2400, success: 99.1, fee: '1.5%', status: 'OPTIMAL', float: '2.1B UGX', circuit: 'CLOSED' },
                  { id: 'BEYONIC', name: 'Beyonic Telecom Connector', latency: 3100, success: 98.9, fee: '1.1%', status: 'OPTIMAL', float: '400M UGX', circuit: 'CLOSED' },
                ].map((p, idx) => (
                  <div key={idx} className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${p.status === 'OPTIMAL' ? 'bg-[#00FF87]' : 'bg-yellow-400 animate-pulse'}`} />
                      <div>
                        <div className="text-sm font-medium text-white font-mono">{p.name}</div>
                        <div className="text-xs text-gray-400">Circuit Breaker: <span className="text-green-400 font-mono">{p.circuit}</span> | Active Float: {p.float}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs font-mono">
                      <div>
                        <span className="text-gray-500 block">LATENCY</span>
                        <span className={p.latency > 5000 ? 'text-yellow-400' : 'text-[#00FF87]'}>{p.latency} ms</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">SUCCESS RATE</span>
                        <span className="text-white">{p.success}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">AVG FEE</span>
                        <span className="text-white">{p.fee}</span>
                      </div>
                      <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        p.status === 'OPTIMAL' ? 'bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {p.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. AI OPERATIONS CENTRE (MAFE) */}
        {activeTab === 'aioc' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00FF87]" /> MAFE (Adaptive Financial Feedback Engine) Reasoning Stream
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Evaluates real-time Proportional (P), Integral (I), and Derivative (D) vectors to calculate exact routing confidence and enforce regulatory approval policies.
              </p>

              <div className="space-y-4">
                {mafeRoutes.map((route, idx) => (
                  <div key={idx} className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-4">
                      <div>
                        <span className="text-xs font-mono text-[#00FF87] uppercase">Provider Candidate</span>
                        <h4 className="text-base font-semibold text-white font-mono">{route.providerId}</h4>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xs text-gray-400 block font-mono">MAFE CONFIDENCE</span>
                          <span className="text-lg font-mono font-bold text-[#00FF87]">{route.confidence.overallConfidenceScorePct}%</span>
                        </div>
                        <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                          route.policy.autoExecuteAllowed ? 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/40' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                        }`}>
                          {route.policy.policyCode}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4 text-xs font-mono">
                      <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                        <span className="text-gray-500 block">P (PRESENT STATE)</span>
                        <span className="text-white font-bold">{route.confidence.breakdown.pScore} / 100</span>
                      </div>
                      <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                        <span className="text-gray-500 block">I (HISTORICAL SLA)</span>
                        <span className="text-white font-bold">{route.confidence.breakdown.iScore} / 100</span>
                      </div>
                      <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                        <span className="text-gray-500 block">D (PREDICTIVE TREND)</span>
                        <span className="text-white font-bold">{route.confidence.breakdown.dScore} / 100</span>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-300 font-mono bg-[#121212] p-2.5 rounded-lg border border-[#222]">
                      <span className="text-[#00FF87]">✓ Justification:</span> {route.explainedReasoning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. DIGITAL TWIN CENTRE */}
        {activeTab === 'twin' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#00FF87]" /> Digital Twin Predictive Network Simulator
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Runs continuous stress simulations to forecast network failures, fee spikes, and congestion bottlenecks before live execution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {[
                  'If MTN becomes unavailable in the next 5 minutes, what happens?',
                  'What if Airtel fees increase by 15%?',
                  'Which provider will likely become congested in the next hour?'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => runDigitalTwinQuery(q)}
                    className={`p-3 rounded-xl border text-xs text-left font-mono transition-all ${
                      simQuery === q ? 'bg-[#00FF87]/10 border-[#00FF87] text-[#00FF87]' : 'bg-[#181818] border-[#2A2A2A] text-gray-300 hover:bg-[#222]'
                    }`}
                  >
                    "{q}"
                  </button>
                ))}
              </div>

              {simResult && (
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                    <span className="text-gray-400">SCENARIO: <strong className="text-white">{simResult.scenario.scenarioName}</strong></span>
                    <span className="text-[#00FF87] font-bold">Resilience Rating: {simResult.resilienceRatingPct}%</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block mb-1">PREDICTED MAFE RECOMMENDATION:</span>
                    <p className="text-gray-200 bg-[#111] p-3 rounded-lg border border-[#222]">{simResult.mafeRecommendation}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-gray-300">
                    <div>Severity: <span className="text-yellow-400">{simResult.scenario.predictedOutcome.systemImpactSeverity}</span></div>
                    <div>Est. Congestion: <span className="text-white">{simResult.scenario.predictedOutcome.estimatedCongestionMinutes} mins</span></div>
                    <div>Recommended Fallback: <span className="text-[#00FF87]">{simResult.scenario.predictedOutcome.recommendedFallback}</span></div>
                    <div>Float Shift: <span className="text-white">{simResult.scenario.predictedOutcome.recommendedLiquidityShiftUgx.toLocaleString()} UGX</span></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 5. FINANCIAL INTELLIGENCE GRAPH (FIG) */}
        {activeTab === 'fig' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 font-serif">
                    <Compass className="w-4 h-4 text-[#00FF87]" /> MEHERAH Financial Intelligence Graph (FIG)
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Maps structural relationships across Central Banks, RTGS Rails, Commercial Banks, Mobile Money, Settlement Vaults, and Merchants to analyze systemic cascade propagation.
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-[#181818] border border-[#2A2A2A] rounded-xl text-xs font-mono text-gray-300">
                  Network Nodes: <strong className="text-white">{figEngine.getAllNodes().length} Active</strong> | Edges: <strong className="text-[#00FF87]">{figEngine.getAllEdges().length} Connected</strong>
                </div>
              </div>

              {/* Criticality Hierarchy */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Node Explorer */}
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-mono text-[#00FF87] uppercase tracking-wider font-semibold">Select Target Node for Disconnection / Failure Test</h4>
                  <div className="space-y-2">
                    {figEngine.getCriticalityRanking().map((node) => (
                      <button
                        key={node.id}
                        onClick={() => runFigPropagation(node.id)}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all font-mono text-xs ${
                          selectedFigNode === node.id ? 'bg-[#00FF87]/10 border-[#00FF87] text-[#00FF87]' : 'bg-[#111] border-[#222] text-gray-300 hover:bg-[#1a1a1a]'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{node.name}</div>
                          <div className="text-[10px] text-gray-400 font-sans">{node.type} | Float: {(node.activeLiquidityUgx / 1000000000).toFixed(1)}B UGX</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          node.criticalityTier === 'SYSTEMIC' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {node.criticalityTier}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cascade Propagation Analysis Panel */}
                <div className="lg:col-span-2 bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Systemic Cascade Propagation Result</h4>

                  {figPropagation && (
                    <div className="space-y-4 font-mono text-xs">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#111] p-4 rounded-xl border border-[#222]">
                        <div>
                          <span className="text-gray-500 block text-[10px]">FAILED NODE</span>
                          <span className="text-base font-bold text-white">{figPropagation.failedNodeId}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-[10px]">CASCADE RISK SEVERITY</span>
                          <span className={`text-sm font-bold ${
                            figPropagation.propagationRiskSeverity === 'SYSTEMIC_CRITICAL' ? 'text-red-400' : 'text-yellow-400'
                          }`}>
                            {figPropagation.propagationRiskSeverity}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-[10px]">TOTAL LIQUIDITY AT RISK</span>
                          <span className="text-sm font-bold text-[#00FF87]">{(figPropagation.totalLiquidityAtRiskUgx / 1000000000).toFixed(2)} Billion UGX</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                          <span className="text-yellow-400 font-bold block mb-2">⚡ Direct Dependent Nodes ({figPropagation.directlyImpactedNodeIds.length}):</span>
                          <ul className="space-y-1 text-gray-300 text-[11px]">
                            {figPropagation.directlyImpactedNodeIds.map((id) => (
                              <li key={id} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                <span>{id}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                          <span className="text-orange-400 font-bold block mb-2">🔗 Secondary Cascade Impact ({figPropagation.indirectlyImpactedNodeIds.length}):</span>
                          <ul className="space-y-1 text-gray-300 text-[11px]">
                            {figPropagation.indirectlyImpactedNodeIds.length === 0 ? (
                              <li className="text-gray-500 italic">No secondary node cascade detected</li>
                            ) : (
                              figPropagation.indirectlyImpactedNodeIds.map((id) => (
                                <li key={id} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                  <span>{id}</span>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-[#00FF87]/10 border border-[#00FF87]/30 p-4 rounded-xl text-[#00FF87]">
                        💡 <strong>Automated MAFE Failover Diversion:</strong> Auto-route all affected corridors via <strong className="underline">{figPropagation.suggestedMitigationRail}</strong> to prevent liquidity settlement freezing.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. MULTIMODAL FUSION ENGINE (MFE) */}
        {activeTab === 'mfe' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 font-serif">
                    <Sparkles className="w-4 h-4 text-[#00FF87]" /> MEHERAH Multimodal Fusion Engine (MFE)
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Fuses financial telemetry, operational maintenance, weather alerts, and multi-factor risk signals into explainable routing advisories.
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-[#00FF87]/10 border border-[#00FF87]/30 rounded-xl text-xs font-mono text-[#00FF87]">
                  Cross-Domain Signal Fusion: Active
                </div>
              </div>

              {/* MFE Multi-Domain Advisory Panel */}
              {mfeAdvisory && (
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-4 font-mono text-xs mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#2A2A2A] pb-3">
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">TARGET PROVIDER & REGION</span>
                      <span className="text-base font-bold text-white">{mfeAdvisory.targetProviderId} @ {mfeAdvisory.targetRegion}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">FUSED MULTI-DOMAIN RISK</span>
                      <span className={`text-base font-bold ${mfeAdvisory.overallRiskIndexPct > 40 ? 'text-yellow-400' : 'text-[#00FF87]'}`}>
                        {mfeAdvisory.overallRiskIndexPct}% Risk Index
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 block font-bold mb-1">📈 Financial Vector</span>
                      <span className="text-gray-300">{mfeAdvisory.contributingFactors.financialFactor}</span>
                    </div>
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 block font-bold mb-1">⚙️ Operational Vector</span>
                      <span className="text-gray-300">{mfeAdvisory.contributingFactors.operationalFactor}</span>
                    </div>
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 block font-bold mb-1">🌧️ Environmental Vector</span>
                      <span className="text-gray-300">{mfeAdvisory.contributingFactors.environmentalFactor}</span>
                    </div>
                  </div>

                  <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                    <span className="text-[#00FF87] font-bold block mb-1">💡 Fused Routing Action:</span>
                    <span className="text-gray-200">{mfeAdvisory.recommendedRoutingAction}</span>
                  </div>

                  <div className="text-gray-400 text-[11px] italic bg-[#121212] p-2.5 rounded-lg border border-[#222]">
                    ⚖️ Regulatory Justification: {mfeAdvisory.explainableRegulatoryJustification}
                  </div>
                </div>
              )}

              {/* Fraud Evidence Fusion Sub-Panel */}
              <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Multi-Factor Fraud Evidence Fusion
                </h4>

                {fraudResult && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-[#111] p-3.5 rounded-xl border border-[#222]">
                      <div>
                        <span className="text-gray-500 text-[10px] block">TRANSACTION EVALUATED</span>
                        <span className="text-white font-bold">{fraudResult.transactionId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] block">COMBINED RISK SCORE</span>
                        <span className="text-yellow-400 font-bold">{fraudResult.combinedRiskScorePct}% Risk</span>
                      </div>
                      <div className="px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 text-xs font-bold">
                        {fraudResult.decision}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                      <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                        <span className="text-gray-400 block font-bold">Device Fingerprint:</span>
                        <span className="text-gray-300">{fraudResult.evidenceBreakdown.deviceRisk}</span>
                      </div>
                      <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                        <span className="text-gray-400 block font-bold">Location & Velocity:</span>
                        <span className="text-gray-300">{fraudResult.evidenceBreakdown.locationVelocityRisk}</span>
                      </div>
                      <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                        <span className="text-gray-400 block font-bold">Behavioral Anomaly:</span>
                        <span className="text-gray-300">{fraudResult.evidenceBreakdown.behavioralAnomalyRisk}</span>
                      </div>
                      <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                        <span className="text-gray-400 block font-bold">Network Reputation:</span>
                        <span className="text-gray-300">{fraudResult.evidenceBreakdown.networkReputationRisk}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* INSTITUTIONAL TRUST LAYER (MITL) */}
        {activeTab === 'mitl' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 font-serif">
                    <ShieldCheck className="w-5 h-5 text-[#00FF87]" /> MEHERAH Institutional Trust Layer (MITL)
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    FIPS 140-2 Level 3 HSM Key Vault, Zero-Trust Identity Gateway, Tamper-Proof Cryptographic Receipts, and Sentinel Observability.
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-[#00FF87]/10 border border-[#00FF87]/30 rounded-xl text-xs font-mono text-[#00FF87] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" /> HSM & Zero-Trust Hardened
                </div>
              </div>

              {/* 1. HSM & Cryptographic Signing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-3 font-mono text-xs">
                  <h4 className="text-xs text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyan-400" /> Hardware Security Module (HSM) Vault
                  </h4>
                  {hsmStatus && (
                    <div className="space-y-2 bg-[#111] p-3 rounded-lg border border-[#222]">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Key Alias:</span>
                        <span className="text-white font-bold">{hsmStatus.keyAlias}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Key Version:</span>
                        <span className="text-[#00FF87] font-bold">v{hsmStatus.keyVersion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Hardware Level:</span>
                        <span className="text-gray-300">{hsmStatus.fipsCompliance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Hardware Lock:</span>
                        <span className="text-[#00FF87] font-bold">LOCKED & ENCRYPTED</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Zero-Trust Access Gateway */}
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-3 font-mono text-xs">
                  <h4 className="text-xs text-[#00FF87] uppercase tracking-wider font-bold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#00FF87]" /> Zero-Trust Identity Gateway
                  </h4>
                  {lastAccessDecision && (
                    <div className="space-y-2 bg-[#111] p-3 rounded-lg border border-[#222]">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Principal:</span>
                        <span className="text-white font-bold">{lastAccessDecision.principalId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Decision:</span>
                        <span className={`font-bold ${lastAccessDecision.allowed ? 'text-[#00FF87]' : 'text-red-400'}`}>
                          {lastAccessDecision.allowed ? 'GRANTED' : 'DENIED'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Enforcement:</span>
                        <span className="text-gray-300">{lastAccessDecision.enforcementRule}</span>
                      </div>
                      <div className="text-gray-400 text-[10px] italic border-t border-[#222] pt-1.5 mt-1">
                        Reason: {lastAccessDecision.reason}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Cryptographic Audit Receipt */}
              {auditReceipt && (
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 mb-6 space-y-3 font-mono text-xs">
                  <h4 className="text-xs text-yellow-400 uppercase tracking-wider font-bold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-yellow-400" /> Tamper-Proof Cryptographic Audit Receipt
                  </h4>
                  <div className="bg-[#111] p-3.5 rounded-lg border border-[#222] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Receipt ID:</span>
                      <span className="text-white font-bold">{auditReceipt.receiptId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payload SHA-256:</span>
                      <span className="text-cyan-400">{auditReceipt.payloadHashHex}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">HSM Signature:</span>
                      <span className="text-[#00FF87] font-bold text-[10px] truncate max-w-[280px]">{auditReceipt.hsmSignature.signatureHex}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sovereign Seal Status:</span>
                      <span className="text-[#00FF87] font-bold">{auditReceipt.sovereignSealStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Autonomous Recovery Engine & Sentinel Observability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recovery Engine */}
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-3 font-mono text-xs">
                  <h4 className="text-xs text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" /> Operational Recovery Engine
                  </h4>
                  {recoveryPlan && (
                    <div className="bg-[#111] p-3.5 rounded-lg border border-[#222] space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Action Executed:</span>
                        <span className="text-[#00FF87] font-bold">{recoveryPlan.actionExecuted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Recovery Status:</span>
                        <span className="text-[#00FF87] font-bold">{recoveryPlan.recoveryStatus} ({recoveryPlan.recoveryTimeMs}ms)</span>
                      </div>
                      <p className="text-gray-300 text-[11px] mt-1 border-t border-[#222] pt-2">
                        {recoveryPlan.explainableRecoveryLog}
                      </p>
                    </div>
                  )}
                </div>

                {/* Sentinel Observability */}
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-3 font-mono text-xs">
                  <h4 className="text-xs text-[#00FF87] uppercase tracking-wider font-bold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00FF87]" /> MEHERAH Sentinel Observability
                  </h4>
                  {sentinelSnapshot && (
                    <div className="bg-[#111] p-3.5 rounded-lg border border-[#222] grid grid-cols-3 gap-2 text-[10px]">
                      <div>
                        <span className="text-gray-500 block">CPU USAGE</span>
                        <span className="text-white font-bold">{sentinelSnapshot.system.cpuUsagePct}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">AVG LATENCY</span>
                        <span className="text-[#00FF87] font-bold">{sentinelSnapshot.system.avgLatencyMs}ms</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">DB POOL</span>
                        <span className="text-[#00FF87] font-bold">{sentinelSnapshot.system.databasePoolHealth}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">ACTIVE FLOAT</span>
                        <span className="text-white font-bold">UGX 4.85B</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">MAFE CONF.</span>
                        <span className="text-[#00FF87] font-bold">{sentinelSnapshot.ai.avgMafeConfidencePct}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">MODEL DRIFT</span>
                        <span className="text-[#00FF87] font-bold">{sentinelSnapshot.ai.modelDriftIndex}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* COMPONENT-BASED OPERATING ARCHITECTURE (MCOA) */}
        {activeTab === 'mcoa' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 font-serif">
                    <Layers className="w-5 h-5 text-cyan-400" /> MEHERAH Component-Based Operating Architecture (MCOA)
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Component Registry, Zero-Downtime Hot-Swapping, Flight-Proven Canaries, and Service Mesh Telemetry.
                  </p>
                </div>
                <button
                  onClick={handleHotSwapMafe}
                  className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Simulate MAFE v2.0 Hot-Swap
                </button>
              </div>

              {hotSwapLog && (
                <div className="p-3 bg-[#181818] border border-cyan-500/40 rounded-xl text-xs font-mono text-cyan-300 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{hotSwapLog}</span>
                </div>
              )}

              {/* Component Registry Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {mcoaServices.map((svc) => (
                  <div key={svc.serviceId} className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">{svc.serviceName}</span>
                      <span className="px-2 py-0.5 bg-[#00FF87]/10 border border-[#00FF87]/30 rounded text-[#00FF87] font-bold text-[10px]">
                        {svc.version}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400 border-t border-[#222] pt-2">
                      <span>Status: <strong className="text-[#00FF87]">{svc.status}</strong></span>
                      <span>Flight Proven: <strong className="text-cyan-400">{svc.flightProvenCertified ? 'YES (PASSED)' : 'NO'}</strong></span>
                      <span>Region: <strong className="text-white">{svc.regionCode}</strong></span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 bg-[#111] p-2 rounded">
                      <span>p99 Latency: {svc.telemetryMetrics.p99LatencyMs}ms</span>
                      <span>Error Rate: {svc.telemetryMetrics.errorRatePct}%</span>
                      <span>Req/hr: {svc.telemetryMetrics.requestsHandledPastHour.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Mesh Inter-Service Dispatch Telemetry */}
              {mcoaDispatchResult && (
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 font-mono text-xs space-y-3">
                  <h4 className="text-xs text-[#00FF87] uppercase tracking-wider font-bold flex items-center gap-2">
                    <Network className="w-4 h-4 text-[#00FF87]" /> Service Mesh Inter-Service Dispatch
                  </h4>
                  <div className="bg-[#111] p-3.5 rounded-lg border border-[#222] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Envelope ID:</span>
                      <span className="text-white font-bold">{mcoaDispatchResult.envelopeId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mesh Status:</span>
                      <span className="text-[#00FF87] font-bold">{mcoaDispatchResult.status} ({mcoaDispatchResult.latencyMs}ms)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">mTLS Routing Path:</span>
                      <span className="text-cyan-400 font-bold">{mcoaDispatchResult.routingPath}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 5. NEURAL MEMORY CENTRE */}
        {activeTab === 'neural' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#00FF87]" /> MEHERAH Neural Memory Engine
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Queries deep operational experience, long-term provider SLA trends, historical demand clustering, and incident resolution playbooks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {[
                  'Which provider has been the most reliable over the last six months?',
                  'Which days experience the highest transaction demand?',
                  'Which routing strategies consistently reduce costs?',
                  'Which operational incidents have occurred before, and how were they resolved?'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => runNeuralQuery(q)}
                    className={`p-3.5 rounded-xl border text-xs text-left font-mono transition-all ${
                      neuralQuery === q ? 'bg-[#00FF87]/10 border-[#00FF87] text-[#00FF87]' : 'bg-[#181818] border-[#2A2A2A] text-gray-300 hover:bg-[#222]'
                    }`}
                  >
                    💬 "{q}"
                  </button>
                ))}
              </div>

              {neuralResult && (
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                    <div>
                      <span className="text-xs text-[#00FF87] font-mono uppercase block">{neuralResult.matchedPattern.category}</span>
                      <h4 className="text-base font-medium text-white font-serif">{neuralResult.matchedPattern.title}</h4>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-gray-400 block">OBSERVED PERIOD</span>
                      <span className="text-gray-200">{neuralResult.matchedPattern.observedPeriod}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans bg-[#111] p-3 rounded-lg border border-[#222]">
                    {neuralResult.matchedPattern.evidenceSummary}
                  </p>

                  <div>
                    <h5 className="text-xs font-mono text-gray-400 uppercase mb-2">Key Learned Insights:</h5>
                    <ul className="space-y-1.5">
                      {neuralResult.matchedPattern.keyInsights.map((insight, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87] shrink-0 mt-0.5" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#00FF87]/10 border border-[#00FF87]/30 p-3 rounded-lg text-xs font-mono text-[#00FF87]">
                    💡 <strong>Actionable Recommendation:</strong> {neuralResult.matchedPattern.actionableRecommendation}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 6. FINANCIAL OPERATIONS */}
        {activeTab === 'finoc' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#00FF87]" /> Financial Operations & Double-Entry Ledger
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2A2A2A]">
                  <span className="text-gray-400 block">SETTLEMENT QUEUE</span>
                  <span className="text-xl font-bold text-white mt-1 block">14 Pending</span>
                  <span className="text-[11px] text-[#00FF87]">Auto-clearing in &lt; 200ms</span>
                </div>
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2A2A2A]">
                  <span className="text-gray-400 block">DOUBLE-ENTRY LEDGER BALANCE</span>
                  <span className="text-xl font-bold text-white mt-1 block">UGX 14.8 Billion</span>
                  <span className="text-[11px] text-[#00FF87]">Balanced (Assets = Liabilities)</span>
                </div>
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2A2A2A]">
                  <span className="text-gray-400 block">RECONCILIATION DISCREPANCIES</span>
                  <span className="text-xl font-bold text-[#00FF87] mt-1 block">0 Discrepancies</span>
                  <span className="text-[11px] text-gray-400">100% Idempotent Match</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 7. SECURITY OPERATIONS CENTRE (SOC) */}
        {activeTab === 'soc' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00FF87]" /> Zero-Trust Security Operations Centre (SOC)
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2A2A2A]">
                  <span className="text-gray-400 block">RBAC CLEARANCE</span>
                  <span className="text-white font-bold block mt-1">OPERATOR_LEVEL_2</span>
                </div>
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2A2A2A]">
                  <span className="text-gray-400 block">ENCRYPTION STATE</span>
                  <span className="text-[#00FF87] font-bold block mt-1">AES-256-GCM / TLS 1.3</span>
                </div>
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2A2A2A]">
                  <span className="text-gray-400 block">HSM KEY STATUS</span>
                  <span className="text-[#00FF87] font-bold block mt-1">LOCKED & PROTECTED</span>
                </div>
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2A2A2A]">
                  <span className="text-gray-400 block">INTRUSION DETECTION</span>
                  <span className="text-[#00FF87] font-bold block mt-1">0 THREATS DETECTED</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 8. COMPLIANCE & GOVERNANCE CENTRE */}
        {activeTab === 'compliance' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Policy Sandbox Section */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 font-serif">
                    <Sliders className="w-4 h-4 text-[#00FF87]" /> Regulatory Policy Sandbox & Impact Simulation
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Simulate regulatory policy parameter adjustments (e.g., fraud sensitivity, transaction limits) and evaluate systemic impact.
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-[#00FF87]/10 border border-[#00FF87]/30 rounded-xl text-xs font-mono text-[#00FF87]">
                  Policy Sandbox: Ready
                </div>
              </div>

              <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-300 block mb-1">
                      Fraud Sensitivity Multiplier: <span className="text-[#00FF87] font-bold">{(fraudSensitivity * 100 - 100) >= 0 ? `+${(fraudSensitivity * 100 - 100).toFixed(0)}%` : `${(fraudSensitivity * 100 - 100).toFixed(0)}%`}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => runPolicySimulation(1.0)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${fraudSensitivity === 1.0 ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87]' : 'bg-[#222] border-[#333] text-gray-300'}`}
                      >
                        Baseline (1.0x)
                      </button>
                      <button
                        onClick={() => runPolicySimulation(1.2)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${fraudSensitivity === 1.2 ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87]' : 'bg-[#222] border-[#333] text-gray-300'}`}
                      >
                        +20% Sensitivity
                      </button>
                      <button
                        onClick={() => runPolicySimulation(1.35)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${fraudSensitivity === 1.35 ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87]' : 'bg-[#222] border-[#333] text-gray-300'}`}
                      >
                        +35% Sensitivity
                      </button>
                    </div>
                  </div>
                </div>

                {policyResult && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs mt-3">
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 block text-[10px]">PREVENTED FRAUD LOSSES</span>
                      <span className="text-base font-bold text-[#00FF87]">UGX {(policyResult.projectedMetrics.preventedFraudLossesUgx / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 block text-[10px]">FALSE POSITIVE RATE</span>
                      <span className="text-base font-bold text-yellow-400">{policyResult.projectedMetrics.falsePositiveRatePct}%</span>
                    </div>
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 block text-[10px]">CUSTOMER FRICTION INC.</span>
                      <span className="text-base font-bold text-gray-200">+{policyResult.projectedMetrics.customerFrictionIncreasePct}%</span>
                    </div>
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 block text-[10px]">HITL REVIEW QUEUE</span>
                      <span className="text-base font-bold text-cyan-400">{policyResult.projectedMetrics.hitlReviewQueueCount} Cases</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Decision Replay Section */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2 font-serif">
                <Terminal className="w-4 h-4 text-[#00FF87]" /> Regulatory Decision Replay & XAI Time-Machine
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Reconstructs exact past system decisions with complete environmental, MAFE P-I-D, and policy context for central bank audit.
              </p>

              {replayRecord && (
                <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-5 space-y-3 font-mono text-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#2A2A2A] pb-3">
                    <div>
                      <span className="text-gray-500 text-[10px] block">REPLAY ID & TIMESTAMP</span>
                      <span className="text-white font-bold">{replayRecord.decisionId} @ {replayRecord.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">ROUTED TRANSACTION</span>
                      <span className="text-[#00FF87] font-bold">{replayRecord.txId} (UGX {(replayRecord.amountUgx / 1000000).toFixed(1)}M)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-400 block font-bold">CHOSEN RAIL: {replayRecord.chosenRail}</span>
                      <span className="text-[#00FF87]">MAFE Score: {replayRecord.reconstructedContext.mafeChosenScore}%</span>
                    </div>
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-400 block font-bold">REJECTED RAIL: {replayRecord.rejectedRail}</span>
                      <span className="text-red-400">MAFE Score: {replayRecord.reconstructedContext.mafeRejectedScore}%</span>
                    </div>
                  </div>

                  <div className="bg-[#111] p-3 rounded-lg border border-[#222] text-gray-300">
                    <span className="text-yellow-400 font-bold block mb-1">🌧️ Reconstructed Environmental Context:</span>
                    {replayRecord.reconstructedContext.environmentalFactors}
                  </div>

                  <div className="bg-[#121212] p-3 rounded-lg border border-[#222] text-gray-300 text-[11px]">
                    <span className="text-[#00FF87] font-bold block mb-1">📜 Explainable Audit Reconstruction Log:</span>
                    {replayRecord.explainableAuditLog}
                  </div>
                </div>
              )}
            </div>

            {/* Regulatory Rules Table */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#00FF87]" /> Active Regulatory Rule Enforcement
              </h3>

              <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 text-xs font-mono space-y-2">
                <div className="flex justify-between text-gray-400 border-b border-[#2A2A2A] pb-2">
                  <span>POLICY ENFORCED</span>
                  <span>STATUS</span>
                  <span>AUDIT HASH</span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span>National Payment Systems Act Compliance</span>
                  <span className="text-[#00FF87]">PASSED</span>
                  <span className="text-gray-500">0x7f9a...3b21</span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span>90% AI Confidence Intercept Policy</span>
                  <span className="text-[#00FF87]">ENFORCED</span>
                  <span className="text-gray-500">0x81b2...992f</span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span>Anti-Money Laundering (AML) / Sanctions Screening</span>
                  <span className="text-[#00FF87]">CLEARED</span>
                  <span className="text-gray-500">0x992a...e400</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
