"use client";

import { cn } from "@/lib/utils";
import { X, Copy, ExternalLink, Star } from "lucide-react";
import { type ContentHook, SOURCE_STYLES } from "../lib/mock-data";

interface HookDetailPanelProps {
  hook: ContentHook | null;
  onClose: () => void;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-semibold tracking-[1px] text-muted-foreground uppercase">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border" />;
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => copyToClipboard(text)}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
    >
      <Copy className="size-4" />
      Copy
    </button>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#2E2E2E] px-2 py-2 font-mono text-xs text-foreground">
      {children}
    </span>
  );
}

function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-[#2E2E2E] p-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn("font-mono text-2xl font-bold text-foreground", valueClassName)}
      >
        {value}
      </span>
    </div>
  );
}

export function HookDetailPanel({ hook, onClose }: HookDetailPanelProps) {
  const sourceStyle = hook ? SOURCE_STYLES[hook.source] : null;

  return (
    <>
      {/* Backdrop */}
      {hook && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[480px] flex-col",
          "border-l border-border bg-card",
          "transform transition-transform duration-300 ease-in-out",
          hook ? "translate-x-0" : "translate-x-full"
        )}
      >
        {hook && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 h-16 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="font-mono text-lg font-semibold text-foreground">
                  Hook Details
                </h2>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-2 font-mono text-sm",
                    sourceStyle?.bg,
                    sourceStyle?.text
                  )}
                >
                  <Star className="size-4 fill-current" />
                  {hook.source}
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted/50"
              >
                <X className="size-5 text-foreground" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-6 p-6">
                {/* Spoken Hook */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Spoken Hook</SectionLabel>
                  <p className="text-sm leading-[1.6] text-foreground">
                    {hook.spokenHook}
                  </p>
                  <CopyButton text={hook.spokenHook} />
                </section>

                <Divider />

                {/* Framework & Structure */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Framework &amp; Structure</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    <Pill>Framework: {hook.framework}</Pill>
                    <Pill>Structure: {hook.structure}</Pill>
                  </div>
                </section>

                <Divider />

                {/* Text Hook */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Text Hook</SectionLabel>
                  <p className="text-sm leading-[1.6] text-foreground">
                    {hook.textHook}
                  </p>
                  <CopyButton text={hook.textHook} />
                </section>

                <Divider />

                {/* Visual Hook */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Visual Hook</SectionLabel>
                  <p className="text-sm leading-[1.6] text-foreground">
                    {hook.visualHook}
                  </p>
                </section>

                <Divider />

                {/* Performance */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Performance</SectionLabel>
                  <div className="flex gap-4">
                    <StatCard
                      label="Views"
                      value={hook.views.toLocaleString("en-US")}
                    />
                    <StatCard
                      label="Performance Rank"
                      value={`#${hook.performanceRank}`}
                      valueClassName="text-primary"
                    />
                  </div>
                </section>

                <Divider />

                {/* Original Video */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Original Video</SectionLabel>
                  <a
                    href={hook.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[#2E2E2E] px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-[#3a3a3a]"
                  >
                    <ExternalLink className="size-4" />
                    {hook.videoPlatform}
                  </a>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
