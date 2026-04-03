"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Grid3X3,
  MessageSquare,
  BarChart3,
  Zap,
  Target,
  PlayCircle,
  ChevronDown,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────── */

interface NavItemConfig {
  icon: React.ElementType;
  label: string;
  id: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string;
  children?: SubNavItemConfig[];
}

interface SubNavItemConfig {
  label: string;
  id: string;
  active?: boolean;
}

interface NavSectionConfig {
  title: string;
  items: NavItemConfig[];
}

/* ── Logo SVG from design ────────────────────────────────── */

function WarRoomLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5582 0.0706965C14.761 0.336148 14.1556 0.800447 12.9161 2.09701C10.2641 4.87103 5.78646 11.4333 3.05264 16.5528C1.58103 19.3086 0 22.6506 0 23.0056C0 23.137 0.0949246 23.1442 1.31949 23.1051C2.62851 23.0633 3.57319 22.9134 4.03331 22.6744C4.32407 22.5235 4.37244 22.5333 4.47579 22.7642C4.52511 22.8743 4.71338 23.1277 4.89425 23.3273C6.03563 24.5872 8.18762 25.448 11.1074 25.8125C12.5537 25.993 16.9127 26.0621 18.8349 25.9349C22.8868 25.6668 24.8128 25.1415 26.5024 23.8436C26.9515 23.4987 27.4139 22.8846 27.4139 22.6332C27.4139 22.4966 27.4312 22.4971 27.7667 22.6434C28.4348 22.9347 29.2253 23.0449 30.6489 23.0449H32L31.9527 22.8534C31.8556 22.4597 30.8417 20.2244 30.0446 18.6469C29.233 17.0407 27.6428 14.1671 26.9565 13.0664C26.0042 11.5391 25.7221 11.0994 24.6932 9.5372C22.5617 6.3008 20.5621 3.68732 18.8974 1.96212C17.3053 0.312024 16.3901 -0.206377 15.5582 0.0706965ZM9.50176 11.0264C8.56039 11.267 7.59909 12.0218 6.94053 13.0374C6.51412 13.695 5.6004 15.5959 5.28537 16.4808C4.85998 17.6757 4.70803 18.4194 4.73851 19.1565C4.76388 19.7697 4.78806 19.8523 5.06007 20.2541C5.22188 20.493 5.46096 20.7688 5.59142 20.867C5.82073 21.0395 5.83578 21.0408 6.04564 20.9059C6.32159 20.7285 6.99488 20.166 7.59933 19.6079C8.3922 18.8759 8.82776 18.5565 9.03336 18.5565C9.20178 18.5565 9.26504 18.6392 9.47773 19.1376C10.7492 22.1169 11.7234 23.4297 12.4388 23.1283C12.8002 22.976 13.8622 21.8018 14.4842 20.8668C15.3987 19.4923 15.8231 19.2122 16.4254 19.5858C16.5567 19.6673 17.0075 20.2402 17.4359 20.87C18.6682 22.6818 19.3431 23.3122 19.8988 23.1702C20.4263 23.0355 21.4755 21.5533 22.0866 20.0794C22.6801 18.6483 22.7797 18.5024 23.1068 18.5859C23.2949 18.634 23.8798 19.1343 25.176 20.356L25.8521 20.9934L26.2063 20.8022C26.6069 20.5861 27.0322 20.0918 27.1662 19.6867C27.4699 18.769 26.9629 16.8257 25.8011 14.4547C25.2501 13.3304 24.8848 12.7795 24.2629 12.1355C23.2104 11.0456 21.9299 10.7078 20.6804 11.1903C19.7058 11.5666 19.0487 12.2785 18.4258 13.6332C17.1542 16.3981 17.0862 16.5112 16.5191 16.8056C16.2809 16.9293 16.1028 16.9618 15.8169 16.9338C15.0636 16.8601 14.6648 16.3158 13.8592 14.2616C13.6148 13.6386 13.2825 12.9259 13.1207 12.6779C12.4558 11.6586 11.4493 11.0273 10.4097 10.9773C10.0786 10.9614 9.66995 10.9835 9.50176 11.0264Z" fill="currentColor" />
      <path d="M20.5176 14.5573C20.3492 13.8972 20.5878 13.346 21.1795 13.028C21.5228 12.8435 22.1367 12.8195 22.4368 12.979C22.9385 13.2457 23.2403 13.749 23.2403 14.3191C23.2403 14.685 23.1512 14.8934 22.8565 15.2174C22.5691 15.5333 22.2793 15.6711 21.9025 15.6711C21.2311 15.6711 20.6907 15.2365 20.5176 14.5573Z" fill="currentColor" />
      <path d="M8.66802 14.318C8.66258 13.7159 9.1194 13.0302 9.63176 12.8713C10.204 12.6939 10.9716 12.9265 11.2831 13.3716C11.6782 13.936 11.5187 14.8922 10.9482 15.3807C10.6395 15.6449 10.4068 15.7051 9.94339 15.6405C9.26159 15.5453 8.67361 14.9357 8.66802 14.318Z" fill="currentColor" />
    </svg>
  );
}

/* ── Sub Nav Item (nested under collapsible) ─────────────── */

function SubNavItem({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded px-2 py-1 text-left font-sans text-base transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      {label}
    </button>
  );
}

/* ── Collapsible Nav Item (with children) ────────────────── */

function CollapsibleNavItem({
  icon: Icon,
  label,
  children,
  defaultOpen = false,
  onNavigate,
}: {
  icon: React.ElementType;
  label: string;
  children: SubNavItemConfig[];
  defaultOpen?: boolean;
  onNavigate?: (path: string) => void;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="flex flex-col">
      {/* Parent toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 rounded-full px-4 py-3 text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      >
        <Icon className="size-6 shrink-0" strokeWidth={1.5} />
        <span className="flex-1 truncate text-left font-sans text-base">
          {label}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {/* Sub-items with vertical line */}
      {open && (
        <div className="flex">
          {/* Vertical indicator line */}
          <div className="flex w-[55px] justify-center">
            <div className="h-full w-0.5 bg-sidebar-border" />
          </div>
          {/* Sub nav items */}
          <div className="flex flex-1 flex-col gap-2 py-1 pr-4">
            {children.map((child) => (
              <SubNavItem
                key={child.id}
                label={child.label}
                active={child.active}
                onClick={() => onNavigate?.(NAV_TO_PATHNAME[child.id] ?? "/")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Single Nav Item (no children) ───────────────────────── */

function NavItem({
  icon: Icon,
  label,
  active = false,
  disabled = false,
  badge,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-4 rounded-full px-4 py-3 text-base transition-colors",
        disabled
          ? "cursor-not-allowed opacity-50 text-sidebar-foreground"
          : active
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="size-6 shrink-0" strokeWidth={1.5} />
      <span className="flex-1 truncate text-left font-sans">{label}</span>
      {badge && (
        <span className="shrink-0 rounded-full bg-sidebar-accent px-2 py-0.5 font-mono text-xs text-sidebar-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ── Section Title ───────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 py-4 font-mono text-sm font-normal text-sidebar-foreground leading-tight">
      {children}
    </p>
  );
}

/* ── Main Sidebar Component ──────────────────────────────── */

const NAV_TO_PATHNAME: Record<string, string> = {
  dashboard: "/",
  chat: "/chat",
  metrics: "/metrics",
  hooks: "/hooks",
  accounts: "/accounts",
  content: "/content",
  ideas: "/ideas",
  pipeline: "/pipeline",
};

export interface AppSidebarProps {
  /** Which nav item id is currently active */
  activeItem?: string;
  /** User display name */
  userName?: string;
  /** User email */
  userEmail?: string;
  /** Navigation callback */
  onNavigate?: (path: string) => void;
  className?: string;
}

export function AppSidebar({
  activeItem = "dashboard",
  userName = "Gabriel",
  userEmail = "ogabriel.barbosa22@g...",
  onNavigate,
  className,
}: AppSidebarProps) {
  const navigation: NavSectionConfig[] = [
    {
      title: "Home",
      items: [
        { icon: Grid3X3, label: "Dashboard", id: "dashboard", disabled: true, badge: "Em breve" },
        { icon: MessageSquare, label: "Chat", id: "chat", disabled: true, badge: "Em breve" },
      ],
    },
    {
      title: "Content",
      items: [
        { icon: BarChart3, label: "Metrics", id: "metrics" },
        { icon: Zap, label: "Hooks", id: "hooks" },
        { icon: Target, label: "Accounts", id: "accounts" },
        {
          icon: PlayCircle,
          label: "Content",
          id: "content",
          children: [
            { label: "Ideas", id: "ideas" },
            { label: "Pipeline", id: "pipeline" },
          ],
        },
      ],
    },
  ];

  // Determine if "content" group should be open by checking if a sub-item is active
  const contentSubIds = ["ideas", "pipeline"];
  const isContentOpen = contentSubIds.includes(activeItem);

  return (
    <aside
      className={cn(
        "flex h-full w-[280px] shrink-0 flex-col bg-sidebar border-r border-sidebar-border",
        className
      )}
    >
      {/* ── Header / Logo ──────────────────────────────────── */}
      <div className="flex h-[88px] items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <WarRoomLogo className="text-primary" />
          <span className="font-mono text-lg font-bold text-primary leading-none">
            War Room
          </span>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────── */}
      <nav className="flex flex-1 flex-col gap-0 overflow-y-auto px-4 py-0">
        {navigation.map((section) => (
          <div key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <div className="flex flex-col">
              {section.items.map((item) => {
                if (item.children) {
                  // Mark children active
                  const childrenWithActive = item.children.map((c) => ({
                    ...c,
                    active: c.id === activeItem,
                  }));
                  return (
                    <CollapsibleNavItem
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      children={childrenWithActive}
                      defaultOpen={isContentOpen}
                      onNavigate={onNavigate}
                    />
                  );
                }
                return (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={item.id === activeItem}
                    disabled={item.disabled}
                    badge={item.badge}
                    onClick={() => onNavigate?.(NAV_TO_PATHNAME[item.id] ?? "/")}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer / User Profile ──────────────────────────── */}
      <div className="flex items-center gap-2 border-t border-sidebar-border px-8 py-6">
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <span className="truncate font-sans text-base font-normal text-sidebar-accent-foreground leading-snug">
            {userName}
          </span>
          <span className="truncate font-sans text-base font-normal text-sidebar-foreground leading-snug">
            {userEmail}
          </span>
        </div>
        <ChevronDown
          className="size-6 shrink-0 text-sidebar-foreground"
          strokeWidth={1.5}
        />
      </div>
    </aside>
  );
}

/* ── Re-exports for backward compat (primitive building blocks) */

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

function Sidebar({ className, collapsed = false, ...props }: SidebarProps) {
  return (
    <aside
      data-slot="sidebar"
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col gap-6 border-r border-sidebar-border bg-sidebar",
        collapsed ? "w-16" : "w-[280px]",
        className
      )}
      {...props}
    />
  );
}

function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex h-[88px] items-center border-b border-sidebar-border px-8 py-6",
        className
      )}
      {...props}
    />
  );
}

function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex flex-1 flex-col overflow-y-auto px-4",
        className
      )}
      {...props}
    />
  );
}

function SidebarSectionTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-section-title"
      className={cn(
        "px-4 py-4 font-mono text-sm font-normal text-sidebar-foreground leading-tight",
        className
      )}
      {...props}
    />
  );
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  active?: boolean;
  label: string;
}

function SidebarItem({
  className,
  icon: Icon,
  active = false,
  label,
  ...props
}: SidebarItemProps) {
  return (
    <button
      type="button"
      data-slot="sidebar-item"
      data-active={active}
      className={cn(
        "flex w-full items-center gap-4 rounded-full px-4 py-3 text-base transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-6 shrink-0" strokeWidth={1.5} />}
      <span className="truncate font-sans">{label}</span>
    </button>
  );
}

function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "mt-auto border-t border-sidebar-border px-8 py-6",
        className
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSectionTitle,
  SidebarItem,
  SidebarFooter,
};
export type { SidebarProps, SidebarItemProps };
