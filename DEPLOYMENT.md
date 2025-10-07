# Deployment Guide - JualPutus Frontend

## 🚀 Vercel Deployment

### Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository connected to Vercel
- Bun runtime support enabled

### Quick Deploy

#### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Option 2: Deploy via Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `bun run build`
   - **Output Directory**: `dist`
   - **Install Command**: `bun install`

### Build Configuration

The project is already optimized with:

✅ **Advanced code splitting**
- React vendor chunk
- Lucide icons chunk
- Form components chunk
- UI components chunk
- Other vendor libraries chunk

✅ **Minification**
- Terser minification with 2 passes
- Console logs removed in production
- Debugger statements removed
- Comments stripped

✅ **Asset optimization**
- Images hashed and cached for 1 year
- CSS code splitting enabled
- LightningCSS for faster CSS processing
- Asset preloading with resource hints

✅ **Performance features**
- Lazy loading for heavy components (SellForm, SuccessScreen)
- Intersection Observer for scroll animations
- Hardware-accelerated CSS animations
- Optimized bundle size (~200KB gzipped)

### Environment Variables

Create these in Vercel Dashboard → Settings → Environment Variables:

```env
# Required
VITE_APP_NAME=JualPutus
VITE_APP_URL=https://your-domain.vercel.app

# Optional
VITE_WHATSAPP_NUMBER=6281234567890
VITE_ENABLE_ANALYTICS=false
```

Vercel automatically provides:
- `VITE_VERCEL_ENV` (production/preview/development)
- `VITE_VERCEL_URL` (deployment URL)
- `VITE_VERCEL_GIT_COMMIT_SHA`

### Performance Optimizations

#### Caching Strategy (vercel.json)
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Compression
- Brotli compression (automatic on Vercel)
- Gzip fallback for older browsers
- Asset sizes reduced by ~70%

#### Bundle Analysis

View bundle size:
```bash
bun run build
```

Output will show:
```
dist/assets/react-vendor-abc123.js   142.45 kB │ gzip: 45.67 kB
dist/assets/lucide-def456.js          67.89 kB │ gzip: 23.45 kB
dist/assets/index-ghi789.js           89.12 kB │ gzip: 31.23 kB
```

### Testing Production Build Locally

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

Open http://localhost:4173

### Post-Deployment Checklist

- [ ] Check Lighthouse score (aim for 90+ in all categories)
- [ ] Test all animations and interactions
- [ ] Verify lazy loading works (check Network tab)
- [ ] Test on mobile devices
- [ ] Verify SEO meta tags are present
- [ ] Check that images load properly
- [ ] Test form submission flow
- [ ] Verify WhatsApp integration

### Performance Targets

**Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Bundle Size:**
- Initial JS: < 150KB (gzipped)
- Total JS: < 300KB (gzipped)
- CSS: < 50KB (gzipped)

### Monitoring

After deployment, monitor:

1. **Vercel Analytics** (free on all plans)
   - Real User Metrics
   - Core Web Vitals
   - Audience insights

2. **Vercel Speed Insights** (optional, paid)
   - Detailed performance metrics
   - User-centric measurements

3. **Console Logs**
   - Check for errors in production
   - Monitor via Vercel → Deployment → Runtime Logs

### Troubleshooting

#### Build Fails
```bash
# Clear cache and rebuild
bun run clean
bun install
bun run build
```

#### Large Bundle Size
```bash
# Analyze bundle
bun run build:analyze

# Check what's included
ls -lh dist/assets/
```

#### Slow Performance
1. Check Lighthouse report
2. Verify lazy loading is working
3. Check Network tab for unnecessary requests
4. Verify caching headers are applied

### Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a Pull Request

Each PR gets a unique preview URL for testing.

### Custom Domain

1. Go to Vercel → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

### Rollback

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

Or via CLI:
```bash
vercel rollback
```

## 📊 Expected Performance

With these optimizations, expect:

- **First Load**: 1.5-2.5s on 3G
- **Time to Interactive**: < 3s on 3G
- **Lighthouse Score**: 90-100
- **Bundle Size**: ~200KB gzipped (total)

## 🔐 Security Headers

The `vercel.json` includes security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📱 Mobile Performance

Optimized for mobile with:
- Responsive images
- Touch-friendly tap targets (44px minimum)
- Mobile-first CSS
- Optimized font loading
- Reduced motion support

## 🎯 SEO

Included SEO optimizations:
- Meta descriptions
- Open Graph tags
- Twitter cards
- Semantic HTML
- Sitemap (TODO: generate)
- robots.txt (TODO: add)

## Next Steps

After deploying:

1. **Add sitemap.xml**
   ```bash
   # Generate sitemap
   # Add to public/sitemap.xml
   ```

2. **Add robots.txt**
   ```bash
   # Add to public/robots.txt
   ```

3. **Setup Analytics**
   - Google Analytics
   - Vercel Analytics
   - Plausible (privacy-friendly alternative)

4. **Add Error Tracking**
   - Sentry
   - Bugsnag
   - LogRocket

---

**Last Updated**: 2025-01-07  
**Deployment Target**: Vercel  
**Framework**: Vite + React + TypeScript

