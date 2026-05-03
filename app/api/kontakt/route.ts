import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

// Create once at module level — reuse the connection pool across requests
const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      tls: { rejectUnauthorized: false },
    })
  : null;

// Verify SMTP connection at startup so misconfiguration is caught in logs
if (transporter) {
  transporter.verify().catch((err) =>
    console.error("[Kontaktformular] SMTP verify failed:", err)
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingaben." }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_EMAIL ?? "fdp@m-loeffler.de";
  const from = process.env.SMTP_FROM ?? `Website <noreply@m-loeffler.de>`;

  if (!transporter) {
    // Dev fallback — log to console
    console.log("[Kontaktformular]", { name, email, subject, message });
    return NextResponse.json({ ok: true });
  }

  try {

    const subjectLine = subject
      ? `[Kontakt] ${subject} — ${name}`
      : `[Kontakt] Neue Nachricht von ${name}`;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: subjectLine,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="border-bottom:3px solid #FFD700;padding-bottom:0.5rem">Neue Kontaktanfrage</h2>
          <table style="width:100%;border-collapse:collapse;margin:1rem 0">
            <tr>
              <td style="padding:0.5rem 1rem 0.5rem 0;font-weight:bold;width:120px;vertical-align:top">Name</td>
              <td style="padding:0.5rem 0">${name}</td>
            </tr>
            <tr style="background:#f9f9f9">
              <td style="padding:0.5rem 1rem 0.5rem 0;font-weight:bold;vertical-align:top">E-Mail</td>
              <td style="padding:0.5rem 0"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:0.5rem 1rem 0.5rem 0;font-weight:bold;vertical-align:top">Betreff</td>
              <td style="padding:0.5rem 0">${subject ?? "—"}</td>
            </tr>
          </table>
          <h3 style="margin-top:1.5rem">Nachricht</h3>
          <div style="background:#f9f9f9;padding:1rem;border-left:4px solid #FFD700;white-space:pre-wrap">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</div>
          <p style="margin-top:2rem;font-size:0.8rem;color:#999">Gesendet über das Kontaktformular auf fdp.m-loeffler.de — Antworten direkt an <a href="mailto:${email}">${email}</a>.</p>
        </div>
      `,
      text: `Neue Kontaktanfrage\n${"-".repeat(40)}\nName:    ${name}\nE-Mail:  ${email}\nBetreff: ${subject ?? "—"}\n\nNachricht:\n${message}\n\n---\nGesendet über fdp.m-loeffler.de`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Kontaktformular] Fehler:", err);
    return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
  }
}

