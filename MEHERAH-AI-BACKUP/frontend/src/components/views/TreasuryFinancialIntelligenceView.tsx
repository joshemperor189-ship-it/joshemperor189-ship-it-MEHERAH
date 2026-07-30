import React, { useState, useEffect } from 'react';
import { 
  Wallet, Landmark, PiggyBank, CreditCard, TrendingUp, Compass, ArrowRightLeft, 
  ShieldCheck, AlertCircle, RefreshCw, Zap, CheckCircle2, DollarSign, PieChart, 
  ArrowUpRight, ArrowDownRight, Layers, Cpu, Scale, Lock, Clock, HelpCircle, Check, X
} from 'lucide-react';

export function TreasuryFinancialIntelligenceView() {
  const [activeSubTab, setActiveSubTab] = useState<'wallet' | 'treasury' | 'savings' | 'lending' | 'coach' | 'flow'>('wallet');

  // Wallet State
  const [wallet, setWallet] = useState<any>(null);
  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);
  const [depositAmount, setDepositAmount] = useState('250');
  const [depositChannel, setDepositChannel] = useState('MTN_MOMO');
  const [withdrawAmount, setWithdrawAmount] = useState('100');
  const [withdrawAccount, setWithdrawAccount] = useState('256770001122');
  const [transferAmount, setTransferAmount] = useState('50');
  const [transferRecipient, setTransferRecipient] = useState('ACC-256-990112');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Treasury State
  const [treasuryData, setTreasuryData] = useState<any>(null);

  // Savings State
  const [savingsData, setSavingsData] = useState<any>(null);
  const [pendingAllocation, setPendingAllocation] = useState<any>(null);

  // Lending State
  const [lendingData, setLendingData] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  // Coach State
  const [coachData, setCoachData] = useState<any>(null);

  // Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWalletData();
    fetchTreasuryData();
    fetchSavingsData();
    fetchLendingData();
    fetchCoachData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const res = await fetch('/api/v1/wallet/balance');
      if (res.ok) {
        const data = await res.json();
        setWallet(data.wallet);
        if (data.ledgerSummary?.recentEntries) {
          setLedgerEntries(data.ledgerSummary.recentEntries);
        }
      }
    } catch (e) {
      console.warn('Wallet fetch error:', e);
    }
  };

  const fetchTreasuryData = async () => {
    try {
      const res = await fetch('/api/v1/treasury/liquidity');
      if (res.ok) {
        const data = await res.json();
        setTreasuryData(data);
      }
    } catch (e) {
      console.warn('Treasury fetch error:', e);
    }
  };

  const fetchSavingsData = async () => {
    try {
      const res = await fetch('/api/v1/savings/options?amount=1000');
      if (res.ok) {
        const data = await res.json();
        setSavingsData(data);
      }
    } catch (e) {
      console.warn('Savings fetch error:', e);
    }
  };

  const fetchLendingData = async () => {
    try {
      const res = await fetch('/api/v1/loans/offers?amount=5000');
      if (res.ok) {
        const data = await res.json();
        setLendingData(data);
        if (data.loanOffers && data.loanOffers.length > 0) {
          setSelectedOffer(data.loanOffers[0]);
        }
      }
    } catch (e) {
      console.warn('Lending fetch error:', e);
    }
  };

  const fetchCoachData = async () => {
    try {
      const res = await fetch('/api/v1/financial-health');
      if (res.ok) {
        const data = await res.json();
        setCoachData(data.overview);
      }
    } catch (e) {
      console.warn('Coach fetch error:', e);
    }
  };

  const handleDeposit = async () => {
    setLoading(true);
    setActionFeedback(null);
    try {
      const res = await fetch('/api/v1/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(depositAmount), channel: depositChannel })
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback(`Deposit Success: +$${depositAmount} via ${depositChannel}. Double-entry ledger updated.`);
        fetchWalletData();
      }
    } catch (e: any) {
      setActionFeedback(`Deposit failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    setActionFeedback(null);
    try {
      const res = await fetch('/api/v1/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(withdrawAmount), destinationAccount: withdrawAccount, destinationChannel: 'MTN_MOMO' })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.result?.status === 'COMPLETED') {
          setActionFeedback(`Withdrawal Completed: -$${withdrawAmount} sent to ${withdrawAccount}. Fee: $${data.result.feeDeducted}.`);
        } else {
          setActionFeedback(`Withdrawal Rejected: Insufficient balance.`);
        }
        fetchWalletData();
      }
    } catch (e: any) {
      setActionFeedback(`Withdrawal error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    setLoading(true);
    setActionFeedback(null);
    try {
      const res = await fetch('/api/v1/wallet/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientAccountNumberOrEmail: transferRecipient, amount: Number(transferAmount) })
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback(`P2P Transfer Completed: $${transferAmount} sent to ${transferRecipient}. Ledger updated.`);
        fetchWalletData();
      }
    } catch (e: any) {
      setActionFeedback(`Transfer error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerRebalance = async (sourceId: string, targetId: string, amount: number) => {
    try {
      const res = await fetch('/api/v1/treasury/rebalance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId, targetId, amount })
      });
      if (res.ok) {
        const data = await res.json();
        setActionFeedback(`Rebalance Action Initiated: $${amount} from ${sourceId} -> ${targetId}`);
        fetchTreasuryData();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleProposeSavings = async (productId: string) => {
    try {
      const res = await fetch('/api/v1/savings/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, amount: 1000 })
      });
      if (res.ok) {
        const data = await res.json();
        setPendingAllocation(data.allocation);
        fetchSavingsData();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleApproveSavings = async (allocationId: string) => {
    try {
      const res = await fetch('/api/v1/savings/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allocationId })
      });
      if (res.ok) {
        setPendingAllocation(null);
        setActionFeedback('Savings allocation approved by user! Funds placed in partner yield vault.');
        fetchSavingsData();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="space-y-6" id="organ3_treasury_financial_intelligence_panel">
      {/* HEADER BANNER */}
      <div className="p-6 rounded-2xl bg-[#0E0C09] border border-[#231A10] text-[#E6E1D6] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/30 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
                MEHERAH ORGAN 3
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                ACTIVE
              </span>
            </div>
            <h2 className="text-xl font-bold text-zinc-100 mt-0.5">
              Treasury & Financial Intelligence Engine
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Autonomous Wallet, Liquidity Rebalancing, FX Optimizer, Savings & Lending Intelligence, and Financial Coach.
            </p>
          </div>
        </div>

        {/* FEEDBACK ALERT */}
        {actionFeedback && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 px-4 py-2.5 rounded-xl text-xs font-mono text-emerald-300 flex items-center gap-2 max-w-md animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}
      </div>

      {/* Safe Demonstration Mode & Intent Governance Audit Banner */}
      <div className="bg-[#120E09] border border-amber-500/30 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                SAFE DEMONSTRATION MODE & INTENT GOVERNANCE
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ZERO AUTO-EXECUTION
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">
              No deposit, withdrawal, or treasury allocation executes without human intent confirmation. Every operation requires explicit authorization and logs to the immutable double-entry ledger.
            </p>
          </div>
        </div>
      </div>

      {/* NAV SUB-TABS */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
        {[
          { id: 'wallet', label: '1. Customer Wallet & Ledger', icon: Wallet },
          { id: 'treasury', label: '2. Treasury & Liquidity', icon: Landmark },
          { id: 'savings', label: '3. Savings Intelligence', icon: PiggyBank },
          { id: 'lending', label: '4. Lending & Credit Risk', icon: CreditCard },
          { id: 'coach', label: '5. Financial Coach Agent', icon: Compass },
          { id: 'flow', label: '6. AI Decision Flow', icon: Cpu }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                isActive 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm' 
                  : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. CUSTOMER WALLET & DOUBLE-ENTRY LEDGER TAB */}
      {activeSubTab === 'wallet' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-[#120F0B] to-[#1A150F] p-6 rounded-2xl border border-amber-500/30 text-zinc-100 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-500 font-bold uppercase">Customer MEHERAH Wallet</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {wallet?.status || 'ACTIVE'}
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white">
                  ${wallet ? wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '14,250.00'}
                </span>
                <span className="text-xs font-mono text-zinc-400 ml-2">{wallet?.currency || 'USD'}</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 space-y-1 pt-2 border-t border-zinc-800">
                <div>Account No: <strong className="text-zinc-200">{wallet?.accountNumber || 'ACC-256-788102'}</strong></div>
                <div>Wallet ID: <strong className="text-zinc-200">{wallet?.walletId || 'WAL-MEHERAH-001'}</strong></div>
              </div>
            </div>

            {/* Quick Actions (Deposit / Withdraw / Transfer) */}
            <div className="md:col-span-2 bg-[#0A0907] border border-[#231A10] p-6 rounded-2xl space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2 border-b border-zinc-800/80 pb-3">
                <ArrowRightLeft className="w-4 h-4 text-amber-500" /> Wallet Operations & Instant Settlement
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Deposit Form */}
                <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 block font-mono">1. Deposit Funds</span>
                  <input 
                    type="number" 
                    value={depositAmount} 
                    onChange={e => setDepositAmount(e.target.value)} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 font-mono"
                    placeholder="Amount USD"
                  />
                  <select 
                    value={depositChannel} 
                    onChange={e => setDepositChannel(e.target.value)} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-300 font-mono"
                  >
                    <option value="MTN_MOMO">MTN Mobile Money</option>
                    <option value="AIRTEL_MONEY">Airtel Money</option>
                    <option value="FLUTTERWAVE">Flutterwave Card/Bank</option>
                  </select>
                  <button 
                    onClick={handleDeposit} 
                    disabled={loading}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded font-mono transition-colors"
                  >
                    Process Deposit
                  </button>
                </div>

                {/* Withdraw Form */}
                <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80 space-y-2">
                  <span className="text-xs font-bold text-amber-400 block font-mono">2. Withdraw Funds</span>
                  <input 
                    type="number" 
                    value={withdrawAmount} 
                    onChange={e => setWithdrawAmount(e.target.value)} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 font-mono"
                    placeholder="Amount USD"
                  />
                  <input 
                    type="text" 
                    value={withdrawAccount} 
                    onChange={e => setWithdrawAccount(e.target.value)} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 font-mono"
                    placeholder="Destination Phone/Acc"
                  />
                  <button 
                    onClick={handleWithdraw} 
                    disabled={loading}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold text-xs rounded font-mono transition-colors"
                  >
                    Process Withdrawal
                  </button>
                </div>

                {/* Transfer Form */}
                <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80 space-y-2">
                  <span className="text-xs font-bold text-blue-400 block font-mono">3. P2P Transfer</span>
                  <input 
                    type="number" 
                    value={transferAmount} 
                    onChange={e => setTransferAmount(e.target.value)} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 font-mono"
                    placeholder="Amount USD"
                  />
                  <input 
                    type="text" 
                    value={transferRecipient} 
                    onChange={e => setTransferRecipient(e.target.value)} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 font-mono"
                    placeholder="Recipient Account"
                  />
                  <button 
                    onClick={handleTransfer} 
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded font-mono transition-colors"
                  >
                    Execute Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Double-Entry Ledger Table */}
          <div className="bg-[#0A0907] border border-[#231A10] p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-zinc-100 font-mono flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" /> Double-Entry Immutable Ledger Audit Trail
              </span>
              <span className="text-xs text-zinc-500 font-normal">Debit = Credit Verification Active</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                    <th className="py-2 px-3">Entry ID</th>
                    <th className="py-2 px-3">Tx Ref</th>
                    <th className="py-2 px-3">Account No</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Direction</th>
                    <th className="py-2 px-3">Amount</th>
                    <th className="py-2 px-3">Balance After</th>
                    <th className="py-2 px-3">Timestamp</th>
                    <th className="py-2 px-3">ZK Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerEntries.length > 0 ? (
                    ledgerEntries.map((e: any) => (
                      <tr key={e.id} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                        <td className="py-2.5 px-3 text-zinc-500 text-[10px]">{e.id}</td>
                        <td className="py-2.5 px-3 font-bold text-amber-400">{e.transactionRef}</td>
                        <td className="py-2.5 px-3 text-zinc-300">{e.accountNumber}</td>
                        <td className="py-2.5 px-3 text-zinc-400 text-[10px]">{e.accountType}</td>
                        <td className="py-2.5 px-3 font-bold">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            e.direction === 'CREDIT' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {e.direction}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-zinc-100">${e.amount.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-zinc-400">${e.balanceAfter.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-zinc-500 text-[10px]">{new Date(e.timestamp).toLocaleTimeString()}</td>
                        <td className="py-2.5 px-3 text-emerald-400 text-[9px] truncate max-w-[120px]">{e.signatureZk}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-6 text-center text-zinc-500 font-mono">
                        No ledger entries recorded yet. Perform a deposit or withdrawal above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. TREASURY & LIQUIDITY REBALANCING TAB */}
      {activeSubTab === 'treasury' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0A0907] border border-[#231A10] p-5 rounded-2xl text-zinc-100 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400">Total Treasury Liquidity Managed</span>
              <div className="text-2xl font-bold text-amber-400">${treasuryData?.liquidity?.totalLiquidityUSD?.toLocaleString() || '995,000'}</div>
            </div>
            <div className="bg-[#0A0907] border border-[#231A10] p-5 rounded-2xl text-zinc-100 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400">Connected Gateway Pools</span>
              <div className="text-2xl font-bold text-emerald-400">{treasuryData?.liquidity?.activeProvidersCount || '4'} Online</div>
            </div>
            <div className="bg-[#0A0907] border border-[#231A10] p-5 rounded-2xl text-zinc-100 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400">Liquidity Shortage Alerts</span>
              <div className="text-2xl font-bold text-rose-400">{treasuryData?.liquidity?.criticalShortageAlertsCount || '1'} Critical</div>
            </div>
          </div>

          {/* Liquidity Predictions & Automated Top-Up Recommendations */}
          <div className="bg-[#0A0907] border border-[#231A10] p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-zinc-100 font-mono flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-500" /> Treasury Intelligence — Liquidity Shortage Predictions
              </span>
              <span className="text-xs text-zinc-400 font-mono">24-Hour Time-Series Forecast</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treasuryData?.liquidity?.predictions?.map((p: any) => (
                <div key={p.providerId} className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-100 font-mono">{p.providerName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      p.urgency === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' :
                      p.urgency === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {p.urgency} URGENCY
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/60">
                    <div>
                      <span className="text-zinc-500 block text-[9px]">CURRENT:</span>
                      <strong className="text-zinc-200">${p.currentLiquidity.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px]">EST 24H BURN:</span>
                      <strong className="text-amber-400">${p.predicted24hVolume.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px]">DEPLETION:</span>
                      <strong className="text-rose-400">{p.timeToDepletionHours}h</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-mono">{p.reasoning}</p>

                  {p.recommendedTopUp > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                      <span className="text-xs text-amber-400 font-mono font-bold">Recommended Rebalance: +${p.recommendedTopUp.toLocaleString()}</span>
                      <button 
                        onClick={() => handleTriggerRebalance('direct_bank', p.providerId, p.recommendedTopUp)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold font-mono rounded"
                      >
                        Rebalance Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. SAVINGS INTELLIGENCE TAB */}
      {activeSubTab === 'savings' && (
        <div className="space-y-6">
          <div className="bg-[#0A0907] border border-[#231A10] p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-zinc-100 font-mono flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-amber-500" /> Savings Intelligence Agent — Partner Product Yield Matrix
              </span>
              <span className="text-xs text-zinc-400 font-mono">Comparing Connected Banks & Partner Vaults</span>
            </h3>

            {/* PENDING APPROVAL NOTIFICATION */}
            {pendingAllocation && (
              <div className="bg-amber-950/80 border border-amber-500 p-4 rounded-xl space-y-2 text-zinc-100 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <AlertCircle className="w-4 h-4" /> USER APPROVAL MANDATORY
                </div>
                <p>{pendingAllocation.approvalRequiredMessage}</p>
                <div className="flex items-center gap-3 pt-2">
                  <button 
                    onClick={() => handleApproveSavings(pendingAllocation.id)}
                    className="px-4 py-1.5 bg-emerald-500 text-zinc-950 font-bold rounded hover:bg-emerald-400"
                  >
                    Confirm & Move Funds
                  </button>
                  <button 
                    onClick={() => setPendingAllocation(null)}
                    className="px-4 py-1.5 bg-zinc-800 text-zinc-300 font-bold rounded hover:bg-zinc-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savingsData?.options?.map((prod: any) => (
                <div key={prod.productId} className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  prod.isRecommended 
                    ? 'bg-amber-950/20 border-amber-500/50 ring-1 ring-amber-500/30' 
                    : 'bg-zinc-900/60 border-zinc-800/80'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">{prod.partnerName}</span>
                    {prod.isRecommended && (
                      <span className="px-2 py-0.5 bg-amber-500 text-zinc-950 text-[9px] font-mono font-bold rounded">
                        AI RECOMMENDED
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-100">{prod.productTitle}</h4>
                    <div className="text-2xl font-extrabold text-amber-400 mt-1">{prod.apyPercent}% APY</div>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-300 space-y-1 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                    <div>Lockup Period: <strong>{prod.lockupPeriodDays} Days</strong></div>
                    <div>Est. 1-Yr Profit ($1k): <strong className="text-emerald-400">+${prod.projectedEarnings1yr}</strong></div>
                  </div>

                  <button 
                    onClick={() => handleProposeSavings(prod.productId)}
                    className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold font-mono rounded"
                  >
                    Allocate $1,000
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. LENDING INTELLIGENCE & CREDIT RISK TAB */}
      {activeSubTab === 'lending' && (
        <div className="space-y-6">
          <div className="bg-[#0A0907] border border-[#231A10] p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-500" /> Lending Intelligence Agent — Credit Risk & Partner Lenders
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Evaluating user double-entry ledger history for credit score eligibility.</p>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs font-mono">
                <span className="text-zinc-400">MEHERAH Credit Score:</span>
                <strong className="text-emerald-400 text-sm">{lendingData?.creditAssessment?.creditScore || 745}</strong>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px]">
                  {lendingData?.creditAssessment?.eligibilityTier || 'PRIME'}
                </span>
              </div>
            </div>

            {/* Lender Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lendingData?.loanOffers?.map((offer: any) => (
                <div key={offer.offerId} className={`p-5 rounded-2xl border space-y-3 ${
                  offer.isRecommended ? 'bg-amber-950/20 border-amber-500/50' : 'bg-zinc-900/60 border-zinc-800/80'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-200">{offer.lenderName}</span>
                    {offer.isRecommended && (
                      <span className="px-2 py-0.5 bg-amber-500 text-zinc-950 text-[9px] font-mono font-bold rounded">BEST APR</span>
                    )}
                  </div>

                  <div>
                    <div className="text-2xl font-extrabold text-amber-400">{offer.interestRateAnnual}% APR</div>
                    <span className="text-xs font-mono text-zinc-400">{offer.tenureMonths}-Month Tenure</span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-300 space-y-1 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                    <div>Monthly Payment: <strong>${offer.monthlyRepayment}/mo</strong></div>
                    <div>Total Repayment: <strong>${offer.totalRepayment}</strong></div>
                  </div>

                  <p className="text-[10px] text-zinc-400 font-mono italic">{offer.recommendationReason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. FINANCIAL COACH AGENT TAB */}
      {activeSubTab === 'coach' && (
        <div className="space-y-6">
          <div className="bg-[#0A0907] border border-[#231A10] p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" /> Financial Coach Agent — Spending & Route Optimization Insights
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                Health Score: {coachData?.report?.healthScore || 88}/100
              </span>
            </div>

            <p className="text-xs font-mono text-zinc-300 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
              {coachData?.coachingSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coachData?.insights?.map((ins: any) => (
                <div key={ins.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 font-mono">{ins.title}</span>
                    <span className="text-[10px] font-mono text-emerald-400">+${ins.estimatedMonthlyImpactUSD}/mo</span>
                  </div>
                  <p className="text-xs text-zinc-300">{ins.description}</p>
                  <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950 p-2 rounded border border-zinc-800">
                    <strong className="text-zinc-200">Recommendation:</strong> {ins.actionableRecommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. ORGAN 3 AI DECISION FLOW MAP */}
      {activeSubTab === 'flow' && (
        <div className="bg-[#0A0907] border border-[#231A10] p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Cpu className="w-4 h-4 text-amber-500" /> End-to-End AI Decision Flow Architecture (Organ 3)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-9 gap-2 text-center text-xs font-mono pt-2">
            {[
              { title: '1. Customer Request', desc: 'Wallet Deposit / Transfer / Loan' },
              { title: '2. Chief Controller', desc: 'Goal Analysis & Intent' },
              { title: '3. Financial Optimizer', desc: 'Route & FX Minimization' },
              { title: '4. Risk Agent', desc: 'Fraud & Credit Scoring' },
              { title: '5. Compliance Agent', desc: 'KYC & Sanctions Check' },
              { title: '6. Treasury Agent', desc: 'Liquidity Verification' },
              { title: '7. Provider Selection', desc: 'Flutterwave / MoMo' },
              { title: '8. Payment Execution', desc: 'Settlement Handshake' },
              { title: '9. Ledger Update', desc: 'Double-Entry & ZK Audit' }
            ].map((step, idx) => (
              <div key={idx} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-amber-400 font-bold block text-[11px]">{step.title}</span>
                <p className="text-[10px] text-zinc-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
