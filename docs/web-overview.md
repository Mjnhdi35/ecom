# Nuxt.js Web Overview

## Tổng quan

Frontend application được xây dựng với **Nuxt.js 4.x**, một Vue.js framework cung cấp SSR, file-based routing, và nhiều features out-of-the-box.

## Kiến trúc Nuxt.js

### File-based Structure

```
app/
├── app.vue           # Root component
├── error.vue         # Error page
├── pages/            # File-based routing
│   └── index.vue    # Route: /
├── assets/           # Static assets
│   └── css/
│       └── main.css # Global styles
└── public/           # Public files
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
  modules: ['@nuxt/ui', '@nuxt/eslint'],
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
});
```

### Tính năng chính

- **SSR**: Server-side rendering enabled
- **TypeScript**: Strict mode
- **Tailwind CSS**: Via @tailwindcss/vite
- **Nuxt UI**: Component library

## UI Framework: Nuxt UI

### Components

Nuxt UI cung cấp pre-built components:

- **UApp**: Root app wrapper
- **UError**: Error page component
- **UButton**: Button component
- **UInput**: Input component
- Và nhiều components khác

### Cách sử dụng

```vue
<template>
  <UApp>
    <NuxtPage />
  </UApp>
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

const route = useRoute();
const router = useRouter();

// Custom error messages based on status code
const errorConfig = computed(() => {
  const statusCode = props.error.statusCode || 500;
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
      icon: 'i-lucide-file-question',
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
      title: props.error.statusMessage || 'Error',
      description: props.error.message || 'An error occurred.',
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
        redirect="/"
        :clear="{
          color: 'primary',
          size: 'lg',
          variant: 'solid',
          label: 'Back to Home',
          icon: 'i-lucide-home',
        }"
      >
        <!-- Custom status code with icon -->
        <template #statusCode>
          <div class="flex items-center justify-center gap-4">
            <UIcon
              :name="errorConfig.icon"
              class="size-16 sm:size-24 text-muted"
            />
            <span class="text-6xl sm:text-8xl font-bold text-muted">
              {{ error.statusCode || '500' }}
            </span>
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

- ✅ **Custom error messages** dựa trên status code (404, 403, 500, 503)
- ✅ **Icon tương ứng** cho từng loại lỗi
- ✅ **Responsive design** với mobile-first approach
- ✅ **Multiple action buttons**:
  - Back to Home
  - Try Again (cho server errors)
  - Go Back (browser history)
- ✅ **Customizable** với slots và props
- ✅ **Type-safe** với TypeScript

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
```

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

## Best Practices

### 1. Component Organization

- ✅ Use Nuxt UI components
- ✅ Create reusable components
- ✅ Follow Vue 3 Composition API

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
- ✅ Image optimization
- ✅ SSR when needed

### 5. SEO

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
