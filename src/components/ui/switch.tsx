"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Switch ──────────────────────────────────────────────── */

interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, ...props }, ref) => {
    const id = props.id || React.useId();

    return (
      <div className="flex items-center gap-3">
        <div className="relative inline-flex">
          <input
            type="checkbox"
            role="switch"
            id={id}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border bg-background transition-colors",
              "peer-checked:bg-foreground peer-checked:border-foreground",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
              className
            )}
          >
            <span
              className={cn(
                "pointer-events-none block size-5 rounded-full bg-foreground shadow-sm transition-transform",
                "translate-x-0.5 peer-checked:translate-x-[22px] peer-checked:bg-background"
              )}
            />
          </label>
        </div>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps };
