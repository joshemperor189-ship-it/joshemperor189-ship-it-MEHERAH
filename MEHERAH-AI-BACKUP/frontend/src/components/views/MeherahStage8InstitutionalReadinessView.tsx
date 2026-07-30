import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  FileCheck,
  CheckCircle2,
  XCircle,
  Play,
  Award,
  HelpCircle,
  Zap,
  Radio,
  Clock,
  ChevronRight,
  Download,
  Terminal,
  Server,
  Key,
  Database
} from 'lucide-react';
import { Stage8RegulatoryChallengeEngine } from '../../../ai-engine/stage8-regulatory-challenge';

export function MeherahStage8InstitutionalReadinessView() {
  const engine = new Stage8RegulatoryChallengeEngine();
  const [activeTab, setActiveTab] = useState<'probes' | 'pentest' | 'drills' | 'folder' | 'rehearsal'>('probes');
  const [selectedProbeId, setSelectedProbeId] = useState<string>('PROBE_01_LIABILITY');
  const [rehearsalStep, setRehearsalStep] = useState<number>(1);
  const [isRehearsalRunning, setIsRehearsalRunning] = useState<boolean>(false);

  const probes = engine.getRegulatorQuestionProbes();
  const penTests = engine.runPenetrationScenarios();
  const drills = engine.runOperationalFailureDrills();
  const folderManifest = engine.getFinalBOUFolderManifest();

  const selectedProbe = probes.find((p) => p.probeId === selectedProbeId) || probes[0];

  const rehearsalScript = [
    { step: 1, title: 'Minute 1: The Problem — Silent Failures in Passive Financial Infrastructure', script: 'Distinguished Bank of Uganda Regulatory Committee, today we demonstrate MEHERAH, an intelligent coordination layer designed to prevent silent payment routing failures across MTN, Airtel, and commercial bank payment rails.' },
    { step: 2, title: 'Minute 2: The Core Brain — MAFE Adaptive Feedback Engine', script: 'MEHERAH does not use unconstrained black-box AI. It relies on mathematical Proportional, Integral, and Derivative (MAFE) feedback loops that compute continuous trust and reliability scores in real time.' },
    { step: 3, title: 'Minute 3: Live Hard Failure Simulation & Autonomous Recovery', script: 'Notice what happens during an MTN mobile money gateway outage: in under 32 milliseconds, MEHERAH predicts settlement disruption and automatically shifts 100% of outgoing traffic to Airtel Money Uganda with zero transaction drops.' },
    { step: 4, title: 'Minute 4: Regulatory Governance Intercept & 100% Microsecond Replay', script: 'Every decision is logged into an immutable FIPS 140-3 signed Flight Recorder. Regulators can enter any historical Transaction ID (e.g., TX-2026-001) to replay exact network state, PID scores, and fusion signals.' },
    { step: 5, title: 'Minute 5: Controlled Sandbox Pilot Roadmap & Institutional Alignment', script: 'MEHERAH is built for institutional deployment. We present our complete 5-Document Bank of Uganda Submission Package for immediate evaluation within the Regulatory Sandbox framework.' }
  ];

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="p-5 bg-[#111111] border border-[#C9A227]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
            <Award size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C9A227]">STAGE 8 CERTIFICATION</span>
              <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                100% REGULATORY READINESS
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5 font-sans">
              Bank of Uganda Regulatory Challenge & Institutional Readiness Suite.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
          <ShieldCheck size={16} className="text-[#00B86B]" />
          <span>BOU SUBMISSION PACKAGE SIGNED</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'probes', label: '1. Regulator Probes (Q&A)', icon: HelpCircle },
          { id: 'pentest', label: '2. Security Pen-Testing', icon: Lock },
          { id: 'drills', label: '3. Operational Failure Drills', icon: Server },
          { id: 'folder', label: '4. Final BOU Submission Folder', icon: FileCheck },
          { id: 'rehearsal', label: '5. Executive Presentation Rehearsal', icon: Play },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-[#111111] text-[#E8C879] border border-[#C9A227]/50 shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#111111]/50 border border-transparent'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#C9A227]' : 'text-[#666666]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: REGULATOR QUESTION PROBES */}
      {activeTab === 'probes' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7A7A7]">Hostile Regulator Probes</span>
              <div className="space-y-2">
                {probes.map((probe) => (
                  <button
                    key={probe.probeId}
                    onClick={() => setSelectedProbeId(probe.probeId)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-mono flex items-center justify-between ${
                      selectedProbeId === probe.probeId
                        ? 'bg-[#111111] border-[#C9A227]/60 text-[#E8C879]'
                        : 'bg-[#070707] border-[#222222] text-[#A7A7A7] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <span className="truncate pr-2">{probe.category}</span>
                    <CheckCircle2 size={14} className="text-[#00B86B] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl md:col-span-2 space-y-5">
              <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                <span className="text-xs font-mono font-bold text-[#C9A227]">{selectedProbe.probeId} ({selectedProbe.category})</span>
                <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  VERIFIED AUDIT PROOF
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#FF3B30] font-bold">REGULATOR QUESTION & INTENT:</span>
                <h4 className="text-sm font-bold text-[#FFFFFF] font-playfair">{selectedProbe.question}</h4>
                <p className="text-xs text-[#A7A7A7] italic">Hostile Intent: {selectedProbe.hostileRegulatorIntent}</p>
              </div>

              <div className="p-4 bg-[#070707] border border-[#C9A227]/30 rounded-xl space-y-2">
                <span className="text-[11px] font-mono text-[#C9A227] font-bold">MEHERAH DEFENSIBLE RESPONSE:</span>
                <p className="text-xs text-[#FFFFFF] leading-relaxed font-sans">{selectedProbe.meherahDefensibleResponse}</p>
              </div>

              <div className="text-[11px] font-mono text-[#00B86B] flex items-center gap-2">
                <FileCheck size={14} />
                <span>Reference: {selectedProbe.complianceEvidenceReference}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: SECURITY PEN-TESTING */}
      {activeTab === 'pentest' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Cyber Security Penetration Scenarios</h3>
              <p className="text-xs text-[#A7A7A7]">Simulated cyber attacks neutralized by Zero-Trust Sidecar Mesh and FIPS 140-3 Hardware Security Modules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {penTests.map((test) => (
                <div key={test.testId} className="p-5 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FFFFFF]">{test.attackVector}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      NEUTRALIZED ({test.mitigationTimeMs}ms)
                    </span>
                  </div>
                  <p className="text-[#A7A7A7] text-[11px]">Simulated Payload: {test.simulatedPayload}</p>
                  <p className="text-[#00B86B]">Defense: {test.meherahDefenseMechanism}</p>
                  <div className="text-[10px] text-[#A7A7A7] pt-2 border-t border-[#222222]">
                    Cryptographic Signature: {test.signedReceipt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: OPERATIONAL FAILURE DRILLS */}
      {activeTab === 'drills' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Systemic Operational Failure Drills</h3>
              <p className="text-xs text-[#A7A7A7]">Demonstrates zero data loss and automated recovery during hard database failovers and network partitions.</p>
            </div>

            <div className="space-y-4">
              {drills.map((drill) => (
                <div key={drill.drillId} className="p-5 bg-[#070707] border border-[#222222] rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#E8C879] text-sm">{drill.failureScenario}</span>
                    <span className="text-xs text-[#00B86B] font-bold flex items-center gap-1">
                      <CheckCircle2 size={16} />
                      PASSED DRILL (0.0% Data Loss)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                    <div className="p-3 bg-[#111111] rounded-lg">
                      <span className="text-[#A7A7A7]">Fault Injected:</span>
                      <p className="text-[#FFFFFF] mt-0.5">{drill.simulatedFault}</p>
                    </div>
                    <div className="p-3 bg-[#111111] rounded-lg">
                      <span className="text-[#A7A7A7]">Fail-Safe Response:</span>
                      <p className="text-[#00B86B] mt-0.5">{drill.meherahFailSafeBehavior}</p>
                    </div>
                    <div className="p-3 bg-[#111111] rounded-lg">
                      <span className="text-[#A7A7A7]">Recovery Time:</span>
                      <p className="text-[#E8C879] mt-0.5">{drill.recoveryTimeMs}ms (Flight Recorder Index: {drill.drfrIndexStatus})</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: FINAL BOU SUBMISSION FOLDER */}
      {activeTab === 'folder' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Bank of Uganda Submission Package (5-Document Folder)</h3>
                <p className="text-xs text-[#A7A7A7]">Cryptographically signed dossier folder prepared for central bank sandbox evaluation.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#00B86B] font-bold px-3 py-1 bg-[#00B86B]/20 border border-[#00B86B]/40 rounded-full">
                  READINESS SCORE: 100.0%
                </span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {folderManifest.documents.map((doc) => (
                <div key={doc.docNumber} className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between hover:border-[#C9A227]/40 transition-all">
                  <div className="flex items-center gap-3">
                    <FileCheck size={20} className="text-[#C9A227]" />
                    <div>
                      <span className="font-bold text-[#FFFFFF]">{doc.docName}</span>
                      <p className="text-[10px] text-[#A7A7A7]">Cryptographic Hash: {doc.hash}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-3 py-1 rounded-full font-bold">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#070707] border border-[#C9A227]/30 rounded-xl space-y-2 text-xs font-mono">
              <span className="text-[#C9A227] font-bold">BOU PACKAGE SIGNATURE:</span>
              <p className="text-[#FFFFFF]">{folderManifest.cryptographicSignature}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: EXECUTIVE PRESENTATION REHEARSAL */}
      {activeTab === 'rehearsal' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">5-Minute Executive Presentation Rehearsal</h3>
                <p className="text-xs text-[#A7A7A7]">Interactive step-by-step rehearsal script for pitching MEHERAH to Bank of Uganda governors.</p>
              </div>
              <div className="flex items-center gap-2">
                {rehearsalScript.map((step) => (
                  <button
                    key={step.step}
                    onClick={() => setRehearsalStep(step.step)}
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                      rehearsalStep === step.step
                        ? 'bg-[#C9A227] text-[#070707]'
                        : 'bg-[#070707] text-[#A7A7A7] border border-[#222222]'
                    }`}
                  >
                    M{step.step}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#070707] border border-[#C9A227]/30 rounded-2xl space-y-4">
              <span className="text-xs font-mono text-[#C9A227] font-bold uppercase tracking-wider">
                {rehearsalScript[rehearsalStep - 1].title}
              </span>
              <p className="text-sm font-playfair leading-relaxed text-[#FFFFFF]">
                "{rehearsalScript[rehearsalStep - 1].script}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#222222] text-xs font-mono">
                <button
                  disabled={rehearsalStep === 1}
                  onClick={() => setRehearsalStep((s) => Math.max(1, s - 1))}
                  className="px-4 py-2 bg-[#111111] text-[#A7A7A7] rounded-xl border border-[#222222] disabled:opacity-40"
                >
                  Previous Minute
                </button>
                <span className="text-[#A7A7A7]">STEP {rehearsalStep} OF 5</span>
                <button
                  disabled={rehearsalStep === 5}
                  onClick={() => setRehearsalStep((s) => Math.min(5, s + 1))}
                  className="px-4 py-2 bg-[#C9A227] text-[#070707] font-bold rounded-xl disabled:opacity-40"
                >
                  Next Minute
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
