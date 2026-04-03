import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* ── Label / Badge ───────────────────────────────────────── */

const labelVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        error: "bg-error text-error-foreground",
        info: "bg-info text-info-foreground",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  icon?: LucideIcon;
}

function Label({
  className,
  variant = "secondary",
  icon: Icon,
  children,
  ...props
}: LabelProps) {
  return (
    <span
      data-slot="label"
      className={cn(labelVariants({ variant }), className)}
      {...props}
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

/* ── Icon Label (larger padding + icon) ──────────────────── */

const iconLabelVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full p-2 text-xs font-medium",
  {
    variants: {
      variant: {
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        orange: "bg-warning text-warning-foreground",
        violet: "bg-info text-info-foreground",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

interface IconLabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconLabelVariants> {
  icon?: LucideIcon;
}

function IconLabel({
  className,
  variant = "secondary",
  icon: Icon,
  children,
  ...props
}: IconLabelProps) {
  return (
    <span
      data-slot="icon-label"
      className={cn(iconLabelVariants({ variant }), className)}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </span>
  );
}

export { Label, IconLabel, labelVariants, iconLabelVariants };
export type { LabelProps, IconLabelProps };
