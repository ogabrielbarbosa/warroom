"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

const initialState: LoginState = {};

export function LoginScreen() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Glow background effect */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 size-[300px] rounded-full bg-primary/5 blur-[80px] sm:size-[600px] sm:blur-[120px]" />
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
        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium font-mono text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@warroom.dev"
              autoComplete="email"
              required
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
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {state.error && (
            <p className="text-sm text-destructive text-center">
              {state.error}
            </p>
          )}

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full mt-2"
            disabled={pending}
          >
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
