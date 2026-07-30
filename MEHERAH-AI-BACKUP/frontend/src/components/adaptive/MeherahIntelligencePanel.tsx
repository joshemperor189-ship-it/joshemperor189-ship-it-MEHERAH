import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldAlert, Cpu, RefreshCw, ArrowRight } from 'lucide-react';

interface DecisionCard {
  recommendedRoute: string;
  reason: string;
  confidence: string;
  humanApproval: string;
}

export function MeherahIntelligencePanel() {
  const [loading, setLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState<string | null>(
    "Gemini Intelligence evaluated 14 active East African payment corridors. MTN Mobile Money exhibits the lowest fee structure (1%) and highest settlement guarantee (98%) for current transaction volumes."
  );
  const [decision, setDecision] = useState<DecisionCard>({
    recommendedRoute: "MTN Mobile Money",
    reason: "Lowest cost with highest reliability.",
    confidence: "97%",
    humanApproval: "Required"
  });

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerDetails: {
            provider: 'MTN Mobile Money',
            fee: '1%',
            speed: '3 seconds',
            reliability: '98%'
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        if (data.analysis) setAnalysisText(data.analysis);
        if (data.decisionCard) setDecision(data.decisionCard);
      }
    } catch (e) {
      console.error("AI Analysis fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#0E0E0E] border-2 border-[#C8A64D] rounded-3xl space-y-6 shadow-[0_0_35px_rgba(200,166,77,0.15)] font-sans">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5C76B] via-[#C8A64D] to-[#8A6D1B] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center font-bold text-sm text-[#C8A64D] font-serif">
              <Sparkles size={18} />
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C8A64D] uppercase font-bold block">
              GEMINI REASONING LAYER
            </span>
            <h3 className="text-base font-bold font-serif text-[#FFFFFF]">
              MEHERAH INTELLIGENCE
            </h3>
          </div>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          className="px-3.5 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#C8A64D] hover:text-[#080808] border border-[#C8A64D]/40 text-[#C8A64D] text-xs font-mono font-bold transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Re-evaluate Route</span>
        </button>
      </div>

      {/* AI DECISION CARD */}
      <div className="p-5 bg-[#141414] border border-[#C8A64D]/30 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#222222] pb-2">
          <span className="text-[10px] font-mono font-bold text-[#E5C76B] uppercase flex items-center gap-1.5">
            <Cpu size={14} className="text-[#C8A64D]" /> AI DECISION EVALUATION
          </span>
          <span className="text-[10px] font-mono text-[#00B86B] bg-[#00B86B]/10 px-2 py-0.5 rounded font-bold">
            GEMINI-2.5-FLASH
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3 bg-[#080808] border border-[#222222] rounded-xl">
            <span className="text-[10px] text-[#777777] uppercase block">RECOMMENDED ROUTE</span>
            <strong className="text-sm text-[#E5C76B] font-bold block mt-1">{decision.recommendedRoute}</strong>
          </div>

          <div className="p-3 bg-[#080808] border border-[#222222] rounded-xl">
            <span className="text-[10px] text-[#777777] uppercase block">REASON</span>
            <span className="text-xs text-[#FFFFFF] font-sans block mt-1 leading-tight">{decision.reason}</span>
          </div>

          <div className="p-3 bg-[#080808] border border-[#222222] rounded-xl">
            <span className="text-[10px] text-[#777777] uppercase block">CONFIDENCE</span>
            <strong className="text-sm text-[#00B86B] font-bold block mt-1">{decision.confidence}</strong>
          </div>

          <div className="p-3 bg-[#080808] border border-[#222222] rounded-xl">
            <span className="text-[10px] text-[#777777] uppercase block">HUMAN APPROVAL</span>
            <strong className="text-xs text-amber-400 font-bold block mt-1 flex items-center gap-1">
              <ShieldAlert size={12} /> {decision.humanApproval}
            </strong>
          </div>
        </div>

        {/* ANALYSIS DETAILED TEXT */}
        {analysisText && (
          <div className="p-3.5 bg-[#080808] rounded-xl border border-[#222222] text-xs font-sans text-[#D1D1D1] leading-relaxed">
            <strong className="text-[#C8A64D] block font-mono text-[10px] uppercase mb-1">AI Reasoning Summary:</strong>
            {analysisText}
          </div>
        )}
      </div>

    </div>
  );
}
