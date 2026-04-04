"use client";

import { cn } from "@/lib/utils";
import { X, ExternalLink, Play } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import type { PipelineCard } from "../lib/mock-data";
import { STATUS_COLORS, STATUS_BG } from "../lib/mock-data";

interface PipelineCardModalProps {
  card: PipelineCard | null;
  onClose: () => void;
}

/* ── Section Label ──────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

/* ── Field Row ──────────────────────────────────────────── */

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

/* ── Detail Row ─────────────────────────────────────────── */

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

export function PipelineCardModal({ card, onClose }: PipelineCardModalProps) {
  if (!card) return null;

  const statusColor = STATUS_COLORS[card.status];
  const statusBg = STATUS_BG[card.status];

  return (
    <Dialog open={!!card} onClose={onClose} className="mx-4 max-w-[860px] rounded-2xl sm:mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-xs font-semibold",
              statusBg
            )}
            style={{ color: statusColor }}
          >
            {card.status}
          </span>
          <h2 className="font-mono text-lg font-bold text-foreground">
            {card.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 font-mono text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Edit
          </button>
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
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-7 sm:overflow-y-auto sm:border-r border-border p-4 sm:p-6">
          {/* Content Brief */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Content Brief</SectionLabel>
            <div className="flex flex-col gap-4">
              <FieldRow label="Topic">{card.contentAngle}</FieldRow>
              <FieldRow label="Content Angle">{card.contentAngle}</FieldRow>
              <FieldRow label="Hook">
                <div className="rounded-lg bg-secondary p-3 font-mono text-sm text-foreground">
                  {card.hookText}
                </div>
              </FieldRow>
              {card.material && (
                <FieldRow label="Material & Research">
                  {card.material}
                </FieldRow>
              )}
            </div>
          </div>

          {/* Production */}
          {(card.onScreenText || card.recordingInstructions) && (
            <div className="flex flex-col gap-3">
              <SectionLabel>Production</SectionLabel>
              <div className="flex flex-col gap-4">
                <FieldRow label="Visual Format">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px]",
                      "bg-secondary text-muted-foreground"
                    )}
                  >
                    {card.format}
                  </span>
                </FieldRow>
                {card.onScreenText && (
                  <FieldRow label="On Screen Text">
                    {card.onScreenText}
                  </FieldRow>
                )}
                {card.recordingInstructions && (
                  <FieldRow label="Recording Instructions">
                    <p className="text-sm text-muted-foreground">
                      {card.recordingInstructions}
                    </p>
                  </FieldRow>
                )}
              </div>
            </div>
          )}

          {/* Script */}
          {card.script && (
            <div className="flex flex-col gap-3">
              <SectionLabel>Script</SectionLabel>
              <div className="max-h-[180px] overflow-y-auto rounded-lg border border-border bg-background p-3">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-foreground">
                  {card.script}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex w-full shrink-0 flex-col gap-7 border-t border-border sm:w-[340px] sm:border-t-0 sm:overflow-y-auto p-4 sm:p-6">
          {/* Details */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Details</SectionLabel>
            <div className="flex flex-col gap-3">
              <DetailRow label="Status">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-mono text-[13px]"
                  )}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: statusColor }}
                  />
                  <span className="text-foreground">{card.status}</span>
                </span>
              </DetailRow>
              <DetailRow label="Visual Format">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-mono text-[13px] text-foreground">
                  {card.format}
                </span>
              </DetailRow>
              <DetailRow label="Created At">
                <span className="font-mono text-[13px] text-foreground">
                  {card.date}, 2026
                </span>
              </DetailRow>
            </div>
          </div>

          {/* Reference Video */}
          {card.referenceVideo && (
            <div className="flex flex-col gap-3">
              <SectionLabel>Reference Video</SectionLabel>
              <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background p-2.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <Play className="size-5 text-muted-foreground" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-[13px] text-foreground">
                    {card.referenceVideo.hook}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {card.referenceVideo.creator} &middot;{" "}
                    {card.referenceVideo.views}
                  </span>
                </div>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
