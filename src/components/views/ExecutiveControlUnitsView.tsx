import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, ShieldCheck, Zap, RefreshCw, Activity, Layers, Landmark, 
  Globe, Scale, Cpu, Lock, CheckCircle2, AlertTriangle, Sliders, Play, 
  Power, ArrowRight, Settings, Server, Database, Check, AlertCircle, FileText
} from 'lucide-react';

export interface GatewayNode {
  id: string;
  name: string;
  status: string;
  latencyMs: number;
  uptime: string;
  active: boolean;
}

export interface ControlState {
  killSwitchEngaged: boolean;
  killSwitchOperator: string;
  killSwitchReason: string;
  liquidityBuffers: {
    bouRtgs: number;
    commercialBanks: number;
    mobileMoney: number;
    totalReserveUGX: string;
  };
  gateways: GatewayNode[];
  aiPolicy: {
    riskTolerance: string;
    antiSlippageEnforced: boolean;
    zkProofRequired: boolean;
    fraudAutoBlockSensitivity: string;
    maxAutonomousTxLimitUGX: number;
  };
  lastBatchCleared: {
    batchId: string;
    totalAmountUGX: string;
    txCount: number;
    timestamp: string;
    status: string;
  };
}

export function ExecutiveControlUnitsView() {
  const [controlState, setControlState] = useState<ControlState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Action Loading States
  const [isTogglingKillSwitch, setIsTogglingKillSwitch] = useState<boolean>(false);
  const [isReallocatingBuffers, setIsReallocatingBuffers] = useState<boolean>(false);
  const [isExecutingBatch, setIsExecutingBatch] = useState<boolean>(false);
  const [togglingGatewayId, setTogglingGatewayId] = useState<string | null>(null);
  const [isSavingPolicy, setIsSavingPolicy] = useState<boolean>(false);

  // Buffer Sliders State
  const [bouBuffer, setBouBuffer] = useState<number>(45);
  const [bankBuffer, setBankBuffer] = useState<number>(35);
  const [momoBuffer, setMomoBuffer] = useState<number>(20);

  // Policy Form State
  const [riskTolerance, setRiskTolerance] = useState<string>('MEDIUM_STRICT');
  const [antiSlippage, setAntiSlippage] = useState<boolean>(true);
  const [zkProof, setZkProof] = useState<boolean>(true);
  const [fraudSensitivity, setFraudSensitivity] = useState<string>('HIGH_95');

  // Success Feedback Message
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const fetchControlState = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/institution/control-state');
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      if (data.success && data.controlState) {
        setControlState(data.controlState);
        setBouBuffer(data.controlState.liquidityBuffers.bouRtgs);
        setBankBuffer(data.controlState.liquidityBuffers.commercialBanks);
        setMomoBuffer(data.controlState.liquidityBuffers.mobileMoney);
        setRiskTolerance(data.controlState.aiPolicy.riskTolerance);
        setAntiSlippage(data.controlState.aiPolicy.antiSlippageEnforced);
        setZkProof(data.controlState.aiPolicy.zkProofRequired);
        setFraudSensitivity(data.controlState.aiPolicy.fraudAutoBlockSensitivity);
      } else {
        throw new Error('Invalid state response from backend server');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Executive Control Units API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchControlState();
  }, []);

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // 1. Toggle Kill-Switch
  const handleToggleKillSwitch = async () => {
    if (!controlState) return;
    const nextEngaged = !controlState.killSwitchEngaged;
    const operator = prompt('Enter Authorizing Executive Operator Name:', 'Chief Governor') || 'Chief Governor';
    const reason = prompt('Reason for Safety Switch Override:', nextEngaged ? 'Preemptive Liquidity Volatility Protection' : 'Normal Operations Resumed') || 'Operational Command';

    setIsTogglingKillSwitch(true);
    try {
      const res = await fetch('/api/v1/institution/kill-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ engaged: nextEngaged, operator, reason })
      });
      const data = await res.json();
      if (data.success && data.controlState) {
        setControlState(data.controlState);
        showFeedback(data.message);
      } else {
        alert(data.error || 'Failed to toggle system kill-switch');
      }
    } catch (err: any) {
      alert(`Kill-switch action failed: ${err.message}`);
    } finally {
      setIsTogglingKillSwitch(false);
    }
  };

  // 2. Commit Buffer Reallocation
  const handleReallocateBuffers = async () => {
    const total = bouBuffer + bankBuffer + momoBuffer;
    if (total !== 100) {
      alert(`Buffers must total exactly 100%. Current sum: ${total}%`);
      return;
    }

    setIsReallocatingBuffers(true);
    try {
      const res = await fetch('/api/v1/institution/reallocate-liquidity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bouRtgs: bouBuffer, commercialBanks: bankBuffer, mobileMoney: momoBuffer })
      });
      const data = await res.json();
      if (data.success) {
        if (controlState) {
          setControlState({
            ...controlState,
            liquidityBuffers: { ...controlState.liquidityBuffers, ...data.buffers }
          });
        }
        showFeedback(data.message);
      } else {
        alert(data.error || 'Failed to reallocate liquidity');
      }
    } catch (err: any) {
      alert(`Reallocation failed: ${err.message}`);
    } finally {
      setIsReallocatingBuffers(false);
    }
  };

  // 3. Execute Batch Settlement
  const handleExecuteBatchSettlement = async () => {
    const operator = prompt('Enter Authorizing Executive Operator Name for Batch Clearance:', 'Chief Settlement Officer') || 'Chief Settlement Officer';
    setIsExecutingBatch(true);
    try {
      const res = await fetch('/api/v1/institution/execute-settlement-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operator })
      });
      const data = await res.json();
      if (data.success && data.batch) {
        if (controlState) {
          setControlState({
            ...controlState,
            lastBatchCleared: data.batch
          });
        }
        showFeedback(data.message);
      } else {
        alert(data.error || 'Batch execution failed');
      }
    } catch (err: any) {
      alert(`Settlement batch execution failed: ${err.message}`);
    } finally {
      setIsExecutingBatch(false);
    }
  };

  // 4. Toggle Gateway Node
  const handleToggleGateway = async (gatewayId: string, currentActive: boolean) => {
    setTogglingGatewayId(gatewayId);
    try {
      const res = await fetch('/api/v1/institution/toggle-gateway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gatewayId, active: !currentActive })
      });
      const data = await res.json();
      if (data.success && data.gateways) {
        if (controlState) {
          setControlState({
            ...controlState,
            gateways: data.gateways
          });
        }
        showFeedback(data.message);
      } else {
        alert(data.error || 'Gateway toggle failed');
      }
    } catch (err: any) {
      alert(`Gateway toggle failed: ${err.message}`);
    } finally {
      setTogglingGatewayId(null);
    }
  };

  // 5. Update AI Policy
  const handleSavePolicy = async () => {
    setIsSavingPolicy(true);
    try {
      const res = await fetch('/api/v1/institution/update-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riskTolerance,
          antiSlippageEnforced: antiSlippage,
          zkProofRequired: zkProof,
          fraudAutoBlockSensitivity: fraudSensitivity
        })
      });
      const data = await res.json();
      if (data.success && data.policy) {
        if (controlState) {
          setControlState({
            ...controlState,
            aiPolicy: data.policy
          });
        }
        showFeedback(data.message);
      } else {
        alert(data.error || 'Failed to update AI policy');
      }
    } catch (err: any) {
      alert(`Policy update failed: ${err.message}`);
    } finally {
      setIsSavingPolicy(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="p-12 text-center space-y-4 bg-[#0A0A0A] border border-[#222222] rounded-3xl min-h-[400px] flex flex-col items-center justify-center">
        <RefreshCw size={36} className="text-[#C8A64D] animate-spin" />
        <p className="text-sm font-mono text-[#A7A7A7]">Syncing Sovereign Executive Control Units...</p>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="p-8 bg-[#1A0909] border-2 border-[#EF4444] rounded-3xl space-y-4 text-center">
        <AlertTriangle size={40} className="text-[#EF4444] mx-auto animate-bounce" />
        <h3 className="text-lg font-bold text-[#FFFFFF]">Executive Control Sync Failed</h3>
        <p className="text-xs font-mono text-[#F87171] max-w-md mx-auto">{error}</p>
        <button
          onClick={fetchControlState}
          className="px-6 py-2.5 rounded-xl bg-[#EF4444] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#DC2626] transition-all flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={14} />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  // EMPTY STATE
  if (!controlState) {
    return (
      <div className="p-12 text-center bg-[#0D0D0D] border border-[#222222] rounded-3xl space-y-3">
        <AlertCircle size={32} className="text-[#777777] mx-auto" />
        <p className="text-sm font-mono text-[#A7A7A7]">No active control units registered on kernel.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* SUCCESS ACTION FEEDBACK BANNER */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-[#06271A] border-2 border-[#10B981] text-[#34D399] font-mono text-xs flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#10B981]" />
              <strong className="font-bold">{actionFeedback}</strong>
            </div>
            <button onClick={() => setActionFeedback(null)} className="text-[#A7A7A7] hover:text-[#FFFFFF]">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safe Demonstration Mode & Intent Governance Audit Banner */}
      <div className="bg-[#120E09] border border-[#C8A64D]/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#C8A64D]/10 border border-[#C8A64D]/20 text-[#C8A64D] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold font-mono text-[#C8A64D] uppercase tracking-wider">
                SAFE DEMONSTRATION MODE & GOVERNANCE MANDATE
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                AUDIT COMPLIANT
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5">
              Zero unprompted automated transactions. All executive commands, liquidity reallocations, and batch settlements mandate <span className="text-[#FFFFFF] font-semibold">Intent Verification → Executive Operator Approval Sign-off → Immutable Audit Log</span>.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: EMERGENCY CIRCUIT BREAKER & SYSTEM KILL-SWITCH */}
      <div className={`p-8 rounded-3xl border-2 transition-all space-y-6 ${
        controlState.killSwitchEngaged 
          ? 'bg-[#1C0505] border-[#EF4444] shadow-[0_0_50px_rgba(239,68,68,0.25)]' 
          : 'bg-[#0B0B0B] border-[#C8A64D]/40 shadow-[0_0_30px_rgba(200,166,77,0.1)]'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-5">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl p-0.5 flex items-center justify-center ${
              controlState.killSwitchEngaged ? 'bg-[#EF4444] text-[#000000]' : 'bg-[#10B981] text-[#000000]'
            }`}>
              <Power size={28} />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#A7A7A7] uppercase font-bold block">
                NATIONAL PAYMENT SYSTEM EMERGENCY SAFETY
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#FFFFFF]">
                Sovereign Kernel Kill-Switch
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 border ${
              controlState.killSwitchEngaged
                ? 'bg-[#380A0A] border-[#EF4444] text-[#F87171]'
                : 'bg-[#06271A] border-[#10B981] text-[#34D399]'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${controlState.killSwitchEngaged ? 'bg-[#EF4444] animate-ping' : 'bg-[#10B981]'}`} />
              <span>{controlState.killSwitchEngaged ? 'EMERGENCY PAUSE ENGAGED' : 'OPERATIONAL (NORMAL)'}</span>
            </div>

            <button
              onClick={handleToggleKillSwitch}
              disabled={isTogglingKillSwitch}
              className={`px-6 py-3 rounded-2xl font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-xl ${
                controlState.killSwitchEngaged
                  ? 'bg-[#10B981] hover:bg-[#059669] text-[#000000]'
                  : 'bg-[#EF4444] hover:bg-[#DC2626] text-[#FFFFFF]'
              }`}
            >
              {isTogglingKillSwitch ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Power size={16} />
              )}
              <span>{controlState.killSwitchEngaged ? 'RESUME NETWORK OPERATIONS' : 'ENGAGE EMERGENCY KILL-SWITCH'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#111111] border border-[#222222] rounded-2xl">
            <span className="text-[10px] text-[#777777] block">AUTHORIZING OPERATOR</span>
            <strong className="text-sm text-[#FFFFFF] font-bold block mt-1">{controlState.killSwitchOperator}</strong>
          </div>
          <div className="p-4 bg-[#111111] border border-[#222222] rounded-2xl">
            <span className="text-[10px] text-[#777777] block">SAFETY REASON</span>
            <strong className="text-sm text-[#C8A64D] font-bold block mt-1">{controlState.killSwitchReason}</strong>
          </div>
          <div className="p-4 bg-[#111111] border border-[#222222] rounded-2xl">
            <span className="text-[10px] text-[#777777] block">CIRCUIT BREAKER STATUS</span>
            <strong className="text-sm text-[#34D399] font-bold block mt-1">ZKP ROLLBACK GUARANTEE ACTIVE</strong>
          </div>
        </div>
      </div>

      {/* SECTION 2: BATCH SETTLEMENT & RECONCILIATION COMMAND UNIT */}
      <div className="p-6 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1810] border border-[#C8A64D] flex items-center justify-center text-[#C8A64D]">
              <Layers size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">ISO 20022 Batch Settlement Engine</h3>
              <p className="text-xs font-mono text-[#777777]">Trigger continuous net clearing & 3-way double-entry ledger reconciliation</p>
            </div>
          </div>

          <button
            onClick={handleExecuteBatchSettlement}
            disabled={isExecutingBatch}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A64D] to-[#E5C76B] text-[#080808] font-mono font-bold text-xs flex items-center gap-2 hover:shadow-[0_0_20px_rgba(200,166,77,0.4)] transition-all"
          >
            {isExecutingBatch ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
            <span>EXECUTE SETTLEMENT BATCH NOW</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#141414] border border-[#222222] rounded-2xl space-y-1">
            <span className="text-[10px] text-[#777777] block">ACTIVE BATCH ID</span>
            <strong className="text-sm text-[#E5C76B] font-bold block">{controlState.lastBatchCleared.batchId}</strong>
          </div>
          <div className="p-4 bg-[#141414] border border-[#222222] rounded-2xl space-y-1">
            <span className="text-[10px] text-[#777777] block">CLEARED VOLUME</span>
            <strong className="text-sm text-[#34D399] font-bold block">{controlState.lastBatchCleared.totalAmountUGX}</strong>
          </div>
          <div className="p-4 bg-[#141414] border border-[#222222] rounded-2xl space-y-1">
            <span className="text-[10px] text-[#777777] block">TRANSACTIONS CLEARED</span>
            <strong className="text-sm text-[#FFFFFF] font-bold block">{controlState.lastBatchCleared.txCount} Messages</strong>
          </div>
          <div className="p-4 bg-[#141414] border border-[#222222] rounded-2xl space-y-1">
            <span className="text-[10px] text-[#777777] block">CLEARING STATUS</span>
            <strong className="text-sm text-[#34D399] font-bold block flex items-center gap-1">
              <CheckCircle2 size={12} /> {controlState.lastBatchCleared.status}
            </strong>
          </div>
        </div>
      </div>

      {/* SECTION 3: LIQUIDITY BUFFER REALLOCATION CONTROL */}
      <div className="p-6 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1810] border border-[#C8A64D] flex items-center justify-center text-[#C8A64D]">
              <Landmark size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">Cross-Rail Liquidity Buffer Allocation</h3>
              <p className="text-xs font-mono text-[#777777]">Dynamically balance reserve allocation ratio across central bank & payment rails</p>
            </div>
          </div>

          <button
            onClick={handleReallocateBuffers}
            disabled={isReallocatingBuffers}
            className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#000000] font-mono font-bold text-xs flex items-center gap-2 transition-all"
          >
            {isReallocatingBuffers ? <RefreshCw size={14} className="animate-spin" /> : <Sliders size={14} />}
            <span>COMMIT BUFFER REALLOCATION</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* BOU RTGS */}
            <div className="p-5 bg-[#141414] border border-[#222222] rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#A7A7A7] font-bold">BOU RTGS Bridge Buffer</span>
                <span className="text-base font-bold text-[#E5C76B]">{bouBuffer}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={80}
                value={bouBuffer}
                onChange={(e) => setBouBuffer(Number(e.target.value))}
                className="w-full accent-[#C8A64D] bg-[#222222] rounded-lg h-2"
              />
              <span className="text-[10px] text-[#777777] block">Central Reserve Buffer Target</span>
            </div>

            {/* COMMERCIAL BANKS */}
            <div className="p-5 bg-[#141414] border border-[#222222] rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#A7A7A7] font-bold">Commercial Banks Buffer</span>
                <span className="text-base font-bold text-[#60A5FA]">{bankBuffer}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={80}
                value={bankBuffer}
                onChange={(e) => setBankBuffer(Number(e.target.value))}
                className="w-full accent-[#60A5FA] bg-[#222222] rounded-lg h-2"
              />
              <span className="text-[10px] text-[#777777] block">Interbank Liquidity Reserves</span>
            </div>

            {/* MOBILE MONEY */}
            <div className="p-5 bg-[#141414] border border-[#222222] rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#A7A7A7] font-bold">Mobile Money MNO Buffer</span>
                <span className="text-base font-bold text-[#34D399]">{momoBuffer}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                value={momoBuffer}
                onChange={(e) => setMomoBuffer(Number(e.target.value))}
                className="w-full accent-[#34D399] bg-[#222222] rounded-lg h-2"
              />
              <span className="text-[10px] text-[#777777] block">MTN & Airtel Float Reserves</span>
            </div>

          </div>

          <div className="p-4 bg-[#141414] border border-[#222222] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-xs">
            <span className="text-[#A7A7A7]">Total Consolidated Liquidity Pool:</span>
            <strong className="text-sm text-[#34D399]">{controlState.liquidityBuffers.totalReserveUGX} UGX</strong>
            <span className={`text-[10px] ${bouBuffer + bankBuffer + momoBuffer === 100 ? 'text-[#34D399]' : 'text-[#EF4444]'}`}>
              Allocation Total: {bouBuffer + bankBuffer + momoBuffer}% {bouBuffer + bankBuffer + momoBuffer === 100 ? '✓ Balanced' : '⚠️ Must sum to 100%'}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 4: GATEWAY OPERATIONAL MESH CONTROLS */}
      <div className="p-6 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-[#222222] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1A1810] border border-[#C8A64D] flex items-center justify-center text-[#C8A64D]">
            <Server size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">Institutional Gateway Mesh Control</h3>
            <p className="text-xs font-mono text-[#777777]">Individual node operational toggles & latency health monitor</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {controlState.gateways.map((gw) => (
            <div key={gw.id} className="p-5 bg-[#141414] border border-[#222222] rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-sm text-[#FFFFFF] block font-sans font-bold">{gw.name}</strong>
                  <span className="text-[10px] text-[#777777]">{gw.id}</span>
                </div>
                <button
                  onClick={() => handleToggleGateway(gw.id, gw.active)}
                  disabled={togglingGatewayId === gw.id}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    gw.active ? 'bg-[#10B981]' : 'bg-[#333333]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-[#FFFFFF] transition-transform ${
                    gw.active ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="pt-2 border-t border-[#222222] flex justify-between text-[11px]">
                <span className="text-[#A7A7A7]">Status:</span>
                <span className={gw.active ? 'text-[#34D399] font-bold' : 'text-[#EF4444] font-bold'}>
                  {gw.status}
                </span>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-[#A7A7A7]">Latency / Uptime:</span>
                <span className="text-[#C8A64D]">{gw.latencyMs} ms • {gw.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: AI GOVERNANCE & POLICY RULES OVERRIDE */}
      <div className="p-6 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1810] border border-[#C8A64D] flex items-center justify-center text-[#C8A64D]">
              <Scale size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">AI Governance & Policy Rule Overrides</h3>
              <p className="text-xs font-mono text-[#777777]">Set regulatory risk boundaries, fraud thresholds, and ZK verification rules</p>
            </div>
          </div>

          <button
            onClick={handleSavePolicy}
            disabled={isSavingPolicy}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A64D] to-[#E5C76B] text-[#080808] font-mono font-bold text-xs flex items-center gap-2 hover:shadow-[0_0_20px_rgba(200,166,77,0.4)] transition-all"
          >
            {isSavingPolicy ? <RefreshCw size={14} className="animate-spin" /> : <Settings size={14} />}
            <span>COMPILE POLICY RULES</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          
          <div className="p-5 bg-[#141414] border border-[#222222] rounded-2xl space-y-3">
            <label className="text-[#A7A7A7] font-bold block">Autonomous Risk Tolerance Boundary</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl text-xs focus:border-[#C8A64D] outline-none"
            >
              <option value="CONSERVATIVE_ZERO_LOSS">CONSERVATIVE (Zero Loss Tolerance)</option>
              <option value="MEDIUM_STRICT">MEDIUM STRICT (Default BOU Regulatory Standard)</option>
              <option value="BALANCED_GROWTH">BALANCED (Higher Autonomous Velocity)</option>
            </select>
            <p className="text-[10px] text-[#777777]">Controls autonomous rerouting & agent authorization parameters.</p>
          </div>

          <div className="p-5 bg-[#141414] border border-[#222222] rounded-2xl space-y-3">
            <label className="text-[#A7A7A7] font-bold block">Fraud Detection Auto-Block Sensitivity</label>
            <select
              value={fraudSensitivity}
              onChange={(e) => setFraudSensitivity(e.target.value)}
              className="w-full bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl text-xs focus:border-[#C8A64D] outline-none"
            >
              <option value="HIGH_95">HIGH (95%+ Confidence Threshold)</option>
              <option value="VERY_HIGH_99">VERY HIGH (99%+ Strict Central Bank Isolation)</option>
              <option value="MODERATE_85">MODERATE (85%+ Standard Checks)</option>
            </select>
            <p className="text-[10px] text-[#777777]">Automatically freezes suspicious payments violating behavioral patterns.</p>
          </div>

          <div className="p-5 bg-[#141414] border border-[#222222] rounded-2xl flex items-center justify-between">
            <div>
              <strong className="text-[#FFFFFF] block font-bold">Enforce Zero-Slippage Guarantee</strong>
              <span className="text-[10px] text-[#777777]">Reject routes exceeding 0.01% exchange slippage</span>
            </div>
            <button
              onClick={() => setAntiSlippage(!antiSlippage)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                antiSlippage ? 'bg-[#10B981]' : 'bg-[#333333]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full bg-[#FFFFFF] transition-transform ${
                antiSlippage ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="p-5 bg-[#141414] border border-[#222222] rounded-2xl flex items-center justify-between">
            <div>
              <strong className="text-[#FFFFFF] block font-bold">Require ZK-SNARK Privacy Proofs</strong>
              <span className="text-[10px] text-[#777777]">Mask PII and payload details with cryptographic proofs</span>
            </div>
            <button
              onClick={() => setZkProof(!zkProof)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                zkProof ? 'bg-[#10B981]' : 'bg-[#333333]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full bg-[#FFFFFF] transition-transform ${
                zkProof ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
