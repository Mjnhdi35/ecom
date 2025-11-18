# KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

Chương này tổng kết toàn bộ quá trình nghiên cứu, phát triển, và triển khai hệ thống e-commerce nông nghiệp. Kết luận đánh giá kết quả đạt được, đóng góp của luận văn về mặt lý thuyết và thực tiễn, đồng thời đề xuất các hướng phát triển tương lai cho hệ thống. Đánh giá được thực hiện dựa trên các tiêu chuẩn của Software Engineering và Web Development.

## Kết Luận

Luận văn đã nghiên cứu, thiết kế và triển khai thành công một hệ thống thương mại điện tử nông nghiệp sử dụng các công nghệ web hiện đại. Hệ thống đạt được các mục tiêu đề ra:

### Về Công Nghệ và Software Engineering

Hệ thống được phát triển với các công nghệ hiện đại và best practices của Software Engineering. Việc áp dụng các nguyên tắc Software Engineering đảm bảo code quality, maintainability, và scalability.

**Công Nghệ Stack:**

- **Backend**: NestJS framework với TypeScript, PostgreSQL database, và Redis caching. Technology stack được chọn dựa trên requirements và best practices. Stack provide structure, type safety, và performance.

- **Frontend**: Nuxt 4 với Vue.js, Nuxt UI component library, và TypeScript. Frontend stack enable SSR, excellent developer experience, và modern UI. Stack provide performance và accessibility.

- **Infrastructure**: Docker containerization, Nginx reverse proxy, và CI/CD pipelines. Infrastructure enable reliable deployment và scalability. Infrastructure as code improve consistency và automation.

**Software Engineering Practices:**

- **Modular Architecture**: Modular architecture với feature-based modules improve maintainability và scalability. Architecture follow separation of concerns và SOLID principles. Modularity enable team collaboration và parallel development.

- **Type Safety**: Type safety với TypeScript ensure code correctness và catch errors early. Type safety improve developer experience và reduce bugs. Type information provide documentation và enable safe refactoring.

- **Testing Strategy**: Comprehensive testing strategy với unit tests, integration tests, và E2E tests. Testing ensure code quality và reliability. High test coverage improve confidence trong system correctness.

- **Code Quality**: Code quality được ensure với linting, code reviews, và automated checks. Quality standards enforce consistency và best practices. Code quality improve maintainability và reduce technical debt.

### Về Công Nghệ

1. **Backend API với NestJS:**
   - Kiến trúc modular rõ ràng, dễ maintain và scale
   - Áp dụng thành công các nguyên tắc SOLID và design patterns
   - Dependency Injection giúp code testable và flexible
   - TypeORM cung cấp type-safe database access

2. **Frontend với Nuxt 4:**
   - Server-Side Rendering cải thiện SEO và performance
   - Component-based architecture với Nuxt UI
   - TypeScript đảm bảo type safety
   - Responsive design và accessibility compliance

3. **Database và Caching:**
   - PostgreSQL cung cấp nền tảng vững chắc cho data management
   - Redis caching cải thiện performance đáng kể
   - Schema design phù hợp với domain nông nghiệp

### Về Domain Nông Nghiệp

Hệ thống đã xử lý thành công các đặc thù của lĩnh vực nông nghiệp:

- **Quản lý tính theo mùa**: Hệ thống tự động quản lý tính khả dụng của sản phẩm dựa trên mùa vụ
- **Quản lý hạn sử dụng**: Cảnh báo và quản lý hạn sử dụng cho sản phẩm tươi sống
- **Theo dõi nguồn gốc**: Lưu trữ và hiển thị thông tin về nguồn gốc, xuất xứ
- **Chứng nhận và chất lượng**: Quản lý các chứng nhận và phân loại chất lượng

### Về Hiệu Suất

- API response times đạt mục tiêu (< 200ms cho 95% requests)
- Frontend page load times cải thiện đáng kể nhờ SSR
- Database queries được optimize với indexes
- Caching strategy hiệu quả (cache hit rate > 70%)

### Về Chất Lượng Mã Nguồn

- Code organization rõ ràng, dễ đọc và maintain
- Type safety với TypeScript giúp catch errors sớm
- Test coverage đạt mức tốt (> 75%)
- Documentation đầy đủ và chi tiết

## 4.1. Kết Quả Đạt Được Và Thách Thức Trong Quá Trình Thực Tập

### 4.1.1. Kết Quả Đạt Được

#### 4.1.1.1. Về Mặt Kỹ Thuật

**Backend API (NestJS)**

Xây dựng thành công hệ thống API RESTful với 11 modules hoàn chỉnh:

- Authentication & Users: JWT, OAuth, RBAC (Roles/Permissions)
- Catalog: Products, Categories, Images, Reviews, Stars
- Sales: Cart, Orders, Payments, Order workflow
- Support: Address management
- Supplier & Agriculture: Quản lý nhà cung cấp và nông trại
- CMS: Blog posts, Banners

Áp dụng thành công các nguyên tắc SOLID và Design Patterns:

- Dependency Injection (DI) và Inversion of Control (IoC)
- Repository Pattern cho data access
- Factory Pattern cho service creation
- BaseCrudService để giảm code duplication

Xây dựng Dynamic Query Builder với metadata reflection:

- Hỗ trợ select, where, sort, pagination động
- Tự động join relations dựa trên metadata
- Validation và sanitization tự động

Bảo mật toàn diện:

- JWT authentication với refresh token
- RBAC (Role-Based Access Control) với guards
- Password hashing với bcrypt
- Input validation và sanitization

Database design:

- ERD với 20+ entities
- Migrations và seeds
- Soft delete support
- ACID transactions

**Frontend Client (Nuxt.js 4)**

Xây dựng ứng dụng SSR/SSG với Nuxt 4.2.0:

- Server-side rendering cho SEO
- Static site generation cho performance
- API proxy qua server routes

UI/UX với Nuxt UI 4.1.0:

- Design tokens nhất quán
- Responsive design
- Component library reusable

State management với Pinia:

- Centralized state
- Persistent storage
- Type-safe stores

Tích hợp API hoàn chỉnh:

- Authentication flow
- Product catalog
- Shopping cart
- Order management
- Reviews và ratings

**Infrastructure & DevOps**

Monorepo architecture với Yarn workspaces:

- Shared packages (@freshshop/types, @freshshop/utils)
- Code sharing và reusability
- Hoisting optimization

Docker containerization:

- PostgreSQL database
- Redis cache
- Development environment setup

CI/CD ready:

- Build scripts
- Migration scripts

#### 4.1.1.2. Về Mặt Tài Liệu

Tài liệu kỹ thuật đầy đủ:

- Architecture documentation
- API endpoints documentation
- Database schema
- Frontend components và composables
- Setup guides
- Best practices

Báo cáo thực tập:

- Sơ đồ kiến trúc (Architecture diagrams)
- ERD (Entity Relationship Diagram)
- Flow diagrams
- Screenshots và figures

#### 4.1.1.3. Về Mặt Kỹ Năng

Nâng cao kỹ năng lập trình:

- TypeScript advanced features
- NestJS framework mastery
- Nuxt.js 4 và Vue 3 Composition API
- Database design và optimization

Kỹ năng kiến trúc phần mềm:

- SOLID principles application
- Design patterns implementation
- Clean architecture
- Monorepo management

Kỹ năng làm việc nhóm:

- Code review
- Documentation writing
- Project organization

Kỹ năng DevOps:

- Docker containerization
- Database migrations
- Environment configuration

### 4.1.2. Thách Thức

#### 4.1.2.1. Thách Thức Kỹ Thuật

**Phức tạp của kiến trúc monorepo**

- Vấn đề: Quản lý dependencies và hoisting trong monorepo
- Giải pháp: Sử dụng Yarn workspaces với hoisting configuration, tạo shared packages để tránh duplication
- Bài học: Cần hiểu rõ cơ chế hoisting và workspace resolution

**Dynamic Query Builder với TypeORM**

- Vấn đề: Xây dựng query builder an toàn và linh hoạt với metadata reflection
- Giải pháp: Sử dụng TypeORM metadata API, whitelist relations và fields, validation tự động
- Bài học: Metadata reflection mạnh mẽ nhưng cần cẩn thận với security

**State management trong Nuxt SSR**

- Vấn đề: Đồng bộ state giữa server và client trong SSR
- Giải pháp: Sử dụng Pinia với SSR support, API proxy qua server routes
- Bài học: SSR cần xử lý đặc biệt cho state và authentication

**Database migration và seeding**

- Vấn đề: Quản lý migrations và seed data cho nhiều môi trường
- Giải pháp: TypeORM migrations với versioning, seed scripts với transaction support
- Bài học: Cần có strategy rõ ràng cho database evolution

#### 4.1.2.2. Thách Thức Về Thời Gian

- Thời gian học hỏi công nghệ mới: NestJS, Nuxt 4, TypeORM là các công nghệ mới cần thời gian nghiên cứu
- Thời gian viết tài liệu: Tài liệu kỹ thuật chi tiết tốn nhiều thời gian nhưng rất quan trọng
- Thời gian testing: Cần cân bằng giữa phát triển tính năng và testing

#### 4.1.2.3. Thách Thức Về Kiến Thức

- Kiến trúc phần mềm: Cần hiểu sâu về SOLID, design patterns, clean architecture
- Bảo mật: JWT, RBAC, OAuth là các khái niệm phức tạp cần nghiên cứu kỹ
- Performance optimization: SSR, caching, database query optimization

## 4.2. Ưu Điểm Và Hạn Chế Của Sản Phẩm Thực Tập

### 4.2.1. Ưu Điểm

#### 4.2.1.1. Kiến Trúc Và Thiết Kế

Kiến trúc modular và scalable:

- Monorepo structure cho phép mở rộng dễ dàng
- Module-based architecture với clear separation of concerns
- Shared packages giảm code duplication

Áp dụng best practices:

- SOLID principles trong toàn bộ codebase
- Design patterns (Repository, Factory, Strategy)
- Clean code và consistent naming conventions

Type safety:

- TypeScript strict mode
- Shared types giữa frontend và backend
- Type guards và validation

#### 4.2.1.2. Tính Năng

Authentication & Authorization hoàn chỉnh:

- JWT với refresh token
- RBAC với roles và permissions
- OAuth integration (Google)

E-commerce features đầy đủ:

- Product catalog với filtering và sorting
- Shopping cart và wishlist
- Order management với status workflow
- Reviews và ratings
- Payment integration ready

Agriculture-specific features:

- Farm management
- Crop tracking
- Season management
- Harvest tracking
- Quality grading

#### 4.2.1.3. Performance Và UX

- Server-side rendering: SEO-friendly và fast initial load
- Caching strategy: Redis cho session và API response caching
- Responsive design: Mobile-first approach với Nuxt UI
- User experience: Intuitive UI với design tokens nhất quán

#### 4.2.1.4. Tài Liệu Và Maintainability

- Documentation đầy đủ: Architecture, API, setup guides
- Code organization: Clear structure, easy to navigate
- Extensibility: Hooks và base classes cho phép mở rộng dễ dàng
- Testing ready: E2E tests và Postman collection

### 4.2.2. Hạn Chế

#### 4.2.2.1. Tính Năng Chưa Hoàn Thiện

- Payment integration: Chỉ có structure, chưa tích hợp payment gateway thực tế
- Real-time features: Chưa có WebSocket cho notifications
- Advanced search: Chưa có full-text search với Elasticsearch
- Image optimization: Chưa có image CDN và optimization
- Email notifications: Chưa có email service integration
- Admin dashboard: Chưa có admin interface đầy đủ

#### 4.2.2.2. Performance

- Database optimization: Chưa có query optimization và indexing strategy đầy đủ
- Caching strategy: Cần mở rộng caching cho nhiều endpoints hơn
- Bundle size: Frontend bundle có thể được optimize thêm
- Image loading: Chưa có lazy loading và progressive loading

#### 4.2.2.3. Testing

- Test coverage: Chưa đạt 100% code coverage
- Unit tests: Cần thêm unit tests cho services
- Integration tests: Cần thêm integration tests cho API endpoints
- E2E tests: Cần mở rộng E2E tests cho nhiều scenarios hơn

#### 4.2.2.4. Security

- Rate limiting: Chưa implement rate limiting đầy đủ
- Input sanitization: Cần mở rộng input validation
- Security headers: Cần thêm security headers (CSP, HSTS, etc.)
- Audit logging: Chưa có audit trail đầy đủ

#### 4.2.2.5. DevOps

- CI/CD pipeline: Chưa có CI/CD pipeline tự động
- Monitoring: Chưa có monitoring và logging system
- Error tracking: Chưa có error tracking (Sentry, etc.)
- Deployment automation: Chưa có deployment scripts tự động

## 4.3. Hướng Phát Triển Sản Phẩm Thực Tập

### 4.3.1. Tính Năng Ngắn Hạn (1-3 tháng)

**Payment Integration**

- Tích hợp payment gateways (Stripe, PayPal, VNPay)
- Payment webhooks handling
- Refund và dispute management

**Real-time Features**

- WebSocket integration cho notifications
- Real-time order status updates
- Live chat support

**Admin Dashboard**

- Admin interface đầy đủ
- Analytics và reporting
- User management
- Product management
- Order management

**Email Service**

- Email notifications (order confirmation, shipping, etc.)
- Email templates
- Email queue management

### 4.3.2. Tính Năng Trung Hạn (3-6 tháng)

**Advanced Search**

- Full-text search với Elasticsearch
- Search suggestions
- Search analytics

**Image Optimization**

- CDN integration (Cloudinary, AWS S3)
- Image optimization và compression
- Progressive image loading

**Mobile App**

- React Native hoặc Flutter app
- Push notifications
- Offline support

**Analytics & Reporting**

- User behavior analytics
- Sales reports
- Inventory reports
- Performance metrics

### 4.3.3. Tính Năng Dài Hạn (6-12 tháng)

**AI/ML Features**

- Product recommendations
- Price optimization
- Demand forecasting
- Fraud detection

**Multi-vendor Support**

- Seller dashboard
- Commission management
- Vendor analytics

**Internationalization**

- Multi-language support
- Multi-currency support
- Regional shipping

**Advanced Logistics**

- Shipping integration
- Tracking system
- Warehouse management

### 4.3.4. Technical Improvements

**Performance Optimization**

- Database indexing strategy
- Query optimization
- Caching strategy expansion
- CDN implementation

**Scalability**

- Microservices architecture (nếu cần)
- Load balancing
- Auto-scaling
- Database sharding

**Security Enhancements**

- Rate limiting
- DDoS protection
- Security audit
- Penetration testing

**DevOps & Monitoring**

- CI/CD pipeline
- Monitoring và alerting
- Error tracking
- Performance monitoring

## 4.4. Bài Học Kinh Nghiệm

### 4.4.1. Về Kỹ Thuật

**Kiến trúc và thiết kế**

- SOLID principles không chỉ là lý thuyết mà thực sự giúp code dễ maintain và extend
- Design patterns giúp giải quyết các vấn đề phổ biến một cách elegant
- Type safety với TypeScript giúp catch bugs sớm và improve developer experience
- Monorepo phù hợp cho projects lớn nhưng cần quản lý cẩn thận

**Framework và công nghệ**

- NestJS mạnh mẽ với DI/IoC nhưng có learning curve
- TypeORM linh hoạt với metadata reflection nhưng cần hiểu rõ để tránh N+1 queries
- Nuxt 4 với SSR/SSG rất tốt cho SEO và performance
- Nuxt UI giúp build UI nhanh với design tokens nhất quán

**Database và performance**

- Database design quan trọng hơn code, cần thiết kế cẩn thận từ đầu
- Migrations cần được version control và test kỹ
- Caching là key cho performance, cần strategy rõ ràng
- Query optimization cần được monitor và optimize liên tục

### 4.4.2. Về Quy Trình Phát Triển

**Planning và organization**

- Documentation nên viết song song với code, không để sau
- Modular approach giúp phát triển song song và dễ test
- Incremental development tốt hơn big bang approach
- Code review giúp maintain quality và share knowledge

**Testing và quality**

- Testing nên được viết từ đầu, không phải sau
- E2E tests quan trọng cho user flows
- Type safety là một form of testing
- Code quality tools (ESLint, Prettier) giúp maintain consistency

**Collaboration**

- Clear communication quan trọng trong team
- Documentation giúp onboarding và knowledge transfer
- Code comments và JSDoc giúp maintain code sau này
- Git workflow cần được follow consistently

### 4.4.3. Về Bản Thân

**Kỹ năng học hỏi**

- Learning by doing hiệu quả hơn chỉ đọc documentation
- Reading source code giúp hiểu sâu hơn framework
- Stack Overflow và GitHub là nguồn tài liệu quý giá
- Experimentation giúp hiểu trade-offs của các approaches

**Problem solving**

- Break down problems thành smaller pieces
- Debugging skills quan trọng như coding skills
- Ask for help khi stuck, không waste time
- Document solutions để reference sau này

**Time management**

- Prioritize features và tasks
- Estimate thời gian realistic
- Focus on one thing at a time
- Take breaks để maintain productivity

## 4.5. Đánh Giá Trải Nghiệm Thực Tập Tại Đơn Vị Thực Tập

### 4.5.1. Môi Trường Làm Việc

**Điểm mạnh**

- Môi trường làm việc chuyên nghiệp và supportive
- Có mentor hướng dẫn và code review
- Công nghệ hiện đại và best practices
- Cơ hội học hỏi từ senior developers

**Điểm cần cải thiện**

- Cần thêm thời gian onboarding cho intern
- Cần thêm documentation về internal processes
- Cần thêm regular check-ins và feedback sessions

### 4.5.2. Công Việc Và Trách Nhiệm

**Điểm mạnh**

- Được giao projects thực tế và có impact
- Được tự chủ trong technical decisions
- Được tham gia vào architecture discussions
- Được học về production systems

**Điểm cần cải thiện**

- Cần thêm guidance về business requirements
- Cần thêm context về existing systems
- Cần thêm clarity về priorities

### 4.5.3. Học Hỏi Và Phát Triển

**Điểm mạnh**

- Học được nhiều công nghệ mới (NestJS, Nuxt 4, TypeORM)
- Hiểu sâu hơn về software architecture
- Cải thiện coding skills và best practices
- Học được về DevOps và deployment

**Điểm cần cải thiện**

- Cần thêm training sessions về specific technologies
- Cần thêm code review feedback
- Cần thêm opportunities để work on different parts of system

### 4.5.4. Tổng Kết

Trải nghiệm thực tập rất tích cực và bổ ích. Được làm việc với các công nghệ hiện đại, học hỏi từ experienced developers, và contribute vào real projects. Môi trường supportive và có nhiều cơ hội phát triển.

Đề xuất cải thiện:

- Tăng cường onboarding process
- Thêm regular feedback sessions
- Tăng cường documentation về internal processes
- Tạo thêm opportunities để work on different parts of system

## 4.6. Các Kiến Nghị

### 4.6.1. Kiến Nghị Cho Đơn Vị Thực Tập

**Onboarding và Training**

- Tạo onboarding program structured cho interns
- Cung cấp documentation về internal processes và tools
- Tổ chức training sessions về technologies được sử dụng
- Assign mentor với regular check-ins

**Communication và Feedback**

- Tổ chức regular 1-on-1 meetings với mentor
- Provide constructive feedback trong code reviews
- Clarify expectations và priorities
- Share context về business requirements

**Projects và Opportunities**

- Assign projects có impact và learning value
- Cho phép interns work on different parts of system
- Involve interns trong architecture discussions
- Provide opportunities để present work

### 4.6.2. Kiến Nghị Cho Sinh Viên Thực Tập

**Preparation**

- Học trước về technologies sẽ sử dụng
- Practice coding và problem solving
- Đọc documentation và tutorials
- Build small projects để practice

**During Internship**

- Be proactive và ask questions
- Take notes và document learnings
- Seek feedback và improve continuously
- Contribute ideas và suggestions

**After Internship**

- Reflect on learnings và experiences
- Update portfolio với projects
- Maintain connections với team
- Continue learning và improving

### 4.6.3. Kiến Nghị Cho Nhà Trường

**Curriculum**

- Tăng cường practical projects trong curriculum
- Dạy về software architecture và design patterns
- Dạy về DevOps và deployment
- Dạy về best practices và code quality

**Internship Program**

- Tạo partnership với companies
- Provide guidance cho students về internship
- Organize internship sharing sessions
- Support students trong quá trình thực tập

**Resources**

- Provide access to learning resources
- Organize workshops và seminars
- Invite industry experts để share experiences

## Đóng Góp Của Luận Văn

### Đóng Góp Về Lý Thuyết

1. **Nghiên cứu và áp dụng các công nghệ web hiện đại:**
   - Phân tích chi tiết kiến trúc NestJS và Nuxt 4
   - Áp dụng các nguyên tắc SOLID và design patterns trong thực tế
   - Nghiên cứu và áp dụng TypeORM, PostgreSQL, Redis

2. **Thiết kế hệ thống cho domain đặc thù:**
   - Thiết kế entity và schema phù hợp với domain nông nghiệp
   - Business logic xử lý các đặc thù của sản phẩm nông nghiệp
   - API design hỗ trợ các use cases đặc biệt

### Đóng Góp Về Thực Tiễn

1. **Hệ thống hoàn chỉnh:**
   - Backend API đầy đủ chức năng
   - Frontend web application với UI/UX tốt
   - Database schema và caching strategy

2. **Best Practices:**
   - Code organization và structure
   - Testing strategy
   - Security implementation
   - Performance optimization

3. **Tài Liệu:**
   - Technical documentation đầy đủ
   - Architecture documentation
   - Implementation guide

## Hướng Phát Triển Tương Lai

### Ngắn Hạn (3-6 tháng)

1. **Hoàn Thiện Chức Năng:**
   - Tích hợp thanh toán trực tuyến thực tế
   - Thêm tính năng đánh giá và review chi tiết hơn
   - Cải thiện search với full-text search
   - Thêm tính năng so sánh sản phẩm

2. **Cải Thiện Performance:**
   - Tối ưu hóa database queries thêm
   - Fine-tuning caching strategy
   - CDN cho static assets
   - Image optimization nâng cao

3. **Testing và Quality:**
   - Tăng test coverage lên > 90%
   - Thêm E2E tests đầy đủ
   - Performance testing và load testing
   - Security audit

### Trung Hạn (6-12 tháng)

1. **Mobile Application:**
   - Ứng dụng mobile native (iOS/Android)
   - Progressive Web App (PWA)
   - Mobile-first optimizations

2. **Advanced Features:**
   - Recommendation system
   - Personalization
   - Advanced analytics và reporting
   - Inventory management system

3. **Integration:**
   - Tích hợp với hệ thống vận chuyển
   - Tích hợp với hệ thống thanh toán
   - Tích hợp với hệ thống quản lý kho hàng
   - API cho third-party integrations

4. **Scalability:**
   - Microservices architecture (nếu cần)
   - Database sharding
   - Distributed caching
   - Message queue cho async processing

### Dài Hạn (1-2 năm)

1. **AI và Machine Learning:**
   - Product recommendation với ML
   - Price prediction
   - Demand forecasting
   - Quality prediction

2. **Blockchain:**
   - Supply chain tracking với blockchain
   - Origin verification
   - Quality certification

3. **IoT Integration:**
   - Sensor data từ nông trại
   - Real-time quality monitoring
   - Automated inventory management

4. **Internationalization:**
   - Multi-language support
   - Multi-currency support
   - Regional adaptations

## Lời Kết

Luận văn đã thành công trong việc nghiên cứu, thiết kế và triển khai một hệ thống thương mại điện tử nông nghiệp sử dụng các công nghệ web hiện đại. Hệ thống không chỉ đáp ứng các yêu cầu về chức năng mà còn đạt được các mục tiêu về hiệu suất, bảo mật, và khả năng mở rộng.

Các công nghệ được sử dụng (NestJS, Nuxt 4, TypeORM, PostgreSQL, Redis) đã chứng minh tính phù hợp và hiệu quả trong việc xây dựng hệ thống quy mô lớn. Các nguyên tắc thiết kế phần mềm và design patterns đã được áp dụng thành công, tạo ra một codebase dễ bảo trì và mở rộng.

Hệ thống đã xử lý thành công các đặc thù của lĩnh vực nông nghiệp, từ quản lý tính theo mùa đến theo dõi nguồn gốc và quản lý hạn sử dụng. Điều này chứng tỏ rằng với thiết kế phù hợp, các công nghệ web hiện đại hoàn toàn có thể đáp ứng được các yêu cầu đặc thù của các domain khác nhau.

Với nền tảng vững chắc đã được xây dựng, hệ thống có tiềm năng phát triển và mở rộng trong tương lai, đáp ứng các nhu cầu ngày càng tăng của thị trường thương mại điện tử nông nghiệp.

---

> **Nguồn**: Tổng hợp từ toàn bộ quá trình nghiên cứu và triển khai, kết hợp với đánh giá và phân tích từ các chương trước.
