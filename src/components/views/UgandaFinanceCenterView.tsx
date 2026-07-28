import React, { useState } from 'react';
import { Wallet, ArrowRight, ShieldCheck, Zap, RefreshCw, Layers } from 'lucide-react';

export const UgandaFinanceCenterView: React.FC = () => {
  const [originNetwork, setOriginNetwork] = useState('MTN_MOMO');
  const [targetTerminal, setTargetTerminal] = useState('STANBIC_FLEXIPAY');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionLog, setTransactionLog] = useState<string | null>(null);

  const handleRoutePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAmount || !recipientId) return;
    
    setIsProcessing(true);
    // Simulate real-time cryptographic ZK-SNARK ledger validation routing
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionLog(`tx_mesh_${Math.random().toString(36).substring(2, 11).toUpperCase()}`);
      setTransferAmount('');
      setRecipientId('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B0A08] text-[#FDFBF7] p-6 font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#231E16] pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#F0A500] to-[#D37506] bg-clip-text text-transparent">
            MEHERAH AI ROUTE
          </h1>
          <p className="text-sm text-[#A39E93] mt-1">Autonomous Open Finance Aggregator & Cross-Network Mesh</p>
        </div>
        <div className="flex items-center gap-3 bg-[#17140F] border border-[#2A2319] px-4 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <span className="text-xs font-medium tracking-wide text-[#E6E1D6]">SOVEREIGN NODE ACTIVE</span>
        </div>
      </div>

      {/* QUICK SYSTEM METRICS PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8A8477] uppercase font-semibold tracking-wider">Settlement Latency</p>
            <p className="text-2xl font-bold mt-1 text-[#FDFBF7]">142 <span className="text-xs text-[#D37506]">ms</span></p>
          </div>
          <div className="p-3 bg-[#1C1811] rounded-xl text-[#F0A500]"><Zap size={20} /></div>
        </div>
        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8A8477] uppercase font-semibold tracking-wider">Core Gateway Fee</p>
            <p className="text-2xl font-bold mt-1 text-[#FDFBF7]">0.00 <span className="text-xs text-[#10B981]">UGX</span></p>
          </div>
          <div className="p-3 bg-[#1C1811] rounded-xl text-[#10B981]"><ShieldCheck size={20} /></div>
        </div>
        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8A8477] uppercase font-semibold tracking-wider">Estimated User Savings</p>
            <p className="text-2xl font-bold mt-1 text-[#10B981]">94.2%</p>
          </div>
          <div className="p-3 bg-[#1C1811] rounded-xl text-[#D37506]"><Layers size={20} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COMPONENT 1: REAL-TIME UGANDAN LIQUIDITY TIMELINE */}
        <div className="lg:col-span-2 bg-[#12100C] border border-[#231E16] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-[#FDFBF7]">
              <Wallet size={18} className="text-[#F0A500]" /> Connected Corridors & Liquidity Pools
            </h3>
            <button className="text-xs flex items-center gap-1.5 text-[#A39E93] hover:text-[#FDFBF7] transition-colors">
              <RefreshCw size={12} /> Sync Pools
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#231E16] text-[#8A8477] text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Network Target</th>
                  <th className="pb-3 font-semibold">Masked Access Token</th>
                  <th className="pb-3 font-semibold text-right">Available Liquidity</th>
                  <th className="pb-3 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1A13] text-sm">
                <tr>
                  <td className="py-4 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> MTN MoMo
                  </td>
                  <td className="py-4 text-[#A39E93] font-mono">tok_momo_772••••••</td>
                  <td className="py-4 text-right font-bold text-[#E6E1D6]">12,500,000.00 UGX</td>
                  <td className="py-4 text-center"><span className="px-2 py-0.5 bg-[#14231A] text-[#10B981] rounded text-xs border border-[#1B3A27]">READY</span></td>
                </tr>
                <tr>
                  <td className="py-4 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> Stanbic FlexiPay
                  </td>
                  <td className="py-4 text-[#A39E93] font-mono">tok_flex_751••••••</td>
                  <td className="py-4 text-right font-bold text-[#E6E1D6]">4,800,000.00 UGX</td>
                  <td className="py-4 text-center"><span className="px-2 py-0.5 bg-[#14231A] text-[#10B981] rounded text-xs border border-[#1B3A27]">READY</span></td>
                </tr>
                <tr>
                  <td className="py-4 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Airtel Money
                  </td>
                  <td className="py-4 text-[#A39E93] font-mono">tok_airt_701••••••</td>
                  <td className="py-4 text-right font-bold text-[#E6E1D6]">150,000.00 UGX</td>
                  <td className="py-4 text-center"><span className="px-2 py-0.5 bg-[#14231A] text-[#10B981] rounded text-xs border border-[#1B3A27]">READY</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* COMPONENT 2: INTERACTIVE ROUTING TERMINAL */}
        <div className="bg-[#12100C] border border-[#231E16] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#FDFBF7]">Universal Routing Console</h3>
            <form onSubmit={handleRoutePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8A8477] uppercase tracking-wider mb-1.5">Origin Node Source</label>
                <select 
                  value={originNetwork} 
                  onChange={(e) => setOriginNetwork(e.target.value)}
                  className="w-full bg-[#1C1811] border border-[#2C2419] rounded-xl px-3 py-2 text-sm text-[#FDFBF7] focus:outline-none focus:border-[#F0A500]"
                >
                  <option value="MTN_MOMO">MTN MoMo Aggregator</option>
                  <option value="STANBIC_FLEXIPAY">Stanbic FlexiPay Gateway</option>
                  <option value="AIRTEL_MONEY">Airtel Money Loop</option>
                </select>
              </div>

              <div className="flex justify-center my-1 text-[#8A8477]">
                <ArrowRight size={16} className="transform rotate-90 lg:rotate-0" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8477] uppercase tracking-wider mb-1.5">Target Destination Node</label>
                <select 
                  value={targetTerminal} 
                  onChange={(e) => setTargetTerminal(e.target.value)}
                  className="w-full bg-[#1C1811] border border-[#2C2419] rounded-xl px-3 py-2 text-sm text-[#FDFBF7] focus:outline-none focus:border-[#F0A500]"
                >
                  <option value="STANBIC_FLEXIPAY">Stanbic FlexiPay Vault</option>
                  <option value="MTN_MOMO">MTN Mobile Money Terminal</option>
                  <option value="PEARL_BANK">Pearl Bank (Wendi Mesh)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8477] uppercase tracking-wider mb-1.5">Recipient Terminal Address / Number</label>
                <input 
                  type="text" 
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  placeholder="e.g. +256 772 000 111" 
                  className="w-full bg-[#1C1811] border border-[#2C2419] rounded-xl px-3 py-2 text-sm text-[#FDFBF7] placeholder-[#5A554C] focus:outline-none focus:border-[#F0A500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8477] uppercase tracking-wider mb-1.5">Settlement Liquidity Volume (UGX)</label>
                <input 
                  type="number" 
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter Amount" 
                  className="w-full bg-[#1C1811] border border-[#2C2419] rounded-xl px-3 py-2 text-sm text-[#FDFBF7] placeholder-[#5A554C] focus:outline-none focus:border-[#F0A500]"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-[#F0A500] to-[#D37506] hover:opacity-90 text-[#0B0A08] font-bold py-3 rounded-xl text-sm transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 mt-4"
              >
                {isProcessing ? 'COMPUTING ZK CRYPTO PROOF...' : 'EXECUTE AUTONOMOUS SETTLEMENT'}
              </button>

              {/* RESPONSE MESSAGE FEEDBACK */}
              {transactionLog && (
                <div className="p-3 bg-[#14231A] border border-[#1B3A27] rounded-xl text-xs text-[#10B981] font-mono mt-2">
                  ✅ Settlement Secured Successfully! ID: <span className="font-bold">{transactionLog}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
