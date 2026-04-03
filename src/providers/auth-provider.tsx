"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: { email: string } | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("warroom_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setIsLoggedIn(true);
        setUser(parsed);
      } catch {
        localStorage.removeItem("warroom_auth");
      }
    }
    setHydrated(true);
  }, []);

  const login = (email: string, _password: string) => {
    const userData = { email };
    localStorage.setItem("warroom_auth", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("warroom_auth");
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!hydrated) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
