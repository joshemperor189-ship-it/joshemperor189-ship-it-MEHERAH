import React, { useState, useEffect } from 'react';
import { Layers, Sparkles, Sliders, TrendingUp, Cpu, RefreshCw, CreditCard, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { AIProvider } from '../enterprise_types';

export default function ProviderTab() {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [qualityWeight, setQualityWeight] = useState<number>(0.5);
  const [speedWeight, setSpeedWeight] = useState<number>(0.2);
  const [costWeight, setCostWeight] = useState<number>(0.3);
  const [testGoal, setTestGoal] = useState<string>("Draft Kampala region cross-border fintech expansion strategy");
  const [evaluationResult, setEvaluationResult] = useState<{ provider: AIProvider; reasoning: string[] } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Flutterwave Sandbox state
  const [flwAmount, setFlwAmount] = useState<number>(1000);
  const [flwEmail, setFlwEmail] = useState<string>('meherah.sandbox@flutterwave.com');
  const [flwMethod, setFlwMethod] = useState<string>('card');
  const [flwInitResult, setFlwInitResult] = useState<any>(null);
  const [flwVerifyId, setFlwVerifyId] = useState<string>('');
  const [flwVerifyResult, setFlwVerifyResult] = useState<any>(null);
  const [isFlwLoading, setIsFlwLoading] = useState<boolean>(false);

  const fetchProviders = async () => {
    try {
      const res = await fetch('/api/providers');
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/providers/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: testGoal,
          qualityWeight,
          speedWeight,
          costWeight
        })
      });
      if (res.ok) {
        const data = await res.json();
        setEvaluationResult(data);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleInitFlw = async () => {
    setIsFlwLoading(true);
    try {
      const res = await fetch('/api/flutterwave/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: flwAmount,
          currency: 'USD',
          customerEmail: flwEmail,
          paymentMethod: flwMethod
        })
      });
      const data = await res.json();
      setFlwInitResult(data);
      if (data.gatewayTransactionId) {
        setFlwVerifyId(data.gatewayTransactionId);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFlwLoading(false);
    }
  };

  const handleVerifyFlw = async () => {
    if (!flwVerifyId) return;
    setIsFlwLoading(true);
    try {
      const res = await fetch(`/api/flutterwave/verify/${flwVerifyId}`);
      const data = await res.json();
      setFlwVerifyResult(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsFlwLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="provider_panel">
      {/* Flutterwave Sandbox Adapter Console */}
      <div className="border border-amber-500/30 bg-zinc-950 p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-500" /> Flutterwave Sandbox & Payment Adapter Console
          </h3>
          <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 font-mono rounded border border-amber-500/30">
            Phase 3 Adapter Live
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">1. Initialize Payment Handshake</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 font-mono">Amount (USD):</label>
                <input 
                  type="number" 
                  value={flwAmount}
                  onChange={(e) => setFlwAmount(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 font-mono">Payment Method:</label>
                <select 
                  value={flwMethod}
                  onChange={(e) => setFlwMethod(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
                >
                  <option value="card">Card / Visa</option>
                  <option value="mobile_money">Mobile Money (MTN/Airtel)</option>
                  <option value="banktransfer">Bank Transfer / ACH</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 font-mono">Customer Email:</label>
              <input 
                type="email" 
                value={flwEmail}
                onChange={(e) => setFlwEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
              />
            </div>
            <button
              onClick={handleInitFlw}
              disabled={isFlwLoading}
              className="w-full py-2 bg-amber-500 text-zinc-950 font-bold text-xs rounded hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Initialize Flutterwave Sandbox Transaction
            </button>

            {flwInitResult && (
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded text-xs space-y-1 font-mono">
                <div className="text-amber-400 font-bold">Status: {flwInitResult.status}</div>
                <div className="text-zinc-400">TxRef: {flwInitResult.txRef}</div>
                <div className="text-zinc-400">Gateway ID: {flwInitResult.gatewayTransactionId}</div>
                <div className="text-zinc-500 text-[10px]">Mode: {flwInitResult.mode}</div>
              </div>
            )}
          </div>

          <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">2. Verify Transaction Status</h4>
            <div>
              <label className="text-[11px] text-zinc-400 font-mono">Transaction / Gateway ID:</label>
              <input 
                type="text" 
                value={flwVerifyId}
                onChange={(e) => setFlwVerifyId(e.target.value)}
                placeholder="FLW-SBX-..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200"
              />
            </div>
            <button
              onClick={handleVerifyFlw}
              disabled={isFlwLoading || !flwVerifyId}
              className="w-full py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs rounded hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verify Flutterwave Settlement
            </button>

            {flwVerifyResult && (
              <div className="p-3 bg-zinc-950 border border-emerald-500/30 rounded text-xs space-y-1 font-mono">
                <div className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verification Outcome: {flwVerifyResult.status}
                </div>
                <div className="text-zinc-400">Amount Settled: ${flwVerifyResult.amount} {flwVerifyResult.currency}</div>
                <div className="text-zinc-400">Card Last4: {flwVerifyResult.cardLast4}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Models Specs */}
      <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" /> Decoupled Multi-AI Provider Engine
          </h3>
          <button onClick={fetchProviders} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase tracking-wider">
                <th className="py-2.5 px-4">Provider / Model</th>
                <th className="py-2.5 px-4 text-center">Reasoning (1-10)</th>
                <th className="py-2.5 px-4 text-center">Speed (T/s)</th>
                <th className="py-2.5 px-4 text-center">Cost ($ / 1M tokens)</th>
                <th className="py-2.5 px-4 text-center">Context</th>
                <th className="py-2.5 px-4 text-center">Latency</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {providers.map(p => (
                <tr key={p.id} className="border-b border-zinc-900 hover:bg-zinc-900/10">
                  <td className="py-3 px-4 font-bold text-zinc-200">{p.name}</td>
                  <td className="py-3 px-4 text-center text-amber-400 font-mono font-bold">{p.reasoningQuality}</td>
                  <td className="py-3 px-4 text-center font-mono text-zinc-400">{p.speed}</td>
                  <td className="py-3 px-4 text-center font-mono text-zinc-400">${p.costPerMillion.toFixed(3)}</td>
                  <td className="py-3 px-4 text-center font-mono text-zinc-500">{p.contextLength}</td>
                  <td className="py-3 px-4 text-center font-mono text-zinc-400">{p.latencyMs}ms</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono font-bold border border-emerald-500/20">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
