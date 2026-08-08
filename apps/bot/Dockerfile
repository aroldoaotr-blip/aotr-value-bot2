# AOTR Bot — Dockerfile para Railway
# node:22-slim (Debian/glibc): Prisma requiere OpenSSL 1.1+ que Alpine/musl no provee
FROM node:22-slim AS base
WORKDIR /app

# OpenSSL + certificados (requeridos por el engine de Prisma)
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Dependencias con cache layer
COPY package.json package-lock.json* ./
COPY packages/db/package.json packages/db/
COPY apps/bot/package.json apps/bot/
RUN npm ci --ignore-scripts || npm install --ignore-scripts

# Código fuente
COPY . .
RUN npm run generate:db

ENV NODE_ENV=production

CMD ["node", "apps/bot/src/index.js"]
