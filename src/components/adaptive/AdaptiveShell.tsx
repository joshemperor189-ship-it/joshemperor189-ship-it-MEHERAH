import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MeherahRole } from './RoleSelectionView';
import { IndividualExperienceView } from './IndividualExperienceView';
import { BusinessExperienceView } from './BusinessExperienceView';
import { InstitutionExperienceView } from './InstitutionExperienceView';
import { UniversalAssistantDrawer } from './UniversalAssistantDrawer';
import { User, Building2, Landmark, Settings, Sparkles, ChevronDown, RotateCcw, ShieldCheck } from 'lucide-react';

interface AdaptiveShellProps {
  currentRole: MeherahRole;
  onSelectRole: (role: MeherahRole) => void;
  onLaunchPresentation: () => void;
  childrenForAdmin?: React.ReactNode;
}

export function AdaptiveShell({
  currentRole,
  onSelectRole,
  onLaunchPresentation,
  childrenForAdmin
}: AdaptiveShellProps) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const roleMeta = {
    individual: { label: 'Individual', badge: '👤 Personal', icon: User, color: 'text-[#E5C76B]' },
    business: { label: 'Business', badge: '🏪 Cash Flow', icon: Building2, color: 'text-[#60A5FA]' },
    institution: { label: 'Financial Institution', badge: '🏦 Executive Observatory', icon: Landmark, color: 'text-[#34D399]' },
    admin: { label: 'Administrator', badge: '⚙️ Sovereign Kernel OS', icon: Settings, color: 'text-[#A78BFA]' },
    unselected: { label: 'Select Persona', badge: 'Select', icon: Sparkles, color: 'text-[#C8A64D]' }
  };

  const activeMeta = roleMeta[currentRole] || roleMeta.unselected;
  const ActiveIcon = activeMeta.icon;

  return (
    <div className="min-h-screen bg-[#070707] text-[#FFFFFF] font-sans flex flex-col justify-between selection:bg-[#C8A64D] selection:text-[#080808]">
      
      {/* TOP EXECUTIVE PERSISTENT HEADER */}
      <header className="sticky top-0 z-40 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-[#C8A64D]/25 px-4 md:px-8 py-3.5 flex items-center justify-between">
        
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E5C76B] via-[#C8A64D] to-[#8A6D1B] p-0.5 shadow-[0_0_15px_rgba(200,166,77,0.3)]">
            <div className="w-full h-full bg-[#080808] rounded-[9px] flex items-center justify-center font-bold text-base text-[#C8A64D] font-serif">M</div>
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest text-[#C8A64D] uppercase font-bold block">
              ADAPTIVE EXPERIENCE ENGINE
            </span>
            <h1 className="text-sm md:text-base font-bold font-serif text-[#FFFFFF] tracking-tight flex items-center gap-2">
              <span>MEHERAH</span>
              <span className="text-xs font-mono text-[#777777] font-normal hidden sm:inline">• One Intelligence, Many Faces</span>
            </h1>
          </div>
        </div>

        {/* PERSONA SWITCHER & PRESENTATION CONTROLS */}
        <div className="flex items-center gap-3">
          
          {/* PERSONA SWITCHER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#C8A64D]/40 text-xs font-mono text-[#FFFFFF] transition-all shadow-md"
            >
              <ActiveIcon size={16} className={activeMeta.color} />
              <span className="font-bold">{activeMeta.badge}</span>
              <ChevronDown size={14} className="text-[#C8A64D]" />
            </button>

            {/* DROPDOWN MENU */}
            <AnimatePresence>
              {isRoleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 bg-[#0F0F0F] border-2 border-[#C8A64D] rounded-2xl p-2 shadow-[0_0_35px_rgba(0,0,0,0.8)] z-50 space-y-1"
                >
                  <div className="px-3 py-1.5 border-b border-[#222222] text-[10px] font-mono font-bold text-[#777777] uppercase">
                    SWITCH PERSONA EXPERIENCE:
                  </div>

                  {(['individual', 'business', 'institution', 'admin'] as MeherahRole[]).map((rKey) => {
                    const item = roleMeta[rKey];
                    const ItemIcon = item.icon;
                    const isSelected = currentRole === rKey;
                    return (
                      <button
                        key={rKey}
                        onClick={() => {
                          onSelectRole(rKey);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-[#1F1F1F] text-[#E5C76B] font-bold border border-[#C8A64D]/40'
                            : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#181818]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <ItemIcon size={14} className={item.color} />
                          <span>{item.label}</span>
                        </div>
                        {isSelected && <span className="text-[10px] text-[#00B86B]">ACTIVE</span>}
                      </button>
                    );
                  })}

                  <div className="pt-1 border-t border-[#222222]">
                    <button
                      onClick={() => {
                        onSelectRole('unselected');
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-[#C8A64D] hover:bg-[#181818] transition-all"
                    >
                      <RotateCcw size={14} />
                      <span>Role Selection Screen</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LAUNCH PRESENTATION BUTTON */}
          <button
            onClick={onLaunchPresentation}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C8A64D] to-[#E5C76B] text-[#080808] font-mono font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-[0_0_20px_rgba(200,166,77,0.4)] transition-all"
          >
            <Sparkles size={14} />
            <span className="hidden md:inline">Executive Presentation</span>
          </button>

        </div>

      </header>

      {/* MAIN VIEW AREA DEPENDING ON ACTIVE ROLE */}
      <main className="flex-1 pb-16">
        {currentRole === 'individual' && <IndividualExperienceView />}
        {currentRole === 'business' && <BusinessExperienceView />}
        {currentRole === 'institution' && <InstitutionExperienceView />}
        {currentRole === 'admin' && (
          <div className="w-full">
            {childrenForAdmin}
          </div>
        )}
      </main>

      {/* FLOATING UNIVERSAL MEHERAH ASSISTANT */}
      <UniversalAssistantDrawer />

    </div>
  );
}
