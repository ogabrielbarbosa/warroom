import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Input ───────────────────────────────────────────────── */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visual state of the input */
  state?: "default" | "filled";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", state = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        data-state={state}
        className={cn(
          "flex h-10 w-full rounded-none border border-border bg-background px-4 py-2.5 font-sans text-sm text-foreground ring-offset-background transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          state === "filled" && "text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

/* ── Input Group (Label + Input + Description) ───────────── */

interface InputGroupProps {
  label?: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function InputGroup({
  label,
  description,
  error,
  children,
  className,
}: InputGroupProps) {
  return (
    <div data-slot="input-group" className={cn("flex flex-col gap-1.5", className)}>
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

export { Input, InputGroup };
export type { InputProps, InputGroupProps };
