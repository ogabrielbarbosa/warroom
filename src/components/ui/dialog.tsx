"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/* ── Dialog Overlay ──────────────────────────────────────── */

function DialogOverlay({
  className,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in-0 duration-200",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
}

/* ── Dialog ──────────────────────────────────────────────── */

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function Dialog({ open, onClose, children, className }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <DialogOverlay onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          data-slot="dialog"
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative w-full max-w-md border border-border bg-card shadow-lg animate-in fade-in-0 zoom-in-95 duration-200",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Dialog Header ───────────────────────────────────────── */

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1 p-6", className)}
      {...props}
    />
  );
}

/* ── Dialog Title ────────────────────────────────────────── */

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn("text-lg font-semibold font-mono text-foreground", className)}
      {...props}
    />
  );
}

/* ── Dialog Description ──────────────────────────────────── */

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

/* ── Dialog Content ──────────────────────────────────────── */

function DialogContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-content"
      className={cn("px-6 pb-2", className)}
      {...props}
    />
  );
}

/* ── Dialog Footer ───────────────────────────────────────── */

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex items-center justify-end gap-3 p-6", className)}
      {...props}
    />
  );
}

/* ── Dialog Close ────────────────────────────────────────── */

function DialogClose({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-slot="dialog-close"
      className={cn(
        "absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <X className="size-4" />
    </button>
  );
}

export {
  Dialog,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
};
export type { DialogProps };
