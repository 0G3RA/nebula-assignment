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
  RUN pnpm -r --filter @app/scheduler build
  
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
  COPY services/scheduler/entrypoint.sh ./services/scheduler/entrypoint.sh
  RUN chmod +x ./services/scheduler/entrypoint.sh
  
  WORKDIR /app/services/scheduler
  CMD ["./entrypoint.sh"]