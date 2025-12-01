# Folder Restructure Plan - Venio.Web Style

## Current Structure
```
src/app/
├── core/
│   ├── models/
│   └── services/
├── features/
│   ├── dynamic-page/
│   └── default-pages/
│       ├── auth/
│       ├── cart/
│       └── submit/
└── shared/
    └── components/
        └── navbar/
```

## New Structure (Venio.Web Style)
```
src/app/
├── core/
│   ├── models/
│   ├── services/
│   └── guards/
├── modules/
│   ├── store/                      # Main store module (GrapesJS renderer)
│   │   ├── components/
│   │   │   ├── store-page/        # Dynamic page renderer
│   │   │   └── product-card/
│   │   ├── services/
│   │   └── store.routes.ts
│   ├── auth/                       # Authentication module
│   │   ├── components/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── services/
│   │   └── auth.routes.ts
│   ├── cart/                       # Shopping cart module
│   │   ├── components/
│   │   │   ├── cart-list/
│   │   │   └── cart-summary/
│   │   ├── services/
│   │   └── cart.routes.ts
│   ├── checkout/                   # Checkout/Submit module
│   │   ├── components/
│   │   │   └── order-confirmation/
│   │   ├── services/
│   │   └── checkout.routes.ts
│   └── shared/                     # Shared module
│       ├── components/
│       │   ├── navbar/
│       │   ├── footer/
│       │   └── loading/
│       ├── directives/
│       ├── pipes/
│       └── models/
├── assets/                         # Will include Gofive assets
│   ├── data/                      # Customer GrapesJS JSON
│   ├── images/
│   └── styles/
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

## Migration Steps

### Step 1: Move files to new structure
- Move `features/dynamic-page` → `modules/store/components/store-page`
- Move `features/default-pages/auth` → `modules/auth/components/login`
- Move `features/default-pages/cart` → `modules/cart/components/cart-list`
- Move `features/default-pages/submit` → `modules/checkout/components/order-confirmation`
- Move `shared/components/navbar` → `modules/shared/components/navbar`

### Step 2: Create module-specific services
- `modules/store/services/` - GrapesJS related services
- `modules/cart/services/` - Cart management
- `modules/auth/services/` - Authentication

### Step 3: Create routing files
- Each module will have its own routes file
- Main app.routes.ts will import from module routes

### Step 4: Add Gofive Libraries (when available)
- `@gofive/angular-common` - Common utilities
- Gofive Asset - UI components and assets

## Benefits
1. **Better Organization**: Each module is self-contained
2. **Lazy Loading**: Each module can be lazy-loaded
3. **Scalability**: Easy to add new modules
4. **Team Collaboration**: Different teams can work on different modules
5. **Gofive Integration**: Ready for Gofive libraries

## Next Steps
1. Confirm this structure matches your Venio.Web pattern
2. Begin migration
3. Set up Gofive library access (npm token or local link)
4. Integrate Gofive components
