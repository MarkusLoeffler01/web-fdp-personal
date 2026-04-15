import type { Metadata } from "next";
import Link from "next/link";
import { TopicCard } from "@/components/ui/TopicCard";
import { themes } from "@/lib/profile-content";

export const metadata: Metadata = {
  title: "Themen",
  description: "Meine politischen Schwerpunkte und Positionen.",
};

export default function ThemenPage() {
  return (
    <div className="section">
      <div className="container">
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
            Positionen
          </span>
          <h1 className="h-section">Meine Themen</h1>
          <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1rem", maxWidth: "720px", lineHeight: 1.7, marginTop: "1rem" }}>
            Meine politischen Schwerpunkte reichen von Staatsfinanzen und
            Bürgerrechten über Demokratiefragen bis hin zu Wohnen, Bildung und
            Verwaltungsreformen in Baden-Württemberg.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {themes.map((t) => (
            <div key={t.slug}>
              <TopicCard
                label={t.label}
                href={`/themen/${t.slug}`}
              />
              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: 1.6,
                }}
              >
                {t.teaser}
              </p>
              <Link
                href={`/themen/${t.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "var(--black)",
                textDecoration: "none",
                borderBottom: "2px solid var(--yellow)",
                paddingBottom: "1px",
              }}
            >
                Position lesen
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
