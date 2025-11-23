# E-Commerce Web Application

Frontend application được xây dựng với **Nuxt.js 4.x** và **Nuxt UI**, cung cấp một nền tảng e-commerce hiện đại với SSR, responsive design, và UI components tối ưu.

## 🚀 Features

- ✅ **Nuxt.js 4.x** - Full-stack Vue.js framework
- ✅ **Nuxt UI** - Comprehensive UI component library
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **Nuxt Image** - Optimized image handling
- ✅ **SSR** - Server-side rendering enabled
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Design System** - Custom colors, typography, and spacing
- ✅ **Pinia** - State management với Colada và PersistedState
- ✅ **API Proxy** - Secure API proxying qua Nitro server

## 📁 Project Structure

```
apps/web/
├── app/
│   ├── app.vue              # Root component
│   ├── error.vue            # Global error page
│   ├── app.config.ts        # Nuxt UI configuration
│   ├── assets/
│   │   └── css/
│   │       └── main.css     # Global styles & design system
│   ├── components/
│   │   ├── Header.vue       # Main header component
│   │   ├── Footer.vue       # Footer component
│   │   └── Logo.vue         # Logo component
│   ├── layouts/
│   │   ├── default.vue      # Default layout
│   │   └── auth.vue         # Auth layout (placeholder)
│   └── pages/
│       └── index.vue        # Home page
├── public/
│   └── assets/
│       └── images/          # Static images
├── nuxt.config.ts           # Nuxt configuration
└── package.json             # Dependencies
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Or with npm
npm install
```

## 🏃 Development

### Start Development Server

```bash
# With pnpm
pnpm dev

# With npm
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm tsc              # Type check
```

## 🎨 Components

### Header Component (`AppHeader`)

Main header component với:

- Top bar (store location, language, currency, sign in)
- Logo và search bar
- Shopping cart và wishlist
- Navigation menu (desktop)
- Mobile menu với search và navigation

**Location**: `app/components/Header.vue`

### Footer Component (`AppFooter`)

Footer component với:

- Newsletter subscription
- Navigation links (My Account, Helps, Proxy, Categories)
- Social media icons
- Payment methods
- Copyright và secure payment badge

**Location**: `app/components/Footer.vue`

### Logo Component (`AppLogo`)

Reusable logo component với:

- Customizable size (sm, md, lg, xl)
- Optional brand text
- Custom text color
- Responsive design

**Usage**:

```vue
<Logo size="lg" text-color="#ffffff" brand-name="Agriculture" />
```

**Location**: `app/components/Logo.vue`

## 🎯 Design System

### Colors

- **Primary**: Green scale (#00b207)
- **Soft Primary**: Light green (#84d187)
- **Hard Primary**: Dark green (#2c742f)
- **Warning**: Orange/Yellow (#ffb400)
- **Error**: Red (#ea4848)
- **Gray Scale**: 50-950
- **Green Gray Scale**: 50-950

### Typography

- **Font**: Poppins (various weights)
- **Scale**: Display, Headings (01-05), Body (xxl-tiny)
- **Responsive**: Scales down on mobile

### Breakpoints

- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1920px

**Documentation**: Xem [Design System](../../docs/design-system.md)

## 🖼️ Images

### Nuxt Image Configuration

Project sử dụng `@nuxt/image` để tối ưu hóa images:

- **Provider**: IPX (for static images)
- **Format**: WebP, PNG, JPG
- **Quality**: 80% (default)
- **Presets**:
  - `logo`: PNG, 90% quality
  - `error`: PNG, 85% quality

### Usage

```vue
<NuxtImg
  src="/assets/images/plant-logo.png"
  alt="Logo"
  preset="logo"
  loading="eager"
/>
```

**Static Images Location**: `public/assets/images/`

## 🎭 Icons

Project sử dụng **Iconify** với các collections:

### Lucide Icons (Bundled)

- 14 icons được bundle sẵn
- Package: `@iconify-json/lucide`
- No CDN requests needed

### Simple Icons (CDN)

- Payment icons (Apple Pay, Visa, Discover, Mastercard)
- Social media icons (Facebook, Twitter, Pinterest, Instagram)
- Loaded on-demand from Iconify CDN

### Line MD Icons (CDN)

- 1 icon (alert-loop for 404 errors)
- Loaded on-demand

**Full Documentation**: Xem [Icons Documentation](../../docs/icons.md)

## 📄 Layouts

### Default Layout

Layout mặc định bao gồm:

- Header component
- Main content area với UContainer
- Footer component

**Location**: `app/layouts/default.vue`

### Usage

```vue
<!-- app.vue -->
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

## ⚠️ Error Handling

### Error Page

Global error page (`error.vue`) hiển thị:

- Custom error image (404-error.png)
- Error messages dựa trên status code
- Action buttons (Back to Home, Try Again, Go Back)

**Supported Error Codes**:

- 404: Page Not Found
- 403: Access Forbidden
- 500: Server Error
- 503: Service Unavailable

**Location**: `app/error.vue`

## 🔧 Configuration

### Nuxt Config

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
  ],
  ssr: true,
  css: ['~/assets/css/main.css'],
  // ... more config
});
```

### App Config

Nuxt UI configuration trong `app/app.config.ts`:

- Component default variants
- Color configuration
- UI slot customization
- Container padding

## 🔌 API Proxy

### Overview

Nuxt web app sử dụng **Nitro server** với **H3** để proxy tất cả API requests từ client đến backend API server.

### Configuration

API base URL được cấu hình trong `nuxt.config.ts` (server-side only) và có thể override bằng environment variable:

```env
API_BASE_URL=http://localhost:3000
```

**🔒 Security**: Backend URL được lưu trong private runtime config, client không thể truy cập. Chỉ Nitro server biết URL này để proxy requests.

### Usage

```vue
<script setup lang="ts">
// Using useApi composable
const users = await useApi('/users');

// Using API client
const user = await api.get('/users/1');
const newUser = await api.post('/users', { name: 'John' });
</script>
```

**Full Documentation**: Xem [API Proxy Documentation](../../docs/api-proxy.md)

## 📚 Documentation

### Internal Documentation

Tất cả documentation được lưu trong [docs/](../../docs/) folder:

- [API Proxy](../../docs/api-proxy.md) - API proxy setup và usage
- [Icons](../../docs/icons.md) - Icons usage và optimization
- [Pinia Setup](../../docs/pinia-setup.md) - Pinia với Colada và PersistedState
- [Design System](../../docs/design-system.md) - Colors, typography, spacing
- [Nuxt UI Components](../../docs/nuxt-ui.md) - Component library docs
- [Web Overview](../../docs/web-overview.md) - Nuxt.js web application overview
- [Authentication](../../docs/authentication.md) - Authentication flow và JWT tokens

### External Resources

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Nuxt UI Documentation](https://ui.nuxt.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Iconify Documentation](https://iconify.design)

## 🧪 Development Workflow

### 1. Component Development

```bash
# Create new component
touch app/components/MyComponent.vue
```

### 2. Page Development

```bash
# Create new page
touch app/pages/about.vue
```

### 3. Styling

- Use Tailwind utility classes
- Custom styles in `main.css`
- Design system tokens via CSS variables

### 4. TypeScript

- Strict mode enabled
- Type checking: `pnpm tsc`
- Auto-imports for components, composables

## 🚢 Production

### Build

```bash
pnpm build
```

Output: `.output/` directory

### Preview

```bash
pnpm preview
```

### Deployment

Xem [Nuxt Deployment Docs](https://nuxt.com/docs/getting-started/deployment)

## 📝 Best Practices

### 1. Components

- ✅ Use Nuxt UI components when possible
- ✅ Multi-word component names (AppHeader, AppFooter)
- ✅ TypeScript interfaces for props
- ✅ Use `defineOptions` for component name

### 2. Styling

- ✅ Use Tailwind utility classes
- ✅ Design system tokens for colors/spacing
- ✅ Responsive design (mobile-first)
- ✅ Use `UContainer` for consistent padding

### 3. Images

- ✅ Use `NuxtImg` for all images
- ✅ Set appropriate presets
- ✅ Use `loading="eager"` for above-fold images
- ✅ Provide alt text

### 4. Icons

- ✅ Prefer Lucide icons (bundled)
- ✅ Use Simple Icons for brand icons
- ✅ Provide aria-labels for icon-only buttons

### 5. Code Quality

- ✅ Run `pnpm lint` before commit
- ✅ Type check với `pnpm tsc`
- ✅ Follow Vue 3 Composition API patterns

## 🐛 Troubleshooting

### Common Issues

**Icons not loading**

- Check icon name format: `i-lucide-*` or `i-simple-icons-*`
- Verify Iconify collection is available

**Images not optimizing**

- Ensure `@nuxt/image` is in modules
- Check image path (must be in `public/`)
- Verify preset configuration

**TypeScript errors**

- Run `pnpm tsc` to see all errors
- Check component props types
- Verify auto-imports are working

## 🔄 Updates & Maintenance

### Dependencies

```bash
# Update dependencies
pnpm update

# Check outdated
pnpm outdated
```

### Code Formatting

ESLint auto-fixes on save (if configured in IDE)

## 📞 Support

- Check [Documentation](../../docs/)
- Review [Nuxt.js Docs](https://nuxt.com/docs)
- Review [Nuxt UI Docs](https://ui.nuxt.com)
