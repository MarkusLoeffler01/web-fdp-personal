"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { signIn } = await import("next-auth/react");
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("E-Mail oder Passwort falsch.");
    }
    setLoading(false);
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--black)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "var(--white)",
          width: "100%",
          maxWidth: "400px",
          padding: "2.5rem",
          borderRadius: "4px",
          borderTop: "5px solid var(--yellow)",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "28px",
              background: "var(--yellow)",
              borderRadius: "2px",
              verticalAlign: "middle",
              marginRight: "0.6rem",
            }}
          />
          <span style={{ fontWeight: 800, fontSize: "1.15rem" }}>Admin Login</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p style={{ color: "var(--magenta)", fontWeight: 600, fontSize: "0.9rem" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-black"
            style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Anmelden …" : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
