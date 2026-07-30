import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  Brain,
  Scale,
  Globe2,
  Bot,
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  TrendingUp,
  Search,
  Filter,
  Send,
  Lock,
  Key,
  Users,
  FileText,
  DollarSign,
  Building2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Award,
  Layers
} from 'lucide-react';
import { MeherahAdministrationWorkspaceEngine } from '../../../ai-engine/meherah-administration-workspace';

export function MeherahAdministrationWorkspaceView() {
  const engine = new MeherahAdministrationWorkspaceEngine();
  const [activeTab, setActiveTab] = useState<'overview' | 'monitoring' | 'governance' | 'compliance' | 'national' | 'cio' | 'security' | 'presentation'>('overview');

  const overview = engine.getExecutiveOverviewData();
  const monitoringData = engine.getFinancialNetworkMonitoringData();
  const governanceData = engine.getAiGovernanceEngineData();
  const complianceData = engine.getComplianceIntelligenceData();
  const nationalData = engine.getNationalFinancialIntelligenceData();
  const securityData = engine.getSecurityAndAuditData();
  const presentationData = engine.getExecutivePresentationData();

  // CIO Assistant state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'cio'; text: string; actions?: string[]; evidence?: string }>>([
    {
      sender: 'cio',
      text: 'Good day, Administrator. I am the MEHERAH Chief Intelligence Officer. How may I assist you with network intelligence, compliance audits, or failover routing today?',
      actions: ['Why did transaction failures increase today?', 'Summarize network availability', 'Review pending compliance HITL cases'],
      evidence: 'JARVIS-CIO-KERNEL-0x9928'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    const responseObj = engine.askChiefIntelligenceOfficer(query);
    const cioMsg = {
      sender: 'cio' as const,
      text: responseObj.response,
      actions: responseObj.recommendedActions,
      evidence: responseObj.evidenceRef
    };

    setChatMessages((prev) => [...prev, userMsg, cioMsg]);
    if (!textToSend) setInputQuery('');
  };

  return (
    <div className="space-[#0B0B0B] text-[#FFFFFF] space-y-8 font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="p-6 bg-[#0B0B0B] border border-[#C9A227]/40 rounded-3xl space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A227]/10 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227]">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#C9A227]">
                  INSTITUTIONAL COMMAND CENTER
                </span>
                <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  NEUTRAL AI COORDINATION LAYER
                </span>
              </div>
              <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-0.5">
                MEHERAH Institutional Command Center
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
            <CheckCircle2 size={16} className="text-[#00B86B]" />
            <span>JARVIS AI KERNEL ACTIVE</span>
          </div>
        </div>

        {/* NEUTRALITY NOTICE */}
        <div className="p-3 bg-[#111111] border border-[#C9A227]/30 rounded-xl text-xs font-mono text-[#E8C879] flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#C9A227] shrink-0" />
          <span>{overview.systemPhilosophyNotice}</span>
        </div>

        {/* FEEDBACK TOAST */}
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
              <button onClick={() => setFeedback(null)}>✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 8 MODULE NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'overview', label: '1. Executive Overview', icon: LayoutDashboard },
          { id: 'monitoring', label: '2. Network Monitoring', icon: Activity },
          { id: 'governance', label: '3. AI Governance Engine', icon: Brain },
          { id: 'compliance', label: '4. Compliance Intelligence', icon: Scale },
          { id: 'national', label: '5. National View', icon: Globe2 },
          { id: 'cio', label: '6. CIO Assistant', icon: Bot },
          { id: 'security', label: '7. Security & Audit', icon: ShieldCheck },
          { id: 'presentation', label: '★ 8. Presentation Mode', icon: Play },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-[#111111] text-[#E8C879] border border-[#C9A227]/50 shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#111111]/50 border border-transparent'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-[#C9A227]' : 'text-[#666666]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODULE 1: EXECUTIVE OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overview.kpiCards.map((card, idx) => (
              <div key={idx} className="p-5 bg-[#111111] border border-[#222222] rounded-2xl space-y-2 hover:border-[#C9A227]/40 transition-all">
                <span className="text-xs font-mono text-[#A7A7A7] block">{card.label}</span>
                <strong className="text-2xl font-bold font-playfair text-[#FFFFFF] block">{card.value}</strong>
                <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                  <span className="text-[#00B86B]">{card.trend}</span>
                  <span className="text-[#C9A227] font-bold">{card.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-[#FFFFFF] font-playfair flex items-center gap-2">
              <Server size={18} className="text-[#C9A227]" />
              <span>Connected Infrastructure Footprint</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[#A7A7A7]">Connected Commercial Banks</span>
                  <strong className="text-lg text-[#FFFFFF] block mt-1">{overview.connectedBanksCount} Institutions</strong>
                </div>
                <Building2 size={24} className="text-[#C9A227]" />
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[#A7A7A7]">Mobile Money Operators</span>
                  <strong className="text-lg text-[#FFFFFF] block mt-1">{overview.connectedMobileMoneyProvidersCount} Operators</strong>
                </div>
                <Zap size={24} className="text-[#00B86B]" />
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[#A7A7A7]">Interbank Payment Gateways</span>
                  <strong className="text-lg text-[#FFFFFF] block mt-1">{overview.paymentGatewaysCount} Gateways</strong>
                </div>
                <Layers size={24} className="text-[#E8C879]" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* MODULE 2: FINANCIAL NETWORK MONITORING */}
      {activeTab === 'monitoring' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Live Financial Network Monitoring</h3>
                <p className="text-xs text-[#A7A7A7]">Real-time status, processing speeds, success rates, volume metrics, and AI recommendations across connected providers.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                ALL PROVIDERS OPERATIONAL
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {monitoringData.map((p) => (
                <div key={p.id} className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#00B86B] animate-pulse" />
                      <div>
                        <strong className="text-base text-[#FFFFFF] font-sans">{p.providerName}</strong>
                        <span className="text-[10px] text-[#A7A7A7] block">{p.category} • ID: {p.id}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-3 py-1 rounded-full font-bold">
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-[#1F1F1F]">
                    <div>
                      <span className="text-[10px] text-[#A7A7A7]">SUCCESS RATE</span>
                      <strong className="text-sm text-[#00B86B] block">{p.successRatePct}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7]">AVG SPEED</span>
                      <strong className="text-sm text-[#E8C879] block">{p.averageSpeedSeconds}s</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7]">VOLUME (24H)</span>
                      <strong className="text-sm text-[#FFFFFF] block">{p.txVolumeUgx}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-[#111111] border border-[#C9A227]/30 rounded-lg text-xs text-[#E8C879] flex items-center gap-2">
                    <Brain size={14} className="text-[#C9A227] shrink-0" />
                    <span>AI Insight: "{p.aiInsight}"</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* MODULE 3: AI GOVERNANCE ENGINE */}
      {activeTab === 'governance' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">AI Governance & Decision Explainability</h3>
                <p className="text-xs text-[#A7A7A7]">Transparent review of AI routing decisions, reasoning, confidence scores, policy rules, and human approval gates.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#E8C879]">{"\u2265 90% AUTO-EXECUTION THRESHOLD"}</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {governanceData.map((gov) => (
                <div key={gov.decisionId} className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-2">
                    <span className="font-bold text-[#C9A227]">{gov.decisionId} • {gov.timestamp}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                      gov.humanApprovalRequired
                        ? 'bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/40'
                        : 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40'
                    }`}>
                      {gov.approvalStatus}
                    </span>
                  </div>

                  <div>
                    <strong className="text-sm text-[#FFFFFF] block font-sans">{gov.decisionText}</strong>
                    <p className="text-[#A7A7A7] text-[11px] mt-1">Reason: "{gov.reasonText}"</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1F1F1F]">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#A7A7A7]">CONFIDENCE:</span>
                      <span className="text-xs font-bold text-[#00B86B]">{gov.confidenceScorePct}%</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-[#A7A7A7]">RULES APPLIED:</span>
                      {gov.rulesApplied.map((r, i) => (
                        <span key={i} className="text-[9px] bg-[#222222] text-[#E8C879] px-2 py-0.5 rounded">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* MODULE 4: COMPLIANCE INTELLIGENCE LAYER */}
      {activeTab === 'compliance' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Compliance Intelligence Layer</h3>
                <p className="text-xs text-[#A7A7A7]">Continuous transaction monitoring, suspicious activity indicators, and 3-question AI explainability ("What?", "Why?", "Recommended Action").</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B]">{complianceData.regulatoryStatus}</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {complianceData.recentIncidents.map((inc) => (
                <div key={inc.id} className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-2">
                    <span className="font-bold text-[#E8C879]">{inc.id} • {inc.timestamp}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-bold">
                      {inc.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block font-bold">1. WHAT HAPPENED?</span>
                      <p className="text-[#FFFFFF] text-[11px] font-sans">{inc.whatHappened}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block font-bold">2. WHY DID IT HAPPEN?</span>
                      <p className="text-[#A7A7A7] text-[11px] font-sans">{inc.whyItHappened}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#00B86B] block font-bold">3. WHAT ACTION IS RECOMMENDED?</span>
                      <p className="text-[#00B86B] text-[11px] font-sans font-semibold">{inc.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* MODULE 5: NATIONAL FINANCIAL INTELLIGENCE VIEW */}
      {activeTab === 'national' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="border-b border-[#222222] pb-4">
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">National Financial Intelligence View</h3>
              <p className="text-xs text-[#A7A7A7]">Macroeconomic trends in financial inclusion, payment adoption, regional volumes, and national infrastructure performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#A7A7A7]">FINANCIAL INCLUSION DIGITIZED</span>
                <strong className="text-xl text-[#00B86B] block">{nationalData.financialInclusionTrends.unbankedPopulationDigitizedPct}%</strong>
                <span className="text-[10px] text-[#E8C879]">YoY Growth: {nationalData.financialInclusionTrends.growthYoY}</span>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#A7A7A7]">MOBILE MONEY ADOPTION</span>
                <strong className="text-xl text-[#E8C879] block">{nationalData.paymentAdoptionMetrics.mobileMoneySharePct}%</strong>
                <span className="text-[10px] text-[#A7A7A7]">Cards/Bank Share: {nationalData.paymentAdoptionMetrics.cardAndAccountSharePct}%</span>
              </div>
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[#A7A7A7]">RURAL ACCESS INDEX</span>
                <strong className="text-xl text-[#FFFFFF] block">{nationalData.financialInclusionTrends.ruralAccessIndex}</strong>
                <span className="text-[10px] text-[#00B86B]">National Mesh SLA: {nationalData.infrastructurePerformance.nationalMeshUptime}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#222222]">
              <h4 className="text-xs font-bold text-[#E8C879] uppercase font-mono tracking-wider">Regional Financial Activity Distribution</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {nationalData.regionalActivity.map((r, i) => (
                  <div key={i} className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between">
                    <div>
                      <strong className="text-[#FFFFFF] text-sm font-sans">{r.region}</strong>
                      <span className="text-[10px] text-[#A7A7A7] block mt-0.5">Volume: {r.activeVolumeUgx}</span>
                    </div>
                    <span className="text-xs font-bold text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/30 px-2.5 py-1 rounded-full">
                      {r.transactionSharePct}% Share
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* MODULE 6: ADMINISTRATION AI ASSISTANT ("MEHERAH Chief Intelligence Officer") */}
      {activeTab === 'cio' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#222222] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#C9A227] flex items-center justify-center text-[#C9A227]">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">MEHERAH Chief Intelligence Officer</h3>
                  <p className="text-xs text-[#A7A7A7]">Conversational AI Assistant for administrators, supervisors, and central bank regulators.</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#00B86B] font-bold">ONLINE & RESPONSIVE</span>
            </div>

            {/* CHAT DISPLAY CONTAINER */}
            <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-4 h-96 overflow-y-auto font-mono text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <span className="text-[10px] text-[#A7A7A7]">{msg.sender === 'user' ? 'Administrator' : 'MEHERAH CIO'}</span>
                  <div
                    className={`p-3.5 rounded-2xl max-w-xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#C9A227] text-[#000000] font-semibold'
                        : 'bg-[#141414] text-[#FFFFFF] border border-[#222222]'
                    }`}
                  >
                    <p className="leading-relaxed font-sans">{msg.text}</p>
                    {msg.evidence && (
                      <span className="text-[9px] text-[#C9A227] mt-2 block font-mono">
                        Evidence Ref: {msg.evidence}
                      </span>
                    )}
                  </div>

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleSendMessage(act)}
                          className="text-[10px] bg-[#111111] hover:bg-[#222222] text-[#E8C879] border border-[#C9A227]/40 px-2.5 py-1 rounded-lg transition-all"
                        >
                          💬 {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* INPUT FIELD */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask the Chief Intelligence Officer (e.g. 'Why did transaction failures increase today?')..."
                className="flex-1 bg-[#070707] border border-[#222222] focus:border-[#C9A227] rounded-xl px-4 py-3 text-xs text-[#FFFFFF] font-mono outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-5 py-3 rounded-xl bg-[#C9A227] hover:bg-[#E8C879] text-[#000000] font-mono font-bold text-xs transition-all flex items-center gap-2"
              >
                <span>Ask</span>
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* MODULE 7: SECURITY AND AUDIT CENTER */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Security & Audit Center</h3>
                <p className="text-xs text-[#A7A7A7]">Immutable ZK audit records capturing Who performed the action, When it happened, and Why.</p>
              </div>
              <span className="text-xs font-mono text-[#00B86B] font-bold">FIPS 140-3 LEVEL 3 SIGNED</span>
            </div>

            <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2 font-mono text-xs">
              <span className="text-[#C9A227] font-bold">Access Control Policy</span>
              <p className="text-[#FFFFFF]">{securityData.accessControlSummary}</p>
              <p className="text-[#A7A7A7]">Encryption Status: <strong className="text-[#00B86B]">{securityData.encryptionStatus}</strong></p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#E8C879] uppercase font-mono tracking-wider">AI & Administrative Audit Records</h4>
              <div className="space-y-3 font-mono text-xs">
                {securityData.aiAuditRecords.map((aud) => (
                  <div key={aud.id} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                    <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-2">
                      <span className="text-[#C9A227] font-bold">{aud.id}</span>
                      <span className="text-[10px] text-[#A7A7A7]">{aud.when}</span>
                    </div>
                    <p className="text-[#FFFFFF] font-sans"><strong>WHO:</strong> {aud.who}</p>
                    <p className="text-[#00B86B] font-sans"><strong>ACTION:</strong> {aud.actionPerformed}</p>
                    <p className="text-[#A7A7A7] font-sans"><strong>WHY:</strong> "{aud.why}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* MODULE 8: EXECUTIVE PRESENTATION MODE */}
      {activeTab === 'presentation' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-8 bg-[#0B0B0B] border-2 border-[#C9A227] rounded-3xl space-y-6 text-center shadow-2xl">
            <div className="inline-block px-4 py-1 rounded-full bg-[#C9A227]/20 border border-[#C9A227] text-[#C9A227] text-xs font-mono font-bold uppercase tracking-widest">
              EXECUTIVE PRESENTATION MODE
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-[#FFFFFF] max-w-3xl mx-auto leading-relaxed">
              "{presentationData.openingStatement}"
            </h2>

            <p className="text-xs text-[#A7A7A7] max-w-xl mx-auto font-sans">
              Demonstrating the four core pillars of the MEHERAH Institutional Command Center for regulators and financial institution leaders.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono text-xs pt-4">
              {presentationData.pillars.map((p, idx) => (
                <div key={idx} className="p-5 bg-[#111111] border border-[#222222] rounded-2xl space-y-2 hover:border-[#C9A227] transition-all">
                  <strong className="text-sm font-bold text-[#E8C879] block font-playfair">{p.title}</strong>
                  <p className="text-[#A7A7A7] text-[11px] leading-relaxed font-sans">{p.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => triggerNotification("Executive Presentation Dossier exported successfully for Bank of Uganda.")}
                className="px-6 py-3 rounded-xl bg-[#C9A227] hover:bg-[#E8C879] text-[#000000] font-mono font-bold text-xs transition-all"
              >
                Export Demonstration Package (PDF)
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
