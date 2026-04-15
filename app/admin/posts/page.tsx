import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { formatDate } from "@/lib/utils";

export default async function AdminPostsPage() {
  let posts: { id: string; title: string; category: string; published: boolean; publishedAt: Date | null; slug: string }[] = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        category: true,
        published: true,
        publishedAt: true,
        slug: true,
      },
    });
  } catch {
    // DB not connected
  }

  return (
    <div style={{ padding: "2.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem" }}>Beiträge</h1>
        <Link href="/admin/posts/new" className="btn btn-yellow">
          + Neuer Beitrag
        </Link>
      </div>

      {posts.length > 0 ? (
        <div style={{ background: "var(--white)", borderRadius: "4px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--gray)", textAlign: "left" }}>
                <th style={{ padding: "0.85rem 1.25rem", fontWeight: 700 }}>Titel</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Kategorie</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Datum</th>
                <th style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>Status</th>
                <th style={{ padding: "0.85rem 1rem" }} />
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={post.id}
                  style={{
                    borderBottom: i < posts.length - 1 ? "1px solid var(--gray)" : "none",
                  }}
                >
                  <td style={{ padding: "0.85rem 1.25rem", fontWeight: 600 }}>
                    {post.title}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <CategoryBadge category={post.category} />
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "rgba(0,0,0,0.5)" }}>
                    {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "99px",
                        background: post.published ? "#D4F5D4" : "#F5F5F5",
                        color: post.published ? "#1A6B1A" : "rgba(0,0,0,0.45)",
                      }}
                    >
                      {post.published ? "Veröffentlicht" : "Entwurf"}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "var(--black)",
                          textDecoration: "none",
                          padding: "0.25rem 0.75rem",
                          border: "1px solid #ddd",
                          borderRadius: "3px",
                        }}
                      >
                        Bearbeiten
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background: "var(--white)", padding: "4rem", textAlign: "center", borderRadius: "4px" }}>
          <p style={{ color: "rgba(0,0,0,0.4)", marginBottom: "1.5rem" }}>
            Noch keine Beiträge vorhanden.
          </p>
          <Link href="/admin/posts/new" className="btn btn-yellow">
            Ersten Beitrag erstellen
          </Link>
        </div>
      )}
    </div>
  );
}
