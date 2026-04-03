"use client";

import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MOCK_IDEAS, type ContentIdea } from "../lib/mock-data";

/* ── Filter Select (visual only) ────────────────────────── */

function FilterSelect({ label }: { label: string }) {
  return (
    <button className="flex h-10 items-center justify-between gap-2.5 rounded-full border border-[#2E2E2E] bg-[#111111] px-4 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/50">
      <span>{label}</span>
      <ChevronDown className="size-4 opacity-50" />
    </button>
  );
}

/* ── Search Input ───────────────────────────────────────── */

function SearchInput() {
  return (
    <div className="flex h-10 items-center gap-1.5 rounded-full border border-[#2E2E2E] bg-[#111111] px-4">
      <Search className="size-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search ideas"
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

/* ── Idea Card ──────────────────────────────────────────── */

function IdeaCard({ idea }: { idea: ContentIdea }) {
  const hue = (idea.title.length * 7) % 360;

  return (
    <Link
      href={`/ideas/${idea.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#2E2E2E] bg-[#1A1A1A] shadow-sm transition-colors hover:border-muted-foreground/30"
      style={{ height: 420 }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-[200px] w-full shrink-0"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 40%, 20%), hsl(${hue + 40}, 50%, 15%))`,
        }}
      >
        {/* Platform Badge */}
        <span className="absolute bottom-3 left-3 rounded-full bg-[#2E2E2E] px-2.5 py-1 text-xs text-white">
          {idea.platform}
        </span>
        {/* Outlier Badge */}
        <span className="absolute right-3 top-3 rounded-full bg-[#FF8400] px-2.5 py-1 font-mono text-xs font-bold text-[#111111]">
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

export function IdeasContent() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Ideas"
        subtitle={`${MOCK_IDEAS.length} videos`}
        filters={
          <>
            <div className="w-[177px]">
              <SearchInput />
            </div>
            <FilterSelect label="Platform" />
            <FilterSelect label="Content Type" />
            <FilterSelect label="Sort by: Outlier Score" />
          </>
        }
      />

      {/* Card Grid */}
      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-3 gap-4">
          {MOCK_IDEAS.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </div>
  );
}
