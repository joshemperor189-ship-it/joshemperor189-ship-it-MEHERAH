import React, { useState, useEffect, useRef, FormEvent } from 'react';
import appIcon from './assets/images/app_icon_1784666451818.jpg';
import { 
  Cpu, 
  Activity, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  RefreshCw, 
  FileText, 
  Send, 
  Layers, 
  Zap, 
  Sparkles, 
  Plus, 
  Hourglass, 
  ExternalLink,
  ChevronRight,
  Fingerprint,
  TrendingUp,
  Sliders,
  History,
  Key,
  DollarSign,
  Network
} from 'lucide-react';
import { 
  Agent, 
  Task, 
  Mission, 
  ZKAuditLog, 
  LatencyMetric, 
  MemoryItem, 
  Connector,
  MissionStatus,
  TaskStatus,
  AgentStatus
} from './types';

// Enterprise Phases components
import OrchestrationTab from './components/OrchestrationTab';
import ProviderTab from './components/ProviderTab';
import ConnectorsTab from './components/ConnectorsTab';
import MemoryTab from './components/MemoryTab';
import SecurityTab from './components/SecurityTab';
import FinancialTab from './components/FinancialTab';
import IntelligenceTab from './components/IntelligenceTab';

export default function FullApp() {
  // Active Tab state for Phases
  const [activeTab, setActiveTab] = useState<string>('mission_control');

  // Application state
  const [missions, setMissions] = useState<Mission[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [zkLogs, setZkLogs] = useState<ZKAuditLog[]>([]);
  const [telemetry, setTelemetry] = useState<{
    current: LatencyMetric;
    history: LatencyMetric[];
    connectors: Connector[];
  } | null>(null);
  const [batchQueue, setBatchQueue] = useState<any[]>([]);
  const [batchTotal, setBatchTotal] = useState<number>(0);

  // Form states
  const [newGoal, setNewGoal] = useState('');
  const [isSubmittingGoal, setIsSubmittingGoal] = useState(false);
  const [newMemoryTitle, setNewMemoryTitle] = useState('');
  const [newMemoryContent, setNewMemoryContent] = useState('');
  const [newMemoryType, setNewMemoryType] = useState<'preference' | 'lesson' | 'decision'>('preference');
  const [isSubmittingMemory, setIsSubmittingMemory] = useState(false);

  // Transaction form states
  const [txAmount, setTxAmount] = useState('250000');
  const [txRecipient, setTxRecipient] = useState('Mukasa Ronald');
  const [txProvider, setTxProvider] = useState('MTN');
  const [txCurrency, setTxCurrency] = useState('UGX');
  const [isQueueingTx, setIsQueueingTx] = useState(false);

  // Selected audit log for modal/expansion view
  const [selectedAuditLog, setSelectedAuditLog] = useState<ZKAuditLog | null>(null);

  // Countdown for batch sweeps (synced to 15-second cycles)
  const [sweepCountdown, setSweepCountdown] = useState(15);

  // Selected active mission for display focus
  const activeMission = missions[0] || null;

  // Sync timers
  useEffect(() => {
    fetchCoreData();
    const interval = setInterval(fetchCoreData, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSweepCountdown((prev) => (prev <= 1 ? 15 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchCoreData = async () => {
    try {
      // Fetch metrics
      const metricRes = await fetch('/api/metrics');
      if (metricRes.ok) {
        const data = await metricRes.json();
        setTelemetry(data);
      }

      // Fetch agents
      const agentRes = await fetch('/api/agents');
      if (agentRes.ok) {
        const data = await agentRes.json();
        setAgents(data);
      }

      // Fetch missions
      const missionRes = await fetch('/api/missions');
      if (missionRes.ok) {
        const data = await missionRes.json();
        setMissions(data);
      }

      // Fetch memories
      const memoryRes = await fetch('/api/memories');
      if (memoryRes.ok) {
        const data = await memoryRes.json();
        setMemories(data);
      }

      // Fetch ZK logs
      const zkRes = await fetch('/api/zk-logs');
      if (zkRes.ok) {
        const data = await zkRes.json();
        setZkLogs(data);
      }

      // Fetch current sweeps queue
      const batchRes = await fetch('/api/batch-sweeps');
      if (batchRes.ok) {
        const data = await batchRes.json();
        setBatchQueue(data.queue || []);
        setBatchTotal(data.totalPending || 0);
      }
    } catch (err) {
      console.warn('Error polling Core Gateway API:', err);
    }
  };

  // Launch a new mission
  const handleLaunchMission = async (e?: React.FormEvent, presetGoal?: string) => {
    if (e) e.preventDefault();
    const goalToLaunch = presetGoal || newGoal;
    if (!goalToLaunch || goalToLaunch.trim() === '') return;

    setIsSubmittingGoal(true);
    try {
      const response = await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: goalToLaunch })
      });
      if (response.ok) {
        setNewGoal('');
        fetchCoreData();
      }
    } catch (err) {
      console.warn('Failed to launch mission:', err);
    } finally {
      setIsSubmittingGoal(false);
    }
  };

  // Authorize / Approve pending task decision
  const handleApproveTask = async (taskId: string, choice: string) => {
    if (!activeMission) return;
    try {
      const response = await fetch('/api/missions/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missionId: activeMission.id,
          taskId,
          choice
        })
      });
      if (response.ok) {
        fetchCoreData();
      }
    } catch (err) {
      console.warn('Approval request failed:', err);
    }
  };

  // Register long-term operating memory
  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryTitle || !newMemoryContent) return;

    setIsSubmittingMemory(true);
    try {
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newMemoryTitle,
          content: newMemoryContent,
          type: newMemoryType
        })
      });
      if (response.ok) {
        setNewMemoryTitle('');
        setNewMemoryContent('');
        fetchCoreData();
      }
    } catch (err) {
      console.warn('Memory registration failed:', err);
    } finally {
      setIsSubmittingMemory(false);
    }
  };

  // Queue individual transaction to batch buffer
  const handleQueueTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txAmount || !txRecipient) return;

    setIsQueueingTx(true);
    try {
      const response = await fetch('/api/batch-sweeps/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(txAmount),
          recipient: txRecipient,
          provider: txProvider,
          currency: txCurrency
        })
      });
      if (response.ok) {
        setTxRecipient('');
        fetchCoreData();
      }
    } catch (err) {
      console.warn('Failed to queue disbursement:', err);
    } finally {
      setIsQueueingTx(false);
    }
  };

  // Luxury aesthetic helper for agent states
  const getAgentStatusRing = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.RUNNING:
        return 'border-amber-400 bg-amber-400/5 shadow-[0_0_12px_rgba(212,175,55,0.4)] animate-pulse';
      case AgentStatus.NEEDS_APPROVAL:
        return 'border-red-500 bg-red-950/20 shadow-[0_0_12px_rgba(239,68,68,0.4)] animate-pulse';
      case AgentStatus.COMPLETED:
        return 'border-green-500/70 bg-green-950/10';
      default:
        return 'border-zinc-800 bg-zinc-950/40';
    }
  };

  const getAgentStatusText = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.RUNNING: return 'text-amber-400 font-medium';
      case AgentStatus.NEEDS_APPROVAL: return 'text-red-400 font-medium';
      case AgentStatus.COMPLETED: return 'text-green-400';
      default: return 'text-zinc-500';
    }
  };

  // Custom latency chart calculations
  const renderLatencyChart = () => {
    if (!telemetry || telemetry.history.length === 0) {
      return (
        <div className="h-40 flex items-center justify-center text-zinc-600">
          Initializing Predictive Telemetry Stream...
        </div>
      );
    }

    const history = telemetry.history;
    const maxVal = Math.max(...history.flatMap(h => [h.mtnLatency, h.airtelLatency]), 160);
    const minVal = 0;
    const range = maxVal - minVal;

    const width = 500;
    const height = 140;

    // Build SVG path points
    const getPoints = (key: 'mtnLatency' | 'airtelLatency') => {
      return history.map((h, index) => {
        const x = (index / (history.length - 1)) * (width - 40) + 20;
        const y = height - ((h[key] - minVal) / range) * (height - 30) - 15;
        return `${x},${y}`;
      }).join(' ');
    };

    const mtnPoints = getPoints('mtnLatency');
    const airtelPoints = getPoints('airtelLatency');

    return (
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36">
          <defs>
            <linearGradient id="mtnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="airtelGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="20" y1="20" x2={width - 20} y2="20" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="20" y1={height / 2} x2={width - 20} y2={height / 2} stroke="#27272a" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="20" y1={height - 20} x2={width - 20} y2={height - 20} stroke="#27272a" strokeWidth="0.5" />

          {/* MTN Latency Line Area & Line */}
          {history.length > 1 && (
            <>
              <path
                d={`M 20,${height - 20} L ${mtnPoints} L ${width - 20},${height - 20} Z`}
                fill="url(#mtnGrad)"
              />
              <polyline
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2.5"
                points={mtnPoints}
                className="transition-all duration-500 ease-in-out"
              />
            </>
          )}

          {/* Airtel Latency Line Area & Line */}
          {history.length > 1 && (
            <>
              <path
                d={`M 20,${height - 20} L ${airtelPoints} L ${width - 20},${height - 20} Z`}
                fill="url(#airtelGrad)"
              />
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="2 1"
                points={airtelPoints}
                className="opacity-70 transition-all duration-500 ease-in-out"
              />
            </>
          )}

          {/* Data Points on Hover/Active */}
          {history.length > 0 && (
            <g>
              <circle
                cx={history.length > 1 ? (width - 20) : 20}
                cy={height - ((history[history.length - 1].mtnLatency - minVal) / (range || 1)) * (height - 30) - 15}
                r="4"
                fill="#D4AF37"
              />
              <circle
                cx={history.length > 1 ? (width - 20) : 20}
                cy={height - ((history[history.length - 1].airtelLatency - minVal) / (range || 1)) * (height - 30) - 15}
                r="3"
                fill="#ef4444"
              />
            </g>
          )}
        </svg>

        {/* Dynamic Legend Overlay */}
        <div className="flex justify-between text-xs text-zinc-500 px-2 mt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              MTN Gateway ({telemetry.current?.mtnLatency ?? 0}ms)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 border-t border-dashed border-red-500"></span>
              Airtel Channel ({telemetry.current?.airtelLatency ?? 0}ms)
            </span>
          </div>
          <div>Max scaling ceiling: {maxVal}ms</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black bg-gold-grid text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden">
      
      {/* GLOWING AMBIENT TOP LIGHTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[220px] bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-12 left-1/4 w-[350px] h-[100px] bg-amber-400/10 rounded-full blur-[90px] pointer-events-none"></div>

      {/* TOP DECORATIVE SLATE HEADER */}
      <header className="border-b border-amber-500/25 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30 px-6 py-3.5 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Status Indicator */}
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <img 
                src={appIcon} 
                alt="MEHERAH OS Crown Logo" 
                className="relative w-11 h-11 object-cover rounded-lg border-2 border-amber-400/80 shadow-2xl transition-transform duration-300 group-hover:scale-105" 
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 flex items-center gap-2">
                  MEHERAH OS
                </h1>
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest bg-amber-500/15 text-amber-300 rounded border border-amber-500/30 font-bold uppercase shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  CROWN EDITION
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest bg-amber-400 text-zinc-950 font-extrabold rounded border border-amber-300 flex items-center gap-1 shadow-[0_0_12px_rgba(251,191,36,0.5)] animate-pulse">
                  ⚡ SONIC SPEED ACTIVE (80ms)
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                <span className="text-zinc-500">SYS_STATUS:</span> 
                <span className="text-emerald-400 font-bold uppercase tracking-widest">ONLINE</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">AUTONOMY:</span>
                <span className="text-amber-400 font-bold">LEVEL 4 ACTIVE</span>
              </p>
            </div>
          </div>

          {/* Quick Active Latencies Readout */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            
            <div className="px-3 py-1.5 bg-zinc-900/60 border border-zinc-800 rounded flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-500">ROUTING PREEMPTION:</span>
              <span className={telemetry?.current?.selectedProvider === 'MTN' ? 'text-amber-400 font-bold' : 'text-red-400 font-bold'}>
                {telemetry?.current?.selectedProvider || 'MTN'} CORE
              </span>
            </div>

            <div className="px-3 py-1.5 bg-zinc-900/60 border border-zinc-800 rounded flex items-center gap-2">
              <Fingerprint className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-zinc-500">ZK-PROOF LOGS:</span>
              <span className="text-amber-400 font-bold">{zkLogs.length} PROOFS</span>
            </div>

            <div className="px-3 py-1.5 bg-zinc-900/60 border border-zinc-800 rounded flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-zinc-500">MEMORIES:</span>
              <span className="text-emerald-400 font-bold">{memories.length} RULES</span>
            </div>

          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* INTRODUCTORY BRAND STATEMENT */}
        <div className="mb-8 border border-amber-500/10 bg-gradient-to-r from-zinc-950 via-zinc-900/60 to-zinc-950 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>
          <div>
            <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Orchestrating Multi-Agent Autonomy
            </h2>
            <p className="text-zinc-400 text-sm max-w-3xl mt-1 leading-relaxed">
              Meherah acts as an intelligent operating kernel. It accepts goals, schedules phased tasks via specialized subnet engines, dynamically safeguards routing corridors using real-time gateway metrics, and archives consent trails inside a zero-knowledge audit chain.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400">
              mTLS Gateways: <span className="text-emerald-400 font-bold">SECURE</span>
            </span>
            <span className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400">
              Node Ledger: <span className="text-emerald-400 font-bold">MUTABLE</span>
            </span>
          </div>
        </div>

        {/* ENTERPRISE TAB SELECTOR */}
        <div className="mb-8 flex flex-wrap gap-2 bg-zinc-950/40 p-1.5 border border-zinc-900 rounded-xl">
          <button
            onClick={() => setActiveTab('mission_control')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'mission_control' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> MISSION CONTROL
          </button>
          
          <button
            onClick={() => setActiveTab('orchestration')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'orchestration' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <History className="w-3.5 h-3.5" /> ORCHESTRATION & BUS
          </button>

          <button
            onClick={() => setActiveTab('providers')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'providers' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> MULTI-AI SCORER
          </button>

          <button
            onClick={() => setActiveTab('connectors')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'connectors' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> CONNECTORS
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'memory' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> POSTGRESQL MEMORY
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'security' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" /> VAULT & SECURITY
          </button>

          <button
            onClick={() => setActiveTab('financial')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'financial' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> FINANCIAL ISO
          </button>

          <button
            onClick={() => setActiveTab('intelligence')}
            className={`px-4 py-2.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
              activeTab === 'intelligence' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-transparent border-transparent text-zinc-400 hover:border-zinc-900 hover:text-zinc-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" /> SYSTEM INTEL
          </button>
        </div>

        {activeTab === 'mission_control' && (
          /* GRID STRUCTURE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ==========================================
              LEFT HALF: INPUT, MISSION LOGS, DISBURSEMENT
              ========================================== */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* 1. CHIEF ORCHESTRATOR INPUT CONSOLE */}
            <section id="command_console" className="border border-amber-500/15 bg-zinc-950 p-6 rounded-xl relative shadow-2xl">
              <div className="absolute top-0 left-4 px-3 py-0.5 bg-amber-500/10 border-x border-b border-amber-500/20 text-[10px] font-mono tracking-widest text-amber-400 rounded-b">
                CHIEF COGNITIVE INTAKE
              </div>

              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-4 mt-1">
                Command the Orchestrator
              </h3>

              <form onSubmit={(e) => handleLaunchMission(e)} className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g., Create a 12-month business expansion plan with Kampala liquidity corridors..."
                  className="flex-1 bg-zinc-900/80 border border-zinc-800 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/40 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-all"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  disabled={isSubmittingGoal}
                />
                <button
                  type="submit"
                  disabled={isSubmittingGoal || !newGoal.trim()}
                  className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-sm rounded-lg flex items-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmittingGoal ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                  ) : (
                    <Play className="w-4 h-4 text-zinc-950 fill-zinc-950" />
                  )}
                  Launch
                </button>
              </form>

              {/* Presets Suggestions */}
              <div className="mt-4">
                <p className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase mb-2">Preset Core Goals:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleLaunchMission(undefined, "Create and launch a website for Menora Fries.")}
                    disabled={isSubmittingGoal}
                    className="text-xs bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-200 font-extrabold px-3 py-1.5 rounded transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 🌐 Create Website for Menora Fries
                  </button>
                  <button
                    onClick={() => handleLaunchMission(undefined, "Analyze the current food delivery market opportunities in Uganda and create a growth strategy for Menora Fries.")}
                    disabled={isSubmittingGoal}
                    className="text-xs bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold px-3 py-1.5 rounded transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 🚀 Uganda Market Strategy (Menora Fries)
                  </button>
                  <button
                    onClick={() => handleLaunchMission(undefined, "Create a startup business plan for Kampala regional fintech launch")}
                    disabled={isSubmittingGoal}
                    className="text-xs bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-amber-300 px-3 py-1.5 rounded transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3 text-amber-500" /> Startup Business Plan
                  </button>
                  <button
                    onClick={() => handleLaunchMission(undefined, "Design a localized mobile wallet campaign for micro-deposits")}
                    disabled={isSubmittingGoal}
                    className="text-xs bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-amber-300 px-3 py-1.5 rounded transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3 text-amber-500" /> Mobile Wallet Campaign
                  </button>
                </div>
              </div>
            </section>

            {/* 2. ACTIVE MISSION MONITOR */}
            <section id="active_mission" className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl flex-1 flex flex-col min-h-[400px]">
              
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-500" /> Active System Mission
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Real-time trace decomposition from Chief Agent</p>
                </div>
                {activeMission && (
                  <span className={`px-2.5 py-1 text-xs font-bold font-mono tracking-wider rounded border uppercase ${
                    activeMission.status === MissionStatus.COMPLETED ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    activeMission.status === MissionStatus.PAUSED_APPROVAL ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                  }`}>
                    {activeMission.status.replace('_', ' ')}
                  </span>
                )}
              </div>

              {!activeMission ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                  <Cpu className="w-10 h-10 text-zinc-700 mb-3" />
                  <p className="text-sm font-medium text-zinc-400">Meherah Kernel Standby</p>
                  <p className="text-xs text-zinc-600 mt-1 max-w-sm">
                    No mission active in current context memory. Submit a goal or click a preset to start multi-agent analysis.
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Mission Goal Details & Telemetry */}
                  <div className="mb-6 space-y-4">
                    <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-lg">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Mission Goal Context:</span>
                      <p className="text-sm text-zinc-200 font-medium mt-1">"{activeMission.goal}"</p>
                      <span className="text-[10px] font-mono text-zinc-600 mt-2 block">
                        ID: {activeMission.id} | Initialized: {new Date(activeMission.createdAt).toLocaleTimeString()}
                      </span>
                    </div>

                    {/* Telemetry Row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-zinc-950 border border-zinc-900 p-3 rounded-lg flex flex-col">
                        <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">AI Provider Node</span>
                        <span className="text-xs font-bold text-amber-400 font-mono mt-1 flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-amber-500" />
                          {activeMission.providerName || "Gemini 3.5 Flash"}
                        </span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-900 p-3 rounded-lg flex flex-col">
                        <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">Planning Latency</span>
                        <span className="text-xs font-bold text-zinc-300 font-mono mt-1">
                          {activeMission.latencyMs ? `${activeMission.latencyMs} ms` : "Calculated..."}
                        </span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-900 p-3 rounded-lg flex flex-col">
                        <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">Estimated Tokens</span>
                        <span className="text-xs font-bold text-zinc-300 font-mono mt-1">
                          {activeMission.tokensUsed ? activeMission.tokensUsed.toLocaleString() : "Buffered..."}
                        </span>
                      </div>
                    </div>

                    {/* Active Cognitive Reasoning */}
                    {activeMission.activeReasoning && activeMission.activeReasoning.length > 0 && (
                      <div className="bg-zinc-950/80 border border-zinc-900/80 rounded-lg p-3.5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Chief Agent Brain Reasoning Process</span>
                        </div>
                        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                          {activeMission.activeReasoning.map((step, sIdx) => (
                            <p key={sIdx} className="text-xs font-mono text-zinc-400 leading-relaxed flex items-start gap-2">
                              <span className="text-amber-500/70">›</span>
                              <span>{step}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phased Task Sequence */}
                  <div className="space-y-4 flex-1">
                    <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Phased Task Sequence:</h4>
                    {activeMission.tasks.map((task, idx) => (
                      <div 
                        key={task.id} 
                        className={`border rounded-lg p-4 transition-all duration-300 ${
                          task.status === TaskStatus.NEEDS_APPROVAL ? 'border-red-500/40 bg-red-950/5' :
                          task.status === TaskStatus.RUNNING ? 'border-amber-500/30 bg-amber-500/5' :
                          task.status === TaskStatus.COMPLETED ? 'border-zinc-800 bg-zinc-900/30' :
                          'border-zinc-900 bg-zinc-950/20 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          
                          <div className="flex items-start gap-2.5">
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-bold font-mono">
                              0{idx + 1}
                            </span>
                            <div>
                              <h5 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                                {task.title}
                                <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400">
                                  {task.assignedAgent}
                                </span>
                              </h5>
                              <p className="text-xs text-zinc-400 mt-1">{task.description}</p>
                            </div>
                          </div>

                          {/* Task Status */}
                          <div>
                            {task.status === TaskStatus.COMPLETED && (
                              <span className="text-emerald-400 flex items-center gap-1.5 text-xs font-mono">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DONE
                              </span>
                            )}
                            {task.status === TaskStatus.RUNNING && (
                              <span className="text-amber-400 flex items-center gap-1.5 text-xs font-mono animate-pulse">
                                <Hourglass className="w-4 h-4 animate-spin text-amber-500" /> WORKING...
                              </span>
                            )}
                            {task.status === TaskStatus.NEEDS_APPROVAL && (
                              <span className="text-red-400 flex items-center gap-1.5 text-xs font-mono animate-pulse">
                                <AlertCircle className="w-4 h-4 text-red-500" /> GATEKEEPER BLOCKED
                              </span>
                            )}
                            {task.status === TaskStatus.PENDING && (
                              <span className="text-zinc-600 text-xs font-mono">STANDBY</span>
                            )}
                          </div>

                        </div>

                        {/* Task Thinking Traces */}
                        {task.thinkingTrace && task.thinkingTrace.length > 0 && (
                          <div className="mt-3 pl-8 border-l border-amber-500/10 space-y-1">
                            <p className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest">Agent Reasoning Trails:</p>
                            {task.thinkingTrace.map((trace, tIdx) => (
                              <p key={tIdx} className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                                <ChevronRight className="w-3 h-3 text-zinc-700" /> {trace}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Task Result Output */}
                        {task.result && (
                          <div className="mt-3 pl-8 border-l border-zinc-800">
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Acquired Deliverable Output:</p>
                            <p className="text-xs text-zinc-300 mt-1 bg-zinc-950/80 border border-zinc-800 p-2.5 rounded-md font-mono whitespace-pre-wrap leading-relaxed">
                              {task.result}
                            </p>
                          </div>
                        )}

                        {/* HUMAN APPROVAL ACTION INTERFACE */}
                        {task.status === TaskStatus.NEEDS_APPROVAL && (
                          <div className="mt-4 p-4 border border-red-500/30 bg-red-950/10 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-pulse">
                            <div>
                              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase font-mono tracking-widest">
                                <UserCheck className="w-4 h-4" /> HUMAN INTERVENTION GATEWAY
                              </div>
                              <p className="text-sm font-semibold text-zinc-200 mt-1">
                                {task.approvalMessage}
                              </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => handleApproveTask(task.id, "DENIED_FAIL_CORRIDOR")}
                                className="px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold font-mono rounded transition-all"
                              >
                                DENY
                              </button>
                              <button
                                onClick={() => handleApproveTask(task.id, "AUTHORIZED_PRE_FUNDED_MESH")}
                                className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-zinc-950 font-bold text-xs rounded shadow-lg transition-all"
                              >
                                AUTHORIZE ROUTE
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>

                </div>
              )}
            </section>

            {/* 3. DYNAMIC DISBURSEMENT BATCHING QUEUE */}
            <section id="liquidity_waterfall" className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
              
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-500" /> Cross-Border Liquidity Waterfall
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Bypasses conversion fees via dynamic batch sweeps</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                    SWEEP TIMER: {sweepCountdown}s
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Submit Form */}
                <form onSubmit={handleQueueTransaction} className="md:col-span-5 space-y-3 border-r border-zinc-900 pr-0 md:pr-6">
                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Queue Outgoing Transfer</h4>
                  
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Recipient Operator</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/30 rounded px-3 py-1.5 text-xs text-zinc-200 outline-none"
                      value={txRecipient}
                      onChange={(e) => setTxRecipient(e.target.value)}
                      placeholder="e.g. Mukasa Ronald"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Amount</label>
                      <input
                        type="number"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/30 rounded px-3 py-1.5 text-xs text-zinc-200 outline-none"
                        value={txAmount}
                        onChange={(e) => setTxAmount(e.target.value)}
                        placeholder="250000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Currency</label>
                      <select
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-200 outline-none"
                        value={txCurrency}
                        onChange={(e) => setTxCurrency(e.target.value)}
                      >
                        <option value="UGX">UGX</option>
                        <option value="KES">KES</option>
                        <option value="RWF">RWF</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Routing Corridor</label>
                    <select
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-200 outline-none"
                      value={txProvider}
                      onChange={(e) => setTxProvider(e.target.value)}
                    >
                      <option value="MTN">MTN Mobile Money Gateway</option>
                      <option value="AIRTEL">Airtel Money Corridor</option>
                      <option value="STANBIC">Stanbic Open Banking</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isQueueingTx}
                    className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs rounded transition-all flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Queue Disbursement
                  </button>
                </form>

                {/* Queue Display */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-zinc-500 uppercase">Buffer Pool Queue</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{batchQueue.length} Pending Batch Items</span>
                    </div>

                    {batchQueue.length === 0 ? (
                      <div className="p-6 border border-dashed border-zinc-900 rounded bg-zinc-900/10 text-center text-xs text-zinc-600">
                        Buffer empty. Queue items above to auto-execute during the next 15s sweep.
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
                        {batchQueue.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-zinc-900/40 border border-zinc-800/60 px-3 py-2 rounded text-xs font-mono">
                            <span className="text-zinc-300">{item.recipient}</span>
                            <span className="text-amber-400 font-bold">{item.amount.toLocaleString()} {item.currency} ({item.provider})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-xs font-mono text-zinc-500">
                    <span>Total Buffered: <strong className="text-zinc-200">{batchTotal.toLocaleString()} UGX</strong></span>
                    <span className="text-emerald-400 font-bold">Auto-Sweep Active</span>
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* ==========================================
              RIGHT HALF: AGENTS, TELEMETRY & AUDIT LOGS
              ========================================== */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* 1. AGENTS SUBNET MATRIX */}
            <section id="agent_subnet_nodes" className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-amber-500" /> Specialized Agent Matrix
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">5 Subnets registered to Chief Orchestrator</p>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest bg-zinc-900 text-zinc-400 rounded border border-zinc-800">
                  {agents.length} NODES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {agents.map((agent) => (
                  <div 
                    key={agent.id}
                    className={`border p-3.5 rounded-xl transition-all ${getAgentStatusRing(agent.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{agent.emoji}</span>
                      <span className={`text-[10px] font-mono font-bold uppercase ${getAgentStatusText(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-200">{agent.name}</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-snug">{agent.purpose}</p>

                    <div className="mt-3 pt-2 border-t border-zinc-900 flex flex-wrap gap-1">
                      {agent.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-mono bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. REAL-TIME PREDICTIVE TELEMETRY GRAPH */}
            <section id="predictive_telemetry" className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" /> Gateway Predictive Telemetry
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Real-time gateway latency tracking and route switching</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  STREAMING
                </div>
              </div>

              {/* SVG Latency Graph Component */}
              {renderLatencyChart()}

              {/* Provider Status Tiles */}
              <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-zinc-900">
                {telemetry?.connectors.map((connector) => (
                  <div key={connector.id} className="bg-zinc-900/40 border border-zinc-800/80 p-2.5 rounded-lg flex items-center justify-between text-xs font-mono">
                    <div className="truncate pr-2">
                      <span className="text-zinc-300 font-bold block truncate">{connector.name}</span>
                      <span className="text-[10px] text-zinc-500">{connector.provider} • {connector.latencyMs}ms</span>
                    </div>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      connector.status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400 animate-pulse'
                    }`}>
                      {connector.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. ZERO-KNOWLEDGE AUDIT TRAIL LEDGER */}
            <section id="zk_audit_ledger" className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-amber-500" /> ZK-Audit Proof Trail
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Cryptographic verification without payload exposure</p>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">SHA-256 LEDGER</span>
              </div>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                {zkLogs.length === 0 ? (
                  <p className="text-xs text-zinc-600 font-mono text-center py-4">No ZK proof logs generated yet.</p>
                ) : (
                  zkLogs.map((log) => (
                    <div 
                      key={log.id} 
                      onClick={() => setSelectedAuditLog(log)}
                      className="p-3 bg-zinc-900/40 border border-zinc-800/60 hover:border-amber-500/30 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{log.operationType}</span>
                        <span className="text-[10px] font-mono text-zinc-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans mt-1 line-clamp-1">{log.text}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-600 group-hover:text-amber-500/80">
                        <span className="truncate max-w-[200px]">HASH: {log.proofHash}</span>
                        <span className="flex items-center gap-1 text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          VERIFY PROOF <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>

        </div>
        )}

        {/* SUB-COMPONENT PHASE TABS */}
        {activeTab === 'orchestration' && (
          <OrchestrationTab 
            missions={missions} 
            agents={agents} 
            onRefresh={fetchCoreData} 
          />
        )}

        {activeTab === 'providers' && (
          <ProviderTab />
        )}

        {activeTab === 'connectors' && (
          <ConnectorsTab />
        )}

        {activeTab === 'memory' && (
          <MemoryTab />
        )}

        {activeTab === 'security' && (
          <SecurityTab />
        )}

        {activeTab === 'financial' && (
          <FinancialTab />
        )}

        {activeTab === 'intelligence' && (
          <IntelligenceTab />
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-zinc-900 py-8 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <div>
            MEHERAH OS • Enterprise Decoupled Multi-Agent Gateway Console.
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              ALL CORRIDORS ONLINE
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>

      {/* ZK PROOF MODAL INSPECTOR */}
      {selectedAuditLog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-amber-500/30 p-6 rounded-xl max-w-xl w-full shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> ZK Cryptographic Proof Verifier
              </h3>
              <button 
                onClick={() => setSelectedAuditLog(null)}
                className="text-zinc-500 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3 font-mono text-xs">
              <div>
                <span className="text-zinc-500 block uppercase text-[10px]">Operation Type:</span>
                <span className="text-amber-400 font-bold">{selectedAuditLog.operationType}</span>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase text-[10px]">Audit Log Content:</span>
                <p className="text-zinc-200 font-sans text-sm bg-zinc-900 p-3 rounded border border-zinc-800 mt-1">
                  {selectedAuditLog.text}
                </p>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase text-[10px]">Cryptographic Proof Hash:</span>
                <p className="text-emerald-400 break-all bg-zinc-900 p-2 rounded border border-zinc-800 mt-1">
                  {selectedAuditLog.proofHash}
                </p>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase text-[10px]">Timestamp Signed:</span>
                <span className="text-zinc-400">{new Date(selectedAuditLog.timestamp).toISOString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedAuditLog(null)}
                className="px-4 py-2 bg-amber-500 text-zinc-950 font-bold text-xs rounded hover:bg-amber-400 transition-all"
              >
                CLOSE INSPECTOR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
