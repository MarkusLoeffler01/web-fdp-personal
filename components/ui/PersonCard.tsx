import Image from "next/image";
import { Mail, Link as LinkIcon } from "lucide-react";

interface PersonCardProps {
  name: string;
  role: string;
  photo?: string | null;
  email?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

export function PersonCard({
  name,
  role,
  photo,
  email,
  instagram,
  linkedin,
}: PersonCardProps) {
  return (
    <div
      className="card"
      style={{ textAlign: "center" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1/1",
          overflow: "hidden",
          background: "var(--gray)",
        }}
      >
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--black)",
              color: "var(--yellow)",
              fontSize: "2.5rem",
              fontWeight: 800,
            }}
          >
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div style={{ padding: "1rem" }}>
        <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>
          {name}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.75rem" }}>
          {role}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
          {email && (
            <a href={`mailto:${email}`} aria-label="E-Mail" style={{ color: "var(--black)" }}>
              <Mail size={18} />
            </a>
          )}
          {instagram && (
            <a
              href={`https://instagram.com/${instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: "var(--black)" }}
            >
              <LinkIcon size={18} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: "var(--black)" }}
            >
              <LinkIcon size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
