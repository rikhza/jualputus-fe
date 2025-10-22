# Serverless API Functions

This directory contains Vercel Serverless Functions for JualPutus Frontend.

## Structure

```
api/
├── whatsapp/
│   └── send.ts       # WhatsApp API integration (Fonnte)
└── README.md         # This file
```

## Functions

### POST `/api/whatsapp/send`

Sends form submission data to admin WhatsApp via Fonnte API.

**Environment Variables Required:**

-   `VITE_FONNTE_TOKEN` - Fonnte API token
-   `VITE_ADMIN_WA` - Admin WhatsApp number (format: 628123456789)

**Request Body:**

```typescript
{
  ticket_number: string;
  category: string;
  brand: string;
  model: string;
  year_released: number;
  physical_condition: string;
  functional_features: string[];
  accessories: string[];
  photos: string[];  // Base64 data URLs
  full_name: string;
  whatsapp: string;
  email?: string;
  full_address: string;
  location_lat?: number;
  location_lng?: number;
  // ... other fields
}
```

**Response:**

```typescript
{
  success: boolean;
  message?: string;
  error?: string;
  ticket_number?: string;
}
```

## Security

-   API credentials are stored server-side only (never exposed to client)
-   Functions run in Vercel's serverless environment
-   Environment variables are accessed via `process.env`
-   All requests are validated and sanitized

## Local Development

1. Create `.env` file with required variables:

    ```bash
    cp .env.example .env
    # Edit .env with your actual values
    ```

2. Start development server:

    ```bash
    bun run dev
    ```

3. API functions are available at:
    - `http://localhost:3000/api/whatsapp/send`

## Deployment

When deploying to Vercel:

1. Set environment variables in Vercel Dashboard:

    - Project Settings > Environment Variables
    - Add `VITE_FONNTE_TOKEN` and `VITE_ADMIN_WA`

2. Deploy:
    ```bash
    vercel deploy --prod
    ```

## Troubleshooting

### 500 Error - Service not configured

Check that environment variables are set:

-   In Vercel Dashboard: Project Settings > Environment Variables
-   Locally: Check `.env` file exists and has values

### 405 Error - Method not allowed

Ensure you're using POST method for `/api/whatsapp/send`

### Photos not sending

-   Check photo format (should be base64 data URLs)
-   Verify file size (Fonnte may have limits)
-   Check Fonnte API quota/credits
