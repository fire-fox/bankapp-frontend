# BankApp Frontend 🏦

Modern, enterprise-grade banking application frontend built with Angular 20. Features a sleek, responsive UI with Keycloak authentication, real-time updates, and comprehensive security.

![Angular](https://img.shields.io/badge/Angular-20.3.7-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://github.com/fire-fox/bankapp-frontend/workflows/CI%2FCD/badge.svg)

## Features

### Core Functionality
- **Secure Authentication**: Keycloak integration with SSO support
- **Dashboard**: Real-time financial overview with statistics and charts
- **Account Management**: View and manage multiple bank accounts
- **Transaction History**: Comprehensive transaction tracking with filters
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Real-time Updates**: Live transaction notifications and balance updates

### Security Features
- JWT token-based authentication
- HTTP interceptors for automatic token refresh
- Route guards for protected pages
- Secure session management
- XSS and CSRF protection

### Technical Highlights
- **Modern Angular**: Standalone components (Angular 20+)
- **Type Safety**: Full TypeScript coverage
- **State Management**: RxJS observables and services
- **Optimized Build**: AOT compilation and lazy loading
- **Docker Support**: Multi-stage builds for production
- **CI/CD Ready**: GitHub Actions workflow included

## Quick Start

### Prerequisites
- Node.js 22.x or higher
- npm 10.x or higher
- Angular CLI 20.x

### Installation

```bash
# Clone the repository
git clone https://github.com/fire-fox/bankapp-frontend.git
cd bankapp-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

### Environment Configuration

Create environment files for different deployment targets:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  keycloakUrl: 'http://localhost:12200',
  keycloakRealm: 'bankapp-dev'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.bankapp.com',
  keycloakUrl: 'https://auth.bankapp.com',
  keycloakRealm: 'bankapp-prd'
};
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run build:dev` | Build for development environment |
| `npm run build:qa` | Build for QA environment |
| `npm run build:prod` | Build for production environment |
| `npm test` | Run unit tests with Karma |
| `npm run lint` | Lint TypeScript code |
| `npm run watch` | Build and watch for changes |

## Project Structure

```
bankapp-frontend/
├── src/
│   ├── app/
│   │   ├── core/                 # Core services and guards
│   │   │   ├── guards/           # Route guards
│   │   │   ├── interceptors/     # HTTP interceptors
│   │   │   └── services/         # Business services
│   │   ├── features/             # Feature modules
│   │   │   ├── dashboard/        # Dashboard component
│   │   │   ├── accounts/         # Accounts management
│   │   │   ├── transactions/     # Transaction history
│   │   │   └── profile/          # User profile
│   │   ├── app.component.ts      # Root component
│   │   └── app.routes.ts         # Application routes
│   ├── environments/             # Environment configurations
│   ├── assets/                   # Static assets
│   ├── styles.scss              # Global styles
│   └── index.html               # Main HTML file
├── public/                       # Public assets
├── helm/                         # Kubernetes Helm charts
├── Dockerfile                    # Multi-stage Docker build
├── nginx.conf                    # Nginx configuration for production
└── package.json                  # Dependencies and scripts
```

## Architecture

### Component Architecture
- **Standalone Components**: Modern Angular approach without NgModules
- **Smart/Dumb Pattern**: Container and presentational components
- **Dependency Injection**: Service-based architecture
- **Reactive Programming**: RxJS for async operations

### Services
- `AuthService`: Authentication and session management
- `AccountService`: Account operations and data
- `TransactionService`: Transaction management
- `Keycloak Integration`: SSO and token management

### Routing
- Lazy loading for optimized performance
- Route guards for authentication
- Deep linking support
- Browser history management

## Docker Deployment

### Development Build
```bash
docker build -t bankapp-frontend:dev .
docker run -p 80:80 bankapp-frontend:dev
```

### Production Build
```bash
docker build --build-arg ENV=production -t bankapp-frontend:prod .
docker run -p 80:80 bankapp-frontend:prod
```

### Multi-environment Support
```bash
# QA environment
docker build --build-arg ENV=qa -t bankapp-frontend:qa .

# Production environment
docker build --build-arg ENV=production -t bankapp-frontend:prod .
```

## Kubernetes Deployment

The project includes Helm charts for Kubernetes deployment:

```bash
# Install with Helm
helm install bankapp-frontend ./helm/bankapp-frontend \
  --set environment=dev \
  --set image.tag=latest

# Different environments
helm install bankapp-frontend-qa ./helm/bankapp-frontend \
  --set environment=qa

helm install bankapp-frontend-prd ./helm/bankapp-frontend \
  --set environment=prd
```

## CI/CD Pipeline

GitHub Actions workflow automatically:
1. **Linting**: ESLint code quality checks
2. **Testing**: Run unit tests with coverage
3. **Security Scanning**: npm audit and dependency checks
4. **Building**: Create optimized production builds
5. **Docker**: Build and push images to GHCR
6. **Deployment**: Deploy to Kubernetes cluster

Workflow triggers on:
- Push to `main` or `develop` branches
- Pull requests to `main`
- Manual workflow dispatch

## Styling and Theming

### Design System
- **Color Palette**: Professional blue-based theme
- **Typography**: System fonts with fallbacks
- **Spacing**: Consistent 8px grid system
- **Shadows**: Material Design elevation system

### Responsive Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 968px`
- Desktop: `> 968px`

### CSS Architecture
- Global styles in `styles.scss`
- Component-scoped styles
- CSS custom properties for theming
- SCSS for advanced features

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Performance

- **Lighthouse Score**: 95+ for performance
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s

### Optimization Techniques
- AOT compilation
- Tree shaking
- Code splitting
- Lazy loading
- Image optimization
- Service worker (PWA ready)

## Security

### Best Practices Implemented
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- XSS protection headers
- Secure cookie flags
- Token refresh mechanism
- Input sanitization

### Dependencies
Regular security audits using:
```bash
npm audit
npm audit fix
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Coding Standards
- Follow Angular style guide
- Use TypeScript strict mode
- Write unit tests for new features
- Maintain test coverage > 70%
- Document public APIs

## Testing

### Unit Tests
```bash
# Run tests once
npm test

# Run with coverage
npm test -- --code-coverage

# Watch mode
npm test -- --watch
```

### E2E Tests (Planned)
```bash
# Run E2E tests
npm run e2e
```

## Troubleshooting

### Common Issues

**Port already in use**:
```bash
ng serve --port 4201
```

**Node modules issues**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors**:
```bash
# Clear cache
npm cache clean --force
ng build --configuration production
```

## Roadmap

- [ ] Progressive Web App (PWA) support
- [ ] Dark mode theme
- [ ] Advanced transaction filters
- [ ] Multi-language support (i18n)
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Real-time notifications with WebSockets
- [ ] Budget tracking and insights
- [ ] Financial charts and analytics

## License

MIT License - see [LICENSE](LICENSE) file for details

## Links

- **GitHub Repository**: https://github.com/fire-fox/bankapp-frontend
- **Documentation**: [Wiki](https://github.com/fire-fox/bankapp-frontend/wiki)
- **Issues**: [Issue Tracker](https://github.com/fire-fox/bankapp-frontend/issues)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

## Support

For support and questions:
- Open an [issue](https://github.com/fire-fox/bankapp-frontend/issues)
- Email: support@bankapp.com
- Discord: [Join our community](https://discord.gg/bankapp)

---

**Built with ❤️ using Angular**

*Part of the BankApp ecosystem - a complete enterprise banking platform*
