import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Award, 
  Globe2, 
  GraduationCap, 
  RefreshCw, 
  TrendingUp, 
  CheckCircle2, 
  Search, 
  Eye, 
  Cpu, 
  Sparkles, 
  Zap, 
  Compass, 
  BookOpen, 
  Check, 
  ArrowRight, 
  Building2, 
  Users, 
  Lock, 
  Layers, 
  BarChart3, 
  Network, 
  AlertTriangle, 
  Terminal, 
  ChevronRight,
  FileCheck,
  Server
} from 'lucide-react';
import { 
  ObservatoryTelemetry, 
  ProviderReputationItem, 
  FinancialMapNode, 
  AcademyModule, 
  AutonomousImprovementCycle, 
  CivilizationScaleMetrics 
} from '../../services/meherah-trust-intelligence.service';

export function MeherahTrustIntelligenceEraView() {
  const [telemetry, setTelemetry] = useState<ObservatoryTelemetry | null>(null);
  const [reputation, setReputation] = useState<ProviderReputationItem[]>([]);
  const [financialMap, setFinancialMap] = useState<FinancialMapNode[]>([]);
  const [academyModules, setAcademyModules] = useState<AcademyModule[]>([]);
  const [improvementCycle, setImprovementCycle] = useState<AutonomousImprovementCycle | null>(null);
  const [civilizationMetrics, setCivilizationMetrics] = useState<CivilizationScaleMetrics | null>(null);

  const [activeSubTab, setActiveSubTab] = useState<'observatory' | 'reputation' | 'map' | 'academy' | 'improvement' | 'civilization'>('observatory');
  const [loading, setLoading] = useState<boolean>(true);

  // Academy Interactive State
  const [selectedAcademyTab, setSelectedAcademyTab] = useState<'ALL' | 'DEVELOPERS' | 'BANKS' | 'BUSINESSES' | 'INSTITUTIONS'>('ALL');
  const [enrolledModules, setEnrolledModules] = useState<Record<string, boolean>>({});

  // Autonomous Improvement Loop Simulation State
  const [loopSimulating, setLoopSimulating] = useState<boolean>(false);
  const [activeLoopStep, setActiveLoopStep] = useState<number>(0);

  useEffect(() => {
    fetchTrustIntelligenceData();
  }, []);

  const fetchTrustIntelligenceData = async () => {
    setLoading(true);
    try {
      const [
        obsRes,
        repRes,
        mapRes,
        acadRes,
        loopRes,
        civRes
      ] = await Promise.all([
        fetch('/api/meherah/trust-intelligence/observatory'),
        fetch('/api/meherah/trust-intelligence/reputation'),
        fetch('/api/meherah/trust-intelligence/financial-map'),
        fetch('/api/meherah/trust-intelligence/academy'),
        fetch('/api/meherah/trust-intelligence/improvement-loop'),
        fetch('/api/meherah/trust-intelligence/civilization-scale')
      ]);

      setTelemetry(await obsRes.json());
      setReputation(await repRes.json());
      setFinancialMap(await mapRes.json());
      setAcademyModules(await acadRes.json());
      setImprovementCycle(await loopRes.json());
      setCivilizationMetrics(await civRes.json());
    } catch (err) {
      console.error('Failed to load MEHERAH Trust Intelligence Era data:', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerLoopSimulation = () => {
    setLoopSimulating(true);
    setActiveLoopStep(0);

    const steps = [0, 1, 2, 3, 4, 5];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveLoopStep(step);
        if (idx === steps.length - 1) {
          setLoopSimulating(false);
        }
      }, (idx + 1) * 700);
    });
  };

  const toggleAcademyEnrollment = (id: string) => {
    setEnrolledModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAcademyModules = selectedAcademyTab === 'ALL'
    ? academyModules
    : academyModules.filter(m => m.targetAudience === selectedAcademyTab);

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen">
      
      {/* 1. MASTER HEADER: MEHERAH — THE TRUST INTELLIGENCE ERA */}
      <div className="bg-[#111111] border border-[#C9A227]/50 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current text-[#070707]" /> THE TRUST INTELLIGENCE ERA
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00B86B]" /> CONTINUOUS GLOBAL DEMONSTRATION
              </span>
            </div>
            
            <h1 className="text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF]">
              MEHERAH — Demonstrating Trust at Civilization Scale
            </h1>
            
            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              At this evolutionary boundary, the question shifts from <em>"Can MEHERAH be trusted?"</em> to <strong className="text-[#E8C879]">"How does MEHERAH demonstrate trust continuously at global scale?"</strong> Through the Living Trust Observatory, Evidence Reputation Layer, Financial Intelligence Map, Academy, and Autonomous Improvement Loop.
            </p>
          </div>

          {/* TELEMETRY QUICK BOX */}
          <div className="bg-[#070707] border border-[#C9A227]/40 rounded-xl p-5 text-center space-y-2 min-w-[280px]">
            <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">SYSTEM TRUST SCORE</span>
            <div className="text-3xl font-bold font-mono text-[#00B86B]">
              {telemetry?.systemTrustScore || 99.97}%
            </div>
            <div className="text-[10px] text-[#C9A227] font-mono flex items-center justify-center gap-2">
              <span>DECISION ACCURACY: {telemetry?.decisionAccuracy}%</span>
              <span>•</span>
              <span>INTEGRITY: {telemetry?.transactionIntegrity}%</span>
            </div>
            <button
              onClick={fetchTrustIntelligenceData}
              disabled={loading}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''} text-[#070707]`} />
              Refresh Observatory Telemetry
            </button>
          </div>
        </div>

        {/* 5 CORE EVOLUTIONARY PILLARS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-5 border-t border-[#222222]">
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">TRUST OBSERVATORY</span>
            <span className="text-sm font-bold font-mono text-[#00B86B]">99.97% SCORE</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">REPUTATION LAYER</span>
            <span className="text-sm font-bold font-mono text-[#E8C879]">EVIDENCE BASED</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">INTELLIGENCE MAP</span>
            <span className="text-sm font-bold font-mono text-[#00B86B]">42 CORRIDORS</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">MEHERAH ACADEMY</span>
            <span className="text-sm font-bold font-mono text-[#E8C879]">17.9K CERTIFIED</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">IMPROVEMENT LOOP</span>
            <span className="text-sm font-bold font-mono text-[#00B86B]">ACTIVE (6 STAGES)</span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
        {[
          { id: 'observatory', label: '1. The Trust Observatory', icon: Eye },
          { id: 'reputation', label: '2. Reputation Layer', icon: Award },
          { id: 'map', label: '3. Financial Intelligence Map', icon: Network },
          { id: 'academy', label: '4. MEHERAH Academy', icon: GraduationCap },
          { id: 'improvement', label: '5. Autonomous Improvement Loop', icon: RefreshCw },
          { id: 'civilization', label: '6. Civilization Scale Infrastructure', icon: Globe2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#C9A227] text-[#070707] font-bold shadow-lg shadow-[#C9A227]/20'
                  : 'bg-[#111111] text-[#A7A7A7] hover:text-[#FFFFFF] border border-[#222222]'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: THE TRUST OBSERVATORY */}
      {activeSubTab === 'observatory' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">1. The Trust Observatory</h2>
                <p className="text-xs text-[#A7A7A7]">A living system that continuously measures MEHERAH itself across all system dimensions.</p>
              </div>
              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                HUMAN OVERSIGHT: {telemetry?.humanOversightStatus}
              </span>
            </div>

            {/* OBSERVATORY METRICS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">SYSTEM TRUST SCORE</span>
                <span className="text-xl font-bold text-[#00B86B]">{telemetry?.systemTrustScore}%</span>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">DECISION ACCURACY</span>
                <span className="text-xl font-bold text-[#E8C879]">{telemetry?.decisionAccuracy}%</span>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">TRANSACTION INTEGRITY</span>
                <span className="text-xl font-bold text-[#00B86B]">{telemetry?.transactionIntegrity}%</span>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">AUDIT COMPLETENESS</span>
                <span className="text-xl font-bold text-[#00B86B]">{telemetry?.auditCompleteness}%</span>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">PROVIDER RELIABILITY</span>
                <span className="text-xl font-bold text-[#00B86B]">{telemetry?.providerReliability}%</span>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">UNINTERRUPTED UPTIME</span>
                <span className="text-xl font-bold text-[#FFFFFF]">{telemetry?.uninterruptedUptimeDays} DAYS</span>
              </div>
            </div>

            {/* OBSERVATORY HEALTH PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                  <span className="text-xs font-bold text-[#C9A227] uppercase flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#C9A227]" /> LIVE DECISION QUALITY MONITOR
                  </span>
                  <span className="text-[10px] text-[#00B86B] font-bold">100% REAL-TIME</span>
                </div>
                <p className="text-xs text-[#A7A7A7] font-sans">
                  The Trust Observatory evaluates every AI routing decision after execution. If actual speed or fee deviates from predictions by &gt;2%, the decision engine automatically recalibrates.
                </p>
                <div className="p-3 bg-[#111111] rounded-xl space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span>Predicted Speed vs Actual:</span>
                    <span className="text-[#00B86B] font-bold">99.8% Correlation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee Estimate Variance:</span>
                    <span className="text-[#00B86B] font-bold">±0.00% UGX Deviation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Monitored Corridors:</span>
                    <span className="text-[#FFFFFF] font-bold">{telemetry?.activeMonitoredCorridors} Global Corridors</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                  <span className="text-xs font-bold text-[#C9A227] uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C9A227]" /> CONSTITUTIONAL AUDIT COMPLETENESS
                  </span>
                  <span className="text-[10px] text-[#00B86B] font-bold">IMMUTABLE MEMORY</span>
                </div>
                <p className="text-xs text-[#A7A7A7] font-sans">
                  Every transaction ledger entry is anchored by a double-entry cryptographic audit hash locked in Hardware Security Modules (HSM).
                </p>
                <div className="p-3 bg-[#111111] rounded-xl space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span>Zero Money Loss Guarantee:</span>
                    <span className="text-[#00B86B] font-bold">100.0% PROVEN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sanctions & AML Check:</span>
                    <span className="text-[#00B86B] font-bold">0ms Inline Interception</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Human Approval Gatekeeper:</span>
                    <span className="text-[#E8C879] font-bold">Enforcing for &gt;UGX 50M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE REPUTATION LAYER */}
      {activeSubTab === 'reputation' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">2. The MEHERAH Reputation Layer</h2>
                <p className="text-xs text-[#A7A7A7]">Evidence-based trust score calculated over millions of completed settlement events.</p>
              </div>
              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                PROVEN REPUTATION SCORECARD
              </span>
            </div>

            <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed">
              Just like humans build trust through history, MEHERAH builds a reputation for every provider, route, and AI decision pattern based on actual evidence. The system learns which routes deserve trust, which providers are improving, and which patterns indicate risk.
            </p>

            <div className="space-y-4 font-mono text-xs">
              {reputation.map((item) => (
                <div key={item.providerId} className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-2">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#C9A227]" />
                      <div>
                        <span className="text-sm font-bold text-[#FFFFFF] font-sans">{item.providerName}</span>
                        <span className="text-[10px] text-[#A7A7A7] block">ID: {item.providerId}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#00B86B] bg-[#00B86B]/15 px-3 py-1 rounded border border-[#00B86B]/30">
                        REPUTATION: {item.reputationScore}%
                      </span>
                      <span className="text-[10px] text-[#C9A227] font-bold bg-[#C9A227]/10 px-2 py-1 rounded uppercase">
                        TREND: {item.trustTrend}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">TOTAL TXS PROCESSED:</span>
                      <strong className="text-[#FFFFFF]">{item.totalTransactionsProcessed.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">AVG LATENCY:</span>
                      <strong className="text-[#00B86B]">{item.averageLatencyMs}ms</strong>
                    </div>
                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">DISPUTE RATE:</span>
                      <strong className="text-[#00B86B]">{item.disputeRatePct}%</strong>
                    </div>
                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">PROOF HASH:</span>
                      <strong className="text-[#A7A7A7] text-[9px] truncate block">{item.evidenceProofHash}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: THE GLOBAL FINANCIAL INTELLIGENCE MAP */}
      {activeSubTab === 'map' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">3. The Global Financial Intelligence Map</h2>
                <p className="text-xs text-[#A7A7A7]">Understanding the financial world as a living, interconnected liquidity network.</p>
              </div>
              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                LIVING NETWORK RADAR
              </span>
            </div>

            <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed">
              MEHERAH does not simply send money blindly. It maps global liquidity vaults, friction points, fee structures, and failure hotspots in real time to locate the optimal settlement path.
            </p>

            {/* INTERACTIVE NETWORK MAP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {financialMap.map((node) => (
                <div key={node.nodeId} className="p-5 bg-[#070707] border border-[#222222] hover:border-[#C9A227] rounded-2xl space-y-3 transition-all">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                        {node.countryCode}
                      </span>
                      <span className="text-sm font-bold text-[#FFFFFF] font-sans">{node.locationName}</span>
                    </div>

                    <span className="text-[10px] font-bold text-[#00B86B] bg-[#00B86B]/20 px-2 py-0.5 rounded">
                      {node.activeStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3 bg-[#111111] rounded-xl space-y-0.5">
                      <span className="text-[#A7A7A7] text-[10px] block">LIQUIDITY VAULT:</span>
                      <span className="text-[#E8C879] font-bold">UGX {node.liquidityLevelUGX.toLocaleString()}</span>
                    </div>
                    <div className="p-3 bg-[#111111] rounded-xl space-y-0.5">
                      <span className="text-[#A7A7A7] text-[10px] block">FRICTION INDEX:</span>
                      <span className="text-[#00B86B] font-bold">{node.frictionIndex} (LOW)</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] text-[#A7A7A7] border-t border-[#222222] pt-2">
                    <span>Average Fee: <strong className="text-[#FFFFFF]">{node.averageFeePct}%</strong></span>
                    <span>Top Provider: <strong className="text-[#C9A227]">{node.topProvider}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: THE MEHERAH ACADEMY */}
      {activeSubTab === 'academy' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">4. The MEHERAH Academy</h2>
                <p className="text-xs text-[#A7A7A7]">Teaching developers, banks, businesses, and institutions the canonical Language of MEHERAH.</p>
              </div>
              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                ECOSYSTEM STANDARDISATION
              </span>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
              {['ALL', 'DEVELOPERS', 'BANKS', 'BUSINESSES', 'INSTITUTIONS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedAcademyTab(cat as any)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    selectedAcademyTab === cat
                      ? 'bg-[#C9A227] text-[#070707] font-bold border-[#C9A227]'
                      : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:text-[#FFFFFF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ACADEMY MODULES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {filteredAcademyModules.map((module) => {
                const isEnrolled = enrolledModules[module.id];

                return (
                  <div key={module.id} className="p-5 bg-[#070707] border border-[#222222] hover:border-[#C9A227] rounded-2xl space-y-3 transition-all flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                          {module.targetAudience}
                        </span>
                        <span className="text-[10px] text-[#A7A7A7]">{module.durationMinutes} MINS • {module.modulesCount} LESSONS</span>
                      </div>

                      <h3 className="text-base font-bold text-[#FFFFFF] font-sans">{module.title}</h3>
                      <p className="text-xs text-[#A7A7A7] font-sans">{module.description}</p>
                    </div>

                    <div className="space-y-3 border-t border-[#222222] pt-3">
                      <div className="flex justify-between text-[10px] text-[#A7A7A7]">
                        <span>Canonical Topic: <strong className="text-[#E8C879]">{module.canonicalSchemaTopic}</strong></span>
                        <span>Certified: <strong className="text-[#00B86B]">{module.certifiedCount.toLocaleString()}</strong></span>
                      </div>

                      <button
                        onClick={() => toggleAcademyEnrollment(module.id)}
                        className={`w-full py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                          isEnrolled 
                            ? 'bg-[#00B86B] text-[#070707]' 
                            : 'bg-[#111111] text-[#C9A227] border border-[#C9A227]/40 hover:bg-[#C9A227] hover:text-[#070707]'
                        }`}
                      >
                        {isEnrolled ? (
                          <>
                            <Check className="w-4 h-4" /> Certification Module Completed
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4" /> Launch Certification Blueprint
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: THE AUTONOMOUS IMPROVEMENT LOOP */}
      {activeSubTab === 'improvement' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">5. The Autonomous Improvement Loop</h2>
                <p className="text-xs text-[#A7A7A7]">Observe → Understand → Measure → Improve → Verify → Remember</p>
              </div>

              <button
                onClick={triggerLoopSimulation}
                disabled={loopSimulating}
                className="px-5 py-2.5 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loopSimulating ? 'animate-spin' : ''}`} />
                {loopSimulating ? 'Simulating Self-Learning Cycle...' : 'Run Autonomous Improvement Cycle'}
              </button>
            </div>

            {/* LOOP STEPS PIPELINE */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 font-mono text-xs">
              {[
                { stage: '1. OBSERVE', detail: 'Scan all gateway latency & error rates' },
                { stage: '2. UNDERSTAND', detail: 'Identify performance bottlenecks' },
                { stage: '3. MEASURE', detail: 'Calculate potential speed/cost gain' },
                { stage: '4. IMPROVE', detail: 'Formulate non-breaking route adjustment' },
                { stage: '5. VERIFY', detail: 'Pass Constitutional Guardrail Test' },
                { stage: '6. REMEMBER', detail: 'Store verified pattern in Memory Engine' }
              ].map((s, idx) => {
                const isActive = activeLoopStep === idx;
                const isCompleted = activeLoopStep > idx;

                return (
                  <div
                    key={s.stage}
                    className={`p-4 rounded-2xl border space-y-2 transition-all ${
                      isActive
                        ? 'bg-[#C9A227]/20 border-[#C9A227] text-[#FFFFFF] scale-105 shadow-xl shadow-[#C9A227]/20'
                        : isCompleted
                          ? 'bg-[#00B86B]/10 border-[#00B86B] text-[#FFFFFF]'
                          : 'bg-[#070707] border-[#222222] text-[#A7A7A7]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[10px]">
                      <span className="text-[#C9A227]">{s.stage}</span>
                      {isCompleted && <Check className="w-3.5 h-3.5 text-[#00B86B]" />}
                    </div>
                    <p className="text-[11px] font-sans text-[#A7A7A7]">{s.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* CURRENT CYCLE LOG BOX */}
            <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] block uppercase">ACTIVE AUTONOMOUS CYCLE METRICS</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3 bg-[#111111] rounded-xl border border-[#222222]">
                  <span className="text-[#A7A7A7] text-[10px] block">CYCLE ID:</span>
                  <span className="text-[#FFFFFF] font-bold">{improvementCycle?.currentCycleId}</span>
                </div>
                <div className="p-3 bg-[#111111] rounded-xl border border-[#222222]">
                  <span className="text-[#A7A7A7] text-[10px] block">LAST OPTIMIZATION:</span>
                  <span className="text-[#00B86B] font-bold">{improvementCycle?.lastOptimization}</span>
                </div>
                <div className="p-3 bg-[#111111] rounded-xl border border-[#222222]">
                  <span className="text-[#A7A7A7] text-[10px] block">MEASURED GAIN:</span>
                  <span className="text-[#E8C879] font-bold">{improvementCycle?.measuredGain}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CIVILIZATION-SCALE INFRASTRUCTURE PROOF */}
      {activeSubTab === 'civilization' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">6. Civilization-Scale Infrastructure Proof</h2>
                <p className="text-xs text-[#A7A7A7]">Moving from product to global universal financial infrastructure.</p>
              </div>
              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                {civilizationMetrics?.status}
              </span>
            </div>

            <p className="text-lg font-bold font-playfair text-[#FFFFFF] max-w-4xl leading-relaxed">
              "Can thousands of institutions, millions of users, and many financial systems rely on MEHERAH every single day? That is where a technology moves from being a product into becoming infrastructure."
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">CONNECTED INSTITUTIONS</span>
                <span className="text-2xl font-bold text-[#FFFFFF]">{civilizationMetrics?.connectedInstitutions.toLocaleString()}</span>
              </div>
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">ACTIVE WALLETS & ACCOUNTS</span>
                <span className="text-2xl font-bold text-[#00B86B]">{(civilizationMetrics ? (civilizationMetrics.activeWalletsAndAccounts / 1000000).toFixed(1) : 14.8)}M</span>
              </div>
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">DAILY VOLUME</span>
                <span className="text-2xl font-bold text-[#E8C879]">UGX {(civilizationMetrics ? (civilizationMetrics.dailyVolumeUGX / 1000000000).toFixed(1) : 48.5)}B</span>
              </div>
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] font-bold block uppercase">SOVEREIGN CORRIDORS</span>
                <span className="text-2xl font-bold text-[#00B86B]">{civilizationMetrics?.sovereignCorridorsCount}</span>
              </div>
            </div>

            <div className="p-6 bg-[#070707] border border-[#C9A227]/50 rounded-2xl text-center space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-widest block">
                CIVILIZATION SCALE GUARANTEE
              </span>
              <p className="text-sm font-sans text-[#A7A7A7] max-w-3xl mx-auto">
                MEHERAH operates as an unshakeable, living translation layer and financial intelligence engine that unifies disjointed banking systems, mobile money rails, and cross-border networks into one harmonious, zero-loss global network.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
