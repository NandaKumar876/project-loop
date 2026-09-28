'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search as SearchIcon, Filter, ArrowRight, Dna, AlertTriangle,
  CheckCircle2, Tag, Zap
} from 'lucide-react';
import { demoProjects, demoFailures, getSimilarProjects } from '@/lib/demo-data';
import { getStatusBg } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5 }
  })
};

const searchSuggestions = [
  'ESP32 agriculture projects',
  'projects that solved MQTT disconnection',
  'failed IoT projects',
  'projects using edge AI',
  'sensor noise solutions',
  'cloud vs edge processing',
];

type SearchResult = {
  type: 'project' | 'failure' | 'solution';
  id: string;
  title: string;
  description: string;
  tags: string[];
  projectName?: string;
  relevance: number;
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setSearching(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const q = searchQuery.toLowerCase();
    const matchedResults: SearchResult[] = [];

    // Search projects
    demoProjects.forEach(p => {
      const score = calculateRelevance(q, [
        p.name, p.description, p.domain, p.problemStatement,
        ...p.technologies, ...p.hardware, ...p.software
      ].join(' ').toLowerCase());

      if (score > 0) {
        matchedResults.push({
          type: 'project',
          id: p.id,
          title: p.name,
          description: p.description,
          tags: p.technologies.slice(0, 4),
          relevance: score
        });
      }
    });

    // Search failures
    demoFailures.forEach(f => {
      const project = demoProjects.find(p => p.id === f.projectId);
      const score = calculateRelevance(q, [
        f.title, f.description, f.rootCause, f.category,
        ...f.attempts.map(a => a.approach + ' ' + a.lesson)
      ].join(' ').toLowerCase());

      if (score > 0) {
        matchedResults.push({
          type: 'failure',
          id: f.id,
          title: f.title,
          description: f.rootCause,
          tags: [f.category, f.status],
          projectName: project?.name,
          relevance: score
        });
      }
    });

    // Search solutions
    demoFailures.filter(f => f.solution).forEach(f => {
      const project = demoProjects.find(p => p.id === f.projectId);
      const score = calculateRelevance(q, [
        f.solution!.solution, f.title, f.solution!.evidence
      ].join(' ').toLowerCase());

      if (score > 0) {
        matchedResults.push({
          type: 'solution',
          id: f.id,
          title: `Solution: ${f.title}`,
          description: f.solution!.solution,
          tags: ['Verified', `${f.solution!.effectiveness}% effective`],
          projectName: project?.name,
          relevance: score
        });
      }
    });

    matchedResults.sort((a, b) => b.relevance - a.relevance);
    setResults(matchedResults);
    setSearching(false);
    setHasSearched(true);
  };

  const calculateRelevance = (query: string, text: string): number => {
    const words = query.split(/\s+/).filter(w => w.length > 2);
    let score = 0;
    words.forEach(word => {
      if (text.includes(word)) score += 30;
      // Semantic matching
      const synonyms: Record<string, string[]> = {
        'disconnect': ['connectivity', 'connection', 'drop', 'timeout', 'reconnect'],
        'noise': ['unstable', 'fluctuation', 'interference', 'noisy'],
        'failed': ['failure', 'failed', 'unsuccessful', 'problem', 'issue'],
        'iot': ['internet of things', 'esp32', 'sensor', 'embedded', 'mqtt'],
        'ai': ['artificial intelligence', 'machine learning', 'deep learning', 'tensorflow'],
        'edge': ['local processing', 'on-device', 'offline'],
        'agriculture': ['irrigation', 'crop', 'farm', 'soil'],
      };
      Object.entries(synonyms).forEach(([key, values]) => {
        if (word.includes(key) || key.includes(word)) {
          values.forEach(syn => {
            if (text.includes(syn)) score += 15;
          });
        }
      });
    });
    return score;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return <Dna size={16} className="text-[#7c5cfc]" />;
      case 'failure': return <AlertTriangle size={16} className="text-[#ef4444]" />;
      case 'solution': return <CheckCircle2 size={16} className="text-[#10b981]" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-[#7c5cfc]/10 text-[#7c5cfc] border-[#7c5cfc]/20';
      case 'failure': return 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20';
      case 'solution': return 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
            <SearchIcon size={22} className="text-[#f59e0b]" />
          </div>
          Semantic Search
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2">
          Search by meaning, not just keywords. Find projects, failures, and solutions across institutional knowledge.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="card p-5 mb-6">
        <form onSubmit={e => { e.preventDefault(); performSearch(query); }}>
          <div className="relative">
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              className="input pl-12 pr-24 py-3.5 text-base"
              placeholder="Search projects, failures, solutions..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-4 py-2 text-sm">
              Search
            </button>
          </div>
        </form>

        {/* Suggestions */}
        {!hasSearched && (
          <div className="mt-4">
            <p className="text-xs text-[var(--text-muted)] mb-2">Try searching for:</p>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map(s => (
                <button
                  key={s}
                  onClick={() => performSearch(s)}
                  className="tag bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[#7c5cfc]/30 hover:text-[#7c5cfc] cursor-pointer transition-colors text-xs"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {searching && (
        <div className="card p-8 text-center">
          <div className="w-8 h-8 border-2 border-[#f59e0b]/30 border-t-[#f59e0b] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[var(--text-secondary)]">Searching institutional knowledge...</p>
        </div>
      )}

      {/* Results */}
      {hasSearched && !searching && (
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Found <strong className="text-[var(--text-primary)]">{results.length}</strong> results for &ldquo;{query}&rdquo;
          </p>
          <div className="space-y-3">
            {results.map((result, i) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial="hidden" animate="visible"
                variants={fadeIn} custom={i}
              >
                <Link href={result.type === 'project' ? `/projects/${result.id}` : '/failures'}>
                  <div className="card p-5 cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getTypeIcon(result.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[#7c5cfc] transition-colors">
                            {result.title}
                          </h3>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2">{result.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {result.projectName && (
                            <span className="text-xs text-[var(--text-muted)]">from {result.projectName}</span>
                          )}
                          {result.tags.map(t => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-muted)]">{t}</span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[#7c5cfc] transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="card p-12 text-center">
              <SearchIcon size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)]">No results found</p>
              <p className="text-xs text-[var(--text-muted)] mt-2">Try different keywords or explore the suggestions above</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
