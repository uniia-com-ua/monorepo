# Build with context = repo root:
#   docker build -f apps/strapi/Dockerfile .
# Follows the official Turborepo + pnpm Docker pattern:
# https://turborepo.com/docs/guides/tools/docker
#
# One image for every environment — Strapi reads DB/secrets from runtime env,
# unlike landing which bakes STRAPI_URL in at `next build`.

FROM node:20-bookworm-slim AS base
WORKDIR /app

FROM base AS pruner
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g turbo@^2
COPY . .
RUN turbo prune strapi --docker

FROM base AS builder
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

# Call pnpm directly — turbo.json envMode=strict only lists landing build env.
ENV NODE_ENV=production
RUN pnpm --filter strapi build

FROM base AS runner
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates libvips42 \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production

# Keep the pnpm workspace layout so node_modules symlinks stay valid.
COPY --from=builder --chown=node:node /app /app

USER node
WORKDIR /app/apps/strapi
EXPOSE 1337
ENV HOST=0.0.0.0
ENV PORT=1337
CMD ["npm", "run", "start"]
