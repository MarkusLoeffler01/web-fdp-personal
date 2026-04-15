import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/server-utils";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(1),
  teaser: z.string().min(1),
  content: z.string(),
  category: z.enum(["PRESSEMITTEILUNG", "BESCHLUSS", "NEWSLETTER", "ALLGEMEIN"]),
  image: z.string().nullable().optional(),
  published: z.boolean().default(false),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const take = parseInt(searchParams.get("take") ?? "20");

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(category ? { category: category as never } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take,
    select: {
      id: true,
      slug: true,
      title: true,
      teaser: true,
      image: true,
      category: true,
      publishedAt: true,
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await req.json();
  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const slug = slugify(parsed.data.title);

  const post = await prisma.post.create({
    data: {
      ...parsed.data,
      slug,
      publishedAt: parsed.data.published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
