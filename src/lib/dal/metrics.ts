import "server-only";

import { createClient } from "@/lib/supabase/server";
import { formatNumber, formatDuration, formatDate } from "@/lib/format";
import type {
  ContentVideo,
  AccountStat,
  ContentSnapshot,
} from "@/features/metrics/lib/mock-data";

export async function getMetrics(): Promise<ContentVideo[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("content")
    .select("*")
    .eq("handle", "ogabarbosa")
    .order("post_date", { ascending: false });

  if (!data) return [];

  return data.map((row) => {
    const views = row.views ?? 0;
    const likes = row.likes ?? 0;
    const comments = row.comments ?? 0;
    const shares = row.shares ?? 0;
    const saves = row.saves ?? 0;
    const avgWatchTime = Number(row.avg_watch_time ?? 0);
    const outlierScore = Number(row.outlier_score ?? 0);

    return {
      id: row.id,
      title: row.spoken_hook ?? row.caption?.slice(0, 60) ?? "",
      thumbnail: row.thumbnail_url ?? "",
      date: formatDate(row.post_date),
      rawDate: row.post_date ?? "",
      views,
      viewsFormatted: formatNumber(views),
      likes,
      likesFormatted: formatNumber(likes),
      comments,
      commentsFormatted: formatNumber(comments),
      shares,
      sharesFormatted: formatNumber(shares),
      saves,
      savesFormatted: formatNumber(saves),
      watchTimeAvg: `${formatDuration(avgWatchTime)} avg`,
      avgWatchTimeSeconds: avgWatchTime,
      outlierScore,
      isOutlier: outlierScore >= 5,
      topic: row.topic ?? "",
      contentType: row.content_type ?? "",
      visualFormat: row.visual_format ?? "",
      duration: formatDuration(Number(row.duration ?? 0)),
      hook: row.spoken_hook ?? "",
      caption: row.caption ?? "",
      totalWatchTime: formatNumber(row.total_watch_time),
    };
  });
}

export async function getAccountStats(
  handle: string
): Promise<AccountStat[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("account_stats")
    .select("*")
    .eq("handle", handle)
    .order("snapshot_date", { ascending: true });

  if (!data) return [];

  return data.map((row) => ({
    snapshotDate: row.snapshot_date,
    followerCount: row.follower_count ?? 0,
    postCount: row.post_count ?? 0,
    avgViews: Number(row.avg_views ?? 0),
    totalViews: row.total_views ?? 0,
  }));
}

export async function getContentSnapshots(
  handle: string
): Promise<ContentSnapshot[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("content_snapshots")
    .select("*, content!inner(handle)")
    .eq("content.handle", handle)
    .order("snapshot_date", { ascending: true });

  if (!data) return [];

  return data.map((row) => ({
    contentId: row.content_id ?? "",
    snapshotDate: row.snapshot_date,
    views: row.views ?? 0,
    likes: row.likes ?? 0,
    comments: row.comments ?? 0,
    shares: row.shares ?? 0,
    saves: row.saves ?? 0,
    avgWatchTime: Number(row.avg_watch_time ?? 0),
    totalWatchTime: row.total_watch_time ?? 0,
  }));
}
