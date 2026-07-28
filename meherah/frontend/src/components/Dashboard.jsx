// MEHERAH Institutional Executive Control & Monitoring Board
import React, { useState } from 'react';

export default function Dashboard() {
    const [systemState] = useState("SECURE");

    return (
        <div className="p-6 max-w-7xl mx-auto bg-slate-900 text-white min-h-screen font-sans">
            <header className="flex justify-between items-center border-b border-slate-700 pb-4 mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-emerald-400 font-mono">MEHERAH Command Center</h1>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold border border-emerald-500/30">
                    System State: {systemState}
                </span>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-medium mb-2 text-slate-300">Bank of Uganda Sandbox</h3>
                    <p className="text-sm text-slate-400 mb-4">Real-time settlement routing via synchronized micro-ledgers.</p>
                    <div className="text-4xl font-extrabold text-white font-mono">99.98% <span className="text-sm text-emerald-400 font-normal">Uptime</span></div>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-medium mb-2 text-slate-300">AI Reasoning Validation</h3>
                    <p className="text-sm text-slate-400 mb-4">Active oversight boundary protecting cross-border transactional routing flags.</p>
                    <div className="text-4xl font-extrabold text-amber-400 font-mono">0.96 <span className="text-sm text-slate-400 font-normal">Avg Confidence</span></div>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-medium mb-2 text-slate-300">Active Audit Ledger</h3>
                    <p className="text-sm text-slate-400 mb-4">Cryptographically sealed append-only logs for state oversight tracking.</p>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 px-4 rounded-lg transition-colors">
                        Stream Immutability Logs
                    </button>
                </div>
            </main>
        </div>
    );
}
