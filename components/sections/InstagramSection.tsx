export function InstagramSection() {
  // Placeholder tiles until Instagram API is connected
  const placeholders = [0, 1, 2, 3, 4, 5];

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
              Social Media
            </span>
            <h2 className="h-section">
              Schon{" "}
              <span style={{ background: "var(--black)", color: "var(--yellow)", padding: "0 4px" }}>
                gesehen?
              </span>
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
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
            Auf Instagram folgen ↗
          </a>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "8px",
          }}
        >
          {placeholders.map((i) => (
            <a
              key={`instagram-placeholder-${i}`}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                aspectRatio: "1",
                background: "var(--black)",
                display: "block",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* placeholder pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  opacity: 0.08,
                  color: "var(--yellow)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                }}
              >
                IG
              </div>
            </a>
          ))}
        </div>

        <style>{`
          @media (max-width: 600px) {
            section .container > div[style*="repeat(6"] {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
