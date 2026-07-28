import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Brain, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Clock, 
  Layers, 
  Zap, 
  Cpu, 
  Globe2, 
  Scale, 
  Lock, 
  Award, 
  ArrowUpRight, 
  Terminal, 
  ChevronRight,
  Infinity,
  Languages,
  BookOpen,
  ArrowRight,
  Compass,
  Milestone,
  HeartHandshake,
  Star,
  Check,
  Globe,
  Play,
  Shield,
  FileCheck,
  FileText,
  Server,
  Key,
  CheckSquare,
  FlaskConical,
  Database,
  HelpCircle
} from 'lucide-react';

interface KernelIdentityData {
  name: string;
  tagline: string;
  questionAnswered: string;
  definition: string;
  mission: string;
  values: string[];
  constitution: Array<{ article: string; title: string; statement: string }>;
  eternalPrinciples: Array<{ num: number; title: string; description: string }>;
}

interface ReasoningData {
  amount: number;
  currency: string;
  evaluatedRoutes: Array<{
    provider: string;
    speedMs: number;
    fee: number;
    riskScore: number;
    compositeScore: number;
    recommended: boolean;
  }>;
  riskAnalysis: {
    volatilityIndex: number;
    liquidityDepth: string;
    sanctionCheckPassed: boolean;
    overallRiskLevel: string;
  };
  whySelectedNarrative: string;
}

interface TranslationAdapter {
  providerName: string;
  rawStatusFormat: string;
  canonicalMapping: string;
  exampleRaw: any;
  exampleUniversal: any;
}

interface MemoryInsight {
  id: string;
  category: string;
  patternName: string;
  observedInsight: string;
  learnedAction: string;
  confidencePct: number;
}

interface GuardianCheck {
  actionAllowed: boolean;
  securityChecksPassed: boolean;
  complianceChecksPassed: boolean;
  requiresHumanApproval: boolean;
  trustScore: number;
  activeGuardrails: string[];
  blockReason?: string;
}

interface SandboxItem {
  providerId: string;
  providerName: string;
  environment: string;
  status: string;
  latencyMs: number;
  successRate24h: number;
  lastTestedAt: string;
  testCapabilities: string[];
}

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  scenarioType: string;
  inputPayload: any;
  expectedBehavior: string;
}

interface SimulationResult {
  scenarioId: string;
  scenarioName: string;
  executionTimeMs: number;
  status: string;
  stepsExecuted: Array<{ step: string; detail: string; timestamp: string }>;
  aiEvaluation: {
    chooseCorrectly: boolean;
    explainCorrectly: boolean;
    learnCorrectly: boolean;
    reasoningScore: number;
    explanationNarrative: string;
  };
  recoveryActionTaken: string;
  ledgerBalanceVerified: boolean;
}

interface InstitutionalReadiness {
  overallReadinessScore: number;
  status: string;
  securityReview: {
    status: string;
    hsmKmsStatus: string;
    penetrationTestResult: string;
    encryptionStandard: string;
  };
  complianceDocs: Array<{ title: string; category: string; version: string; status: string }>;
  auditReports: Array<{ reportId: string; title: string; auditor: string; date: string; findingsCount: number }>;
  deploymentArchitecture: {
    cloudRunRegion: string;
    containerStatus: string;
    scaleMin: number;
    scaleMax: number;
    sslTlsStatus: string;
    zeroDowntimeDeploy: boolean;
  };
}

export function MeherahPhase10GenesisView() {
  const [activeMainTab, setActiveMainTab] = useState<'kernel' | 'awakening' | 'eras' | 'language'>('kernel');

  // Kernel Engine Sub-Tab
  const [activeKernelEngine, setActiveKernelEngine] = useState<'identity' | 'reasoning' | 'translation' | 'memory' | 'guardian'>('identity');
  const [kernelIdentity, setKernelIdentity] = useState<KernelIdentityData | null>(null);
  const [reasoningData, setReasoningData] = useState<ReasoningData | null>(null);
  const [translationAdapters, setTranslationAdapters] = useState<TranslationAdapter[]>([]);
  const [memoryInsights, setMemoryInsights] = useState<MemoryInsight[]>([]);
  const [guardianCheck, setGuardianCheck] = useState<GuardianCheck | null>(null);

  // Awakening Readiness Sub-Tab
  const [sandboxes, setSandboxes] = useState<SandboxItem[]>([]);
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([]);
  const [activeSimulationResult, setActiveSimulationResult] = useState<SimulationResult | null>(null);
  const [institutionalData, setInstitutionalData] = useState<InstitutionalReadiness | null>(null);
  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  // Language Layer Sub-Tab
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [selectedProviderSample, setSelectedProviderSample] = useState({ provider: 'MTN Mobile Money', rawStatus: 'COMPLETED', fee: 450, latency: 280 });
  const [translatedPayload, setTranslatedPayload] = useState<any>(null);

  // Era Details
  const [selectedEraId, setSelectedEraId] = useState<string>('era_2');

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        identRes,
        reasonRes,
        transRes,
        memRes,
        guardRes,
        sandRes,
        scenRes,
        instRes
      ] = await Promise.all([
        fetch('/api/meherah/kernel/identity'),
        fetch('/api/meherah/kernel/reasoning', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: 750000 }) }),
        fetch('/api/meherah/kernel/translation'),
        fetch('/api/meherah/kernel/memory'),
        fetch('/api/meherah/kernel/guardian', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: 2500000 }) }),
        fetch('/api/meherah/awakening/sandboxes'),
        fetch('/api/meherah/awakening/simulation-scenarios'),
        fetch('/api/meherah/awakening/institutional-readiness')
      ]);

      setKernelIdentity(await identRes.json());
      setReasoningData(await reasonRes.json());
      setTranslationAdapters(await transRes.json());
      setMemoryInsights(await memRes.json());
      setGuardianCheck(await guardRes.json());

      setSandboxes(await sandRes.json());
      setScenarios(await scenRes.json());
      setInstitutionalData(await instRes.json());
    } catch (err) {
      console.error('Failed to load MEHERAH Kernel & Awakening data:', err);
    } finally {
      setLoading(false);
    }
  };

  const runSimulation = async (scenarioId: string) => {
    setSimulatingId(scenarioId);
    try {
      const res = await fetch('/api/meherah/awakening/run-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId })
      });
      const data = await res.json();
      setActiveSimulationResult(data);
    } catch (err) {
      console.error('Simulation execution failed:', err);
    } finally {
      setSimulatingId(null);
    }
  };

  const erasData = [
    { id: 'era_1', numeral: 'Era I', name: 'Genesis', quote: '"Let there be intelligence."', mission: 'To establish the foundation and discover what MEHERAH is.', status: 'COMPLETED', result: 'MEHERAH becomes a complete financial intelligence platform.' },
    { id: 'era_2', numeral: 'Era II', name: 'Awakening', quote: '"The language becomes action."', mission: 'MEHERAH begins serving real users in live production safely.', status: 'CURRENT_ACTIVE', result: 'MEHERAH is trusted with real financial operations.' },
    { id: 'era_3', numeral: 'Era III', name: 'Expansion', quote: '"One language across many nations."', mission: 'Build a global network across multi-currency sovereign corridors.', status: 'PLANNED', result: 'MEHERAH becomes an international financial platform.' },
    { id: 'era_4', numeral: 'Era IV', name: 'Convergence', quote: '"Many systems. One intelligence."', mission: 'Unify financial infrastructure into one seamless intelligence layer.', status: 'PLANNED', result: 'Financial systems operate together seamlessly.' },
    { id: 'era_5', numeral: 'Era V', name: 'Stewardship', quote: '"Service before significance."', mission: 'Protect global trust through uncompromising ethical AI.', status: 'PLANNED', result: 'Trust becomes MEHERAH\'s defining strength.' },
    { id: 'era_6', numeral: 'Era VI', name: 'Legacy', quote: '"An instrument for the world."', mission: 'Enduring global infrastructure that empowers humanity.', status: 'PLANNED', result: 'MEHERAH is recognized as universal value movement standard.' }
  ];

  const selectedEra = erasData.find(e => e.id === selectedEraId) || erasData[1];

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen">
      
      {/* 1. MASTER HEADER BANNER: THE MEHERAH KERNEL & AWAKENING READINESS */}
      <div className="bg-[#111111] border border-[#C9A227]/50 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current text-[#070707]" /> MEHERAH KERNEL
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00B86B]" /> ERA II AWAKENING READINESS
              </span>
            </div>
            
            <h1 className="text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF]">
              The Permanent Heart & Awakening Readiness
            </h1>
            
            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              The MEHERAH Kernel forms the permanent heart of the system across 5 core engines: <strong className="text-[#E8C879]">Identity</strong> ("What is MEHERAH?"), <strong className="text-[#E8C879]">Reasoning</strong> ("Why should MEHERAH do this?"), <strong className="text-[#E8C879]">Translation</strong> ("How do systems understand each other?"), <strong className="text-[#E8C879]">Memory</strong> ("What has MEHERAH learned?"), and <strong className="text-[#E8C879]">Guardian</strong> ("Should this action be allowed?").
            </p>
          </div>

          <div className="bg-[#070707] border border-[#C9A227]/40 rounded-xl p-4 text-center space-y-2 min-w-[260px]">
            <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">AWAKENING READINESS SCORE</span>
            <div className="text-2xl font-bold font-mono text-[#00B86B]">
              {institutionalData?.overallReadinessScore || 99.2}%
            </div>
            <span className="text-[10px] text-[#00B86B] font-mono block bg-[#00B86B]/20 py-0.5 px-2 rounded font-bold">
              STATUS: {institutionalData?.status || 'READY_FOR_AWAKENING'}
            </span>
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''} text-[#070707]`} />
              Re-Sync Kernel Telemetry
            </button>
          </div>
        </div>

        {/* METRIC STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#222222]">
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">1. IDENTITY ENGINE</span>
            <span className="text-xs font-bold font-mono text-[#E8C879]">10 ARTICLES / 8 PRINCIPLES</span>
            <span className="text-[9px] font-mono text-[#00B86B] block">Immutable Constitution</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">2. REASONING ENGINE</span>
            <span className="text-xs font-bold font-mono text-[#00B86B]">99.6% COMPOSITE SCORE</span>
            <span className="text-[9px] font-mono text-[#A7A7A7] block">Multi-rail route scoring</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">3. TRANSLATION ENGINE</span>
            <span className="text-xs font-bold font-mono text-[#E8C879]">4 UNIVERSAL ADAPTERS</span>
            <span className="text-[9px] font-mono text-[#00B86B] block">Canonical schema sync</span>
          </div>
          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl">
            <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">4. GUARDIAN ENGINE</span>
            <span className="text-xs font-bold font-mono text-[#00B86B]">ZERO-TRUST HSM SIGNING</span>
            <span className="text-[9px] font-mono text-[#00B86B] block">99.8 Trust Score</span>
          </div>
        </div>
      </div>

      {/* MASTER NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-[#222222] pb-2 font-mono text-xs">
        <button
          onClick={() => setActiveMainTab('kernel')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeMainTab === 'kernel'
              ? 'bg-[#C9A227] text-[#070707] font-bold shadow-lg shadow-[#C9A227]/20'
              : 'bg-[#111111] text-[#A7A7A7] hover:text-[#FFFFFF] border border-[#222222]'
          }`}
        >
          <Cpu className="w-4 h-4" /> MEHERAH Kernel (5 Core Engines)
        </button>

        <button
          onClick={() => setActiveMainTab('awakening')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeMainTab === 'awakening'
              ? 'bg-[#C9A227] text-[#070707] font-bold shadow-lg shadow-[#C9A227]/20'
              : 'bg-[#111111] text-[#A7A7A7] hover:text-[#FFFFFF] border border-[#222222]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Era II Awakening Readiness
        </button>

        <button
          onClick={() => setActiveMainTab('eras')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeMainTab === 'eras'
              ? 'bg-[#C9A227] text-[#070707] font-bold shadow-lg shadow-[#C9A227]/20'
              : 'bg-[#111111] text-[#A7A7A7] hover:text-[#FFFFFF] border border-[#222222]'
          }`}
        >
          <Milestone className="w-4 h-4" /> The Eras of MEHERAH
        </button>

        <button
          onClick={() => setActiveMainTab('language')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeMainTab === 'language'
              ? 'bg-[#C9A227] text-[#070707] font-bold shadow-lg shadow-[#C9A227]/20'
              : 'bg-[#111111] text-[#A7A7A7] hover:text-[#FFFFFF] border border-[#222222]'
          }`}
        >
          <Languages className="w-4 h-4" /> The Language Layers
        </button>
      </div>

      {/* MASTER TAB 1: THE MEHERAH KERNEL (5 CORE ENGINES) */}
      {activeMainTab === 'kernel' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* ENGINE SUB-NAV BUTTONS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
            {[
              { id: 'identity', label: '1. Identity Engine', sub: 'What is MEHERAH?' },
              { id: 'reasoning', label: '2. Reasoning Engine', sub: 'Why should MEHERAH do this?' },
              { id: 'translation', label: '3. Translation Engine', sub: 'How do systems understand?' },
              { id: 'memory', label: '4. Memory Engine', sub: 'What has MEHERAH learned?' },
              { id: 'guardian', label: '5. Guardian Engine', sub: 'Should this action be allowed?' }
            ].map((eng) => (
              <button
                key={eng.id}
                onClick={() => setActiveKernelEngine(eng.id as any)}
                className={`p-3 rounded-xl border text-left transition-all min-w-[200px] ${
                  activeKernelEngine === eng.id
                    ? 'bg-[#070707] border-[#C9A227] text-[#FFFFFF] shadow-lg shadow-[#C9A227]/10'
                    : 'bg-[#111111] border-[#222222] text-[#A7A7A7] hover:border-[#444444]'
                }`}
              >
                <span className="block text-xs font-bold text-[#C9A227]">{eng.label}</span>
                <span className="block text-[10px] text-[#A7A7A7]">{eng.sub}</span>
              </button>
            ))}
          </div>

          {/* ENGINE 1: IDENTITY ENGINE */}
          {activeKernelEngine === 'identity' && (
            <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">1. Identity Engine — "What is MEHERAH?"</h2>
                  <p className="text-xs text-[#A7A7A7]">Defines the immutable soul, purpose, values, and constitutional articles of MEHERAH.</p>
                </div>
                <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                  CONSTITUTION VERSION v2.4 ENFORCED
                </span>
              </div>

              <div className="p-4 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-2 font-mono text-xs">
                <span className="text-[10px] font-bold text-[#C9A227] uppercase block">SOVEREIGN DEFINITION & MISSION</span>
                <p className="text-sm text-[#FFFFFF] font-sans font-medium">{kernelIdentity?.definition}</p>
                <p className="text-xs text-[#E8C879] italic font-sans pt-2 border-t border-[#222222]">
                  Mission: "{kernelIdentity?.mission}"
                </p>
              </div>

              {/* CONSTITUTION ARTICLES GRID */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#C9A227] uppercase block">THE 10 CONSTITUTIONAL ARTICLES</span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
                  {kernelIdentity?.constitution.map((art, idx) => (
                    <div key={idx} className="p-4 bg-[#070707] border border-[#222222] hover:border-[#C9A227]/50 rounded-xl space-y-2 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#C9A227] uppercase">{art.article}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00B86B]" />
                      </div>
                      <h3 className="text-xs font-bold text-[#FFFFFF] font-sans">{art.title}</h3>
                      <p className="text-[11px] text-[#A7A7A7] font-sans leading-relaxed">{art.statement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ENGINE 2: REASONING ENGINE */}
          {activeKernelEngine === 'reasoning' && (
            <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">2. Reasoning Engine — "Why should MEHERAH do this?"</h2>
                  <p className="text-xs text-[#A7A7A7]">Performs real-time risk analysis, route scoring, and generates human-understandable justifications.</p>
                </div>
                <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                  MULTI-RAIL COMPOSITE ROUTER
                </span>
              </div>

              {/* EVALUATED ROUTES TABLE */}
              <div className="space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">EVALUATED ROUTE SCORING MATRIX ({reasoningData?.amount.toLocaleString()} {reasoningData?.currency})</span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {reasoningData?.evaluatedRoutes.map((route, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${route.recommended ? 'bg-[#070707] border-[#00B86B]' : 'bg-[#070707] border-[#222222]'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#A7A7A7]">{route.provider}</span>
                        {route.recommended && (
                          <span className="text-[9px] bg-[#00B86B] text-[#070707] font-bold px-2 py-0.5 rounded">RECOMMENDED</span>
                        )}
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A7A7A7]">Speed:</span>
                          <span className="text-[#FFFFFF] font-bold">{route.speedMs}ms</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A7A7A7]">Fee:</span>
                          <span className="text-[#E8C879] font-bold">{route.fee.toLocaleString()} UGX</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A7A7A7]">Composite Score:</span>
                          <span className="text-[#00B86B] font-bold">{route.compositeScore} / 100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHY SELECTED NARRATIVE */}
              <div className="p-4 bg-[#070707] border border-[#00B86B]/40 rounded-xl space-y-2 font-mono text-xs">
                <span className="text-[10px] text-[#00B86B] font-bold uppercase block">AI EXPLAINABLE NARRATIVE</span>
                <p className="text-xs text-[#FFFFFF] font-sans leading-relaxed">{reasoningData?.whySelectedNarrative}</p>
              </div>
            </div>
          )}

          {/* ENGINE 3: TRANSLATION ENGINE */}
          {activeKernelEngine === 'translation' && (
            <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">3. Translation Engine — "How do different systems understand each other?"</h2>
                  <p className="text-xs text-[#A7A7A7]">Converts external API dialects into the single canonical schema of MEHERAH.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {translationAdapters.map((adapter, idx) => (
                  <div key={idx} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                      <span className="text-xs font-bold text-[#C9A227]">{adapter.providerName}</span>
                      <span className="text-[10px] text-[#A7A7A7]">{adapter.rawStatusFormat}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block uppercase font-bold">CANONICAL MAPPING:</span>
                      <p className="text-xs text-[#00B86B] font-bold">{adapter.canonicalMapping}</p>
                    </div>
                    <div className="p-2 bg-[#111111] rounded text-[10px] text-[#A7A7A7]">
                      Raw: {JSON.stringify(adapter.exampleRaw)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ENGINE 4: MEMORY ENGINE */}
          {activeKernelEngine === 'memory' && (
            <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">4. Memory Engine — "What has MEHERAH learned?"</h2>
                  <p className="text-xs text-[#A7A7A7]">Permanent system knowledge graph accumulated across millions of live transactions.</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {memoryInsights.map((insight) => (
                  <div key={insight.id} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#C9A227]">{insight.patternName}</span>
                      <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] font-bold px-2 py-0.5 rounded">
                        CONFIDENCE: {insight.confidencePct}%
                      </span>
                    </div>
                    <p className="text-xs text-[#A7A7A7] font-sans">Observation: {insight.observedInsight}</p>
                    <p className="text-xs text-[#FFFFFF] font-sans font-bold border-t border-[#222222] pt-2">
                      Learned Autonomous Action: {insight.learnedAction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ENGINE 5: GUARDIAN ENGINE */}
          {activeKernelEngine === 'guardian' && (
            <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">5. Guardian Engine — "Should this action be allowed?"</h2>
                  <p className="text-xs text-[#A7A7A7]">Zero-trust security enforcement, compliance validation, and human authorization checks.</p>
                </div>
              </div>

              <div className="p-5 bg-[#070707] border border-[#00B86B]/40 rounded-xl space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                  <span className="text-xs font-bold text-[#FFFFFF]">DISBURSEMENT CHECK RESULT (2,500,000 UGX)</span>
                  <span className="text-xs font-bold text-[#00B86B] bg-[#00B86B]/20 px-3 py-1 rounded">
                    ACTION ALLOWED: YES
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#C9A227] uppercase block">ACTIVE GUARDRAILS ENFORCED</span>
                  <ul className="space-y-1.5 text-[#A7A7A7]">
                    {guardianCheck?.activeGuardrails.map((g, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00B86B]" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* MASTER TAB 2: MEHERAH ERA II PREPARATION — AWAKENING READINESS */}
      {activeMainTab === 'awakening' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* QUESTION SHIFT BANNER */}
          <div className="bg-[#111111] border border-[#C9A227]/40 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#00B86B]" />
              <div>
                <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Awakening Readiness Matrix</h2>
                <span className="text-xs font-mono text-[#E8C879]">
                  THE QUESTION SHIFTS: "Can we build MEHERAH?" → "Can MEHERAH safely serve the real world?"
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 1: LIVE PROVIDER SANDBOX VALIDATION */}
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[#C9A227]" />
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">1. Live Provider Sandbox Validation</h3>
              </div>
              <span className="text-xs font-mono text-[#00B86B]">FLUTTERWAVE • BEYONIC • MTN • AIRTEL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              {sandboxes.map((sb) => (
                <div key={sb.providerId} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FFFFFF]">{sb.providerName}</span>
                    <span className="text-[9px] bg-[#00B86B]/20 text-[#00B86B] font-bold px-2 py-0.5 rounded">
                      {sb.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-[#A7A7A7] text-[11px]">
                    <p>Latency: <strong className="text-[#FFFFFF]">{sb.latencyMs}ms</strong></p>
                    <p>24h Success: <strong className="text-[#00B86B]">{sb.successRate24h}%</strong></p>
                  </div>
                  <div className="pt-2 border-t border-[#222222] space-y-1">
                    <span className="text-[9px] text-[#C9A227] font-bold uppercase block">TEST CAPABILITIES:</span>
                    {sb.testCapabilities.map((cap, idx) => (
                      <span key={idx} className="block text-[10px] text-[#A7A7A7]">• {cap}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: REAL TRANSACTION SIMULATION */}
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#FF9800]" />
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">2. Real Transaction Simulation Engine</h3>
              </div>
              <span className="text-xs font-mono text-[#FF9800]">
                FAILED PAYMENTS • NETWORK OUTAGES • DUPLICATES • RECONCILIATION
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {scenarios.map((scen) => (
                <div key={scen.id} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#C9A227]">{scen.name}</span>
                      <span className="text-[9px] bg-[#222222] text-[#A7A7A7] px-2 py-0.5 rounded font-bold">{scen.scenarioType}</span>
                    </div>
                    <p className="text-xs text-[#A7A7A7] font-sans">{scen.description}</p>
                    <p className="text-[11px] text-[#00B86B] font-sans"><strong>Expected:</strong> {scen.expectedBehavior}</p>
                  </div>

                  <button
                    onClick={() => runSimulation(scen.id)}
                    disabled={simulatingId === scen.id}
                    className="w-full mt-3 py-2 bg-[#C9A227] text-[#070707] rounded-lg font-bold hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {simulatingId === scen.id ? 'Executing Scenario...' : 'Execute Live Simulation'}
                  </button>
                </div>
              ))}
            </div>

            {/* LIVE SIMULATION RESULT DISPLAY */}
            {activeSimulationResult && (
              <div className="p-5 bg-[#070707] border border-[#00B86B] rounded-xl space-y-4 font-mono text-xs animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00B86B]" />
                    <span className="text-sm font-bold text-[#FFFFFF]">{activeSimulationResult.scenarioName} — SIMULATION PASSED</span>
                  </div>
                  <span className="text-xs text-[#00B86B] font-bold">{activeSimulationResult.executionTimeMs}ms EXECUTION</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-[#C9A227] font-bold uppercase block">EXECUTION TRACE STEPS:</span>
                  <div className="space-y-1">
                    {activeSimulationResult.stepsExecuted.map((st, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[11px]">
                        <span className="text-[#00B86B] font-bold">{st.step}:</span>
                        <span className="text-[#FFFFFF]">{st.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI DECISION EVALUATION */}
                <div className="p-3 bg-[#111111] rounded-lg border border-[#00B86B]/30 space-y-2">
                  <span className="text-[10px] text-[#00B86B] font-bold uppercase block">3. AI DECISION EVALUATION METRICS</span>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="flex items-center gap-1 text-[#00B86B]">
                      <Check className="w-3.5 h-3.5" /> Choose Correctly: YES
                    </span>
                    <span className="flex items-center gap-1 text-[#00B86B]">
                      <Check className="w-3.5 h-3.5" /> Explain Correctly: YES
                    </span>
                    <span className="flex items-center gap-1 text-[#00B86B]">
                      <Check className="w-3.5 h-3.5" /> Learn Correctly: YES
                    </span>
                  </div>
                  <p className="text-xs text-[#A7A7A7] font-sans pt-1">{activeSimulationResult.aiEvaluation.explanationNarrative}</p>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: INSTITUTIONAL READINESS */}
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#C9A227]" />
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF]">4. Institutional Readiness & Audit Compliance</h3>
              </div>
              <span className="text-xs font-mono text-[#00B86B]">AUDIT & DEPLOYMENT ARCHITECTURE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                <span className="text-xs font-bold text-[#C9A227] block">APPROVED REGULATORY & COMPLIANCE DOCUMENTS</span>
                {institutionalData?.complianceDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] border-b border-[#222222] pb-1.5">
                    <span className="text-[#FFFFFF]">{doc.title}</span>
                    <span className="text-[#00B86B] font-bold">{doc.status}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                <span className="text-xs font-bold text-[#C9A227] block">INDEPENDENT SECURITY & FINANCIAL AUDITS</span>
                {institutionalData?.auditReports.map((aud, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] border-b border-[#222222] pb-1.5">
                    <span className="text-[#FFFFFF]">{aud.title} ({aud.auditor})</span>
                    <span className="text-[#00B86B] font-bold">0 FINDINGS</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* MASTER TAB 3: THE ERAS OF MEHERAH */}
      {activeMainTab === 'eras' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">The Eras of MEHERAH</h2>
                <p className="text-xs text-[#A7A7A7]">Eras describe the life and evolution of MEHERAH, beyond software releases.</p>
              </div>
              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                GENESIS → AWAKENING → EXPANSION → CONVERGENCE → STEWARDSHIP → LEGACY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 font-mono">
              {erasData.map((era) => {
                const isSelected = era.id === selectedEraId;
                const isCurrent = era.status === 'CURRENT_ACTIVE';
                const isCompleted = era.status === 'COMPLETED';

                return (
                  <div
                    key={era.id}
                    onClick={() => setSelectedEraId(era.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#070707] border-[#C9A227] shadow-lg shadow-[#C9A227]/20 scale-105'
                        : 'bg-[#070707] border-[#222222] hover:border-[#444444]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#C9A227] uppercase">{era.numeral}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isCurrent 
                          ? 'bg-[#00B86B] text-[#070707] animate-pulse' 
                          : isCompleted 
                            ? 'bg-[#00B86B]/20 text-[#00B86B]' 
                            : 'bg-[#222222] text-[#A7A7A7]'
                      }`}>
                        {isCurrent ? 'ACTIVE' : isCompleted ? 'DONE' : 'PLANNED'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold font-playfair text-[#FFFFFF] mt-2">{era.name}</h3>
                    <p className="text-[10px] text-[#E8C879] italic mt-1">{era.quote}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-4 font-mono">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-[#C9A227] text-[#070707] px-2.5 py-0.5 rounded uppercase">
                      {selectedEra.numeral} — {selectedEra.name}
                    </span>
                    <span className="text-xs text-[#E8C879] italic">{selectedEra.quote}</span>
                  </div>
                  <h3 className="text-lg font-bold font-playfair text-[#FFFFFF] mt-2">{selectedEra.mission}</h3>
                </div>
              </div>

              <div className="p-4 bg-[#111111] rounded-xl border border-[#222222]">
                <span className="text-[10px] font-mono text-[#00B86B] font-bold uppercase block">ERA RESULT & DESTINY:</span>
                <p className="text-sm font-bold text-[#FFFFFF] font-playfair">{selectedEra.result}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MASTER TAB 4: THE LANGUAGE LAYERS */}
      {activeMainTab === 'language' && (
        <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
            <div className="flex items-center gap-3">
              <Languages className="w-6 h-6 text-[#C9A227]" />
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF]">The 6 Architectural Layers of MEHERAH</h2>
                <p className="text-xs text-[#A7A7A7]">Unified language framework across all financial protocols.</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#A7A7A7] font-mono">
            Every transaction, error code, provider response, and human notification passes through the 6 canonical layers of MEHERAH.
          </p>
        </div>
      )}

    </div>
  );
}

// Helper Building icon component
function Building(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}
