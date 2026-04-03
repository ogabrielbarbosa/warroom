"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

/* ── Pagination ──────────────────────────────────────────── */

function Pagination({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      data-slot="pagination"
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

/* ── Pagination Item ─────────────────────────────────────── */

interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function PaginationItem({
  className,
  active = false,
  ...props
}: PaginationItemProps) {
  return (
    <button
      type="button"
      data-slot="pagination-item"
      data-active={active}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
        active
          ? "border border-border bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        className
      )}
      {...props}
    />
  );
}

/* ── Pagination Previous ─────────────────────────────────── */

function PaginationPrevious({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-slot="pagination-previous"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
        className
      )}
      {...props}
    >
      <ChevronLeft className="size-4" />
    </button>
  );
}

/* ── Pagination Next ─────────────────────────────────────── */

function PaginationNext({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-slot="pagination-next"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
        className
      )}
      {...props}
    >
      <ChevronRight className="size-4" />
    </button>
  );
}

/* ── Pagination Ellipsis ─────────────────────────────────── */

function PaginationEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex size-10 items-center justify-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-5" />
    </span>
  );
}

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
export type { PaginationItemProps };
