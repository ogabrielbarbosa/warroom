"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/* ── Checkbox ────────────────────────────────────────────── */

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    const id = props.id || React.useId();

    return (
      <div className="flex items-start gap-2">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "flex size-4 shrink-0 cursor-pointer items-center justify-center border border-foreground bg-background transition-colors",
              "peer-checked:bg-foreground peer-checked:border-foreground",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
              className
            )}
          >
            <Check className="size-3 text-background opacity-0 peer-checked:opacity-100 transition-opacity" />
          </label>
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-1">
            {label && (
              <label
                htmlFor={id}
                className="text-sm font-medium text-foreground cursor-pointer leading-none"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
