import "server-only";

import { createClient } from "@/lib/supabase/server";
import { formatNumber, formatDuration, formatDate } from "@/lib/format";
import type { ContentIdea, IdeaMetadata } from "@/features/ideas/lib/mock-data";

function countryToFlag(country: string | null): string {
  if (!country) return "";
  const code = country.toUpperCase().slice(0, 2);
  return String.fromCodePoint(
    ...code.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

function mapContentRow(row: Record<string, unknown>): ContentIdea {
  const views = (row.views as number) ?? 0;
  const reach = (row.reach as number) ?? 0;
  const likes = (row.likes as number) ?? 0;
  const comments = (row.comments as number) ?? 0;
  const shares = (row.shares as number) ?? 0;
  const saves = (row.saves as number) ?? 0;
  const plays = (row.plays as number) ?? 0;
  const replays = (row.replays as number) ?? 0;
  const totalWatchTime = (row.total_watch_time as number) ?? 0;
  const avgWatchTime = Number((row.avg_watch_time as string) ?? 0);
  const totalInteractions = (row.total_interactions as number) ?? 0;

  return {
    id: row.id as string,
    title: (row.spoken_hook as string) ?? (row.caption as string)?.slice(0, 60) ?? "",
    handle: (row.handle as string) ?? "",
    platform: (row.platform as string) ?? "instagram",
    date: formatDate(row.post_date as string),
    country: (row.country as string) ?? "",
    countryFlag: countryToFlag(row.country as string),
    contentType: (row.content_type as string) ?? "",
    visualFormat: (row.visual_format as string) ?? "",
    topic: (row.topic as string) ?? "",
    topicSummary: (row.topic_summary as string) ?? "",
    duration: formatDuration(Number((row.duration as string) ?? 0)),
    outlierScore: Number((row.outlier_score as string) ?? 0),
    views: formatNumber(views),
    reach: formatNumber(reach),
    likes: formatNumber(likes),
    comments: formatNumber(comments),
    shares: formatNumber(shares),
    saves: formatNumber(saves),
    plays: formatNumber(plays),
    replays: formatNumber(replays),
    totalWatchTime: formatNumber(totalWatchTime),
    avgWatchTime: `${formatDuration(avgWatchTime)}`,
    totalInteractions: formatNumber(totalInteractions),
    spokenHook: (row.spoken_hook as string) ?? "",
    textHook: (row.text_hook as string) ?? "",
    visualHook: (row.visual_hook as string) ?? "",
    audioHook: (row.audio_hook as string) ?? "",
    hookFramework: (row.hook_framework as string) ?? "",
    hookStructure: (row.hook_structure as string) ?? "",
    contentStructure: (row.content_structure as string) ?? "",
    cta: (row.call_to_action as string) ?? "",
    caption: (row.caption as string) ?? "",
    source: (row.source as string) ?? "",
    status: (row.is_analyzed as boolean) ? "Analyzed" : "Pending",
    analyzedAt: formatDate(row.analyzed_at as string),
    metricsUpdatedAt: formatDate(row.metrics_updated_at as string),
    createdAt: formatDate(row.created_at as string),
    videoUrl: (row.url as string) ?? "",
    thumbnail: (row.thumbnail_url as string) ?? "",
    transcript: (row.transcript as string) ?? "",
    metadata: (row.metadata as IdeaMetadata) ?? null,
    rawViews: views,
    rawLikes: likes,
    rawComments: comments,
    rawPostDate: row.post_date ? Date.parse(row.post_date as string) : 0,
  };
}

export async function getIdeas(): Promise<ContentIdea[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("content")
    .select("*")
    .eq("is_analyzed", true)
    .order("views", { ascending: false });

  if (!data) return [];
  return data.map(mapContentRow);
}

export async function getIdeaById(id: string): Promise<ContentIdea | null> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) return null;
  return mapContentRow(data);
}
