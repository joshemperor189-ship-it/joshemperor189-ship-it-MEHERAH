import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Network, 
  Building2, 
  Landmark, 
  Zap, 
  ShieldCheck, 
  Brain, 
  TrendingUp, 
  DollarSign, 
  Lock, 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Code, 
  Layers, 
  Key, 
  Activity, 
  Scale, 
  Sparkles,
  ArrowRightLeft,
  Coins
} from 'lucide-react';

interface NetworkTopology {
  connectedCount: number;
  categories: string[];
  providers: Array<{
    id: string;
    name: string;
    category: string;
    countryCode: string;
    status: string;
    avgLatencyMs: number;
    successRate24h: number;
    baseFeeUGX: number;
    variableFeePct: number;
    liquidityUGX: number;
    predictiveRiskScore: number;
  }>;
  globalHealthStatus: string;
  predictiveIncidentsCount: number;
}

export function MeherahPhase9GlobalNetworkView() {
  const [activeModule, setActiveModule] = useState<'topology' | 'cross_route' | 'treasury' | 'governance' | 'sdk'>('topology');
  const [topology, setTopology] = useState<NetworkTopology | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cross Route Planner State
  const [amountUGX, setAmountUGX] = useState<number>(1000000);
  const [senderCategory, setSenderCategory] = useState<string>('MOBILE_MONEY');
  const [recipientCategory, setRecipientCategory] = useState<string>('BANK_ACH');
  const [isPlanningRoute, setIsPlanningRoute] = useState<boolean>(false);
  const [routePlanResult, setRoutePlanResult] = useState<any>(null);

  // Treasury State
  const [treasuryRec, setTreasuryRec] = useState<any>(null);

  // Governance State
  const [govAmountUGX, setGovAmountUGX] = useState<number>(75000000);
  const [initiatorRole, setInitiatorRole] = useState<'MAKER' | 'CHECKER' | 'AUDITOR'>('MAKER');
  const [govResult, setGovResult] = useState<any>(null);

  // SDK Spec State
  const [sdkSpec, setSdkSpec] = useState<any>(null);

  useEffect(() => {
    fetchNetworkData();
  }, []);

  const fetchNetworkData = async () => {
    setLoading(true);
    try {
      const [topRes, tresRes, sdkRes] = await Promise.all([
        fetch('/api/meherah/network/topology'),
        fetch('/api/meherah/treasury/recommendations'),
        fetch('/api/meherah/open-api/sdk-spec')
      ]);
      const topData = await topRes.json();
      const tresData = await tresRes.json();
      const sdkData = await sdkRes.json();
      setTopology(topData);
      setTreasuryRec(tresData);
      setSdkSpec(sdkData);

      // Trigger initial route plan
      await runCrossRoutePlanning(1000000, 'MOBILE_MONEY', 'BANK_ACH');
      await runGovernanceCheck(75000000, 'MAKER');
    } catch (err) {
      console.error('Failed to load Phase 9 network data:', err);
    } finally {
      setLoading(false);
    }
  };

  const runCrossRoutePlanning = async (amt: number, sCat: string, rCat: string) => {
    setIsPlanningRoute(true);
    try {
      const res = await fetch('/api/meherah/network/cross-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUGX: amt, senderCategory: sCat, recipientCategory: rCat })
      });
      const data = await res.json();
      setRoutePlanResult(data);
    } catch (err) {
      console.error('Cross route planning error:', err);
    } finally {
      setIsPlanningRoute(false);
    }
  };

  const runGovernanceCheck = async (amt: number, role: string) => {
    try {
      const res = await fetch('/api/meherah/governance/institutional-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUGX: amt, initiatorRole: role, complianceApproved: true })
      });
      const data = await res.json();
      setGovResult(data);
    } catch (err) {
      console.error('Governance check error:', err);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen">
      
      {/* 1. HERO BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase">
                PHASE 9 — GLOBAL FINANCIAL NETWORK
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" /> UNIVERSAL INTEROPERABILITY
              </span>
            </div>
            <h1 className="text-2xl font-bold font-playfair tracking-tight text-[#FFFFFF]">
              Connecting Sovereign Financial Systems into One Network
            </h1>
            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans">
              MEHERAH acts as the universal intelligence overlay coordinating mobile money, gateways, banks, government tax hubs, and international SWIFT rails without taking ownership of institutional infrastructure.
            </p>
          </div>

          <button
            onClick={fetchNetworkData}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 shadow-lg shadow-[#C9A227]/20 whitespace-nowrap disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''} text-[#070707]`} />
            Refresh Global Topology Matrix
          </button>
        </div>

        {/* PHASE 9 MODULE SUB-NAVIGATION BAR */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'topology', label: '1. Universal Connectivity Matrix', icon: Network },
            { id: 'cross_route', label: '2. Cross-Network Route Engine', icon: ArrowRightLeft },
            { id: 'treasury', label: '3. Intelligent Treasury & Float', icon: Coins },
            { id: 'governance', label: '4. Institutional Dual Control', icon: Scale },
            { id: 'sdk', label: '5. Open Developer API & SDK', icon: Code }
          ].map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id as any)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-[#C9A227] text-[#070707] shadow-md' 
                    : 'bg-[#070707] text-[#A7A7A7] hover:text-[#FFFFFF] border border-[#222222]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {mod.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MODULE CONTENT VIEWPORT */}

      {/* MODULE 1: UNIVERSAL CONNECTIVITY MATRIX */}
      {activeModule === 'topology' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#C9A227] uppercase">CONNECTED INFRASTRUCTURE MATRIX</span>
              <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Universal Provider Network Nodes</h2>
            </div>
            <span className="text-xs font-mono text-[#00B86B] bg-[#111111] px-3 py-1 rounded border border-[#00B86B]/30">
              {topology?.connectedCount || 8} NODES ONLINE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topology?.providers.map((node) => {
              const isLowRisk = node.predictiveRiskScore <= 0.05;
              return (
                <div key={node.id} className="p-5 bg-[#111111] border border-[#C9A227]/25 rounded-2xl space-y-3 relative overflow-hidden group hover:border-[#C9A227] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#E8C879] bg-[#070707] px-2 py-0.5 rounded border border-[#C9A227]/30 uppercase">
                      {node.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#A7A7A7]">{node.countryCode}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-sans text-[#FFFFFF]">{node.name}</h3>
                    <span className="text-[11px] font-mono text-[#00B86B] font-semibold">{node.status}</span>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-[#222222] text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">LATENCY:</span>
                      <span className="text-[#FFFFFF] font-bold">{node.avgLatencyMs} ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">24H UPTIME:</span>
                      <span className="text-[#00B86B] font-bold">{node.successRate24h}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">BASE FEE:</span>
                      <span className="text-[#E8C879] font-bold">UGX {node.baseFeeUGX.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">LIQUIDITY:</span>
                      <span className="text-[#FFFFFF] font-bold">UGX {(node.liquidityUGX / 1000000).toFixed(0)}M</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#A7A7A7]">PREDICTIVE RISK:</span>
                    <span className={`font-bold ${isLowRisk ? 'text-[#00B86B]' : 'text-[#FF9800]'}`}>
                      {(node.predictiveRiskScore * 100).toFixed(1)}% RISK
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODULE 2: CROSS-NETWORK ROUTE ENGINE */}
      {activeModule === 'cross_route' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-5">
            <div className="border-b border-[#222222] pb-3">
              <span className="text-xs font-mono font-bold text-[#E8C879] uppercase">CROSS-NETWORK ROUTER</span>
              <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Plan Multi-System Transfer</h2>
              <p className="text-xs text-[#A7A7A7] mt-1">
                Calculate optimal routing paths between disparate financial network tiers (e.g., Mobile Money float to Corporate Bank ACH).
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Sender Network Category</label>
                <select
                  value={senderCategory}
                  onChange={(e) => setSenderCategory(e.target.value)}
                  className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="MOBILE_MONEY">MOBILE_MONEY (MTN, Airtel)</option>
                  <option value="PAYMENT_GATEWAY">PAYMENT_GATEWAY (Flutterwave, Beyonic)</option>
                  <option value="BANK_ACH">BANK_ACH (Stanbic, Centenary, National ACH)</option>
                  <option value="GOVERNMENT_SYSTEM">GOVERNMENT_SYSTEM (URA e-Tax)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Recipient Network Category</label>
                <select
                  value={recipientCategory}
                  onChange={(e) => setRecipientCategory(e.target.value)}
                  className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="BANK_ACH">BANK_ACH (Stanbic, Centenary, National ACH)</option>
                  <option value="MOBILE_MONEY">MOBILE_MONEY (MTN, Airtel)</option>
                  <option value="INTERNATIONAL_RAIL">INTERNATIONAL_RAIL (SWIFT Direct)</option>
                  <option value="GOVERNMENT_SYSTEM">GOVERNMENT_SYSTEM (URA e-Tax)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Transfer Amount (UGX)</label>
                <input
                  type="number"
                  value={amountUGX}
                  onChange={(e) => setAmountUGX(Number(e.target.value))}
                  className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <button
                onClick={() => runCrossRoutePlanning(amountUGX, senderCategory, recipientCategory)}
                disabled={isPlanningRoute}
                className="w-full py-3.5 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20 disabled:opacity-50"
              >
                {isPlanningRoute ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> Computing Universal Route Matrix...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current text-[#070707]" /> Generate Cross-Network Route Plan
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <span className="text-xs font-mono font-bold text-[#00B86B] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#C9A227]" /> INTEROPERABLE ROUTE PLAN OUTPUT
              </span>
              <span className="text-xs font-mono text-[#E8C879]">
                PROTOCOL: v9.0 UNIVERSAL
              </span>
            </div>

            {routePlanResult ? (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-2">
                  <span className="text-[#C9A227] font-bold block uppercase">SELECTED OPTIMAL INTERMEDIARY:</span>
                  <h3 className="text-lg font-bold text-[#FFFFFF] font-sans">{routePlanResult.decision?.selectedProvider}</h3>
                  <p className="text-[#A7A7A7] font-sans text-xs">{routePlanResult.decision?.explainableNarrative}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-[#070707] p-4 rounded-xl border border-[#222222]">
                  <div>
                    <span className="text-[10px] text-[#A7A7A7] block">MONEY SAVED</span>
                    <span className="text-sm font-bold text-[#00B86B]">UGX {routePlanResult.decision?.userBenefit?.moneySavedUGX?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A7A7A7] block">TIME SAVED</span>
                    <span className="text-sm font-bold text-[#E8C879]">{routePlanResult.decision?.userBenefit?.timeSaved}</span>
                  </div>
                </div>

                <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
                  <span className="text-[#A7A7A7] text-[10px] uppercase font-bold block">INTEROPERABILITY PROOF</span>
                  <div className="text-[11px] text-[#00B86B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Double-entry mirror ledger verified & KMS HMAC signed
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#A7A7A7] font-mono">
                Computing optimal cross-network path...
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 3: INTELLIGENT TREASURY & FLOAT */}
      {activeModule === 'treasury' && (
        <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#C9A227] uppercase">AUTONOMOUS TREASURY ENGINE</span>
              <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Working Capital & Idle Float Optimization</h2>
            </div>
            <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30">
              YIELD OPTIMIZATION ACTIVE
            </span>
          </div>

          {treasuryRec && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-3">
                <span className="text-[#E8C879] font-bold block uppercase text-[11px]">RECOMMENDED TREASURY ACTION</span>
                <h3 className="text-base font-bold text-[#FFFFFF] font-sans">{treasuryRec.primaryAction}</h3>
                <div className="p-3 bg-[#111111] border border-[#222222] rounded-lg space-y-1 text-[#A7A7A7]">
                  <span className="text-[10px] font-bold text-[#00B86B] block">OPTIMAL FUNDING VAULT</span>
                  <span>{treasuryRec.optimalFundingVault}</span>
                </div>
              </div>

              <div className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-3">
                <span className="text-[#E8C879] font-bold block uppercase text-[11px]">IDLE FLOAT CONSOLIDATION</span>
                <div className="space-y-1.5 text-[#A7A7A7]">
                  <p><strong className="text-[#FFFFFF]">Source Vault:</strong> {treasuryRec.idleBalanceConsolidation?.sourceVault}</p>
                  <p><strong className="text-[#FFFFFF]">Target Vault:</strong> {treasuryRec.idleBalanceConsolidation?.targetVault}</p>
                  <p><strong className="text-[#FFFFFF]">Amount:</strong> UGX {treasuryRec.idleBalanceConsolidation?.amountToConsolidateUGX?.toLocaleString()}</p>
                  <p className="text-[#00B86B] font-bold pt-1">{treasuryRec.idleBalanceConsolidation?.expectedWorkingCapitalGain}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 4: INSTITUTIONAL DUAL CONTROL */}
      {activeModule === 'governance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-5">
            <div className="border-b border-[#222222] pb-3">
              <span className="text-xs font-mono font-bold text-[#E8C879] uppercase">ENTERPRISE DUAL CONTROL</span>
              <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Maker/Checker Policy Simulator</h2>
              <p className="text-xs text-[#A7A7A7] mt-1">
                Evaluate high-value corporate transfers requiring multi-signature approval and compliance checks.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Initiator Role</label>
                <select
                  value={initiatorRole}
                  onChange={(e) => {
                    const r = e.target.value as any;
                    setInitiatorRole(r);
                    runGovernanceCheck(govAmountUGX, r);
                  }}
                  className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="MAKER">MAKER (Finance Associate)</option>
                  <option value="CHECKER">CHECKER (Executive Financial Officer)</option>
                  <option value="AUDITOR">AUDITOR (Compliance Inspector)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Transfer Amount (UGX)</label>
                <input
                  type="number"
                  value={govAmountUGX}
                  onChange={(e) => {
                    const amt = Number(e.target.value);
                    setGovAmountUGX(amt);
                    runGovernanceCheck(amt, initiatorRole);
                  }}
                  className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <span className="text-xs font-mono font-bold text-[#C9A227] uppercase">GOVERNANCE POLICY RESULT</span>
              <span className="text-xs font-mono text-[#E8C879]">{govResult?.status}</span>
            </div>

            {govResult && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-[#070707] border border-[#C9A227]/30 rounded-xl space-y-2">
                  <span className="text-[#A7A7A7] text-[10px] uppercase font-bold block">REQUIRED NEXT ACTION:</span>
                  <p className="text-sm font-bold text-[#FFFFFF] font-sans">{govResult.requiredNextAction}</p>
                </div>

                <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <span className="text-[#C9A227] font-bold block uppercase text-[10px]">ENFORCED COMPLIANCE RULES:</span>
                  <ul className="space-y-1 text-[#A7A7A7]">
                    {govResult.policy?.complianceRules?.map((rule: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00B86B]" /> {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 5: OPEN DEVELOPER API & SDK */}
      {activeModule === 'sdk' && (
        <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <div>
              <span className="text-xs font-bold text-[#C9A227] uppercase">OPEN INTEGRATION PLATFORM</span>
              <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Developer SDK & REST Specification</h2>
            </div>
            <span className="text-xs text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30">
              API VERSION v9.0.0
            </span>
          </div>

          <div className="p-4 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-2">
            <span className="text-[#E8C879] font-bold block uppercase text-[10px]">SAMPLE CROSS-NETWORK CURL REQUEST</span>
            <pre className="p-3 bg-[#111111] border border-[#222222] rounded-lg text-[#00B86B] overflow-x-auto">
              {sdkSpec?.sampleCurl || 'curl -X POST https://api.meherah.os/v9/network/cross-route'}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}
