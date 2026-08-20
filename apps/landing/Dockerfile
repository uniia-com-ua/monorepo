# Build with context = repo root:
#   docker build -f apps/landing/Dockerfile .
# Follows the official Turborepo + pnpm Docker pattern:
# https://turborepo.com/docs/guides/tools/docker

FROM node:20-alpine AS base

FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo@^2
COPY . .

# Generated Strapi types are git-tracked in apps/strapi, then linked/copied into
# packages/strapi-types/generated (gitignored) for local `dev`. `turbo prune`
# omits gitignored files and does not include apps/strapi, so next build would
# fail to resolve `@workspace/strapi-types` unless we restore them here.
RUN node packages/strapi-types/scripts/sync-types.mjs strapi
RUN turbo prune landing --docker
RUN mkdir -p /app/out/full/packages/strapi-types \
  && rm -rf /app/out/full/packages/strapi-types/generated \
  && cp -R /app/packages/strapi-types/generated /app/out/full/packages/strapi-types/generated

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Install dependencies first (better layer caching)
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Build
COPY --from=pruner /app/out/full/ .

# Baked in at build time: Next.js statically pre-renders pages against this
# Strapi instance, so staging and production are built as separate images.
ARG STRAPI_URL
ARG STRAPI_API_TOKEN
ARG CF_ACCESS_CLIENT_ID
ARG CF_ACCESS_CLIENT_SECRET
ARG NEXT_PUBLIC_SITE_URL
ENV STRAPI_URL=$STRAPI_URL
ENV STRAPI_API_TOKEN=$STRAPI_API_TOKEN
ENV CF_ACCESS_CLIENT_ID=$CF_ACCESS_CLIENT_ID
ENV CF_ACCESS_CLIENT_SECRET=$CF_ACCESS_CLIENT_SECRET
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN pnpm turbo run build --filter=landing...

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/landing/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/landing/.next/static ./apps/landing/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/landing/public ./apps/landing/public

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/landing/server.js"]
