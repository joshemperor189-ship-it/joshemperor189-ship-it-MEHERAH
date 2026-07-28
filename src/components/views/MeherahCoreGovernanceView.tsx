import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Terminal, 
  Zap, 
  Scale, 
  HeartHandshake, 
  Eye, 
  Compass, 
  Globe2, 
  Brain, 
  Award, 
  RefreshCw, 
  Layers, 
  ChevronRight, 
  Lock, 
  Sparkles,
  Check
} from 'lucide-react';

interface PrinciplesData {
  PURPOSE: string;
  TRANSPARENCY: string;
  SERVICE: string;
  INTELLIGENCE: string;
  RELIABILITY: string;
  LEARNING: string;
  INTEGRITY: string;
  GLOBAL: string;
}

export function MeherahCoreGovernanceView() {
  const [principles, setPrinciples] = useState<PrinciplesData | null>(null);
  const [loadingPrinciples, setLoadingPrinciples] = useState<boolean>(true);

  // Evaluator Interactive Form State
  const [amountUGX, setAmountUGX] = useState<number>(150000);
  const [senderNetwork, setSenderNetwork] = useState<string>('Airtel Uganda (+256701234567)');
  const [recipientNetwork, setRecipientNetwork] = useState<string>('MTN Mobile Money (+256772987654)');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Decision Result State
  const [decisionResult, setDecisionResult] = useState<any>(null);

  useEffect(() => {
    fetchPrinciples();
    evaluateDecision(150000, 'Airtel Uganda (+256701234567)', 'MTN Mobile Money (+256772987654)');
  }, []);

  const fetchPrinciples = async () => {
    setLoadingPrinciples(true);
    try {
      const res = await fetch('/api/meherah/governance/principles');
      const data = await res.json();
      setPrinciples(data.principles);
    } catch (err) {
      console.error('Failed to fetch principles:', err);
    } finally {
      setLoadingPrinciples(false);
    }
  };

  const evaluateDecision = async (amt: number, sNetwork: string, rNetwork: string) => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/meherah/governance/evaluate-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUGX: amt, senderNetwork: sNetwork, recipientNetwork: rNetwork })
      });
      const data = await res.json();
      setDecisionResult(data);
    } catch (err) {
      console.error('Decision evaluation error:', err);
    } fontFinally: {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase">
                IMMUTABLE GOVERNANCE CORE
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" /> ACTIVE DECISION ENGINE
              </span>
            </div>
            <h1 className="text-2xl font-bold font-playfair tracking-tight text-[#FFFFFF]">
              MEHERAH Principles Encoded Into Executable Code
            </h1>
            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans">
              MEHERAH turns ethical guidelines from documentation into active software boundaries. Every transaction, route calculation, and system response is evaluated and enforced by the Meherah Decision Engine.
            </p>
          </div>

          <button
            onClick={() => evaluateDecision(amountUGX, senderNetwork, recipientNetwork)}
            disabled={isEvaluating}
            className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 shadow-lg shadow-[#C9A227]/20 whitespace-nowrap disabled:opacity-50"
          >
            {isEvaluating ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" />
            ) : (
              <Sparkles className="w-4 h-4 fill-current text-[#070707]" />
            )}
            Re-evaluate Governance Rules
          </button>
        </div>

        {/* CORE ENGINES ARCHITECTURE DIAGRAM BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-6 pt-5 border-t border-[#222222]">
          {[
            { title: 'Purpose Engine', desc: 'User Benefit Priority', icon: Compass },
            { title: 'Intelligence Engine', desc: 'Predictive Optimization', icon: Brain },
            { title: 'Translation Engine', desc: 'Clear Human Explanations', icon: Eye },
            { title: 'Service Engine', desc: 'People Before Profit', icon: HeartHandshake },
            { title: 'Integrity Engine', desc: 'Auditable Ledger Logs', icon: Scale },
            { title: 'Learning Engine', desc: 'Adaptive Self-Correction', icon: Award },
            { title: 'Route Engine', desc: 'Cheapest & Safest Path', icon: Zap }
          ].map((engine, idx) => {
            const Icon = engine.icon;
            return (
              <div key={idx} className="p-3 bg-[#070707] border border-[#C9A227]/20 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-[#E8C879]">
                  <Icon className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span className="text-[11px] font-bold font-sans">{engine.title}</span>
                </div>
                <span className="text-[9px] text-[#A7A7A7] font-mono block leading-tight">{engine.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. THE 8 IMMUTABLE SYSTEM PRINCIPLES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#C9A227]" />
            <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">The 8 Immutable Principles of MEHERAH</h2>
          </div>
          <span className="text-xs font-mono text-[#E8C879] bg-[#111111] px-2.5 py-1 rounded border border-[#C9A227]/30">
            MEHERAH_PRINCIPLES (HARDCODED IN CODEBASE)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'PURPOSE', title: 'Purpose', icon: Compass, text: principles?.PURPOSE || "Every action must benefit the user." },
            { key: 'TRANSPARENCY', title: 'Transparency', icon: Eye, text: principles?.TRANSPARENCY || "Every important decision must be explainable." },
            { key: 'SERVICE', title: 'Service', icon: HeartHandshake, text: principles?.SERVICE || "Optimise for people before profit." },
            { key: 'INTELLIGENCE', title: 'Intelligence', icon: Brain, text: principles?.INTELLIGENCE || "Predict before reacting." },
            { key: 'RELIABILITY', title: 'Reliability', icon: ShieldCheck, text: principles?.RELIABILITY || "Choose the safest verified route." },
            { key: 'LEARNING', title: 'Learning', icon: Award, text: principles?.LEARNING || "Improve after every completed transaction." },
            { key: 'INTEGRITY', title: 'Integrity', icon: Scale, text: principles?.INTEGRITY || "Every transaction must be auditable." },
            { key: 'GLOBAL', title: 'Global', icon: Globe2, text: principles?.GLOBAL || "Design for every country, not one country." }
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.key} className="p-4 bg-[#111111] border border-[#C9A227]/20 rounded-xl space-y-2 relative overflow-hidden group hover:border-[#C9A227]/60 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30">
                    {p.key}
                  </span>
                  <Icon className="w-4 h-4 text-[#C9A227]" />
                </div>
                <h3 className="text-sm font-bold font-sans text-[#FFFFFF]">{p.title}</h3>
                <p className="text-xs text-[#A7A7A7] font-mono leading-relaxed">"{p.text}"</p>
                <div className="pt-2 border-t border-[#222222] flex items-center gap-1.5 text-[10px] text-[#00B86B] font-mono font-bold">
                  <Check className="w-3 h-3" /> System Enforced
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MEHERAH DECISION ENGINE LIVE SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: SIMULATOR INPUT FORM */}
        <div className="lg:col-span-5 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-5">
          <div className="border-b border-[#222222] pb-3">
            <span className="text-xs font-mono font-bold text-[#E8C879] uppercase">DECISION ENGINE INPUT</span>
            <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Simulate Governance Evaluation</h2>
            <p className="text-xs text-[#A7A7A7] mt-1">
              Enter payment parameters to observe how the Meherah Decision Engine enforces core principles during route evaluation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Sender Network & Identifier</label>
              <input
                type="text"
                value={senderNetwork}
                onChange={(e) => setSenderNetwork(e.target.value)}
                className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Recipient Network & Identifier</label>
              <input
                type="text"
                value={recipientNetwork}
                onChange={(e) => setRecipientNetwork(e.target.value)}
                className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Transfer Amount (UGX)</label>
              <input
                type="number"
                value={amountUGX}
                onChange={(e) => setAmountUGX(Number(e.target.value))}
                className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <button
              onClick={() => evaluateDecision(amountUGX, senderNetwork, recipientNetwork)}
              disabled={isEvaluating}
              className="w-full py-3.5 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20 disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> Evaluating Core Governance Rules...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current text-[#070707]" /> Run Decision Engine Evaluation
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-xs font-mono space-y-2">
            <span className="text-[#E8C879] font-bold block uppercase">System Rule Guarantee:</span>
            <p className="text-[#A7A7A7]">
              The engine will NEVER select a provider that maximizes transaction fees for profit. It forces selection based on lowest user cost, fastest delivery, and auditable proof.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: FORMATTED MEHERAH DECISION DISPLAY */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <span className="text-xs font-mono font-bold text-[#00B86B] uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C9A227]" /> LIVE DECISION ENGINE OUTPUT
            </span>
            <span className="text-xs font-mono text-[#E8C879]">
              CONFIDENCE: {decisionResult?.confidence || 99.8}%
            </span>
          </div>

          {/* MEHERAH DECISION CARD FORMAT */}
          <div className="p-6 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-6 shadow-inner relative">
            <div className="text-center border-b border-[#222222] pb-4">
              <span className="text-[11px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </span>
              <h3 className="text-xl font-bold font-playfair text-[#FFFFFF] tracking-widest uppercase my-1">
                MEHERAH DECISION
              </h3>
              <span className="text-[11px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </span>
            </div>

            {decisionResult ? (
              <div className="space-y-4 font-mono text-xs">
                
                {/* PURPOSE CHECK */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#FFFFFF] font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#00B86B]" />
                    <span>Purpose</span>
                  </div>
                  <p className="text-[#A7A7A7] pl-6 font-sans">
                    ✓ {decisionResult.principlesCheck?.purpose?.explanation}
                  </p>
                </div>

                {/* UNDERSTANDING CHECK */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#FFFFFF] font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#00B86B]" />
                    <span>Understanding</span>
                  </div>
                  <p className="text-[#A7A7A7] pl-6 font-sans">
                    ✓ {decisionResult.principlesCheck?.understanding?.explanation}
                  </p>
                </div>

                {/* TRANSLATION CHECK */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#FFFFFF] font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#00B86B]" />
                    <span>Translation</span>
                  </div>
                  <p className="text-[#E8C879] pl-6 font-sans font-semibold">
                    ✓ {decisionResult.principlesCheck?.translation?.explanation}
                  </p>
                </div>

                {/* SERVICE CHECK */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#FFFFFF] font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#00B86B]" />
                    <span>Service</span>
                  </div>
                  <p className="text-[#A7A7A7] pl-6 font-sans">
                    ✓ {decisionResult.principlesCheck?.service?.explanation}
                  </p>
                </div>

                {/* INTEGRITY CHECK */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#FFFFFF] font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#00B86B]" />
                    <span>Integrity</span>
                  </div>
                  <p className="text-[#A7A7A7] pl-6 font-mono text-[11px]">
                    ✓ {decisionResult.principlesCheck?.integrity?.explanation}
                  </p>
                </div>

                {/* CONFIDENCE & USER BENEFIT BANNER */}
                <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111111] p-4 rounded-xl border border-[#C9A227]/20">
                  <div>
                    <span className="text-[10px] text-[#666666] font-bold block uppercase">USER BENEFIT METRICS</span>
                    <p className="text-xs text-[#00B86B] font-bold mt-0.5">
                      Saved UGX {decisionResult.userBenefit?.moneySavedUGX?.toLocaleString()} • Time Saved: {decisionResult.userBenefit?.timeSaved}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] font-bold block uppercase">DECISION CONFIDENCE</span>
                    <span className="text-lg font-bold text-[#C9A227] font-playfair">{decisionResult.confidence}%</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center space-y-2">
                <RefreshCw className="w-8 h-8 text-[#C9A227] animate-spin mx-auto" />
                <p className="text-xs text-[#A7A7A7] font-mono">Calculating decision trace against MEHERAH Core Principles...</p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
