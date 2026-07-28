import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Sparkles, 
  Brain, 
  Send, 
  Building2, 
  Landmark, 
  Smartphone, 
  Globe2, 
  ShoppingBag, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  Code2, 
  Layers, 
  Star, 
  Download, 
  RefreshCw,
  Search,
  MessageSquareText,
  ChevronRight
} from 'lucide-react';
import { 
  PersonalIntentResolution, 
  BusinessIntelligenceMetrics, 
  InstitutionalPortalAnalytics, 
  UniversalExperienceTouchpoint, 
  IntelligenceMarketplaceApp 
} from '../../services/meherah-civilization-interface.service';

export function MeherahCivilizationInterfaceView() {
  const [activeTab, setActiveTab] = useState<
    'personal' | 'business' | 'institutional' | 'experience' | 'marketplace'
  >('personal');
  const [loading, setLoading] = useState<boolean>(true);

  // States
  const [intents, setIntents] = useState<PersonalIntentResolution[]>([]);
  const [businessSuite, setBusinessSuite] = useState<BusinessIntelligenceMetrics | null>(null);
  const [institutional, setInstitutional] = useState<InstitutionalPortalAnalytics | null>(null);
  const [touchpoints, setTouchpoints] = useState<UniversalExperienceTouchpoint[]>([]);
  const [apps, setApps] = useState<IntelligenceMarketplaceApp[]>([]);

  // Interactive Prompt Simulator
  const [userPromptInput, setUserPromptInput] = useState<string>('');
  const [activeResolution, setActiveResolution] = useState<PersonalIntentResolution | null>(null);
  const [resolving, setResolving] = useState<boolean>(false);

  useEffect(() => {
    fetchCivilizationData();
  }, []);

  const fetchCivilizationData = async () => {
    setLoading(true);
    try {
      const [iRes, bRes, instRes, tRes, mRes] = await Promise.all([
        fetch('/api/meherah/civilization-interface/personal-intents'),
        fetch('/api/meherah/civilization-interface/business-suite'),
        fetch('/api/meherah/civilization-interface/institutional-analytics'),
        fetch('/api/meherah/civilization-interface/touchpoints'),
        fetch('/api/meherah/civilization-interface/marketplace')
      ]);

      const intentData = await iRes.json();
      setIntents(intentData);
      if (intentData.length > 0) setActiveResolution(intentData[0]);

      setBusinessSuite(await bRes.json());
      setInstitutional(await instRes.json());
      setTouchpoints(await tRes.json());
      setApps(await mRes.json());
    } catch (err) {
      console.error('Failed to load Civilization Interface data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveCustomPrompt = async () => {
    if (!userPromptInput.trim()) return;
    setResolving(true);
    try {
      const res = await fetch('/api/meherah/civilization-interface/resolve-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: userPromptInput })
      });
      const data = await res.json();
      setActiveResolution(data);
    } catch (err) {
      console.error('Failed to resolve intent:', err);
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* HERO BANNER FOR CIVILIZATION INTERFACE LAYER */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <Users className="w-3.5 h-3.5 text-[#070707]" /> CIVILIZATION INTERFACE LAYER
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-[#00B86B]" /> ACCESSIBLE TO EVERYONE
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF] italic">
                "Making the intelligence accessible to everyone."
              </h1>
              <p className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                Intention translated into zero-loss financial action.
              </p>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              The World Operating Layer connects systems. The Stewardship Framework governs the intelligence. The Civilization Interface Layer bridges everyday human intention directly to MEHERAH's financial intelligence engine.
            </p>
          </div>

          {/* TOUCHPOINTS SUMMARY BADGE */}
          <div className="bg-[#070707] border border-[#C9A227]/50 rounded-xl p-5 text-center space-y-2 min-w-[280px]">
            <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">OMNI-CHANNEL INTELLIGENCE</span>
            <div className="text-3xl font-bold font-mono text-[#00B86B]">
              18.4M+
            </div>
            <div className="text-[10px] text-[#C9A227] font-mono flex items-center justify-center gap-2 font-bold">
              <span>MOBILE</span>
              <span>•</span>
              <span>WEB</span>
              <span>•</span>
              <span>APIs</span>
              <span>•</span>
              <span>ERP</span>
            </div>
            <span className="text-[9px] text-[#A7A7A7] font-mono block">DIFFERENT INTERFACES. ONE INTELLIGENCE.</span>
          </div>
        </div>

        {/* NAVIGATION TABS FOR THE 5 PILLARS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'personal', label: '1. Personal Interface', desc: 'Intent-Driven Prompt', icon: Users },
            { id: 'business', label: '2. Business Suite', desc: 'Automated Operations', icon: Building2 },
            { id: 'institutional', label: '3. Institutional Portal', desc: 'Central Bank Analytics', icon: Landmark },
            { id: 'experience', label: '4. Universal Touchpoints', desc: 'Mobile, Web, API, ERP', icon: Smartphone },
            { id: 'marketplace', label: '5. Intelligence Marketplace', desc: 'Ecosystem Apps', icon: ShoppingBag }
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
                  <span className="text-[9px] uppercase">{tab.label.split('.')[0]}</span>
                  <Icon className="w-4 h-4 text-current" />
                </div>
                <span className="text-xs font-bold font-sans mt-1 text-current truncate">{tab.label.split('.')[1]}</span>
                <span className="text-[9px] opacity-80 block font-mono truncate">{tab.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. PERSONAL INTELLIGENCE INTERFACE */}
      {activeTab === 'personal' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  HUMAN INTENTION TRANSLATOR
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Personal Intelligence Interface</h2>
                <p className="text-xs text-[#A7A7A7]">People no longer need to understand financial complexity, provider codes, or technical errors. They state their intention, and MEHERAH translates it into optimal zero-loss action.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                100% INTENT-DRIVEN
              </span>
            </div>

            {/* INTENT PROMPT INPUT BOX */}
            <div className="p-5 bg-[#070707] border border-[#C9A227]/50 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-[#C9A227] font-mono uppercase block">
                COMMUNICATE YOUR FINANCIAL INTENTION TO MEHERAH
              </span>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={userPromptInput}
                  onChange={(e) => setUserPromptInput(e.target.value)}
                  placeholder="e.g., Send $850 to my logistics partner in Kampala with 0% money loss"
                  className="flex-1 px-4 py-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder-[#A7A7A7] focus:border-[#C9A227] focus:outline-none font-mono"
                />
                <button
                  onClick={handleResolveCustomPrompt}
                  disabled={resolving || !userPromptInput.trim()}
                  className="px-6 py-3 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {resolving ? <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> : <Send className="w-4 h-4 text-[#070707]" />}
                  Translate Intention
                </button>
              </div>

              {/* PRESET PROMPT SUGGESTIONS */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#A7A7A7] font-mono uppercase block">OR CHOOSE A PRESET INTENTION:</span>
                <div className="flex flex-wrap gap-2">
                  {intents.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setUserPromptInput(p.userPrompt);
                        setActiveResolution(p);
                      }}
                      className="px-3 py-1.5 bg-[#111111] border border-[#222222] hover:border-[#C9A227] text-[11px] text-[#FFFFFF] rounded-lg transition-all text-left font-sans flex items-center gap-1.5"
                    >
                      <MessageSquareText className="w-3.5 h-3.5 text-[#C9A227]" />
                      "{p.userPrompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESOLUTION OUTPUT CARD */}
            {activeResolution && (
              <div className="p-6 bg-[#070707] border-2 border-[#C9A227] rounded-2xl space-y-4 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                  <span className="text-xs font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                    MEHERAH INTENT RESOLUTION PLAN
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#00B86B] font-bold">✔ ZERO LOSS GUARANTEED</span>
                    <span className="text-[#C9A227] font-bold">{activeResolution.confidenceScorePct}% CONFIDENCE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block">ORIGINAL HUMAN PROMPT:</span>
                      <p className="text-sm font-bold text-[#FFFFFF] italic">"{activeResolution.userPrompt}"</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#C9A227] uppercase block">DECODED SEMANTIC INTENT:</span>
                      <p className="text-xs font-bold text-[#00B86B] font-mono bg-[#111111] p-2.5 rounded-lg border border-[#00B86B]/30">
                        {activeResolution.decodedIntent}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block">RECOMMENDED CLEARING ROUTE:</span>
                      <p className="text-xs text-[#FFFFFF] font-mono bg-[#111111] p-2.5 rounded-lg border border-[#222222]">
                        {activeResolution.recommendedExecutionRoute}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 font-mono text-center">
                      <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                        <span className="text-[9px] text-[#A7A7A7] uppercase block">ESTIMATED LATENCY</span>
                        <strong className="text-lg text-[#00B86B] font-bold">{activeResolution.estimatedTimeMs} ms</strong>
                      </div>

                      <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                        <span className="text-[9px] text-[#A7A7A7] uppercase block">TOTAL ROUTING COST</span>
                        <strong className="text-lg text-[#C9A227] font-bold">${activeResolution.totalCostUSD.toFixed(2)}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block">HUMAN-CENTRED EXPLANATION:</span>
                      <p className="text-xs text-[#FFFFFF] bg-[#111111] p-3 rounded-xl border border-[#C9A227]/40 leading-relaxed italic">
                        "{activeResolution.humanCentredExplanation}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 2. BUSINESS INTELLIGENCE LAYER */}
      {activeTab === 'business' && businessSuite && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ENTERPRISE FINANCIAL PARTNER
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Business Intelligence Layer</h2>
                <p className="text-xs text-[#A7A7A7]">Businesses do not just process payments — they gain a real-time financial intelligence partner for cash flow forecasting, treasury auto-sweeping, and supplier optimization.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                CASH FLOW HEALTH: {businessSuite.cashFlowHealthScore}/100
              </span>
            </div>

            {/* METRIC SCORECARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#00B86B]/40 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">30-Day Predicted Inflow</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{businessSuite.predicted30DayInflowUSD}</strong>
                <span className="text-[9px] text-[#A7A7A7]">High Probability Verified Invoices</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">30-Day Predicted Outflow</span>
                <strong className="text-2xl text-[#C9A227] font-bold block">{businessSuite.predicted30DayOutflowUSD}</strong>
                <span className="text-[9px] text-[#A7A7A7]">Automated Payroll & Supplier Commitments</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#00B86B]/40 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Identified Monthly Savings</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{businessSuite.automatedSavingsIdentifiedUSD}</strong>
                <span className="text-[9px] text-[#A7A7A7]">Via Route & Treasury Sweeping</span>
              </div>
            </div>

            {/* TREASURY RECOMMENDATIONS */}
            <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block">
                INTELLIGENT TREASURY & LIQUIDITY RECOMMENDATIONS
              </span>

              <div className="space-y-2">
                {businessSuite.treasuryRecommendations.map((t, idx) => (
                  <div key={idx} className="p-3 bg-[#111111] border border-[#222222] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5 font-sans">
                      <strong className="text-xs text-[#FFFFFF] block">• {t.action}</strong>
                      <span className="text-[11px] text-[#00B86B]">{t.impact}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold self-start sm:self-auto ${
                      t.urgency === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-[#C9A227]/20 text-[#C9A227]'
                    }`}>
                      {t.urgency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. INSTITUTIONAL INTELLIGENCE LAYER */}
      {activeTab === 'institutional' && institutional && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  SOVEREIGN PORTAL & REGULATORY ANALYTICS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Institutional Intelligence Layer</h2>
                <p className="text-xs text-[#A7A7A7]">For central banks, commercial banks, and ministries of finance — live network traffic visibility, stress simulations, and predictive risk alerts.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                MONITORED NODES: {institutional.monitoredNodesCount}
              </span>
            </div>

            {/* POLICY SIMULATIONS */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block">ACTIVE SOVEREIGN POLICY SIMULATIONS</span>
              {institutional.activePolicySimulations.map((s, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <strong className="text-xs text-[#FFFFFF] font-sans">{s.simulationName}</strong>
                    <span className="text-[10px] text-[#00B86B] font-bold">{s.sovereignComplianceStatus}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#A7A7A7] font-sans">
                    <span>Projected Effect: <strong className="text-[#00B86B]">{s.projectedLiquidityEffect}</strong></span>
                    <span>Systemic Risk: <strong className="text-[#C9A227]">{s.systemicRiskLevel}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. UNIVERSAL MEHERAH EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  DIFFERENT INTERFACES. ONE INTELLIGENCE.
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Universal MEHERAH Experience</h2>
                <p className="text-xs text-[#A7A7A7]">The exact same underlying financial intelligence accessible via native Mobile Apps, Enterprise Web Dashboards, Developer APIs, and ERP Connectors.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                OMNI-CHANNEL ONLINE
              </span>
            </div>

            {/* TOUCHPOINT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {touchpoints.map((t, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="text-xs font-bold text-[#C9A227] font-sans">{t.channel}</span>
                    <span className="text-[10px] text-[#00B86B] font-bold">{t.status}</span>
                  </div>

                  <p className="text-xs text-[#A7A7A7] font-sans">{t.description}</p>

                  <div className="flex justify-between text-[10px] pt-2 border-t border-[#222222]">
                    <span className="text-[#A7A7A7]">Active Reach: <strong className="text-[#FFFFFF]">{t.activeUsers}</strong></span>
                    <span className="text-[#A7A7A7]">Avg Latency: <strong className="text-[#00B86B]">{t.latencyAvgMs}ms</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. THE MEHERAH INTELLIGENCE MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  OPEN ECOSYSTEM INNOVATION
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">The MEHERAH Intelligence Marketplace</h2>
                <p className="text-xs text-[#A7A7A7]">Developers, fintechs, and regional innovators build specialized applications on top of MEHERAH's financial intelligence foundation.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                VERIFIED CANON ECOSYSTEM
              </span>
            </div>

            {/* MARKETPLACE APPS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {apps.map((app) => (
                <div key={app.id} className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                      <span className="text-[9px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                        {app.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#C9A227]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold">{app.userRating}</span>
                      </div>
                    </div>

                    <strong className="text-sm text-[#FFFFFF] font-sans block">{app.appName}</strong>
                    <span className="text-[10px] text-[#A7A7A7] block">By {app.developer}</span>

                    <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed">{app.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#222222]">
                    <span className="text-[9px] text-[#00B86B] font-mono block">
                      ⚡ CAPABILITY: {app.meherahCoreCapabilityUsed}
                    </span>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#A7A7A7]">{app.activeInstallCount.toLocaleString()} Installs</span>
                      <span className="text-[#00B86B] font-bold">{app.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
