# Multi-stage build for Angular 20 + Nginx
# Stage 1: Build Angular application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build for production with optimizations
RUN npm run build:prod

# Stage 2: Serve with Nginx
FROM nginx:1.28.0-alpine

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from builder
COPY --from=builder /app/dist/bankapp-frontend/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions for nginx user (already exists in nginx Alpine image)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
