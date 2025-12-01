# Multi-Customer Data Structure

This folder contains GrapesJS project data for multiple customers.

## Folder Structure

```
data/
├── default/           # Default customer (fallback)
│   ├── project.json  # GrapesJS pages and content
│   └── config.json   # Customer-specific configuration
├── customer1/        # Example customer 1
│   ├── project.json
│   └── config.json
└── customer2/        # Example customer 2
    ├── project.json
    └── config.json
```

## Adding a New Customer

1. Create a new folder with the customer ID (e.g., `customer1`)
2. Add `project.json` with GrapesJS export data
3. Add `config.json` with customer-specific settings (optional)

### project.json Format

```json
{
  "pages": [
    {
      "id": "unique-page-id",
      "name": "Page Name",
      "html": "<div>...</div>",
      "css": "...",
      "js": "...",
      "metadata": {}
    }
  ],
  "globalStyles": "/* Global CSS */",
  "globalScripts": "/* Global JS */"
}
```

### config.json Format

```json
{
  "customerId": "customer1",
  "theme": {
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2"
  },
  "siteName": "Customer Store Name",
  "siteDescription": "Store description"
}
```

## How It Works

The application automatically loads the appropriate customer data based on:
- Subdomain detection (e.g., `customer1.yourdomain.com` → loads `customer1/`)
- Falls back to `default/` if customer not found
- Infrastructure can replace files in customer folders to update content
