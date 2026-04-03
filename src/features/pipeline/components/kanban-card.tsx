"use client";

import { cn } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";
import type { PipelineCard } from "../lib/mock-data";

interface KanbanCardProps {
  card: PipelineCard;
  onClick: () => void;
}

export function KanbanCard({ card, onClick }: KanbanCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg border border-border bg-background p-3 text-left",
        "transition-colors hover:border-muted-foreground/40 cursor-pointer"
      )}
    >
      {/* Title */}
      <span className="font-mono text-sm font-semibold text-foreground leading-snug">
        {card.title}
      </span>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex items-center rounded-full border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
          {card.topic}
        </span>
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 font-mono text-[11px] text-muted-foreground">
          {card.format}
        </span>
      </div>

      {/* Hook excerpt */}
      <p className="text-xs italic text-muted-foreground leading-relaxed">
        {card.hookText}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{card.date}</span>
        {card.hasReference && (
          <LinkIcon className="size-3.5 text-muted-foreground" />
        )}
      </div>
    </button>
  );
}
