import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, RefreshCw, Zap, Cpu, Lock, Key, Sliders, AlertTriangle, 
  CheckCircle2, Flame, HeartPulse, Send, Layers, Database, ShieldCheck, Clock
} from 'lucide-react';

interface CircuitBreakerMetric {
  providerId: string;
  providerName: string;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  consecutiveFailures: number;
  totalRequests: number;
  failedRequests: number;
  failureRate: number;
  avgLatencyMs: number;
  lastTripTime: string | null;
}

interface ShadowLedgerEntry {
  entryId: string;
  txRef: string;
  userId: string;
  grossAmount: number;
  netAmount: number;
  feeDeducted: number;
  providerChargedFee: number;
  feeVariance: number;
  currency: string;
  status: 'RECONCILED' | 'FEE_LEAKAGE_DETECTED' | 'DISCREPANCY';
  timestamp: string;
}

interface TenantKms {
  tenantId: string;
  tenantName: string;
  hsmStatus: string;
  masterKeyHash: string;
  partitionId: string;
  keysCount: number;
  lastRotated: string;
}

export default function EnterpriseResilienceTab() {
  const [circuitMetrics, setCircuitMetrics] = useState<CircuitBreakerMetric[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<ShadowLedgerEntry[]>([]);
  const [ledgerStats, setLedgerStats] = useState<any>(null);
  const [idempotencyStats, setIdempotencyStats] = useState<any>(null);
  const [chaosStats, setChaosStats] = useState<any>(null);
  const [kmsTenants, setKmsTenants] = useState<TenantKms[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Chaos controls
  const [latencyEnabled, setLatencyEnabled] = useState(false);
  const [latencyMs, setLatencyMs] = useState(3500);
  const [faultRate, setFaultRate] = useState(0);
  const [shadowEnabled, setShadowEnabled] = useState(true);

  const fetchResilienceData = async () => {
    setIsRefreshing(true);
    try {
      const [cbRes, ledgRes, idempRes, chaosRes, kmsRes] = await Promise.all([
        fetch('/api/circuit-breaker/status'),
        fetch('/api/shadow-ledger/list'),
        fetch('/api/idempotency/stats'),
        fetch('/api/chaos/config'),
        fetch('/api/kms/tenants')
      ]);

      if (cbRes.ok) {
        const data = await cbRes.json();
        setCircuitMetrics(data.metrics || []);
      }

      if (ledgRes.ok) {
        const data = await ledgRes.json();
        setLedgerEntries(data.entries || []);
        setLedgerStats(data.stats || null);
      }

      if (idempRes.ok) {
        const data = await idempRes.json();
        setIdempotencyStats(data);
      }

      if (chaosRes.ok) {
        const data = await chaosRes.json();
        setChaosStats(data);
        if (data.config) {
          setLatencyEnabled(data.config.latencyInjectionEnabled);
          setLatencyMs(data.config.latencyMs);
          setFaultRate(data.config.faultRatePercent);
          setShadowEnabled(data.config.trafficShadowingEnabled);
        }
      }

      if (kmsRes.ok) {
        const data = await kmsRes.json();
        setKmsTenants(data.tenants || []);
      }
    } catch (e) {
      console.warn('Error fetching resilience data:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResilienceData();
    const interval = setInterval(fetchResilienceData, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMutateCircuit = async (providerId: string, state: 'CLOSED' | 'OPEN' | 'HALF_OPEN') => {
    try {
      await fetch('/api/circuit-breaker/mutate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, state })
      });
      fetchResilienceData();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleTriggerReconcile = async () => {
    try {
      const res = await fetch('/api/reconcile/trigger', { method: 'POST' });
      if (res.ok) {
        fetchResilienceData();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateChaos = async () => {
    try {
      await fetch('/api/chaos/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latencyInjectionEnabled: latencyEnabled,
          latencyMs: Number(latencyMs),
          faultRatePercent: Number(faultRate),
          trafficShadowingEnabled: shadowEnabled
        })
      });
      fetchResilienceData();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleRotateKms = async (tenantId: string) => {
    try {
      await fetch('/api/kms/rotate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId })
      });
      fetchResilienceData();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="space-y-6" id="enterprise_resilience_panel">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <div>
            <span className="font-bold text-sm tracking-wide block">PHASE 3.5: ENTERPRISE RESILIENCE & SOVEREIGN COMPLIANCE ACTIVE</span>
            <span className="text-xs text-amber-400/80">Autonomous Failure Recovery • Idempotency Guard • Shadow Ledger • Chaos Lab • KMS Vault</span>
          </div>
        </div>
        <button 
          onClick={fetchResilienceData}
          className="p-2 hover:bg-amber-500/20 rounded-lg text-amber-400 transition-colors flex items-center gap-2 text-xs font-mono font-bold"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {/* Grid Row 1: Circuit Breaker Matrix & Chaos Control Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Circuit Breaker Matrix & Healer Agent */}
        <div className="lg:col-span-7 border border-zinc-800 bg-zinc-950 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Circuit Breakers & Autonomous Healer Agent
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Healer Active
            </span>
          </div>

          <p className="text-xs text-zinc-400">
            Isolates degraded gateways automatically if error rates exceed threshold or latency spikes. Dynamic step-down rerouting redirects transactions seamlessly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {circuitMetrics.map(cb => {
              const isClosed = cb.state === 'CLOSED';
              const isOpen = cb.state === 'OPEN';
              return (
                <div key={cb.providerId} className={`p-4 rounded-xl border ${isOpen ? 'bg-rose-950/20 border-rose-500/40' : 'bg-zinc-900/60 border-zinc-800'} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-200">{cb.providerName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      isClosed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      isOpen ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' :
                      'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {cb.state}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-zinc-400">
                    <div>
                      <span className="text-zinc-500 block text-[9px]">FAIL RATE:</span>
                      <strong className={cb.failureRate > 20 ? 'text-rose-400' : 'text-zinc-200'}>{cb.failureRate}%</strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px]">LATENCY:</span>
                      <strong className="text-zinc-200">{cb.avgLatencyMs}ms</strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px]">FAIL COUNT:</span>
                      <strong className="text-zinc-200">{cb.consecutiveFailures}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-800/80">
                    <button 
                      onClick={() => handleMutateCircuit(cb.providerId, 'CLOSED')}
                      className="flex-1 py-1 bg-zinc-800 hover:bg-emerald-600/30 text-emerald-400 text-[10px] font-bold rounded transition-colors"
                    >
                      Restore (CLOSED)
                    </button>
                    <button 
                      onClick={() => handleMutateCircuit(cb.providerId, 'OPEN')}
                      className="flex-1 py-1 bg-zinc-800 hover:bg-rose-600/30 text-rose-400 text-[10px] font-bold rounded transition-colors"
                    >
                      Trip (OPEN)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Chaos Engineering Lab */}
        <div className="lg:col-span-5 border border-zinc-800 bg-zinc-950 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" /> Advanced Chaos Lab & Traffic Shadow
            </h3>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Dark Launch
            </span>
          </div>

          <div className="space-y-3 text-xs bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-300">Inject Artificial Latency:</span>
              <input 
                type="checkbox" 
                checked={latencyEnabled}
                onChange={(e) => setLatencyEnabled(e.target.checked)}
                className="accent-amber-500 w-4 h-4 cursor-pointer"
              />
            </div>

            {latencyEnabled && (
              <div>
                <label className="text-[10px] font-mono text-zinc-400">Delay (ms): {latencyMs}ms</label>
                <input 
                  type="range" 
                  min="1000" 
                  max="10000" 
                  step="500"
                  value={latencyMs}
                  onChange={(e) => setLatencyMs(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="font-medium text-zinc-300">Forced Fault Rate (%): {faultRate}%</span>
              <input 
                type="number" 
                min="0" 
                max="100" 
                value={faultRate}
                onChange={(e) => setFaultRate(Number(e.target.value))}
                className="w-16 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="font-medium text-zinc-300">Traffic Shadowing (Dark Launch):</span>
              <input 
                type="checkbox" 
                checked={shadowEnabled}
                onChange={(e) => setShadowEnabled(e.target.checked)}
                className="accent-amber-500 w-4 h-4 cursor-pointer"
              />
            </div>

            <button
              onClick={handleUpdateChaos}
              className="w-full py-2 mt-2 bg-amber-500 text-zinc-950 font-bold text-xs rounded hover:bg-amber-400 transition-colors"
            >
              Apply Chaos Lab Configuration
            </button>
          </div>

          {chaosStats && (
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-zinc-400 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800 text-center">
              <div>
                <span className="text-zinc-500 block text-[9px]">SHADOWED:</span>
                <strong className="text-amber-400">{chaosStats.shadowedCount}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block text-[9px]">LATENCY INJ:</span>
                <strong className="text-zinc-200">{chaosStats.injectedLatencyCount}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block text-[9px]">FORCED FAULTS:</span>
                <strong className="text-rose-400">{chaosStats.forcedFaultsCount}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid Row 2: Shadow Ledgering & Idempotency / KMS Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 3. Shadow Ledgering & Fee Leakage Detection */}
        <div className="lg:col-span-8 border border-zinc-800 bg-zinc-950 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-500" /> Double-Entry Shadow Ledger & Fee Leakage Detection
            </h3>
            {ledgerStats && (
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                Reconciled: {ledgerStats.reconciledRate}
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 font-mono uppercase text-[10px]">
                  <th className="py-2 px-3">Entry ID / TxRef</th>
                  <th className="py-2 px-3 text-right">Gross</th>
                  <th className="py-2 px-3 text-right">Net</th>
                  <th className="py-2 px-3 text-right">Predicted Fee</th>
                  <th className="py-2 px-3 text-right">Provider Fee</th>
                  <th className="py-2 px-3 text-center">Variance</th>
                  <th className="py-2 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {ledgerEntries.length > 0 ? (
                  ledgerEntries.map(entry => {
                    const isLeakage = entry.status === 'FEE_LEAKAGE_DETECTED';
                    return (
                      <tr key={entry.entryId} className="border-b border-zinc-900/60 font-mono hover:bg-zinc-900/30">
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-zinc-200">{entry.txRef}</div>
                          <div className="text-[10px] text-zinc-500">{entry.entryId}</div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-zinc-200">${entry.grossAmount}</td>
                        <td className="py-2.5 px-3 text-right text-emerald-400">${entry.netAmount.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right text-zinc-400">${entry.feeDeducted.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right text-zinc-400">${entry.providerChargedFee.toFixed(2)}</td>
                        <td className={`py-2.5 px-3 text-center font-bold ${isLeakage ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {entry.feeVariance >= 0 ? '+' : ''}${entry.feeVariance.toFixed(3)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                            isLeakage 
                              ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-zinc-500 font-mono text-xs">
                      No shadow ledger records yet. Deposit funds to watch double-entry audit mirrors generate live.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Idempotency & KMS Vault Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Idempotency & Consensus Guard */}
          <div className="border border-zinc-800 bg-zinc-950 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-amber-500" /> Idempotency & Reconciliation Worker
              </h4>
            </div>

            {idempotencyStats && (
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] bg-zinc-900/60 p-3 rounded-lg border border-zinc-800 text-center">
                <div>
                  <span className="text-zinc-500 block text-[9px]">ACTIVE LOCKS:</span>
                  <strong className="text-amber-400">{idempotencyStats.activeLocksCount}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px]">HANDLED:</span>
                  <strong className="text-zinc-200">{idempotencyStats.totalLocksHandled}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px]">RECONCILED:</span>
                  <strong className="text-emerald-400">{idempotencyStats.reconciledEventsCount}</strong>
                </div>
              </div>
            )}

            <button
              onClick={handleTriggerReconcile}
              className="w-full py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-bold text-xs rounded transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> Trigger Event Reconciliation Heartbeat
            </button>
          </div>

          {/* KMS Cryptographic Vault */}
          <div className="border border-zinc-800 bg-zinc-950 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-500" /> Multi-Tenant KMS Vault & HSM
              </h4>
            </div>

            <div className="space-y-2">
              {kmsTenants.map(t => (
                <div key={t.tenantId} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="font-bold text-zinc-200">{t.tenantName}</div>
                    <div className="text-[10px] text-zinc-500">{t.partitionId} • {t.masterKeyHash}</div>
                  </div>
                  <button
                    onClick={() => handleRotateKms(t.tenantId)}
                    className="px-2 py-1 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded border border-amber-500/30 text-[10px] font-bold"
                  >
                    Rotate Keys
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
