# API Proxy Setup

Documentation về cách sử dụng API proxy trong Nuxt web application.

## 🎯 Overview

Nuxt web app sử dụng **Nitro server** với **H3** để proxy tất cả API requests từ client đến backend API server.

**🔒 Security**: Client **never knows** the actual backend URL. Client only uses relative paths (`/api/*`), and Nitro server handles the proxying to the actual backend URL internally.

## 📁 File Structure

```
apps/web/
├── server/
│   ├── api/
│   │   └── [...].ts          # Catch-all API proxy route
│   └── routes/
│       └── health.ts         # Health check endpoint
├── app/
│   └── composables/
│       └── useApi.ts         # API composable utilities
└── nuxt.config.ts            # Runtime config
```

## ⚙️ Configuration

### Runtime Config

API base URL được cấu hình trong `nuxt.config.ts`:

```typescript
runtimeConfig: {
  apiBase: process.env.API_BASE_URL!, // Private - server only
  public: {}, // Empty - no sensitive data exposed
}
```

**Environment Variable**:

```bash
API_BASE_URL=http://localhost:3000/api
```

### Server Proxy Route

File `server/api/[...].ts` là catch-all route xử lý tất cả requests đến `/api/*`:

```typescript
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBase; // Private, only on server

  // Forward request to backend API
  // ...
});
```

## 📝 Usage

### useApi Composable

Async function để gọi API:

```typescript
import { useApi } from '~/composables/useApi';

// GET request
const users = await useApi('/users');

// POST request
const newUser = await useApi('/users', {
  method: 'POST',
  body: { name: 'John', email: 'john@example.com' },
});

// With query parameters
const filtered = await useApi('/users', {
  method: 'GET',
  query: { page: 1, limit: 10 },
});
```

### useApiFetch Composable

Reactive fetch với auto-refresh:

```typescript
import { useApiFetch } from '~/composables/useApi';

const { data, error, pending, refresh } = useApiFetch('/users');
```

### useApiLazy Composable

Lazy fetch (manual trigger):

```typescript
import { useApiLazy } from '~/composables/useApi';

const { data, error, pending, execute } = useApiLazy('/users');

// Later, trigger manually
await execute();
```

### API Client Helper

```typescript
import { api } from '~/composables/useApi';

// GET
const users = await api.get('/users', { page: 1 });

// POST
const user = await api.post('/users', { name: 'John' });

// PUT
await api.put('/users/1', { name: 'Jane' });

// PATCH
await api.patch('/users/1', { name: 'Jane' });

// DELETE
await api.delete('/users/1');
```

## 🔐 Security

### Private Runtime Config

- `apiBase` chỉ có trên server (private)
- Client **không bao giờ** biết backend URL thực tế
- Client chỉ sử dụng relative paths (`/api/*`)

### Authorization Header

Tự động thêm `Authorization: Bearer <token>` header nếu có access token:

```typescript
// useApi tự động lấy token từ Pinia store
const response = await useApi('/protected-endpoint');
```

## 🧪 Testing

### Health Check

```typescript
const health = await $fetch('/health');
// Returns: { status: 'ok', timestamp: '...', service: 'nuxt-web' }
```

### API Test Page

Truy cập `/api-test` để test API proxy functionality.

## 🚨 Error Handling

### API Errors

```typescript
try {
  const data = await useApi('/users');
} catch (error) {
  // error.statusCode
  // error.statusMessage
  // error.data
}
```

### Error Types

```typescript
interface ApiError {
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  data?: unknown;
}
```

## 📚 Best Practices

1. **Always use relative paths**: `/api/users` not `http://localhost:3000/api/users`
2. **Use composables**: `useApi`, `useApiFetch`, `useApiLazy`
3. **Handle errors**: Always wrap API calls in try-catch
4. **Type safety**: Use TypeScript types for requests/responses
5. **Authorization**: Tokens are automatically added via Pinia store

## 🔄 Request Flow

```
Client Component
  ↓
useApi('/users')
  ↓
$fetch('/api/users')  // Relative path
  ↓
Nitro Server (server/api/[...].ts)
  ↓
Extract path: 'users'
  ↓
Forward to: http://localhost:3000/api/users
  ↓
Backend API (NestJS)
  ↓
Response
  ↓
Nitro Server
  ↓
Client Component
```

## 📖 Related Documentation

- [Authentication](./authentication.md) - Auth flow và token management
- [API Overview](../apps/api/README.md) - Backend API documentation
