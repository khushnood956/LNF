# 🚀 Deployment & Setup Guide

## Prerequisites

1. **Node.js** 18 or higher
2. **npm** 9 or higher
3. **Spring Boot Backend** running on `http://localhost:8080`

## Quick Start

```bash
# Navigate to project directory
cd LNF_frontend_react

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Available Scripts

### Development
```bash
npm run dev          # Start Vite dev server with HMR
```

### Production Build
```bash
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint for code quality checks
```

## Environment Configuration

### API Base URL

The frontend is configured to connect to the backend at:
```
http://localhost:8080/api/items
```

To change this, edit `src/services/itemApi.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api/items';
```

For production, update to your deployed backend URL.

## Building for Production

```bash
# Create optimized production build
npm run build
```

This creates a `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps (for debugging)

### Build Output
```
dist/
├── assets/
│   ├── index-[hash].js      # Bundled JavaScript
│   ├── index-[hash].css     # Compiled Tailwind CSS
│   └── [images/fonts]       # Static assets
└── index.html               # Entry point
```

## Deployment Options

### Option 1: Netlify

1. Push code to GitHub
2. Connect repo to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

Environment variables in Netlify dashboard:
```
VITE_API_BASE_URL=https://your-backend.com/api/items
```

### Option 2: Vercel

```bash
npm install -g vercel
vercel
```

Follow prompts. Vercel auto-detects Vite.

### Option 3: Static Hosting (Nginx/Apache)

After building:
```bash
npm run build
```

Upload `dist/` folder contents to your web server root.

**Nginx Configuration** (for React Router):
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache Configuration**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
}
```

Build and run:
```bash
docker build -t lnf-frontend .
docker run -p 3000:80 lnf-frontend
```

## Performance Optimization

### Already Implemented
- ✅ Code splitting via React Router
- ✅ Lazy loading of routes (can be enhanced)
- ✅ Tailwind CSS purging (removes unused styles)
- ✅ Vite's automatic optimizations
- ✅ Modern ES module bundling

### Additional Optimizations

#### 1. Route-based Code Splitting
```javascript
// In App.jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const AddItem = lazy(() => import('./pages/AddItem'));

// Wrap routes in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
    {/* ... */}
  </Routes>
</Suspense>
```

#### 2. Image Optimization
- Use WebP format
- Implement lazy loading for images
- Add proper width/height attributes

#### 3. API Caching
Consider adding React Query or SWR for:
- Automatic caching
- Background refetching
- Stale-while-revalidate

## Testing the Production Build

```bash
# Build
npm run build

# Preview locally
npm run preview
```

Visit `http://localhost:4173` to test production build.

## Troubleshooting

### Issue: Blank page after deployment

**Solution**: Check browser console for errors. Likely causes:
1. API URL not updated for production
2. CORS issues with backend
3. Missing environment variables

### Issue: Routes not working (404 on refresh)

**Solution**: Configure server to serve `index.html` for all routes (see server configs above).

### Issue: Styles not loading

**Solution**: 
1. Ensure `@tailwindcss/vite` is installed
2. Check `tailwind.config.js` content paths
3. Verify `globals.css` is imported in `main.jsx`

### Issue: API calls failing

**Solution**:
1. Check browser console for CORS errors
2. Verify backend is running
3. Update API base URL in `itemApi.js`
4. Ensure backend allows CORS from frontend origin

## CORS Configuration (Backend)

Your Spring Boot backend needs CORS enabled:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000", "https://your-frontend.com")
                    .allowedMethods("GET", "POST", "PATCH", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

## Monitoring & Analytics

### Add Google Analytics (Optional)

```bash
npm install react-ga4
```

In `main.jsx`:
```javascript
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');
```

### Error Tracking with Sentry (Optional)

```bash
npm install @sentry/react
```

## Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Validate all user input** (already implemented)
3. **Sanitize displayed data** (React does this by default)
4. **Use HTTPS** in production
5. **Keep dependencies updated**: `npm audit`

## Performance Metrics

Target metrics for production:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

Test with:
```bash
npm run build
npm run preview
# Then run Lighthouse in Chrome DevTools
```

## Maintenance

### Update Dependencies
```bash
npm update              # Update to latest compatible versions
npm outdated            # Check for newer versions
npm audit fix           # Fix security vulnerabilities
```

### Monitor Bundle Size
```bash
npm run build
# Check dist/ folder size
```

Target: < 500KB total bundle (gzipped)

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend is running and accessible
3. Review API endpoint responses
4. Check this documentation

## Next Steps

After deployment:
1. ✅ Test all features on production URL
2. ✅ Verify mobile responsiveness
3. ✅ Check browser compatibility
4. ✅ Run Lighthouse audit
5. ✅ Test with real data
6. ✅ Monitor error logs
7. ✅ Set up analytics (optional)

---

**Happy Deploying! 🎉**
