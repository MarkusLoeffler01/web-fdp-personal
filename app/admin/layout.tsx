import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "var(--black)",
          color: "var(--white)",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "1.5rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "24px",
              background: "var(--yellow)",
              borderRadius: "2px",
            }}
          />
          <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Admin</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {[
            { label: "Dashboard", href: "/admin", icon: "◈" },
            { label: "Beiträge", href: "/admin/posts", icon: "✦" },
            { label: "Termine", href: "/admin/termine", icon: "◷" },
            { label: "Personen", href: "/admin/personen", icon: "◉" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.25rem",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <span style={{ opacity: 0.6 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: "0.8rem",
                padding: 0,
              }}
            >
              Abmelden →
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, background: "var(--gray)", minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
