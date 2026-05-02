import "server-only";

const GRAPH_API_VERSION = "v21.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export interface IgMediaItem {
  id: string;
  caption: string | null;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_product_type: "FEED" | "REELS" | "STORY" | "AD";
  media_url: string | null;
  thumbnail_url: string | null;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
}

interface IgMediaResponse {
  data: IgMediaItem[];
  paging?: {
    cursors?: { before: string; after: string };
    next?: string;
  };
}

interface IgErrorResponse {
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

/**
 * Fetches the connected IG Business account's recent media.
 *
 * Requires env vars:
 *   - IG_USER_ID
 *   - META_ACCESS_TOKEN
 *
 * Returns up to `limit` items. Returns null if env vars missing or API fails
 * (caller should fall back to DB-only data).
 */
export async function fetchInstagramMedia(
  limit = 50,
): Promise<IgMediaItem[] | null> {
  const igUserId = process.env.IG_USER_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!igUserId || !accessToken) {
    return null;
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_product_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "like_count",
    "comments_count",
  ].join(",");

  const url = new URL(`${GRAPH_API_BASE}/${igUserId}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 }, // cache 5min
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as IgErrorResponse;
      console.error(
        "[IG API] Failed to fetch media:",
        res.status,
        err.error?.message,
      );
      return null;
    }

    const json = (await res.json()) as IgMediaResponse;
    return json.data ?? [];
  } catch (err) {
    console.error("[IG API] Exception fetching media:", err);
    return null;
  }
}
