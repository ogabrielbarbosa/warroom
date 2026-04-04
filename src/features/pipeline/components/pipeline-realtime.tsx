"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PipelineCard, PipelineStatus } from "../lib/mock-data";
import { formatDate } from "@/lib/format";
import { PipelineContent } from "./pipeline-content";

const STATUS_MAP: Record<string, PipelineStatus> = {
  idea: "Idea",
  scripted: "Scripted",
  prep_materials: "Prep Materials",
  filming: "Filming",
  editing: "Editing",
  prep_for_post: "Prep for Post",
  scheduled: "Scheduled",
  posted: "Posted",
};

const FORMAT_MAP: Record<string, string> = {
  self: "Self",
  split_screen: "Split Screen",
  b_roll_words: "B-Roll + Words",
};

function rowToCard(row: Record<string, unknown>): PipelineCard {
  return {
    id: row.id as string,
    title: (row.title as string) ?? "",
    topic: (row.topic as string) ?? "",
    format: FORMAT_MAP[row.visual_format as string] ?? (row.visual_format as string) ?? "",
    hookText: (row.hook as string) ?? "",
    date: formatDate(row.created_at as string),
    status: STATUS_MAP[row.status as string] ?? "Idea",
    hasReference: !!(row.reference_video as string),
    contentAngle: (row.content_angle as string) ?? "",
    material: (row.material_research as string) ?? "",
    onScreenText: (row.on_screen_text as string) ?? "",
    recordingInstructions: (row.recording_instructions as string) ?? "",
    script: (row.script as string) ?? "",
    scheduleDate: (row.schedule_date as string) ?? null,
    referenceVideo: null,
  };
}

interface PipelineRealtimeProps {
  initialData: PipelineCard[];
}

export function PipelineRealtime({
  initialData,
}: PipelineRealtimeProps) {
  const [cards, setCards] = useState(initialData);

  // Sync with server re-renders (e.g. after revalidatePath)
  useEffect(() => {
    setCards(initialData);
  }, [initialData]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("pipeline-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "content_pipeline" },
        (payload) => {
          const newCard = rowToCard(payload.new);
          setCards((prev) => {
            if (prev.some((c) => c.id === newCard.id)) return prev;
            return [newCard, ...prev];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "content_pipeline" },
        (payload) => {
          const updated = rowToCard(payload.new);
          setCards((prev) =>
            prev.map((c) => (c.id === updated.id ? updated : c))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "content_pipeline" },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          setCards((prev) => prev.filter((c) => c.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <PipelineContent cards={cards} />;
}
