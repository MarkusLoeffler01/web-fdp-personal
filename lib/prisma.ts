import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../prisma/generated/client";

const databaseUrl = process.env.DATABASE_URL ?? "";
const useAccelerate =
  databaseUrl.startsWith("prisma://") ||
  databaseUrl.startsWith("prisma+postgres://");

type PrismaInstance = PrismaClient;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaInstance | undefined;
};

function makePrisma(): PrismaInstance {
  if (useAccelerate) {
    return new PrismaClient({
      accelerateUrl: databaseUrl,
    }).$extends(withAccelerate()) as unknown as PrismaInstance;
  }

  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
