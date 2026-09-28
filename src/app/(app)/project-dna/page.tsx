'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dna, ChevronRight, Cpu, Code, Database, GitBranch,
  AlertTriangle, CheckCircle2, Shield, Layers, Puzzle
} from 'lucide-react';
import { demoProjects, demoDNA } from '@/lib/demo-data';
import { getRiskBg } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 }
  })
};

export default function ProjectDNAPage() {
  const [selectedProject, setSelectedProject] = useState('proj-1');
  const project = demoProjects.find(p => p.id === selectedProject);
  const dna = demoDNA[selectedProject];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#7c5cfc]/10 flex items-center justify-center">
            <Dna size={22} className="text-[#7c5cfc]" />
          </div>
          Project DNA
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2">
          Structured intelligence extracted from every project — technology, architecture, decisions, failures, and solutions.
        </p>
      </motion.div>

      {/* Project Selector */}
      <div className="card p-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase whitespace-nowrap">View DNA for:</label>
          <select className="input max-w-md" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
            {demoProjects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {dna && project ? (
        <div className="space-y-6">
          {/* DNA Identity Card */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0} className="card p-6 gradient-bg">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                <Dna size={40} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">{project.name}</h2>
                <p className="text-sm text-[var(--text-muted)] mb-4">{project.domain}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Risk Level</p>
                    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded border inline-block mt-1 ${getRiskBg(dna.riskLevel)}`}>
                      {dna.riskLevel}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Reusability</p>
                    <p className="text-lg font-bold text-[#10b981]">{dna.reusabilityScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Technologies</p>
                    <p className="text-lg font-bold text-[#3b82f6]">{project.technologies.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Components</p>
                    <p className="text-lg font-bold text-[#f97316]">
                      {dna.componentDNA.hardware.length + dna.componentDNA.software.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technology DNA */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={1} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Cpu size={18} className="text-[#3b82f6]" /> Technology DNA
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Languages', items: dna.technologyDNA.languages, color: '#7c5cfc' },
                { label: 'Frameworks', items: dna.technologyDNA.frameworks, color: '#3b82f6' },
                { label: 'Protocols', items: dna.technologyDNA.protocols, color: '#06b6d4' },
                { label: 'Cloud & DB', items: [...dna.technologyDNA.databases, ...dna.technologyDNA.cloud], color: '#10b981' },
              ].map(group => (
                <div key={group.label} className="p-3 rounded-lg bg-[var(--surface-2)]">
                  <p className="text-xs font-semibold mb-2" style={{ color: group.color }}>{group.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map(item => (
                      <span key={item} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${group.color}15`, color: group.color }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architecture DNA */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={2} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Layers size={18} className="text-[#06b6d4]" /> Architecture DNA
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-5">Pattern: <span className="text-[var(--text-secondary)] font-medium">{dna.architectureDNA.pattern}</span></p>

            {/* Data Flow */}
            <div className="flex flex-wrap items-center gap-3 justify-center py-6 mb-6 bg-[var(--surface-2)] rounded-xl">
              {dna.architectureDNA.dataFlow.map((node, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="architecture-node"
                  >
                    {node}
                  </motion.div>
                  {i < dna.architectureDNA.dataFlow.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 + 0.1 }}
                    >
                      <ChevronRight size={20} className="text-[#7c5cfc]" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Layers */}
            <div className="space-y-3">
              {dna.architectureDNA.layers.map((layer, i) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[var(--surface-2)]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#06b6d4]">
                    L{i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{layer.name}</p>
                    <p className="text-xs text-[var(--text-muted)] mb-2">{layer.technology}</p>
                    <div className="flex flex-wrap gap-1">
                      {layer.components.map(c => (
                        <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-secondary)]">{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Component DNA */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={3} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Puzzle size={18} className="text-[#f97316]" /> Component DNA
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="section-title text-[#f97316]">Hardware Components</p>
                <div className="space-y-2">
                  {dna.componentDNA.hardware.map(c => (
                    <div key={c.name} className="p-3 rounded-lg bg-[var(--surface-2)] flex items-start gap-3">
                      <Cpu size={16} className="text-[#f97316] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{c.name}</p>
                          {c.reusable && <span className="text-[10px] text-[#10b981] bg-[#10b981]/10 px-1.5 rounded">♻ Reusable</span>}
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{c.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="section-title text-[#3b82f6]">Software Components</p>
                <div className="space-y-2">
                  {dna.componentDNA.software.map(c => (
                    <div key={c.name} className="p-3 rounded-lg bg-[var(--surface-2)] flex items-start gap-3">
                      <Code size={16} className="text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{c.name}</p>
                          {c.reusable && <span className="text-[10px] text-[#10b981] bg-[#10b981]/10 px-1.5 rounded">♻ Reusable</span>}
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{c.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decision DNA */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={4} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <GitBranch size={18} className="text-[#f59e0b]" /> Decision DNA
            </h3>
            <div className="space-y-3">
              {dna.decisionDNA.decisions.map(dec => (
                <div key={dec.id} className="p-4 rounded-lg bg-[var(--surface-2)] border-l-2 border-[#f59e0b]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{dec.what}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                      dec.confidence === 'high' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {dec.confidence}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-1"><strong>Why:</strong> {dec.why}</p>
                  <p className="text-xs text-[var(--text-secondary)]"><strong>Outcome:</strong> {dec.outcome}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Risk DNA */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={5} className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Shield size={18} className="text-[#ef4444]" /> Risk DNA
            </h3>
            <div className="space-y-3">
              {dna.riskDNA.risks.map(risk => (
                <div key={risk.id} className="p-4 rounded-lg bg-[var(--surface-2)]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{risk.pattern}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--text-muted)]">{risk.occurrences} occurrences</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getRiskBg(risk.severity)}`}>{risk.severity}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{risk.description}</p>
                  <p className="text-xs text-emerald-400">Mitigation: {risk.mitigation}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="card p-12 text-center">
          <Dna size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">DNA analysis not yet available for this project</p>
          <p className="text-xs text-[var(--text-muted)] mt-2">Upload project files to generate Project DNA</p>
        </div>
      )}
    </div>
  );
}
