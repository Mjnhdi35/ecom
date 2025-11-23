# Kiến trúc Tổng thể

## Tổng quan

Dự án sử dụng kiến trúc **monorepo** với **microservices-ready** design, cho phép mở rộng dễ dàng và quản lý code hiệu quả.

## Kiến trúc Monorepo

### Cấu trúc

```
ecom/
├── apps/
│   ├── api/          # Backend API Service
│   └── web/          # Frontend Application
├── docs/             # Documentation
└── package.json      # Root workspace configuration
```

### Lợi ích của Monorepo

1. **Code Sharing**: Dễ dàng chia sẻ types, utilities giữa frontend và backend
2. **Dependency Management**: Quản lý dependencies tập trung với pnpm workspaces
3. **Build Optimization**: Nx cache và incremental builds
4. **Consistent Tooling**: Cùng một bộ công cụ cho toàn bộ dự án

## Kiến trúc Backend (NestJS)

### Module-based Architecture

NestJS sử dụng kiến trúc module-based, mỗi feature được tổ chức thành một module độc lập:

```
AppModule (Root)
├── ConfigModule (Global)
├── DatabaseModule
├── RedisModule (Global)
├── CoreModule
├── UsersModule
└── AuthModule
```

### Core Principles

1. **Dependency Injection**: Tất cả dependencies được inject qua constructor
2. **Decorators**: Sử dụng decorators cho metadata và configuration
3. **Guards**: JWT Guard được apply globally để bảo vệ routes
4. **Interceptors**: ClassSerializerInterceptor để transform responses
5. **Pipes**: ValidationPipe để validate và transform requests

### Mẫu Service Layer

```
Controller → Service → Repository → Database
                ↓
            CacheService (Redis)
```

## Kiến trúc Frontend (Nuxt.js)

### File-based Routing

Nuxt.js sử dụng file-based routing, mỗi file trong `pages/` tự động trở thành route:

```
app/
├── app.vue           # Root layout
├── error.vue         # Error page
└── pages/
    └── index.vue     # Route: /
```

### Component Architecture

- **UApp**: Root component wrapper từ Nuxt UI
- **UError**: Error component với NuxtError support
- **NuxtPage**: Dynamic page component

## Data Flow

### Authentication Flow

```
Client → Nuxt.js → NestJS API → JWT Validation → Protected Route
                              ↓
                          Redis Cache (Refresh Tokens)
```

### Request Flow

```
1. Client Request
2. Nuxt.js SSR/Client-side
3. API Request (NestJS)
4. Guard Check (JWT)
5. Controller → Service
6. Service → Repository/Cache
7. Database/Redis
8. Response
```

## Infrastructure

### Services

- **PostgreSQL**: Primary database
- **Redis**: Caching và session management
- **RabbitMQ**: Message queue (chuẩn bị cho tương lai)

### Docker Compose

Tất cả services được containerized với Docker Compose:

```yaml
services:
  postgres: # Database
  redis: # Cache
  rabbitmq: # Message Queue
```

## Scalability Considerations

### Current Architecture

- **Monolithic Backend**: Tất cả modules trong một NestJS app
- **Ready for Microservices**: Module structure cho phép tách ra dễ dàng

### Khả năng mở rộng Tương lai

1. **API Gateway**: Có thể thêm mẫu API Gateway
2. **Service Separation**: Tách modules thành microservices
3. **Load Balancing**: Nginx/HAProxy cho multiple instances
4. **Database Sharding**: PostgreSQL partitioning khi cần

## Security Architecture

### Authentication

- **JWT Access Tokens**: Short-lived (15 minutes)
- **JWT Refresh Tokens**: Long-lived (7 days), stored in Redis
- **Bcrypt Hashing**: Password hashing với configurable salt rounds

### Authorization

- **Global JWT Guard**: Tất cả routes được protect mặc định
- **Public Decorator**: Đánh dấu routes public
- **Role-based**: Có thể mở rộng với role-based access control

## Performance Optimizations

### Backend

- **Redis Caching**: Cache refresh tokens và frequently accessed data
- **Connection Pooling**: TypeORM connection pooling
- **Query Optimization**: TypeORM query builder

### Frontend

- **SSR**: Server-side rendering với Nuxt.js
- **Code Splitting**: Automatic code splitting
- **Static Assets**: Optimized asset delivery

## Monitoring & Logging

### Current

- Console logging cho development
- Error handling với NestJS exception filters

### Cải tiến trong tương lai

- Structured logging (Winston/Pino)
- Công cụ APM (New Relic, Datadog)
- Health check endpoints
- Thu thập metrics
