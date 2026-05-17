FROM node:22-bookworm-slim AS base

# Patch OS vulns
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Split prod and dev
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Includes dev dependencies for development + pre-commit hooks
FROM deps AS dev
RUN echo "deb http://deb.debian.org/debian bookworm main" > /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends \
  gnupg

RUN apt-get update && apt-get install -y \
  git \
  curl \
  python3 \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://github.com/pre-commit/pre-commit/releases/download/v4.6.0/pre-commit-4.6.0.pyz \
  -o /usr/local/bin/pre-commit \
  && chmod +x /usr/local/bin/pre-commit

# Copy source, overlaid in dev to reflect changes without rebuilding deps
COPY . .

ENV NODE_ENV=development
EXPOSE 3000

CMD ["pnpm", "dev"]

# Prod build
FROM deps AS builder

COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

FROM node:22-bookworm-slim AS prod

# Patch OS vulns
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

# Run as non-root user for security
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only the Next.js standalone output and static assets
# Requires `output: 'standalone'` in next.config.js — see note below
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
