'use client';

import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Infinity, ArrowRight, Eye, EyeOff, GraduationCap, BookOpen, Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import Link from 'next/link';

function LoginForm() {
  const searchParams = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success: boolean;
      if (isSignup) {
        success = await signup(name, email, password, role);
      } else {
        success = await login(email, password);
      }
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (demoEmail: string) => {
    setLoading(true);
    await login(demoEmail, 'demo');
    router.push('/dashboard');
  };

  const roles = [
    { value: 'student' as UserRole, label: 'Student', icon: GraduationCap, desc: 'Create & explore projects' },
    { value: 'faculty' as UserRole, label: 'Faculty', icon: BookOpen, desc: 'Review & curate knowledge' },
    { value: 'admin' as UserRole, label: 'Admin', icon: Shield, desc: 'Manage platform' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c5cfc]/20 via-[#3b82f6]/10 to-[#06b6d4]/20" />
        <div className="absolute inset-0 bg-[var(--background)]/80" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center">
              <Infinity size={28} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-[var(--text-primary)]">ProjectLoop</span>
          </Link>

          <h2 className="text-3xl font-bold text-[var(--text-primary)] leading-tight mb-4">
            The system doesn&apos;t just store<br />what students built.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
            It remembers <span className="text-[#7c5cfc] font-semibold">how</span> they built it and helps the next generation build something <span className="text-[#10b981] font-semibold">better</span>.
          </p>

          <div className="space-y-4">
            {[
              'Project DNA extraction from every upload',
              'Failure Memory that prevents repeating mistakes',
              'What-If Simulator for architecture decisions',
              'Evidence-backed AI recommendations'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#7c5cfc]/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#7c5cfc]" />
                </div>
                <span className="text-sm text-[var(--text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#3b82f6] flex items-center justify-center">
                <Infinity size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">ProjectLoop</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            {isSignup ? 'Join the institutional intelligence network' : 'Log in to continue your journey'}
          </p>

          {/* Demo quick login */}
          <div className="mb-8 p-4 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
            <p className="text-xs font-semibold text-[var(--text-muted)] mb-3 uppercase tracking-wider">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLogin('arjun@university.edu')}
                className="p-2 rounded-lg bg-[#7c5cfc]/10 border border-[#7c5cfc]/20 text-center hover:bg-[#7c5cfc]/20 transition-colors"
              >
                <GraduationCap size={18} className="text-[#7c5cfc] mx-auto mb-1" />
                <span className="text-xs font-medium text-[#7c5cfc]">Student</span>
              </button>
              <button
                onClick={() => quickLogin('raghav@university.edu')}
                className="p-2 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-center hover:bg-[#06b6d4]/20 transition-colors"
              >
                <BookOpen size={18} className="text-[#06b6d4] mx-auto mb-1" />
                <span className="text-xs font-medium text-[#06b6d4]">Faculty</span>
              </button>
              <button
                onClick={() => quickLogin('admin@university.edu')}
                className="p-2 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-center hover:bg-[#f59e0b]/20 transition-colors"
              >
                <Shield size={18} className="text-[#f59e0b] mx-auto mb-1" />
                <span className="text-xs font-medium text-[#f59e0b]">Admin</span>
              </button>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]" /></div>
            <div className="relative flex justify-center"><span className="bg-[var(--background)] px-3 text-xs text-[var(--text-muted)]">or continue with email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
                placeholder="you@university.edu"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isSignup && (
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map(r => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        role === r.value
                          ? 'border-[#7c5cfc] bg-[#7c5cfc]/10'
                          : 'border-[var(--border)] hover:border-[var(--border-light)]'
                      }`}
                    >
                      <r.icon size={18} className={`mx-auto mb-1 ${role === r.value ? 'text-[#7c5cfc]' : 'text-[var(--text-muted)]'}`} />
                      <span className={`text-xs font-medium ${role === r.value ? 'text-[#7c5cfc]' : 'text-[var(--text-secondary)]'}`}>
                        {r.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isSignup ? 'Create Account' : 'Log In'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-[var(--text-muted)] text-center mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#7c5cfc] font-medium hover:underline"
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
      <LoginForm />
    </Suspense>
  );
}
