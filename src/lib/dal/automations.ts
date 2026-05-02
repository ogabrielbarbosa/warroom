import "server-only";

import { createClient } from "@/lib/supabase/server";
import { fetchInstagramMedia, type IgMediaItem } from "@/lib/instagram/api";
import type {
  Automation,
  AutomationContact,
  AutomationLog,
  AutomationLogStatus,
  AutomationStats,
  InstagramMedia,
} from "@/features/automations/lib/types";

const IG_HANDLE = "ogabarbosa";

type AutomationRow = {
  id: string;
  account_id: number | null;
  name: string;
  is_active: boolean;
  trigger_type: string;
  content_id: string | null;
  ig_media_id: string | null;
  media_url: string | null;
  media_thumbnail_url: string | null;
  comment_match_type: string;
  keywords: string[];
  reply_to_comments: boolean;
  public_reply_variants: string[];
  welcome_enabled: boolean;
  welcome_message: string | null;
  welcome_button_label: string | null;
  require_follow: boolean;
  follow_message: string | null;
  final_message: string | null;
  final_link_label: string | null;
  final_link_url: string | null;
  total_triggered: number;
  total_dms_sent: number;
  total_clicks: number;
  created_at: string;
  updated_at: string;
};

function rowToAutomation(row: AutomationRow): Automation {
  return {
    id: row.id,
    accountId: row.account_id,
    name: row.name,
    isActive: row.is_active,
    triggerType: row.trigger_type as Automation["triggerType"],
    contentId: row.content_id,
    igMediaId: row.ig_media_id,
    mediaUrl: row.media_url,
    mediaThumbnailUrl: row.media_thumbnail_url,
    commentMatchType: row.comment_match_type as Automation["commentMatchType"],
    keywords: row.keywords ?? [],
    replyToComments: row.reply_to_comments,
    publicReplyVariants: row.public_reply_variants ?? [],
    welcomeEnabled: row.welcome_enabled,
    welcomeMessage: row.welcome_message ?? "",
    welcomeButtonLabel: row.welcome_button_label ?? "",
    requireFollow: row.require_follow,
    followMessage: row.follow_message ?? "",
    finalMessage: row.final_message ?? "",
    finalLinkLabel: row.final_link_label ?? "",
    finalLinkUrl: row.final_link_url ?? "",
    totalTriggered: row.total_triggered,
    totalDmsSent: row.total_dms_sent,
    totalClicks: row.total_clicks,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAutomations(): Promise<Automation[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("automations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map(rowToAutomation);
}

export async function getAutomationById(id: string): Promise<Automation | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("automations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return rowToAutomation(data);
}

/**
 * Lista de mídia do Instagram disponível para criar automação.
 *
 * Estratégia (IG CDN URLs expiram em horas, então API é fonte de verdade):
 *   1. Puxa lista atual via Graph API (com thumbnails frescos)
 *   2. Em paralelo, lê dados extras do DB (views, etc.) por id
 *   3. Faz upsert no DB pra registro histórico (best effort)
 *   4. Retorna lista da API mergeada com dados extras do DB
 *
 * Fallback: se Graph API falhar, retorna só o que tem no DB
 * (thumbnails podem estar quebrados, mas usuário ao menos vê algo).
 */
export async function getInstagramMediaForAutomation(): Promise<InstagramMedia[]> {
  const supabase = await createClient();

  const igMedia = await fetchInstagramMedia(50);

  // Fallback: API falhou → retorna do DB
  if (!igMedia || igMedia.length === 0) {
    const { data } = await supabase
      .from("content")
      .select("id, caption, thumbnail_url, url, post_date, views")
      .eq("platform", "instagram")
      .eq("handle", IG_HANDLE)
      .order("post_date", { ascending: false, nullsFirst: false })
      .limit(60);

    if (!data) return [];
    return data.map((row) => ({
      id: row.id,
      caption: row.caption,
      thumbnailUrl: row.thumbnail_url,
      url: row.url,
      postDate: row.post_date,
      views: row.views ?? 0,
      isFromIgApi: false,
    }));
  }

  // Filtra STORY/AD
  const filtered = igMedia.filter(
    (m) => m.media_product_type !== "STORY" && m.media_product_type !== "AD",
  );

  // Busca dados extras (views) do DB pra mergear
  const ids = filtered.map((m) => m.id);
  const { data: dbRows } = await supabase
    .from("content")
    .select("id, views")
    .in("id", ids);

  const viewsById = new Map<string, number>();
  for (const row of dbRows ?? []) {
    viewsById.set(row.id, row.views ?? 0);
  }

  // Upsert pra registro histórico
  const rows = filtered.map(igMediaToContentRow);
  if (rows.length > 0) {
    const { error: upsertError } = await supabase
      .from("content")
      .upsert(rows, { onConflict: "id", ignoreDuplicates: false });
    if (upsertError) console.error("[DAL] IG upsert failed:", upsertError.message);
  }

  return filtered.map((m) => ({
    id: m.id,
    caption: m.caption,
    thumbnailUrl: null,
    url: m.permalink,
    postDate: m.timestamp,
    views: viewsById.get(m.id) ?? 0,
    isFromIgApi: true,
  }));
}

function igMediaToContentRow(m: IgMediaItem) {
  return {
    id: m.id,
    handle: IG_HANDLE,
    platform: "instagram",
    url: m.permalink,
    thumbnail_url: null,
    caption: m.caption ?? null,
    post_date: m.timestamp,
    likes: m.like_count ?? 0,
    comments: m.comments_count ?? 0,
    source: "IG_API",
  };
}

/* ── Logs ─────────────────────────────────────────────── */

export async function getAutomationLogs(
  automationId: string,
  limit = 100,
): Promise<AutomationLog[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("automation_logs")
    .select(
      "id, automation_id, contact_id, comment_id, comment_text, status, error_message, executed_at, contact:automation_contacts(username)",
    )
    .eq("automation_id", automationId)
    .order("executed_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  if (!data) return [];

  type Row = {
    id: string;
    automation_id: string;
    contact_id: string | null;
    comment_id: string | null;
    comment_text: string | null;
    status: AutomationLogStatus;
    error_message: string | null;
    executed_at: string;
    contact: { username: string | null } | { username: string | null }[] | null;
  };

  return (data as unknown as Row[]).map((row) => {
    const contact = Array.isArray(row.contact) ? row.contact[0] : row.contact;
    return {
      id: row.id,
      automationId: row.automation_id,
      contactId: row.contact_id,
      contactUsername: contact?.username ?? null,
      commentId: row.comment_id,
      commentText: row.comment_text,
      status: row.status,
      errorMessage: row.error_message,
      executedAt: row.executed_at,
    };
  });
}

/* ── Contacts (per automation) ────────────────────────── */

export async function getAutomationContacts(
  automationId: string,
  limit = 100,
): Promise<AutomationContact[]> {
  const supabase = await createClient();

  // Pega logs da automation com info de contato joinada, depois deduplica
  const { data, error } = await supabase
    .from("automation_logs")
    .select(
      "executed_at, contact:automation_contacts(id, ig_scoped_id, username, first_name, last_interaction, tags, created_at)",
    )
    .eq("automation_id", automationId)
    .not("contact_id", "is", null)
    .order("executed_at", { ascending: false })
    .limit(500);

  if (error) throw new Error(error.message);
  if (!data) return [];

  type ContactRow = {
    id: string;
    ig_scoped_id: string;
    username: string | null;
    first_name: string | null;
    last_interaction: string | null;
    tags: string[] | null;
    created_at: string;
  };
  type LogJoinRow = {
    executed_at: string;
    contact: ContactRow | ContactRow[] | null;
  };

  const seen = new Map<string, AutomationContact>();
  for (const row of data as unknown as LogJoinRow[]) {
    const c = Array.isArray(row.contact) ? row.contact[0] : row.contact;
    if (!c) continue;
    if (seen.has(c.id)) {
      const existing = seen.get(c.id)!;
      existing.interactionCount = (existing.interactionCount ?? 0) + 1;
      continue;
    }
    seen.set(c.id, {
      id: c.id,
      igScopedId: c.ig_scoped_id,
      username: c.username,
      firstName: c.first_name,
      lastInteraction: c.last_interaction,
      tags: c.tags ?? [],
      createdAt: c.created_at,
      interactionCount: 1,
      lastSeenViaAutomation: row.executed_at,
    });
  }

  return Array.from(seen.values()).slice(0, limit);
}

/* ── Stats ────────────────────────────────────────────── */

export async function getAutomationStats(
  automationId: string,
): Promise<AutomationStats> {
  const supabase = await createClient();

  // Counters da própria automação
  const { data: auto } = await supabase
    .from("automations")
    .select("total_triggered, total_dms_sent, total_clicks")
    .eq("id", automationId)
    .maybeSingle();

  const totalTriggered = auto?.total_triggered ?? 0;
  const totalDmsSent = auto?.total_dms_sent ?? 0;
  const totalClicks = auto?.total_clicks ?? 0;

  // Triggers dos últimos 14 dias agrupados por dia
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const { data: recentLogs } = await supabase
    .from("automation_logs")
    .select("executed_at")
    .eq("automation_id", automationId)
    .eq("status", "triggered")
    .gte("executed_at", fourteenDaysAgo.toISOString());

  const byDay = new Map<string, number>();
  for (const log of recentLogs ?? []) {
    const day = log.executed_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }

  const recentTriggersByDay: Array<{ date: string; count: number }> = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    recentTriggersByDay.push({ date: key, count: byDay.get(key) ?? 0 });
  }

  return {
    totalTriggered,
    totalDmsSent,
    totalClicks,
    conversionRate: totalTriggered > 0 ? totalDmsSent / totalTriggered : 0,
    clickThroughRate: totalDmsSent > 0 ? totalClicks / totalDmsSent : 0,
    recentTriggersByDay,
  };
}
