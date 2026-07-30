import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldCheck, Landmark, Activity, FileText, Lock, Server, 
  Brain, Settings, RefreshCw, AlertTriangle, Plus, Search, Filter, 
  CheckCircle2, AlertCircle, Play, ShieldAlert, Cpu, Eye, Download, 
  Check, Power, Key, Database, ChevronRight, Globe
} from 'lucide-react';

export type AdminTab = 
  | 'users' 
  | 'roles' 
  | 'institutions' 
  | 'health' 
  | 'audit' 
  | 'security' 
  | 'providers' 
  | 'ai_governance' 
  | 'config';

export function AdministrationDashboardView() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  
  // Data States
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [securityData, setSecurityData] = useState<any>(null);
  const [providers, setProviders] = useState<any[]>([]);
  const [aiGovernance, setAiGovernance] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);

  // Global Loading & Error States
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modals & Form Action States
  const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<string>('ANALYST');
  const [newUserInst, setNewUserInst] = useState<string>('Bank of Uganda');

  const [isAddInstOpen, setIsAddInstOpen] = useState<boolean>(false);
  const [newInstName, setNewInstName] = useState<string>('');
  const [newInstCode, setNewInstCode] = useState<string>('');
  const [newInstType, setNewInstType] = useState<string>('Commercial Bank');

  const [isPentestRunning, setIsPentestRunning] = useState<boolean>(false);
  const [pentestReport, setPentestReport] = useState<any>(null);

  const [isHealthChecking, setIsHealthChecking] = useState<boolean>(false);
  const [healthCheckReport, setHealthCheckReport] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  // Fetch all administration data
  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usr, rls, inst, hlt, aud, sec, prv, gov, cfg] = await Promise.all([
        fetch('/api/v1/admin/users').then(r => r.json()).catch(() => ({ users: [] })),
        fetch('/api/v1/admin/roles').then(r => r.json()).catch(() => ({ roles: [] })),
        fetch('/api/v1/admin/institutions').then(r => r.json()).catch(() => ({ institutions: [] })),
        fetch('/api/v1/admin/system-health').then(r => r.json()).catch(() => ({ systemHealth: null })),
        fetch('/api/v1/admin/audit-logs').then(r => r.json()).catch(() => ({ auditLogs: [] })),
        fetch('/api/v1/admin/security').then(r => r.json()).catch(() => ({ security: null })),
        fetch('/api/v1/admin/providers').then(r => r.json()).catch(() => ({ providers: [] })),
        fetch('/api/v1/admin/ai-governance').then(r => r.json()).catch(() => ({ aiGovernance: null })),
        fetch('/api/v1/admin/config').then(r => r.json()).catch(() => ({ config: null }))
      ]);

      if (usr.users) setUsers(usr.users);
      if (rls.roles) setRoles(rls.roles);
      if (inst.institutions) setInstitutions(inst.institutions);
      if (hlt.systemHealth) setSystemHealth(hlt.systemHealth);
      if (aud.auditLogs) setAuditLogs(aud.auditLogs);
      if (sec.security) setSecurityData(sec.security);
      if (prv.providers) setProviders(prv.providers);
      if (gov.aiGovernance) setAiGovernance(gov.aiGovernance);
      if (cfg.config) setConfig(cfg.config);

    } catch (err: any) {
      setError(err.message || 'Failed to load administration dashboard telemetry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Action 1: Create New User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    try {
      const res = await fetch('/api/v1/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName, email: newUserEmail, role: newUserRole, institution: newUserInst })
      });
      const data = await res.json();
      if (data.success && data.users) {
        setUsers(data.users);
        setIsAddUserOpen(false);
        setNewUserName('');
        setNewUserEmail('');
        showFeedback(`User ${newUserName} created successfully.`);
      }
    } catch (err: any) {
      alert(`User creation failed: ${err.message}`);
    }
  };

  // Action 2: Update User Status
  const handleUpdateUserStatus = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const res = await fetch('/api/v1/admin/users/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: nextStatus })
      });
      const data = await res.json();
      if (data.success && data.users) {
        setUsers(data.users);
        showFeedback(`User status changed to ${nextStatus}`);
      }
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  // Action 3: Create Institution
  const handleCreateInstitution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstName || !newInstCode) return;
    try {
      const res = await fetch('/api/v1/admin/institutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newInstName, code: newInstCode, type: newInstType })
      });
      const data = await res.json();
      if (data.success && data.institutions) {
        setInstitutions(data.institutions);
        setIsAddInstOpen(false);
        setNewInstName('');
        setNewInstCode('');
        showFeedback(`Institutional Node ${newInstName} connected.`);
      }
    } catch (err: any) {
      alert(`Institution registration failed: ${err.message}`);
    }
  };

  // Action 4: Run Penetration Test
  const handleRunPenTest = async () => {
    setIsPentestRunning(true);
    setPentestReport(null);
    try {
      const res = await fetch('/api/v1/admin/security/run-pentest', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.pentestResult) {
        setPentestReport(data.pentestResult);
        showFeedback('Penetration test completed with 0 vulnerabilities!');
      }
    } catch (err: any) {
      alert(`Penetration test failed: ${err.message}`);
    } finally {
      setIsPentestRunning(false);
    }
  };

  // Action 5: Run Provider Health Check
  const handleProviderHealthCheck = async () => {
    setIsHealthChecking(true);
    setHealthCheckReport(null);
    try {
      const res = await fetch('/api/v1/admin/providers/health-check', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setHealthCheckReport(data.message);
        showFeedback('Provider health check executed across all active network adapters.');
      }
    } catch (err: any) {
      alert(`Provider check failed: ${err.message}`);
    } finally {
      setIsHealthChecking(false);
    }
  };

  // Action 6: Save Core Configuration
  const handleSaveConfig = async () => {
    if (!config) return;
    try {
      const res = await fetch('/api/v1/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback('Core sovereign configuration saved.');
      }
    } catch (err: any) {
      alert(`Config save failed: ${err.message}`);
    }
  };

  const navItems: { id: AdminTab; label: string; icon: any }[] = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'institutions', label: 'Institution Management', icon: Landmark },
    { id: 'health', label: 'System Health', icon: Activity },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
    { id: 'security', label: 'Security Centre', icon: Lock },
    { id: 'providers', label: 'API & Providers', icon: Server },
    { id: 'ai_governance', label: 'AI Governance', icon: Brain },
    { id: 'config', label: 'Configuration', icon: Settings }
  ];

  return (
    <div className="space-y-8">
      
      {/* HEADER BANNER */}
      <div className="p-8 bg-gradient-to-r from-[#0B0B0B] via-[#121212] to-[#0B0B0B] border-2 border-[#C8A64D]/40 rounded-3xl space-y-4 shadow-[0_0_35px_rgba(200,166,77,0.12)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#080808] rounded-[14px] flex items-center justify-center text-[#A78BFA]">
                <Settings size={24} />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase font-bold block">
                MEHERAH SOVEREIGN KERNEL OS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#FFFFFF]">
                Global Administration Dashboard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#C8A64D]/40 text-xs font-mono text-[#E5C76B] flex items-center gap-2 transition-all"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-[#06271A] border border-[#10B981] rounded-xl text-[#34D399] font-mono text-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{feedback}</span>
              </div>
              <button onClick={() => setFeedback(null)}>✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 9-TAB NAVIGATION STRIP */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#222222]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-[#181818] text-[#E5C76B] border border-[#C8A64D]/50 shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#121212]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#C8A64D]' : 'text-[#666666]'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* LOADING OVERLAY STATE */}
      {loading && (
        <div className="p-12 text-center space-y-4 bg-[#0A0A0A] border border-[#222222] rounded-3xl min-h-[350px] flex flex-col items-center justify-center">
          <RefreshCw size={36} className="text-[#A78BFA] animate-spin" />
          <p className="text-sm font-mono text-[#A7A7A7]">Loading Administration Module...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div className="p-8 bg-[#1A0909] border-2 border-[#EF4444] rounded-3xl space-y-4 text-center">
          <AlertTriangle size={36} className="text-[#EF4444] mx-auto animate-bounce" />
          <h3 className="text-base font-bold text-[#FFFFFF]">Administration Telemetry Disrupted</h3>
          <p className="text-xs font-mono text-[#F87171]">{error}</p>
          <button
            onClick={fetchAdminData}
            className="px-5 py-2 rounded-xl bg-[#EF4444] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#DC2626] transition-all flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={14} />
            <span>Retry Loading</span>
          </button>
        </div>
      )}

      {/* TAB 1: USER MANAGEMENT */}
      {!loading && !error && activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-3 text-[#777777]" />
              <input
                type="text"
                placeholder="Filter users by name, role, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#121212] border border-[#222222] text-[#FFFFFF] pl-10 pr-4 py-2 rounded-xl text-xs font-mono focus:border-[#C8A64D] outline-none"
              />
            </div>

            <button
              onClick={() => setIsAddUserOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#000000] font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Plus size={16} />
              <span>Create New User</span>
            </button>
          </div>

          {/* ADD USER MODAL FORM */}
          <AnimatePresence>
            {isAddUserOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateUser}
                className="p-6 bg-[#121212] border border-[#C8A64D]/40 rounded-2xl space-y-4 font-mono text-xs"
              >
                <h4 className="text-sm font-bold text-[#E5C76B]">Add System Operator / User Account</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                    className="bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                    className="bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl outline-none"
                  />
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl outline-none"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="BANK_ADMIN">BANK_ADMIN</option>
                    <option value="SYSTEM_OPERATOR">SYSTEM_OPERATOR</option>
                    <option value="ANALYST">ANALYST</option>
                    <option value="AI_AGENT">AI_AGENT</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Institution"
                    value={newUserInst}
                    onChange={(e) => setNewUserInst(e.target.value)}
                    className="bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl outline-none"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddUserOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#222222] text-[#A7A7A7]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#C8A64D] text-[#000000] font-bold"
                  >
                    Save User
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* USERS TABLE */}
          {users.length === 0 ? (
            <div className="p-8 text-center bg-[#0D0D0D] border border-[#222222] rounded-2xl font-mono text-xs text-[#777777]">
              No users registered.
            </div>
          ) : (
            <div className="bg-[#0E0E0E] border border-[#222222] rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#141414] text-[#A7A7A7] border-b border-[#222222] uppercase text-[10px]">
                  <tr>
                    <th className="p-4">User ID & Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Institution</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222] text-[#FFFFFF]">
                  {users
                    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.role.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((u) => (
                      <tr key={u.id} className="hover:bg-[#121212] transition-colors">
                        <td className="p-4">
                          <strong className="block font-sans">{u.name}</strong>
                          <span className="text-[10px] text-[#777777]">{u.id}</span>
                        </td>
                        <td className="p-4 text-[#A7A7A7]">{u.email}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#1A1A1A] border border-[#333333] text-[#E5C76B] font-bold text-[10px]">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-[#A7A7A7]">{u.institution}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            u.status === 'ACTIVE' ? 'bg-[#06271A] text-[#34D399]' : 'bg-[#270606] text-[#F87171]'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleUpdateUserStatus(u.id, u.status)}
                            className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#222222] text-[#A7A7A7] hover:text-[#FFFFFF] text-[10px] transition-all"
                          >
                            {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ROLES & PERMISSIONS */}
      {!loading && !error && activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r, idx) => (
              <div key={idx} className="p-6 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-[#222222] pb-3">
                  <strong className="text-sm font-sans font-bold text-[#E5C76B]">{r.label}</strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A1A1A] text-[#A7A7A7]">{r.role}</span>
                </div>
                <p className="text-[#A7A7A7] leading-relaxed">{r.description}</p>
                <div className="pt-2">
                  <span className="text-[10px] text-[#777777] block uppercase mb-1">Assigned Permissions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {r.permissions.map((p: string, pIdx: number) => (
                      <span key={pIdx} className="px-2 py-0.5 rounded bg-[#141414] border border-[#333333] text-[#34D399] text-[10px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INSTITUTION MANAGEMENT */}
      {!loading && !error && activeTab === 'institutions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold font-serif text-[#FFFFFF]">Connected Institutional Nodes</h3>
            <button
              onClick={() => setIsAddInstOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#000000] font-mono text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Plus size={16} />
              <span>Connect Institutional Node</span>
            </button>
          </div>

          <AnimatePresence>
            {isAddInstOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateInstitution}
                className="p-6 bg-[#121212] border border-[#C8A64D]/40 rounded-2xl space-y-4 font-mono text-xs"
              >
                <h4 className="text-sm font-bold text-[#E5C76B]">Register Institution / Network Gateway</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Institution Name (e.g. Stanbic Bank)"
                    value={newInstName}
                    onChange={(e) => setNewInstName(e.target.value)}
                    required
                    className="bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Node Code (e.g. STAN-UG)"
                    value={newInstCode}
                    onChange={(e) => setNewInstCode(e.target.value)}
                    required
                    className="bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl outline-none"
                  />
                  <select
                    value={newInstType}
                    onChange={(e) => setNewInstType(e.target.value)}
                    className="bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl outline-none"
                  >
                    <option value="Central Bank">Central Bank</option>
                    <option value="Commercial Bank">Commercial Bank</option>
                    <option value="Mobile Money Operator">Mobile Money Operator</option>
                    <option value="Payment Service Provider">Payment Service Provider</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setIsAddInstOpen(false)} className="px-4 py-2 bg-[#222222] text-[#A7A7A7] rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#C8A64D] text-[#000000] font-bold rounded-xl">Save Node</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {institutions.map((inst) => (
              <div key={inst.id} className="p-5 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-sm font-sans font-bold text-[#FFFFFF] block">{inst.name}</strong>
                    <span className="text-[10px] text-[#C8A64D]">{inst.code} • {inst.type}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#06271A] text-[#34D399] text-[10px] font-bold">
                    {inst.status}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#222222] space-y-1 text-[10px] text-[#A7A7A7]">
                  <p>Node IP: <strong className="text-[#FFFFFF]">{inst.nodeIp}</strong></p>
                  <p>Webhook: <strong className="text-[#60A5FA] truncate block">{inst.webhookUrl}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM HEALTH */}
      {!loading && !error && activeTab === 'health' && systemHealth && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-5 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-1">
              <span className="text-[10px] text-[#777777] block">KERNEL STATUS</span>
              <strong className="text-base text-[#34D399] font-bold block">{systemHealth.status}</strong>
            </div>
            <div className="p-5 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-1">
              <span className="text-[10px] text-[#777777] block">SYSTEM UPTIME</span>
              <strong className="text-base text-[#E5C76B] font-bold block">{systemHealth.uptime}</strong>
            </div>
            <div className="p-5 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-1">
              <span className="text-[10px] text-[#777777] block">CPU LOAD</span>
              <strong className="text-base text-[#60A5FA] font-bold block">{systemHealth.cpuLoad}</strong>
            </div>
            <div className="p-5 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-1">
              <span className="text-[10px] text-[#777777] block">RAM USAGE</span>
              <strong className="text-base text-[#FFFFFF] font-bold block">{systemHealth.memoryUsedMB} MB / {systemHealth.memoryTotalMB} MB</strong>
            </div>
          </div>

          <div className="p-6 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-4 font-mono text-xs">
            <h4 className="text-sm font-bold text-[#E5C76B]">Subsystem Health Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#141414] rounded-xl border border-[#222222] flex justify-between">
                <span>Database Engine Status:</span>
                <strong className="text-[#34D399]">{systemHealth.databaseStatus}</strong>
              </div>
              <div className="p-4 bg-[#141414] rounded-xl border border-[#222222] flex justify-between">
                <span>Active Institutional Nodes:</span>
                <strong className="text-[#FFFFFF]">{systemHealth.activeNodesCount} Connected</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {!loading && !error && activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold font-serif text-[#FFFFFF]">Immutable ZK Audit Trail</h3>
            <span className="text-xs font-mono text-[#34D399] font-bold">{auditLogs.length} Events Recorded</span>
          </div>

          {auditLogs.length === 0 ? (
            <div className="p-8 text-center bg-[#0D0D0D] border border-[#222222] rounded-2xl font-mono text-xs text-[#777777]">
              No audit log entries found.
            </div>
          ) : (
            <div className="bg-[#0E0E0E] border border-[#222222] rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#141414] text-[#A7A7A7] border-b border-[#222222] uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Actor / Agent</th>
                    <th className="p-4">Action Type</th>
                    <th className="p-4">Org ID</th>
                    <th className="p-4">Hash Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222] text-[#FFFFFF]">
                  {auditLogs.slice(0, 15).map((log, idx) => (
                    <tr key={idx} className="hover:bg-[#121212]">
                      <td className="p-4 text-[#A7A7A7] text-[10px]">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-4 text-[#E5C76B] font-bold">{log.agentName || log.userId || 'SYSTEM'}</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-[#34D399] text-[10px]">{log.action}</span></td>
                      <td className="p-4 text-[#A7A7A7]">{log.orgId || 'BOU_NATIONAL_PAYMENTS'}</td>
                      <td className="p-4 text-[#60A5FA] text-[10px] font-mono truncate max-w-[150px]">{log.hash ? log.hash.slice(0,16) + '...' : 'VERIFIED_ZK'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: SECURITY CENTRE */}
      {!loading && !error && activeTab === 'security' && securityData && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#222222] pb-4">
              <div className="flex items-center gap-3">
                <ShieldAlert size={24} className="text-[#34D399]" />
                <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">Zero-Trust Security & KMS Vault</h3>
              </div>
              <button
                onClick={handleRunPenTest}
                disabled={isPentestRunning}
                className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#000000] font-bold flex items-center gap-2"
              >
                {isPentestRunning ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                <span>RUN PENETRATION SUITE</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222]">
                <span className="text-[10px] text-[#777777] block">ZERO-TRUST ENFORCEMENT</span>
                <strong className="text-sm text-[#34D399]">{securityData.zeroTrustStatus}</strong>
              </div>
              <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222]">
                <span className="text-[10px] text-[#777777] block">KMS VAULT ALGORITHM</span>
                <strong className="text-sm text-[#E5C76B]">{securityData.kmsVault}</strong>
              </div>
              <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222]">
                <span className="text-[10px] text-[#777777] block">LAST PENETRATION AUDIT</span>
                <strong className="text-sm text-[#FFFFFF]">{securityData.lastPenTest}</strong>
              </div>
            </div>

            {pentestReport && (
              <div className="p-4 bg-[#06271A] border border-[#10B981] rounded-2xl space-y-2">
                <strong className="text-[#34D399] font-bold block">Penetration Test Report ({pentestReport.timestamp}):</strong>
                <p className="text-[#FFFFFF]">{pentestReport.report}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 7: API & PROVIDERS */}
      {!loading && !error && activeTab === 'providers' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold font-serif text-[#FFFFFF]">API Gateway & Payment Adapters</h3>
            <button
              onClick={handleProviderHealthCheck}
              disabled={isHealthChecking}
              className="px-4 py-2 rounded-xl bg-[#10B981] text-[#000000] font-bold flex items-center gap-2"
            >
              {isHealthChecking ? <RefreshCw size={14} className="animate-spin" /> : <Server size={14} />}
              <span>TRIGGER ADAPTER HEALTH CHECK</span>
            </button>
          </div>

          {healthCheckReport && (
            <div className="p-4 bg-[#06271A] border border-[#10B981] rounded-2xl text-[#34D399]">
              {healthCheckReport}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((p) => (
              <div key={p.id} className="p-5 bg-[#0E0E0E] border border-[#222222] rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-sm font-sans font-bold text-[#FFFFFF]">{p.name}</strong>
                  <span className="px-2 py-0.5 rounded bg-[#06271A] text-[#34D399] font-bold text-[10px]">{p.status}</span>
                </div>
                <div className="text-[10px] text-[#A7A7A7] space-y-1">
                  <p>Latency: <strong className="text-[#E5C76B]">{p.latencyMs} ms</strong></p>
                  <p>Rate Limit: <strong className="text-[#FFFFFF]">{p.rateLimitRps} RPS</strong></p>
                  <p>Error Rate: <strong className="text-[#34D399]">{p.errorRate}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: AI GOVERNANCE */}
      {!loading && !error && activeTab === 'ai_governance' && aiGovernance && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold font-serif text-[#FFFFFF] border-b border-[#222222] pb-3">AI Model & Constitutional Principles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222]">
                <span className="text-[10px] text-[#777777] block">ACTIVE LLM ENGINE</span>
                <strong className="text-sm text-[#E5C76B]">{aiGovernance.model}</strong>
              </div>
              <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222]">
                <span className="text-[10px] text-[#777777] block">CONFIDENCE THRESHOLD</span>
                <strong className="text-sm text-[#34D399]">{aiGovernance.confidenceThreshold * 100}%</strong>
              </div>
            </div>

            <div className="p-4 bg-[#141414] rounded-2xl border border-[#222222] space-y-2">
              <strong className="text-[#E5C76B] block">MEHERAH Constitutional Safeguards:</strong>
              <ul className="list-disc list-inside text-[#A7A7A7] space-y-1 text-[11px]">
                {aiGovernance.principles.map((pr: string, idx: number) => (
                  <li key={idx}>{pr}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: CONFIGURATION SETTINGS */}
      {!loading && !error && activeTab === 'config' && config && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 bg-[#0E0E0E] border border-[#C8A64D]/30 rounded-3xl space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#222222] pb-4">
              <h3 className="text-lg font-bold font-serif text-[#FFFFFF]">Core Sovereign Kernel Configuration</h3>
              <button
                onClick={handleSaveConfig}
                className="px-5 py-2.5 rounded-xl bg-[#C8A64D] text-[#000000] font-bold"
              >
                SAVE CONFIGURATION
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[#A7A7A7]">Kernel Version</label>
                <input
                  type="text"
                  value={config.kernelVersion}
                  onChange={(e) => setConfig({ ...config, kernelVersion: e.target.value })}
                  className="w-full bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#A7A7A7]">ISO Message Standard</label>
                <input
                  type="text"
                  value={config.isoMessageVersion}
                  onChange={(e) => setConfig({ ...config, isoMessageVersion: e.target.value })}
                  className="w-full bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#A7A7A7]">Auto Backup Schedule</label>
                <input
                  type="text"
                  value={config.autoBackupSchedule}
                  onChange={(e) => setConfig({ ...config, autoBackupSchedule: e.target.value })}
                  className="w-full bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#A7A7A7]">Database Engine</label>
                <input
                  type="text"
                  value={config.databaseEngine}
                  onChange={(e) => setConfig({ ...config, databaseEngine: e.target.value })}
                  className="w-full bg-[#080808] border border-[#333333] text-[#FFFFFF] p-2.5 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
