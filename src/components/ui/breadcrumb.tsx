import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, MoreHorizontal } from "lucide-react";

/* ── Breadcrumb ──────────────────────────────────────────── */

function Breadcrumb({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="Breadcrumb"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

/* ── Breadcrumb List ─────────────────────────────────────── */

function BreadcrumbList({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ── Breadcrumb Item ─────────────────────────────────────── */

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
}

function BreadcrumbItem({
  className,
  active = false,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      data-slot="breadcrumb-item"
      data-active={active}
      className={cn(
        "inline-flex items-center gap-2",
        active && "text-foreground font-medium",
        className
      )}
      {...props}
    />
  );
}

/* ── Breadcrumb Link ─────────────────────────────────────── */

function BreadcrumbLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        "transition-colors hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ── Breadcrumb Separator ────────────────────────────────── */

function BreadcrumbSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      className={cn("flex items-center", className)}
      {...props}
    >
      <ChevronRight className="size-4" />
    </li>
  );
}

/* ── Breadcrumb Ellipsis ─────────────────────────────────── */

function BreadcrumbEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
export type { BreadcrumbItemProps };
