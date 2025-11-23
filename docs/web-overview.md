# Nuxt.js Web Overview

## Tổng quan

Frontend application được xây dựng với **Nuxt.js 4.x**, một Vue.js framework cung cấp SSR, file-based routing, và nhiều features out-of-the-box.

## Kiến trúc Nuxt.js

### File-based Structure

```
app/
├── app.vue              # Root component
├── error.vue            # Global error page
├── app.config.ts        # Nuxt UI configuration
├── pages/               # File-based routing
│   └── index.vue       # Route: /
├── components/          # Auto-imported components
│   ├── Header.vue      # AppHeader component
│   ├── Footer.vue      # AppFooter component
│   └── Logo.vue        # AppLogo component
├── layouts/             # Layout components
│   ├── default.vue     # Default layout
│   └── auth.vue        # Auth layout (placeholder)
├── assets/              # Static assets
│   └── css/
│       └── main.css    # Global styles & design system
└── public/              # Public files
    └── assets/
        └── images/     # Static images
```

### Auto-imports

Nuxt.js tự động import:

- Components từ `components/`
- Composables từ `composables/`
- Utils từ `utils/`

## Configuration

### Nuxt Config (nuxt.config.ts)

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/image'],
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    strict: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  // Nuxt Image configuration
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'png', 'jpg'],
    presets: {
      logo: {
        modifiers: {
          format: 'png',
          quality: 90,
        },
      },
      error: {
        modifiers: {
          format: 'png',
          quality: 85,
        },
      },
    },
  },
});
```

### Tính năng chính

- **SSR**: Server-side rendering enabled
- **TypeScript**: Strict mode
- **Tailwind CSS**: Via @tailwindcss/vite
- **Nuxt UI**: Component library
- **Nuxt Image**: Image optimization với IPX provider
- **ESLint**: Code quality với stylistic rules

## UI Framework: Nuxt UI

### Components

Nuxt UI cung cấp pre-built components:

- **UApp**: Root app wrapper
- **UError**: Error page component
- **UHeader**: Header component với slots
- **UFooter**: Footer component với slots
- **UMain**: Main content wrapper
- **UContainer**: Responsive container
- **UButton**: Button component
- **UInput**: Input component
- **USelect**: Select dropdown component
- **UIcon**: Icon component (Iconify)
- Và nhiều components khác

### Custom Components

#### AppHeader (`components/Header.vue`)

Main header component với các sections:

- **Top Bar**: Store location, language/currency selectors, sign in link
- **Main Header**: Logo, search bar, wishlist, shopping cart
- **Navigation Bar**: Desktop navigation menu với phone number
- **Mobile Menu**: Mobile search, navigation links, phone number

**Features**:

- Responsive design (mobile-first)
- Sticky header
- Mobile menu toggle
- Search functionality
- Shopping cart với item count và total

#### AppFooter (`components/Footer.vue`)

Footer component với:

- **Newsletter Section**: Email subscription với social media icons
- **Main Content**: Brand info, navigation links (My Account, Helps, Proxy, Categories)
- **Bottom Bar**: Copyright, payment methods, secure payment badge

**Features**:

- Responsive grid layout
- Social media integration
- Payment method icons
- Newsletter subscription form

#### AppLogo (`components/Logo.vue`)

Reusable logo component:

- Customizable size (sm, md, lg, xl)
- Optional brand text
- Custom text color
- Responsive design
- Uses NuxtImg for optimization

**Usage**:

```vue
<Logo size="lg" text-color="#ffffff" brand-name="Agriculture" />
```

### Cách sử dụng

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

```vue
<!-- layouts/default.vue -->
<template>
  <Header />
  <UMain>
    <UContainer>
      <slot />
    </UContainer>
  </UMain>
  <Footer />
</template>
```

## Routing

### File-based Routing

Mỗi file trong `pages/` tự động trở thành route:

```
pages/
├── index.vue        → /
├── about.vue         → /about
└── users/
    └── [id].vue     → /users/:id
```

### Dynamic Routes

- `[id].vue` - Dynamic parameter
- `[...slug].vue` - Catch-all route

## Error Handling

### Error Page (error.vue)

File `error.vue` được sử dụng để hiển thị error pages cho toàn bộ ứng dụng. Nuxt tự động sử dụng file này khi có lỗi xảy ra.

**Nguồn**: [Nuxt Error Handling](https://nuxt.com/docs/getting-started/error-handling#error-page) | [Nuxt UI Error Component](https://ui.nuxt.com/docs/components/error)

#### Implementation hiện tại

```vue
<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const router = useRouter();

// Custom error messages based on status code
const errorConfig = computed(() => {
  const statusCode = props.error.statusCode || 500;
  const statusMessage = props.error.statusMessage || 'Something went wrong';

  const configs: Record<
    number,
    {
      title: string;
      description: string;
      icon: string;
      color: 'primary' | 'error' | 'warning' | 'info';
    }
  > = {
    404: {
      title: 'Page Not Found',
      description:
        'The page you are looking for does not exist or has been moved.',
      icon: 'line-md:alert-loop',
      color: 'warning',
    },
    403: {
      title: 'Access Forbidden',
      description: 'You do not have permission to access this resource.',
      icon: 'i-lucide-lock',
      color: 'error',
    },
    500: {
      title: 'Server Error',
      description:
        'An unexpected error occurred on the server. Please try again later.',
      icon: 'i-lucide-server-off',
      color: 'error',
    },
    503: {
      title: 'Service Unavailable',
      description:
        'The service is temporarily unavailable. Please try again later.',
      icon: 'i-lucide-wrench',
      color: 'warning',
    },
  };

  return (
    configs[statusCode] || {
      title: statusMessage,
      description:
        props.error.message ||
        'An error occurred while processing your request.',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    }
  );
});

function handleClear() {
  router.push('/');
}

function handleRetry() {
  router.go(0);
}
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <UError
        :error="error"
        :redirect="'/'"
        :clear="{
          color: 'primary',
          size: 'lg',
          variant: 'solid',
          label: 'Back to Home',
          icon: 'i-lucide-home',
        }"
      >
        <!-- Custom status code display with error image -->
        <template #statusCode>
          <div class="flex flex-col items-center justify-center gap-6">
            <NuxtImg
              src="/assets/images/404-error.png"
              alt="Error"
              class="w-64 sm:w-80 lg:w-96 h-auto object-contain"
              preset="error"
              loading="eager"
            />
          </div>
        </template>

        <!-- Custom status message -->
        <template #statusMessage>
          <h1 class="text-2xl sm:text-3xl font-semibold text-highlighted">
            {{ errorConfig.title }}
          </h1>
        </template>

        <!-- Custom message -->
        <template #message>
          <p class="text-base sm:text-lg text-muted max-w-md mx-auto">
            {{ errorConfig.description }}
          </p>
          <p
            v-if="error.message && error.message !== errorConfig.description"
            class="mt-2 text-sm text-muted/75"
          >
            {{ error.message }}
          </p>
        </template>

        <!-- Custom action buttons -->
        <template #links>
          <UButton
            color="primary"
            size="lg"
            variant="solid"
            icon="i-lucide-home"
            @click="handleClear"
          >
            Back to Home
          </UButton>

          <UButton
            v-if="error.statusCode === 500 || error.statusCode === 503"
            color="neutral"
            size="lg"
            variant="outline"
            icon="i-lucide-refresh-cw"
            @click="handleRetry"
          >
            Try Again
          </UButton>

          <UButton
            color="neutral"
            size="lg"
            variant="ghost"
            icon="i-lucide-arrow-left"
            @click="router.back()"
          >
            Go Back
          </UButton>
        </template>
      </UError>
    </div>
  </UApp>
</template>
```

### Error Component Features

- ✅ **Custom error image** (404-error.png) cho tất cả errors
- ✅ **Custom error messages** dựa trên status code (404, 403, 500, 503)
- ✅ **Icon tương ứng** cho từng loại lỗi
- ✅ **Responsive design** với mobile-first approach
- ✅ **Multiple action buttons**:
  - Back to Home
  - Try Again (cho server errors)
  - Go Back (browser history)
- ✅ **Customizable** với slots và props
- ✅ **Type-safe** với TypeScript
- ✅ **Image optimization** với NuxtImg

### Tạo Error trong Code

```typescript
// Trong pages hoặc components
throw createError({
  statusCode: 404,
  statusMessage: 'Page not found',
  fatal: true, // Required for static generation
});
```

**Nguồn**: [Nuxt createError](https://nuxt.com/docs/api/utils/create-error)

### Error Types

- **404**: Page not found
- **403**: Access forbidden
- **500**: Server error
- **503**: Service unavailable
- **Custom**: Any other status code

## Styling

### Tailwind CSS

- Utility-first CSS framework
- Configured via `@tailwindcss/vite`
- Global styles trong `assets/css/main.css`

### CSS Structure

```css
@import 'tailwindcss';
@import '@nuxt/ui';

/* Design System Configuration */
@theme {
  /* Typography - Poppins Font */
  --font-sans: 'Poppins', system-ui, sans-serif;

  /* Primary Colors - Green Scale */
  --color-primary-500: #00b207;
  /* ... more colors */
}
```

### Design System

Xem chi tiết tại [Design System](./design-system.md)

- **Colors**: Primary, warning, error, gray scales
- **Typography**: Poppins font với responsive scale
- **Spacing**: Consistent padding/margin
- **Breakpoints**: Custom responsive breakpoints

## Images

### Nuxt Image

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

## Icons

### Icon System

Project sử dụng **Iconify** với các collections:

#### Lucide Icons (Bundled)

- 14 icons được bundle sẵn
- Package: `@iconify-json/lucide`
- No CDN requests needed
- Icons: map-pin, search, heart, shopping-bag, phone, lock, etc.

#### Simple Icons (CDN)

- Payment icons (Apple Pay, Visa, Discover, Mastercard)
- Social media icons (Facebook, Twitter, Pinterest, Instagram)
- Loaded on-demand from Iconify CDN

#### Line MD Icons (CDN)

- 1 icon (alert-loop for 404 errors)
- Loaded on-demand

### Usage

```vue
<UIcon name="i-lucide-search" class="size-5" />
<UIcon name="i-simple-icons-facebook" class="size-8" />
```

**Full Documentation**: Xem [ICONS.md](../../apps/web/ICONS.md)

## TypeScript Support

### Strict Mode

```typescript
typescript: {
  strict: true,
}
```

### Type Safety

- Full TypeScript support
- Type inference
- Type checking với `vue-tsc`

## Development

### Dev Server

```bash
pnpm dev
```

- Hot Module Replacement (HMR)
- Fast refresh
- Error overlay

### Build

```bash
pnpm build
```

- Production build
- Code splitting
- Asset optimization

## Layouts

### Default Layout

Layout mặc định (`layouts/default.vue`) bao gồm:

- **Header**: AppHeader component
- **Main Content**: UMain với UContainer
- **Footer**: AppFooter component

```vue
<template>
  <Header />
  <UMain>
    <UContainer>
      <slot />
    </UContainer>
  </UMain>
  <Footer />
</template>
```

### Layout Usage

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

## Best Practices

### 1. Component Organization

- ✅ Use Nuxt UI components
- ✅ Create reusable components (Header, Footer, Logo)
- ✅ Follow Vue 3 Composition API
- ✅ Multi-word component names (AppHeader, AppFooter, AppLogo)
- ✅ Use `defineOptions` for component name

### 2. State Management

- ✅ Use composables for state
- ✅ Server state với `useFetch`
- ✅ Client state với `useState`

### 3. API Integration

- ✅ Use `$fetch` hoặc `useFetch`
- ✅ Error handling
- ✅ Loading states

### 4. Performance

- ✅ Code splitting
- ✅ Lazy loading components
- ✅ Image optimization với NuxtImg
- ✅ SSR when needed
- ✅ Icons: Bundle frequently used, CDN for less used

### 5. Styling

- ✅ Use Tailwind utility classes
- ✅ Design system tokens for colors/spacing
- ✅ Responsive design (mobile-first)
- ✅ Use `UContainer` for consistent padding

### 6. Images

- ✅ Use `NuxtImg` for all images
- ✅ Set appropriate presets
- ✅ Use `loading="eager"` for above-fold images
- ✅ Provide alt text

### 7. Icons

- ✅ Prefer Lucide icons (bundled)
- ✅ Use Simple Icons for brand icons
- ✅ Provide aria-labels for icon-only buttons

### 8. SEO

- ✅ Meta tags
- ✅ SSR for better SEO
- ✅ Structured data
- ✅ Sitemap generation

## Cải tiến Tương lai

### Tính năng dự kiến

- Authentication composable
- API client setup
- State management (Pinia)
- Internationalization (i18n)
- PWA support
- Shopping cart functionality
- Wishlist functionality
- Search functionality
- User authentication pages
- Product pages
- Category pages
