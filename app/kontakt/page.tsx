"use client";

import { useState } from "react";

export default function KontaktPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "2px solid #E0E0E0",
    borderRadius: "4px",
    fontSize: "1rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: "780px" }}>
        <div style={{ marginBottom: "3rem" }}>
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
            Schreib mir
          </span>
          <h1 className="h-section">Kontakt</h1>
        </div>

        {status === "sent" ? (
          <div
            style={{
              background: "var(--gray)",
              padding: "3rem",
              textAlign: "center",
              borderRadius: "4px",
              borderLeft: "5px solid var(--yellow)",
            }}
          >
            <p style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Nachricht gesendet! ✓
            </p>
            <p style={{ color: "rgba(0,0,0,0.6)" }}>
              Ich melde mich so bald wie möglich.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label htmlFor="name" style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Dein Name"
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
                  E-Mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="deine@email.de"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
                Betreff
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                style={{ ...inputStyle, background: "white" }}
              >
                <option value="">Bitte wählen …</option>
                <option value="Mitgliedschaft">Mitgliedschaft / Mitmachen</option>
                <option value="Presseanfrage">Presseanfrage</option>
                <option value="Kooperation">Kooperation / Veranstaltung</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
                Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                rows={6}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Deine Nachricht …"
              />
            </div>

            {status === "error" && (
              <p style={{ color: "var(--magenta)", fontWeight: 600 }}>
                Fehler beim Senden. Bitte versuche es erneut oder schreib direkt per E-Mail.
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-black"
                style={{ opacity: status === "sending" ? 0.6 : 1 }}
              >
                {status === "sending" ? "Wird gesendet …" : "Nachricht senden →"}
              </button>
            </div>

            <p style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.4)" }}>
              Deine Daten werden nur zur Bearbeitung dieser Anfrage genutzt.{" "}
              <a href="/datenschutz" style={{ color: "inherit" }}>Datenschutzerklärung</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
