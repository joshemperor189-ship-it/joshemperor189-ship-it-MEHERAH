import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Brain, 
  Cpu, 
  Sparkles, 
  Scale, 
  Activity, 
  TrendingUp, 
  Globe2, 
  CheckCircle2, 
  Zap, 
  BookOpen, 
  Code2, 
  Award, 
  Users, 
  Clock, 
  RefreshCw, 
  Compass, 
  Check, 
  Building2, 
  Lock, 
  Bot, 
  BarChart3, 
  Layers, 
  ArrowRight,
  Terminal,
  Heart
} from 'lucide-react';
import { 
  GovernanceCouncilMember, 
  BiasAndPerformanceTelemetry, 
  KnowledgeCivilizationPattern, 
  AutonomousImprovementLoop, 
  GlobalImpactMetrics, 
  LegacyResiliencePillar 
} from '../../services/meherah-evolution-stage.service';

export function MeherahEvolutionStageView() {
  const [activeTab, setActiveTab] = useState<
    'governance' | 'knowledge' | 'autonomous' | 'developer' | 'impact' | 'legacy'
  >('governance');
  const [loading, setLoading] = useState<boolean>(true);

  // States
  const [council, setCouncil] = useState<GovernanceCouncilMember[]>([]);
  const [telemetry, setTelemetry] = useState<BiasAndPerformanceTelemetry[]>([]);
  const [knowledgePatterns, setKnowledgePatterns] = useState<KnowledgeCivilizationPattern[]>([]);
  const [loops, setLoops] = useState<AutonomousImprovementLoop[]>([]);
  const [impact, setImpact] = useState<GlobalImpactMetrics | null>(null);
  const [legacyPillars, setLegacyPillars] = useState<LegacyResiliencePillar[]>([]);

  // Simulation
  const [selectedLoop, setSelectedLoop] = useState<AutonomousImprovementLoop | null>(null);

  useEffect(() => {
    fetchEvolutionData();
  }, []);

  const fetchEvolutionData = async () => {
    setLoading(true);
    try {
      const [govRes, knowRes, loopRes, impRes, legRes] = await Promise.all([
        fetch('/api/meherah/evolution/governance'),
        fetch('/api/meherah/evolution/knowledge'),
        fetch('/api/meherah/evolution/autonomous-loops'),
        fetch('/api/meherah/evolution/impact'),
        fetch('/api/meherah/evolution/legacy')
      ]);

      const govData = await govRes.json();
      setCouncil(govData.council || []);
      setTelemetry(govData.telemetry || []);

      setKnowledgePatterns(await knowRes.json());
      const loopData = await loopRes.json();
      setLoops(loopData || []);
      if (loopData && loopData.length > 0) {
        setSelectedLoop(loopData[0]);
      }

      setImpact(await impRes.json());
      setLegacyPillars(await legRes.json());
    } catch (err) {
      console.error('Failed to load MEHERAH Evolution Stage data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* HERO BANNER FOR EVOLUTION STAGE */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5 text-[#070707]" /> FINAL EVOLUTIONARY MILESTONE
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-[#00B86B]" /> THE INTELLIGENCE CIVILIZATION LAYER
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF] italic">
                "From intelligent network → to intelligent ecosystem."
              </h1>
              <p className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                "Help the financial world continuously improve."
              </p>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              MEHERAH has evolved into a self-improving global financial infrastructure. Controlled by ethical AI governance, powered by collective memory, adapted via autonomous improvement loops, and preserved for future generations.
            </p>
          </div>

          {/* ROADMAP TIMELINE QUICK REFERENCE */}
          <div className="bg-[#070707] border border-[#C9A227]/50 rounded-xl p-4 text-xs font-mono space-y-2 min-w-[300px]">
            <span className="text-[10px] text-[#A7A7A7] uppercase font-bold block border-b border-[#222222] pb-1">
              EVOLUTION ROADMAP SEQUENCE
            </span>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-2 text-[#00B86B]">
                <Check className="w-3.5 h-3.5" /> <span>Build MEHERAH</span>
              </div>
              <div className="flex items-center gap-2 text-[#00B86B]">
                <Check className="w-3.5 h-3.5" /> <span>Teach MEHERAH</span>
              </div>
              <div className="flex items-center gap-2 text-[#00B86B]">
                <Check className="w-3.5 h-3.5" /> <span>Connect the world through MEHERAH</span>
              </div>
              <div className="flex items-center gap-2 text-[#00B86B]">
                <Check className="w-3.5 h-3.5" /> <span>Let the world build with MEHERAH</span>
              </div>
              <div className="flex items-center gap-2 text-[#C9A227] font-bold">
                <Sparkles className="w-3.5 h-3.5" /> <span>Preserve and evolve MEHERAH</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 EVOLUTION PILLAR TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'governance', label: '1. Intelligence Governance', desc: 'AI Council & Oversight', icon: Scale },
            { id: 'knowledge', label: '2. Knowledge Civilization', desc: 'Global Financial Memory', icon: BookOpen },
            { id: 'autonomous', label: '3. Autonomous Loops', desc: 'Self-Improving Engine', icon: Bot },
            { id: 'developer', label: '4. Developer Ecosystem', desc: 'OS Foundation & Apps', icon: Code2 },
            { id: 'impact', label: '5. Impact Measurement', desc: 'Value Created Dashboard', icon: Heart },
            { id: 'legacy', label: '6. Legacy Architecture', desc: 'Decadal Resilience', icon: Lock }
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

      {/* 1. INTELLIGENCE GOVERNANCE VIEW */}
      {activeTab === 'governance' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ETHICAL INTELLIGENCE CONTROLS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Intelligence Governance</h2>
                <p className="text-xs text-[#A7A7A7]">"The more powerful MEHERAH becomes, the more responsible it becomes."</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00B86B]" /> HUMAN OVERSIGHT ACTIVE
              </span>
            </div>

            {/* AI GOVERNANCE COUNCIL */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C9A227]" /> AI GOVERNANCE COUNCIL & SOVEREIGN TRUSTEES
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {council.map((m) => (
                  <div key={m.id} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                        {m.oversightFocus}
                      </span>
                      <span className="text-[10px] text-[#00B86B] font-bold">{m.status}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#FFFFFF] font-sans">{m.name}</h4>
                    <p className="text-xs text-[#A7A7A7] font-sans">{m.role} • <strong className="text-[#FFFFFF]">{m.organization}</strong></p>
                    <span className="text-[10px] text-[#C9A227] block">Jurisdiction: {m.jurisdiction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TELEMETRY & BIAS DETECTION */}
            <div className="space-y-3 font-mono text-xs pt-4 border-t border-[#222222]">
              <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C9A227]" /> MODEL PERFORMANCE & BIAS TELEMETRY
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {telemetry.map((t, idx) => (
                  <div key={idx} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                    <h5 className="text-xs font-bold text-[#FFFFFF] font-sans border-b border-[#222222] pb-2">{t.modelName}</h5>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[#A7A7A7]">Accuracy Rate:</span>
                        <strong className="text-[#00B86B]">{t.accuracyRatePct}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A7A7A7]">Bias Index:</span>
                        <strong className="text-[#C9A227]">{t.biasIndex} (Minimal)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A7A7A7]">Ethical Compliance:</span>
                        <strong className="text-[#00B86B]">{t.ethicalCompliancePct}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A7A7A7]">Human Interventions (24h):</span>
                        <strong className="text-[#FFFFFF]">{t.humanInterventions24h}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. KNOWLEDGE CIVILIZATION VIEW */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  GLOBAL FINANCIAL MEMORY ENGINE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Knowledge Civilization</h2>
                <p className="text-xs text-[#A7A7A7]">Not by controlling markets, but by understanding financial friction points and economic behaviors globally.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                SYSTEMIC LEARNING SYNTHESIS
              </span>
            </div>

            {/* KNOWLEDGE PATTERNS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {knowledgePatterns.map((p) => (
                <div key={p.id} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                        {p.category}
                      </span>
                      <span className="text-[10px] text-[#00B86B] font-bold">{p.impactLevel} IMPACT</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#FFFFFF] font-sans">{p.title}</h3>
                    <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed">{p.insight}</p>
                  </div>

                  <div className="pt-3 border-t border-[#222222] space-y-2">
                    <span className="text-[10px] text-[#A7A7A7] block">OBSERVED REGIONS: {p.observedRegions.join(', ')}</span>
                    <div className="p-2.5 bg-[#111111] rounded-xl border border-[#222222] text-[11px] text-[#C9A227]">
                      ⚡ SYSTEM ACTION: {p.systemActionTaken}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. AUTONOMOUS IMPROVEMENT CYCLE VIEW */}
      {activeTab === 'autonomous' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ADAPTIVE IMPROVEMENT LOOPS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Autonomous Improvement Cycle</h2>
                <p className="text-xs text-[#A7A7A7]">Observation → Understanding → Recommendation → Approval → Learning</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                100% AUDITABLE LOOPS
              </span>
            </div>

            {/* 5-STEP CYCLE DIAGRAM */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-center">
              {[
                { step: '1. Observation', desc: 'Detect performance drop / failure surge' },
                { step: '2. Understanding', desc: 'Analyze latency, queue, or schema mismatch' },
                { step: '3. Recommendation', desc: 'Generate 0-loss reroute / patch option' },
                { step: '4. Approval', desc: 'Institution confirms or auto-executes' },
                { step: '5. Learning', desc: 'Update global network intelligence' }
              ].map((s, idx) => (
                <div key={idx} className="p-3 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-[#C9A227] block">{s.step}</span>
                  <span className="text-[10px] text-[#A7A7A7] block font-sans">{s.desc}</span>
                </div>
              ))}
            </div>

            {/* RECENT IMPROVEMENT LOOPS */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#C9A227]" /> REAL-TIME AUTONOMOUS ADAPTATIONS
              </span>

              {loops.map((loop) => (
                <div key={loop.id} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                      LOOP {loop.id}
                    </span>
                    <span className="text-[10px] text-[#00B86B] font-bold">{loop.approvalStatus}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                    <div className="space-y-1">
                      <strong className="text-[#C9A227] block font-mono text-[10px]">OBSERVATION & UNDERSTANDING:</strong>
                      <p className="text-[#FFFFFF]">"{loop.observation}"</p>
                      <p className="text-[#A7A7A7]">{loop.understanding}</p>
                    </div>

                    <div className="space-y-1">
                      <strong className="text-[#00B86B] block font-mono text-[10px]">RECOMMENDATION & LEARNING OUTCOME:</strong>
                      <p className="text-[#FFFFFF]">"{loop.recommendation}"</p>
                      <p className="text-[#A7A7A7]">{loop.learningOutcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. GLOBAL DEVELOPER ECOSYSTEM VIEW */}
      {activeTab === 'developer' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  OPERATING SYSTEM FOUNDATION
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Global Developer Ecosystem</h2>
                <p className="text-xs text-[#A7A7A7]">Developers build applications. Institutions create financial services. Businesses automate operations on top of MEHERAH.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                SDK V2026.1 READY
              </span>
            </div>

            {/* ECOSYSTEM APPS & TOOLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {[
                { title: 'Treasury Liquidity Predictor', desc: 'Auto-allocates pre-funded accounts across central bank clearing nodes.', dev: 'Barclays / Equity Tech' },
                { title: 'Sovereign Tax Harmonizer', desc: 'Real-time VAT and customs clearance tag injector for cross-border invoices.', dev: 'Uganda Revenue Authority / MEHERAH' },
                { title: 'Micro-Remittance Engine', desc: 'Zero-latency mobile money payout gateway for East African agricultural workers.', dev: 'Safaricom Dev Lab' }
              ].map((app, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <h3 className="text-sm font-bold text-[#C9A227] font-sans">{app.title}</h3>
                  <p className="text-xs text-[#A7A7A7] font-sans">{app.desc}</p>
                  <span className="text-[10px] text-[#FFFFFF] block pt-2 border-t border-[#222222]">Created by: {app.dev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. IMPACT MEASUREMENT VIEW */}
      {activeTab === 'impact' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  VALUE CREATED DASHBOARD
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Impact Measurement</h2>
                <p className="text-xs text-[#A7A7A7]">"What value did MEHERAH create?" — Measuring service, efficiency, and human reach.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                GLOBAL SERVICE METRICS
              </span>
            </div>

            {/* IMPACT GRID */}
            {impact && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center">
                <div className="p-5 bg-[#070707] border border-[#C9A227]/50 rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">COST REDUCTIONS ACHIEVED</span>
                  <span className="text-2xl font-bold text-[#00B86B]">{impact.costReductionsUSD}</span>
                </div>

                <div className="p-5 bg-[#070707] border border-[#C9A227]/50 rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">FAILED PAYMENTS PREVENTED</span>
                  <span className="text-2xl font-bold text-[#C9A227]">{impact.failedPaymentsPrevented.toLocaleString()}</span>
                </div>

                <div className="p-5 bg-[#070707] border border-[#C9A227]/50 rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">BUSINESSES ENABLED</span>
                  <span className="text-2xl font-bold text-[#FFFFFF]">{impact.businessesEnabled.toLocaleString()}</span>
                </div>

                <div className="p-5 bg-[#070707] border border-[#C9A227]/50 rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">PEOPLE REACHED</span>
                  <span className="text-2xl font-bold text-[#00B86B]">{impact.peopleReached}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. LEGACY ARCHITECTURE VIEW */}
      {activeTab === 'legacy' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  DECADAL RESILIENCE GUARANTEE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Legacy Architecture</h2>
                <p className="text-xs text-[#A7A7A7]">Built to operate for decades, survive tech changes, adapt to new financial systems, and let future generations build upon it.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                CENTURY-PROOF INFRASTRUCTURE
              </span>
            </div>

            {/* LEGACY PILLARS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {legacyPillars.map((l, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                      {l.horizon}
                    </span>
                    <span className="text-[10px] text-[#00B86B] font-bold">{l.status}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#FFFFFF] font-sans">{l.pillar}</h3>
                  <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed">{l.details}</p>
                  <span className="text-[10px] text-[#C9A227] block pt-2 border-t border-[#222222]">Mechanism: {l.mechanism}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
