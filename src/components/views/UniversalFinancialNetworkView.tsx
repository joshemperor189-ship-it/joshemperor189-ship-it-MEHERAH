import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, ShieldCheck, Cpu, Brain, Zap, RefreshCw, Layers, Users, 
  CreditCard, Landmark, Smartphone, Activity, Play, CheckCircle2, 
  Sparkles, Lock, ArrowRight, Server, FileCode, Check, AlertTriangle,
  Search, ShieldAlert, BarChart3, Database, ChevronRight, Globe
} from 'lucide-react';

export function UniversalFinancialNetworkView() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'graph' | 'identity' | 'marketplace' | 'pilot' | 'gemini'>('simulation');

  // Connector Marketplace State
  const [registryData, setRegistryData] = useState<any>(null);

  // Identity State
  const [identityData, setIdentityData] = useState<any>(null);

  // Network Graph State
  const [graphData, setGraphData] = useState<any>(null);

  // Pilot State
  const [pilotData, setPilotData] = useState<any>(null);

  // Simulation State
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<any>(null);

  const fetchPhase5State = async () => {
    try {
      const [reg, ident, graph, pilot] = await Promise.all([
        fetch('/api/v1/phase5/connector-registry').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase5/universal-identity').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase5/network-graph').then(r => r.json()).catch(() => null),
        fetch('/api/v1/phase5/pilot-environment').then(r => r.json()).catch(() => null)
      ]);

      if (reg) setRegistryData(reg);
      if (ident) setIdentityData(ident);
      if (graph) setGraphData(graph);
      if (pilot) setPilotData(pilot);
    } catch (e) {
      console.warn('Phase 5 fetch error', e);
    }
  };

  useEffect(() => {
    fetchPhase5State();
  }, []);

  // Run Autonomous Financial Day Simulation
  const handleRunDaySimulation = async () => {
    setSimRunning(true);
    try {
      const res = await fetch('/api/v1/phase5/run-autonomous-day-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setSimResult(data);
      fetchPhase5State();
    } catch (e: any) {
      alert(`Simulation failed: ${e.message}`);
    } finally {
      setSimRunning(false);
    }
  };

  // Toggle Identity Permission
  const handleTogglePermission = async (connectionId: string, scopeKey: string) => {
    try {
      const res = await fetch('/api/v1/phase5/toggle-identity-permission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId, scopeKey })
      });
      const updated = await res.json();
      setIdentityData(updated);
    } catch (e: any) {
      alert(`Permission toggle failed: ${e.message}`);
    }
  };

  return (
    <div className="space-y-6 text-[#FDFBF7]">
      {/* Top Banner Header */}
      <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#F0A500]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" /> MEHERAH PHASE 5 — UNIVERSAL FINANCIAL NETWORK
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> GEMINI STRATEGIC INTELLIGENCE ACTIVE
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#FDFBF7]">
              Universal Financial Network & Gemini Strategic Intelligence Layer
            </h1>
            <p className="text-sm text-[#8C8275] mt-1 max-w-3xl">
              Connecting MEHERAH to real-world financial ecosystems through plug-and-play provider connectors, Universal Identity, live financial graph mapping, controlled pilot sandboxes, and autonomous day simulations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunDaySimulation}
              disabled={simRunning}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F0A500] to-[#D99400] text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#F0A500]/15"
            >
              {simRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              Launch Autonomous Financial Day Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1C160F] pb-2 overflow-x-auto">
        {[
          { id: 'simulation', label: '1. "Autonomous Financial Day" Demo', icon: Play },
          { id: 'graph', label: '2. MEHERAH Financial Graph', icon: Network },
          { id: 'identity', label: '3. Universal Identity Layer', icon: Users },
          { id: 'marketplace', label: '4. Provider Marketplace & SDK', icon: Server },
          { id: 'pilot', label: '5. Real-World Pilot Environment', icon: ShieldCheck },
          { id: 'gemini', label: '6. Gemini Strategic Intelligence', icon: Brain }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                active 
                  ? 'bg-[#F0A500] text-[#0A0907] font-semibold shadow-lg shadow-[#F0A500]/10'
                  : 'bg-[#120E09] hover:bg-[#1C160F] text-[#8C8275] border border-[#1C160F]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: AUTONOMOUS FINANCIAL DAY DEMO */}
      {activeTab === 'simulation' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1C160F] pb-4">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Play className="w-4 h-4 text-[#F0A500]" /> DEMO: MEHERAH AUTONOMOUS FINANCIAL DAY
              </h3>
              <p className="text-xs text-[#8C8275] mt-1">
                Simulates a full 24-hour financial cycle. Morning liquidity drops, midday transactional surge, afternoon network recovery. Demonstrates MEHERAH predicting pressure, adjusting routes, explaining decisions via Gemini, and protecting liquidity.
              </p>
            </div>

            <button
              onClick={handleRunDaySimulation}
              disabled={simRunning}
              className="px-4 py-2 rounded-xl bg-[#F0A500] text-[#0A0907] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-2"
            >
              {simRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              Run Full-Day Simulation
            </button>
          </div>

          {simResult ? (
            <div className="space-y-6">
              {/* Summary KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">TOTAL TRANSACTIONS</span>
                  <span className="text-xl font-bold font-mono text-[#FDFBF7]">{simResult.overallOutcome.totalTransactionsProcessed.toLocaleString()}</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">SUCCESS RATE</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{simResult.overallOutcome.overallSuccessRatePct}%</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">LIQUIDITY SAVED</span>
                  <span className="text-xl font-bold font-mono text-[#F0A500]">UGX {simResult.overallOutcome.liquiditySavedUGX.toLocaleString()}</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">AI DECISION ACCURACY</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{simResult.overallOutcome.aiDecisionAccuracyPct}%</span>
                </div>
              </div>

              {/* Day Phase Step Cards */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-[#8C8275] tracking-wider">FULL-DAY SIMULATION TIMELINE PHASES</h4>
                {simResult.steps.map((step: any, idx: number) => (
                  <div key={idx} className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1C160F] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20">
                          {step.timeOfDay}
                        </span>
                        <h5 className="text-xs font-bold text-[#FDFBF7] font-mono">{step.phaseTitle}</h5>
                      </div>

                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        SLA Success: {step.transactionSuccessRatePct}%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl space-y-1">
                        <span className="text-[10px] text-rose-400 font-bold block">MARKET & NETWORK EVENT:</span>
                        <p className="text-[#C2B7A7]">{step.marketEvent}</p>
                      </div>

                      <div className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl space-y-1">
                        <span className="text-[10px] text-[#F0A500] font-bold block">MEHERAH AUTONOMOUS ACTION:</span>
                        <p className="text-[#FDFBF7]">{step.meherahAutonomousAction}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#120E09] border border-emerald-500/20 rounded-xl text-xs font-mono text-[#A19688] space-y-1">
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <Brain className="w-3.5 h-3.5" /> GEMINI REASONING EXPLANATION:
                      </span>
                      <p>"{step.geminiReasoningExplanation}"</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8C8275] bg-[#120E09] p-2.5 rounded-xl border border-[#1C160F]">
                      <span>Active Route: <strong className="text-[#FDFBF7]">{step.activeProviderRoute}</strong></span>
                      <span>Health Index: <strong className="text-emerald-400">{step.networkHealthIndexPct}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 border border-dashed border-[#1C160F] rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Play className="w-10 h-10 text-[#5A544B] animate-pulse" />
              <div>
                <h4 className="text-xs font-mono font-bold text-[#FDFBF7]">Full-Day Autonomous Simulation Ready</h4>
                <p className="text-xs font-mono text-[#8C8275] max-w-md mt-1">
                  Click "Run Full-Day Simulation" to observe MEHERAH handle real-world provider liquidity shifts, midday payment volume spikes, and automatic route self-healing.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MEHERAH FINANCIAL GRAPH */}
      {activeTab === 'graph' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Network className="w-4 h-4 text-[#F0A500]" /> MEHERAH UNIVERSAL FINANCIAL GRAPH MAP
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Live directed graph connecting Users → Wallets → Banks → Mobile Money → Gateways → Liquidity Pools.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Graph Health Index: 99.2%
            </span>
          </div>

          {graphData ? (
            <div className="space-y-6">
              {/* Nodes Grid Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {graphData.nodes.map((node: any) => (
                  <div key={node.id} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-[#F0A500] border border-[#231A10]">
                        {node.type}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {node.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{node.label}</h4>

                    <div className="text-[11px] font-mono text-[#8C8275] space-y-1">
                      <div className="flex justify-between">
                        <span>Balance / Pool:</span>
                        <span className="text-[#FDFBF7] font-bold">UGX {node.balanceOrThroughputUGX.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reliability:</span>
                        <span className="text-emerald-400 font-bold">{node.reliabilityScorePct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Directed Edges Flow Velocity List */}
              <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#8C8275] tracking-wider">LIVE NETWORK FLOW EDGES & ROUTE VELOCITY</h4>
                <div className="space-y-2">
                  {graphData.edges.map((edge: any) => (
                    <div key={edge.id} className="p-3 bg-[#120E09] border border-[#231A10] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-[#F0A500] font-bold">{edge.sourceNodeId}</span>
                        <ChevronRight className="w-4 h-4 text-[#8C8275]" />
                        <span className="text-emerald-400 font-bold">{edge.targetNodeId}</span>
                      </div>

                      <div className="flex items-center gap-4 text-[#8C8275]">
                        <span>24h Flow: <strong className="text-[#FDFBF7]">UGX {edge.flowVolume24hUGX.toLocaleString()}</strong></span>
                        <span>Latency: <strong className="text-[#F0A500]">{edge.averageLatencyMs}ms</strong></span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">
                          {edge.activeStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading graph data...</p>
          )}
        </div>
      )}

      {/* TAB 3: UNIVERSAL IDENTITY LAYER */}
      {activeTab === 'identity' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F0A500]" /> MEHERAH UNIVERSAL FINANCIAL IDENTITY
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">One person, multiple financial connections. Aggregates balances, verifies ownership, and manages granular permissions.</p>
            </div>
          </div>

          {identityData ? (
            <div className="space-y-6">
              {/* Identity Header Card */}
              <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20">
                      {identityData.meherahId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {identityData.kycVerificationTier}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#FDFBF7] mt-1">{identityData.fullName}</h4>
                  <p className="text-xs font-mono text-[#8C8275]">National ID: {identityData.primaryNationalId} | Phone: {identityData.primaryPhone}</p>
                </div>

                <div className="p-4 bg-[#120E09] border border-[#231A10] rounded-xl text-right">
                  <span className="text-[10px] font-mono text-[#8C8275] block">AGGREGATED NET LIQUIDITY</span>
                  <span className="text-2xl font-bold font-mono text-[#F0A500]">UGX {identityData.totalAggregatedBalanceUGX.toLocaleString()}</span>
                </div>
              </div>

              {/* Connected Accounts List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">LINKED FINANCIAL CONNECTIONS & PERMISSION SCOPES</h4>
                {identityData.connections.map((conn: any) => (
                  <div key={conn.connectionId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1C160F] pb-2">
                      <div>
                        <h5 className="text-xs font-bold text-[#FDFBF7] font-mono flex items-center gap-2">
                          <CreditCard className="w-3.5 h-3.5 text-[#F0A500]" /> {conn.accountName}
                          <span className="text-[10px] text-[#8C8275]">({conn.accountIdentifier})</span>
                        </h5>
                        <p className="text-[10px] font-mono text-[#8C8275]">{conn.providerName}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold font-mono text-emerald-400">
                          UGX {conn.liquidBalanceUGX.toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                          {conn.status}
                        </span>
                      </div>
                    </div>

                    {/* Permissions Toggle Toggles */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                      {[
                        { key: 'allowInstantRouting', label: 'Instant Routing' },
                        { key: 'allowAutoTreasuryRebalance', label: 'Treasury Rebalance' },
                        { key: 'allowDailyPayrollSweeps', label: 'Payroll Sweeps' },
                        { key: 'dataSharingConsent', label: 'Data Consent' }
                      ].map(perm => (
                        <button
                          key={perm.key}
                          onClick={() => handleTogglePermission(conn.connectionId, perm.key)}
                          className={`p-2 rounded-lg border text-left transition-all ${
                            conn.permissionScopes[perm.key]
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : 'bg-[#120E09] border-[#231A10] text-[#8C8275]'
                          }`}
                        >
                          <span className="block font-bold">{perm.label}</span>
                          <span>{conn.permissionScopes[perm.key] ? 'ENABLED' : 'DISABLED'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading identity data...</p>
          )}
        </div>
      )}

      {/* TAB 4: PROVIDER MARKETPLACE & CONNECTOR SDK */}
      {activeTab === 'marketplace' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Server className="w-4 h-4 text-[#F0A500]" /> PROVIDER CONNECTOR MARKETPLACE & SDK
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Standardized connector SDK allows connecting new banks or wallets without touching MEHERAH Core.</p>
            </div>
          </div>

          {registryData ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registryData.connectors.map((conn: any) => (
                  <div key={conn.connectorId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#120E09] text-[#F0A500] border border-[#231A10]">
                        {conn.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        conn.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#F0A500]/10 text-[#F0A500]'
                      }`}>
                        {conn.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold font-mono text-[#FDFBF7]">{conn.name}</h4>
                      <p className="text-[10px] font-mono text-[#8C8275]">Version: {conn.apiVersion} | Auth: {conn.authType}</p>
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-[#8C8275] pt-2 border-t border-[#1C160F]">
                      <span>Latency: <strong className="text-[#FDFBF7]">{conn.latencyAvgMs}ms</strong></span>
                      <span>24h Success: <strong className="text-emerald-400">{conn.successRate24hPct}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading connector registry...</p>
          )}
        </div>
      )}

      {/* TAB 5: REAL-WORLD PILOT ENVIRONMENT */}
      {activeTab === 'pilot' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> CONTROLLED PILOT ENVIRONMENT & SLA MONITOR
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Monitors test merchants, sandbox providers, transaction limits, and SLA performance indicators.</p>
            </div>
          </div>

          {pilotData ? (
            <div className="space-y-6">
              {/* Pilot Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">PILOT TRANSACTIONS</span>
                  <span className="text-xl font-bold font-mono text-[#FDFBF7]">{pilotData.metrics.totalPilotTransactions.toLocaleString()}</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">PILOT SUCCESS RATE</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{pilotData.metrics.successRatePct}%</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">MEAN RECOVERY TIME</span>
                  <span className="text-xl font-bold font-mono text-[#F0A500]">{pilotData.metrics.meanRecoveryTimeMs}ms</span>
                </div>
                <div className="p-4 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">FALSE FRAUD ALERTS</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{pilotData.metrics.falseFraudAlerts}</span>
                </div>
              </div>

              {/* Pilot Users List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-[#8C8275]">REGISTERED PILOT USERS & DAILY LIMITS</h4>
                {pilotData.users.map((pu: any) => (
                  <div key={pu.userId} className="p-4 bg-[#0A0907] border border-[#1C160F] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
                    <div>
                      <h5 className="font-bold text-[#FDFBF7]">{pu.name}</h5>
                      <span className="text-[10px] text-[#8C8275]">Role: {pu.role} | ID: {pu.userId}</span>
                    </div>

                    <div className="flex items-center gap-4 text-[#8C8275]">
                      <span>Today's Used Volume: <strong className="text-[#F0A500]">UGX {pu.usedVolumeTodayUGX.toLocaleString()}</strong></span>
                      <span>Daily Limit: <strong className="text-[#FDFBF7]">UGX {pu.dailyVolumeLimitUGX.toLocaleString()}</strong></span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                        {pu.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-[#8C8275]">Loading pilot data...</p>
          )}
        </div>
      )}

      {/* TAB 6: GEMINI STRATEGIC INTELLIGENCE */}
      {activeTab === 'gemini' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#F0A500]" /> GEMINI STRATEGIC INTELLIGENCE AGENT
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Analyzes macro provider behavior, market conditions, route performance, and treasury forecasts.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Gemini Status: ONLINE & ACTIVE
            </span>
          </div>

          <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-4">
            <h4 className="text-xs font-bold font-mono text-[#F0A500]">STRATEGIC SAFETY HIERARCHY</h4>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="p-4 bg-[#120E09] border border-[#231A10] rounded-xl flex-1 text-center">
                <Brain className="w-5 h-5 text-[#F0A500] mx-auto mb-1" />
                <span className="font-bold text-[#FDFBF7] block">1. Gemini Suggestion</span>
                <span className="text-[10px] text-[#8C8275]">Advises & Analyzes</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8C8275] hidden md:block" />
              <div className="p-4 bg-[#120E09] border border-[#231A10] rounded-xl flex-1 text-center">
                <Lock className="w-5 h-5 text-[#FDFBF7] mx-auto mb-1" />
                <span className="font-bold text-[#FDFBF7] block">2. MEHERAH Policy Engine</span>
                <span className="text-[10px] text-[#8C8275]">Verifies Limits</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8C8275] hidden md:block" />
              <div className="p-4 bg-[#120E09] border border-[#231A10] rounded-xl flex-1 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="font-bold text-[#FDFBF7] block">3. Risk & Compliance</span>
                <span className="text-[10px] text-[#8C8275]">Approves Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8C8275] hidden md:block" />
              <div className="p-4 bg-[#120E09] border border-emerald-500/30 rounded-xl flex-1 text-center bg-emerald-500/10">
                <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="font-bold text-emerald-400 block">4. Financial Execution</span>
                <span className="text-[10px] text-emerald-300">Final Ledger Settlement</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
