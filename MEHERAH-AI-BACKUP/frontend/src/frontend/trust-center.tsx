import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  FileText, 
  Key, 
  Database,
  Cpu
} from 'lucide-react';

export const TrustCenterView: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              MEHERAH TRUST & TRANSPARENCY CENTER
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                ZERO-TRUST GOVERNANCE
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Independent audit proof, safety boundary guarantees, and explainability assurances for executive teams.
            </p>
          </div>
        </div>
      </div>

      {/* Core Security Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-3 text-emerald-400 font-semibold text-sm">
            <UserCheck className="w-5 h-5" />
            <span>Human-in-the-Loop Handshake</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            MEHERAH creates DAG execution plans for approval before starting. No autonomous steps proceed until executive confirmation is given.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-3 text-indigo-400 font-semibold text-sm">
            <Lock className="w-5 h-5" />
            <span>Hardcoded Boundary Interceptors</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Financial transfers, secret rotations, and database deletions are cryptographically blocked at the kernel boundary.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-3 text-amber-400 font-semibold text-sm">
            <Eye className="w-5 h-5" />
            <span>Explainable Reasoning</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every output includes empirical confidence scores, mapped data evidence, trade-offs, and plain-language summaries.
          </p>
        </div>
      </div>

      {/* Real Capabilities vs Prototype Boundaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What MEHERAH Can Do Today */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-emerald-500/20 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white">What MEHERAH Can Do Today (Real Today)</h3>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Autonomous DAG Plan Generation:</strong> Constructs structured, multi-phase execution graphs from executive goals.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Multi-Agent Coordination:</strong> Chief Agent delegates specialized tasks to Research, Finance, Writing, Memory, and Security agents.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Explainable Decision Matrix:</strong> Generates plain-language executive summaries with empirical confidence ratings.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Persistent Memory:</strong> Retains strategic learning logs and historical performance records across restarts.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Zero-Trust Interceptors:</strong> Hardcoded boundaries block unauthorized operations automatically.</span>
            </li>
          </ul>
        </div>

        {/* What MEHERAH Cannot Do (Prototypes) */}
        <div className="p-6 rounded-xl bg-slate-800/40 border border-amber-500/20 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <XCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-white">What MEHERAH Cannot Do (Prototypes / External Integrations)</h3>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start space-x-2.5">
              <span className="text-amber-400 font-bold">⚠️</span>
              <span><strong>Live Banking Settlement:</strong> Fiat disbursements, wire transfers, and SWIFT/PAPSS rails are simulated in pilot mode.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-amber-400 font-bold">⚠️</span>
              <span><strong>Production Infrastructure Mutation:</strong> Cloud server mutations operate in read-only architectural mode.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-amber-400 font-bold">⚠️</span>
              <span><strong>High-Volume Enterprise Multi-Tenancy:</strong> Current container setup is optimized for single executive team organizations.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="text-amber-400 font-bold">⚠️</span>
              <span><strong>Unsupervised Financial Execution:</strong> All financial recommendations require explicit human sign-off.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Data Protection & Governance Rules */}
      <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          Data Protection & Privacy Assurances
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
            <div className="font-medium text-white flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-blue-400" /> Local Encrypted Persistence
            </div>
            <p className="text-slate-400">
              Your mission history, financial models, and strategic briefs are stored in local relational storage. No data is used to train public models.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
            <div className="font-medium text-white flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Isolated Execution Container
            </div>
            <p className="text-slate-400">
              MEHERAH runs in an isolated Cloud Run container environment behind reverse-proxy security layers with CORS restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
