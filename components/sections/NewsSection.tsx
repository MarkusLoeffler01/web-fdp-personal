import Link from "next/link";
import { NewsCard } from "@/components/ui/NewsCard";
import { Reveal } from "@/components/ui/Reveal";

interface Post {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  image: string | null;
  category: string;
  publishedAt: Date | null;
}

interface NewsSectionProps {
  posts: Post[];
}

export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="news-intro">
          <div>
            <span className="eyebrow eyebrow-magenta">Aktuelles</span>
            <h2 className="section-title">Einordnungen, Updates und Positionen</h2>
          </div>
          <p className="news-intro-copy">
            Eine persoenliche politische Seite lebt von aktuellen Gedanken und
            nachvollziehbaren Positionen. Genau dafuer ist dieser Bereich da.
          </p>
          <Link href="/aktuelles" className="section-link">
            Alle Meldungen
          </Link>
        </Reveal>

        {posts.length > 0 ? (
          <div className="news-grid">
            {posts.map((post, index) => (
              <Reveal key={post.id} delay={100 + index * 90}>
                <NewsCard
                  slug={post.slug}
                  title={post.title}
                  teaser={post.teaser}
                  image={post.image ?? undefined}
                  category={post.category}
                  publishedAt={post.publishedAt ?? undefined}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="empty-state">
            <span className="eyebrow eyebrow-dark">Noch leer</span>
            <h3>Hier erscheinen kuenftig persoenliche Einordnungen und News.</h3>
            <p>
              Sobald Beitraege veroeffentlicht sind, wird die Startseite diesen
              Bereich automatisch fuellen.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
