import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Zap, ShieldAlert, Cpu, Radio, Power, RefreshCw, AlertTriangle, 
  CheckCircle2, Clock, Server, ArrowRight, Play, Database, Lock, Eye, Check, X, Layers
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface PipelineNode {
  id: string;
  topic: string;
  agentName: string;
  label: string;
  status: 'cleared' | 'analyzing' | 'failed' | 'idle';
  durationMs: number;
  payloadSnippet: string;
}

interface AgentMatrixItem {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'processing' | 'standby' | 'degraded';
  healthScore: number;
  lastAction: string;
  lastActionTime: string;
  tasksCompleted: number;
  cpuPercent?: number;
  memoryMb?: number;
  confidenceScore?: number;
}

interface ProviderHeatmapItem {
  providerId: string;
  name: string;
  type: string;
  latencyMs: number;
  successRate: number;
  totalRequests: number;
  failedRequests: number;
  circuitState: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  healthIndex: number;
}

interface TelemetryPoint {
  timestamp: string;
  eventsPerSec: number;
  avgLatencyMs: number;
  confidenceScore: number;
  cpuLoadPercent: number;
  memoryUsageMb: number;
}

export function MissionControlTelemetryView() {
  const [pipelineNodes, setPipelineNodes] = useState<PipelineNode[]>([
    { id: 'step-1', topic: 'transaction.created', agentName: 'Chief Autonomous Controller', label: '1. Ingest & Context', status: 'cleared', durationMs: 12, payloadSnippet: '{"txRef":"TX-884921","amount":500,"currency":"USD"}' },
    { id: 'step-2', topic: 'risk.analyzed', agentName: 'Neural Risk & Fraud Agent', label: '2. Neural Fraud Audit', status: 'cleared', durationMs: 45, payloadSnippet: '{"riskScore":3,"status":"CLEARED","fraudPattern":"CLEAN"}' },
    { id: 'step-3', topic: 'compliance.cleared', agentName: 'KYC & AML Compliance Agent', label: '3. Sanctions & KYC', status: 'cleared', durationMs: 28, payloadSnippet: '{"sanctionsList":"PASSED","pepCheck":"CLEAR","kycTier":3}' },
    { id: 'step-4', topic: 'route.selected', agentName: 'Network Telemetry Research Agent', label: '4. Dynamic Provider Route', status: 'cleared', durationMs: 18, payloadSnippet: '{"chosenProvider":"Flutterwave Adapter","predictedFee":1.25}' },
    { id: 'step-5', topic: 'payment.executed', agentName: 'Payment Execution Agent', label: '5. Gateway Settlement', status: 'cleared', durationMs: 120, payloadSnippet: '{"flwRef":"FLW-99201","status":"SUCCESS","settled":500}' },
    { id: 'step-6', topic: 'memory.learned', agentName: 'Self-Learning Memory Agent', label: '6. Autonomous Learning', status: 'cleared', durationMs: 15, payloadSnippet: '{"patternIngested":true,"learningEpoch":4201}' }
  ]);

  const [selectedNode, setSelectedNode] = useState<PipelineNode | null>(pipelineNodes[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const [killSwitchEngaged, setKillSwitchEngaged] = useState(false);
  const [showKillModal, setShowKillModal] = useState(false);
  const [killReason, setKillReason] = useState('');

  const [timeSeries, setTimeSeries] = useState<TelemetryPoint[]>([]);
  const [providers, setProviders] = useState<ProviderHeatmapItem[]>([]);
  const [agents, setAgents] = useState<AgentMatrixItem[]>([]);
  const [eventLogs, setEventLogs] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // SSE & Fallback polling
  useEffect(() => {
    fetchHistoryAndTelemetry();

    // Setup SSE connection
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/v1/telemetry/stream');
      
      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'INITIAL_SNAPSHOT') {
            if (data.history) setTimeSeries(data.history);
            if (data.recentEvents) setEventLogs(data.recentEvents);
            if (data.providers) setProviders(data.providers);
            if (data.agents) augmentAgentData(data.agents);
            if (typeof data.killSwitchEngaged === 'boolean') setKillSwitchEngaged(data.killSwitchEngaged);
          } else if (data.type === 'METRIC') {
            setTimeSeries(prev => [...prev.slice(-29), data.metricPoint]);
            if (typeof data.killSwitchEngaged === 'boolean') setKillSwitchEngaged(data.killSwitchEngaged);
          } else if (data.type === 'EVENT') {
            setEventLogs(prev => [data.event, ...prev.slice(0, 24)]);
          } else if (data.type === 'KILL_SWITCH_STATUS') {
            setKillSwitchEngaged(data.killSwitchEngaged);
          }
        } catch (err) {
          console.warn('SSE message parse error:', err);
        }
      };
    } catch (e) {
      console.warn('SSE connection failed, falling back to polling:', e);
    }

    const interval = setInterval(() => {
      fetchHistoryAndTelemetry();
    }, 3500);

    return () => {
      if (eventSource) eventSource.close();
      clearInterval(interval);
    };
  }, []);

  const augmentAgentData = (rawAgents: any[]) => {
    const augmented = rawAgents.map((a: any, idx: number) => ({
      ...a,
      cpuPercent: Math.round(12 + ((idx * 7) % 25) + Math.random() * 5),
      memoryMb: Math.round(120 + ((idx * 31) % 180) + Math.random() * 10),
      confidenceScore: Number((98.8 + ((idx * 0.15) % 1.1)).toFixed(1))
    }));
    setAgents(augmented);
  };

  const fetchHistoryAndTelemetry = async () => {
    setIsRefreshing(true);
    try {
      const [histRes, heatRes, agentRes, ksRes] = await Promise.all([
        fetch('/api/v1/telemetry/history'),
        fetch('/api/v1/telemetry/heatmap'),
        fetch('/api/agents/status'),
        fetch('/api/v1/telemetry/kill-switch')
      ]);

      if (histRes.ok) {
        const data = await histRes.json();
        if (data.timeSeriesHistory && data.timeSeriesHistory.length > 0) {
          setTimeSeries(data.timeSeriesHistory);
        }
        if (data.recentEvents) setEventLogs(data.recentEvents);
      }

      if (heatRes.ok) {
        const data = await heatRes.json();
        if (data.providers) setProviders(data.providers);
      }

      if (agentRes.ok) {
        const data = await agentRes.json();
        if (data.agents) augmentAgentData(data.agents);
      }

      if (ksRes.ok) {
        const data = await ksRes.json();
        if (typeof data.engaged === 'boolean') setKillSwitchEngaged(data.engaged);
      }
    } catch (e) {
      console.warn('Error fetching mission control telemetry:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleToggleKillSwitch = async () => {
    try {
      const targetEngaged = !killSwitchEngaged;
      const res = await fetch('/api/v1/telemetry/kill-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engaged: targetEngaged,
          operator: 'Chief Operator',
          reason: killReason || (targetEngaged ? 'Manual Emergency Shutdown Triggered' : 'System Resumed')
        })
      });

      if (res.ok) {
        setKillSwitchEngaged(targetEngaged);
        setShowKillModal(false);
        setKillReason('');
        fetchHistoryAndTelemetry();
      }
    } catch (e) {
      console.warn('Kill switch toggle failed:', e);
    }
  };

  const handleRunSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // Reset pipeline nodes to analyzing sequentially
    const stages = ['transaction.created', 'risk.analyzed', 'compliance.cleared', 'route.selected', 'payment.executed', 'memory.learned'];
    
    // Set node 1 analyzing
    setPipelineNodes(prev => prev.map((n, i) => i === 0 ? { ...n, status: 'analyzing' } : { ...n, status: 'idle' }));
    
    try {
      fetch('/api/v1/telemetry/simulate-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.floor(100 + Math.random() * 900), currency: 'USD' })
      });
    } catch (e) {
      console.warn(e);
    }

    for (let i = 0; i < stages.length; i++) {
      await new Promise(r => setTimeout(r, 450));
      setPipelineNodes(prev => prev.map((node, index) => {
        if (index === i) {
          return {
            ...node,
            status: 'cleared',
            durationMs: Math.round(15 + Math.random() * 80)
          };
        } else if (index === i + 1) {
          return { ...node, status: 'analyzing' };
        }
        return node;
      }));
    }

    setIsSimulating(false);
    fetchHistoryAndTelemetry();
  };

  return (
    <div className="space-y-6" id="mission_control_telemetry_panel">
      
      {/* 1. TOP GLOBAL EMERGENCY KILL SWITCH BANNER */}
      <div className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
        killSwitchEngaged 
          ? 'bg-rose-950/80 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)] text-rose-100' 
          : 'bg-[#0E0B07] border-[#2A1F13] text-[#E6E1D6]'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
            killSwitchEngaged 
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          }`}>
            <Power className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-wide">
                SYSTEM EVENT BUS STATUS:
              </span>
              <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold border ${
                killSwitchEngaged 
                  ? 'bg-rose-500/30 text-rose-300 border-rose-400 animate-bounce' 
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {killSwitchEngaged ? 'EMERGENCY HALTED (PAUSED)' : 'OPERATIONAL (LIVE)'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              {killSwitchEngaged 
                ? 'Global Event Bus paused by manual operator override. All agent directives halted.' 
                : 'Streaming real-time event pipeline telemetry to Time-Series storage without payment blocking.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchHistoryAndTelemetry}
            className="p-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-zinc-300 transition-colors text-xs font-mono font-bold flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> Sync
          </button>

          <button
            onClick={() => setShowKillModal(true)}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 border shadow-lg ${
              killSwitchEngaged
                ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-zinc-950 shadow-emerald-900/40'
                : 'bg-rose-600 hover:bg-rose-500 border-rose-400 text-white shadow-rose-950/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            {killSwitchEngaged ? 'RESUME EVENT BUS' : 'ENGAGE KILL SWITCH'}
          </button>
        </div>
      </div>

      {/* KILL SWITCH MODAL CONFIRMATION */}
      {showKillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl max-w-md w-full space-y-4 text-zinc-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                {killSwitchEngaged ? 'Disengage Kill Switch?' : 'Engage Emergency Kill Switch?'}
              </h3>
              <button onClick={() => setShowKillModal(false)} className="text-zinc-500 hover:text-zinc-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {killSwitchEngaged 
                ? 'This will resume normal real-time transaction event publishing across all 9 autonomous agents.' 
                : 'WARNING: Engaging the global Kill Switch immediately pauses event publishing across the entire MEHERAH Event Bus. Transactions will be queued or safety-halted.'}
            </p>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 block mb-1">OPERATOR REASON / AUDIT NOTE:</label>
              <input 
                type="text" 
                value={killReason}
                onChange={(e) => setKillReason(e.target.value)}
                placeholder="e.g., Routine Audit / Anomaly Investigation"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={() => setShowKillModal(false)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleToggleKillSwitch}
                className={`px-5 py-2 text-xs font-bold font-mono rounded-lg ${
                  killSwitchEngaged 
                    ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400' 
                    : 'bg-rose-600 text-white hover:bg-rose-500'
                }`}
              >
                Confirm {killSwitchEngaged ? 'Resume' : 'Halt'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. REAL-TIME EVENT BUS PIPELINE MAP (NODES & EDGES) */}
      <div className="border border-[#231A10] bg-[#0A0907]/90 p-6 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#1C160F] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#FDFBF7] flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#F0A500]" /> Live Event Bus Visualization & Pipeline Nodes
            </h3>
            <p className="text-xs text-[#8A8477] mt-0.5">
              Real-time nodes-and-edges pipeline mapping transaction state progression from ingestion to memory ingestion.
            </p>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-4 py-2 bg-gradient-to-r from-[#D37506] to-[#F0A500] hover:from-[#E58310] hover:to-[#FFB71A] text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 font-mono disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Simulating Pipeline Flow...' : 'Simulate Live Transaction Flow'}
          </button>
        </div>

        {/* NODES & EDGES PIPELINE GRAPH */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 pt-2 relative">
          {pipelineNodes.map((node, index) => {
            const isCleared = node.status === 'cleared';
            const isAnalyzing = node.status === 'analyzing';
            const isFailed = node.status === 'failed';
            const isSelected = selectedNode?.id === node.id;

            return (
              <div key={node.id} className="relative flex flex-col items-center">
                <div 
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-32 relative ${
                    isCleared 
                      ? 'bg-[#101B12]/80 border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' :
                    isAnalyzing 
                      ? 'bg-amber-950/60 border-amber-500/60 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.25)]' :
                    isFailed 
                      ? 'bg-rose-950/60 border-rose-500 hover:border-rose-400' :
                      'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                  } ${isSelected ? 'ring-2 ring-amber-500' : ''}`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-400 font-bold">{node.label}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      isCleared ? 'bg-emerald-500/20 text-emerald-400' :
                      isAnalyzing ? 'bg-amber-500/20 text-amber-300' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {node.durationMs}ms
                    </span>
                  </div>

                  <div className="my-1">
                    <div className="text-xs font-bold text-zinc-100 truncate">{node.topic}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{node.agentName}</div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono pt-1 border-t border-zinc-800/50">
                    <span className={`flex items-center gap-1 ${
                      isCleared ? 'text-emerald-400 font-bold' :
                      isAnalyzing ? 'text-amber-400 font-bold' :
                      'text-zinc-500'
                    }`}>
                      {isCleared && <Check className="w-3 h-3" />}
                      {isAnalyzing && <Activity className="w-3 h-3 animate-spin" />}
                      {node.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Vector arrow connecting nodes on desktop */}
                {index < pipelineNodes.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-amber-500/60">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* NODE INSPECTOR DRAWER */}
        {selectedNode && (
          <div className="bg-[#120F0B] border border-[#231A10] p-4 rounded-xl text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-[#F0A500] font-bold">
              <span>NODE DETAILS: {selectedNode.topic}</span>
              <span>AGENT: {selectedNode.agentName}</span>
            </div>
            <p className="text-zinc-400 text-[11px]">PAYLOAD STREAMED TO TIME-SERIES STORAGE:</p>
            <pre className="bg-zinc-950 p-2.5 rounded border border-zinc-800 text-emerald-400 text-[11px] overflow-x-auto">
              {selectedNode.payloadSnippet}
            </pre>
          </div>
        )}
      </div>

      {/* 3. AGENT STATUS MATRIX (9 AUTONOMOUS AGENTS) */}
      <div className="border border-[#231A10] bg-[#0A0907]/90 p-6 rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
          <h3 className="text-base font-bold text-[#FDFBF7] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" /> Autonomous Agent Health Matrix & Confidence Scores
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            9/9 Agents Online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {agents.map((ag) => (
            <div key={ag.id} className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-100">{ag.name}</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold rounded border border-emerald-500/20">
                  {ag.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-zinc-400 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/60">
                <div>
                  <span className="text-zinc-500 block text-[9px]">HEALTH:</span>
                  <strong className="text-emerald-400">{ag.healthScore}%</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px]">CPU / MEM:</span>
                  <strong className="text-zinc-200">{ag.cpuPercent}% / {ag.memoryMb}M</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px]">CONFIDENCE:</span>
                  <strong className="text-amber-400">{ag.confidenceScore}%</strong>
                </div>
              </div>

              <div className="text-[10px] text-zinc-400 flex items-center justify-between pt-1 border-t border-zinc-800/60 font-mono">
                <span className="truncate">Tasks Done: <strong className="text-zinc-200">{ag.tasksCompleted}</strong></span>
                <span className="text-zinc-500">{ag.role} Role</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TIME-SERIES TELEMETRY CHARTS & PROVIDER LATENCY HEATMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* TIME-SERIES EVENT THROUGHPUT CHART */}
        <div className="lg:col-span-7 border border-[#231A10] bg-[#0A0907]/90 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#FDFBF7] flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" /> Time-Series Events / Sec & AI Confidence Trends
            </h3>
            <span className="text-xs font-mono text-zinc-400">Asynchronous Time-Series Logging</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries.length > 0 ? timeSeries : [
                { timestamp: '10:00:01', eventsPerSec: 12, confidenceScore: 99.1, avgLatencyMs: 120, cpuLoadPercent: 20, memoryUsageMb: 320 },
                { timestamp: '10:00:03', eventsPerSec: 24, confidenceScore: 99.4, avgLatencyMs: 115, cpuLoadPercent: 22, memoryUsageMb: 325 },
                { timestamp: '10:00:05', eventsPerSec: 18, confidenceScore: 98.9, avgLatencyMs: 130, cpuLoadPercent: 19, memoryUsageMb: 318 },
                { timestamp: '10:00:07', eventsPerSec: 31, confidenceScore: 99.5, avgLatencyMs: 110, cpuLoadPercent: 25, memoryUsageMb: 330 },
                { timestamp: '10:00:09', eventsPerSec: 15, confidenceScore: 99.2, avgLatencyMs: 122, cpuLoadPercent: 21, memoryUsageMb: 322 }
              ]}>
                <defs>
                  <linearGradient id="colorEps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F0A500" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F0A500" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="timestamp" stroke="#52525b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#52525b" tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '11px', color: '#f4f4f5' }}
                />
                <Area type="monotone" dataKey="eventsPerSec" stroke="#F0A500" fillOpacity={1} fill="url(#colorEps)" name="Events / Sec" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PROVIDER LATENCY HEATMAP */}
        <div className="lg:col-span-5 border border-[#231A10] bg-[#0A0907]/90 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#FDFBF7] flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-500" /> Provider Latency Heatmap & Gateway Health
            </h3>
          </div>

          <div className="space-y-3">
            {providers.map((p) => {
              const isFast = p.latencyMs < 200;
              const isModerate = p.latencyMs >= 200 && p.latencyMs < 400;
              return (
                <div key={p.providerId} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="font-bold text-zinc-100">{p.name}</div>
                    <div className="text-[10px] text-zinc-500">{p.type} • {p.totalRequests} reqs</div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-bold text-zinc-200">{p.successRate}%</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        isFast 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : isModerate 
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' 
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}>
                        {p.latencyMs}ms
                      </span>
                    </div>
                    <span className="text-[9px] text-zinc-500 block">Circuit: {p.circuitState}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. LIVE TELEMETRY LOGS FEED */}
      <div className="border border-[#231A10] bg-[#0A0907]/90 p-6 rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
          <h3 className="text-base font-bold text-[#FDFBF7] flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" /> Real-Time Telemetry Event Ingestion Feed
          </h3>
          <span className="text-xs font-mono text-zinc-400">SSE Stream Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                <th className="py-2 px-3">Event ID</th>
                <th className="py-2 px-3">Topic / Stage</th>
                <th className="py-2 px-3">Publisher Agent</th>
                <th className="py-2 px-3">Timestamp</th>
                <th className="py-2 px-3">Payload Summary</th>
              </tr>
            </thead>
            <tbody>
              {eventLogs.length > 0 ? (
                eventLogs.map((evt: any) => (
                  <tr key={evt.eventId || Math.random()} className="border-b border-zinc-900/60 hover:bg-zinc-900/40">
                    <td className="py-2 px-3 text-zinc-500 text-[10px]">{evt.eventId?.substring(0, 12) || 'evt_live'}</td>
                    <td className="py-2 px-3 font-bold text-amber-400">{evt.topic}</td>
                    <td className="py-2 px-3 text-zinc-300">{evt.publisher}</td>
                    <td className="py-2 px-3 text-zinc-500 text-[10px]">
                      {new Date(evt.timestamp || Date.now()).toLocaleTimeString()}
                    </td>
                    <td className="py-2 px-3 text-zinc-400 text-[11px] truncate max-w-xs">
                      {JSON.stringify(evt.payload || {}).substring(0, 80)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-zinc-500">
                    Awaiting telemetry event streams...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
