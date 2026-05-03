import type { Metadata } from "next";
import Link from "next/link";
import { DonateSection } from "@/components/sections/DonateSection";

export const metadata: Metadata = {
  title: "Mitmachen",
  description: "Werde Mitglied bei den JuLis BW oder engagiere dich bei der FDP BW.",
};

export default function MitmachenPage() {
  return (
    <>
      <div className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
                marginBottom: "1rem",
              }}
            >
              Engagement
            </span>
            <h1 className="h-section" style={{ marginBottom: "1rem" }}>
              Mitmachen
            </h1>
            <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1.1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              Politik braucht dich. Ob als Mitglied, Unterstützer oder Aktiver —
              jede Stimme zählt.
            </p>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              marginBottom: "4rem",
            }}
          >
            {/* JuLis */}
            <div
              className="card"
              style={{
                padding: "2.5rem 2rem",
                borderTop: "5px solid var(--yellow)",
              }}
            >
              <h2 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "1rem" }}>
                JuLis BW
              </h2>
              <p style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Die Jungen Liberalen Baden-Württemberg sind der Jugendverband der FDP.
                Mitglied werden bis 35 Jahre
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Politische Bildung", "Vernetzung", "Kongresse & Events", "Demokratische Mitbestimmung"].map((b) => (
                  <li key={b} style={{ display: "flex", gap: "0.6rem", alignItems: "center", fontSize: "0.9rem", color: "rgba(0,0,0,0.7)" }}>
                    <span style={{ color: "var(--yellow)", fontSize: "1.1rem", fontWeight: 700 }}>✓</span> {b}
                  </li>
                ))}
              </ul>
              <a
                href="https://julis.de/mitglied-werden-2/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Jetzt bei den Jungen Liberalen mitmachen ↗
              </a>
            </div>

            {/* FDP */}
            <div
              className="card"
              style={{
                padding: "2.5rem 2rem",
                borderTop: "5px solid var(--magenta)",
              }}
            >
              <h2 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "1rem" }}>
                FDP BW
              </h2>
              <p style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Die FDP Baden-Württemberg kämpft für eine liberale, marktwirtschaftliche
                und bürgerrechtsorientierte Politik.
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Politische Mitgestaltung", "Wahlkampf & Kandidatur", "Netzwerk & Kontakte", "Parteitage & Abstimmungen"].map((b) => (
                  <li key={b} style={{ display: "flex", gap: "0.6rem", alignItems: "center", fontSize: "0.9rem", color: "rgba(0,0,0,0.7)" }}>
                    <span style={{ color: "var(--magenta)", fontSize: "1.1rem", fontWeight: 700 }}>✓</span> {b}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.fdpbw.de/mitglied-werden"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "var(--magenta)", color: "var(--white)", width: "100%", justifyContent: "center" }}
              >
                Jetzt bei der FDP mitmachen ↗
              </a>
            </div>
          </div>

          {/* Contact CTA */}
          <div
            style={{
              background: "var(--gray)",
              padding: "2.5rem",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                Fragen? Ich helfe gerne!
              </h3>
              <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.95rem" }}>
                Du weißt nicht, was zu dir passt? Schreib mir — ich berate dich persönlich.
              </p>
            </div>
            <Link href="/kontakt" className="btn btn-black" style={{ whiteSpace: "nowrap" }}>
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </div>

      <div id="spenden">
        <DonateSection />
      </div>
    </>
  );
}
