import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, AlertTriangle, Activity, Sparkles, Lock } from 'lucide-react';

export type AuroraHealthState = 'HEALTHY' | 'PROCESSING' | 'LEARNING' | 'WARNING' | 'CRITICAL';

export interface HaloProps {
  overallScore: number; // 0 to 100
  status?: 'GREEN' | 'YELLOW' | 'RED' | AuroraHealthState;
  auroraState?: AuroraHealthState;
  guardrailsBlocked?: number;
  policyLatencyMs?: number;
  isExecutiveMode?: boolean;
}

const auroraConfigs: Record<AuroraHealthState, {
  label: string;
  sublabel: string;
  color: string;
  glow: string;
  border: string;
  bgBadge: string;
}> = {
  HEALTHY: {
    label: 'SYSTEM HARMONY',
    sublabel: 'Zero-Trust Enclave Active',
    color: '#00F5A0', // Emerald Glow
    glow: 'rgba(0, 245, 160, 0.6)',
    border: 'rgba(0, 245, 160, 0.3)',
    bgBadge: 'rgba(0, 245, 160, 0.15)'
  },
  PROCESSING: {
    label: 'AGENTS THINKING',
    sublabel: 'Swarm DAG Execution',
    color: '#00D9FF', // Electric Cyan
    glow: 'rgba(0, 217, 255, 0.6)',
    border: 'rgba(0, 217, 255, 0.3)',
    bgBadge: 'rgba(0, 217, 255, 0.15)'
  },
  LEARNING: {
    label: 'MEMORY EVOLUTION',
    sublabel: 'Vector Log Indexing',
    color: '#A855F7', // Violet Intelligence
    glow: 'rgba(168, 85, 247, 0.6)',
    border: 'rgba(168, 85, 247, 0.3)',
    bgBadge: 'rgba(168, 85, 247, 0.15)'
  },
  WARNING: {
    label: 'ATTENTION REQUIRED',
    sublabel: 'Policy Variance Detected',
    color: '#FF8A00', // Solar Orange
    glow: 'rgba(255, 138, 0, 0.6)',
    border: 'rgba(255, 138, 0, 0.3)',
    bgBadge: 'rgba(255, 138, 0, 0.15)'
  },
  CRITICAL: {
    label: 'SECURITY INTERVENTION',
    sublabel: 'Action Blocked Cleanly',
    color: '#FF1744', // Crimson Pulse
    glow: 'rgba(255, 23, 68, 0.6)',
    border: 'rgba(255, 23, 68, 0.3)',
    bgBadge: 'rgba(255, 23, 68, 0.15)'
  }
};

export const HaloHealthRing: React.FC<HaloProps> = ({ 
  overallScore, 
  status = 'GREEN',
  auroraState,
  guardrailsBlocked = 5,
  policyLatencyMs = 12,
  isExecutiveMode = false
}) => {
  // Resolve state
  let resolvedState: AuroraHealthState = auroraState || 'HEALTHY';
  if (!auroraState) {
    if (status === 'GREEN') resolvedState = 'HEALTHY';
    else if (status === 'YELLOW') resolvedState = 'WARNING';
    else if (status === 'RED') resolvedState = 'CRITICAL';
    else if (status in auroraConfigs) resolvedState = status as AuroraHealthState;
  }

  const currentConfig = auroraConfigs[resolvedState];
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-between p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden w-full h-full ${
      isExecutiveMode
        ? 'bg-[#FFFFFF] border-[#E2E2DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        : 'bg-[#141517] border-[#232529] shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
    }`} style={{ minHeight: '360px' }}>
      
      {/* Background Ambient Aurora Glow */}
      <motion.div 
        animate={{ scale: [1.2, 1.35, 1.2], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 blur-3xl pointer-events-none transition-colors duration-1000 rounded-full"
        style={{ backgroundColor: currentConfig.color }}
      />

      {/* Top Bar Header Badges */}
      <div className="w-full flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span 
            className="w-2.5 h-2.5 rounded-full animate-ping" 
            style={{ backgroundColor: currentConfig.color }} 
          />
          <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${
            isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'
          }`}>
            Zero-Trust Guard
          </span>
        </div>

        <div className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors ${
          isExecutiveMode 
            ? 'bg-[#F5F5F4] text-[#222222] border-[#E2E2DF]' 
            : 'bg-[#090A0B] text-[#00D9FF] border-[#232529]'
        }`}>
          {policyLatencyMs}ms POLICY CHECK
        </div>
      </div>

      {/* Core Glowing Ring Stage */}
      <div className="relative w-56 h-56 flex items-center justify-center z-10 my-2">
        <svg className="w-full h-full transform -rotate-90">
          {/* Outer Track Rim */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke={isExecutiveMode ? '#E2E2DF' : '#232529'}
            strokeWidth="10"
            fill="transparent"
          />
          {/* Active Glowing Aurora Ring */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke={currentConfig.color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.8s ease',
              filter: `drop-shadow(0 0 14px ${currentConfig.glow})`
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute text-center flex flex-col items-center">
          <span className={`text-[10px] uppercase tracking-widest font-extrabold font-mono ${
            isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'
          }`}>
            MEHERAH Kernel
          </span>
          <span className={`text-4xl font-black tracking-tight font-mono mt-1 ${
            isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'
          }`}>
            {overallScore}%
          </span>
          
          <span 
            className="text-[10px] mt-2 px-3 py-1 rounded-full font-extrabold font-mono uppercase tracking-wider border transition-all duration-500 shadow-sm"
            style={{ 
              backgroundColor: currentConfig.bgBadge, 
              color: currentConfig.color,
              borderColor: currentConfig.border 
            }}
          >
            ● {currentConfig.label}
          </span>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t text-center z-10 transition-colors"
        style={{ borderColor: isExecutiveMode ? '#E2E2DF' : '#232529' }}
      >
        <div className={`p-2.5 rounded-2xl border ${
          isExecutiveMode ? 'bg-[#F5F5F4] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
        }`}>
          <p className={`text-[10px] uppercase font-mono ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
            Active Guardrails
          </p>
          <p className={`text-sm font-bold font-mono mt-0.5 ${isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'}`}>
            5 Enclaves Active
          </p>
        </div>

        <div className={`p-2.5 rounded-2xl border ${
          isExecutiveMode ? 'bg-[#F5F5F4] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
        }`}>
          <p className={`text-[10px] uppercase font-mono ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
            Clean Enforcement
          </p>
          <p className="text-sm font-bold font-mono mt-0.5" style={{ color: currentConfig.color }}>
            {guardrailsBlocked} Clean Blocks
          </p>
        </div>
      </div>

    </div>
  );
};
