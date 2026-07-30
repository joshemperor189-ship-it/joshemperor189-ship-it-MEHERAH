import React from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Landmark, Settings, Sparkles, ArrowRight, Shield } from 'lucide-react';

export type MeherahRole = 'unselected' | 'individual' | 'business' | 'institution' | 'admin';

interface RoleSelectionViewProps {
  onSelectRole: (role: MeherahRole) => void;
  onLaunchPresentation?: () => void;
}

export function RoleSelectionView({ onSelectRole, onLaunchPresentation }: RoleSelectionViewProps) {
  const roles = [
    {
      id: 'individual' as MeherahRole,
      title: 'Individual',
      badge: 'PERSONAL FINANCIAL ASSISTANT',
      icon: User,
      color: 'from-[#C8A64D] to-[#E5C76B]',
      border: 'border-[#C8A64D]/40 hover:border-[#C8A64D]',
      bgGlow: 'hover:shadow-[0_0_35px_rgba(200,166,77,0.2)]',
      desc: '"I want to send money, receive money, pay bills or save."',
      features: ['Conversational AI Assistant', 'Instant Low-Cost Payments', 'Smart Automated Savings']
    },
    {
      id: 'business' as MeherahRole,
      title: 'Business',
      badge: 'CASH FLOW & OPERATIONS',
      icon: Building2,
      color: 'from-[#3B82F6] to-[#60A5FA]',
      border: 'border-blue-500/30 hover:border-blue-400',
      bgGlow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.2)]',
      desc: '"I manage customers, suppliers, payroll and cash flow."',
      features: ['Today\'s Cash Position', 'Predictive Cash Flow Insights', 'One-Click Payroll & Supplier Pay']
    },
    {
      id: 'institution' as MeherahRole,
      title: 'Financial Institution',
      badge: 'EXECUTIVE & REGULATORY',
      icon: Landmark,
      color: 'from-[#10B981] to-[#34D399]',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      bgGlow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.2)]',
      desc: '"I monitor operations, payments, reconciliation and institutional intelligence."',
      features: ['Network Settlement Health', 'Liquidity Corridors', 'AI Decision Explainability']
    },
    {
      id: 'admin' as MeherahRole,
      title: 'Administrator',
      badge: 'SOVEREIGN OS COMMAND CENTRE',
      icon: Settings,
      color: 'from-[#8B5CF6] to-[#A78BFA]',
      border: 'border-purple-500/30 hover:border-purple-400',
      bgGlow: 'hover:shadow-[0_0_35px_rgba(139,92,246,0.2)]',
      desc: '"I manage the MEHERAH platform, infrastructure and network."',
      features: ['Full OS Telemetry', 'Provider Routing Engine', 'Complete System Governance']
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] font-sans flex flex-col justify-between p-6 md:p-12 relative overflow-hidden selection:bg-[#C8A64D] selection:text-[#080808]">
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C8A64D]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* TOP HEADER */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#C8A64D]/20 pb-4 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5C76B] via-[#C8A64D] to-[#8A6D1B] p-0.5 shadow-[0_0_20px_rgba(200,166,77,0.3)]">
            <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center font-bold text-lg text-[#C8A64D] font-serif">M</div>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C8A64D] uppercase font-bold block">
              ADAPTIVE EXPERIENCE ENGINE
            </span>
            <h1 className="text-base font-bold tracking-tight text-[#FFFFFF] font-serif">
              MEHERAH Adaptive Intelligence
            </h1>
          </div>
        </div>

        {onLaunchPresentation && (
          <button
            onClick={onLaunchPresentation}
            className="px-3.5 py-2 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#C8A64D]/30 text-[#C8A64D] hover:text-[#E5C76B] transition-all text-xs font-mono font-bold flex items-center gap-2"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Executive Presentation</span>
          </button>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-6xl w-full mx-auto my-auto py-8 space-y-10">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8A64D] bg-[#111111] border border-[#C8A64D]/30 px-3.5 py-1 rounded-full inline-block"
          >
            ONE INTELLIGENCE • MANY EXPERIENCES
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-serif text-[#FFFFFF]"
          >
            Welcome to MEHERAH
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-serif italic text-[#E5C76B]"
          >
            Who are you today?
          </motion.p>
        </div>

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                onClick={() => onSelectRole(role.id)}
                className={`p-6 md:p-8 bg-[#0F0F0F] border ${role.border} rounded-3xl text-left transition-all ${role.bgGlow} group relative flex flex-col justify-between space-y-6 overflow-hidden`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${role.color} p-0.5 shadow-md`}>
                      <div className="w-full h-full bg-[#080808] rounded-[14px] flex items-center justify-center text-[#FFFFFF]">
                        <Icon size={22} className="text-[#E5C76B]" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#A7A7A7] bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#333333]">
                      {role.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold font-serif text-[#FFFFFF] group-hover:text-[#E5C76B] transition-colors flex items-center gap-2">
                      <span>{role.title}</span>
                      <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#C8A64D]" />
                    </h3>
                    <p className="text-sm font-serif italic text-[#D1D1D1] mt-2 leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#222222] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#777777] uppercase block">TAILORED FEATURES:</span>
                  <div className="flex flex-wrap gap-2">
                    {role.features.map((feat, fIdx) => (
                      <span key={fIdx} className="text-[11px] font-sans text-[#A7A7A7] bg-[#141414] border border-[#222222] px-2.5 py-1 rounded-md">
                        • {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-xs font-mono text-[#666666] pt-6 border-t border-[#1A1A1A] max-w-6xl w-full mx-auto">
        MEHERAH Adaptive Intelligence Kernel • Sovereign Financial Architecture for Uganda & Beyond
      </footer>

    </div>
  );
}
