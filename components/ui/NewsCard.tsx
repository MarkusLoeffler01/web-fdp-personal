import Link from "next/link";
import Image from "next/image";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "@/lib/utils";

interface NewsCardProps {
  slug: string;
  title: string;
  teaser: string;
  image?: string | null;
  category: string;
  publishedAt?: Date | string | null;
}

export function NewsCard({
  slug,
  title,
  teaser,
  image,
  category,
  publishedAt,
}: NewsCardProps) {
  return (
    <Link href={`/aktuelles/${slug}`} className="news-card">
      <div className="news-card-media">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="news-card-fallback">
            <span>Kommentar</span>
          </div>
        )}
        <div className="news-card-overlay" />
      </div>

      <div className="news-card-body">
        <div className="news-card-meta">
          <CategoryBadge category={category} />
          {publishedAt ? (
            <span>{formatDate(publishedAt)}</span>
          ) : null}
        </div>

        <h3>{title}</h3>
        <p>{teaser.length > 150 ? `${teaser.slice(0, 150)}...` : teaser}</p>
        <span className="card-link">Beitrag lesen</span>
      </div>
    </Link>
  );
}
