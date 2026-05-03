import { QuickDonateButtons } from "@/components/ui/QuickDonateButtons";

export function DonateSection() {
  return (
    <section className="section support-section">
      <div className="container support-grid">
        <div>
          <span className="eyebrow eyebrow-magenta">Unterstützen</span>
          <h2 className="section-title">Wenn du meine politische Arbeit unterstützen willst</h2>
          <p className="section-lead">
            Spenden finanzieren Material, Veranstaltungen und digitale Formate.
            Auch kleine Betraege helfen dabei, Inhalte sichtbar zu machen.
          </p>
        </div>
        <div className="support-card">
          <QuickDonateButtons />
        </div>
      </div>
    </section>
  );
}
