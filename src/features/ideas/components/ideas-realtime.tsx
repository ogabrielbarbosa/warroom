"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatNumber, formatDuration, formatDate } from "@/lib/format";
import type { ContentIdea, IdeaMetadata } from "../lib/mock-data";
import { IdeasContent } from "./ideas-content";

function countryToFlag(country: string | null): string {
  if (!country) return "";
  const code = country.toUpperCase().slice(0, 2);
  return String.fromCodePoint(
    ...code.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

function rowToIdea(row: Record<string, unknown>): ContentIdea {
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
    avgWatchTime: formatDuration(avgWatchTime),
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
  };
}

interface IdeasRealtimeProps {
  initialData: ContentIdea[];
}

export function IdeasRealtime({ initialData }: IdeasRealtimeProps) {
  const [ideas, setIdeas] = useState(initialData);

  // Sync with server re-renders
  useEffect(() => {
    setIdeas(initialData);
  }, [initialData]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("ideas-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "content",
          filter: "is_analyzed=eq.true",
        },
        (payload) => {
          const newIdea = rowToIdea(payload.new);
          setIdeas((prev) => [newIdea, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "content",
          filter: "is_analyzed=eq.true",
        },
        (payload) => {
          const updated = rowToIdea(payload.new);
          setIdeas((prev) =>
            prev.map((i) => (i.id === updated.id ? updated : i))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "content" },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          setIdeas((prev) => prev.filter((i) => i.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <IdeasContent ideas={ideas} />;
}
