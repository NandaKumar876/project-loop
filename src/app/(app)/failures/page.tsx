'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, CheckCircle2, XCircle, Clock, ChevronDown,
  ChevronUp, Shield, Eye, TrendingDown, Filter
} from 'lucide-react';
import { demoFailures, globalRiskPatterns } from '@/lib/demo-data';
import { demoProjects } from '@/lib/demo-data';
import { getRiskBg, getResultBg, getStatusBg } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 }
  })
};

export default function FailuresPage() {
  const [expandedFailure, setExpandedFailure] = useState<string | null>('fail-1');
  const [activeView, setActiveView] = useState<'failures' | 'patterns'>('failures');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [...new Set(demoFailures.map(f => f.category))];

  const filtered = categoryFilter === 'all'
    ? demoFailures
    : demoFailures.filter(f => f.category === categoryFilter);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ef4444]/10 flex items-center justify-center">
              <AlertTriangle size={22} className="text-[#ef4444]" />
            </div>
            Failure Memory
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Institutional memory of what went wrong and how it was solved.
            Learn from previous teams&apos; experiences.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Failures', value: demoFailures.length, icon: AlertTriangle, color: '#ef4444' },
          { label: 'Resolved', value: demoFailures.filter(f => f.status === 'resolved').length, icon: CheckCircle2, color: '#10b981' },
          { label: 'Risk Patterns', value: globalRiskPatterns.length, icon: Shield, color: '#f59e0b' },
          { label: 'Total Attempts', value: demoFailures.reduce((sum, f) => sum + f.attempts.length, 0), icon: TrendingDown, color: '#7c5cfc' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial="hidden" animate="visible"
            variants={fadeIn} custom={i}
            className="card p-4"
          >
            <stat.icon size={18} style={{ color: stat.color }} className="mb-2" />
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex gap-1 border-b border-[var(--border)] mb-6">
        <button
          onClick={() => setActiveView('failures')}
          className={`tab ${activeView === 'failures' ? 'active' : ''}`}
        >
          Failure History
        </button>
        <button
          onClick={() => setActiveView('patterns')}
          className={`tab ${activeView === 'patterns' ? 'active' : ''}`}
        >
          Risk Patterns
        </button>
      </div>

      {activeView === 'failures' && (
        <>
          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`tag cursor-pointer ${categoryFilter === 'all' ? 'bg-[#7c5cfc]/10 text-[#7c5cfc] border-[#7c5cfc]/20' : 'bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border)]'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`tag cursor-pointer whitespace-nowrap ${categoryFilter === cat ? 'bg-[#7c5cfc]/10 text-[#7c5cfc] border-[#7c5cfc]/20' : 'bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border)]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Failure List */}
          <div className="space-y-4">
            {filtered.map((failure, i) => {
              const project = demoProjects.find(p => p.id === failure.projectId);
              const isExpanded = expandedFailure === failure.id;

              return (
                <motion.div
                  key={failure.id}
                  initial="hidden" animate="visible"
                  variants={fadeIn} custom={i}
                  className="card overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFailure(isExpanded ? null : failure.id)}
                    className="w-full p-5 text-left flex items-start gap-4 hover:bg-[var(--surface-2)]/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      failure.status === 'resolved' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                    }`}>
                      {failure.status === 'resolved' ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : (
                        <AlertTriangle size={20} className="text-red-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-semibold text-[var(--text-primary)]">{failure.title}</h3>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusBg(failure.status)}`}>
                          {failure.status}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getRiskBg(failure.severity)}`}>
                          {failure.severity}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">{failure.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                        <span>Project: {project?.name}</span>
                        <span>{failure.attempts.length} attempts</span>
                        <span>{failure.affectedProjects} projects affected</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 mt-1">
                      {isExpanded ? <ChevronUp size={18} className="text-[var(--text-muted)]" /> : <ChevronDown size={18} className="text-[var(--text-muted)]" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-[var(--border)]">
                          {/* Root Cause */}
                          <div className="mt-4 p-4 rounded-lg bg-[var(--surface-2)]">
                            <p className="text-xs font-semibold text-[#f59e0b] mb-1">ROOT CAUSE</p>
                            <p className="text-sm text-[var(--text-secondary)]">{failure.rootCause}</p>
                          </div>

                          {/* Attempts Timeline */}
                          <div className="mt-5">
                            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-3">Attempt Timeline</p>
                            <div className="space-y-0">
                              {failure.attempts.map((att, j) => (
                                <div key={att.id} className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: j * 0.15, type: 'spring' }}
                                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                                        att.result === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                                        att.result === 'partial' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                        'bg-red-500/10 border-red-500/30 text-red-400'
                                      }`}
                                    >
                                      {att.attemptNumber}
                                    </motion.div>
                                    {j < failure.attempts.length - 1 && (
                                      <div className="w-0.5 h-full min-h-[24px] bg-[var(--border)]" />
                                    )}
                                  </div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.15 + 0.1 }}
                                    className="flex-1 pb-5"
                                  >
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <p className="text-sm font-semibold text-[var(--text-primary)]">{att.approach}</p>
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getResultBg(att.result)}`}>
                                        {att.result}
                                      </span>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] mb-1">{att.evidence}</p>
                                    <p className="text-xs text-[#7c5cfc] italic">💡 {att.lesson}</p>
                                  </motion.div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Solution */}
                          {failure.solution && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="mt-4 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 size={18} className="text-emerald-400" />
                                <p className="text-sm font-bold text-emerald-400">SOLUTION FOUND</p>
                                {failure.solution.verified && (
                                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                                    ✓ Faculty Verified
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[var(--text-secondary)] mb-3">{failure.solution.solution}</p>
                              <div className="flex items-center gap-6 text-xs text-[var(--text-muted)]">
                                <span>Effectiveness: <strong className="text-emerald-400">{failure.solution.effectiveness}%</strong></span>
                                <span>Confidence: <strong className="text-[var(--text-secondary)]">{failure.solution.confidence}</strong></span>
                                {failure.solution.verifiedBy && <span>Verified by: {failure.solution.verifiedBy}</span>}
                              </div>
                              <div className="mt-3 p-3 rounded-lg bg-[var(--surface)]">
                                <p className="text-xs text-[var(--text-muted)] mb-1">Evidence</p>
                                <p className="text-xs text-[var(--text-secondary)]">{failure.solution.evidence}</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {activeView === 'patterns' && (
        <div className="space-y-4">
          {globalRiskPatterns.map((pattern, i) => (
            <motion.div
              key={pattern.id}
              initial="hidden" animate="visible"
              variants={fadeIn} custom={i}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    pattern.severity === 'high' ? 'bg-orange-500/10' : 'bg-amber-500/10'
                  }`}>
                    <Shield size={20} className={pattern.severity === 'high' ? 'text-orange-400' : 'text-amber-400'} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">{pattern.pattern}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{pattern.description}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-[#f59e0b]">{pattern.occurrences}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">occurrences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[var(--surface-2)]">
                  <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">AFFECTED DOMAINS</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.affectedDomains.map(d => (
                      <span key={d} className="tag bg-[#7c5cfc]/10 text-[#7c5cfc] border-[#7c5cfc]/20 text-[10px]">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <p className="text-xs font-semibold text-emerald-400 mb-2">MITIGATION</p>
                  <p className="text-xs text-[var(--text-secondary)]">{pattern.mitigation}</p>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)] mb-2 flex items-center gap-1">
                  <Eye size={12} /> EVIDENCE
                </p>
                <div className="space-y-2">
                  {pattern.evidence.map(ev => (
                    <div key={ev.id} className="flex items-start gap-2 p-2 rounded bg-[var(--surface-2)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[var(--text-primary)] font-medium">{ev.sourceProjectName}</p>
                        <p className="text-xs text-[var(--text-muted)]">{ev.description}</p>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ml-auto flex-shrink-0 ${
                        ev.confidence === 'high' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {ev.confidence}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
