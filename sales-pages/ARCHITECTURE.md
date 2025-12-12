# Architecture Documentation

## Overview

This application follows Angular best practices with a feature-based architecture, clear separation of concerns, and SSR for optimal performance.

## Design Principles

1. **Separation of Concerns**: Core services, features, and shared components are isolated
2. **Single Responsibility**: Each service/component has one clear purpose
3. **DRY (Don't Repeat Yourself)**: Reusable services and components
4. **Type Safety**: Full TypeScript with strict mode
5. **Maintainability**: Clean code with minimal but meaningful comments

## Architecture Layers

### 1. Core Layer (`src/app/core/`)

Contains application-wide services and models that are used throughout the app.

#### Models (`core/models/`)

- **grapesjs.model.ts**: TypeScript interfaces for GrapesJS data structures
  - `GrapesJSPage`: Individual page structure
  - `GrapesJSProject`: Complete project with multiple pages
  - `CustomerConfig`: Customer-specific configuration

#### Services (`core/services/`)

**GrapesJSLoaderService** - Loads customer data

- Fetches project.json and config.json for specific customers
- Handles subdomain-based customer detection
- Provides fallback to default customer
- Methods:
  - `loadCustomerProject()`: Loads GrapesJS project data
  - `loadCustomerConfig()`: Loads customer configuration
  - `getPageById()`: Retrieves specific page from project
  - `getFirstPage()`: Gets the first page (home page)

**PageRendererService** - Renders GrapesJS pages

- Sanitizes HTML content for security
- Injects CSS dynamically into document head
- Executes JavaScript safely
- Cleans up resources on component destruction
- Methods:
  - `sanitizeHtml()`: Prevents XSS attacks
  - `injectStyles()`: Adds page styles to DOM
  - `injectScripts()`: Executes page scripts
  - `renderPage()`: Main rendering orchestration
  - `cleanupDynamicStyles()`: Removes injected styles

### 2. Features Layer (`src/app/features/`)

Feature modules organized by business functionality.

#### Dynamic Page (`features/dynamic-page/`)

Main component that renders GrapesJS pages dynamically.

**Flow**:

1. Extract customer ID from subdomain
2. Get page ID from route parameters
3. Load customer project via `GrapesJSLoaderService`
4. Render page via `PageRendererService`
5. Display loading/error states appropriately

**Responsibilities**:

- Route parameter handling
- Customer detection
- Page loading orchestration
- Error handling
- Cleanup on destroy

#### Default Pages (`features/default-pages/`)

Standard pages that provide consistent UX across all customers.

**Auth Page** - Authentication

- Login/Signup toggle
- Form validation ready
- Clean, modern UI
- Ready for backend integration

**Cart Page** - Shopping Cart

- Empty cart state
- Cart item management
- Quantity controls
- Order summary
- Checkout flow

**Submit Page** - Order Confirmation

- Success message
- Order details
- Next steps information
- Action buttons

### 3. Configuration Layer

**app.config.ts** - Client-side configuration

- Router setup
- Client hydration
- HTTP client with fetch API

**app.config.server.ts** - SSR configuration

- Server rendering setup
- Merges with client config

**app.routes.ts** - Application routing

- Lazy-loaded routes for performance
- Dynamic page routing
- Default page routes

## Data Flow

```
1. User Request
   ↓
2. Angular Router (app.routes.ts)
   ↓
3. DynamicPageComponent
   ↓
4. GrapesJSLoaderService.loadCustomerProject()
   ↓
5. HTTP Request → /assets/data/{customerId}/project.json
   ↓
6. PageRendererService.renderPage()
   ↓
7. Inject HTML/CSS/JS into DOM
   ↓
8. Render to User
```

## Multi-Customer Architecture

### Subdomain Detection

```typescript
// In DynamicPageComponent
private getCustomerIdFromSubdomain(): string {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // customer1.domain.com → 'customer1'
  // domain.com → 'default'
  return parts.length > 2 ? parts[0] : 'default';
}
```

### Data Isolation

Each customer has isolated data in `/assets/data/`:

```
assets/data/
├── customer1/
│   ├── project.json  # Customer 1's pages
│   └── config.json   # Customer 1's settings
├── customer2/
│   ├── project.json  # Customer 2's pages
│   └── config.json   # Customer 2's settings
└── default/          # Fallback
    ├── project.json
    └── config.json
```

### Benefits

1. **No Cross-Customer Contamination**: Each customer's data is separate
2. **Easy Updates**: Replace single customer folder to update
3. **Scalable**: Add new customers by adding folders
4. **No Database Needed**: File-based simplicity

## SSR Architecture

### Server-Side Rendering Flow

```
1. Request arrives at Express server (server.ts)
   ↓
2. CommonEngine renders Angular app
   ↓
3. GrapesJSLoaderService runs on server
   ↓
4. Fetch customer data from filesystem
   ↓
5. Render complete HTML
   ↓
6. Send to client
   ↓
7. Client hydrates (becomes interactive)
```

### Benefits

- **SEO**: Search engines see rendered content
- **Performance**: Fast first contentful paint
- **User Experience**: Content visible immediately

## Security Considerations

### HTML Sanitization

All user content is sanitized using Angular's `DomSanitizer`:

```typescript
sanitizeHtml(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
```

### Script Execution

Scripts are only executed in browser context, never on server:

```typescript
if (!isPlatformBrowser(this.platformId)) {
  return; // Skip on server
}
```

### Recommendations

1. Implement Content Security Policy (CSP)
2. Validate all GrapesJS JSON before storage
3. Use HTTPS in production
4. Sanitize any user-provided URLs

## Performance Optimizations

### 1. Lazy Loading

All routes are lazy-loaded:

```typescript
{
  path: 'cart',
  loadComponent: () => import('./features/default-pages/cart/cart.component')
}
```

### 2. Change Detection

Default pages use OnPush strategy where applicable.

### 3. Bundle Optimization

- Tree-shaking enabled
- AOT compilation
- Minimal dependencies

### 4. Caching

Static assets are cached for 1 year in production:

```typescript
server.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y'
}));
```

## Extension Points

### Adding New Default Pages

1. Create component in `features/default-pages/`
2. Add route in `app.routes.ts`
3. No changes to core services needed

### Customizing Rendering

Extend `PageRendererService` to modify how pages are rendered:

- Add custom transformations
- Inject additional scripts
- Modify CSS before injection

### Adding Customer-Specific Features

Use `CustomerConfig` model to store customer settings:

```typescript
interface CustomerConfig {
  customerId: string;
  theme?: {
    primaryColor?: string;
    // Add more theme options
  };
  // Add more customer settings
}
```

## Testing Strategy

### Unit Tests

- Test services in isolation
- Mock HTTP calls
- Test component logic

### Integration Tests

- Test service interactions
- Verify routing
- Check SSR rendering

### E2E Tests

- Test full user flows
- Verify multi-customer isolation
- Check default pages

## Deployment Architecture

```
┌─────────────────┐
│  Load Balancer  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│ SSR  │  │ SSR  │  (Multiple instances)
│ Node │  │ Node │
└───┬──┘  └──┬───┘
    │         │
    └────┬────┘
         │
┌────────▼────────┐
│  Static Assets  │
│  /assets/data/  │
└─────────────────┘
```

### Scalability

- Horizontal scaling: Add more Node instances
- Static assets: Serve from CDN
- Customer data: Store in shared filesystem or S3

## Folder Naming Conventions

- **kebab-case**: Files and folders (`dynamic-page.component.ts`)
- **PascalCase**: Classes and interfaces (`DynamicPageComponent`)
- **camelCase**: Variables and functions (`loadCustomerProject`)

## Code Style

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Destructure where appropriate
- Comment only complex logic

## Future Enhancements

1. **Admin Panel**: Manage customers via UI
2. **Preview Mode**: Preview changes before publishing
3. **A/B Testing**: Test different page versions
4. **Analytics**: Track page performance
5. **Cache Layer**: Redis for faster data access
6. **API Integration**: Connect to backend services
