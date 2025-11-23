# Thuật toán & Mẫu thiết kế

## Tổng quan

Tài liệu này mô tả các thuật toán, mẫu thiết kế (design patterns), và mẫu kiến trúc (architectural patterns) được sử dụng trong dự án.

## Mẫu thiết kế

### 1. Dependency Injection (DI)

#### Mẫu thiết kế

Tất cả dependencies được inject qua constructor thay vì tạo trực tiếp.

#### Implementation

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}
}
```

#### Lợi ích

- ✅ Liên kết lỏng lẻo
- ✅ Dễ test (mock dependencies)
- ✅ Nguyên tắc Trách nhiệm Đơn lẻ

### 2. Repository Pattern

#### Mẫu thiết kế

Lớp truy cập dữ liệu trừu tượng, tách business logic khỏi các thao tác database.

#### Implementation

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: string) {
    return await this.userRepo.findOne({ where: { id } });
  }
}
```

#### Lợi ích

- ✅ Có thể test (mock repositories)
- ✅ Business logic độc lập với database
- ✅ Truy cập dữ liệu tập trung

### 3. Strategy Pattern

#### Mẫu thiết kế

JWT authentication sử dụng mẫu Passport Strategy.

#### Implementation

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
```

#### Lợi ích

- ✅ Phương thức xác thực có thể cắm
- ✅ Tách biệt mối quan tâm
- ✅ Dễ mở rộng

### 4. Guard Pattern

#### Mẫu thiết kế

Bảo vệ route với Guards.

#### Implementation

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Applied globally
}
```

#### Lợi ích

- ✅ Ủy quyền tập trung
- ✅ Logic bảo vệ tái sử dụng
- ✅ Bảo vệ route khai báo

### 5. Decorator Pattern

#### Mẫu thiết kế

Metadata và sửa đổi hành vi với decorators.

#### Examples

```typescript
@Public()              // Custom decorator
@Controller('users')    // Route decorator
@Get(':id')            // HTTP method decorator
@Injectable()          // DI decorator
@Entity()              // ORM decorator
```

#### Lợi ích

- ✅ Lập trình khai báo
- ✅ Đính kèm metadata
- ✅ Tổ chức code

## Mẫu Caching

### 1. Mẫu Cache-Aside

#### Mẫu thiết kế

Ứng dụng kiểm tra cache trước, sau đó mới đến database.

#### Implementation

```typescript
async findOne(id: string) {
  // 1. Check cache
  let user = await this.cache.get<User>(`user:${id}`);

  if (!user) {
    // 2. Load from database
    user = await this.userRepo.findOne({ where: { id } });

    // 3. Store in cache
    if (user) {
      await this.cache.set(`user:${id}`, user, 3600);
    }
  }

  return user;
}
```

#### Lợi ích

- ✅ Giảm tải database
- ✅ Thời gian phản hồi nhanh hơn
- ✅ Vô hiệu hóa cache linh hoạt

### 2. Mẫu Write-Through

#### Mẫu thiết kế

Ghi vào cả cache và database đồng thời.

#### Implementation

```typescript
async update(id: string, data: UpdateUserDto) {
  // 1. Update database
  await this.userRepo.update(id, data);

  // 2. Update cache
  const updated = await this.findOne(id);
  await this.cache.set(`user:${id}`, updated, 3600);

  return updated;
}
```

#### Lợi ích

- ✅ Cache luôn nhất quán
- ✅ Không có dữ liệu cũ
- ✅ Vô hiệu hóa đơn giản

## Thuật toán Bảo mật

### 1. Băm mật khẩu Bcrypt

#### Thuật toán

Bcrypt với configurable salt rounds.

#### Implementation

```typescript
async hash(raw: string): Promise<string> {
  const salt = +this.configService.getOrThrow('SALT_ROUNDS');
  return bcrypt.hash(raw, salt);
}

async compare(raw: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(raw, hash);
}
```

#### Tính năng Bảo mật

- ✅ Salted hashing (ngăn chặn rainbow tables)
- ✅ Chi phí thích ứng (chống brute force)
- ✅ Hàm một chiều (không thể đảo ngược)
- ✅ So sánh thời gian cố định (ngăn timing attacks)

#### Độ phức tạp

- **Thời gian**: O(2^saltRounds)
- **Không gian**: O(1)

### 2. Tạo JWT Token

#### Thuật toán

HMAC-SHA256 signing với expiration.

#### Implementation

```typescript
const payload: JwtPayload = { sub: userId };
const token = await this.jwtService.signAsync(payload, {
  secret: this.configService.getOrThrow('JWT_SECRET'),
  expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES'),
});
```

#### Tính năng Bảo mật

- ✅ Token được ký (ngăn giả mạo)
- ✅ Hết hạn (giới hạn phơi nhiễm)
- ✅ Secret riêng cho access/refresh
- ✅ Xác thực payload

### 3. Distributed Locking (Redlock)

#### Thuật toán

Khóa phân tán với Redis để ngăn chặn race conditions.

#### Implementation

```typescript
async lock(key: string, ttl: number) {
  try {
    const lock = await this.redlock.acquire([key], ttl);
    return lock;
  } catch {
    return null;
  }
}
```

#### Trường hợp sử dụng

- Ngăn chặn cập nhật đồng thời
- Đảm bảo thao tác atomic
- Điều phối hệ thống phân tán

#### Chi tiết Thuật toán

- **Hệ số Drift**: 0.01 (dung sai lệch đồng hồ 1%)
- **Số lần thử lại**: 10 lần
- **Độ trễ thử lại**: 200ms

## Data Structures

### 1. Kế thừa Entity

#### Mẫu thiết kế

Base entity với common fields.

#### Implementation

```typescript
export abstract class DateEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity({ name: 'users' })
export class User extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // ...
}
```

#### Lợi ích

- ✅ Nguyên tắc DRY
- ✅ Timestamps nhất quán
- ✅ Dễ mở rộng

### 2. Primary Keys UUID

#### Mẫu thiết kế

UUID thay vì auto-increment integers.

#### Lợi ích

- ✅ Duy nhất toàn cầu
- ✅ Không rò rỉ tuần tự
- ✅ Thân thiện với hệ thống phân tán

## Thuật toán Validation

### 1. Validation DTO

#### Mẫu thiết kế

Decorator-based validation với class-validator.

#### Implementation

```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  displayName: string;
}
```

#### Validation Flow

1. Request received
2. ValidationPipe transforms body to DTO
3. class-validator validates properties
4. Errors thrown if invalid
5. Controller receives validated DTO

## Mẫu Xử lý Lỗi

### 1. Mẫu Exception Filter

#### Mẫu thiết kế

NestJS tự động transform exceptions thành HTTP responses.

#### Implementation

```typescript
throw new NotFoundException('User not found');
// → 404 { "statusCode": 404, "message": "User not found" }

throw new BadRequestException('Invalid input');
// → 400 { "statusCode": 400, "message": "Invalid input" }
```

#### Lợi ích

- ✅ Phản hồi lỗi nhất quán
- ✅ Mã trạng thái HTTP đúng
- ✅ Xử lý lỗi tập trung

## Performance Optimizations

### 1. Connection Pooling

#### Mẫu thiết kế

Reuse database connections.

#### Implementation

TypeORM tự động quản lý connection pool.

#### Lợi ích

- ✅ Giảm overhead kết nối
- ✅ Sử dụng tài nguyên tốt hơn
- ✅ Cải thiện hiệu năng

### 2. Tối ưu Query

#### Mẫu thiết kế

Select only needed fields, use indexes.

#### Implementation

```typescript
// Good: Select specific fields
await this.repo.find({
  select: ['id', 'email', 'displayName'],
});

// Good: Use indexes
@Index()
@Column()
email: string;
```

## Cân nhắc Thuật toán Tương lai

### Mẫu thiết kế dự kiến

- **CQRS**: Phân tách Trách nhiệm Command Query
- **Event Sourcing**: Kiến trúc hướng sự kiện
- **Circuit Breaker**: Pattern khả năng phục hồi
- **Rate Limiting**: Giới hạn request
- **Retry Pattern**: Tự động thử lại với exponential backoff
