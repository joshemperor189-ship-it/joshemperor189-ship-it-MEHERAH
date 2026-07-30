import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Brain, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  RefreshCw, 
  ArrowDown, 
  CheckCircle2, 
  Zap, 
  Building2, 
  Smartphone, 
  CreditCard, 
  Users, 
  Code2, 
  Lock, 
  BookOpen, 
  Cpu, 
  MessageSquare, 
  Check, 
  Copy, 
  Terminal, 
  FileText, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  SystemLayerArchitectureNode, 
  UniversalTranslationMapping, 
  GlobalNetworkBehaviorTelemetry, 
  FinancialCoordinationDecision, 
  TrustInfrastructureProof, 
  OperatingLayerBlueprintDocument 
} from '../../services/meherah-world-operating-layer.service';

export function MeherahWorldOperatingLayerBlueprintView() {
  const [activeTab, setActiveTab] = useState<
    'topology' | 'language' | 'network' | 'coordination' | 'trust' | 'human' | 'blueprint'
  >('topology');
  const [loading, setLoading] = useState<boolean>(true);

  // States
  const [nodes, setNodes] = useState<SystemLayerArchitectureNode[]>([]);
  const [translations, setTranslations] = useState<UniversalTranslationMapping[]>([]);
  const [telemetry, setTelemetry] = useState<GlobalNetworkBehaviorTelemetry[]>([]);
  const [coordinations, setCoordinations] = useState<FinancialCoordinationDecision[]>([]);
  const [proofs, setProofs] = useState<TrustInfrastructureProof[]>([]);
  const [blueprint, setBlueprint] = useState<OperatingLayerBlueprintDocument | null>(null);

  // Interactive translation testing
  const [selectedTranslationIndex, setSelectedTranslationIndex] = useState<number>(0);
  const [copiedBlueprint, setCopiedBlueprint] = useState<boolean>(false);

  useEffect(() => {
    fetchWorldLayerData();
  }, []);

  const fetchWorldLayerData = async () => {
    setLoading(true);
    try {
      const [nodeRes, transRes, telemRes, coordRes, proofRes, printRes] = await Promise.all([
        fetch('/api/meherah/world-operating-layer/architecture-map'),
        fetch('/api/meherah/world-operating-layer/translations'),
        fetch('/api/meherah/world-operating-layer/telemetry'),
        fetch('/api/meherah/world-operating-layer/coordinations'),
        fetch('/api/meherah/world-operating-layer/proofs'),
        fetch('/api/meherah/world-operating-layer/blueprint')
      ]);

      setNodes(await nodeRes.json());
      setTranslations(await transRes.json());
      setTelemetry(await telemRes.json());
      setCoordinations(await coordRes.json());
      setProofs(await proofRes.json());
      setBlueprint(await printRes.json());
    } catch (err) {
      console.error('Failed to load MEHERAH World Operating Layer data:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentTranslation = translations[selectedTranslationIndex] || translations[0];

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* HERO BANNER FOR WORLD OPERATING LAYER */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <Globe2 className="w-3.5 h-3.5 text-[#070707]" /> WORLD OPERATING LAYER
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-[#00B86B]" /> UNIVERSAL FINANCIAL COORDINATION
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF] italic">
                "The intelligence layer connecting the world's financial systems."
              </h1>
              <p className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                Different systems. One understanding.
              </p>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              MEHERAH does not replace banks, governments, or mobile networks. It acts as the global coordination and intelligence layer that translates, reasons, secures, and optimizes cross-network financial operations seamlessly.
            </p>
          </div>

          {/* BLUEPRINT SUMMARY BOX */}
          <div className="bg-[#070707] border border-[#C9A227]/50 rounded-xl p-5 text-center space-y-2 min-w-[280px]">
            <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">OPERATING SPECIFICATION</span>
            <div className="text-xl font-bold font-mono text-[#C9A227]">
              MHR-WORLD-V2026.1
            </div>
            <div className="text-[10px] text-[#00B86B] font-mono flex items-center justify-center gap-2">
              <span>98.4% FRICTION REDUCTION</span>
              <span>•</span>
              <span>100% 0-LOSS</span>
            </div>
            <button
              onClick={() => setActiveTab('blueprint')}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#070707]" />
              Open Blueprint Doc
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'topology', label: '1. Layer Topology', desc: 'Global Architecture', icon: Layers },
            { id: 'language', label: '2. Universal Language', desc: 'Translation Engine', icon: Code2 },
            { id: 'network', label: '3. Intelligence Network', desc: 'Behavior & Latency', icon: Activity },
            { id: 'coordination', label: '4. Coordination', desc: 'Settlement & Treasury', icon: Cpu },
            { id: 'trust', label: '5. Trust Infrastructure', desc: 'HSM & 3-Way Proofs', icon: ShieldCheck },
            { id: 'human', label: '6. Human Intelligence', desc: 'Clear Understanding', icon: MessageSquare },
            { id: 'blueprint', label: '7. Blueprint Doc', desc: 'Technical Spec', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-2.5 rounded-xl border text-left font-mono transition-all flex flex-col justify-between ${
                  active 
                    ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-lg shadow-[#C9A227]/20' 
                    : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase">{tab.label.split('.')[0]}</span>
                  <Icon className="w-3.5 h-3.5 text-current" />
                </div>
                <span className="text-[11px] font-bold font-sans mt-1 text-current truncate">{tab.label.split('.')[1]}</span>
                <span className="text-[8px] opacity-80 block font-mono truncate">{tab.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. TOPOLOGY DIAGRAM VIEW */}
      {activeTab === 'topology' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  WORLD OPERATING LAYER TOPOLOGY
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Global Financial Systems Architecture</h2>
                <p className="text-xs text-[#A7A7A7]">Connecting Banks, Mobile Money, and Payment Networks through MEHERAH to serve Businesses, Governments, and People.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-[#00B86B]" /> LIVE TOPOLOGY MESH
              </span>
            </div>

            {/* VISUAL LAYER STACK */}
            <div className="space-y-6 font-mono text-xs max-w-4xl mx-auto">
              
              {/* TOP: WORLD FINANCIAL SYSTEMS */}
              <div className="p-5 bg-[#070707] border-2 border-[#222222] rounded-2xl space-y-3 relative">
                <span className="text-xs font-bold text-[#C9A227] uppercase block text-center">
                  WORLD FINANCIAL SYSTEMS
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl text-center space-y-1">
                    <Building2 className="w-5 h-5 text-[#C9A227] mx-auto" />
                    <strong className="text-[#FFFFFF] block font-sans">Commercial Banks</strong>
                    <span className="text-[10px] text-[#A7A7A7]">Flexcube • T24 • Swift</span>
                  </div>

                  <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl text-center space-y-1">
                    <Smartphone className="w-5 h-5 text-[#00B86B] mx-auto" />
                    <strong className="text-[#FFFFFF] block font-sans">Mobile Money</strong>
                    <span className="text-[10px] text-[#A7A7A7]">M-Pesa • MTN MoMo • Airtel</span>
                  </div>

                  <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl text-center space-y-1">
                    <CreditCard className="w-5 h-5 text-[#C9A227] mx-auto" />
                    <strong className="text-[#FFFFFF] block font-sans">Payment Networks</strong>
                    <span className="text-[10px] text-[#A7A7A7]">Flutterwave • Visa • Interswitch</span>
                  </div>
                </div>
              </div>

              {/* DOWN ARROW */}
              <div className="flex justify-center text-[#C9A227]">
                <ArrowDown className="w-8 h-8 animate-bounce" />
              </div>

              {/* MIDDLE: MEHERAH WORLD OPERATING LAYER */}
              <div className="p-6 bg-[#070707] border-2 border-[#C9A227] rounded-2xl space-y-4 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                  <span className="text-xs font-bold text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase font-mono">
                    MEHERAH WORLD OPERATING LAYER
                  </span>
                  <span className="text-[10px] text-[#00B86B] font-bold">NON-CUSTODIAL COORDINATION</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  {[
                    'Language of MEHERAH',
                    'Universal Translation',
                    'Intelligence & Reasoning',
                    'Trust & Governance',
                    'Memory & Learning',
                    'Network Coordination'
                  ].map((sub, idx) => (
                    <div key={idx} className="p-3 bg-[#111111] border border-[#C9A227]/40 rounded-xl space-y-1">
                      <Sparkles className="w-4 h-4 text-[#C9A227] mx-auto" />
                      <span className="text-xs font-bold text-[#FFFFFF] block font-sans">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOWN ARROW */}
              <div className="flex justify-center text-[#C9A227]">
                <ArrowDown className="w-8 h-8 animate-bounce" />
              </div>

              {/* BOTTOM: BENEFICIARIES */}
              <div className="p-5 bg-[#070707] border-2 border-[#00B86B]/50 rounded-2xl space-y-3 relative text-center">
                <span className="text-xs font-bold text-[#00B86B] uppercase block">
                  Businesses • Governments • People
                </span>
                <p className="text-xs text-[#A7A7A7] font-sans">
                  Instant zero-loss cross-border transactions, automated tax compliance, and transparent financial service access.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. UNIVERSAL FINANCIAL LANGUAGE VIEW */}
      {activeTab === 'language' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  SEMANTIC TRANSLATION ENGINE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Universal Financial Language</h2>
                <p className="text-xs text-[#A7A7A7]">Translates technical code noise across commercial banks, mobile money, and payment gateways into unified semantic intent.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                99.98% TRANSLATION ACCURACY
              </span>
            </div>

            {/* TRANSLATION SIMULATOR */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
              
              {/* SYSTEM SELECTOR */}
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">
                  CONNECTED SYSTEM PAYLOADS
                </span>

                <div className="space-y-2">
                  {translations.map((tr, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTranslationIndex(idx)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 ${
                        idx === selectedTranslationIndex
                          ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-md'
                          : 'bg-[#111111] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                      }`}
                    >
                      <span className="text-[9px] uppercase block">{tr.systemType}</span>
                      <h4 className="text-xs font-bold font-sans truncate text-current">{tr.rawTechnicalMessage}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRANSLATION DETAIL RESULT */}
              {currentTranslation && (
                <div className="lg:col-span-2 p-6 bg-[#070707] border border-[#C9A227] rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-xs font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                      MEHERAH SEMANTIC INTENT DECODER
                    </span>
                    <span className="text-xs text-[#00B86B] font-bold">{currentTranslation.confidenceScore}% CONFIDENCE</span>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] font-mono uppercase block">RAW SYSTEM PAYLOAD:</span>
                      <pre className="p-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] font-mono whitespace-pre-wrap mt-1">
                        {currentTranslation.rawTechnicalMessage}
                      </pre>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#C9A227] font-mono uppercase block">MEHERAH INTERNAL SEMANTIC MEANING:</span>
                      <div className="p-3 bg-[#111111] border border-[#C9A227]/50 rounded-xl text-xs text-[#00B86B] font-bold font-mono mt-1">
                        "{currentTranslation.meherahInternalMeaning}"
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#A7A7A7] font-mono uppercase block">HUMAN-CENTRED EXPLANATION:</span>
                      <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] italic mt-1">
                        "{currentTranslation.humanCentredExplanation}"
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 3. GLOBAL INTELLIGENCE NETWORK VIEW */}
      {activeTab === 'network' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  REAL-TIME BEHAVIORAL MAPS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Global Intelligence Network</h2>
                <p className="text-xs text-[#A7A7A7]">Understands reliable routes, failure points, delay hotspots, and cost optimization opportunities globally.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                100% VISIBILITY ACTIVE
              </span>
            </div>

            {/* TELEMETRY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {telemetry.map((t, idx) => (
                <div key={idx} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="text-sm font-bold text-[#C9A227] font-sans">{t.corridor}</span>
                    <span className="text-[10px] text-[#00B86B] font-bold">{t.reliabilityScorePct}% RELIABLE</span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">Failure Rate:</span>
                      <strong className="text-[#00B86B]">{t.failureRatePct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">Avg Latency:</span>
                      <strong className="text-[#FFFFFF]">{t.avgLatencyMs}ms</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A7A7]">Cost Efficiency Score:</span>
                      <strong className="text-[#C9A227]">{t.costEfficiencyScore}/10</strong>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#111111] rounded-xl border border-[#222222] text-[10px] text-[#00B86B]">
                    ⚡ OPPORTUNITY: {t.primaryImprovementOpportunity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. FINANCIAL COORDINATION VIEW */}
      {activeTab === 'coordination' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  MULTI-SYSTEM COORDINATION STREAM
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Financial Coordination</h2>
                <p className="text-xs text-[#A7A7A7]">Coordinating settlements, automated 3-way reconciliation, treasury rebalancing, and cross-border flows.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                COORDINATED LIVE
              </span>
            </div>

            {/* COORDINATION DECISIONS */}
            <div className="space-y-4 font-mono text-xs">
              {coordinations.map((c) => (
                <div key={c.id} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                      {c.activityType}
                    </span>
                    <span className="text-xs font-bold text-[#00B86B]">{c.value}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans text-xs">
                    <div>
                      <strong className="text-[#FFFFFF] block">{c.sourceEntity} → {c.destinationEntity}</strong>
                      <span className="text-xs text-[#A7A7A7]">Strategy: {c.coordinationStrategy}</span>
                    </div>

                    <span className="text-[10px] font-mono text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-2 py-1 rounded self-start sm:self-auto font-bold">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TRUST INFRASTRUCTURE VIEW */}
      {activeTab === 'trust' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  UNSHAKEABLE TRUST INFRASTRUCTURE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Trust Infrastructure</h2>
                <p className="text-xs text-[#A7A7A7]">FIPS 140-2 Level 3 HSM hardware encryption, continuous 3-way hash reconciliation, and auditable confidence scores.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                ZERO-TRUST SECURE
              </span>
            </div>

            {/* TRUST PROOFS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {proofs.map((p) => (
                <div key={p.proofId} className="p-5 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                      {p.verificationLevel}
                    </span>
                    <span className="text-[10px] text-[#00B86B] font-bold">{p.securityStatus}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#A7A7A7] block">AUDIT HISTORY HASH:</span>
                    <code className="text-[10px] text-[#C9A227] bg-[#111111] p-2 rounded block truncate border border-[#222222]">
                      {p.auditHistoryHash}
                    </code>
                  </div>

                  <p className="text-xs text-[#FFFFFF] font-sans">{p.decisionExplanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. HUMAN-CENTRED INTELLIGENCE VIEW */}
      {activeTab === 'human' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  HUMAN UNDERSTANDING TRANSLATOR
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Human-Centred Intelligence</h2>
                <p className="text-xs text-[#A7A7A7]">Translating raw technical error noise into clear, comforting human explanations.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                HUMAN-FIRST UX
              </span>
            </div>

            {/* ERROR NOISE VS HUMAN TRANSLATION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
              <div className="p-5 bg-[#070707] border border-red-500/30 rounded-2xl space-y-3">
                <span className="text-[10px] font-mono font-bold text-red-400 uppercase block">RAW TECHNICAL FRICTION NOISE</span>
                <p className="text-red-300 font-mono text-xs bg-[#111111] p-3 rounded-xl border border-red-500/20">
                  "Provider timeout error 504: Upstream socket connection closed abruptly during clearing handoff."
                </p>
                <p className="text-[#A7A7A7] text-[11px]">Confuses users, triggers anxiety, causes unneeded support tickets.</p>
              </div>

              <div className="p-5 bg-[#070707] border border-[#00B86B] rounded-2xl space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#00B86B] uppercase block">MEHERAH HUMAN TRANSLATION</span>
                <p className="text-[#FFFFFF] text-xs font-bold bg-[#111111] p-3 rounded-xl border border-[#00B86B]/30 italic">
                  "Your payment route was temporarily unavailable. MEHERAH automatically selected another verified route with zero money loss."
                </p>
                <p className="text-[#00B86B] text-[11px] font-mono font-bold">✔ Restores user confidence & confirms safety.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. BLUEPRINT ARCHITECTURE DOCUMENT VIEW */}
      {activeTab === 'blueprint' && blueprint && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227] rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ARCHITECTURE BLUEPRINT DOCUMENT
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">{blueprint.title}</h2>
                <p className="text-xs text-[#A7A7A7] font-mono">VERSION: {blueprint.version}</p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
                  setCopiedBlueprint(true);
                  setTimeout(() => setCopiedBlueprint(false), 2000);
                }}
                className="px-3 py-2 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-1.5 self-start md:self-auto"
              >
                {copiedBlueprint ? <Check className="w-4 h-4 text-[#070707]" /> : <Copy className="w-4 h-4 text-[#070707]" />}
                {copiedBlueprint ? 'Blueprint Copied!' : 'Copy Architecture Spec'}
              </button>
            </div>

            <div className="space-y-5 font-mono text-xs">
              
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[10px] text-[#C9A227] font-bold block uppercase">1. CORE VISION</span>
                <p className="text-xs text-[#FFFFFF] font-sans leading-relaxed">"{blueprint.vision}"</p>
              </div>

              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[10px] text-[#C9A227] font-bold block uppercase">2. TECHNICAL ARCHITECTURE</span>
                <div className="space-y-1 text-xs font-sans text-[#A7A7A7]">
                  <p>• <strong className="text-[#FFFFFF]">Microkernel:</strong> {blueprint.technicalArchitecture.coreMicrokernel}</p>
                  <p>• <strong className="text-[#FFFFFF]">Translation Subsystem:</strong> {blueprint.technicalArchitecture.translationSubsystem}</p>
                  <p>• <strong className="text-[#FFFFFF]">Coordination Engine:</strong> {blueprint.technicalArchitecture.coordinationEngine}</p>
                </div>
              </div>

              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[10px] text-[#C9A227] font-bold block uppercase">3. ECONOMIC FRAMEWORK</span>
                <div className="space-y-1 text-xs font-sans text-[#A7A7A7]">
                  <p>• <strong className="text-[#FFFFFF]">Friction Elimination:</strong> {blueprint.economicFramework.frictionEliminationPct}%</p>
                  <p>• <strong className="text-[#FFFFFF]">Zero Loss Guarantee:</strong> {blueprint.economicFramework.zeroLossGuarantee}</p>
                  <p>• <strong className="text-[#FFFFFF]">Cross-Border Cost Reduction:</strong> {blueprint.economicFramework.crossBorderCostReduction}</p>
                </div>
              </div>

              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                <span className="text-[10px] text-[#C9A227] font-bold block uppercase">4. INSTITUTIONAL GOVERNANCE</span>
                <div className="space-y-1 text-xs font-sans text-[#A7A7A7]">
                  <p>• <strong className="text-[#FFFFFF]">Sovereign Compliance:</strong> {blueprint.institutionalGovernance.sovereignCompliance}</p>
                  <p>• <strong className="text-[#FFFFFF]">Multi-Central-Bank Auditability:</strong> {blueprint.institutionalGovernance.multiCentralBankAuditability}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
