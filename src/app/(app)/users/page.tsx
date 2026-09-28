'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserPlus, Search, Filter, Shield, GraduationCap,
  BookOpen, Mail, Building, Award, CheckCircle2, MoreVertical,
  Plus, X, Trash2, Edit3
} from 'lucide-react';
import { demoUsers, demoProjects, demoFailures } from '@/lib/demo-data';
import { UserRole } from '@/lib/types';

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  createdAt: string;
  projectCount: number;
  failuresSolved: number;
  reputation: number;
  badge: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<ExtendedUser[]>(() =>
    demoUsers.map((u, i) => {
      const pCount = demoProjects.filter(p => p.ownerName === u.name || p.teamMembers?.some(m => m.name === u.name)).length || (i % 3) + 1;
      const fSolved = (i * 2 + 1) % 5;
      return {
        ...u,
        projectCount: pCount,
        failuresSolved: fSolved,
        reputation: 800 + (pCount * 120) + (fSolved * 95),
        badge: u.role === 'faculty' ? 'Faculty Advisor' : u.role === 'admin' ? 'Institutional Admin' : i === 0 ? 'DNA Pioneer' : 'Active Contributor'
      };
    })
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');
  const [newUserDept, setNewUserDept] = useState('Computer Science');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: ExtendedUser = {
      id: `user-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      department: newUserDept,
      createdAt: new Date().toISOString(),
      projectCount: 0,
      failuresSolved: 0,
      reputation: 500,
      badge: newUserRole === 'student' ? 'Junior Member' : newUserRole === 'faculty' ? 'Faculty Advisor' : 'Admin'
    };

    setUsers([newUser, ...users]);
    setNewUserName('');
    setNewUserEmail('');
    setIsInviteOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#06b6d4] flex items-center justify-center text-white">
              <Users size={18} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Institutional Members & Roles</h1>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage student engineering contributors, faculty reviewers, and institutional administrators.
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="btn-primary self-start sm:self-auto flex items-center gap-2 text-sm"
        >
          <UserPlus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or department..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#7c5cfc]"
          />
        </div>

        {/* Role Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'student', 'faculty', 'admin'] as const).map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                roleFilter === role
                  ? 'bg-[#7c5cfc] text-white shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              {role === 'all' ? 'All Roles' : role}
            </button>
          ))}
        </div>
      </div>

      {/* User Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[#7c5cfc]/30 transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[var(--text-primary)]">{user.name}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
                  </div>
                </div>

                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium capitalize border ${
                  user.role === 'admin'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : user.role === 'faculty'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-[#7c5cfc]/10 text-[#7c5cfc] border-[#7c5cfc]/20'
                }`}>
                  {user.role}
                </span>
              </div>

              {/* Department & Badge */}
              <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]">
                <span className="flex items-center gap-1.5">
                  <Building size={13} className="text-[var(--text-muted)]" />
                  {user.department || 'Institutional Faculty'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--surface-2)] text-[var(--text-primary)]">
                  {user.badge}
                </span>
              </div>
            </div>

            {/* Contribution Stats */}
            <div className="grid grid-cols-3 gap-2 bg-[var(--surface-2)] p-2.5 rounded-lg text-center">
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase">Projects</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{user.projectCount}</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase">Failures Solved</p>
                <p className="text-sm font-bold text-emerald-400">{user.failuresSolved}</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase">Karma</p>
                <p className="text-sm font-bold text-[#7c5cfc]">{user.reputation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Invite Member Modal */}
      <AnimatePresence>
        {isInviteOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsInviteOpen(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 mb-1">
                <UserPlus size={18} className="text-[#7c5cfc]" />
                Invite New Institutional Member
              </h2>
              <p className="text-xs text-[var(--text-muted)] mb-5">
                Grant access to project journeys, DNA graphs, and institutional failure memory.
              </p>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Neha Verma"
                    className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="neha@university.edu"
                    className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Role</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#7c5cfc]"
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Department</label>
                    <select
                      value={newUserDept}
                      onChange={(e) => setNewUserDept(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#7c5cfc]"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Information Tech">Information Tech</option>
                      <option value="Mechanical Eng">Mechanical Eng</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInviteOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs px-4 py-2"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
