import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: "680px" }}>
        <h1 className="h-section" style={{ marginBottom: "2.5rem" }}>Impressum</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "rgba(0,0,0,0.75)", lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Dein Vorname Nachname<br />
              Deine Straße 1<br />
              00000 Deine Stadt<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Kontakt
            </h2>
            <p>
              E-Mail: dein@email.de
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Dein Vorname Nachname<br />
              (Adresse wie oben)
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Haftungsausschluss
            </h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
              für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind
              ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--black)" }}>
                https://ec.europa.eu/consumers/odr/
              </a>. Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
