"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  useSensor,
  useSensors,
  PointerSensor,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  LayoutGrid,
  Table2,
  Calendar,
  Settings,
  Plus,
  Filter,
  X,
} from "lucide-react";
import {
  type PipelineCard,
  type PipelineStatus,
  STATUS_COLORS,
} from "../lib/mock-data";
import { KanbanColumn } from "./kanban-column";
import { KanbanCardOverlay } from "./kanban-card";
import { PipelineCardModal } from "./pipeline-card-modal";
import { PipelineTableView } from "./pipeline-table-view";
import { PipelineCalendarView } from "./pipeline-calendar-view";
import { updateCardStatus } from "../actions/pipeline";

const STATUSES: PipelineStatus[] = [
  "Idea",
  "Scripted",
  "Prep Materials",
  "Filming",
  "Editing",
  "Prep for Post",
  "Scheduled",
  "Posted",
];

type ViewType = "kanban" | "table" | "calendar";

const VIEW_ICONS: { icon: typeof LayoutGrid; label: string; view: ViewType }[] = [
  { icon: LayoutGrid, label: "Kanban", view: "kanban" },
  { icon: Table2, label: "Table", view: "table" },
  { icon: Calendar, label: "Calendar", view: "calendar" },
];

const FORMATS = [
  "Screen Share",
  "Talking Head",
  "B-Roll + Words",
  "Self",
  "Split Screen",
] as const;

interface PipelineFilters {
  statuses: Set<PipelineStatus>;
  formats: Set<string>;
}

const EMPTY_FILTERS: PipelineFilters = {
  statuses: new Set(),
  formats: new Set(),
};

function hasActiveFilters(f: PipelineFilters) {
  return f.statuses.size > 0 || f.formats.size > 0;
}

function makeEmptyCard(status: PipelineStatus): PipelineCard {
  return {
    id: "",
    title: "",
    topic: "",
    format: "",
    hookText: "",
    date: "",
    status,
    hasReference: false,
    contentAngle: "",
    material: "",
    onScreenText: "",
    recordingInstructions: "",
    script: "",
    scheduleDate: null,
    referenceVideo: null,
  };
}

export function PipelineContent({ cards }: { cards: PipelineCard[] }) {
  const [activeView, setActiveView] = useState<ViewType>("kanban");
  const [selectedCard, setSelectedCard] = useState<PipelineCard | null>(null);
  const [isNewCard, setIsNewCard] = useState(false);
  const [activeCard, setActiveCard] = useState<PipelineCard | null>(null);
  const [localCards, setLocalCards] = useState<PipelineCard[]>(cards);
  const [filters, setFilters] = useState<PipelineFilters>(EMPTY_FILTERS);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [draftFilters, setDraftFilters] = useState<PipelineFilters>(EMPTY_FILTERS);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!showFilterPopover) return;
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(e.target as Node)
      ) {
        setShowFilterPopover(false);
        setDraftFilters(filters);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilterPopover, filters]);

  const filteredCards = useMemo(() => {
    if (!hasActiveFilters(filters)) return localCards;
    return localCards.filter((c) => {
      if (filters.statuses.size > 0 && !filters.statuses.has(c.status)) return false;
      if (filters.formats.size > 0 && !filters.formats.has(c.format)) return false;
      return true;
    });
  }, [localCards, filters]);

  function toggleDraftStatus(status: PipelineStatus) {
    setDraftFilters((prev) => {
      const next = new Set(prev.statuses);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return { ...prev, statuses: next };
    });
  }

  function toggleDraftFormat(format: string) {
    setDraftFilters((prev) => {
      const next = new Set(prev.formats);
      if (next.has(format)) next.delete(format);
      else next.add(format);
      return { ...prev, formats: next };
    });
  }

  function applyFilters() {
    setFilters(draftFilters);
    setShowFilterPopover(false);
  }

  function cancelFilters() {
    setDraftFilters(filters);
    setShowFilterPopover(false);
  }

  function clearFilters() {
    setDraftFilters(EMPTY_FILTERS);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // Sync when parent re-renders with new data (realtime updates)
  const [prevCards, setPrevCards] = useState(cards);
  if (cards !== prevCards) {
    setPrevCards(cards);
    setLocalCards(cards);
  }

  const cardsByStatus = STATUSES.reduce(
    (acc, status) => {
      acc[status] = filteredCards.filter((c) => c.status === status);
      return acc;
    },
    {} as Record<PipelineStatus, PipelineCard[]>
  );

  function handleAddCard(status: PipelineStatus) {
    setSelectedCard(makeEmptyCard(status));
    setIsNewCard(true);
  }

  function handleClose() {
    setSelectedCard(null);
    setIsNewCard(false);
  }

  function handleCardClick(card: PipelineCard) {
    setSelectedCard(card);
    setIsNewCard(false);
  }

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const card = event.active.data.current?.card as PipelineCard | undefined;
    if (card) setActiveCard(card);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Determine target status: either the column itself or the column of the card we're over
    const targetStatus = STATUSES.includes(overId as PipelineStatus)
      ? (overId as PipelineStatus)
      : (over.data.current?.card as PipelineCard | undefined)?.status;

    if (!targetStatus) return;

    setLocalCards((prev) => {
      const card = prev.find((c) => c.id === activeId);
      if (!card || card.status === targetStatus) return prev;
      return prev.map((c) =>
        c.id === activeId ? { ...c, status: targetStatus } : c
      );
    });
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active } = event;
      const activeId = active.id as string;
      const card = localCards.find((c) => c.id === activeId);
      const originalCard = cards.find((c) => c.id === activeId);

      setActiveCard(null);

      if (card && originalCard && card.status !== originalCard.status) {
        updateCardStatus(activeId, card.status);
      }
    },
    [localCards, cards]
  );

  const handleDragCancel = useCallback(() => {
    setActiveCard(null);
    setLocalCards(cards);
  }, [cards]);

  return (
    <div className="relative flex h-full w-full">
      {/* View Sidebar — hidden on mobile */}
      <div className="hidden sm:flex w-14 shrink-0 flex-col items-center justify-between border-r border-border bg-sidebar py-4">
        <div className="flex flex-col items-center gap-1">
          {/* Action buttons */}
          <button
            type="button"
            title="Add"
            onClick={() => handleAddCard("Idea")}
            className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="size-5" />
          </button>
          <button
            ref={filterBtnRef}
            type="button"
            title="Filter"
            onClick={() => {
              setDraftFilters(filters);
              setShowFilterPopover((v) => !v);
            }}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-lg transition-colors",
              showFilterPopover || hasActiveFilters(filters)
                ? "bg-sidebar-accent text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Filter className="size-5" />
            {hasActiveFilters(filters) && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {filters.statuses.size + filters.formats.size}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="my-1 h-px w-6 bg-border" />

          {/* View buttons */}
          {VIEW_ICONS.map(({ icon: Icon, label, view }) => (
            <button
              key={label}
              type="button"
              title={label}
              onClick={() => setActiveView(view)}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg transition-colors",
                activeView === view
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

      {/* Filter Popover */}
      {showFilterPopover && (
        <div
          ref={popoverRef}
          className="absolute left-14 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-sidebar shadow-xl animate-in slide-in-from-left-2 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">Filters</h3>
            <div className="flex items-center gap-1">
              {(draftFilters.statuses.size > 0 || draftFilters.formats.size > 0) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={cancelFilters}
                className="flex size-7 items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Filter sections */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5">
            {/* Status */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Status</p>
              <div className="space-y-1">
                {STATUSES.map((status) => (
                  <label
                    key={status}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-1.5 cursor-pointer transition-colors",
                      draftFilters.statuses.has(status)
                        ? "bg-sidebar-accent"
                        : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={draftFilters.statuses.has(status)}
                      onChange={() => toggleDraftStatus(status)}
                      className="sr-only"
                    />
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: STATUS_COLORS[status] }}
                    />
                    <span className="text-sm text-foreground">{status}</span>
                    {draftFilters.statuses.has(status) && (
                      <span className="ml-auto text-primary">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Visual Format */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Visual Format</p>
              <div className="space-y-1">
                {FORMATS.map((format) => (
                  <label
                    key={format}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-1.5 cursor-pointer transition-colors",
                      draftFilters.formats.has(format)
                        ? "bg-sidebar-accent"
                        : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={draftFilters.formats.has(format)}
                      onChange={() => toggleDraftFormat(format)}
                      className="sr-only"
                    />
                    <span className="text-sm text-foreground">{format}</span>
                    {draftFilters.formats.has(format) && (
                      <span className="ml-auto text-primary">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer — Apply / Cancel */}
          <div className="border-t border-border px-4 py-3 flex items-center gap-2">
            <button
              type="button"
              onClick={cancelFilters}
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-sidebar-accent"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {activeView === "kanban" && (
          <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div className="flex flex-1 gap-3 overflow-x-auto p-4 md:gap-4 md:p-6">
              {STATUSES.map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  cards={cardsByStatus[status]}
                  onCardClick={handleCardClick}
                  onAddCard={() => handleAddCard(status)}
                />
              ))}
            </div>

            <DragOverlay dropAnimation={null}>
              {activeCard ? <KanbanCardOverlay card={activeCard} /> : null}
            </DragOverlay>
          </DndContext>
        )}

        {activeView === "table" && (
          <PipelineTableView
            cards={filteredCards}
            onCardClick={handleCardClick}
          />
        )}

        {activeView === "calendar" && (
          <PipelineCalendarView
            cards={filteredCards}
            onCardClick={handleCardClick}
          />
        )}

      </div>

      {/* Card Detail Modal */}
      <PipelineCardModal
        card={selectedCard}
        isNew={isNewCard}
        onClose={handleClose}
      />
    </div>
  );
}
