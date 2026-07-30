# --- Stage 1: Build & Compilation ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install package definitions and build tools
COPY package*.json ./
COPY prisma ./prisma/

# Install all packages including devDependencies for TypeScript compilation
RUN npm ci

# Copy source tree and compile to JavaScript
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Stage 2: Final Runtime Production Layer ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built distribution, prisma clients, and production dependencies
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose standard port utilized by Cloud Run ($PORT)
EXPOSE 3000

# Production run execution command
CMD ["node", "dist/server.cjs"]
