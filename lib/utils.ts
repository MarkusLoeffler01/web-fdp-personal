// ── Slug generation ───────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Date formatting ───────────────────────────────────────────────────────────
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateLong(date: Date | string): string {
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getDateBadgeParts(date: Date | string): {
  day: string;
  month: string;
} {
  const d = new Date(date);
  return {
    day: d.toLocaleDateString("de-DE", { day: "2-digit" }),
    month: d.toLocaleDateString("de-DE", { month: "short" }).toUpperCase(),
  };
}

// ── Category labels ───────────────────────────────────────────────────────────
export const CATEGORY_LABELS: Record<string, string> = {
  PRESSEMITTEILUNG: "Pressemitteilung",
  BESCHLUSS: "Beschluss",
  NEWSLETTER: "Newsletter",
  ALLGEMEIN: "Allgemein",
};

export const TERMIN_TYPE_LABELS: Record<string, string> = {
  BUNDESVERBAND: "Bundesverband",
  LANDESVERBAND: "Landesverband",
  BEZIRK: "Bezirke & Kreise",
};

// ── Truncation ────────────────────────────────────────────────────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
