# E-Commerce API

RESTful API được xây dựng với NestJS, TypeORM, PostgreSQL, Redis và JWT authentication.

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
  - [Setup Local](#setup-local)
  - [Setup với Docker](#setup-với-docker)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Database Migrations](#-database-migrations)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Cấu trúc project](#-cấu-trúc-project)

## ✨ Tính năng

### Authentication & Authorization

- ✅ **Đăng ký tài khoản** - Tạo tài khoản mới với email và password
- ✅ **Đăng nhập** - Xác thực người dùng và trả về JWT tokens
- ✅ **JWT Authentication** - Access token và Refresh token
- ✅ **Refresh Token** - Làm mới access token khi hết hạn
- ✅ **Logout** - Hủy refresh token
- ✅ **Get Current User** - Lấy thông tin user hiện tại
- ✅ **Global JWT Guard** - Bảo vệ tất cả routes (trừ public routes)

### User Management

- ✅ **Get User by ID** - Lấy thông tin user theo UUID
- ✅ **Update User** - Cập nhật thông tin user (displayName, password)
- ✅ **Delete User** - Xóa tài khoản user
- ✅ **Password Hashing** - Mã hóa password với bcrypt
- ✅ **Email Validation** - Kiểm tra email trùng lặp

### Core Services

- ✅ **Cache Service** - Redis caching với support JSON và string
- ✅ **Distributed Locking** - Redlock cho distributed locks
- ✅ **Pub/Sub** - Redis pub/sub messaging
- ✅ **Bcrypt Service** - Password hashing và verification

### Database

- ✅ **TypeORM** - ORM với PostgreSQL
- ✅ **Migrations** - Database migrations support
- ✅ **Entity Relations** - User entity với timestamps
- ✅ **UUID Primary Keys** - Sử dụng UUID cho user IDs

### Testing

- ✅ **E2E Tests** - End-to-end tests với mocks
- ✅ **Mock Repository** - In-memory database cho testing
- ✅ **Mock Cache** - In-memory cache cho testing
- ✅ **Test Isolation** - Mỗi test độc lập, không ảnh hưởng database thật

## 🛠 Công nghệ sử dụng

- **Framework**: NestJS 11.x
- **Language**: TypeScript
- **Database**: PostgreSQL 17
- **ORM**: TypeORM 0.3.x
- **Cache**: Redis 7
- **Authentication**: JWT (Passport)
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest
- **Message Queue**: RabbitMQ 3.12 (đã cấu hình, chưa sử dụng)

## 📦 Yêu cầu hệ thống

- Node.js >= 18.x
- pnpm >= 8.x (hoặc npm/yarn)
- PostgreSQL >= 17
- Redis >= 7
- Docker & Docker Compose (nếu dùng Docker)

## 🚀 Cài đặt

### Setup Local

1. **Clone repository và cài đặt dependencies:**

```bash
cd apps/api
pnpm install
```

2. **Tạo file `.env` từ `.env.example` (nếu có) hoặc tạo mới:**

```bash
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=dev
POSTGRES_PASSWORD=dev
POSTGRES_DB=shopdb

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-secret-key-here
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_EXPIRES=7d

# Application
PORT=3000

# Bcrypt
SALT_ROUNDS=10
```

3. **Khởi động PostgreSQL và Redis:**

```bash
# Sử dụng Docker Compose
docker-compose up -d postgres redis

# Hoặc cài đặt và chạy local
# PostgreSQL: https://www.postgresql.org/download/
# Redis: https://redis.io/download
```

4. **Chạy migrations:**

```bash
pnpm migration:run
```

5. **Khởi động ứng dụng:**

```bash
# Development mode
pnpm dev

# Production mode
pnpm build
pnpm start:prod
```

### Setup với Docker

1. **Khởi động tất cả services (PostgreSQL, Redis, RabbitMQ):**

```bash
docker-compose up -d
```

2. **Cài đặt dependencies và chạy migrations:**

```bash
pnpm install
pnpm migration:run
```

3. **Khởi động ứng dụng:**

```bash
pnpm dev
```

**Lưu ý**: Ứng dụng sẽ kết nối đến các services trong Docker containers:

- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- RabbitMQ: `localhost:5672` (AMQP) và `localhost:15672` (Management UI)

## ⚙️ Cấu hình môi trường

### Environment Variables

| Variable              | Mô tả                    | Mặc định    | Required |
| --------------------- | ------------------------ | ----------- | -------- |
| `POSTGRES_HOST`       | PostgreSQL host          | `localhost` | ✅       |
| `POSTGRES_PORT`       | PostgreSQL port          | `5432`      | ✅       |
| `POSTGRES_USER`       | PostgreSQL username      | -           | ✅       |
| `POSTGRES_PASSWORD`   | PostgreSQL password      | -           | ✅       |
| `POSTGRES_DB`         | Database name            | -           | ✅       |
| `REDIS_HOST`          | Redis host               | `localhost` | ✅       |
| `REDIS_PORT`          | Redis port               | `6379`      | ✅       |
| `REDIS_PASSWORD`      | Redis password           | -           | ✅       |
| `JWT_SECRET`          | JWT access token secret  | -           | ✅       |
| `JWT_ACCESS_EXPIRES`  | Access token expiration  | `15m`       | ✅       |
| `JWT_REFRESH_SECRET`  | JWT refresh token secret | -           | ✅       |
| `JWT_REFRESH_EXPIRES` | Refresh token expiration | `7d`        | ✅       |
| `PORT`                | Application port         | `3000`      | ✅       |
| `SALT_ROUNDS`         | Bcrypt salt rounds       | `10`        | ✅       |

## 🏃 Chạy ứng dụng

```bash
# Development mode (với hot reload)
pnpm dev

# Production mode
pnpm build
pnpm start:prod

# Debug mode
pnpm start:debug
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 📊 Database Migrations

### Tạo migration mới

```bash
# Tạo migration từ entity changes
pnpm migration:generate src/database/migrations/MigrationName

# Tạo migration file trống
pnpm migration:create src/database/migrations/MigrationName
```

### Chạy migrations

```bash
# Chạy tất cả migrations chưa được apply
pnpm migration:run
```

### Revert migration

```bash
# Revert migration gần nhất
pnpm migration:revert
```

### Xóa schema (cẩn thận!)

```bash
# Xóa toàn bộ schema (chỉ dùng trong development)
pnpm schema:drop
```

**Lưu ý**:

- Migrations được lưu tại `src/database/migrations/`
- Migration files được tự động tìm thấy bởi TypeORM
- Luôn backup database trước khi chạy migrations trong production

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

### Authentication Endpoints

#### 1. Đăng ký

```http
POST /auth/register
Content-Type: application/json

{
  "displayName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Đăng nhập

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Lấy thông tin user hiện tại

```http
GET /auth/me
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "id": "uuid",
  "displayName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 5. Đăng xuất

```http
POST /auth/logout
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

### User Management Endpoints

#### 1. Lấy user theo ID

```http
GET /users/:id
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "id": "uuid",
  "displayName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Cập nhật user

```http
PATCH /users/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "displayName": "Jane Doe",
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "id": "uuid",
  "displayName": "Jane Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 3. Xóa user

```http
DELETE /users/:id
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

### Validation Rules

- **Email**: Phải là email hợp lệ, unique trong database
- **Password**: Tối thiểu 6 ký tự
- **Display Name**: Không được rỗng
- **User ID**: Phải là UUID hợp lệ

### Error Responses

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

## 🧪 Testing

### Chạy tests

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

### Test Structure

- **E2E Tests**: `test/*.e2e-spec.ts`
- **Unit Tests**: `src/**/*.spec.ts`
- **Test Config**: `test/jest-e2e.json`

### Test Features

- ✅ Mock TypeORM Repository (in-memory)
- ✅ Mock Redis Cache (in-memory)
- ✅ Mock JWT Authentication
- ✅ Test isolation (mỗi test độc lập)
- ✅ Không đụng vào database thật

## 📁 Cấu trúc project

```
apps/api/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── core/                   # Core services và utilities
│   │   ├── services/           # BcryptService, CacheService
│   │   ├── decorators/         # Public decorator
│   │   ├── entities/           # Base entities (DateEntity)
│   │   └── types/              # Type definitions
│   ├── database/               # Database configuration
│   │   ├── data-source.ts      # TypeORM CLI data source
│   │   ├── typeorm.config.ts   # TypeORM config for NestJS
│   │   ├── database.module.ts  # Database module
│   │   └── migrations/         # Database migrations
│   ├── modules/
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto/            # LoginDto, RefreshDto
│   │   │   ├── guards/         # JwtAuthGuard
│   │   │   └── strategies/     # JwtStrategy
│   │   └── users/              # User management module
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       ├── dto/            # CreateUserDto, UpdateUserDto
│   │       └── entities/       # User entity
│   └── redis/                  # Redis module
├── test/                       # E2E tests
│   ├── auth.e2e-spec.ts
│   ├── users.e2e-spec.ts
│   └── jest-e2e.json
├── docker-compose.yml          # Docker services
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Security Features

- ✅ Password hashing với bcrypt
- ✅ JWT token authentication
- ✅ Refresh token rotation
- ✅ Global JWT guard (tất cả routes được bảo vệ)
- ✅ Public routes decorator
- ✅ Input validation với class-validator
- ✅ Password exclusion trong responses (@Exclude())

## 📝 Scripts

| Script                    | Mô tả                                |
| ------------------------- | ------------------------------------ |
| `pnpm dev`                | Chạy development mode với hot reload |
| `pnpm build`              | Build production                     |
| `pnpm start`              | Chạy production mode                 |
| `pnpm test`               | Chạy unit tests                      |
| `pnpm test:e2e`           | Chạy E2E tests                       |
| `pnpm migration:generate` | Tạo migration từ entity changes      |
| `pnpm migration:run`      | Chạy migrations                      |
| `pnpm migration:revert`   | Revert migration                     |
| `pnpm migration:create`   | Tạo migration file trống             |

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and unlicensed.

## 👨‍💻 Author

E-Commerce API Team

---

**Lưu ý**: Đảm bảo các environment variables được cấu hình đúng trước khi chạy ứng dụng. Luôn backup database trước khi chạy migrations trong production.
