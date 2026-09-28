'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FolderKanban, Plus, Search, Filter, ArrowRight,
  Calendar, Users, Cpu, Tag
} from 'lucide-react';
import { demoProjects } from '@/lib/demo-data';
import { formatDate, getStatusBg } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5 }
  })
};

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');

  const domains = [...new Set(demoProjects.map(p => p.domain))];
  const filtered = demoProjects.filter(p => {
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesDomain = domainFilter === 'all' || p.domain === domainFilter;
    return matchesSearch && matchesStatus && matchesDomain;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Projects</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {demoProjects.length} projects contributing to institutional knowledge
          </p>
        </div>
        <Link href="/projects/new" className="btn-primary flex items-center gap-2">
          <Plus size={16} /> New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search projects, technologies..."
            className="input pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input w-auto min-w-[140px]"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
        <select
          className="input w-auto min-w-[180px]"
          value={domainFilter}
          onChange={e => setDomainFilter(e.target.value)}
        >
          <option value="all">All Domains</option>
          {domains.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial="hidden" animate="visible"
            variants={fadeIn} custom={i}
          >
            <Link href={`/projects/${project.id}`}>
              <div className="card p-5 h-full flex flex-col group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c5cfc]/20 to-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
                    <FolderKanban size={20} className="text-[#7c5cfc]" />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBg(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[#7c5cfc] transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4 flex-1">
                  {project.description}
                </p>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Tag size={12} className="text-[var(--text-muted)]" />
                    <span className="text-xs text-[var(--text-muted)]">{project.domain}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="tag bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20 text-[10px]">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tag bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border)] text-[10px]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} className="text-[var(--text-muted)]" />
                      <span className="text-xs text-[var(--text-muted)]">{project.teamMembers.length}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[var(--text-muted)]" />
                      <span className="text-xs text-[var(--text-muted)]">{formatDate(project.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <FolderKanban size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">No projects found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
