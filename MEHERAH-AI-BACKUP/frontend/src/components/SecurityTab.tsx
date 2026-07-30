import React, { useState, useEffect } from 'react';
import { Shield, Key, Eye, EyeOff, UserCheck, RefreshCw, PlusCircle, AlertCircle } from 'lucide-react';
import { UserRole, UserSession } from '../enterprise_types';

interface VaultSecret {
  id: string;
  key: string;
  valuePreview: string;
  updatedAt: string;
}

export default function SecurityTab() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [availableUsers, setAvailableUsers] = useState<UserSession[]>([]);
  const [vaultSecrets, setVaultSecrets] = useState<VaultSecret[]>([]);
  
  // Secret creation form
  const [newKey, setNewKey] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const fetchAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setAvailableUsers(data.availableUsers);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchVault = async () => {
    try {
      const res = await fetch('/api/vault/list');
      if (res.ok) {
        const data = await res.json();
        setVaultSecrets(data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchAuth();
    fetchVault();
  }, []);

  const handleSwitchUser = async (userId: string) => {
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        setErrorMessage('');
        setSuccessMessage('');
        await fetchAuth();
        await fetchVault(); // vault is RBAC dependent!
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/vault/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newKey, secretValue: newValue })
      });
      if (res.ok) {
        setNewKey('');
        setNewValue('');
        setSuccessMessage(`Secret key "${newKey.toUpperCase()}" encrypted and stored in secure vault successfully!`);
        fetchVault();
      } else {
        const err = await res.json();
        setErrorMessage(err.error || "Failed to save secret.");
      }
    } catch (err: any) {
      setErrorMessage("Network error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6" id="security_panel">
      {/* Session Manager and RBAC switch */}
      <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
        <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-amber-500" /> Enterprise RBAC Session Manager
        </h3>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">ACTIVE SECURITY CONTROLLER:</span>
            {currentUser && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-zinc-200">{currentUser.username}</span>
                <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-mono text-[10px] rounded-full border border-amber-500/20">
                  {currentUser.role}
                </span>
              </div>
            )}
            <p className="text-xs text-zinc-500 max-w-xl">
              Switch roles to simulate read/write permission changes. Auditor and Guest roles are restricted from adding keys or viewing decrypted previews.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <UserCheck className="w-4 h-4 text-zinc-400" />
            <select
              className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 outline-none w-full sm:w-60 focus:border-amber-500/30"
              value={currentUser?.id || ''}
              onChange={(e) => handleSwitchUser(e.target.value)}
            >
              {availableUsers.map(u => (
                <option key={u.id} value={u.id}>
                  {u.username} ({u.role})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* AES Cryptographic Key Vault */}
        <div className="lg:col-span-7 border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" /> Secure Cryptographic Key Vault
            </h3>
            <button onClick={fetchVault} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-xs text-zinc-500 mb-6">
            Key-value pairs are encrypted with 256-bit AES-CBC with custom Initialization Vectors (IV) before writing to persistence layers.
          </p>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {vaultSecrets.map(s => (
              <div key={s.id} className="p-3 bg-zinc-900/10 border border-zinc-900 rounded-lg flex items-center justify-between hover:border-zinc-800 transition-all">
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-300">{s.key}</h4>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Last rotation: {new Date(s.updatedAt).toLocaleString()}</p>
                </div>
                <div className="font-mono text-xs text-amber-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-900">
                  {s.valuePreview}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Secret Vault Form */}
        <div className="lg:col-span-5 border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mb-2">
            <PlusCircle className="w-5 h-5 text-amber-500" /> Encrypt New Secret
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            Input cleartext secrets. Standard symmetric encryption matrices are handled by the crypt engine.
          </p>

          <form onSubmit={handleAddSecret} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 mb-1">SECRET KEY NAME:</label>
              <input 
                type="text"
                placeholder="e.g. STRIPE_LIVE_API_KEY"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-zinc-300 outline-none uppercase focus:border-amber-500/30"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 mb-1">CLEARTEXT SECRET VALUE:</label>
              <input 
                type="password"
                placeholder="••••••••••••••••••••"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono text-zinc-300 outline-none focus:border-amber-500/30"
                required
              />
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold rounded shadow transition-all"
            >
              {isSubmitting ? "Encrypting Key..." : "Encrypt and Store Secret"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
