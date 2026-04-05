"use client";

import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { formatNumber } from "@/lib/format";
import type {
  ContentSnapshot,
  AccountStat,
  ContentVideo,
} from "../lib/mock-data";

/* ── Palette (vibrant on dark backgrounds) ─────────────── */

const COLORS = {
  orange: "#FF8400",
  blue: "#3B82F6",
  green: "#22C55E",
  amber: "#F59E0B",
  purple: "#A855F7",
  cyan: "#06B6D4",
} as const;

/* ── Shared ────────────────────────────────────────────── */

const GRID_STYLE = {
  strokeDasharray: "3 3",
  stroke: "rgba(255,255,255,0.08)",
} as const;

const AXIS_STYLE = {
  tick: { fontSize: 11, fill: "#999" },
  axisLine: false,
  tickLine: false,
} as const;

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="mb-1 text-[11px] text-muted-foreground">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className="text-xs font-medium"
          style={{ color: entry.color }}
        >
          {entry.name}: {formatNumber(entry.value)}
        </p>
      ))}
    </div>
  );
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/* ── Hook: measure container ───────────────────────────── */

function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width: Math.floor(width), height: Math.floor(height) });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}

/* ── Views Over Time ───────────────────────────────────── */

interface ViewsOverTimeProps {
  snapshots: ContentSnapshot[];
}

export function ViewsOverTimeChart({ snapshots }: ViewsOverTimeProps) {
  const { ref, width, height } = useContainerSize();

  const byDate = new Map<string, number>();
  for (const s of snapshots) {
    byDate.set(s.snapshotDate, (byDate.get(s.snapshotDate) ?? 0) + s.views);
  }
  const data = Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, views]) => ({ date, views, label: formatDateLabel(date) }));

  return (
    <div ref={ref} className="size-full">
      {data.length === 0 ? (
        <EmptyChart />
      ) : width > 0 && height > 0 ? (
        <AreaChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: -10 }}
        >
          <defs>
            <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.orange} stopOpacity={0.35} />
              <stop offset="100%" stopColor={COLORS.orange} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="label" {...AXIS_STYLE} />
          <YAxis {...AXIS_STYLE} tickFormatter={(v) => formatNumber(v)} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="views"
            name="Views"
            stroke={COLORS.orange}
            strokeWidth={2}
            fill="url(#viewsGrad)"
          />
        </AreaChart>
      ) : null}
    </div>
  );
}

/* ── Followers Over Time ───────────────────────────────── */

interface FollowersOverTimeProps {
  accountStats: AccountStat[];
}

export function FollowersOverTimeChart({
  accountStats,
}: FollowersOverTimeProps) {
  const { ref, width, height } = useContainerSize();

  const data = accountStats.map((s) => ({
    date: s.snapshotDate,
    followers: s.followerCount,
    label: formatDateLabel(s.snapshotDate),
  }));

  return (
    <div ref={ref} className="size-full">
      {data.length === 0 ? (
        <EmptyChart />
      ) : width > 0 && height > 0 ? (
        <AreaChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: -10 }}
        >
          <defs>
            <linearGradient id="followersGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.blue} stopOpacity={0.35} />
              <stop offset="100%" stopColor={COLORS.blue} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="label" {...AXIS_STYLE} />
          <YAxis {...AXIS_STYLE} tickFormatter={(v) => formatNumber(v)} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="followers"
            name="Followers"
            stroke={COLORS.blue}
            strokeWidth={2}
            fill="url(#followersGrad)"
          />
        </AreaChart>
      ) : null}
    </div>
  );
}

/* ── Engagement Breakdown ──────────────────────────────── */

interface EngagementBreakdownProps {
  videos: ContentVideo[];
}

const PIE_COLORS = [COLORS.orange, COLORS.blue, COLORS.green, COLORS.amber];

export function EngagementBreakdownChart({ videos }: EngagementBreakdownProps) {
  const { ref, width, height } = useContainerSize();

  const totals = videos.reduce(
    (acc, v) => ({
      likes: acc.likes + v.likes,
      comments: acc.comments + v.comments,
      shares: acc.shares + v.shares,
      saves: acc.saves + v.saves,
    }),
    { likes: 0, comments: 0, shares: 0, saves: 0 }
  );

  const data = [
    { name: "Likes", value: totals.likes },
    { name: "Comments", value: totals.comments },
    { name: "Shares", value: totals.shares },
    { name: "Saves", value: totals.saves },
  ].filter((d) => d.value > 0);

  return (
    <div ref={ref} className="size-full">
      {data.length === 0 ? (
        <EmptyChart />
      ) : width > 0 && height > 0 ? (
        <div className="flex h-full items-center gap-4">
          <div style={{ width: Math.min(width * 0.6, height), height }}>
            <PieChart width={Math.min(width * 0.6, height)} height={height}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-full"
                  style={{ background: PIE_COLORS[i] }}
                />
                <span className="text-[11px] text-muted-foreground">
                  {d.name}
                </span>
                <span className="text-[11px] font-medium text-foreground">
                  {formatNumber(d.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ── Avg Views Per Post ────────────────────────────────── */

interface AvgViewsPerPostProps {
  accountStats: AccountStat[];
}

export function AvgViewsPerPostChart({ accountStats }: AvgViewsPerPostProps) {
  const { ref, width, height } = useContainerSize();

  const data = accountStats.map((s) => ({
    date: s.snapshotDate,
    avgViews: Math.round(s.avgViews),
    label: formatDateLabel(s.snapshotDate),
  }));

  return (
    <div ref={ref} className="size-full">
      {data.length === 0 ? (
        <EmptyChart />
      ) : width > 0 && height > 0 ? (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: -10 }}
        >
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="label" {...AXIS_STYLE} />
          <YAxis {...AXIS_STYLE} tickFormatter={(v) => formatNumber(v)} />
          <Tooltip content={<ChartTooltip />} />
          <Bar
            dataKey="avgViews"
            name="Avg Views"
            fill={COLORS.orange}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      ) : null}
    </div>
  );
}

/* ── Video Performance Over Time (Detail Panel) ────────── */

interface VideoPerformanceChartProps {
  snapshots: ContentSnapshot[];
}

export function VideoPerformanceChart({ snapshots }: VideoPerformanceChartProps) {
  const { ref, width, height } = useContainerSize();

  const data = snapshots
    .sort((a, b) => a.snapshotDate.localeCompare(b.snapshotDate))
    .map((s) => ({
      date: s.snapshotDate,
      views: s.views,
      likes: s.likes,
      saves: s.saves,
      label: formatDateLabel(s.snapshotDate),
    }));

  return (
    <div ref={ref} className="size-full">
      {data.length === 0 ? (
        <EmptyChart />
      ) : width > 0 && height > 0 ? (
        <LineChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: -10 }}
        >
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="label" {...AXIS_STYLE} />
          <YAxis {...AXIS_STYLE} tickFormatter={(v) => formatNumber(v)} />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="views"
            name="Views"
            stroke={COLORS.orange}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="likes"
            name="Likes"
            stroke={COLORS.blue}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="saves"
            name="Saves"
            stroke={COLORS.green}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      ) : null}
    </div>
  );
}

/* ── Empty State ───────────────────────────────────────── */

function EmptyChart() {
  return (
    <div className="flex size-full items-center justify-center rounded-lg border border-dashed border-border">
      <span className="text-xs text-muted-foreground">No data available</span>
    </div>
  );
}
