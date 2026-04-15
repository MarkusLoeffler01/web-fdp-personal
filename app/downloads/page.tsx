import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Vorlagen, Merch und Materialien der JuLis BW.",
};

const DOWNLOADS = [
  {
    id: "1",
    title: "Mitgliedsantrag JuLis BW",
    type: "VORLAGE",
    file: "#",
  },
  {
    id: "2",
    title: "Wahlkampf-Flyer Vorlage",
    type: "VORLAGE",
    file: "#",
  },
  {
    id: "3",
    title: "Merch-Katalog 2024",
    type: "MERCH",
    file: "#",
  },
];

const TYPE_LABELS: Record<string, string> = {
  VORLAGE: "Vorlage",
  MERCH: "Merch",
  JULIETTE: "Juliette",
};

const TYPE_COLORS: Record<string, string> = {
  VORLAGE: "var(--yellow)",
  MERCH: "var(--personal)",
  JULIETTE: "var(--magenta)",
};

export default function DownloadsPage() {
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
            Materialien
          </span>
          <h1 className="h-section">Downloads</h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {DOWNLOADS.map((dl) => (
            <div
              key={dl.id}
              className="card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1.25rem 1.5rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.15rem 0.55rem",
                    background: TYPE_COLORS[dl.type] ?? "var(--gray)",
                    color: dl.type === "VORLAGE" ? "var(--black)" : "var(--white)",
                    borderRadius: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {TYPE_LABELS[dl.type] ?? dl.type}
                </span>
                <span style={{ fontWeight: 600, fontSize: "1rem" }}>{dl.title}</span>
              </div>
              <a
                href={dl.file}
                download
                className="btn btn-black"
                style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem" }}
              >
                ↓ Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
