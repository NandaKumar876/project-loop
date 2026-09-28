'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  GitBranch, ArrowRight, Plus, Calendar, User, ChevronDown, Zap
} from 'lucide-react';
import { demoProjects, demoEvolutions } from '@/lib/demo-data';
import { formatDate } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 }
  })
};

// Evolution tree structure
const evolutionTree = [
  {
    id: 'proj-1',
    name: 'Smart Irrigation System',
    year: '2026',
    domain: 'Agriculture + IoT',
    children: [
      {
        id: 'proj-3',
        name: 'AI Crop Disease Detection',
        year: '2025',
        domain: 'Agriculture + AI',
        mutation: 'Added computer vision and ML capabilities',
        children: []
      }
    ]
  },
  {
    id: 'proj-4',
    name: 'IoT Air Quality Monitor',
    year: '2025',
    domain: 'Environment + IoT',
    children: [
      {
        id: 'proj-6',
        name: 'Flood Monitoring & Early Warning',
        year: '2025',
        domain: 'Disaster Management + IoT',
        mutation: 'Adapted distributed sensor network for water levels',
        children: []
      }
    ]
  }
];

interface TreeNode {
  id: string;
  name: string;
  year: string;
  domain: string;
  mutation?: string;
  children: TreeNode[];
}

function EvolutionNode({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: depth * 0.2 }}
        className="flex items-start gap-4"
      >
        {depth > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0 mt-4">
            <div className="w-8 border-t border-dashed border-[#10b981]" />
            <div className="w-6 h-6 rounded-full bg-[#10b981]/10 flex items-center justify-center">
              <GitBranch size={12} className="text-[#10b981]" />
            </div>
            <div className="w-4 border-t border-dashed border-[#10b981]" />
          </div>
        )}
        <Link href={`/projects/${node.id}`}>
          <div className={`card p-4 min-w-[280px] cursor-pointer group ${depth === 0 ? 'border-[#7c5cfc]/30' : 'border-[#10b981]/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${depth === 0 ? 'bg-[#7c5cfc]' : 'bg-[#10b981]'}`} />
              <span className="text-xs text-[var(--text-muted)]">{node.year}</span>
            </div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[#7c5cfc] transition-colors">
              {node.name}
            </h4>
            <p className="text-xs text-[var(--text-muted)] mt-1">{node.domain}</p>
            {node.mutation && (
              <p className="text-xs text-[#10b981] mt-2 italic">→ {node.mutation}</p>
            )}
          </div>
        </Link>
      </motion.div>
      {node.children.length > 0 && (
        <div className="ml-4 mt-2 pl-4 border-l border-dashed border-[var(--border)] space-y-4">
          {node.children.map(child => (
            <EvolutionNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EvolutionPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [parentProject, setParentProject] = useState('proj-1');
  const [newProjectName, setNewProjectName] = useState('');
  const [mutationReason, setMutationReason] = useState('');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
              <GitBranch size={22} className="text-[#10b981]" />
            </div>
            Project Evolution
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Projects don&apos;t end — they evolve. Track how projects inspire and mutate into the next generation.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Create Evolution
        </button>
      </div>

      {/* Create Evolution Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="card p-6 mb-8"
        >
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Create New Evolution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Parent Project</label>
              <select className="input" value={parentProject} onChange={e => setParentProject(e.target.value)}>
                {demoProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">New Project Name</label>
              <input
                className="input"
                placeholder="e.g., AI Precision Agriculture"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Mutation Reason</label>
            <textarea
              className="textarea"
              placeholder="Why is this project evolving? What changes are you making?"
              value={mutationReason}
              onChange={e => setMutationReason(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-primary">Create Evolution</button>
            <button onClick={() => setShowCreateForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Evolution Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0} className="card p-6">
          <h3 className="font-semibold text-[var(--text-primary)] mb-5">Evolution Tree</h3>
          <div className="space-y-6">
            {evolutionTree.map(node => (
              <EvolutionNode key={node.id} node={node} />
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={1} className="space-y-4">
          <div className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-5">Evolution History</h3>
            <div className="space-y-4">
              {demoEvolutions.map((evo, i) => (
                <motion.div
                  key={evo.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1.5 rounded-lg bg-[#7c5cfc]/10 border border-[#7c5cfc]/20">
                      <span className="text-sm font-medium text-[#7c5cfc]">{evo.parentProjectName}</span>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowRight size={18} className="text-[#10b981]" />
                    </motion.div>
                    <div className="px-3 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
                      <span className="text-sm font-medium text-[#10b981]">{evo.childProjectName}</span>
                    </div>
                  </div>

                  <div className="ml-4 pl-4 border-l-2 border-[var(--border)]">
                    <p className="text-sm text-[var(--text-secondary)] mb-2">{evo.mutationReason}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {evo.changes.map(c => (
                        <span key={c} className="tag bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border)] text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1"><User size={12} /> {evo.createdBy}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(evo.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Suggested Evolutions */}
          <div className="card p-6">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Zap size={18} className="text-[#f59e0b]" /> Suggested Evolutions
            </h3>
            <div className="space-y-3">
              {[
                { from: 'Smart Irrigation + AI Disease Detection', to: 'Predictive Agriculture Platform', reason: 'Combine sensor monitoring with AI diagnostics' },
                { from: 'Energy Monitor + Air Quality', to: 'Smart Building Management', reason: 'Unified building intelligence system' },
                { from: 'Smart Helmet + Navigation', to: 'Worker Safety & Tracking', reason: 'Complete workplace safety solution' },
              ].map((suggestion, i) => (
                <div key={i} className="p-3 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--surface-3)] transition-colors cursor-pointer">
                  <p className="text-xs text-[var(--text-muted)] mb-1">{suggestion.from}</p>
                  <p className="text-sm font-medium text-[#f59e0b]">→ {suggestion.to}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{suggestion.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
