import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, HelpCircle, CheckCircle2, Play, Pause, XCircle, 
  ChevronRight, Shield, FileText, ArrowRight, Zap, RefreshCw, 
  BarChart3, MessageSquare, AlertTriangle, Lightbulb, Compass,
  Layers, FolderKanban, Terminal, Download, ArrowUpRight
} from 'lucide-react';
import { PersonalityExplainerEngine, AnalyticalExplanation } from '../core/personality-explainer';

export type UserMode = 'SIMPLE' | 'PROFESSIONAL' | 'ENGINEERING';
export type MissionStatus = 'IDLE' | 'UNDERSTANDING' | 'PLAN_REVIEW' | 'EXECUTING' | 'PAUSED' | 'COMPLETED';

export interface RequiredSpecialist {
  title: string;
  role: string;
  status: 'READY' | 'WORKING' | 'COMPLETED';
}

export const MeherahWorkspaceShell: React.FC = () => {
  // Mode & System Triggers
  const [userMode, setUserMode] = useState<UserMode>('SIMPLE');
  const [missionStatus, setMissionStatus] = useState<MissionStatus>('IDLE');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  
  // Onboarding Guided Tour
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  // Floating "Ask MEHERAH" Drawer State
  const [isAskDrawerOpen, setIsAskDrawerOpen] = useState<boolean>(false);
  const [askQuery, setAskQuery] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'USER' | 'MEHERAH'; text: string; explanation?: AnalyticalExplanation }[]>([
    {
      sender: 'MEHERAH',
      text: "Hello! I am your AI Chief of Staff. You can ask me to explain any recommendation, outline strategy rationale, or guide you through your next mission."
    }
  ]);

  // Input & Mission Data States
  const [promptInput, setPromptInput] = useState<string>('');
  const [missionTitle, setMissionTitle] = useState<string>('Strategic Market Expansion');
  const [progress, setProgress] = useState<number>(0);
  const [currentActivity, setCurrentActivity] = useState<string>('');
  const [currentFocus, setCurrentFocus] = useState<string>('Strategic Domain Mapping');
  const [timeline, setTimeline] = useState<{ time: string; msg: string }[]>([]);
  
  // Active Explanation Data
  const [activeExplanation, setActiveExplanation] = useState<AnalyticalExplanation | null>(null);

  // Technical Telemetry Mocks
  const [cpuUsage, setCpuUsage] = useState<number>(24.5);
  const [redisLatency, setRedisLatency] = useState<number>(1.2);
  const [queueDepth, setQueueDepth] = useState<number>(0);

  // Professional Mode Active Sub-Tab
  const [proSubTab, setProSubTab] = useState<'PROJECTS' | 'DOCUMENTS' | 'ANALYTICS' | 'HISTORY'>('PROJECTS');

  // Detect time of day for dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Check Onboarding on initial mount
  useEffect(() => {
    const visited = localStorage.getItem('meherah_onboarded_v1.2');
    if (!visited) {
      setShowOnboarding(true);
    }
  }, []);

  const finishOnboarding = () => {
    localStorage.setItem('meherah_onboarded_v1.2', 'true');
    setShowOnboarding(false);
  };

  const addTimelineEvent = (msg: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTimeline((prev) => [...prev, { time: now, msg }]);
  };

  // Handle Initial Goal Submission -> Enters PLAN_REVIEW Handshake
  const handleIngestGoal = (inputGoal?: string) => {
    const finalGoal = inputGoal || promptInput;
    if (!finalGoal.trim()) return;
    setPromptInput(finalGoal);

    // Derive title from prompt
    if (finalGoal.toLowerCase().includes('expand')) setMissionTitle('Business Expansion Framework');
    else if (finalGoal.toLowerCase().includes('research')) setMissionTitle('Market Intelligence Analysis');
    else if (finalGoal.toLowerCase().includes('software') || finalGoal.toLowerCase().includes('platform')) setMissionTitle('Software Platform Architecture');
    else if (finalGoal.toLowerCase().includes('financ')) setMissionTitle('Financial Risk & Capital Allocation');
    else setMissionTitle('Strategic Executive Blueprint');

    setMissionStatus('UNDERSTANDING');
    setCurrentActivity('Ingesting objective and formulating strategic blueprint...');

    setTimeout(() => {
      setMissionStatus('PLAN_REVIEW');
      setCurrentActivity('Plan constructed. Waiting for executive confirmation.');
      // Generate explainability context
      const exp = PersonalityExplainerEngine.synthesizeExplanation('Regional Growth Corridors', 96.0);
      setActiveExplanation(exp);
    }, 1200);
  };

  // User Confirms & Starts Mission Execution
  const handleStartMissionExecution = () => {
    setMissionStatus('EXECUTING');
    setProgress(15);
    setCurrentActivity('Chief of Staff initialized specialists. Research Agent is analyzing trade corridors...');
    setCurrentFocus('Market Intelligence & Corridor Mapping');
    addTimelineEvent('Mission Execution Initiated');
    setQueueDepth(3);
  };

  // Execution Simulation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (missionStatus === 'EXECUTING' && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 25;
          if (next === 40) {
            setCurrentActivity('Research finalized. Finance Agent is constructing resource allocation models...');
            setCurrentFocus('Financial Projections & Foreign Exchange Hedges');
            addTimelineEvent('Market opportunity matrices compiled');
            setCpuUsage(36.8);
            setRedisLatency(0.9);
          } else if (next === 65) {
            setCurrentActivity('Financial modeling verified. Writing Agent is generating Executive Strategy Report...');
            setCurrentFocus('Executive Synthesis & Compliance Audit');
            addTimelineEvent('Asset allocation models balanced & verified');
            setCpuUsage(28.4);
            setRedisLatency(1.1);
          } else if (next >= 100) {
            setMissionStatus('COMPLETED');
            setCurrentActivity('Mission successfully executed. Strategic report ready for review.');
            setCurrentFocus('Executive Briefing & Memory Indexing');
            addTimelineEvent('Executive Strategy Brief complete. Experience indexed in core memory.');
            setQueueDepth(0);
            setCpuUsage(18.2);
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [missionStatus, progress]);

  // Floating Ask Assistant Action
  const handleAskSubmit = (presetText?: string) => {
    const textToSend = presetText || askQuery;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'USER' as const, text: textToSend };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetText) setAskQuery('');

    setTimeout(() => {
      let replyText = "I've reviewed your request. Here is my strategic recommendation as your Chief of Staff.";
      let exp: AnalyticalExplanation | undefined;

      if (textToSend.toLowerCase().includes('what can you do')) {
        replyText = "As your AI Chief of Staff, I translate high-level business goals into structured multi-agent missions, coordinate research, financial modeling, compliance, and strategic writing, and deliver clear, actionable briefs.";
      } else if (textToSend.toLowerCase().includes('why') || textToSend.toLowerCase().includes('strategy') || textToSend.toLowerCase().includes('explain')) {
        exp = PersonalityExplainerEngine.synthesizeExplanation('Target Markets', 96.5);
        replyText = exp.plainSummary;
      } else if (textToSend.toLowerCase().includes('continue')) {
        replyText = "I am ready to extend your active mission. What specific parameters would you like to refine or add next?";
      } else {
        replyText = "I have indexed this priority and verified it against your active strategic memory. All specialized agents stand ready for your instruction.";
      }

      setChatMessages((prev) => [...prev, { sender: 'MEHERAH', text: replyText, explanation: exp }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans antialiased p-4 sm:p-8 selection:bg-[#D4AF37] selection:text-black relative">
      
      {/* ========================================================================= */}
      {/* HEADER: BRANDING & MODE CONTROLLER                                        */}
      {/* ========================================================================= */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1A1A1A] pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">MEHERAH OS</h1>
            <span className="bg-[#1C160F] text-[#F0A500] text-[10px] px-2 py-0.5 rounded border border-[#2A2015] font-mono">v1.2 Chief of Staff</span>
          </div>
          <p className="text-xs text-[#737373] mt-1">Autonomous Kernel & Multi-Agent Executive Partner</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setOnboardingStep(1); setShowOnboarding(true); }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#A3A3A3] hover:text-[#D4AF37] border border-[#262626] rounded bg-[#121212] hover:bg-[#1A1A1A] transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Guided Tour</span>
          </button>

          <div className="flex bg-[#121212] p-1 rounded border border-[#262626]">
            {(['SIMPLE', 'PROFESSIONAL', 'ENGINEERING'] as UserMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setUserMode(mode);
                  if (mode === 'ENGINEERING') setShowTechnicalDetails(true);
                  else setShowTechnicalDetails(false);
                }}
                className={`px-3 sm:px-4 py-1.5 text-xs tracking-wider font-medium rounded transition-all duration-300 ${
                  userMode === mode 
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-lg shadow-[#D4AF37]/10' 
                    : 'text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* PROFESSIONAL MODE SUB-NAVIGATION TABS                                     */}
      {/* ========================================================================= */}
      {userMode === 'PROFESSIONAL' && (
        <div className="max-w-6xl mx-auto mb-8 flex border-b border-[#262626]">
          {[
            { id: 'PROJECTS', label: 'Active Projects', icon: FolderKanban },
            { id: 'DOCUMENTS', label: 'Executive Briefs', icon: FileText },
            { id: 'ANALYTICS', label: 'Performance Mesh', icon: BarChart3 },
            { id: 'HISTORY', label: 'Organizational Memory', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setProSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider transition-all border-b-2 ${
                  proSubTab === tab.id
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#121212]'
                    : 'border-transparent text-[#737373] hover:text-[#A3A3A3]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <main className="max-w-3xl mx-auto space-y-8">

        {/* ========================================================================= */}
        {/* PHASE 2 — CHIEF OF STAFF HOME EXPERIENCE (IDLE STATE)                    */}
        {/* ========================================================================= */}
        {missionStatus === 'IDLE' && proSubTab === 'PROJECTS' && (
          <section className="space-y-8 animate-fadeIn">
            
            {/* Conversational Greeting Card */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Bot className="w-40 h-40 text-[#D4AF37]" />
              </div>

              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>{getGreeting()}, Executive Leader</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                I am your AI Chief of Staff.
              </h2>
              <p className="text-sm text-[#A3A3A3] max-w-xl leading-relaxed">
                Describe what you want to accomplish today in plain human language. I will coordinate specialized agents to research, model, and execute your strategy.
              </p>

              {/* Mission Input Form */}
              <div className="pt-4">
                <div className="relative group bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 transition-all duration-300 focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]/30">
                  <textarea
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="E.g., Research a market entry plan for East African coffee exports, model cash flow projections, and generate an executive briefing..."
                    className="w-full h-32 bg-transparent text-white placeholder-[#525252] text-sm resize-none focus:outline-none leading-relaxed"
                  />
                  <div className="flex justify-between items-center mt-3 border-t border-[#1A1A1A] pt-3">
                    <span className="text-xs text-[#525252] flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      Zero-training natural workflow • Human-in-the-loop control
                    </span>
                    <button
                      onClick={() => handleIngestGoal()}
                      disabled={!promptInput.trim()}
                      className="bg-[#D4AF37] disabled:opacity-40 text-[#0A0A0A] px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#F3E5AB] hover:scale-[1.02] flex items-center gap-2"
                    >
                      <span>Start Mission</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Strategic Templates */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#737373] font-semibold flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Suggested Objectives</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Expand my business', desc: 'Identify growth corridors & B2B distribution models', prompt: 'Create a comprehensive expansion strategy for entering high-growth regional markets with risk hedges.' },
                  { label: 'Research a market', desc: 'Gather trade trends, tariff codes & competitive data', prompt: 'Conduct a thorough market research study analyzing trade protocols, demand trends, and pricing dynamics.' },
                  { label: 'Build a software platform', desc: 'Define technical architecture & deployment blueprints', prompt: 'Architect a modern software platform blueprint with API specifications, database schema, and deployment pipeline.' },
                  { label: 'Analyse financial performance', desc: 'Build cash flow models & FX exposure layers', prompt: 'Build a 10-year cash flow forecasting model with currency risk analysis and capital allocation parameters.' },
                  { label: 'Create a business plan', desc: 'Synthesize executive briefs & operational roadmaps', prompt: 'Draft an executive business plan complete with market opportunity analysis, risk mitigations, and execution milestones.' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleIngestGoal(item.prompt)}
                    className="bg-[#121212] border border-[#262626] p-4 rounded-xl text-left hover:bg-[#1A1A1A] hover:border-[#404040] transition-all group duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#D4AF37] group-hover:text-[#F3E5AB]">{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[11px] text-[#737373] mt-1 line-clamp-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3 — MISSION UNDERSTANDING & PLAN REVIEW HANDSHAKE                   */}
        {/* ========================================================================= */}
        {(missionStatus === 'UNDERSTANDING' || missionStatus === 'PLAN_REVIEW') && (
          <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-[#1A1A1A] pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1C160F] border border-[#2A2015] flex items-center justify-center text-[#D4AF37]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Chief of Staff Formulation</span>
                <h3 className="text-xl font-light text-white">"I understand your objective. Here is how I plan to approach it."</h3>
              </div>
            </div>

            {missionStatus === 'UNDERSTANDING' ? (
              <div className="py-8 text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto" />
                <p className="text-xs font-mono text-[#A3A3A3]">Analyzing goal requirements and assembling specialist graph...</p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Proposed Blueprint Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0A0A0A] border border-[#262626] p-4 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase text-[#737373]">Mission Objective</span>
                    <p className="text-xs text-white font-medium">{missionTitle}</p>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#262626] p-4 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase text-[#737373]">Estimated Execution Time</span>
                    <p className="text-xs text-[#D4AF37] font-mono font-bold">~ 2m 30s (Autonomous Loop)</p>
                  </div>
                </div>

                {/* Required Specialists */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#737373] font-semibold">Assigned Specialist Agents</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { role: 'Research Specialist', task: 'Market trends & tariff codes' },
                      { role: 'Financial Analyst', task: '10-yr cashflow & FX risk model' },
                      { role: 'Executive Writer', task: 'Briefing report synthesis' },
                    ].map((spec, i) => (
                      <div key={i} className="bg-[#0A0A0A] border border-[#262626] p-3 rounded-lg">
                        <span className="text-xs font-bold text-white block">{spec.role}</span>
                        <span className="text-[10px] text-[#737373] mt-0.5 block">{spec.task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Deliverables & Risks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0A0A0A] border border-[#262626] p-4 rounded-xl space-y-2">
                    <span className="text-xs uppercase text-[#D4AF37] font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Expected Deliverables
                    </span>
                    <ul className="text-xs text-[#A3A3A3] space-y-1 list-disc list-inside">
                      <li>Market Expansion Prioritization Matrix</li>
                      <li>Financial Cash Flow & Currency Exposure Model</li>
                      <li>Executive Brief & Governance Audit Trail</li>
                    </ul>
                  </div>

                  <div className="bg-[#0A0A0A] border border-[#262626] p-4 rounded-xl space-y-2">
                    <span className="text-xs uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Potential Risks & Safeguards
                    </span>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      Cross-border currency volatility (+/-4.2%). Zero-trust governance limits will intercept any unauthorized financial transfers automatically.
                    </p>
                  </div>
                </div>

                {/* Plain Business Explanation Card */}
                {activeExplanation && (
                  <div className="bg-[#18130B] border border-[#3D2C17] rounded-xl p-4 space-y-2 text-xs">
                    <span className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider block">Chief of Staff Recommendation</span>
                    <p className="text-white leading-relaxed">{activeExplanation.plainSummary}</p>
                  </div>
                )}

                {/* Handshake Prompt & Confirmation Control */}
                <div className="pt-2 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-[#A3A3A3] italic">"Would you like me to begin?"</p>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setMissionStatus('IDLE')}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-[#1A1A1A] text-[#A3A3A3] hover:text-white rounded-lg text-xs font-semibold transition-all"
                    >
                      Modify Plan
                    </button>
                    <button
                      onClick={handleStartMissionExecution}
                      className="flex-1 sm:flex-none px-6 py-2.5 bg-[#D4AF37] text-black font-bold rounded-lg text-xs tracking-wider uppercase hover:bg-[#F3E5AB] shadow-lg shadow-[#D4AF37]/10 transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Mission</span>
                    </button>
                  </div>
                </div>

              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 4 — AUTONOMOUS EXECUTION VIEW                                       */}
        {/* ========================================================================= */}
        {(missionStatus === 'EXECUTING' || missionStatus === 'PAUSED') && (
          <section className="space-y-6 animate-fadeIn">
            
            {/* Mission Overview Header */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#737373]">Active Executive Mission</span>
                  <h2 className="text-xl font-light text-white mt-0.5">{missionTitle}</h2>
                </div>
                <span className={`text-xs px-3 py-1 rounded font-mono font-bold ${
                  missionStatus === 'PAUSED' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-[#1C160F] text-[#D4AF37] border border-[#2A2015]'
                }`}>
                  {missionStatus === 'PAUSED' ? 'PAUSED' : 'EXECUTING'}
                </span>
              </div>

              {/* Progress Tracker */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-[#A3A3A3]">
                  <span>Overall Progress: {progress}%</span>
                  <span>Est. Time Remaining: {missionStatus === 'PAUSED' ? 'Paused' : progress >= 80 ? '15s' : '1m 20s'}</span>
                </div>
                
                <div className="w-full bg-[#1A1A1A] h-2.5 rounded-full overflow-hidden border border-[#262626]">
                  <div 
                    className="bg-[#D4AF37] h-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Current Focus Activity Callout */}
              <div className="bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-ping flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-[#737373] block text-[10px] uppercase tracking-wider">Current Focus</span>
                  <span className="text-white font-medium">{currentActivity}</span>
                </div>
              </div>

              {/* Intervention Controls */}
              <div className="flex flex-wrap gap-3 pt-2">
                {missionStatus === 'EXECUTING' ? (
                  <button 
                    onClick={() => setMissionStatus('PAUSED')} 
                    className="flex-1 bg-[#1A1A1A] border border-[#262626] text-white hover:bg-[#262626] py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Run</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setMissionStatus('EXECUTING')} 
                    className="flex-1 bg-amber-950/40 border border-amber-800 text-[#D4AF37] hover:bg-amber-950/60 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Resume Execution</span>
                  </button>
                )}
                <button 
                  onClick={() => addTimelineEvent('Executive Checkpoint Approved')}
                  className="flex-1 bg-[#D4AF37] text-black font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-[#F3E5AB] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve Action</span>
                </button>
                <button
                  onClick={() => { setMissionStatus('IDLE'); setProgress(0); setTimeline([]); }}
                  className="bg-[#121212] border border-red-950 text-red-400 px-5 rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-red-950/20 transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>

            {/* Clean Timeline */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#737373] font-semibold">Execution Timeline</h4>
              <div className="space-y-3">
                {timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-4 text-xs font-mono border-l-2 border-[#D4AF37] pl-3 py-1">
                    <span className="text-[#737373]">{event.time}</span>
                    <span className="text-[#E5E5E5]">{event.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 7 — MISSION COMPLETION EXPERIENCE                                   */}
        {/* ========================================================================= */}
        {missionStatus === 'COMPLETED' && (
          <section className="space-y-8 animate-fadeIn">
            
            {/* Hero Completion Card */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Mission Complete</span>
                <h2 className="text-3xl font-light text-white">{missionTitle}</h2>
                <p className="text-sm text-[#A3A3A3] max-w-lg mx-auto">
                  All strategic deliverables compiled, verified against compliance policies, and stored in core memory.
                </p>
              </div>

              {/* Benchmark Score Badge */}
              <div className="inline-flex items-center gap-3 bg-[#0A0A0A] border border-[#262626] px-6 py-3 rounded-full text-xs font-mono">
                <span className="text-[#737373]">Confidence Score:</span>
                <span className="text-[#D4AF37] font-bold text-sm">97.5%</span>
                <span className="text-emerald-400 font-semibold">• Benchmarked</span>
              </div>
            </div>

            {/* Findings & Impact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#121212] border border-[#262626] p-6 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Key Strategic Findings
                </h4>
                <ul className="text-xs text-[#A3A3A3] space-y-2 list-disc list-inside leading-relaxed">
                  <li>Direct B2B warehousing avoids initial logistics capital outlay.</li>
                  <li>Cross-border tariffs exempt agricultural co-operatives under regional accords.</li>
                  <li>Local currency volatility buffered via UGX/USD hedging bounds.</li>
                </ul>
              </div>

              <div className="bg-[#121212] border border-[#262626] p-6 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Expected Business Impact
                </h4>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  Positions executive team to capture 14% market share within 18 months while reducing operational expenditure by 22% through pre-screened partner logistics.
                </p>
              </div>
            </div>

            {/* Recommended Next Actions */}
            <div className="bg-[#121212] border border-[#262626] p-6 rounded-2xl space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#737373] font-semibold">Recommended Next Steps</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Finalize B2B warehouse partner LOI',
                  'Authorize secondary FX buffer account',
                  'Schedule quarterly compliance review'
                ].map((action, i) => (
                  <div key={i} className="bg-[#0A0A0A] border border-[#262626] p-3 rounded-xl text-xs text-[#E5E5E5] flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Four Primary Completion Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <button 
                onClick={() => alert("Report exported cleanly as Executive Brief (PDF/Markdown).")}
                className="bg-[#D4AF37] text-black font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase hover:bg-[#F3E5AB] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>

              <button 
                onClick={() => setIsAskDrawerOpen(true)}
                className="bg-[#1A1A1A] border border-[#262626] text-white hover:bg-[#262626] py-3 px-4 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span>Ask Questions</span>
              </button>

              <button 
                onClick={() => { setMissionStatus('UNDERSTANDING'); handleIngestGoal('Extend strategy with detailed 3-year staffing roadmap'); }}
                className="bg-[#1A1A1A] border border-[#262626] text-white hover:bg-[#262626] py-3 px-4 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
                <span>Continue Mission</span>
              </button>

              <button 
                onClick={() => { setMissionStatus('IDLE'); setProgress(0); setPromptInput(''); setTimeline([]); }}
                className="bg-[#121212] border border-[#262626] text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A] py-3 px-4 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>New Mission</span>
              </button>
            </div>

          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 9 — PROFESSIONAL MODE EXTENDED VIEWS                                */}
        {/* ========================================================================= */}
        {userMode === 'PROFESSIONAL' && proSubTab !== 'PROJECTS' && (
          <section className="bg-[#121212] border border-[#262626] rounded-2xl p-8 space-y-6 animate-fadeIn">
            <h3 className="text-xl font-light text-white">{proSubTab} Hub</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              {proSubTab === 'DOCUMENTS' && 'Access all auto-generated executive briefs, financial models, and strategic summaries.'}
              {proSubTab === 'ANALYTICS' && 'Monitor cross-network settlement performance, strategy metrics, and confidence benchmarks.'}
              {proSubTab === 'HISTORY' && 'Inspect historical mission footprints and organizational memory learning loops.'}
            </p>
            <div className="p-6 bg-[#0A0A0A] border border-[#262626] rounded-xl text-center text-xs font-mono text-[#D4AF37]">
              Workspace Module Active • Integrated with Core Autonomous Kernel
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 9 — ENGINEERING MODE TELEMETRY GRID                                  */}
        {/* ========================================================================= */}
        {userMode === 'ENGINEERING' && (
          <div className="mt-12 space-y-4">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full text-center bg-[#121212] border border-[#262626] py-2.5 rounded text-xs font-mono text-[#D4AF37] hover:bg-[#1A1A1A] transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>{showTechnicalDetails ? '[-] Hide Kernel Infrastructure Grid' : '[+] Inspect Autonomous Kernel Telemetry'}</span>
            </button>

            {showTechnicalDetails && (
              <div className="bg-[#0F0F0F] border border-[#262626] rounded-xl p-6 font-mono text-xs space-y-4 text-[#A3A3A3] animate-fadeIn">
                <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                  <span className="text-[#D4AF37] font-semibold">MEHERAH KERNEL DIAGNOSTICS</span>
                  <span className="text-emerald-400">STATE: ONLINE</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-[#141414] p-3 rounded border border-[#222]">
                    <span className="text-[#737373] block text-[10px]">CPU ALLOCATION</span>
                    <span className="text-white font-bold text-sm">{cpuUsage}%</span>
                  </div>
                  <div className="bg-[#141414] p-3 rounded border border-[#222]">
                    <span className="text-[#737373] block text-[10px]">REDIS LATENCY</span>
                    <span className="text-white font-bold text-sm">{redisLatency} ms</span>
                  </div>
                  <div className="bg-[#141414] p-3 rounded border border-[#222]">
                    <span className="text-[#737373] block text-[10px]">RABBITMQ DEPTH</span>
                    <span className="text-white font-bold text-sm">{queueDepth} msgs</span>
                  </div>
                  <div className="bg-[#141414] p-3 rounded border border-[#222]">
                    <span className="text-[#737373] block text-[10px]">DB POOL LIMIT</span>
                    <span className="text-white font-bold text-sm">10 conns</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* PHASE 5 — FLOATING "ASK MEHERAH" ASSISTANT DRAWER                          */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAskDrawerOpen(!isAskDrawerOpen)}
          className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline">Ask Chief of Staff</span>
        </button>
      </div>

      <AnimatePresence>
        {isAskDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 max-h-[500px] bg-[#121212] border border-[#262626] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-[#0A0A0A] border-b border-[#262626] flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
                <Bot className="w-4 h-4" />
                <span>Ask MEHERAH</span>
              </div>
              <button 
                onClick={() => setIsAskDrawerOpen(false)}
                className="text-[#737373] hover:text-white"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Questions Chips */}
            <div className="p-3 bg-[#181818] border-b border-[#262626] flex gap-2 overflow-x-auto text-[11px] no-scrollbar">
              {[
                'What can you do?',
                'Explain this recommendation.',
                'Why did you choose this strategy?',
                'Help me.'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskSubmit(chip)}
                  className="bg-[#222] hover:bg-[#333] text-[#D4AF37] px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-72 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'USER' ? 'bg-[#D4AF37] text-black font-medium' : 'bg-[#1C160F] text-[#E5E5E5] border border-[#2A2015]'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.explanation && (
                    <div className="mt-2 p-3 bg-[#0A0A0A] border border-[#262626] rounded-lg text-[11px] space-y-1">
                      <span className="text-[#D4AF37] font-semibold block">Empirical Confidence: {msg.explanation.confidenceScore}%</span>
                      <span className="text-[#737373] block">Evidence: {msg.explanation.evidenceTracked[0]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[#262626] bg-[#0A0A0A] flex gap-2">
              <input
                type="text"
                value={askQuery}
                onChange={(e) => setAskQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskSubmit()}
                placeholder="Ask your Chief of Staff anything..."
                className="flex-1 bg-[#121212] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white placeholder-[#525252] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={() => handleAskSubmit()}
                className="bg-[#D4AF37] text-black px-3 py-2 rounded-lg font-bold text-xs hover:bg-[#F3E5AB]"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* PHASE 8 — SMART FIRST-TIME ONBOARDING MODAL                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showOnboarding && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 text-center relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1C160F] border border-[#2A2015] text-[#D4AF37] flex items-center justify-center mx-auto">
                <Bot className="w-6 h-6" />
              </div>

              {onboardingStep === 1 && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Step 1 of 5</span>
                  <h3 className="text-xl font-light text-white">Welcome to MEHERAH OS</h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">
                    MEHERAH is your AI Chief of Staff — designed to coordinate complex business goals autonomously without technical complexity.
                  </p>
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Step 2 of 5</span>
                  <h3 className="text-xl font-light text-white">Describe Goals in Plain Language</h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">
                    No prompt engineering needed. Just state what you want to achieve, whether expanding a business or modeling cash flow.
                  </p>
                </div>
              )}

              {onboardingStep === 3 && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Step 3 of 5</span>
                  <h3 className="text-xl font-light text-white">Watch Specialist Agents Organize</h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">
                    MEHERAH assigns tasks to specialized units (Research, Finance, Writing) and presents a clear plan before beginning.
                  </p>
                </div>
              )}

              {onboardingStep === 4 && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Step 4 of 5</span>
                  <h3 className="text-xl font-light text-white">Review Clear Executive Briefs</h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">
                    Get plain language results backed by empirical confidence scores, supporting evidence, and business impact summaries.
                  </p>
                </div>
              )}

              {onboardingStep === 5 && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Step 5 of 5</span>
                  <h3 className="text-xl font-light text-white">You Remain in Complete Control</h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">
                    Approve sensitive checkpoints with one click. Zero-trust governance guards ensure your operations stay secure.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {onboardingStep > 1 && (
                  <button
                    onClick={() => setOnboardingStep((s) => s - 1)}
                    className="flex-1 py-2.5 bg-[#1A1A1A] text-[#A3A3A3] rounded-lg text-xs font-semibold hover:text-white"
                  >
                    Back
                  </button>
                )}
                {onboardingStep < 5 ? (
                  <button
                    onClick={() => setOnboardingStep((s) => s + 1)}
                    className="flex-1 py-2.5 bg-[#D4AF37] text-black font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-[#F3E5AB]"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={finishOnboarding}
                    className="flex-1 py-2.5 bg-[#D4AF37] text-black font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-[#F3E5AB]"
                  >
                    Got It, Let's Begin
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
