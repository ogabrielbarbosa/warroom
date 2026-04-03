"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Tabs Context ────────────────────────────────────────── */

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("Tab components must be used within Tabs");
  return context;
}

/* ── Tabs ────────────────────────────────────────────────── */

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div data-slot="tabs" className={cn("flex flex-col gap-4", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* ── Tab List ────────────────────────────────────────────── */

function TabList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="tab-list"
      role="tablist"
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-full bg-secondary p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── Tab Trigger ─────────────────────────────────────────── */

interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

function TabTrigger({ value, children, className }: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      data-state={isActive ? "active" : "inactive"}
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-all",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}

/* ── Tab Content ─────────────────────────────────────────── */

interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

function TabContent({ value, children, className }: TabContentProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div
      data-slot="tab-content"
      role="tabpanel"
      className={cn("animate-in fade-in-0 duration-200", className)}
    >
      {children}
    </div>
  );
}

export { Tabs, TabList, TabTrigger, TabContent };
export type { TabsProps, TabTriggerProps, TabContentProps };
