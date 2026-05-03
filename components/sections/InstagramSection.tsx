import Image from "next/image";
import { fetchInstagramPosts } from "@/lib/instagram";
import type { InstagramPost } from "@/lib/types/instagram";
import { InstagramVideoCard } from "@/components/ui/InstagramVideoCard";

function formatCaption(caption?: string): string {
  if (!caption) return "";
  // Trim to 90 chars without stripping hashtags
  const trimmed = caption.trim();
  return trimmed.length > 90 ? trimmed.slice(0, 90) + "\u2026" : trimmed;
}

function PostCard({ post }: { post: InstagramPost }) {
  const caption = formatCaption(post.caption);
  const isVideo = post.media_type === "VIDEO";

  // Videos without a thumbnail: use the interactive client component
  if (isVideo && !post.thumbnail_url) {
    return (
      <InstagramVideoCard
        src={post.media_url}
        caption={caption}
        permalink={post.permalink}
      />
    );
  }

  // For videos with a thumbnail, or all image/carousel posts
  const imageUrl = isVideo ? post.thumbnail_url! : post.media_url;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="ig-card"
      aria-label={caption || "Instagram Post \u00f6ffnen"}
    >
      <div className="ig-card__img">
        <Image
          src={imageUrl}
          alt={caption || "Instagram Post"}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
          style={{ objectFit: "cover" }}
        />
        <div className="ig-card__overlay">
          {isVideo && (
            <span className="ig-card__type-icon">&#9654;</span>
          )}
          {post.media_type === "CAROUSEL_ALBUM" && (
            <span className="ig-card__type-icon">&#10697;</span>
          )}
          {caption && <p className="ig-card__caption">{caption}</p>}
        </div>
      </div>
    </a>
  );
}

function PlaceholderCard({ i }: { i: number }) {
  return (
    <div
      style={{
        aspectRatio: "1",
        background: "linear-gradient(135deg, #1a0010 0%, #2d0020 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5,
      }}
    >
      <span style={{ fontSize: "1.5rem", opacity: 0.15, fontWeight: 900, color: "var(--yellow)" }}>
        {i}
      </span>
    </div>
  );
}

export async function InstagramSection({
  username,
  maxPosts = 12,
}: {
  username?: string;
  maxPosts?: number;
}) {
  const posts = await fetchInstagramPosts();
  const displayPosts = posts.slice(0, maxPosts);
  const igUsername = username ?? (posts[0]?.username ? "@" + posts[0].username : "@instagram");
  const profileUrl = posts[0]?.username
    ? "https://instagram.com/" + posts[0].username
    : "https://instagram.com";

  return (
    <section
      className="section"
      style={{ background: "var(--black)", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: "4px",
          background: "linear-gradient(90deg, var(--yellow) 0%, var(--magenta) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 80% 40%, rgba(230,0,126,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block", fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--black)", background: "var(--yellow)",
                padding: "0.2rem 0.6rem", marginBottom: "0.75rem",
              }}
            >
              Instagram
            </span>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 800, color: "var(--white)", lineHeight: 1.1,
              }}
            >
              Schon{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--yellow) 0%, var(--magenta) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                gesehen?
              </span>
            </h2>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 700, fontSize: "0.875rem", color: "var(--magenta)",
              textDecoration: "none", border: "2px solid var(--magenta)",
              padding: "0.4rem 1rem", whiteSpace: "nowrap",
            }}
          >
            {igUsername} folgen &#8599;
          </a>
        </div>

        <div className="ig-grid">
          {displayPosts.length > 0
            ? displayPosts.map((post) => <PostCard key={post.id} post={post} />)
            : [0, 1, 2, 3, 4, 5].map((i) => <PlaceholderCard key={"ig-ph-" + i} i={i} />)
          }
        </div>

        {displayPosts.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-white"
              style={{ display: "inline-block" }}
            >
              Alle Posts auf Instagram ansehen &#8599;
            </a>
          </div>
        )}
      </div>

      <style>{`
        .ig-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        @media (max-width: 900px) { .ig-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 560px) { .ig-grid { grid-template-columns: repeat(2, 1fr); } }
        .ig-card { display: block; text-decoration: none; }
        .ig-card__img {
          position: relative; aspect-ratio: 1; overflow: hidden; background: #1a0010;
        }
        .ig-card__overlay {
          position: absolute; inset: 0; opacity: 0; transition: opacity 0.25s;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 0.75rem;
        }
        .ig-card:hover .ig-card__overlay, .ig-card:focus .ig-card__overlay { opacity: 1; }
        .ig-card__img img { transition: transform 0.35s ease; }
        .ig-card:hover .ig-card__img img, .ig-card:focus .ig-card__img img {
          transform: scale(1.05);
        }
        .ig-card__caption {
          color: #fff; font-size: 0.78rem; line-height: 1.4; margin: 0;
          overflow: hidden; display: -webkit-box;
          -webkit-line-clamp: 3; -webkit-box-orient: vertical;
        }
        .ig-card__type-icon {
          position: absolute; top: 0.5rem; right: 0.5rem; color: #fff;
          font-size: 0.85rem; background: rgba(0,0,0,0.55);
          border-radius: 3px; padding: 1px 5px; line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
