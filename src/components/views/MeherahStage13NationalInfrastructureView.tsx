import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  ShieldAlert,
  Sliders,
  TrendingUp,
  Globe2,
  Lock,
  Award,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  Layers,
  FileText,
  Play,
  HeartHandshake
} from 'lucide-react';
import { Stage13NationalInfrastructureEngine } from '../../../ai-engine/stage13-national-infrastructure';

export function MeherahStage13NationalInfrastructureView() {
  const engine = new Stage13NationalInfrastructureEngine();
  const [activeTab, setActiveTab] = useState<'sim' | 'risk' | 'emergency' | 'inclusion' | 'corridors' | 'cyber' | 'package'>('sim');

  // Interactive Emergency Override State
  const [emergencyLog, setEmergencyLog] = useState<string[]>([]);
  const [isInjectingEmergency, setIsInjectingEmergency] = useState(false);

  const simData = engine.runNationalPaymentSimulation();
  const riskData = engine.runSystemicRiskPropagationTest();
  const emergencyData = engine.runCentralBankEmergencyControl();
  const inclusionData = engine.runFinancialInclusionImpactSimulation();
  const corridorData = engine.runCrossBorderCorridorStressTest();
  const cyberData = engine.runNationalCyberResilienceExercise();
  const pkg = engine.generateStage13NationalPackage();

  const handleSimulateEmergencyIntervention = () => {
    setIsInjectingEmergency(true);
    setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString();
      setEmergencyLog((prev) => [
        `[${timestamp}] BOU SUPERVISOR ACTION: Enforced Emergency Corridor Freeze on Sector 04 (Fiber Outage). 100% Traffic Shifted to Airtel Mesh. Cryptographic Proof: SIG_BOU_0x99281`,
        ...prev,
      ]);
      setIsInjectingEmergency(false);
    }, 400);
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="p-5 bg-[#111111] border border-[#C9A227]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
            <Globe size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C9A227]">STAGE 13 NATIONAL INFRASTRUCTURE</span>
              <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                NATIONAL SCALE READY
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5 font-sans">
              National Financial Infrastructure Integration, Systemic Risk Isolation & Central Bank Emergency Governance.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
          <ShieldAlert size={16} className="text-[#00B86B]" />
          <span>NATIONAL DECENTRALIZED MESH ACTIVE</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'sim', label: '1. National Payment Simulation', icon: Globe },
          { id: 'risk', label: '2. Systemic Risk Isolation (FIG)', icon: ShieldAlert },
          { id: 'emergency', label: '3. BOU Emergency Control', icon: Sliders },
          { id: 'inclusion', label: '4. Financial Inclusion Impact', icon: HeartHandshake },
          { id: 'corridors', label: '5. Cross-Border Stress Test', icon: Globe2 },
          { id: 'cyber', label: '6. National Cyber Resilience', icon: Lock },
          { id: 'package', label: '★ Stage 13 National Package', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-[#111111] text-[#E8C879] border border-[#C9A227]/50 shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#111111]/50 border border-transparent'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#C9A227]' : 'text-[#666666]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: NATIONAL PAYMENT SIMULATION */}
      {activeTab === 'sim' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">National Payment Network Digital Twin Simulation</h3>
                <p className="text-xs text-[#A7A7A7]">Simulates 250 Billion UGX across retail, payroll, merchant settlements, and government payments.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                {simData.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">TOTAL VOLUME TESTED</span>
                <p className="text-xl font-bold text-[#FFFFFF]">{(simData.totalSimulatedVolumeUgx / 1e9).toFixed(0)} Billion UGX</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">ROUTING EFFICIENCY</span>
                <p className="text-xl font-bold text-[#00B86B]">{simData.routingEfficiencyPct}%</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">SETTLEMENT RELIABILITY</span>
                <p className="text-xl font-bold text-[#E8C879]">{simData.settlementReliabilityPct}%</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">FAILURE PREVENTION</span>
                <p className="text-xl font-bold text-[#00B86B]">{simData.failurePreventionRatePct}%</p>
              </div>
            </div>

            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3 font-mono text-xs">
              <span className="text-[#C9A227] font-bold">ECOSYSTEM FLOW BREAKDOWN</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                <div className="p-2.5 bg-[#111111] rounded-lg">Retail Payments: <span className="text-[#00B86B] font-bold">{simData.flowBreakdown.retailPaymentsPct}%</span></div>
                <div className="p-2.5 bg-[#111111] rounded-lg">Corporate Payroll: <span className="text-[#00B86B] font-bold">{simData.flowBreakdown.corporatePayrollPct}%</span></div>
                <div className="p-2.5 bg-[#111111] rounded-lg">Merchant Settlements: <span className="text-[#00B86B] font-bold">{simData.flowBreakdown.merchantSettlementsPct}%</span></div>
                <div className="p-2.5 bg-[#111111] rounded-lg">Govt Disbursements: <span className="text-[#00B86B] font-bold">{simData.flowBreakdown.governmentDisbursementsPct}%</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: SYSTEMIC RISK ISOLATION */}
      {activeTab === 'risk' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Financial Intelligence Graph (FIG) Systemic Failure Isolation</h3>
                <p className="text-xs text-[#A7A7A7]">Calculates node cascade exposure and provides alternative settlement paths upon major provider outages.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                {riskData.status}
              </span>
            </div>

            <div className="p-5 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                <span className="font-bold text-[#E8C879] text-sm">Failed Node Simulation: {riskData.targetFailedNode}</span>
                <span className="text-[#A7A7A7]">Exposed Liquidity: {(riskData.totalExposedLiquidityUgx / 1e9).toFixed(1)} Billion UGX</span>
              </div>
              <p className="text-[#FFFFFF] text-[11px]">{riskData.figPropagationAnalysis}</p>
              
              <div className="space-y-2 pt-2 border-t border-[#222222]">
                <span className="text-[#C9A227] font-bold text-[11px]">ALTERNATIVE SETTLEMENT PATHS ACTIVATED:</span>
                <div className="space-y-1 text-[11px]">
                  {riskData.alternativeSettlementPaths.map((path, idx) => (
                    <p key={idx} className="text-[#00B86B]">✓ {path}</p>
                  ))}
                </div>
              </div>

              <p className="text-[#E8C879] text-[11px] pt-2 border-t border-[#222222]">
                Regulator Recommendation: {riskData.recommendedRegulatorIntervention}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: BOU EMERGENCY CONTROL */}
      {activeTab === 'emergency' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Bank of Uganda Central Bank Emergency Control Room</h3>
                <p className="text-xs text-[#A7A7A7]">Simulates cyber attacks, liquidity crises, and natural disaster overrides with FIPS identity receipts.</p>
              </div>
              <button
                onClick={handleSimulateEmergencyIntervention}
                disabled={isInjectingEmergency}
                className="px-4 py-2 bg-[#C9A227] text-[#070707] font-bold font-mono text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2"
              >
                <Play size={14} />
                {isInjectingEmergency ? 'Executing Control...' : 'Trigger Supervisor Override Action'}
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {emergencyData.map((e, idx) => (
                <div key={idx} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#E8C879]">{e.emergencyScenario} OVERRIDE</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {e.status}
                    </span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px]">{e.actionTakenByRegulator}</p>
                  <p className="text-[#A7A7A7] text-[10px]">Verification: {e.identityVerification} | Reason: {e.reasonCode}</p>
                  <p className="text-[#00B86B] text-[10px]">Cryptographic Proof: {e.cryptographicEvidence}</p>
                </div>
              ))}
            </div>

            {emergencyLog.length > 0 && (
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2 font-mono text-xs">
                <span className="text-[#A7A7A7] font-bold">SUPERVISOR INTERVENTION AUDIT STREAM</span>
                <div className="p-3 bg-[#111111] rounded-lg text-[#00B86B] space-y-1 text-[11px] max-h-36 overflow-y-auto">
                  {emergencyLog.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 4: FINANCIAL INCLUSION IMPACT */}
      {activeTab === 'inclusion' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Financial Inclusion & Public Welfare Impact Metrics</h3>
              <p className="text-xs text-[#A7A7A7]">Measures rural reach, offline agent network synchronization, and cost reductions for low-income citizens.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">RURAL AVAILABILITY</span>
                <p className="text-xl font-bold text-[#00B86B]">{inclusionData.ruralPaymentAvailabilityPct}%</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">OFFLINE SYNC RATE</span>
                <p className="text-xl font-bold text-[#FFFFFF]">{inclusionData.offlineAgentNetworkSyncRatePct}%</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">COST REDUCTION</span>
                <p className="text-xl font-bold text-[#E8C879]">{inclusionData.transactionCostReductionPct}%</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">FAILED PAYMENTS AVOIDED</span>
                <p className="text-xl font-bold text-[#00B86B]">{inclusionData.failedPaymentsAvoidedCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: CROSS-BORDER STRESS TEST */}
      {activeTab === 'corridors' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Cross-Border Regional Corridor Stress Test</h3>
              <p className="text-xs text-[#A7A7A7]">Validates FX risk mitigation, liquidity reserves, and compliance across East African Community corridors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {corridorData.map((c) => (
                <div key={c.corridorKey} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#FFFFFF]">{c.corridorKey} ({c.fromCurrency} → {c.toCurrency})</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-[#E8C879] text-[11px]">Slippage: {c.fxSlippagePct}% | Delay: {c.settlementDelayMs} ms</p>
                  <p className="text-[#A7A7A7] text-[10px]">Liquidity Reserve: {(c.liquidityReserveUgx / 1e9).toFixed(1)}B UGX</p>
                  <p className="text-[#00B86B] text-[10px]">Compliance Passed: YES</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 6: NATIONAL CYBER RESILIENCE */}
      {activeTab === 'cyber' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">National Cyber Resilience & Attack Exercises</h3>
              <p className="text-xs text-[#A7A7A7]">Simulates provider impersonation, mesh intrusion, and ransomware-like database encipherment attacks.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {cyberData.map((cy) => (
                <div key={cy.attackVector} className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#E8C879]">{cy.attackVector} ATTACK</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {cy.status}
                    </span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px]">{cy.attackDescription}</p>
                  <p className="text-[#00B86B] text-[10px]">Neutralization Strategy: {cy.neutralizationMethod}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 7: STAGE 13 NATIONAL PACKAGE */}
      {activeTab === 'package' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-8 bg-[#070707] border-2 border-[#C9A227] rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-[#C9A227]">
              <Award size={180} />
            </div>

            <div className="border-b border-[#C9A227]/40 pb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#C9A227] tracking-widest uppercase">BANK OF UGANDA NATIONAL INFRASTRUCTURE CERTIFICATE</span>
                <span className="text-xs font-mono text-[#A7A7A7]">{pkg.packageId}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#FFFFFF] font-playfair tracking-wide">
                NATIONAL FINANCIAL INFRASTRUCTURE INTEGRATION DOSSIER
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">1. NATIONAL READINESS</span>
                <p className="text-[#A7A7A7] text-[11px]">Volume Tested: {(pkg.nationalReadinessReport.simulatedVolumeUgx / 1e9).toFixed(0)}B UGX</p>
                <p className="text-[#00B86B] text-[11px]">Rails Connected: {pkg.nationalReadinessReport.supportedRailsCount}</p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">2. SYSTEMIC RISK ASSESSMENT</span>
                <p className="text-[#A7A7A7] text-[11px]">FIG Subgraph Nodes: {pkg.systemicRiskAssessmentReport.figCascadeGraphNodesCount}</p>
                <p className="text-[#00B86B] text-[11px]">Cascade Prevention: {pkg.systemicRiskAssessmentReport.cascadePreventionRatePct}%</p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">3. FINANCIAL INCLUSION</span>
                <p className="text-[#A7A7A7] text-[11px]">Cost Reduction: {pkg.financialInclusionImpactReport.costReductionPct}%</p>
                <p className="text-[#00B86B] text-[11px]">Rural Reach: {pkg.financialInclusionImpactReport.ruralReachPct}%</p>
              </div>
            </div>

            <div className="p-5 bg-[#111111] border border-[#00B86B]/40 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                <span className="text-[#00B86B] font-bold text-sm">RECOMMENDATION: {pkg.sandboxExpansionRecommendation}</span>
                <span className="text-[10px] text-[#A7A7A7]">{pkg.cryptographicSignature}</span>
              </div>
              <p className="text-[#FFFFFF] text-[11px] leading-relaxed">
                {pkg.regulatorFinalEndorsement}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
