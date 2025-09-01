#!/bin/sh
set -e

echo "[users] checking node_modules..."
ls -la node_modules/@nestjs/ || echo "NestJS modules not found"

echo "[users] checking current directory..."
pwd
ls -la

# Construct DATABASE_URL from Docker environment variables
export DATABASE_URL="postgresql://${USERS_DB_USER}:${USERS_DB_PASSWORD}@${USERS_DB_HOST}:${USERS_DB_PORT}/${USERS_DB_NAME}?schema=public"

echo "[users] Using DATABASE_URL: ${DATABASE_URL}"

PRISMA_BIN="node_modules/.bin/prisma"

if [ -f "./prisma/schema.prisma" ] && [ -x "$PRISMA_BIN" ]; then
  echo "[users] generating prisma client for current platform..."
  DATABASE_URL="$DATABASE_URL" "$PRISMA_BIN" generate --schema=./prisma/schema.prisma
  
  echo "[users] prisma migrate deploy"
  DATABASE_URL="$DATABASE_URL" "$PRISMA_BIN" migrate deploy --schema=./prisma/schema.prisma || true
else
  echo "[users] prisma not found or schema missing, skipping migrations"
fi

echo "[users] start service"
node dist/main.js