"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import { AppSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

const PATHNAME_TO_NAV: Record<string, string> = {
  "/": "hooks",
  "/hooks": "hooks",
  "/metrics": "metrics",
  "/accounts": "accounts",
  "/chat": "chat",
  "/content": "content",
  "/ideas": "ideas",
  "/pipeline": "pipeline",
  "/automations": "automations",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeItem =
    PATHNAME_TO_NAV[pathname] ??
    Object.entries(PATHNAME_TO_NAV).find(
      ([path]) => path !== "/" && pathname.startsWith(path)
    )?.[1] ??
    "hooks";

  // Proxy already guards unauthenticated access — skip client-side redirect
  // to avoid a blank screen during hydration after server-side login

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
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex h-14 items-center gap-3 border-b border-border px-4 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-card"
          >
            <Menu className="size-5" />
          </button>
          <span className="font-mono text-base font-bold text-primary">
            War Room
          </span>
        </div>
        <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
