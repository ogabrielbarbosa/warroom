import "server-only";

import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import type { PipelineCard, PipelineStatus } from "@/features/pipeline/lib/mock-data";

const STATUS_MAP: Record<string, PipelineStatus> = {
  idea: "Idea",
  scripted: "Scripted",
  filming: "Filming",
  editing: "Editing",
  posted: "Posted",
};

const FORMAT_MAP: Record<string, string> = {
  self: "Self",
  split_screen: "Split Screen",
  b_roll_words: "B-Roll + Words",
};

export async function getPipelineCards(): Promise<PipelineCard[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("content_pipeline")
    .select("*, reference:content!content_pipeline_reference_video_fkey(spoken_hook, handle, views)")
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((row) => {
    const ref = row.reference;

    return {
      id: row.id,
      title: row.title,
      topic: row.topic ?? "",
      format: FORMAT_MAP[row.visual_format] ?? row.visual_format ?? "",
      hookText: row.hook ?? "",
      date: formatDate(row.created_at),
      status: STATUS_MAP[row.status] ?? "Idea",
      hasReference: !!row.reference_video,
      contentAngle: row.content_angle ?? "",
      material: row.material_research ?? "",
      onScreenText: row.on_screen_text ?? "",
      recordingInstructions: row.recording_instructions ?? "",
      script: row.script ?? "",
      referenceVideo: ref
        ? {
            hook: ref.spoken_hook ?? "",
            creator: ref.handle ?? "",
            views: ref.views?.toString() ?? "0",
          }
        : null,
    };
  });
}
