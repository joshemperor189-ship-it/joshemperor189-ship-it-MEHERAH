import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Brain, 
  Scale, 
  Activity, 
  Globe2, 
  Flame, 
  BookOpen, 
  Users, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  Copy, 
  RefreshCw, 
  HeartHandshake, 
  Cpu, 
  Layers, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { 
  StewardshipCouncilDecision, 
  AlignmentEngineCheck, 
  GlobalTrustIndexData, 
  SovereignParticipationProfile, 
  ResilienceTelemetry, 
  KnowledgeStewardshipAsset, 
  HumanBenefitMetrics, 
  LegacyProtocolSpec 
} from '../../services/meherah-global-stewardship.service';

export function MeherahGlobalStewardshipView() {
  const [activeTab, setActiveTab] = useState<
    'council' | 'alignment' | 'trust' | 'sovereignty' | 'resilience' | 'knowledge' | 'impact' | 'legacy'
  >('council');
  const [loading, setLoading] = useState<boolean>(true);

  // States
  const [council, setCouncil] = useState<StewardshipCouncilDecision[]>([]);
  const [alignment, setAlignment] = useState<AlignmentEngineCheck[]>([]);
  const [trustIndex, setTrustIndex] = useState<GlobalTrustIndexData | null>(null);
  const [sovereignty, setSovereignty] = useState<SovereignParticipationProfile[]>([]);
  const [resilience, setResilience] = useState<ResilienceTelemetry[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeStewardshipAsset[]>([]);
  const [impact, setImpact] = useState<HumanBenefitMetrics | null>(null);
  const [legacy, setLegacy] = useState<LegacyProtocolSpec[]>([]);

  // Interactive Alignment Evaluator
  const [customAction, setCustomAction] = useState<string>('');
  const [evalResult, setEvalResult] = useState<AlignmentEngineCheck | null>(null);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  useEffect(() => {
    fetchStewardshipData();
  }, []);

  const fetchStewardshipData = async () => {
    setLoading(true);
    try {
      const [cRes, aRes, tRes, sRes, rRes, kRes, iRes, lRes] = await Promise.all([
        fetch('/api/meherah/global-stewardship/council'),
        fetch('/api/meherah/global-stewardship/alignment'),
        fetch('/api/meherah/global-stewardship/trust-index'),
        fetch('/api/meherah/global-stewardship/sovereignty'),
        fetch('/api/meherah/global-stewardship/resilience'),
        fetch('/api/meherah/global-stewardship/knowledge'),
        fetch('/api/meherah/global-stewardship/impact'),
        fetch('/api/meherah/global-stewardship/legacy-protocol')
      ]);

      setCouncil(await cRes.json());
      setAlignment(await aRes.json());
      setTrustIndex(await tRes.json());
      setSovereignty(await sRes.json());
      setResilience(await rRes.json());
      setKnowledge(await kRes.json());
      setImpact(await iRes.json());
      setLegacy(await lRes.json());
    } catch (err) {
      console.error('Failed to fetch Global Stewardship data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestAlignment = async () => {
    if (!customAction.trim()) return;
    setEvaluating(true);
    try {
      const res = await fetch('/api/meherah/global-stewardship/alignment-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionRequested: customAction })
      });
      const data = await res.json();
      setEvalResult(data);
    } catch (err) {
      console.error('Failed to run alignment evaluation:', err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* HERO BANNER FOR GLOBAL STEWARDSHIP FRAMEWORK */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <ShieldCheck className="w-3.5 h-3.5 text-[#070707]" /> GLOBAL STEWARDSHIP FRAMEWORK
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-[#00B86B]" /> GOVERNED INTELLIGENCE AT GLOBAL SCALE
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF] italic">
                "The responsibility of governing intelligence at global scale."
              </h1>
              <p className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                Intelligence can be autonomous, but responsibility must remain visible.
              </p>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              As MEHERAH's influence grows, the Global Stewardship Framework acts as the unshakeable guardian of the World Operating Layer — ensuring alignment with core principles, multi-sovereign independence, absolute resilience, and human benefit.
            </p>
          </div>

          {/* TRUST INDEX OVERVIEW BADGE */}
          {trustIndex && (
            <div className="bg-[#070707] border border-[#C9A227]/50 rounded-xl p-5 text-center space-y-2 min-w-[280px]">
              <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">COMPOSITE TRUST INDEX</span>
              <div className="text-3xl font-bold font-mono text-[#00B86B]">
                {trustIndex.compositeTrustScore}%
              </div>
              <div className="text-[10px] text-[#C9A227] font-mono flex items-center justify-center gap-2 font-bold">
                <span>RELIABILITY: {trustIndex.systemReliabilityPct}%</span>
                <span>•</span>
                <span>SECURITY: {trustIndex.securityIntegrityPct}%</span>
              </div>
              <div className="text-[9px] text-[#A7A7A7] font-mono">
                HUMAN OVERSIGHT: <span className="text-[#00B86B] font-bold">{trustIndex.humanOversightStatus}</span>
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION TABS FOR THE 8 PILLARS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'council', label: '1. Governance Council', desc: 'Ethical Oversight', icon: ShieldCheck },
            { id: 'alignment', label: '2. Alignment Engine', desc: '"Should We Do This?"', icon: Scale },
            { id: 'trust', label: '3. Global Trust Index', desc: 'Visible Metrics', icon: Activity },
            { id: 'sovereignty', label: '4. Sovereign Framework', desc: 'Connected Not Controlled', icon: Globe2 },
            { id: 'resilience', label: '5. Resilience Engine', desc: '42ms Auto-Failover', icon: Flame },
            { id: 'knowledge', label: '6. Knowledge Assets', desc: 'Institutional Memory', icon: BookOpen },
            { id: 'impact', label: '7. Human Benefit', desc: '$42.8M+ Saved', icon: HeartHandshake },
            { id: 'legacy', label: '8. Legacy Protocol', desc: 'Permanent Canon', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-2.5 rounded-xl border text-left font-mono transition-all flex flex-col justify-between ${
                  active 
                    ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-lg shadow-[#C9A227]/20' 
                    : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase">{tab.label.split('.')[0]}</span>
                  <Icon className="w-3.5 h-3.5 text-current" />
                </div>
                <span className="text-[11px] font-bold font-sans mt-1 text-current truncate">{tab.label.split('.')[1]}</span>
                <span className="text-[8px] opacity-80 block font-mono truncate">{tab.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. GOVERNANCE COUNCIL */}
      {activeTab === 'council' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  HUMAN ACCOUNTABILITY BODY
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Governance Council</h2>
                <p className="text-xs text-[#A7A7A7]">Oversees evolution, reviews major AI model decisions, approves critical system changes, and enforces multi-sovereign multi-sig authorization.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                HUMAN OVERSIGHT ACTIVE
              </span>
            </div>

            {/* COUNCIL DECISIONS */}
            <div className="space-y-4 font-mono text-xs">
              {council.map((d) => (
                <div key={d.id} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                      {d.category}
                    </span>
                    <span className="text-xs font-bold text-[#00B86B]">{d.alignmentScorePct}% ALIGNMENT</span>
                  </div>

                  <div className="space-y-1 font-sans">
                    <strong className="text-sm text-[#FFFFFF] block">{d.title}</strong>
                    <p className="text-xs text-[#A7A7A7]">{d.proposedChange}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#222222] text-[10px]">
                    <span className="text-[#A7A7A7]">Reviewer: <strong className="text-[#FFFFFF]">{d.humanOversightReviewer}</strong></span>
                    <span className="text-[#00B86B] bg-[#00B86B]/20 px-2 py-0.5 rounded font-bold border border-[#00B86B]/40">
                      {d.voteStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ALIGNMENT ENGINE */}
      {activeTab === 'alignment' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ETERNAL PRINCIPLES GUARDIAN
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">The MEHERAH Alignment Engine</h2>
                <p className="text-xs text-[#A7A7A7]">Evaluates every major system action: Purpose Check → Service Check → Transparency Check → Integrity Check → Trust Check → Execute.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                "SHOULD WE DO THIS?" ACTIVE
              </span>
            </div>

            {/* INTERACTIVE ALIGNMENT TESTER */}
            <div className="p-5 bg-[#070707] border border-[#C9A227]/50 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-[#C9A227] font-mono uppercase block">
                TEST SYSTEM ACTION AGAINST THE 8 ETERNAL PRINCIPLES
              </span>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customAction}
                  onChange={(e) => setCustomAction(e.target.value)}
                  placeholder="e.g., Introduce 2% peak-hour liquidity fee for cross-border transfers"
                  className="flex-1 px-4 py-2.5 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder-[#A7A7A7] focus:border-[#C9A227] focus:outline-none font-mono"
                />
                <button
                  onClick={handleTestAlignment}
                  disabled={evaluating || !customAction.trim()}
                  className="px-5 py-2.5 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {evaluating ? <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> : <Scale className="w-4 h-4 text-[#070707]" />}
                  Evaluate Action
                </button>
              </div>

              {/* EVALUATION RESULT DISPLAY */}
              {evalResult && (
                <div className={`p-4 rounded-xl border space-y-3 font-mono text-xs ${
                  evalResult.finalVerdict === 'EXECUTE_APPROVED' 
                    ? 'bg-[#00B86B]/10 border-[#00B86B] text-[#FFFFFF]' 
                    : 'bg-red-500/10 border-red-500 text-[#FFFFFF]'
                }`}>
                  <div className="flex items-center justify-between border-b border-current/20 pb-2">
                    <span className="font-bold uppercase">EVALUATION VERDICT:</span>
                    <strong className={`px-2 py-0.5 rounded font-bold ${
                      evalResult.finalVerdict === 'EXECUTE_APPROVED' ? 'bg-[#00B86B] text-[#070707]' : 'bg-red-500 text-[#FFFFFF]'
                    }`}>
                      {evalResult.finalVerdict}
                    </strong>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] text-center font-bold">
                    <div className={`p-2 rounded border ${evalResult.purposeCheckPassed ? 'bg-[#00B86B]/20 border-[#00B86B]' : 'bg-red-500/20 border-red-500'}`}>
                      PURPOSE: {evalResult.purposeCheckPassed ? '✔ PASS' : '✘ FAIL'}
                    </div>
                    <div className={`p-2 rounded border ${evalResult.serviceCheckPassed ? 'bg-[#00B86B]/20 border-[#00B86B]' : 'bg-red-500/20 border-red-500'}`}>
                      SERVICE: {evalResult.serviceCheckPassed ? '✔ PASS' : '✘ FAIL'}
                    </div>
                    <div className={`p-2 rounded border ${evalResult.transparencyCheckPassed ? 'bg-[#00B86B]/20 border-[#00B86B]' : 'bg-red-500/20 border-red-500'}`}>
                      TRANSPARENCY: {evalResult.transparencyCheckPassed ? '✔ PASS' : '✘ FAIL'}
                    </div>
                    <div className={`p-2 rounded border ${evalResult.integrityCheckPassed ? 'bg-[#00B86B]/20 border-[#00B86B]' : 'bg-red-500/20 border-red-500'}`}>
                      INTEGRITY: {evalResult.integrityCheckPassed ? '✔ PASS' : '✘ FAIL'}
                    </div>
                    <div className={`p-2 rounded border ${evalResult.trustCheckPassed ? 'bg-[#00B86B]/20 border-[#00B86B]' : 'bg-red-500/20 border-red-500'}`}>
                      TRUST: {evalResult.trustCheckPassed ? '✔ PASS' : '✘ FAIL'}
                    </div>
                  </div>

                  <p className="text-xs font-sans text-[#FFFFFF] italic">"{evalResult.alignmentRationale}"</p>
                </div>
              )}
            </div>

            {/* RECORDED CHECKS */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-[#A7A7A7] uppercase block">HISTORICAL ALIGNMENT AUDIT TRAILS</span>
              {alignment.map((a) => (
                <div key={a.id} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FFFFFF] font-sans">{a.actionRequested}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      a.finalVerdict === 'EXECUTE_APPROVED' ? 'bg-[#00B86B]/20 text-[#00B86B]' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {a.finalVerdict}
                    </span>
                  </div>
                  <p className="text-xs text-[#A7A7A7] font-sans italic">"{a.alignmentRationale}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. GLOBAL TRUST INDEX */}
      {activeTab === 'trust' && trustIndex && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  MEASURABLE TRUST METRICS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Global Trust Index</h2>
                <p className="text-xs text-[#A7A7A7]">Trust is not claimed — it is made continuously visible through real-time cryptographic auditability and explainability.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                AUDIT COMPLETE 100%
              </span>
            </div>

            {/* TRUST METRICS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1 text-center">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">System Reliability</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{trustIndex.systemReliabilityPct}%</strong>
                <span className="text-[9px] text-[#A7A7A7]">Sub-100ms Routing</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1 text-center">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Security Integrity</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{trustIndex.securityIntegrityPct}%</strong>
                <span className="text-[9px] text-[#A7A7A7]">FIPS 140-2 Level 3 HSM</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1 text-center">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Audit Completeness</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{trustIndex.auditCompletenessPct}%</strong>
                <span className="text-[9px] text-[#A7A7A7]">3-Way Double-Entry Hash</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1 text-center">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Decision Explainability</span>
                <strong className="text-2xl text-[#C9A227] font-bold block">{trustIndex.decisionExplainabilityPct}%</strong>
                <span className="text-[9px] text-[#A7A7A7]">Human Language Decoder</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1 text-center">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Human Oversight</span>
                <strong className="text-xl text-[#00B86B] font-bold block">{trustIndex.humanOversightStatus}</strong>
                <span className="text-[9px] text-[#A7A7A7]">Multi-Sovereign Board</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-1 text-center">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Network Health</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{trustIndex.networkHealthPct}%</strong>
                <span className="text-[9px] text-[#A7A7A7]">Global Mesh Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SOVEREIGN PARTICIPATION FRAMEWORK */}
      {activeTab === 'sovereignty' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  CONNECTED DOES NOT MEAN CONTROLLED
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Sovereign Participation Framework</h2>
                <p className="text-xs text-[#A7A7A7]">Each participating central bank, country, or institution maintains 100% financial authority, compliance rules, and data residency.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                SOVEREIGN INDEPENDENCE 100%
              </span>
            </div>

            {/* SOVEREIGN PROFILES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {sovereignty.map((s) => (
                <div key={s.sovereigntyId} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="text-sm font-bold text-[#C9A227] font-sans">{s.jurisdiction} ({s.sovereigntyId})</span>
                    <span className="text-[9px] text-[#00B86B] font-bold">{s.financialAuthorityControl}</span>
                  </div>

                  <strong className="text-xs text-[#FFFFFF] font-sans block">{s.institutionName}</strong>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#A7A7A7] block">LOCAL COMPLIANCE MANDATES:</span>
                    <ul className="text-[10px] text-[#A7A7A7] list-disc list-inside space-y-0.5">
                      {s.localComplianceRules.map((rule, idx) => (
                        <li key={idx} className="text-[#FFFFFF]">{rule}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2 bg-[#111111] rounded-xl border border-[#222222] text-[10px] text-[#C9A227]">
                    🔒 ROLE: {s.meherahRole}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. GLOBAL RESILIENCE ENGINE */}
      {activeTab === 'resilience' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  UNSHAKEABLE DISRUPTION SURVIVAL
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Global Resilience Engine</h2>
                <p className="text-xs text-[#A7A7A7]">The network becomes stronger after every challenge — feature-complete auto-failover, cyber threat shielding, and multi-region recovery.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                42ms FAILOVER SPEED
              </span>
            </div>

            {/* RESILIENCE TELEMETRY */}
            <div className="space-y-4 font-mono text-xs">
              {resilience.map((r, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <strong className="text-xs text-[#FFFFFF] font-sans">{r.pillar}</strong>
                    <span className="text-[10px] text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-2 py-0.5 rounded font-bold">
                      {r.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-[#A7A7A7]">
                    <span>Last Test: <strong className="text-[#FFFFFF]">{r.lastDisasterRecoveryTest}</strong></span>
                    <span>Failover Latency: <strong className="text-[#C9A227]">{r.failoverLatencyMs}ms</strong></span>
                    <span className="text-[#00B86B] font-bold">{r.threatResponseMode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. KNOWLEDGE STEWARDSHIP */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  INSTITUTIONAL MEMORY ASSET
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Knowledge Stewardship</h2>
                <p className="text-xs text-[#A7A7A7]">Records what decisions worked, what risks were mitigated, and what operational patterns emerged as a permanent asset.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                PERMANENT MEMORY ASSETS
              </span>
            </div>

            {/* KNOWLEDGE ASSETS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {knowledge.map((k) => (
                <div key={k.id} className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-[#C9A227] font-sans block">{k.topic}</span>
                  
                  <div className="space-y-1 text-xs font-sans text-[#A7A7A7]">
                    <p>• <strong className="text-[#FFFFFF]">Lesson Learned:</strong> {k.lessonsLearned}</p>
                    <p>• <strong className="text-[#00B86B]">Risk Mitigated:</strong> {k.riskMitigated}</p>
                    <p>• <strong className="text-[#C9A227]">Discovered Improvement:</strong> {k.discoveredImprovement}</p>
                  </div>

                  <div className="pt-2 border-t border-[#222222] text-[9px] text-[#A7A7A7]">
                    PERMANENCE HASH: <code className="text-[#C9A227]">{k.permanenceHash}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. HUMAN BENEFIT MEASUREMENT */}
      {activeTab === 'impact' && impact && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  MEASURABLE HUMAN VALUE CREATION
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Human Benefit Measurement</h2>
                <p className="text-xs text-[#A7A7A7]">"How much value did MEHERAH create?" — Measuring friction reduction, cost savings, and financial access expansion.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                NET VALUE SCORE: {impact.netHumanValueIndex}/100
              </span>
            </div>

            {/* IMPACT SCORECARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#00B86B]/40 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Cost Reduced</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{impact.costReducedUSD}</strong>
                <span className="text-[9px] text-[#A7A7A7]">Friction Fees Eliminated</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Time Saved</span>
                <strong className="text-2xl text-[#C9A227] font-bold block">{impact.timeSavedHours}</strong>
                <span className="text-[9px] text-[#A7A7A7]">Instant Settlement Speed</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#00B86B]/40 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Failed Payments Prevented</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{impact.failedPaymentsPrevented.toLocaleString()}</strong>
                <span className="text-[9px] text-[#A7A7A7]">Auto-Rerouted Seamlessly</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Businesses Enabled</span>
                <strong className="text-2xl text-[#C9A227] font-bold block">{impact.businessesEnabled.toLocaleString()}</strong>
                <span className="text-[9px] text-[#A7A7A7]">Cross-Border Enterprise Commerce</span>
              </div>

              <div className="p-5 bg-[#070707] border border-[#00B86B]/40 rounded-2xl text-center space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#A7A7A7] uppercase block font-bold">Financial Access Impact</span>
                <strong className="text-2xl text-[#00B86B] font-bold block">{impact.financialAccessUsers}</strong>
                <span className="text-[9px] text-[#A7A7A7]">East African Everyday Citizens</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. LEGACY PROTOCOL */}
      {activeTab === 'legacy' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  PROTECTING VISION OVER DECADES
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Legacy Protocol</h2>
                <p className="text-xs text-[#A7A7A7]">Defines core immutable principles that can never change, upgrade approval protocols, and long-term trust preservation.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                PERMANENT CANON
              </span>
            </div>

            {/* LEGACY ARTICLES */}
            <div className="space-y-4 font-mono text-xs">
              {legacy.map((l, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="text-xs font-bold text-[#C9A227] font-sans">{l.clause}</span>
                    <span className="text-[9px] text-[#00B86B] font-bold">{l.immutableStatus}</span>
                  </div>

                  <p className="text-xs text-[#FFFFFF] font-sans italic">"{l.principleProtection}"</p>

                  <div className="pt-2 border-t border-[#222222] text-[10px] text-[#A7A7A7]">
                    Requirement: <strong className="text-[#C9A227]">{l.governanceUpgradeRequirement}</strong>
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
