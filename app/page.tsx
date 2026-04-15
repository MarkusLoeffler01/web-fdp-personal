import { HeroSection } from "@/components/sections/HeroSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ThemenCarousel } from "@/components/sections/ThemenCarousel";
import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { ConnectSection } from "@/components/sections/ConnectSection";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getLatestPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
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
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <ThemenCarousel />
      <NewsSection posts={posts} />
      <ConnectSection />
    </>
  );
}
