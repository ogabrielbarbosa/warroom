"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        activeItem="dashboard"
        userName={user?.email?.split("@")[0] || "Gabriel"}
        userEmail={
          user?.email
            ? `${user.email.substring(0, 22)}...`
            : "ogabriel.barbosa22@g..."
        }
      />
      <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
