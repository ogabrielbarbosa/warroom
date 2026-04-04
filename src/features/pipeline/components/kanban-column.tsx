"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { PipelineCard, PipelineStatus } from "../lib/mock-data";
import { STATUS_COLORS } from "../lib/mock-data";
import { KanbanCard } from "./kanban-card";

interface KanbanColumnProps {
  status: PipelineStatus;
  cards: PipelineCard[];
  onCardClick: (card: PipelineCard) => void;
  onAddCard: () => void;
}

export function KanbanColumn({ status, cards, onCardClick, onAddCard }: KanbanColumnProps) {
  const color = STATUS_COLORS[status];
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      className={`flex h-full w-[260px] shrink-0 flex-col rounded-xl border border-border bg-card transition-colors ${
        isOver ? "border-primary/50 bg-primary/5" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <span
          className="font-mono text-[13px] font-semibold uppercase"
          style={{ color }}
        >
          {status.toUpperCase()}
        </span>
        <span className="flex items-center justify-center rounded-full bg-secondary px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground">
          {cards.length}
        </span>
      </div>

      {/* Cards */}
      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2"
      >
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onClick={() => onCardClick(card)}
            />
          ))}
        </SortableContext>

        {/* Add card */}
        <button
          type="button"
          onClick={onAddCard}
          className="flex w-full items-center justify-center py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          + Add card
        </button>
      </div>
    </div>
  );
}
