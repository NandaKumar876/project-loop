'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Shield, Database, Bell, Cpu, GitBranch,
  Key, Save, CheckCircle2, Sliders, RefreshCw, FileCode
} from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [dnaAutoExtract, setDnaAutoExtract] = useState(true);
  const [failureAnonymization, setFailureAnonymization] = useState(false);
  const [similarityThreshold, setSimilarityThreshold] = useState(65);
  const [githubSync, setGithubSync] = useState(true);
  const [retentionPeriod, setRetentionPeriod] = useState('indefinite');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center text-white">
              <Settings size={18} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Institutional Intelligence Settings</h1>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Configure DNA extraction models, knowledge retention, privacy bounds, and GitHub repository ingestion.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary self-start sm:self-auto flex items-center gap-2 text-sm"
        >
          {saved ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Save size={16} />}
          <span>{saved ? 'Saved Changes' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* DNA Extraction Engine */}
        <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center justify-center">
              <Cpu size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">DNA Extraction & Parsing Engine</h2>
              <p className="text-xs text-[var(--text-muted)]">Control how student project repositories and reports are analyzed</p>
            </div>
          </div>

          <div className="space-y-4 pt-3 border-t border-[var(--border)]">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Automated Project DNA Extraction</p>
                <p className="text-xs text-[var(--text-muted)]">Automatically parse AST, package manifests, and architecture diagrams upon project upload</p>
              </div>
              <input
                type="checkbox"
                checked={dnaAutoExtract}
                onChange={(e) => setDnaAutoExtract(e.target.checked)}
                className="w-5 h-5 accent-[#7c5cfc] rounded cursor-pointer"
              />
            </label>

            <div className="pt-2">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium text-[var(--text-primary)]">DNA Similarity Matching Sensitivity</span>
                <span className="text-xs font-semibold text-[#7c5cfc]">{similarityThreshold}% match</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                className="w-full accent-[#7c5cfc] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--text-muted)] mt-1">
                Threshold for alerting students to related past projects and suggesting component reuse.
              </p>
            </div>
          </div>
        </div>

        {/* Failure Memory & Privacy */}
        <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Shield size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Failure Memory & Psychological Safety</h2>
              <p className="text-xs text-[var(--text-muted)]">Encourage candid failure logging without grading penalties</p>
            </div>
          </div>

          <div className="space-y-4 pt-3 border-t border-[var(--border)]">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Student Anonymity on Critical Failure Logs</p>
                <p className="text-xs text-[var(--text-muted)]">Mask student names on shared root-cause failure postmortems</p>
              </div>
              <input
                type="checkbox"
                checked={failureAnonymization}
                onChange={(e) => setFailureAnonymization(e.target.checked)}
                className="w-5 h-5 accent-[#7c5cfc] rounded cursor-pointer"
              />
            </label>

            <div className="pt-2">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Knowledge Retention Policy</label>
              <select
                value={retentionPeriod}
                onChange={(e) => setRetentionPeriod(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#7c5cfc]"
              >
                <option value="indefinite">Indefinite (Recommended for Institutional Memory)</option>
                <option value="5-years">5 Academic Cohorts (Rolling)</option>
                <option value="3-years">3 Academic Cohorts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Institutional Integrations */}
        <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <GitBranch size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Institutional Repository Sync</h2>
              <p className="text-xs text-[var(--text-muted)]">Connect university GitHub Enterprise or GitLab organizations</p>
            </div>
          </div>

          <div className="space-y-4 pt-3 border-t border-[var(--border)]">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Continuous Webhook Ingestion</p>
                <p className="text-xs text-[var(--text-muted)]">Trigger automated DNA diff checks whenever students push code</p>
              </div>
              <input
                type="checkbox"
                checked={githubSync}
                onChange={(e) => setGithubSync(e.target.checked)}
                className="w-5 h-5 accent-[#7c5cfc] rounded cursor-pointer"
              />
            </label>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Institutional Organization Slug</label>
              <input
                type="text"
                defaultValue="university-engineering-lab"
                className="w-full sm:w-96 px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
