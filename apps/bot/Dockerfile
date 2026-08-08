# AOTR Bot — Dockerfile para Railway
FROM node:22-alpine AS base
WORKDIR /app

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
