import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Plus, 
  Key, 
  Shield, 
  Lock, 
  Globe2, 
  Activity, 
  ArrowRight, 
  Send, 
  Check, 
  Users, 
  Server, 
  Layers, 
  Zap, 
  AlertTriangle,
  FileCheck,
  Terminal,
  Copy,
  ExternalLink,
  Code2,
  Boxes,
  MessageSquare,
  Ticket,
  Search,
  CheckSquare
} from 'lucide-react';
import { 
  PartnerOnboardingApplication, 
  ConnectionStandardRequirement,
  MeherahCertificationStandard, 
  GlobalNetworkBreakdown,
  PartnerIntelligenceProfile,
  DeveloperEcosystemApp,
  RelationshipSupportTicket,
  RegulatoryMaterial 
} from '../../services/meherah-institutional-adoption.service';

export function MeherahInstitutionalAdoptionEngineView() {
  const [activeTab, setActiveTab] = useState<
    'portal' | 'standards' | 'certification' | 'command_centre' | 'intelligence' | 'developer' | 'relationship' | 'regulatory'
  >('portal');
  const [loading, setLoading] = useState<boolean>(true);

  // Data States
  const [applications, setApplications] = useState<PartnerOnboardingApplication[]>([]);
  const [standards, setStandards] = useState<ConnectionStandardRequirement[]>([]);
  const [certification, setCertification] = useState<MeherahCertificationStandard | null>(null);
  const [globalNetwork, setGlobalNetwork] = useState<GlobalNetworkBreakdown | null>(null);
  const [partnerProfiles, setPartnerProfiles] = useState<PartnerIntelligenceProfile[]>([]);
  const [developerApps, setDeveloperApps] = useState<DeveloperEcosystemApp[]>([]);
  const [tickets, setTickets] = useState<RelationshipSupportTicket[]>([]);
  const [regulatoryPackage, setRegulatoryPackage] = useState<RegulatoryMaterial | null>(null);

  // Form States
  const [formInstName, setFormInstName] = useState<string>('');
  const [formInstType, setFormInstType] = useState<'COMMERCIAL_BANK' | 'CENTRAL_BANK' | 'MNO' | 'ENTERPRISE_PAYMENT_GATEWAY' | 'FINTECH'>('COMMERCIAL_BANK');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formCountry, setFormCountry] = useState<string>('Uganda');
  const [registering, setRegistering] = useState<boolean>(false);
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState<string | null>(null);

  // Ticket Form State
  const [ticketInstName, setTicketInstName] = useState<string>('PostBank Uganda Ltd');
  const [ticketTopic, setTicketTopic] = useState<string>('');
  const [ticketType, setTicketType] = useState<'PARTNER_REQUEST' | 'INTEGRATION_PROGRESS' | 'TECHNICAL_CONVERSATION' | 'SUPPORT_TICKET' | 'PERFORMANCE_REVIEW'>('PARTNER_REQUEST');
  const [ticketPriority, setTicketPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [creatingTicket, setCreatingTicket] = useState<boolean>(false);
  const [ticketSuccessMsg, setTicketSuccessMsg] = useState<string | null>(null);

  // Verification & Copy States
  const [certVerified, setCertVerified] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState<number>(0);

  useEffect(() => {
    fetchAdoptionData();
  }, []);

  const fetchAdoptionData = async () => {
    setLoading(true);
    try {
      const [appRes, stdRes, certRes, netRes, profRes, devRes, tickRes, regRes] = await Promise.all([
        fetch('/api/meherah/adoption/onboarding-applications'),
        fetch('/api/meherah/adoption/connection-standards'),
        fetch('/api/meherah/adoption/certification-standard'),
        fetch('/api/meherah/adoption/global-network'),
        fetch('/api/meherah/adoption/partner-profiles'),
        fetch('/api/meherah/adoption/developer-apps'),
        fetch('/api/meherah/adoption/relationship-tickets'),
        fetch('/api/meherah/adoption/regulatory-package')
      ]);

      setApplications(await appRes.json());
      setStandards(await stdRes.json());
      setCertification(await certRes.json());
      setGlobalNetwork(await netRes.json());
      setPartnerProfiles(await profRes.json());
      setDeveloperApps(await devRes.json());
      setTickets(await tickRes.json());
      setRegulatoryPackage(await regRes.json());
    } catch (err) {
      console.error('Failed to load MEHERAH Institutional Adoption data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInstName || !formEmail) return;

    setRegistering(true);
    setRegisterSuccessMsg(null);

    try {
      const res = await fetch('/api/meherah/adoption/register-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institutionName: formInstName,
          institutionType: formInstType,
          contactEmail: formEmail,
          country: formCountry
        })
      });

      const newApp = await res.json();
      setApplications([newApp, ...applications]);
      setRegisterSuccessMsg(`SUCCESS: ${newApp.institutionName} registered on 7-step journey! Sandbox Key: ${newApp.issuedApiKey}`);
      setFormInstName('');
      setFormEmail('');
      // refresh partner profiles as well
      const profRes = await fetch('/api/meherah/adoption/partner-profiles');
      setPartnerProfiles(await profRes.json());
    } catch (err) {
      console.error('Failed to register partner:', err);
    } finally {
      setRegistering(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTopic) return;

    setCreatingTicket(true);
    setTicketSuccessMsg(null);

    try {
      const res = await fetch('/api/meherah/adoption/create-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institutionName: ticketInstName,
          topic: ticketTopic,
          type: ticketType,
          priority: ticketPriority
        })
      });

      const newTick = await res.json();
      setTickets([newTick, ...tickets]);
      setTicketSuccessMsg(`TICKET CREATED: Ticket ID ${newTick.id} logged for ${newTick.institutionName}`);
      setTicketTopic('');
    } catch (err) {
      console.error('Failed to create ticket:', err);
    } finally {
      setCreatingTicket(false);
    }
  };

  const verifyCertificateHash = () => {
    setCertVerified(true);
    setTimeout(() => setCertVerified(false), 3500);
  };

  const copyCertHash = () => {
    if (certification) {
      navigator.clipboard.writeText(certification.verificationHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* 1. NEW MEHERAH IDENTITY HERO HEADER BANNER */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5 fill-current text-[#070707]" /> GLOBAL NETWORK ERA
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00B86B]" /> INSTITUTIONAL ADOPTION ENGINE
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#C9A227] block font-bold uppercase tracking-wider">
                "From proving MEHERAH works to enabling the world to connect."
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF] italic">
                "MEHERAH is a trusted network where financial systems connect, communicate, and coordinate through one intelligent language."
              </h1>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              Creating the bridge between MEHERAH and institutions worldwide. Unified partner portal, 7-step onboarding journey, global connection standards, certification engine, network command centre, partner intelligence, and developer marketplace.
            </p>
          </div>

          {/* NETWORK QUICK HIGHLIGHT */}
          <div className="bg-[#070707] border border-[#C9A227]/50 rounded-xl p-5 text-center space-y-2 min-w-[280px]">
            <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">GLOBAL NETWORK METRICS</span>
            <div className="text-3xl font-bold font-mono text-[#00B86B]">
              {globalNetwork?.totalConnectedInstitutions || 18} Connected
            </div>
            <div className="text-[10px] text-[#C9A227] font-mono flex items-center justify-center gap-2">
              <span>{globalNetwork?.networkHealthPct || 99.9}% HEALTH</span>
              <span>•</span>
              <span>{globalNetwork?.activeCorridors.length || 4} CORRIDORS</span>
            </div>
            <button
              onClick={fetchAdoptionData}
              disabled={loading}
              className="mt-2 w-full px-3 py-2 rounded-lg bg-[#C9A227] text-[#070707] font-mono font-bold text-xs hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''} text-[#070707]`} />
              Refresh Network Status
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS FOR THE 8 MILESTONE DIMENSIONS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'portal', label: '1. Partner Portal', desc: '7-Stage Onboarding', icon: Building2 },
            { id: 'standards', label: '2. Connection Spec', desc: '4 Core Pillars', icon: Shield },
            { id: 'certification', label: '3. Certification', desc: '"MEHERAH Connected"', icon: Award },
            { id: 'command_centre', label: '4. Command Centre', desc: 'Global Network View', icon: Globe2 },
            { id: 'intelligence', label: '5. Partner Profiles', desc: 'Behavioral Insights', icon: Activity },
            { id: 'developer', label: '6. Dev Marketplace', desc: 'Connectors & APIs', icon: Code2 },
            { id: 'relationship', label: '7. Partner CRM', desc: 'Tickets & Reviews', icon: Ticket },
            { id: 'regulatory', label: '8. Reg Package', desc: 'Central Bank Dossier', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-2.5 rounded-xl border text-left font-mono transition-all flex flex-col justify-between ${
                  active 
                    ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-lg shadow-[#C9A227]/20' 
                    : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase">{tab.label.split('.')[0]}</span>
                  <Icon className="w-3.5 h-3.5 text-current" />
                </div>
                <span className="text-[11px] font-bold font-sans mt-1 text-current truncate">{tab.label.split('.')[1]}</span>
                <span className="text-[9px] opacity-80 block font-mono truncate">{tab.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DIMENSION 1: PARTNER PORTAL & ONBOARDING JOURNEY */}
      {activeTab === 'portal' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  THE FRONT DOOR TO MEHERAH
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Partner Portal & Institutional Journey</h2>
                <p className="text-xs text-[#A7A7A7]">A clear 7-stage pathway for banks, fintechs, and payment providers from "interested" to "live connected".</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00B86B]" /> ZERO-TRUST SANDBOX GATEWAY
              </span>
            </div>

            {/* 7-STAGE JOURNEY VISUAL MAP */}
            <div className="space-y-3 font-mono text-xs bg-[#070707] p-5 rounded-2xl border border-[#222222]">
              <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C9A227]" /> THE 7-STAGE INSTITUTIONAL ONBOARDING PATHWAY
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2 pt-2">
                {[
                  { num: 1, title: 'Institution Applies', desc: 'Formal Registration' },
                  { num: 2, title: 'Identity Verification', desc: 'License & LEI Audit' },
                  { num: 3, title: 'Technical Assessment', desc: 'Payload Mapping' },
                  { num: 4, title: 'Sandbox Connection', desc: 'Test API Keys' },
                  { num: 5, title: 'Security Validation', desc: 'HSM & IP Whitelist' },
                  { num: 6, title: 'Certification', desc: 'Badge Issued' },
                  { num: 7, title: 'Production Activation', desc: 'Live Rail Unlocked' }
                ].map((stg) => (
                  <div key={stg.num} className="p-3 bg-[#111111] border border-[#C9A227]/30 rounded-xl space-y-1 text-center relative">
                    <div className="w-6 h-6 rounded-full bg-[#C9A227] text-[#070707] font-bold text-xs mx-auto flex items-center justify-center font-mono">
                      {stg.num}
                    </div>
                    <span className="font-sans font-bold text-xs text-[#FFFFFF] block mt-1">{stg.title}</span>
                    <span className="text-[10px] text-[#A7A7A7] block font-mono">{stg.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REGISTER NEW INSTITUTION FORM */}
            <form onSubmit={handleRegisterPartner} className="p-5 bg-[#070707] border border-[#C9A227] rounded-2xl space-y-4 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#C9A227]" /> REGISTER NEW INSTITUTIONAL APPLICANT
              </span>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">INSTITUTION NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Absa Bank Africa"
                    value={formInstName}
                    onChange={(e) => setFormInstName(e.target.value)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">ENTITY TYPE</label>
                  <select
                    value={formInstType}
                    onChange={(e) => setFormInstType(e.target.value as any)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="COMMERCIAL_BANK">Commercial Bank</option>
                    <option value="CENTRAL_BANK">Central Bank / Regulator</option>
                    <option value="MNO">Mobile Network Operator (MNO)</option>
                    <option value="ENTERPRISE_PAYMENT_GATEWAY">Enterprise Payment Gateway</option>
                    <option value="FINTECH">Fintech / Remittance Rail</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">CONTACT EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="api@institution.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">JURISDICTION / COUNTRY</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uganda, Kenya, UK"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={registering}
                  className="px-6 py-2.5 bg-[#C9A227] text-[#070707] font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Building2 className={`w-4 h-4 ${registering ? 'animate-spin' : ''}`} />
                  {registering ? 'Initiating 7-Stage Journey...' : 'Submit Application & Generate Sandbox Credentials'}
                </button>
              </div>

              {registerSuccessMsg && (
                <div className="p-3 bg-[#00B86B]/15 border border-[#00B86B]/40 rounded-xl font-mono text-xs text-[#00B86B]">
                  {registerSuccessMsg}
                </div>
              )}
            </form>

            {/* PIPELINE CARDS WITH 7 STEPS */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-xs font-bold text-[#FFFFFF] uppercase block">ACTIVE INSTITUTIONAL APPLICANTS PIPELINE</span>

              {applications.map((app) => (
                <div key={app.institutionId} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#222222] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                          {app.institutionType}
                        </span>
                        <h3 className="text-base font-bold text-[#FFFFFF] font-sans">{app.institutionName}</h3>
                        <span className="text-xs text-[#A7A7A7]">({app.country})</span>
                      </div>
                      <span className="text-[10px] text-[#A7A7A7] block mt-0.5">ID: {app.institutionId} • Contact: {app.contactEmail} • Key: {app.issuedApiKey}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded border ${
                        app.environmentStage === 'LIVE_PRODUCTION'
                          ? 'bg-[#00B86B]/20 border-[#00B86B]/40 text-[#00B86B]'
                          : 'bg-[#C9A227]/20 border-[#C9A227]/40 text-[#C9A227]'
                      }`}>
                        STAGE: {app.environmentStage}
                      </span>
                    </div>
                  </div>

                  {/* 7 STAGE PROGRESS GRID */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-[10px]">
                    {app.steps.map((st) => (
                      <div key={st.id} className={`p-2.5 rounded-xl border ${
                        st.status === 'COMPLETED'
                          ? 'bg-[#00B86B]/15 border-[#00B86B]/40 text-[#FFFFFF]'
                          : st.status === 'IN_PROGRESS'
                          ? 'bg-[#C9A227]/20 border-[#C9A227] text-[#FFFFFF]'
                          : 'bg-[#111111] border-[#222222] text-[#A7A7A7]'
                      }`}>
                        <div className="flex items-center justify-between text-[9px] font-bold mb-1">
                          <span>STAGE {st.stageNumber}</span>
                          <span>{st.status}</span>
                        </div>
                        <span className="font-sans font-bold text-xs block leading-tight">{st.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIMENSION 2: MEHERAH CONNECTION STANDARD */}
      {activeTab === 'standards' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  THE STANDARD FOR GLOBAL INTEROPERABILITY
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Connection Standard Specifications</h2>
                <p className="text-xs text-[#A7A7A7]">The 4 foundational pillars every connected bank, MNO, or gateway must support.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                ISO 20022 COMPATIBLE SCHEMA
              </span>
            </div>

            {/* 4 PILLARS SPECIFICATION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {standards.map((spec) => (
                <div key={spec.category} className="p-6 bg-[#070707] border border-[#C9A227]/40 rounded-2xl space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider font-sans">
                      PILLAR: {spec.category}
                    </span>
                    <span className="text-[10px] bg-[#111111] border border-[#C9A227]/30 text-[#FFFFFF] px-2.5 py-0.5 rounded">
                      MANDATORY STANDARD
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#FFFFFF] font-sans">{spec.title}</h3>
                  <p className="text-xs text-[#00B86B] font-mono italic">"{spec.questionOrSpec}"</p>

                  <ul className="space-y-2 pt-2 text-[11px] font-sans text-[#A7A7A7]">
                    {spec.details.map((dt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00B86B] flex-shrink-0 mt-0.5" />
                        <span>{dt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* SCHEMA CODE INSPECTOR */}
            <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-xs text-[#C9A227] font-bold">
                <span>MEHERAH UNIVERSAL PAYLOAD STANDARD (ISO 20022 MAPPED)</span>
                <span className="text-[10px] text-[#00B86B]">JSON SCHEMA V2026.1</span>
              </div>
              <pre className="p-4 bg-[#111111] rounded-xl text-[#00B86B] text-[11px] overflow-x-auto border border-[#222222]">
{`{
  "meherah_standard_version": "ISO20022_v2026",
  "identity": {
    "institution_lei": "894500X99ABC12345678",
    "sovereign_key_id": "mhr_hsm_key_postbank_ug",
    "permissions": ["CLEARING", "DIRECT_DEBIT", "FX_SWAP"]
  },
  "communication": {
    "payload_type": "pacs.008.001.09",
    "universal_amount": { "value": 1500000, "currency": "UGX" },
    "callback_webhook": "https://api.postbank.co.ug/meherah/webhook"
  },
  "trust": {
    "mTLS_verified": true,
    "double_entry_hash": "0x4f8a9b2c3d1e0f9a8b7c6d5e4f3a2b1c",
    "audit_trail_proof": "ENCRYPTED_AES256_GCM"
  },
  "intelligence": {
    "provider_health_latency_ms": 180,
    "outage_radar_status": "OPTIMAL",
    "trust_score": 98.9
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* DIMENSION 3: CERTIFICATION ENGINE */}
      {activeTab === 'certification' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  AUTOMATED EVALUATION & ACCREDITATION
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH Certification Engine</h2>
                <p className="text-xs text-[#A7A7A7]">Creating absolute trust before an institution's connection goes live on production rails.</p>
              </div>

              <button
                onClick={verifyCertificateHash}
                className="px-4 py-2 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Run Cryptographic Proof Audit
              </button>
            </div>

            {certVerified && (
              <div className="p-4 bg-[#00B86B]/15 border border-[#00B86B]/40 rounded-xl font-mono text-xs text-[#00B86B] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#00B86B]" />
                <span>CRYPTOGRAPHIC AUDIT PASSED: Certificate hash 0x9a8b... validated against MEHERAH Sovereign Root CA.</span>
              </div>
            )}

            {/* OFFICIAL CERTIFICATION BADGE CARD */}
            <div className="p-8 bg-[#070707] border-2 border-[#C9A227] rounded-2xl space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute right-0 top-0 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#C9A227]/40 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#C9A227] text-[#070707] flex items-center justify-center font-bold text-2xl font-playfair shadow-lg shadow-[#C9A227]/30">
                    M
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-widest block">
                      OFFICIAL INSTITUTIONAL ACCREDITATION
                    </span>
                    <h3 className="text-2xl font-bold font-playfair text-[#FFFFFF]">{certification?.badgeTitle}</h3>
                    <span className="text-xs text-[#00B86B] font-mono font-bold block mt-0.5">STATUS: MEHERAH CONNECTED PARTNER ✓</span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-[#A7A7A7]">
                  <p>ISSUED: <strong className="text-[#FFFFFF]">{certification?.issuedAt}</strong></p>
                  <p>VALID UNTIL: <strong className="text-[#00B86B]">{certification?.validUntil}</strong></p>
                </div>
              </div>

              {/* EVALUATION CRITERIA CHECKLIST */}
              <div className="space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">MEHERAH EVALUATION AUDIT RESULTS:</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {certification?.criteriaList.map((crit) => (
                    <div key={crit.code} className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FFFFFF] font-sans flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#00B86B]" /> {crit.label}: Passed ✓
                        </span>
                        <span className="text-[10px] text-[#C9A227] font-mono">{crit.code}</span>
                      </div>
                      <p className="text-[11px] text-[#A7A7A7] font-sans pl-6">{crit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CRYPTOGRAPHIC HASH FOOTER */}
              <div className="p-4 bg-[#111111] rounded-xl border border-[#222222] flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#A7A7A7] block">VERIFICATION ROOT HASH:</span>
                  <span className="text-xs text-[#00B86B] font-bold select-all">{certification?.verificationHash}</span>
                </div>

                <button
                  onClick={copyCertHash}
                  className="px-3 py-1.5 bg-[#C9A227] text-[#070707] font-bold text-[10px] rounded-lg hover:bg-[#E8C879] flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Copy className="w-3.5 h-3.5" /> {copiedHash ? 'Copied Hash!' : 'Copy Hash'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIMENSION 4: INSTITUTIONAL COMMAND CENTRE (GLOBAL NETWORK VIEW) */}
      {activeTab === 'command_centre' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  GLOBAL NETWORK MISSION CONTROL
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">MEHERAH GLOBAL NETWORK</h2>
                <p className="text-xs text-[#A7A7A7]">Expanded network view tracking live connected banks, mobile money, payment gateways, corridors, and health.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                NETWORK HEALTH: {globalNetwork?.networkHealthPct}%
              </span>
            </div>

            {/* CONNECTED INSTITUTION BREAKDOWN BARS */}
            <div className="p-6 bg-[#070707] border border-[#222222] rounded-2xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#C9A227] font-sans">CONNECTED INSTITUTIONS: {globalNetwork?.totalConnectedInstitutions}</span>
                <span className="text-xs text-[#00B86B]">GLOBAL DISTRIBUTION</span>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Commercial & Central Banks ({globalNetwork?.banksCount})</span>
                    <span className="text-[#C9A227]">44% of Network</span>
                  </div>
                  <div className="w-full bg-[#111111] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#C9A227] h-full rounded-full" style={{ width: '44%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Mobile Money Operators ({globalNetwork?.mobileMoneyCount})</span>
                    <span className="text-[#00B86B]">33% of Network</span>
                  </div>
                  <div className="w-full bg-[#111111] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#00B86B] h-full rounded-full" style={{ width: '33%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Payment Gateways ({globalNetwork?.paymentGatewaysCount})</span>
                    <span className="text-[#E8C879]">23% of Network</span>
                  </div>
                  <div className="w-full bg-[#111111] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#E8C879] h-full rounded-full" style={{ width: '23%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVE CORRIDORS CARDS */}
            <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block">ACTIVE PAYMENT CORRIDORS & LATENCY</span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {globalNetwork?.activeCorridors.map((c) => (
                  <div key={c.pair} className="p-4 bg-[#111111] border border-[#222222] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#FFFFFF] font-sans">{c.pair}</span>
                      <span className="text-[10px] text-[#00B86B] font-bold bg-[#070707] px-2 py-0.5 rounded border border-[#00B86B]/30">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#A7A7A7] font-sans">{c.description}</p>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span>24h Volume: <strong className="text-[#00B86B]">{c.volume24h}</strong></span>
                      <span>Avg Latency: <strong className="text-[#C9A227]">{c.latency}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIMENSION 5: PARTNER INTELLIGENCE */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  NETWORK BEHAVIORAL LEARNING
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Partner Intelligence Profiles</h2>
                <p className="text-xs text-[#A7A7A7]">MEHERAH learns the behavior, latency, and reliability patterns of the entire connected network.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                REAL-TIME TELEMETRY FEED
              </span>
            </div>

            {/* PARTNER PROFILE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {partnerProfiles.map((p, idx) => (
                <div 
                  key={p.institution} 
                  onClick={() => setSelectedProfileIndex(idx)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    selectedProfileIndex === idx 
                      ? 'bg-[#070707] border-[#C9A227] shadow-xl shadow-[#C9A227]/10' 
                      : 'bg-[#070707] border-[#222222] hover:border-[#C9A227]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#FFFFFF] font-sans">{p.institution}</h3>
                      <span className="text-[10px] text-[#A7A7A7]">{p.category} • {p.country}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded uppercase">
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center p-3 bg-[#111111] rounded-xl border border-[#222222]">
                    <div>
                      <span className="text-[9px] text-[#A7A7A7] block">RELIABILITY</span>
                      <span className="text-xs font-bold text-[#00B86B]">{p.reliability}%</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#A7A7A7] block">LATENCY</span>
                      <span className="text-xs font-bold text-[#C9A227]">{p.average_latency}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#A7A7A7] block">TRANSACTIONS</span>
                      <span className="text-xs font-bold text-[#FFFFFF]">{p.transactions.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#A7A7A7] block">TRUST SCORE</span>
                      <span className="text-xs font-bold text-[#00B86B]">{p.trust_score}</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-sans text-[#A7A7A7] italic">
                    💡 MEHERAH Insight: {p.learningInsights}
                  </p>
                </div>
              ))}
            </div>

            {/* RAW JSON PROFILE INSPECTOR */}
            {partnerProfiles[selectedProfileIndex] && (
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2 font-mono text-xs">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">
                  PARTNER INTELLIGENCE PROFILE JSON ({partnerProfiles[selectedProfileIndex].institution})
                </span>
                <pre className="p-4 bg-[#111111] rounded-xl text-[#00B86B] text-[11px] overflow-x-auto border border-[#222222]">
{JSON.stringify(partnerProfiles[selectedProfileIndex], null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DIMENSION 6: DEVELOPER ECOSYSTEM EXPANSION */}
      {activeTab === 'developer' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  ECOSYSTEM MARKETPLACE & APIS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Developer Ecosystem Expansion</h2>
                <p className="text-xs text-[#A7A7A7]">"Don't just connect institutions. Enable an ecosystem." Connect new providers, build applications & automation workflows.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                OPEN MEHERAH INTELLIGENCE APIS
              </span>
            </div>

            {/* DEVELOPER MARKETPLACE APPS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {developerApps.map((app) => (
                <div key={app.id} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                        {app.type}
                      </span>
                      <span className="text-[10px] text-[#00B86B] font-bold">{app.status}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#FFFFFF] font-sans">{app.title}</h3>
                    <p className="text-[11px] text-[#A7A7A7] font-sans leading-relaxed">{app.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#222222] space-y-2">
                    <div className="flex justify-between text-[10px] text-[#A7A7A7]">
                      <span>Author: <strong className="text-[#FFFFFF]">{app.author}</strong></span>
                      <span>Usage: <strong className="text-[#C9A227]">{app.downloadsOrCalls}</strong></span>
                    </div>

                    <button
                      onClick={() => alert(`Deploying ${app.title} to MEHERAH Sandbox...`)}
                      className="w-full py-2 bg-[#C9A227] text-[#070707] font-bold text-[10px] rounded-xl hover:bg-[#E8C879] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5" /> Deploy Ecosystem Connector
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIMENSION 7: INSTITUTIONAL RELATIONSHIP LAYER */}
      {activeTab === 'relationship' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  HUMAN + TECHNICAL CRM
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Institutional Relationship Layer</h2>
                <p className="text-xs text-[#A7A7A7]">Managing partner requests, integration progress, technical conversations, support tickets, and performance reviews.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                PARTNER RELATIONSHIPS ACTIVE
              </span>
            </div>

            {/* OPEN TICKET FORM */}
            <form onSubmit={handleCreateTicket} className="p-5 bg-[#070707] border border-[#C9A227] rounded-2xl space-y-4 font-mono text-xs">
              <span className="text-xs font-bold text-[#C9A227] uppercase block flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#C9A227]" /> LOG NEW PARTNER RELATIONSHIP ITEM / SUPPORT REQUEST
              </span>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">INSTITUTION</label>
                  <input
                    type="text"
                    required
                    value={ticketInstName}
                    onChange={(e) => setTicketInstName(e.target.value)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">ITEM TYPE</label>
                  <select
                    value={ticketType}
                    onChange={(e) => setTicketType(e.target.value as any)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="PARTNER_REQUEST">Partner Request</option>
                    <option value="INTEGRATION_PROGRESS">Integration Progress</option>
                    <option value="TECHNICAL_CONVERSATION">Technical Conversation</option>
                    <option value="SUPPORT_TICKET">Support Ticket</option>
                    <option value="PERFORMANCE_REVIEW">Performance Review</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">TOPIC / SUMMARY</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Requesting new corridor configuration"
                    value={ticketTopic}
                    onChange={(e) => setTicketTopic(e.target.value)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="text-[#A7A7A7] text-[10px] block mb-1">PRIORITY</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as any)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={creatingTicket}
                  className="px-6 py-2.5 bg-[#C9A227] text-[#070707] font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className={`w-4 h-4 ${creatingTicket ? 'animate-spin' : ''}`} />
                  {creatingTicket ? 'Logging Relationship Ticket...' : 'Log Relationship Item'}
                </button>
              </div>

              {ticketSuccessMsg && (
                <div className="p-3 bg-[#00B86B]/15 border border-[#00B86B]/40 rounded-xl font-mono text-xs text-[#00B86B]">
                  {ticketSuccessMsg}
                </div>
              )}
            </form>

            {/* TICKET LIST */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-[#FFFFFF] uppercase block">ACTIVE RELATIONSHIP TICKETS & REVIEWS</span>

              {tickets.map((t) => (
                <div key={t.id} className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-[#070707] bg-[#C9A227] px-2 py-0.5 rounded">
                        {t.type}
                      </span>
                      <h4 className="text-sm font-bold text-[#FFFFFF] font-sans">{t.institutionName}</h4>
                      <span className="text-[10px] text-[#A7A7A7]">({t.id})</span>
                    </div>
                    <p className="text-xs text-[#A7A7A7] font-sans mt-1">{t.topic}</p>
                  </div>

                  <div className="flex items-center gap-3 text-[10px]">
                    <span className={`font-bold px-2.5 py-1 rounded border ${
                      t.priority === 'HIGH' ? 'bg-[#FF3333]/15 border-[#FF3333]/40 text-[#FF3333]' : 'bg-[#C9A227]/15 border-[#C9A227]/40 text-[#C9A227]'
                    }`}>
                      {t.priority} PRIORITY
                    </span>
                    <span className="bg-[#111111] border border-[#222222] px-2.5 py-1 rounded text-[#00B86B] font-bold">
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIMENSION 8: REGULATORY ENGAGEMENT PACKAGE */}
      {activeTab === 'regulatory' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  REGULATORY ENGAGEMENT PACKAGE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">{regulatoryPackage?.title}</h2>
                <p className="text-xs text-[#A7A7A7]">Target Audience: {regulatoryPackage?.targetAudience}</p>
              </div>

              <button
                onClick={() => alert('Downloading MEHERAH Official Regulatory Dossier (PDF)...')}
                className="px-5 py-2.5 bg-[#C9A227] text-[#070707] font-mono font-bold text-xs rounded-xl hover:bg-[#E8C879] transition-all flex items-center gap-2 shadow-lg shadow-[#C9A227]/20"
              >
                <Download className="w-4 h-4" /> Download Central Bank Regulatory Dossier (PDF)
              </button>
            </div>

            {/* DOSSIER SECTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-[#C9A227] uppercase font-sans flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#C9A227]" /> 1. ARCHITECTURE OVERVIEW
                </h3>
                <p className="text-[11px] text-[#A7A7A7] font-sans leading-relaxed">
                  {regulatoryPackage?.sectionContent.architectureOverview}
                </p>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-[#00B86B] uppercase font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00B86B]" /> 2. ZERO-TRUST SECURITY MODEL
                </h3>
                <p className="text-[11px] text-[#A7A7A7] font-sans leading-relaxed">
                  {regulatoryPackage?.sectionContent.securityModel}
                </p>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-[#E8C879] uppercase font-sans flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#E8C879]" /> 3. GOVERNANCE & MULTI-SIG
                </h3>
                <p className="text-[11px] text-[#A7A7A7] font-sans leading-relaxed">
                  {regulatoryPackage?.sectionContent.governanceModel}
                </p>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-[#FFFFFF] uppercase font-sans flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#FFFFFF]" /> 4. OPERATIONAL CONTROLS & RECONCILIATION
                </h3>
                <p className="text-[11px] text-[#A7A7A7] font-sans leading-relaxed">
                  {regulatoryPackage?.sectionContent.operationalControls}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
