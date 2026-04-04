"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Link as LinkIcon } from "lucide-react";
import { type PipelineCard, STATUS_COLORS } from "../lib/mock-data";

type SortKey = "title" | "status" | "topic" | "format" | "date" | "scheduleDate";
type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string; className?: string }[] = [
  { key: "title", label: "Title", className: "min-w-[200px]" },
  { key: "status", label: "Status", className: "w-[140px]" },
  { key: "topic", label: "Topic", className: "w-[120px]" },
  { key: "format", label: "Format", className: "w-[140px]" },
  { key: "scheduleDate", label: "Schedule", className: "w-[120px]" },
  { key: "date", label: "Created", className: "w-[100px]" },
];

interface PipelineTableViewProps {
  cards: PipelineCard[];
  onCardClick: (card: PipelineCard) => void;
}

export function PipelineTableView({ cards, onCardClick }: PipelineTableViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...cards].sort((a, b) => {
    let aVal: string;
    let bVal: string;

    switch (sortKey) {
      case "title":
        aVal = a.title;
        bVal = b.title;
        break;
      case "status":
        aVal = a.status;
        bVal = b.status;
        break;
      case "topic":
        aVal = a.topic;
        bVal = b.topic;
        break;
      case "format":
        aVal = a.format;
        bVal = b.format;
        break;
      case "scheduleDate":
        aVal = a.scheduleDate ?? "";
        bVal = b.scheduleDate ?? "";
        break;
      case "date":
        aVal = a.date;
        bVal = b.date;
        break;
      default:
        return 0;
    }

    const cmp = aVal.localeCompare(bVal);
    return sortDir === "asc" ? cmp : -cmp;
  });

  function formatSchedule(date: string | null) {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-3 py-2.5 text-left font-mono text-xs font-medium text-muted-foreground",
                  col.className
                )}
              >
                <button
                  type="button"
                  onClick={() => handleSort(col.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
                    sortKey === col.key && "text-foreground"
                  )}
                >
                  {col.label}
                  <ArrowUpDown className="size-3" />
                </button>
              </th>
            ))}
            <th className="w-[40px]" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((card) => (
            <tr
              key={card.id}
              onClick={() => onCardClick(card)}
              className="group cursor-pointer border-b border-border/50 transition-colors hover:bg-sidebar-accent/50"
            >
              {/* Title */}
              <td className="px-3 py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-sm font-semibold text-foreground leading-snug">
                    {card.title}
                  </span>
                  {card.hookText && (
                    <span className="text-xs italic text-muted-foreground line-clamp-1">
                      {card.hookText}
                    </span>
                  )}
                </div>
              </td>

              {/* Status */}
              <td className="px-3 py-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[11px]"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[card.status] }}
                  />
                  {card.status}
                </span>
              </td>

              {/* Topic */}
              <td className="px-3 py-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {card.topic || "—"}
                </span>
              </td>

              {/* Format */}
              <td className="px-3 py-3">
                <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {card.format || "—"}
                </span>
              </td>

              {/* Schedule */}
              <td className="px-3 py-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {formatSchedule(card.scheduleDate)}
                </span>
              </td>

              {/* Created */}
              <td className="px-3 py-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {card.date}
                </span>
              </td>

              {/* Reference */}
              <td className="px-3 py-3">
                {card.hasReference && (
                  <LinkIcon className="size-3.5 text-muted-foreground" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
          No cards yet
        </div>
      )}
    </div>
  );
}
