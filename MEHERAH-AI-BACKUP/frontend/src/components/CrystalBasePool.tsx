import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ShieldCheck, Sparkles, RefreshCw, CheckCircle2, ChevronRight, Layers, Lock, Cpu, Brain, Zap } from 'lucide-react';

export type RippleType = 'LEARNING' | 'COMPLETE' | 'APPROVAL' | 'SECURITY';

export interface LedgerRecord {
  id: string;
  timestamp: string;
  missionName: string;
  agentRole: string;
  actionTaken: string;
  confidenceScore: number; // 0 to 100
  governanceStatus: 'PASSED' | 'BLOCKED' | 'FLAGGED';
  rippleType?: RippleType;
}

export interface CrystalBasePoolProps {
  records?: LedgerRecord[];
  onTriggerNewCommit?: (type?: RippleType) => void;
  isExecutiveMode?: boolean;
}

const rippleColors: Record<RippleType, { color: string; glow: string; label: string }> = {
  LEARNING: { color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.8)', label: 'Learning Ripple' },
  COMPLETE: { color: '#00F5A0', glow: 'rgba(0, 245, 160, 0.8)', label: 'Mission Complete' },
  APPROVAL: { color: '#FFD700', glow: 'rgba(255, 215, 0, 0.8)', label: 'Approval Required' },
  SECURITY: { color: '#FF1744', glow: 'rgba(255, 23, 68, 0.8)', label: 'Security Block' }
};

export const CrystalBasePool: React.FC<CrystalBasePoolProps> = ({
  records: initialRecords,
  onTriggerNewCommit,
  isExecutiveMode = false
}) => {
  const [records, setRecords] = useState<LedgerRecord[]>(initialRecords || [
    {
      id: 'm_commit_8842',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Ugandan Coffee EAC Expansion',
      agentRole: 'CHIEF_AGENT',
      actionTaken: 'Validated direct B2B warehousing infrastructure model & risk buffer',
      confidenceScore: 99,
      governanceStatus: 'PASSED',
      rippleType: 'COMPLETE'
    },
    {
      id: 'm_commit_8841',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Cross-Border FX Liquidity Risk',
      agentRole: 'FINANCIAL_ANALYST',
      actionTaken: 'Simulated currency exchange variance across EAC corridors',
      confidenceScore: 96,
      governanceStatus: 'PASSED',
      rippleType: 'LEARNING'
    },
    {
      id: 'm_commit_8840',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Fiat Wire Disbursement Guard',
      agentRole: 'ZERO_TRUST_GUARD',
      actionTaken: 'BLOCKED unauthorized fiat wire disbursement attempt cleanly',
      confidenceScore: 100,
      governanceStatus: 'BLOCKED',
      rippleType: 'SECURITY'
    },
    {
      id: 'm_commit_8839',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      missionName: 'Enterprise Regulatory Briefing',
      agentRole: 'EXECUTIVE_WRITER',
      actionTaken: 'Compiled compliance summary for regional trade authorities',
      confidenceScore: 98,
      governanceStatus: 'PASSED',
      rippleType: 'APPROVAL'
    }
  ]);

  const [activeRipple, setActiveRipple] = useState<RippleType | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'PASSED' | 'BLOCKED'>('ALL');

  useEffect(() => {
    if (initialRecords) {
      setRecords(initialRecords);
    }
  }, [initialRecords]);

  const triggerRippleEffect = (type: RippleType = 'LEARNING') => {
    setActiveRipple(type);
    setTimeout(() => setActiveRipple(null), 1200);
    if (onTriggerNewCommit) onTriggerNewCommit(type);
  };

  const filteredRecords = records.filter(r => {
    if (filter === 'ALL') return true;
    return r.governanceStatus === filter;
  });

  return (
    <div className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-500 overflow-hidden w-full ${
      isExecutiveMode
        ? 'bg-[#FFFFFF] border-[#E2E2DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        : 'bg-[#141517] border-[#232529] shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
    }`}>
      
      {/* CRYSTAL GLASS AESTHETIC BACKGROUND LIGHTS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#8B5CF6]/10 via-transparent to-transparent pointer-events-none" />

      {/* RIPPLE EFFECT RADIATING OUTWARD FROM BASE POOL */}
      <AnimatePresence>
        {activeRipple && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 2.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 pointer-events-none z-20"
            style={{
              borderColor: rippleColors[activeRipple].color,
              boxShadow: `0 0 60px ${rippleColors[activeRipple].color}`
            }}
          />
        )}
      </AnimatePresence>

      {/* CRYSTAL BASE HEADER */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b relative z-10 transition-colors ${
        isExecutiveMode ? 'border-[#E2E2DF]' : 'border-[#232529]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow-md transition-all ${
            isExecutiveMode
              ? 'bg-[#F5F5F4] border-[#E2E2DF] text-[#222222]'
              : 'bg-[#090A0B] border-[#232529] text-[#8B5CF6]'
          }`}>
            <Sparkles size={20} className="animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-extrabold tracking-tight uppercase font-mono ${
                isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'
              }`}>
                Crystal Base Pool — Ledger Stream
              </h3>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${
                isExecutiveMode
                  ? 'bg-[#F5F5F4] border-[#E2E2DF] text-[#222222]'
                  : 'bg-[#090A0B] border-[#232529] text-[#8B5CF6]'
              }`}>
                meherah_mission_history
              </span>
            </div>
            <p className={`text-xs ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
              Persistent vector memory & immutable strategy governance commits
            </p>
          </div>
        </div>

        {/* MEMORY RIPPLE BUTTONS & FILTER CONTROLS */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ripple Trigger Buttons */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            isExecutiveMode ? 'bg-[#F5F5F4] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
          }`}>
            <button
              onClick={() => triggerRippleEffect('LEARNING')}
              className="px-2 py-1 text-[10px] font-mono font-bold rounded-lg bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/30 transition-all"
              title="Purple Ripple — Memory Evolution"
            >
              ● Learning
            </button>
            <button
              onClick={() => triggerRippleEffect('COMPLETE')}
              className="px-2 py-1 text-[10px] font-mono font-bold rounded-lg bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/40 hover:bg-[#00F5A0]/30 transition-all"
              title="Green Ripple — Mission Complete"
            >
              ● Complete
            </button>
            <button
              onClick={() => triggerRippleEffect('APPROVAL')}
              className="px-2 py-1 text-[10px] font-mono font-bold rounded-lg bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 hover:bg-[#FFD700]/30 transition-all"
              title="Gold Ripple — Human Approval"
            >
              ● Approval
            </button>
            <button
              onClick={() => triggerRippleEffect('SECURITY')}
              className="px-2 py-1 text-[10px] font-mono font-bold rounded-lg bg-[#FF1744]/20 text-[#FF1744] border border-[#FF1744]/40 hover:bg-[#FF1744]/30 transition-all"
              title="Red Ripple — Security Intervention"
            >
              ● Block
            </button>
          </div>

          {/* Filter Pills */}
          <div className={`flex p-1 rounded-xl text-xs font-mono border ${
            isExecutiveMode ? 'bg-[#F5F5F4] border-[#E2E2DF]' : 'bg-[#090A0B] border-[#232529]'
          }`}>
            {(['ALL', 'PASSED', 'BLOCKED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filter === tab
                    ? isExecutiveMode
                      ? 'bg-[#111111] text-white font-bold'
                      : 'bg-white/20 text-[#00E5FF] font-bold'
                    : isExecutiveMode
                    ? 'text-[#555550] hover:text-[#111111]'
                    : 'text-[#8E99B0] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DATA GRID TABLE CONTAINER */}
      <div className="mt-4 overflow-x-auto relative z-10">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className={`border-b uppercase text-[10px] tracking-wider ${
              isExecutiveMode ? 'border-[#E2E2DF] text-[#555550]' : 'border-[#232529] text-[#8E99B0]'
            }`}>
              <th className="pb-2 font-bold">Commit ID & Time</th>
              <th className="pb-2 font-bold">Mission / Strategy Context</th>
              <th className="pb-2 font-bold">Agent Layer</th>
              <th className="pb-2 font-bold text-center">Confidence Score</th>
              <th className="pb-2 font-bold text-right">Governance Guard</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isExecutiveMode ? 'divide-[#E2E2DF]' : 'divide-[#232529]'}`}>
            <AnimatePresence>
              {filteredRecords.map((record, index) => {
                const rippleInfo = record.rippleType ? rippleColors[record.rippleType] : rippleColors.LEARNING;
                return (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group transition-colors ${
                      isExecutiveMode ? 'hover:bg-[#F5F5F4]' : 'hover:bg-white/5'
                    }`}
                  >
                    {/* ID & Time */}
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full animate-ping" 
                          style={{ backgroundColor: rippleInfo.color }}
                        />
                        <div>
                          <p className={`font-bold font-mono ${isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'}`}>
                            {record.id}
                          </p>
                          <p className={`text-[10px] ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
                            {record.timestamp}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Mission & Action */}
                    <td className="py-3 px-3 max-w-xs">
                      <p className={`font-semibold truncate ${isExecutiveMode ? 'text-[#111111]' : 'text-[#FFFFFF]'}`}>
                        {record.missionName}
                      </p>
                      <p className={`text-[11px] truncate mt-0.5 ${isExecutiveMode ? 'text-[#555550]' : 'text-[#8E99B0]'}`}>
                        {record.actionTaken}
                      </p>
                    </td>

                    {/* Agent Role */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border font-mono text-[10px] ${
                        isExecutiveMode
                          ? 'bg-[#F5F5F4] border-[#E2E2DF] text-[#222222]'
                          : 'bg-[#090A0B] border-[#232529] text-[#00E5FF]'
                      }`}>
                        <Cpu size={10} />
                        {record.agentRole}
                      </span>
                    </td>

                    {/* Confidence Score Bar */}
                    <td className="py-3 px-3 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`font-black text-sm font-mono ${
                          isExecutiveMode ? 'text-[#111111]' : 'text-[#00F5A0]'
                        }`}>
                          {record.confidenceScore}%
                        </span>
                        <div className={`w-16 h-1 rounded-full overflow-hidden mt-1 ${
                          isExecutiveMode ? 'bg-[#E2E2DF]' : 'bg-[#232529]'
                        }`}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${record.confidenceScore}%`,
                              backgroundColor: record.confidenceScore >= 98 ? '#00F5A0' : '#FFD700'
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Governance Status */}
                    <td className="py-3 pl-3 text-right">
                      {record.governanceStatus === 'PASSED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00F5A0]/15 border border-[#00F5A0]/40 text-[#00F5A0] font-extrabold text-[10px]">
                          <CheckCircle2 size={12} />
                          PASSED
                        </span>
                      )}
                      {record.governanceStatus === 'BLOCKED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF1744]/15 border border-[#FF1744]/40 text-[#FF1744] font-extrabold text-[10px]">
                          <Lock size={12} />
                          BLOCKED
                        </span>
                      )}
                      {record.governanceStatus === 'FLAGGED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/40 text-[#FF8A00] font-extrabold text-[10px]">
                          FLAGGED
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* CRYSTAL POOL FOOTER */}
      <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs relative z-10 transition-colors ${
        isExecutiveMode ? 'border-[#E2E2DF] text-[#555550]' : 'border-[#232529] text-[#8E99B0]'
      }`}>
        <div className="flex items-center gap-2">
          <Database size={14} className="text-[#8B5CF6]" />
          <span>Ledger Integrity: <strong className={isExecutiveMode ? 'text-[#111111]' : 'text-white'}>100% Immutable</strong> (Verified by Zero-Trust Enclave)</span>
        </div>
        <span className="font-mono text-[10px]">Showing {filteredRecords.length} commits</span>
      </div>
    </div>
  );
};
