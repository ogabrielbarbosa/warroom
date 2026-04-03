import type { Metadata } from "next";
import { LoginScreen } from "@/features/auth/components/login-screen";

export const metadata: Metadata = {
  title: "Login — Warroom",
  description: "Sign in to Warroom Command Center",
};

export default function LoginPage() {
  return <LoginScreen />;
}
