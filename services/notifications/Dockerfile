# --- deps ---
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml tsconfig.base.json ./

COPY packages ./packages
COPY services ./services

RUN pnpm install --frozen-lockfile

# --- build ---
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY --from=deps /app /app

RUN pnpm -r --filter "./packages/*" build

# Prisma Client
RUN if [ -f "services/notifications/prisma/schema.prisma" ]; then \
      pnpm --filter @app/notifications prisma generate --schema=services/notifications/prisma/schema.prisma; \
    fi

RUN pnpm -r --filter @app/notifications build

# --- run ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/services ./services
COPY --from=build /app/packages ./packages
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Remove .env files to prevent Prisma from loading them in production
RUN find /app -name ".env*" -type f -delete

# entrypoint
COPY services/notifications/entrypoint.sh ./services/notifications/entrypoint.sh
RUN chmod +x ./services/notifications/entrypoint.sh

WORKDIR /app/services/notifications
CMD ["./entrypoint.sh"]
