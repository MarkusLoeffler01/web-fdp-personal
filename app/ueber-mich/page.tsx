import type { Metadata } from "next";
import Link from "next/link";
import { DonateSection } from "@/components/sections/DonateSection";
import { profileHighlights, profileIntro, roleBadges } from "@/lib/profile-content";

export const metadata: Metadata = {
  title: "Über mich",
  description: "Biografische Informationen, politische Funktionen und inhaltliche Schwerpunkte.",
};

export default function UeberMichPage() {
  return (
    <>
      <div className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            {/* Photo + sidebar */}
            <div>
              <div
                style={{
                  aspectRatio: "3/4",
                  background: "var(--black)",
                  borderRadius: "4px",
                  marginBottom: "1.5rem",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "5rem",
                    color: "var(--yellow)",
                    fontWeight: 900,
                    opacity: 0.15,
                  }}
                >
                  FOTO
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "6px",
                    height: "50%",
                    background: "var(--yellow)",
                  }}
                />
              </div>

              {/* Contact card */}
              <div
                className="card"
                style={{ padding: "1.25rem", background: "var(--gray)" }}
              >
                <p style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Kurzprofil</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(0,0,0,0.65)" }}>
                  <span>Geboren am 31.07.2001 in Reutlingen</span>
                  <span>Software-Entwickler seit 2022</span>
                  <span>Marktwirtschaftlich, staatskritisch, freiheitlich</span>
                </div>
                <Link href="/kontakt" className="btn btn-black" style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}>
                  Nachricht senden
                </Link>
              </div>
            </div>

            {/* Main content */}
            <div>
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
                Über mich
              </span>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  marginBottom: "2rem",
                  lineHeight: 1.15,
                }}
              >
                Markus Löffler
              </h1>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                {roleBadges.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      background: "var(--gray)",
                      padding: "0.3rem 0.9rem",
                      borderRadius: "99px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(0,0,0,0.7)", marginBottom: "1.5rem" }}>
                {profileIntro.lead}
              </p>

              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(0,0,0,0.65)", marginBottom: "1.5rem" }}>
                {profileIntro.body}
              </p>

              <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginTop: "2.5rem", marginBottom: "1rem" }}>
                Derzeitige Funktionen
              </h2>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {roleBadges.map((amt) => (
                  <li
                    key={amt}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "1rem",
                      color: "rgba(0,0,0,0.65)",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--yellow)",
                        marginTop: "0.6em",
                        flexShrink: 0,
                      }}
                    />
                    {amt}
                  </li>
                ))}
              </ul>

              <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginTop: "2.5rem", marginBottom: "1rem" }}>
                Inhaltliche Leitlinien
              </h2>
              <div style={{ display: "grid", gap: "1rem" }}>
                {profileHighlights.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "1.2rem 1.3rem",
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "18px",
                    }}
                  >
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "0.45rem" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "rgba(0,0,0,0.68)", lineHeight: 1.7 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonateSection />

      <style>{`
        @media (max-width: 768px) {
          .section .container > div[style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
