"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, ChevronDown, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MOCK_HOOKS, SOURCE_STYLES, type ContentHook } from "../lib/mock-data";
import { HookDetailPanel } from "./hook-detail-panel";

/* ── Source Badge ─────────────────────────────────────────── */

function SourceBadge({ source }: { source: ContentHook["source"] }) {
  const style = SOURCE_STYLES[source];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1.5 font-mono text-sm",
        style.bg,
        style.text
      )}
    >
      {source}
    </span>
  );
}

/* ── Hook Type Label ─────────────────────────────────────── */

function HookTypeLabel({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#2E2E2E] px-2 py-1.5 font-mono text-xs text-foreground">
      {type}
    </span>
  );
}

/* ── Filter Select (visual only) ─────────────────────────── */

function FilterSelect({ label }: { label: string }) {
  return (
    <button className="flex h-10 items-center justify-between gap-2 rounded-full border border-border bg-background px-4 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/50">
      <span>{label}</span>
      <ChevronDown className="size-4 opacity-50" />
    </button>
  );
}

/* ── Search Input ────────────────────────────────────────── */

function SearchInput() {
  return (
    <div className="flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4">
      <Search className="size-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search hooks"
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

/* ── Thumbnail ───────────────────────────────────────────── */

function Thumbnail({ hookText }: { hookText: string }) {
  // Generate a deterministic color from hook text for placeholder thumbnails
  const hue = hookText.length * 7 % 360;
  return (
    <div
      className="size-10 shrink-0 rounded-md"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 40%, 20%), hsl(${hue + 40}, 50%, 15%))`,
      }}
    />
  );
}

/* ── Main Content ────────────────────────────────────────── */

export function HooksContent() {
  const [selectedHook, setSelectedHook] = useState<ContentHook | null>(null);

  function handleRowClick(hook: ContentHook) {
    setSelectedHook((prev) => (prev?.id === hook.id ? null : hook));
  }

  function handleCopy(e: React.MouseEvent, text: string) {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Hooks"
        subtitle="504 hooks across 2 sources"
        filters={
          <>
            <FilterSelect label="Source" />
            <FilterSelect label="Content Type" />
            <FilterSelect label="Niche" />
            <FilterSelect label="Sort by: Views" />
            <div className="w-[212px]">
              <SearchInput />
            </div>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <Table className="border-0">
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-auto">Hook</TableHead>
              <TableHead className="w-[120px]">Source</TableHead>
              <TableHead className="w-[100px]">Views</TableHead>
              <TableHead className="w-[160px]">Hook Type</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_HOOKS.map((hook) => {
              const isSelected = selectedHook?.id === hook.id;
              return (
                <TableRow
                  key={hook.id}
                  onClick={() => handleRowClick(hook)}
                  className={cn(
                    "cursor-pointer border-b border-border border-l-[3px] transition-colors",
                    isSelected
                      ? "border-l-primary bg-card"
                      : "border-l-transparent hover:bg-card/50"
                  )}
                >
                  {/* Hook Cell */}
                  <TableCell className="h-auto py-3">
                    <div className="flex items-center gap-3">
                      <Thumbnail hookText={hook.hookText} />
                      <span className="text-sm font-medium text-foreground line-clamp-1">
                        {hook.hookText}
                      </span>
                    </div>
                  </TableCell>

                  {/* Source Cell */}
                  <TableCell className="h-auto py-3">
                    <SourceBadge source={hook.source} />
                  </TableCell>

                  {/* Views Cell */}
                  <TableCell className="h-auto py-3 text-sm text-foreground">
                    {hook.viewsFormatted}
                  </TableCell>

                  {/* Hook Type Cell */}
                  <TableCell className="h-auto py-3">
                    <HookTypeLabel type={hook.hookType} />
                  </TableCell>

                  {/* Copy Cell */}
                  <TableCell className="h-auto py-3">
                    <button
                      onClick={(e) => handleCopy(e, hook.hookText)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Copy className="size-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Slide Over Panel -- outside content padding */}
      <HookDetailPanel
        hook={selectedHook}
        onClose={() => setSelectedHook(null)}
      />
    </div>
  );
}
