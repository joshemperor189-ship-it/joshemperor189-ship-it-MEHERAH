import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MeherahOrchestrationAudit } from './MeherahOrchestrationAudit';
import { ExecutiveControlUnitsView } from '../views/ExecutiveControlUnitsView';
import { AdministrationDashboardView } from '../views/AdministrationDashboardView';
import { MeherahSystemImpactSimulatorView } from '../views/MeherahSystemImpactSimulatorView';
import { MeherahAutonomousRecoveryRepairView } from '../views/MeherahAutonomousRecoveryRepairView';
import { Landmark, Activity, Globe, ShieldCheck, Scale, Cpu, CheckCircle2, ArrowRight, Layers, FileText, AlertCircle, Sliders, Settings, Sparkles, Brain, Stethoscope } from 'lucide-react';

export type InstitutionalSubTab = 'observatory' | 'impact_simulator' | 'recovery_repair' | 'controls' | 'administration';

export function InstitutionExperienceView() {
  const [activeSubTab, setActiveSubTab] = useState<InstitutionalSubTab>('observatory');
  const [selectedModule, setSelectedModule] = useState<string>('health');

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6 px-4">
      
      {/* TOP INSTITUTIONAL NAVIGATION STRIP */}
      <div className="flex items-center justify-between gap-4 p-2 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          {[
            { id: 'observatory' as InstitutionalSubTab, label: 'Executive Observatory', icon: Landmark },
            { id: 'impact_simulator' as InstitutionalSubTab, label: 'System Impact Simulator', icon: Brain },
            { id: 'recovery_repair' as InstitutionalSubTab, label: 'Recovery & Repair Centre', icon: Stethoscope },
            { id: 'controls' as InstitutionalSubTab, label: 'Executive Control Units', icon: Sliders },
            { id: 'administration' as InstitutionalSubTab, label: 'Administration Dashboard', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C8A64D] to-[#E5C76B] text-[#080808] shadow-[0_0_20px_rgba(200,166,77,0.3)]'
                    : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#181818]'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080808] border border-[#34D399]/30 text-xs font-mono text-[#34D399]">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>SOVEREIGN KERNEL ACTIVE</span>
        </div>
      </div>

      {/* VIEW CONTENT DEPENDING ON ACTIVE SUB TAB */}
      {activeSubTab === 'impact_simulator' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <MeherahSystemImpactSimulatorView />
        </motion.div>
      )}

      {activeSubTab === 'recovery_repair' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <MeherahAutonomousRecoveryRepairView />
        </motion.div>
      )}

      {activeSubTab === 'controls' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <ExecutiveControlUnitsView />
        </motion.div>
      )}

      {activeSubTab === 'administration' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <AdministrationDashboardView />
        </motion.div>
      )}

      {activeSubTab === 'observatory' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-8">
          
          {/* EXECUTIVE INSTITUTIONAL BANNER */}
          <div className="p-8 bg-gradient-to-r from-[#0B0B0B] via-[#121212] to-[#0B0B0B] border-2 border-[#C8A64D]/40 rounded-3xl space-y-4 shadow-[0_0_35px_rgba(200,166,77,0.12)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#047857] p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#080808] rounded-[14px] flex items-center justify-center text-[#34D399]">
                    <Landmark size={24} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#34D399] uppercase font-bold block">
                    BANK OF UGANDA & NATIONAL PAYMENT SYSTEMS DIRECTORATE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#FFFFFF]">
                    Institutional Intelligence Observatory
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#080808] border border-[#34D399]/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#34D399]">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span>SOVEREIGN NETWORK OPERATIONAL</span>
              </div>
            </div>

            {/* TOP LEVEL METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-3.5 bg-[#080808] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] block">SYSTEM AVAILABILITY</span>
                <strong className="text-base text-[#34D399] font-bold">99.999%</strong>
              </div>
              <div className="p-3.5 bg-[#080808] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] block">AVERAGE LATENCY</span>
                <strong className="text-base text-[#C8A64D] font-bold">14 ms</strong>
              </div>
              <div className="p-3.5 bg-[#080808] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] block">ISO 20022 COMPLIANCE</span>
                <strong className="text-base text-[#34D399] font-bold">100% VERIFIED</strong>
              </div>
              <div className="p-3.5 bg-[#080808] border border-[#222222] rounded-xl space-y-1">
                <span className="text-[10px] text-[#A7A7A7] block">ACTIVE GATEWAYS</span>
                <strong className="text-base text-[#FFFFFF] font-bold">14 Nodes</strong>
              </div>
            </div>
          </div>

          {/* SOVEREIGN TRANSFER INTELLIGENCE AUDIT */}
          <MeherahOrchestrationAudit />

          {/* 5 EXECUTIVE MODULE PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* MODULE SELECTOR SIDEBAR (LEFT 4 COLS) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest block px-1">
                EXECUTIVE OBSERVATORY MODULES:
              </span>

              {[
                { id: 'health', title: 'Network Health', sub: 'System Uptime & Node Mesh', icon: Activity },
                { id: 'settlement', title: 'Settlement Monitoring', sub: 'Real-Time Batch Clearing', icon: Layers },
                { id: 'liquidity', title: 'Liquidity Overview', sub: 'Cross-Bank Buffer Status', icon: Landmark },
                { id: 'corridors', title: 'Regional Corridors', sub: 'EAC Cross-Border Rails', icon: Globe },
                { id: 'explainability', title: 'AI Decision Explainability', sub: 'Policy Rule Verifiability', icon: ShieldCheck }
              ].map((mod) => {
                const Icon = mod.icon;
                const isActive = selectedModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#141414] border-[#C8A64D] shadow-lg text-[#FFFFFF]'
                        : 'bg-[#0E0E0E] border-[#222222] text-[#A7A7A7] hover:bg-[#121212] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-[#C8A64D]' : 'text-[#666666]'} />
                      <div>
                        <strong className="text-xs font-sans font-bold block">{mod.title}</strong>
                        <span className="text-[10px] font-mono text-[#777777]">{mod.sub}</span>
                      </div>
                    </div>
                    {isActive && <ArrowRight size={14} className="text-[#C8A64D]" />}
                  </button>
                );
              })}
            </div>

            {/* ACTIVE MODULE DISPLAY (RIGHT 8 COLS) */}
            <div className="lg:col-span-8 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl p-6 space-y-6 shadow-xl min-h-[440px]">
              
              {selectedModule === 'health' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="border-b border-[#222222] pb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold font-serif text-[#FFFFFF]">Network Health Observatory</h3>
                    <span className="text-[10px] font-mono text-[#34D399] font-bold">100% OPERATIONAL</span>
                  </div>
                  <p className="text-xs text-[#A7A7A7] leading-relaxed">
                    Real-time telemetry monitoring Bank of Uganda RTGS, commercial bank core systems, and mobile network operator gateways. Zero network splits detected.
                  </p>
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222]">
                      <span className="text-[10px] text-[#777777] block">BOU RTGS Bridge</span>
                      <strong className="text-sm text-[#34D399] block mt-1">CONNECTED (0.8ms)</strong>
                    </div>
                    <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222]">
                      <span className="text-[10px] text-[#777777] block">MTN & Airtel Gateway Mesh</span>
                      <strong className="text-sm text-[#34D399] block mt-1">SYNCHRONIZED</strong>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedModule === 'settlement' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="border-b border-[#222222] pb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold font-serif text-[#FFFFFF]">Real-Time Settlement & Reconciliation</h3>
                    <span className="text-[10px] font-mono text-[#C8A64D] font-bold">ISO 20022 COMPLIANT</span>
                  </div>
                  <p className="text-xs text-[#A7A7A7] leading-relaxed">
                    Automated continuous net settlement prevents systemic liquidity backlog. Every message carries an immutable cryptographic audit hash.
                  </p>
                  <div className="p-4 bg-[#141414] rounded-2xl border border-[#C8A64D]/30 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">Last Batch Cleared:</span>
                      <strong className="text-[#34D399]">UGX 8.24 Billion (09:12 AM)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">Reconciliation Lag:</span>
                      <strong className="text-[#FFFFFF]">0.00 Seconds</strong>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedModule === 'liquidity' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="border-b border-[#222222] pb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold font-serif text-[#FFFFFF]">Liquidity Intelligence & FX Protection</h3>
                    <span className="text-[10px] font-mono text-[#34D399] font-bold">OPTIMAL BUFFERS</span>
                  </div>
                  <p className="text-xs text-[#A7A7A7] leading-relaxed">
                    Predictive liquidity routing prevents market congestion and ensures instant settlement without requiring excess collateral reserves.
                  </p>
                  <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222] space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">Interbank Liquidity Ratio:</span>
                      <strong className="text-[#C8A64D]">148% of Minimum Reserve</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">Slippage Guardrail:</span>
                      <strong className="text-[#34D399]">Active (&lt; 0.01%)</strong>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedModule === 'corridors' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="border-b border-[#222222] pb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold font-serif text-[#FFFFFF]">Regional EAC Payment Corridors</h3>
                    <span className="text-[10px] font-mono text-[#34D399] font-bold">CROSS-BORDER ACTIVE</span>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3.5 bg-[#141414] rounded-xl border border-[#222222] flex justify-between items-center">
                      <span>Uganda ↔ Kenya Corridor</span>
                      <strong className="text-[#34D399]">Settlement: 1.2s • Fee: -64%</strong>
                    </div>
                    <div className="p-3.5 bg-[#141414] rounded-xl border border-[#222222] flex justify-between items-center">
                      <span>Uganda ↔ Tanzania Corridor</span>
                      <strong className="text-[#34D399]">Settlement: 1.8s • Fee: -58%</strong>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedModule === 'explainability' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="border-b border-[#222222] pb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold font-serif text-[#FFFFFF]">AI Decision Explainability Engine</h3>
                    <span className="text-[10px] font-mono text-[#34D399] font-bold">NO BLACK BOX LOGIC</span>
                  </div>
                  <p className="text-xs text-[#A7A7A7] leading-relaxed">
                    Every AI decision is bound by deterministic mathematical rule engines compliant with Bank of Uganda National Payment Systems Regulations.
                  </p>
                  <div className="p-4 bg-[#141414] rounded-2xl border border-[#34D399]/30 space-y-2 text-xs font-mono">
                    <span className="text-[10px] text-[#34D399] font-bold uppercase block">POLICY AUDIT PASS:</span>
                    <p className="text-[#FFFFFF]">
                      "Rule #402 (Anti-Slippage & Regulatory Sanctions Check) verified prior to route selection."
                    </p>
                  </div>
                </motion.div>
              )}

            </div>

          </div>

        </motion.div>
      )}

    </div>
  );
}
