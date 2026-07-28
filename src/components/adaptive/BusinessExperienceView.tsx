import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MeherahIntelligencePanel } from './MeherahIntelligencePanel';
import { MeherahOrchestrationAudit } from './MeherahOrchestrationAudit';
import { Building2, DollarSign, TrendingUp, Users, AlertTriangle, CheckCircle2, ArrowUpRight, Clock, FileText, Send, Sparkles, Activity } from 'lucide-react';

export function BusinessExperienceView() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const triggerAction = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4">
      
      {/* BUSINESS HEADER & CASH POSITION HERO */}
      <div className="p-8 bg-gradient-to-r from-[#0F0F0F] via-[#14120B] to-[#0F0F0F] border-2 border-[#C8A64D]/40 rounded-3xl space-y-6 shadow-[0_0_35px_rgba(200,166,77,0.1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#080808] rounded-[14px] flex items-center justify-center text-[#60A5FA]">
                <Building2 size={24} />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#60A5FA] uppercase font-bold block">
                BUSINESS CASH FLOW & TREASURY
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#FFFFFF]">
                Kampala Wholesale & Logistics Ltd
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#111111] border border-[#333333] rounded-2xl text-center">
              <span className="text-[10px] font-mono text-[#777777] block">BUSINESS HEALTH SCORE</span>
              <span className="text-lg font-bold font-mono text-[#00B86B]">94 / 100 (EXCELLENT)</span>
            </div>
          </div>
        </div>

        {/* 4 CORE CASH STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#080808] border border-[#C8A64D]/30 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-[#777777] uppercase block">TODAY'S CASH POSITION</span>
            <strong className="text-2xl font-bold font-mono text-[#E5C76B]">UGX 42,500,000</strong>
            <span className="text-[10px] text-[#00B86B] font-mono block">▲ +14% vs last week</span>
          </div>

          <div className="p-4 bg-[#080808] border border-[#222222] rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-[#777777] uppercase block">UPCOMING SUPPLIERS</span>
            <strong className="text-2xl font-bold font-mono text-[#FFFFFF]">UGX 3,200,000</strong>
            <span className="text-[10px] text-[#A7A7A7] font-mono block">Due tomorrow (Supplier A)</span>
          </div>

          <div className="p-4 bg-[#080808] border border-[#222222] rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-[#777777] uppercase block">PENDING COLLECTIONS</span>
            <strong className="text-2xl font-bold font-mono text-[#60A5FA]">UGX 8,400,000</strong>
            <span className="text-[10px] text-[#60A5FA] font-mono block">4 Client Invoices Out</span>
          </div>

          <div className="p-4 bg-[#080808] border border-[#222222] rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-[#777777] uppercase block">PAYROLL STATUS</span>
            <strong className="text-2xl font-bold font-mono text-[#FFFFFF]">24 Employees</strong>
            <span className="text-[10px] text-[#00B86B] font-mono block">Scheduled for Friday</span>
          </div>
        </div>
      </div>

      {/* NOTIFICATION FEEDBACK TOAST */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#00B86B]/15 border border-[#00B86B] rounded-2xl text-xs font-mono text-[#00B86B] flex items-center gap-2 shadow-lg"
        >
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </motion.div>
      )}

      {/* FULL END-TO-END ORCHESTRATION AUDIT SECTION */}
      <MeherahOrchestrationAudit />

      {/* TREASURY INSIGHTS CARD & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* TREASURY RECOMMENDATION (LEFT 7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          <MeherahIntelligencePanel />

          <div className="p-6 bg-[#0E0E0E] border-2 border-[#C8A64D] rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <span className="text-xs font-mono font-bold text-[#E5C76B] uppercase flex items-center gap-1.5">
                <Sparkles size={16} className="text-[#C8A64D]" /> PREDICTIVE TREASURY RECOMMENDATION
              </span>
              <span className="text-[10px] font-mono text-[#00B86B] bg-[#00B86B]/10 px-2.5 py-0.5 rounded-md font-bold">
                AI ACTIVE
              </span>
            </div>

            <div className="p-4 bg-[#141414] border border-[#C8A64D]/30 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                <AlertTriangle size={14} />
                <span>CASH FLOW FORECAST NOTICE</span>
              </div>
              <p className="text-sm font-serif text-[#FFFFFF] leading-relaxed">
                "Cash flow may become tight next Tuesday due to overlapping VAT returns and Supplier B payouts."
              </p>
              <div className="p-3 bg-[#080808] rounded-xl border border-[#C8A64D]/20 text-xs text-[#E5C76B] font-sans">
                <strong>Recommended Action:</strong> Consider delaying Supplier B payment (UGX 1,800,000) until Friday when customer collection #INV-940 clears.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => triggerAction("Supplier B payment scheduled for Friday after client collection.")}
                className="px-5 py-2.5 bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] font-bold text-xs font-mono rounded-xl transition-all"
              >
                Apply Recommendation
              </button>
              <button
                onClick={() => triggerAction("Treasury simulation opened.")}
                className="px-5 py-2.5 bg-[#141414] hover:bg-[#1F1F1F] text-[#A7A7A7] hover:text-[#FFFFFF] border border-[#333333] font-bold text-xs font-mono rounded-xl transition-all"
              >
                Simulate Cash Flow
              </button>
            </div>
          </div>

          {/* UPCOMING SUPPLIER PAYMENTS TABLE */}
          <div className="p-6 bg-[#0E0E0E] border border-[#222222] rounded-3xl space-y-4">
            <h3 className="text-sm font-bold font-serif text-[#FFFFFF] border-b border-[#222222] pb-2 flex items-center justify-between">
              <span>Upcoming Supplier Commitments</span>
              <span className="text-[10px] font-mono text-[#A7A7A7]">3 PENDING</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {[
                { name: "Supplier A (Grain Mills)", amount: "UGX 3,200,000", due: "Tomorrow", status: "Ready for Release" },
                { name: "Supplier B (Packaging)", amount: "UGX 1,800,000", due: "Next Tuesday", status: "Suggested Postpone" },
                { name: "Mukwano Logistics Rail", amount: "UGX 950,000", due: "Friday", status: "Approved" }
              ].map((s, idx) => (
                <div key={idx} className="p-3.5 bg-[#141414] border border-[#222222] rounded-2xl flex items-center justify-between">
                  <div>
                    <strong className="text-[#FFFFFF] block font-sans text-xs">{s.name}</strong>
                    <span className="text-[10px] text-[#777777]">Due: {s.due} • {s.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#E5C76B] block">{s.amount}</span>
                    <button
                      onClick={() => triggerAction(`Payment for ${s.name} executed.`)}
                      className="text-[10px] text-[#60A5FA] hover:underline font-bold mt-1 inline-block"
                    >
                      Release Payment →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* QUICK ACTIONS & PAYROLL (RIGHT 5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* QUICK ACTIONS GRID */}
          <div className="p-6 bg-[#0E0E0E] border border-[#222222] rounded-3xl space-y-4">
            <h3 className="text-sm font-bold font-serif text-[#FFFFFF] border-b border-[#222222] pb-2">
              Business Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <button
                onClick={() => triggerAction("Payment batch wizard opened.")}
                className="p-4 bg-[#141414] hover:bg-[#1C1C1C] border border-[#333333] hover:border-[#60A5FA] rounded-2xl text-left space-y-2 transition-all group"
              >
                <Send size={18} className="text-[#60A5FA]" />
                <span className="font-bold text-[#FFFFFF] block group-hover:text-[#60A5FA]">Send Payments</span>
              </button>

              <button
                onClick={() => triggerAction("Payroll batch for 24 staff approved.")}
                className="p-4 bg-[#141414] hover:bg-[#1C1C1C] border border-[#333333] hover:border-[#00B86B] rounded-2xl text-left space-y-2 transition-all group"
              >
                <Users size={18} className="text-[#00B86B]" />
                <span className="font-bold text-[#FFFFFF] block group-hover:text-[#00B86B]">Approve Payroll</span>
              </button>

              <button
                onClick={() => triggerAction("Generated URA-compliant tax and audit report.")}
                className="p-4 bg-[#141414] hover:bg-[#1C1C1C] border border-[#333333] hover:border-[#C8A64D] rounded-2xl text-left space-y-2 transition-all group"
              >
                <FileText size={18} className="text-[#C8A64D]" />
                <span className="font-bold text-[#FFFFFF] block group-hover:text-[#C8A64D]">View Reports</span>
              </button>

              <button
                onClick={() => triggerAction("MEHERAH Business Intelligence Assistant active.")}
                className="p-4 bg-[#141414] hover:bg-[#1C1C1C] border border-[#333333] hover:border-[#E5C76B] rounded-2xl text-left space-y-2 transition-all group"
              >
                <Sparkles size={18} className="text-[#E5C76B]" />
                <span className="font-bold text-[#FFFFFF] block group-hover:text-[#E5C76B]">Ask MEHERAH</span>
              </button>
            </div>
          </div>

          {/* PAYROLL SUMMARY CARD */}
          <div className="p-6 bg-[#0E0E0E] border border-[#00B86B]/30 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-2">
              <span className="text-xs font-mono font-bold text-[#00B86B] uppercase">FRIDAY PAYROLL RUN</span>
              <Clock size={16} className="text-[#00B86B]" />
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[#A7A7A7]">
                <span>Total Employees:</span>
                <strong className="text-[#FFFFFF]">24 Staff</strong>
              </div>
              <div className="flex justify-between text-[#A7A7A7]">
                <span>Net Outflow:</span>
                <strong className="text-[#00B86B] font-bold">UGX 14,800,000</strong>
              </div>
              <div className="flex justify-between text-[#A7A7A7]">
                <span>Verification Status:</span>
                <strong className="text-[#00B86B]">ISO 20022 Ready</strong>
              </div>
            </div>

            <button
              onClick={() => triggerAction("Friday payroll pre-authorized for instant mobile disbursement.")}
              className="w-full py-2.5 bg-[#00B86B] hover:bg-[#059669] text-[#080808] font-bold text-xs font-mono rounded-xl transition-all"
            >
              Pre-Authorize Payroll Batch
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
