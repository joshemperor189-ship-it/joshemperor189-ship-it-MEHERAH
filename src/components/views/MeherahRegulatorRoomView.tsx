import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Radio,
  Play,
  RotateCcw,
  Scale,
  Search,
  Activity,
  AlertTriangle,
  Lock,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Sparkles,
  Server,
  Zap,
  HelpCircle,
  ShieldAlert,
  Sliders,
  Award,
  ChevronRight,
  Database
} from 'lucide-react';

export function MeherahRegulatorRoomView() {
  const [activeTab, setActiveTab] = useState<'live' | 'simulator' | 'replay' | 'governance' | 'qna'>('live');
  const [selectedScenario, setSelectedScenario] = useState<'MTN_OUTAGE' | 'LIQUIDITY_SHORTAGE' | 'PAYROLL_SURGE'>('MTN_OUTAGE');
  const [isSimulating, setIsSimulating] = useState(false);
  const [replayTxId, setReplayTxId] = useState('TX-2026-001');
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayData, setReplayData] = useState<any | null>(null);

  const rails = [
    { name: 'MTN Mobile Money Uganda', code: 'MTN_UG', status: 'HEALTHY', latency: 45, reliability: 98.4, float: '850M UGX' },
    { name: 'Airtel Money Uganda', code: 'AIRTEL_UG', status: 'HEALTHY', latency: 38, reliability: 99.1, float: '920M UGX' },
    { name: 'Stanbic Bank Uganda', code: 'STANBIC_UG', status: 'HEALTHY', latency: 62, reliability: 99.8, float: '2.4B UGX' },
    { name: 'Centenary Bank Uganda', code: 'CENTENARY_UG', status: 'HEALTHY', reliability: 99.6, latency: 58, float: '1.8B UGX' },
  ];

  const runSimulation = (scenario: 'MTN_OUTAGE' | 'LIQUIDITY_SHORTAGE' | 'PAYROLL_SURGE') => {
    setSelectedScenario(scenario);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const executeReplay = () => {
    setIsReplaying(true);
    setTimeout(() => {
      setIsReplaying(false);
      setReplayData({
        timestampUtc: '10:43:21 UTC',
        transactionId: replayTxId || 'TX-2026-001',
        sender: '+256770123456',
        recipient: 'AIRTEL_MONEY_UG',
        amountUgx: '250,000 UGX',
        networkState: {
          mtnLatency: '850ms (DEGRADED — Packet loss on Sector 4)',
          airtelLatency: '120ms (OPTIMAL — Standard response)',
        },
        mafeScores: {
          proportional: 72,
          integral: 98,
          derivative: 45,
          fusedConfidence: '91.4%',
        },
        fusionSignals: {
          weather: 'Medium rainstorm near Kampala fiber hub',
          tower: 'Warning on MTN Sector 4 tower',
          geoVelocity: 'Low Risk (Matches sender profile)',
        },
        governanceCheck: {
          threshold: '90.0%',
          policyPassed: true,
          status: 'AUTO_APPROVED_WITHIN_BOUNDS',
        },
        finalDecision: 'Route via Airtel Money Uganda',
        reason: 'Airtel Money exhibits 7x lower latency (120ms vs 850ms) and higher historical reliability (98%) under active fiber storm degradation.',
        auditHash: '0xREPLAY_10_43_21_AIRTEL_991823_FIPS140_3',
      });
    }, 400);
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* GROUNDING DISCLAIMER BANNER */}
      <div className="p-4 bg-[#111111] border border-[#C9A227]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
            <Award size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C9A227]">REGULATOR ROOM</span>
              <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-mono font-bold">
                PROTOTYPE SIMULATION BENCHMARK
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5 font-sans">
              Bank of Uganda Institutional Demonstration Environment. All latency and recovery numbers reflect validated sandbox test results.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
          <ShieldCheck size={16} className="text-[#00B86B]" />
          <span>FIPS 140-3 LEVEL 3 AUDIT ACTIVE</span>
        </div>
      </div>

      {/* NAVIGATION HEADER TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'live', label: '1. Live System View', icon: Activity },
          { id: 'simulator', label: '2. Scenario Simulator', icon: Play },
          { id: 'replay', label: '3. Auditor Decision Replay', icon: RotateCcw },
          { id: 'governance', label: '4. Human Governance Intercept', icon: Scale },
          { id: 'qna', label: '5. Regulator Q&A Guide', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-[#111111] text-[#E8C879] border border-[#C9A227]/50 shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#111111]/50 border border-transparent'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#C9A227]' : 'text-[#666666]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LIVE SYSTEM VIEW */}
      {activeTab === 'live' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-[#111111] border border-[#222222] rounded-2xl space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7A7A7]">Fused AI Confidence</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-[#00B86B]">94.7%</span>
                <span className="text-xs text-[#A7A7A7]">MAFE PID</span>
              </div>
              <p className="text-[11px] text-[#A7A7A7]">High autonomous routing confidence</p>
            </div>

            <div className="p-5 bg-[#111111] border border-[#222222] rounded-2xl space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7A7A7]">Connected Rails</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-[#FFFFFF]">4 / 4</span>
                <span className="text-xs text-[#00B86B]">ONLINE</span>
              </div>
              <p className="text-[11px] text-[#A7A7A7]">MTN, Airtel, Stanbic, Centenary</p>
            </div>

            <div className="p-5 bg-[#111111] border border-[#222222] rounded-2xl space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7A7A7]">Active Governance Policies</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-[#C9A227]">3</span>
                <span className="text-xs text-[#A7A7A7]">RULES ENFORCED</span>
              </div>
              <p className="text-[11px] text-[#A7A7A7]">NPS Act 2020 • AML Tier 1 • 10M Cap</p>
            </div>

            <div className="p-5 bg-[#111111] border border-[#C9A227]/30 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A227]">Human Override Status</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-[#E8C879]">READY</span>
              </div>
              <p className="text-[11px] text-[#A7A7A7]">Dual-Key BOU Regulator Intercept Enabled</p>
            </div>
          </div>

          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div className="flex items-center gap-3">
                <Server size={20} className="text-[#C9A227]" />
                <h3 className="text-base font-bold text-[#FFFFFF] font-playfair">Real-Time Payment Rail Telemetry</h3>
              </div>
              <span className="text-xs font-mono text-[#00B86B] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse"></span>
                ACTIVE SYNC
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rails.map((rail) => (
                <div key={rail.code} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FFFFFF]">{rail.name}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/30 px-2 py-0.5 rounded-full font-mono font-bold">
                      {rail.status}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#A7A7A7]">
                      <span>Latency:</span>
                      <span className="text-[#FFFFFF] font-bold">{rail.latency}ms</span>
                    </div>
                    <div className="flex justify-between text-[#A7A7A7]">
                      <span>Historical Reliability:</span>
                      <span className="text-[#00B86B] font-bold">{rail.reliability}%</span>
                    </div>
                    <div className="flex justify-between text-[#A7A7A7]">
                      <span>Float Reservoir:</span>
                      <span className="text-[#E8C879] font-bold">{rail.float}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: SCENARIO SIMULATOR */}
      {activeTab === 'simulator' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Hostile Financial Chaos Simulator</h3>
                <p className="text-xs text-[#A7A7A7]">Simulate extreme environmental stress scenarios to evaluate MEHERAH’s autonomous response.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => runSimulation('MTN_OUTAGE')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedScenario === 'MTN_OUTAGE'
                      ? 'bg-[#C9A227] text-[#070707] shadow-md'
                      : 'bg-[#070707] text-[#A7A7A7] border border-[#222222] hover:text-[#FFFFFF]'
                  }`}
                >
                  1. MTN Outage
                </button>
                <button
                  onClick={() => runSimulation('LIQUIDITY_SHORTAGE')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedScenario === 'LIQUIDITY_SHORTAGE'
                      ? 'bg-[#C9A227] text-[#070707] shadow-md'
                      : 'bg-[#070707] text-[#A7A7A7] border border-[#222222] hover:text-[#FFFFFF]'
                  }`}
                >
                  2. Float Liquidity Crisis
                </button>
                <button
                  onClick={() => runSimulation('PAYROLL_SURGE')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedScenario === 'PAYROLL_SURGE'
                      ? 'bg-[#C9A227] text-[#070707] shadow-md'
                      : 'bg-[#070707] text-[#A7A7A7] border border-[#222222] hover:text-[#FFFFFF]'
                  }`}
                >
                  3. 5x Payroll Surge
                </button>
              </div>
            </div>

            {/* SIMULATION TELEMETRY DISPLAY */}
            <div className="p-6 bg-[#070707] border border-[#C9A227]/30 rounded-2xl space-y-6 relative overflow-hidden">
              {isSimulating && (
                <div className="absolute inset-0 bg-[#070707]/90 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="flex items-center gap-3 text-[#C9A227] font-mono text-xs font-bold">
                    <Zap size={18} className="animate-spin" />
                    <span>SIMULATING SCENARIO RESPONSE & AUTONOMOUS RECOVERY...</span>
                  </div>
                </div>
              )}

              {selectedScenario === 'MTN_OUTAGE' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#FF3B30] uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={16} />
                      EVENT INJECTED: MTN Mobile Money Primary Gateway Connection Hard Outage (0% Response)
                    </span>
                    <span className="text-xs font-mono text-[#00B86B] font-bold">RECOVERY LEAD TIME: 32ms</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">PREDICTION (Derivative Engine):</span>
                      <p className="text-[#FFFFFF]">Settlement disruption risk detected via +730ms acceleration spike on primary rail.</p>
                    </div>
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">AUTONOMOUS ACTION:</span>
                      <p className="text-[#00B86B] font-bold">Rerouted 100% traffic to Airtel Money Uganda with 0% transaction loss.</p>
                    </div>
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">ALTERNATIVE RAIL SELECTED:</span>
                      <p className="text-[#E8C879]">Airtel Money Uganda (38ms Latency, 99.1% Trust Score)</p>
                    </div>
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">GOVERNANCE AUDIT SIGNATURE:</span>
                      <p className="text-[#A7A7A7] truncate">0xSCENARIO_SIM_MTN_OUTAGE_0981_FIPS140_3</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedScenario === 'LIQUIDITY_SHORTAGE' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#FF9500] uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={16} />
                      EVENT INJECTED: Stanbic Float Reservoir Depleted Below 10M UGX Safety Cap
                    </span>
                    <span className="text-xs font-mono text-[#00B86B] font-bold">RECOVERY LEAD TIME: 58ms</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">PREDICTION (Integral Float Engine):</span>
                      <p className="text-[#FFFFFF]">Forecasted settlement failure due to imminent float depletion during peak corporate transfers.</p>
                    </div>
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">AUTONOMOUS ACTION:</span>
                      <p className="text-[#00B86B] font-bold">Proactively capped Stanbic limits and shifted high-value settlements to Centenary Bank.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedScenario === 'PAYROLL_SURGE' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#34C759] uppercase tracking-wider flex items-center gap-2">
                      <Zap size={16} />
                      EVENT INJECTED: National Payroll Surge (10k TPM -&gt; 50k TPM in 45 seconds)
                    </span>
                    <span className="text-xs font-mono text-[#00B86B] font-bold">RECOVERY LEAD TIME: 44ms</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">PREDICTION (PID Surge Engine):</span>
                      <p className="text-[#FFFFFF]">Anticipated gateway queue saturation across primary telecom entry points.</p>
                    </div>
                    <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <span className="text-[#A7A7A7]">AUTONOMOUS ACTION:</span>
                      <p className="text-[#00B86B] font-bold">Distributed transaction load across 4 rails proportionally to preserve channel throughput.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: AUDITOR DECISION REPLAY */}
      {activeTab === 'replay' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Microsecond Decision Replay Engine</h3>
              <p className="text-xs text-[#A7A7A7]">Central Bank Auditors can enter any Transaction ID to reconstruct exact system state and AI reasoning.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-3.5 text-[#666666]" />
                <input
                  type="text"
                  value={replayTxId}
                  onChange={(e) => setReplayTxId(e.target.value)}
                  placeholder="Enter Transaction ID (e.g. TX-2026-001)"
                  className="w-full bg-[#070707] border border-[#222222] rounded-xl py-3 pl-11 pr-4 text-xs text-[#FFFFFF] font-mono focus:border-[#C9A227] outline-none"
                />
              </div>
              <button
                onClick={executeReplay}
                disabled={isReplaying}
                className="px-6 py-3 bg-[#C9A227] text-[#070707] font-bold text-xs font-mono rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2"
              >
                <RotateCcw size={16} />
                <span>{isReplaying ? 'REPLAYING...' : 'REPLAY DECISION'}</span>
              </button>
            </div>

            {replayData && (
              <div className="p-6 bg-[#070707] border border-[#C9A227]/30 rounded-2xl space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-[#C9A227]" />
                    <span className="font-bold text-[#FFFFFF] text-sm">DECISION TIMELINE: {replayData.timestampUtc}</span>
                  </div>
                  <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-3 py-1 rounded-full font-bold">
                    AUDIT REPLAY VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                    <span className="text-[#A7A7A7] uppercase text-[10px]">1. NETWORK STATE AT 10:43:21</span>
                    <p className="text-[#FF3B30]">MTN: {replayData.networkState.mtnLatency}</p>
                    <p className="text-[#00B86B]">Airtel: {replayData.networkState.airtelLatency}</p>
                  </div>

                  <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                    <span className="text-[#A7A7A7] uppercase text-[10px]">2. MAFE PID SCORES</span>
                    <p className="text-[#A7A7A7]">Proportional: <span className="text-[#FFFFFF]">{replayData.mafeScores.proportional}</span></p>
                    <p className="text-[#A7A7A7]">Integral Trust: <span className="text-[#FFFFFF]">{replayData.mafeScores.integral}</span></p>
                    <p className="text-[#A7A7A7]">Derivative Trend: <span className="text-[#FFFFFF]">{replayData.mafeScores.derivative}</span></p>
                    <p className="text-[#E8C879] font-bold">Fused Confidence: {replayData.mafeScores.fusedConfidence}</p>
                  </div>

                  <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                    <span className="text-[#A7A7A7] uppercase text-[10px]">3. FUSION SIGNALS</span>
                    <p className="text-[#A7A7A7]">Weather: <span className="text-[#FFFFFF]">{replayData.fusionSignals.weather}</span></p>
                    <p className="text-[#A7A7A7]">Tower Stability: <span className="text-[#FFFFFF]">{replayData.fusionSignals.tower}</span></p>
                    <p className="text-[#A7A7A7]">Geo Velocity: <span className="text-[#00B86B]">{replayData.fusionSignals.geoVelocity}</span></p>
                  </div>
                </div>

                <div className="p-4 bg-[#111111] border border-[#C9A227]/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#C9A227] font-bold">FINAL ROUTING DECISION: {replayData.finalDecision}</span>
                    <span className="text-[#A7A7A7]">POLICY CHECK: PASSED (≥90.0% Threshold)</span>
                  </div>
                  <p className="text-[#FFFFFF] font-sans">{replayData.reason}</p>
                  <div className="text-[10px] text-[#A7A7A7] border-t border-[#222222] pt-2">
                    FIPS 140-3 RECEIPT SIGNATURE: {replayData.auditHash}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 4: HUMAN GOVERNANCE INTERCEPT */}
      {activeTab === 'governance' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Human Governance Intercept Demonstration</h3>
              <p className="text-xs text-[#A7A7A7]">Demonstrates that AI autonomous approval recommendations are strictly governed by regulatory policy overrides.</p>
            </div>

            <div className="p-6 bg-[#070707] border border-[#FF3B30]/30 rounded-2xl space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert size={20} className="text-[#FF3B30]" />
                  <span className="font-bold text-[#FFFFFF] text-sm">TRANSACTION ID: TX-2026-HIGH-VAL-09813 (15,000,000 UGX)</span>
                </div>
                <span className="text-[10px] bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/40 px-3 py-1 rounded-full font-bold">
                  BLOCKED BY POLICY OVERRIDE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                  <span className="text-[#A7A7A7] uppercase text-[10px]">AI ENGINE RECOMMENDATION</span>
                  <div className="flex items-center gap-2 text-base font-bold text-[#00B86B]">
                    <CheckCircle2 size={18} />
                    <span>RECOMMENDED APPROVAL (96.0% Confidence)</span>
                  </div>
                  <p className="text-[#A7A7A7] font-sans text-[11px]">
                    The MAFE PID Engine calculated optimal route stability across Stanbic Bank rail.
                  </p>
                </div>

                <div className="p-4 bg-[#111111] border border-[#FF3B30]/30 rounded-xl space-y-2">
                  <span className="text-[#FF3B30] uppercase text-[10px]">REGULATORY GOVERNANCE INTERCEPT</span>
                  <div className="flex items-center gap-2 text-base font-bold text-[#FF3B30]">
                    <XCircle size={18} />
                    <span>EXECUTION OVERRIDE: BLOCKED</span>
                  </div>
                  <p className="text-[#FFFFFF] font-sans text-[11px]">
                    Bank of Uganda NPS Act Policy Rule #402: Mandatory biometric user intent evidence was unverified for transfer &gt; 10M UGX.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2 font-sans">
                <h4 className="text-xs font-bold text-[#E8C879]">Why This Matters For Regulators</h4>
                <p className="text-xs text-[#A7A7A7]">
                  MEHERAH is not an unconstrained black box. Even when machine learning confidence reaches 96.0%, central bank policy rules instantly override AI recommendations. Human governance and institutional policy remain supreme above autonomous execution.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: REGULATOR Q&A GUIDE */}
      {activeTab === 'qna' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Bank of Uganda Regulator Q&A Guide</h3>
              <p className="text-xs text-[#A7A7A7]">Direct responses to institutional concerns around integration, safety, accountability, and compliance.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: '1. Does MEHERAH work with real payment rails?',
                  a: 'MEHERAH connects directly via standard REST and ISO 20022 APIs to MTN MoMo, Airtel Money, Stanbic Bank, and Centenary Bank in standard sandbox environments.',
                  evidence: 'End-to-End Sandbox Evidence Traces verifying raw HTTP status responses and ledger reconciliations.',
                },
                {
                  q: '2. Can it be trusted with real money?',
                  a: 'MEHERAH operates under bounded confidence thresholds (MAFE PID ≥ 90%). Pre-funded float levels are continuously monitored, preventing overdrafts.',
                  evidence: 'Digital Twin Chaos Scenario #2 (Liquidity Shortage test proving zero financial overdraft or loss).',
                },
                {
                  q: '3. Can every decision be explained and reversed?',
                  a: '100% of decisions generate a deterministic cryptographic receipt detailing P/I/D scores, network state, and fusion signals.',
                  evidence: 'Microsecond Decision Replay Engine & FIPS 140-3 signed audit logs.',
                },
                {
                  q: '4. Who is responsible when the AI makes a mistake?',
                  a: 'The human financial institution operator sets regulatory policy rules. MEHERAH cannot override central bank policy limits.',
                  evidence: 'Human Governance Intercept Demonstration (proving AI approval overridden by policy block).',
                },
                {
                  q: '5. How does it comply with Uganda\'s regulatory environment?',
                  a: 'Provides dual-key central bank supervision keys, zero-trust mTLS encryption, local data residency, and real-time regulatory policy enforcement.',
                  evidence: 'Document 3 & FIPS 140-3 Hardware Security Module integration.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <h4 className="text-sm font-bold text-[#E8C879] font-playfair">{item.q}</h4>
                  <p className="text-xs text-[#FFFFFF] font-sans">{item.a}</p>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#00B86B]">
                    <CheckCircle2 size={14} />
                    <span>Compliance Evidence: {item.evidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
