import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung gemäß DSGVO.",
  robots: "noindex",
};

export default function DatenschutzPage() {
  return (
    <main style={{ padding: "5rem 0", flex: 1 }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            marginBottom: "0.5rem",
          }}
        >
          Datenschutzerklärung
        </h1>
        <p
          style={{
            color: "rgba(0,0,0,0.45)",
            fontSize: "0.9rem",
            marginBottom: "3rem",
          }}
        >
          Zuletzt aktualisiert: Januar 2026
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            lineHeight: 1.75,
            color: "rgba(0,0,0,0.75)",
          }}
        >
          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              1. Verantwortlicher
            </h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
              ist:
            </p>
            <div
              style={{
                background: "var(--gray)",
                padding: "1.25rem",
                borderRadius: "4px",
                marginTop: "0.75rem",
                fontSize: "0.95rem",
              }}
            >
              <strong>Markus Löffler</strong>
              <br />
              Musterstraße 1
              <br />
              70173 Stuttgart
              <br />
              E-Mail: kontakt@deinedomain.de
            </div>
          </section>

          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              2. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <p>
              Personenbezogene Daten werden auf dieser Website nur im technisch
              notwendigen Umfang erhoben. In keinem Fall werden die erhobenen
              Daten verkauft oder aus anderen Gründen an Dritte weitergegeben.
            </p>
            <h3
              style={{
                fontWeight: 700,
                marginTop: "1.5rem",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                color: "var(--black)",
              }}
            >
              2.1 Server-Logfiles
            </h3>
            <p>
              Beim Abruf dieser Website werden automatisch folgende Daten in
              sogenannten Server-Logfiles gespeichert:
            </p>
            <ul
              style={{
                paddingLeft: "1.5rem",
                marginTop: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <li>IP-Adresse des anfragenden Rechners</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Browsertyp und -version</li>
              <li>Betriebssystem</li>
              <li>Referrer-URL (zuvor besuchte Seite)</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              Die Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an einem sicheren Betrieb der
              Website). Die Daten werden nach spätestens 7 Tagen gelöscht.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              3. Kontaktformular
            </h2>
            <p>
              Wenn Sie das Kontaktformular nutzen, werden die von Ihnen
              angegebenen Daten (Name, E-Mail-Adresse, Nachricht) zur
              Bearbeitung Ihrer Anfrage gespeichert und verarbeitet.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
              (Vertragsanbahnung/Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
              Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht
              mehr benötigt werden.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              <strong>E-Mail-Versand:</strong> Zur Weiterleitung von
              Kontaktanfragen wird der Dienst{" "}
              <a
                href="https://resend.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--personal)", textDecoration: "underline" }}
              >
                Resend
              </a>{" "}
              (Resend Inc., USA) verwendet. Der Versand erfolgt ausschließlich
              zum Zweck der Weiterleitung; die Daten werden nicht dauerhaft bei
              Resend gespeichert.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              4. Cookies
            </h2>
            <p>
              Diese Website verwendet ausschließlich technisch notwendige
              Cookies (Session-Cookie für die Admin-Authentifizierung). Es
              werden keine Tracking- oder Marketing-Cookies eingesetzt.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse am sicheren Betrieb des Adminbereichs).
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              5. Externe Links und Social Media
            </h2>
            <p>
              Auf dieser Website befinden sich Links zu externen Websites
              (julis-bw.de, fdpbw.de, instagram.com, paypal.com). Für den
              Inhalt dieser Seiten sind deren Betreiber verantwortlich. Beim
              Anklicken eines Links können die jeweiligen Anbieter Daten über
              Ihren Browser erhalten.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              6. Ihre Rechte
            </h2>
            <p>Ihnen stehen folgende Rechte zu:</p>
            <ul
              style={{
                paddingLeft: "1.5rem",
                marginTop: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <li>
                <strong>Auskunft</strong> (Art. 15 DSGVO): Sie können Auskunft
                über die von uns verarbeiteten Daten verlangen.
              </li>
              <li>
                <strong>Berichtigung</strong> (Art. 16 DSGVO): Sie können die
                Berichtigung unrichtiger Daten verlangen.
              </li>
              <li>
                <strong>Löschung</strong> (Art. 17 DSGVO): Sie können die
                Löschung Ihrer Daten verlangen.
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Widerspruch</strong> (Art. 21 DSGVO): Sie können der
                Verarbeitung widersprechen.
              </li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Zur Wahrnehmung Ihrer Rechte wenden Sie sich an:{" "}
              <a
                href="mailto:kontakt@deinedomain.de"
                style={{ color: "var(--personal)", textDecoration: "underline" }}
              >
                kontakt@deinedomain.de
              </a>
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              Sie haben außerdem das Recht, sich bei der zuständigen
              Datenschutzaufsichtsbehörde zu beschweren. In Baden-Württemberg
              ist dies der{" "}
              <a
                href="https://www.baden-wuerttemberg.datenschutz.de"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--personal)", textDecoration: "underline" }}
              >
                Landesbeauftragte für Datenschutz und Informationsfreiheit
                Baden-Württemberg
              </a>
              .
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              7. Hosting
            </h2>
            <p>
              Diese Website wird bei{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--personal)", textDecoration: "underline" }}
              >
                Vercel Inc.
              </a>{" "}
              (340 Pine Street, Suite 701, San Francisco, CA 94104, USA)
              gehostet. Vercel ist als Auftragsverarbeiter gemäß Art. 28 DSGVO
              tätig. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert.
              Weitere Informationen zum Datenschutz bei Vercel finden Sie unter{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--personal)", textDecoration: "underline" }}
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--black)",
                marginBottom: "1rem",
                borderLeft: "4px solid var(--yellow)",
                paddingLeft: "0.75rem",
              }}
            >
              8. Aktualität dieser Datenschutzerklärung
            </h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
              Januar 2026. Durch die Weiterentwicklung dieser Website kann eine
              Anpassung dieser Erklärung notwendig werden.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
