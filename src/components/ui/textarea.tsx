import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Textarea ────────────────────────────────────────────── */

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: "default" | "filled";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state = "default", ...props }, ref) => {
    return (
      <textarea
        data-slot="textarea"
        data-state={state}
        className={cn(
          "flex min-h-[120px] w-full rounded-none border border-border bg-background px-4 py-2 font-sans text-sm text-foreground ring-offset-background transition-colors resize-y",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          state === "filled" && "text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

/* ── Textarea Group ──────────────────────────────────────── */

interface TextareaGroupProps {
  label?: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function TextareaGroup({
  label,
  description,
  error,
  children,
  className,
}: TextareaGroupProps) {
  return (
    <div data-slot="textarea-group" className={cn("flex flex-col gap-1.5", className)}>
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

export { Textarea, TextareaGroup };
export type { TextareaProps, TextareaGroupProps };
