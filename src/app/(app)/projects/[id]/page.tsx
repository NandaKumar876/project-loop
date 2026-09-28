'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, Dna, AlertTriangle, GitBranch, Beaker,
  ExternalLink, Users, Calendar, Tag, FileText, Code,
  Image, Presentation, Download, CheckCircle2, XCircle,
  ChevronRight, Cpu, Globe, Database
} from 'lucide-react';
import { demoProjects, demoDNA, demoFailures, getSimilarProjects, demoEvolutions } from '@/lib/demo-data';
import { formatDate, getStatusBg, getRiskBg, getResultBg } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 }
  })
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');

  const project = demoProjects.find(p => p.id === projectId);
  const dna = demoDNA[projectId];
  const failures = demoFailures.filter(f => f.projectId === projectId);
  const similar = getSimilarProjects(projectId);
  const evolutions = demoEvolutions.filter(e => e.parentProjectId === projectId || e.childProjectId === projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-[var(--text-secondary)]">Project not found</p>
          <Link href="/projects" className="text-[#7c5cfc] text-sm mt-2 block">← Back to projects</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dna', label: 'Project DNA' },
    { id: 'failures', label: `Failures (${failures.length})` },
    { id: 'similar', label: `Similar (${similar.length})` },
    { id: 'evolution', label: 'Evolution' },
  ];

  const fileIcons: Record<string, React.ReactNode> = {
    report: <FileText size={16} />,
    code: <Code size={16} />,
    diagram: <Image size={16} />,
    presentation: <Presentation size={16} />,
    image: <Image size={16} />,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back button */}
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      {/* Project Header */}
      <motion.div
        initial="hidden" animate="visible"
        variants={fadeIn} custom={0}
        className="card p-6 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7c5cfc]/20 to-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
            <Dna size={28} className="text-[#7c5cfc]" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">{project.name}</h1>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBg(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-3xl">{project.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1"><Tag size={12} /> {project.domain}</span>
              <span className="flex items-center gap-1"><Users size={12} /> {project.teamMembers.length} members</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(project.createdAt)}</span>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#7c5cfc] hover:underline">
                  <ExternalLink size={12} /> GitHub
                </a>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link href={`/what-if?project=${projectId}`} className="btn-secondary text-xs flex items-center gap-1.5">
              <Beaker size={14} /> What-If
            </Link>
            <Link href={`/evolution?parent=${projectId}`} className="btn-primary text-xs flex items-center gap-1.5">
              <GitBranch size={14} /> Evolve
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)] mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={1} className="lg:col-span-2 space-y-6">
            {/* Technologies */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Cpu size={16} className="text-[#3b82f6]" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(t => (
                  <span key={t} className="tag bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20">{t}</span>
                ))}
              </div>
            </div>

            {/* Problem & Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-2">Problem Statement</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.problemStatement}</p>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-2">Expected Outcome</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.expectedOutcome}</p>
              </div>
            </div>

            {/* Team */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Users size={16} className="text-[#06b6d4]" /> Team
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.teamMembers.map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg bg-[var(--surface-2)]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c5cfc] to-[#06b6d4] flex items-center justify-center text-white text-xs font-bold">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{m.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={2} className="space-y-6">
            {/* Uploads */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-3">Project Files</h3>
              {project.uploads.length > 0 ? (
                <div className="space-y-2">
                  {project.uploads.map(u => (
                    <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors">
                      <div className="text-[var(--text-muted)]">{fileIcons[u.category] || <FileText size={16} />}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-primary)] truncate">{u.fileName}</p>
                        <p className="text-xs text-[var(--text-muted)]">{(u.fileSize / 1048576).toFixed(1)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--text-muted)] text-center py-4">No files uploaded</p>
              )}
            </div>

            {/* Quick DNA Summary */}
            {dna && (
              <div className="card p-5">
                <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <Dna size={16} className="text-[#7c5cfc]" /> DNA Summary
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">Architecture</p>
                    <p className="text-sm text-[var(--text-secondary)] font-mono">
                      {dna.architectureDNA.dataFlow.join(' → ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">Risk Level</p>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getRiskBg(dna.riskLevel)}`}>
                      {dna.riskLevel}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">Reusability</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-[var(--surface-2)]">
                        <div className="h-full rounded-full bg-[#10b981]" style={{ width: `${dna.reusabilityScore}%` }} />
                      </div>
                      <span className="text-xs font-medium text-[#10b981]">{dna.reusabilityScore}%</span>
                    </div>
                  </div>
                </div>
                <Link href="/project-dna" className="text-xs text-[#7c5cfc] hover:underline mt-4 block">
                  View full DNA →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {activeTab === 'dna' && dna && (
        <div className="space-y-6">
          {/* Architecture */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Architecture DNA</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Pattern: {dna.architectureDNA.pattern}</p>
            <div className="flex flex-wrap items-center gap-3 justify-center py-6">
              {dna.architectureDNA.dataFlow.map((node, i) => (
                <React.Fragment key={i}>
                  <div className="architecture-node">{node}</div>
                  {i < dna.architectureDNA.dataFlow.length - 1 && (
                    <ChevronRight size={20} className="text-[var(--text-muted)]" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
              {dna.architectureDNA.layers.map(layer => (
                <div key={layer.name} className="p-3 rounded-lg bg-[var(--surface-2)]">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{layer.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-2">{layer.technology}</p>
                  <div className="flex flex-wrap gap-1">
                    {layer.components.map(c => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-secondary)]">{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Decisions */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={1} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Decision DNA</h3>
            <div className="space-y-4">
              {dna.decisionDNA.decisions.map(dec => (
                <div key={dec.id} className="p-4 rounded-lg bg-[var(--surface-2)]">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{dec.what}</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      dec.confidence === 'high' ? 'bg-emerald-500/10 text-emerald-400' :
                      dec.confidence === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {dec.confidence} confidence
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2"><strong>Why:</strong> {dec.why}</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-2"><strong>Outcome:</strong> {dec.outcome}</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-[var(--text-muted)]">Alternatives:</span>
                    {dec.alternatives.map(a => (
                      <span key={a} className="tag bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] text-[10px]">{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Components */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={2} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Component DNA</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="section-title text-[#f97316]">Hardware</p>
                <div className="space-y-2">
                  {dna.componentDNA.hardware.map(c => (
                    <div key={c.name} className="p-3 rounded-lg bg-[var(--surface-2)] flex items-start gap-3">
                      <Cpu size={16} className="text-[#f97316] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{c.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{c.purpose}</p>
                        {c.reusable && <span className="text-[10px] text-[#10b981]">♻ Reusable</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="section-title text-[#3b82f6]">Software</p>
                <div className="space-y-2">
                  {dna.componentDNA.software.map(c => (
                    <div key={c.name} className="p-3 rounded-lg bg-[var(--surface-2)] flex items-start gap-3">
                      <Code size={16} className="text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{c.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{c.purpose}</p>
                        {c.reusable && <span className="text-[10px] text-[#10b981]">♻ Reusable</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'failures' && (
        <div className="space-y-4">
          {failures.length > 0 ? failures.map((fail, i) => (
            <motion.div
              key={fail.id}
              initial="hidden" animate="visible"
              variants={fadeIn} custom={i}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">{fail.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{fail.description}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${getStatusBg(fail.status)}`}>
                  {fail.status}
                </span>
              </div>

              <div className="bg-[var(--surface-2)] rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">ROOT CAUSE</p>
                <p className="text-sm text-[var(--text-secondary)]">{fail.rootCause}</p>
              </div>

              {/* Attempts Timeline */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase">Attempts</p>
                {fail.attempts.map(att => (
                  <div key={att.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        att.result === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                        att.result === 'partial' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {att.attemptNumber}
                      </div>
                      {att.attemptNumber < fail.attempts.length && <div className="w-0.5 flex-1 bg-[var(--border)] my-1" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{att.approach}</p>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getResultBg(att.result)}`}>
                          {att.result}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">{att.lesson}</p>
                    </div>
                  </div>
                ))}
              </div>

              {fail.solution && (
                <div className="mt-4 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <p className="text-sm font-semibold text-emerald-400">Solution</p>
                    {fail.solution.verified && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">✓ Verified</span>}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{fail.solution.solution}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">Effectiveness: {fail.solution.effectiveness}%</p>
                </div>
              )}
            </motion.div>
          )) : (
            <div className="text-center py-20">
              <AlertTriangle size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)]">No failures documented for this project</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'similar' && (
        <div className="space-y-4">
          {similar.map((sim, i) => (
            <motion.div
              key={sim.projectId}
              initial="hidden" animate="visible"
              variants={fadeIn} custom={i}
            >
              <Link href={`/projects/${sim.projectId}`}>
                <div className="card p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[#7c5cfc] transition-colors">
                        {sim.projectName}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">{sim.domain}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-[#7c5cfc]">{sim.overallScore}%</p>
                      <p className="text-[10px] text-[var(--text-muted)]">similarity</p>
                    </div>
                  </div>
                  <div className="bg-[var(--surface-2)] rounded-lg p-3">
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">SIMILAR BECAUSE</p>
                    <div className="flex flex-wrap gap-2">
                      {sim.sharedTechnologies.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded bg-[#3b82f6]/10 text-[#3b82f6]">✓ {t}</span>
                      ))}
                      {sim.sharedFailures.map(f => (
                        <span key={f} className="text-xs px-2 py-0.5 rounded bg-[#f59e0b]/10 text-[#f59e0b]">⚠ {f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'evolution' && (
        <div className="space-y-6">
          {evolutions.length > 0 ? evolutions.map((evo, i) => (
            <motion.div
              key={evo.id}
              initial="hidden" animate="visible"
              variants={fadeIn} custom={i}
              className="card p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="px-4 py-2 rounded-lg bg-[#7c5cfc]/10 text-sm font-medium text-[#7c5cfc]">
                  {evo.parentProjectName}
                </div>
                <ArrowRight className="text-[var(--text-muted)]" />
                <div className="px-4 py-2 rounded-lg bg-[#10b981]/10 text-sm font-medium text-[#10b981]">
                  {evo.childProjectName}
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3"><strong>Reason:</strong> {evo.mutationReason}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {evo.changes.map(c => (
                  <span key={c} className="tag bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border)] text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)]">By {evo.createdBy} on {formatDate(evo.createdAt)}</p>
            </motion.div>
          )) : (
            <div className="text-center py-20">
              <GitBranch size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] mb-4">No evolutions yet for this project</p>
              <Link href={`/evolution?parent=${projectId}`} className="btn-primary">
                Create Evolution
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
