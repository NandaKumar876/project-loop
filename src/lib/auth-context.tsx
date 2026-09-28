'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, UserRole } from './types';
import { demoUsers } from './demo-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Pre-seed with the first demo user (Arjun Mehta - Student) for zero-friction demo evaluation
  const [user, setUser] = useState<User | null>(() => demoUsers[0]);

  // Sync state with localStorage if available in browser
  useEffect(() => {
    try {
      const stored = localStorage.getItem('projectloop_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Fallback gracefully
    }
  }, []);

  const login = useCallback(async (email: string, _password?: string): Promise<boolean> => {
    const found = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    const targetUser: User = found || {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'student',
      department: 'Computer Science',
      createdAt: new Date().toISOString()
    };

    setUser(targetUser);
    try {
      localStorage.setItem('projectloop_user', JSON.stringify(targetUser));
    } catch {}
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password?: string, role: UserRole = 'student'): Promise<boolean> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      department: 'Computer Science',
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    try {
      localStorage.setItem('projectloop_user', JSON.stringify(newUser));
    } catch {}
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('projectloop_user');
    } catch {}
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const targetUser = demoUsers.find(u => u.role === role) || {
      ...(user || demoUsers[0]),
      role
    };
    setUser(targetUser);
    try {
      localStorage.setItem('projectloop_user', JSON.stringify(targetUser));
    } catch {}
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
