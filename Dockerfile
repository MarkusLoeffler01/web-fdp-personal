FROM node:22-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ── Install all deps (needed for build + prisma generate) ────────────────────
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# ── Build ────────────────────────────────────────────────────────────────────
FROM deps AS builder

ARG DATABASE_URL=postgresql://postgres:postgres@db:5432/website?schema=public
ENV DATABASE_URL=$DATABASE_URL

COPY . .
RUN npx prisma generate
RUN npm run build

# ── Minimal runtime image ────────────────────────────────────────────────────
FROM node:22-alpine AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

WORKDIR /app

# standalone output already contains its own trimmed node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Prisma schema (standalone already bundles the generated client)
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "HOSTNAME=0.0.0.0 node server.js"]
