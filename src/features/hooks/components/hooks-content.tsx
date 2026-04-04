"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, ChevronDown, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { SOURCE_STYLES, type ContentHook, type HookSource } from "../lib/mock-data";
import { HookDetailPanel } from "./hook-detail-panel";

/* ── Source Badge ─────────────────────────────────────────── */

function SourceBadge({ source }: { source: ContentHook["source"] }) {
  const style = SOURCE_STYLES[source] ?? { bg: "bg-[#2E2E2E]", text: "text-foreground" };
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

/* ── Dropdown Select ─────────────────────────────────────── */

function DropdownSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption = options.find((o) => o.value === value);
  const buttonText = activeOption
    ? `${label}: ${activeOption.label}`
    : label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center justify-between gap-2 rounded-full border border-border bg-background px-4 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/50"
      >
        <span>{buttonText}</span>
        <ChevronDown className={cn("size-4 opacity-50 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 min-w-[220px] rounded-lg border border-border bg-background p-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-card",
                value === opt.value
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {value === opt.value && <Check className="size-3.5 text-primary" />}
              <span className={value === opt.value ? "ml-0" : "ml-5.5"}>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Search Input ────────────────────────────────────────── */

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4">
      <Search className="size-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search hooks"
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

/* ── Thumbnail ───────────────────────────────────────────── */

function Thumbnail({ hookText }: { hookText: string }) {
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

/* ── Types ──────────────────────────────────────────────── */

type SourceFilter = "all" | HookSource;
type SortOrder = "desc" | "asc";

const SOURCE_OPTIONS: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Kallaway", label: "Kallaway" },
  { value: "Noe", label: "Noe" },
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "desc", label: "High → Low" },
  { value: "asc", label: "Low → High" },
];

/* ── Main Content ────────────────────────────────────────── */

export function HooksContent({ hooks }: { hooks: ContentHook[] }) {
  const [selectedHook, setSelectedHook] = useState<ContentHook | null>(null);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [search, setSearch] = useState("");

  const filteredHooks = useMemo(() => {
    let result = hooks;

    // Source filter
    if (sourceFilter !== "all") {
      result = result.filter((h) => h.source === sourceFilter);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.hookText.toLowerCase().includes(q) ||
          h.hookType.toLowerCase().includes(q)
      );
    }

    // Sort by views
    result = [...result].sort((a, b) =>
      sortOrder === "desc" ? b.views - a.views : a.views - b.views
    );

    return result;
  }, [hooks, sourceFilter, sortOrder, search]);

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
        subtitle={`${filteredHooks.length} hooks`}
        filters={
          <>
            <DropdownSelect
              label="Source"
              value={sourceFilter}
              options={SOURCE_OPTIONS}
              onChange={setSourceFilter}
            />
            <DropdownSelect
              label="Views"
              value={sortOrder}
              options={SORT_OPTIONS}
              onChange={setSortOrder}
            />
            <div className="w-full sm:w-[212px]">
              <SearchInput value={search} onChange={setSearch} />
            </div>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="overflow-x-auto">
        <Table className="border-0 min-w-[600px]">
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
            {filteredHooks.map((hook) => {
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
      </div>

      {/* Slide Over Panel -- outside content padding */}
      <HookDetailPanel
        hook={selectedHook}
        onClose={() => setSelectedHook(null)}
      />
    </div>
  );
}
