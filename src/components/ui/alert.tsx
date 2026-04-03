import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

/* ── Alert ───────────────────────────────────────────────── */

const alertVariants = cva("flex gap-3 p-4 text-sm", {
  variants: {
    variant: {
      info: "bg-info text-info-foreground",
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      error: "bg-error text-error-foreground",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const alertIcons: Record<string, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: LucideIcon;
}

function Alert({
  className,
  variant = "info",
  icon,
  children,
  ...props
}: AlertProps) {
  const Icon = icon || alertIcons[variant || "info"];

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {Icon && (
        <Icon className="mt-0.5 size-5 shrink-0" />
      )}
      <div className="flex flex-col gap-1 flex-1">{children}</div>
    </div>
  );
}

/* ── Alert Title ─────────────────────────────────────────── */

function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("font-semibold font-mono leading-snug", className)}
      {...props}
    />
  );
}

/* ── Alert Description ───────────────────────────────────── */

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="alert-description"
      className={cn("text-sm leading-relaxed opacity-90", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
export type { AlertProps };
