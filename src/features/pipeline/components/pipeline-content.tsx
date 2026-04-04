"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  List,
  Table2,
  Calendar,
  Clock,
  Settings,
  Plus,
  Filter,
} from "lucide-react";
import {
  type PipelineCard,
  type PipelineStatus,
} from "../lib/mock-data";
import { KanbanColumn } from "./kanban-column";
import { PipelineCardModal } from "./pipeline-card-modal";

const STATUSES: PipelineStatus[] = [
  "Idea",
  "Scripted",
  "Filming",
  "Editing",
  "Posted",
];

const VIEW_ICONS = [
  { icon: LayoutGrid, label: "Kanban", active: true },
  { icon: List, label: "List", active: false },
  { icon: Table2, label: "Table", active: false },
  { icon: Calendar, label: "Calendar", active: false },
  { icon: Clock, label: "Timeline", active: false },
];

export function PipelineContent({ cards }: { cards: PipelineCard[] }) {
  const [selectedCard, setSelectedCard] = useState<PipelineCard | null>(null);

  const cardsByStatus = STATUSES.reduce(
    (acc, status) => {
      acc[status] = cards.filter((c) => c.status === status);
      return acc;
    },
    {} as Record<PipelineStatus, PipelineCard[]>
  );

  return (
    <div className="flex h-full w-full">
      {/* View Sidebar — hidden on mobile */}
      <div className="hidden sm:flex w-14 shrink-0 flex-col items-center justify-between border-r border-border bg-sidebar py-4">
        <div className="flex flex-col items-center gap-1">
          {/* Action buttons */}
          <button
            type="button"
            title="Add"
            className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="size-5" />
          </button>
          <button
            type="button"
            title="Filter"
            className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
          >
            <Filter className="size-5" />
          </button>

          {/* Divider */}
          <div className="my-1 h-px w-6 bg-border" />

          {/* View buttons */}
          {VIEW_ICONS.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              type="button"
              title={label}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg transition-colors",
                active
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <button
            type="button"
            title="Settings"
            className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
          >
            <Settings className="size-5" />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Kanban Board */}
        <div className="flex flex-1 gap-3 overflow-x-auto p-4 md:gap-4 md:p-6">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              cards={cardsByStatus[status]}
              onCardClick={setSelectedCard}
            />
          ))}
        </div>
      </div>

      {/* Card Detail Modal */}
      <PipelineCardModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}
