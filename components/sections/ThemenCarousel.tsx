import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { themes } from "@/lib/profile-content";

export function ThemenCarousel() {
  return (
    <section className="section section-contrast">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow eyebrow-yellow">Schwerpunkte</span>
            <h2 className="section-title section-title-light">
              Die Themen, an denen ich politisch arbeite
            </h2>
          </div>
          <Link href="/themen" className="section-link section-link-light">
            Alle Themen ansehen
          </Link>
        </Reveal>

        <div className="focus-grid">
          {themes.slice(0, 6).map((thema, index) => (
            <Reveal
              key={thema.slug}
              className="focus-card"
              delay={100 + index * 90}
            >
              <span className="focus-index">0{index + 1}</span>
              <h3>{thema.label}</h3>
              <p>{thema.teaser}</p>
              <Link href={`/themen/${thema.slug}`} className="card-link">
                Mehr dazu
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
