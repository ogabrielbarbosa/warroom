import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

/* ── Search Box ──────────────────────────────────────────── */

interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: "default" | "filled";
}

const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, state = "default", ...props }, ref) => {
    return (
      <div
        data-slot="search-box"
        className={cn(
          "flex items-center gap-2 rounded-sm border border-transparent bg-transparent px-2 py-1.5",
          "focus-within:border-border focus-within:bg-background",
          className
        )}
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          ref={ref}
          className={cn(
            "flex-1 bg-transparent text-sm outline-none",
            "placeholder:text-muted-foreground",
            state === "filled" ? "text-foreground" : "text-muted-foreground"
          )}
          {...props}
        />
      </div>
    );
  }
);
SearchBox.displayName = "SearchBox";

export { SearchBox };
export type { SearchBoxProps };
