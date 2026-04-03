"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

/* ── Accordion ───────────────────────────────────────────── */

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div
      data-slot="accordion-item"
      data-state={isOpen ? "open" : "closed"}
      className={cn("border-b border-border", className)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-sm font-semibold font-mono text-foreground transition-colors hover:text-muted-foreground"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Accordion ───────────────────────────────────────────── */

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

function Accordion({ children, className }: AccordionProps) {
  return (
    <div data-slot="accordion" className={cn("w-full", className)}>
      {children}
    </div>
  );
}

export { Accordion, AccordionItem };
export type { AccordionProps, AccordionItemProps };
