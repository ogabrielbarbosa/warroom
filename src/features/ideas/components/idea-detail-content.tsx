"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Copy,
  Check,
  Sparkles,
  X,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { type ContentIdea, type IdeaSuggestion } from "../lib/mock-data";

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
    <div className="flex items-center gap-1 min-w-0">
      <Link
        href="/ideas"
        className="shrink-0 text-sm text-[#B8B9B6] transition-colors hover:text-white"
      >
        Content
      </Link>
      <ChevronRight className="size-3.5 shrink-0 text-[#B8B9B6]" />
      <Link
        href="/ideas"
        className="shrink-0 text-sm text-[#B8B9B6] transition-colors hover:text-white"
      >
        Ideas
      </Link>
      <ChevronRight className="size-3.5 shrink-0 text-[#B8B9B6]" />
      <span className="truncate text-sm text-white">{ideaTitle}</span>
    </div>
  );
}

/* ── Video Preview ──────────────────────────────────────── */

function getVideoEmbedUrl(
  url: string,
): { type: "embed" | "direct"; src: string } | null {
  if (!url) return null;

  try {
    const u = new URL(url);

    // Instagram reel or post
    if (u.hostname.includes("instagram.com")) {
      // /reel/XXX/ or /p/XXX/ → /reel/XXX/embed/ or /p/XXX/embed/
      const clean = u.pathname.replace(/\/+$/, "");
      return { type: "embed", src: `https://www.instagram.com${clean}/embed/` };
    }

    // YouTube
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      let videoId: string | null = null;
      if (u.hostname.includes("youtu.be")) {
        videoId = u.pathname.slice(1);
      } else {
        videoId = u.searchParams.get("v");
      }
      if (videoId) {
        return {
          type: "embed",
          src: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    // TikTok
    if (u.hostname.includes("tiktok.com")) {
      const match = u.pathname.match(/\/video\/(\d+)/);
      if (match) {
        return {
          type: "embed",
          src: `https://www.tiktok.com/embed/v2/${match[1]}`,
        };
      }
      // Fallback: use the full URL in an embed
      return { type: "embed", src: url };
    }

    // Direct video file
    if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(u.pathname)) {
      return { type: "direct", src: url };
    }
  } catch {
    // invalid URL
  }

  return null;
}

function VideoPreview({ url, duration }: { url: string; duration: string }) {
  const embed = getVideoEmbedUrl(url);

  if (embed?.type === "embed") {
    return (
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ height: "clamp(400px, 60vh, 662px)" }}
      >
        <iframe
          src={embed.src}
          className="h-full w-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (embed?.type === "direct") {
    return (
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ height: "clamp(400px, 60vh, 662px)" }}
      >
        <video
          src={embed.src}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full rounded-2xl bg-black object-contain"
        />
      </div>
    );
  }

  // Fallback: gradient placeholder with link
  const hue = (url.length * 7) % 360;
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        height: 662,
        background: `linear-gradient(135deg, hsl(${hue}, 40%, 25%), hsl(${hue + 40}, 50%, 18%))`,
      }}
    >
      <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70">
        <Play className="size-6 text-white" fill="white" />
      </div>
      <div className="absolute bottom-6 left-8 rounded-lg bg-black/70 px-2 py-1">
        <span className="text-xs font-semibold text-white">{duration}</span>
      </div>
    </div>
  );
}

/* ── Copy Button with feedback ─────────────────────────── */

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex size-7 items-center justify-center rounded-md text-[#B8B9B6] transition-colors hover:bg-[#2E2E2E] hover:text-white"
      title="Copy"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}

/* ── Suggestion Mini Card (right column) ───────────────── */

function SuggestionMiniCard({
  idea,
  onClick,
}: {
  idea: IdeaSuggestion;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-[260px] shrink-0 flex-col gap-2 rounded-xl border border-[#2E2E2E] bg-[#111] p-4 text-left transition-colors hover:border-[#0053EA]/50 hover:bg-[#1A1A1A]"
    >
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-[#0053EA] font-mono text-[10px] font-bold text-white">
          {idea.idea_number}
        </span>
        <span className="rounded-full bg-[#2E2E2E] px-2 py-0.5 font-mono text-[10px] text-white">
          {idea.content_type}
        </span>
      </div>
      <p className="line-clamp-2 text-[13px] leading-[1.5] text-white">
        &ldquo;{idea.hook}&rdquo;
      </p>
      <span className="text-[11px] text-[#B8B9B6]">{idea.hook_framework}</span>
    </button>
  );
}

/* ── Idea Suggestion Modal ─────────────────────────────── */

function IdeaSuggestionModal({
  ideas,
  metadata,
  activeIndex,
  onClose,
  onNavigate,
}: {
  ideas: IdeaSuggestion[];
  metadata: NonNullable<ContentIdea["metadata"]>;
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const idea = ideas[activeIndex];
  if (!idea) return null;

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < ideas.length - 1;

  return (
    <Dialog
      open
      onClose={onClose}
      className="mx-4 max-w-[860px] rounded-2xl sm:mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#0053EA] font-mono text-xs font-bold text-white">
            {idea.idea_number}
          </span>
          <span className="rounded-full bg-[#2E2E2E] px-2.5 py-1 font-mono text-xs text-white">
            {idea.content_type}
          </span>
          <span className="rounded-full bg-[#2E2E2E] px-2.5 py-1 font-mono text-xs text-[#B8B9B6]">
            {idea.hook_framework}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => hasPrev && onNavigate(activeIndex - 1)}
              disabled={!hasPrev}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg border border-border transition-colors",
                hasPrev
                  ? "text-foreground hover:bg-secondary"
                  : "text-muted-foreground/30 cursor-not-allowed",
              )}
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="font-mono text-xs text-muted-foreground px-1">
              {activeIndex + 1}/{ideas.length}
            </span>
            <button
              onClick={() => hasNext && onNavigate(activeIndex + 1)}
              disabled={!hasNext}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg border border-border transition-colors",
                hasNext
                  ? "text-foreground hover:bg-secondary"
                  : "text-muted-foreground/30 cursor-not-allowed",
              )}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex max-h-[70vh] flex-col overflow-y-auto sm:max-h-[576px] sm:flex-row sm:overflow-hidden">
        {/* Left Column — Script & Details */}
        <div className="flex flex-1 flex-col gap-7 sm:overflow-y-auto sm:border-r border-border p-4 sm:p-6">
          {/* Hook */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <SectionLabel>Hook</SectionLabel>
              <CopyBtn text={idea.hook} />
            </div>
            <p className="text-[15px] font-medium leading-[1.6] text-white">
              &ldquo;{idea.hook}&rdquo;
            </p>
          </div>

          {/* Script */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <SectionLabel>Script</SectionLabel>
              <CopyBtn
                text={`${idea.script.beat_1}\n${idea.script.beat_2}\n${idea.script.beat_3}`}
              />
            </div>
            <div className="flex flex-col gap-2 rounded-xl bg-[#111] p-4">
              <p className="text-sm leading-[1.7] text-white">
                <span className="font-mono text-xs text-[#0053EA]">1.</span>{" "}
                {idea.script.beat_1}
              </p>
              <p className="text-sm leading-[1.7] text-white">
                <span className="font-mono text-xs text-[#0053EA]">2.</span>{" "}
                {idea.script.beat_2}
              </p>
              <p className="text-sm leading-[1.7] text-white">
                <span className="font-mono text-xs text-[#0053EA]">3.</span>{" "}
                {idea.script.beat_3}
              </p>
            </div>
          </div>

          {/* Situação */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Situação</SectionLabel>
            <p className="text-sm leading-[1.6] text-white">
              {idea.gabriel_situation}
            </p>
          </div>

          {/* Por que funciona */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Por que funciona</SectionLabel>
            <p className="text-sm leading-[1.6] text-[#B8B9B6]">
              {idea.why_it_works}
            </p>
          </div>
        </div>

        {/* Right Column — Production & Reference */}
        <div className="flex w-full shrink-0 flex-col gap-7 border-t border-border sm:w-[320px] sm:border-t-0 sm:overflow-y-auto p-4 sm:p-6">
          {/* Como gravar */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Como gravar</SectionLabel>
            <p className="text-sm leading-[1.6] text-[#B8B9B6]">
              {idea.how_to_record}
            </p>
          </div>

          {/* Referência */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Referência</SectionLabel>
            <p className="text-sm leading-[1.6] text-[#B8B9B6]">
              {idea.reference_hook_views}
            </p>
          </div>

          {/* Original Post */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Post Original</SectionLabel>
            <div className="flex flex-col gap-2 rounded-xl bg-[#111] p-3">
              <p className="text-[13px] leading-[1.5] text-white">
                &ldquo;{metadata.original_post.hook}&rdquo;
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#B8B9B6]">
                  {metadata.original_post.handle}
                </span>
                <span className="size-1 rounded-full bg-[#B8B9B6]" />
                <span className="text-[11px] text-[#B8B9B6]">
                  {metadata.original_post.views.toLocaleString("pt-BR")} views
                </span>
              </div>
            </div>
          </div>

          {/* Arc Original */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <SectionLabel>Arc Original</SectionLabel>
              <span className="rounded-full bg-[#2E2E2E] px-2 py-0.5 font-mono text-[10px] text-[#B8B9B6]">
                {metadata.original_arc.emotional_mechanism}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 rounded-xl bg-[#111] p-3">
              <p className="text-[13px] leading-[1.5] text-[#B8B9B6]">
                <span className="font-mono text-[10px] text-[#0053EA]">1.</span>{" "}
                {metadata.original_arc.beat_1}
              </p>
              <p className="text-[13px] leading-[1.5] text-[#B8B9B6]">
                <span className="font-mono text-[10px] text-[#0053EA]">2.</span>{" "}
                {metadata.original_arc.beat_2}
              </p>
              <p className="text-[13px] leading-[1.5] text-[#B8B9B6]">
                <span className="font-mono text-[10px] text-[#0053EA]">3.</span>{" "}
                {metadata.original_arc.beat_3}
              </p>
            </div>
          </div>

          {/* Análise */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Análise</SectionLabel>
            <p className="text-[13px] leading-[1.6] text-[#B8B9B6]">
              {metadata.analysis_summary}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/* ── Main Detail Content ────────────────────────────────── */

export function IdeaDetailContent({ idea }: { idea: ContentIdea }) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState<number | null>(null);

  const hasMetadata =
    idea.metadata && idea.metadata.ideas && idea.metadata.ideas.length > 0;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Top Bar with Breadcrumb */}
      <div className="flex h-14 shrink-0 items-center border-b border-[#2E2E2E] px-4 md:h-16 md:px-8">
        <Breadcrumb ideaTitle={idea.title} />
      </div>

      {/* Two Column Layout — stacks on mobile */}
      <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        {/* Left Column — Scrollable Content */}
        <div className="flex-1 lg:overflow-y-auto">
          <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
            {/* Performance Section */}
            <section className="flex flex-col gap-3 md:gap-4">
              <SectionLabel>Performance</SectionLabel>
              <div className="grid grid-cols-2 gap-2 md:flex md:gap-3">
                <StatCard label="Views" value={idea.views} />
                <StatCard label="Reach" value={idea.reach} />
                <StatCard label="Likes" value={idea.likes} />
                <StatCard label="Comments" value={idea.comments} />
              </div>
              <div className="grid grid-cols-2 gap-2 md:flex md:gap-3">
                <StatCard label="Shares" value={idea.shares} />
                <StatCard label="Saves" value={idea.saves} />
                <StatCard label="Plays" value={idea.plays} />
                <StatCard label="Replays" value={idea.replays} />
              </div>
              <div className="grid grid-cols-2 gap-2 md:flex md:gap-3">
                <StatCard
                  label="Total Watch Time"
                  value={idea.totalWatchTime}
                />
                <StatCard label="Avg Watch Time" value={idea.avgWatchTime} />
                <StatCard
                  label="Total Interactions"
                  value={idea.totalInteractions}
                />
                <StatCard
                  label="Outlier Score"
                  value={String(idea.outlierScore)}
                  valueColor="#0053EA"
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
              {idea.transcript && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="flex w-fit items-center gap-2 transition-colors hover:text-white"
                  >
                    {showTranscript ? (
                      <ChevronDown className="size-4 text-[#B8B9B6]" />
                    ) : (
                      <ChevronRight className="size-4 text-[#B8B9B6]" />
                    )}
                    <span className="text-[13px] font-medium text-[#B8B9B6]">
                      {showTranscript ? "Hide transcript" : "Show transcript"}
                    </span>
                  </button>
                  {showTranscript && (
                    <p className="whitespace-pre-wrap text-sm leading-[1.7] text-[#B8B9B6]">
                      {idea.transcript}
                    </p>
                  )}
                </div>
              )}
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
        <div className="w-full shrink-0 border-t border-[#2E2E2E] bg-[#1A1A1A] lg:w-[420px] lg:border-l lg:border-t-0 lg:overflow-y-auto">
          <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Original Video */}
            <section className="flex flex-col gap-3">
              <SectionLabel>Original Video</SectionLabel>
              <a
                href={idea.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1E2230] px-3 py-2 text-[13px] font-medium text-[#0053EA] transition-colors hover:bg-[#2A3040]"
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
              <VideoPreview url={idea.videoUrl} duration={idea.duration} />
            </section>

            <Divider />

            {/* AI Suggestions */}
            {hasMetadata && (
              <>
                <section className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <SectionLabel>Sugestões de Conteúdo</SectionLabel>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {idea.metadata!.ideas.map((s, i) => (
                      <SuggestionMiniCard
                        key={s.idea_number}
                        idea={s}
                        onClick={() => setSuggestionIndex(i)}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>

        {/* Suggestion Modal */}
        {hasMetadata && suggestionIndex !== null && (
          <IdeaSuggestionModal
            ideas={idea.metadata!.ideas}
            metadata={idea.metadata!}
            activeIndex={suggestionIndex}
            onClose={() => setSuggestionIndex(null)}
            onNavigate={setSuggestionIndex}
          />
        )}
      </div>
    </div>
  );
}
