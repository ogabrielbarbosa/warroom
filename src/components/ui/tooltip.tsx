import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Tooltip ─────────────────────────────────────────────── */

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function Tooltip({ className, content, ...props }: TooltipProps) {
  return (
    <div
      data-slot="tooltip"
      role="tooltip"
      className={cn(
        "rounded-full border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-sm",
        "animate-in fade-in-0 zoom-in-95 duration-150",
        className
      )}
      {...props}
    >
      {content}
    </div>
  );
}

export { Tooltip };
export type { TooltipProps };
