'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Beaker, ArrowRight, AlertTriangle, CheckCircle2, XCircle,
  ChevronRight, Shield, Eye, Zap, RefreshCw, ArrowDown
} from 'lucide-react';
import { demoProjects, demoDNA, getWhatIfResult } from '@/lib/demo-data';
import { getRiskBg } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const presetScenarios = [
  { from: 'MQTT', to: 'HTTP', label: 'MQTT → HTTP' },
  { from: 'Firebase', to: 'Supabase', label: 'Firebase → Supabase' },
  { from: 'ESP32', to: 'Raspberry Pi', label: 'ESP32 → Raspberry Pi' },
];

export default function WhatIfPage() {
  const [selectedProject, setSelectedProject] = useState('proj-1');
  const [fromComponent, setFromComponent] = useState('');
  const [toComponent, setToComponent] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof getWhatIfResult> | null>(null);
  const [showResult, setShowResult] = useState(false);

  const project = demoProjects.find(p => p.id === selectedProject);
  const dna = demoDNA[selectedProject];
  const architecture = dna?.architectureDNA.dataFlow || [];

  const runSimulation = async (from: string, to: string) => {
    setFromComponent(from);
    setToComponent(to);
    setIsSimulating(true);
    setShowResult(false);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const simResult = getWhatIfResult(selectedProject, from, to);
    setResult(simResult);
    setIsSimulating(false);
    setShowResult(true);
  };

  const getProposedArchitecture = () => {
    return architecture.map(node => {
      if (node.toLowerCase() === fromComponent.toLowerCase()) {
        return { name: toComponent, status: 'added' as const };
      }
      return { name: node, status: 'unchanged' as const };
    });
  };

  const impactLevelColor = (level: string) => {
    switch (level) {
      case 'none': return 'text-slate-400';
      case 'low': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-orange-400';
      case 'breaking': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const impactLevelBg = (level: string) => {
    switch (level) {
      case 'none': return 'bg-slate-500/10 border-slate-500/20';
      case 'low': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'medium': return 'bg-amber-500/10 border-amber-500/20';
      case 'high': return 'bg-orange-500/10 border-orange-500/20';
      case 'breaking': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center">
            <Beaker size={22} className="text-[#06b6d4]" />
          </div>
          What-If Simulator
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2">
          Simulate architecture changes and see the impact based on historical project evidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration */}
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeIn} custom={0}
          className="space-y-4"
        >
          {/* Project Select */}
          <div className="card p-5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-2 block">Select Project</label>
            <select
              className="input"
              value={selectedProject}
              onChange={e => { setSelectedProject(e.target.value); setShowResult(false); }}
            >
              {demoProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Preset Scenarios */}
          <div className="card p-5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-3 block">Quick Scenarios</label>
            <div className="space-y-2">
              {presetScenarios.map(scenario => (
                <button
                  key={scenario.label}
                  onClick={() => runSimulation(scenario.from, scenario.to)}
                  className="w-full p-3 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--surface-3)] border border-[var(--border)] hover:border-[#06b6d4]/30 transition-all text-left group"
                  disabled={isSimulating}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[#06b6d4] transition-colors">
                      {scenario.label}
                    </span>
                    <Zap size={14} className="text-[var(--text-muted)] group-hover:text-[#06b6d4]" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Scenario */}
          <div className="card p-5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-3 block">Custom Scenario</label>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Replace this...</label>
                <input
                  className="input"
                  placeholder="e.g., MQTT"
                  value={fromComponent}
                  onChange={e => setFromComponent(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <ArrowDown size={18} className="text-[var(--text-muted)]" />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">With this...</label>
                <input
                  className="input"
                  placeholder="e.g., HTTP"
                  value={toComponent}
                  onChange={e => setToComponent(e.target.value)}
                />
              </div>
              <button
                onClick={() => runSimulation(fromComponent, toComponent)}
                disabled={!fromComponent || !toComponent || isSimulating}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Beaker size={14} /> Run Simulation
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/20">
            <p className="text-xs text-[#f59e0b] font-medium mb-1">⚠ Important Note</p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Results are based on historical project evidence and AI analysis. They are suggestions, not guarantees.
              Always verify with your own testing.
            </p>
          </div>
        </motion.div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Architecture Comparison */}
          <motion.div
            initial="hidden" animate="visible"
            variants={fadeIn} custom={1}
            className="card p-6"
          >
            <h3 className="font-semibold text-[var(--text-primary)] mb-5">Architecture Comparison</h3>
            <div className="grid grid-cols-2 gap-8">
              {/* Current */}
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)] mb-4 text-center uppercase tracking-wider">Current Architecture</p>
                <div className="space-y-2">
                  {architecture.map((node, i) => (
                    <React.Fragment key={i}>
                      <motion.div
                        className={`architecture-node ${
                          showResult && node.toLowerCase() === fromComponent.toLowerCase() ? 'removed' : ''
                        }`}
                        animate={showResult && node.toLowerCase() === fromComponent.toLowerCase() ? { opacity: 0.5 } : {}}
                      >
                        {node}
                      </motion.div>
                      {i < architecture.length - 1 && (
                        <div className="architecture-arrow">↓</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Proposed */}
              <div>
                <p className="text-xs font-semibold text-[#06b6d4] mb-4 text-center uppercase tracking-wider">
                  {showResult ? 'Proposed Mutation' : 'Run a simulation →'}
                </p>
                {showResult ? (
                  <div className="space-y-2">
                    {getProposedArchitecture().map((node, i) => (
                      <React.Fragment key={i}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className={`architecture-node ${node.status === 'added' ? 'added' : ''}`}
                        >
                          {node.name}
                          {node.status === 'added' && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#10b981] flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold">✓</span>
                            </span>
                          )}
                        </motion.div>
                        {i < architecture.length - 1 && (
                          <div className="architecture-arrow">↓</div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[200px]">
                    <p className="text-sm text-[var(--text-muted)] text-center">
                      Select a scenario or enter a custom change to see the proposed architecture
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Simulation Loading */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card p-8 text-center"
              >
                <div className="w-12 h-12 border-3 border-[#06b6d4]/30 border-t-[#06b6d4] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-medium text-[var(--text-primary)]">Analyzing architecture impact...</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Searching historical evidence from {demoProjects.length} projects</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {showResult && result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Overall Risk */}
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[var(--text-primary)]">Simulation Result</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getRiskBg(result.overallRisk)}`}>
                        {result.overallRisk} risk
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        result.confidence === 'high' ? 'bg-emerald-500/10 text-emerald-400' :
                        result.confidence === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {result.confidence} confidence
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Architecture Impact */}
                    <div className={`p-4 rounded-lg border ${impactLevelBg(result.architectureImpact.level)}`}>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">ARCHITECTURE IMPACT</p>
                      <p className={`text-lg font-bold uppercase ${impactLevelColor(result.architectureImpact.level)}`}>
                        {result.architectureImpact.level}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {result.architectureImpact.affectedComponents.length} components affected
                      </p>
                    </div>

                    {/* Dependency Impact */}
                    <div className={`p-4 rounded-lg border ${impactLevelBg(result.dependencyImpact.level)}`}>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">DEPENDENCY IMPACT</p>
                      <p className={`text-lg font-bold uppercase ${impactLevelColor(result.dependencyImpact.level)}`}>
                        {result.dependencyImpact.level}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {result.dependencyImpact.affectedComponents.length} dependencies affected
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="card p-5">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">Detailed Impact Analysis</h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-[var(--surface-2)]">
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">ARCHITECTURE CHANGES</p>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">{result.architectureImpact.description}</p>
                      <div className="space-y-1.5">
                        {result.architectureImpact.changes.map((change, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <ChevronRight size={12} className="text-[#06b6d4] mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-[var(--text-secondary)]">{change}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Affected Components */}
                    <div className="p-4 rounded-lg bg-[var(--surface-2)]">
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">AFFECTED COMPONENTS</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.architectureImpact.affectedComponents.map(comp => (
                          <span key={comp} className="tag bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20 text-xs">{comp}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Historical Evidence */}
                {result.historicalEvidence.length > 0 && (
                  <div className="card p-5">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Eye size={16} className="text-[#7c5cfc]" />
                      Historical Evidence
                      <span className="text-xs bg-[#7c5cfc]/10 text-[#7c5cfc] px-2 py-0.5 rounded-full">
                        from ProjectLoop data
                      </span>
                    </h3>
                    <div className="space-y-3">
                      {result.historicalEvidence.map((ev, i) => (
                        <div key={i} className="p-4 rounded-lg bg-[var(--surface-2)] border-l-2 border-[#7c5cfc]">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-[var(--text-primary)]">{ev.projectName}</p>
                            <span className="text-xs text-[var(--text-muted)]">{ev.year}</span>
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">{ev.description}</p>
                          <p className="text-xs mt-2">
                            <span className="text-[var(--text-muted)]">Outcome: </span>
                            <span className={ev.outcome.toLowerCase().includes('success') ? 'text-emerald-400' : 'text-amber-400'}>
                              {ev.outcome}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risks & Successes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Known Successes */}
                  <div className="card p-5">
                    <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} /> Known Advantages
                    </h4>
                    <div className="space-y-2">
                      {result.knownSuccesses.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                          <span className="text-xs text-[var(--text-secondary)]">{s}</span>
                        </div>
                      ))}
                      {result.knownSuccesses.length === 0 && (
                        <p className="text-xs text-[var(--text-muted)] italic">No historical success data available</p>
                      )}
                    </div>
                  </div>

                  {/* Potential Risks */}
                  <div className="card p-5">
                    <h4 className="text-sm font-semibold text-[#ef4444] mb-3 flex items-center gap-2">
                      <AlertTriangle size={16} /> Potential Risks
                    </h4>
                    <div className="space-y-2">
                      {result.potentialRisks.map((r, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-red-400 text-xs mt-0.5">⚠</span>
                          <span className="text-xs text-[var(--text-secondary)]">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mitigation */}
                <div className="card p-5">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <Shield size={16} className="text-[#10b981]" />
                    Suggested Mitigation
                  </h3>
                  <div className="space-y-2">
                    {result.suggestedMitigation.map((m, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5">
                        <span className="text-sm font-bold text-emerald-400 flex-shrink-0">{i + 1}</span>
                        <span className="text-sm text-[var(--text-secondary)]">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Known Failures */}
                {result.knownFailures.length > 0 && (
                  <div className="card p-5">
                    <h4 className="text-sm font-semibold text-[#ef4444] mb-3 flex items-center gap-2">
                      <XCircle size={16} /> Known Failure Patterns
                    </h4>
                    <div className="space-y-2">
                      {result.knownFailures.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-red-500/5">
                          <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-[var(--text-secondary)]">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!isSimulating && !showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-12 text-center"
            >
              <Beaker size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Ready to Simulate</h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                Choose a quick scenario or enter a custom architecture change to see its potential impact based on historical project data.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
