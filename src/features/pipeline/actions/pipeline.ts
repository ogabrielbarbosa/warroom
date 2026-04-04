"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const STATUS_MAP: Record<string, string> = {
  Idea: "idea",
  Scripted: "scripted",
  Filming: "filming",
  Editing: "editing",
  Posted: "posted",
};

const FORMAT_MAP: Record<string, string> = {
  Self: "self",
  "Split Screen": "split_screen",
  "B-Roll + Words": "b_roll_words",
};

export async function createPipelineCard(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const topic = formData.get("topic") as string;
  const hook = formData.get("hook") as string;
  const status = formData.get("status") as string;
  const visual_format = formData.get("format") as string;
  const content_angle = formData.get("contentAngle") as string;
  const script = formData.get("script") as string;

  const { error } = await supabase.from("content_pipeline").insert({
    title,
    topic: topic || null,
    hook: hook || null,
    status: STATUS_MAP[status] ?? "idea",
    visual_format: FORMAT_MAP[visual_format] ?? null,
    content_angle: content_angle || null,
    script: script || null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/pipeline");
}

export async function updateCardStatus(id: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("content_pipeline")
    .update({ status: STATUS_MAP[status] ?? "idea" })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/pipeline");
}

export async function updatePipelineCard(
  id: string,
  data: Record<string, string | null>
) {
  const supabase = await createClient();

  const updates: Record<string, unknown> = {};
  if ("title" in data) updates.title = data.title;
  if ("topic" in data) updates.topic = data.topic;
  if ("hook" in data) updates.hook = data.hook;
  if ("status" in data) updates.status = STATUS_MAP[data.status ?? ""] ?? data.status;
  if ("format" in data) updates.visual_format = FORMAT_MAP[data.format ?? ""] ?? data.format;
  if ("contentAngle" in data) updates.content_angle = data.contentAngle;
  if ("script" in data) updates.script = data.script;
  if ("material" in data) updates.material_research = data.material;
  if ("onScreenText" in data) updates.on_screen_text = data.onScreenText;
  if ("recordingInstructions" in data)
    updates.recording_instructions = data.recordingInstructions;
  if ("postCaption" in data) updates.post_caption = data.postCaption;

  const { error } = await supabase
    .from("content_pipeline")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/pipeline");
}

export async function deletePipelineCard(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("content_pipeline")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/pipeline");
}
