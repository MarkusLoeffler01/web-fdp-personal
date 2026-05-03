import { InstagramResponseSchema, type InstagramPost } from "@/lib/types/instagram";

const API_URL =
  "https://instagram-token-scraper-api.m-loeffler.de/api/instagram/media";

export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ADMIN_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`[Instagram] API error: HTTP ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    const parsed = InstagramResponseSchema.safeParse(json);
    if (!parsed.success) {
      console.error("[Instagram] Schema validation failed:", parsed.error.flatten());
      return [];
    }

    return parsed.data.data;
  } catch (err) {
    console.error("[Instagram] Fetch failed:", err);
    return [];
  }
}
