import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Brain,
  Activity,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Scale,
  Send,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  Lock,
  Layers,
  ChevronRight,
  Clock,
  ArrowUpRight,
  Bot,
  Sliders,
  FileText,
  X,
  Download
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Throughput and latency chart mock data
const chartData = [
  { time: '00:00', throughput: 1200, latency: 2.1 },
  { time: '04:00', throughput: 850, latency: 1.9 },
  { time: '08:00', throughput: 2400, latency: 2.3 },
  { time: '12:00', throughput: 4100, latency: 1.8 },
  { time: '16:00', throughput: 3800, latency: 2.0 },
  { time: '20:00', throughput: 2900, latency: 2.2 },
  { time: '23:59', throughput: 1950, latency: 1.8 },
];

export function AdministrationCommandCenter() {
  // Provider Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Interactive Live Financial Network Table Data
  const [providers, setProviders] = useState([
    {
      id: 'net-1',
      name: 'MTN MoMo',
      type: 'Mobile Money',
      status: 'Online',
      speed: '2.1s',
      successRate: '99.5%',
      recommendation: 'Preferred Route',
      tagColor: 'bg-[#C8A34A]/20 text-[#C8A34A] border-[#C8A34A]/40',
      detail: 'Optimal liquidity depth, zero queue delay on Central Uganda hub.'
    },
    {
      id: 'net-2',
      name: 'Airtel Money',
      type: 'Mobile Money',
      status: 'Online',
      speed: '2.8s',
      successRate: '98.9%',
      recommendation: 'Available',
      tagColor: 'bg-[#00B86B]/20 text-[#00B86B] border-[#00B86B]/40',
      detail: 'Secondary instant fallback channel with high availability.'
    },
    {
      id: 'net-3',
      name: 'Flutterwave',
      type: 'Payment Gateway',
      status: 'Online',
      speed: '3.0s',
      successRate: '99.1%',
      recommendation: 'Secondary Route',
      tagColor: 'bg-[#E8C879]/20 text-[#E8C879] border-[#E8C879]/40',
      detail: 'Cross-border clearing gateway active with 3D-secure failover.'
    },
    {
      id: 'net-4',
      name: 'Bank API Network',
      type: 'Commercial Bank Rail',
      status: 'Online',
      speed: '1.8s',
      successRate: '99.9%',
      recommendation: 'Optimal',
      tagColor: 'bg-[#00B86B]/20 text-[#00B86B] border-[#00B86B]/40',
      detail: 'UNISS RTGS clearing rail connected directly to BOU settlement hub.'
    }
  ]);

  // AI Assistant Chat Messages State
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: string;
    evidence?: string;
  }>>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Good day, Administrator. I am the MEHERAH AI Intelligence Assistant. How can I assist with your governance, provider routing, or network performance analysis today?',
      timestamp: 'Just now',
      evidence: 'GOV-KERNEL-0x9928'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotification('Refreshed network status and governance metrics.');
    }, 800);
  };

  // Chat Query Handler
  const handleSendMessage = (customPrompt?: string) => {
    const query = customPrompt || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user' as const,
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let replyText = '';
    let evidenceRef = 'ANALYSIS-EXEC-0x' + Math.floor(Math.random() * 8999 + 1000).toString(16).toUpperCase();

    const lower = query.toLowerCase();
    if (lower.includes('weekly') || lower.includes('weekly network performance report')) {
      replyText = 'WEEKLY NETWORK PERFORMANCE REPORT GENERATED:\n• Period: July 24, 2026 – July 30, 2026\n• Total Volume: 168,450 transactions ($42.8M UGX eq.)\n• Overall Network Uptime: 99.85%\n• Autonomous AI Reroutes: 412 zero-loss self-healing events\n• Regulatory Audit Status: 100% BOU Compliant.\n\nOpening the detailed executive report modal...';
      setIsWeeklyReportModalOpen(true);
    } else if (lower.includes('report') || lower.includes("today's network")) {
      replyText = 'NETWORK REPORT (24H SUMMARY):\n• Total Volume: 24,850 transactions executed.\n• System Uptime: 99.8% across 12 connected financial nodes.\n• Top Performing Rail: Bank API Network (1.8s avg latency, 99.9% success).\n• Zero compliance violations detected by automated policy engines.';
    } else if (lower.includes('failure') || lower.includes('fail') || lower.includes('explain')) {
      replyText = 'TRANSACTION FAILURE ANALYSIS:\n• Failures in last 24h: 0.04% (10 out of 24,850).\n• Primary Root Cause: Destination provider timeout on Airtel Money (resolved in 2.1s via auto-reroute to MTN MoMo).\n• Money Loss: 0 UGX (All failed payloads caught by atomic multi-phase rollback).';
    } else if (lower.includes('provider') || lower.includes('performance')) {
      replyText = 'PROVIDER PERFORMANCE BREAKDOWN:\n1. Bank API Network: 1.8s | 99.9% Success | Optimal\n2. MTN MoMo: 2.1s | 99.5% Success | Preferred Route\n3. Airtel Money: 2.8s | 98.9% Success | Available\n4. Flutterwave: 3.0s | 99.1% Success | Secondary Route\nRecommendation: Maintain current dynamic weight distribution.';
    } else {
      replyText = `MEHERAH Intelligence processed query: "${query}". System status is OPTIMAL. All 12 connected financial rails are passing continuous Zero-Trust compliance verification with 99.8% reliability.`;
    }

    const assistantMsg = {
      id: `ast-${Date.now()}`,
      sender: 'assistant' as const,
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      evidence: evidenceRef
    };

    setChatMessages((prev) => [...prev, userMsg, assistantMsg]);
    if (!customPrompt) setInputQuery('');
  };

  const filteredProviders = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || p.status.toUpperCase() === filterStatus.toUpperCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#0B0B0B] text-[#FFFFFF] min-h-screen p-4 sm:p-6 lg:p-8 space-y-8 font-sans selection:bg-[#C8A34A] selection:text-[#0B0B0B]">
      
      {/* HEADER BANNER */}
      <div className="p-6 bg-[#111111] border border-[#C8A34A]/30 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A34A]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#222222] pb-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8C879] via-[#C8A34A] to-[#8A6D1B] p-0.5 shadow-[0_0_25px_rgba(200,163,74,0.3)]">
              <div className="w-full h-full bg-[#0B0B0B] rounded-[14px] flex items-center justify-center text-[#C8A34A]">
                <Sparkles size={28} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#C8A34A]">
                  INSTITUTIONAL GOVERNANCE KERNEL
                </span>
                <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B86B] animate-ping" />
                  SYSTEM ONLINE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-[#FFFFFF] mt-1 tracking-tight">
                MEHERAH Institutional Command Center
              </h1>
              <p className="text-xs sm:text-sm text-[#A7A7A7] mt-0.5 font-sans">
                "AI-powered governance, compliance, and financial ecosystem intelligence."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#C8A34A]/40 text-[#E8C879] font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-[#C8A34A]' : 'text-[#C8A34A]'} />
              <span>{isRefreshing ? 'Syncing...' : 'Refresh Network Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* FEEDBACK NOTIFICATION TOAST */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-[#06271A] border border-[#00B86B] rounded-xl text-[#00B86B] font-mono text-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{feedback}</span>
              </div>
              <button onClick={() => setFeedback(null)} className="text-xs opacity-70 hover:opacity-100">✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 1: EXECUTIVE METRICS CARDS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8A34A] font-mono flex items-center gap-2">
            <Activity size={14} />
            <span>SECTION 1: EXECUTIVE METRICS CARDS</span>
          </h2>
          <span className="text-[11px] text-[#A7A7A7] font-mono">Real-time Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Connected Networks */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 bg-[#111111] border border-[#C8A34A]/30 hover:border-[#C8A34A] rounded-2xl space-y-3 shadow-xl transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#A7A7A7] uppercase tracking-wider">
                Connected Networks
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#C8A34A]/10 border border-[#C8A34A]/40 flex items-center justify-center text-[#C8A34A]">
                <Building2 size={20} />
              </div>
            </div>
            <div>
              <strong className="text-3xl font-bold font-playfair text-[#FFFFFF] tracking-tight">12</strong>
              <p className="text-xs text-[#A7A7A7] mt-1 font-sans leading-relaxed">
                Banks, wallets, and payment providers connected
              </p>
            </div>
            <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#00B86B] flex items-center gap-1 font-semibold">
                <TrendingUp size={12} /> +3 this quarter
              </span>
              <span className="text-[#E8C879]">100% Failover Operational</span>
            </div>
          </motion.div>

          {/* Card 2: AI Decisions Processed */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 bg-[#111111] border border-[#C8A34A]/30 hover:border-[#C8A34A] rounded-2xl space-y-3 shadow-xl transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#A7A7A7] uppercase tracking-wider">
                AI Decisions Processed
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#C8A34A]/10 border border-[#C8A34A]/40 flex items-center justify-center text-[#C8A34A]">
                <Brain size={20} />
              </div>
            </div>
            <div>
              <strong className="text-3xl font-bold font-playfair text-[#FFFFFF] tracking-tight">24,850</strong>
              <p className="text-xs text-[#A7A7A7] mt-1 font-sans leading-relaxed">
                Intelligent routing and analysis decisions
              </p>
            </div>
            <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#00B86B] font-semibold">99.96% Confidence</span>
              <span className="text-[#E8C879]">JARVIS ACTIVE</span>
            </div>
          </motion.div>

          {/* Card 3: System Reliability */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 bg-[#111111] border border-[#C8A34A]/30 hover:border-[#C8A34A] rounded-2xl space-y-3 shadow-xl transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#A7A7A7] uppercase tracking-wider">
                System Reliability
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#00B86B]/10 border border-[#00B86B]/40 flex items-center justify-center text-[#00B86B]">
                <Activity size={20} />
              </div>
            </div>
            <div>
              <strong className="text-3xl font-bold font-playfair text-[#FFFFFF] tracking-tight">99.8%</strong>
              <p className="text-xs text-[#A7A7A7] mt-1 font-sans leading-relaxed">
                Infrastructure health score
              </p>
            </div>
            <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#00B86B] font-semibold">Zero Outages</span>
              <span className="text-[#E8C879]">SLA Compliant</span>
            </div>
          </motion.div>

          {/* Card 4: Compliance Status */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 bg-[#111111] border border-[#C8A34A]/30 hover:border-[#C8A34A] rounded-2xl space-y-3 shadow-xl transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#A7A7A7] uppercase tracking-wider">
                Compliance Status
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#C8A34A]/10 border border-[#C8A34A]/40 flex items-center justify-center text-[#C8A34A]">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div>
              <strong className="text-3xl font-bold font-playfair text-[#00B86B] tracking-tight">Active</strong>
              <p className="text-xs text-[#A7A7A7] mt-1 font-sans leading-relaxed">
                Governance monitoring enabled
              </p>
            </div>
            <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#C8A34A] font-semibold">FIPS 140-3 Signed</span>
              <span className="text-[#00B86B]">BOU Audited</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* VISUAL CHART INTERLUDE: 24H NETWORK THROUGHPUT & LATENCY */}
      <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-base font-bold text-[#FFFFFF] font-playfair flex items-center gap-2">
              <Server size={18} className="text-[#C8A34A]" />
              <span>Network Throughput & Processing Speed Telemetry (24H)</span>
            </h3>
            <p className="text-xs text-[#A7A7A7]">Continuous performance measurement across all connected interbank clearing rails.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1 text-[#C8A34A]">
              <span className="w-3 h-3 rounded-full bg-[#C8A34A] inline-block" /> Throughput (TX/hr)
            </span>
            <span className="flex items-center gap-1 text-[#00B86B]">
              <span className="w-3 h-3 rounded-full bg-[#00B86B] inline-block" /> Avg Latency (2.0s)
            </span>
          </div>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8A34A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C8A34A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
              <XAxis dataKey="time" stroke="#666666" fontSize={10} tickLine={false} />
              <YAxis stroke="#666666" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B0B0B', borderColor: '#C8A34A', borderRadius: '12px', fontSize: '12px', fontFamily: 'monospace' }}
                itemStyle={{ color: '#E8C879' }}
              />
              <Area type="monotone" dataKey="throughput" stroke="#C8A34A" strokeWidth={2} fillOpacity={1} fill="url(#colorThroughput)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 2: LIVE FINANCIAL NETWORK MONITOR */}
      <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222222] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#FFFFFF] font-playfair flex items-center gap-2">
              <Zap size={20} className="text-[#C8A34A]" />
              <span>SECTION 2: Live Financial Network Monitor</span>
            </h2>
            <p className="text-xs text-[#A7A7A7]">Live operational telemetry, transfer latencies, success rates, and dynamic AI routing recommendations.</p>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-3 text-[#666666]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search provider name or type..."
                className="w-full bg-[#070707] border border-[#222222] focus:border-[#C8A34A] rounded-xl pl-9 pr-3 py-2 text-xs text-[#FFFFFF] font-mono outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#070707] border border-[#222222] focus:border-[#C8A34A] rounded-xl px-3 py-2 text-xs text-[#E8C879] font-mono outline-none cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="ONLINE">Online</option>
            </select>
          </div>
        </div>

        {/* FINANCIAL NETWORK MONITOR TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#222222] text-[#A7A7A7] uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-semibold">Provider</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Speed</th>
                <th className="pb-3 font-semibold">Success Rate</th>
                <th className="pb-3 font-semibold">AI Recommendation</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {filteredProviders.map((p) => (
                <tr key={p.id} className="hover:bg-[#070707]/80 transition-colors group">
                  <td className="py-4 font-bold text-[#FFFFFF] font-sans flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" />
                    <span>{p.name}</span>
                  </td>
                  <td className="py-4 text-[#A7A7A7]">{p.type}</td>
                  <td className="py-4">
                    <span className="bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 text-[#E8C879] font-semibold">{p.speed}</td>
                  <td className="py-4 text-[#00B86B] font-semibold">{p.successRate}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-lg border font-bold text-[10px] ${p.tagColor}`}>
                      {p.recommendation}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => showNotification(`Inspected route telemetry for ${p.name}: ${p.detail}`)}
                      className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#C8A34A] hover:text-[#0B0B0B] border border-[#C8A34A]/40 text-[#E8C879] rounded-lg text-[10px] transition-all cursor-pointer font-bold"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3 & SECTION 4 SIDE-BY-SIDE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 3: AI GOVERNANCE PANEL */}
        <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <h2 className="text-lg font-bold text-[#FFFFFF] font-playfair flex items-center gap-2">
                <Brain size={20} className="text-[#C8A34A]" />
                <span>SECTION 3: AI Governance Panel</span>
              </h2>
              <span className="text-[10px] font-mono font-bold bg-[#C8A34A]/20 text-[#C8A34A] border border-[#C8A34A]/40 px-2.5 py-0.5 rounded-full">
                POLICY ENGINE V2.1
              </span>
            </div>

            {/* LATEST AI DECISION CARD */}
            <div className="p-5 bg-[#070707] border border-[#C8A34A]/40 rounded-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                <span className="text-xs font-mono font-bold text-[#C8A34A] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} /> Latest AI Decision
                </span>
                <span className="text-[10px] font-mono text-[#A7A7A7]">DEC-2026-89101 • Just now</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#A7A7A7] uppercase block font-semibold">Decision:</span>
                  <strong className="text-sm font-sans font-bold text-[#FFFFFF] mt-0.5 block">
                    "Optimized payment routing"
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-[#A7A7A7] uppercase block font-semibold">Reason:</span>
                  <p className="text-xs text-[#E8C879] font-sans mt-0.5">
                    "Selected highest reliability provider"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1A1A1A] space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#A7A7A7]">Confidence Score:</span>
                    <strong className="text-[#00B86B] font-bold">96%</strong>
                  </div>
                  <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#C8A34A] to-[#00B86B] w-[96%]" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-[#A7A7A7]">Approval Status:</span>
                  <span className="bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-3 py-1 rounded-full font-bold font-mono text-[10px] flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Human governance enabled
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#070707] border border-[#222222] rounded-xl text-xs font-mono text-[#A7A7A7] flex items-center justify-between">
            <span>Dual-Signoff Gate: Active for transfers &gt; 100M UGX</span>
            <button
              onClick={() => showNotification('AI Policy Threshold verified: Auto-execution threshold set to 90% confidence.')}
              className="text-[#C8A34A] hover:underline cursor-pointer font-bold"
            >
              Configure Policy
            </button>
          </div>
        </div>

        {/* SECTION 4: COMPLIANCE INTELLIGENCE */}
        <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <h2 className="text-lg font-bold text-[#FFFFFF] font-playfair flex items-center gap-2">
                <Scale size={20} className="text-[#C8A34A]" />
                <span>SECTION 4: Compliance Intelligence</span>
              </h2>
              <span className="text-[10px] font-mono font-bold bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full">
                100% REGULATORY AUDITABLE
              </span>
            </div>

            {/* COMPLIANCE STATUS PANEL GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1.5 hover:border-[#C8A34A]/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7A7A7] text-[10px] uppercase font-bold">Risk Monitoring</span>
                  <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" />
                </div>
                <strong className="text-base text-[#00B86B] font-bold block">Active</strong>
                <p className="text-[10px] text-[#666666] font-sans">Continuous real-time payload scoring</p>
              </div>

              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1.5 hover:border-[#C8A34A]/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7A7A7] text-[10px] uppercase font-bold">Audit Trail</span>
                  <Lock size={12} className="text-[#C8A34A]" />
                </div>
                <strong className="text-base text-[#00B86B] font-bold block">Enabled</strong>
                <p className="text-[10px] text-[#666666] font-sans">Immutable ZK-Merkle ledger database</p>
              </div>

              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1.5 hover:border-[#C8A34A]/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7A7A7] text-[10px] uppercase font-bold">Policy Engine</span>
                  <Cpu size={12} className="text-[#E8C879]" />
                </div>
                <strong className="text-base text-[#00B86B] font-bold block">Running</strong>
                <p className="text-[10px] text-[#666666] font-sans">FIPS 140-3 Level 3 signed policies</p>
              </div>

              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-1.5 hover:border-[#C8A34A]/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7A7A7] text-[10px] uppercase font-bold">Transaction Monitoring</span>
                  <Activity size={12} className="text-[#00B86B]" />
                </div>
                <strong className="text-base text-[#00B86B] font-bold block">Active</strong>
                <p className="text-[10px] text-[#666666] font-sans">AML & velocity interdiction online</p>
              </div>

            </div>
          </div>

          <div className="p-3.5 bg-[#070707] border border-[#222222] rounded-xl space-y-1 font-mono text-xs">
            <div className="flex justify-between items-center text-[#E8C879]">
              <span className="font-bold">Latest Compliance Certification:</span>
              <span className="text-[10px] text-[#00B86B]">PASSED 100%</span>
            </div>
            <p className="text-[11px] text-[#A7A7A7] font-sans">
              Bank of Uganda Sandbox Regulatory Standard compliant. Cryptographic receipt: SIG_BOU_ADMIN_GOVERNANCE_0x9928
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 5: MEHERAH AI ADMINISTRATOR ASSISTANT */}
      <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8A34A]/20 border border-[#C8A34A] flex items-center justify-center text-[#C8A34A]">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#FFFFFF] font-playfair">
                SECTION 5: Ask MEHERAH Intelligence
              </h2>
              <p className="text-xs text-[#A7A7A7]">
                Conversational AI Administrator Assistant connected directly to network telemetry and governance kernels.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/10 border border-[#00B86B]/30 px-3 py-1 rounded-full">
            ONLINE & RESPONSIVE
          </span>
        </div>

        {/* EXAMPLE PROMPTS & DIRECT ACTIONS */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#070707] p-3.5 border border-[#C8A34A]/30 rounded-xl">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C8A34A]" />
              <span className="text-xs font-mono font-bold text-[#FFFFFF]">Executive Actions:</span>
            </div>
            <button
              onClick={() => handleSendMessage("Generate Weekly Network Performance Report")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C8A34A] to-[#E8C879] hover:from-[#E8C879] hover:to-[#FFFFFF] text-[#0B0B0B] font-mono font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg border border-[#E8C879] active:scale-95"
            >
              <FileText size={14} />
              <span>Generate Weekly Network Performance Report</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#A7A7A7] uppercase font-bold tracking-wider block">
              Suggested Administrator Queries:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "Generate Weekly Network Performance Report",
                "Generate today's network report",
                "Explain transaction failures",
                "Show provider performance"
              ].map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promptText)}
                  className="text-xs font-mono bg-[#070707] hover:bg-[#1A1A1A] text-[#E8C879] hover:text-[#FFFFFF] border border-[#C8A34A]/40 hover:border-[#C8A34A] px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>💬 "{promptText}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CHAT DISPLAY WINDOW */}
        <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-4 max-h-96 overflow-y-auto font-mono text-xs">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-2 text-[10px] text-[#A7A7A7]">
                <span>{msg.sender === 'user' ? 'Administrator' : 'MEHERAH Intelligence'}</span>
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-2xl max-w-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#C8A34A] text-[#0B0B0B] font-semibold rounded-br-none'
                    : 'bg-[#141414] text-[#FFFFFF] border border-[#222222] rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-line font-sans">{msg.text}</p>
                {msg.evidence && (
                  <div className="mt-2 pt-2 border-t border-[#222222] flex items-center justify-between text-[10px] text-[#C8A34A] font-mono">
                    <span>Evidence Reference: {msg.evidence}</span>
                    <span>VERIFIED</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CHAT INPUT FORM */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your governance query or ask MEHERAH Intelligence..."
            className="flex-1 bg-[#070707] border border-[#222222] focus:border-[#C8A34A] rounded-xl px-4 py-3 text-xs text-[#FFFFFF] font-mono outline-none"
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-6 py-3 rounded-xl bg-[#C8A34A] hover:bg-[#E8C879] text-[#0B0B0B] font-mono font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Ask</span>
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* WEEKLY NETWORK PERFORMANCE REPORT MODAL */}
      <AnimatePresence>
        {isWeeklyReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#111111] border border-[#C8A34A]/50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#FFFFFF]"
            >
              {/* MODAL HEADER */}
              <div className="flex items-start justify-between border-b border-[#222222] pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8A34A]/20 border border-[#C8A34A] flex items-center justify-center text-[#C8A34A]">
                    <FileText size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A34A] font-bold">
                        EXECUTIVE AUDIT DOSSIER
                      </span>
                      <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-mono font-bold">
                        BOU AUDIT CERTIFIED
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold font-playfair mt-0.5">
                      Weekly Network Performance Report
                    </h2>
                    <p className="text-xs text-[#A7A7A7] font-mono">
                      Period: July 24, 2026 – July 30, 2026 • Sovereign OS Node Integrity: 100%
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsWeeklyReportModalOpen(false)}
                  className="w-9 h-9 rounded-xl bg-[#070707] hover:bg-[#222222] border border-[#333333] flex items-center justify-center text-[#A7A7A7] hover:text-[#FFFFFF] transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* METRICS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase font-bold block">Total Volume</span>
                  <strong className="text-lg text-[#FFFFFF] font-bold block">168,450</strong>
                  <span className="text-[10px] text-[#C8A34A] block">$42.8M UGX eq.</span>
                </div>
                <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase font-bold block">Overall Uptime</span>
                  <strong className="text-lg text-[#00B86B] font-bold block">99.85%</strong>
                  <span className="text-[10px] text-[#00B86B] block">+0.05% vs prev week</span>
                </div>
                <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase font-bold block">Avg Speed</span>
                  <strong className="text-lg text-[#E8C879] font-bold block">2.15s</strong>
                  <span className="text-[10px] text-[#00B86B] block">-0.12s latency win</span>
                </div>
                <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-1">
                  <span className="text-[10px] text-[#A7A7A7] uppercase font-bold block">AI Reroutes</span>
                  <strong className="text-lg text-[#00B86B] font-bold block">412 Saved</strong>
                  <span className="text-[10px] text-[#00B86B] block">0 loss recorded</span>
                </div>
              </div>

              {/* WEEKLY PROVIDER BREAKDOWN TABLE */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-[#C8A34A] uppercase tracking-wider flex items-center gap-2">
                  <Zap size={14} /> Weekly Provider Performance Summary
                </h3>
                <div className="overflow-x-auto border border-[#222222] rounded-2xl bg-[#070707]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#222222] text-[#A7A7A7] uppercase text-[10px] tracking-wider">
                        <th className="p-3 font-semibold">Provider</th>
                        <th className="p-3 font-semibold">Uptime</th>
                        <th className="p-3 font-semibold">Transactions</th>
                        <th className="p-3 font-semibold">Avg Speed</th>
                        <th className="p-3 font-semibold">AI Reroutes</th>
                        <th className="p-3 font-semibold">Routing Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A]">
                      <tr>
                        <td className="p-3 font-bold text-[#FFFFFF]">MTN MoMo</td>
                        <td className="p-3 text-[#00B86B]">99.5%</td>
                        <td className="p-3 text-[#A7A7A7]">68,200</td>
                        <td className="p-3 text-[#E8C879]">2.1s</td>
                        <td className="p-3 text-[#A7A7A7]">184</td>
                        <td className="p-3 text-[#C8A34A] font-bold">Preferred Route</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#FFFFFF]">Airtel Money</td>
                        <td className="p-3 text-[#00B86B]">98.9%</td>
                        <td className="p-3 text-[#A7A7A7]">51,400</td>
                        <td className="p-3 text-[#E8C879]">2.8s</td>
                        <td className="p-3 text-[#A7A7A7]">142</td>
                        <td className="p-3 text-[#00B86B]">Active Fallback</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#FFFFFF]">Bank API Network</td>
                        <td className="p-3 text-[#00B86B]">99.9%</td>
                        <td className="p-3 text-[#A7A7A7]">34,100</td>
                        <td className="p-3 text-[#E8C879]">1.8s</td>
                        <td className="p-3 text-[#A7A7A7]">12</td>
                        <td className="p-3 text-[#00B86B] font-bold">Optimal RTGS</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#FFFFFF]">Flutterwave</td>
                        <td className="p-3 text-[#00B86B]">99.1%</td>
                        <td className="p-3 text-[#A7A7A7]">14,750</td>
                        <td className="p-3 text-[#E8C879]">3.0s</td>
                        <td className="p-3 text-[#A7A7A7]">74</td>
                        <td className="p-3 text-[#E8C879]">Cross-Border Gateway</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AI GOVERNANCE INSIGHTS */}
              <div className="p-5 bg-[#070707] border border-[#C8A34A]/30 rounded-2xl space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-[#C8A34A] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} /> AI Governance Insights & Recommendations
                </span>
                <ul className="space-y-2 text-[#A7A7A7] font-sans text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00B86B] font-bold">✓</span>
                    <span><strong>Zero Transaction Loss:</strong> All 412 network retry events resolved automatically via MEHERAH's atomic failover pipeline without manual intervention.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A34A] font-bold">✓</span>
                    <span><strong>Optimal RTGS Clearing:</strong> Bank API Network maintained 100% clearing accuracy with average latency remaining under 1.8 seconds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E8C879] font-bold">⚡</span>
                    <span><strong>Recommendation:</strong> Maintain current liquidity split: 55% MTN MoMo, 30% Airtel Money, 15% Bank RTGS for optimal weekly throughput.</span>
                  </li>
                </ul>
              </div>

              {/* MODAL FOOTER */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#222222]">
                <button
                  onClick={() => {
                    showNotification('Weekly Network Performance Report exported with SHA-256 cryptographic signature.');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#C8A34A] hover:bg-[#E8C879] text-[#0B0B0B] font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Download size={14} />
                  <span>Export Certified PDF Report</span>
                </button>

                <button
                  onClick={() => setIsWeeklyReportModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#070707] hover:bg-[#222222] border border-[#333333] text-[#FFFFFF] font-mono font-bold text-xs transition-all cursor-pointer"
                >
                  Close Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
