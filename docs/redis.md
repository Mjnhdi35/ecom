# Redis & Caching

## Tổng quan

Dự án sử dụng **Redis 7** cho caching, session management, và distributed locking với **ioredis** client và **redlock** library.

## Redis Setup

### Phiên bản

- **Redis 7**: Phiên bản ổn định mới nhất

### Docker Configuration

```yaml
redis:
  image: redis:7
  command: >
    redis-server
      --appendonly yes
      --appendfsync everysec
      --save 60 10000
  ports:
    - '6379:6379'
```

### Tùy chọn Cấu hình

- `appendonly yes`: Bật AOF persistence
- `appendfsync everysec`: Đồng bộ mỗi giây
- `save 60 10000`: RDB snapshot mỗi 60s nếu 10000 keys thay đổi

## Redis Module

### Module Structure

```typescript
@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.getOrThrow<string>('REDIS_HOST'),
          port: +configService.getOrThrow<number>('REDIS_PORT'),
          password: configService.getOrThrow<string>('REDIS_PASSWORD'),
          maxRetriesPerRequest: null,
          enableReadyCheck: true,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
```

### Quản lý Kết nối

- **Global Module**: Có sẵn trong toàn bộ ứng dụng
- **Event Listeners**: Sự kiện connect, error, close
- **Retry Logic**: Hành vi retry có thể cấu hình

## Cache Service

### Service Overview

`CacheService` là wrapper cho Redis operations với các features:

- Basic get/set/delete
- TTL support
- JSON serialization
- Distributed locking (Redlock)
- Pub/Sub messaging

### Basic Operations

#### Get

```typescript
async get<T>(key: string): Promise<T | null> {
  const value = await this.redisClient.get(key);
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
}
```

- Tự động parse JSON
- Trả về null nếu key không tồn tại
- Xử lý cả JSON và string values

#### Set

```typescript
async set<T>(key: string, value: T, ttlSeconds?: number) {
  const val = typeof value === 'string' ? value : JSON.stringify(value);
  if (ttlSeconds) {
    await this.redisClient.set(key, val, 'EX', ttlSeconds);
  } else {
    await this.redisClient.set(key, val);
  }
}
```

- Tự động stringify JSON
- Hỗ trợ TTL tùy chọn
- Xử lý cả objects và strings

#### Delete

```typescript
async del(key: string) {
  await this.redisClient.del(key);
}
```

## Distributed Locking

### Redlock Implementation

```typescript
private redlock: Redlock;

constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
  this.redlock = new Redlock([this.redisClient], {
    driftFactor: 0.01,
    retryCount: 10,
    retryDelay: 200,
  });
}
```

### Lock Acquisition

```typescript
async lock(key: string, ttl: number) {
  try {
    const lock = await this.redlock.acquire([key], ttl);
    return lock; // lock.release() để unlock
  } catch {
    return null; // failed to acquire
  }
}
```

### Trường hợp sử dụng

- Ngăn chặn race conditions
- Đảm bảo các thao tác atomic
- Điều phối hệ thống phân tán

### Ví dụ sử dụng

```typescript
const lock = await cacheService.lock('user:123', 5000);
if (lock) {
  try {
    // Critical section
  } finally {
    await lock.release();
  }
}
```

## Pub/Sub Messaging

### Publish

```typescript
async pub(channel: string, message: string) {
  await this.redisClient.publish(channel, message);
}
```

### Subscribe

```typescript
async subscribe(channel: string, handler: (msg: string) => void) {
  const sub = new Redis(this.redisClient.options);
  await sub.subscribe(channel);
  sub.on('message', (_ch, message) => handler(message));
}
```

### Trường hợp sử dụng

- Thông báo real-time
- Vô hiệu hóa cache
- Phát sóng sự kiện

## Authentication Token Storage

### Refresh Token Caching

```typescript
// Store refresh token
const refreshTTL = (msValueRf ?? 0) / 1000;
await this.cache.set(`refresh:${userId}`, refreshToken, refreshTTL);

// Verify refresh token
const cachedToken = await this.cache.get<string>(`refresh:${payload.sub}`);
if (!cachedToken || cachedToken !== body.refreshToken) {
  throw new UnauthorizedException('Refresh token invalid or expired');
}

// Delete on logout
await this.cache.del(`refresh:${userId}`);
```

### Mẫu Key

- `refresh:{userId}`: Refresh token storage
- TTL matches JWT refresh token expiration
- Automatic cleanup on expiration

## Mẫu Cache

### Mẫu Cache-Aside

```typescript
// 1. Check cache
let data = await cache.get('key');
if (!data) {
  // 2. Load from database
  data = await repository.find();
  // 3. Store in cache
  await cache.set('key', data, 3600);
}
return data;
```

### Mẫu Write-Through

```typescript
// 1. Write to database
await repository.save(data);
// 2. Update cache
await cache.set('key', data, 3600);
```

### Cache Invalidation

```typescript
// Delete specific key
await cache.del('key');

// Delete pattern (requires SCAN)
// Or use pub/sub for distributed invalidation
```

## Performance Considerations

### Connection Pooling

ioredis tự động quản lý connections:

- Reuse connections
- Connection pooling
- Automatic reconnection

### Serialization Overhead

- JSON.stringify/parse có overhead
- Consider binary serialization cho large objects
- Use compression cho very large values

### Memory Management

- Set appropriate TTLs
- Monitor memory usage
- Use Redis eviction policies

## Best Practices

### 1. Đặt tên Key

- ✅ Sử dụng quy ước đặt tên nhất quán
- ✅ Bao gồm namespace prefix
- ✅ Sử dụng dấu hai chấm cho hierarchy: `user:123:profile`

### 2. Quản lý TTL

- ✅ Luôn đặt TTL cho dữ liệu được cache
- ✅ Khớp TTL với yêu cầu độ tươi của dữ liệu
- ✅ Sử dụng TTL ngắn hơn cho dữ liệu thay đổi thường xuyên

### 3. Xử lý Lỗi

- ✅ Xử lý lỗi kết nối Redis một cách graceful
- ✅ Fallback về database nếu cache thất bại
- ✅ Log lỗi cache để giám sát

### 4. Bảo mật

- ✅ Sử dụng xác thực mật khẩu
- ✅ Hạn chế truy cập mạng
- ✅ Không lưu dữ liệu nhạy cảm mà không mã hóa

### 5. Giám sát

- ✅ Giám sát việc sử dụng bộ nhớ Redis
- ✅ Theo dõi tỷ lệ cache hit/miss
- ✅ Cảnh báo khi kết nối thất bại

## Cải tiến Tương lai

### Tính năng dự kiến

- Chiến lược cache warming
- Phiên bản hóa cache
- Caching nhiều cấp
- Dashboard phân tích cache
- Hỗ trợ Redis cluster
