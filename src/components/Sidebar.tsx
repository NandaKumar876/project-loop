'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, Dna, AlertTriangle, GitBranch,
  Search, MessageSquare, Beaker, BarChart3, Users, Settings,
  LogOut, ChevronLeft, ChevronRight, Menu, X, Infinity
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

const studentNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/project-dna', label: 'Project DNA', icon: Dna },
  { href: '/failures', label: 'Failure Memory', icon: AlertTriangle },
  { href: '/what-if', label: 'What-If Simulator', icon: Beaker },
  { href: '/evolution', label: 'Evolution', icon: GitBranch },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/assistant', label: 'AI Assistant', icon: MessageSquare },
];

const facultyNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'All Projects', icon: FolderKanban },
  { href: '/project-dna', label: 'Project DNA', icon: Dna },
  { href: '/failures', label: 'Failure Patterns', icon: AlertTriangle },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/search', label: 'Search', icon: Search },
];

const adminNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'All Projects', icon: FolderKanban },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const navItems = user.role === 'admin' ? adminNav : user.role === 'faculty' ? facultyNav : studentNav;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border)]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
          <Infinity size={20} className="text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden"
          >
            <h1 className="text-base font-bold text-[var(--text-primary)] leading-none">ProjectLoop</h1>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Institutional Intelligence</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? 'bg-[#7c5cfc]/10 text-[#7c5cfc]'
                    : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#7c5cfc] rounded-r-full"
                  />
                )}
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-[var(--border)] p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c5cfc] to-[#06b6d4] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user.name.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
              <p className="text-xs text-[var(--text-muted)] capitalize">{user.role}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              className="p-1.5 rounded-md hover:bg-white/5 text-[var(--text-muted)] hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hide-mobile absolute -right-3 top-20 w-6 h-6 rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-light)] transition-all z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="show-mobile-only fixed top-0 left-0 right-0 h-14 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center">
            <Infinity size={16} className="text-white" />
          </div>
          <span className="font-bold text-sm">ProjectLoop</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="show-mobile-only fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="show-mobile-only fixed left-0 top-14 bottom-0 w-[260px] bg-[var(--surface)] border-r border-[var(--border)] z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hide-mobile fixed left-0 top-0 bottom-0 bg-[var(--surface)] border-r border-[var(--border)] transition-all duration-300 z-30 relative',
          collapsed ? 'w-[68px]' : 'w-[240px]'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
