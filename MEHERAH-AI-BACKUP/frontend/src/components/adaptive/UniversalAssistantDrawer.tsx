import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export function UniversalAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<Array<{ q: string; a: string; card?: string }>>([]);
  const [isThinking, setIsThinking] = useState(false);

  const sampleQueries = [
    "Send money.",
    "Explain this payment.",
    "Why was this route selected?",
    "Show me today's sales.",
    "I need help."
  ];

  const handleAsk = (userQuery: string) => {
    if (!userQuery.trim() || isThinking) return;

    const q = userQuery;
    setQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let ans = "I am MEHERAH Universal Assistant. I have analyzed your request.";
      let card: string | undefined;

      const lower = q.toLowerCase();

      if (lower.includes('send money')) {
        ans = "Who would you like to send money to? You can say 'Send UGX 20,000 to Sarah' or select a saved contact.";
        card = "Option: Quick Transfer to Sarah, Mother, or Supplier A";
      } else if (lower.includes('explain') || lower.includes('payment')) {
        ans = "MEHERAH routes every transaction through the lowest-cost, regulatory-compliant network rail in real time. This saved you 82% in fees.";
        card = "Audit Proof: Bank of Uganda ISO 20022 Verified";
      } else if (lower.includes('why') || lower.includes('route')) {
        ans = "The direct mobile-to-bank rail was chosen because it offered 1.1s settlement latency with 0% FX slippage.";
        card = "Routing Score: 99.8/100 (Optimal Latency & Cost)";
      } else if (lower.includes('sales') || lower.includes('today')) {
        ans = "Today's collections total UGX 4,250,000 across 18 customer transactions. All funds are cleared.";
        card = "Collections: UGX 4.25M Cleared";
      } else {
        ans = `MEHERAH understood your intent: "${q}". I am continuously optimizing your financial experience based on your preferences.`;
      }

      setHistory(prev => [...prev, { q, a: ans, card }]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#C8A64D] via-[#E5C76B] to-[#C8A64D] text-[#080808] font-mono font-bold text-xs shadow-[0_0_25px_rgba(200,166,77,0.4)] border-2 border-[#FFFFFF]/20 hover:shadow-[0_0_35px_rgba(200,166,77,0.6)] transition-all"
        >
          <Sparkles size={18} className="text-[#080808] animate-pulse" />
          <span>Ask MEHERAH</span>
        </motion.button>
      </div>

      {/* FLOATING DRAWER PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md bg-[#0F0F0F] border-2 border-[#C8A64D] rounded-3xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-4 flex flex-col justify-between max-h-[500px]"
          >
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#C8A64D] text-[#080808] flex items-center justify-center font-serif font-bold text-xs">
                  M
                </div>
                <strong className="text-sm font-serif text-[#FFFFFF]">Universal MEHERAH Assistant</strong>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-[#222222] text-[#A7A7A7] hover:text-[#FFFFFF]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Q&A HISTORY SCROLL */}
            <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
              {history.length === 0 ? (
                <div className="text-center py-6 space-y-2 text-[#777777]">
                  <HelpCircle size={28} className="mx-auto text-[#C8A64D]/50" />
                  <p className="text-xs font-sans">
                    Ask me anything in plain language. I translate human intention into intelligent action.
                  </p>
                </div>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="space-y-2 text-xs font-sans">
                    <div className="p-2.5 bg-[#1A1A1A] text-[#C8A64D] rounded-xl font-mono text-right">
                      You: "{item.q}"
                    </div>
                    <div className="p-3 bg-[#141414] border border-[#C8A64D]/20 text-[#FFFFFF] rounded-xl space-y-1">
                      <p className="leading-relaxed">{item.a}</p>
                      {item.card && (
                        <div className="p-2 bg-[#080808] border border-[#00B86B]/40 rounded-lg text-[10px] font-mono text-[#00B86B]">
                          ✔ {item.card}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {isThinking && (
                <div className="text-xs font-mono text-[#C8A64D] flex items-center gap-2">
                  <Sparkles size={14} className="animate-spin" />
                  <span>Translating intent...</span>
                </div>
              )}
            </div>

            {/* QUICK SAMPLE QUERIES */}
            <div className="space-y-2 pt-2 border-t border-[#222222]">
              <div className="flex flex-wrap gap-1.5">
                {sampleQueries.map((sq, sqIdx) => (
                  <button
                    key={sqIdx}
                    onClick={() => handleAsk(sq)}
                    className="px-2.5 py-1 rounded-full bg-[#1A1A1A] hover:bg-[#C8A64D] hover:text-[#080808] border border-[#333333] text-[11px] text-[#A7A7A7] transition-all"
                  >
                    {sq}
                  </button>
                ))}
              </div>

              {/* INPUT BOX */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAsk(query);
                }}
                className="flex items-center gap-2 pt-1"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type anything..."
                  className="flex-1 bg-[#141414] border border-[#333333] focus:border-[#C8A64D] rounded-xl px-3 py-2 text-xs text-[#FFFFFF] placeholder-[#666666] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!query.trim() || isThinking}
                  className="p-2 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] font-bold transition-all disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
