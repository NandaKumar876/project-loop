'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Upload, Plus, X, FileText, Code, Image,
  Presentation, FolderKanban
} from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: '',
    problemStatement: '',
    expectedOutcome: '',
    githubUrl: '',
  });
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [hardware, setHardware] = useState<string[]>([]);
  const [software, setSoftware] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<{ name: string; role: string }[]>([]);
  const [newTech, setNewTech] = useState('');
  const [newHw, setNewHw] = useState('');
  const [newSw, setNewSw] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [uploading, setUploading] = useState(false);

  const addTag = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, value: string, clear: () => void) => {
    if (value.trim() && !list.includes(value.trim())) {
      setter([...list, value.trim()]);
      clear();
    }
  };

  const removeTag = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(list.filter(t => t !== value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    // Simulate project creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/projects/proj-1');
  };

  const TagInput = ({ label, tags, onAdd, onRemove, inputValue, setInputValue, placeholder, color }: {
    label: string; tags: string[]; onAdd: () => void; onRemove: (t: string) => void;
    inputValue: string; setInputValue: (v: string) => void; placeholder: string; color: string;
  }) => (
    <div>
      <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map(t => (
          <span key={t} className="tag text-xs" style={{ background: `${color}15`, color, borderColor: `${color}30` }}>
            {t}
            <button onClick={() => onRemove(t)} className="ml-1 hover:opacity-70"><X size={10} /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder={placeholder}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
        />
        <button type="button" onClick={onAdd} className="btn-secondary px-3"><Plus size={14} /></button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Create New Project</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Upload your project to contribute to institutional knowledge
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-2">
              <FolderKanban size={18} className="text-[#7c5cfc]" /> Project Information
            </h2>

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Project Name *</label>
              <input
                className="input"
                placeholder="e.g., Smart Irrigation System"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Description *</label>
              <textarea
                className="textarea"
                placeholder="Describe your project in detail..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Domain *</label>
                <input
                  className="input"
                  placeholder="e.g., Agriculture + IoT"
                  value={formData.domain}
                  onChange={e => setFormData({ ...formData, domain: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">GitHub URL</label>
                <input
                  className="input"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Problem Statement *</label>
              <textarea
                className="textarea"
                placeholder="What problem does this project solve?"
                value={formData.problemStatement}
                onChange={e => setFormData({ ...formData, problemStatement: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Expected Outcome</label>
              <textarea
                className="textarea"
                placeholder="What is the expected result?"
                value={formData.expectedOutcome}
                onChange={e => setFormData({ ...formData, expectedOutcome: e.target.value })}
              />
            </div>
          </div>

          {/* Technologies */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-[var(--text-primary)] mb-2">Technologies & Components</h2>

            <TagInput
              label="Technologies" tags={technologies} placeholder="e.g., ESP32, React, MQTT" color="#3b82f6"
              inputValue={newTech} setInputValue={setNewTech}
              onAdd={() => addTag(technologies, setTechnologies, newTech, () => setNewTech(''))}
              onRemove={(t) => removeTag(technologies, setTechnologies, t)}
            />

            <TagInput
              label="Hardware" tags={hardware} placeholder="e.g., Soil Sensor, Relay Module" color="#f97316"
              inputValue={newHw} setInputValue={setNewHw}
              onAdd={() => addTag(hardware, setHardware, newHw, () => setNewHw(''))}
              onRemove={(t) => removeTag(hardware, setHardware, t)}
            />

            <TagInput
              label="Software" tags={software} placeholder="e.g., React Dashboard, Node.js API" color="#06b6d4"
              inputValue={newSw} setInputValue={setNewSw}
              onAdd={() => addTag(software, setSoftware, newSw, () => setNewSw(''))}
              onRemove={(t) => removeTag(software, setSoftware, t)}
            />
          </div>

          {/* Team */}
          <div className="card p-6">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Team Members</h2>
            {teamMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-3 mb-2 p-2 rounded-lg bg-[var(--surface-2)]">
                <span className="text-sm text-[var(--text-primary)] flex-1">{m.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{m.role}</span>
                <button type="button" onClick={() => setTeamMembers(teamMembers.filter((_, j) => j !== i))} className="text-[var(--text-muted)] hover:text-red-400">
                  <X size={14} />
                </button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <input className="input flex-1" placeholder="Name" value={memberName} onChange={e => setMemberName(e.target.value)} />
              <input className="input w-40" placeholder="Role" value={memberRole} onChange={e => setMemberRole(e.target.value)} />
              <button type="button" className="btn-secondary px-3" onClick={() => {
                if (memberName && memberRole) {
                  setTeamMembers([...teamMembers, { name: memberName, role: memberRole }]);
                  setMemberName(''); setMemberRole('');
                }
              }}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* File Uploads */}
          <div className="card p-6">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Project Files</h2>
            <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[#7c5cfc]/50 transition-colors cursor-pointer">
              <Upload size={32} className="text-[var(--text-muted)] mx-auto mb-3" />
              <p className="text-sm text-[var(--text-secondary)] mb-1">Drag and drop files or click to browse</p>
              <p className="text-xs text-[var(--text-muted)]">PDF, PPT, DOC, ZIP, Images • Max 50MB each</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {['PDF Report', 'PPT/PPTX', 'DOC/DOCX', 'ZIP Source', 'Images', 'Architecture Diagram'].map(type => (
                <span key={type} className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border)]">
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <Link href="/projects" className="btn-ghost">Cancel</Link>
            <button type="submit" disabled={uploading} className="btn-primary flex items-center gap-2">
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Project...
                </>
              ) : (
                <>Create & Analyze Project</>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
