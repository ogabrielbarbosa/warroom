"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session from cookies (no network call — fast hydration)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setHydrated(true);
    });

    // Listen for auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!hydrated) setHydrated(true);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, hydrated]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, signOut }}>
      {hydrated ? children : null}
    </AuthContext.Provider>
  );
}
