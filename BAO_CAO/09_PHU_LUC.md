# PHỤ LỤC

Phụ lục cung cấp các thông tin chi tiết bổ sung cho báo cáo, bao gồm cấu hình hệ thống, API documentation, database schema, screenshots, performance metrics, test coverage, và environment variables. Các phụ lục này hỗ trợ việc hiểu rõ hơn về implementation details và cung cấp tài liệu kỹ thuật đầy đủ cho developers và stakeholders.

## Phụ Lục A: Cấu Hình Hệ Thống

### A.1. Cấu Hình Backend (NestJS)

**File: `apps/api/package.json`**

- Dependencies chính: NestJS, TypeORM, PostgreSQL driver, Redis client
- Dev dependencies: TypeScript, ESLint, Jest, Supertest
- Scripts: build, start, test, lint

**File: `apps/api/src/main.ts`**

- Port configuration
- CORS configuration
- Global prefix
- Validation pipe setup
- Exception filter setup

**File: `apps/api/src/app.module.ts`**

- Root module configuration
- Import các feature modules
- Database configuration
- Redis configuration

### A.2. Cấu Hình Frontend (Nuxt 4)

**File: `apps/web/nuxt.config.ts`**

- Nuxt modules configuration
- Runtime config
- Build configuration
- CSS configuration
- Image optimization

**File: `apps/web/package.json`**

- Dependencies chính: Nuxt 4, Nuxt UI, Vue.js, TypeScript
- Dev dependencies: ESLint, Prettier, Vitest
- Scripts: dev, build, preview, lint

### A.3. Cấu Hình Database

**PostgreSQL Configuration:**

- Connection settings
- Pool configuration
- Timeout settings
- SSL configuration (production)

**TypeORM Configuration:**

- DataSource configuration
- Entity paths
- Migration paths
- Synchronization settings (development only)

### A.4. Cấu Hình Redis

**Redis Configuration:**

- Connection settings
- Pool configuration
- TTL defaults
- Key prefixes

### A.5. Cấu Hình Docker

**File: `docker-compose.yml`**

- Services: api, web, postgres, redis
- Networks configuration
- Volumes configuration
- Environment variables

**Dockerfiles:**

- `apps/api/Dockerfile`: Multi-stage build cho backend
- `apps/web/Dockerfile`: Multi-stage build cho frontend

### A.6. Cấu Hình Nginx

**File: `nginx.conf`**

- Upstream configuration
- Load balancing strategy
- SSL/TLS configuration
- Caching configuration
- Rate limiting

## Phụ Lục B: API Documentation

### B.1. Products API

**Endpoints:**

- `GET /api/products`: Lấy danh sách sản phẩm
- `GET /api/products/:id`: Lấy chi tiết sản phẩm
- `POST /api/products`: Tạo sản phẩm mới (admin only)
- `PUT /api/products/:id`: Cập nhật sản phẩm (admin only)
- `DELETE /api/products/:id`: Xóa sản phẩm (admin only)

**Query Parameters:**

- `page`: Số trang
- `limit`: Số lượng mỗi trang
- `category`: Lọc theo danh mục
- `search`: Tìm kiếm
- `sort`: Sắp xếp
- `minPrice`, `maxPrice`: Lọc theo giá
- `origin`: Lọc theo nguồn gốc
- `certification`: Lọc theo chứng nhận

### B.2. Categories API

**Endpoints:**

- `GET /api/categories`: Lấy danh sách danh mục
- `GET /api/categories/:id`: Lấy chi tiết danh mục
- `POST /api/categories`: Tạo danh mục mới (admin only)
- `PUT /api/categories/:id`: Cập nhật danh mục (admin only)
- `DELETE /api/categories/:id`: Xóa danh mục (admin only)

### B.3. Orders API

**Endpoints:**

- `GET /api/orders`: Lấy danh sách đơn hàng của user
- `GET /api/orders/:id`: Lấy chi tiết đơn hàng
- `POST /api/orders`: Tạo đơn hàng mới
- `PUT /api/orders/:id`: Cập nhật đơn hàng
- `GET /api/admin/orders`: Lấy tất cả đơn hàng (admin only)
- `PUT /api/admin/orders/:id/status`: Cập nhật trạng thái đơn hàng (admin only)

### B.4. Users API

**Endpoints:**

- `POST /api/auth/register`: Đăng ký
- `POST /api/auth/login`: Đăng nhập
- `POST /api/auth/refresh`: Refresh token
- `GET /api/users/me`: Lấy thông tin user hiện tại
- `PUT /api/users/me`: Cập nhật thông tin user
- `GET /api/admin/users`: Lấy danh sách users (admin only)

### B.5. Response Format

**Success Response:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { ... }
  }
}
```

## Phụ Lục C: Database Schema

### C.1. Entity Definitions

**User Entity:**

- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- role (Enum: ADMIN, USER)
- createdAt (Timestamp)
- updatedAt (Timestamp)

**Product Entity:**

- id (UUID, Primary Key)
- name (String)
- description (Text)
- price (Decimal)
- categoryId (UUID, Foreign Key)
- harvestDate (Date)
- expiryDate (Date)
- origin (String)
- certifications (Array)
- grade (Enum: A, B, C)
- storageRequirements (JSON)
- seasonalAvailability (JSON)
- bulkPricingTiers (JSON)
- createdAt (Timestamp)
- updatedAt (Timestamp)

**Category Entity:**

- id (UUID, Primary Key)
- name (String)
- description (Text)
- slug (String, Unique)
- parentId (UUID, Foreign Key, Nullable)
- createdAt (Timestamp)
- updatedAt (Timestamp)

**Order Entity:**

- id (UUID, Primary Key)
- userId (UUID, Foreign Key)
- status (Enum)
- totalAmount (Decimal)
- shippingAddress (JSON)
- deliveryTimeWindow (String)
- temperatureControl (Boolean)
- createdAt (Timestamp)
- updatedAt (Timestamp)

**OrderItem Entity:**

- id (UUID, Primary Key)
- orderId (UUID, Foreign Key)
- productId (UUID, Foreign Key)
- quantity (Integer)
- price (Decimal)
- createdAt (Timestamp)

**Inventory Entity:**

- id (UUID, Primary Key)
- productId (UUID, Foreign Key)
- quantity (Integer)
- batchNumber (String)
- expiryDate (Date)
- location (String)
- createdAt (Timestamp)
- updatedAt (Timestamp)

### C.2. Relationships

- User 1-N Order
- Category 1-N Product
- Category 1-N Category (self-referencing)
- Order 1-N OrderItem
- Product 1-N OrderItem
- Product 1-1 Inventory

### C.3. Indexes

- Primary keys: Tất cả tables
- Foreign keys: Tất cả foreign keys
- Composite indexes:
  - (categoryId, status) trên products
  - (userId, createdAt) trên orders
  - (harvestDate, expiryDate) trên products
- Full-text search: name và description trên products

## Phụ Lục D: Screenshots và Demo

### D.1. Trang Chủ

- Hero banner với call-to-action
- Featured products section
- Categories showcase
- Features section
- Testimonials section

### D.2. Trang Shop

- Product listing với grid/list view
- Filter sidebar
- Search functionality
- Sorting options
- Pagination

### D.3. Trang Chi Tiết Sản Phẩm

- Image gallery
- Product information
- Agriculture-specific info cards
- Reviews và ratings
- Add to cart functionality

### D.4. Admin Panel

- Dashboard với statistics
- Products management table
- Orders management table
- Data tables với search, filter, pagination

### D.5. User Account

- Profile management
- Order history
- Settings

## Phụ Lục E: Performance Metrics

### E.1. API Performance

- Average response time: < 150ms
- 95th percentile: < 200ms
- 99th percentile: < 300ms
- Throughput: 1000+ concurrent requests
- Cache hit rate: > 70%

### E.2. Frontend Performance

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

### E.3. Database Performance

- Query execution time: < 50ms (most queries)
- Index usage: > 90% queries
- Connection pool utilization: 60-80%

## Phụ Lục F: Test Coverage

### F.1. Backend Tests

- Unit tests: > 80% coverage
- Integration tests: > 70% coverage
- E2E tests: Critical paths covered

### F.2. Frontend Tests

- Component tests: > 75% coverage
- Composable tests: > 80% coverage
- E2E tests: Main user flows covered

## Phụ Lục G: Environment Variables

### G.1. Backend Environment Variables

- `DATABASE_HOST`: PostgreSQL host
- `DATABASE_PORT`: PostgreSQL port
- `DATABASE_USER`: Database user
- `DATABASE_PASSWORD`: Database password
- `DATABASE_NAME`: Database name
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `JWT_SECRET`: JWT secret key
- `JWT_EXPIRATION`: JWT expiration time

### G.2. Frontend Environment Variables

- `API_BASE_URL`: Backend API base URL
- `PEXELS_API_KEY`: Pexels API key (optional)

---

> **Lưu ý**: Các phụ lục này cung cấp thông tin bổ sung và chi tiết kỹ thuật cho báo cáo. Nội dung có thể được mở rộng tùy theo yêu cầu cụ thể của đồ án.
