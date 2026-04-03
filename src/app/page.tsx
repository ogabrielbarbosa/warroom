"use client";

import { useAuth } from "@/providers/auth-provider";
import { LoginScreen } from "@/features/auth/components/login-screen";
import { DashboardScreen } from "@/features/dashboard/components/dashboard-screen";

export default function Home() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return <DashboardScreen />;
}
