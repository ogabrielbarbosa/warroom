"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { ContentVideo } from "../lib/mock-data";

interface VideoDetailPanelProps {
  video: ContentVideo | null;
  onClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-semibold tracking-[0.5px] text-muted-foreground uppercase">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border" />;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-0.5 rounded-lg bg-muted p-3">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="font-mono text-xl font-bold text-foreground">
        {value}
      </span>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-0.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-[13px] text-foreground">{value}</span>
    </div>
  );
}

export function VideoDetailPanel({ video, onClose }: VideoDetailPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {video && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full flex-col sm:w-[480px]",
          "border-l border-border bg-card",
          "transform transition-transform duration-300 ease-in-out",
          video ? "translate-x-0" : "translate-x-full"
        )}
      >
        {video && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-border p-6 shrink-0">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h2 className="truncate text-sm font-semibold leading-snug text-foreground">
                  {video.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>@ogabarbosa</span>
                  <span>·</span>
                  <span>{video.date}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Performance Over Time */}
              <div className="flex flex-col gap-4 p-6">
                <SectionLabel>Performance Over Time</SectionLabel>
                <div className="flex h-[180px] items-center justify-center rounded-lg border border-dashed border-border">
                  <span className="text-xs text-muted-foreground">
                    Chart placeholder
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Mar 1</span>
                  <span>Mar 8</span>
                  <span>Mar 15</span>
                  <span>Mar 22</span>
                  <span>Mar 29</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-0.5 w-4 bg-primary" />
                    <span className="text-xs text-muted-foreground">Views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-0.5 w-4 bg-blue-400" />
                    <span className="text-xs text-muted-foreground">Likes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-0.5 w-4 bg-emerald-400" />
                    <span className="text-xs text-muted-foreground">Saves</span>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Totals */}
              <div className="flex flex-col gap-3 p-6">
                <SectionLabel>Totals</SectionLabel>
                <div className="flex gap-3">
                  <StatCard label="Views" value={video.viewsFormatted} />
                  <StatCard label="Likes" value={video.likesFormatted} />
                </div>
                <div className="flex gap-3">
                  <StatCard label="Saves" value={video.savesFormatted} />
                  <StatCard label="Comments" value={video.commentsFormatted} />
                </div>
              </div>

              <Divider />

              {/* Watch Time */}
              <div className="flex flex-col gap-3 p-6">
                <SectionLabel>Watch Time</SectionLabel>
                <div className="flex gap-3">
                  <StatCard
                    label="Total Watch Time"
                    value={video.totalWatchTime}
                  />
                  <StatCard
                    label="Avg Watch Time"
                    value={video.watchTimeAvg.replace(" avg", "")}
                  />
                </div>
              </div>

              <Divider />

              {/* Details */}
              <div className="flex flex-col gap-3 p-6">
                <SectionLabel>Details</SectionLabel>
                <div className="flex gap-3">
                  <DetailField label="Topic" value={video.topic} />
                  <DetailField label="Content Type" value={video.contentType} />
                </div>
                <div className="flex gap-3">
                  <DetailField
                    label="Visual Format"
                    value={video.visualFormat}
                  />
                  <DetailField label="Duration" value={video.duration} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-muted-foreground">
                    Hook
                  </span>
                  <p className="text-[13px] leading-relaxed text-foreground">
                    {video.hook}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-muted-foreground">
                    Caption
                  </span>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {video.caption}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
