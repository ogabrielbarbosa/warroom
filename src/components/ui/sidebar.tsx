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
  Bot,
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 851 634"
      fill="none"
      className={className}
    >
      <path
        d="M28 260V0H601V260H795V228H821V260H851V349H821V382H695V445H601V510H633V605H665V634H511V541H448V510H216V573H183V605H152V634H28V541H93V510H28V382H0V260H28Z"
        fill="#D77455"
      />
      <path
        d="M152 0H28V260H0V384H28V288H60V260H123V288H152V0Z"
        fill="#AF593F"
      />
      <rect x="284" y="134" width="58" height="94" fill="black" />
      <rect x="511" y="134" width="58" height="94" fill="black" />
      <path
        d="M821 260V228H795V260H342V288H311V320H183V349H406V384H448V478H475V510H448V541H511V634H538V541H569V510H601V478H569V445H695V415H569V384H601V349H695V384H821V349H851V320H569V288H851V260H821Z"
        fill="#AF593F"
      />
      <path
        d="M28 384H60V415H123V445H406V415H448V445H406V478H152V510H123V605H60V634H28V541H93V510H28V384Z"
        fill="#AF593F"
      />
      <path d="M152 320V288H183V320H152Z" fill="#AF593F" />
      <path d="M448 320V288H538V320H448Z" fill="#D77455" />
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
          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
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
            open && "rotate-180",
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
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
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
  automations: "/automations",
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
  /** Mobile open state */
  open?: boolean;
  /** Close callback for mobile */
  onClose?: () => void;
  className?: string;
}

export function AppSidebar({
  activeItem = "dashboard",
  userName = "Gabriel",
  userEmail = "ogabriel.barbosa22@g...",
  onNavigate,
  open,
  onClose,
  className,
}: AppSidebarProps) {
  const navigation: NavSectionConfig[] = [
    {
      title: "Home",
      items: [
        {
          icon: Grid3X3,
          label: "Dashboard",
          id: "dashboard",
          disabled: true,
          badge: "Soon",
        },
        {
          icon: MessageSquare,
          label: "Chat",
          id: "chat",
          disabled: true,
          badge: "Soon",
        },
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
        { icon: Bot, label: "Automations", id: "automations" },
      ],
    },
  ];

  // Determine if "content" group should be open by checking if a sub-item is active
  const contentSubIds = ["ideas", "pipeline"];
  const isContentOpen = contentSubIds.includes(activeItem);

  function handleNavigate(path: string) {
    onNavigate?.(path);
    onClose?.();
  }

  const sidebarContent = (
    <aside
      className={cn(
        "flex h-full w-[280px] shrink-0 flex-col bg-sidebar border-r border-sidebar-border",
        className,
      )}
    >
      {/* ── Header / Logo ──────────────────────────────────── */}
      <div className="flex h-[88px] items-center px-6 py-6">
        <div className="flex items-center gap-3">
          <WarRoomLogo className="h-10 w-auto shrink-0" />
          <span className="font-mono text-xl font-bold tracking-tight text-primary leading-none">
            Warroom
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
                      onNavigate={handleNavigate}
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
                    onClick={() =>
                      handleNavigate(NAV_TO_PATHNAME[item.id] ?? "/")
                    }
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

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <div className="hidden md:flex">{sidebarContent}</div>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
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
        className,
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
        className,
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
      className={cn("flex flex-1 flex-col overflow-y-auto px-4", className)}
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
        className,
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
        className,
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
        className,
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
