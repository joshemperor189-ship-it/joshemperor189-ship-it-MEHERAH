import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Brain, 
  Zap, 
  Globe2, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  ArrowRight, 
  ShoppingBag, 
  Building2, 
  Share2, 
  Compass, 
  Check, 
  Sliders, 
  Bot, 
  Terminal, 
  Copy, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { 
  GraphNode, 
  GraphEdge, 
  AutonomousOptimizationAlert, 
  GlobalCorridor, 
  DigitalStandardSpecification, 
  MarketplaceIntelligenceApp 
} from '../../services/meherah-network-intelligence-era.service';

export function MeherahNetworkIntelligenceEraView() {
  const [activeTab, setActiveTab] = useState<
    'graph' | 'autonomous' | 'corridors' | 'standard' | 'marketplace'
  >('graph');
  const [loading, setLoading] = useState<boolean>(true);

  // Data States
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [networkScore, setNetworkScore] = useState<number>(99.6);
  const [totalTps, setTotalTps] = useState<number>(3420);
  const [alerts, setAlerts] = useState<AutonomousOptimizationAlert[]>([]);
  const [corridors, setCorridors] = useState<GlobalCorridor[]>([]);
  const [standardSpecs, setStandardSpecs] = useState<DigitalStandardSpecification[]>([]);
  const [marketplaceApps, setMarketplaceApps] = useState<MarketplaceIntelligenceApp[]>([]);

  // Selection states
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-postbank-ug');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  useEffect(() => {
    fetchIntelligenceData();
  }, []);

  const fetchIntelligenceData = async () => {
    setLoading(true);
    try {
      const [graphRes, alertRes, corrRes, stdRes, appRes] = await Promise.all([
        fetch('/api/meherah/network-intelligence/graph'),
        fetch('/api/meherah/network-intelligence/alerts'),
        fetch('/api/meherah/network-intelligence/corridors'),
        fetch('/api/meherah/network-intelligence/standard-specs'),
        fetch('/api/meherah/network-intelligence/marketplace-apps')
      ]);

      const graphData = await graphRes.json();
      setNodes(graphData.nodes || []);
      setEdges(graphData.edges || []);
      setNetworkScore(graphData.networkIntelligenceScore || 99.6);
      setTotalTps(graphData.totalGraphThroughputTps || 3420);

      setAlerts(await alertRes.json());
      setCorridors(await corrRes.json());
      setStandardSpecs(await stdRes.json());
      setMarketplaceApps(await appRes.json());
    } catch (err) {
      console.error('Failed to load MEHERAH Network Intelligence Era data:', err);
    } fontFinally: {
      setLoading(false);
    }
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const selectedNodeEdges = edges.filter(e => e.sourceId === selectedNodeId || e.targetId === selectedNodeId);

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* HERO BANNER FOR NETWORK INTELLIGENCE ERA */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <Brain className="w-3.5 h-3.5 text-[#070707]" /> NEW ERA UNLOCKED
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00B86B]" /> MEHERAH NETWORK INTELLIGENCE ERA
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF] italic">
                "When the network itself becomes intelligent."
              </h1>
              <p className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                From individual connections → to collective ecosystem intelligence.
              </p>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              MEHERAH is no longer just connecting systems. It understands relationships, predicts friction, continuously optimizes cross-border routes, hosts an ecosystem marketplace, and serves as the universal digital standard for financial communication.
            </p>
          </div>

          {/* INTELLIGENCE METRICS BOX */}
          <div className="bg-[#070707] border border-[#C9A227]/50 rounded-xl p-5 text-center space-y-2 min-w-[280px]">
            <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">ECOSYSTEM INTELLIGENCE SCORE</span>
            <div className="text-3xl font-bold font-mono text-[#00B86B]">
              {networkScore}%
            </div>
            <div className="text-[10px] text-[#C9A227] font-mono flex items-center justify-center gap-2">
              <span>{totalTps} TPS CAPACITY</span>
              <span>•</span>
              <span>{nodes.length} NODES</span>
            </div>
            <button
              onClick={fetchIntelligenceData}
              disabled={loading}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''} text-[#070707]`} />
              Re-Scan Network Graph
            </button>
          </div>
        </div>

        {/* 5 MILESTONE TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'graph', label: '1. Financial Intelligence Graph', desc: 'Living Relationship Map', icon: Network },
            { id: 'autonomous', label: '2. Autonomous Optimization', desc: 'Self-Healing Routing', icon: Bot },
            { id: 'corridors', label: '3. Global Corridor Engine', desc: 'Cross-Border Rails', icon: Globe2 },
            { id: 'standard', label: '4. Digital Standard', desc: 'One Universal Language', icon: Code2 },
            { id: 'marketplace', label: '5. Intelligence Marketplace', desc: 'Ecosystem Apps', icon: ShoppingBag }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-3 rounded-xl border text-left font-mono transition-all flex flex-col justify-between ${
                  active 
                    ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-lg shadow-[#C9A227]/20' 
                    : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase">{tab.label.split('.')[0]}</span>
                  <Icon className="w-4 h-4 text-current" />
                </div>
                <span className="text-xs font-bold font-sans mt-1 text-current truncate">{tab.label.split('.')[1]}</span>
                <span className="text-[9px] opacity-80 block font-mono truncate">{tab.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. FINANCIAL INTELLIGENCE GRAPH VIEW */}
      {activeTab === 'graph' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  LIVING RELATIONSHIP GRAPH
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Global Financial Intelligence Graph</h2>
                <p className="text-xs text-[#A7A7A7]">MEHERAH maps every commercial bank, mobile money rail, central bank, and payment gateway into an active intelligence mesh.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#00B86B]" /> LIVE MESH ACTIVE
              </span>
            </div>

            {/* GRAPH NODES SELECTOR & DETAIL CARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
              
              {/* NODE LIST */}
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">
                  NETWORK NODES ({nodes.length})
                </span>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {nodes.map((node) => {
                    const active = node.id === selectedNodeId;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 ${
                          active 
                            ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-md' 
                            : 'bg-[#111111] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono">{node.category}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${active ? 'bg-[#070707] text-[#C9A227]' : 'bg-[#070707] text-[#00B86B]'}`}>
                            {node.reliabilityScore}% REL
                          </span>
                        </div>
                        <h4 className="text-xs font-bold font-sans text-current">{node.name}</h4>
                        <div className="flex items-center justify-between text-[10px] opacity-80 pt-1">
                          <span>{node.country}</span>
                          <span>{node.averageLatencyMs}ms avg</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SELECTED NODE GRAPH INTELLIGENCE */}
              {selectedNode && (
                <div className="lg:col-span-2 p-6 bg-[#070707] border border-[#C9A227] rounded-2xl space-y-5 relative">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                        NODE INTELLIGENCE DOSSIER
                      </span>
                      <h3 className="text-xl font-bold font-sans text-[#FFFFFF] mt-1">{selectedNode.name}</h3>
                      <span className="text-xs text-[#A7A7A7]">{selectedNode.category} • {selectedNode.country}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#A7A7A7] block">LIQUIDITY HEALTH</span>
                      <span className="text-sm font-bold text-[#00B86B] font-mono">{selectedNode.liquidityHealth}</span>
                    </div>
                  </div>

                  {/* STATS STRIP */}
                  <div className="grid grid-cols-3 gap-3 text-center p-3 bg-[#111111] rounded-xl border border-[#222222]">
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block">RELIABILITY SCORE</span>
                      <span className="text-base font-bold text-[#00B86B]">{selectedNode.reliabilityScore}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block">AVG LATENCY</span>
                      <span className="text-base font-bold text-[#C9A227]">{selectedNode.averageLatencyMs}ms</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block">ACTIVE EDGES</span>
                      <span className="text-base font-bold text-[#FFFFFF]">{selectedNode.activeConnectionsCount} Connections</span>
                    </div>
                  </div>

                  {/* ACTIVE CORRIDOR EDGES FOR THIS NODE */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                      <Network className="w-4 h-4 text-[#C9A227]" /> CONNECTED GRAPH EDGES & FRICTION ANALYSIS
                    </span>

                    <div className="space-y-2">
                      {selectedNodeEdges.map((edge, idx) => (
                        <div key={idx} className="p-3 bg-[#111111] border border-[#222222] rounded-xl flex items-center justify-between text-xs font-mono">
                          <div>
                            <span className="font-bold text-[#FFFFFF] block font-sans">{edge.corridor}</span>
                            <span className="text-[10px] text-[#A7A7A7]">Throughput: {edge.throughputTps} TPS • Latency: {edge.avgLatencyMs}ms</span>
                          </div>

                          <div className="text-right">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                              edge.status === 'ACTIVE_OPTIMAL'
                                ? 'bg-[#00B86B]/20 border-[#00B86B]/40 text-[#00B86B]'
                                : 'bg-[#C9A227]/20 border-[#C9A227]/40 text-[#C9A227]'
                            }`}>
                              {edge.status}
                            </span>
                            <span className="text-[10px] text-[#A7A7A7] block mt-1">Friction Score: {edge.frictionScore}/10</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. AUTONOMOUS NETWORK OPTIMIZATION VIEW */}
      {activeTab === 'autonomous' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  PROACTIVE SELF-HEALING ENGINE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Autonomous Network Optimization</h2>
                <p className="text-xs text-[#A7A7A7]">The network proactively detects route performance drops, rebalances liquidity pre-emptively, and reroutes traffic with zero money loss.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00B86B]" /> AUTO-PILOT ENGAGED
              </span>
            </div>

            {/* ALERTS & OPTIMIZATION FEED */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#C9A227]" /> REAL-TIME AUTONOMOUS OPTIMIZATION DECISIONS
              </span>

              {alerts.map((alt) => (
                <div key={alt.id} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                        {alt.type}
                      </span>
                      <span className="text-xs text-[#A7A7A7]">{new Date(alt.timestamp).toLocaleTimeString()}</span>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                      alt.status === 'AUTO_EXECUTED'
                        ? 'bg-[#00B86B]/20 border-[#00B86B]/40 text-[#00B86B]'
                        : 'bg-[#C9A227]/20 border-[#C9A227]/40 text-[#C9A227]'
                    }`}>
                      STATUS: {alt.status}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-[#FFFFFF] font-sans">"{alt.message}"</p>

                  <div className="p-3 bg-[#111111] rounded-xl border border-[#222222] space-y-1">
                    <span className="text-[10px] text-[#00B86B] font-bold block">RECOMMENDED & EXECUTED ACTION:</span>
                    <p className="text-xs text-[#A7A7A7] font-sans">{alt.recommendedAction}</p>
                  </div>

                  <div className="text-[11px] text-[#C9A227] font-sans italic">
                    ⚡ Estimated Impact: {alt.impactEstimate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. GLOBAL CORRIDOR ENGINE VIEW */}
      {activeTab === 'corridors' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  CROSS-BORDER INTEROPERABILITY RAILS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Global Corridor Engine</h2>
                <p className="text-xs text-[#A7A7A7]">Connecting local banking systems into seamless cross-border regional and global corridors.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                100% ZERO MONEY LOSS GUARANTEED
              </span>
            </div>

            {/* CORRIDOR CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {corridors.map((corr) => (
                <div key={corr.code} className="p-6 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-4 relative">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-sm font-bold text-[#C9A227] font-sans">{corr.name} ({corr.fromCurrency} → {corr.toCurrency})</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded font-bold">
                      {corr.settlementLatency}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#A7A7A7]">
                      <span>Daily Corridor Volume:</span>
                      <strong className="text-[#FFFFFF]">{corr.dailyVolume}</strong>
                    </div>

                    <div className="flex justify-between text-xs text-[#A7A7A7]">
                      <span>Conversion Rate Benchmark:</span>
                      <strong className="text-[#00B86B]">1 {corr.fromCurrency} = {corr.avgConversionRate} {corr.toCurrency}</strong>
                    </div>

                    <div className="p-3 bg-[#111111] rounded-xl border border-[#222222] space-y-1">
                      <span className="text-[10px] text-[#C9A227] font-bold block">PRIMARY ROUTING PATH:</span>
                      <p className="text-xs text-[#FFFFFF] font-sans">{corr.primaryRoute}</p>
                    </div>

                    <div className="p-3 bg-[#111111] rounded-xl border border-[#222222] space-y-1">
                      <span className="text-[10px] text-[#A7A7A7] font-bold block">FAILOVER FALLBACK ROUTE:</span>
                      <p className="text-xs text-[#A7A7A7] font-sans">{corr.fallbackRoute}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. MEHERAH DIGITAL STANDARD VIEW */}
      {activeTab === 'standard' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ONE UNIVERSAL FINANCIAL LANGUAGE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Digital Standard</h2>
                <p className="text-xs text-[#A7A7A7]">Institutions become MEHERAH-compatible for communication, transaction meaning, verification, and financial intelligence.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                MHR-SPEC V2026.1
              </span>
            </div>

            {/* SPECIFICATION PILLARS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {standardSpecs.map((spec) => (
                <div key={spec.codeReference} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                      {spec.pillar}
                    </span>
                    <span className="text-[10px] text-[#00B86B] font-bold">{spec.compatibilityStatus}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#FFFFFF] font-sans">{spec.standardName}</h3>
                  <p className="text-xs text-[#A7A7A7] font-sans leading-relaxed">{spec.description}</p>
                  <span className="text-[10px] text-[#C9A227] block pt-2 border-t border-[#222222]">REF CODE: {spec.codeReference}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. MEHERAH INTELLIGENCE MARKETPLACE VIEW */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ECOSYSTEM MARKETPLACE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Intelligence Marketplace</h2>
                <p className="text-xs text-[#A7A7A7]">Allow trusted partners to build automation tools, analytics, treasury apps, and payment systems on top of MEHERAH.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                OPEN ECOSYSTEM ACTIVE
              </span>
            </div>

            {/* MARKETPLACE APPS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {marketplaceApps.map((app) => (
                <div key={app.id} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                        {app.category}
                      </span>
                      <span className="text-[10px] text-[#00B86B] font-bold">★ {app.rating}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#FFFFFF] font-sans">{app.name}</h3>
                    <p className="text-[11px] text-[#A7A7A7] font-sans leading-relaxed">{app.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#222222] space-y-2">
                    <div className="flex justify-between text-[10px] text-[#A7A7A7]">
                      <span>Author: <strong className="text-[#FFFFFF]">{app.author}</strong></span>
                      <span>Active: <strong className="text-[#C9A227]">{app.activeDeployments} Institutions</strong></span>
                    </div>

                    <button
                      onClick={() => alert(`Launching ${app.name} on MEHERAH Ecosystem Node...`)}
                      className="w-full py-2 bg-[#C9A227] text-[#070707] font-bold text-[10px] rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Deploy Ecosystem App
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
