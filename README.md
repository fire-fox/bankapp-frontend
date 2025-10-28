# BankApp Frontend

Modern banking web application built with Angular 20 and served with Nginx.

## Technology Stack

- **Angular 20.3.7** (released October 2025)
- **TypeScript 5.7.2**
- **Nginx 1.28.0-alpine** (stable)
- **Standalone Components** (no NgModules)
- **Signals** (Angular's new reactivity system)

## Features

- ✅ Dashboard with account overview
- ✅ Multiple accounts management
- ✅ Transaction history
- ✅ User profile management
- ✅ Responsive design
- ✅ JWT authentication interceptor
- ✅ Lazy loading routes
- ✅ Production-optimized build

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Navigate to http://localhost:4200
```

## Production Build

```bash
# Build for production
npm run build:prod

# Output will be in dist/bankapp-frontend/browser
```

## Docker

```bash
# Build image (multi-stage: Node.js build + Nginx serve)
docker build -t bankapp-frontend:latest .

# Run container
docker run -d -p 80:80 bankapp-frontend:latest

# Image size: ~50MB (Alpine + gzipped Angular)
```

## Architecture

### Standalone Components
Angular 20 uses standalone components by default (no NgModules needed):
- Simpler architecture
- Better tree-shaking
- Improved bundle size

### Lazy Loading
All feature modules are lazy-loaded for optimal performance:
- Dashboard
- Accounts
- Transactions
- Profile

### HTTP Interceptor
Automatic JWT token injection for all API requests to API Gateway.

## Nginx Configuration

Custom nginx.conf includes:
- Gzip compression
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Static asset caching (1 year)
- SPA routing (all routes → index.html)
- API proxy to API Gateway (/api/* → http://api-gateway:8080)
- Health check endpoint

## API Integration

Frontend proxies all `/api/*` requests to API Gateway:
- `GET /api/v1/accounts` → Account Service
- `POST /api/v1/transactions/transfer` → Transaction Service
- etc.

API Gateway handles:
- Authentication
- Rate limiting
- Circuit breaker
- Service routing

## Environment Variables

Configure via environment.ts:
- API_URL
- KEYCLOAK_URL
- etc.

## Bundle Size

Production build optimization:
- Initial bundle: ~200KB (gzipped)
- Total size: ~500KB (including vendor)
- Lazy chunks: ~20-50KB each

## Security

- Helmet.js headers via Nginx
- JWT authentication
- CORS configuration
- No sensitive data in localStorage

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT
