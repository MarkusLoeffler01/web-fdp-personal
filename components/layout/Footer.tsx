import Link from "next/link";
import { CTASection } from "./CTASection";

const FOOTER_COLUMNS = [
  {
    title: "Seite",
    links: [
      { label: "Aktuelles", href: "/aktuelles" },
      { label: "Themen", href: "/themen" },
      { label: "Über mich", href: "/ueber-mich" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Engagement",
    links: [
      { label: "Mitmachen", href: "/mitmachen" },
      { label: "JuLis BW", href: "https://julis-bw.de", external: true },
      { label: "FDP BW", href: "https://fdpbw.de", external: true },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <CTASection />
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true" />
            <div>
              <strong>Markus Löffler</strong>
              <p>
                stv. Vorsitzender der FDP Bad Urach und politisch engagiert bei
                den Jungen Liberalen in Reutlingen, Süd-Württemberg und
                Baden-Württemberg.
              </p>
            </div>
          </div>

          <div className="footer-columns">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <span className="footer-heading">{column.title}</span>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="container footer-bottom">
          <span>(c) {year} Markus Löffler</span>
          <span>Reutlingen | Bad Urach | Baden-Württemberg</span>
        </div>
      </footer>
    </>
  );
}
