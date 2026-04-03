"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Radio ───────────────────────────────────────────────── */

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, ...props }, ref) => {
    const id = props.id || React.useId();

    return (
      <div className="flex items-start gap-2">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            id={id}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-foreground bg-background transition-colors",
              "peer-checked:bg-foreground peer-checked:border-foreground",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
              className
            )}
          >
            <span className="size-1.5 rounded bg-background opacity-0 peer-checked:opacity-100 transition-opacity" />
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
Radio.displayName = "Radio";

/* ── RadioGroup ──────────────────────────────────────────── */

interface RadioGroupProps {
  children: React.ReactNode;
  className?: string;
  name?: string;
  defaultValue?: string;
  orientation?: "vertical" | "horizontal";
}

function RadioGroup({
  children,
  className,
  orientation = "vertical",
  ...props
}: RadioGroupProps) {
  return (
    <div
      data-slot="radio-group"
      role="radiogroup"
      className={cn(
        "flex gap-2",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Radio, RadioGroup };
export type { RadioProps, RadioGroupProps };
