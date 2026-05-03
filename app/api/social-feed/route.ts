import { NextResponse } from "next/server";

/**
 * Social feed proxy for Juicer.io
 *
 * Caching strategy:
 * - Module-level in-memory cache (persists across requests in the same process)
 * - Base TTL: 5 minutes
 * - On TTL expiry: fetch only the 1 most recent post and compare its ID to the
 *   cached `latestPostId`. If equal → extend cache, skip full refetch.
 *   If different → full refetch of the latest 20 posts.
 * - On any network error → serve stale cache rather than failing.
 *
 * Set JUICER_FEED_NAME in your environment to your Juicer feed name.
 * Optionally set JUICER_API_KEY if your plan requires authentication.
 */

const ALLOWED_FEED_NAME_RE = /^[a-zA-Z0-9_-]{1,80}$/;
const ALLOWED_IMAGE_ORIGINS = [
  "https://images.juicer.io",
  "https://cdn.juicer.io",
  "https://scontent",
  "https://pbs.twimg.com",
  "https://video.twimg.com",
  "https://instagram.fstuff",
];
const ALLOWED_POST_ORIGINS = [
  "https://www.instagram.com",
  "https://instagram.com",
  "https://twitter.com",
  "https://x.com",
  "https://www.facebook.com",
  "https://www.threads.net",
];

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export interface SocialPost {
  id: number;
  full_url: string;
  unformatted_message: string;
  image: string | null;
  likes: number;
  comment_count: number;
  source: string | null; // platform name e.g. "Instagram"
  external_created_at: string;
}

interface CacheEntry {
  posts: SocialPost[];
  fetchedAt: number;
  latestPostId: number | null;
}

// Module-level cache – lives as long as the Node.js process
let feedCache: CacheEntry | null = null;

function sanitizeFeedName(name: string): string | null {
  return ALLOWED_FEED_NAME_RE.test(name) ? name : null;
}

function isSafeUrl(url: string, allowed: string[]): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    return allowed.some((origin) => url.startsWith(origin));
  } catch {
    return false;
  }
}

function mapJuicerItem(item: Record<string, unknown>): SocialPost | null {
  const fullUrl = String(item.full_url ?? "");
  if (!isSafeUrl(fullUrl, ALLOWED_POST_ORIGINS)) return null;

  const rawImage = item.image ? String(item.image) : null;
  const image =
    rawImage && isSafeUrl(rawImage, ALLOWED_IMAGE_ORIGINS) ? rawImage : null;

  const source = item.source
    ? String((item.source as Record<string, unknown>).source ?? "")
    : null;

  return {
    id: Number(item.id),
    full_url: fullUrl,
    unformatted_message: String(item.unformatted_message ?? ""),
    image,
    likes: Math.max(0, Number(item.likes ?? 0)),
    comment_count: Math.max(0, Number(item.comment_count ?? 0)),
    source,
    external_created_at: String(item.external_created_at ?? ""),
  };
}

async function juicerFetch(feedName: string, per: number): Promise<unknown> {
  const apiKey = process.env.JUICER_API_KEY;
  const url = new URL(`https://www.juicer.io/api/feeds/${feedName}`);
  url.searchParams.set("per", String(per));
  url.searchParams.set("page", "1");
  if (apiKey) url.searchParams.set("api_key", apiKey);

  const res = await fetch(url.toString(), {
    signal: AbortSignal.timeout(10_000),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Juicer responded with ${res.status}`);
  return res.json();
}

async function getOrRefreshFeed(feedName: string): Promise<SocialPost[]> {
  const now = Date.now();

  // ── Within TTL: return immediately ─────────────────────────────────────────
  if (feedCache && now - feedCache.fetchedAt < CACHE_TTL_MS) {
    return feedCache.posts;
  }

  // ── Cache expired: quick check – does the newest post ID differ? ────────────
  if (feedCache) {
    try {
      const checkData = (await juicerFetch(feedName, 1)) as {
        posts?: { items?: Array<{ id: unknown }> };
      };
      const latestId = Number(checkData.posts?.items?.[0]?.id ?? NaN);

      if (!isNaN(latestId) && latestId === feedCache.latestPostId) {
        // No new post → extend cache without a full refetch
        feedCache.fetchedAt = now;
        return feedCache.posts;
      }
    } catch {
      // Check failed → extend stale cache and return it
      feedCache.fetchedAt = now;
      return feedCache.posts;
    }
  }

  // ── Full refetch ────────────────────────────────────────────────────────────
  const data = (await juicerFetch(feedName, 20)) as {
    posts?: { items?: Array<Record<string, unknown>> };
  };
  const rawItems: Array<Record<string, unknown>> = data.posts?.items ?? [];
  const posts = rawItems
    .map(mapJuicerItem)
    .filter((p): p is SocialPost => p !== null);

  feedCache = {
    posts,
    fetchedAt: now,
    latestPostId: posts[0]?.id ?? null,
  };

  return posts;
}

export async function GET() {
  const rawName = process.env.JUICER_FEED_NAME ?? "";
  const feedName = sanitizeFeedName(rawName);

  if (!feedName) {
    return NextResponse.json(
      { error: "JUICER_FEED_NAME is not configured or invalid." },
      { status: 503 }
    );
  }

  try {
    const posts = await getOrRefreshFeed(feedName);
    return NextResponse.json(posts, {
      headers: {
        // CDN/browser can cache for 60s; serve stale for up to 5 min while revalidating
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("[social-feed] fetch error:", err);
    // Return stale cache if available
    if (feedCache) {
      return NextResponse.json(feedCache.posts, {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
      });
    }
    return NextResponse.json(
      { error: "Social feed temporarily unavailable." },
      { status: 502 }
    );
  }
}
