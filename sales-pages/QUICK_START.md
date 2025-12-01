# Quick Start Guide

Get your Angular 20 SSR GrapesJS renderer up and running in minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

Visit `http://localhost:4200` to see your application.

## What You'll See

The default customer's sales page will render with:
- Product cards from GrapesJS JSON
- CTA banner
- Footer section
- Responsive grid layout

## Adding Your First Customer

### Step 1: Create Customer Folder

```bash
mkdir -p public/assets/data/mycustomer
```

### Step 2: Export from GrapesJS

In your GrapesJS editor, export your project and save as `project.json`:

```json
{
  "pages": [
    {
      "id": "home",
      "name": "Home Page",
      "html": "<div><h1>Welcome to My Store</h1></div>",
      "css": "h1 { color: #667eea; text-align: center; }",
      "js": ""
    }
  ],
  "globalStyles": "",
  "globalScripts": ""
}
```

### Step 3: Add Configuration (Optional)

Create `public/assets/data/mycustomer/config.json`:

```json
{
  "customerId": "mycustomer",
  "siteName": "My Store",
  "theme": {
    "primaryColor": "#667eea"
  }
}
```

### Step 4: View Your Customer's Page

**Development Testing**:
You can test by modifying the `getCustomerIdFromSubdomain()` method temporarily:

```typescript
// In src/app/features/dynamic-page/dynamic-page.component.ts
private getCustomerIdFromSubdomain(): string {
  return 'mycustomer'; // Hardcode for testing
}
```

**Production (with subdomain)**:
Access via `mycustomer.yourdomain.com`

## Available Routes

### Dynamic Routes (Customizable)
- `/` - First page from customer's project
- `/page-id` - Specific page by ID

### Default Routes (Not Customizable)
- `/auth` - Login/Signup page
- `/cart` - Shopping cart
- `/submit` - Order confirmation

## Project Structure Overview

```
src/app/
├── core/                           # Core business logic
│   ├── models/                    # TypeScript interfaces
│   └── services/                  # Business services
│       ├── grapesjs-loader.service.ts    # Loads customer data
│       └── page-renderer.service.ts       # Renders pages
│
├── features/                       # Feature modules
│   ├── dynamic-page/              # GrapesJS page renderer
│   └── default-pages/             # Standard pages
│       ├── auth/                  # Authentication
│       ├── cart/                  # Shopping cart
│       └── submit/                # Confirmation
│
└── app.routes.ts                  # Application routing
```

## Common Tasks

### Update Customer Content

Simply replace the JSON file:

```bash
# Replace customer's project
cp new-project.json public/assets/data/mycustomer/project.json
```

The changes will be reflected on next page load.

### Add a New Page

Edit your customer's `project.json`:

```json
{
  "pages": [
    {
      "id": "home",
      "name": "Home",
      "html": "...",
      "css": "..."
    },
    {
      "id": "about",
      "name": "About Us",
      "html": "<div><h1>About Us</h1></div>",
      "css": "h1 { color: blue; }"
    }
  ]
}
```

Access via: `http://localhost:4200/about`

### Customize Default Pages

Edit the components in `src/app/features/default-pages/`:

```bash
# Edit authentication page
src/app/features/default-pages/auth/auth.component.ts
src/app/features/default-pages/auth/auth.component.html
src/app/features/default-pages/auth/auth.component.scss
```

## Building for Production

```bash
# Build with SSR
npm run build:ssr

# Output will be in dist/sales-page/
```

## Serving Production Build

```bash
# Serve the SSR build
npm run serve:ssr
```

Access at `http://localhost:4000`

## Troubleshooting

### Port Already in Use

Change port in development:
```bash
ng serve --port 4300
```

Change port in production:
```bash
PORT=5000 npm run serve:ssr
```

### Customer Data Not Loading

1. Check file exists: `public/assets/data/{customerId}/project.json`
2. Validate JSON syntax
3. Check browser console for errors
4. Verify HTTP requests in Network tab

### Styles Not Applying

1. Check CSS in your `project.json`
2. Verify styles are injected in browser DevTools (look for `<style id="dynamic-styles">`)
3. Check for CSS specificity conflicts

### Page Not Found

1. Verify page ID matches exactly (case-sensitive)
2. Check `pages` array in `project.json`
3. Ensure route is defined in `app.routes.ts`

## Development Tips

### Live Reload

Development server supports live reload:
```bash
npm start
# Edit files and see changes automatically
```

### Inspect Rendered HTML

Open browser DevTools and check:
- HTML structure in Elements tab
- CSS in `<style id="dynamic-styles">`
- Console for JavaScript errors

### Test Multiple Customers

Create multiple customer folders and switch between them:

```bash
public/assets/data/
├── customer1/
├── customer2/
└── customer3/
```

## Next Steps

1. **Read [README.md](README.md)** for detailed documentation
2. **Read [ARCHITECTURE.md](ARCHITECTURE.md)** to understand the design
3. **Customize default pages** to match your brand
4. **Integrate with backend** for authentication and orders
5. **Deploy to production** with your infrastructure

## Need Help?

- Check [README.md](README.md) for comprehensive documentation
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- Inspect example data in `public/assets/data/default/`

## Production Checklist

Before deploying to production:

- [ ] Update `environment` configurations
- [ ] Set up CDN for static assets
- [ ] Configure subdomain routing
- [ ] Set up SSL/HTTPS
- [ ] Implement Content Security Policy
- [ ] Add analytics tracking
- [ ] Set up error monitoring
- [ ] Configure backup for customer data
- [ ] Test SSR rendering
- [ ] Verify all default pages work
- [ ] Load test with multiple customers

## Infrastructure Integration

Your infrastructure should:

1. **Route subdomains** to the application
2. **Replace JSON files** in customer folders to update content
3. **Restart/reload** the application after updates (or use file watching)
4. **Backup customer data** regularly
5. **Monitor** application health

Example workflow:
```bash
# Customer updates their design in GrapesJS
# Export to JSON
# Infrastructure receives JSON
# Replace file
scp new-project.json server:/path/to/app/public/assets/data/customer1/project.json
# Application automatically serves new content
```

That's it! You're ready to build multi-customer sales pages with GrapesJS and Angular 20 SSR.
