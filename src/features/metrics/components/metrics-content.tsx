"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber, formatDuration } from "@/lib/format";
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
import type {
  ContentVideo,
  AccountStat,
  ContentSnapshot,
} from "../lib/mock-data";
import { VideoDetailPanel } from "./video-detail-panel";
import {
  ViewsOverTimeChart,
  FollowersOverTimeChart,
  EngagementBreakdownChart,
  AvgViewsPerPostChart,
} from "./charts";

/* ── Types ──────────────────────────────────────────────── */

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

/* ── Constants ────────────────────────���─────────────────── */

const TABS: PageHeaderTab[] = [
  { label: "All Metrics", value: "all" },
  { label: "Content Performance", value: "content" },
];

const TIME_RANGES = ["7d", "30d", "90d", "All Time", "Custom"] as const;
type TimeRange = (typeof TIME_RANGES)[number];

const DAYS_MAP: Record<string, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

/* ── Helpers ───────────────────────────────────────────── */

function filterByTimeRange(
  videos: ContentVideo[],
  range: TimeRange
): ContentVideo[] {
  if (range === "All Time" || range === "Custom") return videos;
  const days = DAYS_MAP[range];
  if (!days) return videos;
  const cutoff = new Date(Date.now() - days * 86_400_000);
  return videos.filter((v) => v.rawDate && new Date(v.rawDate) >= cutoff);
}

function filterPrevPeriod(
  videos: ContentVideo[],
  range: TimeRange
): ContentVideo[] {
  const days = DAYS_MAP[range];
  if (!days) return [];
  const now = Date.now();
  const currentCutoff = new Date(now - days * 86_400_000);
  const prevCutoff = new Date(now - days * 2 * 86_400_000);
  return videos.filter((v) => {
    if (!v.rawDate) return false;
    const d = new Date(v.rawDate);
    return d >= prevCutoff && d < currentCutoff;
  });
}

function pctChange(current: number, previous: number): { change: string; trend: "up" | "down" | "neutral" } {
  if (previous === 0) {
    if (current === 0) return { change: "—", trend: "neutral" };
    return { change: "+100%", trend: "up" };
  }
  const pct = ((current - previous) / previous) * 100;
  if (pct === 0) return { change: "0%", trend: "neutral" };
  const sign = pct > 0 ? "+" : "";
  return {
    change: `${sign}${pct.toFixed(1)}%`,
    trend: pct > 0 ? "up" : "down",
  };
}

function computeKpis(
  filtered: ContentVideo[],
  prev: ContentVideo[],
  accountStats: AccountStat[],
  range: TimeRange
): { row1: KpiCard[]; row2: KpiCard[] } {
  const totalViews = filtered.reduce((s, v) => s + v.views, 0);
  const totalLikes = filtered.reduce((s, v) => s + v.likes, 0);
  const totalComments = filtered.reduce((s, v) => s + v.comments, 0);
  const totalShares = filtered.reduce((s, v) => s + v.shares, 0);
  const totalSaves = filtered.reduce((s, v) => s + v.saves, 0);
  const avgWatch = filtered.length
    ? filtered.reduce((s, v) => s + v.avgWatchTimeSeconds, 0) / filtered.length
    : 0;
  const latestFollowers = accountStats.at(-1)?.followerCount ?? 0;

  const hasPrev = range !== "All Time" && range !== "Custom";

  const prevViews = prev.reduce((s, v) => s + v.views, 0);
  const prevLikes = prev.reduce((s, v) => s + v.likes, 0);
  const prevComments = prev.reduce((s, v) => s + v.comments, 0);
  const prevShares = prev.reduce((s, v) => s + v.shares, 0);
  const prevSaves = prev.reduce((s, v) => s + v.saves, 0);
  const prevAvgWatch = prev.length
    ? prev.reduce((s, v) => s + v.avgWatchTimeSeconds, 0) / prev.length
    : 0;

  // Followers: compare with account_stats from the start of the period
  const days = DAYS_MAP[range];
  let followerChange: { change: string; trend: "up" | "down" | "neutral" } = { change: "—", trend: "neutral" };
  if (hasPrev && days && accountStats.length > 0) {
    const cutoffDate = new Date(Date.now() - days * 86_400_000);
    const prevStat = accountStats.reduce((closest, stat) => {
      const d = new Date(stat.snapshotDate);
      const diff = Math.abs(d.getTime() - cutoffDate.getTime());
      const closestDiff = Math.abs(new Date(closest.snapshotDate).getTime() - cutoffDate.getTime());
      return diff < closestDiff ? stat : closest;
    }, accountStats[0]);
    followerChange = pctChange(latestFollowers, prevStat.followerCount);
  }

  const kpi = (label: string, value: string, current: number, previous: number): KpiCard => {
    if (!hasPrev) return { label, value, change: "—", trend: "neutral" };
    const { change, trend } = pctChange(current, previous);
    return { label, value, change, trend };
  };

  return {
    row1: [
      { label: "FOLLOWERS", value: formatNumber(latestFollowers), ...(hasPrev ? followerChange : { change: "—", trend: "neutral" as const }) },
      kpi("TOTAL VIEWS", formatNumber(totalViews), totalViews, prevViews),
      kpi("TOTAL LIKES", formatNumber(totalLikes), totalLikes, prevLikes),
      kpi("COMMENTS", formatNumber(totalComments), totalComments, prevComments),
    ],
    row2: [
      kpi("SHARES", formatNumber(totalShares), totalShares, prevShares),
      kpi("SAVES", formatNumber(totalSaves), totalSaves, prevSaves),
      kpi("AVG WATCH TIME", formatDuration(avgWatch), avgWatch, prevAvgWatch),
      kpi("POSTS", filtered.length.toString(), filtered.length, prev.length),
    ],
  };
}

/* ── Time Range Filter ──────────────────────────��───────── */

function TimeRangeFilter({
  value,
  onChange,
}: {
  value: TimeRange;
  onChange: (v: TimeRange) => void;
}) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto rounded-full bg-muted p-1">
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

/* ── KPI Card ──────────────────────────────────���────────── */

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
        {change !== "—" && (
          <span className="text-xs text-muted-foreground">vs prev period</span>
        )}
      </div>
    </Card>
  );
}

/* ── Chart Card ───────────────────────────────────────── */

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-xl flex flex-col gap-4 p-5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="h-[220px] w-full">{children}</div>
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

export function MetricsContent({
  videos,
  accountStats,
  contentSnapshots,
}: {
  videos: ContentVideo[];
  accountStats: AccountStat[];
  contentSnapshots: ContentSnapshot[];
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("All Time");
  const [selectedVideo, setSelectedVideo] = useState<ContentVideo | null>(null);

  const filteredVideos = useMemo(
    () => filterByTimeRange(videos, timeRange),
    [videos, timeRange]
  );

  const prevVideos = useMemo(
    () => filterPrevPeriod(videos, timeRange),
    [videos, timeRange]
  );

  const kpis = useMemo(
    () => computeKpis(filteredVideos, prevVideos, accountStats, timeRange),
    [filteredVideos, prevVideos, accountStats, timeRange]
  );

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

      <div className="flex-1 overflow-auto p-4 md:p-8">
        {activeTab === "all" && (
          <div className="flex flex-col gap-3 md:gap-4">
            {/* KPI Row 1 */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {kpis.row1.map((kpi) => (
                <KpiStatCard key={kpi.label} {...kpi} />
              ))}
            </div>

            {/* KPI Row 2 */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {kpis.row2.map((kpi) => (
                <KpiStatCard key={kpi.label} {...kpi} />
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              <ChartCard title="Views Over Time">
                <ViewsOverTimeChart snapshots={contentSnapshots} />
              </ChartCard>
              <ChartCard title="Followers Over Time">
                <FollowersOverTimeChart accountStats={accountStats} />
              </ChartCard>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              <ChartCard title="Engagement Breakdown">
                <EngagementBreakdownChart videos={filteredVideos} />
              </ChartCard>
              <ChartCard title="Avg Views Per Post">
                <AvgViewsPerPostChart accountStats={accountStats} />
              </ChartCard>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="overflow-x-auto">
          <Table className="border-0 min-w-[700px]">
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
              {filteredVideos.map((video) => {
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
              {filteredVideos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                    No content found for this period.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </div>
        )}
      </div>

      {/* Slide Over Panel */}
      <VideoDetailPanel
        video={selectedVideo}
        contentSnapshots={contentSnapshots}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
