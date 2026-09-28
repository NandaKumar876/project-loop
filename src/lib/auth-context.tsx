'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from './types';
import { demoUsers } from './demo-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Demo: find user by email or default to student
    const found = demoUsers.find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // For demo, accept any login as student
    setUser({
      id: 'user-demo',
      name: email.split('@')[0],
      email,
      role: 'student',
      department: 'Computer Science',
      createdAt: new Date().toISOString()
    });
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string, role: UserRole): Promise<boolean> => {
    setUser({
      id: 'user-' + Math.random().toString(36).substring(7),
      name,
      email,
      role,
      department: 'Computer Science',
      createdAt: new Date().toISOString()
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      const roleUser = demoUsers.find(u => u.role === role) || { ...user, role };
      setUser({ ...roleUser, role });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
