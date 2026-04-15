import type { Metadata } from "next";
import Link from "next/link";
import { NewsCard } from "@/components/ui/NewsCard";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Aktuelles",
  description: "Pressemitteilungen, Beschlüsse und Neuigkeiten.",
};

export const revalidate = 60;

const CATEGORIES = [
  { label: "Alle", value: "ALL" },
  { label: "Pressemitteilungen", value: "PRESSEMITTEILUNG" },
  { label: "Beschlüsse", value: "BESCHLUSS" },
  { label: "Newsletter", value: "NEWSLETTER" },
  { label: "Allgemein", value: "ALLGEMEIN" },
];

interface PageProps {
  searchParams: Promise<{ kategorie?: string }>;
}

export default async function AktuellesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const kat = params.kategorie ?? "ALL";

  let posts: {
    id: string;
    slug: string;
    title: string;
    teaser: string;
    image: string | null;
    category: string;
    publishedAt: Date | null;
  }[] = [];

  try {
    posts = await prisma.post.findMany({
      where: {
        published: true,
        ...(kat !== "ALL" ? { category: kat as never } : {}),
      },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        teaser: true,
        image: true,
        category: true,
        publishedAt: true,
      },
    });
  } catch {
    posts = [];
  }

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
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
              marginBottom: "0.75rem",
            }}
          >
            Neuigkeiten
          </span>
          <h1 className="h-section">Aktuelles</h1>
        </div>

        {/* Filter */}
        <FilterTabs tabs={CATEGORIES} active={kat} onChange={() => {}} />
        <style>{`
          /* Server-rendered filter tabs use links */
        `}</style>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {CATEGORIES.map((c) => (
            <Link
              key={c.value}
              href={c.value === "ALL" ? "/aktuelles" : `/aktuelles?kategorie=${c.value}`}
              style={{
                padding: "0.4rem 1rem",
                fontWeight: kat === c.value ? 700 : 500,
                fontSize: "0.875rem",
                borderBottom: kat === c.value ? "3px solid var(--yellow)" : "3px solid transparent",
                color: kat === c.value ? "var(--black)" : "rgba(0,0,0,0.5)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {posts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {posts.map((post: { id: string; slug: string; title: string; teaser: string; image: string | null; category: string; publishedAt: Date | null }) => (
              <NewsCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                teaser={post.teaser}
                image={post.image ?? undefined}
                category={post.category}
                publishedAt={post.publishedAt ?? undefined}
              />
            ))}
          </div>
        ) : (
          <p style={{ color: "rgba(0,0,0,0.45)", textAlign: "center", padding: "4rem 0" }}>
            Keine Beiträge gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
