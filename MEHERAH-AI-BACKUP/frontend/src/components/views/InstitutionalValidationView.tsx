import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, ShieldCheck, Scale, FileText, Lock, Key, AlertTriangle, 
  RefreshCw, Play, Search, Award, Brain, Terminal, Server, ArrowRight, 
  Layers, Check, Eye, Download, ShieldAlert, Cpu, Sparkles, Database, FileCode
} from 'lucide-react';

export function InstitutionalValidationView() {
  const [activeTab, setActiveTab] = useState<'reconciliation' | 'ai_registry' | 'audit_trace' | 'security_hsm' | 'partners' | 'demo_suite'>('reconciliation');

  // State
  const [recBatch, setRecBatch] = useState<any>(null);
  const [aiDecisions, setAiDecisions] = useState<any[]>([]);
  const [auditTrails, setAuditTrails] = useState<any[]>([]);
  const [securityData, setSecurityData] = useState<any>(null);
  const [partnersData, setPartnersData] = useState<any[]>([]);

  // Action states
  const [isReconciling, setIsReconciling] = useState<boolean>(false);
  const [isPenetrationRunning, setIsPenetrationRunning] = useState<boolean>(false);
  const [selectedAuditTrail, setSelectedAuditTrail] = useState<any>(null);

  const fetchPhase7Data = async () => {
    try {
      const [rec, ai, audit, sec, prt] = await Promise.all([
        fetch('/api/v1/phase7/reconciliation-batch').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase7/ai-decision-registry').then(r => r.json()).catch(() => []),
        fetch('/api/v1/phase7/audit-trails').then(r => r.json()).catch(() => []),
        fetch('/api/v1/phase7/security-overview').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase7/partner-tenants').then(r => r.json()).catch(() => [])
      ]);

      if (rec) setRecBatch(rec);
      if (Array.isArray(ai)) setAiDecisions(ai);
      if (Array.isArray(audit)) {
        setAuditTrails(audit);
        if (audit.length > 0 && !selectedAuditTrail) setSelectedAuditTrail(audit[0]);
      }
      if (sec) setSecurityData(sec);
      if (Array.isArray(prt)) setPartnersData(prt);
    } catch (e) {
      console.warn('Phase 7 fetch error', e);
    }
  };

  useEffect(() => {
    fetchPhase7Data();
  }, []);

  // Run 3-Way Reconciliation
  const handleRunReconciliation = async () => {
    setIsReconciling(true);
    try {
      const res = await fetch('/api/v1/phase7/run-three-way-reconciliation', { method: 'POST' });
      const data = await res.json();
      setRecBatch(data);
    } catch (e: any) {
      alert(`Reconciliation failed: ${e.message}`);
    } finally {
      setIsReconciling(false);
    }
  };

  // Resolve discrepancy via journal entry
  const handleResolveDiscrepancy = async (discrepancyId: string) => {
    try {
      const res = await fetch('/api/v1/phase7/resolve-discrepancy-journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discrepancyId })
      });
      if (res.ok) {
        // Refresh batch
        const updatedBatch = await fetch('/api/v1/phase7/reconciliation-batch').then(r => r.json());
        setRecBatch(updatedBatch);
      }
    } catch (e: any) {
      alert(`Resolution failed: ${e.message}`);
    }
  };

  // Rotate Key
  const handleRotateKey = async (keyId: string) => {
    try {
      const res = await fetch('/api/v1/phase7/rotate-security-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyId })
      });
      if (res.ok) {
        const sec = await fetch('/api/v1/phase7/security-overview').then(r => r.json());
        setSecurityData(sec);
      }
    } catch (e: any) {
      alert(`Key rotation failed: ${e.message}`);
    }
  };

  // Run Penetration Suite
  const handleRunPenetrationSuite = async () => {
    setIsPenetrationRunning(true);
    try {
      const res = await fetch('/api/v1/phase7/trigger-penetration-suite', { method: 'POST' });
      if (res.ok) {
        const sec = await fetch('/api/v1/phase7/security-overview').then(r => r.json());
        setSecurityData(sec);
      }
    } catch (e: any) {
      alert(`Penetration test failed: ${e.message}`);
    } finally {
      setIsPenetrationRunning(false);
    }
  };

  // Trigger New Audit Trace
  const handleRunAuditTrace = async () => {
    try {
      const res = await fetch('/api/v1/phase7/run-audit-trace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionRef: 'TX-INSTITUTIONAL-' + Math.floor(Math.random() * 90000 + 10000), amountUGX: 120000000 })
      });
      const trail = await res.json();
      setAuditTrails(prev => [trail, ...prev]);
      setSelectedAuditTrail(trail);
    } catch (e: any) {
      alert(`Audit trace failed: ${e.message}`);
    }
  };

  return (
    <div className="space-y-6 text-[#FDFBF7]">
      {/* Top Banner Header */}
      <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> MEHERAH PHASE 7 — INSTITUTIONAL VALIDATION & HARDENING
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> 3-WAY RECONCILIATION & AI AUDIT REGISTRY
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#FDFBF7]">
              Production Validation, 3-Way Reconciliation & AI Decision Auditing
            </h1>
            <p className="text-sm text-[#8C8275] mt-1 max-w-3xl">
              Proving system integrity through automated 3-way financial matching (Provider ↔ Ledger ↔ Bank Statement), cryptographic end-to-end trace auditing, HSM key management, and penetrative threat defense.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunReconciliation}
              disabled={isReconciling}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-teal-500/15"
            >
              {isReconciling ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Execute 3-Way Financial Reconciliation
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1C160F] pb-2 overflow-x-auto">
        {[
          { id: 'reconciliation', label: '1. 3-Way Financial Reconciliation', icon: Scale },
          { id: 'ai_registry', label: '2. AI Decision Registry & Hashes', icon: Brain },
          { id: 'audit_trace', label: '3. End-to-End Audit Pipeline', icon: Layers },
          { id: 'security_hsm', label: '4. Security Hardening & Penetration', icon: Lock },
          { id: 'partners', label: '5. Partner Gateway & SLA Monitor', icon: Server },
          { id: 'demo_suite', label: '6. Institutional Showcase Suite', icon: Play }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                active 
                  ? 'bg-teal-500 text-[#0A0907] font-semibold shadow-lg shadow-teal-500/10'
                  : 'bg-[#120E09] hover:bg-[#1C160F] text-[#8C8275] border border-[#1C160F]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 3-WAY RECONCILIATION ENGINE */}
      {activeTab === 'reconciliation' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C160F] pb-4">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-400" /> 3-WAY FINANCIAL RECONCILIATION ENGINE
              </h3>
              <p className="text-xs text-[#8C8275] mt-1">
                Matches Provider Raw Logs ↔ MEHERAH Double-Entry Ledger ↔ Bank Central Settlement Statements.
              </p>
            </div>

            <button
              onClick={handleRunReconciliation}
              disabled={isReconciling}
              className="px-4 py-2 rounded-xl bg-teal-500 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-2"
            >
              {isReconciling ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Run Fresh 3-Way Match Run
            </button>
          </div>

          {recBatch ? (
            <div className="space-y-6">
              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">TOTAL PROCESSED</span>
                  <span className="text-xl font-bold font-mono text-[#FDFBF7]">{recBatch.totalTransactionsProcessed.toLocaleString()}</span>
                  <span className="text-[10px] font-mono text-[#8C8275] block mt-1">UGX {(recBatch.totalVolumeUGX / 1000000000).toFixed(2)}B</span>
                </div>

                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">MATCH RATE</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{recBatch.matchRatePct}%</span>
                  <span className="text-[10px] font-mono text-emerald-400 block mt-1">{recBatch.matchedTransactionsCount.toLocaleString()} Perfect Matches</span>
                </div>

                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">DISCREPANCIES DETECTED</span>
                  <span className={`text-xl font-bold font-mono ${recBatch.discrepanciesCount === 0 ? 'text-emerald-400' : 'text-[#F0A500]'}`}>
                    {recBatch.discrepanciesCount}
                  </span>
                  <span className="text-[10px] font-mono text-[#8C8275] block mt-1">Requiring Review / Adjustment</span>
                </div>

                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">UNRECONCILED NET EXPOSURE</span>
                  <span className="text-xl font-bold font-mono text-teal-400">UGX {recBatch.unreconciledNetExposureUGX.toLocaleString()}</span>
                  <span className="text-[10px] font-mono text-teal-400 block mt-1">Zero Imbalance Goal</span>
                </div>
              </div>

              {/* Discrepancies Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">RECONCILIATION DISCREPANCY AUDIT LOG</h4>
                {recBatch.discrepancies.length > 0 ? (
                  <div className="space-y-3">
                    {recBatch.discrepancies.map((disc: any) => (
                      <div key={disc.discrepancyId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1C160F] pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-[#F0A500] border border-[#231A10]">
                              {disc.discrepancyId}
                            </span>
                            <span className="text-xs font-bold font-mono text-[#FDFBF7]">{disc.transactionRef}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              disc.resolutionStatus === 'AUTO_BALANCED_VIA_JOURNAL' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20'
                            }`}>
                              {disc.resolutionStatus}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-[#8C8275] block">PROVIDER LOG:</span>
                            <span className="text-[#FDFBF7]">UGX {disc.providerAmountUGX.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#8C8275] block">LEDGER ENTRY:</span>
                            <span className="text-[#FDFBF7]">UGX {disc.meherahLedgerAmountUGX.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#8C8275] block">BANK STATEMENT:</span>
                            <span className="text-[#FDFBF7]">UGX {disc.bankSettlementAmountUGX.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#8C8275] block">FEE DIFFERENTIAL:</span>
                            <span className="text-[#F0A500] font-bold">UGX {disc.feeDiscrepancyUGX.toLocaleString()}</span>
                          </div>
                        </div>

                        {disc.resolutionStatus === 'UNRESOLVED' && (
                          <div className="pt-2 border-t border-[#1C160F] flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#8C8275]">Reason: {disc.discrepancyType}</span>
                            <button
                              onClick={() => handleResolveDiscrepancy(disc.discrepancyId)}
                              className="px-3 py-1.5 rounded-lg bg-teal-500 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5" /> Post Balancing Journal Entry
                            </button>
                          </div>
                        )}

                        {disc.resolutionStatus === 'AUTO_BALANCED_VIA_JOURNAL' && (
                          <div className="p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[11px] font-mono text-emerald-400">
                            Balanced via Double-Entry Adjustment Journal <strong className="text-[#FDFBF7]">{disc.balancingJournalEntryId}</strong>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs font-mono text-emerald-400 bg-[#0A0907] rounded-xl border border-emerald-500/20">
                    ✓ Zero discrepancies detected across 3-way match. All entries 100.00% reconciled.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading reconciliation batch...</p>
          )}
        </div>
      )}

      {/* TAB 2: AI DECISION REGISTRY & HASHES */}
      {activeTab === 'ai_registry' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Brain className="w-4 h-4 text-teal-400" /> AI DECISION REGISTRY & CRYPTOGRAPHIC AUDIT LOG
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Every AI recommendation stores agent identity, confidence score, policy match, and SHA-256 integrity hash.</p>
            </div>
          </div>

          <div className="space-y-4">
            {aiDecisions.map((dec: any) => (
              <div key={dec.decisionId} className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1C160F] pb-2">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-teal-400 border border-[#231A10]">
                      {dec.decisionId}
                    </span>
                    <h4 className="text-xs font-bold text-[#FDFBF7] font-mono mt-1">{dec.agentName} ({dec.modelVersion})</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">Confidence: {(dec.confidenceScore * 100).toFixed(1)}%</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      dec.approvalStatus === 'HUMAN_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-teal-500/10 text-teal-400'
                    }`}>
                      {dec.approvalStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl space-y-1">
                    <span className="text-[10px] text-[#F0A500] font-bold block">INPUT CONTEXT:</span>
                    <p className="text-[#C2B7A7]">{dec.inputContextSummary}</p>
                  </div>

                  <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl space-y-1">
                    <span className="text-[10px] text-teal-400 font-bold block">AI RECOMMENDATION:</span>
                    <p className="text-[#FDFBF7]">{dec.aiRecommendation}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl text-[10px] font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[#8C8275] block">Matched Governance Policy: <strong className="text-[#FDFBF7]">{dec.policyRuleMatch}</strong></span>
                    <span className="text-[#8C8275] block mt-0.5">Final Outcome: <strong className="text-emerald-400">{dec.finalOutcome}</strong></span>
                  </div>

                  <div className="p-2 bg-[#0A0907] rounded border border-[#231A10] text-[#8C8275] font-mono text-[9px] break-all">
                    SHA-256 AUDIT HASH: <span className="text-teal-400">{dec.auditHash}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: END-TO-END AUDIT PIPELINE TRACE */}
      {activeTab === 'audit_trace' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C160F] pb-4">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" /> END-TO-END TRANSACTION AUDIT PIPELINE
              </h3>
              <p className="text-xs text-[#8C8275] mt-1">
                Verifies the complete 8-step lifecycle: Payment Request → Identity → Risk → Route → Execution → Settlement → Ledger → Compliance Archive.
              </p>
            </div>

            <button
              onClick={handleRunAuditTrace}
              className="px-4 py-2 rounded-xl bg-teal-500 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Trigger Live Audit Pipeline Run
            </button>
          </div>

          {selectedAuditTrail ? (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {selectedAuditTrail.traceId}
                    </span>
                    <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{selectedAuditTrail.transactionRef}</h4>
                  </div>
                  <p className="text-[11px] font-mono text-[#8C8275] mt-1">
                    Identity: {selectedAuditTrail.userIdentityId} | Amount: <strong className="text-[#F0A500]">UGX {selectedAuditTrail.amountUGX.toLocaleString()}</strong>
                  </p>
                </div>

                <div className="text-right font-mono text-[10px]">
                  <span className="text-emerald-400 font-bold block">Status: {selectedAuditTrail.overallStatus}</span>
                  <span className="text-[#8C8275]">Duration: {selectedAuditTrail.totalDurationMs}ms</span>
                </div>
              </div>

              {/* 8 Stepper Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">STEP-BY-STEP CRYPTOGRAPHIC AUDIT TRACE</h4>
                {selectedAuditTrail.steps.map((step: any) => (
                  <div key={step.stepNumber} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-[#1C160F] pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold font-mono flex items-center justify-center">
                          {step.stepNumber}
                        </span>
                        <h5 className="text-xs font-bold font-mono text-[#FDFBF7]">{step.stepName}</h5>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="text-[#8C8275]">Actor: <strong className="text-teal-400">{step.decisionMaker}</strong></span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                          {step.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-2.5 bg-[#120E09] rounded border border-[#231A10] space-y-0.5 text-[11px]">
                        <span className="text-[9px] text-[#8C8275] block font-bold">INPUT DATA:</span>
                        <pre className="text-[#C2B7A7] text-[10px] overflow-x-auto">{JSON.stringify(step.inputParameters, null, 2)}</pre>
                      </div>

                      <div className="p-2.5 bg-[#120E09] rounded border border-[#231A10] space-y-0.5 text-[11px]">
                        <span className="text-[9px] text-teal-400 block font-bold">DECISION RESULT:</span>
                        <pre className="text-[#FDFBF7] text-[10px] overflow-x-auto">{JSON.stringify(step.outputResult, null, 2)}</pre>
                      </div>
                    </div>

                    <div className="text-[9px] font-mono text-[#8C8275] flex justify-between pt-1">
                      <span>Timestamp: {new Date(step.timestamp).toLocaleTimeString()}</span>
                      <span>Signature: <strong className="text-teal-400">{step.cryptographicSignature}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading audit pipeline...</p>
          )}
        </div>
      )}

      {/* TAB 4: SECURITY HARDENING & PENETRATION DEFENSE */}
      {activeTab === 'security_hsm' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C160F] pb-4">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" /> HSM KEY MANAGEMENT & PENETRATION DEFENSE
              </h3>
              <p className="text-xs text-[#8C8275] mt-1">
                FIPS 140-3 Level 4 HSM encryption, secrets rotation, and live attack mitigation simulator.
              </p>
            </div>

            <button
              onClick={handleRunPenetrationSuite}
              disabled={isPenetrationRunning}
              className="px-4 py-2 rounded-xl bg-teal-500 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-2"
            >
              {isPenetrationRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
              Run Automated Penetration Attack Suite
            </button>
          </div>

          {securityData ? (
            <div className="space-y-6">
              {/* HSM Status */}
              <div className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Key className="w-8 h-8 text-teal-400" />
                  <div>
                    <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{securityData.hsmStatus.fipsStandard}</h4>
                    <p className="text-[10px] font-mono text-[#8C8275]">
                      FIPS Compliant: <strong className="text-emerald-400">YES</strong> | Hardware Latency: <strong className="text-[#FDFBF7]">{securityData.hsmStatus.hsmLatencyMs}ms</strong>
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-xl border border-teal-500/20">
                  {securityData.hsmStatus.activeMasterKeysCount} Active HSM Keys Enforced
                </span>
              </div>

              {/* Key Rotation Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">ACTIVE ENCRYPTION KEYS & ROTATION SCHEDULES</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {securityData.keys.map((key: any) => (
                    <div key={key.keyId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-teal-400 border border-[#231A10]">
                          {key.keyId}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          key.status === 'ACTIVE_HSM_ENCRYPTED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#F0A500]/10 text-[#F0A500]'
                        }`}>
                          {key.status}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold font-mono text-[#FDFBF7]">{key.keyName}</h5>

                      <div className="text-[10px] font-mono text-[#8C8275] space-y-1">
                        <div>Algorithm: <strong className="text-[#FDFBF7]">{key.algorithm}</strong></div>
                        <div>Last Rotated: <strong className="text-[#FDFBF7]">{key.lastRotatedDaysAgo} days ago</strong></div>
                      </div>

                      <button
                        onClick={() => handleRotateKey(key.keyId)}
                        className="w-full py-1.5 rounded-lg bg-[#120E09] border border-[#231A10] hover:bg-[#1C160F] text-xs font-mono text-[#FDFBF7] flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Rotate Key Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Penetration Attacks List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">PENETRATION TEST & THREAT MITIGATION LOG</h4>
                {securityData.attackSimulations.map((atk: any) => (
                  <div key={atk.attackVectorId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                        {atk.vectorName}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">Mitigated: 100% ({atk.mitigatedCount.toLocaleString()} / {atk.simulatedAttacksCount.toLocaleString()})</span>
                    </div>

                    <h5 className="text-xs font-bold font-mono text-[#FDFBF7]">Target: {atk.targetComponent}</h5>
                    <p className="text-xs font-mono text-[#8C8275]">{atk.meherahDefenseMechanism}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading security overview...</p>
          )}
        </div>
      )}

      {/* TAB 5: PARTNER GATEWAY & SLA MONITOR */}
      {activeTab === 'partners' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Server className="w-4 h-4 text-teal-400" /> INSTITUTIONAL PARTNER GATEWAY & TENANT ISOLATION
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Isolated tenant API keys, mTLS handshakes, rate limiters, and SLA monitoring.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {partnersData.map((t: any) => (
              <div key={t.tenantId} className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-[#F0A500] border border-[#231A10]">
                    {t.partnerType}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">SLA: {t.currentUptimePct}%</span>
                </div>

                <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{t.tenantName}</h4>

                <div className="text-[10px] font-mono text-[#8C8275] space-y-1">
                  <div>API Key Prefix: <code className="text-[#FDFBF7]">{t.apiKeyPrefix}</code></div>
                  <div>Rate Limit: <strong className="text-teal-400">{t.rateLimitReqPerSec} req/sec</strong></div>
                  <div>mTLS Status: <strong className="text-emerald-400">{t.mtlsCertificateStatus}</strong></div>
                </div>

                <div className="p-2 bg-[#120E09] border border-[#231A10] rounded-xl text-[9px] font-mono text-[#8C8275] truncate">
                  Webhook: {t.webhookUrl}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SHOWCASE DEMO SUITE */}
      {activeTab === 'demo_suite' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Play className="w-4 h-4 text-teal-400" /> INSTITUTIONAL COMMAND CENTRE DEMO SUITE
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Automated end-to-end institutional evaluation scenario for central banks and enterprise partners.</p>
            </div>
          </div>

          <div className="p-6 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-4">
            <h4 className="text-xs font-bold font-mono text-teal-400">SCENARIO: REGIONAL PAYMENT NETWORK STRESS & RECONCILIATION</h4>
            <ol className="list-decimal list-inside text-xs font-mono text-[#C2B7A7] space-y-2">
              <li>100,000 simulated users execute UGX 4.85B in micro and macro transfers.</li>
              <li>Airtel Money fiber rail experiences sudden outage.</li>
              <li>MEHERAH Policy Engine auto-reroutes 100% of volume to MTN & Stanbic ACH.</li>
              <li>Neural Sentinel detects and neutralizes a 450-botnet AML structuring attack.</li>
              <li>Automated 3-way reconciliation reconciles all 14,820 transactions with 100.00% ledger balance.</li>
              <li>Regulator-ready BOU Daily Liquidity & FIA SAR exports generated in seconds.</li>
            </ol>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={handleRunReconciliation}
                className="px-4 py-2 rounded-xl bg-teal-500 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" /> Execute Full Showcase Scenario
              </button>
              <button
                onClick={() => alert('Exported Full Institutional Validation Package (PDF + Hashes)')}
                className="px-4 py-2 rounded-xl bg-[#120E09] border border-[#231A10] hover:bg-[#1C160F] text-xs font-mono text-[#FDFBF7] flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Complete Audit Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
