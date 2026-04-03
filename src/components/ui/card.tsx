import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Card ────────────────────────────────────────────────── */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "image" | "action" | "plain";
}

function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        "flex flex-col overflow-hidden border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

/* ── Card Header ─────────────────────────────────────────── */

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1 border-b border-border p-4",
        className
      )}
      {...props}
    />
  );
}

/* ── Card Title ──────────────────────────────────────────── */

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-base font-semibold font-mono leading-snug text-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ── Card Description ────────────────────────────────────── */

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm text-muted-foreground leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

/* ── Card Content ────────────────────────────────────────── */

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-4", className)}
      {...props}
    />
  );
}

/* ── Card Footer ─────────────────────────────────────────── */

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-3 p-4",
        className
      )}
      {...props}
    />
  );
}

/* ── Card Image ──────────────────────────────────────────── */

function CardImage({
  className,
  src,
  alt = "",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className="relative w-full overflow-hidden border-b border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-slot="card-image"
        src={src}
        alt={alt}
        className={cn("h-40 w-full object-cover", className)}
        {...props}
      />
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};
export type { CardProps };
