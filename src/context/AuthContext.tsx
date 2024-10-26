import React, { createContext, useContext, useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, passwordConfirm: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsAuthenticated(pb.authStore.isValid);
    setUser(pb.authStore.model);
  }, []);

  const login = async (email: string, password: string) => {
    await pb.collection('users').authWithPassword(email, password);
    setIsAuthenticated(true);
    setUser(pb.authStore.model);
  };

  const register = async (email: string, password: string, passwordConfirm: string) => {
    await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
    });
    await login(email, password);
  };

  const logout = () => {
    pb.authStore.clear();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};