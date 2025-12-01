# GrapesJS Multi-Customer Sales Page Renderer

Angular 20 SSR application that dynamically renders sales pages from GrapesJS JSON exports. Built for multi-customer support with clean architecture and easy maintenance.

## Features

- **Angular 20 with SSR**: Server-side rendering for optimal SEO and performance
- **GrapesJS Integration**: Renders pages from GrapesJS JSON exports
- **Multi-Customer Support**: Subdomain-based customer detection with isolated data
- **Default Pages**: Pre-built Auth, Cart, and Submit pages (customizable per customer)
- **Clean Architecture**: Organized structure with clear separation of concerns
- **Type-Safe**: Full TypeScript support with strict mode
- **Easy Maintenance**: Well-structured code with minimal comments for important functions only

## Project Structure

```
src/
├── app/
│   ├── core/                      # Core services and models
│   │   ├── models/
│   │   │   └── grapesjs.model.ts # GrapesJS interfaces
│   │   └── services/
│   │       ├── grapesjs-loader.service.ts  # Loads customer data
│   │       └── page-renderer.service.ts     # Renders GrapesJS pages
│   │
│   ├── features/
│   │   ├── dynamic-page/          # Main GrapesJS page renderer
│   │   │   ├── dynamic-page.component.ts
│   │   │   ├── dynamic-page.component.html
│   │   │   └── dynamic-page.component.scss
│   │   │
│   │   └── default-pages/         # Standard pages (not customizable)
│   │       ├── auth/              # Authentication page
│   │       ├── cart/              # Shopping cart page
│   │       └── submit/            # Order confirmation page
│   │
│   ├── app.component.ts           # Root component
│   ├── app.routes.ts              # Application routes
│   ├── app.config.ts              # App configuration
│   └── app.config.server.ts       # SSR configuration
│
└── public/assets/data/            # Customer data storage
    ├── default/                   # Default customer (fallback)
    │   ├── project.json          # GrapesJS pages
    │   └── config.json           # Customer configuration
    └── [customerId]/             # Additional customers
        ├── project.json
        └── config.json
```

## Installation

```bash
# Install dependencies
npm install

# Development server
npm start

# Build for production
npm run build:ssr

# Serve production build
npm run serve:ssr
```

## How It Works

### 1. Customer Data Loading

The application loads customer data based on subdomain:
- `customer1.yourdomain.com` → loads `/assets/data/customer1/project.json`
- Falls back to `/assets/data/default/project.json` if customer not found

### 2. GrapesJS Rendering

[GrapesJSLoaderService](src/app/core/services/grapesjs-loader.service.ts) loads the JSON:
```typescript
loadCustomerProject(customerId: string): Observable<GrapesJSProject | null>
```

[PageRendererService](src/app/core/services/page-renderer.service.ts) renders the page:
- Sanitizes HTML content
- Injects CSS into document head
- Executes JavaScript (if present)

### 3. Default Pages

Standard pages that cannot be customized by customers:
- **/auth**: Authentication (login/signup)
- **/cart**: Shopping cart
- **/submit**: Order confirmation

These pages maintain consistent UX across all customers.

## Adding a New Customer

1. Create a new folder in `public/assets/data/`:
```bash
mkdir -p public/assets/data/customer1
```

2. Add `project.json` (GrapesJS export):
```json
{
  "pages": [
    {
      "id": "page-id",
      "name": "Home Page",
      "html": "<div>Your content</div>",
      "css": "/* Your styles */",
      "js": "/* Your scripts */"
    }
  ],
  "globalStyles": "/* Global CSS */",
  "globalScripts": "/* Global JS */"
}
```

3. Add `config.json` (optional):
```json
{
  "customerId": "customer1",
  "theme": {
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2"
  },
  "siteName": "Customer Store",
  "siteDescription": "Store description"
}
```

4. Configure your infrastructure to replace these files when customers update their designs.

## Routes

| Route | Description |
|-------|-------------|
| `/` | First page from customer's GrapesJS project |
| `/:pageId` | Specific page by ID or name |
| `/auth` | Authentication page (default) |
| `/cart` | Shopping cart page (default) |
| `/submit` | Order confirmation page (default) |

## GrapesJS Export Format

Your GrapesJS editor should export in this format:

```json
{
  "pages": [
    {
      "id": "unique-id",
      "name": "Page Name",
      "html": "<!DOCTYPE html>...",
      "css": "body { ... }",
      "js": "console.log('...')",
      "metadata": {
        "hasFrames": true
      }
    }
  ],
  "globalStyles": "/* Applied to all pages */",
  "globalScripts": "/* Executed on all pages */",
  "projectData": {
    "assets": [],
    "styles": []
  }
}
```

## Best Practices

### Security
- HTML is sanitized using Angular's `DomSanitizer`
- All user content is properly escaped
- CSP headers recommended for production

### Performance
- SSR for fast initial load
- Lazy-loaded routes
- Optimized bundle sizes

### Maintenance
- Clean code structure
- TypeScript strict mode
- Minimal comments (only for complex logic)
- Easy to extend with new features

## Development

### Adding New Default Pages

1. Create component in `src/app/features/default-pages/`
2. Add route in [app.routes.ts](src/app/app.routes.ts)
3. Implement your page logic

### Customizing Page Renderer

Edit [PageRendererService](src/app/core/services/page-renderer.service.ts) to modify rendering behavior.

### Multi-Tenant Configuration

Subdomain detection is handled in [DynamicPageComponent](src/app/features/dynamic-page/dynamic-page.component.ts):
```typescript
private getCustomerIdFromSubdomain(): string {
  // Extracts customerId from subdomain
}
```

## Production Deployment

1. Build the application:
```bash
npm run build:ssr
```

2. Deploy the `dist/` folder to your server

3. Configure your infrastructure to:
   - Handle subdomain routing
   - Replace customer JSON files in `assets/data/[customerId]/`
   - Restart/reload the application when content changes

## Infrastructure Integration

The application is designed for easy infrastructure integration:

- **File-based updates**: Simply replace JSON files to update content
- **No database required**: All data in static JSON files
- **Fast deployments**: Replace single customer folder without affecting others
- **Scalable**: Each customer has isolated data

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4000` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - All rights reserved
