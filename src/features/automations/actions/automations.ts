"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AutomationFormData } from "../lib/types";

function validateFormData(data: AutomationFormData): string | null {
  if (!data.name?.trim()) {
    return "O nome da automação é obrigatório.";
  }
  if (data.name.length > 80) {
    return "Nome muito longo (máximo 80 caracteres).";
  }
  if (data.triggerType === "specific_post" && !data.contentId) {
    return "Selecione um Reel para vincular à automação.";
  }
  if (data.commentMatchType === "specific_keyword" && data.keywords.length === 0) {
    return "Adicione ao menos uma palavra-chave.";
  }
  if (data.welcomeEnabled && !data.welcomeMessage.trim()) {
    return "A mensagem de boas-vindas não pode ficar vazia.";
  }
  if (data.welcomeEnabled && !data.welcomeButtonLabel.trim()) {
    return "O botão da mensagem de boas-vindas precisa de um texto.";
  }
  if (data.requireFollow && !data.followMessage.trim()) {
    return "A mensagem do follow não pode ficar vazia.";
  }
  if (!data.finalMessage.trim()) {
    return "A mensagem final não pode ficar vazia.";
  }
  if (data.finalLinkUrl && !isValidUrl(data.finalLinkUrl)) {
    return "URL do link final inválida.";
  }
  return null;
}

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function formDataToRow(data: AutomationFormData) {
  return {
    name: data.name || "Nova Automação",
    trigger_type: data.triggerType,
    content_id: data.contentId,
    ig_media_id: data.igMediaId,
    media_url: data.mediaUrl,
    media_thumbnail_url: data.mediaThumbnailUrl,
    comment_match_type: data.commentMatchType,
    keywords: data.keywords,
    reply_to_comments: data.replyToComments,
    public_reply_variants: data.publicReplyVariants,
    welcome_enabled: data.welcomeEnabled,
    welcome_message: data.welcomeMessage,
    welcome_button_label: data.welcomeButtonLabel,
    require_follow: data.requireFollow,
    follow_message: data.followMessage,
    final_message: data.finalMessage,
    final_link_label: data.finalLinkLabel,
    final_link_url: data.finalLinkUrl,
  };
}

export async function createAutomation(
  data: AutomationFormData,
  activate = false,
) {
  if (activate) {
    const validationError = validateFormData(data);
    if (validationError) throw new Error(validationError);
  }

  const supabase = await createClient();

  const { data: inserted, error } = await supabase
    .from("automations")
    .insert({ ...formDataToRow(data), is_active: activate })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/automations");
  redirect(`/automations/${inserted.id}/edit`);
}

export async function updateAutomation(
  id: string,
  data: AutomationFormData,
  activate?: boolean,
) {
  if (activate) {
    const validationError = validateFormData(data);
    if (validationError) throw new Error(validationError);
  }

  const supabase = await createClient();

  const updates = {
    ...formDataToRow(data),
    ...(activate !== undefined ? { is_active: activate } : {}),
  };

  const { error } = await supabase
    .from("automations")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/automations");
  revalidatePath(`/automations/${id}/edit`);
}

export async function toggleAutomationActive(id: string, isActive: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("automations")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/automations");
  revalidatePath(`/automations/${id}/edit`);
}

export async function deleteAutomation(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("automations").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/automations");
  redirect("/automations");
}
