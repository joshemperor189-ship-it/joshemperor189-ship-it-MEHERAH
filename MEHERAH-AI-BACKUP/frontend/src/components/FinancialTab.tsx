import React, { useState } from 'react';
import { DollarSign, FileCode, CheckCircle2, RotateCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function FinancialTab() {
  const [txId, setTxId] = useState<string>('999');
  const [recipient, setRecipient] = useState<string>('Adisa Kamara');
  const [amount, setAmount] = useState<number>(1500000);
  const [provider, setProvider] = useState<string>('MTN');
  const [currency, setCurrency] = useState<string>('UGX');
  
  const [generatedXml, setGeneratedXml] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateISO20022 = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/iso20022/generate?id=${txId}&amount=${amount}&recipient=${encodeURIComponent(recipient)}&provider=${provider}&currency=${currency}`);
      if (res.ok) {
        const text = await res.text();
        setGeneratedXml(text);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6" id="financial_panel">
      {/* Financial Status Indices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">ISO 20022 ROUTER</span>
            <h4 className="text-sm font-bold text-zinc-200 mt-1">MTN / Airtel Compliant</h4>
          </div>
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">GATEWAY COMPLIANCE</span>
            <h4 className="text-sm font-bold text-zinc-200 mt-1">PCI-DSS Level 1 v4.0</h4>
          </div>
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full" />
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">FAILOVER STATUS</span>
            <h4 className="text-sm font-bold text-zinc-200 mt-1">Active Multi-Pathing</h4>
          </div>
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">SWEEP DISBURSEMENTS</span>
            <h4 className="text-sm font-bold text-zinc-200 mt-1">ISO pacs.008.001.08</h4>
          </div>
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ISO 20022 Generation Form */}
        <div className="lg:col-span-5 border border-zinc-800 bg-zinc-950 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-amber-500" /> ISO 20022 Builder
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Compile customer credit transfer messages matching SWIFT and national clearing settlement architectures.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-1">TRANSACTION ID:</label>
                <input 
                  type="text" 
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-zinc-300 outline-none focus:border-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-1">RECIPIENT NAME:</label>
                <input 
                  type="text" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 outline-none focus:border-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-1">AMOUNT ({currency}):</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-zinc-300 outline-none focus:border-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-1">PROVIDER:</label>
                  <select 
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 outline-none focus:border-amber-500/30"
                  >
                    <option value="MTN">MTN MoMo</option>
                    <option value="Airtel">Airtel Money</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-1">CURRENCY:</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 outline-none focus:border-amber-500/30"
                  >
                    <option value="UGX">UGX (Uganda)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="KES">KES (Kenya)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateISO20022}
            disabled={isGenerating}
            className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold rounded shadow transition-all mt-4"
          >
            {isGenerating ? "Compiling pacs.008 XML..." : "Generate ISO 20022 pacs.008 Message"}
          </button>
        </div>

        {/* Live XML Output Viewer */}
        <div className="lg:col-span-7 border border-zinc-800 bg-zinc-950 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-2">
              <FileCode className="w-5 h-5 text-amber-500" /> ISO 20022 Compliant XML Document
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Real-time pacs.008 credit transfer XML formatted specifically for financial integration standards.
            </p>

            {generatedXml ? (
              <div className="bg-black border border-zinc-900 p-4 rounded-lg overflow-y-auto max-h-[340px] custom-scrollbar">
                <pre className="text-[10px] font-mono text-amber-400/90 leading-relaxed whitespace-pre select-all">
                  {generatedXml}
                </pre>
              </div>
            ) : (
              <div className="h-72 border border-dashed border-zinc-900 rounded-lg flex flex-col items-center justify-center bg-zinc-950/15">
                <FileCode className="w-8 h-8 text-zinc-800 mb-2" />
                <p className="text-xs font-mono text-zinc-600 text-center px-4">Generate ISO 20022 XML above to inspect SWIFT payloads.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
