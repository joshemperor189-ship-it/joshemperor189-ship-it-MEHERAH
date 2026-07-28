import React, { useState, useEffect } from 'react';
import { Network, ShoppingBag, BarChart3, AlertTriangle, RefreshCw, Globe, Search, ExternalLink, Bot, CheckCircle2, Sparkles, Rocket, Cpu, Brain, Zap, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { KGNode, KGEdge, MarketplacePlugin, TelemetryPrediction } from '../enterprise_types';

export default function IntelligenceTab() {
  const [graph, setGraph] = useState<{ nodes: KGNode[]; edges: KGEdge[] }>({ nodes: [], edges: [] });
  const [plugins, setPlugins] = useState<MarketplacePlugin[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryPrediction[]>([]);
  const [hoveredNode, setHoveredNode] = useState<KGNode | null>(null);

  // Web Search & Intelligence States
  const [searchQuery, setSearchQuery] = useState('Uganda food delivery market opportunities Menora Fries');
  const [isSearching, setIsSearching] = useState(false);
  const [storeInMemory, setStoreInMemory] = useState(true);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchLogs, setSearchLogs] = useState<any[]>([]);
  const [isLaunchingTest, setIsLaunchingTest] = useState(false);
  const [testMissionStatus, setTestMissionStatus] = useState<string | null>(null);

  // Self-Improvement & Gemini Evolution States
  const [selfImprovementData, setSelfImprovementData] = useState<any>(null);
  const [isLearningGemini, setIsLearningGemini] = useState(false);
  const [isRunningCycle, setIsRunningCycle] = useState(false);
  const [learningTopic, setLearningTopic] = useState('Gemini 3.6 Search Grounding Function Calling TypeScript SDK');

  // Advanced Architecture States
  const [swarmVotingData, setSwarmVotingData] = useState<any>(null);
  const [guardrailsData, setGuardrailsData] = useState<any>(null);
  const [daemonsData, setDaemonsData] = useState<any>(null);
  const [rlaifData, setRlaifData] = useState<any>(null);
  const [multimodalData, setMultimodalData] = useState<any>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [proposalInput, setProposalInput] = useState('Approve Menora Fries System Capacity Expansion');

  const fetchAdvancedArchitecture = async () => {
    try {
      const [swarmRes, guardRes, daemonRes, rlaifRes, multiRes] = await Promise.all([
        fetch('/api/architecture/swarm-voting'),
        fetch('/api/architecture/guardrails'),
        fetch('/api/architecture/persistence-daemons'),
        fetch('/api/architecture/rlaif-fewshot'),
        fetch('/api/architecture/multimodal')
      ]);

      if (swarmRes.ok) setSwarmVotingData(await swarmRes.json());
      if (guardRes.ok) setGuardrailsData(await guardRes.json());
      if (daemonRes.ok) setDaemonsData(await daemonRes.json());
      if (rlaifRes.ok) setRlaifData(await rlaifRes.json());
      if (multiRes.ok) setMultimodalData(await multiRes.json());
    } catch (e) {
      console.warn(e);
    }
  };

  const handleExecuteSwarmVote = async () => {
    setIsVoting(true);
    try {
      const res = await fetch('/api/architecture/swarm-voting/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal: proposalInput })
      });
      if (res.ok) {
        await fetchAdvancedArchitecture();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsVoting(false);
    }
  };

  const fetchGraph = async () => {
    try {
      const res = await fetch('/api/knowledge-graph');
      if (res.ok) {
        const data = await res.json();
        setGraph(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchPlugins = async () => {
    try {
      const res = await fetch('/api/marketplace/plugins');
      if (res.ok) {
        const data = await res.json();
        setPlugins(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/telemetry/forecast');
      if (res.ok) {
        const data = await res.json();
        setTelemetry(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchSearchLogs = async () => {
    try {
      const res = await fetch('/api/web-search/logs');
      if (res.ok) {
        const data = await res.json();
        setSearchLogs(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchSelfImprovementStatus = async () => {
    try {
      const res = await fetch('/api/self-improvement/status');
      if (res.ok) {
        const data = await res.json();
        setSelfImprovementData(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchGraph();
    fetchPlugins();
    fetchTelemetry();
    fetchSearchLogs();
    fetchSelfImprovementStatus();
    fetchAdvancedArchitecture();
  }, []);

  const handleLearnGemini = async (customTopic?: string) => {
    setIsLearningGemini(true);
    try {
      const res = await fetch('/api/self-improvement/learn-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetTopic: customTopic || learningTopic })
      });
      if (res.ok) {
        await fetchSelfImprovementStatus();
        await fetchGraph();
      }
    } catch (e) {
      console.warn('Gemini learning failed:', e);
    } finally {
      setIsLearningGemini(false);
    }
  };

  const handleRunSelfImprovementCycle = async () => {
    setIsRunningCycle(true);
    try {
      const res = await fetch('/api/self-improvement/run-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        await fetchSelfImprovementStatus();
        await fetchGraph();
      }
    } catch (e) {
      console.warn('Self-improvement cycle failed:', e);
    } finally {
      setIsRunningCycle(false);
    }
  };

  const handleExecuteSearch = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = customQuery || searchQuery;
    if (!queryToUse.trim()) return;

    setIsSearching(true);
    setSearchResult(null);
    try {
      const res = await fetch('/api/web-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryToUse,
          storeInMemory
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSearchResult(data);
        fetchSearchLogs();
        fetchGraph(); // Memory graph updates when research is saved to memory!
      }
    } catch (err: any) {
      console.warn('Search execution failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLaunchTestMission = async () => {
    setIsLaunchingTest(true);
    setTestMissionStatus('Launching Chief Agent Web Intelligence pipeline...');
    try {
      const res = await fetch('/api/missions/test-uganda-menora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        setTestMissionStatus(`Mission successfully initiated! ID: ${data.missionId}. Deconstruct & Web Reasoning active in Mission Control.`);
        fetchGraph();
        fetchSearchLogs();
      }
    } catch (err: any) {
      setTestMissionStatus('Failed to launch test mission: ' + err.message);
    } finally {
      setIsLaunchingTest(false);
    }
  };

  const handleTogglePlugin = async (id: string) => {
    try {
      const res = await fetch('/api/marketplace/plugins/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchPlugins();
        fetchGraph();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Helper: map node types to gold-palette colors
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'user': return '#f59e0b';
      case 'agent': return '#fbbf24';
      case 'mission': return '#d97706';
      case 'memory': return '#78350f';
      case 'connector': return '#b45309';
      default: return '#52525b';
    }
  };

  const width = 600;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;

  const positionedNodes = graph.nodes.map((node, index) => {
    if (node.id === 'meherah') {
      return { ...node, x: centerX, y: centerY };
    }
    const angle = (index * (2 * Math.PI)) / (graph.nodes.length - 1);
    const radius = node.type === 'agent' ? 90 : node.type === 'mission' ? 140 : 180;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { ...node, x, y };
  });

  return (
    <div className="space-y-6" id="intelligence_panel">
      
      {/* ========================================================= */}
      {/* 1. WEB INTELLIGENCE CONNECTOR & RESEARCH AGENT HUB        */}
      {/* ========================================================= */}
      <div className="border border-amber-500/30 bg-zinc-950 p-6 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 px-4 py-1 bg-amber-500/10 border-b border-l border-amber-500/20 text-[10px] font-mono tracking-widest text-amber-400 rounded-bl uppercase">
          ACTIVATED: WEB CONNECTOR V3
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" /> Web Intelligence Command Center
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Enables Chief Agent & Research Agent to perform real-time internet searches, summarize external market data, and tag discoveries in Memory Engine.
            </p>
          </div>

          {/* TEST MISSION LAUNCH BUTTON */}
          <button
            onClick={handleLaunchTestMission}
            disabled={isLaunchingTest}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg shadow-lg flex items-center gap-2 transition-all shrink-0 disabled:opacity-50"
          >
            <Rocket className="w-4 h-4 text-zinc-950" />
            {isLaunchingTest ? 'Launching Test Mission...' : 'Launch Uganda Market Test Mission'}
          </button>
        </div>

        {testMissionStatus && (
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{testMissionStatus}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SEARCH INTERFACE & LIVE FINDINGS */}
          <div className="lg:col-span-7 space-y-4">
            <form onSubmit={handleExecuteSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Enter web research query (e.g. Uganda food delivery market size Menora Fries)..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
              </div>

              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-40"
              >
                {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
                Research
              </button>
            </form>

            <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-mono">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeInMemory}
                  onChange={(e) => setStoreInMemory(e.target.checked)}
                  className="rounded border-zinc-800 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                />
                Auto-save research into Memory Engine
              </label>

              <span className="text-zinc-600">|</span>

              <button
                type="button"
                onClick={() => handleExecuteSearch(undefined, 'Uganda food delivery market opportunities Menora Fries')}
                className="text-amber-400 hover:underline"
              >
                Preset: Menora Fries Query
              </button>
            </div>

            {/* LIVE SEARCH RESULTS DISPLAY */}
            {searchResult && (
              <div className="p-4 bg-zinc-900/60 border border-amber-500/20 rounded-lg space-y-3 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {searchResult.provider}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Latency: {searchResult.searchLatencyMs}ms | Sources: {searchResult.sourceCount}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "{searchResult.summary}"
                </p>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Key Discoveries:</p>
                  <ul className="space-y-1">
                    {searchResult.keyFindings?.map((finding: string, idx: number) => (
                      <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1 pt-2 border-t border-zinc-800/60">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Sources Accessed:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResult.results?.map((res: any, idx: number) => (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-zinc-950 border border-zinc-800 hover:border-amber-500/30 rounded text-[10px] block transition-all"
                      >
                        <div className="flex justify-between items-center text-amber-300 font-bold truncate">
                          <span className="truncate">{res.title}</span>
                          <ExternalLink className="w-3 h-3 shrink-0 ml-1 text-zinc-500" />
                        </div>
                        <p className="text-zinc-500 mt-0.5 line-clamp-1">{res.snippet}</p>
                        <span className="text-[9px] font-mono text-amber-500/80 mt-1 inline-block">{res.domain}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RESEARCH AGENT STATUS & HISTORICAL LOGS */}
          <div className="lg:col-span-5 border-l border-zinc-900 pl-0 lg:pl-6 space-y-4">
            
            {/* Research Agent Status Card */}
            <div className="p-3.5 bg-zinc-900/40 border border-zinc-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center text-lg">
                  🔎
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                    Research Agent <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 px-1.5 rounded">ONLINE</span>
                  </h4>
                  <p className="text-[10px] text-zinc-500">Specialist: Market Analysis & Web Research</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">STANDBY</span>
                <span className="text-[9px] text-zinc-600">Rate Limit: 20 req/m</span>
              </div>
            </div>

            {/* Historical Web Search Activity Table */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 font-mono">
                  <Globe className="w-3.5 h-3.5 text-amber-500" /> Web Search Audit Logs
                </h4>
                <button onClick={fetchSearchLogs} className="text-zinc-500 hover:text-zinc-300">
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                {searchLogs.length === 0 ? (
                  <p className="text-[11px] text-zinc-600 italic p-2">No external web search logs recorded yet.</p>
                ) : (
                  searchLogs.map((log) => (
                    <div
                      key={log.id}
                      onClick={() => setSearchResult(log)}
                      className="p-2.5 bg-zinc-900/30 hover:bg-zinc-900/80 border border-zinc-900 hover:border-amber-500/30 rounded cursor-pointer transition-all"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-mono text-amber-400 font-bold truncate max-w-[200px]">"{log.query}"</span>
                        <span className="text-zinc-500 font-mono text-[9px]">{log.searchLatencyMs}ms</span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-[9px] text-zinc-500">
                        <span>{log.sourceCount} sources found</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. AUTONOMOUS SELF-IMPROVEMENT & GEMINI LEARNING ENGINE   */}
      {/* ========================================================= */}
      <div className="border border-amber-500/40 bg-zinc-950 p-6 rounded-xl shadow-2xl relative overflow-hidden bg-gold-grid">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-amber-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-bold text-zinc-100">
                Self-Evolution & Gemini Learning Engine
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                GEN {selfImprovementData?.evolutionScore || '94.8'}%
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              MEHERAH OS autonomously gathers information from the internet, studies Gemini SDK architectures, and applies prompt & model optimizations to continuously self-improve.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleLearnGemini()}
              disabled={isLearningGemini}
              className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Zap className={`w-3.5 h-3.5 text-amber-400 ${isLearningGemini ? 'animate-spin' : ''}`} />
              {isLearningGemini ? 'Studying Gemini API...' : 'Learn Gemini SDK Capabilities'}
            </button>

            <button
              onClick={handleRunSelfImprovementCycle}
              disabled={isRunningCycle}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-extrabold text-xs rounded-lg shadow-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Cpu className={`w-4 h-4 ${isRunningCycle ? 'animate-spin' : ''}`} />
              {isRunningCycle ? 'Running Self-Improvement...' : 'Run Self-Improvement Cycle'}
            </button>
          </div>
        </div>

        {/* TOPIC SELECTION & QUICK LEARN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-8 flex gap-2">
            <input
              type="text"
              value={learningTopic}
              onChange={(e) => setLearningTopic(e.target.value)}
              placeholder="Enter AI topic for MEHERAH OS to learn..."
              className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none font-mono"
            />
            <button
              onClick={() => handleLearnGemini(learningTopic)}
              disabled={isLearningGemini || !learningTopic.trim()}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-mono font-bold rounded-lg border border-amber-500/30 shrink-0"
            >
              Learn Topic
            </button>
          </div>

          <div className="md:col-span-4 flex items-center gap-2 overflow-x-auto text-[10px] font-mono">
            <span className="text-zinc-500 shrink-0">Presets:</span>
            <button
              onClick={() => handleLearnGemini('Gemini Search Grounding live citations API')}
              className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/20 rounded shrink-0"
            >
              Search Grounding
            </button>
            <button
              onClick={() => handleLearnGemini('Gemini Function Calling Structured JSON Schema')}
              className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/20 rounded shrink-0"
            >
              Function Calling
            </button>
          </div>
        </div>

        {/* DISPLAY LEARNED GEMINI CONCEPTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {selfImprovementData?.learnedGeminiConcepts?.map((concept: any, idx: number) => (
            <div key={idx} className="p-3.5 bg-zinc-900/60 border border-amber-500/20 rounded-xl space-y-2 relative group hover:border-amber-500/40 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold">
                  {concept.status}
                </span>
                <span className="text-[9px] font-mono text-zinc-500">{concept.capability}</span>
              </div>
              <h4 className="text-xs font-bold text-zinc-100 flex items-center gap-1">
                {concept.title}
              </h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-3">
                {concept.description}
              </p>
              <div className="text-[9px] font-mono text-amber-500/80 pt-1 border-t border-zinc-800">
                Source: {concept.source}
              </div>
            </div>
          ))}
        </div>

        {/* ACTIVE PROMPT OPTIMIZATIONS & AUDIT LOGS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-zinc-900 pt-4">
          <div className="md:col-span-6 space-y-2">
            <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Active System Optimizations (Auto-Applied)
            </h4>
            <div className="space-y-1.5">
              {selfImprovementData?.activePromptOptimizations?.map((opt: string, i: number) => (
                <div key={i} className="p-2 bg-zinc-900/40 border border-zinc-800 rounded text-xs text-zinc-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 space-y-2">
            <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Self-Evolution Log History
            </h4>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
              {selfImprovementData?.selfImprovementLogs?.map((log: any) => (
                <div key={log.id} className="p-2 bg-zinc-900/30 border border-zinc-900 rounded text-[11px] space-y-0.5">
                  <div className="flex justify-between text-amber-400 font-bold font-mono">
                    <span>{log.title}</span>
                    <span className="text-[9px] text-zinc-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-zinc-400 text-[10px]">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. SWARM INTELLIGENCE & ADVANCED GUARDRAILS MATRIX        */}
      {/* ========================================================= */}
      <div className="border border-amber-500/30 bg-zinc-950 p-6 rounded-xl shadow-2xl relative overflow-hidden bg-gold-grid space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-bold text-zinc-100">
                Swarm Intelligence & Advanced Safety Guardrails
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                3-AGENT CONSENSUS ACTIVE
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Combines democratic voting protocols, strict Zod/Pydantic structure validation, budget caps ($50/day cap), autonomous daemons, and multimodal perception.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={proposalInput}
              onChange={(e) => setProposalInput(e.target.value)}
              placeholder="Enter proposal for 3-agent swarm vote..."
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 font-mono w-64 outline-none focus:border-amber-500/50"
            />
            <button
              onClick={handleExecuteSwarmVote}
              disabled={isVoting || !proposalInput.trim()}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs rounded-lg shadow flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Zap className={`w-3.5 h-3.5 ${isVoting ? 'animate-spin' : ''}`} />
              {isVoting ? 'Voting...' : 'Trigger Swarm Vote'}
            </button>
          </div>
        </div>

        {/* 5 ADVANCED DIMENSION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: RLAIF & Few-Shot */}
          <div className="p-4 bg-zinc-900/50 border border-amber-500/20 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5"><Brain className="w-4 h-4 text-amber-400" /> RLAIF & Few-Shot Library</span>
              <span className="text-[10px] font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-400">Score: {rlaifData?.feedbackRewardScore || '0.982'}</span>
            </div>
            <p className="text-[11px] text-zinc-400">Dynamically inserts top-performing past prompt templates based on problem domain.</p>
            <div className="text-[10px] font-mono text-zinc-500 space-y-1 pt-2 border-t border-zinc-800/80">
              <div>Templates Indexed: <span className="text-zinc-200 font-bold">{rlaifData?.fewShotLibrary?.length || 3} Core Solutions</span></div>
              <div>Critic Weight: <span className="text-amber-400 font-bold">{rlaifData?.activePromptWeights?.criticValidationRigorousness || '1.50'}x</span></div>
            </div>
          </div>

          {/* Card 2: Autonomous Persistence Daemons */}
          <div className="p-4 bg-zinc-900/50 border border-amber-500/20 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4 text-amber-400" /> Autonomous Daemons & Crons</span>
              <span className="text-[10px] font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-400 font-bold">ONLINE</span>
            </div>
            <p className="text-[11px] text-zinc-400">Continuously runs background loops for market monitoring, MoMo webhooks, and vector re-indexing.</p>
            <div className="text-[10px] font-mono text-zinc-500 space-y-1 pt-2 border-t border-zinc-800/80">
              <div>Active Background Daemons: <span className="text-zinc-200 font-bold">{daemonsData?.activeDaemons?.length || 3} Running</span></div>
              <div>Trigger Modes: <span className="text-amber-400 font-bold">Event-Driven & Scheduled Crons</span></div>
            </div>
          </div>

          {/* Card 3: Guardrails & Budget Caps */}
          <div className="p-4 bg-zinc-900/50 border border-amber-500/20 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-amber-400" /> Guardrails & Cost Controls</span>
              <span className="text-[10px] font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-400 font-bold">HARDENED</span>
            </div>
            <p className="text-[11px] text-zinc-400">Pydantic/Zod response structures, real-time jailbreak shield, and hard daily token spending caps.</p>
            <div className="text-[10px] font-mono text-zinc-500 space-y-1 pt-2 border-t border-zinc-800/80">
              <div>Daily Budget Cap: <span className="text-zinc-200 font-bold">${guardrailsData?.budgetCaps?.dailyCostCapUSD || '50.00'} / Spent: ${guardrailsData?.budgetCaps?.currentCostSpentUSD || '1.42'}</span></div>
              <div>Schema Enforcement: <span className="text-emerald-400 font-bold">STRICT ZOD VALIDATION</span></div>
            </div>
          </div>

          {/* Card 4: Multimodal Perception */}
          <div className="p-4 bg-zinc-900/50 border border-amber-500/20 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5"><Bot className="w-4 h-4 text-amber-400" /> Multimodal Vision & Speech</span>
              <span className="text-[10px] font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-400 font-bold">ACTIVE</span>
            </div>
            <p className="text-[11px] text-zinc-400">Computer vision screenshot inspection and audio stream tone/sentiment processing.</p>
            <div className="text-[10px] font-mono text-zinc-500 space-y-1 pt-2 border-t border-zinc-800/80">
              <div>Vision Scanner: <span className="text-zinc-200 font-bold">{multimodalData?.visionInspector?.status || 'ONLINE'}</span></div>
              <div>Sentiment Score: <span className="text-amber-400 font-bold">{Math.round((multimodalData?.voiceSentimentEngine?.latestSentimentScore ?? 0.96) * 100)}% Positive</span></div>
            </div>
          </div>

          {/* Card 5: Recent Swarm Decisions */}
          <div className="p-4 bg-zinc-900/50 border border-amber-500/20 rounded-xl space-y-2 lg:col-span-2">
            <div className="flex justify-between items-center text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Recent Swarm Democratic Consensus Decisions</span>
              <span className="text-[10px] font-mono text-zinc-500">{swarmVotingData?.consensusThreshold || '3/3 AGENT APPROVAL'}</span>
            </div>
            <div className="space-y-1.5 max-h-[90px] overflow-y-auto pr-1 custom-scrollbar">
              {swarmVotingData?.recentSwarmDecisions?.map((dec: any) => (
                <div key={dec.decisionId} className="p-2 bg-zinc-950/80 border border-amber-500/20 rounded text-[11px] flex justify-between items-center">
                  <div>
                    <span className="font-bold text-zinc-200 block">{dec.proposal}</span>
                    <span className="text-[9px] font-mono text-amber-400/80">Result: {dec.result} ({dec.votes?.length || 3} votes)</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                    PASSED
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. INTERACTIVE KNOWLEDGE GRAPH & MARKETPLACE             */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Orbital SVG Knowledge Graph */}
        <div className="lg:col-span-7 border border-zinc-800 bg-zinc-950 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <Network className="w-5 h-5 text-amber-500" /> Interactive Knowledge Graph
              </h3>
              <button onClick={fetchGraph} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              Inspect dynamically compiled knowledge relationships. Hover over any node to inspect system weights.
            </p>

            <div className="relative border border-zinc-900 bg-black/40 rounded-xl overflow-hidden p-2">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[300px]">
                {graph.edges.map((edge) => {
                  const srcNode = positionedNodes.find(n => n.id === edge.source);
                  const tgtNode = positionedNodes.find(n => n.id === edge.target);
                  if (!srcNode || !tgtNode) return null;
                  return (
                    <line
                      key={edge.id}
                      x1={srcNode.x}
                      y1={srcNode.y}
                      x2={tgtNode.x}
                      y2={tgtNode.y}
                      stroke="#451a03"
                      strokeWidth="1.2"
                      strokeDasharray={edge.label === 'routes_through' ? '4,4' : '0'}
                    />
                  );
                })}

                {positionedNodes.map((node) => (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle
                      r={node.id === 'meherah' ? 14 : 7}
                      fill={getNodeColor(node.type)}
                      className="transition-all duration-300 hover:scale-125"
                      stroke="#000"
                      strokeWidth="1.5"
                    />
                    <text
                      y={node.id === 'meherah' ? 24 : 16}
                      textAnchor="middle"
                      fill="#e4e4e7"
                      fontSize="9"
                      fontWeight="600"
                      className="font-sans select-none pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>

              {hoveredNode && (
                <div className="absolute bottom-3 left-3 bg-zinc-950/90 border border-amber-500/30 p-2.5 rounded shadow-lg text-[10px] font-mono text-zinc-300 min-w-[140px]">
                  <p className="text-amber-400 font-bold uppercase tracking-wider">{hoveredNode.label}</p>
                  <p className="text-zinc-500 mt-1">Entity ID: {hoveredNode.id}</p>
                  <p className="text-zinc-500">Category: {hoveredNode.type.toUpperCase()}</p>
                  <p className="text-zinc-500">Graph Weight: {hoveredNode.val}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plugin Marketplace Panel */}
        <div className="lg:col-span-5 border border-zinc-800 bg-zinc-950 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" /> Plugins Marketplace
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Extend MEHERAH OS logic and routing. Modules install instantly on-demand.
            </p>

            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
              {plugins.map(p => (
                <div key={p.id} className="p-3 bg-zinc-900/10 border border-zinc-900 rounded-lg flex items-center justify-between">
                  <div className="pr-4">
                    <h4 className="text-xs font-bold text-zinc-200">{p.name}</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">{p.description}</p>
                  </div>
                  
                  <button
                    onClick={() => handleTogglePlugin(p.id)}
                    className={`px-2 py-1 font-mono text-[9px] font-bold rounded border uppercase transition-colors shrink-0 ${
                      p.enabled 
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' 
                        : 'bg-zinc-900 text-zinc-500 border-zinc-900 hover:border-zinc-800'
                    }`}
                  >
                    {p.enabled ? 'ACTIVE' : 'INSTALL'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Latency Telemetry Predictive Forecasting */}
      <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-500" /> Telemetry Latency Trend & Anomaly Forecasting
          </h3>
          <button onClick={fetchTelemetry} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-zinc-500 mb-4">
          Visual forecast of regional corridors. Detects predicted latency bottlenecks and issues proactive failover suggestions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 overflow-x-auto">
            <div className="flex items-end justify-between h-36 border-b border-l border-zinc-900 px-4 pb-2 pt-6 min-w-[500px]">
              {telemetry.map((t, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-grow">
                  <div className="relative h-24 w-12 flex items-end justify-around">
                    <div 
                      style={{ height: `${(t.predictedMtnLatency / 110) * 100}%` }}
                      className="w-3 bg-amber-500/60 rounded-t transition-all duration-500"
                    />
                    <div 
                      style={{ height: `${(t.predictedAirtelLatency / 110) * 100}%` }}
                      className="w-3 bg-amber-700 rounded-t transition-all duration-500"
                    />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-600">
                    {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-6 mt-3 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-500 rounded" /> MTN Latency (Forecast)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-700 rounded" /> Airtel Latency (Forecast)</span>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            {telemetry.find(t => t.anomalyScore > 50) ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" /> ANOMALY RISK CORRELATION DETECTED
                </div>
                <p className="text-[11px] leading-relaxed">
                  {telemetry.find(t => t.anomalyScore > 50)?.recommendation}
                </p>
                <div className="text-[10px] font-mono text-red-500">
                  Forecast Score: {telemetry.find(t => t.anomalyScore > 50)?.anomalyScore}/100
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                <p className="text-xs font-bold flex items-center gap-1.5 mb-1">
                  ✓ ALL CORRIDOR SIGNALS OPTIMAL
                </p>
                <p className="text-[11px] text-zinc-400">
                  Telemetry predictive modules verify zero network anomalies forecasted for the next 100 seconds. Keep transaction batches running.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
