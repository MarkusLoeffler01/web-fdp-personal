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

function PostCard({ post, eager }: { post: InstagramPost; eager?: boolean }) {
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
          loading={eager ? "eager" : "lazy"}
          priority={eager}
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
            ? displayPosts.map((post, i) => <PostCard key={post.id} post={post} eager={i === 0} />)
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

    </section>
  );
}
