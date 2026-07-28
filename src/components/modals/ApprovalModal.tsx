import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle, Key, Lock, Unlock } from 'lucide-react';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (signingKey: string) => void;
  actionDetails: {
    actionType: string;
    description: string;
    amountUgx?: number;
    requestedBy: string;
  };
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({ isOpen, onClose, onApprove, actionDetails }) => {
  const [signingKey, setSigningKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signingKey) {
      setErrorMsg('Multi-sig cryptographic operator pin required.');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate real-time cryptographic vault verification
    setTimeout(() => {
      setIsSubmitting(false);
      if (signingKey === '0000') { // Mock dual-operator security validation pass
        onApprove(signingKey);
        setSigningKey('');
        setErrorMsg('');
        onClose();
      } else {
        setErrorMsg('Invalid operator signing credentials. Security breach log generated.');
      }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Frosted Glass Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#060504]/80 backdrop-blur-md"
          />

          {/* Hardened Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-[#0E0C09]/95 backdrop-blur-2xl border border-[#2F2112]/60 rounded-3xl p-6 shadow-2xl relative z-10 overflow-hidden"
          >
            {/* Ambient Background Glow Effect */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D37506]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Identity Descriptor */}
            <div className="flex items-center gap-3.5 border-b border-[#1A140E] pb-4 mb-5">
              <div className="p-3 bg-[#231406] border border-[#462302] rounded-xl text-[#F0A500]">
                <ShieldAlert size={22} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D37506] uppercase block">
                  High-Risk Interceptor Gate
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[#FDFBF7] mt-0.5">Dual-Operator Authorization</h3>
              </div>
            </div>

            {/* Main Action Content Breakdown */}
            <div className="bg-[#14120E] border border-[#1F1A13] rounded-2xl p-4 mb-5 space-y-3.5 text-sm">
              <div className="flex justify-between border-b border-[#1C160F] pb-2">
                <span className="text-[#8A8477]">Action Directive</span>
                <span className="font-mono text-[#E6E1D6] font-semibold">{actionDetails.actionType}</span>
              </div>
              
              {actionDetails.amountUgx && (
                <div className="flex justify-between border-b border-[#1C160F] pb-2">
                  <span className="text-[#8A8477]">Target Volume</span>
                  <span className="font-mono text-[#F0A500] font-bold">
                    {actionDetails.amountUgx.toLocaleString()} <span className="text-[10px] text-[#8A8477]">UGX</span>
                  </span>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5A544B] block">Compliance Reason</span>
                <p className="text-[#A39E93] text-xs leading-relaxed">{actionDetails.description}</p>
              </div>

              <div className="text-[11px] text-[#706B60] pt-1">
                Initiated by: <span className="text-[#E6E1D6] font-mono">{actionDetails.requestedBy}</span>
              </div>
            </div>

            {/* Cryptographic Execution Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8A8477] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Key size={12} /> Signer Operational Key / PIN
                </label>
                <div className="relative">
                  <input 
                    type="password" 
                    maxLength={4}
                    value={signingKey}
                    onChange={(e) => setSigningKey(e.target.value)}
                    placeholder="••••" 
                    className="w-full bg-[#1C1811] border border-[#2C2419] rounded-xl px-4 py-3 text-center font-mono tracking-widest text-lg text-[#FDFBF7] placeholder-[#5A554C] focus:outline-none focus:border-[#F0A500] transition-colors"
                  />
                  <div className="absolute right-4 top-3.5 text-[#5A544B]">
                    {signingKey ? <Lock size={16} /> : <Unlock size={16} />}
                  </div>
                </div>
              </div>

              {/* Error Alert Display Block */}
              {errorMsg && (
                <div className="p-3 bg-[#261212] border border-[#441B1B] rounded-xl text-xs text-[#EF4444] font-medium flex items-center gap-2">
                  <XCircle size={14} className="shrink-0" /> {errorMsg}
                </div>
              )}

              {/* Interaction Call-To-Action Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="w-full bg-[#1C1811] hover:bg-[#2A2319] border border-[#2C2419] text-[#A39E93] hover:text-[#FDFBF7] font-semibold text-sm py-3 rounded-xl transition-all"
                >
                  Reject & Clear
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#D37506] to-[#F0A500] text-[#0B0A08] font-bold text-sm py-3 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(211,117,6,0.15)]"
                >
                  {isSubmitting ? 'SIGNING TRANSACTION...' : 'Confirm Approval'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
