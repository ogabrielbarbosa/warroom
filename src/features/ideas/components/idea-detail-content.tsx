"use client";

import Link from "next/link";
import { ChevronRight, ExternalLink, Play } from "lucide-react";
import { type ContentIdea } from "../lib/mock-data";

/* ── Section Label ──────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-semibold tracking-[1px] text-[#B8B9B6] uppercase">
      {children}
    </span>
  );
}

/* ── Divider ────────────────────────────────────────────── */

function Divider() {
  return <div className="h-px w-full bg-[#2E2E2E]" />;
}

/* ── Stat Card ──────────────────────────────────────────── */

function StatCard({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-[#2E2E2E] p-4">
      <span className="text-[11px] text-[#B8B9B6]">{label}</span>
      <span
        className="text-xl font-bold"
        style={{ color: valueColor ?? "#FFFFFF" }}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Info Field ─────────────────────────────────────────── */

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-xs text-[#B8B9B6]">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

/* ── Pill ───────────────────────────────────────────────── */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#2E2E2E] px-2 py-2 font-mono text-sm text-white">
      {children}
    </span>
  );
}

/* ── Text Block ─────────────────────────────────────────── */

function TextBlock({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-[#B8B9B6]">{label}</span>
      <p
        className="text-sm leading-[1.6]"
        style={{ color: muted ? "#B8B9B6" : "#FFFFFF" }}
      >
        {value}
      </p>
    </div>
  );
}

/* ── Breadcrumb ─────────────────────────────────────────── */

function Breadcrumb({ ideaTitle }: { ideaTitle: string }) {
  return (
    <div className="flex items-center gap-1">
      <Link
        href="/ideas"
        className="text-sm text-[#B8B9B6] transition-colors hover:text-white"
      >
        Content
      </Link>
      <ChevronRight className="size-3.5 text-[#B8B9B6]" />
      <Link
        href="/ideas"
        className="text-sm text-[#B8B9B6] transition-colors hover:text-white"
      >
        Ideas
      </Link>
      <ChevronRight className="size-3.5 text-[#B8B9B6]" />
      <span className="text-sm text-white">{ideaTitle}</span>
    </div>
  );
}

/* ── Main Detail Content ────────────────────────────────── */

export function IdeaDetailContent({ idea }: { idea: ContentIdea }) {
  const hue = (idea.title.length * 7) % 360;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Top Bar with Breadcrumb */}
      <div className="flex h-16 shrink-0 items-center border-b border-[#2E2E2E] px-8">
        <Breadcrumb ideaTitle={idea.title} />
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column — Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-8 p-8">
            {/* Performance Section */}
            <section className="flex flex-col gap-4">
              <SectionLabel>Performance</SectionLabel>
              <div className="flex gap-3">
                <StatCard label="Views" value={idea.views} />
                <StatCard label="Reach" value={idea.reach} />
                <StatCard label="Likes" value={idea.likes} />
                <StatCard label="Comments" value={idea.comments} />
              </div>
              <div className="flex gap-3">
                <StatCard label="Shares" value={idea.shares} />
                <StatCard label="Saves" value={idea.saves} />
                <StatCard label="Plays" value={idea.plays} />
                <StatCard label="Replays" value={idea.replays} />
              </div>
              <div className="flex gap-3">
                <StatCard label="Total Watch Time" value={idea.totalWatchTime} />
                <StatCard label="Avg Watch Time" value={idea.avgWatchTime} />
                <StatCard label="Total Interactions" value={idea.totalInteractions} />
                <StatCard
                  label="Outlier Score"
                  value={String(idea.outlierScore)}
                  valueColor="#FF8400"
                />
              </div>
            </section>

            <Divider />

            {/* Content Info Section */}
            <section className="flex flex-col gap-4">
              <SectionLabel>Content Info</SectionLabel>
              <div className="flex gap-6">
                <InfoField label="Handle" value={idea.handle} />
                <InfoField label="Platform" value={idea.platform} />
              </div>
              <div className="flex gap-6">
                <InfoField label="Post Date" value={idea.date} />
                <InfoField label="Duration" value={idea.duration} />
              </div>
              <div className="flex gap-6">
                <InfoField
                  label="Country"
                  value={`${idea.countryFlag} ${idea.country}`}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-xs text-[#B8B9B6]">Content Type</span>
                  <Pill>{idea.contentType}</Pill>
                </div>
              </div>
              <div className="flex gap-6">
                <InfoField label="Visual Format" value={idea.visualFormat} />
                <InfoField label="Topic" value={idea.topic} />
              </div>
              <TextBlock
                label="Topic Summary"
                value={idea.topicSummary}
                muted
              />
            </section>

            <Divider />

            {/* Hook Analysis Section */}
            <section className="flex flex-col gap-4">
              <SectionLabel>Hook Analysis</SectionLabel>
              <TextBlock label="Spoken Hook" value={idea.spokenHook} />
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#B8B9B6]">Hook Framework</span>
                  <Pill>{idea.hookFramework}</Pill>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#B8B9B6]">Hook Structure</span>
                  <Pill>{idea.hookStructure}</Pill>
                </div>
              </div>
              <TextBlock label="Text Hook" value={idea.textHook} />
              <TextBlock label="Visual Hook" value={idea.visualHook} />
              <TextBlock label="Audio Hook" value={idea.audioHook} />
            </section>

            <Divider />

            {/* Content Structure Section */}
            <section className="flex flex-col gap-4">
              <SectionLabel>Content Structure</SectionLabel>
              <TextBlock
                label="Content Structure"
                value={idea.contentStructure}
              />
              <TextBlock label="Call to Action" value={idea.cta} />
              <TextBlock label="Caption" value={idea.caption} muted />
              <div className="flex items-center gap-2">
                <ChevronRight className="size-4 text-[#B8B9B6]" />
                <span className="text-[13px] font-medium text-[#B8B9B6]">
                  Show transcript
                </span>
              </div>
            </section>

            <Divider />

            {/* Meta Section */}
            <section className="flex flex-col gap-4">
              <SectionLabel>Meta</SectionLabel>
              <div className="flex gap-6">
                <InfoField label="Source" value={idea.source} />
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-xs text-[#B8B9B6]">Status</span>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#B6FFCE]" />
                    <span className="text-sm font-medium text-[#B6FFCE]">
                      {idea.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <InfoField label="Analyzed At" value={idea.analyzedAt} />
                <InfoField
                  label="Metrics Updated At"
                  value={idea.metricsUpdatedAt}
                />
              </div>
              <div className="flex gap-6">
                <InfoField label="Created At" value={idea.createdAt} />
              </div>
            </section>
          </div>
        </div>

        {/* Right Column — Video Preview & Quick Info */}
        <div className="w-[420px] shrink-0 overflow-y-auto border-l border-[#2E2E2E] bg-[#1A1A1A]">
          <div className="flex flex-col gap-6 p-6">
            {/* Original Video */}
            <section className="flex flex-col gap-3">
              <SectionLabel>Original Video</SectionLabel>
              <a
                href={idea.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#2E2E2E] px-3 py-2 text-[13px] font-medium text-[#FF8400] transition-colors hover:bg-[#3a3a3a]"
              >
                <ExternalLink className="size-4" />
                Open on {idea.platform}
              </a>
            </section>

            <Divider />

            {/* Spoken Hook */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Spoken Hook</SectionLabel>
              <p className="text-[15px] leading-[1.7] text-white">
                {idea.spokenHook}
              </p>
            </section>

            <Divider />

            {/* Video Preview */}
            <section className="flex flex-col gap-3">
              <SectionLabel>Video Preview</SectionLabel>
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  height: 662,
                  background: `linear-gradient(135deg, hsl(${hue}, 40%, 25%), hsl(${hue + 40}, 50%, 18%))`,
                }}
              >
                {/* Play Button */}
                <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70">
                  <Play className="size-6 text-white" fill="white" />
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-6 left-8 rounded-lg bg-black/70 px-2 py-1">
                  <span className="text-xs font-semibold text-white">
                    {idea.duration}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
