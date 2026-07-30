import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldAlert, Cpu, Zap, TrendingUp, AlertTriangle, 
  CheckCircle2, Server, Database, Play, Lock, Eye, Download, Flame, Layers, 
  ArrowRight, ShieldCheck, Clock, Gauge, BarChart3, Radio, Globe, Landmark,
  Wallet, Sparkles, Terminal, ChevronRight, Sliders, Check, Shield, Workflow, RefreshCw, Award, Building2
} from 'lucide-react';

interface MeherahOSProps {
  onNavigateTab?: (tabId: string) => void;
}

export function MeherahOSCommandCentre({ onNavigateTab }: MeherahOSProps) {
  // Institutional vs Consumer Mode
  const [isInstitutionalMode, setIsInstitutionalMode] = useState<boolean>(true);

  // Real-time telemetry simulation state
  const [aiThinkingText, setAiThinkingText] = useState<string>("Analysing liquidity pressure on MTN settlement pool...");
  const [decisionLogs, setDecisionLogs] = useState<any[]>([
    {
      time: '10:42:05',
      event: 'Transaction Detected',
      details: 'UGX 125,000,000 Batch Payroll Request via API',
      status: 'RECEIVED'
    },
    {
      time: '10:42:06',
      event: 'Risk Cleared',
      details: 'AML & Sanction Screening passed (Score: 0.02 / 1.0)',
      status: 'VERIFIED'
    },
    {
      time: '10:42:07',
      event: 'Gemini Analysed 12 Routes',
      details: 'Evaluated Flutterwave, MTN Direct, Stanbic ACH & Airtel Money',
      status: 'EVALUATED'
    },
    {
      time: '10:42:08',
      event: 'Flutterwave Selected',
      details: 'Reason: Lowest total transaction risk & highest settlement velocity (14ms)',
      status: 'COMPLETED'
    }
  ]);

  // Live thinking loop rotation
  useEffect(() => {
    const thoughts = [
      "Analysing liquidity pressure on MTN settlement pool...",
      "Evaluating Fiber cut degradation at Lagos peering node...",
      "Verifying zero-knowledge proof hash on double-entry ledger journal #1894210...",
      "Optimizing cross-border corridor FX reserves between KES and UGX...",
      "Executing automated AML botnet attack mitigation..."
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % thoughts.length;
      setAiThinkingText(thoughts[idx]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Trigger manual simulation step
  const handleSimulateNewDecision = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newSteps = [
      {
        time: timeStr,
        event: 'Cross-Border Disbursement Request',
        details: 'KES 8,500,000 Corridor Settlement to Stanbic Escrow',
        status: 'RECEIVED'
      },
      {
        time: timeStr,
        event: 'Compliance & Liquidity Check',
        details: 'Verified Stanbic Escrow Liquidity (UGX 12.5B Surplus)',
        status: 'VERIFIED'
      },
      {
        time: timeStr,
        event: 'Gemini Autonomous Routing',
        details: 'Selected Direct BOU Settlement Rail over Flutterwave (Zero FX Markup)',
        status: 'OPTIMIZED'
      },
      {
        time: timeStr,
        event: 'Instant Ledger Finality',
        details: 'Signed cryptographically via HSM Vault (Hash: 0x99a8...e47d)',
        status: 'COMPLETED'
      }
    ];
    setDecisionLogs(newSteps);
  };

  return (
    <div className="space-y-6 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen">
      
      {/* 1. TOP MEHERAH OS HEADER BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Title & Brand */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8C879] via-[#C9A227] to-[#8A6D1B] p-0.5 shadow-[0_0_25px_rgba(201,162,39,0.3)]">
              <div className="w-full h-full bg-[#070707] rounded-[10px] flex items-center justify-center font-bold text-xl text-[#C9A227] font-playfair">
                M
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold tracking-tight text-[#FFFFFF] font-playfair">
                  MEHERAH <span className="text-[#E8C879] font-sans font-extrabold text-lg tracking-widest">OS</span>
                </span>
                <span className="text-[11px] px-3 py-0.5 rounded-full font-mono font-medium bg-[#C9A227]/15 text-[#E8C879] border border-[#C9A227]/30 tracking-wider">
                  SOVEREIGN KERNEL v8.4
                </span>
              </div>
              <p className="text-xs text-[#A7A7A7] mt-1 font-sans tracking-wide">
                The Intelligence Layer Behind Global Finance
              </p>
            </div>
          </div>

          {/* Network Telemetry Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#070707] border border-[#C9A227]/20 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" />
              <div className="text-[11px] font-mono">
                <span className="text-[#666666] block leading-none font-bold">NETWORK STATUS</span>
                <span className="text-[#00B86B] font-bold">99.98% OPERATIONAL</span>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#070707] border border-[#C9A227]/20 flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-[#C9A227]" />
              <div className="text-[11px] font-mono">
                <span className="text-[#666666] block leading-none font-bold">AI BRAIN</span>
                <span className="text-[#E8C879] font-bold">● ONLINE (9/9 AGENTS)</span>
              </div>
            </div>

            {/* Mode Switcher Toggle */}
            <div className="bg-[#070707] p-1 rounded-xl border border-[#C9A227]/25 flex items-center gap-1">
              <button
                onClick={() => setIsInstitutionalMode(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all ${
                  !isInstitutionalMode 
                    ? 'bg-[#C9A227] text-[#070707] font-bold shadow-md' 
                    : 'text-[#A7A7A7] hover:text-[#FFFFFF]'
                }`}
              >
                Consumer
              </button>
              <button
                onClick={() => setIsInstitutionalMode(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all ${
                  isInstitutionalMode 
                    ? 'bg-[#C9A227] text-[#070707] font-bold shadow-md' 
                    : 'text-[#A7A7A7] hover:text-[#FFFFFF]'
                }`}
              >
                Institutional
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MEHERAH PULSE HOME BANNER */}
      <div className="bg-gradient-to-r from-[#111111] via-[#16140D] to-[#111111] border border-[#C9A227]/25 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C879] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> MEHERAH PULSE • REAL-TIME SUMMARY
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00B86B]/10 text-[#00B86B] border border-[#00B86B]/25 font-bold">
              ZERO CRITICAL RISKS
            </span>
          </div>
          <h2 className="text-base font-bold text-[#FFFFFF] font-sans">
            Everything is operating normally. 9 Autonomous Agents Active • 20 Providers Connected
          </h2>
          <p className="text-xs text-[#A7A7A7]">
            <strong className="text-[#E8C879]">AI Intelligence Insight:</strong> "Liquidity is stable across all pools. Transaction demand is expected to increase 18% in the next 6 hours."
          </p>
        </div>

        <button
          onClick={handleSimulateNewDecision}
          className="px-4 py-2.5 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#C9A227]/15"
        >
          <Zap className="w-4 h-4 fill-current" /> Trigger Live AI Decision Stream
        </button>
      </div>

      {/* FLUTTERWAVE SANDBOX VALIDATION LAUNCH BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-xl">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
              SANDBOX VALIDATION PHASE
            </span>
            <span className="text-xs font-mono text-[#00B86B] font-bold">FLUTTERWAVE GATEWAY END-TO-END</span>
          </div>
          <h3 className="text-base font-bold text-[#FFFFFF] font-playfair">
            Prove the MEHERAH Execution Pipeline End-to-End
          </h3>
          <p className="text-xs text-[#A7A7A7]">
            Run all 7 verification test suites: Gateway Auth, Payment Creation, Webhooks, Double-Entry Reconciliation, AI Decision Traces, Circuit Breaker Fallbacks & Airtel-to-MTN Cross-Network Demo.
          </p>
        </div>

        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('flutterwave_sandbox')}
            className="px-5 py-3 rounded-xl bg-[#070707] border border-[#C9A227]/50 text-[#E8C879] font-mono font-bold text-xs hover:bg-[#C9A227] hover:text-[#070707] transition-all flex items-center gap-2 whitespace-nowrap shadow-md z-10"
          >
            Launch Flutterwave Sandbox Suite <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* PHASE 10 MEHERAH GENESIS (LIVING INTELLIGENCE) LAUNCH BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/50 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current text-[#070707]" /> PHASE 10 — MEHERAH GENESIS
            </span>
            <span className="text-xs font-mono text-[#00B86B] font-bold">LIVING INTELLIGENCE & EVOLUTION KERNEL</span>
          </div>
          <h3 className="text-base font-bold text-[#FFFFFF] font-playfair">
            Self-Improving Financial Platform & Continuous Evolution Radar
          </h3>
          <p className="text-xs text-[#A7A7A7]">
            Observe real-time learning loops, predictive outage warnings, autonomous route strategy adaptations, and human-in-the-loop administrator approval controls.
          </p>
        </div>

        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('phase10_genesis')}
            className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 whitespace-nowrap shadow-md z-10"
          >
            Launch Phase 10 Genesis AI <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* PHASE 9 GLOBAL FINANCIAL INTELLIGENCE NETWORK LAUNCH BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/40 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
              PHASE 9 — GLOBAL FINANCIAL NETWORK
            </span>
            <span className="text-xs font-mono text-[#00B86B] font-bold">UNIVERSAL INTEROPERABILITY LAYER</span>
          </div>
          <h3 className="text-base font-bold text-[#FFFFFF] font-playfair">
            MEHERAH Global Financial Intelligence Network & Interoperability
          </h3>
          <p className="text-xs text-[#A7A7A7]">
            Connect sovereign mobile money providers, gateways, commercial banks, government tax hubs, and international SWIFT rails into one unified intelligent network while preserving institutional autonomy.
          </p>
        </div>

        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('phase9_network')}
            className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 whitespace-nowrap shadow-md z-10"
          >
            Launch Phase 9 Global Network <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* PHASE 8 COGNITIVE INTELLIGENCE LAUNCH BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-xl">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
              PHASE 8 COGNITIVE LAYER
            </span>
            <span className="text-xs font-mono text-[#00B86B] font-bold">EXPLAINABLE AI & MISSION CONTROL 2.0</span>
          </div>
          <h3 className="text-base font-bold text-[#FFFFFF] font-playfair">
            MEHERAH Cognitive Intelligence & Autonomous Decision Engine
          </h3>
          <p className="text-xs text-[#A7A7A7]">
            Observe real-time provider scanning, AI scoring breakdowns, candidate rejection rationale, and natural language explainable AI decision traces backed by the MEHERAH Constitution.
          </p>
        </div>

        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('cognitive_ai')}
            className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 whitespace-nowrap shadow-md z-10"
          >
            Launch Phase 8 Cognitive Panel <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* CORE GOVERNANCE ENGINE LAUNCH BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-xl">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
              EXECUTABLE PHILOSOPHY KERNEL
            </span>
            <span className="text-xs font-mono text-[#00B86B] font-bold">MEHERAH_PRINCIPLES ENFORCED</span>
          </div>
          <h3 className="text-base font-bold text-[#FFFFFF] font-playfair">
            MEHERAH Core Governance & Decision Engine
          </h3>
          <p className="text-xs text-[#A7A7A7]">
            MEHERAH's 8 core principles (Purpose, Transparency, Service, Intelligence, Reliability, Learning, Integrity, Global) actively govern every routing decision, proving user benefit before profit.
          </p>
        </div>

        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('core_governance')}
            className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 whitespace-nowrap shadow-md z-10"
          >
            Open Core Governance Engine <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. EXECUTIVE COMMAND CENTRE TOP-LEVEL METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'TRANSACTION AVAILABILITY',
            value: '99.98%',
            subtext: '30-Day Availability SLA',
            color: 'text-[#00B86B]',
            icon: ShieldCheck,
            badge: 'SLO PASSED'
          },
          {
            title: 'VOLUME PROCESSED',
            value: 'UGX 4.85B',
            subtext: 'Real-time 24h Clearing Volume',
            color: 'text-[#E8C879]',
            icon: TrendingUp,
            badge: '+22.4% vs 7d'
          },
          {
            title: 'CONNECTED RAILS',
            value: '20 RAILS',
            subtext: 'Mobile Money, ACH, BOU, Escrow',
            color: 'text-[#FFFFFF]',
            icon: Globe,
            badge: 'ALL SYNCED'
          },
          {
            title: 'AI DECISION CONFIDENCE',
            value: '96.0%',
            subtext: 'Gemini Neural Route Optimizer',
            color: 'text-[#C9A227]',
            icon: Cpu,
            badge: 'OPTIMAL'
          }
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-[#C9A227]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#666666] tracking-wider uppercase font-bold">{m.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070707] text-[#E8C879] border border-[#C9A227]/20 font-bold">
                  {m.badge}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className={`text-2xl font-bold font-mono tracking-tight ${m.color}`}>{m.value}</span>
                <Icon className="w-5 h-5 text-[#666666] group-hover:text-[#C9A227] transition-colors" />
              </div>

              <p className="text-[11px] text-[#A7A7A7] font-sans">{m.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* 4. MAIN SPLIT GRID: AI BRAIN & FINANCIAL NETWORK MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (7 COLS): AI BRAIN INTERFACE & DECISION TIMELINE */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* MEHERAH INTELLIGENCE CORE */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C9A227] animate-ping" />
                <h3 className="text-base font-bold font-playfair text-[#FFFFFF] tracking-wide flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#C9A227]" /> MEHERAH INTELLIGENCE CORE
                </h3>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00B86B]/10 text-[#00B86B] border border-[#00B86B]/20 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00B86B]" /> STATUS: ONLINE
              </span>
            </div>

            {/* Current Thinking Banner */}
            <div className="p-4 bg-[#070707] border border-[#C9A227]/25 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-[#E8C879] tracking-wider uppercase font-bold block">
                CURRENT THOUGHT PROCESS:
              </span>
              <p className="text-sm font-mono text-[#FFFFFF] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#C9A227] animate-spin" />
                "{aiThinkingText}"
              </p>
            </div>

            {/* AI Agent Status Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-[#070707] border border-[#222222] rounded-xl">
                <span className="text-[#666666] text-[10px] block font-bold">ACTIVE AGENTS</span>
                <span className="text-base font-bold text-[#FFFFFF]">9 / 9 ONLINE</span>
              </div>
              <div className="p-3.5 bg-[#070707] border border-[#222222] rounded-xl">
                <span className="text-[#666666] text-[10px] block font-bold">LEARNED PATTERNS</span>
                <span className="text-base font-bold text-[#E8C879]">14,532 PATTERNS</span>
              </div>
              <div className="p-3.5 bg-[#070707] border border-[#222222] rounded-xl col-span-2 md:col-span-1">
                <span className="text-[#666666] text-[10px] block font-bold">LATENCY / SPEED</span>
                <span className="text-base font-bold text-[#00B86B]">14ms ROUTE SPEED</span>
              </div>
            </div>
          </div>

          {/* AI DECISION TIMELINE */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <h3 className="text-base font-bold font-playfair text-[#FFFFFF] tracking-wide flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#C9A227]" /> AI DECISION TIMELINE (REAL-TIME STEPS)
              </h3>
              <span className="text-xs font-mono text-[#A7A7A7]">HUMAN-READABLE INTELLIGENCE</span>
            </div>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#222222]">
              {decisionLogs.map((log, i) => (
                <div key={i} className="relative group">
                  <span className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#C9A227] border-2 border-[#111111] group-hover:scale-125 transition-transform" />
                  
                  <div className="p-4 bg-[#070707] border border-[#C9A227]/20 rounded-xl space-y-1 font-mono text-xs hover:border-[#C9A227]/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[#E8C879] font-bold">{log.time} — {log.event}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#111111] text-[#00B86B] border border-[#00B86B]/20 font-bold">
                        {log.status}
                      </span>
                    </div>
                    <p className="text-[#A7A7A7] text-[11px] font-sans">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (5 COLS): FINANCIAL NETWORK GLOBE & AUTONOMOUS TREASURY */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* FINANCIAL NETWORK GLOBE / TOPOLOGY MAP */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <h3 className="text-base font-bold font-playfair text-[#FFFFFF] tracking-wide flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C9A227]" /> FINANCIAL NETWORK TOPOLOGY
              </h3>
              <div className="flex items-center gap-2.5 text-[10px] font-mono">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#C9A227]" /> Optimal</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FFFFFF]" /> Normal</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#C62828]" /> Risk</span>
              </div>
            </div>

            {/* Visual Topology Nodes Container */}
            <div className="h-64 bg-[#070707] border border-[#222222] rounded-xl relative p-4 flex items-center justify-center overflow-hidden">
              {/* Pulsing Core */}
              <div className="absolute w-36 h-36 bg-[#C9A227]/10 rounded-full blur-2xl animate-pulse pointer-events-none" />
              
              {/* SVG Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-[#C9A227]/30 stroke-dasharray-[4]" strokeWidth="1.5">
                <line x1="50%" y1="50%" x2="20%" y2="25%" />
                <line x1="50%" y1="50%" x2="80%" y2="25%" />
                <line x1="50%" y1="50%" x2="20%" y2="75%" />
                <line x1="50%" y1="50%" x2="80%" y2="75%" />
              </svg>

              {/* Center MEHERAH Core Node */}
              <div className="relative z-10 w-22 h-22 rounded-full bg-[#111111] border-2 border-[#C9A227] flex flex-col items-center justify-center text-center shadow-2xl shadow-[#C9A227]/30 p-2">
                <span className="text-[11px] font-mono text-[#E8C879] font-bold">MEHERAH</span>
                <span className="text-[8px] font-mono text-[#A7A7A7]">CORE KERNEL</span>
              </div>

              {/* Node 1: MTN (Gold = Optimal) */}
              <div className="absolute top-4 left-6 p-2.5 bg-[#111111] border border-[#C9A227] rounded-xl flex items-center gap-2 text-[10px] font-mono text-[#E8C879] shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-ping" /> MTN MoMo UG
              </div>

              {/* Node 2: Airtel (White = Normal) */}
              <div className="absolute top-4 right-6 p-2.5 bg-[#111111] border border-[#FFFFFF]/40 rounded-xl flex items-center gap-2 text-[10px] font-mono text-[#FFFFFF] shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#FFFFFF]" /> Airtel Money
              </div>

              {/* Node 3: Stanbic Bank (Gold = Optimal) */}
              <div className="absolute bottom-4 left-6 p-2.5 bg-[#111111] border border-[#C9A227] rounded-xl flex items-center gap-2 text-[10px] font-mono text-[#E8C879] shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" /> Stanbic Escrow
              </div>

              {/* Node 4: Flutterwave (White / Risk Mitigated) */}
              <div className="absolute bottom-4 right-6 p-2.5 bg-[#111111] border border-[#222222] rounded-xl flex items-center gap-2 text-[10px] font-mono text-[#A7A7A7] shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" /> FLW Gateway
              </div>
            </div>
          </div>

          {/* AUTONOMOUS TREASURY PANEL */}
          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <h3 className="text-base font-bold font-playfair text-[#FFFFFF] tracking-wide flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C9A227]" /> LIQUIDITY INTELLIGENCE & RESERVES
              </h3>
              <span className="text-xs font-mono text-[#E8C879] font-bold">AUTOMATED SWEEPS</span>
            </div>

            {/* Pool Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#FFFFFF] font-bold">MTN Primary Settlement Pool</span>
                <span className="text-[#E8C879] font-bold">82% Capacity (UGX 1.85B)</span>
              </div>
              <div className="w-full h-3 bg-[#070707] rounded-full overflow-hidden border border-[#222222] p-0.5">
                <div className="h-full bg-gradient-to-r from-[#C9A227] to-[#E8C879] rounded-full w-[82%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#666666]">
                <span>Forecast: 6 hours remaining before peak</span>
                <span>Target: UGX 2.40B</span>
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="p-4 bg-[#070707] border border-[#C9A227]/25 rounded-xl space-y-3 font-mono text-xs">
              <span className="text-[10px] text-[#E8C879] font-bold uppercase block">AI LIQUIDITY RECOMMENDATION:</span>
              <p className="text-[#A7A7A7]">
                "Increase reserve allocation by UGX 550,000,000 from Stanbic Escrow before evening payroll peak (5:00 PM)."
              </p>

              <button 
                onClick={() => alert("Liquidity Sweep Executed! UGX 550M allocated to MTN Pool.")}
                className="w-full py-2.5 rounded-lg bg-[#C9A227] text-[#070707] font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/15"
              >
                <Zap className="w-3.5 h-3.5" /> Execute Recommended Reserve Sweep
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 5. INSTITUTIONAL COMPLIANCE & GOVERNANCE VIEW */}
      {isInstitutionalMode && (
        <div className="space-y-4">
          {/* INSTITUTIONAL ADOPTION ENGINE LAUNCH BANNER */}
          <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C9A227]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                NEW MILESTONE: INSTITUTIONAL ADOPTION ENGINE
              </span>
              <h3 className="text-xl font-bold font-playfair text-[#FFFFFF]">MEHERAH — Moving From Proof to Global Institutional Connection</h3>
              <p className="text-xs text-[#A7A7A7]">Partner Onboarding • "MEHERAH Connected" Accreditation Standard • Growth Telemetry • Central Bank Regulatory Package</p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('institutional_adoption')}
                className="px-5 py-3 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#C9A227]/30 relative z-10"
              >
                <Building2 className="w-4 h-4 text-[#070707]" />
                Launch Institutional Adoption Engine <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* INSTITUTIONAL REALITY PROOF LAUNCH BANNER */}
          <div className="bg-[#111111] border border-[#C9A227] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C9A227]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                INSTITUTIONAL REALITY PROOF
              </span>
              <h3 className="text-xl font-bold font-playfair text-[#FFFFFF]">MEHERAH — Institutional Reality & Adoption Milestone</h3>
              <p className="text-xs text-[#A7A7A7]">End-to-End Live Demo • Real Sandbox Validation • Trust Report • First Pilot Partner • Developer Gateway</p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('institutional_reality')}
                className="px-5 py-3 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#C9A227]/30 relative z-10"
              >
                <Building2 className="w-4 h-4 text-[#070707]" />
                Launch Institutional Reality Proof <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 4 MATURITY STAGES LAUNCH BANNER */}
          <div className="bg-[#111111] border border-[#C9A227]/60 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                EVOLUTIONARY MATURITY
              </span>
              <h3 className="text-lg font-bold font-playfair text-[#FFFFFF]">MEHERAH — The 4 Evolutionary Maturity Stages</h3>
              <p className="text-xs text-[#A7A7A7]">Moving beyond building into Verification, Production Deployment, Institutional Adoption, and Autonomous Evolution.</p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('maturity_stages')}
                className="px-5 py-2.5 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#C9A227]/20 relative z-10"
              >
                <CheckCircle2 className="w-4 h-4 text-[#070707]" />
                Launch 4 Maturity Stages <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* TRUST INTELLIGENCE ERA LAUNCH BANNER */}
          <div className="bg-[#111111] border border-[#C9A227]/50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                GLOBAL CIVILIZATION ERA
              </span>
              <h3 className="text-lg font-bold font-playfair text-[#FFFFFF]">MEHERAH — The Trust Intelligence Era</h3>
              <p className="text-xs text-[#A7A7A7]">Demonstrating trust continuously at global scale: Living Observatory, Evidence Reputation, Financial Intelligence Map, Academy & Autonomous Loop.</p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('trust_intelligence_era')}
                className="px-5 py-2.5 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#C9A227]/20 relative z-10"
              >
                <Award className="w-4 h-4 text-[#070707]" />
                Explore Trust Intelligence Era <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* PROOF OF TRUST QUICK LAUNCH BANNER */}
          <div className="bg-[#111111] border border-[#C9A227]/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                FEATURED ENGINE
              </span>
              <h3 className="text-lg font-bold font-playfair text-[#FFFFFF]">MEHERAH Proof of Trust Engine & Framework</h3>
              <p className="text-xs text-[#A7A7A7]">Continuous proof metrics across Reliability, Transparency, Security, Governance, Intelligence, Accountability, and Progressive Scale.</p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('proof_of_trust')}
                className="px-5 py-2.5 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#C9A227]/20"
              >
                <ShieldCheck className="w-4 h-4 text-[#070707]" />
                Launch Proof of Trust Engine <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="bg-[#111111] border border-[#C9A227]/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <h3 className="text-base font-bold font-playfair text-[#FFFFFF] tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" /> INSTITUTIONAL GOVERNANCE, AUDIT & COMPLIANCE
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#070707] text-[#E8C879] border border-[#C9A227]/25 font-bold">
              BANK OF UGANDA & FIA AUDIT READY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
              <span className="text-[#666666] text-[10px] font-bold">AML / SANCTION MATRIX</span>
              <p className="text-[#FFFFFF] font-bold">100% Cleared (0 False Positives)</p>
            </div>
            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
              <span className="text-[#666666] text-[10px] font-bold">3-WAY RECONCILIATION</span>
              <p className="text-[#00B86B] font-bold">Zero Imbalance Verified</p>
            </div>
            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
              <span className="text-[#666666] text-[10px] font-bold">CRYPTOGRAPHIC JOURNAL</span>
              <p className="text-[#E8C879] font-bold">Hash #1894210 Verified</p>
            </div>
            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
              <span className="text-[#666666] text-[10px] font-bold">PROVIDER SLA TRACKING</span>
              <p className="text-[#FFFFFF] font-bold">100% SLA Adherence</p>
            </div>
          </div>
        </div>
      </div>
    )}

  </div>
);
}
