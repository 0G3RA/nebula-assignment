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

RUN pnpm -r --filter @app/users build

# Prisma Client
RUN if [ -f "services/users/prisma/schema.prisma" ]; then \
      pnpm --filter @app/users prisma generate --schema=services/users/prisma/schema.prisma; \
    fi

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

# entrypoint
COPY services/users/entrypoint.sh ./services/users/entrypoint.sh
RUN chmod +x ./services/users/entrypoint.sh

WORKDIR /app/services/users
CMD ["./entrypoint.sh"]