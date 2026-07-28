import React, { useState } from 'react';
import { Cpu, ShieldCheck, Play, Pause, RefreshCw, Terminal, CheckCircle2, AlertTriangle, Zap, Sliders, Activity, Database, Lock } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'paused';
  latency: string;
  tasksCompleted: number;
  cpuUsage: string;
}

interface AgentTelemetryProps {
  agentName: string;
  tokensPerSec: number;
  accumulatedCostUSD: number;
  taskSuccessRate: number;
}

export const AgentPerformanceTelemetryCard: React.FC<AgentTelemetryProps> = ({
  agentName,
  tokensPerSec,
  accumulatedCostUSD,
  taskSuccessRate
}) => {
  // Convert live currency values directly to UGX base rate values (e.g., 1 USD = 3,700 UGX standard exchange tracking approximation)
  const costInUGX = (accumulatedCostUSD * 3700).toLocaleString('en-UG', { maximumFractionDigits: 0 });

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-emerald-400 font-bold tracking-wider">{agentName.toUpperCase()} PERF</h3>
        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">LIVE ENGINE</span>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">SPEED:</span>
          <span className="text-emerald-300 font-bold">{tokensPerSec} t/s</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">BURNRATE:</span>
          <span className="text-amber-400 font-bold">{costInUGX} UGX (${accumulatedCostUSD.toFixed(4)})</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">SLA ACCURACY:</span>
          <span className={`${taskSuccessRate >= 95 ? 'text-emerald-400' : 'text-rose-400'} font-bold`}>
            {taskSuccessRate}%
          </span>
        </div>
      </div>

      {/* Visual Telemetry Bar Component */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" 
          style={{ width: `${taskSuccessRate}%` }}
        />
      </div>
    </div>
  );
};

export const AgentControlCenterView: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'ag_01', name: 'Liquidity Router Agent', role: 'Cross-Network Settlement', status: 'active', latency: '42ms', tasksCompleted: 1420, cpuUsage: '12%' },
    { id: 'ag_02', name: 'Zero-Trust PII Scrubber', role: 'Data Sanitization & Masking', status: 'active', latency: '18ms', tasksCompleted: 3891, cpuUsage: '8%' },
    { id: 'ag_03', name: 'Fraud & Risk Evaluator', role: 'Anomalous Transaction Intercept', status: 'active', latency: '65ms', tasksCompleted: 890, cpuUsage: '15%' },
    { id: 'ag_04', name: 'MoMo Webhook Listener', role: 'Telco Status Synchronization', status: 'active', latency: '24ms', tasksCompleted: 2410, cpuUsage: '5%' },
    { id: 'ag_05', name: 'ZK-SNARK Proof Generator', role: 'Cryptographic Privacy Proofs', status: 'idle', latency: '110ms', tasksCompleted: 612, cpuUsage: '2%' },
    { id: 'ag_06', name: 'Audit & Telemetry Logger', role: 'Ledger Audit Trail Retention', status: 'active', latency: '15ms', tasksCompleted: 4120, cpuUsage: '4%' },
  ]);

  const [autoEscrow, setAutoEscrow] = useState(true);
  const [piiScrubbing, setPiiScrubbing] = useState(true);
  const [rateLimiting, setRateLimiting] = useState(true);
  const [maxTransferCap, setMaxTransferCap] = useState('50000000');

  const [logs, setLogs] = useState([
    { id: '1', time: '10:41:02', agent: 'Zero-Trust PII Scrubber', message: 'Masked UG phone number [+256 772 *** ***] in incoming prompt payload', status: 'info' },
    { id: '2', time: '10:40:48', agent: 'Liquidity Router Agent', message: 'Settled 250,000 UGX via MTN MoMo -> Stanbic FlexiPay', status: 'success' },
    { id: '3', time: '10:39:15', agent: 'Fraud & Risk Evaluator', message: 'Evaluated transaction risk score: 0.02 (CLEAR)', status: 'info' },
    { id: '4', time: '10:38:01', agent: 'ZK-SNARK Proof Generator', message: 'Generated zero-knowledge validity proof 0x7e834b2cf6...', status: 'success' },
  ]);

  const toggleAgentStatus = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'active' ? 'paused' : 'active';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const triggerManualScrubTest = () => {
    const newLog = {
      id: String(Date.now()),
      time: new Date().toLocaleTimeString(),
      agent: 'Zero-Trust PII Scrubber',
      message: 'Self-check trigger: Scanned 12 prompt payloads, 0 leaks detected.',
      status: 'success'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* HEADER & METRICS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#231E16] pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#F0A500] to-[#D37506] bg-clip-text text-transparent">
            AGENT CLUSTER & POLICY CONTROL
          </h1>
          <p className="text-sm text-[#A39E93] mt-1">Autonomous Swarm Governance & Policy Enforcement Enclave</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={triggerManualScrubTest}
            className="flex items-center gap-2 bg-[#17140F] hover:bg-[#231E16] border border-[#2A2319] text-[#E6E1D6] px-4 py-2 rounded-xl text-xs font-semibold transition-all"
          >
            <RefreshCw size={14} className="text-[#F0A500]" />
            RUN SWARM DIAGNOSTIC
          </button>
        </div>
      </div>

      {/* TOP AGENT OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8A8477] uppercase font-semibold tracking-wider">Active Swarm Nodes</p>
            <p className="text-2xl font-bold mt-1 text-[#FDFBF7]">5 <span className="text-xs text-[#8A8477]">/ 6 Running</span></p>
          </div>
          <div className="p-3 bg-[#1C1811] rounded-xl text-[#F0A500]"><Cpu size={20} /></div>
        </div>

        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8A8477] uppercase font-semibold tracking-wider">Zero-Trust Intercepts</p>
            <p className="text-2xl font-bold mt-1 text-[#10B981]">100% <span className="text-xs text-[#A39E93]">Clean</span></p>
          </div>
          <div className="p-3 bg-[#1C1811] rounded-xl text-[#10B981]"><ShieldCheck size={20} /></div>
        </div>

        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8A8477] uppercase font-semibold tracking-wider">Swarm Avg Latency</p>
            <p className="text-2xl font-bold mt-1 text-[#FDFBF7]">29.3 <span className="text-xs text-[#D37506]">ms</span></p>
          </div>
          <div className="p-3 bg-[#1C1811] rounded-xl text-[#D37506]"><Zap size={20} /></div>
        </div>

        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8A8477] uppercase font-semibold tracking-wider">Executed Sub-Tasks</p>
            <p className="text-2xl font-bold mt-1 text-[#FDFBF7]">12,843</p>
          </div>
          <div className="p-3 bg-[#1C1811] rounded-xl text-[#3B82F6]"><Activity size={20} /></div>
        </div>
      </div>

      {/* GRANULAR TELEMETRY CARDS */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#8A8477] uppercase tracking-wider">Granular Agent Speed & Burn-rate Telemetry</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AgentPerformanceTelemetryCard 
            agentName="Liquidity Router" 
            tokensPerSec={184} 
            accumulatedCostUSD={0.0412} 
            taskSuccessRate={99.8} 
          />
          <AgentPerformanceTelemetryCard 
            agentName="PII Scrubber" 
            tokensPerSec={340} 
            accumulatedCostUSD={0.0128} 
            taskSuccessRate={100} 
          />
          <AgentPerformanceTelemetryCard 
            agentName="Risk Evaluator" 
            tokensPerSec={142} 
            accumulatedCostUSD={0.0894} 
            taskSuccessRate={97.5} 
          />
          <AgentPerformanceTelemetryCard 
            agentName="ZK Proof Gen" 
            tokensPerSec={98} 
            accumulatedCostUSD={0.1052} 
            taskSuccessRate={96.2} 
          />
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AGENTS LIST */}
        <div className="lg:col-span-2 bg-[#12100C] border border-[#231E16] rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[#1F1A13] pb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-[#FDFBF7]">
              <Cpu size={18} className="text-[#F0A500]" /> Registered Autonomous Swarm Agents
            </h3>
            <span className="text-xs text-[#8A8477] font-mono">AUTONOMOUS MESH v2.4</span>
          </div>

          <div className="space-y-3">
            {agents.map((agent) => (
              <div 
                key={agent.id}
                className="bg-[#17140F] border border-[#261E14] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-[#3A2D1F]"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${
                    agent.status === 'active' ? 'bg-[#14231A] text-[#10B981]' : 'bg-[#231C14] text-[#8A8477]'
                  }`}>
                    <Cpu size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-[#FDFBF7]">{agent.name}</h4>
                      <span className="text-[10px] font-mono text-[#8A8477] px-1.5 py-0.5 rounded bg-[#1C1811] border border-[#282218]">
                        {agent.id}
                      </span>
                    </div>
                    <p className="text-xs text-[#A39E93]">{agent.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right text-xs">
                    <p className="text-[#E6E1D6] font-mono font-semibold">{agent.latency}</p>
                    <p className="text-[10px] text-[#8A8477]">LATENCY</p>
                  </div>

                  <div className="text-right text-xs">
                    <p className="text-[#E6E1D6] font-mono font-semibold">{agent.tasksCompleted}</p>
                    <p className="text-[10px] text-[#8A8477]">EXECUTIONS</p>
                  </div>

                  <button
                    onClick={() => toggleAgentStatus(agent.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      agent.status === 'active' 
                        ? 'bg-[#1D170F] text-[#F0A500] hover:bg-[#2A2014] border border-[#3A2C1A]'
                        : 'bg-[#181511] text-[#8A8477] hover:text-[#FDFBF7] border border-[#262018]'
                    }`}
                  >
                    {agent.status === 'active' ? (
                      <><Pause size={12} /> PAUSE</>
                    ) : (
                      <><Play size={12} /> RESUME</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POLICY ENFORCEMENT & SECURITY SETTINGS */}
        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-6 space-y-6">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-[#FDFBF7]">
            <Sliders size={18} className="text-[#D37506]" /> Enclave Policy Controls
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-[#17140F] border border-[#261E14] rounded-xl">
              <div>
                <p className="text-sm font-semibold text-[#FDFBF7]">Auto Escrow Settlement</p>
                <p className="text-xs text-[#8A8477]">Require ZK-SNARK lock before release</p>
              </div>
              <input 
                type="checkbox" 
                checked={autoEscrow} 
                onChange={(e) => setAutoEscrow(e.target.checked)}
                className="w-4 h-4 accent-[#F0A500] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#17140F] border border-[#261E14] rounded-xl">
              <div>
                <p className="text-sm font-semibold text-[#FDFBF7]">Zero-Trust PII Sanitizer</p>
                <p className="text-xs text-[#8A8477]">Scrub telephone & NID hashes in real-time</p>
              </div>
              <input 
                type="checkbox" 
                checked={piiScrubbing} 
                onChange={(e) => setPiiScrubbing(e.target.checked)}
                className="w-4 h-4 accent-[#F0A500] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#17140F] border border-[#261E14] rounded-xl">
              <div>
                <p className="text-sm font-semibold text-[#FDFBF7]">Strict Rate Limiter</p>
                <p className="text-xs text-[#8A8477]">Cap incoming webhook calls at 100/sec</p>
              </div>
              <input 
                type="checkbox" 
                checked={rateLimiting} 
                onChange={(e) => setRateLimiting(e.target.checked)}
                className="w-4 h-4 accent-[#F0A500] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8A8477] uppercase tracking-wider mb-1.5">
                Single Route Max Transfer Limit (UGX)
              </label>
              <input 
                type="number" 
                value={maxTransferCap} 
                onChange={(e) => setMaxTransferCap(e.target.value)}
                className="w-full bg-[#1C1811] border border-[#2C2419] rounded-xl px-3 py-2 text-sm text-[#FDFBF7] focus:outline-none focus:border-[#F0A500]"
              />
            </div>
          </div>
        </div>

      </div>

      {/* REAL-TIME SWARM TERMINAL LOGS */}
      <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-[#FDFBF7]">
            <Terminal size={18} className="text-[#10B981]" /> Swarm Audit & Telemetry Execution Stream
          </h3>
          <span className="text-xs text-[#10B981] font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span> LIVE STREAMING
          </span>
        </div>

        <div className="bg-[#0A0907] border border-[#1F1A13] rounded-xl p-4 font-mono text-xs space-y-2 max-h-56 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 border-b border-[#14100C] pb-2 last:border-0 last:pb-0">
              <span className="text-[#706B60] shrink-0">{log.time}</span>
              <span className="text-[#D37506] font-semibold shrink-0">[{log.agent}]</span>
              <span className={log.status === 'success' ? 'text-[#10B981]' : 'text-[#E6E1D6]'}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
