#!/bin/sh
set -e

echo "[notifications] checking node_modules..."
ls -la node_modules/@nestjs/ || echo "NestJS modules not found"

echo "[notifications] checking current directory..."
pwd
ls -la

# Construct DATABASE_URL from Docker environment variables
export DATABASE_URL="postgresql://${NOTIFS_DB_USER}:${NOTIFS_DB_PASSWORD}@${NOTIFS_DB_HOST}:${NOTIFS_DB_PORT}/${NOTIFS_DB_NAME}?schema=public"

echo "[notifications] Using DATABASE_URL: ${DATABASE_URL}"

PRISMA_BIN="node_modules/.bin/prisma"

if [ -f "./prisma/schema.prisma" ] && [ -x "$PRISMA_BIN" ]; then
  echo "[notifications] generating prisma client for current platform..."
  DATABASE_URL="$DATABASE_URL" "$PRISMA_BIN" generate --schema=./prisma/schema.prisma
  
  echo "[notifications] prisma migrate deploy"
  DATABASE_URL="$DATABASE_URL" "$PRISMA_BIN" migrate deploy --schema=./prisma/schema.prisma || true
else
  echo "[notifications] prisma not found or schema missing, skipping migrations"
fi

echo "[notifications] start service"
node dist/main.js
