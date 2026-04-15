import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  let stats = { posts: 0, termine: 0, personen: 0 };
  try {
    const [posts, termine, personen] = await Promise.all([
      prisma.post.count({ where: { published: true } }),
      prisma.termin.count({ where: { published: true } }),
      prisma.person.count(),
    ]);
    stats = { posts, termine, personen };
  } catch {
    // DB not connected
  }

  return (
    <div style={{ padding: "2.5rem" }}>
      <h1 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        Dashboard
      </h1>
      <p style={{ color: "rgba(0,0,0,0.5)", marginBottom: "2.5rem" }}>
        Willkommen im Admin-Bereich.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}
      >
        {[
          { label: "Veröffentlichte Beiträge", value: stats.posts, href: "/admin/posts", color: "var(--yellow)" },
          { label: "Aktive Termine", value: stats.termine, href: "/admin/termine", color: "var(--personal)" },
          { label: "Personen", value: stats.personen, href: "/admin/personen", color: "var(--magenta)" },
        ].map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card"
              style={{
                padding: "1.5rem",
                borderTop: `4px solid ${stat.color}`,
                background: "var(--white)",
              }}
            >
              <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--black)", lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.5)", marginTop: "0.5rem" }}>
                {stat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Schnellzugriff
      </h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/admin/posts/new" className="btn btn-yellow">
          + Neuer Beitrag
        </Link>
        <Link href="/admin/termine/new" className="btn btn-black">
          + Neuer Termin
        </Link>
        <Link href="/" target="_blank" className="btn btn-outline">
          Website ansehen ↗
        </Link>
      </div>
    </div>
  );
}
