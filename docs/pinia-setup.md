# Pinia Setup với Pinia Colada và PersistedState

## Tổng quan

Dự án sử dụng **Pinia** làm state management core, kết hợp với:

- **Pinia Colada**: Quản lý async data, caching, loading states, và retry logic
- **pinia-plugin-persistedstate**: Lưu state lâu dài vào sessionStorage/cookies

## Cấu trúc

### Stores

```
app/stores/
├── auth.ts              # Auth store với Pinia (state management)
└── auth.colada.ts       # Auth store với Pinia Colada (async data)
```

### Plugins

```
app/plugins/
└── pinia.client.ts      # Pinia plugin configuration với persistedstate
```

## Auth Store (`stores/auth.ts`)

Store quản lý authentication state sử dụng Pinia:

```typescript
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

// State
authStore.user; // Current user
authStore.accessToken; // Access token
authStore.refreshToken; // Refresh token
authStore.isAuthenticated; // Computed: true if authenticated

// Actions
await authStore.login(credentials);
await authStore.register(data);
await authStore.logout();
await authStore.refreshAccessToken();
authStore.getAuthHeader(); // Get Authorization header
```

### Persistence

Store tự động persist vào `sessionStorage` với key `auth`:

- `accessToken`
- `refreshToken`
- `user`

State được tự động khôi phục khi app khởi động lại.

## Auth Store với Pinia Colada (`stores/auth.colada.ts`)

Sử dụng Pinia Colada cho async data management:

### Queries

```typescript
import { useCurrentUser } from '~/stores/auth.colada';

// Get current user với caching và loading states
const { data: user, isLoading, error, refetch } = useCurrentUser();
```

### Mutations

```typescript
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} from '~/stores/auth.colada';

// Login mutation
const loginMutation = useLoginMutation();
await loginMutation.mutateAsync({ email, password });

// Register mutation
const registerMutation = useRegisterMutation();
await registerMutation.mutateAsync({ email, password, displayName });

// Logout mutation
const logoutMutation = useLogoutMutation();
await logoutMutation.mutateAsync();

// Refresh token mutation
const refreshMutation = useRefreshTokenMutation();
await refreshMutation.mutateAsync();
```

### Features

- **Caching**: Tự động cache responses
- **Loading States**: `isLoading`, `isPending`, `isSuccess`, `isError`
- **Retry Logic**: Tự động retry khi failed
- **Stale Time**: 5 minutes cho user query
- **Cache Time**: 10 minutes cho user query

## Composables (`composables/useAuth.ts`)

Wrapper composable cho backward compatibility:

```typescript
import {
  useIsAuthenticated,
  useUser,
  login,
  register,
  logout,
  refreshAccessToken,
  getAuthHeader,
} from '~/composables/useAuth';

// Check authentication
const isAuthenticated = useIsAuthenticated();

// Get current user
const user = useUser();

// Auth actions
await login(credentials);
await register(data);
await logout();
await refreshAccessToken();
const header = getAuthHeader();
```

## Configuration

### Nuxt Config (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@pinia/colada-nuxt', ...],
  // ...
});
```

### Pinia Plugin (`plugins/pinia.client.ts`)

```typescript
// Configures persistedstate plugin
// Uses sessionStorage for persistence
// Only persists stores that explicitly enable persistence
```

## API Integration

### Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### Authorization Header

Tự động thêm `Authorization: Bearer <token>` header vào các API requests thông qua `useApi` composable.

## Best Practices

### 1. Sử dụng Pinia Store cho State Management

```typescript
// ✅ Good: Use Pinia store
const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;

// ❌ Bad: Don't use useState directly
const user = useState('user');
```

### 2. Sử dụng Pinia Colada cho Async Data

```typescript
// ✅ Good: Use Pinia Colada for async data
const { data, isLoading, error } = useCurrentUser();

// ❌ Bad: Don't manually manage loading states
const loading = ref(false);
const data = ref(null);
```

### 3. Sử dụng Mutations cho Side Effects

```typescript
// ✅ Good: Use mutations
const loginMutation = useLoginMutation();
await loginMutation.mutateAsync(credentials);

// ❌ Bad: Don't call store actions directly in components
await authStore.login(credentials);
```

### 4. Persistence

- ✅ Use `sessionStorage` cho auth tokens (more secure)
- ✅ Use `localStorage` cho user preferences (if needed)
- ✅ Don't persist sensitive data

## Khi nào nên dùng pinia-plugin-persistedstate?

### ✅ Nên dùng khi:

Dùng khi bạn cần giữ state sau khi reload trang, ví dụ:

- **Giỏ hàng (cart)**: Giữ sản phẩm trong giỏ hàng khi user reload trang
- **Token đăng nhập / session**: Lưu access token và refresh token (dùng `sessionStorage` cho bảo mật hơn)
- **Theme mode (dark/light)**: Giữ user preference về theme
- **User preference**: Các setting của user như ngôn ngữ, currency, etc.
- **UI state cần giữ**: Các state như sidebar collapsed, filters đã chọn, etc.

### ⚠️ Khi nào không nên dùng persistedstate?

Không dùng cho:

- **Dữ liệu từ API**: Vì đã có Colada caching, không cần persist lại. Colada tự động cache và quản lý stale time.
- **Dữ liệu thay đổi liên tục**: Như real-time data, notifications, etc. Vì sẽ bị outdated ngay lập tức.
- **Dữ liệu nhạy cảm**: Token nên để trong cookies HttpOnly thay vì localStorage/sessionStorage. Tuy nhiên, nếu phải dùng, nên dùng `sessionStorage` thay vì `localStorage`.

### Ví dụ:

```typescript
// ✅ Good: Persist cart
export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([]);
    // ...
  },
  {
    persist: {
      key: 'cart',
      storage: localStorage, // Cart nên persist lâu dài
    },
  },
);

// ✅ Good: Persist auth tokens
export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string | null>(null);
    // ...
  },
  {
    persist: {
      key: 'auth',
      storage: sessionStorage, // Session-based, clear khi close tab
    },
  },
);

// ❌ Bad: Don't persist API data
export const useProductsStore = defineStore('products', () => {
  // Don't persist - use Colada query instead
  const { data: products } = useQuery({
    key: ['products'],
    query: () => useApi('/products'),
  });
  // ...
});
```

## Migration từ useState

Nếu bạn đang sử dụng `useState`, có thể migrate sang Pinia:

### Before (useState)

```typescript
const user = useState('user', () => null);
const accessToken = useState('accessToken', () => null);
```

### After (Pinia)

```typescript
const authStore = useAuthStore();
const user = authStore.user;
const accessToken = authStore.accessToken;
```

## Troubleshooting

### State không persist

- Kiểm tra `persist` config trong store
- Kiểm tra `sessionStorage` có available không
- Kiểm tra plugin đã được load chưa

### Pinia Colada không hoạt động

- Kiểm tra `useQuery` và `useMutation` imports
- Kiểm tra query key format
- Kiểm tra API responses

### Circular dependency

- Sử dụng dynamic imports nếu cần
- Tránh import store trong composables được import bởi store

## Resources

- [Pinia Documentation](https://pinia.vuejs.org/)
- [Pinia Colada](https://github.com/posva/pinia-colada)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
