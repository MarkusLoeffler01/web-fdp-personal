import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/server-utils";
import { z } from "zod";

const TerminSchema = z.object({
  title: z.string().min(1),
  date: z.string(),
  endDate: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  type: z.enum(["BUNDESVERBAND", "LANDESVERBAND", "BEZIRK"]),
  published: z.boolean().default(true),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const upcoming = searchParams.get("upcoming") === "true";

  const termine = await prisma.termin.findMany({
    where: {
      published: true,
      ...(upcoming ? { date: { gte: new Date() } } : {}),
    },
    orderBy: { date: "asc" },
    take: 20,
  });

  return NextResponse.json(termine);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await req.json();
  const parsed = TerminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const termin = await prisma.termin.create({
    data: {
      ...parsed.data,
      date: new Date(parsed.data.date),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    },
  });

  return NextResponse.json(termin, { status: 201 });
}
