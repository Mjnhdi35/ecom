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

## 1.4. Khảo Sát Hiện Trạng

### 1.4.1. Về Phía Người Nông Dân

- **Phụ thuộc lớn vào thương lái**: Dẫn đến giá cả bấp bênh và lợi nhuận không ổn định. Người nông dân thường phải bán sản phẩm với giá thấp do phải đi qua nhiều khâu trung gian.

- **Gặp khó khăn trong việc xây dựng thương hiệu cá nhân**: Không có công cụ để tiếp cận trực tiếp các thị trường lớn hơn và xây dựng thương hiệu cho sản phẩm của mình.

- **Thiếu các công cụ số**: Không có hệ thống để quản lý sản lượng, theo dõi đơn hàng và tương tác với khách hàng một cách chuyên nghiệp.

### 1.4.2. Về Phía Người Tiêu Dùng

- **Tồn tại tâm lý lo ngại về chất lượng**: Người tiêu dùng lo ngại về độ an toàn và nguồn gốc xuất xứ của nông sản, đặc biệt là các sản phẩm tươi sống.

- **Giá thành sản phẩm cao**: Giá thành sản phẩm thường bị đẩy lên cao do phải đi qua nhiều khâu phân phối trung gian.

- **Trải nghiệm mua sắm hạn chế**: Trải nghiệm mua sắm nông sản trực tuyến còn nhiều hạn chế, thiếu thông tin minh bạch và các tiện ích hỗ trợ.

### 1.4.3. Các Giải Pháp Hiện Có Trên Thị Trường

- **Các sàn TMĐT lớn (Shopee, Lazada, Tiki)**: Đây là các sàn đa ngành hàng, không chuyên biệt cho nông sản, dẫn đến khó khăn trong việc kiểm soát chất lượng và quy trình bảo quản. Phí hoa hồng và chi phí vận hành cũng là một rào cản.

- **Mạng xã hội (Facebook, Zalo)**: Các giao dịch diễn ra một cách tự phát, thiếu sự tin cậy, không có hệ thống quản lý đơn hàng, thanh toán và giải quyết khiếu nại một cách chuyên nghiệp.

- **Một số website TMĐT nông sản chuyên biệt**: Đã có một vài dự án nhưng quy mô còn nhỏ, công nghệ chưa thực sự hiện đại, và trải nghiệm người dùng chưa được tối ưu.

## 1.5. Giới Thiệu Đơn Vị Thực Tập

### 1.5.1. Tổng Quan Về Đơn Vị Thực Tập

CÔNG TY TNHH TIN HỌC AN VẠN AN là một doanh nghiệp hoạt động trong lĩnh vực bán lẻ sản phẩm công nghệ và thiết bị điện tử thông qua kênh thương mại điện tử. Trong giai đoạn chuyển đổi số, đơn vị hướng đến mục tiêu chuẩn hóa nền tảng kỹ thuật, xây dựng hệ thống bán hàng trực tuyến ổn định – bảo mật – linh hoạt, và từng bước mở rộng quy mô kinh doanh ra thị trường trong nước và quốc tế.

Với tầm nhìn trở thành một nền tảng bán lẻ công nghệ hiện đại, "Fresh Shop" tập trung đầu tư vào việc xây dựng hạ tầng phần mềm nội bộ thay vì phụ thuộc vào giải pháp đóng gói sẵn. Điều này giúp hệ thống chủ động hơn trong việc tùy biến giao diện, quản lý dữ liệu, tối ưu trải nghiệm người dùng, cũng như đảm bảo an toàn và hiệu năng trong quá trình vận hành.

### 1.5.2. Các Sản Phẩm Của Đơn Vị Thực Tập

Hệ sinh thái công nghệ của Fresh Shop được định hướng xây dựng theo mô hình đa tầng – tách biệt frontend và backend, bao gồm ba nhóm sản phẩm chính:

- **Website bán hàng (Fresh Shop Web)**: Được phát triển bằng Nuxt 4, cung cấp giao diện cửa hàng trực tuyến thân thiện, tốc độ tải nhanh, tối ưu SEO và khả năng truy cập (A11y). Cho phép người dùng duyệt danh mục, tìm kiếm sản phẩm, thêm vào giỏ hàng, đăng nhập và xem tin tức/bài viết.

- **Hệ thống API trung tâm (Fresh Shop API)**: Xây dựng bằng NestJS + TypeORM + PostgreSQL + Redis, đóng vai trò dịch vụ dữ liệu (data service layer). Cung cấp các endpoint RESTful phục vụ website, ứng dụng di động và các đối tác tích hợp. Hỗ trợ JWT authentication, guard toàn cục, rate limiting, health check, và Swagger documentation cho việc quản lý và mở rộng API sau này.

- **Công cụ quản trị nội bộ (Admin Dashboard – dự kiến mở rộng)**: Hệ thống quản trị nội bộ phục vụ quản lý sản phẩm, danh mục, đơn hàng, và nội dung bài viết. Kết nối trực tiếp với API trung tâm để đồng bộ dữ liệu thời gian thực, đảm bảo quản lý hiệu quả và bảo mật.

Trong phạm vi đề tài hiện tại, dự án tập trung triển khai hai thành phần chính:

- Frontend (Nuxt Web): giao diện thương mại điện tử cho người dùng cuối.
- Backend (NestJS API): lớp dịch vụ dữ liệu, cung cấp nền tảng ổn định để mở rộng trong tương lai sang ứng dụng di động và dashboard quản trị.

## 1.6. Cấu Trúc Luận Văn

Báo cáo được tổ chức thành bốn chương chính, cùng với các phụ lục nhằm giúp người đọc dễ dàng tra cứu, triển khai và đánh giá hệ thống:

- **Chương 1. Tổng quan**: Trình bày lý do chọn đề tài, mục tiêu, phạm vi, phương pháp nghiên cứu, giới thiệu đơn vị thực tập và cấu trúc báo cáo.

- **Chương 2. Nội dung thực tập**: Mô tả môi trường làm việc, các công việc đã thực hiện trong quá trình thực tập, cùng kỹ năng và công nghệ được áp dụng.

- **Chương 3. Thực hiện dự án "Fresh Shop"**: Phân tích yêu cầu hệ thống, thiết kế kiến trúc, quy trình cài đặt, kiểm thử và triển khai thực tế. Phần này là trọng tâm của báo cáo, mô tả chi tiết cách ứng dụng các công nghệ vào dự án.

- **Chương 4. Kết luận và hướng phát triển**: Tổng kết kết quả đạt được, đánh giá tính khả thi và đề xuất hướng mở rộng hệ thống trong tương lai.
