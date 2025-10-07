# JualPutus Architecture Documentation

## Overview

JualPutus is a modern single-page application (SPA) built with React, TypeScript, and Vite. It uses a JSON-based data storage approach instead of a traditional database, making it lightweight and easy to deploy.

## Technology Stack

### Core Technologies

- **Runtime**: Bun - Fast all-in-one JavaScript runtime
- **Framework**: React 18 - UI library with hooks
- **Language**: TypeScript - Static typing
- **Build Tool**: Vite - Fast build tool with HMR
- **Styling**: Tailwind CSS - Utility-first CSS
- **Icons**: Lucide React - Icon library
- **Testing**: Playwright - E2E testing

### Why These Choices?

1. **Bun over Node.js**
   - 3x faster package installation
   - Built-in TypeScript support
   - Native bundler and transpiler
   - Compatible with Node.js APIs

2. **Vite over Create React App**
   - Instant server start
   - Lightning-fast HMR
   - Optimized builds
   - Better tree-shaking

3. **JSON Storage over Database**
   - No backend required
   - Instant setup
   - Easy to understand
   - Perfect for MVP/prototype

## Architecture Patterns

### Component Architecture

```
┌─────────────────────────────────────┐
│          App Component              │
│  (State Management & Routing)       │
└────────────┬────────────────────────┘
             │
    ┌────────┴─────────┐
    │                  │
┌───▼────┐      ┌─────▼──────┐
│ Layout │      │  Pages     │
│ Components    │  Components│
└────────┘      └────┬───────┘
                     │
              ┌──────┴──────┐
              │             │
         ┌────▼───┐   ┌────▼────┐
         │  Form  │   │   UI    │
         │ Components  │ Components
         └────────┘   └─────────┘
```

### Data Flow

```
┌──────────────┐
│  Components  │
└──────┬───────┘
       │
       │ calls
       ▼
┌──────────────┐
│   Services   │  (Business Logic)
└──────┬───────┘
       │
       │ accesses
       ▼
┌──────────────┐
│  Mock Data   │  (Data Layer)
└──────┬───────┘
       │
       │ persists to
       ▼
┌──────────────┐
│ localStorage │  (Storage)
└──────────────┘
```

## Directory Structure

```
jualputus-fe/
│
├── src/
│   ├── components/          # React components
│   │   ├── form/           # Form-specific components
│   │   │   ├── Step1Product.tsx
│   │   │   ├── Step2Condition.tsx
│   │   │   ├── Step3Contact.tsx
│   │   │   └── Step4Review.tsx
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── SellForm.tsx    # Main form orchestrator
│   │   └── ...
│   │
│   ├── data/               # Data layer
│   │   └── mockData.ts     # Static data (brands, models)
│   │
│   ├── services/           # Business logic layer
│   │   └── dataService.ts  # CRUD operations & data management
│   │
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # All type definitions
│   │
│   ├── lib/                # Utilities
│   │
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
│
├── tests/                  # E2E tests
│   └── e2e.spec.ts
│
├── scripts/                # Automation scripts
│   ├── setup.sh
│   ├── test.sh
│   └── build.sh
│
├── docs/                   # Documentation
│   └── ARCHITECTURE.md
│
├── public/                 # Static assets
│
└── Configuration files
    ├── package.json
    ├── vite.config.ts
    ├── playwright.config.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

## Component Design Patterns

### 1. Container/Presentational Pattern

**Container Components** (Smart):
- Manage state
- Handle business logic
- Connect to services
- Example: `SellForm.tsx`

**Presentational Components** (Dumb):
- Receive data via props
- Display UI
- Trigger callbacks
- Example: All components in `ui/`

### 2. Composition Pattern

Components are composed together:

```tsx
<SellForm>
  <Progress />
  <Step1Product />
  <Step2Condition />
  <Step3Contact />
  <Step4Review />
  <Button />
</SellForm>
```

### 3. Controlled Components

All form inputs are controlled:

```tsx
<Input
  value={formData.name}
  onChange={(e) => handleChange('name', e.target.value)}
/>
```

## Data Management

### Service Layer Pattern

All data operations go through the service layer:

```typescript
// services/dataService.ts

export const getBrands = (category?: Category): Brand[] => {
  // Implementation
};

export const createSubmission = async (data: Submission) => {
  // Implementation
};
```

### Benefits:
- Centralized data access
- Easy to mock for testing
- Can swap storage backend
- Clear API contract

### Data Flow Example

```typescript
// 1. Component calls service
const brands = getBrands('hp_flagship');

// 2. Service retrieves from data source
// (currently mockData.ts)

// 3. Service processes and returns data

// 4. Component updates UI
```

## State Management

### Local State (useState)

For component-specific state:

```tsx
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState(initialData);
```

### Derived State (useMemo)

For computed values:

```tsx
const filteredBrands = useMemo(() => {
  return getBrands(formData.category);
}, [formData.category]);
```

### Why No Global State Manager?

- Application is relatively simple
- State is mostly local to components
- Props drilling is minimal
- Can add Redux/Zustand later if needed

## Performance Optimizations

### 1. Code Splitting

Vite automatically splits code by route and vendor:

```javascript
// vite.config.ts
rollupOptions: {
  output: {
    manualChunks: {
      'react-vendor': ['react', 'react-dom'],
      'lucide': ['lucide-react'],
    },
  },
}
```

### 2. Component Memoization

Expensive components use React.memo:

```tsx
export const Step1Product = memo(function Step1Product(props) {
  // Component implementation
});
```

### 3. Lazy Loading

Heavy components can be lazy-loaded:

```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 4. Optimized Builds

- Minification with Terser
- Tree-shaking unused code
- CSS purging with Tailwind
- Source map generation (dev only)

## Form Architecture

### Multi-Step Form Pattern

```
┌─────────────────────────────────────┐
│         SellForm Container          │
│  - Manages current step             │
│  - Holds form data                  │
│  - Handles validation               │
│  - Orchestrates flow                │
└──────────────┬──────────────────────┘
               │
      ┌────────┼────────┬────────┐
      │        │        │        │
  ┌───▼───┐ ┌─▼──┐ ┌──▼──┐ ┌───▼────┐
  │Step 1 │ │Step│ │Step │ │ Step 4 │
  │       │ │ 2  │ │  3  │ │        │
  └───────┘ └────┘ └─────┘ └────────┘
```

### Validation Strategy

**Per-Step Validation**:
- Each step validates independently
- User cannot proceed with errors
- Errors shown inline

**Validation Functions**:
```tsx
const validateStep1 = (): boolean => {
  const errors = {};
  // Validation logic
  return Object.keys(errors).length === 0;
};
```

## Storage Strategy

### Current: localStorage

```typescript
// Save
localStorage.setItem('submissions', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('submissions'));
```

### Benefits:
- No backend required
- Works offline
- Simple implementation
- Instant read/write

### Limitations:
- 5-10MB storage limit
- Data tied to browser
- No server-side processing

### Future Migration Path

Easy to swap with API:

```typescript
// Replace service implementation
export const createSubmission = async (data) => {
  // From:
  // localStorage.setItem(...)
  
  // To:
  // const response = await fetch('/api/submissions', {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });
};
```

## Type Safety

### TypeScript Strategy

**Type Definitions** (`types/index.ts`):
```typescript
export interface Submission {
  id?: string;
  ticket_number?: string;
  category: Category;
  // ... other fields
}
```

**Type Usage**:
```tsx
// In components
interface Props {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: any) => void;
}

// In services
export const createSubmission = async (
  data: Omit<Submission, 'id' | 'ticket_number'>
): Promise<{ id: string; ticket_number: string }> => {
  // Implementation
};
```

## Testing Strategy

### E2E Testing with Playwright

**Test Structure**:
```typescript
test.describe('Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('...')).toBeVisible();
  });
});
```

**Test Categories**:
1. **Homepage Tests** - Basic functionality
2. **Form Flow Tests** - Multi-step form
3. **Responsive Tests** - Mobile/tablet
4. **Performance Tests** - Load time

### Testing Philosophy

- Test user behavior, not implementation
- Cover critical paths
- Test edge cases
- Keep tests maintainable

## Build Process

### Development Build

```bash
bun run dev
```

1. Vite starts dev server
2. HMR enabled
3. Source maps included
4. Fast refresh active

### Production Build

```bash
bun run build
```

1. TypeScript compilation
2. Vite build process
3. Code minification
4. Asset optimization
5. Chunk splitting
6. CSS purging

## Deployment Strategy

### Static Hosting

Build outputs static files to `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── ...
```

### Deployment Options

1. **Vercel** (Recommended)
   ```bash
   vercel deploy
   ```

2. **Netlify**
   ```bash
   netlify deploy
   ```

3. **GitHub Pages**
   ```bash
   gh-pages -d dist
   ```

4. **Any Static Host**
   - Upload `dist/` folder
   - Configure routes to serve `index.html`

## Security Considerations

### Current Security Measures

1. **Input Validation**
   - Client-side validation
   - Type checking with TypeScript
   - Email/phone format validation

2. **XSS Prevention**
   - React auto-escapes by default
   - No `dangerouslySetInnerHTML`

3. **Data Privacy**
   - Data stored locally
   - No external API calls
   - No tracking/analytics

### Future Security Enhancements

When adding backend:
- HTTPS only
- CSRF protection
- Rate limiting
- Input sanitization
- Authentication/Authorization

## Scalability Considerations

### Current Scale

- Suitable for: 10K-100K submissions
- localStorage limit: ~5MB
- Performance: Excellent

### Future Scaling

When outgrowing localStorage:

1. **Add Backend API**
   - Node.js/Express or Bun server
   - PostgreSQL/MySQL database
   - RESTful or GraphQL API

2. **Update Service Layer**
   ```typescript
   export const createSubmission = async (data) => {
     return await api.post('/submissions', data);
   };
   ```

3. **Add State Management**
   - Redux for complex state
   - React Query for server state

4. **Optimize Performance**
   - Server-side rendering (Next.js)
   - Image CDN
   - Caching strategy

## Monitoring & Analytics

### Current Setup

- Browser console logs
- Playwright test results
- Build size warnings

### Future Additions

- Error tracking (Sentry)
- Analytics (Google Analytics/Plausible)
- Performance monitoring (Web Vitals)
- User behavior tracking

## Documentation Strategy

### Code Documentation

- JSDoc comments for complex functions
- TypeScript types as documentation
- README for high-level overview

### User Documentation

- QUICKSTART.md for getting started
- README.md for comprehensive guide
- CONTRIBUTING.md for developers

---

**Last Updated**: October 7, 2025
**Version**: 1.0.0

