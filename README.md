# E-Commerce Monorepo

Một monorepo hiện đại cho ứng dụng e-commerce được xây dựng với Nx, NestJS, Nuxt.js, PostgreSQL, và Redis.

## 📋 Tổng quan

Dự án này sử dụng kiến trúc monorepo để quản lý cả backend (NestJS) và frontend (Nuxt.js) trong cùng một repository, giúp tối ưu hóa việc chia sẻ code, quản lý dependencies, và phát triển.

## 🏗️ Kiến trúc

```
ecom/
├── apps/
│   ├── api/          # NestJS Backend API
│   └── web/          # Nuxt.js Frontend
├── docs/             # Documentation
└── package.json      # Root package configuration
```

## 🚀 Tech Stack

### Backend (API)

- **Framework**: NestJS 11.x
- **Database**: PostgreSQL 17
- **ORM**: TypeORM 0.3.x
- **Cache**: Redis 7
- **Authentication**: JWT với Passport.js
- **Message Queue**: RabbitMQ 3.12

### Frontend (Web)

- **Framework**: Nuxt.js 4.x
- **UI Library**: Nuxt UI 4.x
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript 5.x

### Monorepo Tools

- **Build System**: Nx 22.x
- **Package Manager**: pnpm 10.x
- **Workspace**: pnpm workspaces

## 📚 Documentation

Chi tiết về từng phần của dự án:

- [Kiến trúc tổng thể](./docs/architecture.md)
- [Setup Monorepo](./docs/monorepo-setup.md)
- [NestJS API Overview](./docs/api-overview.md)
- [Nuxt.js Web Overview](./docs/web-overview.md)
- [Database & TypeORM](./docs/database.md)
- [Redis & Caching](./docs/redis.md)
- [Authentication Flow](./docs/authentication.md)
- [Libraries & Dependencies](./docs/libraries.md)
- [Algorithms & Patterns](./docs/algorithms.md)

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- pnpm 10.x
- Docker & Docker Compose

### Installation

```bash
# Install dependencies
pnpm install

# Start infrastructure (PostgreSQL, Redis, RabbitMQ)
cd apps/api
docker-compose up -d

# Start API development server
cd apps/api
pnpm dev

# Start Web development server
cd apps/web
pnpm dev
```

### Available Scripts

```bash
# Format code
pnpm format

# Lint all projects
pnpm lint

# Type check all projects
pnpm tsc

# Build all projects
pnpm build

# Run all validations
pnpm valid
```

## 📁 Project Structure

### API (`apps/api`)

```
src/
├── core/              # Core services và utilities
│   ├── services/     # BcryptService, CacheService
│   ├── decorators/    # Custom decorators
│   └── entities/      # Base entities
├── database/          # TypeORM configuration
├── modules/           # Feature modules
│   ├── auth/          # Authentication module
│   └── users/         # Users module
└── redis/             # Redis module
```

### Web (`apps/web`)

```
app/
├── app.vue            # Root component
├── error.vue          # Error page
├── pages/             # File-based routing
└── assets/            # Static assets
```

## 🔐 Environment Variables

Tạo file `.env` trong `apps/api/`:

```env
# Server
PORT=3000

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
JWT_SECRET=your-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES=7d

# Bcrypt
SALT_ROUNDS=10
```

## 🧪 Testing

```bash
# Run API tests
cd apps/api
pnpm test

# Run e2e tests
cd apps/api
pnpm test:e2e
```

## 📝 Giấy phép

Riêng tư - Bảo lưu mọi quyền

## 👥 Author

smoothie
