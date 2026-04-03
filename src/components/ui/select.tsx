import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

/* ── Select ──────────────────────────────────────────────── */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  state?: "default" | "filled";
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, state = "default", children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          data-slot="select"
          data-state={state}
          className={cn(
            "flex h-10 w-full appearance-none rounded-none border border-border bg-background px-4 py-2.5 pr-10 font-sans text-sm text-foreground ring-offset-background transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            state === "default" && "text-muted-foreground",
            state === "filled" && "text-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    );
  }
);
Select.displayName = "Select";

/* ── Select Group ────────────────────────────────────────── */

interface SelectGroupProps {
  label?: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function SelectGroup({
  label,
  description,
  error,
  children,
  className,
}: SelectGroupProps) {
  return (
    <div data-slot="select-group" className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium font-mono text-foreground">
          {label}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-error-foreground">{error}</p>
      )}
    </div>
  );
}

export { Select, SelectGroup };
export type { SelectProps, SelectGroupProps };
