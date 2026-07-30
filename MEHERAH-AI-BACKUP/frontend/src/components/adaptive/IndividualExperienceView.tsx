import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, ArrowRight, User, Heart, Zap, CheckCircle2, ShieldCheck, DollarSign, Wallet, Calendar, Clock, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'meherah';
  text: string;
  time: string;
  card?: {
    title: string;
    status: 'success' | 'pending';
    amount?: string;
    details: string;
    badge?: string;
  };
}

export function IndividualExperienceView() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'meherah',
      text: 'Good morning, Joshua. I am MEHERAH, your personal financial assistant. What can I help you with today?',
      time: '09:00 AM'
    }
  ]);

  const promptSuggestions = [
    "Send UGX 30,000 to Sarah.",
    "Send UGX 50,000 to my mother in Gulu.",
    "Pay my NWSC bill.",
    "How much did I spend this week?",
    "Help me save UGX 5,000 every Friday."
  ];

  const quickContacts = [
    { name: "Sarah", role: "Sister", avatar: "S", lastSent: "UGX 25,000" },
    { name: "Mother (Gulu)", role: "Family", avatar: "M", lastSent: "UGX 50,000" },
    { name: "NWSC Water", role: "Utilities", avatar: "W", lastSent: "UGX 45,000" },
    { name: "Umeme Yaka", role: "Electricity", avatar: "E", lastSent: "UGX 20,000" }
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    setTimeout(() => {
      let botText = "I have processed your request.";
      let cardData: ChatMessage['card'] | undefined;

      const lower = promptText.toLowerCase();

      if (lower.includes('sarah')) {
        botText = "I found the fastest and lowest-cost route for your transfer to Sarah.";
        cardData = {
          title: "Transfer to Sarah",
          status: "success",
          amount: "UGX 30,000",
          details: "Completed in 1.1s. Network routing cost: UGX 150 (saved 80% vs standard transfer).",
          badge: "OPTIMAL ROUTE"
        };
      } else if (lower.includes('gulu') || lower.includes('mother')) {
        botText = "Transfer to your mother in Gulu has been successfully executed.";
        cardData = {
          title: "Transfer to Mother (Gulu)",
          status: "success",
          amount: "UGX 50,000",
          details: "Direct instant mobile settlement confirmed with zero delay.",
          badge: "INSTANT SETTLEMENT"
        };
      } else if (lower.includes('nwsc') || lower.includes('water') || lower.includes('bill')) {
        botText = "Your National Water and Sewerage Corporation bill is paid.";
        cardData = {
          title: "NWSC Water Bill Payment",
          status: "success",
          amount: "UGX 42,000",
          details: "Account #2849102 updated instantly. Receipt #NWSC-92810.",
          badge: "BILL CLEARED"
        };
      } else if (lower.includes('spend') || lower.includes('week')) {
        botText = "Here is your expenditure breakdown for this week:";
        cardData = {
          title: "Weekly Expenditure Summary",
          status: "success",
          amount: "UGX 185,000 Total",
          details: "Utilities: UGX 62,000 • Transfers: UGX 80,000 • Groceries: UGX 43,000. You spent 12% less than last week!",
          badge: "FINANCIAL INSIGHT"
        };
      } else if (lower.includes('save') || lower.includes('friday')) {
        botText = "Automated Friday Savings Goal activated!";
        cardData = {
          title: "Friday Savings Goal",
          status: "success",
          amount: "UGX 5,000 / week",
          details: "MEHERAH will automatically move UGX 5,000 to your interest-bearing sovereign wallet every Friday at 8:00 AM.",
          badge: "AUTO-SAVINGS ACTIVE"
        };
      } else {
        botText = `I have completed your request: "${promptText}". MEHERAH selected the optimal route with guaranteed policy compliance and zero extra fees.`;
        cardData = {
          title: "Request Executed",
          status: "success",
          amount: "Confirmed",
          details: "Verified via Bank of Uganda ISO 20022 compliance protocol.",
          badge: "COMPLIANT ROUTE"
        };
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'meherah',
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        card: cardData
      };

      setMessages(prev => [...prev, botMsg]);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-4">
      
      {/* PERSONAL GREETING BANNER */}
      <div className="p-8 bg-gradient-to-r from-[#111111] via-[#16140E] to-[#111111] border-2 border-[#C8A64D]/40 rounded-3xl space-y-3 shadow-[0_0_35px_rgba(200,166,77,0.12)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C8A64D]/20 border border-[#C8A64D] flex items-center justify-center font-bold text-lg text-[#C8A64D]">
              J
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#C8A64D] uppercase font-bold block">
                MEHERAH PERSONAL FINANCIAL ASSISTANT
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#FFFFFF]">
                Good Morning, Joshua
              </h2>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-[#080808] border border-[#C8A64D]/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#00B86B]">
            <span className="w-2 h-2 rounded-full bg-[#00B86B] animate-pulse" />
            <span>PROTECTED BY MEHERAH SOVEREIGN MESH</span>
          </div>
        </div>
      </div>

      {/* CONVERSATION INTERFACE & QUICK ACTION CHIPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CHAT FEED (LEFT 8 COLS) */}
        <div className="lg:col-span-8 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl p-6 space-y-6 flex flex-col justify-between min-h-[500px] shadow-xl">
          
          {/* MESSAGES SCROLL AREA */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-[#777777]">
                      {msg.sender === 'user' ? 'Joshua' : 'MEHERAH'} • {msg.time}
                    </span>
                  </div>

                  <div
                    className={`max-w-md p-4 rounded-2xl text-sm font-sans leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#C8A64D] text-[#080808] font-bold rounded-tr-none'
                        : 'bg-[#181818] text-[#FFFFFF] border border-[#C8A64D]/25 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* RESULT CARD ATTACHMENT */}
                  {msg.card && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 max-w-md w-full p-4 bg-[#111111] border-2 border-[#00B86B] rounded-2xl space-y-2 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                        <span className="text-[10px] font-mono font-bold text-[#00B86B] uppercase flex items-center gap-1">
                          <CheckCircle2 size={12} /> {msg.card.badge || 'COMPLETED'}
                        </span>
                        {msg.card.amount && (
                          <span className="text-sm font-mono font-bold text-[#C8A64D]">{msg.card.amount}</span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold font-serif text-[#FFFFFF]">{msg.card.title}</h4>
                      <p className="text-xs text-[#A7A7A7] leading-relaxed">{msg.card.details}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {isProcessing && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#C8A64D]">
                  <Sparkles size={14} className="animate-spin" />
                  <span>MEHERAH is evaluating the optimal financial route...</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* QUICK PROMPT SUGGESTION CHIPS */}
          <div className="space-y-3 pt-3 border-t border-[#222222]">
            <span className="text-[10px] font-mono font-bold text-[#777777] uppercase block">
              TAP AN EXAMPLE OR TYPE BELOW:
            </span>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendPrompt(prompt)}
                  className="px-3 py-1.5 rounded-full bg-[#161616] hover:bg-[#C8A64D] hover:text-[#080808] border border-[#C8A64D]/30 text-xs font-sans text-[#D1D1D1] transition-all text-left flex items-center gap-1.5 group"
                >
                  <Sparkles size={12} className="text-[#C8A64D] group-hover:text-[#080808]" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>

            {/* INPUT FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputText);
              }}
              className="flex items-center gap-2 pt-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask MEHERAH (e.g. Send UGX 30,000 to Sarah...)"
                className="flex-1 bg-[#121212] border border-[#C8A64D]/40 rounded-xl px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#666666] focus:outline-none focus:border-[#C8A64D]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isProcessing}
                className="px-5 py-3 rounded-xl bg-[#C8A64D] hover:bg-[#E5C76B] text-[#080808] font-bold text-xs font-mono uppercase transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>Send</span>
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* SIDEBAR: SAVED CONTACTS & SAVINGS GOALS (RIGHT 4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* SAVED CONTACTS */}
          <div className="p-5 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold font-serif text-[#FFFFFF] flex items-center justify-between border-b border-[#222222] pb-2">
              <span>Quick Contacts</span>
              <span className="text-[10px] font-mono text-[#C8A64D]">INSTANT RAILS</span>
            </h3>

            <div className="space-y-2.5">
              {quickContacts.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(`Send UGX 20,000 to ${c.name}`)}
                  className="w-full p-3 bg-[#141414] hover:bg-[#1C1C1C] border border-[#222222] hover:border-[#C8A64D]/50 rounded-2xl flex items-center justify-between text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C8A64D]/20 border border-[#C8A64D]/40 flex items-center justify-center font-bold text-xs text-[#C8A64D]">
                      {c.avatar}
                    </div>
                    <div>
                      <strong className="text-xs text-[#FFFFFF] font-sans block group-hover:text-[#E5C76B] transition-colors">
                        {c.name}
                      </strong>
                      <span className="text-[10px] text-[#777777] font-mono">{c.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#C8A64D] font-bold">SEND</span>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE SAVINGS GOAL */}
          <div className="p-5 bg-[#0E0E0E] border border-[#00B86B]/40 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#00B86B] uppercase">SOVEREIGN SAVINGS GOAL</span>
              <Calendar size={14} className="text-[#00B86B]" />
            </div>

            <div>
              <h4 className="text-sm font-bold font-serif text-[#FFFFFF]">Friday Savings Routine</h4>
              <p className="text-xs text-[#A7A7A7] mt-1">
                Saving UGX 5,000 every Friday into your sovereign emergency fund.
              </p>
            </div>

            <div className="p-3 bg-[#141414] rounded-xl border border-[#222222] flex items-center justify-between text-xs font-mono">
              <span className="text-[#777777]">Saved so far:</span>
              <strong className="text-[#00B86B] font-bold">UGX 145,000</strong>
            </div>

            <button 
              onClick={() => handleSendPrompt("Help me save UGX 5,000 every Friday.")}
              className="w-full py-2 bg-[#00B86B]/15 hover:bg-[#00B86B]/25 text-[#00B86B] border border-[#00B86B]/40 rounded-xl text-xs font-mono font-bold transition-all text-center"
            >
              Adjust Savings Target
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
