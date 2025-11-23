# Libraries & Dependencies

## Tổng quan

Tài liệu này liệt kê tất cả các thư viện và dependencies được sử dụng trong dự án, cùng với mục đích và cách sử dụng của chúng.

## Backend Dependencies

### Core Framework

#### @nestjs/common, @nestjs/core (^11.0.1)

- **Mục đích**: Framework core của NestJS
- **Cách sử dụng**: Hệ thống module, dependency injection, decorators
- **Tính năng chính**: Controllers, Services, Modules, Guards, Interceptors

#### @nestjs/platform-express (^11.0.1)

- **Mục đích**: Adapter Express cho NestJS
- **Cách sử dụng**: HTTP server, routing, middleware
- **Tính năng chính**: Xử lý Request/Response

### Configuration

#### @nestjs/config (^4.0.2)

- **Mục đích**: Quản lý cấu hình
- **Cách sử dụng**: Biến môi trường, validation cấu hình
- **Tính năng chính**: Cấu hình global, truy cập type-safe

### Database

#### @nestjs/typeorm (^11.0.0)

- **Mục đích**: Tích hợp TypeORM cho NestJS
- **Cách sử dụng**: Entities database, repositories, migrations
- **Tính năng chính**: Decorators, dependency injection

#### typeorm (^0.3.27)

- **Mục đích**: ORM TypeScript
- **Cách sử dụng**: Query database, migrations, entities
- **Tính năng chính**: Query builder, relations, transactions

#### pg (^8.16.3)

- **Mục đích**: Client PostgreSQL
- **Cách sử dụng**: Driver database cho TypeORM
- **Tính năng chính**: Connection pooling, thực thi query

### Authentication & Security

#### @nestjs/jwt (^11.0.1)

- **Mục đích**: Tiện ích JWT cho NestJS
- **Cách sử dụng**: Tạo token, xác minh
- **Tính năng chính**: Ký, xác minh, giải mã tokens

#### @nestjs/passport (^11.0.5)

- **Mục đích**: Tích hợp Passport.js
- **Cách sử dụng**: Chiến lược xác thực
- **Tính năng chính**: Strategy pattern, guards

#### passport (^0.7.0)

- **Mục đích**: Middleware xác thực
- **Cách sử dụng**: Triển khai JWT strategy
- **Tính năng chính**: Strategy pattern, middleware

#### passport-jwt (^4.0.1)

- **Mục đích**: JWT strategy cho Passport
- **Cách sử dụng**: Xác thực JWT token
- **Tính năng chính**: Trích xuất token, xác thực

#### bcrypt (^6.0.0)

- **Mục đích**: Băm mật khẩu
- **Cách sử dụng**: Hash và so sánh mật khẩu
- **Tính năng chính**: Salted hashing, số vòng có thể cấu hình

### Validation & Transformation

#### class-validator (^0.14.2)

- **Mục đích**: Validation dựa trên decorator
- **Cách sử dụng**: Validation DTO
- **Tính năng chính**: Decorators (@IsEmail, @MinLength, v.v.)

#### class-transformer (^0.5.1)

- **Mục đích**: Chuyển đổi object
- **Cách sử dụng**: Serialize/deserialize objects
- **Tính năng chính**: Loại trừ trường, chuyển đổi thuộc tính

### Caching

#### ioredis (^5.8.2)

- **Mục đích**: Client Redis
- **Cách sử dụng**: Thao tác cache, pub/sub
- **Tính năng chính**: Quản lý kết nối, lệnh

#### redlock (5.0.0-beta.2)

- **Mục đích**: Khóa phân tán
- **Cách sử dụng**: Ngăn chặn race conditions
- **Tính năng chính**: Thu nhận khóa, hỗ trợ TTL

### Message Queue

#### amqplib (^0.10.9)

- **Mục đích**: Client AMQP
- **Cách sử dụng**: Giao tiếp RabbitMQ
- **Tính năng chính**: Thao tác queue, pub/sub

#### amqp-connection-manager (^5.0.0)

- **Mục đích**: Quản lý kết nối
- **Cách sử dụng**: Tự động kết nối lại, connection pooling
- **Tính năng chính**: Tự động kết nối lại

### Utilities

#### ms (^2.1.3)

- **Mục đích**: Chuyển đổi thời gian
- **Cách sử dụng**: Chuyển đổi chuỗi thời gian sang milliseconds
- **Tính năng chính**: '15m' → 900000, '7d' → 604800000

#### dotenv (^17.2.3)

- **Mục đích**: Biến môi trường
- **Cách sử dụng**: Tải file .env
- **Tính năng chính**: Tải Process.env

#### reflect-metadata (^0.2.2)

- **Mục đích**: Phản chiếu metadata
- **Cách sử dụng**: Metadata decorator
- **Tính năng chính**: Bắt buộc cho TypeScript decorators

#### rxjs (^7.8.1)

- **Mục đích**: Lập trình reactive
- **Cách sử dụng**: Observables, streams
- **Tính năng chính**: Được NestJS sử dụng nội bộ

## Frontend Dependencies

### Core Framework

#### nuxt (^4.2.1)

- **Mục đích**: Framework Vue.js
- **Cách sử dụng**: SSR, routing, auto-imports
- **Tính năng chính**: File-based routing, SSR, auto-imports

#### vue (^3.5.24)

- **Mục đích**: Framework JavaScript tiến bộ
- **Cách sử dụng**: UI dựa trên component
- **Tính năng chính**: Composition API, reactivity

#### vue-router (^4.6.3)

- **Mục đích**: Router cho Vue
- **Cách sử dụng**: Routing phía client
- **Tính năng chính**: Được Nuxt sử dụng nội bộ

### UI Framework

#### @nuxt/ui (^4.2.1)

- **Mục đích**: Thư viện component UI
- **Cách sử dụng**: Components được xây dựng sẵn
- **Tính năng chính**: UApp, UError, UButton, v.v.

### Styling

#### tailwindcss (^4.1.17)

- **Mục đích**: Framework CSS utility-first
- **Cách sử dụng**: Styling components
- **Tính năng chính**: Utility classes, responsive design

#### @tailwindcss/vite (^4.1.17)

- **Mục đích**: Plugin Tailwind CSS cho Vite
- **Cách sử dụng**: Tích hợp Tailwind với Vite
- **Tính năng chính**: JIT compilation, tối ưu hóa

## Development Dependencies

### Build Tools

#### typescript (^5.9.3)

- **Mục đích**: Trình biên dịch TypeScript
- **Cách sử dụng**: Kiểm tra kiểu, biên dịch
- **Tính năng chính**: Type safety, JavaScript hiện đại

#### @nestjs/cli (^11.0.0)

- **Mục đích**: CLI NestJS
- **Cách sử dụng**: Tạo code, build, serve
- **Tính năng chính**: Scaffolding, công cụ build

#### vue-tsc (^3.1.4)

- **Mục đích**: Trình kiểm tra TypeScript cho Vue
- **Cách sử dụng**: Kiểm tra kiểu file Vue
- **Tính năng chính**: Kiểm tra kiểu Vue SFC

### Testing

#### jest (^30.0.0)

- **Mục đích**: Framework testing
- **Cách sử dụng**: Unit tests, e2e tests
- **Tính năng chính**: Test runner, assertions

#### @nestjs/testing (^11.0.1)

- **Mục đích**: Tiện ích testing
- **Cách sử dụng**: Mock modules, helpers testing
- **Tính năng chính**: Tạo test module

#### ts-jest (^29.2.5)

- **Mục đích**: Preprocessor TypeScript
- **Cách sử dụng**: Hỗ trợ TypeScript trong Jest
- **Tính năng chính**: Biên dịch TS trong tests

#### supertest (^7.0.0)

- **Mục đích**: Assertions HTTP
- **Cách sử dụng**: Testing E2E API
- **Tính năng chính**: Testing request/response

### Linting & Formatting

#### eslint (^9.39.1, ^9.18.0)

- **Mục đích**: Linter JavaScript/TypeScript
- **Cách sử dụng**: Chất lượng code, kiểm tra style
- **Tính năng chính**: Linting dựa trên quy tắc

#### typescript-eslint (^8.20.0, ^8.47.0)

- **Mục đích**: Quy tắc ESLint cho TypeScript
- **Cách sử dụng**: Linting dành riêng cho TypeScript
- **Tính năng chính**: Quy tắc nhận biết kiểu

#### prettier (^3.6.2, ^3.4.2)

- **Mục đích**: Trình định dạng code
- **Cách sử dụng**: Định dạng code nhất quán
- **Tính năng chính**: Tự động định dạng

#### eslint-config-prettier (^10.0.1)

- **Mục đích**: Tắt các quy tắc ESLint xung đột với Prettier
- **Cách sử dụng**: Ngăn chặn xung đột
- **Tính năng chính**: Tắt quy tắc

#### eslint-plugin-prettier (^5.2.2)

- **Mục đích**: Plugin Prettier cho ESLint
- **Cách sử dụng**: Chạy Prettier như quy tắc ESLint
- **Tính năng chính**: Định dạng tích hợp

### Type Definitions

#### @types/node (^22.19.1, ^22.10.7)

- **Mục đích**: Định nghĩa kiểu Node.js
- **Cách sử dụng**: Hỗ trợ TypeScript cho Node.js APIs

#### @types/bcrypt (^6.0.0)

- **Mục đích**: Định nghĩa kiểu Bcrypt
- **Cách sử dụng**: Hỗ trợ TypeScript cho bcrypt

#### @types/express (^5.0.0)

- **Mục đích**: Định nghĩa kiểu Express
- **Cách sử dụng**: Hỗ trợ TypeScript cho Express

#### @types/jest (^30.0.0)

- **Mục đích**: Định nghĩa kiểu Jest
- **Cách sử dụng**: Hỗ trợ TypeScript cho Jest

#### @types/passport-jwt (^4.0.1)

- **Mục đích**: Định nghĩa kiểu Passport JWT
- **Cách sử dụng**: Hỗ trợ TypeScript cho passport-jwt

#### @types/supertest (^6.0.3)

- **Mục đích**: Định nghĩa kiểu Supertest
- **Cách sử dụng**: Hỗ trợ TypeScript cho supertest

#### @types/ms (^2.1.0)

- **Mục đích**: Định nghĩa kiểu thư viện ms
- **Cách sử dụng**: Hỗ trợ TypeScript cho ms

### Other Dev Tools

#### @nuxt/eslint (^1.10.0)

- **Mục đích**: Cấu hình ESLint cho Nuxt
- **Cách sử dụng**: Quy tắc linting dành riêng cho Nuxt

#### @nestjs/schematics (^11.0.0)

- **Mục đích**: Trình tạo code
- **Cách sử dụng**: Tạo modules, services, v.v.

#### ts-loader (^9.5.2)

- **Mục đích**: Loader TypeScript
- **Cách sử dụng**: Biên dịch TypeScript với Webpack

#### ts-node (^10.9.2)

- **Mục đích**: Thực thi TypeScript
- **Cách sử dụng**: Chạy TypeScript trực tiếp
- **Tính năng chính**: Được sử dụng trong migrations, tests

#### tsconfig-paths (^4.2.0)

- **Mục đích**: Hỗ trợ ánh xạ đường dẫn
- **Cách sử dụng**: Alias đường dẫn TypeScript
- **Tính năng chính**: Được sử dụng trong tests, migrations

#### source-map-support (^0.5.21)

- **Mục đích**: Hỗ trợ source map
- **Cách sử dụng**: Stack trace lỗi tốt hơn

#### globals (^16.0.0)

- **Mục đích**: Định nghĩa biến global
- **Cách sử dụng**: Cấu hình globals ESLint

## Monorepo Tools

### Build System

#### nx (^22.0.3)

- **Mục đích**: Hệ thống build monorepo
- **Cách sử dụng**: Điều phối tác vụ, caching
- **Tính năng chính**: Phát hiện thay đổi, caching

## Version Management

### Package Manager

- **pnpm**: 10.22.0
- **Node.js**: 18+ recommended

### Chiến lược Phiên bản

- **Phiên bản chính xác**: Dependencies production
- **Phạm vi Caret**: Dependencies dev
- **File khóa**: pnpm-lock.yaml

## Security Considerations

### Cập nhật thường xuyên

- ✅ Cập nhật dependencies thường xuyên
- ✅ Quét lỗ hổng bảo mật
- ✅ Cập nhật dependencies tự động (Dependabot)

### Lưu ý đã biết

- `redlock@5.0.0-beta.2`: Phiên bản beta, theo dõi cập nhật
- Một số subdependencies đã lỗi thời (đang theo dõi)
