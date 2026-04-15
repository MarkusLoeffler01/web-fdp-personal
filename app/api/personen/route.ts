import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/server-utils";
import { z } from "zod";

const PersonSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  photo: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  instagram: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  order: z.number().default(0),
  verband: z.enum(["JULIS", "FDP", "BEIDE"]).default("JULIS"),
});

export async function GET() {
  const personen = await prisma.person.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(personen);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await req.json();
  const parsed = PersonSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const person = await prisma.person.create({ data: parsed.data });
  return NextResponse.json(person, { status: 201 });
}
