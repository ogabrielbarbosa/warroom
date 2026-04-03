"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Search } from "lucide-react";

/* ── Dropdown ────────────────────────────────────────────── */

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

function Dropdown({ className, open = true, ...props }: DropdownProps) {
  if (!open) return null;

  return (
    <div
      data-slot="dropdown"
      className={cn(
        "z-50 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95 duration-150",
        className
      )}
      {...props}
    />
  );
}

/* ── Dropdown Search ─────────────────────────────────────── */

function DropdownSearch({
  className,
  placeholder = "Search...",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-3 py-2">
      <Search className="size-4 text-muted-foreground shrink-0" />
      <input
        type="text"
        data-slot="dropdown-search"
        placeholder={placeholder}
        className={cn(
          "flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  );
}

/* ── List Divider ────────────────────────────────────────── */

function ListDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="list-divider"
      className={cn("my-1 border-t border-border", className)}
      {...props}
    />
  );
}

/* ── List Item Title ─────────────────────────────────────── */

function ListItemTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="list-item-title"
      className={cn(
        "px-3 py-2 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ── List Item ───────────────────────────────────────────── */

interface ListItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

function ListItem({
  className,
  checked = false,
  icon,
  shortcut,
  children,
  ...props
}: ListItemProps) {
  return (
    <button
      type="button"
      data-slot="list-item"
      data-checked={checked}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-3 py-1.5 text-sm text-foreground transition-colors",
        "hover:bg-secondary focus:bg-secondary outline-none",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="text-xs text-muted-foreground">{shortcut}</span>
      )}
      {checked && <Check className="size-4 shrink-0" />}
    </button>
  );
}

export {
  Dropdown,
  DropdownSearch,
  ListDivider,
  ListItemTitle,
  ListItem,
};
export type { DropdownProps, ListItemProps };
