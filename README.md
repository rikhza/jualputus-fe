# JualPutus Frontend

> Modern React TypeScript application for selling electronic devices with WhatsApp integration

[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-black)](https://bun.sh)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com)

## Features

-   📱 **4-Step Form Wizard**: Product → Condition → Contact → Review
-   🎫 **Ticket System**: Timestamp-based unique ticket numbers (`JP-DDMMHHMMSS`)
-   📸 **Photo Upload**: Support for up to 2 device photos
-   💬 **WhatsApp Integration**: Direct submission to admin via Fonnte API
-   🔒 **Secure**: Server-side API credentials, no client exposure
-   🚀 **Fast**: Built with Bun, Vite, and optimized for performance
-   📱 **Responsive**: Mobile-first design with Tailwind CSS

## Quick Start

### Prerequisites

-   [Bun](https://bun.sh) >= 1.0.0
-   Node.js >= 18 (for Vercel CLI compatibility)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd jualputus-fe

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env
# Edit .env with your Fonnte token and admin WhatsApp number

# Start development server (FE only)
bun run dev
```

Visit **http://localhost:3000**

## Environment Variables

Create a `.env` file in the root directory:

```bash
# WhatsApp API (Fonnte.com) - REQUIRED
VITE_FONNTE_TOKEN=your_fonnte_token_here
VITE_ADMIN_WA=628123456789

# Application (Optional)
VITE_APP_NAME=JualPutus
VITE_APP_VERSION=1.0.0
```

Get your Fonnte token from: https://fonnte.com

## Development

```bash
# Start dev server with API functions (recommended)
bun run dev

# Start Vite only (no API functions)
bun run dev:vite

# Type checking
bun run typecheck

# Linting
bun run lint

# E2E tests
bun run test:e2e
```

## Architecture

```
Form Submit → Generate Ticket → Navigate to /send/payloadwa
                                        ↓
                                  SendPage Component
                                        ↓
                            POST https://api.fonnte.com/send (client)
                                        ↓
                                     Fonnte API
                                        ↓
                              Admin WhatsApp Notification
```

**Key Points:**

-   No localStorage or client-side storage
-   Data passed via React Router navigation state
-   Requires VITE_FONNTE_TOKEN and VITE_ADMIN_WA in .env
-   Static endpoint: `/send/payloadwa`

## Project Structure

```
src/
├── components/          # React components
│   ├── form/           # Multi-step form components
│   ├── ui/             # Reusable UI components
│   ├── SellForm.tsx    # Main form orchestrator
│   └── SendPage.tsx    # WhatsApp submission handler
├── services/           # Business logic
│   ├── dataService.ts  # Ticket generation
│   └── whatsappService.ts # Deprecated
├── data/               # Static data (brands, models)
└── types/              # TypeScript definitions

api/                    # Vercel Serverless Functions
└── whatsapp/
    └── send.ts         # WhatsApp API integration
```

## Building for Production

```bash
# Build
bun run build

# Preview build locally
bun run preview
```

Output will be in `dist/` directory.

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:

    ```bash
    npm i -g vercel
    ```

2. **Set Environment Variables** in Vercel Dashboard:

    - Project Settings → Environment Variables
    - Add `VITE_FONNTE_TOKEN` and `VITE_ADMIN_WA`

3. **Deploy**:
    ```bash
    vercel deploy --prod
    ```

### Deploy to Other Platforms

For Netlify, GitHub Pages, or other platforms, you'll need to set up serverless functions manually or use a different backend approach.

## API Endpoints

### POST `https://api.fonnte.com/send`

Send form submission to admin WhatsApp via Fonnte API (from client).

**Request Body:**

```json
{
	"ticket_number": "JP-2201143045",
	"category": "hp_flagship",
	"brand": "Apple",
	"model": "iPhone 14 Pro",
	"year_released": 2023,
	"physical_condition": "mulus",
	"functional_features": ["layar", "speaker"],
	"accessories": ["dus", "charger"],
	"photos": ["data:image/png;base64,..."],
	"full_name": "John Doe",
	"whatsapp": "08123456789",
	"email": "john@example.com",
	"full_address": "Jl. Example No. 123",
	"location_lat": -6.2,
	"location_lng": 106.816666
}
```

**Response:**

```json
{
	"success": true,
	"message": "Submission sent successfully to admin WhatsApp",
	"ticket_number": "JP-2201143045"
}
```

## Tech Stack

-   **Runtime**: Bun 1.0+
-   **Framework**: React 18.3 + TypeScript 5.5
-   **Build Tool**: Vite 7.1
-   **Styling**: Tailwind CSS 3.4
-   **Routing**: React Router DOM 7.9
-   **Icons**: Lucide React
-   **Testing**: Playwright
-   **Deployment**: Vercel (Serverless Functions)

## Troubleshooting

### Port 3000 already in use

```bash
lsof -ti:3000 | xargs kill -9
```

### API endpoint returns 404 locally

Make sure you're using `bun run dev` (Vercel CLI) instead of `bun run dev:vite`.

### Type errors

```bash
bun run typecheck
```

### Bun not found

```bash
curl -fsSL https://bun.sh/install | bash
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

-   [AGENTS.md](./AGENTS.md) - Comprehensive guide for AI agents and developers
-   [API Documentation](./api/README.md) - Serverless function documentation

## License

This project is proprietary and confidential.

## Support

For support, contact the development team or create an issue in the repository.

---

**Last Updated**: 2025-01-07  
**Version**: 1.0.0
