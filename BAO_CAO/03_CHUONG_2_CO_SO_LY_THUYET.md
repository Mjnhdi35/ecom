# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

> **Lưu ý**: Chương này tổng hợp và trình bày các kiến thức lý thuyết từ cả hai file DOCUMENTATION.md (Backend và Frontend). Nội dung được tổ chức lại theo cấu trúc báo cáo học thuật.

## 2.1. Tổng Quan về Thương Mại Điện Tử Nông Nghiệp

Thương mại điện tử nông nghiệp (Agricultural E-commerce) là việc ứng dụng công nghệ thông tin và truyền thông vào quá trình mua bán, trao đổi các sản phẩm nông nghiệp qua mạng Internet. Đây là một lĩnh vực đang phát triển mạnh mẽ, đặc biệt trong bối cảnh người tiêu dùng ngày càng quan tâm đến chất lượng, nguồn gốc, và tính bền vững của sản phẩm nông nghiệp.

**Khái Niệm và Đặc Điểm:**

Thương mại điện tử nông nghiệp khác với thương mại điện tử thông thường ở nhiều điểm quan trọng. Sản phẩm nông nghiệp có những đặc thù riêng đòi hỏi hệ thống phải được thiết kế đặc biệt để xử lý.

**Tính Theo Mùa (Seasonality):**

Sản phẩm nông nghiệp thường chỉ có sẵn trong các mùa vụ cụ thể, đòi hỏi hệ thống phải quản lý tính khả dụng động. Không giống như sản phẩm công nghiệp có thể sản xuất quanh năm, sản phẩm nông nghiệp phụ thuộc vào điều kiện thời tiết, mùa vụ, và chu kỳ sinh trưởng tự nhiên.

- **Quản Lý Mùa Vụ**: Hệ thống cần xác định và quản lý mùa vụ của từng sản phẩm (xuân, hè, thu, đông)
- **Tự Động Ẩn/Hiện**: Tự động ẩn sản phẩm khi hết mùa và hiện lại khi vào mùa
- **Cảnh Báo Mùa Vụ**: Cảnh báo khách hàng khi sản phẩm sắp hết mùa để họ có thể mua trước
- **Dự Báo Sẵn Có**: Dự báo thời điểm sản phẩm sẽ có sẵn trở lại

**Hạn Sử Dụng Ngắn (Perishability):**

Nhiều sản phẩm tươi sống có thời hạn sử dụng ngắn, cần quản lý kho hàng theo nguyên tắc FIFO (First In First Out) để đảm bảo sản phẩm cũ được bán trước sản phẩm mới.

- **Quản Lý Hạn Sử Dụng**: Lưu trữ và theo dõi ngày thu hoạch và ngày hết hạn của từng lô hàng
- **FIFO Management**: Tự động ưu tiên bán sản phẩm sắp hết hạn trước
- **Cảnh Báo Hết Hạn**: Cảnh báo admin khi sản phẩm sắp hết hạn để có biện pháp xử lý
- **Tự Động Loại Bỏ**: Tự động ẩn hoặc loại bỏ sản phẩm đã hết hạn khỏi danh sách bán

**Theo Dõi Nguồn Gốc (Origin Tracking):**

Người tiêu dùng ngày càng quan tâm đến nguồn gốc, xuất xứ, và các chứng nhận (organic, fair trade, v.v.). Đây là một yêu cầu quan trọng cho tính minh bạch và trách nhiệm xã hội.

- **Thông Tin Nguồn Gốc**: Lưu trữ chi tiết về địa điểm sản xuất, nông trại, vùng miền
- **Traceability**: Khả năng truy vết sản phẩm từ nông trại đến người tiêu dùng
- **Chứng Nhận**: Lưu trữ và hiển thị các chứng nhận (organic, fair trade, GAP, GlobalGAP)
- **Transparency**: Cung cấp thông tin minh bạch cho người tiêu dùng

**Chuỗi Cung Ứng Phức Tạp (Complex Supply Chain):**

Từ nông trại đến người tiêu dùng qua nhiều khâu trung gian, đòi hỏi hệ thống theo dõi và quản lý toàn bộ chuỗi cung ứng.

- **Multi-Stage Tracking**: Theo dõi sản phẩm qua nhiều giai đoạn (nông trại → nhà phân phối → kho → cửa hàng → người tiêu dùng)
- **Quality Control**: Kiểm soát chất lượng tại nhiều điểm trong chuỗi cung ứng
- **Inventory Management**: Quản lý tồn kho tại nhiều locations
- **Logistics Coordination**: Phối hợp logistics giữa các parties trong chuỗi

**Yêu Cầu Bảo Quản Đặc Biệt (Special Storage Requirements):**

Nhiều sản phẩm cần điều kiện bảo quản đặc biệt (nhiệt độ, độ ẩm) và vận chuyển chuyên dụng để đảm bảo chất lượng.

- **Temperature Control**: Quản lý nhiệt độ bảo quản (lạnh, đông lạnh, nhiệt độ phòng)
- **Humidity Control**: Quản lý độ ẩm bảo quản
- **Special Handling**: Yêu cầu xử lý đặc biệt (fragile, perishable)
- **Transportation Requirements**: Yêu cầu vận chuyển đặc biệt (refrigerated trucks, special packaging)

**Lợi Ích của Thương Mại Điện Tử Nông Nghiệp:**

- **Kết Nối Trực Tiếp**: Kết nối trực tiếp giữa nông dân và người tiêu dùng, giảm bớt khâu trung gian
- **Giá Cả Minh Bạch**: Giá cả minh bạch, người tiêu dùng biết được giá gốc và giá bán
- **Chất Lượng Đảm Bảo**: Thông tin chi tiết về nguồn gốc, chứng nhận, và chất lượng
- **Tiện Lợi**: Người tiêu dùng có thể mua sắm mọi lúc, mọi nơi
- **Hỗ Trợ Nông Dân**: Giúp nông dân tiếp cận thị trường rộng lớn hơn, tăng thu nhập

## 2.2. Kiến Trúc Ứng Dụng Web Hiện Đại

### 2.2.1. Kiến Trúc Phân Lớp (Layered Architecture)

Kiến trúc phân lớp là một mô hình kiến trúc phổ biến trong phát triển ứng dụng web, chia hệ thống thành các lớp với trách nhiệm rõ ràng:

- **Presentation Layer**: Lớp giao diện người dùng, chịu trách nhiệm hiển thị và tương tác với người dùng.

- **Application Layer**: Lớp ứng dụng, chứa business logic và điều phối các hoạt động.

- **Data Access Layer**: Lớp truy cập dữ liệu, chịu trách nhiệm tương tác với cơ sở dữ liệu.

- **Database Layer**: Lớp cơ sở dữ liệu, lưu trữ dữ liệu.

### 2.2.2. Kiến Trúc Client-Server

Kiến trúc client-server là mô hình phổ biến trong ứng dụng web, trong đó:

- **Client**: Trình duyệt web hoặc ứng dụng mobile, gửi requests đến server.
- **Server**: Xử lý requests, thực thi business logic, và trả về responses.

### 2.2.3. RESTful Architecture

REST (Representational State Transfer) là một kiến trúc phần mềm cho hệ thống phân tán:

- **Resources**: Dữ liệu được tổ chức dưới dạng resources (tài nguyên)
- **HTTP Methods**: Sử dụng các phương thức HTTP chuẩn (GET, POST, PUT, DELETE)
- **Stateless**: Mỗi request chứa đầy đủ thông tin cần thiết
- **Uniform Interface**: Giao diện thống nhất cho tất cả các resources

## 2.3. Framework và Công Nghệ Backend

### 2.3.1. JavaScript và TypeScript: Ngôn Ngữ Lập Trình

**JavaScript - Ngôn Ngữ Lập Trình Động:**

JavaScript là một ngôn ngữ lập trình high-level, interpreted, và dynamic typing được phát triển bởi Brendan Eich tại Netscape vào năm 1995. JavaScript ban đầu được thiết kế để chạy trong trình duyệt web, nhưng với sự ra đời của Node.js, JavaScript đã trở thành một ngôn ngữ full-stack.

**Đặc Điểm của JavaScript:**

- **Dynamic Typing**: JavaScript là dynamically typed, nghĩa là kiểu dữ liệu được xác định tại runtime, không phải compile time. Điều này cho phép linh hoạt nhưng cũng có thể dẫn đến lỗi runtime.

- **Prototype-Based Inheritance**: JavaScript sử dụng prototype-based inheritance thay vì class-based inheritance truyền thống. Mỗi object có một prototype object mà nó kế thừa properties và methods.

- **First-Class Functions**: Functions trong JavaScript là first-class citizens, có nghĩa là chúng có thể được gán cho variables, passed như arguments, và returned từ functions khác.

- **Closures**: Closures cho phép functions truy cập variables từ outer scope ngay cả sau khi outer function đã return. Đây là một tính năng mạnh mẽ cho functional programming và data encapsulation.

- **Event-Driven và Asynchronous**: JavaScript được thiết kế để xử lý events và asynchronous operations, làm cho nó lý tưởng cho web development và I/O-intensive applications.

**JavaScript Runtime và Execution:**

- **Call Stack**: Call stack là nơi JavaScript engine track function calls. Khi một function được gọi, nó được push vào stack, và khi return, nó được pop ra.

- **Heap**: Heap là nơi JavaScript engine lưu trữ objects và variables. Garbage collector quản lý memory trong heap.

- **Event Loop**: Event loop là cơ chế cho phép JavaScript xử lý asynchronous operations. Event loop continuously check call stack và message queue, đưa messages từ queue vào stack khi stack rỗng.

- **Callback Queue**: Callback queue (hay message queue) lưu trữ callbacks từ asynchronous operations. Khi call stack rỗng, event loop lấy callbacks từ queue và execute chúng.

**TypeScript - Superset của JavaScript:**

TypeScript là một superset của JavaScript được phát triển bởi Microsoft, thêm static typing và các tính năng OOP vào JavaScript. TypeScript được compile thành JavaScript, cho phép developers sử dụng các tính năng hiện đại trong khi vẫn tương thích với JavaScript runtime.

**Lợi Ích của TypeScript:**

- **Static Type Checking**: TypeScript cung cấp static type checking tại compile time, giúp catch errors sớm hơn và improve code quality. Type checking giúp prevent type-related bugs và improve code documentation.

- **Type Inference**: TypeScript có thể infer types từ context, giảm bớt need for explicit type annotations. Type inference làm cho code concise hơn trong khi vẫn maintain type safety.

- **Enhanced IDE Support**: TypeScript cung cấp better IDE support với autocomplete, refactoring, và navigation. IDE có thể provide better suggestions và catch errors trước khi runtime.

- **OOP Features**: TypeScript hỗ trợ classes, interfaces, enums, và access modifiers (public, private, protected), làm cho code organization tốt hơn và align với OOP principles.

- **Advanced Types**: TypeScript cung cấp advanced types như generics, union types, intersection types, và conditional types, cho phép express complex type relationships.

**TypeScript Compilation Process:**

- **Compile Time**: TypeScript compiler (tsc) compile TypeScript code thành JavaScript tại compile time. Compiler check types, syntax, và generate JavaScript code.

- **Type Erasure**: TypeScript types được erased tại compile time, nghĩa là type information không tồn tại trong JavaScript output. Điều này đảm bảo compatibility với JavaScript runtime.

- **Source Maps**: TypeScript generate source maps để map JavaScript code về TypeScript source, giúp debugging dễ dàng hơn.

- **Incremental Compilation**: TypeScript hỗ trợ incremental compilation để chỉ compile files đã thay đổi, improve build performance.

**TypeScript Type System:**

- **Basic Types**: TypeScript hỗ trợ basic types như number, string, boolean, null, undefined, void, và any. Basic types provide foundation cho type system.

- **Object Types**: Object types define structure của objects với properties và methods. Object types có thể be defined với interfaces hoặc type aliases.

- **Array Types**: Array types define arrays với specific element types. TypeScript hỗ trợ both array syntax (number[]) và generic syntax (Array<number>).

- **Function Types**: Function types define function signatures với parameter types và return types. Function types enable type-safe function calls.

- **Union và Intersection Types**: Union types (A | B) represent values có thể be one of several types. Intersection types (A & B) combine multiple types into one.

- **Generics**: Generics cho phép create reusable components với type parameters. Generics enable type-safe code reuse và abstraction.

- **Utility Types**: TypeScript cung cấp utility types như Partial, Required, Pick, Omit, và Record để manipulate types. Utility types simplify common type transformations.

**TypeScript Decorators:**

TypeScript decorators là một experimental feature cho phép add metadata và modify behavior của classes, methods, properties, và parameters. Decorators được sử dụng extensively trong NestJS để implement dependency injection, routing, và validation.

- **Class Decorators**: Class decorators apply to class constructors và có thể modify hoặc replace class definition. Class decorators được sử dụng để add metadata hoặc wrap class với additional functionality.

- **Method Decorators**: Method decorators apply to method definitions và có thể modify method behavior. Method decorators được sử dụng để add logging, caching, hoặc validation.

- **Property Decorators**: Property decorators apply to property declarations và có thể modify property behavior. Property decorators được sử dụng để add validation hoặc transformation.

- **Parameter Decorators**: Parameter decorators apply to parameter declarations và có thể add metadata cho dependency injection. Parameter decorators được sử dụng trong NestJS để inject dependencies.

**TypeScript và JavaScript Interoperability:**

- **Gradual Typing**: TypeScript cho phép gradual typing, có nghĩa là có thể mix TypeScript và JavaScript code. Existing JavaScript code có thể be used trong TypeScript projects.

- **Type Declarations**: Type declarations (.d.ts files) provide type information cho JavaScript libraries. Type declarations enable type checking cho JavaScript code.

- **JavaScript in TypeScript**: TypeScript có thể import và use JavaScript modules. TypeScript compiler sẽ check types nếu type declarations are available.

### 2.3.1.1. Node.js và V8 JavaScript Engine

**Node.js** là một runtime environment cho phép chạy JavaScript trên server-side. Node.js được xây dựng trên V8 JavaScript Engine của Google Chrome.

**V8 JavaScript Engine - Chi Tiết Kỹ Thuật:**

V8 là một high-performance JavaScript engine được phát triển bởi Google cho Chrome browser. V8 compile JavaScript thành optimized machine code để achieve high performance.

**Just-In-Time (JIT) Compilation:**

- **Ignition Interpreter**: Ignition là interpreter của V8, execute JavaScript code một cách nhanh chóng. Ignition generate bytecode từ JavaScript source và execute bytecode.

- **TurboFan Compiler**: TurboFan là optimizing compiler của V8, compile hot code paths thành optimized machine code. TurboFan sử dụng multiple optimization techniques để improve performance.

- **Compilation Pipeline**: V8 sử dụng multi-tier compilation pipeline: source code → bytecode (Ignition) → optimized machine code (TurboFan). Pipeline balance giữa startup time và execution speed.

- **Hot Code Detection**: V8 identify hot code paths (frequently executed code) và compile chúng với TurboFan. Hot code detection enable selective optimization.

**Hidden Classes và Inline Caching:**

- **Hidden Classes**: V8 sử dụng hidden classes (hay maps) để represent object structure. Hidden classes enable fast property access bằng cách cache property locations.

- **Inline Caching**: Inline caching cache property access patterns để avoid repeated lookups. Inline caching significantly improve property access performance.

- **Polymorphic Inline Caching**: Polymorphic inline caching handle multiple object shapes efficiently. PIC enable fast property access cho objects với different structures.

**Garbage Collection:**

- **Generational GC**: V8 sử dụng generational garbage collection với young generation và old generation. Young generation store short-lived objects, old generation store long-lived objects.

- **Scavenge Algorithm**: Scavenge algorithm collect garbage trong young generation. Scavenge is fast và efficient cho short-lived objects.

- **Mark-Sweep-Compact**: Mark-sweep-compact algorithm collect garbage trong old generation. Algorithm mark live objects, sweep dead objects, và compact memory.

- **Incremental Marking**: Incremental marking break marking phase thành small chunks để avoid long pauses. Incremental marking improve application responsiveness.

**Event Loop**: Node.js sử dụng event-driven, non-blocking I/O model, cho phép xử lý nhiều requests đồng thời mà không cần tạo thread mới cho mỗi request.

### 2.3.2. Decorators, Metadata, và Reflection trong TypeScript và NestJS

**TypeScript Decorators - Cơ Chế và Cách Hoạt Động:**

Decorators là một experimental feature trong TypeScript cho phép add metadata và modify behavior của classes, methods, properties, và parameters. Decorators được implement như functions nhận target object và return modified hoặc new object.

**Decorator Syntax và Types:**

- **Class Decorators**: Class decorators được apply trước class declaration. Decorator nhận constructor function và có thể return new constructor hoặc modify existing one. Class decorators được sử dụng để add metadata, mixins, hoặc wrap class với additional functionality.

- **Method Decorators**: Method decorators được apply trước method declaration. Decorator nhận target object, property key, và property descriptor. Method decorators có thể modify method behavior, add logging, hoặc implement cross-cutting concerns.

- **Property Decorators**: Property decorators được apply trước property declaration. Decorator nhận target object và property key. Property decorators được sử dụng để add validation, transformation, hoặc metadata.

- **Parameter Decorators**: Parameter decorators được apply trước parameter declaration. Decorator nhận target object, property key (hoặc undefined cho constructor), và parameter index. Parameter decorators được sử dụng extensively trong NestJS cho dependency injection.

**Decorator Execution Order:**

Decorators được execute từ bottom to top (từ decorator gần nhất đến decorator xa nhất). Execution order là: parameter decorators → method/property decorators → class decorators. Order này important cho decorators depend on each other.

**Metadata và Reflect-Metadata:**

- **Metadata API**: Metadata API cho phép store và retrieve metadata cho classes, methods, properties, và parameters. Metadata được store trong special Symbol keys và có thể be accessed tại runtime.

- **Reflect-Metadata Library**: reflect-metadata là một polyfill cho Metadata API, enable metadata support trong TypeScript. Library provide Reflect.defineMetadata và Reflect.getMetadata functions.

- **Metadata Keys**: Metadata được store với keys như 'design:type', 'design:paramtypes', và 'design:returntype'. Custom metadata keys có thể be defined cho application-specific metadata.

- **Metadata Storage**: Metadata được store trong WeakMap để avoid memory leaks. WeakMap enable garbage collection của metadata khi objects are no longer referenced.

**Reflection trong TypeScript:**

- **Type Reflection**: TypeScript provide limited type reflection tại runtime thông qua metadata. Type information có thể be retrieved từ metadata để enable runtime type checking và validation.

- **Property Reflection**: Property reflection cho phép inspect và modify object properties tại runtime. Reflection enable dynamic property access và modification.

- **Method Reflection**: Method reflection cho phép inspect và invoke methods tại runtime. Reflection enable dynamic method invocation và AOP (Aspect-Oriented Programming).

- **Constructor Reflection**: Constructor reflection cho phép inspect constructor parameters và create instances dynamically. Reflection enable dependency injection và factory patterns.

**Decorators trong NestJS:**

- **@Module()**: Module decorator define NestJS modules với imports, controllers, providers, và exports. Decorator store module metadata để enable module system.

- **@Controller()**: Controller decorator define route prefixes và options cho controllers. Decorator register controllers với routing system.

- **@Injectable()**: Injectable decorator mark classes như providers trong DI container. Decorator enable dependency injection cho classes.

- **@Get(), @Post(), @Put(), @Delete()**: HTTP method decorators define route handlers với specific HTTP methods và paths. Decorators register routes với routing system.

- **@Body(), @Param(), @Query()**: Parameter decorators extract data từ request body, route parameters, và query parameters. Decorators enable type-safe request handling.

- **@UseGuards(), @UseInterceptors(), @UsePipes()**: Cross-cutting concern decorators apply guards, interceptors, và pipes to routes. Decorators enable AOP functionality.

**Metadata-Driven Architecture:**

NestJS sử dụng metadata-driven architecture, nơi decorators add metadata và framework use metadata để configure và wire components. Architecture enable declarative programming và reduce boilerplate code.

**Custom Decorators:**

- **Creating Custom Decorators**: Custom decorators có thể be created để add application-specific functionality. Custom decorators combine multiple decorators hoặc add custom metadata.

- **Decorator Composition**: Decorators có thể be composed để create complex behaviors. Composition enable reusable decorator patterns.

- **Parameter Decorators cho DI**: Custom parameter decorators có thể be created để inject custom dependencies. Decorators enable flexible dependency injection.

### 2.3.2.1. NestJS Framework

**NestJS** là một framework Node.js được xây dựng trên TypeScript, lấy cảm hứng từ Angular. NestJS cung cấp:

- **Modular Architecture**: Hệ thống module cho phép tổ chức code theo các feature modules.
- **Dependency Injection**: Hệ thống DI tích hợp sẵn, cho phép quản lý dependencies một cách tự động.
- **TypeScript Native**: Hỗ trợ TypeScript từ đầu, đảm bảo type safety.
- **Decorators và Metadata**: Sử dụng TypeScript decorators và reflect-metadata để cung cấp các tính năng như routing, validation, và dependency injection.

**Kiến trúc NestJS**:

- **Modules**: Đóng gói các chức năng liên quan
- **Controllers**: Xử lý HTTP requests và responses
- **Providers/Services**: Chứa business logic
- **Repositories**: Truy cập dữ liệu

**Guards - Bảo Vệ:**

Guards là các classes được sử dụng để kiểm soát quyền truy cập vào routes và handlers trong NestJS. Guards được thực thi sau middleware nhưng trước interceptors và pipes.

**Chức năng của Guards:**

- **Authentication**: Xác thực người dùng có đăng nhập hay không
- **Authorization**: Kiểm tra quyền truy cập của người dùng đến tài nguyên cụ thể
- **Role-based Access Control**: Kiểm soát truy cập dựa trên vai trò của người dùng
- **Conditional Logic**: Thực thi logic điều kiện trước khi cho phép truy cập handler

**Guard Execution Flow:**

Guards được thực thi theo thứ tự:

1. Global guards (được đăng ký ở app level)
2. Controller guards (được đăng ký ở controller level)
3. Route guards (được đăng ký ở route handler level)

**Guard Return Values:**

- **true**: Cho phép request tiếp tục đến handler
- **false**: Từ chối request và trả về 403 Forbidden
- **Exception**: Throw exception để trả về error response tùy chỉnh

**Pipes - Ống Dẫn:**

Pipes là các classes được sử dụng để transform và validate dữ liệu trong NestJS. Pipes được thực thi sau guards nhưng trước route handler.

**Chức năng của Pipes:**

- **Transformation**: Chuyển đổi dữ liệu từ một format sang format khác (ví dụ: string sang number)
- **Validation**: Kiểm tra tính hợp lệ của dữ liệu đầu vào
- **Type Conversion**: Tự động chuyển đổi kiểu dữ liệu
- **Data Sanitization**: Làm sạch và chuẩn hóa dữ liệu

**Built-in Pipes:**

- **ValidationPipe**: Validate dữ liệu dựa trên decorators và class-validator
- **ParseIntPipe**: Parse string thành integer
- **ParseFloatPipe**: Parse string thành float
- **ParseBoolPipe**: Parse string thành boolean
- **ParseArrayPipe**: Parse và validate arrays
- **ParseUUIDPipe**: Validate UUID format
- **DefaultValuePipe**: Cung cấp giá trị mặc định nếu giá trị không tồn tại

**Pipe Execution:**

Pipes được thực thi theo thứ tự:

1. Global pipes
2. Controller pipes
3. Route pipes
4. Parameter pipes (cho từng parameter cụ thể)

**Interceptors - Bộ Chặn:**

Interceptors là các classes được sử dụng để thêm logic bổ sung vào request/response cycle trong NestJS. Interceptors được thực thi sau guards và pipes, và có thể can thiệp vào cả trước và sau khi route handler được gọi.

**Chức năng của Interceptors:**

- **Logging**: Ghi log requests và responses
- **Caching**: Cache responses để tăng hiệu suất
- **Error Handling**: Xử lý và transform errors
- **Response Transformation**: Thay đổi format của response
- **Performance Monitoring**: Đo lường thời gian thực thi
- **Request/Response Modification**: Thay đổi request hoặc response data

**Interceptor Execution Flow:**

1. **Before Handler**: Logic được thực thi trước khi route handler được gọi
2. **Handler Execution**: Route handler được thực thi
3. **After Handler**: Logic được thực thi sau khi route handler hoàn thành
4. **Response Transformation**: Response có thể được transform trước khi gửi về client

**Exception Filters - Bộ Lọc Ngoại Lệ:**

Exception Filters là các classes được sử dụng để xử lý exceptions được throw trong NestJS application. Exception filters cho phép kiểm soát cách errors được trả về cho client.

**Chức năng của Exception Filters:**

- **Error Formatting**: Định dạng error response theo chuẩn nhất quán
- **Error Logging**: Ghi log errors để debugging
- **Error Transformation**: Chuyển đổi errors thành format phù hợp
- **HTTP Status Codes**: Set appropriate HTTP status codes
- **Error Messages**: Cung cấp error messages có ý nghĩa cho client

**Built-in Exceptions:**

- **BadRequestException**: 400 Bad Request
- **UnauthorizedException**: 401 Unauthorized
- **ForbiddenException**: 403 Forbidden
- **NotFoundException**: 404 Not Found
- **MethodNotAllowedException**: 405 Method Not Allowed
- **NotAcceptableException**: 406 Not Acceptable
- **ConflictException**: 409 Conflict
- **GoneException**: 410 Gone
- **HttpVersionNotSupportedException**: 505 HTTP Version Not Supported
- **PayloadTooLargeException**: 413 Payload Too Large
- **UnsupportedMediaTypeException**: 415 Unsupported Media Type
- **UnprocessableEntityException**: 422 Unprocessable Entity
- **InternalServerErrorException**: 500 Internal Server Error
- **NotImplementedException**: 501 Not Implemented
- **BadGatewayException**: 502 Bad Gateway
- **ServiceUnavailableException**: 503 Service Unavailable
- **GatewayTimeoutException**: 504 Gateway Timeout

**Middleware - Phần Mềm Trung Gian:**

Middleware trong NestJS là các functions hoặc classes được thực thi trước route handlers. Middleware có quyền truy cập vào request object, response object, và next function.

**Chức năng của Middleware:**

- **Request Processing**: Xử lý và modify requests trước khi đến handlers
- **Response Processing**: Xử lý và modify responses trước khi gửi về client
- **Cross-cutting Concerns**: Xử lý các concerns chung như logging, authentication, CORS
- **Request Validation**: Validate requests ở middleware level
- **Rate Limiting**: Giới hạn số lượng requests

**Middleware Types:**

- **Functional Middleware**: Simple functions với signature (req, res, next)
- **Class-based Middleware**: Classes implement NestMiddleware interface
- **Global Middleware**: Middleware áp dụng cho tất cả routes
- **Route-specific Middleware**: Middleware chỉ áp dụng cho routes cụ thể

**Middleware Execution Order:**

1. Global middleware (được đăng ký với app.use())
2. Module-level middleware
3. Route-level middleware
4. Route handlers

**Custom Decorators - Trang Trí Tùy Chỉnh:**

Custom decorators trong NestJS cho phép tạo ra các decorators riêng để extract metadata, inject dependencies, hoặc thêm logic tùy chỉnh.

**Chức năng của Custom Decorators:**

- **Parameter Extraction**: Extract data từ request (headers, query params, body)
- **Metadata Storage**: Lưu trữ metadata cho routes và handlers
- **Dependency Injection**: Tạo custom parameter decorators cho DI
- **Request Context**: Truy cập request context và user information
- **Validation**: Tạo decorators cho validation logic

**Decorator Types:**

- **Parameter Decorators**: Extract và transform parameter values
- **Method Decorators**: Thêm metadata cho methods
- **Class Decorators**: Thêm metadata cho classes
- **Property Decorators**: Thêm metadata cho properties

**Modules - Mô-đun:**

Modules trong NestJS là các classes được sử dụng để tổ chức và đóng gói các components liên quan. Modules là nền tảng của kiến trúc NestJS.

**Chức năng của Modules:**

- **Code Organization**: Tổ chức code theo features hoặc domains
- **Dependency Management**: Quản lý dependencies và providers
- **Encapsulation**: Đóng gói controllers, providers, và imports
- **Reusability**: Modules có thể được import và tái sử dụng
- **Lazy Loading**: Hỗ trợ lazy loading modules để tối ưu performance

**Module Structure:**

- **imports**: Import các modules khác
- **controllers**: Đăng ký controllers trong module
- **providers**: Đăng ký providers (services, repositories) trong module
- **exports**: Export providers để các modules khác sử dụng

**Module Types:**

- **Feature Modules**: Modules cho các features cụ thể (users, products, orders)
- **Shared Modules**: Modules chứa code được chia sẻ giữa nhiều modules
- **Global Modules**: Modules được đăng ký global, không cần import
- **Dynamic Modules**: Modules có thể được cấu hình động

**Providers - Nhà Cung Cấp:**

Providers trong NestJS là các classes có thể được inject vào các classes khác thông qua Dependency Injection. Providers là nền tảng cho việc tạo và quản lý dependencies.

**Chức năng của Providers:**

- **Business Logic**: Chứa business logic của application
- **Data Access**: Truy cập và thao tác với dữ liệu
- **External Services**: Tích hợp với external services và APIs
- **Utilities**: Cung cấp utility functions và helpers
- **Configuration**: Quản lý configuration và settings

**Provider Types:**

- **Services**: Chứa business logic và application services
- **Repositories**: Quản lý data access và database operations
- **Factories**: Tạo instances của classes với logic phức tạp
- **Values**: Cung cấp constant values hoặc configuration
- **Async Providers**: Providers được tạo bất đồng bộ

**Provider Scope:**

- **DEFAULT**: Một instance được tạo và chia sẻ cho toàn bộ application
- **REQUEST**: Một instance mới được tạo cho mỗi request
- **TRANSIENT**: Một instance mới được tạo mỗi lần được inject

**Controllers - Bộ Điều Khiển:**

Controllers trong NestJS là các classes được sử dụng để xử lý HTTP requests và trả về responses. Controllers định nghĩa routes và route handlers.

**Chức năng của Controllers:**

- **Route Definition**: Định nghĩa routes và HTTP methods
- **Request Handling**: Xử lý incoming requests
- **Response Generation**: Tạo và trả về responses
- **Parameter Extraction**: Extract parameters từ requests (body, query, params, headers)
- **Status Codes**: Set HTTP status codes cho responses

**Controller Decorators:**

- **@Controller()**: Đánh dấu class là controller và định nghĩa route prefix
- **@Get()**: Định nghĩa GET route
- **@Post()**: Định nghĩa POST route
- **@Put()**: Định nghĩa PUT route
- **@Delete()**: Định nghĩa DELETE route
- **@Patch()**: Định nghĩa PATCH route
- **@Options()**: Định nghĩa OPTIONS route
- **@Head()**: Định nghĩa HEAD route

**Parameter Decorators:**

- **@Body()**: Extract request body
- **@Param()**: Extract route parameters
- **@Query()**: Extract query parameters
- **@Headers()**: Extract request headers
- **@Ip()**: Extract client IP address
- **@Session()**: Extract session data
- **@HostParam()**: Extract host parameters
- **@Req()**: Access raw request object
- **@Res()**: Access raw response object

### 2.3.3. Express.js

**Express.js** là một web framework nhỏ gọn và linh hoạt cho Node.js, được phát triển bởi TJ Holowaychuk vào năm 2010. Express.js đã trở thành framework phổ biến nhất cho Node.js và là foundation cho nhiều framework khác, bao gồm NestJS.

**Lịch Sử và Tầm Quan Trọng:**

Express.js được tạo ra để đơn giản hóa việc xây dựng web applications và APIs với Node.js. Trước Express.js, việc xây dựng web server với Node.js đòi hỏi nhiều code boilerplate. Express.js cung cấp một abstraction layer trên HTTP module của Node.js, làm cho việc xử lý requests và responses trở nên dễ dàng hơn.

**Kiến Trúc Express.js:**

Express.js được xây dựng trên HTTP module của Node.js và cung cấp:

1. **Request và Response Objects**: Wrapper objects cho Node.js request và response objects với các methods và properties bổ sung.

2. **Routing System**: Hệ thống routing cho phép map URLs đến handlers.

3. **Middleware System**: Hệ thống middleware cho phép xử lý requests qua một chuỗi các functions.

4. **View Engine**: Hỗ trợ template engines để render views.

**Middleware Pattern - Mẫu Middleware:**

Middleware là các functions có quyền truy cập vào request object (req), response object (res), và next function trong chuỗi request-response của ứng dụng.

**Cách Middleware Hoạt Động:**

1. **Request đến**: Khi một HTTP request đến, nó đi qua một chuỗi các middleware functions.

2. **Middleware Execution**: Mỗi middleware có thể:
   - Thực thi code
   - Thay đổi request và response objects
   - Kết thúc request-response cycle
   - Gọi next() để chuyển control sang middleware tiếp theo

3. **Response**: Khi một middleware gửi response, chuỗi middleware kết thúc.

**Types of Middleware:**

1. **Application-level Middleware**: Áp dụng cho toàn bộ application
   - Sử dụng `app.use()` hoặc `app.METHOD()`
   - Thực thi cho mọi request

2. **Router-level Middleware**: Áp dụng cho một router cụ thể
   - Sử dụng `router.use()` hoặc `router.METHOD()`
   - Chỉ thực thi cho requests đến router đó

3. **Error-handling Middleware**: Xử lý errors
   - Có 4 parameters: (err, req, res, next)
   - Phải được đặt sau tất cả các middleware khác

4. **Built-in Middleware**: Middleware được tích hợp sẵn
   - express.json(): Parse JSON bodies
   - express.urlencoded(): Parse URL-encoded bodies
   - express.static(): Serve static files

5. **Third-party Middleware**: Middleware từ cộng đồng
   - cors: Cross-Origin Resource Sharing
   - helmet: Security headers
   - morgan: HTTP request logger
   - compression: Response compression

**Middleware Execution Order:**

Thứ tự của middleware rất quan trọng:

- Middleware được thực thi theo thứ tự được đăng ký
- Middleware đầu tiên được đăng ký sẽ được thực thi đầu tiên
- Nếu một middleware không gọi next(), các middleware sau sẽ không được thực thi

**Routing System - Hệ Thống Định Tuyến:**

Express.js cung cấp một hệ thống routing mạnh mẽ cho phép map HTTP methods và URL patterns đến handlers.

**Route Definition:**

Routes được định nghĩa với pattern:

```javascript
app.METHOD(path, handler);
```

- **METHOD**: HTTP method (get, post, put, delete, etc.)
- **path**: URL path pattern
- **handler**: Function được gọi khi route match

**Route Parameters:**

Routes có thể có parameters:

- `:id`: Named parameter
- `*`: Wildcard
- `?`: Optional parameter

**Route Handlers:**

Route handlers có thể là:

- Single function
- Array of functions
- Combination of functions và arrays

**Route Methods:**

Express.js hỗ trợ tất cả HTTP methods:

- GET: Retrieve resource
- POST: Create resource
- PUT: Update resource
- DELETE: Delete resource
- PATCH: Partial update
- HEAD, OPTIONS, etc.

**Route Paths:**

Route paths có thể là:

- Strings: Exact match
- String patterns: Wildcards
- Regular expressions: Complex patterns

**Request và Response Objects:**

Express.js cung cấp request và response objects với nhiều methods và properties hữu ích.

**Request Object:**

Request object (req) chứa thông tin về HTTP request:

- **req.params**: Route parameters
- **req.query**: Query string parameters
- **req.body**: Request body (với body parser middleware)
- **req.headers**: HTTP headers
- **req.cookies**: Cookies (với cookie parser middleware)
- **req.ip**: Client IP address
- **req.path**: Request path
- **req.method**: HTTP method

**Response Object:**

Response object (res) cung cấp methods để gửi response:

- **res.send()**: Send response
- **res.json()**: Send JSON response
- **res.status()**: Set status code
- **res.redirect()**: Redirect request
- **res.render()**: Render view
- **res.cookie()**: Set cookie
- **res.header()**: Set header

**Template Engines - Công Cụ Mẫu:**

Express.js hỗ trợ nhiều template engines để render dynamic HTML.

**Popular Template Engines:**

1. **EJS (Embedded JavaScript)**: Sử dụng JavaScript syntax
2. **Pug (Jade)**: Indentation-based syntax
3. **Handlebars**: Logic-less templating
4. **Mustache**: Logic-less templating

**Template Engine Integration:**

Template engines được tích hợp với:

- `app.set('view engine', 'ejs')`: Set default engine
- `app.set('views', './views')`: Set views directory
- `res.render('template', data)`: Render template

**Error Handling - Xử Lý Lỗi:**

Express.js cung cấp cơ chế xử lý lỗi tập trung.

**Error-handling Middleware:**

Error-handling middleware có 4 parameters:

- **err**: Error object
- **req**: Request object
- **res**: Response object
- **next**: Next function

**Error Handling Best Practices:**

1. **Synchronous Errors**: Tự động được catch bởi Express
2. **Asynchronous Errors**: Phải được pass đến next()
3. **Error Middleware**: Phải được đặt sau tất cả routes
4. **Error Response**: Gửi appropriate error response

**Security Middleware - Middleware Bảo Mật:**

Express.js ecosystem cung cấp nhiều middleware cho security:

1. **helmet**: Set security HTTP headers
2. **cors**: Configure CORS
3. **express-rate-limit**: Rate limiting
4. **express-validator**: Input validation
5. **express-mongo-sanitize**: Prevent NoSQL injection

**Performance Optimization - Tối Ưu Hiệu Suất:**

Express.js cung cấp và hỗ trợ các kỹ thuật tối ưu:

1. **Compression**: Compress responses với compression middleware
2. **ETags**: Entity tags cho caching
3. **Cluster Mode**: Sử dụng Node.js cluster module
4. **Reverse Proxy**: Sử dụng Nginx làm reverse proxy

**Express.js trong NestJS:**

NestJS sử dụng Express.js làm HTTP adapter mặc định:

- NestJS controllers được compile thành Express.js routes
- NestJS middleware được wrap trong Express middleware
- NestJS có thể tận dụng Express.js ecosystem
- Performance tương đương với Express.js thuần

## 2.4. Framework và Công Nghệ Frontend

### 2.4.1. Vue.js và Nuxt 4

**Vue.js - Progressive JavaScript Framework:**

Vue.js được tạo ra bởi Evan You vào năm 2014 với mục tiêu tạo ra một framework nhẹ, dễ học, và mạnh mẽ. Vue.js được mô tả là "progressive" vì nó có thể được tích hợp từng phần vào các dự án hiện có.

**Lịch Sử và Triết Lý Thiết Kế:**

Vue.js được phát triển sau khi Evan You làm việc với AngularJS tại Google. Anh nhận thấy rằng có thể tạo ra một framework nhẹ hơn và dễ sử dụng hơn. Vue.js kết hợp các ý tưởng tốt nhất từ AngularJS và React, tạo ra một framework độc đáo.

**Triết Lý "Progressive":**

Vue.js được thiết kế để có thể được sử dụng theo nhiều cách:

- Có thể được tích hợp vào một trang HTML đơn giản
- Có thể được sử dụng như một library trong một phần của ứng dụng
- Có thể được sử dụng để xây dựng toàn bộ Single Page Application (SPA)
- Có thể được sử dụng với các công cụ build và frameworks phức tạp

**Reactive Data Binding - Ràng Buộc Dữ Liệu Phản Ứng:**

Vue.js sử dụng một hệ thống reactivity mạnh mẽ để tự động cập nhật DOM khi data thay đổi.

**Reactivity System:**

Vue.js reactivity system hoạt động bằng cách:

1. **Proxy Objects**: Sử dụng JavaScript Proxies để intercept property access
2. **Dependency Tracking**: Theo dõi các dependencies khi data được truy cập
3. **Automatic Updates**: Tự động cập nhật DOM khi dependencies thay đổi

**Two-Way Data Binding:**

Vue.js cung cấp two-way data binding với `v-model` directive:

- Thay đổi trong input tự động cập nhật data
- Thay đổi trong data tự động cập nhật input
- Đơn giản hóa form handling

**Computed Properties:**

Computed properties là các properties được tính toán dựa trên reactive data:

- Chỉ tính toán lại khi dependencies thay đổi
- Cached để tránh tính toán không cần thiết
- Tự động update khi dependencies thay đổi

**Watchers:**

Watchers cho phép thực hiện side effects khi data thay đổi:

- Watch một property cụ thể
- Watch multiple properties
- Deep watching cho nested objects

**Component-Based Architecture - Kiến Trúc Dựa Trên Component:**

Vue.js được xây dựng xung quanh khái niệm components. Components là các đơn vị có thể tái sử dụng, đóng gói HTML, CSS, và JavaScript.

**Component Structure:**

Một Vue component điển hình bao gồm:

- **Template**: HTML markup với Vue directives
- **Script**: JavaScript/TypeScript logic
- **Style**: CSS styling

**Component Communication:**

Components giao tiếp thông qua:

- **Props**: Data truyền từ parent xuống child
- **Events**: Events emit từ child lên parent
- **Provide/Inject**: Dependency injection cho nested components
- **Slots**: Content projection từ parent vào child

**Component Lifecycle:**

Vue components có lifecycle hooks:

- **beforeCreate**: Trước khi instance được tạo
- **created**: Sau khi instance được tạo
- **beforeMount**: Trước khi component được mount vào DOM
- **mounted**: Sau khi component được mount vào DOM
- **beforeUpdate**: Trước khi component được update
- **updated**: Sau khi component được update
- **beforeUnmount**: Trước khi component được unmount
- **unmounted**: Sau khi component được unmount

**Virtual DOM - DOM Ảo:**

Vue.js sử dụng Virtual DOM để tối ưu hóa rendering performance.

**Virtual DOM Concept:**

Virtual DOM là một JavaScript representation của DOM:

- Lighter và faster để manipulate
- Changes được tính toán trong memory
- Chỉ actual DOM changes được apply

**Diffing Algorithm:**

Vue.js sử dụng một diffing algorithm để so sánh Virtual DOM trees:

- So sánh old và new Virtual DOM
- Tính toán minimal changes
- Apply chỉ những changes cần thiết

**Performance Benefits:**

Virtual DOM cung cấp:

- Faster updates: Chỉ update những gì thay đổi
- Batch updates: Group multiple updates
- Optimized rendering: Minimize DOM operations

**Composition API:**

Vue 3 giới thiệu Composition API, một cách mới để tổ chức component logic:

- **setup() function**: Entry point cho Composition API
- **Reactive APIs**: ref(), reactive(), computed(), watch()
- **Lifecycle Hooks**: onMounted(), onUpdated(), etc.
- **Better TypeScript Support**: Improved type inference

**Nuxt 4 - Meta-Framework cho Vue.js:**

Nuxt 4 là một meta-framework được xây dựng trên Vue.js, cung cấp các tính năng bổ sung cho việc xây dựng production-ready applications.

**Lịch Sử và Sự Phát Triển:**

Nuxt được tạo ra vào năm 2016 bởi Sébastien Chopin và Alexandre Chopin. Nuxt 4 là phiên bản mới nhất, được xây dựng trên Vue 3 và Vite.

**Server-Side Rendering (SSR) - Render Phía Server:**

SSR là quá trình render HTML trên server trước khi gửi đến client.

**Lợi Ích của SSR:**

1. **SEO (Search Engine Optimization)**:
   - Search engines có thể crawl và index content
   - Better visibility trên search results
   - Critical cho e-commerce applications

2. **Initial Load Performance**:
   - HTML được render sẵn, giảm thời gian đến First Contentful Paint
   - Better perceived performance
   - Faster Time to Interactive cho content-critical pages

3. **Social Media Sharing**:
   - Social media crawlers có thể read meta tags
   - Better preview cards khi share links
   - Improved social media presence

**SSR Process:**

Quá trình SSR trong Nuxt:

1. Request đến server
2. Nuxt render component tree thành HTML
3. HTML được gửi đến client
4. Client hydrate HTML với JavaScript
5. Application trở nên interactive

**Static Site Generation (SSG) - Tạo Trang Tĩnh:**

SSG là quá trình generate static HTML files tại build time.

**Lợi Ích của SSG:**

1. **Performance**:
   - Extremely fast loading
   - No server processing needed
   - Can be served from CDN

2. **Cost**:
   - No server costs
   - Can host trên static hosting services
   - Lower infrastructure costs

3. **Security**:
   - No server-side vulnerabilities
   - Reduced attack surface
   - Static files are inherently secure

**Incremental Static Regeneration (ISR) - Tái Tạo Tĩnh Tăng Dần:**

ISR là một kỹ thuật kết hợp giữa SSG và SSR, cho phép generate static pages tại build time và regenerate chúng theo yêu cầu hoặc theo lịch trình định kỳ.

**Đặc điểm của ISR:**

- **Initial Generation**: Pages được generate tại build time như SSG
- **On-Demand Regeneration**: Pages có thể được regenerate khi có request đến
- **Background Regeneration**: Regenerate pages trong background mà không block requests
- **Stale-While-Revalidate**: Serve stale content trong khi regenerate page mới
- **Time-based Revalidation**: Regenerate pages sau một khoảng thời gian nhất định

**Lợi Ích của ISR:**

1. **Performance**: Kết hợp tốc độ của static pages với khả năng update content
2. **Scalability**: Có thể handle traffic cao mà không cần server processing cho mỗi request
3. **Fresh Content**: Content có thể được update mà không cần rebuild toàn bộ site
4. **Cost Efficiency**: Giảm server costs trong khi vẫn có dynamic content
5. **SEO**: Tốt cho SEO vì pages được pre-rendered

**ISR Use Cases:**

- E-commerce product pages với pricing thay đổi thường xuyên
- Blog posts cần update content định kỳ
- News sites với content mới nhưng không cần real-time
- Dashboard pages với data thay đổi nhưng không cần instant updates

**Client-Side Rendering (CSR) - Render Phía Client:**

CSR là quá trình render HTML trên client (browser) sử dụng JavaScript. Toàn bộ application được load và render trên client side.

**Đặc điểm của CSR:**

- **Initial Load**: Server trả về minimal HTML với JavaScript bundle
- **Client Rendering**: JavaScript render toàn bộ UI trên client
- **API Calls**: Application gọi APIs để fetch data
- **No Server Processing**: Server chỉ serve static files và APIs

**Lợi Ích của CSR:**

1. **Interactivity**: Highly interactive applications với rich user experience
2. **Reduced Server Load**: Server không cần process rendering
3. **Fast Navigation**: Client-side routing rất nhanh
4. **Offline Support**: Có thể hoạt động offline với service workers

**Hạn chế của CSR:**

1. **SEO**: Search engines có thể không index content được render bởi JavaScript
2. **Initial Load**: Initial load time có thể chậm với large JavaScript bundles
3. **First Contentful Paint**: Time to first contentful paint có thể chậm

**Server Fetch - Lấy Dữ Liệu Phía Server:**

Server fetch trong Nuxt là quá trình fetch data trên server side (trong quá trình SSR hoặc SSG) trước khi render page.

**Đặc điểm của Server Fetch:**

- **Server Execution**: Data được fetch trên server, không phải client
- **Pre-rendering**: Data được fetch trước khi render HTML
- **SEO Friendly**: Data được include trong initial HTML
- **Performance**: Giảm số lượng API calls từ client
- **Security**: API keys và sensitive data không expose đến client

**Server Fetch Methods:**

- **useFetch()**: Universal fetch composable hoạt động trên cả server và client
- **useAsyncData()**: Wrapper cho async data fetching với caching
- **$fetch()**: Direct fetch function có thể được sử dụng trong server context
- **useLazyFetch()**: Lazy version của useFetch, không block navigation
- **useLazyAsyncData()**: Lazy version của useAsyncData

**Server Fetch Benefits:**

1. **SEO**: Data được include trong HTML, tốt cho SEO
2. **Performance**: Faster initial page load vì data đã được fetch
3. **Security**: Sensitive operations có thể được thực hiện trên server
4. **Caching**: Server-side caching có thể được implement
5. **Reduced Client Load**: Giảm số lượng requests từ client

**Client Fetch - Lấy Dữ Liệu Phía Client:**

Client fetch trong Nuxt là quá trình fetch data trên client side (browser) sau khi page đã được load.

**Đặc điểm của Client Fetch:**

- **Client Execution**: Data được fetch trong browser
- **Post-render**: Data được fetch sau khi page đã render
- **Interactive**: Có thể trigger fetch dựa trên user interactions
- **Real-time**: Có thể fetch data real-time với polling hoặc WebSockets

**Client Fetch Use Cases:**

- **User Interactions**: Fetch data khi user click button hoặc submit form
- **Real-time Updates**: Poll APIs để update data real-time
- **Infinite Scroll**: Load more data khi user scroll
- **Search**: Fetch search results khi user type
- **Filters**: Fetch filtered data khi user apply filters

**Fetch Composables:**

- **useFetch()**: Universal composable, tự động detect server/client context
- **$fetch()**: Direct fetch function, có thể được sử dụng ở bất kỳ đâu
- **useAsyncData()**: Wrapper cho async operations với state management
- **refreshCookie()**: Refresh cookies sau khi fetch
- **clearNuxtData()**: Clear cached data

**Fetch Options:**

- **server**: Chỉ fetch trên server (default: true)
- **client**: Chỉ fetch trên client (default: true)
- **lazy**: Không block navigation, fetch trong background
- **default**: Default value trong khi fetching
- **transform**: Transform data sau khi fetch
- **watch**: Watch reactive sources và refetch khi thay đổi
- **immediate**: Fetch ngay lập tức (default: true)
- **getCachedData**: Get cached data nếu available

**Data Fetching Strategies:**

1. **Server-Only Fetch**: Fetch chỉ trên server, data được include trong HTML
2. **Client-Only Fetch**: Fetch chỉ trên client, sau khi page load
3. **Universal Fetch**: Fetch trên cả server và client, với hydration
4. **Lazy Fetch**: Fetch trong background, không block rendering
5. **Reactive Fetch**: Refetch khi dependencies thay đổi

**Hybrid Rendering:**

Nuxt 4 hỗ trợ hybrid rendering:

- Một số pages có thể là SSR
- Một số pages có thể là SSG
- Một số pages có thể là CSR (Client-Side Rendering)
- Flexibility để optimize từng page

**File-Based Routing - Định Tuyến Dựa Trên File:**

Nuxt 4 tự động tạo routes dựa trên cấu trúc thư mục `pages/`.

**Routing Rules:**

- `pages/index.vue` → `/`
- `pages/about.vue` → `/about`
- `pages/products/index.vue` → `/products`
- `pages/products/[id].vue` → `/products/:id`
- `pages/products/[id]/reviews.vue` → `/products/:id/reviews`

**Dynamic Routes:**

- `[id].vue`: Single dynamic parameter
- `[slug].vue`: Named dynamic parameter
- `[...slug].vue`: Catch-all route
- `[[slug]].vue`: Optional catch-all route

**Nested Routes:**

Nested routes được tạo với:

- Parent component với `<NuxtPage />`
- Child components trong subdirectories
- Automatic route nesting

**Route Middleware:**

Route middleware cho phép:

- Authentication checks
- Authorization checks
- Redirects
- Data fetching

**Auto-Imports - Tự Động Import:**

Nuxt 4 tự động import components, composables, và utilities.

**Auto-Imported Components:**

- Components trong `components/` được auto-import
- Không cần import statements
- TypeScript support đầy đủ
- Tree-shaking cho unused components

**Auto-Imported Composables:**

- Composables trong `composables/` được auto-import
- Global composables available everywhere
- Type-safe với TypeScript

**Auto-Imported Utilities:**

- Utilities trong `utils/` được auto-import
- Helper functions available globally
- Consistent API

**Nuxt Modules - Mô-đun Nuxt:**

Nuxt modules là các packages mở rộng chức năng của Nuxt:

- Official modules từ Nuxt team
- Community modules
- Custom modules

**Popular Nuxt Modules:**

- @nuxtjs/axios: HTTP client
- @nuxtjs/auth: Authentication
- @nuxtjs/pwa: Progressive Web App
- @nuxtjs/i18n: Internationalization
- @nuxtjs/sitemap: Sitemap generation

**Build System - Hệ Thống Build:**

Nuxt 4 sử dụng Vite làm build tool mặc định.

**Vite Integration:**

- Fast HMR (Hot Module Replacement)
- Fast builds
- Optimized production builds
- Native ES modules support

**Build Optimizations:**

- Code splitting tự động
- Tree shaking
- Asset optimization
- Image optimization

### 2.4.2. Nuxt UI Component Library

**Nuxt UI** là một thư viện component được xây dựng trên:

- **Reka UI**: Cung cấp các primitive components với khả năng truy cập (accessibility) tích hợp sẵn.
- **Tailwind CSS**: Styling utility-first.
- **Tailwind Variants**: Quản lý biến thể component.

**Đặc điểm**:

- Hơn 100 component sẵn sàng sử dụng
- TypeScript support đầy đủ
- Accessibility (WAI-ARIA) tuân thủ
- Design system nhất quán

## 2.5. Cơ Sở Dữ Liệu và Caching

### 2.5.1. PostgreSQL - Hệ Quản Trị Cơ Sở Dữ Liệu

**PostgreSQL** là một object-relational database management system (ORDBMS) mã nguồn mở và mạnh mẽ, được phát triển từ dự án POSTGRES tại Đại học California, Berkeley vào những năm 1980. PostgreSQL đã trở thành một trong những database phổ biến nhất cho các ứng dụng enterprise.

**PostgreSQL Architecture - Kiến Trúc:**

PostgreSQL sử dụng client-server architecture với multiple processes:

- **Postmaster Process**: Main process quản lý connections và spawns backend processes. Postmaster listen cho incoming connections và create backend process cho each connection.

- **Backend Processes**: Backend processes handle individual client connections. Each connection có own backend process để execute queries và manage transactions.

- **Background Processes**: Background processes handle maintenance tasks như:
  - **Writer Process (WAL Writer)**: Write WAL (Write-Ahead Log) records to disk
  - **Checkpointer Process**: Write dirty pages từ shared buffers to disk
  - **Autovacuum Process**: Automatically vacuum và analyze tables
  - **Stats Collector**: Collect statistics về database activity
  - **Logger Process**: Write log messages to log files

- **Shared Memory**: Shared memory stores:
  - **Shared Buffers**: Cache frequently accessed data pages
  - **WAL Buffers**: Buffer WAL records trước khi write to disk
  - **Lock Tables**: Track locks trên database objects
  - **Process Arrays**: Information về all processes

**PostgreSQL Storage System - Hệ Thống Lưu Trữ:**

- **Tablespaces**: Tablespaces define locations cho database objects. Tablespaces enable data distribution across multiple disks.

- **Databases**: Databases are logical containers cho schemas và objects. Each database có own system catalogs và settings.

- **Schemas**: Schemas are logical containers cho tables, functions, và other objects. Schemas enable namespace organization.

- **Tables**: Tables store data trong rows và columns. Tables có associated storage files (heap files) và indexes.

- **Pages**: Pages are fixed-size blocks (default 8KB) trong storage files. Pages are smallest unit của I/O operations.

- **Tuples (Rows)**: Tuples are individual rows trong tables. Tuples are stored trong pages với overhead cho headers và alignment.

**PostgreSQL Query Processing - Xử Lý Truy Vấn:**

**1. Query Parsing:**

- **Lexical Analysis**: Parse SQL string thành tokens. Lexical analysis identify keywords, identifiers, operators, và literals.

- **Syntax Analysis**: Build parse tree từ tokens. Syntax analysis validate SQL syntax và structure.

- **Semantic Analysis**: Validate semantics của query. Semantic analysis check table existence, column references, và type compatibility.

**2. Query Planning:**

- **Query Rewrite**: Rewrite query với rule-based optimization. Query rewrite apply views, rules, và transformations.

- **Query Optimization**: Generate optimal execution plan. Optimization consider multiple plans và choose best based on cost estimates.

- **Cost Estimation**: Estimate cost của different plans. Cost estimation use statistics về table sizes, indexes, và data distribution.

**3. Query Execution:**

- **Plan Execution**: Execute plan với appropriate algorithms. Execution use sequential scans, index scans, joins, và aggregations.

- **Result Return**: Return results to client. Results are streamed hoặc buffered based on query type.

**PostgreSQL Indexing - Lập Chỉ Mục:**

**Index Types:**

- **B-Tree Indexes**: Default index type cho most queries. B-Tree indexes support equality và range queries efficiently. B-Tree indexes are balanced trees với logarithmic search time.

- **Hash Indexes**: Hash indexes support only equality queries. Hash indexes provide O(1) lookup time cho exact matches. Hash indexes are faster cho equality queries nhưng limited functionality.

- **GiST (Generalized Search Tree) Indexes**: GiST indexes support custom data types và operators. GiST indexes enable full-text search, geometric data, và other advanced features.

- **GIN (Generalized Inverted Index) Indexes**: GIN indexes support array, JSONB, và full-text search. GIN indexes enable fast lookups trong complex data structures.

- **BRIN (Block Range Index) Indexes**: BRIN indexes are space-efficient cho large tables. BRIN indexes store summary information về page ranges và enable fast range queries.

**Index Strategies:**

- **Primary Key Indexes**: Automatically created cho primary keys. Primary key indexes ensure uniqueness và enable fast lookups.

- **Foreign Key Indexes**: Should be created cho foreign keys. Foreign key indexes improve join performance và constraint checking.

- **Composite Indexes**: Indexes trên multiple columns. Composite indexes support queries với multiple WHERE conditions. Column order matters trong composite indexes.

- **Partial Indexes**: Indexes trên subset of rows. Partial indexes reduce index size và improve performance cho filtered queries.

- **Covering Indexes**: Indexes include all columns needed cho query. Covering indexes enable index-only scans và avoid table access.

**Index Maintenance:**

- **VACUUM**: VACUUM reclaim storage từ deleted rows. VACUUM update statistics và enable index reuse.

- **REINDEX**: REINDEX rebuild indexes từ scratch. REINDEX fix index corruption và improve performance.

- **ANALYZE**: ANALYZE update statistics về table data. Statistics enable query planner to choose optimal plans.

**PostgreSQL Query Optimization - Tối Ưu Truy Vấn:**

**Query Planner:**

- **Cost-Based Optimization**: Planner estimate cost của different plans. Cost estimation consider I/O, CPU, và memory usage.

- **Statistics**: Planner use statistics về table sizes, column distributions, và index usage. Statistics enable accurate cost estimation.

- **Join Strategies**: Planner choose join algorithms:
  - **Nested Loop Join**: Efficient cho small tables
  - **Hash Join**: Efficient cho large tables với equality joins
  - **Merge Join**: Efficient cho sorted data

**Query Optimization Techniques:**

- **Index Usage**: Use indexes để avoid sequential scans. Index scans are much faster cho selective queries.

- **Query Rewriting**: Rewrite queries để use indexes effectively. Query rewriting enable index usage cho transformed queries.

- **Join Ordering**: Optimize join order để minimize intermediate result sizes. Join ordering significantly impact query performance.

- **Predicate Pushdown**: Push predicates down to reduce data early. Predicate pushdown reduce data processing.

- **Projection Pushdown**: Select only needed columns early. Projection pushdown reduce data transfer và memory usage.

**EXPLAIN và Query Analysis:**

- **EXPLAIN**: Show query execution plan. EXPLAIN help understand how query will be executed.

- **EXPLAIN ANALYZE**: Execute query và show actual execution statistics. EXPLAIN ANALYZE provide real performance data.

- **Query Profiling**: Profile queries để identify bottlenecks. Profiling enable targeted optimization.

**PostgreSQL Transactions - Giao Dịch:**

**Transaction Properties:**

- **ACID Compliance**: PostgreSQL fully support ACID properties. ACID ensure data consistency và reliability.

- **Isolation Levels**: PostgreSQL support multiple isolation levels:
  - **READ UNCOMMITTED**: Lowest isolation, allow dirty reads
  - **READ COMMITTED**: Default isolation, prevent dirty reads
  - **REPEATABLE READ**: Prevent non-repeatable reads
  - **SERIALIZABLE**: Highest isolation, prevent all anomalies

**Transaction Management:**

- **BEGIN**: Start new transaction. BEGIN mark start of transaction boundary.

- **COMMIT**: Commit transaction và make changes permanent. COMMIT ensure all changes are durable.

- **ROLLBACK**: Rollback transaction và discard changes. ROLLBACK restore database to state before transaction.

- **SAVEPOINT**: Create savepoint trong transaction. SAVEPOINT enable partial rollback.

**Concurrency Control:**

- **MVCC**: Multi-Version Concurrency Control enable concurrent access. MVCC use versioning để avoid locking.

- **Locking**: PostgreSQL use locks cho concurrent access control. Locks prevent conflicts và ensure consistency.

- **Deadlock Detection**: PostgreSQL automatically detect và resolve deadlocks. Deadlock detection prevent system hangs.

**PostgreSQL Performance Tuning - Điều Chỉnh Hiệu Năng:**

**Configuration Parameters:**

- **shared_buffers**: Size of shared memory buffer pool. shared_buffers should be 25% of RAM cho dedicated database server.

- **effective_cache_size**: Estimate of memory available cho caching. effective_cache_size help planner choose optimal plans.

- **work_mem**: Memory available cho sort và hash operations. work_mem impact performance của complex queries.

- **maintenance_work_mem**: Memory available cho maintenance operations. maintenance_work_mem improve VACUUM và CREATE INDEX performance.

- **checkpoint_segments**: Number of WAL segments between checkpoints. Checkpoint frequency impact write performance.

**Monitoring và Maintenance:**

- **pg_stat_statements**: Track query statistics. pg_stat_statements identify slow queries và optimization opportunities.

- **pg_stat_activity**: Monitor active connections và queries. pg_stat_activity enable real-time monitoring.

- **VACUUM**: Regular VACUUM maintain database health. VACUUM reclaim space và update statistics.

- **ANALYZE**: Regular ANALYZE update statistics. Statistics enable optimal query planning.

**Lịch Sử và Sự Phát Triển:**

PostgreSQL bắt đầu như một dự án nghiên cứu tại UC Berkeley vào năm 1986. Dự án ban đầu được gọi là POSTGRES, sau đó được đổi tên thành PostgreSQL để phản ánh sự hỗ trợ SQL. PostgreSQL đã phát triển qua nhiều thập kỷ và hiện tại là một trong những database tiên tiến nhất.

**Đặc Điểm Nổi Bật:**

PostgreSQL được biết đến với:

- **Open Source**: Mã nguồn mở và miễn phí
- **Advanced Features**: Nhiều tính năng nâng cao
- **Standards Compliance**: Tuân thủ SQL standards
- **Extensibility**: Dễ dàng mở rộng
- **Performance**: Hiệu suất cao
- **Reliability**: Độ tin cậy cao

**ACID Compliance - Tuân Thủ ACID:**

ACID là một tập hợp các thuộc tính đảm bảo reliability của database transactions.

**Atomicity - Tính Nguyên Tử:**

Atomicity đảm bảo rằng tất cả operations trong một transaction được thực thi như một đơn vị duy nhất:

- Tất cả operations succeed, hoặc
- Tất cả operations fail và được rollback
- Không có partial updates
- Database luôn ở trạng thái consistent

**Consistency - Tính Nhất Quán:**

Consistency đảm bảo rằng database chuyển từ một trạng thái consistent này sang một trạng thái consistent khác:

- Tất cả constraints được enforce
- Tất cả rules được validate
- Data integrity được maintain
- Không có invalid states

**Isolation - Tính Cô Lập:**

Isolation đảm bảo rằng concurrent transactions không interfere với nhau:

- Mỗi transaction thấy một consistent view của data
- Transactions không thấy uncommitted changes từ transactions khác
- Different isolation levels cung cấp different guarantees
- Balance giữa consistency và performance

**Durability - Tính Bền Vững:**

Durability đảm bảo rằng committed changes persist ngay cả sau system failures:

- Changes được write vào persistent storage
- WAL (Write-Ahead Logging) đảm bảo durability
- Recovery mechanisms đảm bảo data không bị mất
- Crash recovery tự động

**MVCC (Multi-Version Concurrency Control) - Điều Khiển Đồng Thời Đa Phiên Bản:**

MVCC là một kỹ thuật cho phép nhiều transactions truy cập database đồng thời mà không cần locking.

**Cách MVCC Hoạt Động:**

1. **Versioning**: Mỗi row có thể có nhiều versions
2. **Snapshot Isolation**: Mỗi transaction thấy một snapshot của data tại thời điểm bắt đầu
3. **Write Operations**: Write operations tạo versions mới thay vì overwrite versions cũ
4. **Read Operations**: Read operations đọc versions phù hợp với snapshot
5. **Cleanup**: Old versions được cleanup khi không còn cần thiết

**Lợi Ích của MVCC:**

- **Concurrent Reads và Writes**: Reads không block writes và ngược lại
- **No Read Locks**: Reads không cần locks
- **Better Performance**: Ít locking conflicts
- **Snapshot Consistency**: Mỗi transaction thấy consistent data

**Advanced Data Types - Các Kiểu Dữ Liệu Nâng Cao:**

PostgreSQL hỗ trợ nhiều data types nâng cao mà các databases khác không có.

**JSON và JSONB:**

- **JSON**: Text-based JSON storage
- **JSONB**: Binary JSON storage với indexing
- **JSON Operators**: Operators cho querying JSON
- **JSON Functions**: Functions cho manipulating JSON
- **Indexing**: GIN indexes cho JSONB

**Arrays:**

- **Array Types**: Arrays của any type
- **Array Operators**: Operators cho array operations
- **Array Functions**: Functions cho array manipulation
- **Multidimensional Arrays**: Support cho multidimensional arrays

**Custom Types:**

- **Composite Types**: User-defined composite types
- **Enum Types**: Enumerated types
- **Domain Types**: Types với constraints
- **Range Types**: Range data types

**Geometric Types:**

- **Point, Line, Polygon**: Geometric shapes
- **Circle, Box**: More geometric shapes
- **Operators**: Geometric operators
- **Indexes**: GiST indexes cho geometric data

**Network Types:**

- **INET, CIDR**: IP addresses
- **MACADDR**: MAC addresses
- **Operators**: Network operators
- **Functions**: Network functions

**Full-Text Search - Tìm Kiếm Toàn Văn:**

PostgreSQL cung cấp full-text search capabilities tích hợp.

**Text Search Types:**

- **tsvector**: Normalized document representation
- **tsquery**: Search query representation
- **rank**: Ranking functions
- **weights**: Weighted search

**Full-Text Search Process:**

1. **Parsing**: Parse text thành tokens
2. **Normalization**: Normalize tokens
3. **Indexing**: Create tsvector
4. **Searching**: Search với tsquery
5. **Ranking**: Rank results

**Full-Text Search Features:**

- **Language Support**: Support nhiều languages
- **Stemming**: Word stemming
- **Stop Words**: Stop word removal
- **Phrase Search**: Exact phrase matching
- **Boolean Operators**: AND, OR, NOT
- **Proximity Search**: Word proximity

**Extensibility - Khả Năng Mở Rộng:**

PostgreSQL có kiến trúc extensible cho phép thêm functionality.

**Extension System:**

- **Extensions**: Packages của functionality
- **CREATE EXTENSION**: Install extensions
- **Popular Extensions**: PostGIS, pg_trgm, hstore
- **Custom Extensions**: Create custom extensions

**Custom Functions:**

- **PL/pgSQL**: Procedural language
- **PL/Python**: Python functions
- **PL/Perl**: Perl functions
- **C Functions**: C language functions

**Custom Operators:**

- **Operator Overloading**: Overload existing operators
- **New Operators**: Define new operators
- **Operator Classes**: Define operator behavior

**Custom Index Types:**

- **GiST**: Generalized Search Tree
- **GIN**: Generalized Inverted Index
- **SP-GiST**: Space-Partitioned GiST
- **BRIN**: Block Range Index
- **Custom Indexes**: Create custom index types

**Performance Features - Tính Năng Hiệu Suất:**

**Query Optimization:**

- **Query Planner**: Advanced query planner
- **Cost-Based Optimization**: Cost-based optimization
- **Statistics**: Table và column statistics
- **EXPLAIN**: Query analysis tool

**Indexing:**

- **Multiple Index Types**: B-tree, Hash, GiST, GIN, SP-GiST, BRIN
- **Partial Indexes**: Indexes trên subset của rows
- **Expression Indexes**: Indexes trên expressions
- **Composite Indexes**: Indexes trên multiple columns

**Partitioning:**

- **Table Partitioning**: Partition large tables
- **Range Partitioning**: Partition by ranges
- **List Partitioning**: Partition by lists
- **Hash Partitioning**: Partition by hash

**Parallel Query Execution:**

- **Parallel Scans**: Parallel table scans
- **Parallel Joins**: Parallel joins
- **Parallel Aggregation**: Parallel aggregation
- **Configurable**: Configurable parallelism

### 2.5.2. Redis

**Redis** (Remote Dictionary Server) là một in-memory data structure store mã nguồn mở, được phát triển bởi Salvatore Sanfilippo vào năm 2009. Redis được sử dụng như một database, cache, message broker, và queue.

**Lịch Sử và Đặc Điểm:**

Redis được tạo ra để giải quyết vấn đề hiệu suất của các ứng dụng web cần truy cập dữ liệu cực nhanh. Redis lưu trữ dữ liệu trong RAM, cho phép truy cập dữ liệu với tốc độ cực nhanh (microseconds) so với disk-based databases (milliseconds).

**In-Memory Storage - Lưu Trữ Trong Bộ Nhớ:**

Redis lưu trữ toàn bộ dataset trong RAM (Random Access Memory), cho phép:

- **Tốc Độ Cực Nhanh**: Truy cập dữ liệu trong microseconds thay vì milliseconds
- **Throughput Cao**: Có thể xử lý hàng trăm nghìn operations mỗi giây
- **Low Latency**: Độ trễ cực thấp cho read và write operations
- **Atomic Operations**: Tất cả operations đều atomic, đảm bảo consistency

**Trade-offs của In-Memory Storage:**

- **Cost**: RAM đắt hơn disk storage
- **Volatility**: Dữ liệu có thể mất khi server restart (nếu không có persistence)
- **Size Limitations**: Bị giới hạn bởi dung lượng RAM
- **Persistence Overhead**: Cần cơ chế persistence để đảm bảo durability

**Data Structures - Cấu Trúc Dữ Liệu:**

Redis hỗ trợ nhiều cấu trúc dữ liệu phong phú, mỗi loại phù hợp cho các use cases khác nhau:

**1. Strings - Chuỗi:**

Strings là cấu trúc dữ liệu cơ bản nhất trong Redis, có thể lưu trữ:

- Text strings
- Binary data
- Numbers (integers, floats)
- JSON strings

**Operations:**

- GET, SET: Đọc và ghi giá trị
- INCR, DECR: Tăng/giảm số nguyên
- APPEND: Nối thêm vào string
- GETRANGE, SETRANGE: Thao tác với substring

**Use Cases:**

- Cache simple values
- Counters
- Session data
- Configuration values

**2. Lists - Danh Sách:**

Lists là các collections có thứ tự của strings, tương tự như arrays hoặc linked lists.

**Operations:**

- LPUSH, RPUSH: Thêm vào đầu/cuối list
- LPOP, RPOP: Lấy và xóa từ đầu/cuối list
- LRANGE: Lấy một range của elements
- LINDEX: Lấy element tại index cụ thể

**Use Cases:**

- Message queues
- Activity feeds
- Recent items lists
- Task queues

**3. Sets - Tập Hợp:**

Sets là collections không có thứ tự của unique strings, tương tự như mathematical sets.

**Operations:**

- SADD: Thêm members vào set
- SMEMBERS: Lấy tất cả members
- SINTER, SUNION, SDIFF: Set operations (intersection, union, difference)
- SISMEMBER: Kiểm tra membership

**Use Cases:**

- Tags
- Unique user IDs
- Blacklists/whitelists
- Social graph (followers, following)

**4. Sorted Sets - Tập Hợp Có Thứ Tự:**

Sorted sets là sets với scores (điểm số) gắn với mỗi member, được sắp xếp theo score.

**Operations:**

- ZADD: Thêm members với scores
- ZRANGE: Lấy members theo rank
- ZRANGEBYSCORE: Lấy members theo score range
- ZRANK: Lấy rank của member

**Use Cases:**

- Leaderboards
- Rankings
- Time-series data
- Priority queues

**5. Hashes - Bảng Băm:**

Hashes là maps giữa string fields và string values, tương tự như objects hoặc dictionaries.

**Operations:**

- HSET, HGET: Set và get field values
- HGETALL: Lấy tất cả fields và values
- HMSET, HMGET: Set và get multiple fields
- HINCRBY: Tăng giá trị số của field

**Use Cases:**

- User profiles
- Product information
- Configuration objects
- Caching structured data

**6. Bitmaps - Bản Đồ Bit:**

Bitmaps là strings được xử lý như arrays of bits, cho phép thao tác bit-level.

**Operations:**

- SETBIT, GETBIT: Set và get bit tại position
- BITCOUNT: Đếm số bits được set
- BITOP: Bitwise operations (AND, OR, XOR, NOT)

**Use Cases:**

- User activity tracking
- Feature flags
- Real-time analytics
- Bloom filters

**7. Streams - Luồng Dữ Liệu:**

Streams là cấu trúc dữ liệu log-like, cho phép append-only operations và consumer groups.

**Operations:**

- XADD: Thêm entry vào stream
- XREAD: Đọc entries từ stream
- XGROUP: Quản lý consumer groups
- XACK: Acknowledge processed messages

**Use Cases:**

- Event sourcing
- Message queues
- Activity logs
- Real-time data processing

**Persistence - Tính Bền Vững:**

Mặc dù Redis là in-memory database, nó cung cấp các cơ chế persistence để đảm bảo dữ liệu không bị mất khi server restart.

**1. RDB (Redis Database Backup) - Snapshot:**

RDB là cơ chế snapshot, tạo point-in-time snapshots của dataset.

**Cách Hoạt Động:**

- Redis fork một child process
- Child process serialize dataset vào RDB file
- RDB file được lưu trên disk
- Parent process tiếp tục serve requests

**Cấu Hình:**

- `save <seconds> <changes>`: Tự động save khi có số lượng changes trong khoảng thời gian
- `save ""`: Tắt automatic saves
- `SAVE`: Save ngay lập tức (blocking)
- `BGSAVE`: Save trong background (non-blocking)

**Ưu Điểm:**

- Compact file size
- Fast recovery
- Minimal performance impact
- Good cho disaster recovery

**Nhược Điểm:**

- Có thể mất dữ liệu giữa các snapshots
- Fork có thể tốn thời gian với large datasets

**2. AOF (Append-Only File) - Chỉ Ghi Thêm:**

AOF ghi lại tất cả write operations vào log file, tương tự như write-ahead log.

**Cách Hoạt Động:**

- Mỗi write operation được append vào AOF file
- Redis có thể replay AOF file để reconstruct dataset
- AOF file được fsync theo cấu hình

**Cấu Hình fsync:**

- `always`: Fsync sau mỗi write (safest, slowest)
- `everysec`: Fsync mỗi giây (balanced)
- `no`: OS quyết định khi fsync (fastest, less safe)

**Ưu Điểm:**

- Durability cao hơn RDB
- Có thể recover đến exact state
- Human-readable format
- Automatic rewriting để compact

**Nhược Điểm:**

- File size lớn hơn RDB
- Recovery chậm hơn RDB
- Có thể có performance impact với fsync always

**3. Hybrid Approach - Cách Tiếp Cận Kết Hợp:**

Có thể sử dụng cả RDB và AOF cùng lúc:

- RDB cho fast recovery và backups
- AOF cho durability và exact recovery
- Redis ưu tiên AOF khi cả hai đều có

**Replication - Sao Chép:**

Redis hỗ trợ master-slave replication để tạo multiple copies của dataset.

**Cách Hoạt Động:**

1. **Master-Slave Setup:**
   - Master xử lý tất cả write operations
   - Slaves replicate data từ master
   - Slaves có thể serve read requests

2. **Replication Process:**
   - Slave kết nối đến master
   - Master gửi RDB snapshot cho slave
   - Master tiếp tục gửi write commands cho slave
   - Slave apply commands để sync với master

3. **Partial Resynchronization:**
   - Khi slave reconnect, master chỉ gửi missing commands
   - Sử dụng replication backlog để store recent commands
   - Faster than full resync

**Lợi Ích:**

- **High Availability**: Nếu master fails, slave có thể promote thành master
- **Read Scaling**: Slaves có thể serve read requests
- **Backup**: Slaves có thể được sử dụng cho backups
- **Geographic Distribution**: Slaves có thể ở các locations khác nhau

**Clustering - Cụm:**

Redis Cluster cho phép horizontal scaling bằng cách phân phối data across multiple nodes.

**Cách Hoạt Động:**

1. **Hash Slots:**
   - Dataset được chia thành 16384 hash slots
   - Mỗi key được map đến một hash slot
   - Mỗi node quản lý một subset của hash slots

2. **Data Distribution:**
   - Keys được hash để xác định hash slot
   - Hash slot được map đến node
   - Client tự động route requests đến correct node

3. **High Availability:**
   - Mỗi node có replicas
   - Nếu master node fails, replica được promote
   - Cluster tiếp tục hoạt động với remaining nodes

**Lợi Ích:**

- **Horizontal Scaling**: Có thể thêm nodes để scale
- **High Availability**: Automatic failover
- **No Single Point of Failure**: Cluster có thể survive node failures
- **Linear Performance**: Performance tăng tuyến tính với số nodes

**Sử Dụng Trong Dự Án:**

**1. Caching - Bộ Nhớ Đệm:**

Redis được sử dụng để cache các queries và responses thường xuyên được truy cập:

- **Product Data**: Cache thông tin sản phẩm với TTL phù hợp
- **Category Trees**: Cache cấu trúc danh mục đa cấp
- **Search Results**: Cache kết quả tìm kiếm phổ biến
- **API Responses**: Cache responses của các API endpoints

**Cache-Aside Pattern:**

1. Application kiểm tra cache trước
2. Nếu cache hit, trả về data từ cache
3. Nếu cache miss, query database
4. Store result trong cache với TTL
5. Trả về data

**Cache Invalidation:**

- Invalidate cache khi data changes
- TTL-based expiration
- Event-based invalidation
- Manual invalidation cho admin operations

**2. Session Management - Quản Lý Phiên:**

Redis lưu trữ session data trong distributed systems:

- **Session Storage**: Lưu trữ session data với session ID làm key
- **Session Expiration**: Tự động expire sessions sau thời gian không hoạt động
- **Distributed Sessions**: Sessions có thể được truy cập từ bất kỳ server nào
- **Session Refresh**: Extend session expiration khi có activity

**Session Structure:**

- Key: `session:{sessionId}`
- Value: JSON object chứa user data, preferences, cart data
- TTL: 24 giờ (có thể refresh)

**3. Rate Limiting - Giới Hạn Tỷ Lệ:**

Redis được sử dụng để implement rate limiting:

- **Sliding Window**: Track requests trong time window
- **Token Bucket**: Implement token bucket algorithm
- **IP-based Limiting**: Limit requests per IP address
- **User-based Limiting**: Limit requests per user

**4. Real-time Features - Tính Năng Thời Gian Thực:**

Redis hỗ trợ real-time features:

- **Pub/Sub**: Publish-subscribe messaging
- **Streams**: Event streaming và processing
- **Sorted Sets**: Real-time leaderboards
- **Lists**: Real-time activity feeds

**5. Distributed Locks - Khóa Phân Tán:**

Redis có thể được sử dụng để implement distributed locks:

- **SET NX EX**: Set key nếu không tồn tại với expiration
- **Redlock Algorithm**: Distributed lock algorithm
- **Prevent Race Conditions**: Ensure exclusive access to resources
- **Automatic Release**: Locks tự động release khi expire

## 2.6. ORM và Quản Lý Dữ Liệu

### 2.6.1. TypeORM Query Builder - Xây Dựng Truy Vấn

**TypeORM Query Builder - Tổng Quan:**

TypeORM Query Builder là một powerful tool cho phép build complex SQL queries programmatically. Query Builder provide type-safe và flexible way để construct queries từ simple SELECT statements đến complex JOINs, subqueries, và aggregations.

**Query Builder vs Repository Methods:**

- **Repository Methods**: Repository methods provide simple CRUD operations với predefined methods. Repository methods are convenient cho common operations nhưng limited cho complex queries.

- **Query Builder**: Query Builder provide full control over query construction. Query Builder enable complex queries với joins, subqueries, aggregations, và custom SQL. Query Builder is more flexible nhưng require more code.

**Khi Nào Sử Dụng Query Builder:**

- Complex queries với multiple joins
- Dynamic queries với conditional logic
- Aggregations và grouping
- Subqueries và CTEs (Common Table Expressions)
- Performance-critical queries cần optimization
- Queries với complex WHERE conditions

**Query Builder API - Các Phương Thức Chính:**

**1. SELECT Queries - Truy Vấn Chọn:**

- **createQueryBuilder()**: Create new query builder instance. Method return QueryBuilder instance để chain methods.

- **select()**: Specify columns để select. Method accept column names, aliases, hoặc expressions. Multiple columns có thể be specified.

- **from()**: Specify table hoặc entity để query. Method accept entity class hoặc table name. From clause define main table cho query.

- **where()**: Add WHERE conditions. Method accept conditions, parameters, và operators. Multiple conditions có thể be combined với AND/OR.

- **andWhere()**: Add additional WHERE conditions với AND operator. Method combine conditions với existing WHERE clause.

- **orWhere()**: Add additional WHERE conditions với OR operator. Method combine conditions với existing WHERE clause.

**2. JOIN Operations - Các Phép Nối:**

- **innerJoin()**: Perform INNER JOIN với related table. Method join tables và filter rows với matching values.

- **leftJoin()**: Perform LEFT JOIN với related table. Method include all rows từ left table và matching rows từ right table.

- **rightJoin()**: Perform RIGHT JOIN với related table. Method include all rows từ right table và matching rows từ left table.

- **join()**: Generic join method với join type parameter. Method provide flexibility cho different join types.

**3. Aggregations và Grouping - Tổng Hợp và Nhóm:**

- **addSelect()**: Add additional columns hoặc expressions để select. Method enable selecting aggregated values.

- **groupBy()**: Group results by columns. Method enable aggregations với GROUP BY clause.

- **having()**: Add HAVING conditions cho grouped results. Method filter groups sau khi aggregation.

- **orderBy()**: Order results by columns. Method specify sort order (ASC/DESC) cho results.

- **limit()**: Limit number of results. Method restrict number of rows returned.

- **offset()**: Skip number of results. Method enable pagination với limit và offset.

**4. Subqueries và CTEs - Truy Vấn Con:**

- **subQuery()**: Create subquery trong main query. Method enable nested queries và complex filtering.

- **exists()**: Check existence với subquery. Method return boolean based on subquery results.

- **in()**: Filter với list of values từ subquery. Method enable filtering với dynamic value lists.

**5. Insert, Update, Delete - Chèn, Cập Nhật, Xóa:**

- **insert()**: Insert new records. Method specify table và values để insert.

- **update()**: Update existing records. Method specify table, set values, và where conditions.

- **delete()**: Delete records. Method specify table và where conditions.

**Query Builder Examples - Ví Dụ Sử Dụng:**

**Example 1: Simple SELECT với WHERE:**

Query Builder construct simple SELECT query với WHERE conditions. Query filter products by category và price range. Query use type-safe column references và parameterized queries.

**Example 2: JOIN với Multiple Tables:**

Query Builder perform JOIN operations để combine data từ multiple tables. Query join products với categories và suppliers. Query use aliases để reference columns và avoid conflicts.

**Example 3: Aggregations với GROUP BY:**

Query Builder perform aggregations với GROUP BY clause. Query calculate total sales by category. Query use SUM, COUNT, và AVG functions để aggregate data.

**Example 4: Subqueries:**

Query Builder use subqueries để filter hoặc calculate values. Query find products với above-average prices. Query use subquery trong WHERE clause để compare values.

**Example 5: Dynamic Queries:**

Query Builder construct dynamic queries với conditional logic. Query build WHERE conditions based on input parameters. Query use conditional methods để add conditions only when needed.

**Query Builder Performance - Hiệu Năng:**

- **Query Optimization**: Query Builder generate optimized SQL queries. Builder use efficient join strategies và index hints.

- **Parameterized Queries**: Query Builder use parameterized queries để prevent SQL injection. Parameters are bound safely và efficiently.

- **Query Caching**: Query Builder support query result caching. Caching improve performance cho frequently executed queries.

- **Index Usage**: Query Builder generate queries that utilize indexes effectively. Proper indexing improve query performance significantly.

**Query Builder Best Practices - Thực Hành Tốt:**

- **Use Type-Safe Methods**: Use type-safe methods để avoid runtime errors. Type safety catch errors tại compile time.

- **Parameterize Queries**: Always use parameters cho user input. Parameterization prevent SQL injection và improve performance.

- **Optimize Joins**: Use appropriate join types và conditions. Efficient joins improve query performance.

- **Limit Results**: Use limit và offset cho pagination. Limiting results reduce memory usage và improve response times.

- **Use Indexes**: Ensure queries use appropriate indexes. Indexes significantly improve query performance.

- **Avoid N+1 Queries**: Use joins hoặc eager loading để avoid N+1 query problem. N+1 queries cause performance issues.

**Query Builder trong NestJS:**

- **Repository Pattern**: Query Builder được sử dụng trong repositories để implement custom queries. Repositories encapsulate query logic và provide clean interface.

- **Service Layer**: Services use repositories với Query Builder để implement business logic. Services orchestrate queries và business operations.

- **Dependency Injection**: Query Builder instances được inject vào repositories. DI enable testing và flexibility.

### 2.6.1.2. TypeORM Relations - Quan Hệ Giữa Các Entity

**Relations trong TypeORM:**

Relations định nghĩa relationships giữa entities trong database. TypeORM hỗ trợ các loại relations phổ biến trong relational databases và provide decorators để define relationships declaratively.

**Types of Relations:**

**1. One-to-One (1:1) - Một Một:**

One-to-One relationship là khi một entity instance relates to exactly one instance của another entity. Relationship có thể be unidirectional hoặc bidirectional.

- **Unidirectional One-to-One**: Chỉ một side có reference đến other side. Unidirectional relationship is simpler nhưng limited trong querying.

- **Bidirectional One-to-One**: Both sides có references đến each other. Bidirectional relationship enable querying từ both sides.

- **Decorator**: `@OneToOne()` decorator define one-to-one relationship. Decorator accept options như `type`, `inverseSide`, `cascade`, và `onDelete`.

- **Join Column**: `@JoinColumn()` decorator specify foreign key column. Join column is placed on owning side của relationship.

**Example Use Cases:**

- User và UserProfile: Mỗi user có exactly one profile
- Order và Invoice: Mỗi order có exactly one invoice
- Product và ProductDetail: Mỗi product có exactly one detail record

**2. One-to-Many (1:N) - Một Nhiều:**

One-to-Many relationship là khi một entity instance relates to multiple instances của another entity. Relationship is typically bidirectional với one side being "one" và other side being "many".

- **Owning Side**: "Many" side is owning side với foreign key. Owning side contains foreign key column.

- **Inverse Side**: "One" side is inverse side với collection property. Inverse side reference collection của related entities.

- **Decorator**: `@OneToMany()` decorator define one-to-many relationship. Decorator is placed on "one" side và reference "many" side.

- **Foreign Key**: Foreign key is automatically created trên "many" side. Foreign key reference primary key của "one" side.

**Example Use Cases:**

- Category và Products: Một category có many products
- User và Orders: Một user có many orders
- Order và OrderItems: Một order có many order items

**3. Many-to-One (N:1) - Nhiều Một:**

Many-to-One relationship là inverse của One-to-Many. Multiple instances của one entity relate to single instance của another entity.

- **Owning Side**: "Many" side is owning side với foreign key. Owning side contains foreign key column.

- **Decorator**: `@ManyToOne()` decorator define many-to-one relationship. Decorator is placed on "many" side và reference "one" side.

- **Join Column**: Foreign key column is automatically created. Join column reference primary key của "one" side.

**Example Use Cases:**

- Products và Category: Many products belong to one category
- Orders và User: Many orders belong to one user
- OrderItems và Order: Many order items belong to one order

**4. Many-to-Many (N:N) - Nhiều Nhiều:**

Many-to-Many relationship là khi multiple instances của one entity relate to multiple instances của another entity. Relationship requires junction table để store relationships.

- **Junction Table**: Junction table (join table) store foreign keys từ both entities. Junction table enable many-to-many relationships.

- **Bidirectional**: Many-to-many relationships are typically bidirectional. Both sides reference collection của related entities.

- **Decorator**: `@ManyToMany()` decorator define many-to-many relationship. Decorator is placed on both sides với `@JoinTable()` on owning side.

- **Join Table**: `@JoinTable()` decorator specify junction table configuration. Join table options include table name, join columns, và inverse join columns.

**Example Use Cases:**

- Products và Categories: Products can belong to multiple categories, categories can contain multiple products
- Users và Roles: Users can have multiple roles, roles can be assigned to multiple users
- Orders và Products: Orders can contain multiple products, products can be in multiple orders

**Relation Options:**

**1. Cascade Options:**

- **Cascade Insert**: Automatically insert related entities khi parent is inserted. Cascade insert simplify entity creation.

- **Cascade Update**: Automatically update related entities khi parent is updated. Cascade update maintain consistency.

- **Cascade Remove**: Automatically remove related entities khi parent is removed. Cascade remove ensure data integrity.

- **Cascade All**: Apply all cascade operations. Cascade all is convenient nhưng should be used carefully.

**2. Eager và Lazy Loading:**

- **Eager Loading**: Load related entities automatically khi parent is loaded. Eager loading is convenient nhưng can cause N+1 query problem nếu not used carefully.

- **Lazy Loading**: Load related entities only khi accessed. Lazy loading is default cho relations và improve initial load performance.

- **Eager Option**: `{ eager: true }` option enable eager loading. Eager loading load relations automatically.

- **Lazy Relations**: Lazy relations use Promise-based loading. Lazy relations enable on-demand loading.

**3. OnDelete và OnUpdate:**

- **OnDelete**: Specify action khi related entity is deleted. Options include:
  - `CASCADE`: Delete related entities
  - `SET NULL`: Set foreign key to NULL
  - `RESTRICT`: Prevent deletion
  - `NO ACTION`: No action (default)

- **OnUpdate**: Specify action khi related entity is updated. Options similar to OnDelete.

**4. Join Column Options:**

- **Column Name**: Specify foreign key column name. Column name can be customized.

- **Referenced Column**: Specify referenced column name. Default is primary key.

- **Nullable**: Specify if foreign key can be NULL. Nullable enable optional relationships.

**Relation Loading Strategies - Chiến Lược Tải Quan Hệ:**

**1. Eager Loading:**

- **Automatic Loading**: Relations với `eager: true` are loaded automatically. Eager loading simplify queries nhưng can load unnecessary data.

- **Query Builder Eager**: Use `leftJoinAndSelect()` hoặc `innerJoinAndSelect()` trong Query Builder. Query Builder eager loading provide more control.

- **Find Options**: Use `relations` option trong `find()` methods. Relations option specify which relations to load.

**2. Lazy Loading:**

- **Promise-Based**: Lazy relations return Promises. Promises are resolved khi relation is accessed.

- **On-Demand**: Relations are loaded only khi needed. Lazy loading improve initial load performance.

- **N+1 Problem**: Lazy loading can cause N+1 query problem. N+1 problem occur khi loading multiple entities với lazy relations.

**3. Explicit Loading:**

- **Load Relations**: Use `loadRelationCountAndMap()` hoặc `loadRelationIdsAndMap()` để load relation counts hoặc IDs. Explicit loading provide fine-grained control.

- **Query Builder**: Use Query Builder với joins để load relations explicitly. Query Builder provide full control over loading.

**Join Strategies - Chiến Lược Nối:**

**1. INNER JOIN:**

- **Matching Rows Only**: INNER JOIN return only rows với matching values trong both tables. INNER JOIN filter out non-matching rows.

- **Use Case**: Use INNER JOIN khi chỉ need entities với related data. INNER JOIN is efficient cho required relationships.

- **Query Builder**: Use `innerJoin()` hoặc `innerJoinAndSelect()` trong Query Builder. Inner join ensure related data exists.

**2. LEFT JOIN (LEFT OUTER JOIN):**

- **All Left Rows**: LEFT JOIN return all rows từ left table và matching rows từ right table. LEFT JOIN include entities without related data.

- **Use Case**: Use LEFT JOIN khi need all entities regardless of related data. LEFT JOIN is useful cho optional relationships.

- **Query Builder**: Use `leftJoin()` hoặc `leftJoinAndSelect()` trong Query Builder. Left join include all left entities.

**3. RIGHT JOIN (RIGHT OUTER JOIN):**

- **All Right Rows**: RIGHT JOIN return all rows từ right table và matching rows từ left table. RIGHT JOIN include all right entities.

- **Use Case**: Use RIGHT JOIN khi need all entities từ right table. RIGHT JOIN is less common trong practice.

- **Query Builder**: Use `rightJoin()` hoặc `rightJoinAndSelect()` trong Query Builder. Right join include all right entities.

**4. Multiple Joins:**

- **Chain Joins**: Chain multiple joins để load multiple relations. Multiple joins enable loading complex relationship graphs.

- **Join Order**: Join order can impact performance. Optimize join order để minimize intermediate result sizes.

- **Nested Relations**: Join nested relations với dot notation. Nested relations enable loading deep relationship trees.

**Join Performance Optimization:**

**1. Index Usage:**

- **Foreign Key Indexes**: Ensure foreign key columns are indexed. Foreign key indexes improve join performance significantly.

- **Composite Indexes**: Create composite indexes cho join conditions. Composite indexes optimize multi-column joins.

- **Covering Indexes**: Use covering indexes để enable index-only scans. Covering indexes avoid table access.

**2. Join Order:**

- **Optimal Order**: Choose join order để minimize intermediate result sizes. Optimal order reduce data processing.

- **Selective Joins First**: Perform selective joins first. Selective joins filter data early.

- **Query Planner**: Let query planner choose optimal join order. Query planner use statistics để optimize.

**3. Join Types:**

- **Choose Appropriate Type**: Choose join type based on requirements. INNER JOIN is faster, LEFT JOIN is more flexible.

- **Avoid Unnecessary Joins**: Only join tables khi needed. Unnecessary joins increase query complexity và execution time.

**4. Eager Loading vs Lazy Loading:**

- **Eager for Required**: Use eager loading cho always-needed relations. Eager loading reduce query count.

- **Lazy for Optional**: Use lazy loading cho optional relations. Lazy loading improve initial load performance.

- **Query Builder Control**: Use Query Builder cho fine-grained control. Query Builder enable selective loading.

**Relations trong Dự Án:**

**1. Product Relations:**

- **Product ↔ Category**: Many-to-One relationship. Products belong to categories, categories contain products.

- **Product ↔ OrderItem**: One-to-Many relationship. Products can be in multiple order items.

- **Product ↔ Review**: One-to-Many relationship. Products can have multiple reviews.

**2. Order Relations:**

- **Order ↔ User**: Many-to-One relationship. Orders belong to users.

- **Order ↔ OrderItem**: One-to-Many relationship. Orders contain multiple order items.

**3. User Relations:**

- **User ↔ Order**: One-to-Many relationship. Users can have multiple orders.

- **User ↔ Cart**: One-to-One relationship. Users have one cart.

**4. Category Relations:**

- **Category ↔ Product**: One-to-Many relationship. Categories contain multiple products.

- **Category ↔ Category (Self-Referencing)**: Many-to-One relationship. Categories can have parent categories (hierarchical structure).

**Best Practices cho Relations:**

- **Define Relations Explicitly**: Always define relations explicitly với decorators. Explicit relations enable TypeORM to manage relationships correctly.

- **Use Appropriate Types**: Choose appropriate relation types based on business logic. Correct types ensure data integrity.

- **Index Foreign Keys**: Always index foreign key columns. Foreign key indexes improve join performance.

- **Avoid Deep Nesting**: Avoid deeply nested relations. Deep nesting can cause performance issues.

- **Use Query Builder cho Complex Queries**: Use Query Builder cho complex queries với multiple joins. Query Builder provide better control và performance.

- **Monitor N+1 Queries**: Monitor và prevent N+1 query problems. N+1 queries cause performance degradation.

- **Use Eager Loading Carefully**: Use eager loading only khi relations are always needed. Eager loading can load unnecessary data.

- **Leverage Lazy Loading**: Use lazy loading cho optional relations. Lazy loading improve initial load performance.

### 2.6.1.1. TypeORM

**TypeORM** là một Object-Relational Mapping (ORM) framework mạnh mẽ cho TypeScript và JavaScript, được phát triển bởi TypeORM team. TypeORM cho phép developers làm việc với databases sử dụng objects và classes thay vì SQL queries trực tiếp.

**Lịch Sử và Mục Đích:**

TypeORM được tạo ra để cung cấp một cách tiếp cận hiện đại và type-safe cho việc làm việc với databases trong TypeScript/JavaScript applications. TypeORM được lấy cảm hứng từ các ORM frameworks khác như Hibernate (Java), Doctrine (PHP), và Entity Framework (.NET).

**TypeScript First - Ưu Tiên TypeScript:**

TypeORM được thiết kế từ đầu cho TypeScript, tận dụng tối đa các tính năng của TypeScript:

- **Type Safety**: Tất cả database operations đều type-safe, lỗi được phát hiện tại compile time
- **IntelliSense**: Full IDE support với autocomplete và type checking
- **Refactoring**: An toàn refactor code với TypeScript tooling
- **Type Inference**: Automatic type inference từ entity definitions
- **Generic Types**: Sử dụng generics cho type-safe repositories và queries

**Active Record và Data Mapper Patterns - Mẫu Active Record và Data Mapper:**

TypeORM hỗ trợ cả hai patterns phổ biến trong ORM:

**1. Active Record Pattern:**

Trong Active Record pattern, entity tự quản lý việc lưu trữ và truy xuất dữ liệu:

- Entity extends `BaseEntity`
- Entity có methods như `save()`, `remove()`, `find()`, `findOne()`
- Business logic và data access logic được kết hợp trong entity
- Đơn giản hơn cho small applications
- Phù hợp cho rapid prototyping

**2. Data Mapper Pattern:**

Trong Data Mapper pattern, data access logic được tách biệt khỏi entity:

- Entity chỉ chứa data và business logic
- Repository xử lý data access
- Separation of concerns rõ ràng hơn
- Phù hợp cho large applications
- Dễ test hơn (có thể mock repositories)

**Trong NestJS:**

NestJS khuyến khích sử dụng Data Mapper pattern vì:

- Phù hợp với Dependency Injection
- Dễ dàng test với mocked repositories
- Separation of concerns tốt hơn
- Phù hợp với modular architecture

**Metadata Decorators - Trang Trí Siêu Dữ Liệu:**

TypeORM sử dụng TypeScript decorators để định nghĩa entities và relationships. Decorators cung cấp metadata được sử dụng tại runtime để generate SQL queries.

**Entity Decorators:**

- **@Entity()**: Đánh dấu class là entity, map với database table
- **@Table()**: Chỉ định tên table và options (nếu khác với class name)

**Column Decorators:**

- **@Column()**: Định nghĩa một column trong table
- **@PrimaryColumn()**: Định nghĩa primary key (không auto-generated)
- **@PrimaryGeneratedColumn()**: Định nghĩa auto-generated primary key
- **@CreateDateColumn()**: Tự động set khi entity được tạo
- **@UpdateDateColumn()**: Tự động update khi entity được update
- **@VersionColumn()**: Optimistic locking column
- **@Generated()**: Đánh dấu column được auto-generated bởi database
- **@Index()**: Tạo index cho column hoặc nhiều columns
- **@Unique()**: Tạo unique constraint cho column hoặc nhiều columns
- **@Check()**: Tạo check constraint cho column
- **@Exclude()**: Loại trừ column khỏi serialization

**Entity - Thực Thể:**

Entity trong TypeORM là một TypeScript class được map với một database table. Entity đại diện cho một đối tượng trong domain model và chứa các properties được map với columns trong database table.

**Đặc điểm của Entity:**

- **Class-based**: Entity là một TypeScript class với decorators
- **Table Mapping**: Mỗi entity được map với một database table
- **Column Mapping**: Properties trong entity được map với columns trong table
- **Type Safety**: TypeScript đảm bảo type safety cho entity properties
- **Metadata-driven**: TypeORM sử dụng metadata từ decorators để generate SQL

**Entity Decorators:**

- **@Entity()**: Đánh dấu class là entity và map với database table
- **@Table()**: Chỉ định tên table và các options như schema, engine, charset
- **@ViewEntity()**: Đánh dấu class là view entity (map với database view)
- **@ChildEntity()**: Đánh dấu class là child entity trong single table inheritance
- **@AbstractEntity()**: Đánh dấu class là abstract entity (không được map với table)

**Entity Options:**

- **name**: Tên của table trong database (mặc định là class name)
- **schema**: Database schema name
- **database**: Database name
- **synchronize**: Tự động sync schema với entities (chỉ dùng trong development)
- **orderBy**: Default ordering cho queries
- **engine**: Database engine (MySQL)
- **charset**: Character set
- **collation**: Collation

**Column - Cột:**

Column trong TypeORM là một property trong entity class được map với một column trong database table. Column decorators định nghĩa cách property được map với database column.

**Đặc điểm của Column:**

- **Property Mapping**: Map TypeScript property với database column
- **Type Mapping**: Map TypeScript type với database type
- **Constraints**: Định nghĩa constraints như nullable, unique, default
- **Transformations**: Transform data khi read/write từ database
- **Indexing**: Tạo indexes để tối ưu queries

**Column Types:**

- **String Types**: varchar, char, text, nvarchar
- **Number Types**: int, bigint, float, double, decimal, numeric
- **Date Types**: date, time, datetime, timestamp
- **Boolean Types**: boolean, tinyint
- **Binary Types**: blob, binary, varbinary
- **JSON Types**: json, jsonb
- **Array Types**: array (PostgreSQL)
- **Enum Types**: enum
- **UUID Types**: uuid

**Column Options:**

- **type**: Database column type
- **name**: Tên column trong database (mặc định là property name)
- **length**: Độ dài cho string columns
- **width**: Width cho number columns
- **nullable**: Có thể null hay không (default: false)
- **default**: Giá trị mặc định
- **unique**: Unique constraint
- **primary**: Primary key column
- **generated**: Auto-generated column
- **precision**: Precision cho decimal columns
- **scale**: Scale cho decimal columns
- **comment**: Comment cho column
- **transformer**: Transform data khi read/write
- **array**: Array column (PostgreSQL)
- **enum**: Enum values
- **charset**: Character set
- **collation**: Collation

**Column Decorators:**

- **@Column()**: Định nghĩa một column trong table
- **@PrimaryColumn()**: Định nghĩa primary key (không auto-generated)
- **@PrimaryGeneratedColumn()**: Định nghĩa auto-generated primary key
- **@CreateDateColumn()**: Tự động set timestamp khi entity được tạo
- **@UpdateDateColumn()**: Tự động update timestamp khi entity được update
- **@DeleteDateColumn()**: Soft delete column (tự động set khi entity bị xóa)
- **@VersionColumn()**: Optimistic locking column (tự động increment)
- **@Generated()**: Đánh dấu column được auto-generated bởi database

**Column Options:**

- **type**: Data type (varchar, int, date, json, etc.)
- **length**: Độ dài cho string columns
- **nullable**: Có thể null hay không
- **default**: Giá trị mặc định
- **unique**: Unique constraint
- **index**: Tạo index cho column
- **transformer**: Transform data khi read/write

**Relationship Decorators:**

- **@OneToOne()**: One-to-one relationship
- **@OneToMany()**: One-to-many relationship
- **@ManyToOne()**: Many-to-one relationship
- **@ManyToMany()**: Many-to-many relationship
- **@JoinColumn()**: Chỉ định foreign key column
- **@JoinTable()**: Chỉ định join table cho many-to-many

**Relationship Options:**

- **eager**: Tự động load relationship
- **lazy**: Load relationship khi truy cập
- **cascade**: Cascade operations (insert, update, remove)
- **onDelete**: Action khi parent bị xóa (CASCADE, SET NULL, RESTRICT)
- **onUpdate**: Action khi parent được update

**Metadata System - Hệ Thống Siêu Dữ Liệu:**

TypeORM sử dụng reflect-metadata để lưu trữ và truy xuất metadata về entities tại runtime.

**Metadata Storage:**

- Metadata được lưu trữ trong metadata registry
- Mỗi decorator thêm metadata vào registry
- Metadata được truy xuất khi cần generate SQL

**Metadata Types:**

1. **Entity Metadata**: Table name, columns, relationships
2. **Column Metadata**: Column name, type, options
3. **Relation Metadata**: Relationship type, target entity, options
4. **Index Metadata**: Index definitions
5. **Check Metadata**: Check constraints

**Metadata Usage:**

- **Query Generation**: Generate SQL queries từ metadata
- **Schema Synchronization**: Sync database schema với entities
- **Migration Generation**: Generate migrations từ entity changes
- **Validation**: Validate entity configurations

**Migration System - Hệ Thống Di Chuyển:**

Migrations là các scripts quản lý thay đổi database schema theo thời gian, cho phép version control cho database.

**Migration Concept:**

- Mỗi migration đại diện cho một thay đổi schema cụ thể
- Migrations được thực thi theo thứ tự
- Có thể rollback migrations
- Migrations được lưu trong database để track đã chạy migrations nào

**Migration Structure:**

Một migration file điển hình:

**Migration Commands:**

- **migration:generate**: Generate migration từ entity changes
- **migration:create**: Tạo migration file trống
- **migration:run**: Chạy pending migrations
- **migration:revert**: Revert last migration
- **migration:show**: Hiển thị migrations đã chạy

**Migration Best Practices:**

- **Atomic Changes**: Mỗi migration nên là một atomic change
- **Backward Compatible**: Migrations nên backward compatible khi có thể
- **Test Migrations**: Test migrations trên development trước
- **Review SQL**: Review generated SQL trước khi chạy
- **Backup**: Backup database trước khi chạy migrations trên production

**Query Builder - Trình Xây Dựng Truy Vấn:**

TypeORM cung cấp query builder mạnh mẽ cho việc xây dựng complex queries một cách programmatic.

**Query Builder API:**

- **createQueryBuilder()**: Tạo query builder instance
- **select()**: Chỉ định columns để select
- **from()**: Chỉ định table/entity
- **where()**: Thêm WHERE conditions
- **join()**: Thêm JOINs
- **orderBy()**: Thêm ORDER BY
- **groupBy()**: Thêm GROUP BY
- **having()**: Thêm HAVING clause
- **limit()**: Giới hạn số rows
- **offset()**: Skip rows
- **getMany()**: Execute và return array
- **getOne()**: Execute và return single result
- **getRawMany()**: Execute và return raw results

**Query Builder Benefits:**

- **Type Safety**: Type-safe queries với TypeScript
- **Dynamic Queries**: Xây dựng queries động dựa trên conditions
- **Complex Joins**: Dễ dàng xây dựng complex joins
- **Subqueries**: Hỗ trợ subqueries
- **SQL Injection Prevention**: Tự động escape parameters

**Query Builder Workflow:**

1. Tạo query builder instance với alias cho entity
2. Thêm joins để load relationships
3. Thêm WHERE conditions với parameters
4. Thêm ORDER BY, GROUP BY, HAVING nếu cần
5. Thêm pagination với LIMIT và OFFSET
6. Execute query và nhận kết quả

**Query Builder Advantages:**

- Type-safe với TypeScript
- Dynamic query building dựa trên conditions
- Reusable query logic
- Easy to test và maintain
- Automatic parameter binding để prevent SQL injection

**Repository Pattern - Mẫu Kho Lưu Trữ:**

TypeORM cung cấp Repository pattern để tách biệt data access logic.

**Base Repository:**

TypeORM cung cấp base repository với các methods:

- **find()**: Find multiple entities
- **findOne()**: Find single entity
- **findBy()**: Find by conditions
- **save()**: Save entity (insert or update)
- **remove()**: Remove entity
- **delete()**: Delete entity
- **count()**: Count entities
- **create()**: Create entity instance

**Custom Repository:**

Custom repositories cho phép thêm domain-specific query methods:

- **Encapsulate Complex Queries**: Tập trung complex queries vào repository
- **Reusable Query Logic**: Tái sử dụng query logic ở nhiều nơi
- **Domain-Specific Methods**: Methods có tên mô tả rõ business intent
- **Testability**: Dễ dàng test và mock custom repositories
- **Separation of Concerns**: Tách biệt data access logic khỏi business logic

**Custom Repository Benefits:**

- Code organization tốt hơn
- Dễ maintain và extend
- Type-safe với TypeScript
- Consistent API cho data access
- Có thể cache query results

**Transaction Management - Quản Lý Giao Dịch:**

TypeORM hỗ trợ transaction management để đảm bảo ACID properties.

**Transaction Methods:**

- **transaction()**: Execute operations trong transaction
- **queryRunner**: Manual transaction control
- **Isolation Levels**: Support các isolation levels khác nhau

**Transaction Workflow:**

1. Bắt đầu transaction
2. Thực thi các operations trong transaction context
3. Nếu tất cả operations thành công, commit transaction
4. Nếu có lỗi, rollback transaction và revert tất cả changes

**Transaction Benefits:**

- **Atomicity**: Tất cả operations succeed hoặc fail cùng nhau
- **Consistency**: Database luôn ở trạng thái consistent
- **Isolation**: Transactions không interfere với nhau
- **Durability**: Committed changes persist

**Transaction Use Cases:**

- Creating orders với multiple order items
- Transferring inventory giữa locations
- Updating related entities cùng lúc
- Complex business operations cần atomicity

### 2.6.2. Entity Design và Metadata System

**Entity Design - Thiết Kế Thực Thể:**

Entities là các TypeScript classes được map với database tables. Thiết kế entity tốt là nền tảng cho maintainable và scalable applications.

**Entity Structure:**

Một entity điển hình bao gồm:

- **Primary Key**: Unique identifier
- **Columns**: Data fields
- **Relationships**: Connections với entities khác
- **Timestamps**: Created/updated timestamps
- **Business Logic**: Methods cho business operations (nếu dùng Active Record)

**Entity Best Practices:**

1. **Single Responsibility**: Mỗi entity đại diện cho một concept trong domain
2. **Clear Naming**: Tên entity và columns rõ ràng, descriptive
3. **Proper Types**: Sử dụng đúng data types
4. **Relationships**: Định nghĩa relationships rõ ràng
5. **Indexes**: Thêm indexes cho frequently queried columns
6. **Constraints**: Sử dụng constraints để ensure data integrity

**Entity Design cho Domain Nông Nghiệp:**

Trong dự án e-commerce nông nghiệp, Product entity được thiết kế với các fields đặc thù:

- **Basic Information**: name, description, price, images
- **Agriculture-Specific Fields**: harvestDate (ngày thu hoạch), expiryDate (ngày hết hạn), origin (nguồn gốc), certifications (chứng nhận), grade (chất lượng)
- **Storage Requirements**: temperature, humidity, special handling
- **Seasonal Information**: season (mùa vụ), availability period
- **Relationships**: category (danh mục), orderItems (chi tiết đơn hàng), reviews (đánh giá)
- **Timestamps**: createdAt, updatedAt để track changes

**Entity Design Considerations:**

- Sử dụng JSONB cho certifications để lưu trữ array linh hoạt
- Date fields cho harvestDate và expiryDate để quản lý hạn sử dụng
- Nullable fields cho optional information
- Proper indexing cho frequently queried fields
- Relationships được định nghĩa rõ ràng với cascade options

**Metadata System - Hệ Thống Siêu Dữ Liệu:**

TypeORM metadata system là cốt lõi của framework, cho phép TypeORM hiểu cấu trúc entities và generate SQL queries.

**Metadata Collection:**

Metadata được collect trong quá trình application startup:

1. Scan entities từ codebase
2. Parse decorators
3. Build metadata objects
4. Validate configurations
5. Store trong metadata storage

**Metadata Structure:**

Metadata objects chứa:

- **Table Information**: Table name, schema, options
- **Column Information**: Column names, types, options, relationships
- **Index Information**: Index definitions
- **Relation Information**: Relationship types, targets, options

**Metadata Usage:**

- **Query Generation**: Generate SQL từ metadata
- **Schema Sync**: Sync database schema với entities
- **Migration Generation**: Generate migrations
- **Validation**: Validate entity configurations
- **Type Checking**: Type checking cho queries

## 2.7. Software Engineering và Phương Pháp Phát Triển Phần Mềm

Software Engineering là ngành khoa học áp dụng các nguyên tắc kỹ thuật để thiết kế, phát triển, bảo trì, và quản lý phần mềm. Phương pháp phát triển phần mềm định nghĩa quy trình và cách tiếp cận để xây dựng hệ thống phần mềm.

### 2.7.1. Software Development Life Cycle (SDLC)

Software Development Life Cycle (SDLC) là quy trình có cấu trúc để phát triển phần mềm, từ khái niệm ban đầu đến triển khai và bảo trì.

**Các Giai Đoạn của SDLC:**

- **Planning và Requirements Analysis**: Giai đoạn lập kế hoạch và phân tích yêu cầu là bước đầu tiên của SDLC. Giai đoạn này bao gồm việc thu thập yêu cầu từ stakeholders, phân tích tính khả thi, và lập kế hoạch dự án. Requirements được document chi tiết và validate với stakeholders.

- **System Design**: Giai đoạn thiết kế hệ thống định nghĩa kiến trúc tổng thể, database schema, API design, và user interface. Design phase tạo ra blueprints cho implementation. Design documents bao gồm architecture diagrams, ERD, và API specifications.

- **Implementation**: Giai đoạn implementation là nơi code được viết theo design specifications. Implementation follow coding standards và best practices. Code được organize theo architecture design và implement features theo requirements.

- **Testing**: Giai đoạn testing đảm bảo software hoạt động đúng và meet requirements. Testing bao gồm unit testing, integration testing, system testing, và user acceptance testing. Testing identify bugs và ensure quality.

- **Deployment**: Giai đoạn deployment đưa software vào production environment. Deployment bao gồm setup infrastructure, configure systems, và migrate data. Deployment process được automate và document.

- **Maintenance**: Giai đoạn maintenance bao gồm bug fixes, updates, và enhancements. Maintenance ensure software continue to work correctly và meet evolving requirements. Maintenance là ongoing process throughout software lifecycle.

**SDLC Models:**

- **Waterfall Model**: Waterfall model là linear sequential model với các giai đoạn tuần tự. Mỗi giai đoạn phải hoàn thành trước khi bắt đầu giai đoạn tiếp theo. Waterfall model phù hợp cho projects với requirements rõ ràng và ít thay đổi.

- **Agile Model**: Agile model là iterative và incremental approach với focus on flexibility và customer collaboration. Agile chia project thành small iterations (sprints) và deliver working software frequently. Agile phù hợp cho projects với requirements thay đổi và need for rapid delivery.

- **DevOps Model**: DevOps model integrate development và operations để improve collaboration và automation. DevOps focus on continuous integration, continuous deployment, và infrastructure as code. DevOps reduce time to market và improve quality.

### 2.7.2. Agile Development và Scrum

Agile Development là methodology tập trung vào iterative development, collaboration, và responding to change. Scrum là framework phổ biến nhất của Agile.

**Agile Principles:**

- **Individuals and Interactions over Processes and Tools**: Agile ưu tiên individuals và interactions hơn processes và tools. Communication và collaboration quan trọng hơn documentation và tools.

- **Working Software over Comprehensive Documentation**: Agile ưu tiên working software hơn comprehensive documentation. Software deliver value, documentation chỉ support development.

- **Customer Collaboration over Contract Negotiation**: Agile ưu tiên customer collaboration hơn contract negotiation. Continuous collaboration ensure software meet customer needs.

- **Responding to Change over Following a Plan**: Agile ưu tiên responding to change hơn following a plan. Flexibility và adaptability quan trọng hơn rigid planning.

**Scrum Framework:**

- **Sprint**: Sprint là time-boxed iteration (thường 2-4 tuần) để deliver working software. Sprint có clear goals và deliverables. Sprint planning define work cho sprint.

- **Sprint Planning**: Sprint planning meeting để plan work cho sprint. Team select items từ product backlog và break down thành tasks. Planning estimate effort và commit to deliverables.

- **Daily Standup**: Daily standup meeting (15 phút) để sync team progress. Standup answer three questions: what did I do yesterday, what will I do today, are there any blockers.

- **Sprint Review**: Sprint review meeting để demonstrate completed work. Review show working software và gather feedback. Stakeholders provide input cho next sprint.

- **Sprint Retrospective**: Sprint retrospective meeting để reflect on process và improve. Retrospective identify what went well, what didn't, và how to improve. Continuous improvement là core của Agile.

**Scrum Roles:**

- **Product Owner**: Product Owner represent stakeholders và manage product backlog. Product Owner prioritize features và ensure team build right things. Product Owner define requirements và accept completed work.

- **Scrum Master**: Scrum Master facilitate Scrum process và remove impediments. Scrum Master ensure team follow Scrum practices và improve continuously. Scrum Master protect team từ distractions.

- **Development Team**: Development Team implement features và deliver working software. Team self-organize và collaborate to achieve sprint goals. Team có all skills needed để deliver software.

### 2.7.3. Version Control và Git

Version Control là hệ thống quản lý changes trong code và documents. Git là distributed version control system phổ biến nhất.

**Version Control Concepts:**

- **Repository**: Repository là storage location cho project files và history. Repository có thể be local hoặc remote. Remote repositories enable collaboration.

- **Commit**: Commit là snapshot của project tại một thời điểm. Commit có unique identifier (hash) và message describing changes. Commits create history của project.

- **Branch**: Branch là parallel version của code. Branches allow work on features independently. Main branch (master/main) là production-ready code.

- **Merge**: Merge combine changes từ different branches. Merge integrate feature branches vào main branch. Merge conflicts occur khi changes conflict và need resolution.

**Git Workflow:**

- **Feature Branch Workflow**: Feature branch workflow create branches cho each feature. Features được develop independently và merge vào main khi complete. Workflow enable parallel development và code review.

- **Git Flow**: Git Flow là branching model với main, develop, feature, release, và hotfix branches. Git Flow provide structure cho release management. Model phù hợp cho projects với scheduled releases.

- **Forking Workflow**: Forking workflow sử dụng forks cho collaboration. Contributors fork repository, make changes, và submit pull requests. Workflow phù hợp cho open source projects.

**Git Best Practices:**

- **Meaningful Commit Messages**: Commit messages should be clear và describe what và why, not how. Messages help understand history và changes. Conventional commits provide structure.

- **Small, Atomic Commits**: Small, atomic commits make it easy to understand và revert changes. Each commit should represent a logical change. Atomic commits improve code review và debugging.

- **Regular Commits**: Regular commits create detailed history và enable collaboration. Frequent commits reduce risk of conflicts và data loss. Commits should be made after completing logical units of work.

- **Branch Naming Conventions**: Branch naming conventions help organize và identify branches. Conventions include feature/, bugfix/, hotfix/ prefixes. Consistent naming improve workflow efficiency.

### 2.7.4. Code Quality và Best Practices

Code Quality đảm bảo code maintainable, readable, và reliable. Best practices provide guidelines để write quality code.

**Code Quality Metrics:**

- **Maintainability**: Maintainability measure how easy code is to understand và modify. Maintainable code có clear structure, good naming, và minimal complexity. Maintainability reduce cost of changes.

- **Readability**: Readability measure how easy code is to understand. Readable code có clear naming, proper formatting, và good comments. Readability improve collaboration và reduce bugs.

- **Testability**: Testability measure how easy code is to test. Testable code có clear dependencies, minimal coupling, và good separation. Testability enable comprehensive testing.

- **Performance**: Performance measure how efficiently code executes. Performance optimization balance speed với maintainability. Performance critical cho user experience và scalability.

**Coding Best Practices:**

- **Naming Conventions**: Naming conventions provide consistency và clarity. Names should be descriptive, meaningful, và follow language conventions. Consistent naming improve readability và reduce confusion.

- **Code Organization**: Code organization structure code logically và hierarchically. Organization follow separation of concerns và modular design. Good organization improve maintainability và navigation.

- **Error Handling**: Error handling manage errors gracefully và provide meaningful messages. Error handling prevent crashes và improve user experience. Proper error handling include logging và recovery strategies.

- **Documentation**: Documentation explain code purpose, usage, và design decisions. Documentation include comments, README files, và API documentation. Good documentation improve onboarding và maintenance.

**Code Review Process:**

- **Purpose**: Code review ensure code quality, share knowledge, và catch bugs. Reviews improve code quality và team skills. Reviews provide learning opportunities.

- **Process**: Code review process include submission, review, feedback, và approval. Reviewers check code quality, correctness, và adherence to standards. Process ensure consistency và quality.

- **Best Practices**: Code review best practices include constructive feedback, focus on code not person, và timely reviews. Reviews should be respectful và educational. Good reviews improve code và team.

### 2.7.5. Testing Strategies và Methodologies

Testing Strategies đảm bảo software quality và reliability. Different testing methodologies cover different aspects của software.

**Testing Pyramid:**

- **Unit Testing**: Unit testing test individual components in isolation. Unit tests are fast, numerous, và test specific functionality. Unit tests provide foundation của testing pyramid.

- **Integration Testing**: Integration testing test interactions giữa components. Integration tests verify components work together correctly. Integration tests cover critical paths và interfaces.

- **E2E Testing**: E2E testing test complete workflows từ user perspective. E2E tests are slower, fewer, và test entire system. E2E tests validate user journeys và critical scenarios.

**Testing Methodologies:**

- **Test-Driven Development (TDD)**: TDD write tests trước khi write code. TDD cycle: write failing test, write code to pass test, refactor. TDD ensure code is testable và meet requirements.

- **Behavior-Driven Development (BDD)**: BDD focus on behavior và user stories. BDD tests describe behavior in natural language. BDD improve communication giữa developers và stakeholders.

- **Acceptance Test-Driven Development (ATDD)**: ATDD write acceptance tests trước khi development. ATDD ensure features meet acceptance criteria. ATDD align development với requirements.

**Testing Best Practices:**

- **Test Coverage**: Test coverage measure percentage của code tested. High coverage improve confidence nhưng không guarantee quality. Coverage should focus on critical paths và business logic.

- **Test Isolation**: Test isolation ensure tests don't depend on each other. Isolated tests can run in any order và independently. Isolation improve reliability và debugging.

- **Test Data Management**: Test data management provide consistent và realistic test data. Test data should be isolated và not affect production. Good test data improve test reliability.

### 2.7.6. Continuous Integration và Continuous Deployment (CI/CD)

CI/CD automate testing, building, và deployment processes. CI/CD improve quality, speed, và reliability của software delivery.

**Continuous Integration (CI):**

- **Automated Testing**: CI run automated tests trên every commit. Tests include unit tests, integration tests, và linting. Automated testing catch bugs early và prevent regressions.

- **Automated Building**: CI build software automatically trên every commit. Builds verify code compiles và dependencies resolve. Automated building catch build errors early.

- **Code Quality Checks**: CI run code quality checks như linting, formatting, và security scanning. Quality checks enforce standards và catch issues. Automated checks improve code quality.

**Continuous Deployment (CD):**

- **Automated Deployment**: CD deploy software automatically sau khi CI passes. Deployment can be to staging hoặc production environments. Automated deployment reduce manual errors và speed up delivery.

- **Deployment Pipelines**: Deployment pipelines define stages của deployment process. Pipelines include build, test, deploy, và verify stages. Pipelines ensure consistent và reliable deployments.

- **Rollback Capability**: Rollback capability revert deployments nếu có issues. Rollback restore previous version quickly. Rollback reduce risk của deployments.

**CI/CD Best Practices:**

- **Fast Feedback**: CI/CD provide fast feedback về code quality và build status. Fast feedback enable quick fixes và improve productivity. Feedback should be visible và actionable.

- **Fail Fast**: Fail fast principle stop pipeline early nếu có failures. Early failures save time và resources. Fail fast enable quick fixes và prevent wasted work.

- **Infrastructure as Code**: Infrastructure as Code define infrastructure với code. IaC enable version control, automation, và consistency. IaC improve reliability và reduce manual errors.

## 2.8. Nguyên Tắc Thiết Kế Phần Mềm

### 2.8.1. Thuật Toán và Cấu Trúc Dữ Liệu

**Thuật Toán trong Web Development:**

Thuật toán là các bước giải quyết vấn đề một cách có hệ thống. Trong web development, nhiều thuật toán được sử dụng để optimize performance, manage data, và solve complex problems.

**1. Sorting Algorithms - Thuật Toán Sắp Xếp:**

- **Quick Sort**: Divide-and-conquer algorithm với average O(n log n) complexity. Quick Sort is efficient cho large datasets và widely used trong JavaScript engines.

- **Merge Sort**: Divide-and-conquer algorithm với guaranteed O(n log n) complexity. Merge Sort is stable và predictable, suitable cho stable sorting requirements.

- **Heap Sort**: Use heap data structure với O(n log n) complexity. Heap Sort is in-place và memory-efficient.

- **Tim Sort**: Hybrid algorithm combining merge sort và insertion sort. Tim Sort is used trong Python và optimized cho real-world data.

**2. Searching Algorithms - Thuật Toán Tìm Kiếm:**

- **Binary Search**: Search trong sorted array với O(log n) complexity. Binary Search is efficient cho large sorted datasets.

- **Linear Search**: Search sequentially với O(n) complexity. Linear Search is simple và suitable cho small datasets.

- **Hash Table Lookup**: O(1) average case lookup với hash tables. Hash tables enable fast key-value lookups.

- **Trie Search**: Prefix-based search với O(m) complexity (m = length of search string). Trie enable efficient prefix matching và autocomplete.

**3. Graph Algorithms - Thuật Toán Đồ Thị:**

- **Breadth-First Search (BFS)**: Traverse graph level by level. BFS find shortest paths trong unweighted graphs.

- **Depth-First Search (DFS)**: Traverse graph depth-first. DFS is used cho path finding và cycle detection.

- **Dijkstra's Algorithm**: Find shortest paths trong weighted graphs. Dijkstra's algorithm is used cho routing và navigation.

- **Topological Sort**: Order nodes trong directed acyclic graph. Topological sort is used cho dependency resolution.

**4. String Algorithms - Thuật Toán Chuỗi:**

- **String Matching**: Find patterns trong strings. Algorithms include:
  - **Naive String Matching**: O(n\*m) complexity
  - **KMP Algorithm**: O(n+m) complexity với preprocessing
  - **Rabin-Karp Algorithm**: Hash-based matching với O(n+m) average case

- **String Compression**: Compress strings để reduce size. Algorithms include:
  - **Huffman Coding**: Variable-length encoding
  - **LZ77/LZ78**: Dictionary-based compression
  - **Run-Length Encoding**: Simple compression cho repetitive data

**5. Caching Algorithms - Thuật Toán Bộ Nhớ Đệm:**

- **LRU (Least Recently Used)**: Evict least recently used items. LRU is commonly used trong cache implementations.

- **LFU (Least Frequently Used)**: Evict least frequently used items. LFU prioritize frequently accessed items.

- **FIFO (First In First Out)**: Evict oldest items. FIFO is simple và predictable.

- **Random Replacement**: Evict random items. Random replacement is simple nhưng less efficient.

**6. Hashing Algorithms - Thuật Toán Băm:**

- **MD5**: Fast hash function với 128-bit output. MD5 is used cho checksums nhưng not secure cho cryptography.

- **SHA-256**: Secure hash function với 256-bit output. SHA-256 is used cho password hashing và digital signatures.

- **bcrypt**: Adaptive hash function cho password hashing. bcrypt is designed to be slow để resist brute-force attacks.

- **Consistent Hashing**: Hash function cho distributed systems. Consistent hashing enable efficient load distribution.

**Cấu Trúc Dữ Liệu - Data Structures:**

**1. Arrays và Lists:**

- **Dynamic Arrays**: Arrays với automatic resizing. Dynamic arrays provide O(1) access và amortized O(1) append.

- **Linked Lists**: Nodes connected với pointers. Linked lists provide O(1) insert/delete nhưng O(n) access.

- **Doubly Linked Lists**: Linked lists với forward và backward pointers. Doubly linked lists enable efficient bidirectional traversal.

**2. Trees:**

- **Binary Trees**: Trees với at most 2 children per node. Binary trees enable efficient search và insertion.

- **Binary Search Trees (BST)**: Binary trees với ordering property. BST provide O(log n) search, insert, và delete.

- **AVL Trees**: Self-balancing BST. AVL trees maintain height balance để ensure O(log n) operations.

- **Red-Black Trees**: Self-balancing BST với color coding. Red-black trees are used trong many standard libraries.

- **B-Trees**: Multi-way trees used trong databases. B-trees minimize disk I/O với large node sizes.

**3. Hash Tables:**

- **Hash Maps**: Key-value storage với hash function. Hash maps provide O(1) average case operations.

- **Hash Sets**: Set implementation với hash function. Hash sets provide O(1) average case membership testing.

- **Collision Resolution**: Handle hash collisions với:
  - **Chaining**: Store collisions trong linked lists
  - **Open Addressing**: Find next available slot

**4. Heaps:**

- **Min Heap**: Complete binary tree với min property. Min heap enable O(log n) insert và O(1) min extraction.

- **Max Heap**: Complete binary tree với max property. Max heap enable O(log n) insert và O(1) max extraction.

- **Priority Queues**: Implement với heaps. Priority queues enable efficient priority-based processing.

**5. Graphs:**

- **Adjacency List**: Store graph như list of neighbors. Adjacency list is space-efficient cho sparse graphs.

- **Adjacency Matrix**: Store graph như matrix. Adjacency matrix enable O(1) edge lookup nhưng require O(V²) space.

- **Edge List**: Store graph như list of edges. Edge list is simple nhưng less efficient cho queries.

**Thuật Toán trong Dự Án:**

**1. Search và Filter:**

- **Product Search**: Implement full-text search với PostgreSQL. Search use indexing và ranking algorithms.

- **Product Filtering**: Filter products với multiple criteria. Filtering use efficient data structures và algorithms.

- **Sorting**: Sort products với different criteria. Sorting use efficient sorting algorithms.

**2. Caching:**

- **LRU Cache**: Implement LRU cache cho frequently accessed data. LRU cache improve response times.

- **Cache Invalidation**: Invalidate cache với efficient algorithms. Invalidation ensure cache consistency.

**3. Authentication:**

- **Password Hashing**: Use bcrypt cho password hashing. bcrypt resist brute-force attacks.

- **Token Generation**: Generate secure tokens với cryptographic algorithms. Token generation ensure security.

**4. Data Processing:**

- **Pagination**: Implement efficient pagination algorithms. Pagination reduce data transfer và improve performance.

- **Aggregation**: Aggregate data với efficient algorithms. Aggregation enable analytics và reporting.

### 2.8.1.1. SOLID Principles

**SOLID** là năm nguyên tắc thiết kế phần mềm:

1. **Single Responsibility Principle (SRP)**: Mỗi class chỉ nên có một lý do để thay đổi.
2. **Open/Closed Principle (OCP)**: Mở rộng để thêm tính năng, đóng lại để sửa đổi.
3. **Liskov Substitution Principle (LSP)**: Các objects của superclass có thể được thay thế bằng objects của subclass.
4. **Interface Segregation Principle (ISP)**: Clients không nên phụ thuộc vào interfaces mà họ không sử dụng.
5. **Dependency Inversion Principle (DIP)**: Phụ thuộc vào abstractions, không phụ thuộc vào concretions.

### 2.7.2. Dependency Injection và Inversion of Control

**Dependency Injection (DI)**:

- Là một design pattern trong đó dependencies được inject vào một object thay vì object tự tạo chúng.
- Giảm coupling, tăng testability, và cải thiện flexibility.

**Inversion of Control (IoC)**:

- Là một nguyên tắc trong đó control flow được đảo ngược so với traditional programming.
- Framework quản lý lifecycle và dependencies của objects.

**Trong NestJS**:

- NestJS cung cấp một DI container tích hợp sẵn.
- Dependencies được inject thông qua constructor injection.
- Module system quản lý scope và lifecycle của providers.

## 2.9. Web Development Best Practices và Methodologies

Web Development Best Practices và Methodologies định nghĩa cách tiếp cận và practices để build modern web applications. Best practices ensure applications are secure, performant, accessible, và maintainable.

### 2.9.1. Web Application Architecture Patterns

Web Application Architecture Patterns định nghĩa cách organize và structure web applications. Patterns provide proven solutions cho common problems.

**MVC (Model-View-Controller) Pattern:**

- **Model**: Model represent data và business logic. Model manage data state và provide methods để manipulate data. Model không depend on View hoặc Controller.

- **View**: View present data cho users. View display information và handle user interactions. View observe Model changes và update accordingly.

- **Controller**: Controller handle user input và coordinate Model và View. Controller process requests, update Model, và update View. Controller act as intermediary giữa Model và View.

**MVP (Model-View-Presenter) Pattern:**

- **Model**: Model represent data và business logic, similar to MVC. Model provide data access và business rules.

- **View**: View present data và handle user interactions. View is passive và delegate logic to Presenter. View notify Presenter về user actions.

- **Presenter**: Presenter handle business logic và coordinate Model và View. Presenter update Model và update View. Presenter contain presentation logic.

**MVVM (Model-View-ViewModel) Pattern:**

- **Model**: Model represent data và business logic. Model provide data access và business rules.

- **View**: View present data và handle user interactions. View bind to ViewModel properties và commands.

- **ViewModel**: ViewModel expose data và commands cho View. ViewModel transform Model data cho View. ViewModel handle presentation logic và state.

**Benefits của Architecture Patterns:**

- **Separation of Concerns**: Patterns separate concerns và improve maintainability. Each component có specific responsibility và can be modified independently.

- **Testability**: Patterns improve testability với clear dependencies. Components can be tested in isolation với mocks và stubs.

- **Reusability**: Patterns improve reusability với modular design. Components can be reused across different contexts.

### 2.9.2. API Design và RESTful Principles

API Design và RESTful Principles định nghĩa cách design và implement web APIs. Good API design improve developer experience và system integration.

**RESTful Principles:**

- **Resource-Based URLs**: RESTful APIs use resource-based URLs với nouns, not verbs. URLs represent resources và hierarchy. URLs should be intuitive và predictable.

- **HTTP Methods**: RESTful APIs use appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE) cho operations. Methods have semantic meaning và are idempotent when appropriate.

- **Stateless Communication**: RESTful APIs are stateless, meaning each request contains all information needed. Stateless design improve scalability và simplify implementation.

- **Representation**: RESTful APIs use standard formats (JSON, XML) cho data representation. Representations should be consistent và well-documented.

**API Design Best Practices:**

- **Versioning**: API versioning maintain backward compatibility khi making changes. Versioning can be in URL hoặc headers. Versioning allow gradual migration và prevent breaking changes.

- **Pagination**: Pagination limit response size và improve performance. Pagination use page/limit hoặc cursor-based approaches. Pagination reduce bandwidth và improve user experience.

- **Filtering và Sorting**: Filtering và sorting allow clients request specific data. Filtering reduce data transfer và improve performance. Sorting provide flexibility cho clients.

- **Error Handling**: Error handling provide meaningful error messages và appropriate status codes. Error responses should be consistent và include details. Good error handling improve debugging và user experience.

**API Documentation:**

- **OpenAPI/Swagger**: OpenAPI/Swagger provide standard format cho API documentation. Documentation include endpoints, parameters, responses, và examples. Swagger UI provide interactive documentation.

- **API Examples**: API examples demonstrate how to use APIs. Examples include request/response samples và use cases. Examples improve developer experience và reduce integration time.

### 2.9.3. Frontend Development Best Practices

Frontend Development Best Practices ensure web applications provide excellent user experience và maintainable code.

**Component Design:**

- **Single Responsibility**: Components should have single responsibility và do one thing well. Single responsibility improve reusability và testability. Components should be focused và cohesive.

- **Props Interface**: Components should have well-defined props interface với TypeScript. Props interface provide type safety và documentation. Clear interfaces improve component usage.

- **State Management**: State management should be appropriate cho component scope. Local state cho component-specific data, global state cho shared data. Proper state management improve performance và maintainability.

- **Event Handling**: Event handling should be clear và consistent. Events should be named descriptively và follow conventions. Good event handling improve component communication.

**Performance Optimization:**

- **Code Splitting**: Code splitting divide code into smaller chunks loaded on-demand. Code splitting reduce initial bundle size và improve load times. Dynamic imports enable code splitting.

- **Lazy Loading**: Lazy loading load resources on-demand khi needed. Lazy loading reduce initial load time và improve perceived performance. Images, components, và routes can be lazy loaded.

- **Memoization**: Memoization cache computed values để avoid redundant calculations. Memoization improve performance cho expensive computations. React.memo và useMemo enable memoization.

- **Virtual Scrolling**: Virtual scrolling render only visible items trong long lists. Virtual scrolling improve performance cho large datasets. Only visible items are rendered, reducing DOM nodes.

**Accessibility (a11y):**

- **Semantic HTML**: Semantic HTML use appropriate HTML elements cho content. Semantic HTML improve accessibility và SEO. Screen readers understand semantic structure.

- **ARIA Attributes**: ARIA attributes provide additional information cho assistive technologies. ARIA labels, roles, và states improve accessibility. ARIA should be used when semantic HTML is insufficient.

- **Keyboard Navigation**: Keyboard navigation allow users navigate với keyboard only. Keyboard navigation improve accessibility và usability. All interactive elements should be keyboard accessible.

- **Color Contrast**: Color contrast ensure text is readable với sufficient contrast ratio. WCAG guidelines define minimum contrast ratios. Good contrast improve readability cho all users.

### 2.9.4. Backend Development Best Practices

Backend Development Best Practices ensure APIs are secure, performant, và maintainable.

**Security Best Practices:**

- **Input Validation**: Input validation validate và sanitize all user inputs. Validation prevent injection attacks và ensure data correctness. Validation should be done at multiple layers.

- **Authentication và Authorization**: Authentication verify user identity, authorization verify user permissions. JWT tokens provide stateless authentication. Role-based access control provide fine-grained authorization.

- **Rate Limiting**: Rate limiting prevent abuse và DDoS attacks. Rate limits restrict requests per IP address hoặc user. Rate limiting protect system từ overload.

- **HTTPS**: HTTPS encrypt data in transit và prevent man-in-the-middle attacks. SSL/TLS certificates should be valid và auto-renewed. HTTPS is essential cho production systems.

**Performance Best Practices:**

- **Database Optimization**: Database optimization include proper indexing, query optimization, và connection pooling. Indexes improve query performance significantly. Query optimization reduce execution time.

- **Caching**: Caching store frequently accessed data để reduce database load. Caching improve response times và scalability. Cache invalidation ensure data consistency.

- **Async Processing**: Async processing handle long-running operations without blocking. Background jobs process heavy tasks. Async processing improve responsiveness.

- **Response Compression**: Response compression reduce payload size với gzip hoặc brotli. Compression improve transfer times và reduce bandwidth. Compression should be enabled cho text-based responses.

**Code Organization:**

- **Layered Architecture**: Layered architecture separate concerns với clear layers. Layers include controllers, services, và repositories. Layered architecture improve maintainability và testability.

- **Dependency Injection**: Dependency Injection provide dependencies externally. DI improve testability và flexibility. DI containers manage dependencies automatically.

- **Error Handling**: Error handling manage errors gracefully với proper logging. Error responses should be consistent và informative. Global error handlers catch và format errors.

### 2.9.5. Database Design và Optimization

Database Design và Optimization ensure databases are efficient, scalable, và maintainable.

**Database Design Principles:**

- **Normalization**: Normalization reduce data redundancy và improve data integrity. Normal forms (1NF, 2NF, 3NF, BCNF) define normalization levels. Normalization balance với performance requirements.

- **Denormalization**: Denormalization introduce redundancy để improve performance. Denormalization trade storage space cho query performance. Denormalization should be done carefully với clear justification.

- **Indexing Strategy**: Indexing strategy define indexes cho frequently queried columns. Indexes improve query performance nhưng có overhead cho writes. Index strategy balance read performance với write performance.

- **Partitioning**: Partitioning divide large tables into smaller partitions. Partitioning improve query performance và manageability. Partitioning can be by range, list, hoặc hash.

**Query Optimization:**

- **Query Analysis**: Query analysis với EXPLAIN identify performance bottlenecks. Analysis show execution plans và identify missing indexes. Query analysis guide optimization efforts.

- **Avoid N+1 Queries**: Avoid N+1 queries với eager loading và joins. N+1 queries occur khi query parent entities và then query children separately. Eager loading load relationships trong single query.

- **Select Specific Columns**: Select specific columns thay vì SELECT \* để reduce data transfer. Selecting only needed columns improve performance và reduce memory usage.

- **Use Appropriate Data Types**: Use appropriate data types cho columns. Correct data types improve storage efficiency và query performance. Data types should match data characteristics.

**Database Maintenance:**

- **Regular Backups**: Regular backups protect data từ loss và corruption. Backups should be automated và tested regularly. Backup strategy include retention policies và recovery procedures.

- **Index Maintenance**: Index maintenance keep indexes optimized và prevent fragmentation. Regular REINDEX operations maintain index performance. Index maintenance improve query performance.

- **Vacuum và Analyze**: Vacuum và analyze operations maintain database health. VACUUM reclaim storage space, ANALYZE update statistics. Regular maintenance improve performance và prevent issues.

### 2.9.6. Security trong Web Development

Security trong Web Development protect applications và data từ threats và vulnerabilities. Security should be considered ở all layers của application.

**Common Vulnerabilities:**

- **SQL Injection**: SQL injection occur khi user input is directly used trong SQL queries. Prevention use parameterized queries và input validation. TypeORM automatically prevent SQL injection với parameterized queries.

- **Cross-Site Scripting (XSS)**: XSS occur khi malicious scripts are injected vào web pages. Prevention use content escaping và Content Security Policy. Vue.js automatically escape content trong templates.

- **Cross-Site Request Forgery (CSRF)**: CSRF occur khi unauthorized requests are made từ user's browser. Prevention use CSRF tokens và SameSite cookie attribute. CSRF protection validate request origin.

- **Authentication Vulnerabilities**: Authentication vulnerabilities include weak passwords, session hijacking, và token theft. Prevention use strong password policies, secure session management, và token expiration. Proper authentication protect user accounts.

**Security Best Practices:**

- **Principle of Least Privilege**: Principle of least privilege grant minimum permissions needed. Users và services should have only necessary access. Least privilege reduce attack surface.

- **Defense in Depth**: Defense in depth use multiple security layers. Multiple layers provide redundancy và reduce risk. Defense in depth include network, application, và data security.

- **Security Headers**: Security headers provide additional protection. Headers include Content-Security-Policy, X-Frame-Options, và Strict-Transport-Security. Security headers prevent common attacks.

- **Regular Security Audits**: Regular security audits identify vulnerabilities và weaknesses. Audits include code reviews, penetration testing, và dependency scanning. Security audits improve security posture.

### 2.9.7. Performance Monitoring và Optimization

Performance Monitoring và Optimization ensure applications meet performance requirements và provide good user experience.

**Performance Metrics:**

- **Response Time**: Response time measure time từ request đến response. Response time should be < 200ms cho 95% of requests. Response time impact user experience significantly.

- **Throughput**: Throughput measure number of requests processed per unit time. Throughput should support expected load với headroom. Throughput determine system capacity.

- **Error Rate**: Error rate measure percentage of requests resulting in errors. Error rate should be < 1% cho production systems. Error rate indicate system health.

- **Resource Utilization**: Resource utilization measure CPU, memory, và network usage. Utilization should be balanced và not exceed limits. Resource utilization guide scaling decisions.

**Monitoring Tools:**

- **Application Performance Monitoring (APM)**: APM tools monitor application performance và identify bottlenecks. APM provide insights into response times, database queries, và errors. APM tools include New Relic, Datadog, và AppDynamics.

- **Logging và Log Analysis**: Logging record application events và errors. Log analysis identify patterns và issues. Centralized logging improve debugging và monitoring.

- **Real User Monitoring (RUM)**: RUM monitor actual user experience với real user data. RUM provide insights into page load times và user interactions. RUM help identify performance issues affecting users.

**Optimization Strategies:**

- **Profiling**: Profiling identify performance bottlenecks trong code. Profiling tools measure execution time và resource usage. Profiling guide optimization efforts.

- **Caching**: Caching store frequently accessed data để reduce computation và database load. Caching improve response times significantly. Cache strategy should balance performance với consistency.

- **Database Optimization**: Database optimization include indexing, query optimization, và connection pooling. Optimization improve query performance và reduce database load.

- **CDN và Static Asset Optimization**: CDN distribute static assets globally để reduce latency. Asset optimization include compression, minification, và format optimization. CDN improve load times cho users worldwide.

## 2.10. Design Patterns

Design patterns là các giải pháp tái sử dụng được cho các vấn đề thiết kế phần mềm phổ biến. Patterns cung cấp một ngôn ngữ chung cho developers và giúp giải quyết các vấn đề thiết kế một cách elegant và maintainable.

### 2.10.1. Repository Pattern - Mẫu Kho Lưu Trữ

Repository Pattern tách biệt data access logic khỏi business logic, cung cấp một abstraction layer cho data access.

**Khái Niệm:**

- Repository đóng vai trò như một collection của domain objects
- Business logic không biết về chi tiết data access
- Repository cung cấp methods để query và persist data
- Có thể thay đổi data access implementation mà không ảnh hưởng business logic

**Cấu Trúc:**

- **Repository Interface**: Định nghĩa contract cho data access operations
- **Repository Implementation**: Implement interface với specific data access technology
- **Domain Entities**: Business objects được repository quản lý

**Lợi Ích:**

- **Separation of Concerns**: Tách biệt data access khỏi business logic
- **Testability**: Dễ dàng mock repositories cho testing
- **Flexibility**: Có thể thay đổi data access implementation
- **Consistency**: Consistent API cho data access operations
- **Centralized Logic**: Data access logic được tập trung

**Trong Dự Án:**

- ProductRepository: Quản lý data access cho products
- OrderRepository: Quản lý data access cho orders
- UserRepository: Quản lý data access cho users
- Mỗi repository cung cấp methods cụ thể cho domain đó

### 2.10.2. Service Layer Pattern - Mẫu Lớp Dịch Vụ

Service Layer Pattern tổ chức business logic thành các service classes, tách biệt business logic khỏi presentation và data access layers.

**Khái Niệm:**

- Services chứa business logic và orchestration
- Services coordinate giữa repositories và các services khác
- Controllers gọi services, không gọi repositories trực tiếp
- Services có thể call multiple repositories và services

**Cấu Trúc:**

- **Service Interface**: Định nghĩa contract cho business operations
- **Service Implementation**: Implement business logic
- **Repository Dependencies**: Services depend on repositories
- **Service Dependencies**: Services có thể depend on other services

**Lợi Ích:**

- **Business Logic Centralization**: Business logic được tập trung trong services
- **Reusability**: Business logic có thể được reuse ở nhiều nơi
- **Testability**: Dễ dàng test business logic với mocked repositories
- **Transaction Management**: Services quản lý transactions
- **Orchestration**: Services orchestrate complex operations

**Trong Dự Án:**

- ProductService: Business logic cho products (availability checks, pricing, etc.)
- OrderService: Business logic cho orders (validation, calculation, processing)
- UserService: Business logic cho users (authentication, authorization)
- Mỗi service chứa logic nghiệp vụ cụ thể cho domain đó

### 2.10.3. Factory Pattern - Mẫu Nhà Máy

Factory Pattern tạo objects mà không cần specify exact class, cung cấp một interface để tạo objects.

**Khái Niệm:**

- Factory method tạo objects dựa trên parameters
- Client code không biết exact class được tạo
- Factory quyết định class nào được instantiate
- Encapsulate object creation logic

**Các Loại Factory:**

1. **Simple Factory**: Một method tạo objects dựa trên type parameter
2. **Factory Method**: Subclasses quyết định class nào được tạo
3. **Abstract Factory**: Tạo families of related objects

**Lợi Ích:**

- **Encapsulation**: Object creation logic được encapsulate
- **Flexibility**: Có thể thay đổi object creation logic
- **Extensibility**: Dễ dàng thêm new object types
- **Decoupling**: Client code không phụ thuộc vào concrete classes

**Trong Dự Án:**

- PaymentProcessorFactory: Tạo payment processors dựa trên payment method
- NotificationSenderFactory: Tạo notification senders dựa trên channel type
- ExportFormatterFactory: Tạo formatters dựa trên export format

### 2.10.4. Strategy Pattern - Mẫu Chiến Lược

Strategy Pattern định nghĩa một family of algorithms, encapsulate mỗi algorithm, và làm cho chúng interchangeable. Strategy cho phép algorithm thay đổi độc lập với clients sử dụng nó.

**Khái Niệm:**

- Định nghĩa một family of algorithms
- Encapsulate mỗi algorithm trong một class riêng
- Làm cho algorithms interchangeable
- Client chọn algorithm tại runtime

**Cấu Trúc:**

- **Strategy Interface**: Định nghĩa contract cho algorithms
- **Concrete Strategies**: Implement specific algorithms
- **Context**: Sử dụng strategy interface
- **Client**: Chọn và sử dụng strategy

**Lợi Ích:**

- **Flexibility**: Có thể thay đổi algorithm tại runtime
- **Extensibility**: Dễ dàng thêm algorithms mới
- **Separation**: Algorithms được tách biệt khỏi context
- **Testability**: Dễ dàng test từng algorithm riêng biệt

**Trong Dự Án:**

- PricingStrategy: Different pricing strategies (regular, bulk, seasonal)
- DiscountStrategy: Different discount calculation strategies
- ShippingStrategy: Different shipping cost calculation strategies
- PaymentStrategy: Different payment processing strategies

### 2.10.5. Observer Pattern - Mẫu Quan Sát

Observer Pattern định nghĩa một dependency một-nhiều giữa objects, khi một object thay đổi state, tất cả dependents được notify và update automatically.

**Khái Niệm:**

- Subject (observable) maintain một list of observers
- Subject notify observers khi state thay đổi
- Observers update khi nhận notification
- Loose coupling giữa subject và observers

**Cấu Trúc:**

- **Subject**: Object có state và notify observers
- **Observer**: Interface cho objects cần được notify
- **Concrete Observers**: Implement observer interface

**Lợi Ích:**

- **Loose Coupling**: Subject không biết về concrete observers
- **Dynamic Relationships**: Có thể add/remove observers tại runtime
- **Broadcast Communication**: Một change có thể notify nhiều observers
- **Open/Closed Principle**: Có thể thêm observers mới mà không sửa subject

**Trong Dự Án:**

- Order Status Changes: Notify customers, admins, logistics khi order status thay đổi
- Product Updates: Notify interested users khi product được update
- Inventory Alerts: Notify admins khi inventory thấp
- Event-driven architecture cho real-time updates

### 2.10.6. Decorator Pattern - Mẫu Trang Trí

Decorator Pattern cho phép thêm behavior vào objects dynamically bằng cách wrap chúng trong decorator objects.

**Khái Niệm:**

- Decorator wrap original object
- Decorator implement cùng interface với original object
- Decorator thêm behavior trước hoặc sau delegating đến original object
- Có thể stack multiple decorators

**Lợi Ích:**

- **Dynamic Behavior**: Thêm behavior tại runtime
- **Flexibility**: Có thể combine behaviors
- **Single Responsibility**: Mỗi decorator có một responsibility
- **Open/Closed Principle**: Mở cho extension, đóng cho modification

**Trong Dự Án:**

- Caching Decorator: Cache results của service methods
- Logging Decorator: Log method calls và results
- Validation Decorator: Validate inputs trước khi execute
- Retry Decorator: Retry failed operations

### 2.10.7. Adapter Pattern - Mẫu Bộ Chuyển Đổi

Adapter Pattern cho phép objects với incompatible interfaces làm việc cùng nhau bằng cách wrap một object với adapter.

**Khái Niệm:**

- Adapter wrap incompatible object
- Adapter implement interface mà client expects
- Adapter translate calls từ client interface sang object interface
- Client không biết về adapter

**Lợi Ích:**

- **Compatibility**: Làm cho incompatible interfaces compatible
- **Reusability**: Reuse existing code với new interfaces
- **Separation**: Tách biệt adaptation logic
- **Flexibility**: Có thể swap implementations

**Trong Dự Án:**

- Payment Gateway Adapters: Adapt different payment gateway APIs
- External API Adapters: Adapt external service APIs
- Legacy System Adapters: Adapt legacy system interfaces
- Database Adapters: Adapt different database drivers

## 2.11. Containerization và Deployment

### 2.11.1. Docker

**Docker** là một platform cho containerization, cho phép package applications và dependencies vào containers để đảm bảo consistency across different environments.

**Lịch Sử và Khái Niệm:**

Docker được phát triển bởi Docker Inc. và được release vào năm 2013. Docker sử dụng containerization technology để tạo lightweight, portable, và self-sufficient containers. Docker đã cách mạng hóa cách developers deploy và run applications.

**Containerization - Công Nghệ Container:**

Containerization là một virtualization method ở operating system level, cho phép chạy multiple isolated applications trên cùng một host. Containers share host OS kernel nhưng có isolated filesystem, network, và process space.

**Containers vs Virtual Machines:**

- **Containers**: Share host OS kernel, lightweight (MBs), fast startup (seconds), less resource usage, better for microservices
- **Virtual Machines**: Full OS virtualization, heavier (GBs), slower startup (minutes), more resource usage, better for complete isolation
- **Containers**: Better for cloud-native applications và microservices architecture
- **VMs**: Better cho different OS requirements và complete isolation

**Docker Architecture:**

Docker sử dụng client-server architecture:

- **Docker Daemon**: Background service quản lý containers, images, networks, volumes. Daemon listen cho Docker API requests và manage Docker objects.

- **Docker Client**: CLI tool để interact với daemon. Client gửi commands đến daemon thông qua Docker API.

- **Docker Registry**: Store và distribute Docker images. Docker Hub là public registry, có thể setup private registries.

- **Docker Images**: Read-only templates chứa application code, dependencies, và configuration. Images được build từ Dockerfiles.

- **Docker Containers**: Running instances của images. Containers có own filesystem, network, và process space.

**Docker Images - Hình Ảnh Docker:**

Images là read-only templates chứa application code, dependencies, và configuration. Images được build từ Dockerfiles và có thể be stored trong registries.

**Image Layers:**

- Images được build từ multiple layers, mỗi layer đại diện cho một instruction trong Dockerfile
- Layers được cache để optimize builds, nếu layer không thay đổi, Docker reuse cached layer
- Sharing layers giữa images giảm storage requirements
- Layer caching giúp speed up rebuilds significantly

**Image Building:**

- **Dockerfile**: Script định nghĩa cách build image với instructions như FROM, RUN, COPY, WORKDIR, ENV, EXPOSE, CMD
- **Build Context**: Files và directories được sử dụng trong build process
- **Layer Caching**: Docker cache layers để speed up rebuilds, chỉ rebuild layers that changed
- **Multi-stage Builds**: Sử dụng multiple stages để optimize image size, separate build và runtime environments

**Docker Containers - Container Docker:**

Containers là running instances của images, isolated environments với own filesystem, network, và process space.

**Container Lifecycle:**

1. **Create**: Tạo container từ image với docker create
2. **Start**: Start container với docker start
3. **Run**: Execute application trong container với docker run (combine create và start)
4. **Stop**: Stop running container với docker stop
5. **Remove**: Delete container với docker rm

**Container Isolation:**

- **Filesystem Isolation**: Mỗi container có own filesystem, changes không affect host hoặc other containers
- **Network Isolation**: Containers có own network namespace, có thể communicate qua Docker networks
- **Process Isolation**: Containers có own process space, processes isolated từ host và other containers
- **Resource Limits**: Có thể set CPU và memory limits để prevent containers từ consuming too many resources

**Dockerfile - Tệp Docker:**

Dockerfile là script định nghĩa cách build Docker image với step-by-step instructions.

**Dockerfile Instructions:**

- **FROM**: Base image để build từ (Ubuntu, Alpine, Node, etc.)
- **RUN**: Execute commands trong build process (install packages, compile code)
- **COPY/ADD**: Copy files từ build context vào image
- **WORKDIR**: Set working directory cho subsequent instructions
- **ENV**: Set environment variables
- **EXPOSE**: Expose ports mà container will listen on
- **CMD/ENTRYPOINT**: Default command khi container starts

**Dockerfile Best Practices:**

- **Use .dockerignore**: Exclude unnecessary files từ build context để reduce build time và image size
- **Layer Optimization**: Order instructions để maximize cache, put frequently changing instructions at the end
- **Minimal Base Images**: Sử dụng minimal base images (Alpine Linux) để reduce image size
- **Multi-stage Builds**: Separate build và runtime stages để reduce final image size
- **Security**: Run containers với non-root user để improve security
- **Health Checks**: Add health checks để monitor container health
- **Single Responsibility**: Mỗi container should have single responsibility

**Docker Compose - Soạn Thảo Docker:**

Docker Compose là tool để define và run multi-container Docker applications với single command.

**Compose File:**

- **YAML Format**: Define services, networks, volumes trong docker-compose.yml file
- **Service Definitions**: Define containers và configurations cho each service
- **Networking**: Define networks cho containers to communicate
- **Volumes**: Define volumes cho data persistence
- **Environment Variables**: Set environment variables cho services
- **Dependencies**: Define dependencies giữa services

**Compose Benefits:**

- **Multi-container Applications**: Easily manage multi-container apps với single file
- **Service Dependencies**: Define dependencies, Docker Compose start services in correct order
- **Networking**: Automatic networking giữa services, services can communicate by service name
- **Volume Management**: Easy volume management và data persistence
- **Development Environment**: Consistent development environment across team members
- **One Command**: Start/stop entire application với single command

**Docker trong Dự Án:**

- **Backend Container**: NestJS application container với Node.js runtime
- **Frontend Container**: Nuxt 4 application container với Node.js runtime
- **Database Container**: PostgreSQL container với persistent volumes
- **Cache Container**: Redis container cho caching và session management
- **Nginx Container**: Reverse proxy container cho load balancing và SSL termination
- **Docker Compose**: Orchestrate tất cả containers với proper networking và dependencies

### 2.11.2. Nginx Reverse Proxy

**Nginx** là một high-performance web server, reverse proxy, load balancer, và HTTP cache, được phát triển bởi Igor Sysoev và được release vào năm 2004.

**Lịch Sử và Đặc Điểm:**

Nginx được tạo ra để giải quyết C10K problem (handling 10,000 concurrent connections). Nginx sử dụng event-driven, asynchronous, non-blocking architecture để achieve high performance. Nginx nổi tiếng với high performance, stability, rich feature set, và low resource consumption.

**Reverse Proxy - Proxy Ngược:**

Reverse proxy là một server đứng giữa clients và backend servers, forward requests từ clients đến appropriate backend server và return responses.

**Cách Hoạt Động:**

1. Client gửi request đến reverse proxy (Nginx)
2. Reverse proxy forward request đến backend server dựa trên configuration
3. Backend server xử lý request và trả về response
4. Reverse proxy forward response về client
5. Client nhận response từ reverse proxy, không biết về backend server

**Lợi Ích của Reverse Proxy:**

- **Load Distribution**: Phân phối requests across multiple backend servers để improve performance và reliability
- **SSL Termination**: Xử lý SSL/TLS encryption, giảm load trên backend servers
- **Caching**: Cache responses để giảm backend load và improve response times
- **Security**: Hide backend servers, add security layers (rate limiting, DDoS protection)
- **Compression**: Compress responses để giảm bandwidth usage
- **Request Routing**: Route requests đến different backends dựa trên URL, headers, etc.

**Load Balancing - Cân Bằng Tải:**

Nginx có thể phân phối requests across multiple backend servers để improve performance và reliability.

**Load Balancing Methods:**

1. **Round Robin**: Phân phối requests tuần tự (mặc định), mỗi server nhận request theo turn
2. **Least Connections**: Forward đến server với ít connections nhất, tốt cho long-lived connections
3. **IP Hash**: Phân phối dựa trên client IP (sticky sessions), đảm bảo same client đến same server
4. **Weighted Round Robin**: Phân phối với weights cho servers, servers với higher weights nhận more requests
5. **Weighted Least Connections**: Least connections với weights

**Load Balancing Benefits:**

- **High Availability**: Nếu một server fails, requests được forward đến servers khác, no single point of failure
- **Scalability**: Có thể thêm servers để handle more load, scale horizontally
- **Performance**: Distribute load để improve response times, no server overloaded
- **Reliability**: Redundancy cho critical services, system continues operating nếu một server fails

**SSL/TLS Termination - Kết Thúc SSL/TLS:**

Nginx có thể xử lý SSL/TLS encryption, decrypt requests trước khi forward đến backend.

**SSL/TLS Process:**

1. Client gửi HTTPS request đến Nginx
2. Nginx decrypt request với SSL certificate
3. Nginx forward plain HTTP request đến backend (hoặc HTTPS nếu cần)
4. Backend trả về plain HTTP response (hoặc HTTPS)
5. Nginx encrypt response và gửi về client

**SSL/TLS Benefits:**

- **Performance**: Backend servers không cần xử lý SSL overhead, improve performance
- **Centralized Management**: Manage SSL certificates ở một nơi, easier certificate management
- **Certificate Renewal**: Dễ dàng renew certificates, không cần update all backend servers
- **Security**: Centralized security configuration, easier to maintain security policies

**Caching - Bộ Nhớ Đệm:**

Nginx có thể cache responses để giảm backend load và improve response times.

**Caching Strategy:**

- **Cache Keys**: Define cache keys dựa trên request URI, headers, query parameters
- **Cache Zones**: Define cache storage zones với size limits và time-to-live (TTL)
- **Cache Validity**: Set cache expiration times, cache được invalidated khi expired
- **Cache Invalidation**: Invalidate cache khi cần (manual hoặc automatic)
- **Cache Bypass**: Bypass cache cho specific requests (admin, authenticated users)

**Caching Benefits:**

- **Performance**: Serve cached responses nhanh hơn, reduce response times significantly
- **Backend Load Reduction**: Giảm số requests đến backend, reduce database load
- **Bandwidth Savings**: Giảm bandwidth usage, especially cho static content
- **User Experience**: Faster response times cho users, improve user experience

**Nginx Configuration - Cấu Hình Nginx:**

Nginx configuration được định nghĩa trong nginx.conf file với directives và contexts.

**Configuration Structure:**

- **Main Context**: Global settings (worker processes, error logs, etc.)
- **Events Context**: Event processing settings (connection handling, etc.)
- **HTTP Context**: HTTP server settings (MIME types, log formats, etc.)
- **Server Context**: Virtual server settings (server name, listen port, etc.)
- **Location Context**: URL location settings (proxy pass, caching, etc.)

**Key Directives:**

- **upstream**: Define backend servers cho load balancing
- **server**: Define virtual server với server name và listen port
- **location**: Define URL matching và handling (proxy_pass, caching, etc.)
- **proxy_pass**: Forward requests đến backend server
- **proxy_set_header**: Set headers cho backend requests
- **cache**: Configure caching với cache zones và keys

**Nginx trong Dự Án:**

- **Reverse Proxy**: Forward requests đến NestJS backend với proper routing
- **Load Balancing**: Distribute requests across multiple backend instances để improve performance và reliability
- **SSL Termination**: Handle HTTPS connections với SSL certificates, forward plain HTTP đến backend
- **Static File Serving**: Serve static files từ frontend (images, CSS, JavaScript) với proper caching
- **Caching**: Cache API responses và static files để reduce backend load và improve response times
- **Rate Limiting**: Limit requests per IP để prevent abuse và DDoS attacks
- **Compression**: Compress responses (gzip, brotli) để giảm bandwidth usage
- **Security Headers**: Add security headers (HSTS, CSP, X-Frame-Options) để improve security

---

> **Nguồn tham khảo**: Nội dung trong chương này được tổng hợp và trình bày lại từ các file DOCUMENTATION.md của Backend và Frontend, với mục đích học thuật và tránh đạo văn.
