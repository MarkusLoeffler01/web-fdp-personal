import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { profileHighlights, profileIntro } from "@/lib/profile-content";

export function AboutMeSection() {
  return (
    <section className="section">
      <div className="container profile-grid">
        <Reveal className="profile-visual">
          <div className="portrait-shell">
            <div className="portrait-circle">
              <span>DN</span>
            </div>
            <div className="portrait-card">
              <span className="eyebrow eyebrow-magenta">Profil</span>
              <p>
                Jahrgang 2001, geboren in Reutlingen, seit 2022 in der
                Software-Entwicklung tätig.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="profile-copy">
          <Reveal>
            <span className="eyebrow eyebrow-dark">{profileIntro.eyebrow}</span>
            <h2 className="section-title">{profileIntro.title}</h2>
            <p className="section-lead">{profileIntro.lead}</p>
            <p className="section-copy">{profileIntro.body}</p>
          </Reveal>

          <div className="value-grid">
            {profileHighlights.map((value, index) => (
              <Reveal
                key={value.title}
                className="soft-card"
                delay={120 + index * 100}
              >
                <span className="value-index">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div className="inline-actions">
              <Link href="/ueber-mich" className="btn btn-secondary">
                Mehr über mich
              </Link>
              <Link href="/mitmachen" className="btn btn-ghost">
                Im Gespräch bleiben
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
