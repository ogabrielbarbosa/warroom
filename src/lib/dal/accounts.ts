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

  // Build a map of latest stats per handle+platform
  const latestStats = new Map<string, (typeof stats extends (infer T)[] | null ? T : never)>();
  for (const s of stats ?? []) {
    const key = `${s.handle}:${s.platform}`;
    if (!latestStats.has(key)) latestStats.set(key, s);
  }

  return accounts.map((row) => {
    const key = `${row.handle}:${row.platform}`;
    const stat = latestStats.get(key);
    const followers = stat?.follower_count ?? row.follower_count ?? 0;
    const avgViews = stat?.avg_views ?? row.avg_views ?? 0;
    const platform = toPlatform(row.platform);

    const status: AccountStatus = row.is_active ? "Active" : "Paused";

    return {
      id: row.id.toString(),
      username: `@${row.handle}`,
      displayName: row.handle,
      platform,
      followers,
      followersFormatted: formatNumber(followers),
      engagement: 0,
      postsCount: stat?.post_count ?? row.total_videos ?? 0,
      avgViews: Number(avgViews),
      avgViewsFormatted: formatNumber(Number(avgViews)),
      status,
      lastSync: stat?.snapshot_date ?? "",
      profileImage: "",
      niche: row.category ?? "",
      bio: row.notes ?? "",
      profileUrl: "",
    };
  });
}
