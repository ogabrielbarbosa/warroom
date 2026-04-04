import "server-only";

import { createClient } from "@/lib/supabase/server";
import { formatNumber } from "@/lib/format";
import type { ContentHook, HookSource } from "@/features/hooks/lib/mock-data";

export async function getHooks(): Promise<ContentHook[]> {
  const supabase = await createClient();

  // Fetch from both tables in parallel
  const [kallawayRes, noeRes] = await Promise.all([
    supabase
      .from("kallaway_hooks")
      .select("*")
      .order("views", { ascending: false }),
    supabase
      .from("noe_top_hooks")
      .select("*")
      .order("views", { ascending: false }),
  ]);

  const kallawayHooks: ContentHook[] = (kallawayRes.data ?? []).map((row) => ({
    id: `kallaway_${row.id}`,
    hookText: row.spoken_hook ?? "",
    spokenHook: row.spoken_hook ?? "",
    textHook: row.text_hook ?? "",
    visualHook: [row.visual_hook_graphic, row.visual_hook_movement, row.visual_hook_layout]
      .filter(Boolean)
      .join(". "),
    framework: row.spoken_hook_framework ?? "",
    structure: row.spoken_hook_structure ?? "",
    source: "Kallaway" as HookSource,
    views: row.views ?? 0,
    viewsFormatted: formatNumber(row.views),
    hookType: row.content_type ?? "",
    thumbnail: "",
    videoUrl: row.video_link ?? "",
    videoPlatform: "Instagram",
    performanceRank: row.performance_rank ?? 0,
  }));

  const noeHooks: ContentHook[] = (noeRes.data ?? []).map((row) => ({
    id: `noe_${row.id}`,
    hookText: row.spoken_hook ?? "",
    spokenHook: row.spoken_hook ?? "",
    textHook: row.text_hook ?? "",
    visualHook: row.visual_format ?? "",
    framework: row.spoken_hook_framework ?? "",
    structure: row.spoken_hook_structure ?? "",
    source: "Noe" as HookSource,
    views: row.views ?? 0,
    viewsFormatted: formatNumber(row.views),
    hookType: row.content_type ?? "",
    thumbnail: "",
    videoUrl: row.url ?? "",
    videoPlatform: "Instagram",
    performanceRank: 0,
  }));

  return [...kallawayHooks, ...noeHooks].sort((a, b) => b.views - a.views);
}
