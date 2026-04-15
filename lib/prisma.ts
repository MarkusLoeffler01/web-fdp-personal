import { PrismaClient as NodePrismaClient } from "@prisma/client";
import { PrismaClient as EdgePrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const databaseUrl = process.env.DATABASE_URL ?? "";
const useAccelerate =
  databaseUrl.startsWith("prisma://") ||
  databaseUrl.startsWith("prisma+postgres://");

type PrismaInstance =
  NodePrismaClient;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaInstance | undefined;
};

function makePrisma(): PrismaInstance {
  if (useAccelerate) {
    return new EdgePrismaClient().$extends(
      withAccelerate()
    ) as unknown as PrismaInstance;
  }

  return new NodePrismaClient();
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
