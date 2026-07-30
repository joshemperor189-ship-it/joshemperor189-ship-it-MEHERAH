import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Brain,
  ShieldCheck,
  Lock,
  Bell,
  Code2,
  Sliders,
  Key,
  Globe,
  Zap,
  Check,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Database,
  Sparkles,
  Save,
  Cpu,
  Layers,
  Shield,
  Activity,
  Plus,
  Trash2,
  Copy,
  Monitor,
  Moon,
  Download,
  ExternalLink,
  SlidersHorizontal,
  FileText
} from 'lucide-react';

export type SettingsSection = 'org' | 'ai' | 'integrations' | 'security' | 'notifications' | 'developer' | 'appearance';

interface UserMember {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Compliance Officer' | 'Risk Analyst' | 'Audit Supervisor';
  status: 'Active' | 'Pending MFA';
  lastActive: string;
}

interface ConnectedProvider {
  id: string;
  name: string;
  type: 'Mobile Money' | 'Bank RTGS' | 'Cross-Border';
  status: 'Connected' | 'Degraded' | 'Maintenance';
  latency: string;
  successRate: string;
  apiKeyMasked: string;
  mtlsStatus: 'Verified' | 'Expiring Soon';
}

interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  environment: 'Production' | 'Sandbox';
  created: string;
  lastUsed: string;
}

export function SettingsCenter() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('org');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State Demo Stores
  const [orgProfile, setOrgProfile] = useState({
    name: 'MEHERAH Sovereign Financial System',
    entityType: 'Central Infrastructure Operator',
    registrationNo: 'BOU-PSP-2026-88041',
    primaryRegion: 'Uganda / East African Monetary Community',
    supportEmail: 'governance@meherah.org',
    domain: 'meherah.org'
  });

  const [aiSettings, setAiSettings] = useState({
    model: 'Gemini 2.5 Flash (Sovereign Fine-Tune)',
    intelligenceMode: 'Balanced Sovereign Governance',
    automationLevel: 'Full Autonomous (With HITL Gate)',
    hitlThreshold: 90,
    memoryRetentionDays: 90,
    autoSelfHealing: true,
    shadowTrafficEval: true
  });

  const [teamMembers, setTeamMembers] = useState<UserMember[]>([
    { id: '1', name: 'Dr. Sarah Nabatanzi', email: 's.nabatanzi@bou.go.ug', role: 'Audit Supervisor', status: 'Active', lastActive: '2 mins ago' },
    { id: '2', name: 'Kato Emmanuel', email: 'emmanuel.kato@meherah.org', role: 'Super Admin', status: 'Active', lastActive: 'Now' },
    { id: '3', name: 'Grace Akello', email: 'g.akello@stanbic.co.ug', role: 'Risk Analyst', status: 'Active', lastActive: '1 hour ago' },
    { id: '4', name: 'David Ochieng', email: 'd.ochieng@airtel.co.ug', role: 'Compliance Officer', status: 'Pending MFA', lastActive: '1 day ago' }
  ]);

  const [providers, setProviders] = useState<ConnectedProvider[]>([
    { id: 'p1', name: 'MTN MoMo API v3', type: 'Mobile Money', status: 'Connected', latency: '2.1s', successRate: '99.5%', apiKeyMasked: 'mtn_live_••••••••9841', mtlsStatus: 'Verified' },
    { id: 'p2', name: 'Airtel Money Switch', type: 'Mobile Money', status: 'Connected', latency: '2.8s', successRate: '98.9%', apiKeyMasked: 'art_live_••••••••3310', mtlsStatus: 'Verified' },
    { id: 'p3', name: 'Bank of Uganda RTGS', type: 'Bank RTGS', status: 'Connected', latency: '1.8s', successRate: '99.9%', apiKeyMasked: 'bou_rtgs_••••••••0019', mtlsStatus: 'Verified' },
    { id: 'p4', name: 'Stanbic Bank Gateway', type: 'Bank RTGS', status: 'Connected', latency: '1.9s', successRate: '99.7%', apiKeyMasked: 'stb_prod_••••••••7721', mtlsStatus: 'Verified' },
    { id: 'p5', name: 'Flutterwave Enterprise', type: 'Cross-Border', status: 'Connected', latency: '3.0s', successRate: '99.1%', apiKeyMasked: 'flw_live_••••••••1049', mtlsStatus: 'Expiring Soon' },
    { id: 'p6', name: 'Base44 Intelligence Rail', type: 'Cross-Border', status: 'Connected', latency: '1.4s', successRate: '99.8%', apiKeyMasked: 'b44_live_••••••••4488', mtlsStatus: 'Verified' }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    mfaEnforced: true,
    hsmFipsLevel3: true,
    zeroTrustEvidence: true,
    ipWhitelisting: true,
    sessionTimeoutMinutes: 30,
    allowedIps: '197.239.4.0/24, 41.210.142.12'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    outageAlerts: true,
    latencySpikeAlerts: true,
    complianceBreachAlerts: true,
    aiDigestFrequency: 'Daily Summary',
    webhookAlertsEnabled: true,
    emailRecipients: 'alerts@meherah.org, regulator-node@bou.go.ug'
  });

  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    { id: 'k1', name: 'Production Node Alpha', prefix: 'mhr_live_pk_8f...', environment: 'Production', created: '2026-06-15', lastUsed: 'Just now' },
    { id: 'k2', name: 'Regulator Oversight Read-Only', prefix: 'mhr_bou_audit_...', environment: 'Production', created: '2026-07-01', lastUsed: '5 mins ago' },
    { id: 'k3', name: 'Sandbox Testing Key', prefix: 'mhr_sbx_test_...', environment: 'Sandbox', created: '2026-07-20', lastUsed: '2 hours ago' }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddNewApiKey = () => {
    const newKey: ApiKeyItem = {
      id: 'k' + (apiKeys.length + 1),
      name: `New API Key #${apiKeys.length + 1}`,
      prefix: 'mhr_live_pk_' + Math.random().toString(36).substring(2, 7) + '...',
      environment: 'Production',
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setApiKeys([...apiKeys, newKey]);
    showToast('New production API key generated with FIPS 140-2 cryptographic signature.');
  };

  const navItems: { id: SettingsSection; label: string; icon: any; description: string }[] = [
    { id: 'org', label: 'Organization & Team', icon: Building2, description: 'Profile, user accounts, and governance roles' },
    { id: 'ai', label: 'AI Behavior & Controls', icon: Brain, description: 'Model tuning, HITL gates, and memory policy' },
    { id: 'integrations', label: 'Connected Services', icon: Zap, description: 'Banks, Mobile Money, and API connections' },
    { id: 'security', label: 'Security & Zero-Trust', icon: Lock, description: 'HSM keys, MFA, encryption, and IP controls' },
    { id: 'notifications', label: 'Alerts & Notifications', icon: Bell, description: 'Outage alerts, compliance webhooks, and digests' },
    { id: 'developer', label: 'Developer & API Keys', icon: Code2, description: 'API credentials, webhooks, and sandbox tools' },
    { id: 'appearance', label: 'Display & Preferences', icon: Sliders, description: 'Theme modes, telemetry density, and audio' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0B0B0B] text-[#FFFFFF] p-4 sm:p-6 md:p-8 space-y-6 font-sans">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 border-b border-[#222222] pb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A34A] font-bold">
                SYSTEM CONFIGURATION & CONTROL CENTER
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 font-bold">
                ENTERPRISE ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF] font-playfair mt-1">
              MEHERAH Settings Center
            </h1>
            <p className="text-xs sm:text-sm text-[#A7A7A7] mt-1">
              Manage organization profiles, AI model parameters, bank connectors, zero-trust security, and API keys.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/MEHERAH-AI-COMPLETE-BACKUP.zip"
              download="MEHERAH-AI-COMPLETE-BACKUP.zip"
              onClick={() => showToast('Downloading MEHERAH-AI-COMPLETE-BACKUP.zip directly to your phone / local storage!')}
              className="px-4 py-2 rounded-xl bg-[#00B86B] hover:bg-[#00D078] text-[#0B0B0B] text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <Download size={14} />
              <span>Save Backup to Phone Memory</span>
            </a>
            <button
              onClick={() => showToast('Configuration synchronized across all regional MEHERAH fleet nodes.')}
              className="px-4 py-2 rounded-xl bg-[#070707] hover:bg-[#1A1A1A] border border-[#C8A34A]/50 text-[#C8A34A] hover:text-[#FFFFFF] text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw size={14} />
              <span>Sync Fleet Config</span>
            </button>
            <button
              onClick={() => showToast('Settings saved and verified with SHA-256 audit ledger entry.')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C8A34A] to-[#E8C879] hover:from-[#E8C879] hover:to-[#FFFFFF] text-[#0B0B0B] text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gradient-to-r from-[#C8A34A] via-[#E8C879]/30 to-transparent" />
      </motion.div>

      {/* TOAST FEEDBACK */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-[#111111] border border-[#C8A34A] text-[#FFFFFF] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-mono text-xs"
          >
            <CheckCircle2 size={16} className="text-[#00B86B]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-1 bg-[#111111] border border-[#222222] rounded-2xl p-3 space-y-1.5 shadow-xl sticky top-24">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#A7A7A7] font-bold">
            CONFIGURATION DOMAINS
          </div>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#1A1A1A] border border-[#C8A34A]/60 text-[#FFFFFF] shadow-md'
                    : 'hover:bg-[#161616] text-[#A7A7A7] hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#C8A34A]/20 text-[#C8A34A]' : 'bg-[#070707] text-[#A7A7A7]'}`}>
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <strong className="text-xs font-mono font-bold block">{item.label}</strong>
                    <span className="text-[10px] text-[#777777] hidden sm:block truncate">{item.description}</span>
                  </div>
                </div>
                {isActive && <div className="w-1.5 h-6 bg-[#C8A34A] rounded-full" />}
              </button>
            );
          })}
        </div>

        {/* CONTENT PANEL */}
        <div className="lg:col-span-3 bg-[#111111] border border-[#222222] rounded-2xl p-6 shadow-2xl space-y-6">
          {/* SECTION 1: ORGANIZATION & TEAM */}
          {activeSection === 'org' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] flex items-center gap-2">
                    <Building2 size={20} className="text-[#C8A34A]" /> Organization & Team Management
                  </h2>
                  <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                    Configure institutional entity profiles, regulatory references, and team member permissions.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#00B86B] bg-[#00B86B]/10 border border-[#00B86B]/30 px-3 py-1 rounded-full">
                  Verified Entity
                </span>
              </div>

              {/* ORGANIZATION PROFILE FORM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#A7A7A7]">Organization Legal Name</label>
                  <input
                    type="text"
                    value={orgProfile.name}
                    onChange={(e) => setOrgProfile({ ...orgProfile, name: e.target.value })}
                    className="w-full bg-[#070707] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-xs font-mono text-[#FFFFFF] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#A7A7A7]">Entity Architecture Role</label>
                  <input
                    type="text"
                    value={orgProfile.entityType}
                    onChange={(e) => setOrgProfile({ ...orgProfile, entityType: e.target.value })}
                    className="w-full bg-[#070707] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-xs font-mono text-[#FFFFFF] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#A7A7A7]">Central Bank License Reference</label>
                  <input
                    type="text"
                    value={orgProfile.registrationNo}
                    onChange={(e) => setOrgProfile({ ...orgProfile, registrationNo: e.target.value })}
                    className="w-full bg-[#070707] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-xs font-mono text-[#FFFFFF] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#A7A7A7]">Sovereign Operational Region</label>
                  <input
                    type="text"
                    value={orgProfile.primaryRegion}
                    onChange={(e) => setOrgProfile({ ...orgProfile, primaryRegion: e.target.value })}
                    className="w-full bg-[#070707] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-xs font-mono text-[#FFFFFF] outline-none transition-all"
                  />
                </div>
              </div>

              {/* USER ACCOUNTS & TEAM ROLES */}
              <div className="space-y-3 pt-4 border-t border-[#222222]">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-mono text-[#C8A34A] flex items-center gap-2">
                    <Users size={16} /> Enterprise Team Members ({teamMembers.length})
                  </h3>
                  <button
                    onClick={() => {
                      const name = prompt('Enter Member Name:');
                      const email = prompt('Enter Member Email:');
                      if (name && email) {
                        setTeamMembers([
                          ...teamMembers,
                          {
                            id: String(Date.now()),
                            name,
                            email,
                            role: 'Risk Analyst',
                            status: 'Pending MFA',
                            lastActive: 'Just invited'
                          }
                        ]);
                        showToast(`Invitation sent to ${email} with Zero-Trust onboarding link.`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#C8A34A]/20 hover:bg-[#C8A34A]/30 border border-[#C8A34A] text-[#C8A34A] text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} /> Add Team Member
                  </button>
                </div>

                <div className="overflow-x-auto border border-[#222222] rounded-xl bg-[#070707]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#222222] text-[#A7A7A7] uppercase text-[10px] tracking-wider">
                        <th className="p-3 font-semibold">User</th>
                        <th className="p-3 font-semibold">Role</th>
                        <th className="p-3 font-semibold">Security Status</th>
                        <th className="p-3 font-semibold">Last Active</th>
                        <th className="p-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A]">
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-[#111111]">
                          <td className="p-3">
                            <strong className="text-[#FFFFFF] block">{member.name}</strong>
                            <span className="text-[10px] text-[#A7A7A7]">{member.email}</span>
                          </td>
                          <td className="p-3 text-[#E8C879] font-bold">{member.role}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${member.status === 'Active' ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40' : 'bg-[#E8C879]/20 text-[#E8C879] border border-[#E8C879]/40'}`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="p-3 text-[#A7A7A7]">{member.lastActive}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setTeamMembers(teamMembers.filter((m) => m.id !== member.id));
                                showToast(`Revoked permissions for ${member.name}.`);
                              }}
                              className="text-red-400 hover:text-red-300 p-1 transition-all cursor-pointer"
                              title="Revoke access"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 2: AI BEHAVIOR & CONTROLS */}
          {activeSection === 'ai' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] flex items-center gap-2">
                    <Brain size={20} className="text-[#C8A34A]" /> AI Intelligence & Governance Controls
                  </h2>
                  <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                    Tune neural routing models, human approval confidence gates, and autonomous repair rules.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#C8A34A] bg-[#C8A34A]/10 border border-[#C8A34A]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={12} /> Gemini 2.5 Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-[#A7A7A7] font-bold">Selected AI Foundation Engine</label>
                  <select
                    value={aiSettings.model}
                    onChange={(e) => setAiSettings({ ...aiSettings, model: e.target.value })}
                    className="w-full bg-[#070707] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-[#FFFFFF] outline-none"
                  >
                    <option>Gemini 2.5 Flash (Sovereign Fine-Tune)</option>
                    <option>Gemini 2.5 Pro (Deep Research & Complex Risk Matrix)</option>
                    <option>MEHERAH On-Premise Sovereign Engine (Isolated Node)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#A7A7A7] font-bold">Automation Execution Mode</label>
                  <select
                    value={aiSettings.automationLevel}
                    onChange={(e) => setAiSettings({ ...aiSettings, automationLevel: e.target.value })}
                    className="w-full bg-[#070707] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-[#FFFFFF] outline-none"
                  >
                    <option>Full Autonomous (With HITL Gate)</option>
                    <option>Strict Threshold Gated (Confidence &gt; 95%)</option>
                    <option>Advisory Only (Human Authorization Required)</option>
                  </select>
                </div>
              </div>

              {/* SLIDER FOR HITL CONFIDENCE GATE */}
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-3 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#FFFFFF]">Human-in-the-Loop (HITL) Intercept Threshold</span>
                  <span className="text-sm font-bold text-[#C8A34A]">{aiSettings.hitlThreshold}% Confidence Score</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="99"
                  value={aiSettings.hitlThreshold}
                  onChange={(e) => setAiSettings({ ...aiSettings, hitlThreshold: Number(e.target.value) })}
                  className="w-full accent-[#C8A34A] bg-[#222222] h-2 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-[#A7A7A7]">
                  Decisions with AI confidence score below <strong className="text-[#C8A34A]">{aiSettings.hitlThreshold}%</strong> are automatically frozen and forwarded to human central bank regulators or supervisors.
                </p>
              </div>

              {/* TOGGLES FOR AUTONOMOUS CAPABILITIES */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3.5 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs">
                  <div>
                    <strong className="text-[#FFFFFF] block">Autonomous Self-Healing Failover</strong>
                    <span className="text-[11px] text-[#A7A7A7]">Auto-reroute failed payloads to alternative banks in under 150ms without loss.</span>
                  </div>
                  <button
                    onClick={() => {
                      setAiSettings({ ...aiSettings, autoSelfHealing: !aiSettings.autoSelfHealing });
                      showToast(`Autonomous self-healing ${!aiSettings.autoSelfHealing ? 'ENABLED' : 'DISABLED'}.`);
                    }}
                    className={`px-4 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${aiSettings.autoSelfHealing ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]' : 'bg-[#222222] text-[#A7A7A7]'}`}
                  >
                    {aiSettings.autoSelfHealing ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#070707] border border-[#222222] rounded-xl font-mono text-xs">
                  <div>
                    <strong className="text-[#FFFFFF] block">Shadow Traffic Evaluation Pipeline</strong>
                    <span className="text-[11px] text-[#A7A7A7]">Continuously evaluate upcoming canary models against live network traffic in parallel.</span>
                  </div>
                  <button
                    onClick={() => {
                      setAiSettings({ ...aiSettings, shadowTrafficEval: !aiSettings.shadowTrafficEval });
                      showToast(`Shadow traffic pipeline ${!aiSettings.shadowTrafficEval ? 'ACTIVE' : 'PAUSED'}.`);
                    }}
                    className={`px-4 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${aiSettings.shadowTrafficEval ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]' : 'bg-[#222222] text-[#A7A7A7]'}`}
                  >
                    {aiSettings.shadowTrafficEval ? 'ACTIVE' : 'PAUSED'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 3: CONNECTED SERVICES */}
          {activeSection === 'integrations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] flex items-center gap-2">
                    <Zap size={20} className="text-[#C8A34A]" /> Connected Financial Services & APIs
                  </h2>
                  <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                    Live connection status, API credentials, mTLS certificates, and telemetry metrics for all financial nodes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const pName = prompt('Enter New Financial Provider Name (e.g., Centenary Bank API):');
                    if (pName) {
                      setProviders([
                        ...providers,
                        {
                          id: 'p' + (providers.length + 1),
                          name: pName,
                          type: 'Bank RTGS',
                          status: 'Connected',
                          latency: '2.0s',
                          successRate: '99.8%',
                          apiKeyMasked: 'new_api_' + Math.random().toString(36).substring(2, 8),
                          mtlsStatus: 'Verified'
                        }
                      ]);
                      showToast(`Integrated node "${pName}" into MEHERAH sovereign network mesh.`);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#C8A34A] hover:bg-[#E8C879] text-[#0B0B0B] text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} /> Connect New Node
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((p) => (
                  <div key={p.id} className="p-4 bg-[#070707] border border-[#222222] hover:border-[#C8A34A]/50 rounded-2xl space-y-3 transition-all font-mono text-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <strong className="text-[#FFFFFF] text-sm block font-bold">{p.name}</strong>
                        <span className="text-[10px] text-[#A7A7A7]">{p.type}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B86B] animate-pulse" /> {p.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#1A1A1A] text-[11px]">
                      <div>
                        <span className="text-[#777777] block text-[9px] uppercase">Latency</span>
                        <strong className="text-[#E8C879]">{p.latency}</strong>
                      </div>
                      <div>
                        <span className="text-[#777777] block text-[9px] uppercase">Success</span>
                        <strong className="text-[#00B86B]">{p.successRate}</strong>
                      </div>
                      <div>
                        <span className="text-[#777777] block text-[9px] uppercase">mTLS Cert</span>
                        <strong className={p.mtlsStatus === 'Verified' ? 'text-[#00B86B]' : 'text-[#E8C879]'}>{p.mtlsStatus}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[#777777]">{p.apiKeyMasked}</span>
                      <button
                        onClick={() => showToast(`Initiated mTLS handshake verification for ${p.name}. Response: 200 OK (0.4ms)`)}
                        className="text-[10px] text-[#C8A34A] hover:underline cursor-pointer"
                      >
                        Test Ping
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 4: SECURITY & ZERO-TRUST */}
          {activeSection === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] flex items-center gap-2">
                    <Lock size={20} className="text-[#C8A34A]" /> Security, Cryptography & Zero-Trust
                  </h2>
                  <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                    Configure FIPS 140-2 Level 3 HSM signing, mandatory MFA, IP whitelisting, and Zero-Trust access evidence.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#00B86B] bg-[#00B86B]/10 border border-[#00B86B]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ShieldCheck size={14} /> FIPS 140-2 Level 3 Active
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl flex items-center justify-between">
                  <div>
                    <strong className="text-[#FFFFFF] block font-bold text-sm">FIPS 140-2 Level 3 Hardware Security Module (HSM)</strong>
                    <span className="text-[11px] text-[#A7A7A7]">All sovereign financial payloads signed with tamper-proof cryptographic hardware tokens.</span>
                  </div>
                  <button
                    onClick={() => showToast('HSM Key rotation scheduled with central bank key ceremony protocols.')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#C8A34A]/20 text-[#C8A34A] border border-[#C8A34A] text-xs font-bold cursor-pointer hover:bg-[#C8A34A]/30"
                  >
                    Verify HSM Keys
                  </button>
                </div>

                <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl flex items-center justify-between">
                  <div>
                    <strong className="text-[#FFFFFF] block font-bold text-sm">Mandatory Zero-Trust Intent Evidence</strong>
                    <span className="text-[11px] text-[#A7A7A7]">Require explicit user intent evidence hash before any financial transaction payload executes.</span>
                  </div>
                  <button
                    onClick={() => {
                      setSecuritySettings({ ...securitySettings, zeroTrustEvidence: !securitySettings.zeroTrustEvidence });
                      showToast(`Zero-Trust intent verification ${!securitySettings.zeroTrustEvidence ? 'ENFORCED' : 'OFF'}.`);
                    }}
                    className={`px-4 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${securitySettings.zeroTrustEvidence ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]' : 'bg-[#222222] text-[#A7A7A7]'}`}
                  >
                    {securitySettings.zeroTrustEvidence ? 'ENFORCED' : 'OFF'}
                  </button>
                </div>

                <div className="space-y-2 p-4 bg-[#070707] border border-[#222222] rounded-2xl">
                  <label className="text-[#FFFFFF] font-bold block text-sm">Whitelisted IP Subnets (CIDR Block)</label>
                  <p className="text-[11px] text-[#A7A7A7]">Only incoming payload requests from these IP addresses will be processed by MEHERAH nodes.</p>
                  <input
                    type="text"
                    value={securitySettings.allowedIps}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, allowedIps: e.target.value })}
                    className="w-full bg-[#111111] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-xs font-mono text-[#FFFFFF] outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 5: NOTIFICATIONS & ALERTS */}
          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] flex items-center gap-2">
                    <Bell size={20} className="text-[#C8A34A]" /> Alerts, Webhooks & Escalations
                  </h2>
                  <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                    Configure real-time outage alerts, latency surge notifications, and central bank reporting webhooks.
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-2 p-4 bg-[#070707] border border-[#222222] rounded-2xl">
                  <label className="text-[#FFFFFF] font-bold block text-sm">Emergency Alert Recipients (Comma Separated)</label>
                  <input
                    type="text"
                    value={notificationSettings.emailRecipients}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailRecipients: e.target.value })}
                    className="w-full bg-[#111111] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-xs font-mono text-[#FFFFFF] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl flex items-center justify-between">
                    <div>
                      <strong className="text-[#FFFFFF] block font-bold">Network Outage Alerts</strong>
                      <span className="text-[10px] text-[#A7A7A7]">Trigger instant SMS/Email if any provider drops below 98% uptime.</span>
                    </div>
                    <button
                      onClick={() => {
                        setNotificationSettings({ ...notificationSettings, outageAlerts: !notificationSettings.outageAlerts });
                        showToast(`Outage alerts ${!notificationSettings.outageAlerts ? 'ACTIVE' : 'MUTED'}.`);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${notificationSettings.outageAlerts ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]' : 'bg-[#222222] text-[#A7A7A7]'}`}
                    >
                      {notificationSettings.outageAlerts ? 'ACTIVE' : 'MUTED'}
                    </button>
                  </div>

                  <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl flex items-center justify-between">
                    <div>
                      <strong className="text-[#FFFFFF] block font-bold">Compliance Breach Trigger</strong>
                      <span className="text-[10px] text-[#A7A7A7]">Directly notify Bank of Uganda regulator portal on policy intercept.</span>
                    </div>
                    <button
                      onClick={() => {
                        setNotificationSettings({ ...notificationSettings, complianceBreachAlerts: !notificationSettings.complianceBreachAlerts });
                        showToast(`Compliance breach alert ${!notificationSettings.complianceBreachAlerts ? 'ACTIVE' : 'MUTED'}.`);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${notificationSettings.complianceBreachAlerts ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]' : 'bg-[#222222] text-[#A7A7A7]'}`}
                    >
                      {notificationSettings.complianceBreachAlerts ? 'ACTIVE' : 'MUTED'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 6: DEVELOPER & API KEYS */}
          {activeSection === 'developer' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] flex items-center gap-2">
                    <Code2 size={20} className="text-[#C8A34A]" /> Developer Tools & API Management
                  </h2>
                  <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                    Manage secret production keys, configure webhook signatures, and trigger sandbox simulation testing.
                  </p>
                </div>
                <button
                  onClick={handleAddNewApiKey}
                  className="px-4 py-2 rounded-xl bg-[#C8A34A] hover:bg-[#E8C879] text-[#0B0B0B] text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} /> Generate API Key
                </button>
              </div>

              {/* API KEYS TABLE */}
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-xs font-bold text-[#C8A34A] uppercase tracking-wider flex items-center gap-2">
                  <Key size={14} /> Active Sovereign API Credentials ({apiKeys.length})
                </h3>

                <div className="overflow-x-auto border border-[#222222] rounded-xl bg-[#070707]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#222222] text-[#A7A7A7] uppercase text-[10px] tracking-wider">
                        <th className="p-3 font-semibold">Key Identifier</th>
                        <th className="p-3 font-semibold">Environment</th>
                        <th className="p-3 font-semibold">Prefix</th>
                        <th className="p-3 font-semibold">Created</th>
                        <th className="p-3 font-semibold">Last Used</th>
                        <th className="p-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A]">
                      {apiKeys.map((key) => (
                        <tr key={key.id} className="hover:bg-[#111111]">
                          <td className="p-3 font-bold text-[#FFFFFF]">{key.name}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${key.environment === 'Production' ? 'bg-[#C8A34A]/20 text-[#C8A34A] border border-[#C8A34A]/40' : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'}`}>
                              {key.environment}
                            </span>
                          </td>
                          <td className="p-3 text-[#A7A7A7]">{key.prefix}</td>
                          <td className="p-3 text-[#A7A7A7]">{key.created}</td>
                          <td className="p-3 text-[#E8C879]">{key.lastUsed}</td>
                          <td className="p-3 text-right flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(key.prefix);
                                showToast(`Copied key identifier ${key.prefix} to clipboard.`);
                              }}
                              className="text-[#A7A7A7] hover:text-[#FFFFFF] p-1 cursor-pointer"
                              title="Copy Key Prefix"
                            >
                              <Copy size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setApiKeys(apiKeys.filter((k) => k.id !== key.id));
                                showToast(`Revoked API key "${key.name}".`);
                              }}
                              className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                              title="Revoke Key"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* WEBHOOK ENDPOINT CONFIG */}
              <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-[#FFFFFF] font-bold text-sm flex items-center gap-2">
                    <Terminal size={16} className="text-[#C8A34A]" /> System Webhook Subscriptions
                  </strong>
                  <span className="text-[10px] text-[#00B86B]">HMAC SHA-256 SIGNED</span>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-[#A7A7A7]">Webhook Delivery URL</label>
                  <input
                    type="text"
                    defaultValue="https://api.meherah.org/v1/webhooks/events"
                    className="w-full bg-[#111111] border border-[#333333] focus:border-[#C8A34A] rounded-xl p-3 text-xs text-[#FFFFFF] outline-none"
                  />
                </div>
              </div>

              {/* INSTITUTIONAL BACKUP PACKAGE DOWNLOAD CARD */}
              <div className="p-5 bg-[#070707] border border-[#00B86B]/60 rounded-2xl space-y-4 font-mono text-xs shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#00B86B] tracking-widest block">
                      OFFICIAL INSTITUTIONAL MASTER BACKUP
                    </span>
                    <strong className="text-base font-bold text-[#FFFFFF] flex items-center gap-2 mt-0.5">
                      <FileText size={18} className="text-[#00B86B]" /> MEHERAH-AI-COMPLETE-BACKUP.zip
                    </strong>
                    <p className="text-[11px] text-[#A7A7A7] mt-1">
                      Contains complete frontend source code, backend server, PID decision engines, FIPS 140-2 HSM modules, PostgreSQL schemas, and Bank of Uganda verification test suite.
                    </p>
                  </div>
                  <a
                    href="/MEHERAH-AI-COMPLETE-BACKUP.zip"
                    download="MEHERAH-AI-COMPLETE-BACKUP.zip"
                    onClick={() => showToast('Direct download initiated! Saving MEHERAH-AI-COMPLETE-BACKUP.zip to phone memory / Downloads folder.')}
                    className="px-5 py-3 rounded-xl bg-[#00B86B] hover:bg-[#00D078] text-[#0B0B0B] font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Download size={16} />
                    <span>Download to Phone Memory</span>
                  </a>
                </div>
                <div className="p-3 bg-[#111111] rounded-xl border border-[#222222] text-[10px] text-[#A7A7A7] flex items-center justify-between">
                  <span>Package Status: <strong className="text-[#00B86B]">Ready for Offline Extraction</strong></span>
                  <span>Target: <strong className="text-[#E8C879]">Mobile Downloads / Device Storage</strong></span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 7: APPEARANCE & PREFERENCES */}
          {activeSection === 'appearance' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] flex items-center gap-2">
                    <Sliders size={20} className="text-[#C8A34A]" /> Display & System Preferences
                  </h2>
                  <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                    Customize institutional theme contrast, telemetry density, and audio feedback signals.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#070707] border border-[#C8A34A] rounded-2xl space-y-2">
                  <strong className="text-[#FFFFFF] font-bold block text-sm flex items-center gap-2">
                    <Moon size={16} className="text-[#C8A34A]" /> Sovereign Deep Matte Black (Default)
                  </strong>
                  <p className="text-[11px] text-[#A7A7A7]">
                    Optimized for 24/7 mission control monitoring rooms and executive governance viewports.
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] bg-[#C8A34A]/20 text-[#C8A34A] font-bold border border-[#C8A34A]/40">
                    ACTIVE THEME
                  </span>
                </div>

                <div className="p-4 bg-[#070707] border border-[#222222] rounded-2xl space-y-2 opacity-75">
                  <strong className="text-[#FFFFFF] font-bold block text-sm flex items-center gap-2">
                    <Monitor size={16} className="text-[#A7A7A7]" /> Executive High-Contrast Gold
                  </strong>
                  <p className="text-[11px] text-[#A7A7A7]">
                    High contrast typography mode certified for regulator room presentation screens.
                  </p>
                  <button
                    onClick={() => showToast('Switched display density to High-Contrast Executive Mode.')}
                    className="px-3 py-1 rounded-xl bg-[#222222] text-[#A7A7A7] text-[10px] font-bold cursor-pointer hover:bg-[#333333]"
                  >
                    Select Mode
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsCenter;
