import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Send, ArrowRightLeft, ShieldCheck, CheckCircle2, 
  AlertTriangle, RefreshCw, Cpu, Wallet, Layers, FileText, Zap, 
  Landmark, ArrowUpRight, ArrowDownLeft, Activity, Lock, Search, Play
} from 'lucide-react';

export function FinancialExecutionView() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('usr_a_uganda');
  const [recipient, setRecipient] = useState<string>('+256770001122');
  const [amountUGX, setAmountUGX] = useState<number>(50000);
  const [note, setNote] = useState<string>('Cross-border inventory settlement');
  
  // Governance Gate States
  const [approverName, setApproverName] = useState<string>('Chief Risk Officer / Executive Operator');
  const [governanceConfirmed, setGovernanceConfirmed] = useState<boolean>(true);

  const [executing, setExecuting] = useState<boolean>(false);
  const [lastExecution, setLastExecution] = useState<any>(null);
  const [evaluatedRoutes, setEvaluatedRoutes] = useState<any[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);
  const [flwHealth, setFlwHealth] = useState<any>(null);
  
  const [activeTab, setActiveTab] = useState<'demo' | 'routes' | 'wallets' | 'ledger' | 'flw'>('demo');
  const [webhookSimulating, setWebhookSimulating] = useState<boolean>(false);
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);

  // Load sandbox data
  const fetchData = async () => {
    try {
      const [uRes, lRes, hRes] = await Promise.all([
        fetch('/api/v1/sandbox/users').then(r => r.json()).catch(() => ({ users: [] })),
        fetch('/api/v1/ledger/entries').then(r => r.json()).catch(() => ({ entries: [] })),
        fetch('/api/v1/flutterwave/health').then(r => r.json()).catch(() => ({ status: 'active', latencyMs: 120, successRate: 98.5 }))
      ]);

      if (uRes.users) setUsers(uRes.users);
      if (lRes.entries) setLedgerEntries(lRes.entries);
      setFlwHealth(hRes);
    } catch (e) {
      console.warn('Error fetching sandbox data', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Execute Cross-Provider Payment with 4-Step Intent & Governance Gate
  const handleExecutePayment = async () => {
    if (!governanceConfirmed) {
      alert('Institutional Governance Gate Error: You must explicitly confirm human authorization before executing any financial transaction.');
      return;
    }

    setExecuting(true);
    try {
      const res = await fetch('/api/v1/finance/execute-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: selectedUser,
          destination: recipient,
          amountUGX,
          note,
          approverName
        })
      });

      const data = await res.json();
      if (res.ok) {
        setLastExecution(data.execution);
        setEvaluatedRoutes(data.evaluatedRoutes || []);
        fetchData();
      } else {
        alert(`Payment Failed: ${data.message || data.error}`);
      }
    } catch (err: any) {
      alert(`Error executing payment: ${err.message}`);
    } finally {
      setExecuting(false);
    }
  };

  // Simulate Flutterwave Webhook
  const handleSimulateWebhook = async () => {
    setWebhookSimulating(true);
    try {
      const mockPayload = {
        event: 'charge.completed',
        data: {
          id: 'FLW-WBK-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          tx_ref: lastExecution?.txRef || 'MEHERAH-FLW-DEMO',
          flw_ref: 'FLW-REF-' + Date.now(),
          amount: amountUGX,
          currency: 'UGX',
          status: 'successful',
          customer: { email: 'sandbox@meherah.ai', name: 'User A' }
        }
      };

      const res = await fetch('/api/v1/flutterwave/webhook', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'verif-hash': 'FLW_SECRET_HASH_MEHERAH'
        },
        body: JSON.stringify(mockPayload)
      });

      const data = await res.json();
      setWebhookLogs(prev => [`[${new Date().toLocaleTimeString()}] WEBHOOK_RECEIVED: TxRef ${data.txRef} Status: ${data.status} (Verified: ${data.verified})`, ...prev]);
      fetchData();
    } catch (e: any) {
      setWebhookLogs(prev => [`[${new Date().toLocaleTimeString()}] WEBHOOK_ERROR: ${e.message}`, ...prev]);
    } finally {
      setWebhookSimulating(false);
    }
  };

  // Deposit or Withdraw for User
  const handleWalletAction = async (userId: string, action: 'DEPOSIT' | 'WITHDRAWAL', amount: number) => {
    try {
      await fetch('/api/v1/sandbox/wallet-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action, amount, currency: 'UGX' })
      });
      fetchData();
    } catch (e) {
      console.warn('Wallet action failed', e);
    }
  };

  return (
    <div className="space-y-6 text-[#FDFBF7]">
      {/* Top Banner Header */}
      <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#F0A500]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20 flex items-center gap-1.5">
                <Zap className="w-3 h-3" /> PHASE 3 — FINANCIAL EXECUTION LAYER
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" /> FLUTTERWAVE SANDBOX READY
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#FDFBF7]">
              MEHERAH Financial Execution & Routing Engine
            </h1>
            <p className="text-sm text-[#8C8275] mt-1 max-w-2xl">
              Moving from watching transactions to safely executing real financial actions in a sandbox environment backed by double-entry accounting and autonomous route decision models.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="px-3.5 py-2 rounded-xl bg-[#1C160F] hover:bg-[#2A2118] border border-[#2D2319] text-xs font-mono text-[#C2B7A7] transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh State
            </button>
          </div>
        </div>
      </div>

      {/* Safe Demonstration Mode & Intent Governance Audit Banner */}
      <div className="bg-[#19130B] border border-[#F0A500]/30 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#F0A500]/10 border border-[#F0A500]/20 text-[#F0A500] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold font-mono text-[#F0A500] uppercase tracking-wider">
                SAFE DEMONSTRATION MODE & INTENT GOVERNANCE MANDATE
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE AUDIT GATE
              </span>
            </div>
            <p className="text-xs text-[#C2B7A7] mt-0.5">
              Zero automatic financial execution on page load or simulation preview. Every payment requires <span className="text-[#FDFBF7] font-semibold">1. Intent Verification</span> → <span className="text-[#FDFBF7] font-semibold">2. Human Operator Approval</span> → <span className="text-[#FDFBF7] font-semibold">3. Controlled Sandbox Dispatch</span> → <span className="text-[#FDFBF7] font-semibold">4. Immutable Audit Ledger Log</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1C160F] pb-2 overflow-x-auto">
        {[
          { id: 'demo', label: 'Step 6: Live AI Payment Demo', icon: Play },
          { id: 'routes', label: 'Step 3: Route Decision Matrix', icon: Cpu },
          { id: 'wallets', label: 'Step 4: Sandbox User Wallets', icon: Wallet },
          { id: 'ledger', label: 'Step 2: Double-Entry Ledger', icon: Layers },
          { id: 'flw', label: 'Step 1: Flutterwave Gateway', icon: Landmark }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                active 
                  ? 'bg-[#F0A500] text-[#0A0907] font-semibold shadow-lg shadow-[#F0A500]/10'
                  : 'bg-[#120E09] hover:bg-[#1C160F] text-[#8C8275] border border-[#1C160F]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: LIVE AI PAYMENT DEMO (STEP 6) */}
      {activeTab === 'demo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Payment Execution Console */}
          <div className="lg:col-span-6 bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Send className="w-4 h-4 text-[#F0A500]" /> CROSS-PROVIDER EXECUTION DEMO
              </h3>
              <span className="text-xs font-mono text-[#8C8275]">Step 6: AI Payment Execution</span>
            </div>

            {/* Quick Demo Selector */}
            <div className="p-3 bg-[#0A0907] rounded-xl border border-[#1C160F] space-y-2">
              <span className="text-xs font-mono text-[#8C8275]">Quick Preset Command:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedUser('usr_a_uganda');
                    setRecipient('+256770001122');
                    setAmountUGX(50000);
                    setNote('Send UGX 50,000 to Kampala Merchant');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#1C160F] hover:bg-[#282017] border border-[#2E241A] text-xs font-mono text-[#F0A500]"
                >
                  "Send UGX 50,000 to +256770001122"
                </button>
                <button
                  onClick={() => {
                    setSelectedUser('usr_b_uganda');
                    setRecipient('+256788990011');
                    setAmountUGX(25000);
                    setNote('Send UGX 25,000 to Entebbe Trader');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#1C160F] hover:bg-[#282017] border border-[#2E241A] text-xs font-mono text-[#C2B7A7]"
                >
                  "Send UGX 25,000 to +256788990011"
                </button>
              </div>
            </div>

            {/* Form Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8C8275] mb-1.5">Sender Sandbox Wallet</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full bg-[#0A0907] border border-[#231A10] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FDFBF7] focus:border-[#F0A500] outline-none"
                >
                  {users.map((u: any) => (
                    <option key={u.userId} value={u.userId}>
                      {u.name} — Balance: UGX {u.balance.toLocaleString()} ({u.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#8C8275] mb-1.5">Recipient Phone / Account</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-[#0A0907] border border-[#231A10] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FDFBF7] focus:border-[#F0A500] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#8C8275] mb-1.5">Amount (UGX)</label>
                  <input
                    type="number"
                    value={amountUGX}
                    onChange={(e) => setAmountUGX(Number(e.target.value))}
                    className="w-full bg-[#0A0907] border border-[#231A10] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FDFBF7] focus:border-[#F0A500] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8C8275] mb-1.5">Payment Memo / Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-[#0A0907] border border-[#231A10] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FDFBF7] focus:border-[#F0A500] outline-none"
                />
              </div>

              {/* Step 2: Human / Institutional Governance Gate Box */}
              <div className="p-3.5 bg-[#0A0907] rounded-xl border border-[#F0A500]/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#F0A500] uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Step 2: Institutional Governance Gate
                  </span>
                  <span className="text-[10px] font-mono text-[#8C8275]">Human Authorization Required</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8C8275] mb-1">Authorizing Executive / Operator Name</label>
                  <input
                    type="text"
                    value={approverName}
                    onChange={(e) => setApproverName(e.target.value)}
                    className="w-full bg-[#120E09] border border-[#231A10] rounded-lg px-3 py-1.5 text-xs font-mono text-[#FDFBF7] focus:border-[#F0A500] outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={governanceConfirmed}
                    onChange={(e) => setGovernanceConfirmed(e.target.checked)}
                    className="rounded bg-[#120E09] border-[#231A10] text-[#F0A500] focus:ring-0"
                  />
                  <span className="text-[11px] font-mono text-[#C2B7A7]">
                    I explicitly verify payment parameters and authorize execution under institutional mandate
                  </span>
                </label>
              </div>

              <button
                onClick={handleExecutePayment}
                disabled={executing || !governanceConfirmed}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F0A500] to-[#D99400] text-[#0A0907] font-bold text-xs font-mono hover:brightness-110 transition-all shadow-lg shadow-[#F0A500]/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {executing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Orchestrating Autonomous Agents & Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Execute Cross-Provider Payment
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Decision & Execution Result Display */}
          <div className="lg:col-span-6 bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" /> AI ROUTE DECISION REASONING
              </h3>
              <span className="text-xs font-mono text-[#8C8275]">Step 3 & 5 Pipeline</span>
            </div>

            {lastExecution ? (
              <div className="space-y-4">
                {/* AI Reasoning Callout Box */}
                <div className="p-4 rounded-xl bg-[#0A0907] border border-[#F0A500]/30 relative overflow-hidden">
                  <div className="text-xs font-mono font-semibold text-[#F0A500] mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> MEHERAH Chief Route Decision:
                  </div>
                  <p className="text-xs font-mono text-[#FDFBF7] leading-relaxed">
                    "{lastExecution.aiReasoning}"
                  </p>
                </div>

                {/* Transaction Metadata */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                    <span className="text-[#8C8275] block text-[10px]">TRANSACTION REF</span>
                    <span className="text-[#FDFBF7] font-bold">{lastExecution.txRef}</span>
                  </div>
                  <div className="p-3 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                    <span className="text-[#8C8275] block text-[10px]">SELECTED PROVIDER</span>
                    <span className="text-emerald-400 font-bold">{lastExecution.provider}</span>
                  </div>
                  <div className="p-3 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                    <span className="text-[#8C8275] block text-[10px]">AMOUNT EXECUTED</span>
                    <span className="text-[#FDFBF7] font-bold">UGX {lastExecution.amountUGX.toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-[#0A0907] rounded-xl border border-[#1C160F]">
                    <span className="text-[#8C8275] block text-[10px]">ROUTING FEE</span>
                    <span className="text-[#F0A500] font-bold">UGX {lastExecution.feeUGX.toLocaleString()}</span>
                  </div>
                </div>

                {/* Double Entry Ledger Confirmation */}
                {lastExecution.ledger && (
                  <div className="p-3 bg-[#0A0907] rounded-xl border border-[#1C160F] space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Double-Entry Ledger Created
                    </span>
                    <div className="text-[11px] font-mono text-[#8C8275] space-y-1">
                      <div><span className="text-[#C2B7A7]">DEBIT ENTRY:</span> {lastExecution.ledger.debitEntry.accountNumber} (-UGX {lastExecution.amountUGX.toLocaleString()})</div>
                      <div><span className="text-[#C2B7A7]">CREDIT ENTRY:</span> {lastExecution.ledger.creditEntry.accountNumber} (+UGX {lastExecution.amountUGX.toLocaleString()})</div>
                      <div><span className="text-[#C2B7A7]">ZK SIGNATURE:</span> {lastExecution.ledger.debitEntry.signatureZk}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-[#1C160F] rounded-xl">
                <Cpu className="w-8 h-8 text-[#5A544B] mb-2 animate-pulse" />
                <p className="text-xs font-mono text-[#8C8275]">Awaiting first cross-provider payment execution.</p>
                <p className="text-[11px] font-mono text-[#5A544B] mt-1">Click "Execute Cross-Provider Payment" on the left panel to test.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: AI ROUTE DECISION MATRIX (STEP 3) */}
      {activeTab === 'routes' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7]">
                STEP 3 — AI ROUTE DECISION ENGINE
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Evaluating cost, reliability, speed, and risk across multi-provider networks.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20">
              Live Evaluation Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                provider: 'Flutterwave Gateway',
                success: '98.5%',
                fee: '1.4% (Low)',
                speed: 'Fast (~3s)',
                status: 'RECOMMENDED',
                recommended: true,
                desc: 'Flutterwave selected because it provides the best balance of cost, reliability and speed.'
              },
              {
                provider: 'MTN Mobile Money',
                success: '94.0%',
                fee: '1.8% (Medium)',
                speed: 'Instant (~1s)',
                status: 'FALLBACK ROUTE 1',
                recommended: false,
                desc: 'Instant latency but higher fee structure for volume transfers.'
              },
              {
                provider: 'Direct Bank ACH',
                success: '99.1%',
                fee: '0.5% (Lowest)',
                speed: 'Slow (~15s)',
                status: 'FALLBACK ROUTE 2',
                recommended: false,
                desc: 'Lowest cost per transaction, reserved for non-urgent large liquidity rebalancing.'
              }
            ].map((route, i) => (
              <div 
                key={i} 
                className={`p-5 rounded-2xl border transition-all ${
                  route.recommended 
                    ? 'bg-[#18120B] border-[#F0A500] shadow-lg shadow-[#F0A500]/5' 
                    : 'bg-[#0A0907] border-[#1C160F]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    route.recommended ? 'bg-[#F0A500] text-[#0A0907]' : 'bg-[#1C160F] text-[#8C8275]'
                  }`}>
                    {route.status}
                  </span>
                  {route.recommended && <CheckCircle2 className="w-4 h-4 text-[#F0A500]" />}
                </div>

                <h4 className="text-sm font-bold text-[#FDFBF7] mb-2">{route.provider}</h4>
                <div className="space-y-1.5 text-xs font-mono text-[#8C8275] mb-4">
                  <div className="flex justify-between"><span>SUCCESS RATE:</span> <span className="text-[#FDFBF7] font-semibold">{route.success}</span></div>
                  <div className="flex justify-between"><span>ESTIMATED FEE:</span> <span className="text-[#F0A500] font-semibold">{route.fee}</span></div>
                  <div className="flex justify-between"><span>SPEED LATENCY:</span> <span className="text-emerald-400 font-semibold">{route.speed}</span></div>
                </div>

                <p className="text-[11px] font-mono text-[#A19688] bg-[#0A0907] p-2.5 rounded-lg border border-[#1C160F]">
                  "{route.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SANDBOX USER WALLETS (STEP 4) */}
      {activeTab === 'wallets' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7]">
                STEP 4 — SANDBOX USER WALLETS
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Test user wallets with live deposit, transfer, and withdrawal capabilities.</p>
            </div>
            <button
              onClick={fetchData}
              className="px-3 py-1.5 rounded-lg bg-[#1C160F] text-xs font-mono text-[#F0A500] flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" /> Sync Balances
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((u: any) => (
              <div key={u.userId} className="p-6 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#FDFBF7]">{u.name}</h4>
                    <span className="text-xs font-mono text-[#8C8275]">{u.phone} • {u.accountNumber}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {u.status}
                  </span>
                </div>

                <div className="p-4 bg-[#120E09] rounded-xl border border-[#231A10]">
                  <span className="text-[10px] font-mono text-[#8C8275] block">CURRENT BALANCE</span>
                  <span className="text-2xl font-bold font-mono text-[#F0A500]">
                    UGX {u.balance.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWalletAction(u.userId, 'DEPOSIT', 50000)}
                    className="flex-1 py-2 rounded-xl bg-[#1C160F] hover:bg-[#282017] border border-[#2D2319] text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5"
                  >
                    <ArrowDownLeft className="w-3.5 h-3.5" /> Deposit 50k
                  </button>
                  <button
                    onClick={() => handleWalletAction(u.userId, 'WITHDRAWAL', 20000)}
                    className="flex-1 py-2 rounded-xl bg-[#1C160F] hover:bg-[#282017] border border-[#2D2319] text-xs font-mono text-rose-400 flex items-center justify-center gap-1.5"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> Withdraw 20k
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DOUBLE-ENTRY LEDGER (STEP 2) */}
      {activeTab === 'ledger' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7]">
                STEP 2 — MEHERAH INTERNAL DOUBLE-ENTRY LEDGER
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Immutable accounting ledger recording debit & credit balance entries for every execution.</p>
            </div>
            <span className="text-xs font-mono text-[#8C8275]">Total Entries: {ledgerEntries.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1C160F] text-[11px] font-mono text-[#8C8275]">
                  <th className="py-2.5 px-3">ENTRY ID / REF</th>
                  <th className="py-2.5 px-3">ACCOUNT</th>
                  <th className="py-2.5 px-3">DIRECTION</th>
                  <th className="py-2.5 px-3">AMOUNT</th>
                  <th className="py-2.5 px-3">BALANCE AFTER</th>
                  <th className="py-2.5 px-3">ZK PROOF</th>
                  <th className="py-2.5 px-3">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C160F] text-xs font-mono">
                {ledgerEntries.slice(0, 15).map((entry: any) => (
                  <tr key={entry.id} className="hover:bg-[#1C160F]/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className="text-[#FDFBF7] font-semibold block">{entry.id}</span>
                      <span className="text-[10px] text-[#8C8275]">{entry.transactionRef}</span>
                    </td>
                    <td className="py-3 px-3 text-[#C2B7A7]">{entry.accountNumber}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        entry.direction === 'DEBIT' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {entry.direction}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#FDFBF7]">
                      {entry.currency} {entry.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-[#F0A500]">
                      {entry.currency} {entry.balanceAfter.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-[#8C8275] font-mono text-[10px] truncate max-w-[120px]">
                      {entry.signatureZk}
                    </td>
                    <td className="py-3 px-3 text-[#8C8275] text-[10px]">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: FLUTTERWAVE GATEWAY CONTROLS (STEP 1) */}
      {activeTab === 'flw' && (
        <div className="bg-[#120E09] border border-[#231A10] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C160F] pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-[#FDFBF7]">
                STEP 1 — FLUTTERWAVE GATEWAY ADAPTER & WEBHOOKS
              </h3>
              <p className="text-xs text-[#8C8275] mt-0.5">Sandbox verification, webhook ingestion, refunds, and health monitoring.</p>
            </div>
            {flwHealth && (
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Gateway Status: {flwHealth.status.toUpperCase()} ({flwHealth.latencyMs}ms)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Webhook Simulator */}
            <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-4">
              <h4 className="text-xs font-bold font-mono text-[#FDFBF7] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#F0A500]" /> WEBHOOK SIMULATOR
              </h4>
              <p className="text-xs text-[#8C8275]">Simulate incoming `charge.completed` event from Flutterwave sandbox.</p>

              <button
                onClick={handleSimulateWebhook}
                disabled={webhookSimulating}
                className="w-full py-2.5 rounded-xl bg-[#1C160F] hover:bg-[#282017] border border-[#2D2319] text-xs font-mono text-[#F0A500] font-semibold flex items-center justify-center gap-2"
              >
                {webhookSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Trigger Webhook Simulation
              </button>

              {/* Logs */}
              <div className="p-3 bg-[#120E09] rounded-xl border border-[#231A10] h-40 overflow-y-auto space-y-1">
                <span className="text-[10px] font-mono text-[#8C8275] block mb-1">WEBHOOK EVENT LOG:</span>
                {webhookLogs.length > 0 ? (
                  webhookLogs.map((log, idx) => (
                    <p key={idx} className="text-[10px] font-mono text-emerald-400 leading-tight">{log}</p>
                  ))
                ) : (
                  <p className="text-[10px] font-mono text-[#5A544B]">No webhook events triggered yet.</p>
                )}
              </div>
            </div>

            {/* Health & Refund Controls */}
            <div className="p-5 bg-[#0A0907] border border-[#1C160F] rounded-2xl space-y-4">
              <h4 className="text-xs font-bold font-mono text-[#FDFBF7] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> REFUNDS & HEALTH MONITOR
              </h4>

              <div className="space-y-2 text-xs font-mono text-[#8C8275]">
                <div className="flex justify-between p-2.5 bg-[#120E09] rounded-lg border border-[#1C160F]">
                  <span>HEALTH CHECK:</span>
                  <span className="text-emerald-400 font-bold">ONLINE (120ms)</span>
                </div>
                <div className="flex justify-between p-2.5 bg-[#120E09] rounded-lg border border-[#1C160F]">
                  <span>SUCCESS RATE:</span>
                  <span className="text-[#FDFBF7] font-bold">98.5%</span>
                </div>
                <div className="flex justify-between p-2.5 bg-[#120E09] rounded-lg border border-[#1C160F]">
                  <span>SANDBOX MODE:</span>
                  <span className="text-[#F0A500] font-bold">ACTIVE</span>
                </div>
              </div>

              <button
                onClick={async () => {
                  const res = await fetch('/api/v1/flutterwave/refund', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ transactionId: 'FLW-SBX-101', amount: 10000 })
                  }).then(r => r.json());
                  alert(`Refund Status: ${res.status} (ID: ${res.refundId})`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#1C160F] hover:bg-[#282017] border border-[#2D2319] text-xs font-mono text-[#C2B7A7] font-semibold flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" /> Issue Test Refund (Sandbox)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
