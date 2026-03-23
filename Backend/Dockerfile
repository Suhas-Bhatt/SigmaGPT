# ─── Stage: Production ───────────────────────────────────────────────────────
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first (layer-cache friendly)
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy source code (.env is copied here and also loaded via env_file in compose)
COPY . .

# Expose the port the server listens on
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
