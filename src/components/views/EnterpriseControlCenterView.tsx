import React, { useState } from 'react';
import { Shield, ShieldAlert, Users, Key, Landmark, ClipboardList, Activity } from 'lucide-react';

export const EnterpriseControlCenterView: React.FC = () => {
  const [governanceMode, setGovernanceMode] = useState('STANDARD');

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#FDFBF7] p-6 font-sans">
      {/* ENTERPRISE TITLE BANNER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-[#1C1A17] pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#D37506] uppercase bg-[#231406] px-2.5 py-1 rounded border border-[#462302]">
            MEHERAH ENTERPRISE CONTROL PLANE v1.0
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-[#FDFBF7] mt-3">Sovereign Governance Desk</h1>
        </div>
        <div className="flex items-center gap-4 bg-[#121110] border border-[#23201D] p-3 rounded-2xl">
          <Activity size={16} className="text-[#10B981] animate-pulse" />
          <div className="text-xs">
            <p className="text-[#8A8477] font-medium">Compliance Node</p>
            <p className="text-[#FDFBF7] font-bold font-mono">AUDIT_LEDGER_ONLINE</p>
          </div>
        </div>
      </div>

      {/* SYSTEM GOVERNANCE TELEMETRY STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Organizations', val: '12', color: 'text-[#FDFBF7]' },
          { label: 'Active Users', val: '250', color: 'text-[#FDFBF7]' },
          { label: 'AI Agents', val: '8', color: 'text-[#D37506]' },
          { label: 'Security Status', val: 'ACTIVE', color: 'text-[#10B981]' },
          { label: 'API Keys', val: 'PROTECTED', color: 'text-[#FDFBF7]' },
          { label: 'Audit Events', val: 'LIVE CHAIN', color: 'text-[#D37506]' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#121110]/90 border border-[#1E1C1A] rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-[#8A8477] uppercase tracking-wider block">{stat.label}</span>
            <span className={`text-lg font-bold tracking-tight mt-2 block ${stat.color}`}>{stat.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COMPONENT 1: USERS & ORGANIZATIONS LISTING PANEL */}
        <div className="bg-[#121110]/50 backdrop-blur-xl border border-[#1E1C1A] rounded-3xl p-6 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8A8477] flex items-center gap-2">
            <Users size={16} className="text-[#D37506]" /> Tenants & Operators
          </h3>
          <div className="space-y-3.5">
            {[
              { desc: 'Pearl Bank Node', detail: 'BANK_ADMIN • Active', role: 'bg-[#152319] text-[#10B981]' },
              { desc: 'Ministry Ledger Devs', detail: 'SYSTEM_OPERATOR • Active', role: 'bg-[#121E2C] text-[#3B82F6]' },
              { desc: 'Strategic Finance Unit', detail: 'ANALYST • Active', role: 'bg-[#1C1A12] text-[#F59E0B]' }
            ].map((node, i) => (
              <div key={i} className="bg-[#171614] border border-[#23211E] rounded-xl p-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold text-[#FDFBF7]">{node.desc}</p>
                  <p className="text-xs text-[#8A8477] mt-0.5">{node.detail}</p>
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${node.role}`}>SECURE</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPONENT 2: AGENT PERMISSION INTERCEPTOR CONTROL */}
        <div className="bg-[#121110]/50 backdrop-blur-xl border border-[#1E1C1A] rounded-3xl p-6 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8A8477] flex items-center gap-2">
            <Shield size={16} className="text-[#D37506]" /> Agentic Swarm Interceptors
          </h3>
          <div className="space-y-4">
            <div className="bg-[#171614] border border-[#23211E] p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#E6E1D6]">Finance Agent Boundary</span>
                <span className="text-[#10B981]">ENFORCED</span>
              </div>
              <p className="text-[11px] text-[#8A8477]">Calculate & view liquidity routes OK. Direct transactional settlement execution without approval blocks BLOCKED.</p>
            </div>
            <div className="bg-[#171614] border border-[#23211E] p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#E6E1D6]">Chief Agent Directive</span>
                <span className="text-[#F59E0B]">APPROVAL REQUIRED</span>
              </div>
              <p className="text-[11px] text-[#8A8477]">Sovereign generation of cross-model task dependency graphs OK. External platform server updates require manual system authorization.</p>
            </div>
          </div>
        </div>

        {/* COMPONENT 3: HISTORICAL AUDIT TIMELINE TRACKER */}
        <div className="bg-[#121110]/50 backdrop-blur-xl border border-[#1E1C1A] rounded-3xl p-6 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8A8477] flex items-center gap-2">
            <ClipboardList size={16} className="text-[#D37506]" /> Cryptographic Audit Feed
          </h3>
          <div className="space-y-3 font-mono text-[11px]">
            {[
              { act: 'user.authenticate', hash: 'fb382a10', time: '13:40:12' },
              { act: 'agent.authorized', hash: '4cfa0982', time: '13:41:05' },
              { act: 'finance.route.calculated', hash: '992df01b', time: '13:42:01' }
            ].map((evt, idx) => (
              <div key={idx} className="border-l-2 border-[#D37506] pl-3 py-1 space-y-0.5">
                <div className="flex justify-between text-[#E6E1D6] font-semibold">
                  <span>{evt.act}</span>
                  <span className="text-[#8A8477]">{evt.time}</span>
                </div>
                <p className="text-[#706B60]">HMAC block sequence token pointer: <span className="text-[#D37506]">{evt.hash}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
