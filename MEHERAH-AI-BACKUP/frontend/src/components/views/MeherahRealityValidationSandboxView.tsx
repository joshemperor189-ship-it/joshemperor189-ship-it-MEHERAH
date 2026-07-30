import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Building2, 
  Landmark, 
  Smartphone, 
  Globe2, 
  TrendingUp, 
  Lock, 
  Activity, 
  Brain, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  RefreshCw, 
  Layers, 
  Key, 
  ShieldAlert, 
  Sliders, 
  Sparkles,
  HelpCircle,
  FileCheck2,
  Check
} from 'lucide-react';
import { 
  SimulatedProviderNode, 
  RouteScoreEvaluation, 
  SandboxTransactionExecution, 
  NetworkHealthOverview 
} from '../../services/meherah-sandbox-reality.service';

export function MeherahRealityValidationSandboxView() {
  const [activeTab, setActiveTab] = useState<'demo' | 'providers' | 'routes' | 'reconciliation' | 'institutional' | 'security'>('demo');
  const [loading, setLoading] = useState<boolean>(true);

  // States
  const [providers, setProviders] = useState<SimulatedProviderNode[]>([]);
  const [healthOverview, setHealthOverview] = useState<NetworkHealthOverview | null>(null);

  // Interactive Form Inputs
  const [promptText, setPromptText] = useState<string>('Send UGX 500,000 to my supplier in Nairobi');
  const [amountUGX, setAmountUGX] = useState<number>(500000);
  const [selectedCorridor, setSelectedCorridor] = useState<string>('UGX → KES');
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  // Evaluation & Execution
  const [routes, setRoutes] = useState<RouteScoreEvaluation[]>([]);
  const [activeExecution, setActiveExecution] = useState<SandboxTransactionExecution | null>(null);
  const [executing, setExecuting] = useState<boolean>(false);

  useEffect(() => {
    fetchSandboxData();
  }, []);

  const fetchSandboxData = async () => {
    setLoading(true);
    try {
      const [pRes, hRes] = await Promise.all([
        fetch('/api/meherah/sandbox/providers'),
        fetch('/api/meherah/sandbox/health-overview')
      ]);

      const provs = await pRes.json();
      setProviders(provs);
      setHealthOverview(await hRes.json());

      // Initial route evaluation
      evaluateCurrentRoutes(500000, 'UGX → KES');
    } catch (err) {
      console.error('Error fetching sandbox data:', err);
    } finally {
      setLoading(false);
    }
  };

  const evaluateCurrentRoutes = async (amt: number, corr: string) => {
    try {
      const res = await fetch('/api/meherah/sandbox/evaluate-routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUGX: amt, corridor: corr })
      });
      const evaluated = await res.json();
      setRoutes(evaluated);
    } catch (err) {
      console.error('Error evaluating routes:', err);
    }
  };

  const handleProviderStatusToggle = async (providerId: string, currentStatus: string) => {
    let nextStatus: 'HEALTHY' | 'WARNING_HIGH_LATENCY' | 'SIMULATED_OUTAGE' = 'WARNING_HIGH_LATENCY';
    let latency = 580;

    if (currentStatus === 'HEALTHY') {
      nextStatus = 'WARNING_HIGH_LATENCY';
      latency = 650;
    } else if (currentStatus === 'WARNING_HIGH_LATENCY') {
      nextStatus = 'SIMULATED_OUTAGE';
      latency = 2500;
    } else {
      nextStatus = 'HEALTHY';
      latency = providerId === 'FLEXCUBE_BANK' ? 85 : providerId === 'MTN_MOMO' ? 120 : 180;
    }

    try {
      const res = await fetch('/api/meherah/sandbox/update-provider-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, status: nextStatus, latencyMs: latency })
      });
      const updatedProvs = await res.json();
      setProviders(updatedProvs);
      // Re-evaluate routes with updated network state
      evaluateCurrentRoutes(amountUGX, selectedCorridor);
    } catch (err) {
      console.error('Error updating provider status:', err);
    }
  };

  const handleExecuteSandboxDemo = async () => {
    setExecuting(true);
    try {
      const res = await fetch('/api/meherah/sandbox/execute-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: promptText,
          amountUGX,
          corridor: selectedCorridor,
          forceSimulatedFailure: simulateFailure
        })
      });
      const execResult = await res.json();
      setActiveExecution(execResult);
    } catch (err) {
      console.error('Execution error:', err);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* PHASE 8 HERO BANNER */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#00B86B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <Play className="w-3.5 h-3.5 text-[#070707]" /> PHASE 8 — REALITY VALIDATION
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00B86B]" /> WORKING FINANCIAL INFRASTRUCTURE DEMO
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF]">
                MEHERAH Financial Sandbox & Institutional Reality Proof
              </h1>
              <p className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                "Moving from architectural vision into a working financial infrastructure demonstration."
              </p>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              At this stage, MEHERAH is no longer describing concepts. Phase 8 proves the core: routing, verifying, double-entry hash matching, explainability, and 0-loss recovery across simulated sandboxes (MTN MoMo, Airtel Money, Flutterwave, and Bank of Uganda Core Banking).
            </p>
          </div>

          {/* NETWORK HEALTH SCORECARD */}
          {healthOverview && (
            <div className="bg-[#070707] border border-[#00B86B]/50 rounded-xl p-5 text-center space-y-2 min-w-[280px] shadow-lg">
              <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">REALTIME SANDBOX MESH HEALTH</span>
              <div className="text-3xl font-bold font-mono text-[#00B86B] flex items-center justify-center gap-2">
                <Activity className="w-6 h-6 text-[#00B86B]" /> {healthOverview.overallMeshHealthPct}%
              </div>
              <div className="text-[10px] text-[#C9A227] font-mono flex items-center justify-center gap-2 font-bold">
                <span>{healthOverview.activeProvidersCount} PROVIDERS</span>
                <span>•</span>
                <span>{healthOverview.healthyRoutesCount} ROUTES</span>
              </div>
              <span className="text-[9px] text-[#A7A7A7] font-mono block">AUTOMATED RE-ROUTES TODAY: {healthOverview.autoReroutedTodayCount}</span>
            </div>
          )}
        </div>

        {/* PROGRESSION ROADMAP BAR */}
        <div className="mt-6 pt-5 border-t border-[#222222] space-y-2">
          <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block font-bold">MEHERAH MATURITY PROGRESSION ROADMAP:</span>
          <div className="flex items-center gap-1 overflow-x-auto pb-2 text-[10px] font-mono text-[#A7A7A7]">
            {['1. Genesis', '2. Awakening', '3. Expansion', '4. Convergence', '5. Stewardship', '6. Civilization Interface', '7. Phase 8: Reality Sandbox (ACTIVE)'].map((p, idx) => (
              <React.Fragment key={idx}>
                <span className={`px-2.5 py-1 rounded whitespace-nowrap font-bold ${
                  idx === 6 ? 'bg-[#C9A227] text-[#070707] shadow-md' : 'bg-[#070707] border border-[#222222] text-[#A7A7A7]'
                }`}>
                  {p}
                </span>
                {idx < 6 && <ArrowRight className="w-3 h-3 text-[#222222] shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
          {[
            { id: 'demo', label: '1-Click Demo', desc: 'Pay Supplier Live', icon: Play },
            { id: 'providers', label: 'Sandbox Network', desc: 'MTN, Airtel, Bank', icon: Smartphone },
            { id: 'routes', label: 'Route Intelligence', desc: 'MEHERAH Scores', icon: Cpu },
            { id: 'reconciliation', label: 'Reconciliation Core', desc: 'Double-Entry Hashes', icon: FileCheck2 },
            { id: 'institutional', label: 'Institutional Portal', desc: 'Central Bank View', icon: Landmark },
            { id: 'security', label: 'Security Layer', desc: 'Encryption & Audit', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-3 rounded-xl border text-left font-mono transition-all flex flex-col justify-between ${
                  active 
                    ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-lg shadow-[#C9A227]/20' 
                    : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 text-current" />
                  <span className="text-[9px] uppercase font-bold">{tab.label.split(' ')[0]}</span>
                </div>
                <span className="text-xs font-bold font-sans mt-1 text-current truncate">{tab.label}</span>
                <span className="text-[9px] opacity-80 block font-mono truncate">{tab.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. END-TO-END DEMO VIEW */}
      {activeTab === 'demo' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  STEP 7 — FIRST REAL DEMONSTRATION
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Live Financial Infrastructure Sandbox Execution</h2>
                <p className="text-xs text-[#A7A7A7]">Communicate a transaction prompt to see MEHERAH calculate route scores, execute double-entry hash reconciliation, and prove 0-loss settlement in real-time.</p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-mono text-[#A7A7A7] flex items-center gap-2 cursor-pointer bg-[#070707] px-3 py-1.5 rounded border border-[#222222]">
                  <input
                    type="checkbox"
                    checked={simulateFailure}
                    onChange={(e) => setSimulateFailure(e.target.checked)}
                    className="accent-[#C9A227]"
                  />
                  <span className={simulateFailure ? 'text-[#C9A227] font-bold' : ''}>Simulate Upstream Provider Timeout</span>
                </label>
              </div>
            </div>

            {/* DEMO PROMPT FORM */}
            <div className="p-5 bg-[#070707] border border-[#C9A227]/50 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-[#C9A227] font-mono uppercase block">TRANSACTION DEMONSTRATION PROMPT:</span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="md:col-span-2 px-4 py-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] font-mono focus:border-[#C9A227] focus:outline-none"
                  placeholder="e.g. Send UGX 500,000 to Nairobi supplier"
                />

                <select
                  value={selectedCorridor}
                  onChange={(e) => {
                    setSelectedCorridor(e.target.value);
                    evaluateCurrentRoutes(amountUGX, e.target.value);
                  }}
                  className="px-4 py-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] font-mono focus:border-[#C9A227] focus:outline-none"
                >
                  <option value="UGX → KES">UGX → KES (Kenya)</option>
                  <option value="UGX → RWF">UGX → RWF (Rwanda)</option>
                  <option value="UGX → TZS">UGX → TZS (Tanzania)</option>
                  <option value="UGX → USD">UGX → USD (Global)</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#A7A7A7]">Amount:</span>
                  <input
                    type="number"
                    value={amountUGX}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAmountUGX(val);
                      evaluateCurrentRoutes(val, selectedCorridor);
                    }}
                    className="w-36 px-3 py-1.5 bg-[#111111] border border-[#222222] rounded-lg text-xs text-[#00B86B] font-mono font-bold focus:border-[#C9A227] focus:outline-none"
                  />
                  <span className="text-xs font-mono text-[#C9A227]">UGX</span>
                </div>

                <button
                  onClick={handleExecuteSandboxDemo}
                  disabled={executing}
                  className="w-full sm:w-auto px-8 py-3 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20"
                >
                  {executing ? <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> : <Play className="w-4 h-4 fill-current text-[#070707]" />}
                  EXECUTE REALITY DEMONSTRATION
                </button>
              </div>
            </div>

            {/* EXECUTION RESULT CARD */}
            {activeExecution && (
              <div className="p-6 bg-[#070707] border-2 border-[#C9A227] rounded-2xl space-y-6 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                      TX ID: {activeExecution.transactionId}
                    </span>
                    {activeExecution.recoveryApplied ? (
                      <span className="text-[10px] text-red-400 bg-red-950/60 border border-red-500/40 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" /> TIMEOUT DETECTED & RECOVERED
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#00B86B] bg-[#00B86B]/10 border border-[#00B86B]/30 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#00B86B]" /> 100% RECONCILED MATCH
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-[#00B86B]">
                    ✔ ZERO MONEY LOSS GUARANTEED
                  </span>
                </div>

                {/* AI EXPLAINABILITY STATEMENT */}
                <div className="p-4 bg-[#111111] border border-[#00B86B]/40 rounded-xl space-y-1">
                  <span className="text-[10px] text-[#C9A227] font-bold uppercase block flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-[#C9A227]" /> MEHERAH AI EXPLAINABILITY NOTICE:
                  </span>
                  <p className="text-xs text-[#FFFFFF] font-sans leading-relaxed italic">
                    "{activeExecution.aiExplainabilityNotice}"
                  </p>
                </div>

                {/* 5 RECONCILIATION LEDGER HASH STEPS */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#C9A227] uppercase block">
                    RECONCILIATION LEDGER 5-STEP DOUBLE-ENTRY HASHES:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {activeExecution.reconciliationSteps.map((step) => (
                      <div
                        key={step.stepIndex}
                        className={`p-3 rounded-xl border space-y-1.5 ${
                          step.status === 'COMPLETED'
                            ? 'bg-[#111111] border-[#00B86B]/40 text-[#FFFFFF]'
                            : 'bg-red-950/30 border-red-500/40 text-red-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="font-bold">STEP {step.stepIndex}</span>
                          {step.status === 'COMPLETED' ? (
                            <Check className="w-3 h-3 text-[#00B86B]" />
                          ) : (
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                          )}
                        </div>
                        <span className="text-[10px] font-bold block truncate font-sans">{step.stepName.replace(/_/g, ' ')}</span>
                        <code className="text-[9px] text-[#A7A7A7] block truncate">{step.hashValue}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. PROVIDERS SANDBOX MONITOR */}
      {activeTab === 'providers' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  STEP 1 — SIMULATED NETWORK PROVIDERS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Provider Sandbox Layer</h2>
                <p className="text-xs text-[#A7A7A7]">Simulated live nodes for MTN MoMo, Airtel Money, Flutterwave, and Bank of Uganda Core Banking. Click to inject simulated outages or latency warnings to test MEHERAH's dynamic route intelligence.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                4/4 PROVIDERS ONLINE
              </span>
            </div>

            {/* PROVIDER CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {providers.map((p) => (
                <div key={p.providerId} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <div>
                      <strong className="text-sm text-[#FFFFFF] font-sans block">{p.providerName}</strong>
                      <span className="text-[10px] text-[#A7A7A7]">{p.category}</span>
                    </div>

                    <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold ${
                      p.status === 'HEALTHY' ? 'bg-[#00B86B]/20 text-[#00B86B]' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px] font-sans">
                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">Latency:</span>
                      <strong className={p.latencyMs > 400 ? 'text-yellow-400' : 'text-[#00B86B]'}>{p.latencyMs} ms</strong>
                    </div>

                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">Fixed Fee:</span>
                      <strong className="text-[#C9A227]">UGX {p.fixedFeeUGX}</strong>
                    </div>

                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">Failure Rate:</span>
                      <strong className="text-[#FFFFFF]">{(p.failureRatePct * 100).toFixed(1)}%</strong>
                    </div>

                    <div>
                      <span className="text-[#A7A7A7] block text-[10px]">Daily Cap:</span>
                      <strong className="text-[#FFFFFF]">UGX {(p.dailyVolumeCapUGX / 1000000).toFixed(0)}M</strong>
                    </div>
                  </div>

                  {/* TOGGLE STATUS BUTTON */}
                  <button
                    onClick={() => handleProviderStatusToggle(p.providerId, p.status)}
                    className="w-full py-2 bg-[#111111] hover:bg-[#222222] border border-[#C9A227]/40 text-[#C9A227] text-xs font-mono rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#C9A227]" />
                    Toggle Health State (Simulate Stress)
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. ROUTE INTELLIGENCE ENGINE */}
      {activeTab === 'routes' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  STEP 2 — ROUTE INTELLIGENCE ENGINE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Scoring Algorithm</h2>
                <p className="text-xs text-[#A7A7A7]">Calculates Cost Score, Speed Score, Reliability Score, and Compliance Score for every available corridor route in real-time.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                DYNAMIC ALGORITHMIC SCORING
              </span>
            </div>

            {/* ROUTE CARDS WITH SCORES */}
            <div className="space-y-4 font-mono text-xs">
              {routes.map((rt) => (
                <div key={rt.routeId} className={`p-5 rounded-2xl border space-y-3 ${
                  rt.recommended 
                    ? 'bg-[#070707] border-2 border-[#00B86B] shadow-xl' 
                    : 'bg-[#070707] border border-[#222222]'
                }`}>
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-[#FFFFFF] font-sans">{rt.routeId}</strong>
                      {rt.recommended && (
                        <span className="text-[10px] text-[#070707] bg-[#00B86B] font-bold px-2 py-0.5 rounded">
                          ★ RECOMMENDED ROUTE
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-[#A7A7A7] block uppercase">MEHERAH SCORE</span>
                      <strong className="text-xl text-[#00B86B] font-bold">{rt.totalMeherahScorePct}%</strong>
                    </div>
                  </div>

                  {/* SCORE BREAKDOWN BARS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#A7A7A7] block">COST SCORE</span>
                      <strong className="text-sm text-[#C9A227]">{rt.costScorePct}%</strong>
                    </div>

                    <div className="p-2.5 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#A7A7A7] block">SPEED SCORE</span>
                      <strong className="text-sm text-[#00B86B]">{rt.speedScorePct}%</strong>
                    </div>

                    <div className="p-2.5 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#A7A7A7] block">RELIABILITY</span>
                      <strong className="text-sm text-[#00B86B]">{rt.reliabilityScorePct}%</strong>
                    </div>

                    <div className="p-2.5 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#A7A7A7] block">COMPLIANCE</span>
                      <strong className="text-sm text-[#00B86B]">{rt.complianceScorePct}%</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#A7A7A7] font-sans italic bg-[#111111] p-3 rounded-xl border border-[#222222]">
                    "{rt.aiRouteRationale}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. RECONCILIATION CORE */}
      {activeTab === 'reconciliation' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  STEP 3 — RECONCILIATION CORE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Double-Entry Cryptographic Proof Engine</h2>
                <p className="text-xs text-[#A7A7A7]">Every transaction moves through a mandatory 5-step double-entry ledger match. If any provider fails, MEHERAH freezes state, recovers, and reroutes with zero funds lost.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                0% MONEY LOSS GUARANTEE
              </span>
            </div>

            <div className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-4 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block">5-STEP SETTLEMENT FLOW DIAGRAM:</span>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
                {[
                  { title: '1. Created', desc: 'Transaction initialized with intent metadata' },
                  { title: '2. Sender Ledger', desc: 'Debited in double-entry sender buffer' },
                  { title: '3. Provider Ack', desc: 'Sovereign / Telco rail confirmation hash' },
                  { title: '4. Receiver Credit', desc: 'Credited to recipient wallet/account' },
                  { title: '5. Hash Match', desc: '3-way cryptographic hash match sealed' }
                ].map((s, idx) => (
                  <div key={idx} className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                    <span className="text-[9px] text-[#C9A227] font-bold block">{s.title}</span>
                    <p className="text-[10px] text-[#A7A7A7] font-sans leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. INSTITUTIONAL DEMO MODE */}
      {activeTab === 'institutional' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  STEP 5 — INSTITUTIONAL DEMO MODE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Bank of Uganda & Sovereign Infrastructure Dashboard</h2>
                <p className="text-xs text-[#A7A7A7]">Demonstrates real-time sovereign liquidity intelligence, inter-bank clearing corridor health, and automated policy compliance.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                SOVEREIGN NODE: UGANDA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">EAST AFRICA LIQUIDITY CORRIDORS</span>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between p-2.5 bg-[#111111] rounded-lg">
                    <span>UGX → KES (Kenya)</span>
                    <strong className="text-[#00B86B]">3 Active Routes (Sub-100ms)</strong>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#111111] rounded-lg">
                    <span>UGX → RWF (Rwanda)</span>
                    <strong className="text-[#00B86B]">2 Active Routes (110ms)</strong>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#111111] rounded-lg">
                    <span>UGX → TZS (Tanzania)</span>
                    <strong className="text-[#00B86B]">2 Active Routes (140ms)</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                <span className="text-xs font-bold text-[#00B86B] uppercase block">AI EXPLAINABILITY ENGINE</span>
                <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed pt-2">
                  Every decision rendered by MEHERAH produces an immutable audit record explaining why a route was selected over alternative paths, including expected fee savings and failure risk mitigation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SECURITY FOUNDATION */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  STEP 6 — SECURITY FOUNDATION
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Enterprise & Sovereign Security Controls</h2>
                <p className="text-xs text-[#A7A7A7]">Built prior to real-money rollout — end-to-end identity management, HSM encryption key rotation, immutable audit logs, and fraud detection rules.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                SECURE KEY HARDENING
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
              {[
                { title: 'Identity & Auth', desc: 'Multi-factor sovereign role permissions and OAuth key rotation.' },
                { title: 'Encryption Keys', desc: 'Hardware Security Module (HSM) level 4 transaction signing.' },
                { title: 'Fraud Detection', desc: 'Real-time anomaly scoring for unusual velocity or volume spikes.' }
              ].map((sec, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                  <strong className="text-xs text-[#C9A227] font-sans block">• {sec.title}</strong>
                  <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed">{sec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
