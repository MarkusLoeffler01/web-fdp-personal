"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TYPES = [
  { label: "Landesverband", value: "LANDESVERBAND" },
  { label: "Bundesverband", value: "BUNDESVERBAND" },
  { label: "Bezirk", value: "BEZIRK" },
];

export default function NewTerminPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    date: "",
    endDate: "",
    location: "",
    description: "",
    type: "LANDESVERBAND",
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSave(published: boolean) {
    if (!form.title || !form.date) {
      setError("Titel und Datum sind Pflichtfelder.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const body: Record<string, unknown> = {
        title: form.title,
        date: new Date(form.date).toISOString(),
        location: form.location || null,
        description: form.description || null,
        type: form.type,
        published,
      };
      if (form.endDate) {
        body.endDate = new Date(form.endDate).toISOString();
      }
      const res = await fetch("/api/termine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        router.push("/admin/termine");
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
    padding: "0.75rem 1rem",
    border: "2px solid #E0E0E0",
    borderRadius: "4px",
    fontSize: "1rem",
    fontFamily: "inherit",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    fontSize: "0.875rem",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ padding: "2.5rem", maxWidth: "700px" }}>
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
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem" }}>Neuer Termin</h1>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="btn btn-outline"
            style={{ borderColor: "var(--black)", color: "var(--black)" }}
          >
            Als Entwurf speichern
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="btn btn-yellow"
          >
            {saving ? "Speichern …" : "Veröffentlichen"}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: "#FFE8E8",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1.5rem",
            color: "var(--magenta)",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label htmlFor="title" style={labelStyle}>Titel *</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={handleChange}
            style={{ ...inputStyle, fontWeight: 600 }}
            placeholder="z.B. Landesausschuss BW"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
          }}
        >
          <div>
            <label htmlFor="date" style={labelStyle}>Startdatum *</label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              required
              value={form.date}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="endDate" style={labelStyle}>Enddatum (optional)</label>
            <input
              id="endDate"
              name="endDate"
              type="datetime-local"
              value={form.endDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 200px",
            gap: "1.25rem",
          }}
        >
          <div>
            <label htmlFor="location" style={labelStyle}>Ort</label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              style={inputStyle}
              placeholder="z.B. Stuttgarter Rathaus"
            />
          </div>
          <div>
            <label htmlFor="type" style={labelStyle}>Typ</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              style={{ ...inputStyle, background: "white" }}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" style={labelStyle}>Beschreibung</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="Kurze Beschreibung des Termins …"
          />
        </div>
      </div>
    </div>
  );
}
