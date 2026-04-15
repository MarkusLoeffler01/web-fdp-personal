import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hash = await bcrypt.hash("admin1234!", 12);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      passwordHash: hash,
      name: "Admin",
    },
  });
  console.log("✅ Admin user created (admin@example.com / admin1234!)");

  // Sample posts
  const posts = [
    {
      slug: "fdp-bw-landtagswahl-2026",
      title: "FDP Baden-Württemberg zur Landtagswahl 2026",
      teaser:
        "Die FDP BW tritt mit einem starken Programm für Freiheit und Fortschritt in die Landtagswahl.",
      content:
        "<p>Die Freien Demokraten Baden-Württemberg stehen für eine liberale Politik, die Freiheit und Verantwortung verbindet. Im Mittelpunkt unseres Programms stehen Bildung, Digitalisierung und wirtschaftliche Stärke.</p>",
      category: "ALLGEMEIN" as const,
      published: true,
      publishedAt: new Date("2026-03-01"),
    },
    {
      slug: "julis-fordern-erstkaeufer-freibetrag",
      title: "JuLis fordern Erstkäufer-Freibetrag für junge Generation",
      teaser:
        "Mit der FDP bis zu 25.000 Euro beim Immobilienkauf sparen – die Jungen Liberalen setzen sich für die Zukunft junger Menschen ein.",
      content:
        "<p>Die Jungen Liberalen Baden-Württemberg fordern einen Erstkäufer-Freibetrag bei der Grunderwerbsteuer für junge Erstkäufer. Damit sollen bis zu 25.000 Euro gespart werden können.</p>",
      category: "PRESSEMITTEILUNG" as const,
      published: true,
      publishedAt: new Date("2026-02-15"),
    },
    {
      slug: "beschluss-digitalisierung-schulen",
      title: "Beschluss: Vollständige Digitalisierung aller Schulen bis 2028",
      teaser:
        "Der Landeskongress der JuLis BW hat einen Beschluss zur vollständigen Digitalisierung der Schulen in Baden-Württemberg verabschiedet.",
      content:
        "<p>Auf dem 91. Landeskongress in Baden-Baden verabschiedeten die Jungen Liberalen einen wegweisenden Beschluss zur Schuldigitalisierung.</p>",
      category: "BESCHLUSS" as const,
      published: true,
      publishedAt: new Date("2026-01-20"),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log(`✅ ${posts.length} posts created`);

  // Sample Termine
  const termine = [
    {
      title: "JuLi-Stammtisch Stuttgart",
      date: new Date("2026-04-25T19:00:00"),
      endDate: new Date("2026-04-25T22:00:00"),
      location: "Stuttgart Mitte",
      description: "Monatlicher Stammtisch der Jungen Liberalen Stuttgart.",
      type: "LANDESVERBAND" as const,
      published: true,
    },
    {
      title: "Gemeinsamer Austausch Landesvorstand – Fraktion",
      date: new Date("2026-04-25T10:00:00"),
      endDate: new Date("2026-04-25T16:00:00"),
      location: "Stuttgart",
      description: "Austausch zwischen Landesvorstand, Fraktion und Kreisvorsitzenden.",
      type: "LANDESVERBAND" as const,
      published: true,
    },
    {
      title: "LAK Verbandsentwicklung",
      date: new Date("2026-04-28T19:00:00"),
      endDate: new Date("2026-04-28T21:00:00"),
      location: "Online",
      description: "Sitzung des Landesarbeitskreises Verbandsentwicklung.",
      type: "LANDESVERBAND" as const,
      published: true,
    },
    {
      title: "92. Landeskongress der JuLis BW",
      date: new Date("2026-05-16T10:00:00"),
      endDate: new Date("2026-05-17T18:00:00"),
      location: "Freiburg im Breisgau",
      description: "Der 92. Landeskongress der Jungen Liberalen Baden-Württemberg.",
      type: "LANDESVERBAND" as const,
      published: true,
    },
  ];

  for (const termin of termine) {
    await prisma.termin.create({ data: termin });
  }
  console.log(`✅ ${termine.length} Termine created`);

  // Sample Personen
  const personen = [
    {
      name: "Anna Stubert",
      role: "Landesvorsitzende JuLis BW",
      verband: "JULIS" as const,
      order: 1,
    },
    {
      name: "Hans Rülke",
      role: "Landesvorsitzender FDP BW",
      verband: "FDP" as const,
      order: 1,
    },
  ];

  for (const person of personen) {
    await prisma.person.create({ data: person });
  }
  console.log(`✅ ${personen.length} Personen created`);

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
