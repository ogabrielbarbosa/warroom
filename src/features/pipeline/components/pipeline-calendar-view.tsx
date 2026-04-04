"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type PipelineCard, STATUS_COLORS } from "../lib/mock-data";
import { updateCardScheduleDate } from "../actions/pipeline";

// ── Helpers ──

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d: Date) {
  return isSameDay(d, new Date());
}

function dateToKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getCalendarDays(month: Date): Date[] {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days: Date[] = [];

  // Pad to start of week (Sunday = 0)
  const startDay = start.getDay();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(start.getFullYear(), start.getMonth(), -i));
  }

  // Days of the month
  for (let i = 1; i <= end.getDate(); i++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), i));
  }

  // Pad to end of week
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(end.getFullYear(), end.getMonth() + 1, i));
    }
  }

  return days;
}

// ── Draggable Calendar Card ──

function CalendarCard({
  card,
  onClick,
}: {
  card: PipelineCard;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
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
        "flex items-center gap-1.5 rounded px-1.5 py-1 text-left",
        "cursor-grab active:cursor-grabbing transition-colors hover:bg-sidebar-accent/80",
        isDragging && "opacity-30"
      )}
    >
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: STATUS_COLORS[card.status] }}
      />
      <span className="truncate font-mono text-[11px] text-foreground">
        {card.title}
      </span>
    </div>
  );
}

function CalendarCardOverlay({ card }: { card: PipelineCard }) {
  return (
    <div className="flex items-center gap-1.5 rounded bg-background border border-primary/50 px-2 py-1.5 shadow-2xl rotate-[2deg]">
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: STATUS_COLORS[card.status] }}
      />
      <span className="truncate font-mono text-[11px] font-semibold text-foreground max-w-[180px]">
        {card.title}
      </span>
    </div>
  );
}

// ── Droppable Day Cell ──

function DayCell({
  date,
  isCurrentMonth,
  cards,
  onCardClick,
}: {
  date: Date;
  isCurrentMonth: boolean;
  cards: PipelineCard[];
  onCardClick: (card: PipelineCard) => void;
}) {
  const key = dateToKey(date);
  const { setNodeRef, isOver } = useDroppable({ id: key });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[100px] border-r border-b border-border p-1 transition-colors",
        !isCurrentMonth && "bg-sidebar/30",
        isOver && "bg-primary/5 ring-1 ring-primary/30 ring-inset"
      )}
    >
      <span
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full font-mono text-xs",
          isToday(date) && "bg-primary text-primary-foreground font-semibold",
          !isCurrentMonth && "text-muted-foreground/40",
          isCurrentMonth && !isToday(date) && "text-muted-foreground"
        )}
      >
        {date.getDate()}
      </span>
      <div className="mt-0.5 flex flex-col gap-0.5">
        {cards.map((card) => (
          <CalendarCard
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Unscheduled Sidebar ──

function UnscheduledCard({
  card,
  onClick,
}: {
  card: PipelineCard;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
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
        "flex items-center gap-2 rounded-lg border border-border bg-background p-2",
        "cursor-grab active:cursor-grabbing transition-colors hover:border-muted-foreground/40",
        isDragging && "opacity-30"
      )}
    >
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: STATUS_COLORS[card.status] }}
      />
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="truncate font-mono text-[11px] font-semibold text-foreground">
          {card.title}
        </span>
        <span className="text-[10px] text-muted-foreground">{card.status}</span>
      </div>
    </div>
  );
}

// ── Main Calendar View ──

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface PipelineCalendarViewProps {
  cards: PipelineCard[];
  onCardClick: (card: PipelineCard) => void;
}

export function PipelineCalendarView({
  cards,
  onCardClick,
}: PipelineCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [activeCard, setActiveCard] = useState<PipelineCard | null>(null);
  const [localCards, setLocalCards] = useState(cards);

  // Sync from parent
  const [prevCards, setPrevCards] = useState(cards);
  if (cards !== prevCards) {
    setPrevCards(cards);
    setLocalCards(cards);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const calendarDays = getCalendarDays(currentMonth);

  // Group cards by date key
  const cardsByDate = new Map<string, PipelineCard[]>();
  const unscheduled: PipelineCard[] = [];

  localCards.forEach((card) => {
    if (card.scheduleDate) {
      const key = dateToKey(new Date(card.scheduleDate));
      const arr = cardsByDate.get(key) ?? [];
      arr.push(card);
      cardsByDate.set(key, arr);
    } else {
      unscheduled.push(card);
    }
  });

  function prevMonth() {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  function goToday() {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const card = event.active.data.current?.card as PipelineCard | undefined;
    if (card) setActiveCard(card);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveCard(null);

      if (!over) return;

      const cardId = active.id as string;
      const targetKey = over.id as string;

      // Check if dropped on "unscheduled" zone
      if (targetKey === "unscheduled") {
        setLocalCards((prev) =>
          prev.map((c) =>
            c.id === cardId ? { ...c, scheduleDate: null } : c
          )
        );
        updateCardScheduleDate(cardId, null);
        return;
      }

      // Dropped on a day cell (key = YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(targetKey)) {
        const newDate = `${targetKey}T12:00:00`;
        setLocalCards((prev) =>
          prev.map((c) =>
            c.id === cardId ? { ...c, scheduleDate: newDate } : c
          )
        );
        updateCardScheduleDate(cardId, newDate);
      }
    },
    []
  );

  const handleDragCancel = useCallback(() => {
    setActiveCard(null);
    setLocalCards(cards);
  }, [cards]);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevMonth}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
              >
                <ChevronLeft className="size-4" />
              </button>
              <h2 className="font-mono text-sm font-semibold text-foreground min-w-[160px] text-center">
                {monthLabel}
              </h2>
              <button
                type="button"
                onClick={nextMonth}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={goToday}
              className="rounded-lg border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            >
              Today
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="px-2 py-1.5 text-center font-mono text-[11px] font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid flex-1 grid-cols-7 overflow-auto">
            {calendarDays.map((date) => {
              const key = dateToKey(date);
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              return (
                <DayCell
                  key={key}
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  cards={cardsByDate.get(key) ?? []}
                  onCardClick={onCardClick}
                />
              );
            })}
          </div>
        </div>

        {/* Unscheduled Sidebar */}
        <UnscheduledSidebar
          cards={unscheduled}
          onCardClick={onCardClick}
        />
      </div>

      <DragOverlay dropAnimation={null}>
        {activeCard ? <CalendarCardOverlay card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function UnscheduledSidebar({
  cards,
  onCardClick,
}: {
  cards: PipelineCard[];
  onCardClick: (card: PipelineCard) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "unscheduled" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "hidden md:flex w-[220px] shrink-0 flex-col border-l border-border bg-sidebar",
        isOver && "bg-primary/5"
      )}
    >
      <div className="border-b border-border px-3 py-3">
        <h3 className="font-mono text-xs font-medium text-muted-foreground">
          Unscheduled
          <span className="ml-1.5 text-foreground">{cards.length}</span>
        </h3>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-auto p-2">
        {cards.map((card) => (
          <UnscheduledCard
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
          />
        ))}
        {cards.length === 0 && (
          <p className="py-8 text-center text-[11px] text-muted-foreground">
            Drag cards here to unschedule
          </p>
        )}
      </div>
    </div>
  );
}
