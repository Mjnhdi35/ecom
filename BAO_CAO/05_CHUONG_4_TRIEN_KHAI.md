# CHƯƠNG 4: TRIỂN KHAI HỆ THỐNG

> **Nguồn**: Chương này trình bày chi tiết quá trình triển khai hệ thống, dựa trên thiết kế đã trình bày ở Chương 3 và sử dụng nội dung từ cả hai file DOCUMENTATION.md.

Chương này mô tả chi tiết quá trình triển khai hệ thống e-commerce nông nghiệp từ thiết kế đến implementation theo các nguyên tắc của Software Engineering và Web Development. Quá trình triển khai bao gồm setup môi trường phát triển, implementation backend API, frontend application, database schema, caching, testing, và deployment. Tất cả các bước được thực hiện với focus on code quality, maintainability, security, và performance.

## 4.1. Môi Trường Phát Triển và Công Cụ

Môi trường phát triển và công cụ là nền tảng cho quá trình phát triển phần mềm. Việc chọn đúng công cụ và setup môi trường phù hợp giúp improve productivity và code quality.

### 4.1.1. Công Cụ Phát Triển

Công cụ phát triển được chọn dựa trên requirements của dự án và best practices của industry.

**Backend Development Tools:**

- **Node.js (v18+)**: JavaScript runtime environment cho backend. Node.js v18+ được chọn vì có Long Term Support (LTS) và performance improvements. Node.js cung cấp event-driven, non-blocking I/O model phù hợp cho web applications.

- **TypeScript (v5+)**: Typed superset của JavaScript cho type safety. TypeScript v5+ được chọn vì có improved performance và new features. TypeScript giúp catch errors tại compile time và improve code maintainability.

- **NestJS CLI**: Command-line interface cho NestJS framework. NestJS CLI giúp generate modules, controllers, services, và other components. CLI cung cấp scaffolding tools để speed up development.

- **PostgreSQL (v14+)**: Relational database management system. PostgreSQL v14+ được chọn vì ACID compliance, advanced features (JSONB, full-text search, arrays), và reliability. PostgreSQL phù hợp cho complex data requirements của agriculture domain.

- **Redis (v7+)**: In-memory data structure store cho caching và session management. Redis v7+ được chọn vì high performance, rich data structures, và persistence options. Redis improve application performance significantly.

**Frontend Development Tools:**

- **Node.js (v18+)**: JavaScript runtime cho frontend build process. Node.js được sử dụng để run build tools và development server.

- **TypeScript (v5+)**: TypeScript cho frontend để ensure type safety và improve developer experience. TypeScript giúp catch errors early và provide better IDE support.

- **Nuxt 4**: Vue.js framework cho server-side rendering và static site generation. Nuxt 4 được chọn vì excellent developer experience, file-based routing, auto-imports, và built-in optimizations.

- **Nuxt UI**: Component library built on Reka UI và Tailwind CSS. Nuxt UI cung cấp 100+ components với TypeScript support và accessibility compliance.

- **Vite (build tool)**: Next-generation frontend build tool. Vite được chọn vì fast development server, instant HMR (Hot Module Replacement), và optimized production builds.

**Development Tools:**

- **Git**: Version control system cho code management. Git giúp track changes, collaborate với team, và manage releases. Git workflow sử dụng feature branches, pull requests, và code reviews.

- **Docker và Docker Compose**: Containerization platform cho development và deployment. Docker đảm bảo consistent environments across development, staging, và production. Docker Compose orchestrate multi-container applications.

- **ESLint**: Linting tool cho JavaScript và TypeScript. ESLint giúp maintain code quality, catch errors, và enforce coding standards. ESLint configuration được customize cho project requirements.

- **Prettier**: Code formatter cho consistent code style. Prettier automatically format code theo configured rules, reduce formatting discussions trong code reviews.

- **Jest**: Testing framework cho backend. Jest được chọn vì easy setup, built-in mocking, và excellent TypeScript support. Jest cung cấp unit testing, integration testing, và snapshot testing.

- **Vitest**: Testing framework cho frontend. Vitest được chọn vì fast execution, Vite integration, và compatibility với Vue testing utilities.

### 4.1.2. Cấu Trúc Dự Án

Cấu trúc dự án được organize để support monorepo architecture và facilitate development workflow.

**Monorepo Structure:**

Dự án sử dụng monorepo structure để manage multiple applications và shared libraries trong một repository.

```
ecom/
├── apps/
│   ├── api/          # Backend NestJS application
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── modules/      # Feature modules
│   │   │   ├── common/       # Shared utilities
│   │   │   ├── config/       # Configuration
│   │   │   └── database/     # Database config
│   │   ├── test/             # Test files
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/          # Frontend Nuxt 4 application
│       ├── app/
│       │   ├── app.vue
│       │   ├── nuxt.config.ts
│       │   ├── layouts/      # Layout components
│       │   ├── pages/         # Page components
│       │   ├── components/    # Reusable components
│       │   ├── composables/   # Composable functions
│       │   └── assets/        # Static assets
│       ├── package.json
│       └── tsconfig.json
├── libs/             # Shared libraries
│   ├── shared/       # Shared utilities
│   └── types/        # Shared TypeScript types
├── docker/           # Docker configurations
│   ├── Dockerfile.api
│   ├── Dockerfile.web
│   └── docker-compose.yml
├── docs/             # Documentation
├── .gitignore
├── package.json      # Root package.json
└── README.md
```

**Lợi Ích của Monorepo:**

- **Code Sharing**: Shared code (types, utilities) có thể be used across applications
- **Consistent Versions**: Dependencies có thể be managed centrally
- **Unified Tooling**: Single configuration cho linting, formatting, và testing
- **Atomic Changes**: Changes across applications có thể be committed cùng lúc
- **Easier Refactoring**: Refactoring có thể be done across entire codebase

## 4.2. Triển Khai Backend API

Triển khai backend API là quá trình implement các modules, controllers, services, và repositories theo thiết kế đã được định nghĩa trong Chương 3. Backend được xây dựng với NestJS framework và follow RESTful API principles.

### 4.2.1. Cấu Trúc Dự Án NestJS

Cấu trúc dự án NestJS được organize theo feature-based modules để ensure separation of concerns và facilitate maintainability.

**Module Organization:**

- **Feature-Based Modules**: Modules được organize theo features (products, orders, users, auth, categories). Mỗi feature có own module với complete functionality.

- **Module Structure**: Mỗi module chứa:
  - **Controller**: Xử lý HTTP requests và responses
  - **Service**: Chứa business logic
  - **Repository**: Truy cập database
  - **Entity**: Database entity definition
  - **DTOs**: Data Transfer Objects cho request/response validation
  - **Module File**: Module definition với imports, controllers, providers, exports

- **Shared Modules**: Shared modules cho common functionality như database configuration, authentication, validation, và error handling. Shared modules được import bởi feature modules.

**Project Structure:**

```
src/
├── app.module.ts          # Root module
├── main.ts                # Application entry point
├── common/                # Shared utilities
│   ├── decorators/        # Custom decorators
│   ├── filters/          # Exception filters
│   ├── guards/            # Auth guards
│   ├── interceptors/      # Interceptors
│   ├── pipes/             # Validation pipes
│   └── utils/             # Utility functions
├── config/                # Configuration
│   ├── database.config.ts
│   ├── redis.config.ts
│   └── app.config.ts
├── modules/
│   ├── products/           # Products module
│   │   ├── products.module.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   ├── products.repository.ts
│   │   ├── entities/
│   │   │   └── product.entity.ts
│   │   └── dto/
│   │       ├── create-product.dto.ts
│   │       └── update-product.dto.ts
│   ├── orders/            # Orders module
│   ├── users/             # Users module
│   ├── auth/              # Authentication module
│   └── categories/        # Categories module
└── database/              # Database configuration
    ├── data-source.ts
    └── migrations/
```

**Module Dependencies:**

- **AppModule**: Root module import tất cả feature modules và configure global settings
- **Feature Modules**: Feature modules có thể import shared modules và other feature modules khi cần
- **Circular Dependencies**: Circular dependencies được avoid bằng cách sử dụng forwardRef() khi cần

### 4.2.2. Module System Implementation

**Module Definition:**

- Sử dụng @Module() decorator
- Imports: các modules khác cần thiết
- Controllers: danh sách controllers trong module
- Providers: services và repositories
- Exports: providers được export để modules khác sử dụng

**Module Dependencies:**

- Modules phụ thuộc lẫn nhau thông qua imports
- Tránh circular dependencies
- Shared modules cho common functionality

### 4.2.3. Controller Implementation

**Controller Design:**

- Mỗi controller xử lý một resource
- Routes với decorators (@Get, @Post, @Put, @Delete)
- Path parameters và query parameters
- Request body validation với DTOs

**Example Controller Structure:**

- GET /products: Lấy danh sách sản phẩm
- GET /products/:id: Lấy chi tiết sản phẩm
- POST /products: Tạo sản phẩm mới (admin only)
- PUT /products/:id: Cập nhật sản phẩm (admin only)
- DELETE /products/:id: Xóa sản phẩm (admin only)

### 4.2.4. Service Layer Implementation

Service layer chứa business logic của application, tách biệt khỏi presentation layer (controllers) và data access layer (repositories).

**Service Responsibilities:**

- **Business Logic**: Services chứa business logic và business rules. Business logic được centralize trong services, không scattered trong controllers hoặc repositories.

- **Data Transformation**: Services transform data giữa different formats (entity ↔ DTO, entity ↔ response format). Transformation ensure data consistency và format compliance.

- **Validation Logic**: Services validate business rules và constraints. Validation logic check business-specific rules như inventory availability, price consistency, order constraints.

- **Orchestration**: Services orchestrate operations giữa multiple repositories và services. Services coordinate complex operations như tạo đơn hàng (tạo order, tạo orderItems, update inventory, update cart).

**Service Design:**

- **Stateless Services**: Services là stateless (không lưu trữ state), mỗi method call là independent. State được lưu trong database hoặc cache, không trong service instances.

- **Dependency Injection**: Services inject repositories và other services thông qua constructor injection. Dependencies được resolve bởi NestJS DI container.

- **Error Handling**: Services handle errors và throw appropriate exceptions. Custom exceptions được throw với meaningful error messages.

- **Transaction Management**: Services quản lý transactions cho complex operations. Transactions ensure atomicity cho operations involve multiple database operations.

**Business Logic cho Domain Nông Nghiệp:**

Domain nông nghiệp có business logic đặc thù được implement trong services:

- **Kiểm Tra Tính Khả Dụng Theo Mùa Vụ**: Service kiểm tra mùa vụ hiện tại và so sánh với mùa vụ của sản phẩm. Sản phẩm chỉ available trong mùa vụ của nó. Service filter products based on current season.

- **Quản Lý Hạn Sử Dụng và Cảnh Báo**: Service tính toán thời gian còn lại dựa trên ngày thu hoạch và ngày hết hạn. Service cảnh báo admin khi sản phẩm sắp hết hạn (ví dụ: 3 ngày trước). Service tự động ẩn sản phẩm đã hết hạn.

- **Tính Toán Giá Cả Theo Số Lượng**: Service tính toán giá cả dựa trên số lượng mua. Giá có thể khác nhau cho retail và wholesale. Service apply tier pricing nếu có (ví dụ: 1-10 items: giá A, 11-50 items: giá B, 51+ items: giá C).

- **Quản Lý Kho Hàng Theo FIFO**: Service ưu tiên bán sản phẩm sắp hết hạn trước (FIFO - First In First Out). Service sort products theo expiry date khi query. Service ensure older products được sell trước newer products.

- **Validation Logic**: Service validate business rules:
  - Inventory availability: Check quantity trước khi allow order
  - Price consistency: Validate price không negative và reasonable
  - Order constraints: Validate order có ít nhất một item, total amount > 0

- **Transaction Management**: Service quản lý transactions cho complex operations:
  - Tạo đơn hàng: Tạo order, tạo orderItems, update inventory, update cart trong một transaction
  - Update product: Update product và invalidate related caches trong một transaction

### 4.2.5. Repository Implementation

**Repository Pattern:**

- TypeORM repositories
- Base repository methods: find, findOne, save, delete
- Custom query methods cho complex queries
- Query builder cho dynamic queries

**Custom Repository Methods:**

- Tìm sản phẩm theo mùa vụ
- Tìm sản phẩm sắp hết hạn
- Tìm sản phẩm theo nguồn gốc
- Tìm sản phẩm theo chứng nhận

### 4.2.6. Entity và Database Configuration

**Entity Definition:**

- Sử dụng @Entity() decorator
- Columns với @Column()
- Primary keys với @PrimaryGeneratedColumn()
- Relationships với @OneToOne, @OneToMany, @ManyToOne, @ManyToMany

**Entity cho Domain Nông Nghiệp:**

- Product entity với các fields đặc thù
- Category entity với self-referencing
- Order entity với delivery requirements
- Inventory entity với batch tracking

**Database Configuration:**

- TypeORM DataSource configuration
- Connection pooling
- Migration configuration
- Seed data configuration

### 4.2.7. Authentication và Authorization

Authentication và authorization được implement để protect API endpoints và ensure only authorized users có thể access resources.

**Authentication Implementation:**

- **JWT-Based Authentication**: JWT (JSON Web Tokens) được sử dụng cho stateless authentication. JWT tokens chứa user info (id, email, role) và được sign với secret key. Tokens được send trong Authorization header.

- **Password Hashing với bcrypt**: Passwords được hash với bcrypt algorithm trước khi store trong database. Bcrypt tự động generate salt và include trong hash. Bcrypt rounds được set để balance security và performance (typically 10-12 rounds).

- **Token Generation và Validation**: Token generation và validation được handle bởi AuthService:
  - Generate access token với short expiration (15-30 phút)
  - Generate refresh token với longer expiration (7-30 ngày)
  - Validate tokens và extract user info
  - Verify token signature và expiration

- **Refresh Token Mechanism**: Refresh token mechanism để allow users maintain sessions:
  - Refresh tokens được store securely (database hoặc Redis)
  - Refresh endpoint để get new access tokens
  - Token rotation: New refresh token được issue khi refresh access token
  - Revoke tokens khi logout hoặc security breach

**Authorization Implementation:**

- **Role-Based Guards**: Role-based guards check user roles trước khi allow access. Guards được apply ở controller level hoặc route level với @UseGuards() decorator.

- **Permission-Based Guards**: Permission-based guards check specific permissions. Guards verify user có required permissions cho action. Permissions được define cho specific resources và actions.

- **Route Protection**: Route protection với guards:
  - Public routes: Không require authentication
  - Protected routes: Require authentication
  - Admin routes: Require admin role
  - Resource-specific routes: Check resource ownership

- **Resource Ownership Checks**: Resource ownership checks để ensure users chỉ có thể access resources của họ:
  - Users chỉ có thể view và update orders của họ
  - Users chỉ có thể view và update profile của họ
  - Admin có thể access all resources

### 4.2.8. Error Handling và Validation

**Error Handling:**

- Global exception filters
- Custom exception classes
- Error response formatting
- Error logging

**Validation:**

- DTOs với class-validator
- Validation pipes
- Custom validators
- Error messages

## 4.3. Triển Khai Frontend

### 4.3.1. Cấu Trúc Dự Án Nuxt 4

**File Structure:**

```
app/
├── app.vue
├── nuxt.config.ts
├── layouts/          # Layout components
├── pages/            # Page components (auto-routing)
├── components/        # Reusable components
├── composables/       # Composable functions
├── assets/            # Static assets
└── public/            # Public files
```

### 4.3.2. Layout Components

Layout components định nghĩa cấu trúc chung của pages và provide consistent UI across application.

**Layout Types:**

- **default.vue**: Layout mặc định cho trang chủ và các trang công khai. Layout bao gồm header với navigation, main content area, và footer. Layout được sử dụng cho public pages như home, about, contact.

- **shop.vue**: Layout cho trang shop với breadcrumbs. Layout extend default layout và add breadcrumb navigation. Breadcrumbs help users understand current location và navigate back. Layout được sử dụng cho shop pages như product listing, product detail, category pages.

- **admin.vue**: Layout cho admin panel với sidebar và navbar. Layout có sidebar navigation cho admin features và top navbar với user info và notifications. Layout được sử dụng cho tất cả admin pages.

- **account.vue**: Layout cho trang tài khoản người dùng. Layout có sidebar navigation cho account features (profile, orders, settings) và main content area. Layout được sử dụng cho user account pages.

**Layout Features:**

- **Navigation Headers**: Navigation headers với logo, main navigation menu, và user actions (login, cart, account). Headers responsive và collapse trên mobile devices.

- **Footers**: Footers với links, contact information, và social media links. Footers provide additional navigation và information.

- **Sidebars (cho admin)**: Sidebars cho admin panel với navigation menu cho admin features. Sidebars có collapsible sections và active route highlighting.

- **Breadcrumbs**: Breadcrumbs tự động generate từ route hierarchy. Breadcrumbs show current location và allow navigation to parent routes.

- **Responsive Design**: Responsive design với breakpoints cho mobile, tablet, và desktop. Layouts adapt to different screen sizes với appropriate navigation patterns (hamburger menu trên mobile, full menu trên desktop).

### 4.3.3. Page Components

**Page Organization:**

- File-based routing tự động
- Dynamic routes với `[id].vue`
- Nested routes với thư mục con

**Key Pages:**

- **index.vue**: Trang chủ với hero banner, featured products
- **shop.vue**: Trang danh sách sản phẩm với filtering
- **product/[id].vue**: Trang chi tiết sản phẩm
- **admin/**: Các trang quản trị
- **account/**: Các trang tài khoản người dùng

### 4.3.4. Reusable Components

**UI Components:**

- ProductCard: Hiển thị thông tin sản phẩm
- CategoryCard: Hiển thị danh mục
- FilterSidebar: Sidebar lọc sản phẩm
- ProductListingGrid: Grid hiển thị danh sách sản phẩm
- RatingStars: Hiển thị đánh giá sao
- QuantitySelector: Chọn số lượng

**Admin Components:**

- AdminDataTable: Bảng dữ liệu với search, filter, pagination
- AdminStatCard: Card hiển thị thống kê
- UPageHeader: Header cho admin pages

**Section Components:**

- HeroBanner: Banner chính
- ProductsSection: Section sản phẩm nổi bật
- CategoriesSection: Section danh mục
- FeaturesSection: Section tính năng
- TestimonialsSection: Section đánh giá

### 4.3.5. Composables và State Management

Composables và state management sử dụng Vue Composition API để manage application state và provide reusable logic.

**Composables:**

- **useProducts**: Quản lý state và logic sản phẩm:
  - State: products list, current product, loading state, error state
  - Methods: fetchProducts(), fetchProductById(), searchProducts(), filterProducts()
  - Computed: filteredProducts, sortedProducts
  - Features: pagination, filtering, sorting, caching

- **useCart**: Quản lý giỏ hàng:
  - State: cart items, cart total, cart count, loading state
  - Methods: addToCart(), updateQuantity(), removeFromCart(), clearCart()
  - Features: localStorage persistence, server sync cho logged-in users, cart validation

- **useWishlist**: Quản lý danh sách yêu thích:
  - State: wishlist items, loading state
  - Methods: addToWishlist(), removeFromWishlist(), isInWishlist()
  - Features: localStorage persistence, server sync

- **useAuth**: Quản lý authentication:
  - State: user info, isAuthenticated, loading state
  - Methods: login(), logout(), register(), refreshToken()
  - Features: token management, session persistence, auto-refresh

- **useImageAPI**: Tích hợp API hình ảnh:
  - Methods: uploadImage(), deleteImage(), getImageUrl()
  - Features: image optimization, thumbnail generation, CDN integration

- **useTableFilter**: Logic filtering cho tables:
  - State: filters, sort options, pagination
  - Methods: applyFilters(), clearFilters(), changeSort(), changePage()
  - Features: URL sync, persistence

- **useAdminData**: Data và logic cho admin:
  - Methods: fetchStats(), fetchOrders(), fetchUsers()
  - Features: real-time updates, data refresh, export functionality

**State Management:**

- **Vue Composition API**: Sử dụng Vue Composition API với `ref`, `reactive`, `computed`, và `watch` để manage state. Composition API provide better code organization và reusability.

- **Reactive State**: Reactive state với `ref` cho primitive values và `reactive` cho objects. `ref` và `reactive` provide reactivity, changes trigger re-renders automatically.

- **Computed Properties**: Computed properties cho derived state. Computed properties are cached và chỉ re-compute khi dependencies change. Computed properties improve performance và reduce redundant calculations.

- **State Persistence**: State persistence với localStorage cho client-side persistence. Sensitive state như authentication tokens được persist trong cookies với httpOnly flag. State được sync với server cho logged-in users.

### 4.3.6. API Integration

**API Client:**

- Sử dụng `$fetch` của Nuxt
- Type-safe API calls với TypeScript
- Error handling
- Loading states

**API Endpoints:**

- Products API
- Categories API
- Orders API
- Users API
- Auth API

## 4.4. Triển Khai Database

Triển khai database bao gồm schema design, migrations, và seed data. Database được implement với PostgreSQL và TypeORM.

### 4.4.1. Schema Design và Relations

**Entity Relations Implementation:**

Relations giữa entities được define với TypeORM decorators và implement trong entity classes. Relations enable TypeORM to manage relationships và generate appropriate SQL queries.

**1. Product Relations:**

- **Product ↔ Category (Many-to-One)**: Products belong to categories. Foreign key `categoryId` is created trên Product table. Relation enable querying products by category và loading category với products. `@ManyToOne()` decorator is used trên Product entity với `@JoinColumn()` để specify foreign key column.

- **Product ↔ OrderItem (One-to-Many)**: Products can be in multiple order items. Relation enable querying order items cho product và calculating product sales. `@OneToMany()` decorator is used trên Product entity để reference OrderItem collection.

- **Product ↔ Review (One-to-Many)**: Products can have multiple reviews. Relation enable querying reviews cho product và calculating average ratings. `@OneToMany()` decorator is used với cascade options để manage reviews.

**2. Order Relations:**

- **Order ↔ User (Many-to-One)**: Orders belong to users. Foreign key `userId` is created trên Order table. Relation enable querying orders by user và loading user với orders. `@ManyToOne()` decorator với eager loading option cho frequently accessed user data.

- **Order ↔ OrderItem (One-to-Many)**: Orders contain multiple order items. Relation enable querying order items cho order và calculating order totals. `@OneToMany()` decorator với cascade insert để automatically create order items khi order is created.

**3. User Relations:**

- **User ↔ Order (One-to-Many)**: Users can have multiple orders. Relation enable querying orders by user và loading user order history. `@OneToMany()` decorator is used với lazy loading để improve initial load performance.

- **User ↔ Cart (One-to-One)**: Users have one cart. Relation enable querying cart by user và managing cart items. `@OneToOne()` decorator với `@JoinColumn()` và cascade options.

**4. Category Relations:**

- **Category ↔ Product (One-to-Many)**: Categories contain multiple products. Relation enable querying products by category và loading category với products. `@OneToMany()` decorator is used với inverse side reference.

- **Category ↔ Category (Self-Referencing Many-to-One)**: Categories can have parent categories. Self-referencing relation enable hierarchical category structure. Foreign key `parentId` is created trên Category table. `@ManyToOne()` decorator reference same entity class với `@JoinColumn()`.

**Join Strategies Implementation:**

**1. Eager Loading Strategy:**

- **Always-Loaded Relations**: Relations với `eager: true` are loaded automatically. Eager loading is used cho relations that are always needed, such as product category. Eager loading reduce query count nhưng can load unnecessary data.

- **Query Builder Eager Loading**: Use `leftJoinAndSelect()` hoặc `innerJoinAndSelect()` trong Query Builder để load relations explicitly. Query Builder eager loading provide control over which relations to load và enable selective loading.

- **Find Options**: Use `relations` option trong `find()` methods để specify relations to load. Relations option enable selective eager loading without modifying entity definitions.

**2. Lazy Loading Strategy:**

- **Default Behavior**: Relations without `eager: true` are lazy-loaded. Lazy loading improve initial load performance by loading relations only khi needed.

- **Promise-Based Access**: Lazy relations return Promises. Promises are resolved khi relation is accessed. Promise-based loading enable on-demand data fetching.

- **Prevent N+1**: Use Query Builder với joins để prevent N+1 query problem. Query Builder joins load relations efficiently trong single query instead of multiple queries.

**3. Query Builder Join Strategies:**

- **INNER JOIN**: Use `innerJoinAndSelect()` cho required relations. INNER JOIN ensure related data exists và filter out entities without relations. INNER JOIN is efficient cho required relationships.

- **LEFT JOIN**: Use `leftJoinAndSelect()` cho optional relations. LEFT JOIN include all entities regardless of related data. LEFT JOIN is useful cho optional relationships và when need all entities.

- **Multiple Joins**: Chain multiple joins để load multiple relations. Multiple joins enable loading complex relationship graphs trong single query. Join order is optimized để minimize intermediate result sizes.

- **Nested Relations**: Use dot notation để join nested relations (e.g., `product.category.parent`). Nested relations enable loading deep relationship trees. Nested joins require careful optimization để avoid performance issues.

**Join Performance Optimization:**

- **Index Foreign Keys**: All foreign key columns are indexed. Foreign key indexes improve join performance significantly by enabling fast lookups. Indexes are created automatically by TypeORM hoặc explicitly trong migrations.

- **Composite Indexes**: Create composite indexes cho frequently joined columns. Composite indexes optimize multi-column joins và improve query performance. Composite indexes are created cho common join patterns.

- **Selective Loading**: Load only needed relations. Selective loading reduce data transfer và improve performance. Use Query Builder để specify exactly which relations to load.

- **Join Order**: Optimize join order trong Query Builder. Optimal join order minimize intermediate result sizes và improve query execution time. Join most selective tables first để filter data early.

**Relation Examples trong Code:**

**Example 1: Product với Category (Many-to-One):**

Product entity define many-to-one relation với Category using `@ManyToOne()` decorator. Relation enable loading category với product và querying products by category. Foreign key `categoryId` is automatically created. Query Builder use `leftJoinAndSelect('product.category', 'category')` để load category data efficiently.

**Example 2: Order với OrderItems (One-to-Many):**

Order entity define one-to-many relation với OrderItem using `@OneToMany()` decorator. Relation enable loading order items với order và calculating order totals. OrderItems reference order through foreign key. Cascade insert option automatically create order items khi order is saved.

**Example 3: Category Hierarchy (Self-Referencing):**

Category entity define self-referencing many-to-one relation using `@ManyToOne()` decorator referencing same entity. Relation enable hierarchical category structure với parent-child relationships. Self-referencing relation use `parentId` foreign key. Query Builder use recursive queries hoặc multiple joins để load category tree.

**Example 4: Query với Multiple Joins:**

Query Builder use multiple joins để load relations efficiently. Example query joins products với categories, order items, và reviews trong single query. Multiple joins avoid N+1 query problem và improve performance. Join order is optimized để minimize intermediate result sizes.

**Example 5: Dynamic Join Selection:**

Query Builder enable dynamic join selection based on query parameters. Relations are joined only khi needed, reducing unnecessary data loading. Dynamic joins improve performance cho queries với optional relations.

### 4.4.1.1. Schema Design

Schema design định nghĩa structure của database tables và relationships. Schema được design để optimize performance và ensure data integrity.

**Tables:**

- **users**: Thông tin người dùng với fields: id, email, password (hashed), name, role, phone, address (JSONB), createdAt, updatedAt. Table có unique constraint trên email và index trên role.

- **products**: Thông tin sản phẩm với fields: id, name, description, price, images (JSONB array), slug, status, quantity, harvestDate, expiryDate, origin, certifications (JSONB array), grade, storageRequirements (JSONB object), season, availabilityPeriod, categoryId (foreign key), createdAt, updatedAt. Table có indexes trên categoryId, status, (categoryId, status), (harvestDate, expiryDate), và full-text index trên (name, description).

- **categories**: Danh mục sản phẩm với fields: id, name, description, slug, image, parentId (nullable, foreign key), createdAt, updatedAt. Table có unique constraint trên slug và index trên parentId.

- **orders**: Đơn hàng với fields: id, status, totalAmount, shippingAddress (JSONB object), deliveryTimeWindow, specialInstructions, shippingMethod, shippingCost, userId (foreign key), createdAt, updatedAt. Table có indexes trên userId, status, (userId, createdAt), và createdAt.

- **order_items**: Chi tiết đơn hàng với fields: id, quantity, price, subtotal, orderId (foreign key), productId (foreign key), createdAt. Table có indexes trên orderId và productId.

- **carts**: Giỏ hàng với fields: id, userId (nullable, foreign key), createdAt, updatedAt. Table có index trên userId.

- **cart_items**: Chi tiết giỏ hàng với fields: id, quantity, cartId (foreign key), productId (foreign key), createdAt. Table có indexes trên cartId và productId.

- **reviews**: Đánh giá sản phẩm với fields: id, rating, comment, userId (foreign key), productId (foreign key), createdAt, updatedAt. Table có indexes trên productId, userId, và rating.

**Schema Features:**

- **Foreign Keys**: Foreign keys cho relationships ensure referential integrity. Foreign keys có cascade options (CASCADE, SET NULL, RESTRICT) tùy business logic.

- **Indexes**: Indexes cho performance trên frequently queried columns và foreign keys. Composite indexes cho queries với multiple WHERE conditions. Full-text indexes cho search functionality.

- **Constraints**: Constraints cho data integrity:
  - Primary keys: Ensure uniqueness
  - Unique constraints: Ensure unique values (email, slug)
  - Check constraints: Validate data ranges (rating 1-5, price > 0)
  - Not null constraints: Ensure required fields

- **Timestamps**: Timestamps (created_at, updated_at) được auto-manage bởi TypeORM. Timestamps help track changes và support auditing.

### 4.4.2. Migrations

Migrations quản lý schema changes theo thời gian và ensure database version control.

**Migration System:**

- **TypeORM Migrations**: TypeORM migrations cho version control của schema changes. Migrations được generate từ entity changes hoặc created manually.

- **Version Control**: Migrations provide version control cho database schema. Mỗi migration đại diện cho một version của schema. Migrations được track trong database với migration table.

- **Up và Down Migrations**: Migrations có up() và down() methods:
  - up(): Apply migration (forward migration)
  - down(): Revert migration (rollback migration)
  - Down migrations allow rollback nếu có issues

- **Migration Naming Conventions**: Migration naming conventions để ensure order và clarity:
  - Format: `{timestamp}-{description}`
  - Example: `1234567890-CreateUsersTable`
  - Timestamps ensure chronological order

**Migration Workflow:**

1. **Generate Migration**: Generate migration từ entity changes với TypeORM CLI. CLI analyze entity changes và generate migration file với up() và down() methods.

2. **Review Generated SQL**: Review generated SQL trong migration file để ensure correctness. Check for potential issues như data loss, constraint violations, và performance impacts.

3. **Test Migration trên Development**: Test migration trên development database trước khi apply trên production. Test cả up() và down() methods để ensure rollback works.

4. **Apply Migration trên Production**: Apply migration trên production database sau khi tested. Migrations được apply trong transaction để ensure atomicity. Backup database trước khi apply migrations.

### 4.4.3. Seed Data

Seed data populate initial data cho development và testing.

**Seed Data:**

- **Initial Categories**: Initial categories cho product organization. Categories include main categories và subcategories với proper hierarchy. Categories có images và descriptions.

- **Sample Products**: Sample products với realistic data cho agriculture domain. Products có đầy đủ thông tin bao gồm agriculture-specific fields (harvestDate, expiryDate, origin, certifications, grade). Products được assign to categories.

- **Admin User**: Admin user với credentials để access admin panel. Admin user có full permissions và role. Password được hash với bcrypt.

- **Test Data cho Development**: Test data cho development và testing:
  - Test users với different roles
  - Test orders với different statuses
  - Test reviews và ratings
  - Test cart data

**Seed Execution:**

- Seeds được execute với TypeORM seed command
- Seeds có thể be run multiple times với idempotent logic
- Seeds support different environments (development, testing, staging)

## 4.5. Triển Khai Caching với Redis

Caching strategy là một phần quan trọng của performance optimization, giúp reduce database load và improve response times. Redis được sử dụng như in-memory cache store để cache frequently accessed data và manage sessions.

### 4.5.1. Redis Configuration

**Connection Configuration:**

- **Host và Port**: Configure Redis server host và port. Default là localhost:6379. Configuration được store trong environment variables.

- **Password Authentication**: Configure password authentication cho Redis nếu required. Password protect Redis instance từ unauthorized access.

- **Database Selection**: Select Redis database number (0-15). Different databases có thể be used cho different purposes (cache, sessions, queues).

- **Connection Timeout**: Configure connection timeout để handle network issues. Timeout prevent hanging connections.

**Connection Pooling:**

- **Pool Size**: Configure connection pool size để manage connections efficiently. Pool size balance giữa resource usage và performance.

- **Connection Reuse**: Reuse connections từ pool để avoid connection overhead. Connection reuse improve performance và reduce resource usage.

- **Idle Timeout**: Configure idle timeout để close unused connections. Idle timeout free resources và prevent connection leaks.

**Error Handling:**

- **Connection Errors**: Handle connection errors gracefully. Errors include network failures, authentication failures, và server unavailability.

- **Retry Logic**: Implement retry logic cho transient errors. Retry logic handle temporary network issues và improve resilience.

- **Fallback Strategy**: Implement fallback strategy khi Redis unavailable. Fallback strategy ensure application continue to work without cache.

**Reconnection Logic:**

- **Automatic Reconnection**: Implement automatic reconnection khi connection lost. Reconnection logic restore connection và resume operations.

- **Exponential Backoff**: Use exponential backoff cho reconnection attempts. Exponential backoff prevent overwhelming server với reconnection attempts.

- **Health Checks**: Implement health checks để monitor Redis connection. Health checks detect connection issues early.

### 4.5.2. Caching Implementation

**Cache-Aside Pattern:**

Cache-Aside pattern là caching strategy được sử dụng trong dự án. Pattern hoạt động như sau:

1. **Check Cache**: Application check cache trước khi query database. Cache check is fast và reduce database load.

2. **Cache Hit**: Nếu data found trong cache, return cached data. Cache hit provide fast response times.

3. **Cache Miss**: Nếu data not found trong cache, query database. Database query retrieve fresh data.

4. **Update Cache**: Sau khi retrieve data từ database, store data trong cache. Cache update enable future cache hits.

5. **Cache Invalidation**: Invalidate cache khi data changes. Invalidation ensure cache consistency.

**Cache Keys - Định Danh Bộ Nhớ Đệm:**

Cache keys được design với consistent naming convention để enable easy management và invalidation:

- **Product Data**: `product:{id}` - Cache individual product data. Key include product ID để enable direct access.

- **Category Data**: `category:{id}` - Cache category information. Key include category ID.

- **Product List**: `products:list:{filters}` - Cache product lists với filters. Key include filter parameters để enable filtered caching.

- **Product Search**: `products:search:{query}:{page}:{limit}` - Cache search results. Key include search query và pagination parameters.

- **Session Data**: `session:{sessionId}` - Cache user session data. Key include session ID.

- **User Data**: `user:{id}` - Cache user information. Key include user ID.

**Cache Key Naming Convention:**

- **Hierarchical Structure**: Use hierarchical structure với colons (:) để separate levels. Structure enable pattern-based invalidation.

- **Consistent Format**: Use consistent format cho similar data types. Consistency improve maintainability.

- **Versioning**: Include version numbers trong keys nếu needed. Versioning enable cache migration và invalidation.

**Cache Operations - Các Thao Tác:**

**1. Get Operation:**

- **Get Single Key**: Get data từ cache với single key. Operation is fast và efficient.

- **Get Multiple Keys**: Get data từ multiple keys với MGET command. Batch operations improve performance.

- **Get with Fallback**: Get data từ cache với fallback to database. Fallback ensure data availability.

**2. Set Operation:**

- **Set with TTL**: Set data trong cache với Time-To-Live (TTL). TTL ensure cache freshness và automatic expiration.

- **Set without TTL**: Set data trong cache without expiration. Permanent cache require manual invalidation.

- **Set if Not Exists**: Set data only nếu key not exists. Conditional set prevent overwriting existing data.

**3. Delete Operation:**

- **Delete Single Key**: Delete single key từ cache. Deletion invalidate specific cache entry.

- **Delete Multiple Keys**: Delete multiple keys với pattern matching. Batch deletion enable efficient invalidation.

- **Delete Pattern**: Delete all keys matching pattern. Pattern deletion enable bulk invalidation.

**4. Invalidation:**

- **Explicit Invalidation**: Explicitly invalidate cache khi data changes. Invalidation ensure cache consistency.

- **Pattern-Based Invalidation**: Invalidate cache entries matching pattern. Pattern-based invalidation enable bulk operations.

- **Cascade Invalidation**: Invalidate related cache entries. Cascade invalidation ensure consistency across related data.

**TTL Strategy - Chiến Lược Thời Gian Sống:**

- **Short TTL (1-5 minutes)**: Use short TTL cho frequently changing data. Short TTL ensure freshness cho dynamic data.

- **Medium TTL (15-60 minutes)**: Use medium TTL cho moderately changing data. Medium TTL balance giữa freshness và performance.

- **Long TTL (1-24 hours)**: Use long TTL cho rarely changing data. Long TTL maximize cache hits cho static data.

- **No TTL**: Use no TTL cho very static data. No TTL require manual invalidation.

**Cache Warming - Làm Nóng Bộ Nhớ Đệm:**

- **Preload Frequently Accessed Data**: Preload frequently accessed data vào cache. Preloading improve initial response times.

- **Background Refresh**: Refresh cache trong background trước khi expiration. Background refresh ensure cache availability.

- **Predictive Caching**: Cache data based on usage patterns. Predictive caching improve cache hit rates.

### 4.5.3. Session Management

**Session Storage:**

- **Session Data Structure**: Store session data như JSON trong Redis. JSON structure enable flexible session data.

- **Session ID Generation**: Generate unique session IDs với secure random generation. Unique IDs prevent session hijacking.

- **Session Expiration**: Set session expiration time. Expiration ensure sessions expire after inactivity.

**Session Operations:**

- **Create Session**: Create new session với initial data. Session creation include ID generation và data storage.

- **Get Session**: Retrieve session data từ Redis. Session retrieval is fast với Redis.

- **Update Session**: Update session data. Updates are atomic và consistent.

- **Delete Session**: Delete session khi user logs out. Deletion free resources và invalidate session.

**Session Expiration:**

- **TTL-Based Expiration**: Use TTL để automatically expire sessions. TTL-based expiration ensure sessions expire after inactivity.

- **Sliding Expiration**: Extend session expiration on activity. Sliding expiration keep active sessions alive.

- **Absolute Expiration**: Set absolute expiration time. Absolute expiration ensure sessions expire at specific time.

**Distributed Sessions:**

- **Multi-Server Support**: Support sessions across multiple servers. Distributed sessions enable horizontal scaling.

- **Session Synchronization**: Synchronize sessions across servers. Synchronization ensure consistency.

- **Load Balancing**: Use load balancing với sticky sessions hoặc shared session store. Load balancing distribute load và maintain sessions.

### 4.5.4. Message Queue và Event-Driven Architecture

**Message Queue Concept:**

Message Queue là một pattern cho asynchronous communication giữa services. Messages được sent vào queue và processed bởi consumers. Message Queue enable decoupling, scalability, và reliability.

**Redis như Message Queue:**

Redis có thể be used như message queue với Pub/Sub hoặc Lists:

- **Pub/Sub**: Publish-subscribe pattern cho real-time messaging. Pub/Sub enable one-to-many messaging.

- **Lists**: Use Lists như queues với LPUSH/RPOP operations. Lists provide FIFO queue behavior.

- **Streams**: Use Redis Streams cho event streaming. Streams provide persistent, ordered message streams.

**Event-Driven Architecture:**

- **Event Producers**: Services produce events khi actions occur. Events represent state changes và business events.

- **Event Consumers**: Services consume events và react. Consumers process events và update state.

- **Event Bus**: Event bus route events từ producers đến consumers. Event bus enable loose coupling.

**Message Queue Use Cases:**

- **Order Processing**: Process orders asynchronously. Asynchronous processing improve response times và enable retry logic.

- **Email Notifications**: Send emails asynchronously. Asynchronous email sending prevent blocking requests.

- **Inventory Updates**: Update inventory asynchronously. Asynchronous updates enable eventual consistency.

- **Analytics Events**: Collect analytics events asynchronously. Asynchronous collection improve performance.

**Message Queue Patterns:**

- **Producer-Consumer**: Producers send messages, consumers process messages. Pattern enable decoupling và scalability.

- **Pub/Sub**: Publishers publish messages, subscribers receive messages. Pattern enable one-to-many communication.

- **Request-Reply**: Request messages, reply messages. Pattern enable synchronous-like communication với async benefits.

**Message Queue Best Practices:**

- **Idempotency**: Ensure message processing is idempotent. Idempotency prevent duplicate processing.

- **Error Handling**: Handle errors gracefully với retry logic. Error handling ensure message processing reliability.

- **Dead Letter Queue**: Use dead letter queue cho failed messages. Dead letter queue enable manual processing và debugging.

- **Message Ordering**: Ensure message ordering nếu required. Ordering ensure correct processing sequence.

- **Monitoring**: Monitor queue length và processing rates. Monitoring enable proactive issue detection.

## 4.6. Testing Strategy và Quality Assurance

Testing strategy và Quality Assurance đảm bảo code quality, reliability, và conformance với requirements. Testing được implement ở multiple levels với comprehensive coverage để ensure system works correctly và meets quality standards. Quality Assurance process include code reviews, automated testing, và continuous monitoring.

### 4.6.1. Unit Testing

Unit testing test individual components và functions in isolation.

**Backend Unit Tests:**

- **Service Tests với Mocked Repositories**: Service tests với mocked repositories để test business logic independently. Mocks simulate repository behavior và allow testing service logic without database. Tests cover business rules, validation logic, và error handling.

- **Controller Tests với Mocked Services**: Controller tests với mocked services để test HTTP handling independently. Mocks simulate service behavior và allow testing controller logic without business logic. Tests cover request handling, parameter extraction, và response formatting.

- **Repository Tests với Test Database**: Repository tests với test database để test data access logic. Tests use in-memory database hoặc test database instance. Tests cover CRUD operations, custom queries, và relationships.

- **Utility Function Tests**: Utility function tests để test helper functions và utilities. Tests cover edge cases, error handling, và return values.

**Frontend Unit Tests:**

- **Component Tests với Vitest**: Component tests với Vitest và Vue Test Utils. Tests render components và test component behavior. Tests cover props, events, slots, và component logic.

- **Composable Tests**: Composable tests để test composable functions. Tests cover state management, side effects, và return values. Tests use Vue Test Utils để setup component context.

- **Utility Function Tests**: Utility function tests để test helper functions. Tests cover function logic, edge cases, và return values.

### 4.6.2. Integration Testing

Integration testing test interactions giữa components và systems.

**Backend Integration Tests:**

- **API Endpoint Tests**: API endpoint tests để test complete request-response cycle. Tests use test database và test HTTP requests. Tests cover authentication, authorization, validation, và business logic.

- **Database Integration Tests**: Database integration tests để test database operations với real database. Tests use test database instance và test transactions, relationships, và constraints.

- **Authentication/Authorization Tests**: Authentication/Authorization tests để test security features. Tests cover login, logout, token refresh, role-based access, và permission checks.

**Frontend Integration Tests:**

- **Page Component Tests**: Page component tests để test complete pages với all components. Tests use test API mocks và test page behavior. Tests cover navigation, data fetching, và user interactions.

- **API Integration Tests**: API integration tests để test API calls và responses. Tests use test API server hoặc mocks. Tests cover request formatting, response handling, và error scenarios.

- **User Flow Tests**: User flow tests để test complete user workflows. Tests cover multi-step processes như checkout flow, product search, và account management.

### 4.6.3. E2E Testing

E2E (End-to-End) testing test complete application workflows từ user perspective.

**E2E Tests:**

- **Complete User Workflows**: Complete user workflows như:
  - User registration và login
  - Product browsing và search
  - Add to cart và checkout
  - Order placement và tracking
  - Product review submission

- **Admin Workflows**: Admin workflows như:
  - Product management (create, update, delete)
  - Order management (view, update status)
  - User management
  - Dashboard và statistics

- **Error Scenarios**: Error scenarios như:
  - Invalid input handling
  - Network errors
  - Authentication failures
  - Authorization failures
  - Server errors

- **Performance Tests**: Performance tests để measure response times và throughput. Tests identify performance bottlenecks và ensure system meets performance requirements.

### 4.6.4. API Testing với Postman

**Postman - API Testing Tool:**

Postman là một powerful tool cho API testing, development, và documentation. Postman enable developers test APIs, create test collections, và automate testing workflows.

**Postman Collections:**

- **Request Organization**: Organize requests vào collections. Collections group related requests và enable easy management.

- **Environment Variables**: Use environment variables cho different environments (development, staging, production). Variables enable easy configuration switching.

- **Request Templates**: Create request templates cho common operations. Templates reduce setup time và ensure consistency.

**API Testing Workflows:**

**1. Manual Testing:**

- **Send Requests**: Send HTTP requests với different methods (GET, POST, PUT, DELETE). Manual testing enable quick API exploration.

- **View Responses**: View response status, headers, và body. Response inspection enable validation và debugging.

- **Test Different Scenarios**: Test different scenarios với various inputs. Scenario testing ensure API robustness.

**2. Automated Testing:**

- **Test Scripts**: Write test scripts trong Postman để validate responses. Test scripts enable automated validation.

- **Assertions**: Use assertions để check response status, data, và structure. Assertions ensure API correctness.

- **Test Collections**: Run entire test collections automatically. Collections enable comprehensive API testing.

**3. Integration Testing:**

- **Multi-Request Workflows**: Create workflows với multiple requests. Workflows test complete user scenarios.

- **Data Flow**: Pass data giữa requests trong workflows. Data flow enable end-to-end testing.

- **Dependencies**: Handle dependencies giữa requests. Dependencies ensure correct test execution order.

**Postman Test Examples:**

**Example 1: Authentication Testing:**

- **Login Request**: Test login endpoint với credentials. Request validate authentication flow.

- **Token Extraction**: Extract token từ response. Token extraction enable authenticated requests.

- **Token Usage**: Use token trong subsequent requests. Token usage test authenticated endpoints.

**Example 2: CRUD Operations:**

- **Create**: Test POST request để create resource. Create test validate resource creation.

- **Read**: Test GET request để retrieve resource. Read test validate data retrieval.

- **Update**: Test PUT request để update resource. Update test validate data modification.

- **Delete**: Test DELETE request để delete resource. Delete test validate resource removal.

**Example 3: Error Handling:**

- **Invalid Input**: Test với invalid input data. Invalid input test validate error handling.

- **Missing Fields**: Test với missing required fields. Missing fields test validate validation logic.

- **Unauthorized Access**: Test với invalid authentication. Unauthorized access test validate security.

**Postman Best Practices:**

- **Organize Collections**: Organize collections logically. Organization improve maintainability.

- **Use Environments**: Use environments cho different configurations. Environments enable easy switching.

- **Document Requests**: Document requests với descriptions. Documentation improve understanding.

- **Version Control**: Version control Postman collections. Version control enable collaboration và history tracking.

- **Automate Testing**: Automate testing với test scripts. Automation improve efficiency và reliability.

**Postman trong CI/CD:**

- **Newman**: Use Newman (Postman CLI) để run collections trong CI/CD. Newman enable automated API testing.

- **Integration**: Integrate Postman tests vào CI/CD pipeline. Integration ensure API quality.

- **Reporting**: Generate test reports từ Postman runs. Reporting provide visibility vào test results.

## 4.7. Performance Optimization

### 4.7.1. Database Optimization

**Query Optimization:**

- Index usage
- Query analysis với EXPLAIN
- Avoid N+1 queries
- Select specific columns

**Connection Pooling:**

- Configure pool size
- Connection reuse
- Timeout configuration

### 4.7.2. API Optimization

**Response Optimization:**

- Response compression
- Pagination
- Field selection
- Async processing

### 4.7.3. Frontend Optimization

**Build Optimization:**

- Code splitting
- Tree shaking
- Minification
- Image optimization

**Runtime Optimization:**

- Lazy loading components
- Virtual scrolling
- Debouncing và throttling
- Memoization

## 4.8. Quy Trình Cài Đặt và Triển Khai

Quy trình cài đặt và triển khai từ development environment đến production environment là một phần quan trọng của software development lifecycle. Quy trình này đảm bảo application được setup correctly, tested thoroughly, và deployed reliably.

### 4.8.1. Development Environment Setup - Thiết Lập Môi Trường Phát Triển

**Prerequisites - Yêu Cầu Hệ Thống:**

- **Node.js**: Install Node.js version 18.x hoặc higher. Node.js provide JavaScript runtime cho backend application.

- **npm hoặc yarn**: Package manager cho dependency management. npm comes với Node.js, yarn can be installed separately.

- **PostgreSQL**: Install PostgreSQL version 14.x hoặc higher. PostgreSQL serve như primary database.

- **Redis**: Install Redis version 6.x hoặc higher. Redis serve như cache và session store.

- **Git**: Install Git cho version control. Git enable code management và collaboration.

- **Docker (Optional)**: Install Docker cho containerization. Docker enable consistent environments across development và production.

**Project Setup - Thiết Lập Dự Án:**

**1. Clone Repository:**

- Clone project repository từ version control system. Repository contains source code, configuration files, và documentation.

- Checkout appropriate branch (main, develop, hoặc feature branch). Branch selection depend on development workflow.

**2. Install Dependencies:**

- **Backend Dependencies**: Navigate to backend directory và run `npm install`. Installation download và install all required packages từ package.json.

- **Frontend Dependencies**: Navigate to frontend directory và run `npm install`. Installation setup frontend dependencies.

- **Root Dependencies**: Install root-level dependencies nếu using monorepo. Root dependencies include shared tools và configurations.

**3. Environment Configuration:**

- **Copy Environment Files**: Copy `.env.example` to `.env` cho each application. Environment files contain configuration variables.

- **Configure Variables**: Set appropriate values cho environment variables:
  - Database connection strings
  - Redis connection details
  - JWT secrets
  - API keys
  - Port numbers
  - Feature flags

- **Environment-Specific Configs**: Create separate environment files cho different environments (development, staging, production).

**4. Database Setup:**

- **Create Database**: Create PostgreSQL database với appropriate name. Database name should match environment (e.g., `ecom_dev`, `ecom_staging`, `ecom_prod`).

- **Run Migrations**: Execute database migrations với `npm run migration:run`. Migrations create tables, indexes, và constraints.

- **Seed Data**: Run seed scripts với `npm run seed:run`. Seed data populate database với initial data (categories, admin user, sample products).

**5. Redis Setup:**

- **Start Redis Server**: Start Redis server với `redis-server`. Redis server listen trên default port 6379.

- **Verify Connection**: Test Redis connection với `redis-cli ping`. Connection test ensure Redis is accessible.

**6. Start Development Servers:**

- **Backend Server**: Start backend server với `npm run start:dev`. Development server enable hot reload và debugging.

- **Frontend Server**: Start frontend server với `npm run dev`. Frontend server enable hot module replacement.

- **Verify Setup**: Access application tại configured URLs. Verification ensure all services are running correctly.

### 4.8.2. Build Process - Quy Trình Build

**Backend Build:**

- **TypeScript Compilation**: Compile TypeScript code thành JavaScript. Compilation check types và generate JavaScript output.

- **Code Optimization**: Optimize code với minification và tree shaking. Optimization reduce bundle size và improve performance.

- **Asset Processing**: Process và optimize assets (images, fonts, etc.). Asset processing improve load times.

- **Build Output**: Generate build output trong `dist` directory. Build output contains compiled code và assets.

**Frontend Build:**

- **Vite Build**: Use Vite để build frontend application. Vite provide fast builds với optimizations.

- **Code Splitting**: Split code into chunks để enable lazy loading. Code splitting improve initial load time.

- **Asset Optimization**: Optimize images, CSS, và JavaScript. Asset optimization reduce file sizes.

- **Static Generation**: Generate static files cho SSG pages. Static generation improve performance cho static content.

**Build Artifacts:**

- **Backend Artifacts**: Compiled JavaScript files, configuration files, và dependencies. Backend artifacts ready cho deployment.

- **Frontend Artifacts**: HTML, CSS, JavaScript bundles, và static assets. Frontend artifacts ready cho static hosting hoặc SSR.

### 4.8.3. Testing và Quality Assurance

**Pre-Deployment Testing:**

- **Unit Tests**: Run unit tests với `npm run test`. Unit tests verify individual components work correctly.

- **Integration Tests**: Run integration tests với `npm run test:integration`. Integration tests verify component interactions.

- **E2E Tests**: Run end-to-end tests với `npm run test:e2e`. E2E tests verify complete workflows.

- **Linting**: Run linter với `npm run lint`. Linting check code quality và style.

- **Type Checking**: Run TypeScript type checker với `npm run type-check`. Type checking verify type safety.

**Quality Gates:**

- **Test Coverage**: Ensure test coverage meets minimum threshold (e.g., 80%). Test coverage indicate code quality.

- **Code Quality**: Ensure code quality metrics meet standards. Code quality include complexity, duplication, và maintainability.

- **Security Scanning**: Scan dependencies cho security vulnerabilities. Security scanning identify và fix vulnerabilities.

### 4.8.4. Staging Environment - Môi Trường Staging

**Staging Setup:**

- **Environment Configuration**: Configure staging environment với production-like settings. Staging environment mirror production để enable realistic testing.

- **Database Setup**: Setup staging database với production-like data. Staging database enable testing với realistic data volumes.

- **Deploy Application**: Deploy application to staging environment. Deployment use same process như production để validate deployment process.

**Staging Testing:**

- **Smoke Tests**: Run smoke tests để verify basic functionality. Smoke tests ensure application starts và basic features work.

- **Regression Tests**: Run regression tests để verify no regressions. Regression tests ensure existing features still work.

- **Performance Tests**: Run performance tests để verify performance. Performance tests ensure application meets performance requirements.

- **User Acceptance Testing**: Conduct UAT với stakeholders. UAT validate application meets business requirements.

### 4.8.5. Production Deployment - Triển Khai Production

**Pre-Deployment Checklist:**

- **Backup Database**: Backup production database trước khi deployment. Backup enable rollback nếu needed.

- **Review Changes**: Review all changes trong deployment. Review ensure changes are tested và approved.

- **Communication**: Notify stakeholders về deployment schedule. Communication enable coordination và minimize impact.

- **Rollback Plan**: Prepare rollback plan cho emergency situations. Rollback plan enable quick recovery.

**Deployment Process:**

**1. Build Production Artifacts:**

- Build application với production configuration. Production build include optimizations và minification.

- Tag build với version number. Version tagging enable tracking và rollback.

**2. Containerization (nếu sử dụng Docker):**

- Build Docker images cho backend và frontend. Docker images contain application và dependencies.

- Push images to container registry. Registry enable image distribution và versioning.

**3. Database Migration:**

- Run database migrations với `npm run migration:run`. Migrations update database schema.

- Verify migrations completed successfully. Verification ensure database is in correct state.

**4. Deploy Application:**

- **Backend Deployment**: Deploy backend application to production server. Deployment can be:
  - Direct deployment to server
  - Container deployment với Docker
  - Cloud platform deployment (AWS, Azure, GCP)

- **Frontend Deployment**: Deploy frontend application:
  - Static hosting (CDN, S3, Netlify, Vercel)
  - Server deployment cho SSR
  - Container deployment

**5. Configuration:**

- **Environment Variables**: Set production environment variables. Variables include:
  - Database connection strings
  - Redis connection details
  - API keys và secrets
  - Feature flags
  - Monitoring configuration

- **Reverse Proxy**: Configure Nginx reverse proxy. Reverse proxy handle:
  - SSL termination
  - Load balancing
  - Static file serving
  - Request routing

**6. Health Checks:**

- **Application Health**: Verify application health endpoints. Health checks ensure application is running correctly.

- **Database Connection**: Verify database connectivity. Database connection is critical cho application functionality.

- **Redis Connection**: Verify Redis connectivity. Redis connection is required cho caching và sessions.

- **External Services**: Verify external service integrations. External services include payment gateways, email services, etc.

**7. Monitoring và Logging:**

- **Application Monitoring**: Setup application monitoring với tools như:
  - APM tools (New Relic, Datadog, AppDynamics)
  - Error tracking (Sentry, Rollbar)
  - Log aggregation (ELK Stack, Splunk)

- **Infrastructure Monitoring**: Monitor infrastructure với:
  - Server metrics (CPU, memory, disk, network)
  - Database metrics (connections, queries, performance)
  - Cache metrics (hit rate, memory usage)

- **Alerting**: Configure alerts cho critical issues. Alerts notify team về problems immediately.

**Post-Deployment:**

- **Smoke Tests**: Run smoke tests trên production. Smoke tests verify deployment success.

- **Monitor Metrics**: Monitor application metrics và logs. Monitoring detect issues early.

- **User Feedback**: Collect user feedback về deployment. Feedback help identify issues và improvements.

- **Documentation**: Update deployment documentation. Documentation enable future deployments.

### 4.8.6. Rollback Procedure - Quy Trình Rollback

**Rollback Triggers:**

- **Critical Errors**: Rollback nếu critical errors detected. Critical errors include:
  - Application crashes
  - Database corruption
  - Security vulnerabilities
  - Data loss

- **Performance Degradation**: Rollback nếu significant performance degradation. Performance issues impact user experience.

- **User Complaints**: Rollback nếu widespread user complaints. User complaints indicate serious issues.

**Rollback Process:**

1. **Stop Deployment**: Stop current deployment process. Stopping prevent further issues.

2. **Restore Previous Version**: Restore previous version từ backup hoặc version control. Restoration restore working state.

3. **Database Rollback**: Rollback database migrations nếu needed. Database rollback restore previous schema.

4. **Verify Rollback**: Verify rollback success với health checks. Verification ensure application is working.

5. **Communication**: Notify stakeholders về rollback. Communication keep stakeholders informed.

6. **Post-Mortem**: Conduct post-mortem để identify root cause. Post-mortem enable prevention của future issues.

### 4.8.7. Continuous Deployment - Triển Khai Liên Tục

**CI/CD Pipeline:**

- **Source Control**: Code changes trigger CI/CD pipeline. Source control enable automated workflows.

- **Automated Testing**: Run automated tests trong CI pipeline. Automated testing catch issues early.

- **Automated Build**: Build application automatically. Automated build ensure consistent builds.

- **Automated Deployment**: Deploy to staging automatically. Automated deployment reduce manual errors.

- **Production Deployment**: Deploy to production với approval. Production deployment require manual approval cho safety.

**Deployment Strategies:**

- **Blue-Green Deployment**: Maintain two identical environments. Switch traffic between environments để enable zero-downtime deployment.

- **Canary Deployment**: Deploy to subset of servers first. Gradually increase traffic to new version để validate stability.

- **Rolling Deployment**: Deploy to servers gradually. Rolling deployment minimize downtime và enable gradual rollout.

## 4.9. Deployment và Production Setup

Deployment và production setup đảm bảo application được deploy reliably và run efficiently trong production environment.

### 4.9.1. Docker Containerization

Docker containerization package applications và dependencies vào containers để ensure consistency và portability.

**Dockerfile:**

- **Multi-Stage Builds**: Multi-stage builds để optimize image size. Build stage compile code, runtime stage chỉ contain runtime dependencies. Multi-stage builds reduce final image size significantly.

- **Layer Caching**: Layer caching để speed up builds. Layers được cache và reuse nếu không thay đổi. Order instructions để maximize cache hits (put frequently changing instructions at the end).

- **Minimal Images**: Minimal base images (Alpine Linux) để reduce image size. Minimal images contain only essential packages, reducing attack surface và image size.

- **Security Best Practices**: Security best practices:
  - Run containers với non-root user
  - Use specific image tags (not latest)
  - Scan images cho vulnerabilities
  - Keep images updated
  - Minimize exposed ports

**Docker Compose:**

- **Service Definitions**: Service definitions cho all application components (backend, frontend, database, cache, nginx). Services được configure với appropriate settings.

- **Network Configuration**: Network configuration để allow services communicate. Services có thể communicate by service name. Networks isolate services và provide security.

- **Volume Mounts**: Volume mounts cho persistent data (database data, uploads). Volumes ensure data persistence across container restarts. Volumes được manage bởi Docker.

- **Environment Variables**: Environment variables cho configuration. Variables được set trong docker-compose.yml hoặc .env file. Variables include database credentials, API keys, và feature flags.

### 4.9.2. Nginx Configuration

Nginx configuration setup reverse proxy, load balancing, và caching.

**Reverse Proxy:**

- **Upstream Configuration**: Upstream configuration để define backend servers. Upstream groups contain multiple backend instances. Load balancing algorithm được specify (round-robin, least-connections, etc.).

- **Load Balancing**: Load balancing để distribute requests across multiple backend instances. Load balancing improve performance và reliability. Health checks ensure only healthy instances receive requests.

- **SSL/TLS Configuration**: SSL/TLS configuration để handle HTTPS connections. SSL certificates được configure và auto-renew. HSTS headers được set để force HTTPS.

- **Caching Configuration**: Caching configuration để cache responses. Cache zones được define với size limits và TTL. Caching reduce backend load và improve response times.

**Performance:**

- **Worker Processes**: Worker processes configuration để optimize performance. Number of workers được set based on CPU cores. Workers handle requests concurrently.

- **Connection Limits**: Connection limits để prevent resource exhaustion. Limits include max connections per worker và connection timeouts. Limits protect server từ overload.

- **Compression**: Compression configuration để compress responses. Gzip và brotli compression reduce payload size. Compression improve transfer times và reduce bandwidth usage.

- **Keep-Alive**: Keep-Alive configuration để reuse connections. Keep-alive reduce connection overhead và improve performance. Keep-alive timeout được configure appropriately.

### 4.9.3. CI/CD Pipeline

CI/CD pipeline automate testing, building, và deployment processes.

**Continuous Integration:**

- **Automated Testing**: Automated testing trong CI pipeline. Tests được run automatically khi code được pushed. Tests include unit tests, integration tests, và linting. Pipeline fails nếu tests fail.

- **Code Quality Checks**: Code quality checks với ESLint, Prettier, và TypeScript compiler. Quality checks ensure code meets standards. Checks được run automatically và report issues.

- **Build Verification**: Build verification để ensure code compiles và builds successfully. Builds được run trong CI environment. Build artifacts được store và available cho deployment.

**Continuous Deployment:**

- **Automated Deployment**: Automated deployment sau khi CI passes. Deployment được trigger automatically hoặc manually. Deployment process include building images, pushing to registry, và updating containers.

- **Rollback Capability**: Rollback capability để revert deployments nếu có issues. Rollback restore previous version quickly. Rollback được test và documented.

- **Health Checks**: Health checks để verify deployment success. Health checks test application endpoints và functionality. Checks ensure application running correctly sau deployment.

## 4.10. Software Engineering Practices và Workflow

Software Engineering Practices và Workflow định nghĩa quy trình phát triển và best practices được áp dụng trong dự án. Practices ensure code quality, team collaboration, và project success.

### 4.10.1. Development Workflow

Development workflow định nghĩa quy trình từ development đến deployment. Workflow ensure consistency và quality throughout development process.

**Git Workflow:**

- **Feature Branch Workflow**: Feature branch workflow create branches cho each feature hoặc bug fix. Features được develop independently và merge vào main branch sau code review. Workflow enable parallel development và reduce conflicts.

- **Pull Request Process**: Pull request process include code review, automated testing, và approval. Pull requests provide opportunity cho code review và knowledge sharing. Process ensure code quality và consistency.

- **Code Review Guidelines**: Code review guidelines define what to check trong reviews. Reviews check code quality, correctness, performance, và adherence to standards. Guidelines ensure thorough và consistent reviews.

**Development Process:**

- **Sprint Planning**: Sprint planning define work cho sprint với user stories và tasks. Planning estimate effort và prioritize features. Planning ensure team aligned và committed to deliverables.

- **Daily Standups**: Daily standups sync team progress và identify blockers. Standups are brief và focus on progress, plans, và impediments. Standups improve communication và coordination.

- **Sprint Review và Retrospective**: Sprint review demonstrate completed work và gather feedback. Retrospective reflect on process và identify improvements. Review và retrospective enable continuous improvement.

### 4.10.2. Code Quality Assurance

Code Quality Assurance ensure code meet quality standards và best practices. Quality assurance include automated checks, code reviews, và metrics.

**Automated Quality Checks:**

- **Linting**: Linting check code style và catch potential errors. ESLint và Prettier enforce coding standards. Linting improve code consistency và catch bugs early.

- **Type Checking**: Type checking với TypeScript ensure type safety. Type checking catch type errors tại compile time. Type safety reduce bugs và improve code quality.

- **Static Analysis**: Static analysis tools identify potential issues trong code. Analysis tools check for security vulnerabilities, performance issues, và code smells. Static analysis improve code quality và security.

**Code Review Process:**

- **Review Criteria**: Review criteria define standards cho code acceptance. Criteria include functionality, performance, security, và maintainability. Criteria ensure consistent quality standards.

- **Review Feedback**: Review feedback should be constructive và educational. Feedback explain issues và suggest improvements. Good feedback improve code và developer skills.

- **Review Approval**: Review approval require approval từ at least one reviewer. Approval ensure code meet standards trước khi merge. Approval process prevent low-quality code từ entering codebase.

**Code Metrics:**

- **Complexity Metrics**: Complexity metrics measure code complexity với cyclomatic complexity. High complexity indicate code that is hard to understand và maintain. Complexity metrics guide refactoring efforts.

- **Test Coverage**: Test coverage measure percentage của code covered by tests. High coverage improve confidence trong code correctness. Coverage metrics guide testing efforts.

- **Code Duplication**: Code duplication metrics identify duplicate code. Duplication increase maintenance burden và risk of inconsistencies. Duplication metrics guide refactoring efforts.

### 4.10.3. Documentation Standards

Documentation Standards ensure documentation is comprehensive, accurate, và maintainable. Good documentation improve onboarding, maintenance, và knowledge sharing.

**Code Documentation:**

- **Inline Comments**: Inline comments explain complex logic và non-obvious code. Comments should explain why, not what. Good comments improve code understanding.

- **Function Documentation**: Function documentation describe purpose, parameters, và return values. Documentation use JSDoc hoặc TypeScript comments. Function documentation improve API understanding.

- **API Documentation**: API documentation describe endpoints, parameters, và responses. Documentation use OpenAPI/Swagger format. API documentation improve integration experience.

**Project Documentation:**

- **README Files**: README files provide project overview, setup instructions, và usage examples. README should be comprehensive và up-to-date. Good README improve onboarding experience.

- **Architecture Documentation**: Architecture documentation describe system design và decisions. Documentation include diagrams, explanations, và rationale. Architecture documentation improve understanding và maintenance.

- **Deployment Documentation**: Deployment documentation describe deployment process và configurations. Documentation include step-by-step instructions và troubleshooting guides. Deployment documentation reduce deployment errors.

### 4.10.4. Security Practices

Security Practices ensure application is secure và protect against vulnerabilities. Security should be considered ở all stages của development.

**Security in Development:**

- **Secure Coding Practices**: Secure coding practices prevent common vulnerabilities. Practices include input validation, output encoding, và proper error handling. Secure coding reduce security risks.

- **Dependency Management**: Dependency management keep dependencies updated và scan for vulnerabilities. Regular updates patch security vulnerabilities. Dependency scanning identify known vulnerabilities.

- **Secret Management**: Secret management protect sensitive information như API keys và passwords. Secrets should not be committed to version control. Secret management use environment variables hoặc secret management services.

**Security Testing:**

- **Vulnerability Scanning**: Vulnerability scanning identify security vulnerabilities trong code và dependencies. Scanning tools check for known vulnerabilities. Regular scanning improve security posture.

- **Penetration Testing**: Penetration testing test application security với simulated attacks. Testing identify security weaknesses và validate defenses. Penetration testing improve security readiness.

- **Security Code Review**: Security code review focus on security aspects của code. Reviewers check for security vulnerabilities và best practices. Security reviews improve code security.

### 4.10.5. Performance Engineering

Performance Engineering ensure application meet performance requirements và optimize resource usage. Performance should be considered từ design phase.

**Performance Requirements:**

- **Response Time Requirements**: Response time requirements define acceptable response times cho different operations. Requirements guide optimization efforts. Response times should be measured và monitored.

- **Throughput Requirements**: Throughput requirements define expected request rates. Requirements guide capacity planning và scaling decisions. Throughput should be tested và validated.

- **Resource Requirements**: Resource requirements define acceptable resource usage. Requirements guide infrastructure sizing và optimization. Resource usage should be monitored và optimized.

**Performance Testing:**

- **Load Testing**: Load testing test application với expected load. Testing validate system can handle expected traffic. Load testing identify performance bottlenecks.

- **Stress Testing**: Stress testing test application beyond expected load. Testing identify breaking points và system limits. Stress testing validate system resilience.

- **Performance Profiling**: Performance profiling identify performance bottlenecks trong code. Profiling tools measure execution time và resource usage. Profiling guide optimization efforts.

### 4.10.6. DevOps và Infrastructure as Code

DevOps và Infrastructure as Code automate infrastructure management và improve deployment reliability. DevOps practices enable rapid và reliable software delivery.

**Infrastructure as Code (IaC):**

- **Docker và Docker Compose**: Docker và Docker Compose define infrastructure với code. Containers ensure consistent environments across development và production. Docker Compose orchestrate multi-container applications.

- **Configuration Management**: Configuration management manage system configurations với code. Configurations are versioned và automated. Configuration management improve consistency và reduce errors.

**CI/CD Pipeline:**

- **Continuous Integration**: Continuous Integration automate testing và building trên every commit. CI catch issues early và prevent integration problems. CI improve code quality và reduce risk.

- **Continuous Deployment**: Continuous Deployment automate deployment sau khi CI passes. CD reduce deployment time và errors. CD enable rapid delivery và quick feedback.

**Monitoring và Logging:**

- **Application Monitoring**: Application monitoring track application performance và health. Monitoring provide insights into system behavior. Monitoring enable proactive issue detection.

- **Logging Strategy**: Logging strategy define what và how to log. Logs provide audit trail và debugging information. Centralized logging improve troubleshooting và analysis.

---

> **Nguồn**: Nội dung được tổng hợp từ apps/api/DOCUMENTATION.md và apps/web/DOCUMENTATION.md, kết hợp với Software Engineering best practices
