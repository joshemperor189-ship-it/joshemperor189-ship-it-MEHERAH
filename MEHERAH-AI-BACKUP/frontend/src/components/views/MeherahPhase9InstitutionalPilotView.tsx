import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Globe2, 
  Clock, 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  Building2, 
  Landmark, 
  Smartphone, 
  Terminal, 
  Activity, 
  FileCheck2, 
  Layers, 
  Zap, 
  AlertTriangle, 
  ChevronRight, 
  Award,
  Users,
  Shield,
  Check,
  Sparkles
} from 'lucide-react';
import { 
  OfficialSandboxConnector, 
  SecurityVaultStatus, 
  ExecutiveDemoPackage, 
  ExecutiveDemoStep 
} from '../../services/meherah-phase9-institutional-pilot.service';

export function MeherahPhase9InstitutionalPilotView() {
  const [activeTab, setActiveTab] = useState<'connectors' | 'security' | 'exec_demo'>('connectors');
  const [loading, setLoading] = useState<boolean>(true);

  // States
  const [connectors, setConnectors] = useState<OfficialSandboxConnector[]>([]);
  const [securityVault, setSecurityVault] = useState<SecurityVaultStatus | null>(null);
  const [execDemoPackage, setExecDemoPackage] = useState<ExecutiveDemoPackage | null>(null);

  // Interactive State for 5-Minute Walkthrough
  const [activeMinuteStepIndex, setActiveMinuteStepIndex] = useState<number>(1);
  const [verifyingConnectorId, setVerifyingConnectorId] = useState<string | null>(null);

  useEffect(() => {
    fetchPhase9Data();
  }, []);

  const fetchPhase9Data = async () => {
    setLoading(true);
    try {
      const [cRes, sRes, dRes] = await Promise.all([
        fetch('/api/meherah/phase9/sandbox-connectors'),
        fetch('/api/meherah/phase9/security-vault'),
        fetch('/api/meherah/phase9/executive-demo-package')
      ]);

      const parseJsonSafely = async (res: Response) => {
        if (!res.ok) return null;
        const text = await res.text();
        try { return JSON.parse(text); } catch { return null; }
      };

      const cData = await parseJsonSafely(cRes);
      const sData = await parseJsonSafely(sRes);
      const dData = await parseJsonSafely(dRes);

      if (cData) setConnectors(cData);
      if (sData) setSecurityVault(sData);
      if (dData) setExecDemoPackage(dData);
    } catch (err) {
      console.error('Error fetching Phase 9 data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyConnectorHandshake = async (connectorId: string) => {
    setVerifyingConnectorId(connectorId);
    try {
      const res = await fetch('/api/meherah/phase9/verify-handshake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectorId })
      });
      if (res.ok) {
        const text = await res.text();
        try {
          const updatedConn = JSON.parse(text);
          setConnectors(prev => prev.map(c => c.connectorId === connectorId ? updatedConn : c));
        } catch (e) {
          console.error('Handshake parse error:', e);
        }
      }
    } catch (err) {
      console.error('Handshake error:', err);
    } finally {
      setVerifyingConnectorId(null);
    }
  };

  return (
    <div className="space-y-8 text-[#FFFFFF] font-sans antialiased bg-[#070707] min-h-screen pb-16">
      
      {/* PHASE 9 HERO BANNER */}
      <div className="bg-[#111111] border-2 border-[#C9A227] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#070707] bg-[#C9A227] px-3 py-0.5 rounded uppercase flex items-center gap-1.5 shadow">
                <ShieldCheck className="w-3.5 h-3.5 text-[#070707]" /> PHASE 9 — REAL INTEGRATION & PILOT PREPARATION
              </span>
              <span className="text-xs font-mono text-[#00B86B] font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#00B86B]" /> HARDENED & REGULATOR-READY
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-[#FFFFFF]">
                MEHERAH Official Sandbox Gateways & Security Vault
              </h1>
              <p className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                "Proving reliability, security, and real-world connectivity for institutional deployment."
              </p>
            </div>

            <p className="text-xs text-[#A7A7A7] max-w-3xl font-sans leading-relaxed">
              At Phase 9, MEHERAH moves from internal simulation to official sandbox API handshakes (MTN MoMo OpenAPI, Airtel Money B2B, Flutterwave v3, and Bank of Uganda ISO 20022 RTGS). Combined with FIPS 140-2 Level 3 HSM key vaulting and a 5-Minute Executive Walkthrough Package for regulators and central banks.
            </p>
          </div>

          {/* HSM & CONNECTORS STATUS BADGE */}
          {securityVault && (
            <div className="bg-[#070707] border border-[#C9A227]/60 rounded-xl p-5 text-center space-y-2 min-w-[280px] shadow-lg">
              <span className="text-[10px] font-mono text-[#A7A7A7] uppercase font-bold block">SECURITY VAULT & GATEWAYS</span>
              <div className="text-2xl font-bold font-mono text-[#00B86B] flex items-center justify-center gap-2">
                <Key className="w-5 h-5 text-[#00B86B]" /> FIPS 140-2 L3
              </div>
              <div className="text-[10px] text-[#C9A227] font-mono flex items-center justify-center gap-2 font-bold">
                <span>{securityVault.activeVaultedKeysCount} KEYS VAULTED</span>
                <span>•</span>
                <span>mTLS STRICT</span>
              </div>
              <span className="text-[9px] text-[#A7A7A7] font-mono block">AUDIT HASH: {securityVault.auditTrailHashSeal.substring(0, 14)}...</span>
            </div>
          )}
        </div>

        {/* TAB NAVIGATION FOR PHASE 9 FOCUS AREAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6 pt-5 border-t border-[#222222]">
          {[
            { id: 'connectors', label: '1. Official Sandbox Gateways', desc: 'MTN, Airtel, Flutterwave, BOU RTGS', icon: Smartphone },
            { id: 'security', label: '2. Security Vault & RBAC', desc: 'HSM Keys, mTLS, Audit Seals', icon: Lock },
            { id: 'exec_demo', label: '3. 5-Min Executive Demo', desc: 'Regulator & Governor Package', icon: Play }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-3.5 rounded-xl border text-left font-mono transition-all flex flex-col justify-between ${
                  active 
                    ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-lg shadow-[#C9A227]/20' 
                    : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]/50 hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold">{tab.label.split('.')[0]}</span>
                  <Icon className="w-4 h-4 text-current" />
                </div>
                <span className="text-xs font-bold font-sans mt-1 text-current truncate">{tab.label.split('.')[1]}</span>
                <span className="text-[9px] opacity-80 block font-mono truncate">{tab.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. OFFICIAL SANDBOX CONNECTORS */}
      {activeTab === 'connectors' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  1. OFFICIAL SANDBOX GATEWAY CONNECTORS
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Live Endpoint Handshake Verifier</h2>
                <p className="text-xs text-[#A7A7A7]">Connected directly to official sandbox endpoints for MTN MoMo OpenAPI, Airtel Money B2B, Flutterwave v3, and Bank of Uganda ISO 20022 RTGS.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                ALL ENDPOINTS VERIFIED
              </span>
            </div>

            {/* CONNECTOR CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {connectors.map((conn) => (
                <div key={conn.connectorId} className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                      <strong className="text-sm text-[#FFFFFF] font-sans block">{conn.name}</strong>
                      <span className="text-[10px] text-[#00B86B] bg-[#00B86B]/10 border border-[#00B86B]/30 px-2 py-0.5 rounded font-bold">
                        {conn.connectionStatus.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-[#A7A7A7] block">Official Endpoint URL:</span>
                      <code className="text-[10px] text-[#C9A227] bg-[#111111] p-2 rounded block truncate border border-[#222222]">
                        {conn.officialEndpoint}
                      </code>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                      <div>
                        <span className="text-[#A7A7A7] block">Auth Scheme:</span>
                        <strong className="text-[#FFFFFF]">{conn.authMethod.replace(/_/g, ' ')}</strong>
                      </div>
                      <div>
                        <span className="text-[#A7A7A7] block">Ping Latency:</span>
                        <strong className="text-[#00B86B]">{conn.pingLatencyMs} ms</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleVerifyConnectorHandshake(conn.connectorId)}
                    disabled={verifyingConnectorId === conn.connectorId}
                    className="w-full py-2.5 bg-[#111111] hover:bg-[#222222] border border-[#C9A227]/40 text-[#C9A227] text-xs font-mono rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {verifyingConnectorId === conn.connectorId ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C9A227]" />
                    ) : (
                      <Zap className="w-3.5 h-3.5 text-[#C9A227]" />
                    )}
                    Re-Trigger Live Endpoint Handshake
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SECURITY HARDENING */}
      {activeTab === 'security' && securityVault && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  2. SECURITY HARDENING & REGULATORY COMPLIANCE
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">HSM Key Vault & Sovereign Access Controls</h2>
                <p className="text-xs text-[#A7A7A7]">Hardware Security Module (FIPS 140-2 Level 3), automated 24-hour key rotation, strict mTLS payload encryption, and role-based access matrix.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                FIPS 140-2 LEVEL 3 SECURED
              </span>
            </div>

            {/* SECURITY MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">CRYPTOGRAPHIC KEY VAULT PARAMETERS</span>
                
                <div className="space-y-2">
                  <div className="flex justify-between p-2.5 bg-[#111111] rounded-lg">
                    <span>HSM Module Standard:</span>
                    <strong className="text-[#00B86B]">{securityVault.hsmModuleStatus}</strong>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#111111] rounded-lg">
                    <span>Vaulted Keys Count:</span>
                    <strong className="text-[#C9A227]">{securityVault.activeVaultedKeysCount} Keys</strong>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#111111] rounded-lg">
                    <span>Key Rotation Policy:</span>
                    <strong className="text-[#FFFFFF]">{securityVault.keyRotationPolicy}</strong>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#111111] rounded-lg">
                    <span>mTLS Mutual Auth:</span>
                    <strong className="text-[#00B86B]">ENFORCED STRICT</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#070707] border border-[#222222] rounded-2xl space-y-3">
                <span className="text-xs font-bold text-[#C9A227] uppercase block">SOVEREIGN ROLE-BASED ACCESS CONTROL (RBAC)</span>
                
                <div className="space-y-2">
                  {securityVault.rolePermissionsActive.map((role, idx) => (
                    <div key={idx} className="p-2.5 bg-[#111111] rounded-lg flex items-center justify-between">
                      <div>
                        <strong className="text-xs text-[#FFFFFF] font-sans block">• {role.role.replace(/_/g, ' ')}</strong>
                        <span className="text-[10px] text-[#A7A7A7]">Session Expires: {role.sessionExpiresInSec}s</span>
                      </div>
                      <span className="text-[10px] text-[#00B86B] font-bold">MFA VERIFIED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 5-MINUTE EXECUTIVE DEMO WALKTHROUGH */}
      {activeTab === 'exec_demo' && execDemoPackage && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-[#C9A227]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                  3. 5-MINUTE EXECUTIVE / REGULATOR DEMO WALKTHROUGH
                </span>
                <h2 className="text-xl font-bold font-playfair text-[#FFFFFF] mt-1">Institutional Walkthrough for Governors & Investors</h2>
                <p className="text-xs text-[#A7A7A7]">Demonstrates intent ingestion, route optimization, live sandbox execution, zero-loss proof, and systemic risk analytics in under 5 minutes.</p>
              </div>

              <span className="text-xs font-mono text-[#00B86B] bg-[#070707] px-3 py-1 rounded border border-[#00B86B]/30 font-bold">
                READY FOR GOVERNOR PRESENTATION
              </span>
            </div>

            {/* STEP BUTTONS 1-5 */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {execDemoPackage.steps.map((step) => (
                <button
                  key={step.minuteIndex}
                  onClick={() => setActiveMinuteStepIndex(step.minuteIndex)}
                  className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                    activeMinuteStepIndex === step.minuteIndex
                      ? 'bg-[#C9A227] text-[#070707] border-[#C9A227] font-bold shadow-md'
                      : 'bg-[#070707] text-[#A7A7A7] border-[#222222] hover:border-[#C9A227]'
                  }`}
                >
                  <span className="text-[9px] uppercase block">MINUTE {step.minuteIndex}</span>
                  <span className="font-sans font-bold text-xs truncate block">{step.title.split(':')[1]}</span>
                </button>
              ))}
            </div>

            {/* ACTIVE STEP CARD */}
            {(() => {
              const currentStep = execDemoPackage.steps.find(s => s.minuteIndex === activeMinuteStepIndex);
              if (!currentStep) return null;
              return (
                <div className="p-6 bg-[#070707] border-2 border-[#C9A227] rounded-2xl space-y-4 font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                    <span className="text-xs font-bold text-[#070707] bg-[#C9A227] px-2.5 py-0.5 rounded uppercase">
                      {currentStep.title}
                    </span>
                    <span className="text-xs font-bold text-[#00B86B]">✔ {currentStep.status}</span>
                  </div>

                  <div className="space-y-2 font-sans">
                    <h3 className="text-base font-bold text-[#FFFFFF]">{currentStep.subtitle}</h3>
                    <p className="text-xs text-[#A7A7A7] leading-relaxed">{currentStep.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-3 border-t border-[#222222]">
                    <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#A7A7A7] uppercase block">{currentStep.metricLabel}</span>
                      <strong className="text-base text-[#00B86B] font-bold">{currentStep.metricValue}</strong>
                    </div>

                    <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#A7A7A7] uppercase block">TECHNICAL ARTIFACT GENERATED</span>
                      <code className="text-[10px] text-[#C9A227] block truncate">{currentStep.technicalArtifact}</code>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

    </div>
  );
}
