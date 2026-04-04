"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Search, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import {
  PLATFORM_OPTIONS,
  CONTENT_TYPE_OPTIONS,
  SOURCE_OPTIONS,
  SORT_OPTIONS,
  type ContentIdea,
  type SortOption,
} from "../lib/mock-data";

/* ── Dropdown Select ───────────────────────────────────── */

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[] | { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );

  const displayLabel =
    value === ""
      ? label
      : `${label}: ${normalized.find((o) => o.value === value)?.label ?? value}`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex h-10 items-center justify-between gap-2.5 rounded-full border border-[#2E2E2E] bg-[#111111] px-4 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/50 whitespace-nowrap"
      >
        <span className="truncate max-w-[180px]">{displayLabel}</span>
        <ChevronDown className="size-4 opacity-50 shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden rounded-lg border border-[#2E2E2E] bg-[#111111] shadow-xl">
          {/* All option */}
          <button
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-[#1A1A1A] transition-colors"
          >
            {value === "" && <Check className="size-3.5 text-primary" />}
            <span className={value === "" ? "ml-0" : "ml-5.5"}>All</span>
          </button>
          {normalized.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-[#1A1A1A] transition-colors"
            >
              {value === opt.value && (
                <Check className="size-3.5 text-primary" />
              )}
              <span className={value === opt.value ? "ml-0" : "ml-5.5"}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Search Input ───────────────────────────────────────── */

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-10 items-center gap-1.5 rounded-full border border-[#2E2E2E] bg-[#111111] px-4">
      <Search className="size-4 text-muted-foreground shrink-0" />
      <input
        type="text"
        placeholder="Search ideas"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

/* ── Card Media ─────────────────────────────────────────── */

function CardMedia({ idea }: { idea: ContentIdea }) {
  const hue = (idea.title.length * 7) % 360;
  const gradient = `linear-gradient(135deg, hsl(${hue}, 40%, 20%), hsl(${hue + 40}, 50%, 15%))`;
  const [fallback, setFallback] = useState(false);

  if (idea.thumbnail && !fallback) {
    return (
      <img
        src={idea.thumbnail}
        alt={idea.title}
        className="h-full w-full object-cover"
        onError={() => setFallback(true)}
      />
    );
  }

  if (idea.videoUrl && !fallback) {
    return (
      <video
        src={idea.videoUrl}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onError={() => setFallback(true)}
      />
    );
  }

  return <div className="h-full w-full" style={{ background: gradient }} />;
}

/* ── Source Icon ────────────────────────────────────────── */

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
    >
      <title>Antigravity</title>
      <path
        clip-rule="evenodd"
        d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"
        fill="#D97757"
        fill-rule="evenodd"
      />
    </svg>
  );
}

function N8nIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
    >
      <title>n8n</title>
      <path
        clip-rule="evenodd"
        d="M24 8.4c0 1.325-1.102 2.4-2.462 2.4-1.146 0-2.11-.765-2.384-1.8h-3.436c-.602 0-1.115.424-1.214 1.003l-.101.592a2.38 2.38 0 01-.8 1.405c.412.354.704.844.8 1.405l.1.592A1.222 1.222 0 0015.719 15h.975c.273-1.035 1.237-1.8 2.384-1.8 1.36 0 2.461 1.075 2.461 2.4S20.436 18 19.078 18c-1.147 0-2.11-.765-2.384-1.8h-.975c-1.204 0-2.23-.848-2.428-2.005l-.101-.592a1.222 1.222 0 00-1.214-1.003H10.97c-.308.984-1.246 1.7-2.356 1.7-1.11 0-2.048-.716-2.355-1.7H4.817c-.308.984-1.246 1.7-2.355 1.7C1.102 14.3 0 13.225 0 11.9s1.102-2.4 2.462-2.4c1.183 0 2.172.815 2.408 1.9h1.337c.236-1.085 1.225-1.9 2.408-1.9 1.184 0 2.172.815 2.408 1.9h.952c.601 0 1.115-.424 1.213-1.003l.102-.592c.198-1.157 1.225-2.005 2.428-2.005h3.436c.274-1.035 1.238-1.8 2.384-1.8C22.898 6 24 7.075 24 8.4zm-1.23 0c0 .663-.552 1.2-1.232 1.2-.68 0-1.23-.537-1.23-1.2 0-.663.55-1.2 1.23-1.2.68 0 1.231.537 1.231 1.2zM2.461 13.1c.68 0 1.23-.537 1.23-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.231.537-1.231 1.2 0 .663.55 1.2 1.23 1.2zm6.153 0c.68 0 1.231-.537 1.231-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.231.537-1.231 1.2 0 .663.55 1.2 1.23 1.2zm10.462 3.7c.68 0 1.23-.537 1.23-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.23.537-1.23 1.2 0 .663.55 1.2 1.23 1.2z"
        fill="#EA4B71"
        fill-rule="evenodd"
      />
    </svg>
  );
}

const SOURCE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  CLAUDE: ClaudeIcon,
  AUTOMATION_N8N: N8nIcon,
};

function SourceBadge({ source }: { source: string }) {
  const Icon = SOURCE_ICONS[source];
  if (!Icon) return null;

  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-[#2E2E2E]">
      <Icon className="size-3.5 text-white" />
    </span>
  );
}

/* ── Idea Card ──────────────────────────────────────────── */

function IdeaCard({ idea }: { idea: ContentIdea }) {
  return (
    <Link
      href={`/ideas/${idea.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#2E2E2E] bg-[#1A1A1A] shadow-sm transition-colors hover:border-muted-foreground/30"
      style={{ height: 420 }}
    >
      {/* Thumbnail / Video / Gradient */}
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[#111]">
        <CardMedia idea={idea} />
        {/* Source + Platform Badges */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <SourceBadge source={idea.source} />
          <span className="rounded-full bg-[#2E2E2E] px-2.5 py-1 text-xs text-white">
            {idea.platform}
          </span>
        </div>
        {/* Outlier Badge */}
        <span className="absolute right-3 top-3 rounded-full bg-[#0053EA] px-2.5 py-1 font-mono text-xs font-bold text-white">
          ⚡ {idea.outlierScore}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col gap-2 px-4 py-3">
        <p className="line-clamp-2 text-sm font-medium text-white">
          {idea.title}
        </p>
        {/* Meta Row 1: handle · date */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#B8B9B6]">{idea.handle}</span>
          <span className="size-1 rounded-full bg-[#B8B9B6]" />
          <span className="text-xs text-[#B8B9B6]">{idea.date}</span>
        </div>
        {/* Meta Row 2: country · content type pill */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#B8B9B6]">
            {idea.countryFlag} {idea.country.slice(0, 2).toUpperCase()}
          </span>
          <span className="size-1 rounded-full bg-[#B8B9B6]" />
          <span className="rounded-full bg-[#2E2E2E] px-2 py-1 font-mono text-xs text-white">
            {idea.contentType}
          </span>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between border-t border-[#2E2E2E] px-4 py-3">
        <span className="text-[13px] text-[#B8B9B6]">{idea.views} 👁</span>
        <span className="rounded-full border border-[#2E2E2E] px-4 py-2.5 font-mono text-sm font-medium text-white transition-colors group-hover:bg-muted/50">
          View
        </span>
      </div>
    </Link>
  );
}

/* ── Main Content ───────────────────────────────────────── */

export function IdeasContent({ ideas }: { ideas: ContentIdea[] }) {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [platform, setPlatform] = useState("");
  const [contentType, setContentType] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("outlier");

  const filtered = useMemo(() => {
    let result = ideas;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.handle.toLowerCase().includes(q) ||
          i.topic.toLowerCase().includes(q),
      );
    }

    // Source filter
    if (source) {
      result = result.filter((i) => i.source === source);
    }

    // Platform filter (case-insensitive)
    if (platform) {
      result = result.filter(
        (i) => i.platform.toLowerCase() === platform.toLowerCase(),
      );
    }

    // Content type filter (case-insensitive)
    if (contentType) {
      result = result.filter(
        (i) => i.contentType.toLowerCase() === contentType.toLowerCase(),
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.rawViews - a.rawViews;
        case "likes":
          return b.rawLikes - a.rawLikes;
        case "comments":
          return b.rawComments - a.rawComments;
        case "outlier":
        default:
          return b.outlierScore - a.outlierScore;
      }
    });

    return result;
  }, [ideas, search, source, platform, contentType, sortBy]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Ideas"
        subtitle={`${filtered.length} videos`}
        filters={
          <>
            <FilterDropdown
              label="Source"
              value={source}
              options={SOURCE_OPTIONS}
              onChange={setSource}
            />
            <FilterDropdown
              label="Platform"
              value={platform}
              options={PLATFORM_OPTIONS}
              onChange={setPlatform}
            />
            <FilterDropdown
              label="Content Type"
              value={contentType}
              options={CONTENT_TYPE_OPTIONS}
              onChange={setContentType}
            />
            <FilterDropdown
              label="Sort by"
              value={sortBy}
              options={SORT_OPTIONS}
              onChange={(v) => setSortBy(v as SortOption)}
            />
            <div className="w-full sm:w-[200px]">
              <SearchInput value={search} onChange={setSearch} />
            </div>
          </>
        }
      />

      {/* Card Grid */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {filtered.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No ideas found for the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
