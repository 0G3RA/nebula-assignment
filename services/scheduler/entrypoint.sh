#!/bin/sh
set -e

echo "[scheduler] checking node_modules..."
ls -la /app/node_modules | head -n 20 || true

echo "[scheduler] env snapshot:"
echo "  RMQ_URL=${RMQ_URL}"
echo "  REDIS_HOST=${REDIS_HOST}"
echo "  REDIS_PORT=${REDIS_PORT}"

echo "[scheduler] start service"
node dist/main.js