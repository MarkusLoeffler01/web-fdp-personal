"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type Termin = {
  id: string;
  title: string;
  date: string;
  location: string | null;
  type: string;
  published: boolean;
};

const TYPE_LABELS: Record<string, string> = {
  BUNDESVERBAND: "Bundesverband",
  LANDESVERBAND: "Landesverband",
  BEZIRK: "Bezirk",
};

export default function AdminTerminePage() {
  const [termine, setTermine] = useState<Termin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/termine")
      .then((r) => r.json())
      .then((data: Termin[]) => {
        setTermine(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Termin wirklich löschen?")) return;
    await fetch(`/api/termine/${id}`, { method: "DELETE" });
    // Refresh list
    const res = await fetch("/api/termine");
    const data = await res.json() as Termin[];
    setTermine(data);
  }

  return (
    <div style={{ padding: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem" }}>Termine</h1>
        <Link href="/admin/termine/new" className="btn btn-yellow">
          + Neuer Termin
        </Link>
      </div>

      {loading ? (
        <p style={{ color: "rgba(0,0,0,0.45)" }}>Lade Termine …</p>
      ) : termine.length === 0 ? (
        <p style={{ color: "rgba(0,0,0,0.45)" }}>Noch keine Termine.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid var(--yellow)",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "0.75rem 1rem" }}>Datum</th>
                <th style={{ padding: "0.75rem 1rem" }}>Titel</th>
                <th style={{ padding: "0.75rem 1rem" }}>Ort</th>
                <th style={{ padding: "0.75rem 1rem" }}>Typ</th>
                <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                <th style={{ padding: "0.75rem 1rem" }} />
              </tr>
            </thead>
            <tbody>
              {termine.map((t) => (
                <tr
                  key={t.id}
                  style={{
                    borderBottom: "1px solid #eee",
                    transition: "background 0.1s",
                  }}
                >
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      whiteSpace: "nowrap",
                      color: "rgba(0,0,0,0.55)",
                    }}
                  >
                    {formatDate(t.date)}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>
                    {t.title}
                  </td>
                  <td
                    style={{ padding: "0.75rem 1rem", color: "rgba(0,0,0,0.55)" }}
                  >
                    {t.location ?? "—"}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: "var(--gray)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "3px",
                      }}
                    >
                      {TYPE_LABELS[t.type] ?? t.type}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: t.published ? "#D4F7D4" : "#FFF4CC",
                        color: t.published ? "#1A7A1A" : "#7A5C00",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "3px",
                      }}
                    >
                      {t.published ? "Veröffentlicht" : "Entwurf"}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => handleDelete(t.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--magenta)",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        padding: "0.25rem 0.5rem",
                      }}
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
