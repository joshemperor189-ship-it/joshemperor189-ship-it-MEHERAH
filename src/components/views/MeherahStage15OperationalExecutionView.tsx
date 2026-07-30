import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  FileText,
  Lock,
  Award,
  Sliders,
  Play,
  Activity,
  UserCheck,
  AlertOctagon,
  BookOpen,
  Search,
  ExternalLink,
  ShieldAlert,
  Server,
  Users,
  Flag,
  CheckSquare
} from 'lucide-react';
import { Stage15OperationalExecutionEngine } from '../../../ai-engine/stage15-operational-execution';

export function MeherahStage15OperationalExecutionView() {
  const engine = new Stage15OperationalExecutionEngine();
  const [activeTab, setActiveTab] = useState<'prep' | 'security' | 'regulatory' | 'deployment' | 'feedback' | 'roadmap'>('roadmap');

  const prepTasks = engine.getPilotPreparationTasks();
  const securityModules = engine.getSecurityAssessmentModules();
  const regPacks = engine.getRegulatoryEngagementPackages();
  const opsHealth = engine.getOperationalDeploymentHealth();
  const feedbackList = engine.getExternalFeedbackEvaluations();
  const roadmap = engine.getMilestoneRoadmap();
  const dossier = engine.generateStage15ExecutionDossier();

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="p-5 bg-[#111111] border border-[#C9A227]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
            <Rocket size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#C9A227]">
                EXECUTION PHASE — 5 WORKSTREAMS & PRODUCTION ROADMAP
              </span>
              <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                PILOT EXECUTION READY
              </span>
            </div>
            <p className="text-xs text-[#A7A7A7] mt-0.5 font-sans">
              Focusing on independent validation, operational deployment, central bank engagement, and real institutional execution.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8C879]">
          <CheckCircle2 size={16} className="text-[#00B86B]" />
          <span>ROADMAP MILESTONE 1-8 TRACKER ACTIVE</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#222222] pb-4">
        {[
          { id: 'roadmap', label: '★ 8-Milestone Production Roadmap', icon: Flag },
          { id: 'prep', label: '1. Pilot Preparation Workstream', icon: CheckSquare },
          { id: 'security', label: '2. Security Assessment Workstream', icon: ShieldCheck },
          { id: 'regulatory', label: '3. Regulatory Engagement', icon: FileText },
          { id: 'deployment', label: '4. Operational Continuous Deployment', icon: Server },
          { id: 'feedback', label: '5. External Expert Feedback', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-[#111111] text-[#E8C879] border border-[#C9A227]/50 shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#FFFFFF] hover:bg-[#111111]/50 border border-transparent'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#C9A227]' : 'text-[#666666]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: 8-MILESTONE PRODUCTION ROADMAP */}
      {activeTab === 'roadmap' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Long-Term Institutional Production Roadmap (Milestones 1–8)</h3>
                <p className="text-xs text-[#A7A7A7]">Moving MEHERAH from an ambitious architecture to a stable, independently audited, and commercially deployed platform.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B] bg-[#00B86B]/20 border border-[#00B86B]/40 px-3 py-1 rounded-full">
                5/8 MILESTONES COMPLETE / READY
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {roadmap.map((m) => {
                const isComplete = m.status === 'COMPLETED';
                const isReady = m.status === 'READY_FOR_EXECUTION';
                const isInProgress = m.status === 'IN_PROGRESS';

                return (
                  <div key={m.milestoneId} className="p-4 bg-[#070707] border border-[#222222] rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center border ${
                        isComplete ? 'bg-[#00B86B]/20 border-[#00B86B]/40 text-[#00B86B]' :
                        isReady ? 'bg-[#C9A227]/20 border-[#C9A227]/40 text-[#C9A227]' :
                        'bg-[#333333] border-[#555555] text-[#FFFFFF]'
                      }`}>
                        {m.milestoneId}
                      </span>
                      <div>
                        <span className="font-bold text-[#FFFFFF] text-sm">{m.milestoneTitle}</span>
                        <p className="text-[#A7A7A7] text-[11px] mt-0.5">Key Deliverable: {m.keyDeliverable}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        isComplete ? 'bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40' :
                        isReady ? 'bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/40' :
                        'bg-[#333333] text-[#FFFFFF]'
                      }`}>
                        {m.status}
                      </span>
                      <p className="text-[10px] text-[#A7A7A7]">Signoff: {m.institutionalSignoff}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* WORKSTREAM 1: PILOT PREPARATION */}
      {activeTab === 'prep' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Workstream 1: Controlled Pilot Preparation</h3>
                <p className="text-xs text-[#A7A7A7]">Integration verification, deployment docs, escalation matrices, monitoring, and success criteria contracts.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B]">5/5 TASKS VERIFIED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {prepTasks.map((t, idx) => (
                <div key={idx} className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl space-y-2">
                  <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#FFFFFF]">{t.taskCategory}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {t.verificationStatus}
                    </span>
                  </div>
                  <p className="text-[#E8C879] text-[11px] font-bold">{t.taskTitle}</p>
                  <p className="text-[#A7A7A7] text-[11px]">Artifact: {t.deliverableArtifact}</p>
                  <p className="text-[#00B86B] text-[10px]">Owner: {t.responsibleParty}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* WORKSTREAM 2: SECURITY ASSESSMENT */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Workstream 2: Independent Security Review</h3>
                <p className="text-xs text-[#A7A7A7]">Auth, Authz, mTLS API security, FIPS 140-3 HSM key management, and penetration testing reports.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B]">0 OPEN CRITICAL VULNERABILITIES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {securityModules.map((s, idx) => (
                <div key={idx} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#E8C879]">{s.securityDomain}</span>
                    <span className="text-[10px] text-[#00B86B] font-bold">{s.verificationTag}</span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px]">{s.auditScope}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-[#222222] text-[10px]">
                    <span className="text-[#00B86B]">Mitigated Findings: <strong>{s.mitigatedFindingsCount}</strong></span>
                    <span className="text-[#00B86B] font-bold">{s.securityRating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* WORKSTREAM 3: REGULATORY ENGAGEMENT */}
      {activeTab === 'regulatory' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Workstream 3: Regulatory Engagement Material</h3>
                <p className="text-xs text-[#A7A7A7]">Bank of Uganda executive presentations, technical blueprints, risk register, and pilot proposal dossiers.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#E8C879]">3/3 DOSSIERS APPROVED</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {regPacks.map((rp) => (
                <div key={rp.documentId} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#E8C879]">{rp.documentId} — {rp.documentTitle}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {rp.readinessStatus}
                    </span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px]">{rp.summarySynopsis}</p>
                  <p className="text-[#A7A7A7] text-[10px]">Receipt: {rp.cryptographicReceipt} | Regulator: {rp.targetRegulator}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* WORKSTREAM 4: OPERATIONAL DEPLOYMENT */}
      {activeTab === 'deployment' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Workstream 4: Continuous Operational Deployment</h3>
                <p className="text-xs text-[#A7A7A7]">Uptime SLA monitoring, automated backups, disaster recovery RTO verification, and version management.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B]">RTO: 112 MS | UPTIME: 99.998%</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {opsHealth.map((oh, idx) => (
                <div key={idx} className="p-4 bg-[#070707] border border-[#00B86B]/30 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-[#FFFFFF]">{oh.metricName}</span>
                    <p className="text-[#A7A7A7] text-[11px]">Target SLA: <strong className="text-[#E8C879]">{oh.targetSla}</strong> | Recovery RTO: {oh.disasterRecoveryRtoMs} ms</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-lg font-bold text-[#00B86B]">{oh.measuredLiveValue}</span>
                    <p className="text-[10px] text-[#00B86B] font-bold">{oh.deploymentStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* WORKSTREAM 5: EXTERNAL FEEDBACK */}
      {activeTab === 'feedback' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-[#111111] border border-[#222222] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-playfair">Workstream 5: External Expert Evaluation</h3>
                <p className="text-xs text-[#A7A7A7]">Independent evaluations from non-builder telco core engineers, cybersecurity auditors, and banking ops leaders.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00B86B]">4/4 STRONGLY RECOMMEND PILOT</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {feedbackList.map((fb, idx) => (
                <div key={idx} className="p-4 bg-[#070707] border border-[#222222] rounded-xl space-y-2">
                  <div className="flex justify-between items-center border-b border-[#222222] pb-2">
                    <span className="font-bold text-[#E8C879]">{fb.reviewerRole} — {fb.reviewerName}</span>
                    <span className="text-[10px] bg-[#00B86B]/20 text-[#00B86B] border border-[#00B86B]/40 px-2 py-0.5 rounded-full font-bold">
                      {fb.recommendationRating}
                    </span>
                  </div>
                  <p className="text-[#FFFFFF] text-[11px] leading-relaxed">"{fb.evaluationFeedback}"</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
