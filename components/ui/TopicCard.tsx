import Image from "next/image";
import Link from "next/link";

interface TopicCardProps {
  label: string;
  image?: string;
  href: string;
}

export function TopicCard({ label, image, href }: TopicCardProps) {
  return (
    <Link href={href} className="topic-card">
      <div className="topic-card-media">
        {image ? (
          <Image
            src={image}
            alt={label}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="topic-card-fallback" />
        )}
      </div>
      <div className="topic-card-body">
        <span className="topic-card-kicker">Thema</span>
        <strong>{label}</strong>
        <span className="card-link">Mehr lesen</span>
      </div>
    </Link>
  );
}
