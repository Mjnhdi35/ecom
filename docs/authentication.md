# Authentication Flow

## Tổng quan

Hệ thống sử dụng **JWT (JSON Web Tokens)** cho xác thực với mẫu strategy **Passport.js**. Hỗ trợ access tokens và refresh tokens với lưu trữ Redis.

## Authentication Architecture

### Components

1. **JwtStrategy**: Passport JWT strategy
2. **JwtAuthGuard**: Global guard bảo vệ routes
3. **AuthService**: Business logic cho authentication
4. **CacheService**: Redis storage cho refresh tokens
5. **BcryptService**: Password hashing

## JWT Tokens

### Token Types

#### Access Token

- **Mục đích**: Xác thực các request API
- **Thời gian sống**: 15 phút (có thể cấu hình)
- **Lưu trữ**: Phía client (localStorage/cookies)
- **Secret**: `JWT_SECRET`

#### Refresh Token

- **Mục đích**: Lấy access token mới
- **Thời gian sống**: 7 ngày (có thể cấu hình)
- **Lưu trữ**: Redis cache + phía client
- **Secret**: `JWT_REFRESH_SECRET`

### Token Structure

```typescript
interface JwtPayload {
  sub: string; // ID người dùng
  iat?: number; // Thời điểm phát hành
  exp?: number; // Thời điểm hết hạn
}
```

## Authentication Flow

### 1. Registration

```
Client → POST /auth/register
  ↓
AuthService.register()
  ↓
UsersService.create() → Hash password với bcrypt
  ↓
Generate tokens (access + refresh)
  ↓
Store refresh token in Redis
  ↓
Return { accessToken, refreshToken }
```

### 2. Login

```
Client → POST /auth/login
  ↓
AuthService.login()
  ↓
Find user by email
  ↓
Verify password với bcrypt.compare()
  ↓
Generate tokens
  ↓
Store refresh token in Redis
  ↓
Return { accessToken, refreshToken }
```

### 3. Protected Route Access

```
Client → GET /users/:id (with Bearer token)
  ↓
JwtAuthGuard intercepts
  ↓
Extract token from Authorization header
  ↓
JwtStrategy validates token
  ↓
Verify signature với JWT_SECRET
  ↓
Check expiration
  ↓
Validate payload
  ↓
Attach user to request
  ↓
Controller handler
```

### 4. Token Refresh

```
Client → POST /auth/refresh (with refreshToken)
  ↓
AuthService.refreshToken()
  ↓
Verify refresh token với JWT_REFRESH_SECRET
  ↓
Check token in Redis cache
  ↓
Compare with provided token
  ↓
Generate new access + refresh tokens
  ↓
Update Redis cache
  ↓
Return new tokens
```

### 5. Logout

```
Client → POST /auth/logout
  ↓
AuthService.logout()
  ↓
Delete refresh token from Redis
  ↓
Return success
```

## Implementation Details

### JWT Strategy

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
```

### Global Guard

```typescript
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
```

### Public Decorator

```typescript
@Public()
@Post('login')
async login(@Body() dto: LoginDto) {
  // Public endpoint, bypasses JwtAuthGuard
}
```

## Password Security

### Bcrypt Hashing

```typescript
// Hash password
const hashedPassword = await bcryptService.hash(password, saltRounds);

// Verify password
const isMatch = await bcryptService.compare(password, hashedPassword);
```

### Configuration

- **Salt Rounds**: 10 (configurable via `SALT_ROUNDS`)
- **Thuật toán**: bcrypt
- **One-way**: Cannot be reversed

### Security Features

- ✅ Salted hashing
- ✅ Configurable cost factor
- ✅ Constant-time comparison
- ✅ Never store plain passwords

## Token Generation

### Access Token

```typescript
const accessToken = await this.jwtService.signAsync(payload, {
  secret: this.configService.getOrThrow('JWT_SECRET'),
  expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES'), // '15m'
});
```

### Refresh Token

```typescript
const refreshToken = await this.jwtService.signAsync(payload, {
  secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
  expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES'), // '7d'
});

// Store in Redis
const msValueRf = ms(this.configService.getOrThrow('JWT_REFRESH_EXPIRES'));
const refreshTTL = (msValueRf ?? 0) / 1000;
await this.cache.set(`refresh:${userId}`, refreshToken, refreshTTL);
```

## Refresh Token Validation

### Verification Process

```typescript
// 1. Verify JWT signature
const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
  secret: this.configService.get('JWT_REFRESH_SECRET'),
});

// 2. Check in Redis cache
const cachedToken = await this.cache.get<string>(`refresh:${payload.sub}`);

// 3. Compare tokens
if (!cachedToken || cachedToken !== refreshToken) {
  throw new UnauthorizedException('Refresh token invalid or expired');
}

// 4. Generate new tokens
return await this.generatedTokens(payload.sub);
```

## Security Considerations

### Lưu trữ Token

- **Access Token**: Phía client (dễ bị XSS)
- **Refresh Token**: Redis + Client (an toàn hơn)
- **Lưu ý**: Sử dụng httpOnly cookies để bảo mật tốt hơn

### Hết hạn Token

- **Access token ngắn hạn**: Giảm rủi ro nếu bị xâm phạm
- **Refresh token dài hạn**: UX tốt hơn, lưu trữ an toàn
- **Tự động refresh**: Client nên refresh trước khi hết hạn

### Thu hồi Token

- **Logout**: Xóa refresh token khỏi Redis
- **Token rotation**: Refresh token mới mỗi lần refresh
- **Blacklisting**: Có thể triển khai danh sách đen token nếu cần

## Error Handling

### Authentication Errors

```typescript
// Invalid token
throw new UnauthorizedException('Invalid token');

// Expired token
throw new UnauthorizedException('Token expired');

// Token not found in cache
throw new UnauthorizedException('Refresh token invalid or expired');
```

### HTTP Status Codes

- `401 Unauthorized`: Invalid/expired token
- `400 Bad Request`: Invalid credentials
- `404 Not Found`: User not found

## Best Practices

### 1. Token Management

- ✅ Use short-lived access tokens
- ✅ Store refresh tokens securely
- ✅ Implement token rotation
- ✅ Handle token expiration gracefully

### 2. Password Security

- ✅ Never store plain passwords
- ✅ Use strong hashing (bcrypt)
- ✅ Validate password strength
- ✅ Implement password reset flow

### 3. Security

- ✅ Use different secrets for access/refresh tokens
- ✅ Validate tokens on every request
- ✅ Implement rate limiting
- ✅ Use HTTPS in production

### 4. Error Messages

- ✅ Don't reveal if user exists
- ✅ Generic error messages
- ✅ Log detailed errors server-side

## Cải tiến Tương lai

### Tính năng dự kiến

- Xoay refresh token
- Danh sách đen token
- Hỗ trợ đa thiết bị
- Tích hợp OAuth2
- Hỗ trợ 2FA
- Quản lý phiên
