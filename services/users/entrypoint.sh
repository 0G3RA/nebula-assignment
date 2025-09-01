#!/bin/sh
set -e

echo "[users] checking node_modules..."
ls -la node_modules/@nestjs/ || echo "NestJS modules not found"

echo "[users] checking current directory..."
pwd
ls -la

PRISMA_BIN="node_modules/.bin/prisma"

if [ -f "./prisma/schema.prisma" ] && [ -x "$PRISMA_BIN" ]; then
  echo "[users] generating prisma client for current platform..."
  "$PRISMA_BIN" generate --schema=./prisma/schema.prisma
  
  echo "[users] prisma migrate deploy"
  "$PRISMA_BIN" migrate deploy --schema=./prisma/schema.prisma || true
else
  echo "[users] prisma not found or schema missing, skipping migrations"
fi

echo "[users] start service"
node dist/main.js