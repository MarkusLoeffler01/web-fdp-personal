import Link from "next/link";

export function CTASection() {
  return (
    <section className="footer-cta">
      <div className="container footer-cta-inner">
        <div>
          <span className="eyebrow eyebrow-yellow">Direkter Draht</span>
          <h2>Ich freue mich über Anregungen, Kritik und den direkten politischen Austausch.</h2>
        </div>
        <div className="footer-cta-actions">
          <Link href="/kontakt" className="btn btn-primary">
            Kontakt aufnehmen
          </Link>
          <Link href="/mitmachen" className="btn btn-secondary">
            Mitmachen
          </Link>
        </div>
      </div>
    </section>
  );
}
