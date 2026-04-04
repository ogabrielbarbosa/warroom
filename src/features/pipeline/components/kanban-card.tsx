"use client";

import { cn } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PipelineCard } from "../lib/mock-data";

interface KanbanCardProps {
  card: PipelineCard;
  onClick: () => void;
}

export function KanbanCard({ card, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { card },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={isDragging ? undefined : onClick}
      role="button"
      tabIndex={0}
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg border border-border bg-background p-3 text-left",
        "transition-colors hover:border-muted-foreground/40 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-30"
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
    </div>
  );
}

export function KanbanCardOverlay({ card }: { card: PipelineCard }) {
  return (
    <div className="flex w-[236px] flex-col gap-2 rounded-lg border border-primary/50 bg-background p-3 text-left shadow-2xl rotate-[2deg]">
      <span className="font-mono text-sm font-semibold text-foreground leading-snug">
        {card.title}
      </span>
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex items-center rounded-full border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
          {card.topic}
        </span>
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 font-mono text-[11px] text-muted-foreground">
          {card.format}
        </span>
      </div>
      <p className="text-xs italic text-muted-foreground leading-relaxed">
        {card.hookText}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{card.date}</span>
        {card.hasReference && (
          <LinkIcon className="size-3.5 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}
