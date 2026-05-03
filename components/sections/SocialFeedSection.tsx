"use client";

import { useEffect, useState } from "react";
import type { SocialPost } from "@/app/api/social-feed/route";

// ── Platform styling ──────────────────────────────────────────────────────────

const PLATFORM_COLOR: Record<string, string> = {
  Instagram: "#E1306C",
  Twitter: "#000000",
  X: "#000000",
  Facebook: "#1877F2",
  Threads: "#000000",
};

const PLATFORM_LABEL: Record<string, string> = {
  Instagram: "Instagram",
  Twitter: "X / Twitter",
  X: "X / Twitter",
  Facebook: "Facebook",
  Threads: "Threads",
};

function PlatformBadge({ source }: { source: string }) {
  const color = PLATFORM_COLOR[source] ?? "#888";
  const label = PLATFORM_LABEL[source] ?? source;
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color,
        padding: "0.15rem 0.55rem",
        borderRadius: "99px",
        border: `1px solid ${color}`,
        lineHeight: 1.5,
      }}
    >
      {label}
    </span>
  );
}

// ── Single post card ──────────────────────────────────────────────────────────

function PostCard({ post }: { post: SocialPost }) {
  const [hovered, setHovered] = useState(false);

  const caption = post.unformatted_message ?? "";
  const short = caption.length > 160 ? caption.slice(0, 160) + "…" : caption;
  const platform = post.source ?? "Social";

  const date = (() => {
    try {
      return new Date(post.external_created_at).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  })();

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      {post.image && (
        <div
          style={{
            aspectRatio: "4/3",
            overflow: "hidden",
            background: "var(--gray)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Body */}
      <div
        style={{
          padding: "0.95rem 1.1rem 0.85rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
          flex: 1,
        }}
      >
        {/* Platform + date row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <PlatformBadge source={platform} />
          <span style={{ fontSize: "0.73rem", color: "rgba(0,0,0,0.38)", whiteSpace: "nowrap" }}>
            {date}
          </span>
        </div>

        {/* Caption */}
        {short && (
          <p
            style={{
              fontSize: "0.855rem",
              lineHeight: 1.65,
              color: "rgba(0,0,0,0.68)",
              margin: 0,
              flex: 1,
            }}
          >
            {short}
          </p>
        )}

        {/* Footer: stats + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.55rem",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            marginTop: "auto",
            gap: "0.5rem",
          }}
        >
          {/* Engagement stats */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              fontSize: "0.78rem",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            <span title="Likes" aria-label={`${post.likes} Likes`}>
              ♥&nbsp;{post.likes.toLocaleString("de-DE")}
            </span>
            {post.comment_count > 0 && (
              <span title="Kommentare" aria-label={`${post.comment_count} Kommentare`}>
                💬&nbsp;{post.comment_count.toLocaleString("de-DE")}
              </span>
            )}
          </div>

          {/* Link to original post */}
          <a
            href={post.full_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--black)",
              textDecoration: "none",
              background: "var(--yellow)",
              padding: "0.22rem 0.7rem",
              borderRadius: "99px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Zum Post&nbsp;→
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          aspectRatio: "4/3",
          background: "var(--gray)",
          animation: "pulse 1.4s ease-in-out infinite",
        }}
      />
      <div style={{ padding: "0.95rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ height: "16px", width: "60px", background: "var(--gray)", borderRadius: "8px" }} />
        <div style={{ height: "12px", width: "90%", background: "var(--gray)", borderRadius: "6px" }} />
        <div style={{ height: "12px", width: "70%", background: "var(--gray)", borderRadius: "6px" }} />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function SocialFeedSection() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "empty" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/social-feed")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<SocialPost[]>;
      })
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
          setStatus("ok");
        } else {
          setStatus("empty");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Section header (always rendered) ───────────────────────────────────────
  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "1.75rem",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <span
          style={{
            display: "inline-block",
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--black)",
            background: "var(--yellow)",
            padding: "0.2rem 0.6rem",
            marginBottom: "0.6rem",
          }}
        >
          Social Media
        </span>
        <h2
          style={{
            fontWeight: 800,
            fontSize: "clamp(1.15rem, 2.5vw, 1.55rem)",
            margin: 0,
          }}
        >
          Folge mir auf Instagram&nbsp;&amp;&nbsp;X
        </h2>
      </div>
    </div>
  );

  if (status === "loading") {
    return (
      <div
        style={{
          marginTop: "4rem",
          paddingTop: "3rem",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {header}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.45; }
          }
        `}</style>
      </div>
    );
  }

  if (status === "empty" || status === "error") {
    return null; // Don't show the section if there's nothing to display
  }

  return (
    <div
      style={{
        marginTop: "4rem",
        paddingTop: "3rem",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {header}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {posts.slice(0, 9).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
