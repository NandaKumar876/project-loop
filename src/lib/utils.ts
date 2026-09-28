import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed': return 'text-emerald-400';
    case 'active': return 'text-blue-400';
    case 'draft': return 'text-slate-400';
    case 'archived': return 'text-slate-500';
    case 'resolved': return 'text-emerald-400';
    case 'open': return 'text-red-400';
    case 'investigating': return 'text-amber-400';
    default: return 'text-slate-400';
  }
}

export function getStatusBg(status: string): string {
  switch (status) {
    case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'active': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'draft': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    case 'resolved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'open': return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'investigating': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'low': return 'text-emerald-400';
    case 'medium': return 'text-amber-400';
    case 'high': return 'text-orange-400';
    case 'critical': return 'text-red-400';
    default: return 'text-slate-400';
  }
}

export function getRiskBg(risk: string): string {
  switch (risk) {
    case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function getResultColor(result: string): string {
  switch (result) {
    case 'success': return 'text-emerald-400';
    case 'partial': return 'text-amber-400';
    case 'failed': return 'text-red-400';
    default: return 'text-slate-400';
  }
}

export function getResultBg(result: string): string {
  switch (result) {
    case 'success': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'partial': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'failed': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function getConfidenceLabel(confidence: string): string {
  switch (confidence) {
    case 'high': return 'High Confidence';
    case 'medium': return 'Medium Confidence';
    case 'low': return 'Low Confidence';
    default: return 'Unknown';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
