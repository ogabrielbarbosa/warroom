"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import type { PageHeaderTab } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MOCK_VIDEOS, type ContentVideo } from "../lib/mock-data";
import { VideoDetailPanel } from "./video-detail-panel";

/* ── Types ──────────────────────────────────────────────── */

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

/* ── Constants ──────────────────────────────────────────── */

const TABS: PageHeaderTab[] = [
  { label: "All Metrics", value: "all" },
  { label: "Content Performance", value: "content" },
];

const TIME_RANGES = ["7d", "30d", "90d", "All Time", "Custom"] as const;
type TimeRange = (typeof TIME_RANGES)[number];

const KPI_ROW_1: KpiCard[] = [
  { label: "FOLLOWERS", value: "18.2K", change: "↑ 8%", trend: "up" },
  { label: "TOTAL VIEWS", value: "1.88M", change: "↑ 12%", trend: "up" },
  { label: "TOTAL LIKES", value: "92.5K", change: "↑ 15%", trend: "up" },
  { label: "COMMENTS", value: "43.9K", change: "↑ 22%", trend: "up" },
];

const KPI_ROW_2: KpiCard[] = [
  { label: "SHARES", value: "7.0K", change: "↓ 3%", trend: "down" },
  { label: "SAVES", value: "29.4K", change: "↑ 18%", trend: "up" },
  { label: "AVG WATCH TIME", value: "0:38", change: "↑ 5%", trend: "up" },
  { label: "POSTS", value: "64", change: "— 0%", trend: "neutral" },
];

const CHART_CARDS = [
  { title: "Views Over Time" },
  { title: "Followers Over Time" },
  { title: "Engagement Breakdown" },
  { title: "Avg Views Per Post" },
];

/* ── Time Range Filter ──────────────────────────────────── */

function TimeRangeFilter({
  value,
  onChange,
}: {
  value: TimeRange;
  onChange: (v: TimeRange) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-muted p-1">
      {TIME_RANGES.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={cn(
            "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
            value === range
              ? "bg-background text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {range}
          {range === "Custom" && <ChevronDown className="size-3.5" />}
        </button>
      ))}
    </div>
  );
}

/* ── KPI Card ───────────────────────────────────────────── */

function KpiStatCard({ label, value, change, trend }: KpiCard) {
  return (
    <Card className="rounded-xl p-5 gap-1.5 border-border">
      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-[28px] font-bold text-foreground leading-tight">
        {value}
      </span>
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "text-xs font-medium",
            trend === "up" && "text-emerald-400",
            trend === "down" && "text-red-400",
            trend === "neutral" && "text-muted-foreground"
          )}
        >
          {change}
        </span>
        <span className="text-xs text-muted-foreground">vs prev period</span>
      </div>
    </Card>
  );
}

/* ── Chart Placeholder ──────────────────────────────────── */

function ChartCard({ title }: { title: string }) {
  return (
    <Card className="rounded-xl flex flex-col gap-4 p-5 min-h-[280px]">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border">
        <span className="text-xs text-muted-foreground">
          Chart placeholder
        </span>
      </div>
    </Card>
  );
}

/* ── Video Thumbnail ───────────────────────────────────── */

function VideoThumbnail({ title }: { title: string }) {
  const hue = (title.length * 7) % 360;
  return (
    <div
      className="size-8 shrink-0 rounded-md"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 40%, 20%), hsl(${(hue + 40) % 360}, 50%, 15%))`,
      }}
    />
  );
}

/* ── Outlier Badge ─────────────────────────────────────── */

function OutlierBadge({
  score,
  isOutlier,
}: {
  score: number;
  isOutlier: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
        isOutlier
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground"
      )}
    >
      {isOutlier && "⚡ "}
      {score}
    </span>
  );
}

/* ── Main Component ─────────────────────────────────────── */

export function MetricsContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [selectedVideo, setSelectedVideo] = useState<ContentVideo | null>(null);

  function handleRowClick(video: ContentVideo) {
    setSelectedVideo((prev) => (prev?.id === video.id ? null : video));
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Metrics"
        subtitle="@ogabarbosa · Instagram"
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedVideo(null);
        }}
        filters={
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
        }
      />

      <div className="flex-1 overflow-auto p-8">
        {activeTab === "all" && (
          <div className="flex flex-col gap-6">
            {/* KPI Row 1 */}
            <div className="grid grid-cols-4 gap-3">
              {KPI_ROW_1.map((kpi) => (
                <KpiStatCard key={kpi.label} {...kpi} />
              ))}
            </div>

            {/* KPI Row 2 */}
            <div className="grid grid-cols-4 gap-3">
              {KPI_ROW_2.map((kpi) => (
                <KpiStatCard key={kpi.label} {...kpi} />
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              {CHART_CARDS.slice(0, 2).map((chart) => (
                <ChartCard key={chart.title} title={chart.title} />
              ))}
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              {CHART_CARDS.slice(2).map((chart) => (
                <ChartCard key={chart.title} title={chart.title} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <Table className="border-0">
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="w-auto">Video</TableHead>
                <TableHead className="w-[80px]">Date</TableHead>
                <TableHead className="w-[80px]">Views</TableHead>
                <TableHead className="w-[70px]">Likes</TableHead>
                <TableHead className="w-[70px]">Cmts</TableHead>
                <TableHead className="w-[70px]">Saves</TableHead>
                <TableHead className="w-[80px]">Watch</TableHead>
                <TableHead className="w-[70px]">Outlier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_VIDEOS.map((video) => {
                const isSelected = selectedVideo?.id === video.id;
                return (
                  <TableRow
                    key={video.id}
                    onClick={() => handleRowClick(video)}
                    className={cn(
                      "cursor-pointer border-b border-border border-l-[3px] transition-colors",
                      isSelected
                        ? "border-l-primary bg-card"
                        : "border-l-transparent hover:bg-card/50"
                    )}
                  >
                    <TableCell className="h-auto py-3">
                      <div className="flex items-center gap-2.5">
                        <VideoThumbnail title={video.title} />
                        <span className="text-[13px] font-medium text-foreground line-clamp-1">
                          {video.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="h-auto py-3 text-[13px] text-muted-foreground">
                      {video.date}
                    </TableCell>
                    <TableCell className="h-auto py-3 text-[13px] font-medium text-foreground">
                      {video.viewsFormatted}
                    </TableCell>
                    <TableCell className="h-auto py-3 text-[13px] text-foreground">
                      {video.likesFormatted}
                    </TableCell>
                    <TableCell className="h-auto py-3 text-[13px] text-foreground">
                      {video.commentsFormatted}
                    </TableCell>
                    <TableCell className="h-auto py-3 text-[13px] text-foreground">
                      {video.savesFormatted}
                    </TableCell>
                    <TableCell className="h-auto py-3 text-[13px] text-foreground">
                      {video.watchTimeAvg}
                    </TableCell>
                    <TableCell className="h-auto py-3">
                      <OutlierBadge
                        score={video.outlierScore}
                        isOutlier={video.isOutlier}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Slide Over Panel */}
      <VideoDetailPanel
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
