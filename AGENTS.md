# JualPutus Frontend - AI Agent Guide

> **Agent-optimized documentation for JualPutus Frontend**  
> A modern React TypeScript application for selling electronic devices with Bun runtime

---

## Quick Start

```bash
# Install dependencies
bun install

# Setup environment variables (WhatsApp API)
cp .env.example .env
# Edit .env with your Fonnte token and admin WhatsApp number

# Start development server (ALWAYS use this during agent sessions)
bun run dev
# → http://localhost:3000

# Type checking
bun run typecheck

# Linting
bun run lint

# E2E tests
bun run test:e2e

# Production build (AVOID during agent sessions - disables HMR)
bun run build
```

---

## Project Overview

**Purpose**: Web application for users to sell their electronic devices (phones, laptops, computers) through a multi-step form submission process.

**Key Features**:

-   4-step form wizard (Product → Condition → Contact → Review)
-   Real-time validation and error handling
-   Photo upload with preview (max 2 photos)
-   Responsive mobile-first design
-   Ticket generation system (format: JP-DDMMHHMMSS, timestamp-based for uniqueness)
-   WhatsApp integration via Fonnte API (send form data & photos to admin)
-   No local storage - data sent directly to WhatsApp

**Runtime**: Bun (fast all-in-one JavaScript runtime)  
**Framework**: React 18 + TypeScript + Vite  
**Styling**: Tailwind CSS  
**Testing**: Playwright

---

## Architecture

### Data Flow

```
Components → Services → WhatsApp API (Fonnte)
     ↑
     └──── State Management ───
```

### Key Principles

1. **No Database/Storage**: Data sent directly to WhatsApp, not stored locally
2. **Service Layer Pattern**: All data operations through `src/services/dataService.ts`
3. **Type-Safe**: Comprehensive TypeScript types in `src/types/index.ts`
4. **Component Memoization**: Performance-critical components use `React.memo`
5. **Controlled Components**: All form inputs are fully controlled
6. **Mobile-First**: Tailwind responsive design starting from small screens

---

## Project Structure

```
src/
├── components/           # React components
│   ├── form/            # Multi-step form components
│   │   ├── Step1Product.tsx      # Category, brand, model selection
│   │   ├── Step2Condition.tsx    # Physical condition & photos
│   │   ├── Step3Contact.tsx      # Contact information
│   │   └── Step4Review.tsx       # Final review before submit
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx            # Primary button component
│   │   ├── Card.tsx              # Container card
│   │   ├── Checkbox.tsx          # Checkbox input
│   │   ├── Input.tsx             # Text input with validation
│   │   ├── Progress.tsx          # Step progress indicator
│   │   ├── RadioCard.tsx         # Radio button as card
│   │   ├── Select.tsx            # Dropdown select
│   │   └── Textarea.tsx          # Multi-line text input
│   ├── SellForm.tsx     # Main form orchestrator (state management)
│   ├── SuccessScreen.tsx # Success modal after submission
│   ├── FloatingCTA.tsx  # Mobile sticky button
│   └── [Landing pages]  # Hero, FAQ, Features, etc.
│
├── services/            # Business logic layer
│   ├── dataService.ts   # All CRUD operations (localStorage)
│   └── whatsappService.ts # WhatsApp API integration (Fonnte)
│
├── data/               # Static data
│   └── mockData.ts     # Brands, models, features, accessories
│
├── types/              # TypeScript definitions
│   └── index.ts        # All interfaces and types
│
└── lib/                # Utilities (currently empty)

tests/                  # Playwright E2E tests
scripts/                # Shell scripts (setup, test, build)
docs/                   # Architecture documentation
```

---

## Tech Stack

### Core

-   **Bun** ^1.0.0 - JavaScript runtime (3x faster than npm)
-   **React** ^18.3.1 - UI library
-   **TypeScript** ^5.5.3 - Type safety
-   **Vite** ^5.4.2 - Build tool with HMR

### Styling & UI

-   **Tailwind CSS** ^3.4.1 - Utility-first CSS
-   **Lucide React** ^0.344.0 - Icon library

### Testing

-   **Playwright** ^1.48.0 - E2E testing framework

### Development

-   **ESLint** ^9.9.1 - Linting
-   **TypeScript ESLint** ^8.3.0 - TS-specific linting

---

## Key Files & Their Purpose

### Entry Points

-   `src/main.tsx` - Application entry point, renders App
-   `src/App.tsx` - Root component, manages modal state
-   `index.html` - HTML shell

### Core Components

-   `src/components/SellForm.tsx` - **CRITICAL**: Form orchestrator
    -   Manages current step (1-4)
    -   Holds all form data state
    -   Validation logic for each step
    -   Submission handler
-   `src/services/dataService.ts` - **CRITICAL**: Data operations
    -   `createSubmission(data)` - Generate ticket number and ID
    -   Auto-generates ticket numbers (format: `JP-DDMMHHMMSS`, timestamp-based, unique & memorable)
    -   No local storage - data sent via WhatsApp service

### Type Definitions

-   `src/types/index.ts` - **REFERENCE FREQUENTLY**
    -   `FormData` - Form state structure
    -   `Submission` - Submission data structure
    -   `Category` - 'hp_flagship' | 'laptop' | 'komputer'
    -   `PhysicalCondition` - 'mulus' | 'normal' | 'ada_dent' | 'pecah'

### Configuration

-   `vite.config.ts` - Vite configuration (code splitting, optimization)
-   `tailwind.config.js` - Tailwind theme customization
-   `tsconfig.json` - TypeScript compiler options
-   `playwright.config.ts` - E2E test configuration

---

## Development Guidelines

### When Making Changes

1. **Always run `bun run dev`** - Never use `bun run build` during development
2. **Check types first** - Run `bun run typecheck` before committing
3. **Preserve existing patterns** - Follow established component structure
4. **Update types** - Modify `src/types/index.ts` when adding new data structures
5. **Use service layer** - Never access mockData directly from components

### Component Patterns

```tsx
// ✅ GOOD: Memoized component with proper types
import { memo } from "react";

interface Props {
	formData: FormData;
	errors: FormErrors;
	onChange: (field: keyof FormData, value: any) => void;
}

export const MyComponent = memo(function MyComponent({
	formData,
	errors,
	onChange,
}: Props) {
	// Component logic
});

// ❌ BAD: No memo, no proper types
export function MyComponent(props: any) {
	// Implementation
}
```

### State Management

```tsx
// ✅ GOOD: Controlled component with validation
const [formData, setFormData] = useState<FormData>(initialData);
const handleChange = (field: keyof FormData, value: any) => {
	setFormData((prev) => ({ ...prev, [field]: value }));
};

// ❌ BAD: Uncontrolled or missing types
const [data, setData] = useState({});
```

### Data Service Usage

```tsx
// ✅ GOOD: Use service layer
import { getBrands, createSubmission } from '../services/dataService';

const brands = getBrands('hp_flagship');
const result = await createSubmission(submissionData);

// ❌ BAD: Direct access
import { mockBrands } from '../data/mockData';
const brands = mockBrands.filter(...);
```

### Type Safety

```tsx
// ✅ GOOD: Use nullish coalescing for null → undefined
location_lat: formData.location_lat ?? undefined,
location_lng: formData.location_lng ?? undefined,

// ❌ BAD: Direct assignment with incompatible types
location_lat: formData.location_lat, // Error if null
```

---

## Common Tasks

### Adding a New Form Field

1. Update `FormData` interface in `src/types/index.ts`
2. Add field to `initialFormData` in `SellForm.tsx`
3. Update validation function (e.g., `validateStep2()`)
4. Add input component in appropriate step component
5. Update `FormErrors` interface if needed

### Adding a New Brand/Model

1. Edit `src/data/mockData.ts`
2. Add to `mockBrands` or `mockModels` array
3. Follow existing data structure (id, name, category, etc.)
4. Changes are immediate (no restart needed with HMR)

### Adding a New API Endpoint (Future)

1. Update relevant function in `src/services/dataService.ts`
2. Replace localStorage logic with fetch/axios call
3. Keep function signature the same for minimal component changes

### Fixing Type Errors

1. Run `bun run typecheck` to see all errors
2. Check `src/types/index.ts` for correct types
3. Use nullish coalescing (`??`) for null/undefined conversion
4. Use type assertions (`as Type`) sparingly

---

## Testing

### E2E Tests (`tests/e2e.spec.ts`)

Test coverage includes:

-   Homepage loading
-   Form opening/closing
-   Step-by-step form flow
-   Validation error messages
-   Responsive design (mobile/tablet)
-   Performance metrics

### Running Tests

```bash
# Run all tests (headless)
bun run test:e2e

# Run with UI (interactive)
bun run test:e2e:ui

# Run in headed mode (see browser)
bun run test:e2e:headed

# Run specific test
bunx playwright test -g "should validate Step 1"
```

### Writing New Tests

```typescript
test.describe("Feature Name", () => {
	test("should do something", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("text=Expected")).toBeVisible();
	});
});
```

---

## Data Management

### Submission Flow

-   **No Storage**: Data tidak disimpan di localStorage/browser
-   **Direct to WhatsApp**: Form data langsung dikirim ke admin WhatsApp via Fonnte API
-   **Ticket Number**: Timestamp-based, globally unique, collision-resistant

### Ticket Number System

**Format**: `JP-DDMMHHMMSS` (timestamp-based)

**Why Timestamp-Based?**

-   ✅ **Globally Unique**: Tidak ada duplicate antar users (centralized time-based)
-   ✅ **No Counter Needed**: Tidak perlu sync counter di localStorage
-   ✅ **Collision-Resistant**: Auto-append random 2-digit jika submit di detik sama
-   ✅ **Sortable**: Otomatis terurut berdasarkan waktu submit
-   ✅ **Trackable**: Admin langsung tau kapan customer submit
-   ✅ **Memorable**: Format pendek, mudah dicatat customer

**Examples**:

```
JP-1701143045 = 17 January, 14:30:45
JP-2512095530 = 25 December, 09:55:30
JP-0103120015 = 01 March, 12:00:15
```

**Collision Handling**:
Jika 2 user submit di detik yang sama, otomatis append random 2-digit:

```
JP-170114304537  (dengan suffix 37)
```

### Available Operations

```typescript
// Submission
createSubmission(data): Promise<{ id, ticket_number }>
// Returns unique ID and timestamp-based ticket number
// Data is sent to WhatsApp, not stored locally
```

### Data Flow Example

```typescript
// 1. Form submission
const result = await createSubmission({
	category: "laptop",
	brand: "ASUS",
	model: "ROG Zephyrus G14",
	year_released: 2024,
	physical_condition: "mulus",
	// ... other fields
});

// 2. Show success with ticket
console.log(result.ticket_number); // "JP-1701143045" (17 Jan, 14:30:45)
```

---

## Performance Optimizations

### Applied Optimizations

1. **Code Splitting**: React, lucide-react in separate chunks
2. **Tree Shaking**: Unused code eliminated in build
3. **Component Memoization**: `React.memo` on form steps
4. **Lazy Loading**: Components loaded on demand
5. **Minification**: Terser with console.log removal in production
6. **CSS Purging**: Tailwind removes unused styles

### Build Configuration

```typescript
// vite.config.ts
{
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide': ['lucide-react'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
        drop_debugger: true,
      },
    },
  }
}
```

---

## Troubleshooting

### Common Issues

| Issue               | Solution                                             |
| ------------------- | ---------------------------------------------------- |
| Port 3000 in use    | `lsof -ti:3000 \| xargs kill -9`                     |
| Type errors         | `bun run typecheck` then fix reported issues         |
| Bun not found       | Install: `curl -fsSL https://bun.sh/install \| bash` |
| Playwright browsers | `bunx playwright install`                            |
| Module not found    | `rm -rf node_modules .bun && bun install`            |
| HMR not working     | Restart dev server: `Ctrl+C` then `bun run dev`      |

### Debugging

```typescript
// Check current form state
console.log("Form data:", formData);

// Verify localStorage
console.log("Stored:", localStorage.getItem("jualputus_submissions"));

// Check submission count
import { getAllSubmissions } from "./services/dataService";
console.log("Total submissions:", getAllSubmissions().length);
```

---

## Environment Variables

Create `.env` file (REQUIRED for WhatsApp integration):

```bash
# WhatsApp API (Fonnte) - REQUIRED
VITE_FONNTE_TOKEN=your_fonnte_token_here
VITE_ADMIN_WA=628123456789

# Application
VITE_APP_NAME=JualPutus
VITE_APP_VERSION=1.0.0
```

**Setup WhatsApp Integration:**

1. Get token from [Fonnte.com](https://fonnte.com)
2. Create `.env` file:
    ```bash
    VITE_FONNTE_TOKEN=your_token_here
    VITE_ADMIN_WA=628123456789
    ```
3. Restart dev server: `bun run dev`

---

## API Reference (Data Service)

### getBrands(category?: Category)

Returns brands filtered by category or all brands.

```typescript
const allBrands = getBrands(); // All 19 brands
const laptopBrands = getBrands("laptop"); // ASUS, Lenovo, MSI, etc.
```

### getModels(brandId?: string)

Returns models filtered by brand or all models.

```typescript
const allModels = getModels(); // All 50 models
const applePhones = getModels("1"); // iPhone models
```

### createSubmission(data)

Creates a new submission, generates ticket number, saves to localStorage.

```typescript
const result = await createSubmission({
	category: "hp_flagship",
	brand_id: "1",
	model_id: "1",
	year_released: 2023,
	physical_condition: "mulus",
	functional_features: ["layar", "speaker"],
	accessories: ["dus", "charger"],
	photos: ["data:image/png;base64,..."],
	full_name: "John Doe",
	whatsapp: "08123456789",
	email: "john@example.com",
	full_address: "Jl. Example No. 123",
	location_lat: -6.2,
	location_lng: 106.816666,
});

// Returns: { id: 'sub_...', ticket_number: 'JP-1701143045' }
```

---

## Deployment

### Before Deploy

No cleanup needed! Data tidak disimpan di localStorage, jadi tidak ada data testing yang perlu dihapus.

### Build for Production

```bash
# Clean install
bun install

# Build
bun run build
# → Outputs to dist/

# Preview locally
bun run preview
# → http://localhost:4173
```

### Deploy to Vercel

```bash
vercel deploy
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
bun run build
gh-pages -d dist
```

---

## Migration Path (Future Backend)

When ready to add a backend:

1. **Keep service layer interface** - Don't change function signatures
2. **Replace implementation** - Change localStorage to API calls
3. **Add error handling** - Network errors, retries, loading states
4. **Update types** - Add response types from API

```typescript
// Before (localStorage)
export const createSubmission = async (data) => {
	submissions.push(data);
	localStorage.setItem("submissions", JSON.stringify(submissions));
	return { id, ticket_number };
};

// After (API)
export const createSubmission = async (data) => {
	const response = await fetch("/api/submissions", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return await response.json();
};
```

---

## Resources

### Internal Documentation

-   `docs/ARCHITECTURE.md` - Detailed architecture guide
-   `scripts/setup.sh` - Automated setup script
-   `scripts/build.sh` - Production build script

### External Links

-   [React Documentation](https://react.dev)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)
-   [Tailwind CSS](https://tailwindcss.com/docs)
-   [Vite Guide](https://vitejs.dev/guide/)
-   [Playwright Docs](https://playwright.dev)
-   [Bun Documentation](https://bun.sh/docs)

---

## License

This project is proprietary and confidential.

---

## Agent Notes

### DO ✅

-   Use `bun run dev` for all interactive development
-   Check types before committing (`bun run typecheck`)
-   Follow existing patterns and conventions
-   Use service layer for data operations
-   Add proper TypeScript types for new code
-   Test changes with `bun run test:e2e`
-   Use React.memo for performance-critical components
-   Keep components small and focused

### DON'T ❌

-   Run `bun run build` during development (breaks HMR)
-   Access mockData directly from components
-   Use `any` type unless absolutely necessary
-   Create inline styles (use Tailwind classes)
-   Skip validation for form inputs
-   Forget to handle loading/error states
-   Mix controlled/uncontrolled components

### Best Practices

-   **Type Safety First**: Always define proper types
-   **Service Layer Pattern**: Data operations go through services
-   **Component Composition**: Build from small, reusable components
-   **Validation**: Client-side validation for better UX
-   **Error Handling**: Show user-friendly error messages
-   **Performance**: Use memo, useMemo, useCallback appropriately
-   **Accessibility**: Add aria-labels, semantic HTML
-   **Testing**: Write E2E tests for critical flows

---

**Last Updated**: 2025-01-07  
**Version**: 1.0.0  
**Maintainer**: Development Team
