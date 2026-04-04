import type { Metadata } from "next";
import { LoginScreen } from "@/features/auth/components/login-screen";

export const metadata: Metadata = {
  title: "Login — Warroom",
  description: "Sign in to Warroom Command Center",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return <LoginScreen redirectTo={redirectTo} />;
}
