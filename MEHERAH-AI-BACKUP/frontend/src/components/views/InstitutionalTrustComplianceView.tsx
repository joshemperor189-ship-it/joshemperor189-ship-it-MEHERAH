import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Landmark, Lock, FileText, Award, Cpu, Brain, Zap, RefreshCw, 
  Users, Activity, Play, AlertTriangle, CheckCircle2, ChevronRight, Download, 
  Layers, ShieldAlert, Sparkles, Server, Eye, FileCode, Check, Scale, Globe
} from 'lucide-react';

export function InstitutionalTrustComplianceView() {
  const [activeTab, setActiveTab] = useState<'macro_sim' | 'governance' | 'regulatory' | 'certification' | 'marketplace' | 'pilot_pack'>('macro_sim');

  // State
  const [govData, setGovData] = useState<any>(null);
  const [regData, setRegData] = useState<any>(null);
  const [certData, setCertData] = useState<any>(null);
  const [marketData, setMarketData] = useState<any>(null);

  // Macro Simulation State
  const [macroSimRunning, setMacroSimRunning] = useState<boolean>(false);
  const [macroSimResult, setMacroSimResult] = useState<any>(null);

  const fetchPhase6State = async () => {
    try {
      const [gov, reg, cert, market] = await Promise.all([
        fetch('/api/v1/phase6/governance-overview').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase6/regulatory-overview').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase6/provider-certifications').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase6/intelligence-marketplace').then(r => r.json()).catch(() => null)
      ]);

      if (gov) setGovData(gov);
      if (reg) setRegData(reg);
      if (cert) setCertData(cert);
      if (market) setMarketData(market);
    } catch (e) {
      console.warn('Phase 6 fetch error', e);
    }
  };

  useEffect(() => {
    fetchPhase6State();
  }, []);

  // Run Macro Simulation
  const handleRunMacroSim = async () => {
    setMacroSimRunning(true);
    try {
      const res = await fetch('/api/v1/phase6/run-macro-digital-economy-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setMacroSimResult(data);
      fetchPhase6State();
    } catch (e: any) {
      alert(`Macro simulation failed: ${e.message}`);
    } finally {
      setMacroSimRunning(false);
    }
  };

  // Approve MultiSig
  const handleApproveMultiSig = async (requestId: string) => {
    try {
      const res = await fetch('/api/v1/phase6/approve-multisig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          approverRole: 'COMPLIANCE_DIRECTOR',
          comments: 'Dual signature verified by Compliance Officer.'
        })
      });
      if (res.ok) {
        fetchPhase6State();
      }
    } catch (e: any) {
      alert(`Approval error: ${e.message}`);
    }
  };

  // Toggle Marketplace Agent
  const handleToggleAgent = async (agentId: string) => {
    try {
      const res = await fetch('/api/v1/phase6/toggle-marketplace-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId })
      });
      const updated = await res.json();
      setMarketData(updated);
    } catch (e: any) {
      alert(`Toggle failed: ${e.message}`);
    }
  };

  // Generate Regulatory Report
  const handleGenerateReport = async (reportType: string) => {
    try {
      const res = await fetch('/api/v1/phase6/generate-regulatory-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType })
      });
      if (res.ok) {
        fetchPhase6State();
      }
    } catch (e: any) {
      alert(`Report generation error: ${e.message}`);
    }
  };

  return (
    <div className="space-y-6 text-[#FDFBF7]">
      {/* Top Banner Header */}
      <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> MEHERAH PHASE 6 — PRODUCTION TRUST & INSTITUTIONAL READINESS
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> REGULATORY COMPLIANCE SUITE ACTIVE
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#FDFBF7]">
              Institutional Governance, Regulatory Intelligence & Digital Economy Control
            </h1>
            <p className="text-sm text-[#8C8275] mt-1 max-w-3xl">
              Equipping MEHERAH for institutional evaluation by central banks and Tier-1 financial institutions through multi-sig governance, real-time AML monitoring, provider certification scorecards, and a 100,000-user macro economy simulation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunMacroSim}
              disabled={macroSimRunning}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/15"
            >
              {macroSimRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              Launch 100k User Macro Economy Sim
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1C160F] pb-2 overflow-x-auto">
        {[
          { id: 'macro_sim', label: '1. "Digital Economy" 100k Macro Sim', icon: Play },
          { id: 'governance', label: '2. Institutional Governance & Multi-Sig', icon: Lock },
          { id: 'regulatory', label: '3. Regulatory Agent & AML Sentinel', icon: ShieldAlert },
          { id: 'certification', label: '4. Provider Certification Scorecards', icon: Award },
          { id: 'marketplace', label: '5. Intelligence Agent Marketplace', icon: Brain },
          { id: 'pilot_pack', label: '6. Institutional Pilot & Audit Package', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                active 
                  ? 'bg-emerald-500 text-[#0A0907] font-semibold shadow-lg shadow-emerald-500/10'
                  : 'bg-[#120E09] hover:bg-[#1C160F] text-[#8C8275] border border-[#1C160F]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MACRO DIGITAL ECONOMY SIMULATION */}
      {activeTab === 'macro_sim' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1C160F] pb-4">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" /> SHOWCASE: MEHERAH CONTROLS A DIGITAL ECONOMY (100,000 USERS)
              </h3>
              <p className="text-xs text-[#8C8275] mt-1">
                Simulates 100,000 users, 20 financial provider rails, UGX 4.85 Billion throughput, fiber outage event, coordinated AML structuring attack, and dual-control treasury rebalancing.
              </p>
            </div>

            <button
              onClick={handleRunMacroSim}
              disabled={macroSimRunning}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-2"
            >
              {macroSimRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              Run 100k Macro Economy Simulation
            </button>
          </div>

          {macroSimResult ? (
            <div className="space-y-6">
              {/* Executive Summary Cards */}
              <div className="p-5 bg-[#0A0907] border border-emerald-500/20 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-mono font-bold text-emerald-400">GEMINI EXECUTIVE REPORT SUMMARY</h4>
                </div>
                <p className="text-xs font-mono text-[#FDFBF7] leading-relaxed">{macroSimResult.geminiExecutiveSummary}</p>
              </div>

              {/* KPI Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">SIMULATED USERS</span>
                  <span className="text-xl font-bold font-mono text-[#FDFBF7]">{macroSimResult.simulatedUserBaseCount.toLocaleString()}</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">TOTAL VOLUME</span>
                  <span className="text-xl font-bold font-mono text-[#F0A500]">UGX {(macroSimResult.totalVolumeProcessedUGX / 1000000000).toFixed(2)} Billion</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">PREVENTED FRAUD LOSSES</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">UGX {(macroSimResult.preventedFraudLossesUGX / 1000000).toFixed(1)} Million</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">SYSTEM AVAILABILITY</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{macroSimResult.systemAvailabilitySlaPct}%</span>
                </div>
              </div>

              {/* Macro Simulation Phases */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-[#8C8275] tracking-wider">SIMULATION PHASES & REAL-TIME SYSTEM ACTIONS</h4>
                {macroSimResult.phases.map((phase: any, idx: number) => (
                  <div key={idx} className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1C160F] pb-2">
                      <h5 className="text-xs font-bold text-[#FDFBF7] font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {phase.phaseName}
                      </h5>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Integrity: {phase.settlementIntegrityPct}%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl space-y-1">
                        <span className="text-[10px] text-[#F0A500] font-bold block">EVENT TRIGGER:</span>
                        <p className="text-[#C2B7A7]">{phase.eventDescription}</p>
                      </div>

                      <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl space-y-1">
                        <span className="text-[10px] text-emerald-400 font-bold block">MEHERAH SYSTEM RESPONSE:</span>
                        <p className="text-[#FDFBF7]">{phase.meherahSystemResponse}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl text-xs font-mono text-[#A19688]">
                      <span className="text-[10px] text-[#F0A500] font-bold block">GEMINI STRATEGIC ADVICE:</span>
                      <p>"{phase.geminiStrategicAdvice}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 border border-dashed border-[#1C160F] rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Globe className="w-10 h-10 text-[#5A544B] animate-pulse" />
              <div>
                <h4 className="text-xs font-mono font-bold text-[#FDFBF7]">100,000-User Macro Economy Simulation Ready</h4>
                <p className="text-xs font-mono text-[#8C8275] max-w-md mt-1">
                  Click "Run 100k Macro Economy Simulation" to observe MEHERAH autonomously route high-volume retail traffic, neutralize an AML botnet attack, and maintain zero fund leakage.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INSTITUTIONAL GOVERNANCE & MULTI-SIG */}
      {activeTab === 'governance' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#F0A500]" /> INSTITUTIONAL GOVERNANCE & DUAL MULTI-SIG APPROVALS
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Role-Based Access Control (RBAC), multi-signature threshold rules, and operator emergency killswitches.</p>
            </div>
          </div>

          {govData ? (
            <div className="space-y-6">
              {/* MultiSig Requests List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">PENDING MULTI-SIGNATURE HIGH-VALUE REQUESTS</h4>
                {govData.multiSigRequests.map((req: any) => (
                  <div key={req.requestId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1C160F] pb-2">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-[#F0A500] border border-[#231A10]">
                          {req.requestId}
                        </span>
                        <h5 className="text-xs font-bold text-[#FDFBF7] font-mono mt-1">{req.title}</h5>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold font-mono text-[#F0A500]">
                          UGX {req.amountUGX.toLocaleString()}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          req.status === 'APPROVED_AND_EXECUTED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#F0A500]/10 text-[#F0A500]'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-[#8C8275] space-y-2">
                      <p>Required Signatures: {req.currentSignatures.length} / {req.requiredSignaturesCount}</p>
                      {req.currentSignatures.map((sig: any, sIdx: number) => (
                        <div key={sIdx} className="p-2 bg-[#120E09] rounded border border-[#231A10] text-[11px] text-[#C2B7A7]">
                          <strong className="text-emerald-400">{sig.role}:</strong> "{sig.comments}"
                        </div>
                      ))}
                    </div>

                    {req.status === 'PENDING_DUAL_APPROVAL' && (
                      <button
                        onClick={() => handleApproveMultiSig(req.requestId)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Authorize Second Dual-Signature
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Roles Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">INSTITUTIONAL ROLES & PERMISSIONS (RBAC)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {govData.roles.map((r: any) => (
                    <div key={r.roleId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold font-mono text-[#FDFBF7]">{r.title}</h5>
                        <span className="text-[10px] font-mono text-[#8C8275]">{r.roleId}</span>
                      </div>
                      <p className="text-[11px] font-mono text-emerald-400">Assigned: {r.assignedUser}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {r.permissions.map((p: string, pIdx: number) => (
                          <span key={pIdx} className="text-[9px] font-mono px-2 py-0.5 bg-[#120E09] border border-[#231A10] text-[#8C8275] rounded">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading governance data...</p>
          )}
        </div>
      )}

      {/* TAB 3: REGULATORY AGENT & AML SENTINEL */}
      {activeTab === 'regulatory' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" /> REGULATORY INTELLIGENCE & NEURAL AML SENTINEL
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Scans structuring, velocity spikes, and generates regulator-ready SAR exports for Bank of Uganda and FIA.</p>
            </div>
          </div>

          {regData ? (
            <div className="space-y-6">
              {/* Reports Generator Bar */}
              <div className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#FDFBF7] font-bold">GENERATE OFFICIAL REGULATORY REPORT:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleGenerateReport('CENTRAL_BANK_DAILY_LIQUIDITY')}
                    className="px-3 py-1.5 rounded-lg bg-[#120E09] border border-[#231A10] text-xs font-mono text-[#F0A500] hover:bg-[#1C160F]"
                  >
                    Generate BOU Daily Liquidity Report
                  </button>
                  <button
                    onClick={() => handleGenerateReport('AML_SUSPICIOUS_ACTIVITY_SAR')}
                    className="px-3 py-1.5 rounded-lg bg-[#120E09] border border-[#231A10] text-xs font-mono text-emerald-400 hover:bg-[#1C160F]"
                  >
                    Generate FIA SAR Alert Export
                  </button>
                </div>
              </div>

              {/* AML Alerts List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">LIVE NEURAL AML & STRUCTURING ALERTS</h4>
                {regData.amlAlerts.map((alert: any) => (
                  <div key={alert.alertId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                        {alert.flagType}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Risk Score: {alert.riskScore}</span>
                    </div>

                    <p className="text-xs font-mono text-[#FDFBF7]">{alert.details}</p>

                    <div className="flex justify-between text-[10px] font-mono text-[#8C8275]">
                      <span>Source: {alert.sourceAccount}</span>
                      <span>Target: {alert.targetAccount}</span>
                      <span className="text-[#F0A500] font-bold">UGX {alert.amountUGX.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading regulatory data...</p>
          )}
        </div>
      )}

      {/* TAB 4: PROVIDER CERTIFICATION SCORECARDS */}
      {activeTab === 'certification' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#F0A500]" /> REAL PROVIDER CERTIFICATION SCORECARDS
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">3-Dimensional evaluation matrix: Technical Score, Financial Score, and Trust Score.</p>
            </div>
          </div>

          {certData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certData.map((c: any) => (
                <div key={c.providerId} className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {c.certificationBadge}
                    </span>
                    <span className="text-sm font-bold font-mono text-[#F0A500]">{c.overallCompositeScore}%</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{c.providerName}</h4>
                    <p className="text-[10px] font-mono text-[#8C8275]">Certified until: {new Date(c.certifiedUntil).toLocaleDateString()}</p>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#8C8275]">Technical Score:</span>
                      <strong className="text-emerald-400">{c.technicalScorePct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C8275]">Financial Score:</span>
                      <strong className="text-[#F0A500]">{c.financialScorePct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C8275]">Trust Score:</span>
                      <strong className="text-emerald-400">{c.trustScorePct}%</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl text-[10px] font-mono text-[#8C8275] space-y-1">
                    <div>30d Uptime: <strong className="text-[#FDFBF7]">{c.auditDetails.uptimeSla30d}%</strong></div>
                    <div>Mean Latency: <strong className="text-[#FDFBF7]">{c.auditDetails.meanLatencyMs}ms</strong></div>
                    <div>PCI-DSS / ISO: <strong className="text-emerald-400">PASSED & VERIFIED</strong></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading certification data...</p>
          )}
        </div>
      )}

      {/* TAB 5: INTELLIGENCE MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Brain className="w-4 h-4 text-emerald-400" /> MEHERAH INTELLIGENCE AGENT MARKETPLACE
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Deploy specialized financial AI agents (Liquidity, Merchant, Fraud, SME, FX) directly onto MEHERAH Core or Bank Edge Nodes.</p>
            </div>
          </div>

          {marketData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketData.map((agent: any) => (
                <div key={agent.agentId} className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-[#F0A500] border border-[#231A10]">
                      {agent.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      agent.status === 'ACTIVE_DEPLOYED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#120E09] text-[#8C8275]'
                    }`}>
                      {agent.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{agent.name}</h4>
                    <p className="text-[11px] font-mono text-[#8C8275] mt-1">{agent.description}</p>
                  </div>

                  <div className="text-[10px] font-mono text-[#8C8275] pt-2 border-t border-[#1C160F] flex justify-between">
                    <span>Accuracy: <strong className="text-emerald-400">{agent.accuracyMetricPct}%</strong></span>
                    <span>Target: <strong className="text-[#FDFBF7]">{agent.deploymentTarget}</strong></span>
                  </div>

                  <button
                    onClick={() => handleToggleAgent(agent.agentId)}
                    className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      agent.status === 'ACTIVE_DEPLOYED'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                        : 'bg-emerald-500 text-[#0A0907] hover:brightness-110'
                    }`}
                  >
                    {agent.status === 'ACTIVE_DEPLOYED' ? 'Pause Agent Deployment' : 'Deploy Agent to Node'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading marketplace agents...</p>
          )}
        </div>
      )}

      {/* TAB 6: PILOT & AUDIT PACKAGE */}
      {activeTab === 'pilot_pack' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#F0A500]" /> INSTITUTIONAL PILOT & REGULATOR PACKAGE
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Download executive whitepapers, security compliance attestations, and architecture specifications.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
              <FileCode className="w-8 h-8 text-[#F0A500]" />
              <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">Executive Architecture Whitepaper</h4>
              <p className="text-[11px] font-mono text-[#8C8275]">Full breakdown of Gemini Advice vs. MEHERAH Policy Engine decision hierarchy.</p>
              <button 
                onClick={() => alert('Downloaded MEHERAH_Executive_Architecture_v6.pdf')}
                className="px-3 py-1.5 rounded-lg bg-[#120E09] border border-[#231A10] text-xs font-mono text-[#FDFBF7] flex items-center gap-1.5 hover:bg-[#1C160F]"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>

            <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">Bank of Uganda Compliance Dossier</h4>
              <p className="text-[11px] font-mono text-[#8C8275]">AML, KYC, reserve ratio compliance, and automated SAR reporting specifications.</p>
              <button 
                onClick={() => alert('Downloaded BOU_Regulatory_Compliance_Dossier.pdf')}
                className="px-3 py-1.5 rounded-lg bg-[#120E09] border border-[#231A10] text-xs font-mono text-[#FDFBF7] flex items-center gap-1.5 hover:bg-[#1C160F]"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>

            <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
              <Server className="w-8 h-8 text-teal-400" />
              <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">Connector Integration SDK Manual</h4>
              <p className="text-[11px] font-mono text-[#8C8275]">Developer manual for bank partners to write connector adapters in under 48 hours.</p>
              <button 
                onClick={() => alert('Downloaded MEHERAH_Connector_SDK_Manual.pdf')}
                className="px-3 py-1.5 rounded-lg bg-[#120E09] border border-[#231A10] text-xs font-mono text-[#FDFBF7] flex items-center gap-1.5 hover:bg-[#1C160F]"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
