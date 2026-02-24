#!/usr/bin/env bash
set -euo pipefail

DB_DIR="${DB_DIR:-/data/mission-control}"
DB_PATH="${DB_PATH:-${DB_DIR}/mission_control.db}"

mkdir -p "${DB_DIR}"

# R2 FUSE mount if credentials available
if [ -n "${R2_ACCESS_KEY_ID:-}" ] && [ -n "${R2_SECRET_ACCESS_KEY:-}" ] && [ -n "${CF_ACCOUNT_ID:-}" ]; then
  export AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}"
  export AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}"
  R2_ENDPOINT="https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"
  /usr/local/bin/tigrisfs --endpoint "${R2_ENDPOINT}" -f mission-control-data "${DB_DIR}" &
  for i in $(seq 1 10); do
    mountpoint -q "${DB_DIR}" 2>/dev/null && break || sleep 1
  done
fi

export DATABASE_URL="${DATABASE_URL:-sqlite+aiosqlite:///${DB_PATH}}"

# Run migrations
./.venv/bin/alembic upgrade head

# Start server
exec ./.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
