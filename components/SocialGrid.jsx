"use client";

import Masonry from "react-masonry-css";

/**
 * Spaltenanzahl je Breakpoint (Schlüssel = min-width in px, Wert = Spaltenanzahl).
 * react-masonry-css erwartet dieses Format.
 */
const BREAKPOINTS = {
  default: 4, // ≥ 1280 px  → 4 Spalten
  1024: 3,    // ≥ 1024 px  → 3 Spalten
  768: 2,     // ≥  768 px  → 2 Spalten
  0: 1,       //  < 768 px  → 1 Spalte
};

/** Farbe + Label pro Plattform */
const PLATFORM_META = {
  instagram: { label: "Instagram", color: "#e1306c" },
  linkedin:  { label: "LinkedIn",  color: "#0a66c2" },
};

/**
 * @param {{
 *   posts: Array<{
 *     id: string,
 *     platform: string,
 *     text: string,
 *     imageUrl: string | null,
 *     postUrl: string,
 *     date: string | Date,
 *   }>
 * }} props
 */
export default function SocialGrid({ posts }) {
  if (!posts?.length) {
    return (
      <p className="text-center text-sm text-black/40 py-16">
        Noch keine Social-Posts vorhanden.
      </p>
    );
  }

  return (
    <>
      {/* Masonry benötigt eigenes CSS für die Spalten */}
      <style>{`
        .social-masonry { display: flex; gap: 1.25rem; width: 100%; }
        .social-masonry-col { display: flex; flex-direction: column; gap: 1.25rem; flex: 1; min-width: 0; }
      `}</style>

      <Masonry
        breakpointCols={BREAKPOINTS}
        className="social-masonry"
        columnClassName="social-masonry-col"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Masonry>
    </>
  );
}

/** Einzelne Post-Karte */
function PostCard({ post }) {
  const meta = PLATFORM_META[post.platform] ?? { label: post.platform, color: "#888" };
  const formattedDate = new Date(post.date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <a
      href={post.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm border border-black/6 hover:shadow-md transition-shadow duration-200 no-underline"
    >
      {/* Bild (optional) */}
      {post.imageUrl && (
        <div className="w-full aspect-4/3 overflow-hidden bg-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-3">
        {/* Plattform-Badge oben rechts */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs text-black/40">{formattedDate}</span>
          <span
            className="text-[0.65rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white shrink-0"
            style={{ backgroundColor: meta.color }}
          >
            {meta.label}
          </span>
        </div>

        {/* Post-Text – auf 5 Zeilen kürzen */}
        <p className="text-sm text-black/75 leading-relaxed line-clamp-5">
          {post.text}
        </p>

        {/* Mehr-lesen-Hinweis */}
        <span className="text-xs font-semibold text-black/40 group-hover:text-black/70 transition-colors">
          Zum Post →
        </span>
      </div>
    </a>
  );
}
