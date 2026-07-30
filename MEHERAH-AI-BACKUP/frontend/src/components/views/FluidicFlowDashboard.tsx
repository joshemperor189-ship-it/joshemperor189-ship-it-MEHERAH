import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HaloHealthRing, AuroraHealthState } from '../HaloHealthRing';
import { AmberCascadingTiers } from '../AmberCascadingTiers';
import { CrystalBasePool, LedgerRecord, RippleType } from '../CrystalBasePool';
import { AIHeartbeat, PulseState } from '../AIHeartbeat';
import { Activity, ShieldCheck, Cpu, Sliders, Zap, AlertTriangle, Layers, Play, RefreshCw, Sparkles, Sun, Moon, Building2 } from 'lucide-react';

export const FluidicFlowDashboard: React.FC = () => {
  // Theme state: false = Matte Black (#0C0D0E), true = Matte White (#F5F5F4)
  const [themeMode, setThemeMode] = useState<'black' | 'white'>('black');
  const isExecutiveMode = themeMode === 'white';

  // System Health state for HaloHealthRing
  const [overallScore, setOverallScore] = useState<number>(99);
  const [auroraState, setAuroraState] = useState<AuroraHealthState>('HEALTHY');
  const [guardrailsBlocked, setGuardrailsBlocked] = useState<number>(5);

  // Amber Cascading Tiers state
  const [queueDepth, setQueueDepth] = useState<number>(3);
  const [activeAgentsCount, setActiveAgentsCount] = useState<number>(8);
  const [dbCommitsCount, setDbCommitsCount] = useState<number>(142);
  const [throughputMsgsPerSec, setThroughputMsgsPerSec] = useState<number>(480);

  // Pulse State for AI Heartbeat
  const [pulseState, setPulseState] = useState<PulseState>('Executing');

  // Crystal Base Pool records state
  const [records, setRecords] = useState<LedgerRecord[]>([
    {
      id: 'm_commit_8845',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Ugandan Coffee EAC Expansion',
      agentRole: 'CHIEF_AGENT',
      actionTaken: 'Standardized direct B2B warehousing infrastructure model',
      confidenceScore: 99,
      governanceStatus: 'PASSED',
      rippleType: 'COMPLETE'
    },
    {
      id: 'm_commit_8844',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Cross-Border FX Liquidity Risk',
      agentRole: 'FINANCIAL_ANALYST',
      actionTaken: 'Simulated currency exchange variance across EAC corridors',
      confidenceScore: 96,
      governanceStatus: 'PASSED',
      rippleType: 'LEARNING'
    },
    {
      id: 'm_commit_8843',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Fiat Wire Disbursement Guard',
      agentRole: 'ZERO_TRUST_GUARD',
      actionTaken: 'BLOCKED unauthorized fiat wire disbursement attempt cleanly',
      confidenceScore: 100,
      governanceStatus: 'BLOCKED',
      rippleType: 'SECURITY'
    },
    {
      id: 'm_commit_8842',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Enterprise Regulatory Briefing',
      agentRole: 'EXECUTIVE_WRITER',
      actionTaken: 'Compiled compliance summary for regional trade authorities',
      confidenceScore: 98,
      governanceStatus: 'PASSED',
      rippleType: 'APPROVAL'
    }
  ]);

  // Handler to manually inject a new commit & radiate a ripple in the Crystal Pool
  const handleAddNewCommit = (type?: RippleType) => {
    const newId = `m_commit_${Math.floor(8846 + Math.random() * 1000)}`;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const missions = [
      'EAC Cross-Border Logistics Strategy',
      'Automated Treasury Capital Allocation',
      'Zero-Trust Secret Rotation Defense',
      'East Africa Commodity Hedging Model'
    ];
    const roles = ['RESEARCH_SPECIALIST', 'FINANCIAL_ANALYST', 'EXECUTIVE_WRITER', 'CHIEF_AGENT'];
    
    const randomMission = missions[Math.floor(Math.random() * missions.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomConfidence = Math.floor(92 + Math.random() * 8);

    const chosenRipple: RippleType = type || (randomConfidence >= 98 ? 'COMPLETE' : 'LEARNING');

    const newRecord: LedgerRecord = {
      id: newId,
      timestamp: now,
      missionName: randomMission,
      agentRole: randomRole,
      actionTaken: `Executed verified agent DAG step with ${randomConfidence}% confidence score`,
      confidenceScore: randomConfidence,
      governanceStatus: chosenRipple === 'SECURITY' ? 'BLOCKED' : 'PASSED',
      rippleType: chosenRipple
    };

    setRecords(prev => [newRecord, ...prev.slice(0, 9)]);
    setDbCommitsCount(prev => prev + 1);
  };

  return (
    <div className={`space-y-6 transition-colors duration-500 p-6 rounded-3xl ${
      themeMode === 'white'
        ? 'bg-[#F5F5F4] text-[#111111]'
        : 'bg-[#0C0D0E] text-[#FFFFFF]'
    }`}>
      
      {/* HEADER BANNER WITH MATTE BLACK / MATTE WHITE THEME TOGGLE */}
      <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 ${
        themeMode === 'white'
          ? 'bg-[#FFFFFF] border-[#E2E2DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          : 'bg-[#141517] border-[#232529] shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
      }`}>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full border font-mono text-[10px] font-bold uppercase tracking-wider ${
              themeMode === 'white'
                ? 'bg-[#F5F5F4] border-[#D0D0CC] text-[#222222]'
                : 'bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]'
            }`}>
              {themeMode === 'white' ? 'Matte White Edition' : 'Matte Black Edition'}
            </span>
            <span className={`text-xs font-mono ${themeMode === 'white' ? 'text-[#666660]' : 'text-[#8E99B0]'}`}>
              MEHERAH Fluidic Kernel v1.5
            </span>
          </div>
          <h1 className={`text-2xl font-black tracking-tight ${
            themeMode === 'white' ? 'text-[#111111]' : 'text-[#FFFFFF]'
          }`}>
            The Living Fluidic Ecosystem
          </h1>
          <p className={`text-xs max-w-xl leading-relaxed ${
            themeMode === 'white' ? 'text-[#555550]' : 'text-[#94A3B8]'
          }`}>
            High-contrast matte canvas with liquid fluidic animations, dynamic aurora health spectrum rings, cascading energy pipelines, and real-time vector memory ripples.
          </p>
        </div>

        {/* CONTROLS: MATTE COLOR THEME SWITCH & AURORA HEALTH SELECTOR */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          
          {/* Matte Black / Matte White Switch */}
          <div className={`flex items-center p-1 rounded-2xl border ${
            themeMode === 'white'
              ? 'bg-[#F5F5F4] border-[#E2E2DF]'
              : 'bg-[#090A0B] border-[#232529]'
          }`}>
            <button
              onClick={() => setThemeMode('black')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                themeMode === 'black'
                  ? 'bg-[#232529] text-white shadow-sm'
                  : 'text-[#8E99B0] hover:text-white'
              }`}
            >
              <Moon size={14} />
              <span>Matte Black</span>
            </button>

            <button
              onClick={() => setThemeMode('white')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                themeMode === 'white'
                  ? 'bg-white text-black shadow-md border border-[#E2E2DF]'
                  : 'text-[#8E99B0] hover:text-white'
              }`}
            >
              <Sun size={14} />
              <span>Matte White</span>
            </button>
          </div>

          {/* Health Spectrum Selector */}
          <div className={`flex items-center gap-1 p-1 rounded-2xl border ${
            themeMode === 'white' ? 'bg-[#F5F5F4] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
          }`}>
            <button
              onClick={() => { setAuroraState('HEALTHY'); setOverallScore(99); }}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-xl transition-all ${
                auroraState === 'HEALTHY'
                  ? 'bg-[#00F5A0] text-black shadow-[0_0_10px_#00F5A0]'
                  : themeMode === 'white' ? 'text-[#666660] hover:text-black' : 'text-[#8E99B0] hover:text-white'
              }`}
            >
              Emerald
            </button>
            <button
              onClick={() => { setAuroraState('PROCESSING'); setOverallScore(92); setPulseState('Executing'); }}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-xl transition-all ${
                auroraState === 'PROCESSING'
                  ? 'bg-[#00D9FF] text-black shadow-[0_0_10px_#00D9FF]'
                  : themeMode === 'white' ? 'text-[#666660] hover:text-black' : 'text-[#8E99B0] hover:text-white'
              }`}
            >
              Cyan
            </button>
            <button
              onClick={() => { setAuroraState('LEARNING'); setOverallScore(96); setPulseState('Learning'); }}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-xl transition-all ${
                auroraState === 'LEARNING'
                  ? 'bg-[#A855F7] text-white shadow-[0_0_10px_#A855F7]'
                  : themeMode === 'white' ? 'text-[#666660] hover:text-black' : 'text-[#8E99B0] hover:text-white'
              }`}
            >
              Violet
            </button>
            <button
              onClick={() => { setAuroraState('WARNING'); setOverallScore(75); }}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-xl transition-all ${
                auroraState === 'WARNING'
                  ? 'bg-[#FF8A00] text-black shadow-[0_0_10px_#FF8A00]'
                  : themeMode === 'white' ? 'text-[#666660] hover:text-black' : 'text-[#8E99B0] hover:text-white'
              }`}
            >
              Orange
            </button>
            <button
              onClick={() => { setAuroraState('CRITICAL'); setOverallScore(45); setGuardrailsBlocked(b => b + 1); }}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-xl transition-all ${
                auroraState === 'CRITICAL'
                  ? 'bg-[#FF1744] text-white shadow-[0_0_10px_#FF1744]'
                  : themeMode === 'white' ? 'text-[#666660] hover:text-black' : 'text-[#8E99B0] hover:text-white'
              }`}
            >
              Crimson
            </button>
          </div>

        </div>
      </div>

      {/* AI HEARTBEAT LIVE LIFE SIGNS BAR */}
      <div>
        <AIHeartbeat
          currentPulseState={pulseState}
          onStateChange={(st) => setPulseState(st)}
          isExecutiveMode={isExecutiveMode}
        />
      </div>

      {/* TOP ROW: HALO RING (LEFT) & CASCADING ENERGY TIERS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* 1. THE GLOWING HALO (SYSTEM HEALTH & GUARDRAILS) */}
        <div className="lg:col-span-5 flex flex-col">
          <HaloHealthRing 
            overallScore={overallScore} 
            auroraState={auroraState}
            guardrailsBlocked={guardrailsBlocked}
            policyLatencyMs={auroraState === 'HEALTHY' ? 12 : auroraState === 'PROCESSING' ? 18 : 65}
            isExecutiveMode={isExecutiveMode}
          />
        </div>

        {/* 2. THE CASCADING ENERGY TIERS (GOLD -> CYAN -> PURPLE) */}
        <div className="lg:col-span-7 flex flex-col">
          <AmberCascadingTiers
            queueDepth={queueDepth}
            activeAgentsCount={activeAgentsCount}
            dbCommitsCount={dbCommitsCount}
            throughputMsgsPerSec={throughputMsgsPerSec}
            activeMissionName="Ugandan Coffee EAC Expansion Strategy"
            isExecutiveMode={isExecutiveMode}
          />
        </div>

      </div>

      {/* BOTTOM ROW: 3. THE CRYSTAL BASE POOL (PERSISTENT STORAGE LEDGER) */}
      <div>
        <CrystalBasePool
          records={records}
          onTriggerNewCommit={handleAddNewCommit}
          isExecutiveMode={isExecutiveMode}
        />
      </div>

    </div>
  );
};
