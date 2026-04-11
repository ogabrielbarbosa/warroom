"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Search, Check, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] max-h-[252px] overflow-y-auto rounded-lg border border-[#2E2E2E] bg-[#111111] shadow-xl">
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

/* ── Source Icons ───────────────────────────────────────── */

function ClaudeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em">
      <path clipRule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fill="#D97757" fillRule="evenodd" />
    </svg>
  );
}

function N8nIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em">
      <path clipRule="evenodd" d="M24 8.4c0 1.325-1.102 2.4-2.462 2.4-1.146 0-2.11-.765-2.384-1.8h-3.436c-.602 0-1.115.424-1.214 1.003l-.101.592a2.38 2.38 0 01-.8 1.405c.412.354.704.844.8 1.405l.1.592A1.222 1.222 0 0015.719 15h.975c.273-1.035 1.237-1.8 2.384-1.8 1.36 0 2.461 1.075 2.461 2.4S20.436 18 19.078 18c-1.147 0-2.11-.765-2.384-1.8h-.975c-1.204 0-2.23-.848-2.428-2.005l-.101-.592a1.222 1.222 0 00-1.214-1.003H10.97c-.308.984-1.246 1.7-2.356 1.7-1.11 0-2.048-.716-2.355-1.7H4.817c-.308.984-1.246 1.7-2.355 1.7C1.102 14.3 0 13.225 0 11.9s1.102-2.4 2.462-2.4c1.183 0 2.172.815 2.408 1.9h1.337c.236-1.085 1.225-1.9 2.408-1.9 1.184 0 2.172.815 2.408 1.9h.952c.601 0 1.115-.424 1.213-1.003l.102-.592c.198-1.157 1.225-2.005 2.428-2.005h3.436c.274-1.035 1.238-1.8 2.384-1.8C22.898 6 24 7.075 24 8.4zm-1.23 0c0 .663-.552 1.2-1.232 1.2-.68 0-1.23-.537-1.23-1.2 0-.663.55-1.2 1.23-1.2.68 0 1.231.537 1.231 1.2zM2.461 13.1c.68 0 1.23-.537 1.23-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.231.537-1.231 1.2 0 .663.55 1.2 1.23 1.2zm6.153 0c.68 0 1.231-.537 1.231-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.231.537-1.231 1.2 0 .663.55 1.2 1.23 1.2zm10.462 3.7c.68 0 1.23-.537 1.23-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.23.537-1.23 1.2 0 .663.55 1.2 1.23 1.2z" fill="#EA4B71" fillRule="evenodd" />
    </svg>
  );
}

const SOURCE_ICONS: Record<string, React.ComponentType> = {
  CLAUDE: ClaudeIcon,
  AUTOMATION_N8N: N8nIcon,
};

function SourceIcon({ source }: { source: string }) {
  const Icon = SOURCE_ICONS[source];
  if (!Icon) return <span className="size-5" />;
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-[#2E2E2E]">
      <Icon />
    </span>
  );
}

/* ── Main Content ───────────────────────────────────────── */

export function IdeasContent({ ideas }: { ideas: ContentIdea[] }) {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [platform, setPlatform] = useState("");
  const [contentType, setContentType] = useState("");
  const [account, setAccount] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("outlier");

  const accountOptions = useMemo(() => {
    const handles = [...new Set(ideas.map((i) => i.handle).filter(Boolean))].sort();
    return handles.map((h) => ({ value: h, label: h }));
  }, [ideas]);

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

    // Account filter
    if (account) {
      result = result.filter((i) => i.handle === account);
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
  }, [ideas, search, source, platform, contentType, account, sortBy]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Ideas"
        subtitle={`${filtered.length} videos`}
        filters={
          <>
            <FilterDropdown
              label="Account"
              value={account}
              options={accountOptions}
              onChange={setAccount}
            />
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

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No ideas found for the selected filters.
          </div>
        ) : (
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-[#111111]">
              <tr className="border-b border-[#2E2E2E] text-left text-xs font-medium text-muted-foreground">
                <th className="w-10 px-4 py-3" />
                <th className="px-4 py-3 font-medium">Content</th>
                <th className="px-4 py-3 font-medium">Account</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">
                  <button
                    onClick={() => setSortBy("outlier")}
                    className={cn("inline-flex items-center gap-1 transition-colors hover:text-white", sortBy === "outlier" && "text-[#FF8400]")}
                  >
                    Outlier <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  <button
                    onClick={() => setSortBy("views")}
                    className={cn("inline-flex items-center gap-1 transition-colors hover:text-white", sortBy === "views" && "text-[#FF8400]")}
                  >
                    Views <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  <button
                    onClick={() => setSortBy("likes")}
                    className={cn("inline-flex items-center gap-1 transition-colors hover:text-white", sortBy === "likes" && "text-[#FF8400]")}
                  >
                    Likes <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  <button
                    onClick={() => setSortBy("comments")}
                    className={cn("inline-flex items-center gap-1 transition-colors hover:text-white", sortBy === "comments" && "text-[#FF8400]")}
                  >
                    Comments <ArrowUpDown className="size-3" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((idea) => (
                <tr
                  key={idea.id}
                  className="border-b border-[#2E2E2E]/50 transition-colors hover:bg-[#1A1A1A]"
                >
                  {/* Source Icon */}
                  <td className="w-10 px-4 py-3">
                    <SourceIcon source={idea.source} />
                  </td>
                  {/* Content: title + date */}
                  <td className="max-w-[320px] overflow-hidden px-4 py-3">
                    <Link href={`/ideas/${idea.id}`} className="block truncate font-medium text-white hover:underline">{idea.title}</Link>
                    <p className="truncate text-xs text-muted-foreground">{idea.date}</p>
                  </td>
                  {/* Account */}
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span>{idea.countryFlag}</span>
                      <span className="truncate">{idea.handle}</span>
                    </div>
                  </td>
                  {/* Content Type */}
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#2E2E2E] px-2.5 py-1 font-mono text-xs text-white">
                      {idea.contentType}
                    </span>
                  </td>
                  {/* Outlier */}
                  <td className="px-4 py-3 text-right">
                    <span className="inline-block rounded-full bg-[#FF8400] px-2.5 py-1 font-mono text-xs font-bold text-[#111111]">
                      {idea.outlierScore}
                    </span>
                  </td>
                  {/* Views */}
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                    {idea.views}
                  </td>
                  {/* Likes */}
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                    {idea.likes}
                  </td>
                  {/* Comments */}
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                    {idea.comments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
