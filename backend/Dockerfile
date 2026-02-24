# syntax=docker/dockerfile:1

FROM python:3.12-slim AS base

ARG TIGRISFS_VERSION=1.2.1

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# System deps (keep minimal)
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates fuse libfuse2 util-linux \
  && ARCH="$(dpkg --print-architecture)" \
  && curl -fsSL "https://github.com/tigrisdata/tigrisfs/releases/download/v${TIGRISFS_VERSION}/tigrisfs_${TIGRISFS_VERSION}_linux_${ARCH}.tar.gz" \
    | tar -xz -C /usr/local/bin/ \
  && rm -rf /var/lib/apt/lists/*

# Install uv (https://github.com/astral-sh/uv)
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:${PATH}"

# --- deps layer ---
FROM base AS deps

# Copy only dependency metadata first for better build caching
# NOTE: compose builds backend with repo-root context, so files live under /backend.
COPY backend/pyproject.toml backend/uv.lock ./

# Create venv and sync deps (including runtime)
RUN uv sync --frozen --no-dev

# --- runtime ---
FROM base AS runtime

# Copy virtual environment from deps stage
COPY --from=deps /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:${PATH}"

# Copy app source
COPY backend/migrations ./migrations
COPY backend/alembic.ini ./alembic.ini
COPY backend/app ./app

# Copy provisioning templates.
# In-repo these live at `backend/templates/`; runtime path is `/app/templates`.
COPY backend/templates ./templates
COPY backend/start-mc.sh ./start-mc.sh
RUN chmod +x ./start-mc.sh

# Default API port
EXPOSE 8000

# Run the API
CMD ["./start-mc.sh"]
