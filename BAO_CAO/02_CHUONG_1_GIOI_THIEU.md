# CHƯƠNG 1: GIỚI THIỆU

Chương này giới thiệu tổng quan về đề tài nghiên cứu, bối cảnh phát triển hệ thống e-commerce nông nghiệp, và các vấn đề cần giải quyết. Chương cũng trình bày mục tiêu, đối tượng, phạm vi nghiên cứu, và phương pháp nghiên cứu được áp dụng theo các nguyên tắc của Software Engineering và Web Development.

## 1.1. Bối Cảnh và Vấn Đề Nghiên Cứu

### 1.1.1. Bối Cảnh

Thương mại điện tử (E-commerce) đã trở thành một phần không thể thiếu trong nền kinh tế hiện đại. Trong lĩnh vực nông nghiệp, việc ứng dụng công nghệ thông tin vào quá trình bán hàng và quản lý sản phẩm đang ngày càng trở nên quan trọng. Tuy nhiên, các sản phẩm nông nghiệp có những đặc thù riêng biệt so với các sản phẩm thương mại điện tử thông thường:

- **Tính theo mùa**: Sản phẩm nông nghiệp thường chỉ có sẵn trong các mùa vụ cụ thể
- **Hạn sử dụng ngắn**: Nhiều sản phẩm tươi sống có thời hạn sử dụng ngắn, đòi hỏi quản lý kho hàng chặt chẽ
- **Theo dõi nguồn gốc**: Người tiêu dùng ngày càng quan tâm đến nguồn gốc, xuất xứ và các chứng nhận (organic, fair trade, v.v.)
- **Chuỗi cung ứng phức tạp**: Từ nông trại đến người tiêu dùng qua nhiều khâu trung gian

Việc xây dựng một nền tảng thương mại điện tử có thể xử lý được những đặc thù này đòi hỏi một kiến trúc hệ thống được thiết kế cẩn thận và các công nghệ phù hợp.

### 1.1.2. Vấn Đề Nghiên Cứu

Các hệ thống thương mại điện tử hiện có thường được thiết kế cho các sản phẩm thông thường và không đáp ứng đầy đủ các yêu cầu đặc thù của lĩnh vực nông nghiệp. Các vấn đề chính bao gồm:

1. **Thiếu hỗ trợ cho quản lý sản phẩm theo mùa**: Hầu hết các hệ thống không có cơ chế tự động quản lý tính khả dụng của sản phẩm dựa trên mùa vụ.

2. **Quản lý hạn sử dụng không tối ưu**: Các hệ thống thông thường không có cơ chế cảnh báo và quản lý hạn sử dụng hiệu quả cho sản phẩm tươi sống.

3. **Thiếu thông tin về nguồn gốc và chứng nhận**: Người tiêu dùng ngày càng quan tâm đến tính minh bạch trong chuỗi cung ứng, nhưng các hệ thống hiện có không cung cấp đầy đủ thông tin này.

4. **Hiệu suất và khả năng mở rộng**: Các hệ thống cũ thường gặp vấn đề về hiệu suất khi số lượng người dùng và sản phẩm tăng lên.

5. **Bảo mật và quản lý phiên**: Việc quản lý phiên người dùng và bảo mật dữ liệu trong các hệ thống phân tán đòi hỏi các giải pháp chuyên biệt.

## 1.2. Mục Tiêu Nghiên Cứu

### 1.2.1. Mục Tiêu Tổng Quát

Nghiên cứu, thiết kế và triển khai một hệ thống thương mại điện tử nông nghiệp sử dụng các công nghệ web hiện đại, có khả năng xử lý các đặc thù của lĩnh vực nông nghiệp và đáp ứng các yêu cầu về hiệu suất, bảo mật và khả năng mở rộng.

### 1.2.2. Mục Tiêu Cụ Thể

1. **Nghiên cứu và đánh giá các công nghệ web hiện đại**:
   - Nghiên cứu kiến trúc và đặc điểm của NestJS framework
   - Nghiên cứu kiến trúc và đặc điểm của Nuxt 4 framework
   - Đánh giá các giải pháp cơ sở dữ liệu (PostgreSQL) và caching (Redis)
   - Nghiên cứu TypeORM và các khả năng của nó

2. **Thiết kế kiến trúc hệ thống**:
   - Thiết kế kiến trúc backend API với NestJS
   - Thiết kế kiến trúc frontend với Nuxt 4
   - Thiết kế schema cơ sở dữ liệu phù hợp với domain nông nghiệp
   - Thiết kế chiến lược caching và session management

3. **Áp dụng các nguyên tắc và patterns**:
   - Áp dụng nguyên tắc SOLID trong thiết kế
   - Áp dụng Dependency Injection và Inversion of Control
   - Sử dụng các design patterns phù hợp (Repository, Service Layer, Factory, Strategy, Observer)

4. **Triển khai hệ thống**:
   - Triển khai backend API với đầy đủ các chức năng
   - Triển khai frontend web application
   - Triển khai cơ sở dữ liệu và caching
   - Triển khai các cơ chế bảo mật và authentication

5. **Đánh giá và tối ưu**:
   - Đánh giá hiệu suất hệ thống
   - Tối ưu hóa database queries
   - Tối ưu hóa API responses
   - Đánh giá chất lượng mã nguồn

## 1.3. Đối Tượng và Phạm Vi Nghiên Cứu

### 1.3.1. Đối Tượng Nghiên Cứu

Đối tượng nghiên cứu của luận văn là:

- Hệ thống thương mại điện tử nông nghiệp
- Kiến trúc và công nghệ web hiện đại (NestJS, Nuxt 4, TypeORM, PostgreSQL, Redis)
- Các nguyên tắc thiết kế phần mềm và design patterns

### 1.3.2. Phạm Vi Nghiên Cứu

**Phạm vi công nghệ:**

- Backend: NestJS framework, TypeORM ORM, PostgreSQL database, Redis cache
- Frontend: Nuxt 4 framework, Nuxt UI component library, Vue.js, TypeScript
- Infrastructure: Docker containerization, Nginx reverse proxy
- Testing: Jest, Supertest cho backend; Vitest cho frontend

**Phạm vi chức năng:**

- Quản lý sản phẩm nông nghiệp (thông tin, hình ảnh, giá cả, mùa vụ, nguồn gốc, chứng nhận)
- Quản lý danh mục sản phẩm
- Quản lý đơn hàng
- Quản lý người dùng và phân quyền
- Quản trị hệ thống (dashboard, thống kê)
- Tìm kiếm và lọc sản phẩm
- Quản lý giỏ hàng và danh sách yêu thích

**Phạm vi không bao gồm:**

- Ứng dụng mobile native (iOS/Android)
- Tích hợp thanh toán trực tuyến thực tế (chỉ mô phỏng)
- Tích hợp với hệ thống vận chuyển bên ngoài
- Tích hợp với hệ thống kế toán/ERP
- Tích hợp với hệ thống quản lý kho hàng vật lý

## 1.4. Phương Pháp Nghiên Cứu

Luận văn sử dụng các phương pháp nghiên cứu sau:

1. **Nghiên cứu lý thuyết**:
   - Nghiên cứu tài liệu về các công nghệ được sử dụng
   - Nghiên cứu các nguyên tắc thiết kế phần mềm và design patterns
   - Nghiên cứu các best practices trong phát triển web

2. **Nghiên cứu thực nghiệm**:
   - Thiết kế và triển khai hệ thống
   - Thử nghiệm và đánh giá hiệu suất
   - So sánh với các giải pháp hiện có

3. **Phương pháp phân tích và tổng hợp**:
   - Phân tích yêu cầu nghiệp vụ
   - Tổng hợp kiến thức từ nhiều nguồn
   - Đánh giá và rút ra kết luận

## 1.5. Cấu Trúc Luận Văn

Luận văn được tổ chức thành các chương như sau:

- **Chương 1: Giới thiệu**: Trình bày bối cảnh, vấn đề nghiên cứu, mục tiêu, đối tượng và phạm vi nghiên cứu.

- **Chương 2: Cơ sở lý thuyết**: Trình bày các kiến thức nền tảng về các công nghệ được sử dụng, nguyên tắc thiết kế phần mềm, và design patterns.

- **Chương 3: Phân tích và thiết kế hệ thống**: Trình bày phân tích yêu cầu, thiết kế kiến trúc tổng thể, và thiết kế chi tiết các thành phần của hệ thống.

- **Chương 4: Triển khai hệ thống**: Trình bày quá trình triển khai các thành phần của hệ thống, bao gồm backend, frontend, database, và các cơ chế bảo mật.

- **Chương 5: Kết quả và đánh giá**: Trình bày kết quả triển khai, đánh giá hiệu suất, chất lượng mã nguồn, và bảo mật của hệ thống.

- **Kết luận và hướng phát triển**: Tóm tắt các kết quả đạt được, đóng góp của luận văn, và đề xuất hướng phát triển tương lai.
