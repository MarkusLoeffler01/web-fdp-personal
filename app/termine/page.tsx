"use client";

import { useState } from "react";
import { DateBadge } from "@/components/ui/DateBadge";

// Placeholder termine — will be replaced with real API data once DB is connected
const DEMO_TERMINE = [
  {
    id: "1",
    title: "Landesvorstandssitzung",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    location: "Stuttgart",
    type: "LANDESVERBAND",
    description: "Monatliche Sitzung des JuLis BW Landesvorstands.",
  },
  {
    id: "2",
    title: "Bundeskongress",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    location: "Berlin",
    type: "BUNDESVERBAND",
    description: "Bundeskongress der Jungen Liberalen.",
  },
  {
    id: "3",
    title: "Bezirkstreffen Mittelbaden",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21),
    location: "Karlsruhe",
    type: "BEZIRK",
    description: "Treffen des Bezirksverbands Mittelbaden.",
  },
];

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

const FILTER_OPTIONS = [
  { label: "Alle", value: "ALL" },
  { label: "Landesverband", value: "LANDESVERBAND" },
  { label: "Bundesverband", value: "BUNDESVERBAND" },
  { label: "Bezirk", value: "BEZIRK" },
];

export default function TerminePage() {
  const [active, setActive] = useState("ALL");

  const filtered = DEMO_TERMINE.filter(
    (t) => active === "ALL" || t.type === active
  );

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
            Kalender
          </span>
          <h1 className="h-section">Termine</h1>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {FILTER_OPTIONS.map((opt) => (
            <button              type="button"              key={opt.value}
              onClick={() => setActive(opt.value)}
              style={{
                padding: "0.4rem 1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: active === opt.value ? 700 : 500,
                fontSize: "0.875rem",
                borderBottom: active === opt.value ? "3px solid var(--yellow)" : "3px solid transparent",
                color: active === opt.value ? "var(--black)" : "rgba(0,0,0,0.5)",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.map((termin) => (
              <div
                key={termin.id}
                className="card"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.5rem",
                  padding: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <DateBadge date={termin.date} />
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
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
                  <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.35rem" }}>
                    {termin.title}
                  </h2>
                  {termin.location && (
                    <p style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.5)", marginBottom: "0.35rem" }}>
                      📍 {termin.location}
                    </p>
                  )}
                  {termin.description && (
                    <p style={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
                      {termin.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "rgba(0,0,0,0.45)", textAlign: "center", padding: "4rem 0" }}>
            Keine Termine gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
