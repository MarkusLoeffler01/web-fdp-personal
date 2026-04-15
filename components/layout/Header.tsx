"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Aktuelles", href: "/aktuelles" },
  { label: "Themen", href: "/themen" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header-inner">
        <Link href="/" className="site-brand" aria-label="Startseite">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <strong>Markus Löffler</strong>
            <em>persönlich. liberal. vor Ort.</em>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link href="/mitmachen" className="btn btn-primary nav-cta">
            Mitmachen
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          className="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="mobile-nav-shell">
          <nav className="container mobile-nav" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`mobile-nav-link${active ? " is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/mitmachen"
              className="btn btn-primary mobile-nav-cta"
              onClick={() => setMobileOpen(false)}
            >
              Mitmachen
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
