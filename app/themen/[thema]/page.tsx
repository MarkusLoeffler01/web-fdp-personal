import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { themes } from "@/lib/profile-content";

interface PageProps {
  params: Promise<{ thema: string }>;
}

const themesBySlug = Object.fromEntries(
  themes.map((theme) => [theme.slug, theme]),
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { thema } = await params;
  const data = themesBySlug[thema];
  if (!data) return { title: "Nicht gefunden" };
  return { title: data.label, description: `Meine Position zu: ${data.label}` };
}

export async function generateStaticParams() {
  return themes.map((theme) => ({ thema: theme.slug }));
}

export default async function ThemaPage({ params }: PageProps) {
  const { thema } = await params;
  const data = themesBySlug[thema];
  if (!data) notFound();

  return (
    <article className="section">
      <div className="container" style={{ maxWidth: "780px" }}>
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
            marginBottom: "1.25rem",
          }}
        >
          Position
        </span>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            marginBottom: "2rem",
          }}
        >
          {data.label}
        </h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.content }}
          style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(0,0,0,0.75)" }}
        />
      </div>
    </article>
  );
}
