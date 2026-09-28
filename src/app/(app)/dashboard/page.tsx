'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FolderKanban, Dna, AlertTriangle, Lightbulb, GitBranch,
  TrendingUp, Puzzle, CheckCircle2, ArrowRight, Zap, BarChart3
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { demoProjects, demoFailures, demoEvolutions, institutionalStats, globalRiskPatterns } from '@/lib/demo-data';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const COLORS = ['#7c5cfc', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#f97316', '#ef4444', '#8b5cf6'];

export default function DashboardPage() {
  const { user } = useAuth();

  const myProjects = demoProjects.filter(p => p.ownerId === user?.id);
  const resolvedFailures = demoFailures.filter(f => f.status === 'resolved');

  const statCards = [
    { label: 'Projects Created', value: myProjects.length || 3, icon: FolderKanban, color: '#7c5cfc', href: '/projects' },
    { label: 'Knowledge Contributions', value: institutionalStats.totalKnowledgeChunks, icon: Lightbulb, color: '#3b82f6', href: '/search' },
    { label: 'Problems Solved', value: resolvedFailures.length, icon: CheckCircle2, color: '#10b981', href: '/failures' },
    { label: 'Reusable Components', value: institutionalStats.totalReusableComponents, icon: Puzzle, color: '#06b6d4', href: '/project-dna' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Here&apos;s what&apos;s happening in your institutional intelligence network.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial="hidden" animate="visible"
            variants={fadeIn} custom={i}
          >
            <Link href={card.href}>
              <div className="card p-5 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.color}15` }}
                  >
                    <card.icon size={20} style={{ color: card.color }} />
                  </div>
                  <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{card.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{card.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Projects */}
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeIn} custom={4}
          className="lg:col-span-2"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <FolderKanban size={18} className="text-[#7c5cfc]" />
                Recent Projects
              </h2>
              <Link href="/projects" className="text-xs text-[#7c5cfc] hover:underline flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {demoProjects.slice(0, 5).map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--surface-2)] transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c5cfc]/20 to-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
                      <FolderKanban size={18} className="text-[#7c5cfc]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate group-hover:text-[#7c5cfc] transition-colors">
                        {project.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{project.domain}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      project.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Historical Risks */}
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeIn} custom={5}
        >
          <div className="card p-6">
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-5">
              <AlertTriangle size={18} className="text-[#f59e0b]" />
              Historical Risks
            </h2>
            <div className="space-y-3">
              {globalRiskPatterns.slice(0, 4).map((risk) => (
                <div key={risk.id} className="p-3 rounded-lg bg-[var(--surface-2)]">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{risk.pattern}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      risk.severity === 'high'
                        ? 'bg-orange-500/10 text-orange-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{risk.occurrences} occurrences across projects</p>
                </div>
              ))}
            </div>
            <Link href="/failures" className="text-xs text-[#7c5cfc] hover:underline mt-4 block text-center">
              View all failure patterns →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Monthly Projects Chart */}
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeIn} custom={6}
        >
          <div className="card p-6">
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-5">
              <BarChart3 size={18} className="text-[#3b82f6]" />
              Projects Over Time
            </h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={institutionalStats.monthlyProjects}>
                  <XAxis dataKey="month" tick={{ fill: '#627d98', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#627d98', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#102a43',
                      border: '1px solid #334e68',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#f0f4f8'
                    }}
                  />
                  <Bar dataKey="count" fill="#7c5cfc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Top Technologies */}
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeIn} custom={7}
        >
          <div className="card p-6">
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-5">
              <Zap size={18} className="text-[#06b6d4]" />
              Top Technologies
            </h2>
            <div className="h-48 flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={institutionalStats.topTechnologies.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {institutionalStats.topTechnologies.slice(0, 6).map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {institutionalStats.topTechnologies.slice(0, 6).map((tech, i) => (
                  <div key={tech.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-xs text-[var(--text-secondary)] flex-1">{tech.name}</span>
                    <span className="text-xs font-medium text-[var(--text-muted)]">{tech.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Evolution & Knowledge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Project Evolutions */}
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeIn} custom={8}
        >
          <div className="card p-6">
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-5">
              <GitBranch size={18} className="text-[#10b981]" />
              Project Evolutions
            </h2>
            <div className="space-y-4">
              {demoEvolutions.map(evo => (
                <div key={evo.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#7c5cfc] border-2 border-[var(--background)]" />
                    <div className="w-0.5 h-8 bg-[var(--border)]" />
                    <div className="w-3 h-3 rounded-full bg-[#10b981] border-2 border-[var(--background)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{evo.parentProjectName}</p>
                    <p className="text-xs text-[var(--text-muted)] my-1">→ evolved into</p>
                    <p className="text-sm font-medium text-[#10b981]">{evo.childProjectName}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/evolution" className="text-xs text-[#7c5cfc] hover:underline mt-4 block text-center">
              View evolution tree →
            </Link>
          </div>
        </motion.div>

        {/* Institutional Intelligence */}
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeIn} custom={9}
        >
          <div className="card p-6 gradient-bg">
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-5">
              <TrendingUp size={18} className="text-[#7c5cfc]" />
              Institutional Intelligence
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Projects', value: institutionalStats.totalProjects, color: '#7c5cfc' },
                { label: 'Knowledge Chunks', value: institutionalStats.totalKnowledgeChunks, color: '#3b82f6' },
                { label: 'Failures Resolved', value: institutionalStats.totalFailuresResolved, color: '#10b981' },
                { label: 'Technologies', value: institutionalStats.totalTechnologies, color: '#06b6d4' },
                { label: 'Evolutions', value: institutionalStats.totalEvolutions, color: '#f59e0b' },
                { label: 'Reusable Parts', value: institutionalStats.totalReusableComponents, color: '#f97316' },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-lg bg-[var(--surface)]">
                  <p className="text-xl font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
