# Use the official Playwright image with Node.js and required browsers
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --only=production

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the application files
COPY . .

# Install dev dependencies for TypeScript compilation
RUN npm install --save-dev typescript @types/node @types/express

# Build TypeScript project
RUN npx tsc -p tsconfig.server.json

# Remove dev dependencies and source TypeScript files
RUN npm prune --production && \
    rm -rf src/ tests/ && \
    rm -rf node_modules/typescript node_modules/@types && \
    ls -la dist/

# Expose API port
EXPOSE 3000

# Start the API server using compiled JavaScript
CMD ["node", "dist/server.js"]