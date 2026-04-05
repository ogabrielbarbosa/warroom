import "server-only";

import { createClient } from "@/lib/supabase/server";
import { formatNumber } from "@/lib/format";
import type { Account, Platform, AccountStatus } from "@/features/accounts/lib/mock-data";

function toPlatform(p: string): Platform {
  const map: Record<string, Platform> = {
    instagram: "Instagram",
    youtube: "YouTube",
    tiktok: "TikTok",
  };
  return map[p.toLowerCase()] ?? "Instagram";
}

export async function getAccounts(): Promise<Account[]> {
  const supabase = await createClient();

  const { data: accounts } = await supabase
    .from("accounts")
    .select("*")
    .order("follower_count", { ascending: false });

  if (!accounts) return [];

  // Get latest stats for each account
  const { data: stats } = await supabase
    .from("account_stats")
    .select("*")
    .order("snapshot_date", { ascending: false });

  // Get engagement totals per handle
  const { data: contentRows } = await supabase
    .from("content")
    .select("handle, views, likes, comments, shares, saves");

  const engagementByHandle = new Map<string, { totalEngagement: number; totalViews: number }>();
  for (const c of contentRows ?? []) {
    const h = c.handle ?? "";
    const prev = engagementByHandle.get(h) ?? { totalEngagement: 0, totalViews: 0 };
    prev.totalEngagement += (c.likes ?? 0) + (c.comments ?? 0) + (c.shares ?? 0) + (c.saves ?? 0);
    prev.totalViews += c.views ?? 0;
    engagementByHandle.set(h, prev);
  }

  // Build a map of latest stats per handle+platform
  const latestStats = new Map<string, (typeof stats extends (infer T)[] | null ? T : never)>();
  for (const s of stats ?? []) {
    const key = `${s.handle}:${s.platform}`;
    if (!latestStats.has(key)) latestStats.set(key, s);
  }

  const mapped = accounts.map((row) => {
    const key = `${row.handle}:${row.platform}`;
    const stat = latestStats.get(key);
    // Use stat follower_count only if > 0, otherwise fall back to accounts table
    const statFollowers = stat?.follower_count ?? 0;
    const followers = statFollowers > 0 ? statFollowers : (row.follower_count ?? 0);
    const avgViews = Math.round(Number(stat?.avg_views ?? row.avg_views ?? 0));
    const totalViews = stat?.total_views ?? 0;
    const platform = toPlatform(row.platform);
    const isPinned = row.account_type === "personal";
    const engagement = engagementByHandle.get(row.handle) ?? { totalEngagement: 0, totalViews: 0 };
    const engagementRate = engagement.totalViews > 0
      ? (engagement.totalEngagement / engagement.totalViews) * 100
      : 0;

    const status: AccountStatus = row.is_active ? "Active" : "Paused";

    return {
      id: row.id.toString(),
      username: `@${row.handle}`,
      displayName: row.handle,
      platform,
      followers,
      followersFormatted: formatNumber(followers),
      postsCount: stat?.post_count ?? row.total_videos ?? 0,
      avgViews,
      avgViewsFormatted: formatNumber(avgViews),
      totalViews: Number(totalViews),
      engagementRate: Math.round(engagementRate * 10) / 10,
      engagementRateFormatted: `${(Math.round(engagementRate * 10) / 10).toFixed(1)}%`,
      status,
      lastSync: stat?.snapshot_date ?? "",
      profileImage: "",
      niche: row.category ?? "",
      bio: row.notes ?? "",
      profileUrl: "",
      isPinned,
    };
  });

  // Pin personal accounts (ogabarbosa) first
  mapped.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return mapped;
}
