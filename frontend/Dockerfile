# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

# Allows configuring the API URL at build time.
ARG NEXT_PUBLIC_API_URL=http://localhost:8000
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG NEXT_PUBLIC_AUTH_MODE
ENV NEXT_PUBLIC_AUTH_MODE=${NEXT_PUBLIC_AUTH_MODE}

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG NEXT_PUBLIC_AUTH_MODE

# If provided at runtime, Next will expose NEXT_PUBLIC_* to the browser as well
# (but note some values may be baked at build time).
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
ENV NEXT_PUBLIC_AUTH_MODE=${NEXT_PUBLIC_AUTH_MODE}

# Copy the standalone server (includes minimal node_modules and server.js)
COPY --from=builder /app/.next/standalone ./
# Copy static assets (CSS, JS chunks, fonts, etc.) – these are NOT included
# in the standalone output and must be copied separately.
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
