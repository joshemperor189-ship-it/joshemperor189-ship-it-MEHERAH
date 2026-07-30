import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  ShieldCheck,
  Scale,
  RefreshCw,
  Users,
  Globe2,
  Lock,
  Award,
  CheckCircle2,
  Zap,
  DollarSign,
  Layers,
  FileCheck,
  Activity,
  UserCheck,
  Plus
} from 'lucide-react';
import { Stage12MultiInstitutionEngine } from '../../../ai-engine/stage12-multi-institution';

export function MeherahStage12MultiInstitutionView() {
  const engine = new Stage12MultiInstitutionEngine();
  const [activeTab, setActiveTab] = useState<'expansion' | 'neutrality' | 'reconciliation' | 'governance' | 'global' | 'autonomy' | 'deliverables'>('expansion');

  // Interactive Participant Onboarding Simulation State
  const [institutions, setInstitutions] = useState(engine.runMultiInstitutionExpansion());
  const [isOnboardingNew, setIsOnboardingNew] = useState(false);

  const neutralityData = engine.runInstitutionalIndependenceTest();
  const reconciliationData = engine.runCrossInstitutionReconciliation();
  const governanceData = engine.runGovernanceCouncilSimulation();
  const globalData = engine.runGlobalPaymentIntelligence();
  const autonomyData = engine.runAutonomousOperationsLimitTest();
  const deliverables = engine.generateStage12ExpansionPackage();

  const handleSimulateOnboard = () => {
    setIsOnboardingNew(true);
    setTimeout(() => {
      const newInst = {
        institutionId: `INST-EQUITY-BANK-${Math.floor(100 + Math.random() * 900)}`,
        name: 'Equity Bank Uganda',
        category: 'COMMERCIAL_BANK' as const,
        onboardingSpeedMs: 380,
        apiCompatibilityScorePct: 100.0,
        mTLSIdentityVerified: true,
        policyEnforcementStatus: 'STRICT_COMPLIANT' as const,
      };
      setInstitutions((prev) => [...prev, newInst]);
      setIsOnboardingNew(false);
    }, 400);
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="p-5 bg-[#111111] border border-[#C9A227]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
            <Building2 size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C9A227]">STAGE 12 MULTI-INSTITUTION EXPANSION</span>
              <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                READY FOR EXPANSION
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5 font-sans">
              Multi-Institution Coordination Layer Preserving Mathematical Neutrality, Security & Regulatory Governance.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
          <ShieldCheck size={16} className="text-[#00B86B]" />
          <span>PRODUCTION GOVERNANCE COUNCIL ACTIVE</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'expansion', label: '1. Network Expansion', icon: Building2 },
          { id: 'neutrality', label: '2. Institutional Neutrality', icon: Scale },
          { id: 'reconciliation', label: '3. Cross-Ledger Settlement', icon: RefreshCw },
          { id: 'governance', label: '4. Governance Council', icon: Users },
          { id: 'global', label: '5. Global FX Intelligence', icon: Globe2 },
          { id: 'autonomy', label: '6. Autonomy Boundaries', icon: Lock },
          { id: 'deliverables', label: '★ Stage 12 Expansion Package', icon: Award },
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

      {/* TAB 1: NETWORK EXPANSION */}
      {activeTab === 'expansion' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Connected Institution Participants</h3>
                <p className="text-xs text-[#A7A7A7]">Commercial banks, mobile money operators, payment gateways, and regulators connected via mTLS service mesh.</p>
              </div>
              <button
                onClick={handleSimulateOnboard}
                disabled={isOnboardingNew}
                className="px-4 py-2 bg-[#C9A227] text-[#070707] font-bold font-mono text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                {isOnboardingNew ? 'Onboarding Participant...' : 'Onboard Institution Node'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {institutions.map((inst) => (
                <div key={inst.institutionId} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#E8C879]">{inst.name}</span>
                    <span className="text-[10px] bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/40 px-2 py-0.5 rounded-full font-bold">
                      {inst.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="text-[#A7A7A7]">ID: {inst.institutionId}</span>
                    <span className="text-[#00B86B]">mTLS Identity: VERIFIED</span>
                    <span className="text-[#A7A7A7]">Onboarding: {inst.onboardingSpeedMs} ms</span>
                    <span className="text-[#00B86B]">API Match: {inst.apiCompatibilityScorePct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: INSTITUTIONAL NEUTRALITY */}
      {activeTab === 'neutrality' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Institutional Independence & Anti-Bias Verification</h3>
              <p className="text-xs text-[#A7A7A7]">Injects commercial rebates and shareholder priority claims to verify MEHERAH remains 100% mathematically neutral.</p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {neutralityData.map((t, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#E8C879] text-sm">{t.biasScenario}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-3 py-1 rounded-full font-bold">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[#E8C879] text-[11px]">Injected Incentive: {t.injectedIncentive}</p>
                  <p className="text-[#FFFFFF] text-[11px]">MEHERAH Decision: {t.meherahDecisionOutcome}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#222222] text-[10px] text-[#A7A7A7]">
                    <span>Selection Factors: {t.selectedBasedOn.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: CROSS-LEDGER SETTLEMENT */}
      {activeTab === 'reconciliation' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Cross-Institution Ledger Reconciliation</h3>
                <p className="text-xs text-[#A7A7A7]">Validates multi-node settlement confirmation, zero duplicate payouts, and instant dispute Merkle proof generation.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                {reconciliationData.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">EVALUATED TRANSACTIONS</span>
                <p className="text-xl font-bold text-[#FFFFFF]">{reconciliationData.totalTransactionsEvaluated.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">DUPLICATES BLOCKED</span>
                <p className="text-xl font-bold text-[#00B86B]">{reconciliationData.duplicateTransactionsBlocked}</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">MISMATCH DELTAS</span>
                <p className="text-xl font-bold text-[#00B86B]">{reconciliationData.mismatchDeltasDetected}</p>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl text-center space-y-1">
                <span className="text-[#A7A7A7] text-[10px]">RECONCILIATION SPEED</span>
                <p className="text-xl font-bold text-[#E8C879]">{reconciliationData.reconciliationSpeedMs} ms</p>
              </div>
            </div>

            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1 font-mono text-xs">
              <span className="text-[#A7A7A7] text-[10px]">DISPUTE RESOLUTION EVIDENCE MERKLE PROOF</span>
              <p className="text-[#E8C879] font-bold text-[11px]">{reconciliationData.disputeResolutionEvidenceHash}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: GOVERNANCE COUNCIL */}
      {activeTab === 'governance' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Production Governance Council Simulation</h3>
              <p className="text-xs text-[#A7A7A7]">Simulates multi-institution governance actions signed by Central Bank, Bank reps, Telcos, and Security officers.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {governanceData.map((gov) => (
                <div key={gov.actionId} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#E8C879]">{gov.actionId} | Role: {gov.councilRole}</span>
                    <span className="text-[10px] text-[#A7A7A7]">{gov.timestampIso}</span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px]">{gov.actionTaken}</p>
                  <p className="text-[#A7A7A7] text-[10px]">Reason: {gov.justificationReason}</p>
                  <p className="text-[#00B86B] text-[10px]">FIPS Cryptographic Receipt: {gov.fipsCryptographicReceipt}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: GLOBAL PAYMENT INTELLIGENCE */}
      {activeTab === 'global' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Global Payment & Cross-Border FX Intelligence</h3>
              <p className="text-xs text-[#A7A7A7]">Multi-currency routing optimization across UGX, KES, USD, and EUR corridors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {globalData.map((corridor) => (
                <div key={corridor.corridorKey} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#FFFFFF]">{corridor.corridorKey}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {corridor.corridorStatus}
                    </span>
                  </div>
                  <p className="text-[#E8C879] text-[11px]">Slippage: {corridor.fxFluctuationSlippagePct}% | Delay: {corridor.settlementDelayMs} ms</p>
                  <p className="text-[#A7A7A7] text-[10px]">FX Route Strategy: {corridor.meherahFxRouteOptimization}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 6: AUTONOMY BOUNDARIES */}
      {activeTab === 'autonomy' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Autonomous Operations Boundary Demarcation</h3>
              <p className="text-xs text-[#A7A7A7]">Strictly defines allowed AI autonomous actions versus mandatory human governance statutory overrides.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {autonomyData.map((a) => (
                <div key={a.operationCategory} className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-[#FFFFFF] text-sm">{a.operationCategory}</span>
                    <p className="text-[10px] text-[#A7A7A7]">{a.rationale}</p>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-bold border ${
                      a.autonomyLevel === 'ALLOWED_AUTONOMOUS'
                        ? 'bg-[#00B86B]/20 text-[#00B86B] border-[#00B86B]/40'
                        : 'bg-[#C9A227]/20 text-[#C9A227] border-[#C9A227]/40'
                    }`}>
                      {a.autonomyLevel} ({a.decisionOwner})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 7: STAGE 12 EXPANSION PACKAGE */}
      {activeTab === 'deliverables' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-8 bg-[#070707] border-2 border-[#C9A227] rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-[#C9A227]">
              <Award size={180} />
            </div>

            <div className="border-b border-[#C9A227]/40 pb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#C9A227] tracking-widest uppercase">MEHERAH STAGE 12 EXPANSION CERTIFICATION</span>
                <span className="text-xs font-mono text-[#A7A7A7]">{deliverables.packageId}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#FFFFFF] font-playfair tracking-wide">
                MULTI-INSTITUTION PRODUCTION GOVERNANCE PACKAGE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">1. MULTI-INST ARCHITECTURE</span>
                <p className="text-[#A7A7A7] text-[11px]">Connected Nodes: {deliverables.multiInstitutionArchReport.connectedInstitutionsCount}</p>
                <p className="text-[#00B86B] text-[11px]">Onboarding Avg: {deliverables.multiInstitutionArchReport.averageOnboardingTimeSec}s</p>
                <p className="text-[#E8C879] text-[10px]">Mesh: {deliverables.multiInstitutionArchReport.meshTopologyType}</p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">2. NEUTRALITY & FAIR ACCESS</span>
                <p className="text-[#A7A7A7] text-[11px]">Provider Bias Score: {deliverables.neutralityFairAccessReport.providerBiasScore}</p>
                <p className="text-[#00B86B] text-[11px]">Audit Status: {deliverables.neutralityFairAccessReport.fairAccessAuditStatus}</p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#C9A227] font-bold">3. PRODUCTION GOVERNANCE</span>
                <p className="text-[#A7A7A7] text-[11px]">Active Council Roles: {deliverables.productionGovernanceFramework.activeCouncilRolesCount}</p>
                <p className="text-[#00B86B] text-[11px]">HSM Standard: {deliverables.productionGovernanceFramework.cryptographicReceiptStandard}</p>
              </div>
            </div>

            <div className="p-5 bg-[#111111] border border-[#00B86B]/40 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                <span className="text-[#00B86B] font-bold text-sm">EXPANSION STATUS: {deliverables.expansionReadinessCertificate}</span>
                <span className="text-[10px] text-[#A7A7A7]">{deliverables.cryptographicSignature}</span>
              </div>
              <p className="text-[#FFFFFF] text-[11px] leading-relaxed">
                {deliverables.regulatorApprovalNote}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
