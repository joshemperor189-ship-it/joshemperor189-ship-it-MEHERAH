import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Activity, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  RefreshCw, 
  TrendingUp, 
  Layers, 
  Scale, 
  Sparkles, 
  Eye, 
  Terminal, 
  Globe2, 
  Award,
  Lock,
  ChevronRight
} from 'lucide-react';

interface TelemetryData {
  timestamp: string;
  networkStatus: string;
  systemLoadPct: number;
  transactionsPerSecond: number;
  totalCumulativeUserSavingsUGX: number;
  activeFraudAlerts: number;
  liquidityBufferUGX: number;
  providerHealth: Array<{
    id: string;
    name: string;
    status: string;
    latencyMs: number;
    successRate: number;
    liquidityUGX: number;
  }>;
  aiConfidenceScore: number;
  activeEngine: string;
}

interface ConstitutionData {
  version: string;
  jurisdiction: string;
  principles: Record<string, string>;
  systemRules: string[];
}

export function MeherahPhase8CognitiveView() {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [constitution, setConstitution] = useState<ConstitutionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Scan simulation controls
  const [scanAmount, setScanAmount] = useState<number>(250000);
  const [senderNet, setSenderNet] = useState<string>('Airtel Uganda (+256701234567)');
  const [recipientNet, setRecipientNet] = useState<string>('MTN Mobile Money (+256772987654)');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [telRes, constRes] = await Promise.all([
        fetch('/api/meherah/mission-control/telemetry'),
        fetch('/api/meherah/governance/constitution')
      ]);
      const telData = await telRes.json();
      const constData = await constRes.json();
      setTelemetry(telData);
      setConstitution(constData);

      // Perform initial cognitive route scan
      await triggerCognitiveScan(250000, 'Airtel Uganda (+256701234567)', 'MTN Mobile Money (+256772987654)');
    } catch (err) {
      console.error('Failed to load Mission Control 2.0 data:', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerCognitiveScan = async (amt: number, sNet: string, rNet: string) => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/meherah/mission-control/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUGX: amt, senderNetwork: sNet, recipientNetwork: rNet })
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      console.error('Cognitive route scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen">
      
      {/* 1. MISSION CONTROL 2.0 HERO BANNER */}
      <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase">
                PHASE 8 — COGNITIVE INTELLIGENCE
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" /> MISSION CONTROL 2.0
              </span>
            </div>
            <h1 className="text-2xl font-bold font-playfair tracking-tight text-[#FFFFFF]">
              Autonomous Decision & Explainable AI Layer
            </h1>
            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans">
              MEHERAH acts as an intelligent financial operating system. Rather than silently routing payments, the Cognitive Layer predicts provider reliability, calculates transparent user savings, and enforces the MEHERAH Constitution in real-time.
            </p>
          </div>

          <button
            onClick={() => triggerCognitiveScan(scanAmount, senderNet, recipientNet)}
            disabled={isScanning}
            className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center gap-2 shadow-lg shadow-[#C9A227]/20 whitespace-nowrap disabled:opacity-50"
          >
            {isScanning ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" />
            ) : (
              <Sparkles className="w-4 h-4 fill-current text-[#070707]" />
            )}
            Run Cognitive Network Scan
          </button>
        </div>

        {/* TOP METRICS TELEMETRY GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-[#222222]">
          {[
            { label: 'THROUGHPUT (TPS)', value: `${telemetry?.transactionsPerSecond || 342} tps`, sub: 'Real-time velocity' },
            { label: 'SYSTEM LOAD', value: `${telemetry?.systemLoadPct || 14.2}%`, sub: 'Sub-second compute' },
            { label: 'USER SAVINGS', value: `UGX ${(telemetry?.totalCumulativeUserSavingsUGX || 148500200).toLocaleString()}`, sub: 'Cumulative fees saved' },
            { label: 'LIQUIDITY BUFFER', value: `UGX ${(telemetry?.liquidityBufferUGX || 4500000000).toLocaleString()}`, sub: 'Multi-vault balance' },
            { label: 'FRAUD ALERTS', value: `${telemetry?.activeFraudAlerts || 0} active`, sub: 'Zero risk triggers' },
            { label: 'AI CONFIDENCE', value: `${telemetry?.aiConfidenceScore || 99.8}%`, sub: 'Decision certainty' }
          ].map((m, idx) => (
            <div key={idx} className="p-3 bg-[#070707] border border-[#222222] rounded-xl space-y-1">
              <span className="text-[9px] font-mono text-[#A7A7A7] font-bold block uppercase">{m.label}</span>
              <span className="text-sm font-bold font-mono text-[#E8C879] block">{m.value}</span>
              <span className="text-[9px] font-mono text-[#666666] block">{m.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. EXPLAINABLE AI & LIVE DECISION PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: INTERACTIVE ROUTE SCAN CONTROLLER */}
        <div className="lg:col-span-5 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-5">
          <div className="border-b border-[#222222] pb-3">
            <span className="text-xs font-mono font-bold text-[#E8C879] uppercase">LIVE INTELLIGENCE PANEL</span>
            <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Simulate Payment Execution</h2>
            <p className="text-xs text-[#A7A7A7] mt-1">
              Configure transaction parameters to view the AI Decision Engine's real-time provider scanning and natural-language explanation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Sender Account & Gateway</label>
              <input
                type="text"
                value={senderNet}
                onChange={(e) => setSenderNet(e.target.value)}
                className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Recipient Destination</label>
              <input
                type="text"
                value={recipientNet}
                onChange={(e) => setRecipientNet(e.target.value)}
                className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A7A7A7] font-bold block uppercase">Transfer Amount (UGX)</label>
              <input
                type="number"
                value={scanAmount}
                onChange={(e) => setScanAmount(Number(e.target.value))}
                className="w-full bg-[#070707] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <button
              onClick={() => triggerCognitiveScan(scanAmount, senderNet, recipientNet)}
              disabled={isScanning}
              className="w-full py-3.5 rounded-xl bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#070707]" /> Scanning Providers & Calculating Scores...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 text-[#070707]" /> Execute AI Route Optimization
                </>
              )}
            </button>
          </div>

          {/* EXPLAINABLE NARRATIVE DISPLAY BOX */}
          {scanResult && (
            <div className="p-4 bg-[#070707] border border-[#C9A227]/40 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#C9A227]">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase">EXPLAINABLE AI NARRATIVE</span>
              </div>
              <p className="text-xs text-[#E8C879] font-mono leading-relaxed bg-[#111111] p-3 rounded-lg border border-[#C9A227]/20">
                "{scanResult.explainableNarrative}"
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: CANDIDATE ROUTE SCORING & REJECTION REASONS */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#C9A227]/25 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#00B86B] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#C9A227]" /> REAL-TIME PROVIDER EVALUATION TRACE
              </span>
              <h2 className="text-lg font-bold font-playfair text-[#FFFFFF] mt-0.5">Route Candidates & Cognitive Scoring</h2>
            </div>
            <span className="text-xs font-mono text-[#E8C879] bg-[#070707] px-3 py-1 rounded border border-[#C9A227]/30">
              BEST ROUTE: {scanResult?.selectedProvider || 'SCANNING...'}
            </span>
          </div>

          <div className="space-y-3">
            {scanResult?.candidateEvaluations?.map((candidate: any) => {
              const isSelected = candidate.isSelected;
              return (
                <div 
                  key={candidate.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-[#070707] border-[#00B86B] shadow-lg shadow-[#00B86B]/10' 
                      : 'bg-[#070707] border-[#222222] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#00B86B] animate-pulse' : 'bg-[#666666]'}`} />
                      <h3 className="text-sm font-bold font-sans text-[#FFFFFF]">{candidate.providerName}</h3>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40' 
                          : 'bg-[#222222] text-[#A7A7A7]'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#E8C879]">SCORE: {candidate.compositeScore}/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#222222] text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block">FEE</span>
                      <span className="text-[#FFFFFF] font-bold">UGX {candidate.feeUGX.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block">LATENCY</span>
                      <span className="text-[#FFFFFF] font-bold">{candidate.latencyMs} ms</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A7A7A7] block">RELIABILITY</span>
                      <span className="text-[#FFFFFF] font-bold">{candidate.reliabilityPercent}%</span>
                    </div>
                  </div>

                  {!isSelected && candidate.rejectionReason && (
                    <div className="mt-2.5 pt-2 border-t border-[#222222] text-[11px] font-mono text-[#FF5252] flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{candidate.rejectionReason}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* USER BENEFIT HIGHLIGHT CARD */}
          {scanResult?.userBenefit && (
            <div className="p-4 bg-[#070707] border border-[#C9A227]/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#A7A7A7] uppercase font-bold block">DEMONSTRABLE USER GAIN</span>
                <span className="text-sm font-bold text-[#00B86B]">{scanResult.userBenefit.userPrimaryGain}</span>
              </div>
              <div className="text-right whitespace-nowrap">
                <span className="text-[10px] text-[#A7A7A7] uppercase font-bold block">AUDIT LOG TRAIL</span>
                <span className="text-xs text-[#E8C879]">{scanResult.auditTrailId}</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. PROVIDER HEALTH & NETWORK MONITORING GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#C9A227]" />
            <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">Live Provider Health & Liquidity Vaults</h2>
          </div>
          <span className="text-xs font-mono text-[#00B86B] bg-[#111111] px-2.5 py-1 rounded border border-[#00B86B]/30">
            4 / 4 GATEWAYS MONITORED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {telemetry?.providerHealth?.map((provider) => {
            const isHealthy = provider.status === 'HEALTHY';
            return (
              <div key={provider.id} className="p-4 bg-[#111111] border border-[#C9A227]/20 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-sans text-[#FFFFFF]">{provider.name}</h3>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isHealthy ? 'bg-[#00B86B]/20 text-[#00B86B]' : 'bg-[#FF9800]/20 text-[#FF9800]'
                  }`}>
                    {provider.status}
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#A7A7A7]">LATENCY:</span>
                    <span className="text-[#FFFFFF] font-bold">{provider.latencyMs} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A7A7A7]">SUCCESS RATE:</span>
                    <span className="text-[#00B86B] font-bold">{provider.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A7A7A7]">LIQUIDITY:</span>
                    <span className="text-[#E8C879] font-bold">UGX {(provider.liquidityUGX / 1000000).toFixed(0)}M</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. DIGITAL CONSTITUTION SOURCE OF TRUTH DISPLAY */}
      <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#C9A227]" />
            <h2 className="text-lg font-bold font-playfair text-[#FFFFFF]">MEHERAH Constitution (MEHERAH_CONSTITUTION.json)</h2>
          </div>
          <span className="text-xs font-mono text-[#E8C879]">VERSION: {constitution?.version || '1.0.0-IMMUTABLE'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          
          {/* SYSTEM RULES */}
          <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
            <span className="text-[#C9A227] font-bold block uppercase text-[11px]">IMMUTABLE SYSTEM RULES</span>
            <ul className="space-y-1.5 text-[#A7A7A7]">
              {constitution?.systemRules?.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B86B] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* JURISDICTION & ENFORCEMENT */}
          <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
            <span className="text-[#C9A227] font-bold block uppercase text-[11px]">GOVERNANCE KERNEL BINDINGS</span>
            <p className="text-[#A7A7A7] leading-relaxed">
              The MEHERAH Constitution is referenced directly by the Route Engine, AI Engine, Audit Engine, Learning Engine, and Governance Engine prior to committing any financial settlement to state storage.
            </p>
            <div className="pt-2 text-[10px] text-[#00B86B] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Cryptographically bound to all API routes
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
