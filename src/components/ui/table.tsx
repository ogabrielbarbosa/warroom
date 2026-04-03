import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Table ───────────────────────────────────────────────── */

function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom border border-border bg-background text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
}

/* ── Table Header ────────────────────────────────────────── */

function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      data-slot="table-header"
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

/* ── Table Body ──────────────────────────────────────────── */

function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/* ── Table Row ───────────────────────────────────────────── */

function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50",
        className
      )}
      {...props}
    />
  );
}

/* ── Table Head (Column Header) ──────────────────────────── */

function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-3 text-left align-middle text-sm font-medium font-mono text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ── Table Cell ──────────────────────────────────────────── */

function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "h-11 px-3 align-middle text-sm text-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ── Table Footer ────────────────────────────────────────── */

function TableFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t border-border", className)}
      {...props}
    />
  );
}

/* ── Data Table Header ───────────────────────────────────── */

function DataTableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="data-table-header"
      className={cn(
        "flex items-center justify-between gap-4 py-3",
        className
      )}
      {...props}
    />
  );
}

/* ── Data Table Footer ───────────────────────────────────── */

function DataTableFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="data-table-footer"
      className={cn(
        "flex items-center justify-between gap-4 py-3",
        className
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  DataTableHeader,
  DataTableFooter,
};
