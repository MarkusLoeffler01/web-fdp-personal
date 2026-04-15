import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/server-utils";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const authError = await requireAuth();
  if (authError) return authError;
  const { id } = await params;
  await prisma.termin.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
