import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Globe, 
  Network, 
  Cpu, 
  Lock, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  RotateCcw, 
  Sliders, 
  Activity, 
  Scale, 
  Landmark, 
  Building2, 
  Compass, 
  Shield, 
  Zap, 
  Search,
  Maximize2,
  Minimize2,
  FileText
} from 'lucide-react';

interface ExecutivePresentationProps {
  onExplorePlatform?: () => void;
}

export function MeherahExecutivePresentationView({ onExplorePlatform }: ExecutivePresentationProps) {
  // Current screen step: 0 to 7
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [selectedTrustCard, setSelectedTrustCard] = useState<number | null>(null);

  // Screen 4 Demo State
  const [demoState, setDemoState] = useState<'idle' | 'typing' | 'running' | 'completed'>('idle');
  const [typedText, setTypedText] = useState<string>('');
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);

  // Fullscreen / Presenter controls
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const targetDemoInput = "Send UGX 500,000 to my supplier in Nairobi.";

  // Keyboard navigation listener (Left / Right / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        if (currentScreen < 7) {
          setCurrentScreen(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentScreen > 0) {
          setCurrentScreen(prev => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen]);

  // Handle typing animation on Screen 4
  useEffect(() => {
    if (currentScreen === 4 && demoState === 'idle') {
      setDemoState('typing');
      setTypedText('');
      setActiveDemoStep(0);
      let index = 0;
      const interval = setInterval(() => {
        if (index < targetDemoInput.length) {
          setTypedText(targetDemoInput.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            runDemoExecution();
          }, 600);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const runDemoExecution = () => {
    setDemoState('running');
    setActiveDemoStep(1);

    const stepIntervals = [
      setTimeout(() => setActiveDemoStep(2), 1000),
      setTimeout(() => setActiveDemoStep(3), 2000),
      setTimeout(() => setActiveDemoStep(4), 3000),
      setTimeout(() => setActiveDemoStep(5), 4200),
      setTimeout(() => setDemoState('completed'), 5200)
    ];

    return () => stepIntervals.forEach(clearTimeout);
  };

  const resetDemo = () => {
    setDemoState('idle');
    setTypedText('');
    setActiveDemoStep(0);
    setTimeout(() => {
      setDemoState('typing');
      let index = 0;
      const interval = setInterval(() => {
        if (index < targetDemoInput.length) {
          setTypedText(targetDemoInput.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            runDemoExecution();
          }, 600);
        }
      }, 40);
    }, 100);
  };

  const screensInfo = [
    { title: "Opening", subtitle: "National Executive Introduction" },
    { title: "Uganda's Journey", subtitle: "Financial Inclusion Roadmap 2028-2040" },
    { title: "Where MEHERAH Fits", subtitle: "Platform Definition & Sovereignty" },
    { title: "Ecosystem Problem", subtitle: "Fragmentation vs Intelligence Coordination" },
    { title: "Live Demonstration", subtitle: "Intent-Based Routing Sequence" },
    { title: "Institutional Intelligence", subtitle: "Core Executive Operating Panels" },
    { title: "Institutional Trust", subtitle: "6 Pillars of Sovereign Security" },
    { title: "Vision & Next Steps", subtitle: "Bank of Uganda & NPS Alignment" }
  ];

  return (
    <div className={`relative w-full min-h-screen bg-[#080808] text-[#FFFFFF] font-sans overflow-hidden flex flex-col justify-between selection:bg-[#C8A64D] selection:text-[#080808] ${isFullScreen ? 'p-4 md:p-10' : 'p-4 md:p-8'}`}>
      
      {/* AMBIENT SOFT GOLD HALO BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A64D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#E5C76B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#C8A64D]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP EXECUTIVE PRESENTATION NAVIGATION BAR */}
      <header className="relative z-30 flex items-center justify-between border-b border-[#C8A64D]/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E5C76B] via-[#C8A64D] to-[#8A6D1B] p-0.5 shadow-[0_0_20px_rgba(200,166,77,0.3)]">
            <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center font-bold text-sm text-[#C8A64D] font-serif">M</div>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C8A64D] uppercase font-bold block">
              BANK OF UGANDA • NATIONAL PAYMENT SYSTEMS EDITION
            </span>
            <h1 className="text-sm font-bold tracking-tight text-[#FFFFFF] font-serif">
              MEHERAH Executive Presentation
            </h1>
          </div>
        </div>

        {/* SCREEN STEPS BREADCRUMB INDICATORS */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#111111] border border-[#C8A64D]/20 p-1.5 rounded-full">
          {screensInfo.map((screen, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentScreen(idx)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all flex items-center gap-1.5 ${
                currentScreen === idx
                  ? 'bg-[#C8A64D] text-[#080808] font-bold shadow-[0_0_12px_rgba(200,166,77,0.4)]'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#1A1A1A]'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="hidden xl:inline">{screen.title}</span>
            </button>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-xl bg-[#111111] border border-[#C8A64D]/30 text-[#C8A64D] hover:bg-[#1A1A1A] transition-all text-xs font-mono flex items-center gap-1.5"
            title="Toggle Focus Mode"
          >
            {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span className="hidden sm:inline">{isFullScreen ? 'Normal' : 'Focus'}</span>
          </button>

          {onExplorePlatform && (
            <button
              onClick={onExplorePlatform}
              className="px-3.5 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#C8A64D]/40 text-[#C8A64D] hover:text-[#E5C76B] transition-all text-xs font-mono font-bold flex items-center gap-2 shadow-md"
            >
              <span>Explore Platform</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </header>

      {/* SCREEN CONTAINER (ANIMATED TRANSITION) */}
      <main className="relative z-20 flex-1 flex flex-col justify-center items-center my-auto min-h-[520px] max-w-6xl w-full mx-auto">
        <AnimatePresence mode="wait">

          {/* SCREEN 0: OPENING EXPERIENCE */}
          {currentScreen === 0 && (
            <motion.div
              key="screen-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8 max-w-3xl py-12"
            >
              {/* EMBLEM WITH ROTATING HALO */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-[#C8A64D]/40 shadow-[0_0_50px_rgba(200,166,77,0.2)]"
                />
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#E5C76B] via-[#C8A64D] to-[#8A6D1B] p-1 shadow-[0_0_40px_rgba(200,166,77,0.35)]">
                  <div className="w-full h-full bg-[#080808] rounded-[14px] flex items-center justify-center">
                    <span className="text-5xl font-bold font-serif text-[#C8A64D] tracking-tighter">M</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl md:text-6xl font-bold font-serif tracking-tight text-[#FFFFFF]"
                >
                  MEHERAH
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg md:text-xl text-[#E5C76B] font-serif italic"
                >
                  Financial Intelligence for Nations, Institutions & People
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#111111] border border-[#C8A64D]/30 text-xs font-mono text-[#A7A7A7] tracking-wider uppercase">
                  Designed in Uganda. Built for Financial Trust.
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setCurrentScreen(1)}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C8A64D] to-[#E5C76B] text-[#080808] text-sm font-bold font-mono tracking-wider uppercase hover:shadow-[0_0_30px_rgba(200,166,77,0.6)] transition-all flex items-center gap-3 mx-auto group"
                  >
                    <span>BEGIN PRESENTATION</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* SCREEN 1: UGANDA'S FINANCIAL JOURNEY */}
          {currentScreen === 1 && (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#C8A64D] uppercase bg-[#111111] border border-[#C8A64D]/30 px-3 py-1 rounded-full">
                  SCREEN ONE — NATIONAL TIMELINE
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#FFFFFF]">
                  Uganda's Financial Journey
                </h2>
                <p className="text-xs font-mono text-[#A7A7A7]">
                  The Strategic Roadmap for National Financial Transformation
                </p>
              </div>

              {/* TIMELINE & MAP GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
                
                {/* TIMELINE CARDS (LEFT) */}
                <div className="lg:col-span-6 space-y-4">
                  {[
                    {
                      year: "2028",
                      badge: "TARGET: 75% INCLUSION",
                      title: "Formal Financial Inclusion Expansion",
                      desc: "Expanding access to regulated financial services across all districts, connecting last-mile communities."
                    },
                    {
                      year: "2030",
                      badge: "TARGET: OVER 85% INCLUSION",
                      title: "Digital Financial Services Dominance",
                      desc: "Reducing financial exclusion dramatically through interoperable mobile money and banking infrastructure."
                    },
                    {
                      year: "2040",
                      badge: "VISION 2040 TRANSFORMATION",
                      title: "Sovereign Financial Architecture",
                      desc: "A stronger, resilient, and inclusive financial system supporting Uganda's long-term economic prosperity."
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.2, duration: 0.6 }}
                      className="p-5 bg-[#111111] border border-[#C8A64D]/25 rounded-2xl space-y-2 hover:border-[#C8A64D]/60 transition-all relative overflow-hidden group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold font-serif text-[#C8A64D]">{item.year}</span>
                        <span className="text-[10px] font-mono font-bold bg-[#C8A64D]/15 text-[#E5C76B] border border-[#C8A64D]/40 px-2.5 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-serif text-[#FFFFFF]">{item.title}</h3>
                      <p className="text-xs text-[#A7A7A7] leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* ILLUMINATED MAP OF UGANDA NODES (RIGHT) */}
                <div className="lg:col-span-6 bg-[#0B0B0B] border border-[#C8A64D]/30 rounded-3xl p-6 relative flex flex-col justify-between h-full min-h-[340px] shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A64D]/5 to-transparent rounded-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3 z-10">
                    <span className="text-xs font-mono font-bold text-[#E5C76B] flex items-center gap-2">
                      <Globe size={16} className="text-[#C8A64D]" /> UGANDA FINANCIAL NODE MESH
                    </span>
                    <span className="text-[10px] font-mono text-[#00B86B] font-bold">100% REGIONAL SYNC</span>
                  </div>

                  {/* MAP NODE GRAPHIC */}
                  <div className="relative my-6 h-48 w-full bg-[#080808] rounded-2xl border border-[#222222] p-4 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C8A64D_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* NODES */}
                    {[
                      { name: "Kampala (BOU)", top: "45%", left: "52%", core: true },
                      { name: "Entebbe", top: "58%", left: "50%" },
                      { name: "Jinja", top: "48%", left: "65%" },
                      { name: "Gulu", top: "22%", left: "48%" },
                      { name: "Mbarara", top: "68%", left: "32%" },
                      { name: "Mbale", top: "40%", left: "75%" },
                      { name: "Arua", top: "18%", left: "28%" },
                      { name: "Fort Portal", top: "48%", left: "25%" }
                    ].map((node, nIdx) => (
                      <div key={nIdx} className="absolute flex items-center gap-1.5" style={{ top: node.top, left: node.left }}>
                        <div className={`rounded-full ${node.core ? 'w-3 h-3 bg-[#E5C76B] shadow-[0_0_12px_#E5C76B] animate-pulse' : 'w-2 h-2 bg-[#C8A64D]'}`} />
                        <span className={`text-[9px] font-mono ${node.core ? 'text-[#E5C76B] font-bold' : 'text-[#A7A7A7]'}`}>{node.name}</span>
                      </div>
                    ))}

                    {/* CONNECTING PULSE LINES */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 stroke-[#C8A64D]" strokeWidth="1" strokeDasharray="3 3">
                      <line x1="52%" y1="45%" x2="50%" y2="58%" />
                      <line x1="52%" y1="45%" x2="65%" y2="48%" />
                      <line x1="52%" y1="45%" x2="48%" y2="22%" />
                      <line x1="52%" y1="45%" x2="32%" y2="68%" />
                      <line x1="52%" y1="45%" x2="75%" y2="40%" />
                      <line x1="52%" y1="45%" x2="25%" y2="48%" />
                    </svg>
                  </div>

                  {/* KEY TAKEAWAY STATEMENT */}
                  <div className="p-3 bg-[#111111] border border-[#C8A64D]/40 rounded-xl text-center z-10">
                    <p className="text-xs font-serif text-[#E5C76B] italic font-semibold">
                      "Every national vision requires enabling technology."
                    </p>
                  </div>
                </div>

              </div>

              {/* ACTION FOOTER */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setCurrentScreen(2)}
                  className="px-6 py-3 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Screen Two</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: WHERE DOES MEHERAH FIT? */}
          {currentScreen === 2 && (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#C8A64D] uppercase bg-[#111111] border border-[#C8A64D]/30 px-3 py-1 rounded-full">
                  SCREEN TWO — POSITIONING & SOVEREIGNTY
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#FFFFFF]">
                  Where Does MEHERAH Fit?
                </h2>
                <p className="text-xs font-mono text-[#A7A7A7]">
                  Clarifying MEHERAH's Unique Identity in the Financial Ecosystem
                </p>
              </div>

              {/* WHAT MEHERAH IS NOT vs WHAT MEHERAH IS */}
              <div className="space-y-6 max-w-4xl mx-auto">
                
                {/* NOT STATEMENTS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "MEHERAH is NOT another bank.",
                    "MEHERAH is NOT another mobile wallet.",
                    "MEHERAH is NOT another payment gateway."
                  ].map((statement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
                      className="p-4 bg-[#111111] border border-[#333333] rounded-2xl text-center space-y-1 relative"
                    >
                      <span className="text-xs font-mono text-[#888888] line-through block font-medium">
                        {statement}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* WHAT MEHERAH IS (HERO CARD) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  className="p-6 md:p-8 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-2 border-[#C8A64D] rounded-3xl space-y-6 text-center shadow-[0_0_40px_rgba(200,166,77,0.15)] relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#080808] bg-[#C8A64D] px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                      THE DEFINITION
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#FFFFFF] leading-snug">
                      MEHERAH is an AI-powered financial intelligence and coordination platform.
                    </h3>
                  </div>

                  {/* PURPOSE PILLARS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left pt-2 font-sans text-xs">
                    {[
                      "Help financial institutions work together more intelligently.",
                      "Improve interoperability across banks & mobile operators.",
                      "Improve real-time payment visibility and monitoring.",
                      "Improve routing intelligence & liquidity efficiency.",
                      "Support transparent, automated reconciliation.",
                      "Respect institutional sovereignty and policy mandates."
                    ].map((pillar, pIdx) => (
                      <div key={pIdx} className="p-3 bg-[#080808] border border-[#C8A64D]/25 rounded-xl flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-[#C8A64D] shrink-0 mt-0.5" />
                        <span className="text-[#D1D1D1] font-medium leading-relaxed">{pillar}</span>
                      </div>
                    ))}
                  </div>

                  {/* SOVEREIGNTY STATEMENT */}
                  <div className="pt-2 border-t border-[#C8A64D]/20">
                    <p className="text-base font-serif italic text-[#E5C76B] font-bold">
                      "Connected does not mean controlled."
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* ACTION FOOTER */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setCurrentScreen(3)}
                  className="px-6 py-3 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Screen Three</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: THE PROBLEM & THE SOLUTION */}
          {currentScreen === 3 && (
            <motion.div
              key="screen-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#C8A64D] uppercase bg-[#111111] border border-[#C8A64D]/30 px-3 py-1 rounded-full">
                  SCREEN THREE — ARCHITECTURAL ARCHETYPE
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#FFFFFF]">
                  The Challenge vs The Coordination Layer
                </h2>
                <p className="text-xs font-mono text-[#A7A7A7]">
                  From Fragmented Ecosystem Silos to Golden Intelligence Coordination
                </p>
              </div>

              {/* VISUAL DIAGRAM: FRAGMENTED vs COORDINATED */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                
                {/* TODAY'S FRAGMENTED ECOSYSTEM */}
                <div className="p-6 bg-[#0E0E0E] border border-red-900/30 rounded-3xl space-y-4 relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-red-900/20 pb-3">
                    <span className="text-xs font-mono font-bold text-red-400 uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> FRAGMENTED TODAY
                    </span>
                    <span className="text-[10px] font-mono text-[#777777]">SILOED ECOSYSTEM</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-4">
                    {[
                      { label: "Commercial Banks", sub: "Core Banking Systems" },
                      { label: "Mobile Money", sub: "MTN & Airtel Rails" },
                      { label: "Payment Gateways", sub: "Card & API Vendors" },
                      { label: "Businesses", sub: "ERP & POS Interfaces" },
                      { label: "Government Systems", sub: "URA & Treasury Rails" },
                      { label: "Citizens", sub: "Unbanked & Rural Users" }
                    ].map((node, idx) => (
                      <div key={idx} className="p-3 bg-[#141414] border border-red-900/20 rounded-xl text-center space-y-1">
                        <span className="text-[11px] font-bold text-[#E0E0E0] block font-sans">{node.label}</span>
                        <span className="text-[9px] text-red-400/80 font-mono block">{node.sub}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-red-950/30 border border-red-900/30 rounded-xl text-center space-y-1">
                    <span className="text-xs font-mono font-bold text-red-400 block">Siloed Bottlenecks:</span>
                    <p className="text-[11px] text-red-300/70 font-sans">
                      Timeouts • Incompatible Formats • Manual Reconciliations • High Intermediary Fees
                    </p>
                  </div>
                </div>

                {/* MEHERAH INTELLIGENCE COORDINATION LAYER */}
                <div className="p-6 bg-[#0E0E0E] border-2 border-[#C8A64D] rounded-3xl space-y-4 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(200,166,77,0.1)]">
                  <div className="flex items-center justify-between border-b border-[#C8A64D]/20 pb-3">
                    <span className="text-xs font-mono font-bold text-[#E5C76B] uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" /> MEHERAH INTELLIGENCE LAYER
                    </span>
                    <span className="text-[10px] font-mono text-[#C8A64D] font-bold">SOVEREIGN COORDINATION</span>
                  </div>

                  {/* CENTER KERNEL VISUAL */}
                  <div className="p-5 bg-gradient-to-b from-[#161616] to-[#0A0A0A] border border-[#C8A64D]/40 rounded-2xl text-center space-y-2 relative my-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5C76B] to-[#C8A64D] p-0.5 mx-auto shadow-[0_0_15px_rgba(200,166,77,0.4)]">
                      <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center font-bold text-sm text-[#C8A64D] font-serif">M</div>
                    </div>
                    <h4 className="text-sm font-bold font-serif text-[#FFFFFF]">MEHERAH Intelligence Mesh</h4>
                    <p className="text-[11px] text-[#A7A7A7] font-sans">
                      Policy-aware routing, ISO 20022 alignment, and real-time cross-network visibility.
                    </p>
                  </div>

                  <div className="p-3 bg-[#C8A64D]/10 border border-[#C8A64D]/40 rounded-xl text-center space-y-1">
                    <p className="text-xs font-serif text-[#FFFFFF] font-bold">
                      "MEHERAH coordinates intelligence across existing financial systems."
                    </p>
                    <p className="text-[11px] font-mono text-[#E5C76B] font-bold">
                      Not replacing them. Connecting them.
                    </p>
                  </div>
                </div>

              </div>

              {/* ACTION FOOTER */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setCurrentScreen(4)}
                  className="px-6 py-3 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Live Demonstration</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: LIVE DEMONSTRATION */}
          {currentScreen === 4 && (
            <motion.div
              key="screen-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-6"
            >
              <div className="text-center space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#C8A64D] uppercase bg-[#111111] border border-[#C8A64D]/30 px-3 py-1 rounded-full">
                  SCREEN FOUR — LIVE DEMONSTRATION
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#FFFFFF]">
                  Intent-Based Financial Intelligence
                </h2>
                <p className="text-xs font-mono text-[#A7A7A7]">
                  Natural Language Intent to Policy-Optimized Cross-Border Routing
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* INPUT BOX */}
                <div className="p-6 bg-[#111111] border-2 border-[#C8A64D] rounded-3xl space-y-4 shadow-[0_0_30px_rgba(200,166,77,0.15)] relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#A7A7A7] uppercase font-bold flex items-center gap-2">
                      <Sparkles size={14} className="text-[#C8A64D]" /> INTENT INPUT INTERFACE
                    </span>
                    <button
                      onClick={resetDemo}
                      className="text-[10px] font-mono text-[#C8A64D] hover:underline flex items-center gap-1"
                    >
                      <RotateCcw size={12} /> Re-Run Demo
                    </button>
                  </div>

                  <div className="bg-[#080808] border border-[#C8A64D]/40 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-base font-mono text-[#FFFFFF] font-bold tracking-wide">
                      {typedText}
                      {demoState === 'typing' && <span className="animate-pulse text-[#C8A64D]">|</span>}
                    </span>
                    <span className="text-xs font-mono text-[#00B86B] bg-[#00B86B]/10 border border-[#00B86B]/30 px-2.5 py-1 rounded-md font-bold">
                      PARSED
                    </span>
                  </div>
                </div>

                {/* CINEMATIC AI SEQUENCE STEPS */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {[
                    { step: 1, title: "1. Understanding Intention", desc: "NLP Intent Extraction" },
                    { step: 2, title: "2. Checking Networks", desc: "MTN, Airtel & BOU Rails" },
                    { step: 3, title: "3. Evaluating Routes", desc: "Slippage & Cost Models" },
                    { step: 4, title: "4. Selecting Route", desc: "Policy-Aware Optimization" },
                    { step: 5, title: "5. Audit & Proof", desc: "ISO 20022 Audit Hash" }
                  ].map((s) => {
                    const isActive = activeDemoStep === s.step;
                    const isDone = activeDemoStep > s.step || demoState === 'completed';
                    return (
                      <div
                        key={s.step}
                        className={`p-3 rounded-xl border text-left font-mono transition-all ${
                          isActive
                            ? 'bg-[#C8A64D] text-[#080808] border-[#C8A64D] font-bold shadow-lg scale-105'
                            : isDone
                            ? 'bg-[#111111] text-[#00B86B] border-[#00B86B]/40'
                            : 'bg-[#080808] text-[#666666] border-[#222222]'
                        }`}
                      >
                        <span className="text-[9px] uppercase block font-bold">
                          {isDone ? '✔ DONE' : isActive ? '● EXECUTING' : 'WAITING'}
                        </span>
                        <span className="text-[11px] font-sans font-bold block truncate mt-0.5">{s.title}</span>
                      </div>
                    );
                  })}
                </div>

                {/* FINAL RESULT CARD */}
                {demoState === 'completed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 bg-[#0E0E0E] border-2 border-[#00B86B] rounded-3xl space-y-4 shadow-[0_0_30px_rgba(0,184,107,0.15)]"
                  >
                    <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                      <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/10 border border-[#00B86B]/30 px-3 py-1 rounded-full uppercase">
                        OPTIMAL ROUTE RECOMMENDATION GENERATED
                      </span>
                      <span className="text-xs font-mono text-[#A7A7A7]">LATENCY: 1.4s</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      <div className="p-3.5 bg-[#141414] border border-[#222222] rounded-xl space-y-1">
                        <span className="text-[10px] text-[#A7A7A7] uppercase block">RECOMMENDED ROUTE</span>
                        <strong className="text-sm text-[#FFFFFF] font-sans block font-bold">
                          BOU ISO 20022 RTGS → Kenya ACH Rail
                        </strong>
                      </div>
                      <div className="p-3.5 bg-[#141414] border border-[#222222] rounded-xl space-y-1">
                        <span className="text-[10px] text-[#A7A7A7] uppercase block">ESTIMATED COST</span>
                        <strong className="text-sm text-[#00B86B] font-bold block">
                          UGX 1,850 <span className="text-[10px] text-[#A7A7A7] font-normal">(Saved 68% vs SWIFT)</span>
                        </strong>
                      </div>
                      <div className="p-3.5 bg-[#141414] border border-[#222222] rounded-xl space-y-1">
                        <span className="text-[10px] text-[#A7A7A7] uppercase block">ESTIMATED TIME</span>
                        <strong className="text-sm text-[#C8A64D] font-bold block">
                          1.4 Seconds
                        </strong>
                      </div>
                    </div>

                    <div className="p-3 bg-[#111111] border border-[#C8A64D]/30 rounded-xl font-sans text-xs space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#C8A64D] uppercase block">REASON FOR SELECTION</span>
                      <p className="text-[#D1D1D1]">
                        Direct Bank of Uganda RTGS ISO 20022 liquidity tunnel active with zero intermediary holding delay and lowest FX slippage margin.
                      </p>
                    </div>

                    <p className="text-[10px] font-mono text-[#777777] text-center pt-1 italic">
                      "This recommendation is based on available network conditions and policy-aware routing logic."
                    </p>
                  </motion.div>
                )}

              </div>

              {/* ACTION FOOTER */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setCurrentScreen(5)}
                  className="px-6 py-3 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Screen Five</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: INSTITUTIONAL INTELLIGENCE */}
          {currentScreen === 5 && (
            <motion.div
              key="screen-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-6"
            >
              <div className="text-center space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#C8A64D] uppercase bg-[#111111] border border-[#C8A64D]/30 px-3 py-1 rounded-full">
                  SCREEN FIVE — EXECUTIVE DASHBOARD
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#FFFFFF]">
                  Institutional Intelligence
                </h2>
                <p className="text-xs font-mono text-[#A7A7A7]">
                  High-Level Coordination & Telemetry for Regulators and Central Banks
                </p>
              </div>

              {/* 4 ELEGANT PANELS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-2">
                
                {/* PANEL 1: NETWORK HEALTH */}
                <div className="p-6 bg-[#111111] border border-[#C8A64D]/30 rounded-3xl space-y-4 hover:border-[#C8A64D]/60 transition-all">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-xs font-mono font-bold text-[#FFFFFF] flex items-center gap-2">
                      <Activity size={16} className="text-[#00B86B]" /> 1. NETWORK HEALTH
                    </span>
                    <span className="text-[10px] font-mono text-[#00B86B] font-bold">99.999% OPERATIONAL</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#080808] rounded-xl border border-[#222222]">
                      <span className="text-[10px] text-[#A7A7A7] block">System Latency:</span>
                      <strong className="text-base text-[#00B86B] font-bold">14 ms</strong>
                    </div>
                    <div className="p-3 bg-[#080808] rounded-xl border border-[#222222]">
                      <span className="text-[10px] text-[#A7A7A7] block">Connected Nodes:</span>
                      <strong className="text-base text-[#C8A64D] font-bold">14 Gateways</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#A7A7A7]">
                    Continuous real-time mesh monitoring across all commercial bank, mobile money, and central clearing endpoints with automated zero-split failover.
                  </p>
                </div>

                {/* PANEL 2: REGIONAL PAYMENT CORRIDORS */}
                <div className="p-6 bg-[#111111] border border-[#C8A64D]/30 rounded-3xl space-y-4 hover:border-[#C8A64D]/60 transition-all">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-xs font-mono font-bold text-[#FFFFFF] flex items-center gap-2">
                      <Globe size={16} className="text-[#C8A64D]" /> 2. REGIONAL PAYMENT CORRIDORS
                    </span>
                    <span className="text-[10px] font-mono text-[#E5C76B] font-bold">EAST AFRICA MESH</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-[#080808] rounded-xl border border-[#222222] flex justify-between items-center">
                      <span>Uganda ↔ Kenya Corridor</span>
                      <strong className="text-[#00B86B]">ACTIVE (&lt;1.8s)</strong>
                    </div>
                    <div className="p-2.5 bg-[#080808] rounded-xl border border-[#222222] flex justify-between items-center">
                      <span>Uganda ↔ Tanzania Corridor</span>
                      <strong className="text-[#00B86B]">ACTIVE (&lt;2.1s)</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#A7A7A7]">
                    Optimized cross-border liquidity rails enabling instant trade settlement without pre-funded capital lockups.
                  </p>
                </div>

                {/* PANEL 3: LIQUIDITY INTELLIGENCE */}
                <div className="p-6 bg-[#111111] border border-[#C8A64D]/30 rounded-3xl space-y-4 hover:border-[#C8A64D]/60 transition-all">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-xs font-mono font-bold text-[#FFFFFF] flex items-center gap-2">
                      <Landmark size={16} className="text-[#E5C76B]" /> 3. LIQUIDITY INTELLIGENCE
                    </span>
                    <span className="text-[10px] font-mono text-[#00B86B] font-bold">NET SETTLEMENT OPTIMUM</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#080808] rounded-xl border border-[#222222]">
                      <span className="text-[10px] text-[#A7A7A7] block">Settlement Efficiency:</span>
                      <strong className="text-base text-[#E5C76B] font-bold">99.8%</strong>
                    </div>
                    <div className="p-3 bg-[#080808] rounded-xl border border-[#222222]">
                      <span className="text-[10px] text-[#A7A7A7] block">FX Slippage Guardrail:</span>
                      <strong className="text-base text-[#00B86B] font-bold">&lt; 0.02%</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#A7A7A7]">
                    Predictive liquidity balancing prevents market congestion and reduces central bank settlement buffers.
                  </p>
                </div>

                {/* PANEL 4: AI DECISION EXPLAINABILITY */}
                <div className="p-6 bg-[#111111] border border-[#C8A64D]/30 rounded-3xl space-y-4 hover:border-[#C8A64D]/60 transition-all">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-xs font-mono font-bold text-[#FFFFFF] flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#00B86B]" /> 4. AI DECISION EXPLAINABILITY
                    </span>
                    <span className="text-[10px] font-mono text-[#00B86B] font-bold">100% POLICY-CHECKED</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-[#080808] rounded-xl border border-[#222222] flex justify-between items-center">
                      <span>Deterministic Rule Engine</span>
                      <strong className="text-[#00B86B]">100% VERIFIED</strong>
                    </div>
                    <div className="p-2.5 bg-[#080808] rounded-xl border border-[#222222] flex justify-between items-center">
                      <span>Black-Box Exclusions</span>
                      <strong className="text-[#C8A64D]">STRICT ZERO</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#A7A7A7]">
                    Every AI routing decision produces a human-readable mathematical justification aligned with Central Bank mandates.
                  </p>
                </div>

              </div>

              {/* ACTION FOOTER */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setCurrentScreen(6)}
                  className="px-6 py-3 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Institutional Trust</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 6: WHY INSTITUTIONS CAN TRUST MEHERAH */}
          {currentScreen === 6 && (
            <motion.div
              key="screen-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-6"
            >
              <div className="text-center space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#C8A64D] uppercase bg-[#111111] border border-[#C8A64D]/30 px-3 py-1 rounded-full">
                  SCREEN SIX — REGULATORY HARDENING
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#FFFFFF]">
                  Why Institutions Can Trust MEHERAH
                </h2>
                <p className="text-xs font-mono text-[#A7A7A7]">
                  6 Sovereign Pillars Designed for Central Banks & Regulators
                </p>
              </div>

              {/* 6 PREMIUM TRUST CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto pt-2">
                {[
                  {
                    title: "Non-Custodial Architecture",
                    icon: Lock,
                    summary: "MEHERAH never holds institutional or citizen funds; it acts strictly as an intelligent routing and coordination protocol.",
                    details: "Funds remain safely inside licensed commercial bank accounts or Central Bank RTGS reserves at all times. MEHERAH only coordinates messaging and authorization intent."
                  },
                  {
                    title: "Interoperability Focus",
                    icon: Network,
                    summary: "Built natively on ISO 20022, OpenAPI v3, and REST/gRPC standards, seamlessly bridging mobile money and core banking.",
                    details: "Eliminates custom integration friction by providing universal adapters for legacy core banking systems and modern fintech APIs."
                  },
                  {
                    title: "AI Explainability",
                    icon: Cpu,
                    summary: "Every routing recommendation and decision is accompanied by a human-readable, policy-checked audit trail.",
                    details: "Zero black-box AI logic. Every recommendation can be inspected, audited, and mathematically verified by regulators."
                  },
                  {
                    title: "Cryptographic Audit Trail",
                    icon: FileText,
                    summary: "Immutable cryptographic hashes seal every transaction intent, reconciliation event, and system state change.",
                    details: "Utilizes FIPS 140-2 Level 3 HSM key vaulting and SHA-256 cryptographic lineage for total regulatory accountability."
                  },
                  {
                    title: "Institutional Governance",
                    icon: Scale,
                    summary: "Granular role-based access control, multi-signature approval triggers, and central bank policy alignment.",
                    details: "Central banks and regulatory authorities retain full administrative veto authority and real-time supervisory controls."
                  },
                  {
                    title: "Regulatory Alignment",
                    icon: Landmark,
                    summary: "Fully compatible with Bank of Uganda NPS Act guidelines, AML/CFT sanctions screening, and data sovereignty mandates.",
                    details: "All system telemetry and transaction records reside strictly within Uganda's national jurisdiction and sovereign cloud boundaries."
                  }
                ].map((card, idx) => {
                  const Icon = card.icon;
                  const isSelected = selectedTrustCard === idx;
                  return (
                    <motion.div
                      key={idx}
                      onClick={() => setSelectedTrustCard(isSelected ? null : idx)}
                      whileHover={{ scale: 1.02 }}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#181818] border-[#E5C76B] shadow-[0_0_25px_rgba(200,166,77,0.25)]'
                          : 'bg-[#111111] border-[#C8A64D]/25 hover:border-[#C8A64D]/60'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 rounded-lg bg-[#080808] border border-[#C8A64D]/40 flex items-center justify-center text-[#C8A64D]">
                            <Icon size={16} />
                          </div>
                          <span className="text-[10px] font-mono text-[#C8A64D] font-bold uppercase">
                            PILLAR {idx + 1}
                          </span>
                        </div>
                        <h3 className="text-base font-bold font-serif text-[#FFFFFF]">{card.title}</h3>
                        <p className="text-xs text-[#A7A7A7] leading-relaxed">{card.summary}</p>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 border-t border-[#C8A64D]/20 text-xs font-sans text-[#E5C76B] leading-relaxed bg-[#080808] p-3 rounded-xl border border-[#C8A64D]/30"
                        >
                          <strong>Regulatory Depth: </strong> {card.details}
                        </motion.div>
                      )}

                      <span className="text-[10px] font-mono text-[#C8A64D] text-right block pt-1">
                        {isSelected ? 'Click to collapse ▲' : 'Click to inspect pillar ▼'}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* ACTION FOOTER */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setCurrentScreen(7)}
                  className="px-6 py-3 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Conclusion</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* FINAL SCREEN: CONCLUSION & ACTION */}
          {currentScreen === 7 && (
            <motion.div
              key="screen-7"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8 max-w-3xl py-8"
            >
              {/* EMBLEM WITH HALO */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#C8A64D]/40 shadow-[0_0_40px_rgba(200,166,77,0.2)]"
                />
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E5C76B] via-[#C8A64D] to-[#8A6D1B] p-1 shadow-[0_0_30px_rgba(200,166,77,0.3)]">
                  <div className="w-full h-full bg-[#080808] rounded-[12px] flex items-center justify-center">
                    <span className="text-3xl font-bold font-serif text-[#C8A64D]">M</span>
                  </div>
                </div>
              </div>

              {/* EXECUTIVE CLOSING STATEMENT */}
              <div className="space-y-4">
                <p className="text-sm md:text-base text-[#D1D1D1] font-sans leading-relaxed max-w-2xl mx-auto">
                  "Uganda has defined a vision for a stronger, more inclusive financial system."
                </p>

                <p className="text-xs md:text-sm text-[#A7A7A7] font-sans leading-relaxed max-w-2xl mx-auto">
                  MEHERAH is a platform designed to support that journey by helping financial institutions coordinate more intelligently while respecting regulatory oversight and institutional independence.
                </p>
              </div>

              {/* SLOGAN BANNER */}
              <div className="p-6 bg-[#111111] border-2 border-[#C8A64D] rounded-3xl space-y-2 max-w-xl mx-auto shadow-[0_0_40px_rgba(200,166,77,0.2)]">
                <h2 className="text-3xl font-bold font-serif text-[#FFFFFF] tracking-tight">MEHERAH</h2>
                <p className="text-sm font-serif text-[#E5C76B] italic font-semibold">
                  The Intelligence Behind Financial Systems.
                </p>
                <div className="pt-2 text-[11px] font-mono text-[#A7A7A7] uppercase tracking-widest">
                  Built in Uganda • Designed for Africa • Ready for the World
                </div>
              </div>

              {/* TWO PROMINENT BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {onExplorePlatform && (
                  <button
                    onClick={onExplorePlatform}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C8A64D] to-[#E5C76B] text-[#080808] text-xs font-bold font-mono tracking-wider uppercase hover:shadow-[0_0_30px_rgba(200,166,77,0.5)] transition-all flex items-center justify-center gap-3 shadow-lg"
                  >
                    <span>EXPLORE PLATFORM</span>
                    <ArrowRight size={16} />
                  </button>
                )}

                <button
                  onClick={() => setCurrentScreen(0)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#C8A64D]/50 text-[#C8A64D] text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-3"
                >
                  <RotateCcw size={16} />
                  <span>START DEMONSTRATION</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* BOTTOM EXECUTIVE NAVIGATION BAR */}
      <footer className="relative z-30 flex flex-col sm:flex-row items-center justify-between border-t border-[#C8A64D]/20 pt-4 gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#A7A7A7]">
          <span>SCREEN {currentScreen + 1} OF 8:</span>
          <span className="text-[#C8A64D] font-bold">{screensInfo[currentScreen].title}</span>
          <span className="hidden md:inline text-[#555555]">— {screensInfo[currentScreen].subtitle}</span>
        </div>

        {/* PREVIOUS / NEXT STEP BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen(prev => Math.max(0, prev - 1))}
            disabled={currentScreen === 0}
            className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              currentScreen === 0
                ? 'bg-[#080808] text-[#444444] border-[#222222] cursor-not-allowed'
                : 'bg-[#111111] text-[#FFFFFF] border-[#C8A64D]/30 hover:border-[#C8A64D]'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            onClick={() => setCurrentScreen(prev => Math.min(7, prev + 1))}
            disabled={currentScreen === 7}
            className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              currentScreen === 7
                ? 'bg-[#080808] text-[#444444] border-[#222222] cursor-not-allowed'
                : 'bg-[#C8A64D] text-[#080808] border-[#C8A64D] font-bold hover:bg-[#E5C76B]'
            }`}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>

    </div>
  );
}
