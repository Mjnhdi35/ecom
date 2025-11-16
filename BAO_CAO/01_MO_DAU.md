# MỞ ĐẦU

Phần mở đầu giới thiệu tổng quan về luận văn, bao gồm lời cảm ơn, tóm tắt nghiên cứu, mục đích và phạm vi nghiên cứu. Luận văn tập trung vào việc phát triển một hệ thống e-commerce nông nghiệp sử dụng các công nghệ web hiện đại và áp dụng các nguyên tắc của Software Engineering và Web Development để đảm bảo chất lượng, hiệu năng, và khả năng bảo trì của hệ thống.

## Lời Cảm Ơn

Tác giả xin chân thành cảm ơn:

- Ban Giám hiệu và các thầy cô trong Khoa [Tên Khoa], Trường [Tên Trường] đã tạo điều kiện và hỗ trợ trong quá trình học tập và nghiên cứu.

- Thầy/Cô [Tên Giảng viên hướng dẫn], người đã tận tình hướng dẫn, đóng góp ý kiến quý báu và tạo động lực trong suốt quá trình thực hiện luận văn.

- Gia đình, bạn bè và đồng nghiệp đã động viên, hỗ trợ và chia sẻ kinh nghiệm trong quá trình nghiên cứu.

- Cộng đồng mã nguồn mở đã phát triển và duy trì các công nghệ được sử dụng trong dự án này.

## Tóm Tắt

Luận văn này trình bày việc nghiên cứu, thiết kế và triển khai một hệ thống thương mại điện tử nông nghiệp sử dụng các công nghệ web hiện đại. Hệ thống được xây dựng với kiến trúc full-stack, bao gồm:

- **Backend API**: Sử dụng NestJS framework với TypeORM, PostgreSQL và Redis, tuân thủ các nguyên tắc SOLID, Dependency Injection và các design patterns hiện đại.

- **Frontend Web Application**: Sử dụng Nuxt 4 với Nuxt UI component library, tận dụng Server-Side Rendering (SSR) để tối ưu hiệu suất và SEO.

Hệ thống được thiết kế đặc biệt để xử lý các đặc thù của lĩnh vực nông nghiệp như quản lý sản phẩm theo mùa, theo dõi nguồn gốc, quản lý hạn sử dụng, và các tính năng liên quan đến chuỗi cung ứng nông sản.

Luận văn cung cấp một phân tích toàn diện về kiến trúc hệ thống, các quyết định thiết kế, và các best practices được áp dụng trong quá trình phát triển. Kết quả cho thấy hệ thống đạt được các mục tiêu về hiệu suất, khả năng mở rộng, bảo mật và khả năng bảo trì.

## Mục Đích và Phạm Vi Nghiên Cứu

### Mục Đích

Luận văn nhằm mục đích:

1. Nghiên cứu và áp dụng các công nghệ web hiện đại trong việc xây dựng hệ thống thương mại điện tử nông nghiệp.

2. Thiết kế và triển khai một kiến trúc hệ thống có khả năng mở rộng, hiệu suất cao và dễ bảo trì.

3. Áp dụng các nguyên tắc thiết kế phần mềm (SOLID), design patterns, và best practices trong thực tế.

4. Đánh giá hiệu quả của các công nghệ và phương pháp được sử dụng.

5. Cung cấp tài liệu kỹ thuật toàn diện cho việc phát triển và bảo trì hệ thống.

### Phạm Vi Nghiên Cứu

**Phạm vi công nghệ:**

- Backend: NestJS, TypeORM, PostgreSQL, Redis
- Frontend: Nuxt 4, Nuxt UI, Vue.js, TypeScript
- Infrastructure: Docker, Nginx
- Testing: Unit testing, Integration testing, E2E testing

**Phạm vi chức năng:**

- Quản lý sản phẩm nông nghiệp với các đặc thù về mùa vụ, nguồn gốc, hạn sử dụng
- Quản lý đơn hàng và thanh toán
- Quản lý người dùng và phân quyền
- Quản trị hệ thống
- Tìm kiếm và lọc sản phẩm
- Quản lý giỏ hàng và yêu thích

**Phạm vi không bao gồm:**

- Ứng dụng mobile (iOS/Android)
- Tích hợp thanh toán trực tuyến thực tế
- Tích hợp với hệ thống vận chuyển bên ngoài
- Tích hợp với hệ thống kế toán/ERP

**Phạm vi đánh giá:**

- Hiệu suất hệ thống (response time, throughput)
- Chất lượng mã nguồn (code organization, type safety)
- Bảo mật (authentication, authorization, data validation)
- Khả năng mở rộng (scalability)
