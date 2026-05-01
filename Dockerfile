# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/app

# Copy frontend package files
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY app/ ./

# Build for production
RUN npm run build

# Stage 2: Backend server
FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY server/package*.json ./server/

# Install production dependencies only
RUN cd server && npm install --production

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/app/dist ./public

# Copy backend source
COPY server/ ./server/

# Expose port
EXPOSE 8080

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start server
CMD ["node", "server/index.js"]