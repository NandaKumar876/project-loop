'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Infinity, ArrowRight, Dna, AlertTriangle, Beaker, GitBranch,
  Brain, Search, ChevronRight, Zap, Shield, BookOpen, TrendingUp,
  Layers, Database, Eye
} from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const loopSteps = [
  { label: 'BUILD', color: '#3b82f6', desc: 'Create new projects' },
  { label: 'FAIL', color: '#ef4444', desc: 'Encounter challenges' },
  { label: 'LEARN', color: '#f59e0b', desc: 'Document discoveries' },
  { label: 'EVOLVE', color: '#10b981', desc: 'Improve & iterate' },
];

const features = [
  {
    icon: Dna,
    title: 'Project DNA',
    desc: 'Every project gets a structured DNA — technology, architecture, decisions, failures, solutions, and dependencies — all captured and indexed.',
    color: '#7c5cfc'
  },
  {
    icon: AlertTriangle,
    title: 'Failure Memory',
    desc: 'Track every failure attempt, what was tried, what didn\'t work, and what finally succeeded. Future teams learn from past mistakes.',
    color: '#ef4444'
  },
  {
    icon: Beaker,
    title: 'What-If Simulator',
    desc: 'Ask "What if I replace MQTT with HTTP?" and see architecture impact, historical evidence, risks, and mitigation strategies.',
    color: '#06b6d4'
  },
  {
    icon: GitBranch,
    title: 'Project Evolution',
    desc: 'Projects don\'t end — they evolve. Track how one project inspires and mutates into the next generation.',
    color: '#10b981'
  },
  {
    icon: Search,
    title: 'Semantic Search',
    desc: 'Search by meaning, not keywords. Find "projects that solved connectivity issues" even if they used different terminology.',
    color: '#f59e0b'
  },
  {
    icon: Brain,
    title: 'AI Assistant',
    desc: 'Ask questions about institutional knowledge. Get evidence-backed answers from the entire project history.',
    color: '#f97316'
  },
];

const howItWorks = [
  { step: '01', title: 'Upload Project', desc: 'Reports, code, diagrams, notes — everything that tells the story.', icon: Layers },
  { step: '02', title: 'Extract DNA', desc: 'AI analyzes and creates structured Project DNA from your uploads.', icon: Dna },
  { step: '03', title: 'Build Knowledge', desc: 'Failures, solutions, and decisions are indexed in institutional memory.', icon: Database },
  { step: '04', title: 'Help Future Teams', desc: 'New projects get historical insights, warnings, and recommendations.', icon: Eye },
];

export default function LandingPage() {
  const [activeLoop, setActiveLoop] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveLoop(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center">
              <Infinity size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[var(--text-primary)]">ProjectLoop</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm">Log in</Link>
            <Link href="/login?mode=signup" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#7c5cfc]/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#06b6d4]/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Evolving Institutional Intelligence Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-[var(--text-primary)]">Every Project Has a Story.</span>
            <br />
            <span className="gradient-text">Don&apos;t Let It Disappear.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Turn student projects, failures, and discoveries into an evolving institutional intelligence that helps the next generation build something better.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/projects" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
              Explore Projects <ArrowRight size={18} />
            </Link>
            <Link href="/login?mode=signup" className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2">
              Start a Project <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Learning Loop Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-lg mx-auto mt-20 relative"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {loopSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  animate={{
                    scale: activeLoop === i ? 1.15 : 1,
                    boxShadow: activeLoop === i ? `0 0 30px ${step.color}30` : '0 0 0 transparent'
                  }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500"
                    style={{
                      borderColor: activeLoop === i ? step.color : 'var(--border)',
                      background: activeLoop === i ? `${step.color}15` : 'var(--surface)'
                    }}
                  >
                    <span
                      className="text-xs sm:text-sm font-bold tracking-wider"
                      style={{ color: activeLoop === i ? step.color : 'var(--text-muted)' }}
                    >
                      {step.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] mt-2 hidden sm:block">{step.desc}</span>
                </motion.div>
                {i < loopSteps.length - 1 && (
                  <motion.div
                    animate={{ color: activeLoop === i ? loopSteps[i].color : 'var(--text-muted)' }}
                    className="text-xl -mt-6 sm:-mt-4"
                  >
                    →
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Loop-back arrow */}
          <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8" viewBox="0 0 400 30" fill="none">
            <path
              d="M360 5 C360 25, 40 25, 40 5"
              stroke={loopSteps[activeLoop].color}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
              fill="none"
            />
            <polygon
              points="38,2 42,8 34,8"
              fill={loopSteps[activeLoop].color}
              fillOpacity="0.4"
            />
          </svg>
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} custom={0} className="section-title text-[#ef4444]">The Problem</motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-3">
              Every Year, Knowledge Disappears
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto text-lg">
              Students repeat the same mistakes. The same failures. The same dead-ends. Because previous project knowledge is locked in forgotten PDFs and unread reports.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: '73%', label: 'of student teams encounter problems already solved by previous teams', color: '#ef4444' },
              { stat: '85%', label: 'of project knowledge is lost after presentation day', color: '#f59e0b' },
              { stat: '60%', label: 'of technology decisions are made without historical context', color: '#f97316' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeInUp} custom={i}
                className="card p-8 text-center"
              >
                <span className="text-4xl font-black" style={{ color: item.color }}>{item.stat}</span>
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How ProjectLoop Works */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--surface)]/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} custom={0} className="section-title text-[#7c5cfc]">How It Works</motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-3">
              From Project to Institutional Intelligence
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeInUp} custom={i}
                className="card p-6 relative group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-black text-[#7c5cfc]/30">{item.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-[#7c5cfc]/10 flex items-center justify-center">
                    <item.icon size={20} className="text-[#7c5cfc]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-[var(--text-muted)] z-10">
                    <ChevronRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} custom={0} className="section-title text-[#06b6d4]">Core Features</motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-3">
              Not a Repository. An Intelligence Platform.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeInUp} custom={i}
                className="card p-6 group hover:border-[var(--border-light)]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${feature.color}15` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project DNA Preview */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--surface)]/30 border-t border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} custom={0} className="section-title text-[#10b981]">Project DNA</motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-3">
              Every Project Gets Its DNA
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
              Structured intelligence extracted from every project — technology choices, architecture patterns, failure history, and reusable solutions.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp} custom={3}
            className="card p-8 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <Dna size={24} className="text-[#7c5cfc]" />
              <div>
                <h3 className="font-bold text-[var(--text-primary)]">Smart Irrigation System</h3>
                <span className="text-xs text-[var(--text-muted)]">Agriculture + IoT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--surface-2)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[#3b82f6] mb-2">TECHNOLOGY</p>
                <div className="flex flex-wrap gap-1.5">
                  {['ESP32', 'MQTT', 'Firebase', 'React'].map(t => (
                    <span key={t} className="tag bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20 text-xs">{t}</span>
                  ))}
                </div>
              </div>
              <div className="bg-[var(--surface-2)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[#10b981] mb-2">ARCHITECTURE</p>
                <p className="text-sm text-[var(--text-secondary)] font-mono">Sensor → ESP32 → MQTT → Cloud → Dashboard</p>
              </div>
              <div className="bg-[var(--surface-2)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[#ef4444] mb-2">FAILURES</p>
                <div className="space-y-1">
                  <p className="text-sm text-[var(--text-secondary)]">• Sensor Noise <span className="text-[#10b981] text-xs">✓ Solved</span></p>
                  <p className="text-sm text-[var(--text-secondary)]">• MQTT Disconnect <span className="text-[#10b981] text-xs">✓ Solved</span></p>
                </div>
              </div>
              <div className="bg-[var(--surface-2)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[#f59e0b] mb-2">RISK LEVEL</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <div className="w-3 h-3 rounded-full bg-[var(--border)]" />
                  </div>
                  <span className="text-sm text-[#f59e0b] font-medium">Medium</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">Reusability: 78%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What-If Preview */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <motion.p variants={fadeInUp} custom={0} className="section-title text-[#06b6d4]">What-If Simulator</motion.p>
              <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-3 mb-4">
                Simulate Before You Build
              </motion.h2>
              <motion.p variants={fadeInUp} custom={2} className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Ask &ldquo;What if I replace MQTT with HTTP?&rdquo; and see the impact on your architecture, with historical evidence from previous projects.
              </motion.p>
              <motion.div variants={fadeInUp} custom={3} className="space-y-3">
                {[
                  { q: 'What if MQTT → HTTP?', risk: 'Medium', color: '#f59e0b' },
                  { q: 'What if Firebase → Supabase?', risk: 'Low', color: '#10b981' },
                  { q: 'What if ESP32 → Raspberry Pi?', risk: 'High', color: '#f97316' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{item.q}</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ color: item.color, background: `${item.color}15` }}>
                      {item.risk} Risk
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeInUp} custom={2}
              className="card p-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] mb-4 text-center">CURRENT</p>
                  <div className="space-y-2">
                    {['Sensor', 'ESP32', 'MQTT', 'Firebase'].map((node, i) => (
                      <React.Fragment key={node}>
                        <div className="architecture-node">{node}</div>
                        {i < 3 && <div className="architecture-arrow">↓</div>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#06b6d4] mb-4 text-center">PROPOSED</p>
                  <div className="space-y-2">
                    {[
                      { name: 'Sensor', cls: '' },
                      { name: 'ESP32', cls: 'highlighted' },
                      { name: 'HTTP', cls: 'added' },
                      { name: 'Supabase', cls: 'added' }
                    ].map((node, i) => (
                      <React.Fragment key={node.name}>
                        <div className={`architecture-node ${node.cls}`}>{node.name}</div>
                        {i < 3 && <div className="architecture-arrow">↓</div>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} custom={0} className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center">
                <Infinity size={32} className="text-white" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Ready to Build on History?
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-[var(--text-secondary)] text-lg mb-8">
              Join ProjectLoop and contribute to an ever-growing institutional intelligence.
            </motion.p>
            <motion.div variants={fadeInUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login?mode=signup" className="btn-primary text-base px-10 py-3.5 flex items-center gap-2">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link href="/projects" className="btn-secondary text-base px-10 py-3.5">
                Explore Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Infinity size={18} className="text-[#7c5cfc]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">ProjectLoop</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            An evolving institutional intelligence platform. © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
