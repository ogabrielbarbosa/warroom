"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/ui/sidebar";

const PATHNAME_TO_NAV: Record<string, string> = {
  "/": "hooks",
  "/hooks": "hooks",
  "/metrics": "metrics",
  "/accounts": "accounts",
  "/chat": "chat",
  "/content": "content",
  "/ideas": "ideas",
  "/pipeline": "pipeline",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const activeItem =
    PATHNAME_TO_NAV[pathname] ??
    Object.entries(PATHNAME_TO_NAV).find(
      ([path]) => path !== "/" && pathname.startsWith(path)
    )?.[1] ??
    "hooks";

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        activeItem={activeItem}
        userName={user?.email?.split("@")[0] || "Gabriel"}
        userEmail={
          user?.email
            ? `${user.email.substring(0, 22)}...`
            : "ogabriel.barbosa22@g..."
        }
        onNavigate={(path) => router.push(path)}
      />
      <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
