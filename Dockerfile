# Use the official Playwright image with Node.js and required browsers
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies for testing)
RUN npm ci

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the application files
COPY . .

# Build TypeScript project (both tests and server)
RUN npx tsc -p tsconfig.json

# Expose API port
EXPOSE 3000

# Default command runs tests
CMD ["npm", "test"]