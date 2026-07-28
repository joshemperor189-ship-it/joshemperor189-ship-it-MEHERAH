import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Cpu, Database, Eye } from 'lucide-react';

export type PulseState = 'Learning' | 'Planning' | 'Executing' | 'Remembering';

export interface AIHeartbeatProps {
  currentPulseState?: PulseState;
  onStateChange?: (state: PulseState) => void;
  isExecutiveMode?: boolean;
}

const stateConfigs: Record<PulseState, {
  label: string;
  color: string;
  glow: string;
  borderColor: string;
  bgLight: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  description: string;
}> = {
  Learning: {
    label: 'Learning',
    color: '#A855F7', // Violet Intelligence
    glow: 'rgba(168, 85, 247, 0.5)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    bgLight: 'rgba(168, 85, 247, 0.1)',
    icon: Sparkles,
    description: 'Evolving vector memory and strategic patterns'
  },
  Planning: {
    label: 'Planning',
    color: '#FFD700', // Royal Gold
    glow: 'rgba(255, 215, 0, 0.5)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
    bgLight: 'rgba(255, 215, 0, 0.1)',
    icon: Brain,
    description: 'Constructing multi-agent DAG execution topology'
  },
  Executing: {
    label: 'Executing',
    color: '#00D9FF', // Electric Cyan
    glow: 'rgba(0, 217, 255, 0.5)',
    borderColor: 'rgba(0, 217, 255, 0.3)',
    bgLight: 'rgba(0, 217, 255, 0.1)',
    icon: Cpu,
    description: 'Orchestrating active agent swarm workflows'
  },
  Remembering: {
    label: 'Remembering',
    color: '#00F5A0', // Emerald Glow
    glow: 'rgba(0, 245, 160, 0.5)',
    borderColor: 'rgba(0, 245, 160, 0.3)',
    bgLight: 'rgba(0, 245, 160, 0.1)',
    icon: Database,
    description: 'Indexing immutable governance commits into ledger'
  }
};

export const AIHeartbeat: React.FC<AIHeartbeatProps> = ({
  currentPulseState: externalState,
  onStateChange,
  isExecutiveMode = false
}) => {
  const [internalState, setInternalState] = useState<PulseState>('Executing');
  const activeState = externalState || internalState;

  // Auto cycle states every 4 seconds if no external state is passed
  useEffect(() => {
    if (externalState) return;
    const states: PulseState[] = ['Executing', 'Learning', 'Planning', 'Remembering'];
    const interval = setInterval(() => {
      setInternalState(prev => {
        const nextIdx = (states.indexOf(prev) + 1) % states.length;
        const nextState = states[nextIdx];
        if (onStateChange) onStateChange(nextState);
        return nextState;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [externalState, onStateChange]);

  const config = stateConfigs[activeState];
  const IconComponent = config.icon;

  return (
    <div className={`relative flex items-center justify-between p-4 rounded-2xl transition-all duration-500 border ${
      isExecutiveMode
        ? 'bg-[#FFFFFF] border-[#E2E2DF] shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
        : 'bg-[#141517] border-[#232529] shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
    }`}>
      {/* Background Subtle Breathing Glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${config.glow} 0%, transparent 70%)`
        }}
      />

      {/* Left: Living Pulse Indicator */}
      <div className="flex items-center gap-3.5 relative z-10">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500"
          style={{
            backgroundColor: isExecutiveMode ? '#F5F5F4' : '#090A0B',
            border: `1px solid ${config.borderColor}`,
            boxShadow: `0 0 16px ${config.glow}`
          }}
        >
          {/* Pulsing Ring */}
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-xl"
            style={{ border: `1.5px solid ${config.color}` }}
          />

          <IconComponent size={20} className="transition-colors duration-500" style={{ color: config.color }} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest ${
              isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'
            }`}>
              MEHERAH Intelligence
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: config.color }} />
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeState}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className={`text-sm font-bold font-mono tracking-tight ${
                  isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'
                }`}
              >
                ● {config.label}
              </motion.span>
            </AnimatePresence>
            <span className={`text-xs font-mono hidden sm:inline ${
              isExecutiveMode ? 'text-[#666660]' : 'text-[#7D889E]'
            }`}>
              — {config.description}
            </span>
          </div>
        </div>
      </div>

      {/* Right: State Switcher Buttons */}
      <div className={`flex items-center gap-1 p-1 rounded-xl border relative z-10 ${
        isExecutiveMode ? 'bg-[#F5F5F4] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
      }`}>
        {(['Learning', 'Planning', 'Executing', 'Remembering'] as PulseState[]).map((st) => {
          const isActive = activeState === st;
          const stColor = stateConfigs[st].color;
          return (
            <button
              key={st}
              onClick={() => {
                setInternalState(st);
                if (onStateChange) onStateChange(st);
              }}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg transition-all duration-300 ${
                isActive
                  ? 'text-black shadow-md font-extrabold'
                  : isExecutiveMode
                  ? 'text-[#666660] hover:text-[#111111]'
                  : 'text-[#8E99B0] hover:text-white'
              }`}
              style={{
                backgroundColor: isActive ? stColor : 'transparent',
                boxShadow: isActive ? `0 0 10px ${stColor}` : 'none'
              }}
            >
              {st}
            </button>
          );
        })}
      </div>
    </div>
  );
};
