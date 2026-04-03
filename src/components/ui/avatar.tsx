import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Avatar ──────────────────────────────────────────────── */

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg";
}

function Avatar({ className, size = "default", ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary",
        size === "sm" && "size-8",
        size === "default" && "size-10",
        size === "lg" && "size-12",
        className
      )}
      {...props}
    />
  );
}

/* ── Avatar Image ────────────────────────────────────────── */

function AvatarImage({
  className,
  src,
  alt = "",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

/* ── Avatar Fallback ─────────────────────────────────────── */

function AvatarFallback({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "text-sm font-medium font-mono text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
export type { AvatarProps };
