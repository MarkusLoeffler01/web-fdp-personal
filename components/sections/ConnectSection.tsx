import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { roleBadges } from "@/lib/profile-content";

const CARDS = [
  {
    title: "Kontakt",
    body: "Ich freue mich über Anregungen, Rückfragen und den direkten Austausch zu lokalen wie landespolitischen Themen.",
    href: "/kontakt",
    label: "Nachricht senden",
  },
  {
    title: "Themen",
    body: "Von Staatsfinanzen über Demokratie bis zur Verwaltungsreform in Baden-Württemberg findest du hier meine politischen Schwerpunkte.",
    href: "/themen",
    label: "Themen ansehen",
  },
  {
    title: "Aktuelles",
    body: "Im News-Bereich ordne ich politische Entwicklungen ein und halte über Positionen, Projekte und Termine auf dem Laufenden.",
    href: "/aktuelles",
    label: "Zu den Meldungen",
  },
];

export function ConnectSection() {
  return (
    <section className="section section-connect">
      <div className="container connect-layout">
        <Reveal className="connect-copy">
          <span className="eyebrow eyebrow-dark">Im Gespräch bleiben</span>
          <h2 className="section-title">
            Politik lebt vom Mitmachen und vom direkten Austausch.
          </h2>
          <p className="section-lead">
            Ob kommunale Fragen in Bad Urach, liberale Positionen auf Landesebene
            oder konkrete Rückfragen zu meinen Themen: Der direkte Kontakt ist
            mir wichtig.
          </p>
          <div className="hero-inline-notes">
            {roleBadges.slice(1).map((badge) => (
              <span key={badge} className="floating-chip">
                {badge}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="connect-grid">
          {CARDS.map((card, index) => (
            <Reveal key={card.href} className="connect-card" delay={100 + index * 90}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <Link href={card.href} className="card-link">
                {card.label}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
