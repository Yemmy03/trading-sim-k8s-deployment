# --------->Stage 1: Build the app<---------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# --------->Stage 2: Production image<--------
FROM node:18-alpine AS runner

EXPOSE 3000

WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm ci --omit=dev

# Run Next.js
ENTRYPOINT ["npm", "run", "start"]

