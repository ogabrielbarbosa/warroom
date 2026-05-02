"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ExternalLink } from "lucide-react";
import type { InstagramMedia } from "../lib/types";

interface ReelPickerProps {
  reels: InstagramMedia[];
  selectedId: string | null;
  onSelect: (reel: InstagramMedia | null) => void;
}

export function ReelPicker({ reels, selectedId, onSelect }: ReelPickerProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleReels = showAll ? reels : reels.slice(0, 6);

  if (reels.length === 0) {
    return (
      <div className="border border-dashed border-border bg-secondary/30 p-6 text-center text-sm text-muted-foreground">
        Nenhum Reel sincronizado ainda. Conecte sua conta do Instagram para puxar a lista.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col divide-y divide-border border border-border">
        {visibleReels.map((reel) => {
          const isSelected = reel.id === selectedId;
          return (
            <ReelRow
              key={reel.id}
              reel={reel}
              isSelected={isSelected}
              onSelect={() => onSelect(isSelected ? null : reel)}
            />
          );
        })}
      </div>

      {reels.length > 6 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="self-start text-sm font-medium text-primary hover:underline"
        >
          {showAll ? "Mostrar menos" : `Mostrar todos (${reels.length})`}
        </button>
      )}
    </div>
  );
}

function ReelRow({
  reel,
  isSelected,
  onSelect,
}: {
  reel: InstagramMedia;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const dateLabel = formatDate(reel.postDate);
  const title = reel.caption?.split("\n")[0]?.trim() || "(sem legenda)";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-3 px-3 py-3 text-left transition-colors",
        isSelected ? "bg-primary/10" : "hover:bg-secondary/40",
      )}
    >
      {/* Checkbox */}
      <div
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
          isSelected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background",
        )}
      >
        {isSelected && <Check className="size-3.5" strokeWidth={3} />}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <span className="truncate text-sm font-medium text-foreground">
          {title}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {dateLabel}
        </span>
      </div>

      {/* External link */}
      {reel.url && (
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Abrir no Instagram"
        >
          <ExternalLink className="size-4" strokeWidth={1.5} />
        </a>
      )}
    </button>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
