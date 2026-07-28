import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Wallet, ShieldAlert, Cpu, Settings, ChevronRight, Activity, Bell, Terminal, Zap, Radio, Landmark, Send, ShieldCheck, Globe, Network, Scale, CheckCircle2, FlaskConical, Compass, Brain, Globe2, Sparkles, Award, Building2, Users, Play, Sliders, Stethoscope } from 'lucide-react';
import { UgandaFinanceCenterView } from './components/views/UgandaFinanceCenterView';
import { AgentControlCenterView } from './components/views/AgentControlCenterView';
import { EnterpriseControlCenterView } from './components/views/EnterpriseControlCenterView';
import { FluidicFlowDashboard } from './components/views/FluidicFlowDashboard';
import { MeherahWorkspaceShell } from './frontend/workspace-shell';
import EnterpriseResilienceTab from './components/EnterpriseResilienceTab';
import { MissionControlTelemetryView } from './components/views/MissionControlTelemetryView';
import { TreasuryFinancialIntelligenceView } from './components/views/TreasuryFinancialIntelligenceView';
import { FinancialExecutionView } from './components/views/FinancialExecutionView';
import { FinancialIntelligenceTrustView } from './components/views/FinancialIntelligenceTrustView';
import { UniversalFinancialNetworkView } from './components/views/UniversalFinancialNetworkView';
import { InstitutionalTrustComplianceView } from './components/views/InstitutionalTrustComplianceView';
import { InstitutionalValidationView } from './components/views/InstitutionalValidationView';
import { MeherahOSCommandCentre } from './components/views/MeherahOSCommandCentre';
import { FlutterwaveSandboxValidationView } from './components/views/FlutterwaveSandboxValidationView';
import { MeherahCoreGovernanceView } from './components/views/MeherahCoreGovernanceView';
import { MeherahPhase8CognitiveView } from './components/views/MeherahPhase8CognitiveView';
import { MeherahPhase9GlobalNetworkView } from './components/views/MeherahPhase9GlobalNetworkView';
import { MeherahPhase10GenesisView } from './components/views/MeherahPhase10GenesisView';
import { MeherahProofOfTrustView } from './components/views/MeherahProofOfTrustView';
import { MeherahTrustIntelligenceEraView } from './components/views/MeherahTrustIntelligenceEraView';
import { MeherahMaturityStagesView } from './components/views/MeherahMaturityStagesView';
import { MeherahInstitutionalRealityProofView } from './components/views/MeherahInstitutionalRealityProofView';
import { MeherahInstitutionalAdoptionEngineView } from './components/views/MeherahInstitutionalAdoptionEngineView';
import { MeherahNetworkIntelligenceEraView } from './components/views/MeherahNetworkIntelligenceEraView';
import { MeherahEvolutionStageView } from './components/views/MeherahEvolutionStageView';
import { MeherahWorldOperatingLayerBlueprintView } from './components/views/MeherahWorldOperatingLayerBlueprintView';
import { MeherahGlobalStewardshipView } from './components/views/MeherahGlobalStewardshipView';
import { MeherahCivilizationInterfaceView } from './components/views/MeherahCivilizationInterfaceView';
import { MeherahRealityValidationSandboxView } from './components/views/MeherahRealityValidationSandboxView';
import { MeherahPhase9InstitutionalPilotView } from './components/views/MeherahPhase9InstitutionalPilotView';
import { MeherahExecutivePresentationView } from './components/views/MeherahExecutivePresentationView';
import { ProductionOperationsView } from './components/views/ProductionOperationsView';
import { ExecutiveControlUnitsView } from './components/views/ExecutiveControlUnitsView';
import { AdministrationDashboardView } from './components/views/AdministrationDashboardView';
import { MeherahSystemImpactSimulatorView } from './components/views/MeherahSystemImpactSimulatorView';
import { MeherahAutonomousRecoveryRepairView } from './components/views/MeherahAutonomousRecoveryRepairView';
import DemoSafetyAuditView from './components/views/DemoSafetyAuditView';
import { RoleSelectionView, MeherahRole } from './components/adaptive/RoleSelectionView';
import { AdaptiveShell } from './components/adaptive/AdaptiveShell';

export default function App() {
  const [activeTab, setActiveTab] = useState('presentation');
  const [selectedRole, setSelectedRoleState] = useState<MeherahRole>(() => {
    const saved = localStorage.getItem('meherah_selected_role') as MeherahRole;
    return saved || 'unselected';
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const setSelectedRole = (role: MeherahRole) => {
    setSelectedRoleState(role);
    if (role !== 'unselected') {
      localStorage.setItem('meherah_selected_role', role);
    }
  };

  // 1. PRESENTATION MODE
  if (activeTab === 'presentation') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#FFFFFF] font-sans antialiased">
        <MeherahExecutivePresentationView 
          onExplorePlatform={() => {
            if (selectedRole === 'unselected') {
              setActiveTab('role_select');
            } else {
              setActiveTab('adaptive');
            }
          }} 
        />
      </div>
    );
  }

  // 2. ROLE SELECTION SCREEN ("Who are you today?")
  if (activeTab === 'role_select' || (activeTab === 'adaptive' && selectedRole === 'unselected')) {
    return (
      <RoleSelectionView
        onSelectRole={(role) => {
          setSelectedRole(role);
          setActiveTab('adaptive');
        }}
        onLaunchPresentation={() => setActiveTab('presentation')}
      />
    );
  }

  // 3. ADAPTIVE SHELL
  return (
    <AdaptiveShell
      currentRole={selectedRole}
      onSelectRole={(role) => {
        if (role === 'unselected') {
          setActiveTab('role_select');
        } else {
          setSelectedRole(role);
          setActiveTab('adaptive');
        }
      }}
      onLaunchPresentation={() => setActiveTab('presentation')}
      childrenForAdmin={
        <div className="min-h-screen bg-[#070707] text-[#FFFFFF] font-sans flex antialiased">
      
      {/* 1. INSTITUTIONAL LUXURY NAVIGATION SIDEBAR */}
      <aside className="w-24 md:w-64 bg-[#111111] border-r border-[#C9A227]/20 p-4 flex flex-col justify-between hidden md:flex sticky h-screen top-0">
        <div className="space-y-6">
          <div className="px-3 py-4 flex items-center gap-3 border-b border-[#222222]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8C879] via-[#C9A227] to-[#8A6D1B] p-0.5 shadow-[0_0_20px_rgba(201,162,39,0.25)]">
              <div className="w-full h-full bg-[#070707] rounded-[10px] flex items-center justify-center font-bold text-lg text-[#C9A227] font-playfair">M</div>
            </div>
            <div className="hidden md:block">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#666666] font-mono">SOVEREIGN KERNEL</span>
              <h2 className="text-base font-bold text-[#FFFFFF] font-playfair tracking-tight">MEHERAH</h2>
            </div>
          </div>

          <nav className="space-y-1.5 font-sans overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {[
              { id: 'presentation', label: '★ Executive Presentation (BOU)', icon: Sparkles },
              { id: 'demo_safety_audit', label: '★ Demo Safety Audit (BOU)', icon: ShieldCheck },
              { id: 'meherah_os', label: '◆ Command Centre', icon: Globe },
              { id: 'impact_simulator', label: '★ System Impact Simulator', icon: Brain },
              { id: 'recovery_repair', label: '★ Recovery & Repair Centre', icon: Stethoscope },
              { id: 'executive_controls', label: '★ Executive Control Units', icon: Sliders },
              { id: 'admin_dashboard', label: '★ Administration Dashboard', icon: Settings },
              { id: 'phase9_institutional_pilot', label: '★ Phase 9 Institutional Pilot', icon: ShieldCheck },
              { id: 'reality_sandbox', label: '★ Reality Sandbox', icon: Play },
              { id: 'civilization_interface', label: '★ Civilization Interface', icon: Users },
              { id: 'global_stewardship', label: '★ Global Stewardship', icon: ShieldCheck },
              { id: 'world_operating_layer', label: '★ World Operating Layer', icon: Globe },
              { id: 'evolution_stage', label: '★ Evolution Stage', icon: Sparkles },
              { id: 'network_intelligence_era', label: '★ Network Intelligence Era', icon: Brain },
              { id: 'institutional_adoption', label: '★ Adoption Engine', icon: Building2 },
              { id: 'institutional_reality', label: '★ Institutional Reality Proof', icon: Award },
              { id: 'maturity_stages', label: '★ 4 Maturity Stages', icon: CheckCircle2 },
              { id: 'trust_intelligence_era', label: '★ Trust Intelligence Era', icon: Award },
              { id: 'proof_of_trust', label: '★ Proof of Trust Engine', icon: ShieldCheck },
              { id: 'phase10_genesis', label: '★ Phase 10 Genesis AI', icon: Sparkles },
              { id: 'phase9_network', label: '◆ Phase 9 Global Network', icon: Globe2 },
              { id: 'cognitive_ai', label: '◆ Phase 8 Cognitive AI', icon: Brain },
              { id: 'core_governance', label: '◆ Core Governance', icon: Compass },
              { id: 'flutterwave_sandbox', label: '◆ Flutterwave Sandbox', icon: FlaskConical },
              { id: 'phase8', label: '◆ SRE & Operations', icon: Activity },
              { id: 'phase7', label: '◆ Audit & Settlement', icon: CheckCircle2 },
              { id: 'phase6', label: '◆ Risk & Compliance', icon: Scale },
              { id: 'phase5', label: '◆ Financial Network', icon: Network },
              { id: 'organ3', label: '◆ Autonomous Treasury', icon: Landmark },
              { id: 'swarm', label: '◆ Agent Marketplace', icon: Cpu },
              { id: 'security', label: '◆ System Control', icon: ShieldAlert },
              { id: 'workspace', label: 'Workspace Shell', icon: Terminal },
              { id: 'execution', label: 'Route Decision Engine', icon: Send },
              { id: 'mission', label: 'Telemetry Dashboard', icon: Radio },
              { id: 'resilience', label: 'Resilience & Healer', icon: Zap }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all group relative ${
                    isActive 
                      ? 'bg-[#070707] text-[#E8C879] border border-[#C9A227]/40 shadow-md' 
                      : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-[#C9A227]' : 'text-[#666666] group-hover:text-[#A7A7A7] transition-colors'} />
                    <span className="hidden md:inline">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="hidden md:block text-[#C9A227]" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-2 border-t border-[#222222] pt-4 hidden md:block">
          <div className="flex items-center gap-3 bg-[#070707] border border-[#C9A227]/20 p-3 rounded-xl">
            <Activity size={16} className="text-[#00B86B] animate-pulse" />
            <div>
              <p className="text-xs text-[#FFFFFF] font-semibold font-sans">Core Sync Operational</p>
              <p className="text-[10px] text-[#A7A7A7] font-mono">LATENCY: 14ms</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#070707]">
        
        {/* INSTITUTIONAL HEADER BAR */}
        <header className="h-20 bg-[#111111]/90 backdrop-blur-md border-b border-[#C9A227]/20 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="md:hidden w-8 h-8 rounded-lg bg-[#070707] border border-[#C9A227]/30 flex items-center justify-center font-bold text-xs text-[#C9A227] font-playfair">M</div>
            <h2 className="text-lg font-bold tracking-tight text-[#FFFFFF] font-playfair">
              {activeTab === 'demo_safety_audit' && 'MEHERAH — Demo Safety Audit & Regulatory Verification Centre'}
              {activeTab === 'meherah_os' && 'MEHERAH OS — The Intelligence Layer Behind Global Finance'}
              {activeTab === 'impact_simulator' && 'MEHERAH — System Impact Simulator ("Think Before The System Acts")'}
              {activeTab === 'recovery_repair' && 'MEHERAH — Autonomous Recovery & Repair Centre ("Detect. Understand. Recommend. Repair. Verify.")'}
              {activeTab === 'executive_controls' && 'MEHERAH — Executive Control Units'}
              {activeTab === 'reality_sandbox' && 'MEHERAH — Phase 8 Reality Validation & Institutional Demonstration Sandbox'}
              {activeTab === 'civilization_interface' && 'MEHERAH — Civilization Interface Layer ("Making the intelligence accessible to everyone")'}
              {activeTab === 'global_stewardship' && 'MEHERAH — Global Stewardship Framework ("The Responsibility of Governing Intelligence at Global Scale")'}
              {activeTab === 'world_operating_layer' && 'MEHERAH — World Operating Layer ("The Intelligence Layer Connecting World Financial Systems")'}
              {activeTab === 'evolution_stage' && 'MEHERAH — Evolution Stage ("The Intelligence Civilization Layer")'}
              {activeTab === 'network_intelligence_era' && 'MEHERAH — Network Intelligence Era ("When the Network Itself Becomes Intelligent")'}
              {activeTab === 'institutional_adoption' && 'MEHERAH — Institutional Adoption Engine (Partner Onboarding • Certification • Growth • Regulatory)'}
              {activeTab === 'institutional_reality' && 'MEHERAH — Institutional Reality Proof (From Intelligence to Adoption)'}
              {activeTab === 'maturity_stages' && 'MEHERAH — The 4 Evolutionary Maturity Stages (Verification • Deployment • Institutional • Evolution)'}
              {activeTab === 'trust_intelligence_era' && 'MEHERAH — The Trust Intelligence Era (Global Infrastructure Proof)'}
              {activeTab === 'proof_of_trust' && 'MEHERAH Proof of Trust Engine & Trust Framework'}
              {activeTab === 'flutterwave_sandbox' && 'MEHERAH Flutterwave Sandbox Validation Phase'}
              {activeTab === 'phase8' && 'MEHERAH Phase 8 — Production Operations, Reliability & Network Intelligence'}
              {activeTab === 'phase7' && 'MEHERAH Phase 7 — Institutional Validation, Security Hardening & 3-Way Reconciliation'}
              {activeTab === 'phase6' && 'MEHERAH Phase 6 — Production Trust, Compliance & Institutional Readiness'}
              {activeTab === 'phase5' && 'MEHERAH Phase 5 — Universal Financial Network Layer & Gemini Intelligence'}
              {activeTab === 'phase4' && 'MEHERAH Phase 4 — Autonomous Financial Intelligence & Trust Layer'}
              {activeTab === 'workspace' && 'Autonomous Kernel Workspace'}
              {activeTab === 'execution' && 'MEHERAH Phase 3 — Financial Execution & Route Decision Engine'}
              {activeTab === 'organ3' && 'Organ 3 — Treasury & Financial Intelligence Engine'}
              {activeTab === 'mission' && 'Mission Control UI & Real-Time Event Telemetry Dashboard'}
              {activeTab === 'resilience' && 'Enterprise Resilience & Autonomous Healer Lab'}
              {activeTab === 'fluidic' && 'Fluidic Flow Dashboard — Fountain Telemetry'}
              {activeTab === 'finance' && 'Cross-Network Settlement Mesh'}
              {activeTab === 'dashboard' && 'Telemetry System Dashboard'}
              {activeTab === 'security' && 'Zero-Trust Data Protection'}
              {activeTab === 'swarm' && 'Multi-Agent Autonomous Orchestrator'}
              {activeTab === 'settings' && 'Core Enclave Configuration'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* NOTIFICATION HUB BELL */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-10 h-10 rounded-xl bg-[#070707] border border-[#C9A227]/20 flex items-center justify-center text-[#A7A7A7] hover:text-[#FFFFFF] hover:border-[#C9A227]/50 transition-all relative"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#C9A227] shadow-[0_0_10px_rgba(201,162,39,0.8)]"></span>
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-4 shadow-2xl z-50 space-y-3"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8C879] font-mono">Audit Security Alert</h4>
                    <div className="p-2.5 bg-[#070707] border border-[#222222] rounded-xl text-xs space-y-1">
                      <p className="text-[#FFFFFF] font-medium font-sans">PII Data Shield Scrubbed</p>
                      <p className="text-[#A7A7A7] font-mono">Masked 2 raw phone records from incoming agent sub-task.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AUTONOMOUS AGENT ACTIVE COUNTER */}
            <div className="bg-[#070707] border border-[#C9A227]/30 px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B86B] shadow-[0_0_8px_#00B86B]"></span>
              <span className="text-xs font-mono font-bold tracking-wide text-[#E8C879]">9 AGENTS ONLINE</span>
            </div>
          </div>
        </header>

        {/* 3. CORE VIEW COMPONENT SLOT */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-w-[1600px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTab === 'demo_safety_audit' && <DemoSafetyAuditView />}
              {activeTab === 'meherah_os' && <MeherahOSCommandCentre onNavigateTab={(t) => setActiveTab(t)} />}
              {activeTab === 'impact_simulator' && <MeherahSystemImpactSimulatorView />}
              {activeTab === 'recovery_repair' && <MeherahAutonomousRecoveryRepairView />}
              {activeTab === 'executive_controls' && <ExecutiveControlUnitsView />}
              {activeTab === 'admin_dashboard' && <AdministrationDashboardView />}
              {activeTab === 'phase9_institutional_pilot' && <MeherahPhase9InstitutionalPilotView />}
              {activeTab === 'reality_sandbox' && <MeherahRealityValidationSandboxView />}
              {activeTab === 'civilization_interface' && <MeherahCivilizationInterfaceView />}
              {activeTab === 'global_stewardship' && <MeherahGlobalStewardshipView />}
              {activeTab === 'world_operating_layer' && <MeherahWorldOperatingLayerBlueprintView />}
              {activeTab === 'evolution_stage' && <MeherahEvolutionStageView />}
              {activeTab === 'network_intelligence_era' && <MeherahNetworkIntelligenceEraView />}
              {activeTab === 'institutional_adoption' && <MeherahInstitutionalAdoptionEngineView />}
              {activeTab === 'institutional_reality' && <MeherahInstitutionalRealityProofView />}
              {activeTab === 'maturity_stages' && <MeherahMaturityStagesView />}
              {activeTab === 'trust_intelligence_era' && <MeherahTrustIntelligenceEraView />}
              {activeTab === 'proof_of_trust' && <MeherahProofOfTrustView />}
              {activeTab === 'phase10_genesis' && <MeherahPhase10GenesisView />}
              {activeTab === 'phase9_network' && <MeherahPhase9GlobalNetworkView />}
              {activeTab === 'cognitive_ai' && <MeherahPhase8CognitiveView />}
              {activeTab === 'core_governance' && <MeherahCoreGovernanceView />}
              {activeTab === 'flutterwave_sandbox' && <FlutterwaveSandboxValidationView />}
              {activeTab === 'phase8' && <ProductionOperationsView />}
              {activeTab === 'phase7' && <InstitutionalValidationView />}
              {activeTab === 'phase6' && <InstitutionalTrustComplianceView />}
              {activeTab === 'phase5' && <UniversalFinancialNetworkView />}
              {activeTab === 'phase4' && <FinancialIntelligenceTrustView />}
              {activeTab === 'workspace' && <MeherahWorkspaceShell />}
              {activeTab === 'execution' && <FinancialExecutionView />}
              {activeTab === 'organ3' && <TreasuryFinancialIntelligenceView />}
              {activeTab === 'mission' && <MissionControlTelemetryView />}
              {activeTab === 'resilience' && <EnterpriseResilienceTab />}
              {activeTab === 'fluidic' && <FluidicFlowDashboard />}
              {activeTab === 'finance' && <UgandaFinanceCenterView />}
              {activeTab === 'swarm' && <AgentControlCenterView />}
              {activeTab === 'security' && <EnterpriseControlCenterView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
      }
    />
  );
}
