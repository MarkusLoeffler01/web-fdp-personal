import type { Metadata } from "next";
import { PersonCard } from "@/components/ui/PersonCard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Landesvorstand",
  description: "Der Landesvorstand der JuLis Baden-Württemberg.",
};

export const revalidate = 3600;

export default async function LandesvorstandPage() {
  let personen: { id: string; name: string; role: string; photo: string | null; email: string | null; instagram: string | null; linkedin: string | null; order: number }[] = [];
  try {
    personen = await prisma.person.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div className="section">
      <div className="container">
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
            Team
          </span>
          <h1 className="h-section" style={{ marginBottom: "1rem" }}>
            Landesvorstand JuLis BW
          </h1>
          <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1rem", maxWidth: "560px", lineHeight: 1.7 }}>
            Der gewählte Landesvorstand der Jungen Liberalen Baden-Württemberg.
          </p>
        </div>

        {personen.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {personen.map((p: { id: string; name: string; role: string; photo: string | null; email: string | null; instagram: string | null; linkedin: string | null }) => (
              <PersonCard
                key={p.id}
                name={p.name}
                role={p.role}
                photo={p.photo ?? undefined}
                email={p.email ?? undefined}
                instagram={p.instagram ?? undefined}
                linkedin={p.linkedin ?? undefined}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {[
              { name: "Vorstandsmitglied 1", role: "Landesvorsitzende:r" },
              { name: "Vorstandsmitglied 2", role: "Stv. Landesvorsitzende:r" },
              { name: "Vorstandsmitglied 3", role: "Schatzmeister:in" },
              { name: "Vorstandsmitglied 4", role: "Politische:r Geschäftsführer:in" },
              { name: "Vorstandsmitglied 5", role: "Beisitzer:in" },
              { name: "Vorstandsmitglied 6", role: "Beisitzer:in" },
            ].map((p) => (
              <PersonCard key={p.name} name={p.name} role={p.role} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
