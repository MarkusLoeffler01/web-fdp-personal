import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingaben." }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    // Dev fallback — log to console
    console.log("[Kontaktformular]", { name, email, subject, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `Website <noreply@${process.env.CONTACT_FROM_DOMAIN ?? "deinedomain.de"}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: subject
        ? `[Kontakt] ${subject} — ${name}`
        : `[Kontakt] Neue Nachricht von ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject ?? "—"}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Kontaktformular] Fehler:", err);
    return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
  }
}
