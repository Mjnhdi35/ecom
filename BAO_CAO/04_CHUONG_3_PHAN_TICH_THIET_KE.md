# CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

> **Nguồn**: Chương này tổng hợp nội dung từ cả hai file DOCUMENTATION.md (Backend và Frontend) để trình bày phân tích và thiết kế hệ thống một cách toàn diện.

Chương này trình bày quá trình phân tích và thiết kế hệ thống e-commerce nông nghiệp theo các nguyên tắc của Software Engineering. Quá trình phân tích và thiết kế bao gồm phân tích yêu cầu nghiệp vụ, phân tích domain, thiết kế kiến trúc, thiết kế database, và thiết kế API. Tất cả các bước được thực hiện theo các best practices của Software Engineering và Web Development.

## 3.1. Phân Tích Yêu Cầu Nghiệp Vụ

Phân tích yêu cầu nghiệp vụ là bước đầu tiên và quan trọng nhất trong quá trình phát triển phần mềm. Quá trình này giúp hiểu rõ nhu cầu của người dùng, các chức năng cần thiết, và các ràng buộc của hệ thống.

### 3.1.1. Yêu Cầu Chức Năng

Yêu cầu chức năng mô tả các chức năng cụ thể mà hệ thống phải cung cấp để đáp ứng nhu cầu của người dùng và nghiệp vụ.

**Quản lý sản phẩm - Product Management:**

Quản lý sản phẩm là chức năng cốt lõi của hệ thống e-commerce, đặc biệt quan trọng trong domain nông nghiệp với các đặc thù riêng.

**Thêm, Sửa, Xóa Sản Phẩm:**

- **Thêm Sản Phẩm**: Admin có thể thêm sản phẩm mới với đầy đủ thông tin bao gồm tên, mô tả, giá, hình ảnh, và các thông tin đặc thù nông nghiệp. Quá trình thêm sản phẩm bao gồm validation để đảm bảo dữ liệu hợp lệ, kiểm tra trùng lặp, và tự động generate slug cho URL-friendly.

- **Sửa Sản Phẩm**: Admin có thể cập nhật thông tin sản phẩm hiện có. Hệ thống lưu trữ lịch sử thay đổi để tracking và audit. Khi cập nhật giá hoặc thông tin quan trọng, hệ thống có thể notify users đã quan tâm đến sản phẩm đó.

- **Xóa Sản Phẩm**: Xóa sản phẩm có thể là soft delete (đánh dấu xóa) hoặc hard delete (xóa vĩnh viễn). Soft delete cho phép restore và giữ lại dữ liệu cho reporting. Khi xóa sản phẩm, hệ thống cần kiểm tra xem sản phẩm có trong đơn hàng nào không để đảm bảo data integrity.

**Quản Lý Thông Tin Đặc Thù Nông Nghiệp:**

- **Mùa Vụ (Seasonality)**: Mỗi sản phẩm có thể có mùa vụ cụ thể (xuân, hè, thu, đông). Hệ thống cần quản lý tính khả dụng theo mùa, tự động ẩn/hiện sản phẩm dựa trên mùa hiện tại, và cảnh báo khi sản phẩm sắp hết mùa.

- **Nguồn Gốc (Origin)**: Lưu trữ thông tin chi tiết về nguồn gốc sản phẩm bao gồm địa điểm sản xuất, nông trại, vùng miền. Thông tin này quan trọng cho traceability và đáp ứng nhu cầu của người tiêu dùng về transparency.

- **Hạn Sử Dụng (Expiry Date)**: Quản lý ngày thu hoạch và ngày hết hạn. Hệ thống tự động cảnh báo khi sản phẩm sắp hết hạn, tự động ẩn sản phẩm đã hết hạn, và ưu tiên bán sản phẩm sắp hết hạn (FIFO - First In First Out).

- **Chứng Nhận (Certifications)**: Lưu trữ các chứng nhận như organic, fair trade, pesticide-free, GAP (Good Agricultural Practices), GlobalGAP. Hỗ trợ lọc và tìm kiếm sản phẩm theo chứng nhận.

- **Chất Lượng (Quality Grades)**: Phân loại sản phẩm theo chất lượng (A, B, C, Premium, Standard). Mỗi grade có thể có giá khác nhau và yêu cầu bảo quản khác nhau.

**Quản Lý Hình Ảnh Sản Phẩm:**

- **Multiple Images**: Mỗi sản phẩm có thể có nhiều hình ảnh từ các góc độ khác nhau
- **Image Optimization**: Tự động optimize hình ảnh để giảm kích thước file và improve loading speed
- **Thumbnail Generation**: Tự động tạo thumbnails cho listing pages
- **Image Ordering**: Cho phép sắp xếp thứ tự hiển thị hình ảnh
- **Alt Text**: Quản lý alt text cho accessibility và SEO

**Quản Lý Giá Cả và Khuyến Mãi:**

- **Base Price**: Giá cơ bản của sản phẩm
- **Bulk Pricing**: Giá theo số lượng (giá bán lẻ vs giá bán sỉ)
- **Seasonal Pricing**: Giá có thể thay đổi theo mùa
- **Promotions**: Quản lý các chương trình khuyến mãi, giảm giá
- **Price History**: Lưu trữ lịch sử thay đổi giá để tracking và analytics

**Quản lý danh mục - Category Management:**

Danh mục giúp tổ chức sản phẩm một cách logic và giúp người dùng dễ dàng tìm kiếm sản phẩm.

**Tổ Chức Danh Mục:**

- **Hierarchical Structure**: Hỗ trợ danh mục đa cấp (parent-child relationships)
- **Category Tree**: Hiển thị cây danh mục với unlimited depth
- **Category Navigation**: Breadcrumb navigation cho user experience tốt
- **Category Images**: Mỗi danh mục có thể có hình ảnh đại diện

**Danh Mục Đa Cấp:**

- **Parent Categories**: Danh mục cha chứa các danh mục con
- **Child Categories**: Danh mục con kế thừa một số thuộc tính từ danh mục cha
- **Category Inheritance**: Sản phẩm trong danh mục con cũng thuộc danh mục cha
- **Flexible Hierarchy**: Có thể di chuyển danh mục giữa các cấp

**Quản lý đơn hàng - Order Management:**

Quản lý đơn hàng là quy trình phức tạp bao gồm nhiều bước từ khi khách hàng đặt hàng đến khi giao hàng thành công.

**Tạo và Quản Lý Đơn Hàng:**

- **Order Creation**: Tạo đơn hàng từ giỏ hàng với validation inventory, pricing, và shipping
- **Order Status Tracking**: Theo dõi trạng thái đơn hàng qua các giai đoạn (pending, confirmed, processing, shipping, delivered, cancelled)
- **Order Modification**: Cho phép sửa đổi đơn hàng trong một số trường hợp (trước khi confirm)
- **Order Cancellation**: Hủy đơn hàng với proper refund processing

**Theo Dõi Trạng Thái Đơn Hàng:**

- **Status Workflow**: Định nghĩa workflow cho order status transitions
- **Status Notifications**: Tự động notify customers khi order status thay đổi
- **Status History**: Lưu trữ lịch sử thay đổi status với timestamps
- **Admin Status Management**: Admin có thể manually update order status

**Quản Lý Thông Tin Giao Hàng:**

- **Shipping Address**: Lưu trữ địa chỉ giao hàng với validation
- **Delivery Time Window**: Quản lý khung thời gian giao hàng (sáng, chiều, tối)
- **Special Instructions**: Cho phép khách hàng thêm yêu cầu đặc biệt (để ở cửa, gọi trước, etc.)
- **Shipping Method**: Chọn phương thức giao hàng (standard, express, same-day)
- **Shipping Cost Calculation**: Tính phí vận chuyển dựa trên weight, distance, method
- **Delivery Tracking**: Tracking số vận đơn và cập nhật trạng thái giao hàng

**Quản lý người dùng - User Management:**

Quản lý người dùng bao gồm authentication, authorization, và profile management.

**Đăng Ký, Đăng Nhập, Đăng Xuất:**

- **Registration**: Đăng ký tài khoản mới với email, password, và thông tin cơ bản. Validation email để đảm bảo email hợp lệ và chưa được sử dụng. Password requirements để ensure security.

- **Login**: Đăng nhập với email/username và password. Hỗ trợ "Remember Me" functionality. Rate limiting để prevent brute force attacks. Two-factor authentication (2FA) cho enhanced security.

- **Logout**: Đăng xuất và invalidate session/token. Clear client-side storage.

**Quản Lý Thông Tin Cá Nhân:**

- **Profile Management**: Cập nhật thông tin cá nhân (tên, số điện thoại, địa chỉ)
- **Password Change**: Thay đổi password với verification
- **Email Change**: Thay đổi email với verification process
- **Avatar Upload**: Upload và quản lý avatar
- **Preferences**: Lưu preferences của user (language, currency, notifications)

**Phân Quyền Người Dùng:**

- **Roles**: Định nghĩa roles (Admin, User, Moderator, etc.)
- **Permissions**: Định nghĩa permissions cho từng role
- **Role-Based Access Control (RBAC)**: Implement RBAC để control access
- **Permission Checks**: Check permissions trước khi allow actions

**Tìm kiếm và lọc - Search and Filter:**

Tìm kiếm và lọc là chức năng quan trọng giúp người dùng nhanh chóng tìm thấy sản phẩm họ cần.

**Tìm Kiếm Sản Phẩm:**

- **Full-Text Search**: Tìm kiếm trong tên, mô tả, tags của sản phẩm
- **Fuzzy Search**: Tìm kiếm với tolerance cho typos
- **Search Suggestions**: Autocomplete suggestions khi user typing
- **Search History**: Lưu lịch sử tìm kiếm của user
- **Popular Searches**: Hiển thị các từ khóa tìm kiếm phổ biến

**Lọc Sản Phẩm:**

- **Category Filter**: Lọc theo danh mục và danh mục con
- **Price Range**: Lọc theo khoảng giá (min-max)
- **Rating Filter**: Lọc theo đánh giá (4 stars and above, etc.)
- **Season Filter**: Lọc theo mùa vụ
- **Origin Filter**: Lọc theo nguồn gốc, vùng miền
- **Certification Filter**: Lọc theo chứng nhận (organic, fair trade, etc.)
- **Availability Filter**: Lọc theo tình trạng có sẵn
- **Multiple Filters**: Kết hợp nhiều filters cùng lúc

**Sắp Xếp Sản Phẩm:**

- **Price**: Sắp xếp theo giá (tăng dần, giảm dần)
- **Name**: Sắp xếp theo tên (A-Z, Z-A)
- **Rating**: Sắp xếp theo đánh giá
- **Newest**: Sắp xếp theo sản phẩm mới nhất
- **Popularity**: Sắp xếp theo độ phổ biến (số lượng bán)
- **Relevance**: Sắp xếp theo độ liên quan với search query

**Quản lý giỏ hàng - Shopping Cart Management:**

Giỏ hàng là nơi tạm thời lưu trữ sản phẩm mà khách hàng muốn mua trước khi checkout.

**Thêm, Sửa, Xóa Sản Phẩm:**

- **Add to Cart**: Thêm sản phẩm vào giỏ hàng với số lượng. Kiểm tra inventory availability. Validate số lượng không vượt quá stock.

- **Update Quantity**: Cập nhật số lượng sản phẩm trong giỏ hàng. Recalculate totals khi quantity thay đổi.

- **Remove from Cart**: Xóa sản phẩm khỏi giỏ hàng. Confirm trước khi xóa để prevent accidental removal.

**Lưu Giỏ Hàng:**

- **Guest Cart**: Lưu giỏ hàng trong localStorage/sessionStorage cho guest users
- **User Cart**: Lưu giỏ hàng trong database cho logged-in users
- **Cart Persistence**: Giỏ hàng được persist across sessions và devices cho logged-in users
- **Cart Sync**: Sync giỏ hàng giữa devices khi user login
- **Cart Expiration**: Giỏ hàng tự động expire sau một thời gian không hoạt động

**Quản trị hệ thống - System Administration:**

Admin panel cung cấp các công cụ để quản lý toàn bộ hệ thống.

**Dashboard với Thống Kê:**

- **Overview Statistics**: Tổng quan về orders, revenue, users, products
- **Sales Charts**: Biểu đồ doanh thu theo thời gian (daily, weekly, monthly, yearly)
- **Top Products**: Sản phẩm bán chạy nhất
- **Recent Orders**: Đơn hàng gần đây
- **Low Stock Alerts**: Cảnh báo sản phẩm sắp hết hàng
- **Pending Reviews**: Đánh giá đang chờ duyệt

**Quản Lý Đơn Hàng:**

- **Order List**: Danh sách tất cả đơn hàng với filtering và search
- **Order Details**: Chi tiết đơn hàng với order items, customer info, shipping info
- **Order Status Management**: Update order status
- **Order Export**: Export orders ra Excel/CSV
- **Order Analytics**: Phân tích đơn hàng (revenue, average order value, etc.)

**Quản Lý Sản Phẩm:**

- **Product List**: Danh sách tất cả sản phẩm với advanced filtering
- **Bulk Operations**: Thao tác hàng loạt (delete, update status, update category)
- **Product Import/Export**: Import/export sản phẩm từ Excel/CSV
- **Inventory Management**: Quản lý tồn kho, nhập kho, xuất kho
- **Product Analytics**: Phân tích sản phẩm (views, sales, conversion rate)

**Báo Cáo và Thống Kê:**

- **Sales Reports**: Báo cáo doanh thu theo nhiều dimensions (time, category, product, customer)
- **Inventory Reports**: Báo cáo tồn kho, turnover rate
- **Customer Reports**: Báo cáo về customers (new customers, returning customers, customer lifetime value)
- **Product Performance**: Báo cáo hiệu suất sản phẩm
- **Export Reports**: Export reports ra PDF, Excel
- **Scheduled Reports**: Tự động generate và gửi reports theo lịch

### 3.1.2. Yêu Cầu Phi Chức Năng

**Hiệu suất:**

- Thời gian phản hồi API < 200ms cho 95% requests
- Thời gian tải trang đầu tiên < 2 giây
- Hỗ trợ ít nhất 1000 concurrent users

**Bảo mật:**

- Authentication và authorization
- Bảo vệ chống SQL injection, XSS, CSRF
- Mã hóa dữ liệu nhạy cảm
- Session management an toàn

**Khả năng mở rộng:**

- Kiến trúc hỗ trợ horizontal scaling
- Database có thể scale độc lập
- Cache layer để giảm tải database

**Khả năng bảo trì:**

- Code được tổ chức rõ ràng, dễ đọc
- Type safety với TypeScript
- Test coverage đầy đủ
- Documentation đầy đủ

**Khả năng truy cập:**

- Tuân thủ WAI-ARIA guidelines
- Hỗ trợ keyboard navigation
- Hỗ trợ screen readers

## 3.2. Phân Tích Domain E-commerce Nông Nghiệp

Phân tích domain là bước quan trọng để hiểu rõ nghiệp vụ và các đặc thù của lĩnh vực nông nghiệp, từ đó thiết kế hệ thống phù hợp với nhu cầu thực tế.

### 3.2.1. Đặc Điểm Sản Phẩm Nông Nghiệp

Sản phẩm nông nghiệp có những đặc thù riêng biệt so với sản phẩm công nghiệp, đòi hỏi hệ thống phải được thiết kế đặc biệt để xử lý các đặc thù này.

**Tính Theo Mùa (Seasonality):**

Tính theo mùa là một đặc điểm nổi bật của sản phẩm nông nghiệp. Không giống như sản phẩm công nghiệp có thể sản xuất quanh năm, sản phẩm nông nghiệp phụ thuộc vào điều kiện thời tiết, mùa vụ, và chu kỳ sinh trưởng tự nhiên.

- **Quản Lý Mùa Vụ**: Sản phẩm chỉ có sẵn trong các mùa vụ cụ thể (xuân, hè, thu, đông). Hệ thống cần lưu trữ thông tin về mùa vụ của từng sản phẩm và quản lý tính khả dụng động dựa trên mùa vụ hiện tại.

- **Tự Động Ẩn/Hiện**: Hệ thống tự động ẩn sản phẩm khi hết mùa và hiện lại khi vào mùa. Điều này đảm bảo khách hàng chỉ thấy các sản phẩm đang có sẵn.

- **Cảnh Báo Mùa Vụ**: Cần cảnh báo khách hàng khi sản phẩm sắp hết mùa để họ có thể mua trước. Cảnh báo có thể được hiển thị trên product page hoặc gửi qua email/notification.

- **Dự Báo Sẵn Có**: Hệ thống có thể dự báo thời điểm sản phẩm sẽ có sẵn trở lại dựa trên lịch sử mùa vụ và thông tin từ nông dân.

**Hạn Sử Dụng (Perishability):**

Nhiều sản phẩm nông nghiệp, đặc biệt là sản phẩm tươi sống, có thời hạn sử dụng ngắn. Điều này đòi hỏi quản lý kho hàng đặc biệt.

- **Quản Lý Hạn Sử Dụng**: Nhiều sản phẩm có thời hạn sử dụng ngắn (vài ngày đến vài tuần). Hệ thống cần lưu trữ ngày thu hoạch và ngày hết hạn của từng lô hàng.

- **FIFO Management**: Cần quản lý theo nguyên tắc FIFO (First In First Out) để đảm bảo sản phẩm cũ được bán trước sản phẩm mới. Hệ thống tự động ưu tiên bán sản phẩm sắp hết hạn.

- **Cảnh Báo Hết Hạn**: Cảnh báo admin khi sản phẩm sắp hết hạn (ví dụ: 3 ngày trước khi hết hạn) để có biện pháp xử lý (giảm giá, khuyến mãi, hoặc loại bỏ).

- **Tự Động Loại Bỏ**: Tự động ẩn hoặc loại bỏ sản phẩm đã hết hạn khỏi danh sách bán để đảm bảo chất lượng và an toàn thực phẩm.

**Theo Dõi Nguồn Gốc (Origin Tracking):**

Người tiêu dùng ngày càng quan tâm đến nguồn gốc, xuất xứ của sản phẩm. Đây là một yêu cầu quan trọng cho tính minh bạch và trách nhiệm xã hội.

- **Thông Tin Nguồn Gốc**: Người tiêu dùng quan tâm đến nguồn gốc, xuất xứ của sản phẩm. Hệ thống cần lưu trữ thông tin chi tiết về địa điểm sản xuất, nông trại, vùng miền.

- **Traceability**: Cần lưu trữ thông tin về nông trại, ngày thu hoạch, và các điểm trong chuỗi cung ứng. Điều này cho phép truy vết sản phẩm từ nông trại đến người tiêu dùng.

- **Tìm Kiếm và Lọc**: Hỗ trợ tìm kiếm và lọc sản phẩm theo nguồn gốc, vùng miền. Khách hàng có thể tìm sản phẩm từ một vùng cụ thể hoặc một nông trại cụ thể.

**Chứng Nhận (Certifications):**

Chứng nhận là một yếu tố quan trọng trong việc đảm bảo chất lượng và tính bền vững của sản phẩm nông nghiệp.

- **Các Loại Chứng Nhận**: Organic, fair trade, pesticide-free, GAP (Good Agricultural Practices), GlobalGAP, v.v. Mỗi chứng nhận có ý nghĩa và tiêu chuẩn riêng.

- **Lưu Trữ và Hiển Thị**: Cần lưu trữ và hiển thị các chứng nhận một cách rõ ràng trên product page. Chứng nhận có thể được hiển thị dưới dạng badges hoặc icons.

- **Lọc Sản Phẩm**: Hỗ trợ lọc sản phẩm theo chứng nhận. Khách hàng có thể tìm sản phẩm organic, fair trade, hoặc các chứng nhận khác.

**Chất Lượng (Quality Grades):**

Sản phẩm nông nghiệp có thể được phân loại theo chất lượng, và giá cả có thể khác nhau theo chất lượng.

- **Phân Loại Chất Lượng**: Sản phẩm có thể được phân loại theo chất lượng (A, B, C, Premium, Standard). Mỗi grade có tiêu chuẩn riêng về kích thước, hình dạng, màu sắc, và độ tươi.

- **Giá Cả Theo Chất Lượng**: Giá cả có thể khác nhau theo chất lượng. Sản phẩm grade A thường có giá cao hơn grade B hoặc C.

- **Yêu Cầu Bảo Quản**: Mỗi grade có thể có yêu cầu bảo quản khác nhau. Sản phẩm grade cao hơn có thể cần điều kiện bảo quản tốt hơn.

**Giá Cả Theo Số Lượng (Bulk Pricing):**

Giá cả có thể thay đổi theo số lượng mua, đặc biệt quan trọng cho khách hàng mua số lượng lớn.

- **Giá Theo Số Lượng**: Giá có thể thay đổi theo số lượng mua. Mua càng nhiều, giá càng rẻ.

- **Giá Bán Lẻ và Bán Sỉ**: Hỗ trợ giá bán lẻ (cho khách hàng cá nhân) và giá bán sỉ (cho khách hàng mua số lượng lớn). Giá bán sỉ thường thấp hơn giá bán lẻ.

- **Tier Pricing**: Có thể có nhiều mức giá khác nhau (ví dụ: 1-10 items: giá A, 11-50 items: giá B, 51+ items: giá C).

### 3.2.2. Quản Lý Chuỗi Cung Ứng

Chuỗi cung ứng nông nghiệp phức tạp hơn nhiều so với chuỗi cung ứng công nghiệp, đòi hỏi quản lý đặc biệt.

**Từ Nông Trại Đến Bàn Ăn (Farm to Table):**

Khái niệm "Farm to Table" nhấn mạnh việc kết nối trực tiếp giữa nông trại và người tiêu dùng, giảm bớt khâu trung gian.

- **Theo Dõi Hành Trình**: Theo dõi hành trình sản phẩm từ nông trại đến người tiêu dùng. Mỗi điểm trong chuỗi được ghi lại với timestamp và location.

- **Quản Lý Điểm Trung Gian**: Quản lý các điểm trung gian trong chuỗi cung ứng (nhà phân phối, kho, cửa hàng). Mỗi điểm có thể có inventory riêng và yêu cầu bảo quản riêng.

- **Transparency**: Cung cấp thông tin minh bạch về hành trình sản phẩm cho người tiêu dùng. Khách hàng có thể xem sản phẩm đã đi qua những điểm nào.

**Yêu Cầu Bảo Quản:**

Sản phẩm nông nghiệp thường có yêu cầu bảo quản đặc biệt để đảm bảo chất lượng.

- **Nhiệt Độ và Độ Ẩm**: Nhiệt độ, độ ẩm yêu cầu cho từng loại sản phẩm. Một số sản phẩm cần bảo quản lạnh, một số cần nhiệt độ phòng, một số cần đông lạnh.

- **Điều Kiện Vận Chuyển**: Điều kiện vận chuyển đặc biệt (refrigerated trucks, special packaging). Hệ thống cần track điều kiện vận chuyển để đảm bảo chất lượng.

- **Thời Gian Bảo Quản**: Thời gian bảo quản tối đa cho từng loại sản phẩm. Hệ thống cần cảnh báo khi sản phẩm sắp hết thời gian bảo quản.

**Kiểm Soát Chất Lượng:**

Kiểm soát chất lượng là một phần quan trọng của chuỗi cung ứng nông nghiệp.

- **Kiểm Tra Tại Nhiều Điểm**: Kiểm tra chất lượng tại nhiều điểm trong chuỗi cung ứng (tại nông trại, tại kho, trước khi giao hàng). Mỗi lần kiểm tra được ghi lại với kết quả và người thực hiện.

- **Lưu Trữ Lịch Sử**: Lưu trữ lịch sử kiểm tra chất lượng để có thể truy vết nếu có vấn đề. Lịch sử bao gồm ngày kiểm tra, kết quả, và người thực hiện.

### 3.2.3. Tính Theo Mùa và Quản Lý Hạn Sử Dụng

Tính theo mùa và hạn sử dụng là hai đặc điểm quan trọng nhất của sản phẩm nông nghiệp, đòi hỏi quản lý đặc biệt.

**Quản Lý Mùa Vụ:**

Quản lý mùa vụ đảm bảo khách hàng chỉ thấy các sản phẩm đang có sẵn.

- **Xác Định Mùa Vụ**: Xác định mùa vụ của từng sản phẩm dựa trên loại sản phẩm và vùng miền. Một số sản phẩm có thể có nhiều mùa trong năm.

- **Tự Động Ẩn/Hiện**: Tự động ẩn/hiện sản phẩm dựa trên mùa vụ hiện tại. Hệ thống so sánh mùa hiện tại với mùa vụ của sản phẩm để quyết định hiển thị.

- **Cảnh Báo Mùa Vụ**: Cảnh báo khách hàng khi sản phẩm sắp hết mùa (ví dụ: 1 tuần trước khi hết mùa) để họ có thể mua trước. Cảnh báo có thể được hiển thị trên product page hoặc gửi qua email.

**Quản Lý Hạn Sử Dụng:**

Quản lý hạn sử dụng đảm bảo chất lượng và an toàn thực phẩm.

- **Lưu Trữ Ngày Thu Hoạch và Hết Hạn**: Lưu trữ ngày thu hoạch và ngày hết hạn của từng lô hàng. Hệ thống tính toán thời gian còn lại dựa trên hai ngày này.

- **Cảnh Báo Hết Hạn**: Cảnh báo admin khi sản phẩm sắp hết hạn (ví dụ: 3 ngày trước khi hết hạn) để có biện pháp xử lý. Cảnh báo có thể được hiển thị trên dashboard hoặc gửi qua email.

- **Tự Động Loại Bỏ**: Tự động loại bỏ sản phẩm đã hết hạn khỏi danh sách bán để đảm bảo chất lượng và an toàn thực phẩm. Hệ thống có thể chạy scheduled job để check và remove expired products.

## 3.3. Kiến Trúc Tổng Thể Hệ Thống

Kiến trúc tổng thể của hệ thống được thiết kế dựa trên các nguyên tắc hiện đại của kiến trúc phần mềm, đảm bảo tính scalable, maintainable, và reliable.

### 3.3.1. Kiến Trúc Phân Lớp (Layered Architecture)

Hệ thống được xây dựng theo kiến trúc phân lớp với các tầng rõ ràng, mỗi tầng có trách nhiệm cụ thể và tương tác với các tầng khác thông qua well-defined interfaces.

**Sơ Đồ Kiến Trúc:**

Hệ thống được chia thành các lớp từ trên xuống dưới:

- **Client Layer**: Lớp giao diện người dùng, bao gồm Web Application, Mobile App (nếu có), và Admin Panel. Lớp này chịu trách nhiệm hiển thị và tương tác với người dùng.

- **API Gateway Layer**: Lớp gateway và load balancer, sử dụng Nginx làm reverse proxy. Lớp này xử lý SSL termination, rate limiting, caching, và routing requests đến appropriate backend servers.

- **Application Layer**: Lớp ứng dụng, được xây dựng với NestJS framework. Lớp này bao gồm Controllers (xử lý HTTP requests), Services (chứa business logic), và Repositories (truy cập dữ liệu).

- **Data Layer**: Lớp dữ liệu, bao gồm PostgreSQL (primary data store) và Redis (caching và session management).

**Các Lớp Chi Tiết:**

1. **Client Layer (Frontend)**:
   - **Web Application**: Được xây dựng với Nuxt 4, cung cấp giao diện cho khách hàng. Application sử dụng Server-Side Rendering (SSR) để improve SEO và initial load time.
   - **Admin Panel**: Panel riêng cho quản trị viên, cung cấp các công cụ quản lý hệ thống. Admin panel có authentication và authorization riêng.
   - **Responsive Design**: Design responsive cho mobile và desktop, đảm bảo user experience tốt trên mọi devices.

2. **API Gateway Layer**:
   - **Nginx Reverse Proxy**: Nginx làm reverse proxy và load balancer, forward requests từ clients đến backend servers. Nginx xử lý SSL/TLS termination để giảm load trên backend.
   - **Load Balancing**: Phân phối requests across multiple backend instances để improve performance và reliability. Sử dụng round-robin hoặc least-connections algorithm.
   - **Rate Limiting**: Limit requests per IP để prevent abuse và DDoS attacks. Different limits cho different endpoints.
   - **Caching**: Cache static files và API responses để reduce backend load và improve response times.

3. **Application Layer (Backend)**:
   - **NestJS Application**: NestJS application với kiến trúc modular, mỗi module đại diện cho một feature (products, orders, users, etc.). Modules có thể import và sử dụng modules khác.
   - **Controllers**: Controllers xử lý HTTP requests, extract parameters, validate inputs, và return responses. Controllers sử dụng decorators để define routes và handle requests.
   - **Services**: Services chứa business logic, orchestrate operations, và coordinate giữa repositories. Services được inject vào controllers thông qua Dependency Injection.
   - **Repositories**: Repositories truy cập dữ liệu, abstract database operations, và provide interface cho services. Repositories sử dụng TypeORM để interact với database.

4. **Data Layer**:
   - **PostgreSQL**: Primary data store, lưu trữ tất cả persistent data. PostgreSQL được chọn vì ACID compliance, advanced features (JSONB, full-text search), và reliability.
   - **Redis**: Caching và session management. Redis cache frequently accessed data để reduce database load và improve response times. Redis cũng lưu trữ session data cho distributed systems.

### 3.3.2. Sơ Đồ Luồng Xử Lý Request

Luồng xử lý một request từ client đến database:

1. **Client gửi Request**: Client (web application) gửi HTTP request đến API Gateway (Nginx).

2. **Load Balancing**: Nginx phân phối request đến một trong các instance của NestJS application.

3. **Request Processing trong NestJS**:
   - **Middleware Layer**: Request đi qua các middleware (authentication, logging, validation)
   - **Controller Layer**: Controller nhận request, extract parameters
   - **Service Layer**: Controller gọi service để xử lý business logic
   - **Repository Layer**: Service sử dụng repository để truy cập database

4. **Database Access**:
   - Repository sử dụng TypeORM để tạo và thực thi SQL queries
   - PostgreSQL xử lý queries và trả về kết quả
   - Nếu có cache, Redis được kiểm tra trước khi query database

5. **Response**: Kết quả được trả về ngược lại qua các tầng và cuối cùng đến client.

### 3.3.3. Sơ Đồ ERD (Entity Relationship Diagram)

Các entity chính và mối quan hệ:

- **User**: Người dùng hệ thống (admin, customer)
- **Product**: Sản phẩm nông nghiệp với các thuộc tính đặc thù
- **Category**: Danh mục sản phẩm (hỗ trợ đa cấp)
- **Order**: Đơn hàng
- **OrderItem**: Chi tiết đơn hàng
- **Cart**: Giỏ hàng
- **CartItem**: Chi tiết giỏ hàng
- **Review**: Đánh giá sản phẩm

**Relationships:**

- User 1-N Order
- Product N-1 Category
- Order N-1 User
- Order 1-N OrderItem
- OrderItem N-1 Product
- Product 1-N Review
- Review N-1 User

### 3.3.4. Sơ Đồ Actor (Use Case Diagram)

**Actors:**

- **Customer**: Người mua hàng
- **Admin**: Quản trị viên hệ thống

**Use Cases cho Customer:**

- Đăng ký, đăng nhập
- Xem danh sách sản phẩm
- Tìm kiếm và lọc sản phẩm
- Xem chi tiết sản phẩm
- Thêm vào giỏ hàng
- Tạo đơn hàng
- Xem lịch sử đơn hàng
- Đánh giá sản phẩm

**Use Cases cho Admin:**

- Quản lý sản phẩm (CRUD)
- Quản lý danh mục
- Quản lý đơn hàng
- Xem thống kê và báo cáo
- Quản lý người dùng

## 3.4. Thiết Kế Backend API

### 3.4.1. Kiến Trúc NestJS

**Module System:**

- Hệ thống module cho phép tổ chức code theo features
- Mỗi module đóng gói một chức năng cụ thể (Products, Orders, Users, v.v.)
- Modules có thể import và sử dụng modules khác

**Dependency Injection:**

- NestJS cung cấp DI container tích hợp
- Dependencies được inject thông qua constructor
- Lifecycle management tự động

### 3.4.2. Module System và Dependency Graph

**Các module chính:**

- **AppModule**: Root module
- **ProductsModule**: Quản lý sản phẩm
- **OrdersModule**: Quản lý đơn hàng
- **UsersModule**: Quản lý người dùng
- **AuthModule**: Authentication và authorization
- **CategoriesModule**: Quản lý danh mục

**Dependency Graph:**

- Modules phụ thuộc lẫn nhau thông qua imports
- Circular dependencies được tránh bằng cách sử dụng forwardRef

### 3.4.3. Controllers và Request Handling

**Controller Design:**

- Mỗi controller xử lý một resource cụ thể
- Routes được định nghĩa bằng decorators (@Get, @Post, @Put, @Delete)
- Request validation sử dụng DTOs (Data Transfer Objects)
- Error handling tập trung với exception filters

**Request Flow:**

1. Request đến controller
2. Validation (Pipes)
3. Authentication/Authorization (Guards)
4. Business logic (Services)
5. Data access (Repositories)
6. Response formatting

### 3.4.4. RESTful API Endpoints Design

Thiết kế RESTful API endpoints là một phần quan trọng của backend design. API endpoints được thiết kế theo RESTful principles để đảm bảo consistency và dễ sử dụng.

**API Endpoints Structure:**

API endpoints được tổ chức theo resources, mỗi resource có các endpoints cho CRUD operations:

- **Products API**: `/api/products` - Quản lý sản phẩm
  - GET `/api/products`: Lấy danh sách sản phẩm với pagination, filtering, và sorting
  - GET `/api/products/:id`: Lấy chi tiết sản phẩm
  - POST `/api/products`: Tạo sản phẩm mới (admin only)
  - PUT `/api/products/:id`: Cập nhật toàn bộ sản phẩm (admin only)
  - PATCH `/api/products/:id`: Cập nhật một phần sản phẩm (admin only)
  - DELETE `/api/products/:id`: Xóa sản phẩm (admin only)
  - GET `/api/products/search`: Tìm kiếm sản phẩm với full-text search
  - GET `/api/products/filter`: Lọc sản phẩm theo các tiêu chí (category, price, season, origin, certifications)

- **Categories API**: `/api/categories` - Quản lý danh mục
  - GET `/api/categories`: Lấy danh sách danh mục (tree structure)
  - GET `/api/categories/:id`: Lấy chi tiết danh mục
  - POST `/api/categories`: Tạo danh mục mới (admin only)
  - PUT `/api/categories/:id`: Cập nhật danh mục (admin only)
  - DELETE `/api/categories/:id`: Xóa danh mục (admin only)

- **Orders API**: `/api/orders` - Quản lý đơn hàng
  - GET `/api/orders`: Lấy danh sách đơn hàng của user hiện tại
  - GET `/api/orders/:id`: Lấy chi tiết đơn hàng
  - POST `/api/orders`: Tạo đơn hàng mới từ giỏ hàng
  - PATCH `/api/orders/:id/status`: Cập nhật trạng thái đơn hàng (admin only)
  - GET `/api/orders/admin`: Lấy danh sách tất cả đơn hàng (admin only)

- **Users API**: `/api/users` - Quản lý người dùng
  - GET `/api/users/profile`: Lấy thông tin profile của user hiện tại
  - PUT `/api/users/profile`: Cập nhật profile
  - GET `/api/users`: Lấy danh sách users (admin only)
  - GET `/api/users/:id`: Lấy chi tiết user (admin only)

- **Auth API**: `/api/auth` - Authentication và authorization
  - POST `/api/auth/register`: Đăng ký tài khoản mới
  - POST `/api/auth/login`: Đăng nhập
  - POST `/api/auth/logout`: Đăng xuất
  - POST `/api/auth/refresh`: Refresh access token
  - POST `/api/auth/forgot-password`: Quên mật khẩu
  - POST `/api/auth/reset-password`: Đặt lại mật khẩu

- **Cart API**: `/api/cart` - Quản lý giỏ hàng
  - GET `/api/cart`: Lấy giỏ hàng của user hiện tại
  - POST `/api/cart/items`: Thêm sản phẩm vào giỏ hàng
  - PUT `/api/cart/items/:id`: Cập nhật số lượng sản phẩm trong giỏ hàng
  - DELETE `/api/cart/items/:id`: Xóa sản phẩm khỏi giỏ hàng
  - DELETE `/api/cart`: Xóa toàn bộ giỏ hàng

**RESTful API Design Principles:**

- **Resource Naming**: Sử dụng nouns cho resources (products, orders, users), không sử dụng verbs trong URLs. URLs phản ánh resource hierarchy.

- **HTTP Methods**: Sử dụng appropriate HTTP methods:
  - GET: Read operations (idempotent, safe, không modify state)
  - POST: Create operations (not idempotent, create new resources)
  - PUT: Full update operations (idempotent, replace entire resource)
  - PATCH: Partial update operations (not idempotent, update specific fields)
  - DELETE: Delete operations (idempotent, remove resources)

- **Status Codes**: Sử dụng appropriate HTTP status codes:
  - 200 OK: Successful GET, PUT, PATCH
  - 201 Created: Successful POST (resource created)
  - 204 No Content: Successful DELETE (no content to return)
  - 400 Bad Request: Validation errors, malformed request
  - 401 Unauthorized: Authentication required
  - 403 Forbidden: Authorization failed (user không có quyền)
  - 404 Not Found: Resource not found
  - 409 Conflict: Resource conflict (duplicate, constraint violation)
  - 500 Internal Server Error: Server errors

- **Response Format**: Consistent response format cho tất cả endpoints:
  - Success Response: `{ data: {...}, message: "...", statusCode: 200 }`
  - Error Response: `{ error: "...", message: "...", statusCode: 400 }`
  - Pagination Response: `{ data: [...], meta: { page, limit, total, totalPages } }`

- **Query Parameters**: Sử dụng query parameters cho filtering, sorting, và pagination:
  - `?page=1&limit=10`: Pagination
  - `?sort=price&order=asc`: Sorting
  - `?category=1&minPrice=100&maxPrice=500`: Filtering
  - `?search=keyword`: Search

- **Versioning**: API versioning để maintain backward compatibility. Version có thể được specify trong URL (`/api/v1/products`) hoặc headers (`Accept: application/vnd.api+json;version=1`).

### 3.4.5. Services và Business Logic

**Service Layer:**

Services là nơi chứa business logic của application, tách biệt khỏi presentation layer (controllers) và data access layer (repositories).

- **Business Logic Centralization**: Services chứa business logic, orchestrate operations, và coordinate giữa repositories. Business logic được tập trung trong services, không scattered trong controllers hoặc repositories.

- **Dependency Injection**: Services được inject vào controllers thông qua Dependency Injection. Services có thể inject multiple repositories và other services.

- **Stateless Services**: Services là stateless (không lưu trữ state), mỗi method call là independent. State được lưu trong database hoặc cache, không trong service instances.

- **Reusability**: Business logic trong services có thể được reuse ở nhiều nơi. Controllers và other services có thể call service methods.

**Business Logic cho Domain Nông Nghiệp:**

Domain nông nghiệp có business logic đặc thù cần được implement trong services:

- **Quản Lý Tính Khả Dụng Theo Mùa Vụ**: Service kiểm tra mùa vụ hiện tại và so sánh với mùa vụ của sản phẩm để quyết định tính khả dụng. Sản phẩm chỉ available trong mùa vụ của nó.

- **Quản Lý Hạn Sử Dụng và Cảnh Báo**: Service tính toán thời gian còn lại dựa trên ngày thu hoạch và ngày hết hạn. Service cảnh báo admin khi sản phẩm sắp hết hạn và tự động ẩn sản phẩm đã hết hạn.

- **Tính Toán Giá Cả Theo Số Lượng**: Service tính toán giá cả dựa trên số lượng mua. Giá có thể khác nhau cho retail và wholesale. Service apply tier pricing nếu có.

- **Quản Lý Kho Hàng Theo FIFO**: Service ưu tiên bán sản phẩm sắp hết hạn trước (FIFO - First In First Out). Service sort products theo expiry date khi query.

- **Validation Logic**: Service validate business rules như inventory availability, price consistency, và order constraints.

- **Transaction Management**: Service quản lý transactions cho complex operations như tạo đơn hàng (tạo order, tạo orderItems, update inventory, update cart).

### 3.4.6. Repository Pattern

**Repository Pattern:**

Repository Pattern tách biệt data access logic khỏi business logic, cung cấp abstraction layer cho database operations.

- **Separation of Concerns**: Tách biệt data access logic khỏi business logic. Business logic không biết về chi tiết database implementation.

- **TypeORM Base Repository**: TypeORM cung cấp base repository với các methods cơ bản (find, findOne, save, delete, count, etc.). Base repository cung cấp common operations cho tất cả entities.

- **Custom Repositories**: Custom repositories cho các queries phức tạp và domain-specific operations. Custom repositories extend base repository và add domain-specific methods.

- **Dependency Injection**: Repositories được inject vào services thông qua Dependency Injection. Services depend on repository interfaces, không phụ thuộc vào concrete implementations.

**Repository Methods cho Domain Nông Nghiệp:**

- **findBySeason()**: Tìm sản phẩm theo mùa vụ
- **findExpiringSoon()**: Tìm sản phẩm sắp hết hạn
- **findByOrigin()**: Tìm sản phẩm theo nguồn gốc
- **findByCertifications()**: Tìm sản phẩm theo chứng nhận
- **findAvailableProducts()**: Tìm sản phẩm còn hàng và đang trong mùa
- **searchProducts()**: Full-text search sản phẩm

## 3.5. Thiết Kế Frontend

### 3.5.1. Kiến Trúc Nuxt 4

**File-Based Routing:**

- Routes được tạo tự động từ cấu trúc thư mục `pages/`
- Dynamic routes với `[id].vue`
- Nested routes với thư mục con

**Auto-Imports:**

- Components, composables, và utilities được auto-import
- Giảm boilerplate code

**Server-Side Rendering:**

- SSR cho SEO và performance
- Hydration sau khi HTML được render

### 3.5.2. Component Architecture

**Phân cấp Component:**

- **Layout Components**: Định nghĩa cấu trúc trang
- **Page Components**: Các trang riêng biệt
- **Section Components**: Các phần nội dung lớn
- **UI Components**: Components nhỏ, tái sử dụng
- **Admin Components**: Components cho admin panel

**Component Design Principles:**

- Single Responsibility Principle
- Props interface với TypeScript
- Event-based communication
- Slot-based composition

### 3.5.3. State Management

**Composables:**

- Sử dụng Vue Composition API
- Composables cho shared logic
- State management với `ref` và `reactive`

**State cho:**

- Cart management
- User authentication
- Product filtering
- Wishlist

### 3.5.4. Routing và Navigation

**Routing:**

- File-based routing tự động
- Dynamic routes
- Nested routes
- Route guards cho authentication

**Navigation:**

- Breadcrumbs tự động
- Active route highlighting
- Smooth transitions

## 3.6. Thiết Kế Database Schema

### 3.6.1. Entity Design

**Product Entity:**

- Thông tin cơ bản: name, description, price, images
- Thông tin đặc thù: harvestDate, expiryDate, origin, certifications, grade, storageRequirements
- Relationships: category, reviews, orderItems

**Category Entity:**

- Thông tin: name, description, slug
- Self-referencing: parentId cho danh mục đa cấp
- Relationships: products, parent, children

**Order Entity:**

- Thông tin: status, totalAmount, shippingAddress, deliveryTimeWindow
- Relationships: user, orderItems

**User Entity:**

- Thông tin: email, password (hashed), name, role
- Relationships: orders, reviews

### 3.6.2. Relationships

**One-to-Many:**

- User → Orders
- Category → Products
- Order → OrderItems
- Product → Reviews

**Many-to-One:**

- Order → User
- Product → Category
- OrderItem → Product
- Review → User, Product

**Many-to-Many:**

- Product ↔ Tags (nếu có)

### 3.6.3. Indexing Strategy

**Primary Indexes:**

- Tất cả tables có primary key với index tự động

**Foreign Key Indexes:**

- Index trên tất cả foreign keys để cải thiện join performance

**Composite Indexes:**

- Index trên (categoryId, status) cho products
- Index trên (userId, createdAt) cho orders
- Index trên (harvestDate, expiryDate) cho products

**Full-Text Search:**

- Index trên name và description của products cho tìm kiếm

## 3.7. Thiết Kế Caching Strategy

Caching strategy là cách optimize performance bằng cách cache frequently accessed data. Caching giảm database load và improve response times.

### 3.7.1. Cache-Aside Pattern

Cache-Aside Pattern (còn gọi là Lazy Loading) là pattern phổ biến cho caching.

**Cách Hoạt Động:**

- **Application Kiểm Tra Cache**: Application kiểm tra cache trước khi query database. Cache key được generate từ request parameters.

- **Cache Hit**: Nếu cache hit (data có trong cache), application trả về data từ cache. Không cần query database.

- **Cache Miss**: Nếu cache miss (data không có trong cache), application query database để lấy data.

- **Store trong Cache**: Sau khi query database, application store result trong cache với TTL (Time To Live). Data sẽ available trong cache cho subsequent requests.

- **Cache Invalidation**: Cache invalidation khi data changes. Khi data được update hoặc delete, cache được invalidate để ensure consistency. Invalidation có thể be immediate hoặc eventual.

**Lợi Ích:**

- **Reduced Database Load**: Giảm số queries đến database, reduce database load significantly.
- **Improved Response Times**: Cache responses nhanh hơn database queries, improve response times.
- **Scalability**: Caching improve scalability vì reduce load trên database.

**Trade-offs:**

- **Cache Consistency**: Cache có thể become stale nếu không được invalidate properly. Cần có strategy để ensure cache consistency.

- **Memory Usage**: Cache sử dụng memory, cần manage cache size và eviction policies.

### 3.7.2. Cache Keys và TTL

Cache keys và TTL (Time To Live) được design dựa trên data characteristics và update frequency.

**Product Data:**

- **Static Info (name, description)**: TTL dài (1 giờ) vì static info ít thay đổi. Cache key: `product:{id}:info`

- **Dynamic Pricing**: TTL ngắn (5 phút) vì pricing có thể thay đổi. Cache key: `product:{id}:price`

- **Availability**: TTL rất ngắn (1 phút) vì availability thay đổi frequently (inventory updates, expiry). Cache key: `product:{id}:availability`

- **Product List**: TTL trung bình (10 phút) cho product lists với filters. Cache key: `products:list:{filters_hash}`

**Category Data:**

- **Category Tree**: TTL dài (30 phút) vì category tree ít thay đổi. Cache key: `categories:tree`

- **Product Counts**: TTL trung bình (10 phút) vì product counts thay đổi khi products được add/remove. Cache key: `category:{id}:count`

**Session Data:**

- **User Sessions**: TTL 24 giờ cho user sessions. Sessions được refresh khi có activity. Cache key: `session:{sessionId}`

- **User Data**: TTL trung bình (15 phút) cho user profile data. Cache key: `user:{id}:profile`

**Cache Key Naming Convention:**

- **Hierarchical Keys**: Cache keys sử dụng hierarchical naming: `{resource}:{id}:{field}` hoặc `{resource}:{action}:{params}`

- **Consistent Format**: Consistent format cho tất cả cache keys để dễ manage và invalidate.

- **Versioning**: Cache keys có thể include version để support cache invalidation khi schema changes.

**TTL Strategy:**

- **Short TTL**: Cho frequently changing data (availability, inventory, pricing)
- **Medium TTL**: Cho moderately changing data (product lists, counts)
- **Long TTL**: Cho rarely changing data (static info, category tree)
- **No TTL**: Cho data that should be invalidated manually (sessions với refresh)

## 3.8. Thiết Kế Security và Authentication

### 3.8.1. Authentication

**Password-Based Authentication:**

- Passwords được hash với bcrypt
- Salt tự động
- Password policies

**Token-Based Authentication:**

- JWT tokens cho API access
- Refresh tokens cho long-term sessions
- Token expiration và rotation

### 3.8.2. Authorization

**Role-Based Access Control (RBAC):**

- Roles: Admin, User
- Permissions gắn với roles
- Guards để protect routes

### 3.8.3. Data Validation

**Input Validation:**

- DTOs với class-validator
- Validation pipes trong NestJS
- Client-side validation với Nuxt UI

**Sanitization:**

- SQL injection prevention (TypeORM tự động)
- XSS prevention
- Input sanitization

---

> **Nguồn**: Nội dung được tổng hợp từ apps/api/DOCUMENTATION.md và apps/web/DOCUMENTATION.md
