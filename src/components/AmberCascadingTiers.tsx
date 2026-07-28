import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Cpu, Database, ArrowDown, Activity, Zap, Sparkles } from 'lucide-react';

export interface CascadingTiersProps {
  queueDepth: number;
  activeAgentsCount: number;
  dbCommitsCount: number;
  throughputMsgsPerSec: number;
  activeMissionName?: string;
  isExecutiveMode?: boolean;
}

export const AmberCascadingTiers: React.FC<CascadingTiersProps> = ({
  queueDepth,
  activeAgentsCount,
  dbCommitsCount,
  throughputMsgsPerSec,
  activeMissionName = 'Ugandan Coffee EAC Expansion Strategy',
  isExecutiveMode = false
}) => {
  // Speed calculation for fluid ripples: higher throughput = faster flow duration
  const animDuration = Math.max(0.6, 2.5 - (throughputMsgsPerSec / 500));

  return (
    <div className={`flex flex-col p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden w-full h-full justify-between ${
      isExecutiveMode
        ? 'bg-[#FFFFFF] border-[#E2E2DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        : 'bg-[#141517] border-[#232529] shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
    }`}>
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/5 via-[#00E5FF]/5 to-[#8B5CF6]/5 pointer-events-none" />

      {/* Header */}
      <div className={`flex items-center justify-between mb-4 pb-3 border-b relative z-10 transition-colors ${
        isExecutiveMode ? 'border-[#E2E2DF]' : 'border-[#232529]'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-ping" />
          <h3 className={`text-sm font-bold tracking-wide uppercase font-mono ${
            isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'
          }`}>
            Cascading Energy Pipeline
          </h3>
        </div>

        <div className={`flex items-center gap-2 border px-3 py-1 rounded-full font-mono text-[11px] ${
          isExecutiveMode
            ? 'bg-[#F5F5F4] border-[#E2E2DF] text-[#222222]'
            : 'bg-[#090A0B] border-[#232529] text-[#00E5FF]'
        }`}>
          <Zap size={12} className="text-[#FFD700] animate-bounce" />
          <span className="font-semibold">
            {throughputMsgsPerSec} MSGS/SEC (RabbitMQ)
          </span>
        </div>
      </div>

      {/* THREE ENERGY LAYERS WATERFALL */}
      <div className="flex flex-col gap-3 relative z-10 my-1">

        {/* TIER 1 — HUMAN INTENT (Royal Gold #FFD700) */}
        <div className={`group relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
          isExecutiveMode
            ? 'bg-[#F5F5F4] border-[#FFD700]/50 hover:border-[#FFD700]'
            : 'bg-[#090A0B] border-[#FFD700]/30 hover:border-[#FFD700]'
        }`}>
          {/* Particles ambient glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl pointer-events-none"
          />

          <div className="absolute -top-0.5 left-6 bg-[#FFD700] text-[#0A0804] text-[9px] font-mono font-black px-2.5 py-0.5 rounded-b uppercase tracking-wider shadow-sm">
            Tier 1 — Human Intent (Ideas & Objectives)
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40 shadow-[0_0_12px_rgba(255,215,0,0.3)]">
                <Inbox size={18} />
              </div>
              <div>
                <h4 className={`text-xs font-bold ${isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'}`}>
                  Raw Objective Stream
                </h4>
                <p className={`text-[11px] font-mono mt-0.5 truncate max-w-[220px] ${
                  isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'
                }`}>
                  {activeMissionName}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-mono font-black text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                {queueDepth}
              </span>
              <p className={`text-[10px] uppercase font-mono ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
                Queue Depth
              </p>
            </div>
          </div>
        </div>

        {/* CASCADING FLOW ANIMATION 1 -> 2 (Gold to Cyan Stream) */}
        <div className="relative h-5 flex items-center justify-center overflow-hidden">
          <div className="w-0.5 h-full bg-[#232529] relative overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-[#FFD700] to-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: animDuration, ease: 'linear' }}
              style={{ height: '60%' }}
            />
          </div>
          <div className={`absolute p-1 rounded-full border text-[#00E5FF] ${
            isExecutiveMode ? 'bg-[#FFFFFF] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
          }`}>
            <ArrowDown size={10} className="animate-pulse" />
          </div>
        </div>

        {/* TIER 2 — AI INTELLIGENCE (Aurora Cyan #00E5FF) */}
        <div className={`group relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
          isExecutiveMode
            ? 'bg-[#F5F5F4] border-[#00E5FF]/50 hover:border-[#00E5FF]'
            : 'bg-[#090A0B] border-[#00E5FF]/30 hover:border-[#00E5FF]'
        }`}>
          {/* Cyan stream ambient glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], x: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-2xl pointer-events-none"
          />

          <div className="absolute -top-0.5 left-6 bg-[#00E5FF] text-[#040A0F] text-[9px] font-mono font-black px-2.5 py-0.5 rounded-b uppercase tracking-wider shadow-sm">
            Tier 2 — AI Intelligence (Agent Collaboration & Policy DAG)
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                <Cpu size={18} />
              </div>
              <div>
                <h4 className={`text-xs font-bold ${isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'}`}>
                  src/core/policy-engine.ts
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-ping" />
                  <span className={`text-[11px] font-mono ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
                    Zero-Trust Enclave Active
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-mono font-black text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                {activeAgentsCount}
              </span>
              <p className={`text-[10px] uppercase font-mono ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
                Agents Active
              </p>
            </div>
          </div>
        </div>

        {/* CASCADING FLOW ANIMATION 2 -> 3 (Cyan to Quantum Purple Stream) */}
        <div className="relative h-5 flex items-center justify-center overflow-hidden">
          <div className="w-0.5 h-full bg-[#232529] relative overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-[#00E5FF] to-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: animDuration, ease: 'linear' }}
              style={{ height: '60%' }}
            />
          </div>
          <div className={`absolute p-1 rounded-full border text-[#8B5CF6] ${
            isExecutiveMode ? 'bg-[#FFFFFF] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
          }`}>
            <ArrowDown size={10} className="animate-pulse" />
          </div>
        </div>

        {/* TIER 3 — KNOWLEDGE MEMORY (Quantum Purple #8B5CF6) */}
        <div className={`group relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
          isExecutiveMode
            ? 'bg-[#F5F5F4] border-[#8B5CF6]/50 hover:border-[#8B5CF6]'
            : 'bg-[#090A0B] border-[#8B5CF6]/30 hover:border-[#8B5CF6]'
        }`}>
          {/* Purple ambient glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-2xl pointer-events-none"
          />

          <div className="absolute -top-0.5 left-6 bg-[#8B5CF6] text-white text-[9px] font-mono font-black px-2.5 py-0.5 rounded-b uppercase tracking-wider shadow-sm">
            Tier 3 — Knowledge Memory (Learning & Vector Pool)
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                <Database size={18} />
              </div>
              <div>
                <h4 className={`text-xs font-bold ${isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'}`}>
                  Vector Memory Engine
                </h4>
                <p className={`text-[11px] font-mono mt-0.5 ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
                  meherah_mission_history
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-mono font-black text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">
                {dbCommitsCount}
              </span>
              <p className={`text-[10px] uppercase font-mono ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
                Commits Indexed
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Throughput */}
      <div className={`mt-3 pt-3 border-t flex items-center justify-between text-xs z-10 transition-colors ${
        isExecutiveMode ? 'border-[#E2E2DF]' : 'border-[#232529]'
      }`}>
        <span className={`text-[11px] font-mono ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
          Lifecycle: Gold (Intent) → Cyan (AI) → Purple (Memory)
        </span>
        <div className="flex items-center gap-1.5 text-[#00E5FF] font-mono font-bold text-[11px]">
          <Activity size={12} className="animate-spin" />
          <span>Cascade Active</span>
        </div>
      </div>

    </div>
  );
};
