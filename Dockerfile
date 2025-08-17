# Stage 1: build
FROM node:18-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:18-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy standalone build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure writable .next directory
RUN chown -R node:node /app

# Use non-root user
USER node

EXPOSE 3000
CMD ["node", "server.js"]