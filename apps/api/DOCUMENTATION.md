# Tài Liệu Kỹ Thuật API Backend: NestJS, TypeORM, PostgreSQL và Redis

## Tóm Tắt Điều Hành

Tài liệu này cung cấp tài liệu kỹ thuật toàn diện cho hệ thống API backend được xây dựng bằng NestJS, TypeORM, PostgreSQL, và Redis. Hệ thống thể hiện các thực hành phát triển backend hiện đại, tập trung vào kiến trúc modular, dependency injection, design patterns, và quản lý dữ liệu hiệu quả. Tài liệu này vừa là tài liệu tham khảo kỹ thuật vừa là hướng dẫn để hiểu các quyết định kiến trúc và các mẫu triển khai được sử dụng trong toàn bộ hệ thống.

## 1. Giới Thiệu và Bối Cảnh

### 1.1 Tổng Quan Dự Án

Hệ thống API backend là một ứng dụng server-side được thiết kế để cung cấp các dịch vụ RESTful cho nền tảng thương mại điện tử nông nghiệp. Hệ thống nhấn mạnh khả năng mở rộng (scalability), hiệu suất (performance), và khả năng bảo trì (maintainability) trong khi duy trì các tiêu chuẩn cao về chất lượng mã và kiến trúc phần mềm.

Hệ thống được xây dựng với mục tiêu hỗ trợ các nghiệp vụ đặc thù của lĩnh vực nông nghiệp như quản lý sản phẩm theo mùa, theo dõi nguồn gốc, quản lý hạn sử dụng, và các tính năng liên quan đến chuỗi cung ứng nông sản. Kiến trúc hệ thống được thiết kế để có thể mở rộng theo chiều ngang (horizontal scaling) và xử lý được lượng truy cập lớn.

### 1.5 Kiến Trúc Tổng Quan và Sơ Đồ Hệ Thống

**Kiến Trúc Tổng Thể**: Hệ thống được xây dựng theo kiến trúc layered (phân lớp) với các tầng rõ ràng:

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  (Web Application, Mobile App, Admin Panel)             │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
┌────────────────────▼────────────────────────────────────┐
│              API Gateway / Load Balancer                 │
│                    (Nginx)                              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Application Layer (NestJS)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Controller│  │ Service  │  │Repository│             │
│  └──────────┘  └──────────┘  └──────────┘             │
└────┬──────────────────────────────────────┬──────────────┘
     │                                      │
┌────▼──────────────────────┐    ┌────────▼──────────────┐
│   PostgreSQL Database       │    │   Redis Cache         │
│   (Primary Data Store)     │    │   (Session/Cache)     │
└────────────────────────────┘    └──────────────────────┘
```

**Luồng Xử Lý Request (Request Flow)**:

Luồng xử lý một request từ client đến database được mô tả như sau:

1. **Client gửi Request**: Client (web application, mobile app) gửi HTTP request đến API Gateway (Nginx).

2. **Load Balancing**: Nginx phân phối request đến một trong các instance của NestJS application (nếu có nhiều instance để load balancing).

3. **Request Processing trong NestJS**:
   - **Middleware Layer**: Request đi qua các middleware (authentication, logging, validation)
   - **Controller Layer**: Controller nhận request, extract parameters (query, body, params)
   - **Service Layer**: Controller gọi service để xử lý business logic
   - **Repository Layer**: Service sử dụng repository để truy cập database

4. **Database Access**:
   - Repository sử dụng TypeORM để tạo và thực thi SQL queries
   - PostgreSQL xử lý queries và trả về kết quả
   - Nếu có cache, Redis được kiểm tra trước khi query database

5. **Response**: Kết quả được trả về ngược lại qua các tầng và cuối cùng đến client.

**Sơ Đồ ERD (Entity Relationship Diagram) - Các Entity Chính**:

Hệ thống e-commerce nông nghiệp có các entity chính và mối quan hệ như sau:

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    User      │         │   Product    │         │   Category   │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │         │ id (PK)      │
│ email        │         │ name         │         │ name         │
│ password     │         │ description  │         │ description  │
│ name         │         │ price        │         │ parentId (FK)│
│ role         │         │ categoryId   │────────▶│              │
│ createdAt    │         │ harvestDate  │         │              │
│ updatedAt    │         │ expiryDate   │         │              │
└──────┬───────┘         │ origin       │         └──────────────┘
       │                 │ certifications│
       │                 │ grade         │
       │                 │ createdAt     │
       │                 │ updatedAt     │
       │                 └───────┬───────┘
       │                         │
       │                 ┌───────▼───────┐
       │                 │ Order         │
       │                 ├───────────────┤
       │                 │ id (PK)       │
       │                 │ userId (FK)   │
       │                 │ status        │
       │                 │ totalAmount   │
       │                 │ createdAt     │
       │                 │ updatedAt     │
       │                 └───────┬───────┘
       │                         │
       │                 ┌───────▼───────┐
       │                 │ OrderItem     │
       │                 ├───────────────┤
       │                 │ id (PK)       │
       │                 │ orderId (FK)  │
       │                 │ productId (FK)│
       │                 │ quantity      │
       │                 │ price         │
       │                 └───────────────┘
       │
       │
┌──────▼───────┐
│   Inventory  │
├──────────────┤
│ id (PK)      │
│ productId(FK)│
│ quantity     │
│ batchNumber  │
│ expiryDate   │
│ location     │
└──────────────┘
```

**Mối Quan Hệ Giữa Các Entity**:

- **User ↔ Order**: Một User có thể có nhiều Order (One-to-Many)
- **Category ↔ Product**: Một Category có thể có nhiều Product (One-to-Many)
- **Product ↔ OrderItem**: Một Product có thể có nhiều OrderItem (One-to-Many)
- **Order ↔ OrderItem**: Một Order có nhiều OrderItem (One-to-Many)
- **Product ↔ Inventory**: Một Product có một Inventory record (One-to-One)

**Sơ Đồ Actor (Use Case Diagram)**:

Các actor chính trong hệ thống và các use case của họ:

```
                    ┌─────────────┐
                    │   Customer  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
  ┌─────────┐      ┌──────────┐      ┌──────────┐
  │ Xem SP  │      │ Đặt hàng │      │Thanh toán│
  └─────────┘      └──────────┘      └──────────┘

                    ┌─────────────┐
                    │   Admin    │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
  ┌─────────┐      ┌──────────┐      ┌──────────┐
  │QL Sản   │      │QL Đơn    │      │QL User  │
  │Phẩm     │      │Hàng      │      │         │
  └─────────┘      └──────────┘      └──────────┘

                    ┌─────────────┐
                    │   System   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
  ┌─────────┐      ┌──────────┐      ┌──────────┐
  │Cache    │      │Kiểm tra  │      │Gửi thông│
  │Data     │      │Hạn SD    │      │báo       │
  └─────────┘      └──────────┘      └──────────┘
```

**Luồng Xử Lý Đơn Hàng (Order Processing Flow)**:

```
[Customer] → [Tạo Order] → [Validate Inventory]
                                    │
                                    ▼
                            [Kiểm tra số lượng]
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
            [Đủ hàng]                        [Không đủ]
                    │                               │
                    ▼                               ▼
        [Tạo OrderItem]                    [Thông báo lỗi]
                    │
                    ▼
        [Tính tổng tiền]
                    │
                    ▼
        [Lưu vào Database]
                    │
                    ▼
        [Cập nhật Inventory]
                    │
                    ▼
        [Gửi thông báo]
                    │
                    ▼
            [Hoàn tất]
```

**Luồng Cache (Caching Flow)**:

```
[Request đến] → [Kiểm tra Redis Cache]
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
[Cache Hit]                        [Cache Miss]
        │                               │
        ▼                               ▼
[Trả về từ Cache]              [Query Database]
                                        │
                                        ▼
                                [Lưu vào Cache]
                                        │
                                        ▼
                                [Trả về kết quả]
```

### 1.2 Lý Do Lựa Chọn Công Nghệ

Việc lựa chọn NestJS làm framework chính được thúc đẩy bởi nhiều yếu tố kỹ thuật và thực tiễn:

**Kiến Trúc Modular (Modular Architecture)**: NestJS cung cấp kiến trúc module-based mạnh mẽ, cho phép tổ chức mã theo các module độc lập và có thể tái sử dụng. Mỗi module đại diện cho một chức năng cụ thể của ứng dụng (ví dụ: module quản lý sản phẩm, module quản lý đơn hàng). Cách tiếp cận này tạo điều kiện cho việc phát triển và bảo trì ứng dụng quy mô lớn. Các module có thể được phát triển độc lập, test riêng biệt, và tái sử dụng trong các dự án khác. Kiến trúc modular giúp giảm sự phụ thuộc giữa các phần của hệ thống, làm cho codebase dễ hiểu và dễ bảo trì hơn.

**Dependency Injection Tích Hợp (Built-in Dependency Injection)**: Hệ thống Dependency Injection (DI) tích hợp của NestJS đảm bảo tính lỏng lẻo (loose coupling) giữa các component. Thay vì một class tự tạo các đối tượng phụ thuộc của nó, các đối tượng này được "tiêm" vào từ bên ngoài thông qua constructor. Điều này làm cho mã dễ kiểm thử (có thể dễ dàng thay thế dependencies bằng mock objects trong test) và bảo trì hơn. DI cho phép quản lý dependencies một cách tự động và có kiểm soát, giảm thiểu sự phụ thuộc cứng nhắc giữa các thành phần.

**TypeScript Native**: NestJS được xây dựng với TypeScript từ đầu, cung cấp type safety toàn diện. TypeScript là một ngôn ngữ lập trình mở rộng từ JavaScript, thêm vào các tính năng kiểu tĩnh (static typing). Điều này giúp phát hiện lỗi sớm trong quá trình phát triển, trước khi code được chạy. Type safety cũng cải thiện hỗ trợ IDE (Intelligent Development Environment) với các tính năng như autocomplete, refactoring an toàn, và navigation tốt hơn. Điều này giúp tăng năng suất phát triển và giảm lỗi runtime.

**Ecosystem Mạnh Mẽ**: NestJS có hệ sinh thái phong phú với các module chính thức cho database (TypeORM, Mongoose), caching (Redis), authentication (Passport), và nhiều tính năng khác. Các module này được tích hợp sẵn và có tài liệu đầy đủ, giảm thời gian phát triển và đảm bảo tích hợp ổn định. Hệ sinh thái này được cộng đồng phát triển tích cực, đảm bảo tính cập nhật và hỗ trợ lâu dài.

**Express Under the Hood**: NestJS sử dụng Express (hoặc Fastify) làm HTTP server bên dưới, tận dụng hiệu suất và sự ổn định đã được chứng minh của Express trong khi cung cấp abstraction layer mạnh mẽ hơn. Express là một web framework phổ biến và đã được sử dụng rộng rãi trong cộng đồng Node.js. Bằng cách xây dựng trên Express, NestJS kế thừa được tất cả các tính năng và hiệu suất của Express, đồng thời thêm vào các tính năng cao cấp như dependency injection, decorators, và module system.

### 1.3 Lựa Chọn Cơ Sở Dữ Liệu

**PostgreSQL**: PostgreSQL được chọn làm cơ sở dữ liệu quan hệ chính (Relational Database Management System - RDBMS) vì các lý do sau:

- **ACID Compliance**: ACID là viết tắt của Atomicity (Tính nguyên tử), Consistency (Tính nhất quán), Isolation (Tính cô lập), và Durability (Tính bền vững). PostgreSQL đảm bảo tính nhất quán dữ liệu trong các giao dịch phức tạp. Tính nguyên tử đảm bảo tất cả các thao tác trong một giao dịch hoặc thành công hoàn toàn hoặc thất bại hoàn toàn, không có trạng thái trung gian. Tính nhất quán đảm bảo dữ liệu luôn ở trạng thái hợp lệ. Tính cô lập đảm bảo các giao dịch đồng thời không can thiệp lẫn nhau. Tính bền vững đảm bảo dữ liệu đã được commit sẽ không bị mất ngay cả khi hệ thống gặp sự cố.

- **Tính Năng Nâng Cao**: PostgreSQL hỗ trợ nhiều kiểu dữ liệu phức tạp như JSON, JSONB (JSON binary - hiệu suất cao hơn), arrays, và các kiểu dữ liệu tùy chỉnh. Hỗ trợ full-text search tích hợp cho phép tìm kiếm văn bản hiệu quả mà không cần công cụ bên ngoài. Các tính năng này đặc biệt hữu ích cho hệ thống e-commerce nơi cần lưu trữ metadata sản phẩm dưới dạng JSON và tìm kiếm sản phẩm.

- **Hiệu Suất**: PostgreSQL có query optimizer mạnh mẽ, tự động chọn phương án thực thi tối ưu cho các truy vấn. Hỗ trợ nhiều loại index (B-tree, Hash, GiST, GIN, BRIN) cho phép tối ưu hóa các loại truy vấn khác nhau. Khả năng xử lý workload lớn với connection pooling và parallel query execution.

- **Mở Rộng (Scalability)**: Hỗ trợ replication (sao chép dữ liệu) để tạo các bản sao dữ liệu cho mục đích đọc và dự phòng. Hỗ trợ partitioning (phân vùng bảng) để chia nhỏ các bảng lớn thành các phần nhỏ hơn, cải thiện hiệu suất truy vấn. Các kỹ thuật mở rộng khác như sharding và read replicas giúp hệ thống có thể mở rộng theo chiều ngang.

**Redis**: Redis được sử dụng cho caching và session management vì các đặc điểm sau:

- **Hiệu Suất Cao**: Redis lưu trữ dữ liệu trong bộ nhớ (in-memory), không cần truy cập đĩa cứng, dẫn đến tốc độ truy cập cực nhanh (microseconds). Điều này làm cho Redis lý tưởng cho caching, nơi tốc độ đọc là quan trọng. So với việc truy vấn database mỗi lần, việc đọc từ Redis cache có thể nhanh hơn hàng trăm lần.

- **Cấu Trúc Dữ Liệu Đa Dạng**: Redis hỗ trợ nhiều cấu trúc dữ liệu: strings (chuỗi đơn giản), hashes (bảng băm - phù hợp cho objects), lists (danh sách - FIFO/LIFO), sets (tập hợp - không trùng lặp), và sorted sets (tập hợp có thứ tự - phù hợp cho rankings). Sự đa dạng này cho phép Redis được sử dụng cho nhiều mục đích khác nhau ngoài caching.

- **Pub/Sub (Publish/Subscribe)**: Hỗ trợ messaging pattern cho real-time features. Một service có thể publish (phát hành) message vào một channel, và nhiều subscribers (người đăng ký) có thể nhận message đó. Điều này hữu ích cho các tính năng như thông báo real-time, cập nhật trạng thái đơn hàng, và event-driven architecture.

- **Persistence**: Mặc dù là in-memory database, Redis có thể cấu hình để lưu trữ dữ liệu trên disk (RDB snapshots hoặc AOF - Append Only File). Điều này đảm bảo dữ liệu không bị mất khi Redis restart, quan trọng cho dữ liệu session và cache quan trọng.

### 1.4 Lựa Chọn TypeORM

TypeORM được chọn làm ORM (Object-Relational Mapping - Ánh xạ Đối tượng-Quan hệ) vì các lý do sau:

**TypeScript First**: TypeORM được thiết kế với TypeScript từ đầu, cung cấp type safety (an toàn kiểu) cho database operations và entities. Điều này có nghĩa là khi bạn định nghĩa một entity (đại diện cho một bảng trong database), TypeScript sẽ kiểm tra kiểu dữ liệu và đảm bảo tính nhất quán. Ví dụ, nếu một trường được định nghĩa là số (number), bạn không thể gán một chuỗi (string) vào đó. Type safety giúp phát hiện lỗi sớm và giảm bugs trong production.

**Active Record và Data Mapper**: TypeORM hỗ trợ cả hai pattern thiết kế. Active Record pattern cho phép entity tự quản lý việc lưu trữ và truy xuất dữ liệu (entity.save(), entity.delete()). Data Mapper pattern tách biệt logic nghiệp vụ khỏi logic truy cập dữ liệu, sử dụng repositories để thao tác với entities. Sự linh hoạt này cho phép developers chọn pattern phù hợp với dự án của họ. Trong NestJS, Data Mapper pattern thường được ưa chuộng vì phù hợp với dependency injection.

**Metadata Decorators**: TypeORM sử dụng decorators (các hàm đặc biệt trong TypeScript) để định nghĩa entities và relationships. Decorators như @Entity(), @Column(), @OneToMany() làm cho mã dễ đọc và bảo trì hơn so với việc sử dụng cấu hình file riêng biệt. Decorators cung cấp metadata (siêu dữ liệu) về cấu trúc của entity, được TypeORM sử dụng để tự động tạo SQL queries và ánh xạ giữa objects và database rows.

**Migration System**: Hệ thống migration mạnh mẽ cho phép quản lý schema changes (thay đổi cấu trúc database) một cách có kiểm soát. Migrations là các file script mô tả các thay đổi cần thiết cho database schema. Chúng cho phép version control cho database schema, rollback (hoàn tác) các thay đổi nếu cần, và đảm bảo tất cả môi trường (development, staging, production) có cùng schema. Điều này đặc biệt quan trọng trong môi trường production nơi việc thay đổi schema cần được quản lý cẩn thận.

**Query Builder**: Cung cấp query builder mạnh mẽ cho các truy vấn phức tạp trong khi vẫn giữ type safety. Query builder cho phép xây dựng SQL queries một cách programmatic (thông qua các method calls) thay vì viết SQL thô. Điều này giúp tránh SQL injection attacks và đảm bảo type safety. Query builder cũng hỗ trợ các tính năng như joins, subqueries, aggregations, và pagination một cách dễ dàng.

## 2. Nền Tảng Node.js và Express

### 2.1 Kiến Trúc V8 JavaScript Engine

V8 là JavaScript engine được phát triển bởi Google, được sử dụng trong Chrome browser và Node.js. JavaScript engine là một chương trình thực thi mã JavaScript, chuyển đổi mã JavaScript thành mã máy (machine code) mà máy tính có thể hiểu và thực thi. Hiểu về V8 engine là nền tảng để hiểu cách Node.js hoạt động và tối ưu hóa hiệu suất ứng dụng.

**Just-In-Time (JIT) Compilation - Biên Dịch Tức Thời**:

V8 sử dụng kỹ thuật JIT compilation (biên dịch tức thời) để chuyển đổi mã JavaScript thành machine code (mã máy) tại thời điểm chạy (runtime), thay vì biên dịch trước như các ngôn ngữ biên dịch truyền thống (C++, Java). Điều này cho phép JavaScript có tốc độ thực thi nhanh gần như các ngôn ngữ biên dịch trong khi vẫn giữ được tính linh hoạt của ngôn ngữ thông dịch.

V8 có hai compiler (trình biên dịch) chính:

- **Ignition (Interpreter - Trình thông dịch)**: Ignition là trình thông dịch bytecode, thực thi mã JavaScript bằng cách chuyển đổi nó thành bytecode (mã trung gian) và thực thi bytecode đó. Ignition được thiết kế để khởi động nhanh và sử dụng ít bộ nhớ. Khi một hàm JavaScript được gọi lần đầu, Ignition sẽ thực thi nó ngay lập tức mà không cần biên dịch, đảm bảo ứng dụng khởi động nhanh.

- **TurboFan (Optimizing Compiler - Trình biên dịch tối ưu)**: TurboFan là trình biên dịch tối ưu, phân tích các hàm được gọi nhiều lần (hot functions) và biên dịch chúng thành machine code được tối ưu hóa. TurboFan sử dụng thông tin thu thập được trong quá trình thực thi (type feedback) để tạo ra mã máy hiệu quả hơn. Khi một hàm được gọi nhiều lần, V8 sẽ "nóng" hàm đó lên (make it hot) và TurboFan sẽ biên dịch nó thành machine code tối ưu.

Quá trình hoạt động: Mã JavaScript đầu tiên được Ignition thực thi dưới dạng bytecode. Trong quá trình thực thi, V8 thu thập thông tin về cách hàm được sử dụng (types của biến, patterns của vòng lặp, etc.). Khi một hàm trở nên "hot" (được gọi nhiều lần), TurboFan sẽ biên dịch nó thành machine code tối ưu. Nếu các giả định của TurboFan không còn đúng (ví dụ: type của biến thay đổi), V8 sẽ "deoptimize" (hủy tối ưu) và quay lại sử dụng Ignition.

**Hidden Classes và Inline Caching - Lớp Ẩn và Bộ Nhớ Đệm Nội Tuyến**:

V8 sử dụng hidden classes (lớp ẩn) để tối ưu hóa việc truy cập thuộc tính (property access) của objects. Hidden class là một cấu trúc dữ liệu nội bộ của V8, tương tự như class trong các ngôn ngữ hướng đối tượng, mô tả cấu trúc của một object (các thuộc tính và vị trí của chúng trong bộ nhớ).

Khi bạn tạo một object trong JavaScript, V8 tạo một hidden class cho object đó. Nếu bạn tạo nhiều objects có cùng cấu trúc (cùng các thuộc tính được thêm theo cùng thứ tự), chúng sẽ chia sẻ cùng một hidden class. Điều này cho phép V8 tối ưu hóa việc truy cập thuộc tính vì nó biết chính xác vị trí của mỗi thuộc tính trong bộ nhớ.

Inline caching (bộ nhớ đệm nội tuyến) là một kỹ thuật tối ưu hóa trong đó V8 lưu trữ thông tin về object shape (hình dạng của object - cấu trúc các thuộc tính) và vị trí của thuộc tính trong bộ nhớ. Khi truy cập một thuộc tính, V8 kiểm tra xem object có cùng shape với lần truy cập trước không. Nếu có, nó sử dụng thông tin đã cache để truy cập trực tiếp thuộc tính mà không cần tìm kiếm, làm cho việc truy cập nhanh hơn đáng kể.

Điều này giải thích tại sao việc tạo objects với cấu trúc nhất quán (consistent structure) có hiệu suất tốt hơn so với việc thêm thuộc tính động (dynamic property addition). Khi bạn thêm thuộc tính động, V8 phải tạo hidden class mới, làm mất hiệu quả của inline caching.

**Garbage Collection - Thu Gom Rác**:

Garbage collection (GC - thu gom rác) là quá trình tự động quản lý bộ nhớ, giải phóng bộ nhớ không còn được sử dụng. V8 sử dụng generational garbage collection (thu gom rác theo thế hệ), dựa trên quan sát rằng hầu hết objects trong JavaScript có tuổi thọ ngắn (die young), trong khi một số objects sống lâu.

V8 chia heap (vùng nhớ) thành hai thế hệ:

- **Young Generation (Thế hệ trẻ - Nursery)**: Nơi các objects mới được cấp phát. Young generation được chia thành hai nửa: một nửa đang sử dụng (from-space) và một nửa trống (to-space). Khi from-space đầy, V8 thực hiện Scavenge algorithm (thuật toán quét dọn): nó quét qua tất cả objects trong from-space, sao chép các objects còn sống (được tham chiếu) sang to-space, và giải phóng from-space. Scavenge rất nhanh nhưng yêu cầu stop-the-world pause (tạm dừng toàn bộ chương trình).

- **Old Generation (Thế hệ già)**: Nơi các objects sống lâu được lưu trữ. Nếu một object trong young generation sống sót qua một số lần garbage collection, nó được "promote" (thăng cấp) lên old generation. Old generation sử dụng Mark-Sweep-Compact algorithm (đánh dấu-quét-nén): đầu tiên đánh dấu tất cả objects còn sống, sau đó quét và giải phóng các objects không được đánh dấu, cuối cùng nén (compact) bộ nhớ để giảm fragmentation. Thuật toán này chậm hơn nhưng toàn diện hơn.

V8 cố gắng giảm thiểu stop-the-world pauses (thời gian tạm dừng) thông qua incremental marking (đánh dấu tăng dần) và concurrent sweeping (quét đồng thời). Incremental marking chia quá trình đánh dấu thành nhiều phần nhỏ, thực hiện giữa các lần thực thi mã JavaScript. Concurrent sweeping quét và giải phóng bộ nhớ song song với việc thực thi mã JavaScript, giảm thiểu thời gian pause.

**Memory Management**: V8 quản lý memory thông qua heap, được chia thành multiple spaces: new space (young generation objects), old space (long-lived objects), code space (compiled code), large object space (objects > 1MB), và map space (hidden classes và descriptors). Memory allocation và deallocation được optimize để minimize fragmentation và maximize reuse.

**Optimization Strategies**: V8 sử dụng nhiều optimization strategies:

- **Function Inlining**: Inline small functions để reduce call overhead và enable further optimizations
- **Dead Code Elimination**: Remove code không bao giờ được execute để reduce bundle size
- **Type Feedback**: Collect type information tại runtime để optimize type-specific operations (ví dụ: optimized paths cho numbers vs strings)
- **Speculative Optimization**: Optimize code dựa trên assumptions về runtime behavior, với deoptimization fallback nếu assumptions fail
- **Polymorphic Inline Caching**: Cache multiple shapes cho polymorphic property access

**V8 API và Embedding**: V8 cung cấp C++ API để embed engine vào applications. Node.js sử dụng V8 API để expose JavaScript APIs và bridge giữa JavaScript và native code. V8 isolates cho phép multiple independent JavaScript contexts trong cùng process.

### 2.2 Kiến Trúc Node.js Runtime

Node.js là một runtime environment được xây dựng trên V8 engine, cung cấp APIs cho server-side JavaScript development:

**Event Loop Architecture**: Node.js event loop là core của asynchronous I/O. Event loop là một single-threaded loop xử lý events và callbacks. Event loop có multiple phases: timers (scheduled callbacks), pending callbacks (deferred I/O callbacks), idle/prepare (internal use), poll (fetch new I/O events), check (setImmediate callbacks), và close callbacks (socket close handlers). Mỗi phase có một queue của callbacks để execute. Event loop continues cho đến khi không còn callbacks và no more work to do.

**Libuv Library**: Node.js sử dụng libuv library để handle asynchronous I/O operations. Libuv cung cấp event loop implementation và thread pool cho blocking operations. Libuv abstract platform-specific differences (Windows IOCP, Linux epoll, macOS kqueue) và cung cấp consistent API across operating systems. Libuv handle file system operations, DNS, network I/O, child processes, và timers.

**Thread Pool**: Mặc dù Node.js event loop là single-threaded, libuv thread pool (mặc định 4 threads, configurable via UV_THREADPOOL_SIZE) được sử dụng cho blocking operations như file system operations (fs module), DNS lookups (dns.lookup), và crypto operations (crypto.pbkdf2, crypto.randomBytes). Thread pool size cần be tuned dựa trên workload characteristics.

**Non-Blocking I/O**: Node.js sử dụng non-blocking I/O model, nơi I/O operations không block event loop. Khi một I/O operation được initiate (ví dụ: read file, network request), Node.js register một callback và continue processing other events. Khi I/O operation completes, callback được add vào appropriate event queue để execute trong next event loop iteration. Điều này cho phép handle thousands of concurrent connections với minimal overhead.

**Concurrency Model**: Node.js concurrency model dựa trên event-driven, non-blocking I/O thay vì traditional thread-based concurrency. Điều này cho phép handle thousands of concurrent connections với minimal overhead (memory per connection is minimal). Tuy nhiên, CPU-intensive tasks có thể block event loop và degrade performance. Solutions bao gồm: split work thành smaller chunks (setImmediate), use worker threads (worker_threads module), hoặc offload to external processes (child_process).

**Module Resolution**: Node.js module resolution algorithm tìm kiếm modules theo thứ tự: core modules (built-in như fs, http), local modules (node_modules trong current và parent directories), và global modules (NODE_PATH environment variable). Module caching đảm bảo mỗi module chỉ được load và execute một lần, improving performance và ensuring singleton behavior.

**Buffer và Streams**: Node.js cung cấp Buffer class cho binary data manipulation (essential cho network protocols và file I/O) và Stream API cho handling large datasets. Streams cho phép process data incrementally thay vì load toàn bộ vào memory, essential cho performance và memory efficiency. Streams có thể be readable, writable, hoặc duplex (both). Backpressure mechanism prevent memory issues khi producer is faster than consumer.

### 2.3 Event Loop và Asynchronous Operations - Vòng Lặp Sự Kiện và Thao Tác Bất Đồng Bộ

Event loop (vòng lặp sự kiện) là cơ chế cốt lõi cho phép Node.js thực hiện các thao tác I/O không chặn (non-blocking I/O operations). Đây là điều làm cho Node.js có thể xử lý hàng nghìn kết nối đồng thời với hiệu suất cao.

**Khái Niệm Event Loop**:

Event loop là một vòng lặp vô hạn chạy trong một thread duy nhất, liên tục kiểm tra và xử lý các sự kiện (events) và callbacks (hàm gọi lại). Khi một thao tác bất đồng bộ (như đọc file, gửi request HTTP) được khởi tạo, Node.js không chờ đợi kết quả mà tiếp tục xử lý các thao tác khác. Khi thao tác bất đồng bộ hoàn thành, callback tương ứng được thêm vào queue (hàng đợi) và sẽ được thực thi trong lần lặp tiếp theo của event loop.

**Sơ Đồ Event Loop Phases**:

```
┌─────────────────────────────────────────────────┐
│           Event Loop (Vòng Lặp Sự Kiện)        │
└─────────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌───────────────┐      ┌───────────────┐
│  Timers       │      │  Pending     │
│  Phase        │      │  Callbacks   │
│  (Bộ Hẹn Giờ) │      │  Phase       │
└───────┬───────┘      │  (Đang Chờ)  │
        │              └───────┬───────┘
        │                      │
        ▼                      ▼
┌───────────────┐      ┌───────────────┐
│  Idle/Prepare │      │  Poll Phase   │
│  Phase        │      │  (Lấy Sự Kiện)│
│  (Nghỉ/Chuẩn) │      └───────┬───────┘
└───────────────┘              │
                               ▼
                      ┌───────────────┐
                      │  Check Phase  │
                      │  (Kiểm Tra)   │
                      └───────┬───────┘
                              ▼
                      ┌───────────────┐
                      │  Close        │
                      │  Callbacks    │
                      │  (Đóng)       │
                      └───────────────┘
```

**Chi Tiết Từng Phase (Giai Đoạn)**:

**1. Timers Phase - Giai Đoạn Bộ Hẹn Giờ**:

Timers phase thực thi các callbacks đã được lên lịch bởi `setTimeout()` và `setInterval()`. Khi bạn gọi `setTimeout(callback, 1000)`, callback sẽ được thực thi sau ít nhất 1000 milliseconds. Tuy nhiên, điều quan trọng cần hiểu là thời gian delay chỉ là thời gian tối thiểu, không phải thời gian chính xác. Nếu event loop đang bận xử lý các thao tác khác, callback có thể được thực thi muộn hơn.

Trong phase này, event loop kiểm tra tất cả các timers đã được đăng ký và chỉ thực thi những callback có thời gian hẹn (scheduled time) đã hết hạn (current time >= scheduled time). Các timers được sắp xếp theo thứ tự thời gian, timers nào hết hạn trước sẽ được thực thi trước.

**2. Pending Callbacks Phase - Giai Đoạn Callbacks Đang Chờ**:

Phase này thực thi các I/O callbacks đã bị hoãn lại từ lần lặp trước của event loop. Đây là nơi thực thi hầu hết các callbacks từ các thao tác I/O đã hoàn thành (như đọc file xong, nhận response HTTP, etc.).

Ví dụ: Khi bạn đọc một file bất đồng bộ, Node.js khởi tạo thao tác đọc và tiếp tục xử lý các thao tác khác. Khi file đọc xong, callback được thêm vào pending callbacks queue và sẽ được thực thi trong phase này của lần lặp tiếp theo.

**3. Idle/Prepare Phase - Giai Đoạn Nghỉ/Chuẩn Bị**:

Phase này chỉ dùng cho mục đích nội bộ của Node.js, không có user callbacks nào được thực thi ở đây. Node.js sử dụng phase này để thực hiện các thao tác nội bộ như chuẩn bị cho lần lặp tiếp theo, cập nhật các thống kê nội bộ, v.v.

**4. Poll Phase - Giai Đoạn Lấy Sự Kiện**:

Poll phase là giai đoạn quan trọng nhất của event loop. Trong phase này, event loop:

- Lấy các I/O events mới từ hệ điều hành (như file đã đọc xong, socket đã nhận data, etc.)
- Thực thi các I/O-related callbacks (callbacks liên quan đến I/O)

Nếu poll queue (hàng đợi poll) rỗng, event loop sẽ:

- Kiểm tra xem có timers nào đã hết hạn chưa. Nếu có, quay lại Timers phase để thực thi chúng.
- Nếu không có timers nào hết hạn, tiếp tục đến Check phase.

Nếu poll queue không rỗng, event loop sẽ thực thi các callbacks trong queue cho đến khi queue rỗng hoặc đạt đến giới hạn (để tránh block event loop quá lâu).

**5. Check Phase - Giai Đoạn Kiểm Tra**:

Check phase thực thi các callbacks được lên lịch bởi `setImmediate()`. `setImmediate()` là một cách để lên lịch callback được thực thi ngay sau khi poll phase hoàn thành, trước khi event loop tiếp tục đến Timers phase.

Khác với `setTimeout(fn, 0)`, `setImmediate()` đảm bảo callback được thực thi trong Check phase của lần lặp hiện tại, trong khi `setTimeout(fn, 0)` có thể bị trì hoãn đến lần lặp tiếp theo nếu có timers khác đã hết hạn.

**6. Close Callbacks Phase - Giai Đoạn Đóng**:

Phase này thực thi các close event callbacks, ví dụ như `socket.on('close', callback)`. Đây là giai đoạn dọn dẹp (cleanup) cho các kết nối đã đóng. Các callbacks này được thực thi sau khi socket hoặc stream đã được đóng hoàn toàn.

**Luồng Hoạt Động Của Event Loop**:

```
Bắt đầu Event Loop
        │
        ▼
┌───────────────────┐
│  Timers Phase     │ ← Kiểm tra và thực thi timers đã hết hạn
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Pending          │ ← Thực thi callbacks I/O đã hoãn
│  Callbacks        │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Idle/Prepare     │ ← Thao tác nội bộ
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Poll Phase       │ ← Lấy I/O events mới và thực thi callbacks
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Check Phase      │ ← Thực thi setImmediate() callbacks
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Close Callbacks  │ ← Dọn dẹp các kết nối đã đóng
└────────┬──────────┘
         │
         ▼
    Còn công việc?
         │
    ┌────┴────┐
    │         │
   Có        Không
    │         │
    ▼         ▼
  Tiếp tục  Kết thúc
```

**Microtasks và Macrotasks - Nhiệm Vụ Vi Mô và Nhiệm Vụ Vĩ Mô**:

JavaScript có hai loại task queues (hàng đợi nhiệm vụ) với mức độ ưu tiên khác nhau:

**Microtasks (Nhiệm Vụ Vi Mô)**:

Microtasks là các nhiệm vụ có độ ưu tiên cao, được thực thi ngay sau khi mỗi phase của event loop hoàn thành, trước khi chuyển sang phase tiếp theo. Microtasks bao gồm:

- **Promises**: Các callbacks từ `.then()`, `.catch()`, `.finally()` của Promises
- **queueMicrotask()**: Hàm để thêm microtask vào queue
- **process.nextTick()**: Có độ ưu tiên cao nhất, được thực thi trước cả các microtasks khác

Đặc điểm quan trọng của microtasks: Chúng được thực thi đến khi hoàn thành (execute to completion) trước khi event loop tiếp tục. Điều này có nghĩa là nếu một microtask tạo ra microtask mới, tất cả microtasks sẽ được thực thi trước khi chuyển sang phase tiếp theo. Điều này có thể dẫn đến "starvation" (đói) của event loop nếu có quá nhiều microtasks.

**Macrotasks (Nhiệm Vụ Vĩ Mô)**:

Macrotasks là các nhiệm vụ được thực thi trong các phase cụ thể của event loop. Macrotasks bao gồm:

- **setTimeout()** và **setInterval()**: Được thực thi trong Timers phase
- **setImmediate()**: Được thực thi trong Check phase
- **I/O callbacks**: Được thực thi trong Pending Callbacks phase và Poll phase

Khác với microtasks, macrotasks được thực thi một lần một (one at a time) trong mỗi phase. Event loop sẽ thực thi một macrotask, sau đó kiểm tra và thực thi tất cả microtasks, rồi mới chuyển sang macrotask tiếp theo.

**Sơ Đồ Thứ Tự Thực Thi**:

```
Event Loop Phase hoàn thành
        │
        ▼
┌───────────────────┐
│ Thực thi tất cả   │
│ process.nextTick()│ ← Độ ưu tiên cao nhất
│ callbacks         │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Thực thi tất cả   │
│ Promise callbacks │
│ và queueMicrotask │
└────────┬──────────┘
         │
         ▼
    Chuyển sang
    phase tiếp theo
```

**Ví Dụ Minh Họa Thứ Tự Thực Thi**:

Giả sử bạn có code sau:

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

process.nextTick(() => console.log('4'));

console.log('5');
```

Thứ tự in ra sẽ là: `1`, `5`, `4`, `3`, `2`

Giải thích:

1. `console.log('1')` và `console.log('5')` được thực thi ngay (synchronous)
2. `setTimeout` được đăng ký trong Timers phase
3. `Promise.resolve().then()` tạo microtask
4. `process.nextTick()` tạo microtask với độ ưu tiên cao nhất
5. Sau khi synchronous code chạy xong, event loop thực thi:
   - Trước tiên: `process.nextTick()` → in `4`
   - Tiếp theo: Promise callback → in `3`
   - Cuối cùng: setTimeout callback trong Timers phase → in `2`

**process.nextTick() - Hàm Gọi Ngay Trong Tick Tiếp Theo**:

`process.nextTick()` là một hàm đặc biệt trong Node.js có độ ưu tiên cao nhất, thậm chí cao hơn cả các microtasks khác như Promises. Khi bạn gọi `process.nextTick(callback)`, callback sẽ được thêm vào nextTick queue và được thực thi ngay trước khi event loop tiếp tục với bất kỳ thao tác nào khác.

**Đặc Điểm Quan Trọng**:

1. **Độ Ưu Tiên Cao Nhất**: `process.nextTick()` callbacks được thực thi trước tất cả các callbacks khác, bao gồm cả Promise callbacks và các microtasks khác.

2. **Thực Thi Đệ Quy**: `process.nextTick()` callbacks được thực thi đệ quy (recursively) cho đến khi queue rỗng. Điều này có nghĩa là nếu một `process.nextTick()` callback gọi thêm `process.nextTick()` khác, tất cả sẽ được thực thi ngay lập tức, không chờ đến lần lặp tiếp theo của event loop.

3. **Nguy Cơ Blocking**: Vì `process.nextTick()` có độ ưu tiên cao và thực thi đệ quy, việc sử dụng quá mức có thể gây ra "starvation" (đói) của event loop. Nếu bạn tạo quá nhiều `process.nextTick()` callbacks, event loop sẽ bị block và không thể xử lý các thao tác I/O khác, dẫn đến hiệu suất kém.

**Khi Nào Sử Dụng process.nextTick()**:

- **Đảm Bảo Callback Được Thực Thi Trước Các Thao Tác Khác**: Khi bạn cần đảm bảo một callback được thực thi trước khi event loop tiếp tục, ví dụ như trong các thư viện cần khởi tạo trước khi user code chạy.

- **Xử Lý Lỗi Đồng Bộ**: Khi bạn cần xử lý lỗi một cách đồng bộ nhưng không muốn block code hiện tại.

- **Tránh Race Conditions**: Khi bạn cần đảm bảo một thao tác hoàn thành trước khi các thao tác khác bắt đầu.

**Ví Dụ Minh Họa**:

```javascript
console.log('Start');

process.nextTick(() => {
  console.log('nextTick 1');
  process.nextTick(() => {
    console.log('nextTick 2');
  });
});

Promise.resolve().then(() => {
  console.log('Promise 1');
});

console.log('End');
```

Kết quả: `Start`, `End`, `nextTick 1`, `nextTick 2`, `Promise 1`

Giải thích: Tất cả `process.nextTick()` callbacks được thực thi trước Promise callbacks, và chúng được thực thi đệ quy (nextTick 2 được thực thi ngay sau nextTick 1, không chờ đến lần lặp tiếp theo).

**setImmediate() vs setTimeout() - So Sánh Hai Hàm Lên Lịch**:

Đây là hai cách khác nhau để lên lịch callback trong Node.js, và sự khác biệt giữa chúng rất quan trọng để hiểu:

**setTimeout(fn, delay)**:

- Lên lịch callback trong **Timers phase** của event loop
- `delay` là thời gian tối thiểu (tính bằng milliseconds) trước khi callback được thực thi
- Nếu `delay = 0`, callback vẫn được lên lịch trong Timers phase, không phải thực thi ngay
- Thứ tự thực thi phụ thuộc vào thời gian hẹn: timers nào hết hạn trước sẽ được thực thi trước

**setImmediate(fn)**:

- Lên lịch callback trong **Check phase** của event loop
- Callback được thực thi ngay sau khi Poll phase hoàn thành
- Không có delay, callback được thực thi trong lần lặp hiện tại của event loop (nếu Poll phase đã hoàn thành) hoặc lần lặp tiếp theo

**Sự Khác Biệt Trong Thực Tế**:

Trong I/O cycle (khi có thao tác I/O), `setImmediate()` thường được thực thi trước `setTimeout(fn, 0)` vì:

1. Event loop đang ở Poll phase (đang xử lý I/O)
2. Khi Poll phase hoàn thành, Check phase được thực thi (nơi `setImmediate()` callbacks được thực thi)
3. Sau đó mới đến Timers phase (nơi `setTimeout()` callbacks được thực thi)

Tuy nhiên, ngoài I/O cycle (trong code synchronous), thứ tự thực thi phụ thuộc vào hiệu suất hệ thống và có thể không dự đoán được. Trong trường hợp này, `setImmediate()` có thể được thực thi trước hoặc sau `setTimeout(fn, 0)` tùy thuộc vào timing.

**Khi Nào Sử Dụng setImmediate()**:

- Khi bạn muốn callback được thực thi ngay sau khi Poll phase hoàn thành
- Khi bạn cần thứ tự thực thi dự đoán được trong I/O contexts
- Khi bạn muốn tránh delay tối thiểu của `setTimeout()`

**Khi Nào Sử Dụng setTimeout()**:

- Khi bạn cần delay cụ thể trước khi thực thi callback
- Khi bạn cần hủy timer (sử dụng `clearTimeout()`)
- Khi bạn cần lặp lại callback (sử dụng `setInterval()`)

**Ví Dụ Minh Họa**:

```javascript
// Trong I/O context
fs.readFile('file.txt', () => {
  setTimeout(() => console.log('setTimeout'), 0);
  setImmediate(() => console.log('setImmediate'));
});

// Kết quả: setImmediate, setTimeout
// (setImmediate được thực thi trước vì Check phase đến trước Timers phase)
```

```javascript
// Ngoài I/O context
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

// Kết quả: Có thể là setTimeout, setImmediate hoặc ngược lại
// (phụ thuộc vào hiệu suất hệ thống)
```

**Blocking Event Loop - Chặn Vòng Lặp Sự Kiện**:

Một trong những vấn đề quan trọng nhất khi làm việc với Node.js là tránh block (chặn) event loop. Vì event loop chạy trong một thread duy nhất, bất kỳ thao tác nào mất nhiều thời gian CPU sẽ chặn toàn bộ event loop, ngăn không cho các sự kiện và callbacks khác được xử lý.

**Các Thao Tác Có Thể Chặn Event Loop**:

1. **Synchronous File I/O**: Đọc/ghi file đồng bộ (như `fs.readFileSync()`) sẽ chặn event loop cho đến khi thao tác hoàn thành. Với file lớn, điều này có thể mất vài giây.

2. **CPU-bound Computations**: Các tính toán nặng về CPU như xử lý hình ảnh, mã hóa/giải mã, tính toán phức tạp sẽ chiếm CPU và chặn event loop.

3. **JSON.parse() với Objects Lớn**: Parse JSON objects rất lớn có thể mất nhiều thời gian và chặn event loop.

4. **Regex Operations với Patterns Phức Tạp**: Các biểu thức chính quy phức tạp trên chuỗi lớn có thể mất nhiều thời gian xử lý.

5. **Vòng Lặp Dài**: Các vòng lặp `for` hoặc `while` xử lý lượng dữ liệu lớn sẽ chặn event loop.

**Hậu Quả Của Blocking Event Loop**:

- **Không Phản Hồi**: Ứng dụng không thể xử lý các request mới
- **Timeout**: Các request có thể bị timeout
- **Trải Nghiệm Người Dùng Kém**: Giao diện bị đơ, không phản hồi
- **Mất Kết Nối**: Các kết nối có thể bị đóng do không phản hồi

**Giải Pháp**:

**1. Chia Nhỏ Công Việc (Chunking)**:

Sử dụng `setImmediate()` hoặc `process.nextTick()` để chia công việc lớn thành các phần nhỏ:

```javascript
// Thay vì xử lý tất cả cùng lúc
function processLargeArray(array) {
  let index = 0;

  function processChunk() {
    const chunk = array.slice(index, index + 100);
    // Xử lý chunk
    chunk.forEach((item) => {
      // Xử lý từng item
    });

    index += 100;

    if (index < array.length) {
      // Lên lịch xử lý chunk tiếp theo
      setImmediate(processChunk);
    }
  }

  processChunk();
}
```

**2. Worker Threads**:

Sử dụng module `worker_threads` cho các tác vụ CPU-intensive. Worker threads chạy trong thread riêng biệt, không chặn event loop chính:

```javascript
// Worker thread xử lý công việc nặng
// Main thread tiếp tục xử lý các request khác
```

**3. Child Processes**:

Sử dụng `child_process` để offload công việc nặng sang process riêng biệt. Điều này cung cấp sự cô lập hoàn toàn:

```javascript
// Spawn child process để xử lý công việc nặng
// Main process tiếp tục xử lý các request
```

**4. Sử Dụng Thư Viện Bất Đồng Bộ**:

Luôn ưu tiên sử dụng các hàm bất đồng bộ (async) thay vì đồng bộ (sync):

- `fs.readFile()` thay vì `fs.readFileSync()`
- `crypto.pbkdf2()` (async) thay vì tính toán đồng bộ

**Sơ Đồ So Sánh Blocking vs Non-Blocking**:

```
BLOCKING (Chặn):
┌─────────────────────────────────────┐
│ Event Loop bị chặn                 │
│ ┌───────────────────────────────┐  │
│ │ Xử lý công việc nặng (5 giây)│  │
│ └───────────────────────────────┘  │
│                                     │
│ ❌ Không thể xử lý request khác    │
│ ❌ Không thể xử lý I/O events      │
└─────────────────────────────────────┘

NON-BLOCKING (Không Chặn):
┌─────────────────────────────────────┐
│ Event Loop tiếp tục hoạt động      │
│ ┌─────┐  ┌─────┐  ┌─────┐         │
│ │Chunk│→ │Chunk│→ │Chunk│         │
│ └─────┘  └─────┘  └─────┘         │
│                                     │
│ ✅ Có thể xử lý request khác       │
│ ✅ Có thể xử lý I/O events         │
└─────────────────────────────────────┘
```

**Error Handling trong Async Code - Xử Lý Lỗi Trong Mã Bất Đồng Bộ**:

Xử lý lỗi trong mã bất đồng bộ là một thách thức quan trọng trong Node.js vì lỗi không tự động lan truyền (propagate) như trong mã đồng bộ. Nếu không được xử lý đúng cách, các lỗi không được bắt (unhandled errors) có thể làm crash ứng dụng.

**Vấn Đề Với Lỗi Bất Đồng Bộ**:

Trong mã đồng bộ, lỗi được lan truyền tự động thông qua call stack:

```javascript
// Synchronous - Lỗi được lan truyền tự động
function syncFunction() {
  throw new Error('Sync error');
}

try {
  syncFunction(); // Lỗi được bắt ở đây
} catch (error) {
  // Xử lý lỗi
}
```

Trong mã bất đồng bộ, lỗi không tự động lan truyền:

```javascript
// Asynchronous - Lỗi KHÔNG được lan truyền tự động
function asyncFunction() {
  setTimeout(() => {
    throw new Error('Async error'); // Lỗi này KHÔNG được bắt bởi try-catch bên ngoài
  }, 1000);
}

try {
  asyncFunction(); // try-catch này KHÔNG bắt được lỗi từ setTimeout
} catch (error) {
  // Không bao giờ chạy đến đây
}
```

**Các Loại Lỗi Bất Đồng Bộ**:

1. **Unhandled Promise Rejections**: Khi một Promise bị reject nhưng không có `.catch()` handler:

```javascript
Promise.reject(new Error('Unhandled rejection'));
// Lỗi này sẽ gây ra unhandledRejection event
```

2. **Uncaught Exceptions**: Khi một exception không được bắt trong try-catch:

```javascript
setTimeout(() => {
  throw new Error('Uncaught exception');
}, 1000);
// Lỗi này sẽ gây ra uncaughtException event
```

**Cách Xử Lý Lỗi Bất Đồng Bộ**:

**1. Sử Dụng try-catch với async/await**:

Với async/await, bạn có thể sử dụng try-catch như mã đồng bộ:

```javascript
async function handleRequest() {
  try {
    const data = await fetchData();
    const result = await processData(data);
    return result;
  } catch (error) {
    // Xử lý lỗi
    console.error('Error:', error);
    throw error; // Hoặc trả về giá trị mặc định
  }
}
```

**2. Sử Dụng .catch() với Promises**:

Với Promises, sử dụng `.catch()` để bắt lỗi:

```javascript
fetchData()
  .then((data) => processData(data))
  .then((result) => {
    // Xử lý kết quả
  })
  .catch((error) => {
    // Xử lý lỗi từ bất kỳ bước nào
    console.error('Error:', error);
  });
```

**3. Error Event Listeners - Lắng Nghe Sự Kiện Lỗi**:

Để bắt các lỗi không được xử lý, sử dụng error event listeners:

```javascript
// Bắt uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Log lỗi, cleanup, và shutdown gracefully
  process.exit(1);
});

// Bắt unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Log lỗi và xử lý
});
```

**4. Error Boundaries - Ranh Giới Lỗi**:

Error boundaries là các điểm trong code nơi bạn bắt và xử lý lỗi, ngăn không cho lỗi lan truyền ra ngoài:

```javascript
// Error boundary cho async operations
async function safeAsyncOperation(operation) {
  try {
    return await operation();
  } catch (error) {
    // Log và xử lý lỗi
    logger.error('Operation failed:', error);
    // Trả về giá trị mặc định hoặc throw error đã được xử lý
    return defaultValue;
  }
}
```

**5. Graceful Degradation - Suy Giảm Nhẹ Nhàng**:

Khi một phần của hệ thống gặp lỗi, hệ thống nên tiếp tục hoạt động với chức năng hạn chế thay vì crash hoàn toàn:

```javascript
async function getProductData(productId) {
  try {
    return await fetchFromDatabase(productId);
  } catch (error) {
    // Nếu database lỗi, thử lấy từ cache
    try {
      return await fetchFromCache(productId);
    } catch (cacheError) {
      // Nếu cache cũng lỗi, trả về dữ liệu mặc định
      return getDefaultProductData();
    }
  }
}
```

**Sơ Đồ Luồng Xử Lý Lỗi**:

```
Async Operation
        │
        ▼
    Thành công?
        │
    ┌───┴───┐
    │       │
   Có      Không
    │       │
    ▼       ▼
  Return  Throw Error
  Result      │
              ▼
        Có .catch()?
              │
        ┌─────┴─────┐
        │           │
       Có          Không
        │           │
        ▼           ▼
    Xử lý lỗi  unhandledRejection
        │           │
        ▼           ▼
    Continue    Log & Handle
```

**Best Practices - Thực Hành Tốt Nhất**:

1. **Luôn Xử Lý Lỗi**: Mọi async operation nên có error handling
2. **Log Lỗi**: Ghi log tất cả lỗi để debug và monitor
3. **Không Bỏ Qua Lỗi**: Không bao giờ bỏ qua lỗi bằng cách để trống catch block
4. **Graceful Shutdown**: Khi có lỗi nghiêm trọng, shutdown ứng dụng một cách có kiểm soát
5. **Error Context**: Cung cấp context đầy đủ trong error messages để dễ debug
6. **Retry Logic**: Với lỗi tạm thời, implement retry logic
7. **Circuit Breaker**: Sử dụng circuit breaker pattern để tránh cascade failures

### 2.4 Express Framework Architecture - Kiến Trúc Framework Express

Express là một web framework tối giản và linh hoạt cho Node.js, cung cấp một lớp mỏng (thin layer) trên Node.js HTTP module. Express không thêm nhiều abstraction, mà cung cấp các công cụ cần thiết để xây dựng web applications và APIs một cách nhanh chóng và hiệu quả.

**Middleware Pattern - Mẫu Middleware**:

Middleware (phần mềm trung gian) là các hàm có chữ ký (signature) `(req, res, next)` với quyền truy cập đến:

- **req (request object)**: Đối tượng chứa thông tin về HTTP request (headers, body, params, query, etc.)
- **res (response object)**: Đối tượng để gửi HTTP response (status, headers, body)
- **next function**: Hàm để chuyển control sang middleware tiếp theo trong chuỗi

**Cách Middleware Hoạt Động**:

Middleware được thực thi theo thứ tự được đăng ký (registered). Mỗi middleware có thể:

1. **Thực thi code**: Thực hiện các thao tác như logging, authentication, validation
2. **Sửa đổi request/response**: Thêm thông tin vào req hoặc res (ví dụ: parse body, set headers)
3. **Kết thúc request-response cycle**: Gửi response và dừng chuỗi middleware (sử dụng `res.send()`, `res.json()`, `res.end()`)
4. **Gọi middleware tiếp theo**: Gọi `next()` để chuyển control sang middleware tiếp theo

**Sơ Đồ Luồng Middleware**:

```
Request đến
    │
    ▼
┌───────────────────┐
│ Middleware 1      │ ← Authentication
│ (Kiểm tra token)  │
└────────┬──────────┘
         │ next()
         ▼
┌───────────────────┐
│ Middleware 2      │ ← Logging
│ (Ghi log request) │
└────────┬──────────┘
         │ next()
         ▼
┌───────────────────┐
│ Middleware 3      │ ← Body Parser
│ (Parse JSON body) │
└────────┬──────────┘
         │ next()
         ▼
┌───────────────────┐
│ Route Handler     │ ← Xử lý request
│ (Business logic)  │
└────────┬──────────┘
         │
         ▼
    Response
```

**Các Loại Middleware**:

**1. Application-level Middleware**:

Middleware được áp dụng cho tất cả routes trong ứng dụng. Middleware này được đăng ký bằng `app.use()` và sẽ được thực thi cho mọi request đến ứng dụng, bất kể route nào.

**2. Route-level Middleware**:

Middleware chỉ áp dụng cho một route cụ thể hoặc một nhóm routes. Middleware này được đăng ký bằng `router.use()` hoặc được truyền trực tiếp vào route handler.

**3. Error-handling Middleware**:

Middleware xử lý lỗi có signature `(err, req, res, next)` - có thêm tham số `err` ở đầu. Middleware này phải được đặt sau tất cả middleware và route handlers khác để có thể bắt được mọi lỗi.

**Request/Response Objects**: Express extends Node.js request và response objects với additional properties và methods:

- **Request Extensions**: req.params (route parameters), req.query (query string parameters), req.body (parsed request body), req.cookies (parsed cookies), req.headers (request headers), req.ip (client IP), req.path (request path), req.hostname (hostname from Host header)

- **Response Extensions**: res.json() (send JSON response), res.send() (send response với automatic content-type), res.render() (render template), res.status() (set status code), res.cookie() (set cookie), res.redirect() (redirect request), res.setHeader() (set response header)

**Routing System**: Express routing system match HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.) và URL patterns với route handlers. Routes có thể be defined với string patterns (static paths), regular expressions (flexible matching), và parameters (dynamic segments với :paramName). Route parameters được extract và available trong req.params. Routes có thể be organized using Router instances để create modular route handlers.

**Template Engines**: Express hỗ trợ template engines cho server-side rendering thông qua app.set('view engine', 'engine-name'). Template engines như EJS, Pug, Handlebars có thể be integrated. Trong API context, JSON responses thường được sử dụng thay vì templates. Template engines hữu ích cho admin panels, email templates, và server-rendered pages.

**Error Handling Middleware**: Error handling middleware có signature (err, req, res, next) và được đặt sau tất cả other middleware. Error middleware catch errors từ synchronous code (try-catch) và asynchronous code (promise rejections). Error middleware có thể log errors, send error responses, và perform cleanup. Multiple error handlers có thể be chained để handle different error types.

**Static File Serving**: Express có thể serve static files (CSS, JavaScript, images) từ a directory sử dụng express.static() middleware. Static middleware map URL paths với file system paths và serve files với appropriate MIME types. Static files có thể be cached với appropriate headers để improve performance. Static middleware có thể be mounted tại specific paths.

**Body Parsing**: Express không parse request bodies by default. Body parsing middleware như express.json() (parse JSON bodies), express.urlencoded() (parse URL-encoded bodies), và express.text() (parse text bodies) cần be used. Third-party middleware như multer handle multipart/form-data (file uploads). Body size limits có thể be configured để prevent DoS attacks.

**Security Middleware**: Express ecosystem cung cấp security middleware:

- **helmet**: Set security HTTP headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, etc.) để prevent common attacks

- **cors**: Configure Cross-Origin Resource Sharing với fine-grained control over allowed origins, methods, và headers

- **express-rate-limit**: Rate limiting để prevent abuse và DDoS attacks với configurable limits per IP, window, và message

- **express-validator**: Input validation và sanitization với comprehensive validation rules và custom validators

- **express-mongo-sanitize**: Sanitize user input để prevent NoSQL injection attacks

**Performance Optimization**: Express performance có thể be optimized through:

- **Compression**: Use compression middleware (gzip, deflate) để reduce response size

- **ETags**: Enable ETags cho conditional requests và caching

- **Cluster Mode**: Use Node.js cluster module để utilize multiple CPU cores

- **Reverse Proxy**: Use reverse proxy (nginx) để handle static files và load balancing

### 2.5 HTTP Protocol và RESTful Architecture

HTTP là foundation protocol cho web communication và RESTful APIs:

**HTTP Methods**: HTTP định nghĩa methods cho different operations trên resources:

- **GET**: Retrieve resource representation (idempotent, safe, cacheable). GET requests không nên modify server state.

- **POST**: Create new resource hoặc submit data (not idempotent, not safe). POST requests thường contain request body với data to create.

- **PUT**: Replace resource hoàn toàn (idempotent, not safe). PUT requests replace entire resource, not partial updates.

- **PATCH**: Partial resource update (idempotent, not safe). PATCH requests update only specified fields.

- **DELETE**: Remove resource (idempotent, not safe). DELETE requests remove resource identified by URI.

- **HEAD**: Retrieve headers only, không có response body (idempotent, safe). Useful cho checking resource existence và metadata.

- **OPTIONS**: Retrieve allowed methods và CORS information (idempotent, safe). Used cho preflight requests trong CORS.

**HTTP Status Codes**: Status codes communicate request results với semantic meaning:

- **2xx Success**: 200 (OK - successful GET, PUT, PATCH), 201 (Created - successful POST), 202 (Accepted - async processing), 204 (No Content - successful DELETE, no body)

- **3xx Redirection**: 301 (Moved Permanently), 302 (Found - temporary redirect), 304 (Not Modified - conditional GET, use cached version)

- **4xx Client Error**: 400 (Bad Request - malformed request), 401 (Unauthorized - authentication required), 403 (Forbidden - authenticated but not authorized), 404 (Not Found), 409 (Conflict - resource conflict), 422 (Unprocessable Entity - validation errors), 429 (Too Many Requests - rate limiting)

- **5xx Server Error**: 500 (Internal Server Error), 502 (Bad Gateway - upstream server error), 503 (Service Unavailable - temporary unavailability), 504 (Gateway Timeout)

**HTTP Headers**: Headers provide metadata về request và response:

- **Content-Type**: Media type của body (application/json, application/xml, application/x-www-form-urlencoded, multipart/form-data)

- **Authorization**: Credentials cho authentication (Bearer tokens, Basic auth, API keys)

- **Cache-Control**: Caching directives (no-cache, no-store, max-age, must-revalidate)

- **ETag**: Entity tag cho conditional requests (If-None-Match, If-Match)

- **Last-Modified**: Timestamp cho conditional requests (If-Modified-Since)

- **CORS Headers**: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Expose-Headers

- **Rate Limiting Headers**: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

**REST Architectural Constraints**: REST có sáu constraints define architectural style:

1. **Client-Server**: Separation of concerns giữa client và server. Client không cần biết về server storage, server không cần biết về client UI.

2. **Stateless**: Mỗi request contains all information cần thiết. Server không store client context giữa requests. Session state được maintain ở client (cookies, tokens).

3. **Cacheable**: Responses phải indicate whether they can be cached. Caching có thể improve performance và reduce server load. Cacheable responses include Cache-Control headers.

4. **Uniform Interface**: Consistent interface giữa client và server. Interface includes: resource identification (URIs), resource manipulation through representations, self-descriptive messages, và hypermedia as engine of application state (HATEOAS).

5. **Layered System**: Architecture có thể consist of multiple layers (proxies, gateways, load balancers). Clients không biết whether they are connected directly to server hay through intermediate layers.

6. **Code on Demand** (optional): Server có thể send executable code (JavaScript) cho clients. Rarely used trong REST APIs.

**Resource Identification**: Resources được identify bởi URIs (Uniform Resource Identifiers). URIs nên be hierarchical và descriptive. RESTful URIs không nên contain verbs (actions), chỉ nouns (resources). URIs nên be stable và not change frequently. Versioning có thể be done through URI paths (/api/v1/) hoặc headers (Accept: application/vnd.api+json;version=1).

**HATEOAS** (Hypermedia as the Engine of Application State): HATEOAS cho phép clients discover available actions từ response hypermedia links. Responses include links to related resources và available actions. Điều này làm cho APIs self-describing và evolvable. Clients navigate API through links rather than hardcoding URLs.

**Content Negotiation**: Content negotiation cho phép clients request different representations của same resource. Negotiation done through Accept header (response format) và Content-Type header (request format). Server responds với appropriate representation based on client preferences và server capabilities.

## 3. Kiến Trúc NestJS

### 3.1 Module System và Dependency Graph - Hệ Thống Module và Đồ Thị Phụ Thuộc

NestJS sử dụng hệ thống module (module system) để tổ chức ứng dụng thành các module độc lập và có thể tái sử dụng. Module là đơn vị cơ bản của tổ chức code trong NestJS, tương tự như package trong Java hoặc namespace trong C#.

**Khái Niệm Module**:

Module là một class được đánh dấu bằng decorator `@Module()`, đóng vai trò như một container chứa các thành phần liên quan (controllers, services, providers). Mỗi module đại diện cho một chức năng cụ thể của ứng dụng, ví dụ: UserModule quản lý tất cả các chức năng liên quan đến người dùng, ProductModule quản lý các chức năng liên quan đến sản phẩm.

**Cấu Trúc Module Definition**:

Mỗi module được định nghĩa bằng decorator `@Module()` với một đối tượng cấu hình (configuration object) chứa bốn thuộc tính chính:

- **imports (Mảng các module được import)**: Danh sách các module khác mà module hiện tại cần sử dụng. Khi một module được import, các providers được export từ module đó sẽ trở nên khả dụng trong module hiện tại. Imports tạo ra mối quan hệ phụ thuộc (dependency relationships) giữa các modules, cho phép module này sử dụng các chức năng của module khác.

- **controllers (Mảng các controllers)**: Danh sách các controllers thuộc về module này. Controllers xử lý các HTTP requests và định nghĩa các API endpoints. Controllers được đăng ký với hệ thống routing của NestJS, cho phép chúng nhận và xử lý các request đến các routes cụ thể.

- **providers (Mảng các providers)**: Danh sách các providers (services, repositories, factories, v.v.) thuộc về module này. Providers có thể được inject (tiêm) vào các providers khác và controllers trong cùng module thông qua dependency injection. Providers được đăng ký trong DI container (dependency injection container) và được quản lý bởi NestJS.

- **exports (Mảng các providers được export)**: Danh sách các providers được export từ module này. Chỉ các providers được export mới có thể được sử dụng bởi các module khác import module này. Exports định nghĩa API công khai (public API) của module, cho phép kiểm soát những gì module này cung cấp cho các module khác.

**Sơ Đồ Cấu Trúc Module**:

```
┌─────────────────────────────────────┐
│         Module Definition           │
│         (@Module decorator)          │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │  imports: [OtherModule]       │ │ ← Import modules khác
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  controllers: [Controller]    │ │ ← Xử lý HTTP requests
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  providers: [Service, Repo]   │ │ ← Business logic
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  exports: [Service]           │ │ ← Public API
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Sơ Đồ Dependency Graph - Đồ Thị Phụ Thuộc**:

```
        ┌─────────────┐
        │  AppModule  │ ← Root module
        │  (Gốc)      │
        └──────┬──────┘
               │
    ┌──────────┼──────────┐
    │          │          │
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│User    │ │Product │ │Order   │
│Module  │ │Module  │ │Module  │
└───┬────┘ └───┬────┘ └───┬────┘
    │          │          │
    │          │          │
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│Database│ │Cache   │ │Payment │
│Module  │ │Module  │ │Module  │
└────────┘ └────────┘ └────────┘
```

Đồ thị này cho thấy AppModule là module gốc, import các feature modules (UserModule, ProductModule, OrderModule), và các feature modules này có thể import các shared modules (DatabaseModule, CacheModule, PaymentModule).

**Module Encapsulation - Đóng Gói Module**:

Encapsulation (đóng gói) là một nguyên tắc quan trọng trong module system của NestJS. Encapsulation đảm bảo rằng các providers của một module không thể được truy cập từ module khác trừ khi chúng được export một cách rõ ràng.

**Lợi Ích Của Encapsulation**:

1. **Ngăn Chặn Phụ Thuộc Ngẫu Nhiên**: Encapsulation ngăn không cho các module vô tình phụ thuộc vào các providers không được export, giảm thiểu rủi ro về lỗi và khó bảo trì.

2. **Thực Thi Ranh Giới Module Rõ Ràng**: Encapsulation buộc developers phải suy nghĩ cẩn thận về những gì module cung cấp cho các module khác, tạo ra ranh giới rõ ràng giữa các modules.

3. **Tách Biệt Mối Quan Tâm (Separation of Concerns)**: Encapsulation giúp tách biệt các mối quan tâm, mỗi module chỉ tập trung vào một chức năng cụ thể, làm cho code dễ hiểu và dễ bảo trì hơn.

4. **Làm Rõ Phụ Thuộc**: Encapsulation làm cho các phụ thuộc trở nên rõ ràng và minh bạch. Khi một module cần sử dụng provider từ module khác, nó phải import module đó và provider phải được export. Điều này giúp developers dễ dàng hiểu được cấu trúc phụ thuộc của ứng dụng.

5. **Ngăn Chặn Tight Coupling**: Encapsulation giúp ngăn chặn tight coupling (sự kết hợp chặt chẽ) giữa các modules. Khi các modules không thể truy cập trực tiếp vào implementation details của nhau, chúng trở nên lỏng lẻo hơn (loose coupling), dễ dàng thay đổi và test hơn.

**Sơ Đồ Minh Họa Encapsulation**:

```
Module A                    Module B
┌─────────────┐            ┌─────────────┐
│ Service A   │            │ Service B   │
│ (private)   │            │ (exported)  │
│             │            │             │
│ Service C   │            │ Service D   │
│ (exported)  │───────────▶│ (private)   │
└─────────────┘            └─────────────┘
     │                          │
     │                          │
     └──────────┬───────────────┘
                │
                ▼
        Module A chỉ có thể
        sử dụng Service B
        (vì Service B được export)

        Module B KHÔNG thể
        sử dụng Service A
        (vì Service A không được export)
```

**Feature Modules - Module Chức Năng**:

Feature modules là các module được tổ chức theo chức năng (features) của ứng dụng. Mỗi feature module quản lý một phần chức năng cụ thể, ví dụ: UserModule quản lý tất cả các chức năng liên quan đến người dùng (đăng ký, đăng nhập, quản lý profile), ProductModule quản lý các chức năng liên quan đến sản phẩm (tạo, sửa, xóa, tìm kiếm sản phẩm), OrderModule quản lý các chức năng liên quan đến đơn hàng (tạo đơn, xử lý đơn, theo dõi đơn).

**Cấu Trúc Feature Module**:

Mỗi feature module thường chứa:

- **Controllers**: Xử lý các HTTP requests liên quan đến feature đó
- **Services**: Chứa business logic của feature
- **Repositories**: Xử lý truy cập dữ liệu cho feature
- **Entities**: Định nghĩa các entity (bảng database) liên quan đến feature
- **DTOs (Data Transfer Objects)**: Định nghĩa cấu trúc dữ liệu cho input/output

**Lợi Ích Của Feature-Based Organization**:

1. **Dễ Điều Hướng Codebase**: Khi code được tổ chức theo features, developers dễ dàng tìm thấy code liên quan đến một chức năng cụ thể. Tất cả code liên quan đến "User" sẽ nằm trong UserModule.

2. **Dễ Bảo Trì**: Khi cần sửa đổi hoặc thêm tính năng mới cho một feature, developers chỉ cần làm việc trong module tương ứng, không ảnh hưởng đến các module khác.

3. **Dễ Test**: Feature modules có thể được test độc lập. Mỗi module có thể có test suite riêng, và các dependencies có thể được mock dễ dàng.

4. **Bounded Context trong Domain-Driven Design**: Mỗi feature module đại diện cho một bounded context (ngữ cảnh giới hạn) trong domain-driven design. Bounded context là một ranh giới rõ ràng trong đó một domain model cụ thể được định nghĩa và áp dụng. Điều này giúp quản lý complexity của domain model trong các ứng dụng lớn.

**Sơ Đồ Tổ Chức Feature Modules**:

```
Application Root
      │
      ├─── UserModule
      │    ├─── UserController
      │    ├─── UserService
      │    ├─── UserRepository
      │    └─── User Entity
      │
      ├─── ProductModule
      │    ├─── ProductController
      │    ├─── ProductService
      │    ├─── ProductRepository
      │    └─── Product Entity
      │
      └─── OrderModule
           ├─── OrderController
           ├─── OrderService
           ├─── OrderRepository
           └─── Order Entity
```

Mỗi feature module là độc lập và có thể được phát triển, test, và deploy riêng biệt (trong kiến trúc microservices).

**Shared Modules - Module Dùng Chung**:

Shared modules là các module được chia sẻ giữa nhiều feature modules, cho phép tái sử dụng code và tránh trùng lặp (duplication). Shared modules thường chứa các chức năng chung mà nhiều feature modules cần sử dụng.

**Các Loại Shared Modules**:

1. **DatabaseModule**: Module quản lý kết nối database, cung cấp database connection cho các feature modules. Module này thường chứa cấu hình TypeORM và export DataSource hoặc Repository factories.

2. **ConfigModule**: Module quản lý cấu hình ứng dụng, cung cấp các biến môi trường và cấu hình cho các module khác. Module này thường sử dụng thư viện như @nestjs/config để load và validate cấu hình.

3. **LoggerModule**: Module cung cấp logging functionality cho toàn bộ ứng dụng. Module này thường wrap một logging library (như Winston, Pino) và cung cấp logger service có thể được inject vào các module khác.

4. **CacheModule**: Module quản lý caching, cung cấp cache service cho các feature modules. Module này có thể tích hợp với Redis hoặc in-memory cache.

5. **AuthModule**: Module quản lý authentication và authorization, cung cấp guards, strategies, và services liên quan đến bảo mật.

**Lợi Ích Của Shared Modules**:

- **Tái Sử Dụng Code**: Tránh việc duplicate code giữa các feature modules
- **Consistency**: Đảm bảo tất cả modules sử dụng cùng một implementation cho các chức năng chung
- **Centralized Configuration**: Quản lý cấu hình tập trung, dễ dàng thay đổi và maintain
- **Single Source of Truth**: Một nơi duy nhất định nghĩa các chức năng chung, tránh inconsistency

**Best Practices cho Shared Modules**:

- **Documentation**: Shared modules nên được document kỹ lưỡng để đảm bảo các developers biết cách sử dụng đúng
- **Stability**: Shared modules nên ổn định, không thay đổi thường xuyên vì thay đổi sẽ ảnh hưởng đến nhiều feature modules
- **Clear API**: Shared modules nên có API rõ ràng và dễ sử dụng
- **Versioning**: Khi cần thay đổi breaking changes, nên sử dụng versioning để đảm bảo backward compatibility

**Global Modules - Module Toàn Cục**:

Global modules là các module được đánh dấu bằng decorator `@Global()`, cho phép các module khác sử dụng providers của nó mà không cần import một cách rõ ràng. Khi một module được đánh dấu là global, các providers được export từ module đó sẽ tự động khả dụng trong tất cả các module khác trong ứng dụng.

**Khi Nào Sử Dụng Global Modules**:

Global modules hữu ích cho các services chung được sử dụng ở khắp nơi trong ứng dụng:

1. **Configuration Service**: Service quản lý cấu hình ứng dụng thường được sử dụng ở mọi nơi, nên có thể được đặt trong global module.

2. **Logger Service**: Logging thường được sử dụng trong tất cả các module, nên logger service có thể được đặt trong global module.

3. **Database Connection**: Database connection thường được sử dụng bởi nhiều modules, nên có thể được đặt trong global module.

**Lưu Ý Khi Sử Dụng Global Modules**:

1. **Sử Dụng Tiết Kiệm**: Global modules nên được sử dụng một cách tiết kiệm (sparingly). Việc sử dụng quá nhiều global modules có thể làm cho dependency graph (đồ thị phụ thuộc) trở nên không rõ ràng, vì các dependencies trở nên implicit (ngầm định) thay vì explicit (rõ ràng).

2. **Tránh Tight Coupling**: Global modules có thể dẫn đến tight coupling nếu không cẩn thận. Khi một module phụ thuộc vào global module, sự phụ thuộc này không được thể hiện rõ ràng trong imports, làm cho code khó hiểu và khó maintain.

3. **Làm Rõ Dependencies**: Khi sử dụng global modules, nên document rõ ràng các dependencies để developers biết module nào phụ thuộc vào global module nào.

**Sơ Đồ So Sánh Global vs Non-Global Modules**:

```
NON-GLOBAL MODULE:
┌─────────────┐      ┌─────────────┐
│ Module A    │      │ Module B    │
│             │      │             │
│ imports:    │      │ imports:    │
│ [ConfigMod] │      │ [ConfigMod] │ ← Phải import rõ ràng
└─────────────┘      └─────────────┘

GLOBAL MODULE:
┌─────────────┐      ┌─────────────┐
│ Module A    │      │ Module B    │
│             │      │             │
│ (không cần  │      │ (không cần  │
│  import)    │      │  import)    │
└─────────────┘      └─────────────┘
        │                  │
        └──────────┬────────┘
                   │
                   ▼
          ┌─────────────┐
          │ ConfigModule│ ← Global, tự động khả dụng
          │ (@Global()) │
          └─────────────┘
```

**Best Practice**: Chỉ sử dụng `@Global()` cho các services thực sự cần thiết ở mọi nơi và ít thay đổi. Với các services khác, nên sử dụng explicit imports để làm rõ dependencies.

**Dynamic Modules - Module Động**:

Dynamic modules là các module có thể được cấu hình (configure) tại runtime với cấu hình tùy chỉnh. Khác với static modules (module tĩnh) được định nghĩa trực tiếp với `@Module()`, dynamic modules trả về module definition từ một static method (phương thức tĩnh) như `forRoot()`, `forFeature()`, `forRootAsync()`, v.v.

**Tại Sao Cần Dynamic Modules**:

1. **Cấu Hình Linh Hoạt**: Dynamic modules cho phép modules nhận cấu hình khác nhau tùy thuộc vào context sử dụng. Ví dụ, TypeOrmModule có thể được cấu hình với các database connections khác nhau cho các môi trường khác nhau (development, staging, production).

2. **Tái Sử Dụng**: Dynamic modules cho phép một module được sử dụng lại trong nhiều contexts khác nhau với cấu hình khác nhau, mà không cần tạo nhiều module classes riêng biệt.

3. **Async Configuration**: Dynamic modules hỗ trợ async configuration (cấu hình bất đồng bộ), cho phép load cấu hình từ file, environment variables, hoặc external services một cách bất đồng bộ.

**Cách Dynamic Modules Hoạt Động**:

Dynamic modules sử dụng static methods để tạo và trả về module definition. Các static methods phổ biến:

- **forRoot()**: Tạo module với cấu hình chính (root configuration), thường được gọi một lần trong AppModule
- **forFeature()**: Tạo module với cấu hình cho một feature cụ thể, thường được gọi trong các feature modules
- **forRootAsync()**: Tạo module với async configuration, cho phép inject dependencies và load cấu hình bất đồng bộ

**Ví Dụ Sử Dụng Dynamic Modules**:

TypeOrmModule.forRoot() là một ví dụ điển hình của dynamic module. Khi bạn gọi `TypeOrmModule.forRoot({...})`, nó trả về một module definition đã được cấu hình với database connection options. Module này sau đó được import vào AppModule.

**Sơ Đồ Luồng Dynamic Module**:

```
AppModule
    │
    │ import TypeOrmModule.forRoot({...})
    │
    ▼
┌─────────────────────┐
│ TypeOrmModule       │
│ .forRoot(config)    │ ← Static method
│                     │
│ Returns:            │
│ @Module({           │
│   providers: [      │
│     DataSource      │ ← Provider được tạo với config
│   ]                 │
│ })                  │
└─────────────────────┘
```

**Lợi Ích Của Dynamic Modules**:

- **Flexibility**: Cho phép cấu hình linh hoạt tại runtime
- **Reusability**: Có thể tái sử dụng với nhiều cấu hình khác nhau
- **Testability**: Dễ dàng test với các cấu hình khác nhau
- **Separation of Concerns**: Tách biệt module definition khỏi configuration

**Module Dependency Graph - Đồ Thị Phụ Thuộc Module**:

NestJS xây dựng dependency graph (đồ thị phụ thuộc) từ các module imports để xác định thứ tự khởi tạo (initialization order). Đồ thị này đảm bảo rằng các modules được khởi tạo theo đúng thứ tự: các modules phụ thuộc (dependencies) được khởi tạo trước, các modules phụ thuộc vào chúng (dependents) được khởi tạo sau.

**Cách Dependency Graph Được Xây Dựng**:

1. **Phân Tích Imports**: NestJS phân tích tất cả các module imports trong ứng dụng để xây dựng đồ thị phụ thuộc. Mỗi import tạo ra một edge (cạnh) trong đồ thị từ module import đến module được import.

2. **Topological Sort**: NestJS sử dụng topological sort (sắp xếp tô-pô) để xác định thứ tự khởi tạo. Topological sort đảm bảo rằng nếu module A phụ thuộc vào module B, thì B sẽ được khởi tạo trước A.

3. **Phát Hiện Circular Dependencies**: Trong quá trình xây dựng đồ thị, NestJS phát hiện circular dependencies (phụ thuộc vòng tròn) - tình huống module A phụ thuộc vào module B, và module B lại phụ thuộc vào module A. Circular dependencies gây ra lỗi trong quá trình bootstrap.

**Sơ Đồ Dependency Graph**:

```
        AppModule (Root)
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
UserModule ProductModule OrderModule
    │         │         │
    │         │         │
    └─────────┼─────────┘
              │
              ▼
        DatabaseModule
              │
              ▼
        ConfigModule
```

Thứ tự khởi tạo: ConfigModule → DatabaseModule → UserModule, ProductModule, OrderModule → AppModule

**Circular Dependencies - Phụ Thuộc Vòng Tròn**:

Circular dependency xảy ra khi hai hoặc nhiều modules phụ thuộc lẫn nhau trực tiếp hoặc gián tiếp:

```
Module A ──imports──> Module B
    ▲                      │
    │                      │
    └──imports─────────────┘

Đây là circular dependency!
```

NestJS phát hiện circular dependencies trong quá trình bootstrap và throw error. Để giải quyết, bạn có thể:

1. **Refactor Modules**: Tách code chung ra một module thứ ba
2. **Sử dụng forwardRef()**: Defer resolution của một dependency
3. **Restructure Architecture**: Thiết kế lại kiến trúc để tránh circular dependencies

**Lợi Ích Của Dependency Graph**:

- **Đảm Bảo Thứ Tự Khởi Tạo Đúng**: Các dependencies luôn được khởi tạo trước dependents
- **Phát Hiện Lỗi Sớm**: Circular dependencies được phát hiện ngay trong quá trình bootstrap
- **Tối Ưu Hóa**: NestJS có thể tối ưu hóa quá trình khởi tạo dựa trên dependency graph

**Lazy Modules - Module Lười**:

Lazy modules (module lười) là các module được load on-demand (theo yêu cầu) thay vì được load ngay khi ứng dụng khởi động (at startup). Lazy loading là một kỹ thuật tối ưu hóa cho phép trì hoãn việc load các modules cho đến khi chúng thực sự cần thiết.

**Lợi Ích Của Lazy Loading**:

1. **Cải Thiện Thời Gian Khởi Động**: Với các ứng dụng lớn có nhiều modules, lazy loading có thể cải thiện đáng kể thời gian khởi động (startup time) bằng cách chỉ load các modules cần thiết ban đầu.

2. **Tiết Kiệm Tài Nguyên**: Lazy modules không được load cho đến khi cần thiết, tiết kiệm memory và CPU trong quá trình khởi động.

3. **Optional Features**: Lazy modules hữu ích cho các tính năng tùy chọn (optional features) hoặc plugins có thể không luôn được sử dụng. Ví dụ, một module quản lý báo cáo có thể chỉ được load khi người dùng thực sự cần xem báo cáo.

4. **Code Splitting**: Lazy loading cho phép code splitting, giúp giảm kích thước bundle ban đầu và cải thiện hiệu suất.

**Cách Lazy Modules Hoạt Động**:

Lazy modules được load khi:

- Một route handler trong module đó được gọi lần đầu tiên
- Một provider từ module đó được inject lần đầu tiên
- Module được import một cách động (dynamic import)

Khác với eager modules (module háo hức) được load ngay trong quá trình bootstrap, lazy modules được load trong quá trình runtime khi chúng được truy cập lần đầu tiên.

**Khi Nào Sử Dụng Lazy Modules**:

- **Optional Features**: Các tính năng không bắt buộc, chỉ được sử dụng trong một số trường hợp cụ thể
- **Large Modules**: Các modules lớn với nhiều dependencies, có thể làm chậm quá trình khởi động
- **Plugin System**: Các plugins có thể được load động dựa trên cấu hình hoặc user preferences
- **Admin Features**: Các tính năng admin có thể chỉ được load khi admin đăng nhập

**Trade-offs - Đánh Đổi**:

- **Latency**: Lần đầu tiên truy cập lazy module sẽ có độ trễ (latency) do module cần được load
- **Complexity**: Lazy loading thêm complexity vào ứng dụng, cần quản lý loading state
- **Error Handling**: Cần xử lý lỗi khi lazy module không thể load được

**Sơ Đồ So Sánh Eager vs Lazy Loading**:

```
EAGER LOADING (Load Ngay):
Application Start
    │
    ▼
Load All Modules ──┐
    │              │
    ▼              │
Initialize All    │
    │              │
    ▼              │
Ready (chậm) ◄────┘

LAZY LOADING (Load Theo Yêu Cầu):
Application Start
    │
    ▼
Load Core Modules
    │
    ▼
Ready (nhanh)
    │
    ▼
User Request ──► Load Module On-Demand
    │                  │
    │                  ▼
    │            Initialize Module
    │                  │
    └──────────────────┘
            │
            ▼
        Process Request
```

### 3.2 Controllers và Request Handling

Controllers xử lý incoming HTTP requests và trả về responses cho clients:

**Controller Definition**: Controllers được định nghĩa bằng @Controller() decorator với optional path prefix. Path prefix được prepend to all routes trong controller. Controllers contain route handlers được map với HTTP methods và paths. Controllers are registered trong module's controllers array.

**Route Handlers**: Route handlers được định nghĩa bằng decorators như @Get(), @Post(), @Put(), @Delete(), @Patch() với optional path. Route handlers có thể receive path parameters, query parameters, request body, headers, và other request data. Handlers return values được automatically serialize thành JSON responses (hoặc use @Res() để manual control). Route paths có thể contain parameters (:id) và wildcards (\*).

**Request Objects - Đối Tượng Request**:

Controllers có thể inject (tiêm) các đối tượng request để truy cập thông tin từ HTTP request. NestJS cung cấp các decorators để extract các phần khác nhau của request:

**1. Route Parameters - Tham Số Route**:

Route parameters là các giá trị động trong URL path. Ví dụ, trong route `/users/:id`, `id` là một route parameter. Sử dụng decorator `@Param()` để extract route parameters. Có thể chỉ định tên parameter cụ thể hoặc lấy tất cả parameters dưới dạng object.

Ví dụ: Request đến `/users/123` → `@Param('id')` sẽ trả về `'123'`, hoặc `@Param()` sẽ trả về `{ id: '123' }`.

**2. Query Parameters - Tham Số Query**:

Query parameters là các tham số trong query string của URL. Ví dụ, trong URL `/users?page=1&limit=10`, `page` và `limit` là query parameters. Sử dụng decorator `@Query()` để extract query parameters. Có thể chỉ định tên parameter cụ thể hoặc lấy tất cả query parameters dưới dạng object.

**3. Request Body - Thân Request**:

Request body chứa dữ liệu được gửi trong body của HTTP request, thường là JSON. Sử dụng decorator `@Body()` để extract request body. Có thể chỉ định một DTO (Data Transfer Object) class để validation và transformation tự động. NestJS sẽ validate dữ liệu theo các rules được định nghĩa trong DTO class và transform dữ liệu nếu cần.

**4. Headers - Tiêu Đề HTTP**:

Headers chứa metadata về request. Sử dụng decorator `@Headers()` để extract headers. Có thể chỉ định tên header cụ thể hoặc lấy tất cả headers dưới dạng object. Headers thường được sử dụng cho authentication tokens, content type, và các thông tin metadata khác.

**5. IP Address - Địa Chỉ IP**:

Sử dụng decorator `@Ip()` để extract địa chỉ IP của client. Địa chỉ IP có thể được sử dụng cho logging, rate limiting, và security purposes.

**6. Session - Phiên Làm Việc**:

Sử dụng decorator `@Session()` để extract session object. Session object chứa dữ liệu được lưu trữ trong session của user. Yêu cầu session middleware được cấu hình.

**7. Full Request/Response Objects - Đối Tượng Request/Response Đầy Đủ**:

Sử dụng decorators `@Req()` và `@Res()` để truy cập Express request và response objects trực tiếp. Điều này cho phép truy cập đầy đủ vào tất cả các tính năng của Express, nhưng nên được sử dụng một cách cẩn thận vì nó bypass một số tính năng của NestJS như automatic response serialization.

**Sơ Đồ Cấu Trúc Request Object**:

```
HTTP Request
    │
    ├─── URL: /api/users/123?page=1
    │    │
    │    ├─── Path: /api/users/123
    │    │    └─── Route Params: { id: '123' }
    │    │
    │    └─── Query String: ?page=1
    │         └─── Query Params: { page: '1' }
    │
    ├─── Headers
    │    ├─── Authorization: Bearer token...
    │    ├─── Content-Type: application/json
    │    └─── ...
    │
    ├─── Body
    │    └─── { name: "John", email: "..." }
    │
    └─── IP Address: 192.168.1.1
```

**Response Handling - Xử Lý Response**:

Controllers có hai cách chính để xử lý responses:

**1. Automatic Response Serialization - Tự Động Serialize Response**:

Khi route handler trả về một giá trị trực tiếp (không sử dụng `@Res()`), NestJS tự động:

- Serialize giá trị thành JSON
- Set status code mặc định (200 cho GET, PUT, PATCH; 201 cho POST; 204 cho DELETE)
- Set Content-Type header là `application/json`
- Gửi response về client

Cách này đơn giản và được khuyến khích sử dụng trong hầu hết các trường hợp. Response serialization có thể được tùy chỉnh bằng cách sử dụng class-transformer để transform objects trước khi serialize.

**2. Manual Response Control - Kiểm Soát Response Thủ Công**:

Khi sử dụng `@Res()` decorator, bạn có quyền kiểm soát hoàn toàn response:

- Set custom status codes
- Set custom headers
- Set cookies
- Stream responses
- Send different content types

Tuy nhiên, khi sử dụng `@Res()`, NestJS sẽ không tự động serialize response, và bạn phải tự gọi `res.json()`, `res.send()`, hoặc các methods khác của response object. Điều quan trọng là phải gọi một trong các methods này, nếu không response sẽ không được gửi về client.

**Sơ Đồ Luồng Response**:

```
Route Handler Returns Value
        │
        ├─── Không dùng @Res()
        │    │
        │    ▼
        │  NestJS tự động:
        │  - Serialize to JSON
        │  - Set status code
        │  - Set headers
        │  - Send response
        │
        └─── Dùng @Res()
             │
             ▼
          Manual control:
          - res.status(201)
          - res.json(data)
          - res.setHeader(...)
          - res.cookie(...)
```

**Best Practices**:

- Ưu tiên sử dụng automatic serialization cho code đơn giản và nhất quán
- Chỉ sử dụng `@Res()` khi cần kiểm soát đặc biệt (streaming, custom headers, cookies)
- Sử dụng DTOs với class-transformer để transform data trước khi serialize
- Luôn đảm bảo response được gửi (không quên gọi `res.json()` khi dùng `@Res()`)

**Status Codes - Mã Trạng Thái HTTP**:

HTTP status codes là các mã số được gửi trong response để thông báo kết quả của request. Status codes giúp client hiểu được request đã thành công, thất bại, hay cần thao tác gì tiếp theo.

**Cách Chỉ Định Status Codes**:

1. **Sử dụng @HttpCode() Decorator**: Decorator này cho phép chỉ định status code cho một route handler cụ thể. Status code được set một lần và áp dụng cho response của route handler đó.

2. **Sử dụng Response Object**: Khi sử dụng `@Res()`, có thể gọi `res.status(code)` để set status code.

**Status Codes Mặc Định**:

NestJS tự động set các status codes mặc định dựa trên HTTP method:

- **200 OK**: Cho GET, PUT, PATCH - request thành công và có data trả về
- **201 Created**: Cho POST - resource mới đã được tạo thành công
- **204 No Content**: Cho DELETE - resource đã được xóa thành công, không có content trong response

**Các Status Codes Phổ Biến**:

- **2xx Success**: 200 (OK), 201 (Created), 202 (Accepted - đã chấp nhận nhưng chưa xử lý), 204 (No Content)
- **4xx Client Error**: 400 (Bad Request - request không hợp lệ), 401 (Unauthorized - chưa xác thực), 403 (Forbidden - đã xác thực nhưng không có quyền), 404 (Not Found), 409 (Conflict - xung đột), 422 (Unprocessable Entity - validation errors)
- **5xx Server Error**: 500 (Internal Server Error), 502 (Bad Gateway), 503 (Service Unavailable)

**Semantic Meaning - Ý Nghĩa Ngữ Nghĩa**:

Status codes có ý nghĩa ngữ nghĩa rõ ràng, giúp client hiểu và xử lý responses một cách chính xác. Ví dụ:

- 201 Created cho biết resource mới đã được tạo và có thể có Location header chỉ đến resource đó
- 404 Not Found cho biết resource không tồn tại
- 409 Conflict cho biết có xung đột (ví dụ: email đã tồn tại khi đăng ký)

**Validation - Xác Thực Dữ Liệu**:

Validation (xác thực dữ liệu) là quá trình kiểm tra dữ liệu đầu vào từ client để đảm bảo chúng đáp ứng các yêu cầu và quy tắc nghiệp vụ trước khi xử lý. Validation giúp đảm bảo tính toàn vẹn dữ liệu và ngăn chặn các lỗi có thể xảy ra trong quá trình xử lý.

**Validation Pipes - Ống Xác Thực**:

ValidationPipe là một pipe trong NestJS được sử dụng để validate dữ liệu. Pipes là các lớp xử lý dữ liệu chạy trước khi request đến route handler. ValidationPipe kiểm tra dữ liệu đầu vào dựa trên các validators được định nghĩa trong DTO class.

**Cách Validation Hoạt Động**:

1. **DTO Class với Validators**: DTO (Data Transfer Object) class được định nghĩa với các decorators từ class-validator như `@IsString()`, `@IsEmail()`, `@MinLength()`, `@IsNotEmpty()`, v.v. Các decorators này định nghĩa các rules validation cho từng property.

2. **ValidationPipe Kiểm Tra**: Khi request đến, ValidationPipe:
   - Extract dữ liệu từ request body (hoặc query, params)
   - Kiểm tra dữ liệu theo các rules trong DTO class
   - Transform dữ liệu nếu cần (sử dụng class-transformer)
   - Nếu validation pass: truyền dữ liệu đã được validate và transform đến route handler
   - Nếu validation fail: trả về 400 Bad Request với danh sách lỗi validation

**Áp Dụng Validation**:

Validation có thể được áp dụng ở nhiều cấp độ:

1. **Global Validation**: Áp dụng cho tất cả routes trong ứng dụng bằng cách sử dụng `app.useGlobalPipes(new ValidationPipe())`. Đây là cách phổ biến nhất.

2. **Route-level Validation**: Áp dụng cho một route cụ thể bằng cách sử dụng `@UsePipes(new ValidationPipe())` trên route handler.

3. **Controller-level Validation**: Áp dụng cho tất cả routes trong một controller bằng cách sử dụng `@UsePipes()` trên controller class.

**Transformation - Chuyển Đổi Dữ Liệu**:

ValidationPipe cũng có thể transform (chuyển đổi) dữ liệu tự động:

- Chuyển đổi string sang number nếu DTO property là number
- Chuyển đổi string sang Date nếu DTO property là Date
- Áp dụng các transformations được định nghĩa bằng class-transformer decorators

**Lợi Ích Của Validation**:

- **Data Integrity**: Đảm bảo tính toàn vẹn dữ liệu, chỉ dữ liệu hợp lệ mới được xử lý
- **Early Error Detection**: Phát hiện lỗi sớm, trước khi dữ liệu được xử lý bởi business logic
- **Clear Error Messages**: Cung cấp thông báo lỗi rõ ràng cho client về những gì sai
- **Type Safety**: Đảm bảo type safety với TypeScript và DTO classes
- **Security**: Ngăn chặn các lỗi có thể dẫn đến security vulnerabilities

**Route Parameters và Wildcards**: Routes có thể contain parameters (:id) và wildcards (\*). Parameters được extract và available trong @Param(). Wildcards match multiple path segments. Route order matters: specific routes should be defined trước generic routes để avoid route conflicts. Parameter types có thể be specified với pipes.

**Versioning - Phiên Bản Hóa API**:

API versioning (phiên bản hóa API) là kỹ thuật quản lý nhiều phiên bản của API cùng một lúc, cho phép cập nhật API mà không làm hỏng các clients đang sử dụng phiên bản cũ. Versioning rất quan trọng cho việc maintain API trong production, đặc biệt khi có nhiều clients phụ thuộc vào API.

**Các Phương Thức Versioning**:

**1. URI Versioning - Phiên Bản Hóa URI**:

Version được chỉ định trong URL path, ví dụ: `/api/v1/users`, `/api/v2/users`. Đây là phương thức phổ biến nhất và dễ hiểu nhất. Clients chỉ cần thay đổi URL để sử dụng version khác.

Ưu điểm: Rõ ràng, dễ debug, có thể cache riêng biệt cho từng version
Nhược điểm: URL dài hơn, cần maintain nhiều routes

**2. Header Versioning - Phiên Bản Hóa Header**:

Version được chỉ định trong custom HTTP header, ví dụ: `X-API-Version: v1`. Clients gửi header này trong request để chỉ định version muốn sử dụng.

Ưu điểm: URL sạch, không thay đổi URL structure
Nhược điểm: Ít rõ ràng hơn, cần document rõ ràng cho clients

**3. Media Type Versioning - Phiên Bản Hóa Media Type**:

Version được chỉ định trong Accept header với media type tùy chỉnh, ví dụ: `Accept: application/vnd.api+json;version=1`. Đây là cách tiếp cận RESTful nhất.

Ưu điểm: Tuân thủ REST principles, sử dụng content negotiation
Nhược điểm: Phức tạp hơn, ít được sử dụng

**Cách Cấu Hình Versioning**:

Versioning được cấu hình ở hai cấp độ:

1. **Global Versioning**: Cấu hình versioning cho toàn bộ ứng dụng trong `main.ts`, chỉ định phương thức versioning và default version.

2. **Route-level Versioning**: Sử dụng decorator `@Version('1')` trên route handlers để chỉ định version cụ thể cho route đó.

**Lợi Ích Của Versioning**:

- **Backward Compatibility**: Giữ được compatibility với clients cũ khi thêm tính năng mới
- **Gradual Migration**: Cho phép clients migrate từ version cũ sang version mới một cách từ từ
- **Deprecation Strategy**: Có thể deprecate (không dùng nữa) các version cũ một cách có kiểm soát
- **Breaking Changes**: Cho phép thực hiện breaking changes trong version mới mà không ảnh hưởng đến version cũ

**Sơ Đồ Versioning Strategy**:

```
API Versions
    │
    ├─── v1 (Stable)
    │    ├─── /api/v1/users
    │    ├─── /api/v1/products
    │    └─── (Maintained, no new features)
    │
    ├─── v2 (Current)
    │    ├─── /api/v2/users
    │    ├─── /api/v2/products
    │    └─── (Active development)
    │
    └─── v3 (Beta)
         ├─── /api/v3/users
         └─── (Testing new features)
```

**Best Practices**:

- Maintain tối đa 2-3 versions cùng lúc để tránh complexity
- Document rõ ràng breaking changes giữa các versions
- Cung cấp migration guide cho clients
- Set deprecation timeline cho các versions cũ
- Monitor usage của các versions để quyết định khi nào có thể remove version cũ

**Route Guards - Bảo Vệ Route**:

Guards (bảo vệ) là các lớp được sử dụng để implement authentication (xác thực) và authorization (phân quyền). Guards chạy trước route handlers và có thể ngăn chặn việc truy cập vào route nếu điều kiện không được đáp ứng.

**Cách Guards Hoạt Động**:

Guards được thực thi trong một pipeline (ống dẫn) trước khi request đến route handler. Guard có thể:

1. **Cho Phép Truy Cập**: Return `true` hoặc không return gì, cho phép request tiếp tục đến route handler
2. **Ngăn Chặn Truy Cập**: Return `false` hoặc throw exception, ngăn không cho request đến route handler và trả về error response

**Các Loại Guards**:

- **Authentication Guards**: Kiểm tra xem user đã đăng nhập chưa (có valid token không)
- **Authorization Guards**: Kiểm tra xem user có quyền truy cập vào resource không (role-based, permission-based)
- **Rate Limiting Guards**: Giới hạn số lượng requests từ một client
- **Custom Guards**: Guards tùy chỉnh cho các mục đích cụ thể

**Áp Dụng Guards**:

Guards có thể được áp dụng ở nhiều cấp độ:

1. **Global Guards**: Áp dụng cho tất cả routes trong ứng dụng
2. **Controller-level Guards**: Áp dụng cho tất cả routes trong một controller
3. **Route-level Guards**: Áp dụng cho một route cụ thể

**Sơ Đồ Luồng Guards**:

```
Request đến
    │
    ▼
┌───────────────────┐
│  Global Guards      │ ← Kiểm tra authentication
└────────┬───────────┘
         │
         ▼ (pass)
┌───────────────────┐
│  Controller       │
│  Guards           │ ← Kiểm tra authorization
└────────┬──────────┘
         │
         ▼ (pass)
┌───────────────────┐
│  Route Guards     │ ← Kiểm tra specific permissions
└────────┬──────────┘
         │
         ▼ (pass)
┌───────────────────┐
│  Route Handler    │ ← Xử lý request
└───────────────────┘
```

**Interceptors - Bộ Chặn**:

Interceptors (bộ chặn) là các lớp được sử dụng để thêm cross-cutting concerns (các mối quan tâm xuyên suốt) như logging, caching, transformation, error handling. Interceptors chạy trước và sau route handlers, cho phép can thiệp vào cả request và response.

**Cách Interceptors Hoạt Động**:

Interceptors wrap route handlers và có thể:

1. **Trước Route Handler**: Thực thi code trước khi route handler được gọi (ví dụ: log request, cache check)
2. **Sau Route Handler**: Thực thi code sau khi route handler hoàn thành (ví dụ: log response, cache result, transform response)
3. **Xử Lý Lỗi**: Catch và xử lý errors từ route handlers
4. **Sửa Đổi Request/Response**: Modify request trước khi đến handler, hoặc modify response trước khi gửi về client

**Các Use Cases Của Interceptors**:

- **Logging**: Ghi log tất cả requests và responses
- **Caching**: Cache responses để cải thiện performance
- **Transformation**: Transform request/response data
- **Timing**: Đo thời gian xử lý requests
- **Error Handling**: Xử lý và format errors một cách nhất quán
- **Response Mapping**: Map response data theo format chuẩn

**Sơ Đồ Luồng Interceptors**:

```
Request đến
    │
    ▼
┌───────────────────┐
│  Interceptor      │
│  (Before)         │ ← Log request, check cache
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Route Handler    │ ← Xử lý request
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Interceptor      │
│  (After)          │ ← Log response, cache result
└───────────────────┘
         │
         ▼
    Response
```

**Áp Dụng Interceptors**:

Interceptors có thể được áp dụng ở:

- **Global level**: Cho tất cả routes
- **Controller level**: Cho tất cả routes trong controller
- **Route level**: Cho một route cụ thể

**Khác Biệt Giữa Guards và Interceptors**:

- **Guards**: Quyết định có cho phép request tiếp tục không (authentication/authorization)
- **Interceptors**: Thực thi code trước và sau route handler (logging, caching, transformation)

Guards chạy trước Interceptors trong execution pipeline.

### 3.3 Providers và Services - Nhà Cung Cấp và Dịch Vụ

Providers (nhà cung cấp) là các classes có thể được inject (tiêm) vào các classes khác thông qua dependency injection (tiêm phụ thuộc). Providers là nền tảng của dependency injection system trong NestJS, cho phép tạo ra các components có thể tái sử dụng và dễ dàng test.

**Khái Niệm Provider**:

Provider là bất kỳ class nào có thể được inject vào constructor của một class khác. Providers bao gồm services, repositories, factories, helpers, và các utility classes. Khi một class được đánh dấu là provider, NestJS sẽ quản lý lifecycle (vòng đời) của nó và tự động inject nó vào các classes cần sử dụng.

**Service Classes - Lớp Dịch Vụ**:

Services (dịch vụ) là các classes chứa business logic (logic nghiệp vụ) của ứng dụng. Services được inject vào controllers và các services khác để thực hiện các thao tác xử lý dữ liệu, business rules, và workflows.

**Đặc Điểm Của Services**:

1. **Stateless (Không Trạng Thái)**: Services mặc định là stateless, nghĩa là chúng không lưu trữ state giữa các requests. Mỗi request được xử lý độc lập, đảm bảo tính nhất quán và dễ dàng scale.

2. **Singleton by Default**: Mặc định, NestJS tạo một instance duy nhất của mỗi service và chia sẻ nó trong toàn bộ ứng dụng. Điều này đảm bảo hiệu suất (không cần tạo instance mới cho mỗi request) và consistency (một nguồn sự thật duy nhất).

3. **Single Responsibility**: Mỗi service nên tập trung vào một trách nhiệm cụ thể. Ví dụ, UserService chỉ xử lý logic liên quan đến users, ProductService chỉ xử lý logic liên quan đến products.

4. **Cohesive Functionality**: Services chứa các methods có liên quan chặt chẽ với nhau, tạo thành một đơn vị chức năng gắn kết.

**Vai Trò Của Services**:

Services đóng vai trò trung gian giữa controllers và repositories:

- **Controllers**: Nhận HTTP requests, gọi services để xử lý, và trả về responses
- **Services**: Chứa business logic, coordinate giữa repositories, các services khác, và external APIs
- **Repositories**: Xử lý truy cập dữ liệu, tương tác với database

**Sơ Đồ Luồng Dữ Liệu Qua Services**:

```
HTTP Request
    │
    ▼
┌───────────────────┐
│  Controller       │ ← Nhận request
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Service          │ ← Business logic
│  (UserService)    │
└────────┬──────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Repository│ │External│
│         │ │  API   │
└────────┘ └────────┘
    │         │
    └────┬────┘
         │
         ▼
    Database/API
```

**Injectable Decorator - Decorator Có Thể Tiêm**:

Decorator `@Injectable()` được sử dụng để đánh dấu một class là provider, cho phép NestJS quản lý lifecycle và dependency injection. Khi một class được đánh dấu bằng `@Injectable()`, NestJS sẽ:

1. **Đăng Ký Class trong DI Container**: Class được thêm vào dependency injection container, cho phép NestJS biết cách tạo và quản lý instances của class đó.

2. **Enable Dependency Resolution**: NestJS có thể tự động resolve (giải quyết) các dependencies của class này và inject chúng vào constructor.

3. **Quản Lý Lifecycle**: NestJS quản lý vòng đời của provider, bao gồm việc tạo instance, quản lý scope, và cleanup khi cần.

**Cấu Hình Scope**:

Decorator `@Injectable()` có thể nhận một configuration object với các scope options để chỉ định cách provider được tạo và quản lý. Các scope options bao gồm: DEFAULT (singleton), REQUEST, và TRANSIENT.

**Singleton by Default - Mặc Định Là Singleton**:

Mặc định, NestJS tạo một instance duy nhất của mỗi provider và chia sẻ nó trong toàn bộ ứng dụng. Đây được gọi là singleton scope (phạm vi singleton).

**Lợi Ích Của Singleton Scope**:

1. **Hiệu Suất**: Không cần tạo instance mới cho mỗi request, tiết kiệm memory và CPU
2. **Consistency**: Đảm bảo tất cả các phần của ứng dụng sử dụng cùng một instance, tạo ra single source of truth (một nguồn sự thật duy nhất)
3. **State Management**: Có thể lưu trữ state chung cho toàn bộ ứng dụng (ví dụ: cache, configuration)

**Khi Nào Singleton Được Tạo**:

Singleton providers được tạo một lần duy nhất trong quá trình application bootstrap (khởi động ứng dụng) và được tái sử dụng cho tất cả các requests sau đó. Điều này có nghĩa là:

- Instance được tạo khi ứng dụng khởi động
- Instance được chia sẻ giữa tất cả requests
- Instance tồn tại trong suốt vòng đời của ứng dụng
- Instance chỉ bị destroy khi ứng dụng shutdown

**Khi Nào Sử Dụng Singleton**:

Singleton scope phù hợp cho:

- **Stateless Services**: Các services không lưu trữ state giữa các requests
- **Shared Utilities**: Các utility classes được sử dụng ở nhiều nơi
- **Configuration Services**: Các services quản lý cấu hình
- **Cache Services**: Các services quản lý cache

**Sơ Đồ Singleton Lifecycle**:

```
Application Bootstrap
        │
        ▼
┌───────────────────┐
│ Create Singleton  │ ← Tạo instance một lần
│ Instance          │
└────────┬──────────┘
         │
         ▼
    Store in DI Container
         │
         │
    ┌────┴────┐
    │         │
Request 1  Request 2  Request 3 ...
    │         │         │
    └────┬────┴─────────┘
         │
         ▼
    Reuse Same Instance
         │
         │
    (Throughout app lifetime)
```

**Provider Scopes - Phạm Vi Provider**:

NestJS hỗ trợ ba loại provider scopes (phạm vi provider) khác nhau, mỗi loại có cách quản lý lifecycle và instance khác nhau:

**1. DEFAULT (Singleton) - Mặc Định (Đơn Thể)**:

Singleton scope tạo một instance duy nhất được chia sẻ trong suốt vòng đời của ứng dụng. Instance được tạo một lần trong quá trình bootstrap và được tái sử dụng cho tất cả các requests.

**Đặc Điểm**:

- Instance được tạo một lần khi ứng dụng khởi động
- Instance được chia sẻ giữa tất cả requests
- Instance tồn tại trong suốt vòng đời của ứng dụng
- Phù hợp cho stateless services và shared utilities

**2. REQUEST - Theo Request**:

Request scope tạo một instance mới cho mỗi incoming request. Instance này được chia sẻ trong suốt lifecycle của request đó (từ khi request đến cho đến khi response được gửi).

**Đặc Điểm**:

- Instance mới được tạo cho mỗi request
- Instance được chia sẻ giữa tất cả các providers trong cùng request
- Instance được cleanup (dọn dẹp) sau khi request hoàn thành
- Phù hợp cho request-specific data hoặc state

**Use Cases**:

- Lưu trữ thông tin user hiện tại cho request
- Request-scoped logging context
- Request-scoped transaction management
- Bất kỳ data nào cần được isolate giữa các requests

**Lưu Ý**: Request-scoped providers yêu cầu request context và không thể được sử dụng trong application-level contexts (như trong `onModuleInit`, `onApplicationBootstrap`).

**3. TRANSIENT - Tạm Thời**:

Transient scope tạo một instance mới mỗi lần provider được inject. Mỗi lần injection sẽ nhận được một instance hoàn toàn mới và độc lập.

**Đặc Điểm**:

- Instance mới được tạo cho mỗi lần injection
- Mỗi injection nhận instance riêng biệt
- Không có sharing giữa các injections
- Phù hợp cho stateless utilities hoặc khi cần instance isolation

**Use Cases**:

- Utility classes không cần state
- Classes cần isolation hoàn toàn giữa các usages
- Classes có thể có side effects và cần được isolate

**Sơ Đồ So Sánh Các Scopes**:

```
SINGLETON SCOPE:
App Start
    │
    ▼
Create Instance ──┐
    │              │
    │              │
Request 1 ────────┼──► Reuse Same Instance
Request 2 ────────┼──► Reuse Same Instance
Request 3 ────────┘──► Reuse Same Instance

REQUEST SCOPE:
Request 1 ──► Create Instance 1 ──► Use ──► Cleanup
Request 2 ──► Create Instance 2 ──► Use ──► Cleanup
Request 3 ──► Create Instance 3 ──► Use ──► Cleanup

TRANSIENT SCOPE:
Injection 1 ──► Create Instance 1
Injection 2 ──► Create Instance 2
Injection 3 ──► Create Instance 3
(Each injection gets new instance)
```

**Cách Chỉ Định Scope**:

Scope được chỉ định trong decorator `@Injectable()`:

- Singleton (mặc định): `@Injectable()` hoặc `@Injectable({ scope: Scope.DEFAULT })`
- Request: `@Injectable({ scope: Scope.REQUEST })`
- Transient: `@Injectable({ scope: Scope.TRANSIENT })`

**Trade-offs - Đánh Đổi**:

- **Singleton**: Hiệu suất cao nhất, nhưng không thể lưu trữ request-specific state
- **Request**: Cho phép request-specific state, nhưng có overhead tạo instance mới cho mỗi request
- **Transient**: Isolation hoàn toàn, nhưng overhead cao nhất do tạo nhiều instances

**Best Practices**:

- Sử dụng Singleton cho hầu hết các services (stateless)
- Chỉ sử dụng Request scope khi thực sự cần request-specific state
- Sử dụng Transient scope một cách tiết kiệm, chỉ khi cần isolation hoàn toàn
- Tránh sử dụng Request scope trong application-level hooks

**Custom Providers**: NestJS hỗ trợ custom providers cho các use cases đặc biệt:

- **Factory Providers**: useFactory - Functions return provider instances, useful cho dynamic creation với dependencies. Factory functions can inject other providers và perform conditional logic.

- **Value Providers**: useValue - Direct values (constants, mock objects, configuration), useful cho configuration objects và test mocks. Values are injected directly without instantiation.

- **Class Providers**: useClass - Alternative class implementations, useful cho strategy pattern và interface implementations. Allows switching implementations without changing consuming classes.

- **Async Providers**: useFactory với async functions, useful cho asynchronous initialization (database connections, external service setup). Async providers are awaited during module initialization.

Custom providers được register trong module providers array với provide token và factory/value/class configuration. Tokens can be classes, strings, hoặc Symbols.

**Provider Lifecycle Hooks**: Providers có thể implement lifecycle hooks để perform initialization và cleanup:

- **onModuleInit**: Called khi module is initialized. Useful cho setup logic that needs to run after all dependencies are resolved.

- **onModuleDestroy**: Called khi module is destroyed. Useful cho cleanup logic và resource release.

- **onApplicationBootstrap**: Called khi application is fully bootstrapped. Useful cho initialization that needs full application context.

- **onApplicationShutdown**: Called khi application is shutting down. Useful cho graceful shutdown, closing connections, và saving state.

Lifecycle hooks useful cho initialization logic, cleanup, graceful shutdown, và resource management. Hooks are called automatically by NestJS lifecycle system.

### 3.4 Dependency Injection Container - Container Tiêm Phụ Thuộc

Dependency Injection (DI) container là trung tâm (core) của kiến trúc NestJS, quản lý toàn bộ hệ thống dependency injection trong ứng dụng.

**DI Container - Container Tiêm Phụ Thuộc**:

DI container trong NestJS là một hệ thống quản lý dependencies tự động và thông minh. Container có các trách nhiệm chính:

1. **Registry Management - Quản Lý Sổ Đăng Ký**: Container duy trì một registry (sổ đăng ký) chứa tất cả providers và dependencies của chúng. Registry này được xây dựng trong quá trình application bootstrap từ các module definitions.

2. **Automatic Resolution - Giải Quyết Tự Động**: Container tự động phân tích và resolve dependencies khi tạo instances của classes. Quá trình này sử dụng TypeScript metadata để xác định types của dependencies.

3. **Instance Management - Quản Lý Instance**: Container theo dõi và quản lý lifecycle của tất cả provider instances, bao gồm singleton instances, request-scoped instances, và transient instances.

4. **Dependency Injection - Tiêm Phụ Thuộc**: Container tự động inject dependencies vào constructor hoặc properties của classes khi cần thiết.

**Sơ Đồ DI Container Architecture**:

```
┌─────────────────────────────────────────┐
│         DI Container                    │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Provider Registry                 │ │
│  │  - UserService → UserService class │ │
│  │  - ProductService → ProductService │ │
│  │  - UserRepository → UserRepository  │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Instance Cache                    │ │
│  │  - Singleton instances            │ │
│  │  - Request-scoped instances       │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Dependency Resolver               │ │
│  │  - Analyze constructors            │ │
│  │  - Resolve dependencies            │ │
│  │  - Create instances                │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Lifecycle Manager                 │ │
│  │  - Manage scopes                   │ │
│  │  - Cleanup instances               │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Constructor Injection - Tiêm Qua Constructor**:

Constructor injection là phương thức được khuyến khích nhất trong NestJS để inject dependencies. Dependencies được khai báo như parameters trong constructor và được inject tự động bởi container.

**Cách Constructor Injection Hoạt Động**:

1. **Khai Báo Dependencies**: Dependencies được khai báo trong constructor parameters với TypeScript types
2. **Metadata Extraction**: NestJS sử dụng TypeScript metadata (design:paramtypes) để extract type information
3. **Provider Lookup**: Container tìm provider tương ứng với type trong registry
4. **Dependency Resolution**: Container resolve dependencies (có thể đệ quy nếu dependencies cũng cần dependencies)
5. **Instance Creation**: Container tạo instance với dependencies đã được inject

**Lợi Ích Của Constructor Injection**:

- **Explicit Dependencies**: Dependencies được thể hiện rõ ràng trong constructor, dễ đọc và hiểu
- **Type Safety**: TypeScript đảm bảo type safety, lỗi được phát hiện tại compile time
- **Required Dependencies**: Đảm bảo class luôn có dependencies cần thiết khi được tạo
- **Immutability**: Dependencies có thể được đánh dấu là readonly
- **Testability**: Dễ dàng inject mock dependencies trong tests

**Sơ Đồ Constructor Injection Flow**:

```
Class cần UserService
    │
    ▼
Container phân tích constructor:
  constructor(userService: UserService)
    │
    ▼
Extract type từ metadata: UserService
    │
    ▼
Lookup UserService trong registry
    │
    ├─── Found ──► Resolve UserService
    │              │
    │              ▼
    │         Create/Get UserService instance
    │              │
    │              ▼
    │         Inject vào constructor
    │              │
    │              ▼
    │         Create class instance
    │
    └─── Not Found ──► Error: Provider not found
```

**Property Injection - Tiêm Qua Thuộc Tính**:

Property injection là phương thức thay thế cho constructor injection, sử dụng decorator `@Inject()` trên properties. Mặc dù ít được sử dụng hơn, property injection hữu ích trong một số trường hợp đặc biệt.

**Khi Nào Sử Dụng Property Injection**:

1. **Optional Dependencies**: Khi dependency là optional (không bắt buộc), sử dụng `@Optional()` decorator
2. **Circular Dependencies**: Khi cần workaround cho circular dependencies
3. **Inheritance Issues**: Khi constructor injection không khả thi do vấn đề inheritance
4. **Third-party Classes**: Khi không thể sửa constructor của third-party classes

**Cách Property Injection Hoạt Động**:

Property injection xảy ra sau khi constructor được thực thi. Container inject dependencies vào properties được đánh dấu bằng `@Inject()` decorator.

**Sơ Đồ So Sánh Constructor vs Property Injection**:

```
CONSTRUCTOR INJECTION (Recommended):
┌───────────────────┐
│  UserController   │
│                   │
│  constructor(     │
│    userService:   │ ← Dependencies rõ ràng
│      UserService  │   trong constructor
│  )                │
└───────────────────┘

PROPERTY INJECTION (Special Cases):
┌───────────────────┐
│  UserController   │
│                   │
│  constructor()    │ ← Constructor không có
│                   │   dependencies
│  @Inject()        │
│  userService:     │ ← Dependencies được
│    UserService    │   inject vào properties
└───────────────────┘
```

**Trade-offs - Đánh Đổi**:

- **Constructor Injection**: Ưu tiên sử dụng - rõ ràng, type-safe, dễ test
- **Property Injection**: Chỉ sử dụng khi thực sự cần - dependencies ẩn, khó test hơn

**Dependency Resolution - Giải Quyết Phụ Thuộc**:

Dependency resolution là quá trình container tìm, tạo, và inject các dependencies cần thiết cho một provider. Quá trình này phức tạp và đòi hỏi container phải xử lý nhiều tình huống khác nhau.

**Quá Trình Resolution Chi Tiết**:

**1. Analyze Constructor Parameters - Phân Tích Tham Số Constructor**:

Container sử dụng TypeScript metadata (đặc biệt là `design:paramtypes`) để extract type information từ constructor parameters. Metadata này được tạo bởi TypeScript compiler và chứa thông tin về types của tất cả parameters.

**2. Provider Lookup - Tìm Kiếm Provider**:

Container tìm kiếm provider tương ứng với type trong:

- **Current Module**: Providers được đăng ký trong module hiện tại
- **Imported Modules**: Providers được export từ các modules đã import
- **Global Modules**: Providers từ global modules (tự động khả dụng)

**3. Recursive Resolution - Giải Quyết Đệ Quy**:

Nếu provider cần dependencies, container phải resolve các dependencies đó trước. Quá trình này đệ quy: nếu dependency A cần dependency B, và B cần C, thì container sẽ resolve C trước, sau đó B, cuối cùng là A.

**4. Instance Creation - Tạo Instance**:

Sau khi tất cả dependencies đã được resolve, container tạo instance:

- **Singleton**: Kiểm tra xem instance đã tồn tại chưa, nếu có thì reuse
- **Request-scoped**: Tạo instance mới cho request hiện tại
- **Transient**: Luôn tạo instance mới

**5. Instance Caching - Lưu Trữ Instance**:

Singleton instances được cache trong container để reuse cho các injections sau. Điều này đảm bảo hiệu suất và consistency.

**Sơ Đồ Dependency Resolution Flow**:

```
Request: Create UserController
    │
    ▼
Analyze Constructor:
  constructor(
    userService: UserService,
    productService: ProductService
  )
    │
    ├─── Resolve UserService
    │    │
    │    ▼
    │  UserService needs UserRepository
    │    │
    │    ▼
    │  Resolve UserRepository (no dependencies)
    │    │
    │    ▼
    │  Create UserRepository instance
    │    │
    │    ▼
    │  Create UserService with UserRepository
    │
    └─── Resolve ProductService
         │
         ▼
       ProductService needs ProductRepository
         │
         ▼
       Resolve ProductRepository (no dependencies)
         │
         ▼
       Create ProductRepository instance
         │
         ▼
       Create ProductService with ProductRepository
    │
    ▼
All dependencies resolved
    │
    ▼
Create UserController with:
  - UserService instance
  - ProductService instance
```

**Xử Lý Circular Dependencies**:

Container phát hiện circular dependencies và sử dụng `forwardRef()` để defer resolution của một dependency cho đến khi cả hai providers đều đã được đăng ký.

**Xử Lý Optional Dependencies**:

Với `@Optional()` decorator, container không throw error nếu provider không được tìm thấy, mà inject `undefined` hoặc giá trị mặc định.

**Error Handling - Xử Lý Lỗi**:

Nếu resolution fails (provider không được tìm thấy), container throw error với message rõ ràng, chỉ ra provider nào không được tìm thấy và trong module nào.

**Provider Tokens**: Providers được identify bởi tokens (class types, strings, Symbols). Class types are default tokens used automatically. Custom tokens (strings, Symbols) được sử dụng với @Inject() decorator khi type information không sufficient (interfaces, abstract classes, primitive types). Token resolution match tokens với registered providers trong module registry. Token-based injection allows flexibility và abstraction.

**Module-Level DI**: Dependencies được resolved within module context. Providers từ imported modules are available nếu exported. Providers từ non-imported modules are not accessible, enforcing module boundaries và encapsulation. Global modules' providers are available everywhere without explicit import. Module boundaries prevent accidental dependencies và make architecture explicit.

**Circular Dependencies**: Circular dependencies xảy ra khi two modules hoặc providers depend on each other directly hoặc indirectly. NestJS detect circular dependencies và throw errors during bootstrap. Solutions include:

- **forwardRef()**: Defer resolution của one dependency until both are registered
- **Restructure Modules**: Remove circularity through better architecture (introduce intermediate modules, extract shared code)
- **Dynamic Modules**: Use dynamic modules để break circular dependencies
- **Lazy Loading**: Use lazy modules để defer module loading

Best practice is to avoid circular dependencies through proper architecture design và dependency direction. Circular dependencies indicate design issues và should be refactored.

## 4. Nguyên Tắc SOLID và Dependency Injection

### 4.1 Nguyên Tắc SOLID

SOLID là một tập hợp các nguyên tắc thiết kế phần mềm giúp tạo ra mã dễ bảo trì, mở rộng, và test được:

**Single Responsibility Principle (SRP)**: Mỗi class chỉ nên có một lý do để thay đổi, nghĩa là mỗi class chỉ nên có một trách nhiệm duy nhất. Trong NestJS, điều này có nghĩa là mỗi service nên tập trung vào một domain cụ thể, mỗi controller chỉ xử lý HTTP concerns, và mỗi module quản lý một feature cụ thể.

**Open/Closed Principle (OCP)**: Software entities nên mở cho extension nhưng đóng cho modification. Trong NestJS, điều này có nghĩa là có thể thêm functionality mới thông qua inheritance, composition, hoặc decorators mà không cần sửa đổi code hiện có.

**Liskov Substitution Principle (LSP)**: Objects của superclass nên có thể được thay thế bằng objects của subclass mà không làm hỏng chức năng của ứng dụng. Trong NestJS, điều này đảm bảo rằng các implementation của interfaces có thể được thay thế lẫn nhau.

**Interface Segregation Principle (ISP)**: Clients không nên phụ thuộc vào interfaces mà chúng không sử dụng. Trong NestJS, điều này có nghĩa là tạo các interfaces nhỏ, focused thay vì các interfaces lớn với nhiều methods không liên quan.

**Dependency Inversion Principle (DIP)**: High-level modules không nên phụ thuộc vào low-level modules. Cả hai nên phụ thuộc vào abstractions. Trong NestJS, điều này được thực hiện thông qua dependency injection, nơi các classes phụ thuộc vào interfaces hoặc abstract classes thay vì concrete implementations.

### 4.2 Dependency Injection (DI) - Tiêm Phụ Thuộc

Dependency Injection là một design pattern (mẫu thiết kế) cho phép inversion of control (IoC - đảo ngược kiểm soát) về dependency management (quản lý phụ thuộc). DI là nền tảng của kiến trúc NestJS và giúp tạo ra code linh hoạt, dễ test, và dễ maintain.

**Khái Niệm Dependency Injection**:

Thay vì một class tự tạo dependencies của nó (tight coupling), dependencies được "inject" (tiêm) từ bên ngoài thông qua constructor, properties, hoặc methods. Điều này tạo ra loose coupling và tuân thủ Dependency Inversion Principle.

**Sơ Đồ So Sánh Without vs With DI**:

```
WITHOUT DI (Tight Coupling):
┌───────────────────┐
│  UserController   │
│                   │
│  constructor() {  │
│    this.service = │ ← Tự tạo dependency
│      new          │   (tight coupling)
│      UserService()│
│  }                │
└───────────────────┘

WITH DI (Loose Coupling):
┌───────────────────┐
│  UserController   │
│                   │
│  constructor(     │
│    userService:   │ ← Dependency được inject
│      UserService  │   (loose coupling)
│  )                │
└───────────────────┘
         │
         ▼
    DI Container
    tự động inject
```

**Lợi Ích Của Dependency Injection**:

**1. Loose Coupling - Kết Hợp Lỏng Lẻo**:

Classes không phụ thuộc trực tiếp vào concrete implementations mà phụ thuộc vào abstractions (interfaces). Điều này làm giảm coupling và tăng flexibility.

**2. Testability - Khả Năng Test**:

Dependencies có thể dễ dàng mock hoặc stub trong tests. Bạn có thể inject test doubles (mocks, stubs, fakes) thay vì real implementations, làm cho tests nhanh hơn và độc lập hơn.

**3. Flexibility - Linh Hoạt**:

Có thể thay đổi implementations mà không cần sửa đổi consuming classes. Ví dụ: có thể switch từ PostgreSQL sang MongoDB mà không cần sửa code sử dụng repository.

**4. Maintainability - Dễ Bảo Trì**:

Dependencies được quản lý tập trung trong DI container, dễ dàng thay đổi và cập nhật. Thay đổi một implementation chỉ cần cập nhật một nơi.

**5. Single Responsibility**:

Classes không cần biết cách tạo dependencies của chúng, chỉ cần biết cách sử dụng chúng. Điều này giúp classes tập trung vào trách nhiệm chính của chúng.

**Các Loại Dependency Injection**:

**1. Constructor Injection - Tiêm Qua Constructor (Khuyến Nghị)**:

Dependencies được inject qua constructor parameters. Đây là cách được khuyến nghị nhất trong NestJS vì:

- Dependencies được thể hiện rõ ràng
- Đảm bảo class luôn có dependencies cần thiết
- Dễ test
- Type-safe với TypeScript

**2. Property Injection - Tiêm Qua Thuộc Tính**:

Dependencies được inject qua properties sử dụng `@Inject()` decorator. Ít được sử dụng hơn, chỉ dùng cho:

- Optional dependencies
- Circular dependency workarounds
- Special cases

**3. Method Injection - Tiêm Qua Phương Thức**:

Dependencies được inject qua method parameters. Thường được sử dụng cho:

- Dependencies chỉ cần trong một số methods cụ thể
- Temporary dependencies

**Dependency Injection Trong NestJS**:

NestJS sử dụng decorator-based DI, nơi các dependencies được đánh dấu bằng decorators và được inject tự động bởi DI container. Điều này làm cho code:

- Sạch sẽ và dễ đọc
- Type-safe với TypeScript
- Tự động và không cần boilerplate code
- Dễ maintain và extend

**Sơ Đồ DI Flow Trong NestJS**:

```
Class cần dependencies
    │
    ▼
Khai báo trong constructor
    │
    ▼
NestJS DI Container
    │
    ├─── Phân tích constructor
    ├─── Tìm providers trong registry
    ├─── Resolve dependencies
    ├─── Tạo instances
    └─── Inject vào constructor
    │
    ▼
Class được tạo với dependencies
```

### 4.3 Inversion of Control (IoC)

Inversion of Control là một nguyên tắc thiết kế trong đó control flow của ứng dụng được đảo ngược:

**Traditional Control Flow**: Trong traditional programming, một class kiểm soát việc tạo và quản lý dependencies của nó. Điều này tạo ra tight coupling và làm cho code khó test và bảo trì.

**Inverted Control Flow**: Với IoC, control được đảo ngược - một framework hoặc container kiểm soát việc tạo và quản lý objects, và classes chỉ khai báo dependencies của chúng. Framework chịu trách nhiệm inject dependencies khi cần.

**IoC Container**: IoC container (như DI container trong NestJS) quản lý lifecycle của objects, resolve dependencies, và inject chúng vào các classes cần thiết. Container biết cách tạo và cấu hình tất cả objects trong ứng dụng.

**Benefits of IoC**: Inversion of Control cung cấp nhiều lợi ích:

- **Decoupling**: Classes không cần biết cách tạo dependencies của chúng
- **Centralized Configuration**: Tất cả object creation và configuration được quản lý ở một nơi
- **Lifecycle Management**: Container quản lý lifecycle của objects (singleton, transient, request-scoped)
- **Aspect-Oriented Programming**: IoC tạo điều kiện cho AOP patterns như interceptors và decorators

**IoC trong NestJS**: NestJS sử dụng IoC container để quản lý tất cả providers. Container tự động resolve dependencies dựa trên type information từ TypeScript decorators và metadata. Điều này làm cho DI trong NestJS mạnh mẽ và type-safe.

### 4.4 TypeScript Decorators và Reflect-Metadata - Decorators và Phản Chiếu Metadata

TypeScript decorators và metadata reflection là nền tảng cho nhiều tính năng của NestJS. Chúng cho phép NestJS tự động phát hiện và xử lý các classes, methods, và dependencies mà không cần cấu hình thủ công.

**TypeScript Decorators - Decorators TypeScript**:

Decorators là một tính năng của TypeScript (hiện tại là experimental, yêu cầu flag `--experimentalDecorators`) cho phép thêm metadata (siêu dữ liệu) và behavior (hành vi) vào classes, methods, properties, và parameters. Decorators là các functions được áp dụng với prefix `@`.

**Khái Niệm Decorators**:

Decorators là một pattern cho phép wrap hoặc modify một class, method, property, hoặc parameter. Chúng được execute tại runtime (không phải compile time) và nhận các arguments như target object, property name, và descriptor.

**Các Loại Decorators**:

TypeScript hỗ trợ năm loại decorators:

1. **Class Decorators - Decorator Lớp**: Áp dụng cho class declarations. Nhận constructor function làm argument.

2. **Method Decorators - Decorator Phương Thức**: Áp dụng cho methods. Nhận target (class prototype), property key (method name), và property descriptor.

3. **Accessor Decorators - Decorator Truy Cập**: Áp dụng cho getters và setters. Nhận target, property key, và descriptor.

4. **Property Decorators - Decorator Thuộc Tính**: Áp dụng cho properties. Nhận target và property key.

5. **Parameter Decorators - Decorator Tham Số**: Áp dụng cho function parameters. Nhận target, property key (method name), và parameter index.

**Sơ Đồ Các Loại Decorators**:

```
┌─────────────────────────────────────┐
│      TypeScript Decorators          │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Class Decorator               │ │
│  │  @Module()                     │ │
│  │  @Injectable()                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Method Decorator             │ │
│  │  @Get()                       │ │
│  │  @Post()                      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Property Decorator           │ │
│  │  @Inject()                    │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Parameter Decorator           │ │
│  │  @Param()                     │ │
│  │  @Body()                      │ │
│  │  @Query()                     │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Decorator Execution Order - Thứ Tự Thực Thi Decorator**:

Thứ tự decorators được apply rất quan trọng vì decorators có thể depend on each other hoặc cần access metadata từ other decorators.

**Thứ Tự Thực Thi**:

1. **Parameter Decorators**: Được apply từ bottom-up (từ parameter cuối cùng đến parameter đầu tiên)
2. **Method/Accessor/Property Decorators**: Được apply từ top-down (từ declaration đầu tiên đến declaration cuối cùng)
3. **Class Decorators**: Được apply từ bottom-up (từ innermost đến outermost)

**Sơ Đồ Thứ Tự Thực Thi**:

```
Class Definition
    │
    ├─── Parameter Decorators (bottom-up)
    │    └─── @Param('id') ← Last parameter first
    │         @Body()      ← First parameter last
    │
    ├─── Method Decorators (top-down)
    │    └─── @Get()       ← First method first
    │         @Post()      ← Last method last
    │
    └─── Class Decorators (bottom-up)
         └─── @Controller() ← Innermost first
              @Module()      ← Outermost last
```

**Decorator Factories - Nhà Máy Decorator**:

Decorator factories là functions trả về decorator functions. Chúng cho phép decorators nhận arguments và cấu hình. Ví dụ: `@Module({ imports: [...] })` là một decorator factory nhận configuration object.

**Sơ Đồ Decorator Factory**:

```
Decorator Factory
    │
    ▼
Function nhận arguments
    │
    ▼
Return Decorator Function
    │
    ▼
Apply decorator với arguments
```

**Reflect-Metadata - Phản Chiếu Metadata**:

Reflect-Metadata là một library cung cấp API để đọc và ghi metadata tại runtime. Metadata là thông tin về types, decorators, và các annotations khác được lưu trữ cùng với code.

**Khái Niệm Metadata**:

Metadata là dữ liệu về dữ liệu (data about data). Trong TypeScript, metadata chứa thông tin về:

- Types của parameters (design:paramtypes)
- Return types (design:returntype)
- Property types (design:type)
- Custom metadata từ decorators

**Metadata Keys - Khóa Metadata**:

Metadata được lưu trữ với các keys cụ thể:

- `design:type`: Type của property
- `design:paramtypes`: Types của parameters
- `design:returntype`: Return type của method
- Custom keys: Keys tùy chỉnh từ decorators

**Sơ Đồ Metadata Storage**:

```
Class/Property/Method
    │
    ▼
Metadata được lưu trữ
    │
    ├─── design:type
    ├─── design:paramtypes
    ├─── design:returntype
    └─── Custom metadata keys
         ├─── Injectable metadata
         ├─── Route metadata
         └─── Validation metadata
```

**Metadata Reflection - Phản Chiếu Metadata**:

Reflect-Metadata API cho phép:

- **Get Metadata**: Đọc metadata từ classes, methods, properties
- **Set Metadata**: Ghi metadata vào classes, methods, properties
- **Has Metadata**: Kiểm tra xem metadata có tồn tại không
- **Define Metadata**: Định nghĩa metadata với key và value

**Metadata Trong NestJS**:

NestJS sử dụng metadata để:

- **Dependency Injection**: Xác định types của dependencies từ constructor parameters
- **Routing**: Xác định routes và HTTP methods từ decorators
- **Validation**: Xác định validation rules từ decorators
- **Guards/Interceptors**: Xác định guards và interceptors cần apply

**Sơ Đồ Metadata Usage Trong NestJS**:

```
Class với Decorators
    │
    ▼
Metadata được tạo
    │
    ├─── @Injectable() → Injectable metadata
    ├─── @Controller() → Controller metadata
    ├─── @Get() → Route metadata
    └─── Constructor params → Type metadata
    │
    ▼
NestJS đọc metadata
    │
    ├─── DI Container: Resolve dependencies
    ├─── Router: Register routes
    └─── Validator: Apply validation rules
```

**Design-Time Type Information - Thông Tin Kiểu Tại Thời Điểm Thiết Kế**:

TypeScript compiler tạo ra design-time type information và lưu trữ nó trong metadata. Thông tin này bao gồm:

- Types của tất cả parameters
- Return types của methods
- Types của properties

Thông tin này được sử dụng tại runtime bởi NestJS để resolve dependencies và validate types.

**Metadata Performance - Hiệu Suất Metadata**:

Metadata được lưu trữ trong memory và có overhead nhỏ. Tuy nhiên, overhead này là acceptable vì:

- Metadata chỉ được đọc một lần khi application bootstrap
- Metadata không ảnh hưởng đến runtime performance của requests
- Lợi ích của automatic DI và routing lớn hơn overhead

**TypeScript Configuration - Cấu Hình TypeScript**:

Để sử dụng decorators và metadata, cần cấu hình TypeScript:

- `experimentalDecorators: true`: Enable decorators
- `emitDecoratorMetadata: true`: Emit metadata cho decorators
- `reflect-metadata` package: Cần import trong application entry point

**Reflect-Metadata Package**:

Package `reflect-metadata` cung cấp polyfill cho Reflect API với metadata support. Package này cần được import trước khi sử dụng decorators để đảm bảo metadata được lưu trữ và truy xuất đúng cách.

**Decorator Factories**: Decorator factories là functions return decorator functions, cho phép pass parameters vào decorators. Factory pattern cho phép decorators be configurable và reusable. Ví dụ: @Module({ imports: [...] }) sử dụng decorator factory pattern. Factory được call first với configuration object, sau đó returned decorator function được apply với target.

**Reflect Metadata API**: Reflect Metadata là một polyfill cho Metadata Reflection API proposal (ECMAScript proposal). API này cho phép lưu trữ và truy xuất metadata tại runtime. Metadata được store trong WeakMap để avoid memory leaks và enable garbage collection. Reflect Metadata cung cấp methods: defineMetadata(key, value, target), getMetadata(key, target), getOwnMetadata(key, target), hasMetadata(key, target), và deleteMetadata(key, target). Metadata có thể be attached to classes, methods, properties, và parameters.

**Metadata Keys**: Metadata được store với keys (strings hoặc Symbols) và targets (classes, methods, properties, parameters). Keys identify loại metadata (ví dụ: 'design:type', 'design:paramtypes', 'design:returntype'). Targets identify nơi metadata được attach. Same key có thể be used trên multiple targets với different values.

**Design-Time Type Information**: TypeScript compiler emit design-time type information vào metadata khi --emitDecoratorMetadata flag được enable. Information bao gồm: design:type (property/parameter type), design:paramtypes (method parameter types), và design:returntype (method return type). Information này được sử dụng bởi DI container để resolve dependencies. Type information chỉ available cho types that are classes hoặc interfaces, not primitive types hoặc complex types.

**Metadata trong NestJS**: Khi một class được đánh dấu bằng @Injectable(), NestJS lưu trữ metadata về class đó trong DI container registry. Metadata includes: class name, dependencies (from constructor parameters), và scope (singleton, request-scoped, etc.). Khi một dependency được inject (ví dụ: constructor parameter), metadata về type của dependency được retrieve từ design:paramtypes. Container sử dụng type information này để resolve và inject dependencies đúng cách. Nếu type là interface hoặc abstract class, container cần explicit provider mapping (useClass, useFactory, useValue) vì interfaces không exist tại runtime.

**Custom Metadata**: NestJS cho phép attach custom metadata vào classes, methods, và parameters sử dụng SetMetadata() decorator. Custom metadata có thể be retrieve sử dụng Reflector service. Custom metadata hữu ích cho guards (authorization metadata), interceptors (logging metadata), và decorators cần additional context. Metadata keys nên be unique để avoid conflicts.

**Parameter Decorators trong NestJS**: NestJS cung cấp các parameter decorators để extract data từ HTTP requests:

- **@Body()**: Extract request body, có thể specify DTO class cho validation và transformation
- **@Query()**: Extract query parameters, có thể specify parameter name hoặc extract all as object
- **@Param()**: Extract route parameters, có thể specify parameter name
- **@Headers()**: Extract request headers, có thể specify header name hoặc extract all as object
- **@Ip()**: Extract client IP address từ request
- **@Session()**: Extract session object (requires session middleware)
- **@Req()**: Extract Express request object (full access to request)
- **@Res()**: Extract Express response object (full control over response, disables automatic response)

Các decorators này sử dụng metadata để identify parameter positions và types, sau đó extract appropriate data từ request objects. Decorators work với NestJS pipes để validate và transform data.

**Metadata và Dependency Injection**: DI container trong NestJS sử dụng metadata để:

1. **Identify Dependencies**: Retrieve parameter types từ design:paramtypes metadata khi analyze constructor
2. **Resolve Providers**: Match parameter types với registered providers trong module và imported modules
3. **Inject Dependencies**: Create instances (hoặc reuse singletons) và inject vào constructor parameters
4. **Handle Optional Dependencies**: Check @Optional() decorator metadata để allow undefined dependencies
5. **Handle Custom Providers**: Use @Inject() decorator với tokens (strings, Symbols, classes) để specify custom providers khi type information không sufficient
6. **Handle Circular Dependencies**: Use forwardRef() để handle circular dependencies với metadata

**Metadata Performance**: Metadata reflection có overhead nhỏ, nhưng được cache bởi NestJS để minimize performance impact. Metadata được retrieve một lần khi class được first analyzed during application bootstrap, sau đó cached trong DI container. Runtime metadata access is fast vì it's simple property lookups trong WeakMap.

**TypeScript Configuration**: Để sử dụng decorators và metadata, TypeScript configuration (tsconfig.json) cần:

- **experimentalDecorators**: true - Enable decorator support (required)
- **emitDecoratorMetadata**: true - Emit design-time type information (required cho DI)
- **target**: ES5 hoặc higher - Decorators require ES5+ (ES2015+ recommended)
- **lib**: Include necessary libraries (ES2015+, DOM if needed)
- **strict**: true - Recommended cho type safety

**Reflect-Metadata Package**: reflect-metadata package cần be imported ở application entry point (main.ts) để enable metadata reflection. Import statement: `import 'reflect-metadata'` must be first import (hoặc trong top-level) để ensure metadata API is available before any decorators are evaluated. Package provides polyfill cho browsers và Node.js environments.

## 5. Design Patterns trong NestJS

### 5.1 Repository Pattern

Repository Pattern cung cấp một abstraction layer giữa business logic và data access layer:

**Khái Niệm Repository**: Repository đóng vai trò như một collection của domain objects trong memory, cung cấp các methods để query và persist data mà không expose chi tiết implementation của data access.

**Lợi Ích**: Repository Pattern cung cấp nhiều lợi ích:

- **Abstraction**: Business logic không phụ thuộc vào chi tiết của database implementation
- **Testability**: Repository có thể dễ dàng mock trong unit tests
- **Flexibility**: Có thể thay đổi data access implementation mà không ảnh hưởng đến business logic
- **Consistency**: Cung cấp interface nhất quán cho data access operations

**Repository trong TypeORM**: TypeORM cung cấp Repository pattern thông qua EntityRepository và Repository classes. Mỗi entity có một repository tương ứng cung cấp các methods như find(), save(), delete().

**Custom Repository Methods**: Có thể mở rộng repository với custom methods cho các queries phức tạp. Điều này cho phép encapsulate query logic trong repository thay vì trong services.

### 5.2 Service Layer Pattern

Service Layer Pattern tổ chức business logic thành các service classes:

**Service Layer**: Service layer chứa business logic của ứng dụng, tách biệt khỏi presentation layer (controllers) và data access layer (repositories). Services orchestrate các operations và enforce business rules.

**Service Responsibilities**: Services chịu trách nhiệm:

- **Business Logic**: Implement business rules và workflows
- **Transaction Management**: Quản lý transactions cho các operations phức tạp
- **Validation**: Validate business rules trước khi persist data
- **Orchestration**: Coordinate giữa multiple repositories hoặc services

**Service Composition**: Services có thể sử dụng các services khác, tạo ra một hierarchy của business logic. Điều này cho phép tái sử dụng logic và tách biệt concerns.

**Stateless Services**: Services trong NestJS thường là stateless (singleton), nghĩa là chúng không giữ state giữa các requests. State được truyền qua method parameters hoặc được lưu trữ trong database.

### 5.3 Factory Pattern

Factory Pattern cung cấp một cách để tạo objects mà không cần specify exact class của object:

**Factory Functions**: Trong NestJS, factory providers cho phép tạo objects với logic phức tạp. Factory functions có thể sử dụng dependencies khác và thực hiện conditional logic để tạo objects phù hợp.

**Use Cases**: Factory pattern hữu ích cho:

- **Conditional Object Creation**: Tạo objects khác nhau dựa trên configuration hoặc runtime conditions
- **Complex Initialization**: Objects yêu cầu complex setup hoặc initialization logic
- **Dynamic Dependencies**: Dependencies cần được resolve tại runtime thay vì compile time

**Factory Providers trong NestJS**: NestJS hỗ trợ factory providers thông qua useFactory trong module configuration. Factory function có thể inject dependencies và return object được tạo.

### 5.4 Strategy Pattern

Strategy Pattern cho phép định nghĩa một family of algorithms, encapsulate mỗi algorithm, và làm cho chúng interchangeable:

**Strategy Interface**: Strategy pattern sử dụng một interface hoặc abstract class để định nghĩa contract cho các strategies. Mỗi concrete strategy implement interface này với một algorithm cụ thể.

**Context**: Context class sử dụng strategy interface và có thể switch giữa các strategies tại runtime. Context không cần biết implementation cụ thể của strategy.

**Use Cases trong NestJS**: Strategy pattern hữu ích cho:

- **Payment Processing**: Các payment methods khác nhau (credit card, PayPal, etc.)
- **Authentication**: Các authentication strategies khác nhau (JWT, OAuth, etc.)
- **Validation**: Các validation strategies khác nhau cho các loại data khác nhau
- **Caching**: Các caching strategies khác nhau (memory, Redis, etc.)

**Implementation**: Trong NestJS, strategies có thể được implement như các providers và được inject vào context classes. DI container quản lý việc chọn strategy phù hợp dựa trên configuration hoặc runtime conditions.

### 5.5 Observer Pattern

Observer Pattern định nghĩa một one-to-many dependency giữa objects, nơi khi một object thay đổi state, tất cả dependents được notify:

**Event Emitters**: NestJS sử dụng EventEmitter pattern, một implementation của Observer pattern, để implement event-driven architecture. Events có thể được emitted và các listeners có thể subscribe để handle events.

**Event-Driven Architecture**: Event-driven architecture cho phép loose coupling giữa components. Một component có thể emit events mà không cần biết ai sẽ handle chúng, và multiple handlers có thể subscribe để cùng một event.

**Use Cases**: Observer pattern hữu ích cho:

- **Domain Events**: Notify về các domain events như order created, user registered
- **Logging**: Multiple loggers có thể listen cho logging events
- **Caching Invalidation**: Invalidate cache khi data changes
- **Notifications**: Send notifications khi các events cụ thể xảy ra

**NestJS Event System**: NestJS cung cấp @nestjs/event-emitter module để implement event-driven patterns. Events có thể be synchronous hoặc asynchronous, và handlers có thể be prioritized.

## 6. TypeORM và Entity Design - TypeORM và Thiết Kế Entity

TypeORM là một Object-Relational Mapping (ORM) framework mạnh mẽ cho TypeScript và JavaScript, cho phép developers làm việc với databases sử dụng object-oriented paradigm (mô hình hướng đối tượng) thay vì SQL queries trực tiếp.

### 6.1 Kiến Trúc TypeORM và Metadata System - Kiến Trúc và Hệ Thống Metadata

TypeORM là một ORM framework hiện đại được thiết kế đặc biệt cho TypeScript, cung cấp type safety và developer experience tốt.

**ORM Concept - Khái Niệm ORM**:

ORM (Object-Relational Mapping) là một kỹ thuật lập trình cho phép convert (chuyển đổi) data giữa incompatible type systems (các hệ thống kiểu không tương thích) trong object-oriented programming languages và relational databases. TypeORM cho phép developers làm việc với databases như làm việc với objects và classes, abstracting away (ẩn đi) SQL complexity.

**Lợi Ích Của ORM**:

1. **Type Safety**: TypeScript đảm bảo type safety khi làm việc với entities
2. **Productivity**: Giảm boilerplate code, tăng productivity
3. **Database Agnostic**: Có thể switch giữa các databases mà không sửa nhiều code
4. **Automatic Query Generation**: ORM tự động generate SQL queries từ object operations
5. **Relationship Management**: Quản lý relationships giữa entities một cách tự động

**Sơ Đồ ORM Mapping**:

```
Database                    ORM Layer                  Application
    │                           │                           │
    │                           │                           │
┌────────┐                  ┌────────┐                 ┌────────┐
│ Table  │ ────maps to───► │ Entity │ ────maps to───► │ Class  │
│ users  │                  │ User   │                 │ User   │
└────────┘                  └────────┘                 └────────┘
    │                           │                           │
┌────────┐                  ┌────────┐                 ┌────────┐
│ Column │ ────maps to───► │Property│ ────maps to───► │Property│
│ id     │                  │ id     │                 │ id     │
│ name   │                  │ name   │                 │ name   │
└────────┘                  └────────┘                 └────────┘
```

**TypeORM Architecture - Kiến Trúc TypeORM**:

TypeORM sử dụng decorator-based approach (cách tiếp cận dựa trên decorator) để define entities và relationships. Kiến trúc TypeORM bao gồm:

1. **Metadata System - Hệ Thống Metadata**: Lưu trữ entity metadata (columns, relationships, indexes) được extract từ decorators. Metadata được sử dụng để generate SQL queries và validate entity structures.

2. **Connection Manager - Quản Lý Kết Nối**: Quản lý database connections và connection pooling. Connection pooling giảm overhead của việc tạo và đóng connections.

3. **Query Builder - Bộ Xây Dựng Truy Vấn**: Xây dựng SQL queries từ method calls với type safety. Query Builder cung cấp protection từ SQL injection và type-safe query construction.

4. **Entity Manager - Quản Lý Entity**: Cung cấp API cho entity operations (save, remove, find). Entity Manager là low-level API cho entity manipulation.

5. **Repository Pattern - Mẫu Kho Lưu Trữ**: Cung cấp repository instances cho mỗi entity type. Repositories cung cấp convenient API cho common operations.

6. **Migration System - Hệ Thống Migration**: Quản lý database schema changes versioning. Migrations cho phép version control cho database schema và rollback khi cần.

**Sơ Đồ TypeORM Architecture**:

```
┌─────────────────────────────────────┐
│      TypeORM Framework              │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Entity System                │ │
│  │  - @Entity()                  │ │
│  │  - @Column()                  │ │
│  │  - @PrimaryGeneratedColumn()  │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Metadata System              │ │
│  │  - Entity metadata            │ │
│  │  - Column metadata            │ │
│  │  - Relationship metadata      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Query Builder                │ │
│  │  - Build SQL queries          │ │
│  │  - Type-safe queries          │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  DataSource                   │ │
│  │  - Connection management      │ │
│  │  - Transaction management      │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Multiple Database Drivers - Nhiều Trình Điều Khiển Database**:

TypeORM hỗ trợ multiple database drivers:

- **PostgreSQL**: Driver cho PostgreSQL database
- **MySQL/MariaDB**: Driver cho MySQL và MariaDB
- **SQLite**: Driver cho SQLite database
- **MongoDB**: Driver cho MongoDB (NoSQL)
- **SQL Server**: Driver cho Microsoft SQL Server
- **Oracle**: Driver cho Oracle database

**DataSource - Nguồn Dữ Liệu**:

DataSource là trung tâm quản lý database connections trong TypeORM. DataSource:

- Quản lý connection pool
- Cung cấp repositories
- Quản lý transactions
- Cung cấp query builder

**Sơ Đồ DataSource**:

```
DataSource
    │
    ├─── Connection Pool
    │    ├─── Connection 1
    │    ├─── Connection 2
    │    └─── Connection N
    │
    ├─── Entity Manager
    │    └─── Manage entities
    │
    ├─── Repository Factory
    │    └─── Create repositories
    │
    └─── Transaction Manager
         └─── Manage transactions
```

**Repository Pattern trong TypeORM**:

TypeORM cung cấp repository pattern cho data access:

- **Base Repository**: Cung cấp các methods cơ bản (find, save, delete, etc.)
- **Custom Repository**: Có thể extend base repository với custom methods
- **Repository Injection**: Repositories có thể được inject vào services

**Best Practices**:

- Sử dụng TypeORM decorators để define entities
- Tận dụng type safety của TypeScript
- Sử dụng migrations để quản lý schema changes
- Sử dụng transactions cho operations phức tạp
- Tối ưu queries để tránh N+1 problems

**Connection Management**: TypeORM quản lý database connections thông qua Connection (legacy) hoặc DataSource (new API). Connections được pool để tối ưu hóa performance và quản lý resources hiệu quả. Connection pool settings include: max connections, min connections, connection timeout, và idle timeout. Connection pooling reduces overhead của creating và closing connections cho mỗi query.

**DataSource Configuration**: DataSource là new API trong TypeORM cho connection management. DataSource combines connection options, entity metadata, và migration configuration. DataSource provides methods: initialize(), destroy(), và runMigrations(). DataSource can be configured với synchronize (auto-sync schema, development only), logging (query logging), và entities (entity classes hoặc paths).

**Query Execution**: TypeORM cung cấp nhiều cách để execute queries:

- **Entity Manager**: Direct entity operations (save, remove, find, findOne). Entity Manager provides low-level API cho entity manipulation.

- **Repository**: Entity-specific repository instances với methods như find(), findOne(), save(), delete(). Repositories provide convenient API cho common operations.

- **Query Builder**: Programmatic query construction với methods như select(), where(), join(), orderBy(). Query Builder provides type-safe query construction và protection từ SQL injection.

- **Raw Queries**: Direct SQL execution với parameter binding. Raw queries useful cho complex queries không easily expressible với Query Builder.

Mỗi cách có use cases riêng và mức độ abstraction khác nhau. Repository is recommended cho most use cases.

**Migration System - Hệ Thống Migration**:

TypeORM cung cấp migration system mạnh mẽ để quản lý database schema changes. Migrations cho phép version control cho database schema và rollback khi cần.

**Khái Niệm Migration**:

Migrations là các TypeScript classes với `up()` và `down()` methods:

- **up()**: Thực hiện schema changes (tạo table, thêm column, etc.)
- **down()**: Rollback schema changes (xóa table, xóa column, etc.)

**Migration System Features**:

- **Version Control**: Track applied migrations trong database table
- **Automatic Generation**: Có thể generate migrations tự động từ entity changes
- **Manual Writing**: Có thể viết migrations thủ công cho complex changes
- **Rollback Support**: Hỗ trợ rollback migrations khi cần

**Sơ Đồ Migration Flow**:

```
Entity Changes
    │
    ▼
Generate Migration
    │
    ▼
Migration File Created
    │
    ├─── up() method
    │    └─── Apply changes
    │
    └─── down() method
         └─── Rollback changes
    │
    ▼
Run Migration
    │
    ▼
Database Updated
    │
    ▼
Migration Tracked
```

**Metadata Storage - Lưu Trữ Metadata**:

TypeORM lưu trữ entity metadata trong MetadataArgsStorage, một centralized storage cho tất cả entity metadata. Metadata bao gồm:

- **Entity Definitions**: Table name, schema, database, synchronization options
- **Column Definitions**: Column names, types, constraints, default values, transformers
- **Relationship Definitions**: Relationship types, target entities, cascade options, join columns
- **Index Definitions**: Index columns, unique constraints, options
- **Primary Key Definitions**: Primary key columns, generation strategies

**Metadata Build Process**:

Metadata được build từ decorators during application startup khi entities are registered với DataSource. Metadata is immutable after initialization và được sử dụng để:

- Generate SQL queries
- Validate entity structures
- Transform data between objects và database rows

**Schema Synchronization - Đồng Bộ Schema**:

TypeORM có thể automatically synchronize database schema với entity definitions (synchronize: true). Synchronization:

- Tạo tables từ entity definitions
- Thêm columns từ property decorators
- Tạo indexes từ @Index() decorators
- Setup foreign keys từ relationships

**Lưu Ý Quan Trọng**:

- **Development Only**: Synchronization chỉ nên dùng cho development
- **Data Loss Risk**: Synchronization có thể gây mất dữ liệu
- **Production**: Migrations được khuyến nghị cho production schema management

**Transaction Management - Quản Lý Giao Dịch**:

TypeORM hỗ trợ transactions cho atomic operations. Transactions đảm bảo ACID properties cho complex operations involving multiple entities.

**Cách Quản Lý Transactions**:

1. **Entity Manager**: Sử dụng `transaction()` method
2. **Query Runner**: Sử dụng `startTransaction()`, `commitTransaction()`, `rollbackTransaction()`

**Sơ Đồ Transaction Flow**:

```
Start Transaction
    │
    ▼
Execute Operations
    │
    ├─── Operation 1
    ├─── Operation 2
    └─── Operation 3
    │
    ├─── Success ──► Commit Transaction
    │                 │
    │                 ▼
    │            Changes Saved
    │
    └─── Error ──► Rollback Transaction
                   │
                   ▼
              Changes Reverted
```

**ACID Properties**:

Transactions đảm bảo:

- **Atomicity**: Tất cả operations succeed hoặc tất cả fail
- **Consistency**: Database remains trong consistent state
- **Isolation**: Concurrent transactions không interfere với nhau
- **Durability**: Committed changes persist ngay cả sau system failures

### 6.2 Entity Design và Decorators

Entities là các classes TypeScript được map với database tables thông qua decorators và metadata:

**Entity Definition**: Entities được định nghĩa bằng @Entity() decorator với optional configuration:

- **name**: Custom table name (default: class name)
- **schema**: Database schema name
- **database**: Database name (multi-database setups)
- **orderBy**: Default ordering cho queries
- **synchronize**: Whether to synchronize table (development only)
- **engine**: Table engine (MySQL)
- **comment**: Table comment

Decorator này đánh dấu class như một entity và register it trong TypeORM metadata system. Entity classes must be registered trong DataSource configuration.

**Column Decorators**: Các properties của entity được map với database columns bằng @Column() decorator với extensive options:

- **type**: Column type (varchar, int, decimal, date, json, etc.)
- **length**: Column length (cho string types)
- **width**: Display width (cho numeric types)
- **nullable**: Whether column can be null
- **unique**: Whether column has unique constraint
- **default**: Default value (function hoặc value)
- **primary**: Whether column is part of primary key
- **generated**: Whether column is generated (identity, uuid)
- **precision**: Decimal precision
- **scale**: Decimal scale
- **enum**: Enum values (cho enum type)
- **array**: Whether column stores array (PostgreSQL)
- **comment**: Column comment
- **transformer**: Value transformer (serialize/deserialize)

**Primary Keys**: Primary keys được đánh dấu bằng:

- **@PrimaryColumn()**: Manual primary key, value must be provided
- **@PrimaryGeneratedColumn()**: Auto-generated primary key với options:
  - **strategy**: 'increment' (auto-increment), 'uuid' (UUID v4), 'rowid' (SQLite)
  - **type**: Column type cho generated value

Generated columns tự động tạo values khi entity is inserted. UUID strategy useful cho distributed systems.

**Composite Primary Keys**: Multiple columns can form composite primary key sử dụng @PrimaryColumn() trên multiple properties. Composite keys useful cho junction tables và when single column không sufficient để uniquely identify rows.

**Column Types**: TypeORM hỗ trợ nhiều column types:

- **String Types**: varchar, char, text, nvarchar
- **Numeric Types**: int, bigint, decimal, float, double, smallint, tinyint
- **Date Types**: date, time, datetime, timestamp, timestamptz
- **Boolean Types**: boolean, tinyint (MySQL)
- **Binary Types**: blob, bytea
- **JSON Types**: json, jsonb (PostgreSQL)
- **Array Types**: array (PostgreSQL)
- **Enum Types**: enum (database-specific)

Column types map TypeScript types với database types, ensuring type safety.

**Relationships**: TypeORM hỗ trợ các loại relationships với different cardinalities:

- **One-to-One**: Một entity liên kết với exactly one entity khác. Implemented với foreign key trong one table. Can be unidirectional hoặc bidirectional.

- **One-to-Many**: Một entity liên kết với nhiều entities khác. Foreign key được đặt trong "many" side. One-to-many relationships are common (Category -> Products).

- **Many-to-One**: Nhiều entities liên kết với một entity. Inverse của one-to-many. Foreign key trong "many" side.

- **Many-to-Many**: Nhiều entities liên kết với nhiều entities khác. Requires junction table (join table) để store relationships. Junction table contains foreign keys từ both entities.

**Relationship Decorators**: Relationships được định nghĩa bằng decorators với options:

- **@OneToOne()**: Options include target entity, inverse side, cascade, eager, onDelete, onUpdate
- **@OneToMany()**: Options include target entity, inverse side, cascade, eager
- **@ManyToOne()**: Options include target entity, inverse side, eager, onDelete, onUpdate
- **@ManyToMany()**: Options include target entity, inverse side, cascade, eager, joinTable (junction table configuration)

**Join Columns**: @JoinColumn() decorator specifies foreign key column name và options cho relationships. @JoinTable() decorator configures junction table cho many-to-many relationships với options: name, joinColumn, inverseJoinColumn.

**Cascade Options**: Cascade options xác định operations nào được propagate từ parent entity đến child entities:

- **Cascade Insert**: Child entities được tự động insert khi parent được insert
- **Cascade Update**: Child entities được tự động update khi parent được update
- **Cascade Remove**: Child entities được tự động remove khi parent được remove
- **Cascade Soft Remove**: Child entities được soft-deleted khi parent được soft-deleted
- **Cascade Recover**: Child entities được recovered khi parent được recovered

Cascade options được specify trong relationship decorator: cascade: ['insert', 'update', 'remove']. Cascade remove cần be used carefully để avoid accidental data loss.

**Eager và Lazy Loading**: TypeORM hỗ trợ cả eager loading và lazy loading:

- **Eager Loading**: Relationships được load tự động khi parent entity is loaded. Eager loading specified với eager: true trong relationship decorator. Eager loading simplifies code nhưng có thể load unnecessary data và cause N+1 queries nếu not careful.

- **Lazy Loading**: Relationships được load khi accessed (requires Promise-based properties). Lazy loading specified với lazy: true trong relationship decorator. Lazy loading reduces initial load time nhưng có thể cause N+1 query problem nếu relationships are accessed trong loops.

- **Manual Loading**: Load relationships manually sử dụng relations option trong find() methods hoặc Query Builder. Manual loading provides control over what is loaded và when.

**Indexes**: Indexes có thể be defined trên entities sử dụng @Index() decorator với options: columns, unique, sparse, background. Indexes improve query performance cho frequently queried columns. Composite indexes can be created trên multiple columns.

### 6.3 Entity Metadata và Reflection

Metadata là thông tin về structure và configuration của entities được store và retrieve tại runtime:

**Metadata Storage**: TypeORM lưu trữ metadata về entities trong MetadataArgsStorage, một centralized storage cho all entity metadata. Metadata bao gồm:

- **Entity Metadata**: Table name, schema, database, synchronization options
- **Column Metadata**: Column names, types, constraints, default values, transformers
- **Relationship Metadata**: Relationship types, target entities, cascade options, join columns
- **Index Metadata**: Index definitions, columns, unique constraints
- **Primary Key Metadata**: Primary key columns, generation strategies

Metadata được build từ decorators during application startup khi entities are registered với DataSource. Metadata is immutable after initialization.

**Metadata Reflection**: TypeORM sử dụng reflect-metadata để lưu trữ và truy xuất metadata tại runtime. Metadata được lưu trữ khi decorators được apply và được sử dụng khi generate SQL queries. Reflection allows TypeORM to:

- Inspect entity structure tại runtime
- Generate SQL queries từ metadata
- Validate entity configurations
- Transform data between objects và database rows

Metadata reflection enables dynamic behavior mà không cần hardcode entity structures.

**Metadata Keys**: TypeORM sử dụng specific metadata keys để store different types of information:

- **Column metadata**: Stored với keys identifying column properties
- **Relationship metadata**: Stored với keys identifying relationship configurations
- **Index metadata**: Stored với keys identifying index definitions

Metadata keys are internal và managed by TypeORM, không cần be accessed directly.

**Schema Generation**: TypeORM có thể tự động generate database schema từ entity metadata sử dụng synchronize option hoặc schema:sync command. Schema generation:

- Creates tables từ entity definitions
- Adds columns từ property decorators
- Creates indexes từ @Index() decorators
- Sets up foreign keys từ relationships
- Applies constraints (unique, nullable, etc.)

Schema generation is useful cho development nhưng dangerous cho production vì it can cause data loss. Migrations are recommended cho production schema management để have control over changes.

**Metadata API**: TypeORM cung cấp Metadata API thông qua DataSource.getMetadata() để truy xuất metadata programmatically. Metadata API provides access to:

- Entity metadata (table name, columns, relationships)
- Column metadata (type, constraints, options)
- Relationship metadata (type, target, cascade options)
- Index metadata (columns, unique, options)

API này hữu ích cho các tools và utilities cần thông tin về entity structure, code generation, và validation tools.

**Custom Metadata**: Có thể thêm custom metadata vào entities bằng custom decorators sử dụng reflect-metadata. Custom metadata có thể được sử dụng cho:

- **Validation**: Store validation rules với properties
- **Serialization**: Store serialization options (exclude, transform)
- **Authorization**: Store authorization rules với entities
- **Documentation**: Store documentation strings với entities
- **Business Logic**: Store business-specific metadata

Custom metadata extends TypeORM's built-in metadata system và allows domain-specific extensions.

**Metadata Performance**: Metadata reflection có overhead nhỏ, nhưng metadata được cache bởi TypeORM để minimize performance impact. Metadata được build once during application startup và reused for all queries. Runtime metadata access is fast vì it's simple property lookups trong metadata storage.

**Metadata Validation**: TypeORM validates metadata during initialization để ensure consistency:

- Validates column types match database support
- Validates relationships have valid target entities
- Validates indexes reference existing columns
- Validates primary keys are properly defined

Validation errors are thrown during application startup, preventing runtime errors.

### 6.4 Active Record vs Data Mapper

TypeORM hỗ trợ cả hai pattern: Active Record và Data Mapper:

**Active Record Pattern**: Trong Active Record pattern, entity class chứa cả data và methods để thao tác với data. Entity có thể tự save, update, và delete mà không cần repository.

**Data Mapper Pattern**: Trong Data Mapper pattern, entities chỉ chứa data, và repositories chịu trách nhiệm thao tác với database. Entities và data access logic được tách biệt.

**Trade-offs**: Mỗi pattern có trade-offs:

- **Active Record**: Đơn giản hơn, ít code hơn, nhưng entities có nhiều responsibilities
- **Data Mapper**: Tách biệt concerns tốt hơn, dễ test hơn, nhưng cần nhiều code hơn

**NestJS Recommendation**: NestJS thường khuyến khích Data Mapper pattern vì nó phù hợp hơn với dependency injection và separation of concerns principles.

**Hybrid Approach**: Có thể sử dụng hybrid approach, nơi entities chứa một số business logic nhưng repositories xử lý data access. Điều này cân bằng giữa simplicity và separation of concerns.

### 6.5 Query Builder và Raw Queries

TypeORM cung cấp nhiều cách để execute database queries:

**Repository Methods**: Repository cung cấp các methods như find(), findOne(), save(), delete() cho các operations phổ biến. Các methods này đơn giản và type-safe.

**Query Builder**: Query Builder cho phép xây dựng queries phức tạp một cách programmatic. Query Builder cung cấp type safety và protection khỏi SQL injection.

**Raw Queries**: TypeORM hỗ trợ raw SQL queries cho các trường hợp cần performance tối đa hoặc các queries quá phức tạp cho Query Builder. Raw queries yêu cầu cẩn thận để tránh SQL injection.

**Query Optimization**: TypeORM cung cấp các tính năng để optimize queries:

- **Select Specific Columns**: Chỉ select columns cần thiết để giảm data transfer
- **Relations Loading**: Control cách relationships được load (eager, lazy, hoặc manual)
- **Query Caching**: Cache query results để giảm database load
- **Index Hints**: Suggest indexes cho database optimizer

**Transaction Management**: TypeORM hỗ trợ transactions cho các operations cần atomicity. Transactions có thể be managed manually hoặc thông qua decorators.

## 7. PostgreSQL Database - Cơ Sở Dữ Liệu PostgreSQL

PostgreSQL là một object-relational database management system (ORDBMS - Hệ thống quản lý cơ sở dữ liệu quan hệ hướng đối tượng) mạnh mẽ và open-source, được sử dụng rộng rãi trong các ứng dụng enterprise.

### 7.1 Kiến Trúc PostgreSQL - Kiến Trúc Cơ Sở Dữ Liệu

PostgreSQL có kiến trúc phức tạp và mạnh mẽ, được thiết kế để đảm bảo reliability, performance, và extensibility.

**ACID Compliance - Tuân Thủ ACID**:

PostgreSQL đảm bảo ACID properties (Atomicity, Consistency, Isolation, Durability), đảm bảo data integrity ngay cả trong các transactions phức tạp.

**ACID Properties**:

- **Atomicity (Tính Nguyên Tử)**: Tất cả operations trong transaction succeed hoặc tất cả fail. Không có partial updates.

- **Consistency (Tính Nhất Quán)**: Database remains trong consistent state sau mỗi transaction. Tất cả constraints và rules được enforce.

- **Isolation (Tính Cô Lập)**: Concurrent transactions không interfere với nhau. Mỗi transaction thấy một consistent view của data.

- **Durability (Tính Bền Vững)**: Committed changes persist ngay cả sau system failures. Data được write vào persistent storage.

**Sơ Đồ ACID Properties**:

```
Transaction
    │
    ├─── Atomicity: All or Nothing
    ├─── Consistency: Valid State
    ├─── Isolation: Concurrent Safe
    └─── Durability: Persistent
```

**MVCC (Multi-Version Concurrency Control) - Điều Khiển Đồng Thời Đa Phiên Bản**:

PostgreSQL sử dụng MVCC để handle concurrent access. MVCC cho phép multiple transactions đọc và write data đồng thời mà không block lẫn nhau.

**Cách MVCC Hoạt Động**:

- Mỗi row có multiple versions (versions)
- Mỗi transaction thấy một snapshot của data tại thời điểm bắt đầu
- Write operations tạo versions mới thay vì overwrite versions cũ
- Old versions được cleanup khi không còn transactions nào sử dụng

**Lợi Ích Của MVCC**:

- **Read Performance**: Reads không block writes và ngược lại
- **Snapshot Isolation**: Mỗi transaction thấy consistent snapshot
- **Reduced Locking**: Ít locking conflicts hơn so với traditional locking
- **Better Concurrency**: Nhiều transactions có thể chạy đồng thời

**Sơ Đồ MVCC**:

```
Row với Multiple Versions
    │
    ├─── Version 1 (Transaction 1)
    ├─── Version 2 (Transaction 2)
    └─── Version 3 (Current)
    │
    ▼
Transactions see different versions
based on their start time
```

**Extensibility - Khả Năng Mở Rộng**:

PostgreSQL có kiến trúc extensible, cho phép thêm custom data types, functions, operators, và index types. Điều này làm cho PostgreSQL linh hoạt cho các use cases đặc biệt.

**Extensibility Features**:

- **Custom Data Types**: Định nghĩa data types mới cho domain-specific needs
- **Custom Functions**: Viết functions trong nhiều languages (PL/pgSQL, Python, etc.)
- **Custom Operators**: Định nghĩa operators cho custom types
- **Custom Index Types**: Tạo index types mới (ví dụ: GiST, GIN, SP-GiST)
- **Extensions**: Cài đặt extensions để thêm functionality

**Advanced Data Types - Các Kiểu Dữ Liệu Nâng Cao**:

PostgreSQL hỗ trợ nhiều data types nâng cao:

- **JSON/JSONB**: Lưu trữ và query JSON data. JSONB là binary format với indexing support.

- **Arrays**: Lưu trữ arrays của any type. Hữu ích cho tags, categories, etc.

- **hstore**: Key-value store trong single column. Hữu ích cho flexible schemas.

- **Custom Types**: Định nghĩa composite types, enums, và domain types.

- **Geometric Types**: Points, lines, polygons cho GIS applications.

- **Network Types**: IP addresses, MAC addresses cho network applications.

**Sơ Đồ Advanced Data Types**:

```
PostgreSQL Data Types
    │
    ├─── Standard Types
    │    ├─── Integer, Text, Boolean
    │    └─── Date, Time, Timestamp
    │
    ├─── Advanced Types
    │    ├─── JSON/JSONB
    │    ├─── Arrays
    │    ├─── hstore
    │    └─── Custom Types
    │
    └─── Specialized Types
         ├─── Geometric
         └─── Network
```

**Full-Text Search - Tìm Kiếm Toàn Văn**:

PostgreSQL cung cấp full-text search capabilities tích hợp, cho phép tìm kiếm text phức tạp mà không cần external search engines.

**Full-Text Search Features**:

- **Text Indexing**: Index text documents với tsvector type
- **Search Queries**: Sử dụng tsquery để search
- **Ranking**: Rank results theo relevance
- **Language Support**: Support nhiều languages với stemming
- **Phrase Search**: Tìm kiếm exact phrases
- **Boolean Operators**: AND, OR, NOT operators

**Sơ Đồ Full-Text Search**:

```
Text Document
    │
    ▼
Parse & Normalize
    │
    ▼
Create tsvector
    │
    ▼
Index
    │
    ▼
Search với tsquery
    │
    ▼
Ranked Results
```

**PostgreSQL Architecture - Kiến Trúc PostgreSQL**:

PostgreSQL có kiến trúc multi-process:

- **Postmaster Process**: Main process quản lý connections
- **Backend Processes**: Mỗi connection có một backend process
- **Background Processes**: Các processes cho maintenance tasks
- **Shared Memory**: Shared memory cho data structures

**Sơ Đồ PostgreSQL Architecture**:

```
┌─────────────────────────────────────┐
│      PostgreSQL Server              │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Postmaster Process           │ │
│  │  - Connection Management      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Backend Processes            │ │
│  │  - One per connection         │ │
│  │  - Query execution            │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Background Processes         │ │
│  │  - WAL Writer                 │ │
│  │  - Checkpointer               │ │
│  │  - Autovacuum                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Shared Memory                │ │
│  │  - Buffer Pool                │ │
│  │  - Lock Tables                │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 7.2 Schema Design và Normalization - Thiết Kế Schema và Chuẩn Hóa

Schema design là quá trình thiết kế cấu trúc database, bao gồm tables, columns, relationships, indexes, và constraints. Thiết kế schema tốt là nền tảng cho performance, maintainability, và scalability.

**Normalization - Chuẩn Hóa**:

Normalization là quá trình tổ chức data trong database để giảm redundancy (dư thừa) và improve data integrity (tính toàn vẹn dữ liệu). Các normal forms (dạng chuẩn) cung cấp guidelines cho schema design.

**Normal Forms - Các Dạng Chuẩn**:

1. **First Normal Form (1NF)**: Mỗi column chứa atomic values (giá trị nguyên tử), không có repeating groups.

2. **Second Normal Form (2NF)**: 1NF + tất cả non-key columns phụ thuộc hoàn toàn vào primary key.

3. **Third Normal Form (3NF)**: 2NF + không có transitive dependencies (phụ thuộc bắc cầu).

4. **Boyce-Codd Normal Form (BCNF)**: 3NF + mọi determinant (xác định) là candidate key.

**Lợi Ích Của Normalization**:

- **Reduced Redundancy**: Giảm dữ liệu trùng lặp
- **Data Integrity**: Đảm bảo tính toàn vẹn dữ liệu
- **Easier Updates**: Cập nhật dữ liệu dễ dàng hơn
- **Consistency**: Đảm bảo tính nhất quán

**Sơ Đồ Normalization Process**:

```
Unnormalized Data
    │
    ▼
1NF: Remove Repeating Groups
    │
    ▼
2NF: Remove Partial Dependencies
    │
    ▼
3NF: Remove Transitive Dependencies
    │
    ▼
BCNF: Remove Remaining Anomalies
```

**Denormalization - Phi Chuẩn Hóa**:

Đôi khi, denormalization (giảm normalization) có thể cải thiện performance bằng cách giảm số lượng joins. Trade-off là tăng redundancy và complexity của data updates.

**Khi Nào Sử Dụng Denormalization**:

- **Read-Heavy Workloads**: Khi reads nhiều hơn writes
- **Performance Critical**: Khi joins quá chậm
- **Reporting**: Khi cần aggregate data thường xuyên
- **Caching**: Khi cần cache computed values

**Trade-offs**:

- **Pros**: Faster reads, fewer joins, simpler queries
- **Cons**: More storage, slower writes, update complexity, data inconsistency risk

**Sơ Đồ Denormalization**:

```
Normalized Schema
    │
    ├─── Multiple Tables
    ├─── Foreign Keys
    └─── Joins Required
    │
    ▼
Denormalized Schema
    │
    ├─── Fewer Tables
    ├─── Redundant Data
    └─── Fewer Joins
```

**Indexing Strategy - Chiến Lược Đánh Chỉ Mục**:

Indexes cải thiện query performance nhưng tăng storage và slow down writes. Indexing strategy cần cân bằng giữa read performance và write performance.

**Types of Indexes - Các Loại Chỉ Mục**:

1. **B-tree Index**: Default index type, phù hợp cho most queries. Hỗ trợ equality và range queries.

2. **Hash Index**: Chỉ hỗ trợ equality queries. Nhanh hơn B-tree cho exact matches.

3. **GiST Index**: Generalized Search Tree. Phù hợp cho geometric data, full-text search.

4. **GIN Index**: Generalized Inverted Index. Phù hợp cho arrays, JSONB, full-text search.

5. **SP-GiST Index**: Space-partitioned GiST. Phù hợp cho non-balanced data structures.

6. **BRIN Index**: Block Range Index. Phù hợp cho very large tables với sorted data.

**Indexing Best Practices**:

- Index columns thường được sử dụng trong WHERE clauses
- Index foreign keys để improve join performance
- Index columns trong ORDER BY và GROUP BY
- Tránh over-indexing (quá nhiều indexes)
- Monitor index usage và remove unused indexes

**Sơ Đồ Index Types**:

```
Indexes
    │
    ├─── B-tree (Default)
    │    └─── Most queries
    │
    ├─── Hash
    │    └─── Equality only
    │
    ├─── GiST
    │    └─── Geometric, Full-text
    │
    ├─── GIN
    │    └─── Arrays, JSONB
    │
    └─── BRIN
         └─── Large sorted tables
```

**Constraints - Ràng Buộc**:

PostgreSQL hỗ trợ nhiều constraints để đảm bảo data integrity:

**1. Primary Keys - Khóa Chính**:

Uniquely identify rows trong table. Mỗi table nên có một primary key.

**2. Foreign Keys - Khóa Ngoại**:

Enforce referential integrity (tính toàn vẹn tham chiếu). Đảm bảo values trong foreign key column tồn tại trong referenced table.

**3. Unique Constraints - Ràng Buộc Duy Nhất**:

Ensure uniqueness của values trong column(s). Có thể có multiple unique constraints trên một table.

**4. Check Constraints - Ràng Buộc Kiểm Tra**:

Enforce business rules (quy tắc nghiệp vụ). Ví dụ: price > 0, age >= 18.

**5. Not Null Constraints - Ràng Buộc Không Rỗng**:

Ensure required fields không thể null. Đảm bảo data completeness.

**Sơ Đồ Constraints**:

```
Table
    │
    ├─── Primary Key
    │    └─── Unique identifier
    │
    ├─── Foreign Keys
    │    └─── Referential integrity
    │
    ├─── Unique Constraints
    │    └─── Uniqueness
    │
    ├─── Check Constraints
    │    └─── Business rules
    │
    └─── Not Null Constraints
         └─── Required fields
```

**Partitioning - Phân Vùng**:

PostgreSQL hỗ trợ table partitioning để chia large tables thành smaller, manageable pieces. Partitioning có thể cải thiện performance và simplify maintenance.

**Partitioning Types - Các Loại Phân Vùng**:

1. **Range Partitioning**: Partition dựa trên range của values (ví dụ: dates, numbers).

2. **List Partitioning**: Partition dựa trên list của values (ví dụ: regions, categories).

3. **Hash Partitioning**: Partition dựa trên hash function của column value.

**Lợi Ích Của Partitioning**:

- **Performance**: Queries chỉ scan relevant partitions
- **Maintenance**: Easier maintenance cho large tables
- **Parallelism**: Có thể query multiple partitions in parallel
- **Archiving**: Dễ dàng archive old partitions

**Sơ Đồ Partitioning**:

```
Large Table
    │
    ▼
Partitioned Table
    │
    ├─── Partition 1 (2020)
    ├─── Partition 2 (2021)
    ├─── Partition 3 (2022)
    └─── Partition 4 (2023)
    │
    ▼
Queries only scan
relevant partitions
```

### 7.3 Query Optimization

Query optimization là quá trình cải thiện performance của database queries:

**Query Planner**: PostgreSQL sử dụng query planner để chọn execution plan tốt nhất cho mỗi query. Planner xem xét indexes, table statistics, và query complexity.

**EXPLAIN và ANALYZE**: EXPLAIN và ANALYZE commands cho phép xem execution plan của queries và identify performance bottlenecks. Đây là tools quan trọng cho query optimization.

**Index Usage**: Indexes có thể dramatically cải thiện query performance, đặc biệt cho WHERE clauses và JOINs. Tuy nhiên, không phải tất cả queries đều benefit từ indexes.

**Query Patterns**: Một số query patterns có thể cải thiện performance:

- **Selective Queries**: Sử dụng WHERE clauses để filter data sớm
- **Limit và Offset**: Sử dụng LIMIT để giảm data transfer
- **Join Optimization**: Sử dụng appropriate join types và conditions
- **Subquery vs JOIN**: Chọn approach phù hợp dựa trên use case

**Connection Pooling**: Connection pooling giảm overhead của việc tạo và đóng connections. Pooling cho phép reuse connections và improve overall performance.

### 7.4 Transactions và Concurrency

Transactions đảm bảo data consistency trong các operations phức tạp:

**Transaction Properties**: Transactions có ACID properties:

- **Atomicity**: Tất cả operations trong transaction succeed hoặc tất cả fail
- **Consistency**: Database remains trong consistent state
- **Isolation**: Concurrent transactions không interfere với nhau
- **Durability**: Committed changes persist ngay cả sau system failures

**Isolation Levels**: PostgreSQL hỗ trợ các isolation levels khác nhau:

- **Read Uncommitted**: Cho phép dirty reads (không được hỗ trợ trong PostgreSQL)
- **Read Committed**: Default level, prevent dirty reads
- **Repeatable Read**: Prevent non-repeatable reads
- **Serializable**: Highest isolation, prevent phantom reads

**Locking**: PostgreSQL sử dụng locks để đảm bảo data consistency. Có nhiều loại locks: row-level, table-level, và advisory locks. Locking strategy cần cân bằng giữa consistency và concurrency.

**Deadlocks**: Deadlocks xảy ra khi hai transactions chờ đợi nhau. PostgreSQL tự động detect và resolve deadlocks bằng cách rollback một trong các transactions.

**Optimistic vs Pessimistic Locking**:

- **Optimistic Locking**: Assume conflicts are rare, check version/timestamp khi update
- **Pessimistic Locking**: Lock data trước khi update để prevent conflicts

## 8. Redis Caching và Session Management

### 8.1 Kiến Trúc Redis

Redis là một in-memory data structure store được sử dụng như database, cache, và message broker:

**In-Memory Storage**: Redis lưu trữ data trong memory, cung cấp tốc độ truy cập cực nhanh. Điều này làm cho Redis lý tưởng cho caching và session management.

**Data Structures**: Redis hỗ trợ nhiều data structures:

- **Strings**: Simple key-value pairs
- **Hashes**: Field-value pairs, useful cho objects
- **Lists**: Ordered collections of strings
- **Sets**: Unordered collections of unique strings
- **Sorted Sets**: Sets với scores, useful cho rankings
- **Streams**: Log-like data structures cho event sourcing

**Persistence Options**: Redis cung cấp các options để persist data:

- **RDB (Redis Database)**: Snapshot-based persistence
- **AOF (Append Only File)**: Log-based persistence
- **No Persistence**: Pure in-memory (fastest nhưng data loss risk)

**Pub/Sub**: Redis hỗ trợ publish/subscribe pattern cho messaging. Điều này hữu ích cho real-time features và event-driven architecture.

**Replication và Clustering**: Redis hỗ trợ replication và clustering để đảm bảo high availability và scalability.

### 8.2 Caching Strategies

Caching là kỹ thuật lưu trữ frequently accessed data trong fast storage để improve performance:

**Cache-Aside Pattern**: Application kiểm tra cache trước, nếu miss thì load từ database và store trong cache. Đây là pattern phổ biến nhất.

**Write-Through Pattern**: Data được write vào cả cache và database đồng thời. Đảm bảo cache luôn consistent với database.

**Write-Behind Pattern**: Data được write vào cache trước, sau đó write vào database asynchronously. Cải thiện write performance nhưng có risk của data loss.

**Refresh-Ahead Pattern**: Cache được refresh trước khi expire, đảm bảo data luôn fresh. Hữu ích cho data có access patterns predictable.

**Cache Invalidation**: Cache invalidation là quá trình remove hoặc update cached data khi source data changes. Strategies bao gồm:

- **Time-Based Expiration**: Cache expires sau một khoảng thời gian
- **Event-Based Invalidation**: Cache được invalidate khi events xảy ra
- **Tag-Based Invalidation**: Cache được tag và invalidate theo tags

**Cache Warming**: Cache warming là quá trình pre-populate cache với frequently accessed data. Điều này đảm bảo cache có data sẵn sàng khi cần.

### 8.3 Session Management

Session management là quá trình quản lý user sessions trong stateless applications:

**Stateless vs Stateful**: HTTP là stateless protocol, nhưng applications thường cần maintain state giữa requests. Sessions cung cấp mechanism để maintain state.

**Session Storage**: Sessions có thể được lưu trữ trong:

- **Server Memory**: Fast nhưng không scalable và data loss khi server restart
- **Database**: Persistent và scalable nhưng slower
- **Redis**: Fast, scalable, và persistent (với AOF/RDB)

**Session Lifecycle**: Session lifecycle bao gồm:

- **Creation**: Session được tạo khi user authenticates
- **Usage**: Session được sử dụng để maintain state giữa requests
- **Expiration**: Session expires sau một khoảng thời gian không hoạt động
- **Destruction**: Session được destroy khi user logs out hoặc expires

**Session Security**: Session security là quan trọng để prevent session hijacking và other attacks:

- **Secure Cookies**: Sử dụng secure và httpOnly flags
- **Session Rotation**: Rotate session IDs sau authentication
- **IP Validation**: Validate IP addresses để detect session theft
- **Timeout Management**: Implement appropriate timeout policies

**Distributed Sessions**: Trong distributed systems, sessions cần được share giữa multiple servers. Redis là lý tưởng cho distributed session storage vì nó fast và accessible từ tất cả servers.

## 9. Thiết Kế Entity Tables và Schema

### 9.1 Nguyên Tắc Thiết Kế Entity

Thiết kế entities là nền tảng cho database schema và application architecture:

**Domain-Driven Design**: Entities nên reflect domain model của ứng dụng. Mỗi entity đại diện cho một concept quan trọng trong business domain, với properties và behaviors phù hợp.

**Entity Naming**: Tên entities nên rõ ràng, descriptive, và consistent. Sử dụng singular nouns (User, Product, Order) thay vì plural. Tên nên reflect business terminology.

**Property Design**: Properties của entities nên:

- **Relevant**: Chỉ include properties cần thiết cho business logic
- **Typed**: Sử dụng appropriate types (string, number, date, enum, etc.)
- **Validated**: Properties nên có validation rules phù hợp
- **Documented**: Properties nên có comments giải thích purpose và constraints

**Primary Key Strategy**: Primary keys có thể be:

- **Auto-Increment**: Sequential integers, simple nhưng có security concerns
- **UUID**: Universally unique identifiers, better cho distributed systems
- **Natural Keys**: Business-meaningful keys, có thể change và không always unique
- **Composite Keys**: Multiple columns làm primary key, phức tạp hơn nhưng sometimes necessary

**Timestamps**: Entities thường nên có timestamps để track creation và updates:

- **Created At**: Timestamp khi entity được tạo
- **Updated At**: Timestamp khi entity được update lần cuối
- **Deleted At**: Timestamp cho soft deletes (optional)

### 9.2 Relationship Design

Relationships giữa entities là quan trọng cho data integrity và query efficiency:

**One-to-One Relationships**: Sử dụng khi một entity có exactly one related entity. Ví dụ: User và UserProfile. Có thể implement bằng foreign key trong một trong hai tables.

**One-to-Many Relationships**: Sử dụng khi một entity có nhiều related entities. Ví dụ: Category và Products. Foreign key được đặt trong "many" side (Products table).

**Many-to-Many Relationships**: Sử dụng khi entities có many-to-many relationship. Ví dụ: Products và Tags. Yêu cầu junction table (join table) để store relationships.

**Relationship Naming**: Relationship properties nên có tên rõ ràng reflect nature của relationship. Sử dụng descriptive names như "products", "orders", "tags" thay vì generic names.

**Cascade Operations**: Cascade options xác định behavior khi parent entity được update hoặc delete:

- **Cascade Insert**: Child entities được tự động insert khi parent được insert
- **Cascade Update**: Child entities được tự động update khi parent được update
- **Cascade Delete**: Child entities được tự động delete khi parent được delete (cẩn thận với data loss)

**Lazy vs Eager Loading**:

- **Lazy Loading**: Load relationships khi cần, giảm initial load time nhưng có thể cause N+1 query problem
- **Eager Loading**: Load relationships tự động, đơn giản hơn nhưng có thể load unnecessary data

### 9.3 Indexing Strategy

Indexes cải thiện query performance nhưng có costs:

**Primary Indexes**: Primary keys tự động có indexes. Đảm bảo uniqueness và fast lookups.

**Foreign Key Indexes**: Foreign keys nên có indexes để improve join performance. TypeORM thường tự động tạo indexes cho foreign keys.

**Unique Indexes**: Unique constraints tạo indexes để enforce uniqueness và improve lookup performance.

**Composite Indexes**: Composite indexes trên multiple columns có thể improve queries filter trên nhiều columns. Column order trong index là quan trọng.

**Partial Indexes**: Partial indexes chỉ index rows thỏa mãn một condition. Hữu ích cho large tables với filtered queries.

**Index Trade-offs**: Indexes cải thiện read performance nhưng:

- **Storage**: Indexes chiếm disk space
- **Write Performance**: Indexes slow down INSERT, UPDATE, DELETE operations
- **Maintenance**: Indexes cần được maintain khi data changes

**Index Selection**: Chọn indexes dựa trên:

- **Query Patterns**: Index columns thường được sử dụng trong WHERE clauses
- **Join Columns**: Index foreign keys và columns thường được join
- **Sort Columns**: Index columns thường được sử dụng trong ORDER BY
- **Filter Frequency**: Prioritize indexes cho frequently executed queries

### 9.4 Migration Management

Migrations quản lý database schema changes một cách có kiểm soát:

**Migration Concept**: Migrations là versioned scripts thay đổi database schema. Mỗi migration represents một thay đổi cụ thể và có thể be applied hoặc rolled back.

**Migration Benefits**: Migrations cung cấp:

- **Version Control**: Schema changes được track trong version control
- **Reproducibility**: Schema có thể be recreated từ migrations
- **Rollback Capability**: Changes có thể be rolled back nếu có problems
- **Team Collaboration**: Team members có thể sync schema changes

**Migration Best Practices**:

- **Atomic Changes**: Mỗi migration nên make một thay đổi atomic
- **Reversible**: Migrations nên be reversible khi possible
- **Descriptive Names**: Migration names nên describe changes clearly
- **Test Migrations**: Test migrations trên development trước khi apply production

**Migration Types**: Có nhiều loại migrations:

- **Schema Migrations**: Thay đổi table structure (add/remove columns, change types)
- **Data Migrations**: Transform hoặc migrate data
- **Seed Migrations**: Populate database với initial data

**Migration Workflow**: Migration workflow thường bao gồm:

1. **Create Migration**: Generate migration file với schema changes
2. **Review Migration**: Review generated SQL để ensure correctness
3. **Test Migration**: Test migration trên development database
4. **Apply Migration**: Apply migration trên target database
5. **Verify**: Verify schema changes và data integrity

## 10. Security và Authentication

### 10.1 Authentication Strategies

Authentication xác minh identity của users:

**Password-Based Authentication**: Traditional authentication sử dụng username/password. Passwords nên be hashed (không bao giờ store plain text) sử dụng algorithms như bcrypt hoặc Argon2.

**Token-Based Authentication**: Token-based authentication sử dụng tokens (như JWT) thay vì sessions. Tokens được sign và verify để ensure authenticity.

**OAuth và Social Login**: OAuth cho phép users authenticate sử dụng third-party providers (Google, Facebook, etc.). Giảm need cho password management và improve user experience.

**Multi-Factor Authentication (MFA)**: MFA thêm layer bảo mật bằng cách require multiple authentication factors (password + SMS code, password + authenticator app, etc.).

**Session Management**: Session management đảm bảo sessions được manage securely:

- **Session Expiration**: Sessions expire sau một khoảng thời gian
- **Session Rotation**: Rotate session IDs sau sensitive operations
- **Concurrent Session Limits**: Limit số lượng concurrent sessions per user

### 10.2 Authorization và Access Control

Authorization xác định permissions của authenticated users:

**Role-Based Access Control (RBAC)**: RBAC assign users vào roles, và roles có permissions. Users inherit permissions từ roles của họ.

**Permission-Based Access Control**: Permission-based systems assign permissions trực tiếp cho users hoặc roles. More granular nhưng more complex.

**Resource-Based Authorization**: Authorization có thể be based trên resource ownership. Ví dụ: users chỉ có thể edit resources của họ.

**Policy-Based Authorization**: Policies define rules cho authorization decisions. Policies có thể be complex và context-dependent.

**Authorization Middleware**: Authorization middleware trong NestJS có thể be used để protect routes và resources. Middleware check permissions trước khi allow access.

### 10.3 Data Validation và Sanitization

Validation và sanitization đảm bảo data integrity và security:

**Input Validation**: Tất cả input từ clients nên be validated:

- **Type Validation**: Ensure data types are correct
- **Format Validation**: Ensure data formats are correct (email, phone, etc.)
- **Range Validation**: Ensure values are within acceptable ranges
- **Business Rule Validation**: Ensure data satisfies business rules

**Sanitization**: Sanitization clean data để remove potentially dangerous content:

- **SQL Injection Prevention**: Use parameterized queries (TypeORM tự động handle)
- **XSS Prevention**: Sanitize user input để prevent cross-site scripting
- **Command Injection Prevention**: Sanitize input used trong system commands

**Validation Pipes**: NestJS validation pipes tự động validate incoming data dựa trên decorators và DTOs. Pipes có thể transform và validate data trước khi reach controllers.

**DTOs (Data Transfer Objects)**: DTOs define structure và validation rules cho data transfer. DTOs provide type safety và validation tại API boundaries.

### 10.4 Security Best Practices

Security best practices để protect ứng dụng:

**HTTPS**: Luôn sử dụng HTTPS để encrypt data in transit. HTTPS prevent man-in-the-middle attacks và protect sensitive data.

**Secrets Management**: Secrets (API keys, database passwords, etc.) nên be stored securely:

- **Environment Variables**: Store secrets trong environment variables
- **Secret Management Services**: Sử dụng services như AWS Secrets Manager cho production
- **Never Commit Secrets**: Không bao giờ commit secrets vào version control

**Rate Limiting**: Rate limiting prevent abuse bằng cách limit số lượng requests từ một source. Protect APIs từ DDoS attacks và abuse.

**CORS Configuration**: CORS (Cross-Origin Resource Sharing) configuration control which origins có thể access API. Proper CORS configuration prevent unauthorized access.

**Error Handling**: Error handling nên be careful để không leak sensitive information:

- **Generic Error Messages**: Return generic messages cho users
- **Detailed Logging**: Log detailed errors server-side
- **No Stack Traces**: Không expose stack traces trong production responses

## 11. Testing Strategy

### 11.1 Unit Testing

Unit tests test individual components trong isolation:

**Service Testing**: Services nên be tested với mocked dependencies. Mock repositories, other services, và external dependencies để test business logic trong isolation.

**Controller Testing**: Controllers nên be tested với mocked services. Test request/response handling, validation, và error handling.

**Repository Testing**: Repositories có thể be tested với in-memory database hoặc test database. Test CRUD operations và custom query methods.

**Mocking Strategies**: Sử dụng mocking libraries để create mocks:

- **Manual Mocks**: Create mock objects manually
- **Mocking Libraries**: Sử dụng libraries như jest-mock-extended
- **Test Doubles**: Sử dụng stubs, mocks, và spies appropriately

**Test Coverage**: Aim for high test coverage, đặc biệt cho critical business logic. Coverage metrics help identify untested code.

### 11.2 Integration Testing

Integration tests test interactions giữa components:

**Database Integration Tests**: Test database operations với real database (test database). Test transactions, relationships, và complex queries.

**API Integration Tests**: Test API endpoints end-to-end. Test request/response flow, authentication, authorization, và error handling.

**Service Integration Tests**: Test interactions giữa multiple services. Test workflows và business processes.

**Test Database**: Sử dụng separate test database để avoid affecting development data. Test database nên be reset hoặc isolated cho mỗi test run.

### 11.3 E2E Testing

End-to-end tests test complete user workflows:

**E2E Test Scope**: E2E tests cover complete workflows từ API requests đến database operations. Test real user scenarios và critical paths.

**Test Data Management**: E2E tests cần test data. Sử dụng fixtures hoặc seed data để ensure consistent test environment.

**Test Isolation**: Mỗi E2E test nên be independent và không depend trên state từ tests khác. Clean up sau mỗi test.

**Performance Testing**: E2E tests có thể include performance testing để ensure APIs meet performance requirements.

## 12. Performance Optimization

### 12.1 Database Performance

Database performance là critical cho API performance:

**Query Optimization**: Optimize queries để reduce execution time:

- **Index Usage**: Ensure queries use indexes effectively
- **Query Analysis**: Use EXPLAIN ANALYZE để identify bottlenecks
- **Avoid N+1 Queries**: Use eager loading hoặc batch loading để avoid N+1 problem
- **Select Specific Columns**: Chỉ select columns cần thiết

**Connection Pooling**: Connection pooling reuse database connections để reduce overhead. Configure pool size appropriately cho workload.

**Read Replicas**: Sử dụng read replicas để distribute read load. Write operations go to primary, read operations can go to replicas.

**Caching Strategy**: Cache frequently accessed data để reduce database load. Cache at multiple levels: application cache, query result cache, và object cache.

### 12.2 API Performance

API performance optimization:

**Response Compression**: Compress responses (gzip, brotli) để reduce bandwidth và improve transfer speed.

**Pagination**: Implement pagination cho large datasets để reduce response size và improve performance.

**Field Selection**: Allow clients to specify fields they need (field selection) để reduce response size.

**Async Processing**: Use async processing cho long-running operations. Return immediately và process in background.

**Rate Limiting**: Implement rate limiting để prevent abuse và ensure fair resource usage.

### 12.3 Caching Performance

Caching performance optimization:

**Cache Hit Ratio**: Monitor cache hit ratio để ensure caching is effective. Low hit ratio indicates caching strategy needs adjustment.

**Cache Warming**: Pre-populate cache với frequently accessed data để improve initial performance.

**Cache Invalidation**: Implement efficient cache invalidation để ensure data freshness while maintaining performance.

**Multi-Level Caching**: Use multiple cache levels (L1: in-memory, L2: Redis) để balance speed và capacity.

## 13. Deployment và Production

### 13.1 Build và Compilation

Production builds cần be optimized:

**TypeScript Compilation**: TypeScript được compile thành JavaScript. Production builds nên be optimized và minified.

**Environment Configuration**: Different configurations cho development, staging, và production. Use environment variables để manage configuration.

**Build Optimization**: Optimize builds để reduce bundle size và improve startup time:

- **Tree Shaking**: Remove unused code
- **Minification**: Minify JavaScript code
- **Source Maps**: Generate source maps cho debugging (exclude from production bundle)

### 13.2 Containerization

Containerization với Docker:

**Docker Images**: Package ứng dụng trong Docker images để ensure consistent deployment across environments.

**Multi-Stage Builds**: Use multi-stage builds để reduce image size và improve security.

**Environment Variables**: Pass configuration through environment variables trong containers.

**Health Checks**: Implement health check endpoints để monitor application status.

### 13.3 Monitoring và Logging

Monitoring và logging cho production:

**Application Logging**: Log important events, errors, và performance metrics. Use structured logging để facilitate analysis.

**Error Tracking**: Track errors và exceptions để identify và fix issues quickly. Use services như Sentry cho error tracking.

**Performance Monitoring**: Monitor API performance metrics:

- **Response Times**: Track response times cho different endpoints
- **Throughput**: Monitor requests per second
- **Error Rates**: Track error rates và types
- **Resource Usage**: Monitor CPU, memory, và database usage

**Alerting**: Set up alerts cho critical issues như high error rates, performance degradation, hoặc system failures.

## 14. Best Practices và Lessons Learned

### 14.1 Code Organization

Code organization best practices:

**Feature-Based Structure**: Organize code theo features thay vì theo file types. Group related files together.

**Consistent Naming**: Use consistent naming conventions cho files, classes, methods, và variables.

**Separation of Concerns**: Maintain clear separation giữa layers: controllers, services, repositories, và entities.

**DRY Principle**: Don't Repeat Yourself - extract common logic vào reusable functions hoặc services.

### 14.2 Error Handling

Error handling best practices:

**Centralized Error Handling**: Use exception filters để handle errors centrally. Provide consistent error responses.

**Error Types**: Define custom error types cho different error scenarios. Make errors informative nhưng không leak sensitive information.

**Error Logging**: Log errors với sufficient context để facilitate debugging. Include request information, user context, và stack traces.

**Graceful Degradation**: Handle errors gracefully và provide fallbacks khi possible. Don't crash application cho non-critical errors.

### 14.3 Documentation

Documentation best practices:

**API Documentation**: Document API endpoints với request/response examples, error codes, và authentication requirements.

**Code Comments**: Comment complex logic và business rules. Explain "why" not just "what".

**Architecture Documentation**: Document architecture decisions, patterns used, và rationale.

**Runbooks**: Create runbooks cho common operations và troubleshooting procedures.

## 15. Kết Luận

Hệ thống API backend này thể hiện các thực hành phát triển backend hiện đại thông qua việc sử dụng NestJS, TypeORM, PostgreSQL, và Redis. Kiến trúc ưu tiên modularity, separation of concerns, type safety, và performance.

Việc áp dụng các nguyên tắc SOLID, dependency injection, và design patterns tạo ra một codebase dễ bảo trì, test được, và mở rộng. TypeORM và PostgreSQL cung cấp nền tảng vững chắc cho data management, trong khi Redis cải thiện performance thông qua caching và session management.

Kiến trúc hiện tại cung cấp nền tảng vững chắc có thể accommodate growth và new features mà không cần refactoring đáng kể. Các best practices và patterns được document trong tài liệu này đảm bảo rằng hệ thống có thể scale và evolve một cách sustainable.

## 16. Message Queue và Event-Driven Architecture

### 16.1 Message Queue Concepts

Message queues là một pattern cho asynchronous communication giữa services và components:

**Message Queue Architecture**: Message queues act như buffers giữa message producers và consumers. Producers send messages vào queue, và consumers retrieve messages từ queue. Queues decouple producers và consumers, allowing them to operate independently và at different rates.

**Benefits của Message Queues**:

- **Decoupling**: Services không cần know about each other directly
- **Reliability**: Messages are persisted, ensuring delivery even if consumer is temporarily unavailable
- **Scalability**: Multiple consumers can process messages, distributing load
- **Asynchronous Processing**: Producers không cần wait for consumers to process messages
- **Rate Limiting**: Queues can control processing rate

**Message Patterns**: Common message patterns include:

- **Point-to-Point**: One producer, one consumer (queue)
- **Publish-Subscribe**: One producer, multiple consumers (topic)
- **Request-Reply**: Synchronous pattern với response
- **Fan-out**: One message to multiple queues

**Message Guarantees**: Message queues provide different delivery guarantees:

- **At-Least-Once**: Message is delivered at least once, may be duplicated
- **At-Most-Once**: Message is delivered at most once, may be lost
- **Exactly-Once**: Message is delivered exactly once (hardest to achieve)

### 16.2 Redis như Message Broker

Redis có thể be used như message broker thông qua Pub/Sub và Streams:

**Pub/Sub Pattern**: Redis Pub/Sub provides publish-subscribe messaging:

- **Channels**: Messages are published to channels, subscribers listen to channels
- **Publish**: Producers publish messages to channels
- **Subscribe**: Consumers subscribe to channels và receive messages
- **Pattern Matching**: Subscribers can use pattern matching để subscribe to multiple channels

Pub/Sub is fire-and-forget: messages are lost nếu no subscribers are listening. Suitable cho real-time notifications và event broadcasting.

**Redis Streams**: Redis Streams provide more advanced messaging với persistence:

- **Message Persistence**: Messages are stored và can be replayed
- **Consumer Groups**: Multiple consumers can process messages với load balancing
- **Acknowledgments**: Consumers acknowledge message processing
- **Message IDs**: Messages have unique IDs cho tracking
- **Range Queries**: Can query messages by ID range

Streams are suitable cho reliable message processing và event sourcing.

**Redis Lists**: Redis Lists can be used như simple queues với LPUSH/RPOP operations. Lists provide FIFO queue behavior. Suitable cho simple queuing needs nhưng lack advanced features của dedicated message brokers.

### 16.3 Message Queue trong NestJS

NestJS hỗ trợ message queues thông qua microservices transport:

**Redis Transport**: NestJS microservices can use Redis như transport layer. Redis transport provides:

- **Message Publishing**: Publish messages to Redis channels
- **Message Consumption**: Subscribe to Redis channels và handle messages
- **Request-Response**: Synchronous request-response pattern
- **Event-Based**: Asynchronous event publishing

**Message Patterns**: NestJS microservices support:

- **Message Pattern**: Request-response pattern với @MessagePattern() decorator
- **Event Pattern**: Fire-and-forget events với @EventPattern() decorator

**Message Serialization**: Messages are serialized (JSON by default) khi sent through Redis. Custom serializers can be configured cho different formats.

**Error Handling**: Message processing errors can be handled với try-catch hoặc error filters. Unhandled errors are logged và can trigger retry mechanisms.

### 16.4 Event-Driven Architecture với Message Queues

Event-driven architecture sử dụng message queues để implement loose coupling:

**Domain Events**: Domain events represent business events (order created, payment processed, etc.). Events are published to message queues và consumed by interested services. Events enable services to react to changes without direct dependencies.

**Event Sourcing**: Event sourcing stores all changes as events. Current state is reconstructed từ event history. Event sourcing provides audit trail và enables time travel. Events are stored trong event store (có thể be message queue với persistence).

**CQRS Integration**: Command Query Responsibility Segregation separates write operations (commands) từ read operations (queries). Message queues can be used để sync data between command và query sides. Commands produce events, events update query models.

**Saga Pattern**: Saga pattern manages distributed transactions through series of events. Each step in saga publishes event, next step consumes event. If step fails, compensating events are published. Message queues enable reliable saga execution.

## 17. Docker Containerization

### 17.1 Docker Concepts và Architecture

Docker là platform cho containerization, cho phép package applications với dependencies:

**Container Concept**: Containers are lightweight, isolated environments chứa application và dependencies. Containers share host OS kernel nhưng have isolated filesystems, networks, và processes. Containers are more lightweight than virtual machines.

**Docker Architecture**: Docker consists of:

- **Docker Engine**: Runtime và API cho managing containers
- **Docker Images**: Read-only templates cho creating containers
- **Docker Containers**: Running instances của images
- **Docker Registry**: Repository cho storing và sharing images (Docker Hub, private registries)

**Image Layers**: Docker images are built từ layers. Each layer represents a change (install package, copy file, etc.). Layers are cached và reused, improving build performance. Layers enable efficient image storage và sharing.

**Container Lifecycle**: Containers have lifecycle: create, start, stop, restart, remove. Containers can be paused, resumed, và inspected. Container state can be committed to new images.

### 17.2 Dockerfile và Image Building

Dockerfile là script để build Docker images:

**Dockerfile Instructions**: Dockerfile contains instructions:

- **FROM**: Base image to build upon
- **WORKDIR**: Set working directory
- **COPY/ADD**: Copy files vào image
- **RUN**: Execute commands during build
- **ENV**: Set environment variables
- **EXPOSE**: Document ports to expose
- **CMD/ENTRYPOINT**: Default command to run

**Multi-Stage Builds**: Multi-stage builds allow use multiple FROM statements để reduce final image size. Build stages can compile code, và final stage chỉ contains runtime dependencies. Multi-stage builds useful cho compiled languages và complex build processes.

**Layer Caching**: Docker caches layers để speed up builds. Layers are cached based on instruction và context. Changes to one layer invalidate subsequent layers. Optimize Dockerfile order để maximize cache hits.

**Image Optimization**: Image optimization techniques:

- **Use .dockerignore**: Exclude unnecessary files từ build context
- **Minimize Layers**: Combine RUN commands để reduce layers
- **Use Alpine Images**: Alpine Linux provides smaller base images
- **Remove Build Dependencies**: Don't include build tools trong production images
- **Multi-Stage Builds**: Separate build và runtime environments

### 17.3 Docker Compose cho Development

Docker Compose allows define và run multi-container applications:

**Compose File**: docker-compose.yml defines services, networks, và volumes:

- **Services**: Application components (API, database, Redis, etc.)
- **Networks**: Communication between services
- **Volumes**: Persistent data storage
- **Environment Variables**: Configuration cho services

**Service Dependencies**: Services can depend on other services với depends_on. Compose starts dependencies trước dependents. Health checks can be used để ensure services are ready.

**Development Workflow**: Docker Compose simplifies development:

- **Consistent Environment**: Same environment across team members
- **Easy Setup**: Single command to start all services
- **Isolation**: Services don't interfere với local installations
- **Port Mapping**: Expose services to host machine

**Volume Mounting**: Development volumes mount source code vào containers, enabling live reload. Production volumes use named volumes cho persistent data.

### 17.4 Production Containerization

Production containerization requires additional considerations:

**Security**: Container security best practices:

- **Non-Root User**: Run containers với non-root user
- **Minimal Images**: Use minimal base images để reduce attack surface
- **Image Scanning**: Scan images cho vulnerabilities
- **Secrets Management**: Don't store secrets trong images, use secrets management
- **Resource Limits**: Set CPU và memory limits

**Orchestration**: Production deployments typically use orchestration platforms:

- **Kubernetes**: Container orchestration với scaling, load balancing, service discovery
- **Docker Swarm**: Native Docker orchestration
- **Cloud Platforms**: AWS ECS, Google Cloud Run, Azure Container Instances

**Health Checks**: Containers should implement health check endpoints. Orchestrators use health checks để determine container status và restart unhealthy containers.

**Logging**: Container logging strategies:

- **Stdout/Stderr**: Log to standard streams, orchestrators collect logs
- **Log Drivers**: Configure Docker log drivers cho centralized logging
- **Structured Logging**: Use structured formats (JSON) cho log aggregation

## 18. Nginx Reverse Proxy và Load Balancing

### 18.1 Nginx Architecture

Nginx là high-performance web server và reverse proxy:

**Nginx Architecture**: Nginx uses event-driven, asynchronous architecture:

- **Master Process**: Manages worker processes
- **Worker Processes**: Handle requests (one worker per CPU core typically)
- **Event-Driven**: Non-blocking I/O cho high concurrency
- **Connection Pooling**: Reuses connections để reduce overhead

**Reverse Proxy**: Nginx acts như reverse proxy, forwarding requests to backend servers:

- **Request Forwarding**: Receives requests và forwards to backend
- **Response Aggregation**: Collects responses từ backend và returns to client
- **Load Distribution**: Distributes load across multiple backend servers
- **SSL Termination**: Handles SSL/TLS encryption, reducing backend load

**Benefits của Reverse Proxy**:

- **Load Balancing**: Distribute requests across multiple servers
- **SSL Termination**: Centralized SSL handling
- **Caching**: Cache responses để reduce backend load
- **Compression**: Compress responses để reduce bandwidth
- **Security**: Hide backend server details, add security layers

### 18.2 Load Balancing Strategies

Nginx provides multiple load balancing algorithms:

**Round Robin**: Distributes requests sequentially across servers. Default algorithm, simple và fair distribution.

**Least Connections**: Routes requests to server với fewest active connections. Useful cho long-lived connections.

**IP Hash**: Routes requests based on client IP hash. Ensures same client goes to same server (session affinity).

**Weighted Round Robin**: Round robin với server weights. Higher weight servers receive more requests.

**Health Checks**: Nginx can check backend server health và remove unhealthy servers từ rotation. Health checks prevent sending requests to failed servers.

**Backup Servers**: Backup servers are used khi primary servers are unavailable. Backup servers provide redundancy.

### 18.3 Nginx Configuration cho API

Nginx configuration cho API backend:

**Upstream Configuration**: Define backend server groups:

- **Server Definitions**: List backend servers với optional weights
- **Health Checks**: Configure health check intervals và timeouts
- **Backup Servers**: Define backup servers cho failover

**Location Blocks**: Configure request routing:

- **Proxy Pass**: Forward requests to upstream servers
- **Headers**: Set proxy headers (Host, X-Real-IP, X-Forwarded-For)
- **Timeouts**: Configure connection, send, và receive timeouts
- **Buffering**: Configure response buffering

**SSL/TLS Configuration**: Configure HTTPS:

- **Certificate Files**: Specify SSL certificate và key files
- **Protocols**: Specify allowed TLS protocols
- **Ciphers**: Configure cipher suites
- **OCSP Stapling**: Enable OCSP stapling cho performance

**Caching**: Configure response caching:

- **Cache Zones**: Define cache storage zones
- **Cache Keys**: Configure cache key generation
- **Cache Validity**: Set cache expiration times
- **Cache Invalidation**: Configure cache invalidation rules

**Rate Limiting**: Implement rate limiting:

- **Limit Zones**: Define rate limit zones
- **Limit Rules**: Configure rate limits per IP/client
- **Burst**: Allow burst requests above limit
- **Whitelist**: Exclude certain IPs từ rate limiting

### 18.4 Performance Optimization

Nginx performance optimization:

**Worker Configuration**: Configure worker processes và connections:

- **Worker Processes**: Set number of worker processes (typically CPU cores)
- **Worker Connections**: Set max connections per worker
- **Multi-Accept**: Accept multiple connections per event

**Caching Strategy**: Implement effective caching:

- **Static Assets**: Cache static files với long expiration
- **API Responses**: Cache GET requests với appropriate expiration
- **Cache Headers**: Respect Cache-Control headers từ backend
- **Cache Purging**: Implement cache purging khi data changes

**Compression**: Enable response compression:

- **Gzip**: Compress text-based responses
- **Brotli**: Use Brotli compression cho better ratios
- **Compression Levels**: Balance compression ratio và CPU usage

**Connection Keep-Alive**: Enable keep-alive connections để reuse connections và reduce overhead.

## 19. Ứng Dụng E-commerce Nông Nghiệp: Phân Tích Domain và Kiến Trúc

### 19.1 Domain Analysis

E-commerce nông nghiệp có các đặc điểm domain-specific:

**Agricultural Products**: Sản phẩm nông nghiệp có characteristics khác với general e-commerce products:

- **Perishability**: Sản phẩm có thời hạn sử dụng, cần inventory management chặt chẽ
- **Seasonality**: Sản phẩm có tính theo mùa, availability thay đổi theo thời gian
- **Origin Tracking**: Cần track nguồn gốc sản phẩm (farm, harvest date)
- **Certifications**: Các chứng nhận quan trọng (organic, pesticide-free, fair trade)
- **Quality Grades**: Sản phẩm có thể be graded (A, B, C) based on quality
- **Bulk Pricing**: Pricing có thể vary based on quantity (wholesale vs retail)

**Supply Chain**: Supply chain cho agricultural products có complexities:

- **Farm to Table**: Track journey từ farm đến consumer
- **Storage Requirements**: Different storage requirements (temperature, humidity)
- **Transportation**: Specialized transportation needs (refrigeration)
- **Quality Control**: Quality checks tại multiple points trong supply chain

**Seasonal Availability**: Products có seasonal availability patterns:

- **Harvest Seasons**: Products available during specific harvest seasons
- **Storage Duration**: Some products can be stored longer than others
- **Import/Export**: Products may be imported khi out of season locally

### 19.2 Entity Design cho Agriculture E-commerce

Entities cần be designed để reflect agricultural domain:

**Product Entity**: Product entity cần include agricultural-specific fields:

- **Harvest Date**: Date when product was harvested
- **Expiry Date**: Date when product expires
- **Origin**: Farm location và details
- **Certifications**: Array của certifications (organic, fair trade, etc.)
- **Storage Requirements**: Temperature, humidity requirements
- **Grade**: Quality grade (A, B, C)
- **Seasonal Availability**: Availability periods
- **Bulk Pricing Tiers**: Different prices cho different quantities

**Category Entity**: Categories reflect agricultural classifications:

- **Fruits**: Fresh fruits với subcategories
- **Vegetables**: Fresh vegetables với subcategories
- **Organic Produce**: Certified organic products
- **Herbs & Spices**: Fresh và dried herbs
- **Grains & Legumes**: Dry goods
- **Dairy Products**: If applicable
- **Processed Products**: Processed agricultural products

**Order Entity**: Orders cần handle agricultural-specific requirements:

- **Delivery Time Windows**: Specific delivery time slots
- **Temperature Control**: Requirements cho temperature-controlled delivery
- **Urgency**: Some products need faster delivery
- **Seasonal Pricing**: Prices may vary based on season

**Inventory Entity**: Inventory management cho perishable goods:

- **Batch Tracking**: Track products by batch (harvest date, farm)
- **Expiry Management**: Track expiry dates và alert when approaching
- **Quality Control**: Quality checks tại warehouse
- **Storage Location**: Track storage location trong warehouse

### 19.3 Business Logic cho Agriculture Domain

Business logic cần handle agricultural-specific scenarios:

**Inventory Management**: Inventory logic cho perishable goods:

- **FIFO (First In First Out)**: Sell oldest inventory first
- **Expiry Alerts**: Alert when products approaching expiry
- **Quality Checks**: Quality validation before shipping
- **Batch Management**: Manage products by batch để enable recalls nếu needed

**Pricing Strategy**: Pricing logic cho agricultural products:

- **Seasonal Pricing**: Adjust prices based on season và availability
- **Bulk Discounts**: Volume-based pricing
- **Quality-Based Pricing**: Different prices cho different grades
- **Market Pricing**: Adjust prices based on market conditions

**Order Processing**: Order processing với agricultural considerations:

- **Availability Checking**: Check real-time availability (considering expiry)
- **Delivery Scheduling**: Schedule deliveries within freshness windows
- **Quality Assurance**: Quality checks before order fulfillment
- **Substitution Logic**: Suggest alternatives khi products unavailable

**Supply Chain Tracking**: Track products through supply chain:

- **Origin Verification**: Verify product origin claims
- **Transportation Tracking**: Track products during transportation
- **Storage Conditions**: Monitor storage conditions
- **Quality History**: Maintain quality history throughout supply chain

### 19.4 API Design cho Agriculture E-commerce

API endpoints cần support agricultural-specific operations:

**Product Endpoints**: Product APIs với agricultural features:

- **Seasonal Products**: Endpoint để get products available in current season
- **Origin Search**: Search products by origin/farm
- **Certification Filter**: Filter products by certifications
- **Quality Grades**: Filter by quality grades
- **Bulk Pricing**: Get pricing cho different quantities

**Inventory Endpoints**: Inventory APIs cho perishable goods:

- **Expiry Alerts**: Get products approaching expiry
- **Batch Information**: Get information about specific batches
- **Availability Check**: Real-time availability checking
- **Storage Conditions**: Get storage requirements

**Order Endpoints**: Order APIs với agricultural considerations:

- **Delivery Windows**: Get available delivery time slots
- **Temperature Requirements**: Specify temperature requirements
- **Quality Guarantee**: Quality guarantee information
- **Substitution Options**: Get substitution suggestions

**Reporting Endpoints**: Reporting APIs cho agricultural insights:

- **Seasonal Trends**: Sales trends by season
- **Origin Performance**: Performance by origin/farm
- **Quality Metrics**: Quality metrics và statistics
- **Waste Tracking**: Track và report waste/expired products

### 19.5 Caching Strategy cho Agriculture Domain

Caching strategy cần consider agricultural product characteristics:

**Product Data Caching**: Cache product information với appropriate TTL:

- **Static Product Info**: Long TTL cho product details (name, description, images)
- **Dynamic Pricing**: Shorter TTL cho pricing (may change based on availability)
- **Availability**: Very short TTL cho availability (real-time data)
- **Seasonal Data**: Cache seasonal availability với season-based expiration

**Inventory Caching**: Cache inventory data carefully:

- **Availability**: Cache với short TTL (minutes) vì real-time data
- **Expiry Information**: Cache với appropriate TTL based on product type
- **Batch Information**: Cache batch data với longer TTL

**Category Caching**: Cache category data:

- **Category Trees**: Long TTL cho category structure
- **Product Counts**: Medium TTL cho product counts per category
- **Seasonal Categories**: Cache seasonal category data

**Cache Invalidation**: Invalidate cache khi:

- **Product Updates**: Invalidate product cache khi product updated
- **Inventory Changes**: Invalidate availability cache khi inventory changes
- **Pricing Changes**: Invalidate pricing cache khi prices updated
- **Seasonal Transitions**: Invalidate seasonal data khi seasons change

### 19.6 Performance Considerations

Performance optimization cho agriculture e-commerce:

**Database Optimization**: Optimize database cho agricultural queries:

- **Indexes**: Index trên harvest date, expiry date, origin, certifications
- **Partitioning**: Partition tables by date (harvest date, order date)
- **Query Optimization**: Optimize queries cho seasonal filtering, availability checking
- **Materialized Views**: Use materialized views cho complex aggregations

**API Response Optimization**: Optimize API responses:

- **Field Selection**: Allow clients to specify fields they need
- **Pagination**: Implement efficient pagination cho product listings
- **Compression**: Compress responses để reduce bandwidth
- **CDN**: Use CDN cho static assets (product images)

**Background Processing**: Use background jobs cho:

- **Expiry Checks**: Periodic checks cho expiring products
- **Inventory Updates**: Update inventory từ external systems
- **Price Calculations**: Calculate dynamic pricing
- **Report Generation**: Generate reports asynchronously

**Monitoring**: Monitor agricultural-specific metrics:

- **Expiry Alerts**: Monitor products approaching expiry
- **Seasonal Transitions**: Monitor seasonal availability changes
- **Quality Metrics**: Track quality-related metrics
- **Supply Chain Performance**: Monitor supply chain efficiency
