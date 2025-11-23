# NestJS API Overview

## Tổng quan

Backend API được xây dựng với **NestJS 11.x**, một progressive Node.js framework sử dụng TypeScript và được thiết kế để xây dựng scalable server-side applications.

## Kiến trúc Module

### App Module Structure

```typescript
AppModule
├── ConfigModule (Global)
├── DatabaseModule
├── RedisModule (Global)
├── CoreModule
├── UsersModule
└── AuthModule
```

### Mẫu Module

Mỗi feature module tuân theo mẫu:

```
Module/
├── module.ts          # Module definition
├── controller.ts      # HTTP endpoints
├── service.ts         # Business logic
├── dto/               # Data Transfer Objects
├── entities/          # Database entities
└── guards/            # Route guards (nếu có)
```

## Core Modules

### 1. ConfigModule

Global configuration module sử dụng `@nestjs/config`:

```typescript
ConfigModule.forRoot({
  isGlobal: true,
});
```

- Loads environment variables từ `.env`
- Provides `ConfigService` globally
- Type-safe configuration access

### 2. DatabaseModule

TypeORM integration module:

- Database connection management
- Entity registration
- Migration support
- Repository injection

### 3. RedisModule

Global Redis module:

- Redis client provider
- Connection management
- Error handling
- Event listeners

### 4. CoreModule

Shared core functionality:

- **BcryptService**: Password hashing
- **CacheService**: Redis operations wrapper
- **Base Entities**: DateEntity với timestamps
- **Decorators**: Custom decorators (Public)
- **Types**: Shared TypeScript types

## Feature Modules

### Users Module

Quản lý user operations:

- **Controller**: `/users` endpoints
- **Service**: User CRUD operations
- **Entity**: User entity với TypeORM
- **DTOs**: CreateUserDto, UpdateUserDto

### Auth Module

Authentication và authorization:

- **Controller**: `/auth` endpoints (login, register, refresh, logout)
- **Service**: JWT token generation, validation
- **Strategy**: Passport JWT strategy
- **Guard**: JwtAuthGuard (global)
- **DTOs**: LoginDto, RefreshDto

## Request/Response Flow

### Request Pipeline

```
1. HTTP Request
2. ValidationPipe (transform & validate)
3. JwtAuthGuard (check authentication)
4. Controller (route handler)
5. Service (business logic)
6. Repository/Cache (data access)
7. Response
```

### Global Interceptors

- **ClassSerializerInterceptor**: Transform entities, exclude sensitive fields

### Global Pipes

- **ValidationPipe**:
  - Whitelist: chỉ cho phép properties được định nghĩa
  - Transform: tự động transform types
  - Enable implicit conversion

## Controllers

### RESTful Design

Controllers follow REST conventions:

- `GET /users` - List users
- `GET /users/:id` - Get user
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Authentication Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

## Services

### Mẫu Service Layer

Services chứa business logic:

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Business logic methods
}
```

### Dependency Injection

Tất cả dependencies được inject qua constructor:

- Repositories
- Other services
- ConfigService
- CacheService

## Data Transfer Objects (DTOs)

### Validation với class-validator

```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  displayName: string;
}
```

### Transformation với class-transformer

- Exclude sensitive fields
- Transform property names
- Serialize nested objects

## Guards

### JwtAuthGuard

Global guard bảo vệ tất cả routes:

```typescript
@Global()
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
```

### Public Decorator

Đánh dấu routes public:

```typescript
@Public()
@Post('login')
async login(@Body() dto: LoginDto) {
  // Public endpoint
}
```

## Error Handling

### Exception Filters

NestJS tự động handle exceptions:

- `NotFoundException` → 404
- `BadRequestException` → 400
- `UnauthorizedException` → 401
- `ForbiddenException` → 403

### Custom Error Messages

```typescript
throw new NotFoundException('User not found');
```

## Testing

### Unit Tests

- Service logic testing
- Mock repositories
- Mock dependencies

### E2E Tests

- Full request/response cycle
- Database integration
- Authentication flow

### Test Structure

```
test/
├── auth.e2e-spec.ts
└── users.e2e-spec.ts
```

## Best Practices

### 1. Module Organization

- ✅ Một module per feature
- ✅ Shared code trong CoreModule
- ✅ Global modules cho cross-cutting concerns

### 2. Service Design

- ✅ Single Responsibility Principle
- ✅ Dependency Injection
- ✅ Async/await cho I/O operations

### 3. Error Handling

- ✅ Use NestJS exceptions
- ✅ Meaningful error messages
- ✅ Proper HTTP status codes

### 4. Validation

- ✅ DTOs với class-validator
- ✅ Global ValidationPipe
- ✅ Custom validators khi cần

### 5. Security

- ✅ JWT authentication
- ✅ Password hashing với bcrypt
- ✅ Input validation
- ✅ SQL injection prevention (TypeORM)
