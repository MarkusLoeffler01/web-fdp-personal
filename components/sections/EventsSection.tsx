import Link from "next/link";
import { DateBadge } from "@/components/ui/DateBadge";

interface Termin {
  id: string;
  title: string;
  date: Date;
  location: string | null;
  type: string;
}

interface EventsSectionProps {
  termine: Termin[];
}

const TYPE_COLORS: Record<string, string> = {
  BUNDESVERBAND: "var(--personal)",
  LANDESVERBAND: "var(--yellow)",
  BEZIRK: "var(--magenta)",
};

const TYPE_LABELS: Record<string, string> = {
  BUNDESVERBAND: "Bundesverband",
  LANDESVERBAND: "Landesverband",
  BEZIRK: "Bezirk",
};

export function EventsSection({ termine }: EventsSectionProps) {
  return (
    <section className="section bg-gray">
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
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
                marginBottom: "0.75rem",
              }}
            >
              Kalender
            </span>
            <h2 className="h-section">Kommende Termine</h2>
          </div>
          <Link
            href="/termine"
            style={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "var(--black)",
              textDecoration: "none",
              borderBottom: "2px solid var(--yellow)",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
            }}
          >
            Alle Termine →
          </Link>
        </div>

        {/* Termin list */}
        {termine.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {termine.map((termin) => (
              <div
                key={termin.id}
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.25rem 1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <DateBadge date={termin.date} />

                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.15rem 0.55rem",
                        background: TYPE_COLORS[termin.type] ?? "var(--gray)",
                        color: termin.type === "LANDESVERBAND" ? "var(--black)" : "var(--white)",
                        borderRadius: "2px",
                      }}
                    >
                      {TYPE_LABELS[termin.type] ?? termin.type}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "var(--black)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {termin.title}
                  </h3>
                  {termin.location && (
                    <p style={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.5)" }}>
                      📍 {termin.location}
                    </p>
                  )}
                </div>

                <Link
                  href="/termine"
                  style={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "var(--black)",
                    textDecoration: "none",
                    borderBottom: "2px solid var(--yellow)",
                    paddingBottom: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "rgba(0,0,0,0.45)", textAlign: "center", padding: "3rem 0" }}>
            Keine kommenden Termine.
          </p>
        )}
      </div>
    </section>
  );
}
