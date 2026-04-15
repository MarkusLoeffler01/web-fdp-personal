import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { heroFocusPoints, roleBadges } from "@/lib/profile-content";

export function HeroSection() {
  return (
    <section className="hero-shell">
      <div className="hero-spot hero-spot-left" aria-hidden="true" />
      <div className="hero-spot hero-spot-right" aria-hidden="true" />
      <div className="container hero-grid">
        <Reveal className="hero-copy">
          <span className="eyebrow eyebrow-magenta">FDP Bad Urach | JuLis Baden-Württemberg</span>
          <h1 className="hero-title">
            Freiheit klar vertreten.
            <br />
            Verantwortung ernst nehmen.
          </h1>
          <p className="hero-lead">
            Ich bin in Reutlingen geboren, arbeite seit 2022 als
            Software-Entwickler und engagiere mich politisch als stellvertretender
            Vorsitzender der FDP Bad Urach sowie in mehreren Funktionen bei den
            Jungen Liberalen in Reutlingen, Süd-Württemberg und Baden-Württemberg.
          </p>

          <div className="hero-actions">
            <Link href="/ueber-mich" className="btn btn-primary">
              Über mich
            </Link>
            <Link href="/kontakt" className="btn btn-secondary">
              Kontakt aufnehmen
            </Link>
          </div>

          <div className="hero-inline-notes">
            {roleBadges.slice(0, 2).map((badge) => (
              <span key={badge} className="floating-chip">
                {badge}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="hero-stack" direction="left" delay={140}>
          <div className="hero-card hero-card-primary">
            <span className="eyebrow eyebrow-dark">Politischer Kompass</span>
            <h2 className="hero-card-title">
              Marktwirtschaftlich, staatskritisch und konsequent freiheitlich.
            </h2>
            <p className="hero-card-copy">
              Ich setze mich für einen effizienteren Staat, niedrigere Belastungen,
              starke Bürgerrechte und Reformen ein, die Baden-Württemberg wieder
              leistungsfähiger machen.
            </p>
          </div>

          <div className="hero-card hero-card-quote">
            <p className="hero-quote">
              Demokratie verteidigt man nicht vom Sofa aus.
            </p>
          </div>

          <div className="hero-card hero-card-list">
            <span className="eyebrow eyebrow-yellow">Schwerpunkte</span>
            <ul className="hero-list">
              {heroFocusPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
