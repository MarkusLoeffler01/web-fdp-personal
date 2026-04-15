"use client";

import { useState, useEffect } from "react";

type Person = {
  id: string;
  name: string;
  role: string;
  email: string | null;
  instagram: string | null;
  linkedin: string | null;
  verband: string;
  order: number;
};

const VERBÄNDE = [
  { label: "JuLis BW", value: "JULIS" },
  { label: "FDP BW", value: "FDP" },
  { label: "Beide", value: "BEIDE" },
];

const VERBAND_LABELS: Record<string, string> = {
  JULIS: "JuLis BW",
  FDP: "FDP BW",
  BEIDE: "Beide",
};

const EMPTY_FORM = {
  name: "",
  role: "",
  email: "",
  instagram: "",
  linkedin: "",
  verband: "JULIS",
  order: 0,
};

export default function AdminPersonenPage() {
  const [personen, setPersonen] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/personen")
      .then((r) => r.json())
      .then((data) => {
        setPersonen(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "order" ? Number(value) : value }));
  }

  async function handleAdd() {
    if (!form.name || !form.role) {
      setError("Name und Funktion sind Pflichtfelder.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/personen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: form.email || null,
          instagram: form.instagram || null,
          linkedin: form.linkedin || null,
        }),
      });
      if (res.ok) {
        setForm(EMPTY_FORM);
        setShowForm(false);
        fetch("/api/personen")
          .then((r) => r.json())
          .then((data) => setPersonen(data))
          .catch(() => {});
      } else {
        const data = await res.json();
        setError(data.error ?? "Fehler beim Speichern.");
      }
    } catch {
      setError("Netzwerkfehler.");
    }
    setSaving(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.9rem",
    border: "2px solid #E0E0E0",
    borderRadius: "4px",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    fontSize: "0.8rem",
    marginBottom: "0.3rem",
    color: "rgba(0,0,0,0.6)",
  };

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
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem" }}>Personen</h1>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            setError("");
          }}
          className="btn btn-yellow"
        >
          {showForm ? "Abbrechen" : "+ Person hinzufügen"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          style={{
            background: "var(--gray)",
            borderRadius: "6px",
            padding: "1.5rem",
            marginBottom: "2rem",
            border: "2px solid var(--yellow)",
          }}
        >
          <h2
            style={{ fontWeight: 700, marginBottom: "1.25rem", fontSize: "1rem" }}
          >
            Neue Person
          </h2>
          {error && (
            <div
              style={{
                background: "#FFE8E8",
                padding: "0.75rem 1rem",
                borderRadius: "4px",
                marginBottom: "1rem",
                color: "var(--magenta)",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label htmlFor="person-name" style={labelStyle}>Name *</label>
              <input
                id="person-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <label htmlFor="person-role" style={labelStyle}>Funktion *</label>
              <input
                id="person-role"
                name="role"
                value={form.role}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Landesvorsitzender"
              />
            </div>
            <div>
              <label htmlFor="person-email" style={labelStyle}>E-Mail</label>
              <input
                id="person-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="max@example.com"
              />
            </div>
            <div>
              <label htmlFor="person-instagram" style={labelStyle}>Instagram-URL</label>
              <input
                id="person-instagram"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                style={inputStyle}
                placeholder="https://instagram.com/…"
              />
            </div>
            <div>
              <label htmlFor="person-linkedin" style={labelStyle}>LinkedIn-URL</label>
              <input
                id="person-linkedin"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                style={inputStyle}
                placeholder="https://linkedin.com/in/…"
              />
            </div>
            <div>
              <label htmlFor="person-verband" style={labelStyle}>Verband</label>
              <select
                id="person-verband"
                name="verband"
                value={form.verband}
                onChange={handleChange}
                style={{ ...inputStyle, background: "white" }}
              >
                {VERBÄNDE.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="person-order" style={labelStyle}>Reihenfolge</label>
              <input
                id="person-order"
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                style={inputStyle}
                min={0}
              />
            </div>
          </div>
          <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={handleAdd}
              disabled={saving}
              className="btn btn-yellow"
            >
              {saving ? "Speichern …" : "Speichern"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
              className="btn btn-outline"
              style={{ borderColor: "var(--black)", color: "var(--black)" }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p style={{ color: "rgba(0,0,0,0.45)" }}>Lade Personen …</p>
      ) : personen.length === 0 ? (
        <p style={{ color: "rgba(0,0,0,0.45)" }}>Noch keine Personen.</p>
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
                <th style={{ padding: "0.75rem 1rem" }}>#</th>
                <th style={{ padding: "0.75rem 1rem" }}>Name</th>
                <th style={{ padding: "0.75rem 1rem" }}>Funktion</th>
                <th style={{ padding: "0.75rem 1rem" }}>Verband</th>
                <th style={{ padding: "0.75rem 1rem" }}>Kontakt</th>
              </tr>
            </thead>
            <tbody>
              {personen
                .sort((a, b) => a.order - b.order)
                .map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        color: "rgba(0,0,0,0.35)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {p.order}
                    </td>
                    <td
                      style={{ padding: "0.75rem 1rem", fontWeight: 600 }}
                    >
                      {p.name}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        color: "rgba(0,0,0,0.65)",
                      }}
                    >
                      {p.role}
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
                        {VERBAND_LABELS[p.verband] ?? p.verband}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        color: "rgba(0,0,0,0.55)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {p.email ?? "—"}
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
