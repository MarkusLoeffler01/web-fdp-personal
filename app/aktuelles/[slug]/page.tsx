import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { prisma } from "@/lib/prisma";
import { formatDateLong } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: { title: string; teaser: string } | null = null;

  try {
    post = await prisma.post.findUnique({
      where: { slug, published: true },
      select: { title: true, teaser: true },
    });
  } catch {
    return { title: "Nicht gefunden" };
  }

  if (!post) return { title: "Nicht gefunden" };
  return { title: post.title, description: post.teaser };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });

    return posts.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: {
    title: string;
    teaser: string;
    category: string;
    publishedAt: Date | null;
    image: string | null;
    content: string;
  } | null = null;

  try {
    post = await prisma.post.findUnique({
      where: { slug, published: true },
    });
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <article className="section">
      <div className="container" style={{ maxWidth: "780px" }}>
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <CategoryBadge category={post.category} />
          {post.publishedAt && (
            <span style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.45)" }}>
              {formatDateLong(post.publishedAt)}
            </span>
          )}
        </div>

        {/* Image */}
        {post.image && (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              background: "var(--black)",
              marginBottom: "2.5rem",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 780px) 100vw, 780px"
            />
          </div>
        )}

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          {post.title}
        </h1>

        {/* Teaser */}
        <p
          style={{
            fontSize: "1.15rem",
            color: "rgba(0,0,0,0.6)",
            lineHeight: 1.7,
            marginBottom: "2rem",
            borderLeft: "4px solid var(--yellow)",
            paddingLeft: "1.25rem",
          }}
        >
          {post.teaser}
        </p>

        {/* Body (Tiptap HTML) */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "rgba(0,0,0,0.75)",
          }}
        />
      </div>
    </article>
  );
}
