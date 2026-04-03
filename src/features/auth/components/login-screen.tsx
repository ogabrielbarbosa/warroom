"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

export function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email || "user@warroom.dev", password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Glow background effect */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center size-12 rounded-full bg-primary">
            <Zap className="size-6 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground">
              warroom
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Command center access
            </p>
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium font-mono text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@warroom.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium font-mono text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" variant="default" size="lg" className="w-full mt-2">
            Sign in
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Temporary login — any credentials work
          </p>
        </form>
      </div>
    </div>
  );
}
