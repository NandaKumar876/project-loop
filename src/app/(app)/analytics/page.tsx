'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, AlertTriangle, CheckCircle2,
  Clock, Shield, Cpu, Layers, Award, Sparkles, Filter
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend
} from 'recharts';
import { institutionalStats, demoFailures, demoProjects, demoDNA } from '@/lib/demo-data';

const COLORS = ['#7c5cfc', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'1y' | '3y' | 'all'>('1y');

  // Compute stats
  const totalFailures = demoFailures.length;
  const resolvedFailures = demoFailures.filter(f => f.status === 'resolved').length;
  const resolutionRate = Math.round((resolvedFailures / totalFailures) * 100);
  const estimatedHoursSaved = resolvedFailures * 18; // approx 18 hrs saved per documented failure avoided

  // Failure categories data
  const categoryCounts = demoFailures.reduce<Record<string, number>>((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});

  const failureCategoryData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Reusability distribution
  const reusabilityData = [
    { range: '90-100%', count: 4, label: 'High Reusability' },
    { range: '75-89%', count: 6, label: 'Moderate' },
    { range: '50-74%', count: 3, label: 'Low' },
    { range: '<50%', count: 1, label: 'Monolithic' },
  ];

  // Tech stack lifecycle
  const techStackStatus = [
    { tech: 'FastAPI / Python', status: 'Surging (+45%)', category: 'Backend/AI', health: 'Optimal' },
    { tech: 'ESP32 / FreeRTOS', status: 'Established (+18%)', category: 'Embedded', health: 'Optimal' },
    { tech: 'Next.js / TypeScript', status: 'Primary (+60%)', category: 'Frontend/Web', health: 'Optimal' },
    { tech: 'MQTT / Mosquitto', status: 'Standard (+12%)', category: 'Protocols', health: 'Stable' },
    { tech: 'SQLite (Concurrent)', status: 'Deprecated (-70%)', category: 'Database', health: 'At Risk' },
    { tech: 'DHT11 Sensors', status: 'Banned (-95%)', category: 'Hardware', health: 'Critical Pitfall' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center text-white">
              <BarChart3 size={18} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Institutional Intelligence Analytics</h1>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Tracking cross-cohort knowledge reuse, failure resolution rates, and institutional engineering velocity.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-[var(--surface-2)] p-1 rounded-lg border border-[var(--border)] self-start sm:self-auto">
          {(['1y', '3y', 'all'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-[#7c5cfc] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {range === '1y' ? 'Past Year' : range === '3y' ? '3 Years' : 'All Cohorts'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Failure Resolution Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--text-primary)]">{resolutionRate}%</span>
            <span className="text-xs text-emerald-400 font-medium">+{resolvedFailures} verified</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">Out of {totalFailures} logged institutional bugs</p>
          <div className="mt-3 w-full bg-[var(--surface-2)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${resolutionRate}%` }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Student-Hours Saved</span>
            <div className="w-8 h-8 rounded-lg bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--text-primary)]">{estimatedHoursSaved}h</span>
            <span className="text-xs text-[#7c5cfc] font-medium">Institutional ROI</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">Prevented repeated trial-and-error debugging</p>
          <div className="mt-3 w-full bg-[var(--surface-2)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#7c5cfc] h-full rounded-full" style={{ width: '84%' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Reusable Modules</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Cpu size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--text-primary)]">{institutionalStats.totalReusableComponents}</span>
            <span className="text-xs text-cyan-400 font-medium">+12 this semester</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">Cross-project hardware & software drivers</p>
          <div className="mt-3 w-full bg-[var(--surface-2)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full" style={{ width: '76%' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Evolution Chains</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--text-primary)]">{institutionalStats.totalEvolutions}</span>
            <span className="text-xs text-amber-400 font-medium">Ancestry active</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">Projects inherited and improved upon</p>
          <div className="mt-3 w-full bg-[var(--surface-2)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }} />
          </div>
        </motion.div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly velocity */}
        <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Project Submissions & DNA Extractions</h2>
              <p className="text-xs text-[var(--text-muted)]">Cumulative repository growth across academic terms</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={institutionalStats.monthlyProjects}>
                <defs>
                  <linearGradient id="projColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c5cfc" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#7c5cfc" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="count" stroke="#7c5cfc" strokeWidth={2} fillOpacity={1} fill="url(#projColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Failure Categories Breakdown */}
        <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Failure Memory Distribution</h2>
              <p className="text-xs text-[var(--text-muted)]">Frequency of roadblock categories documented</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failureCategoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                  {failureCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Technology Lifecycle & Repeat Pitfalls table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technology adoption health */}
        <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Institutional Stack Recommendations</h2>
          <p className="text-xs text-[var(--text-muted)]">Technologies ranked by student success rate and institutional support</p>
          <div className="divide-y divide-[var(--border)]">
            {techStackStatus.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.tech}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.category} • {item.status}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  item.health === 'Optimal'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : item.health === 'Stable'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : item.health === 'At Risk'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {item.health}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reusability Index breakdown */}
        <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Reusability Score Stratification</h2>
          <p className="text-xs text-[var(--text-muted)]">Assessment of modularity across student architectures</p>
          <div className="space-y-4 pt-2">
            {reusabilityData.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[var(--text-primary)]">{item.label} ({item.range})</span>
                  <span className="text-[var(--text-muted)]">{item.count} Projects</span>
                </div>
                <div className="w-full bg-[var(--surface-2)] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.count / 14) * 100}%`,
                      backgroundColor: COLORS[idx % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-[#7c5cfc]/5 border border-[#7c5cfc]/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7c5cfc] mb-1">
              <Sparkles size={14} />
              <span>Automated Faculty Recommendation:</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Teams utilizing modular microservices scored on average 24% higher on reusability and reported 40% fewer blocking database schema locks during final demo presentations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
