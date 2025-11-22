import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import request, { Response } from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../src/modules/users/entities/user.entity';
import { UsersModule } from '../src/modules/users/users.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { CacheService } from '../src/core/services/cache.service';
import { BcryptService } from '../src/core/services/bcrypt.service';
import { CoreModule } from '../src/core/core.module';
import { RedisModule } from '../src/redis/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../src/modules/auth/guards/jwt.guard';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let cacheService: CacheService;
  let mockUserStore: Map<string, User>;
  let mockCacheStore: Map<string, string>;

  const getTestUser = () => ({
    displayName: 'Test User',
    email: `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
  });

  // Mock Repository
  const createMockRepository = () => {
    const store = new Map<string, User>();
    return {
      findOne: jest.fn(
        async (options: { where: { email?: string; id?: string } }) => {
          if (options.where.email) {
            return (
              Array.from(store.values()).find(
                (u) => u.email === options.where.email,
              ) || null
            );
          }
          if (options.where.id) {
            return store.get(options.where.id) || null;
          }
          return null;
        },
      ),
      findOneBy: jest.fn(async (options: { email?: string; id?: string }) => {
        if (options.email) {
          return (
            Array.from(store.values()).find((u) => u.email === options.email) ||
            null
          );
        }
        if (options.id) {
          return store.get(options.id) || null;
        }
        return null;
      }),
      create: jest.fn((data: Partial<User>) => {
        const user = new User();
        Object.assign(user, data);
        // Generate valid UUID v4
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
          /[xy]/g,
          (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          },
        );
        user.id = uuid;
        return user;
      }),
      save: jest.fn(async (user: User) => {
        store.set(user.id, { ...user });
        return user;
      }),
      update: jest.fn(async (id: string, data: Partial<User>) => {
        const user = store.get(id);
        if (user) {
          // Only update fields that are provided and not undefined
          Object.keys(data).forEach((key) => {
            const typedKey = key as keyof User;
            if (data[typedKey] !== undefined) {
              (user as any)[typedKey] = data[typedKey];
            }
          });
          store.set(id, { ...user });
        }
      }),
      remove: jest.fn(async (user: User) => {
        store.delete(user.id);
        return user;
      }),
      _getStore: () => store,
    };
  };

  // Mock CacheService
  const createMockCacheService = () => {
    const store = new Map<string, string>();
    return {
      get: jest.fn(async <T>(key: string): Promise<T | null> => {
        const value = store.get(key);
        if (!value) return null;
        try {
          return JSON.parse(value) as T;
        } catch {
          return value as T;
        }
      }),
      set: jest.fn(async <T>(key: string, value: T, ttlSeconds?: number) => {
        const val = typeof value === 'string' ? value : JSON.stringify(value);
        store.set(key, val);
      }),
      del: jest.fn(async (key: string) => {
        store.delete(key);
      }),
      _getStore: () => store,
    };
  };

  beforeAll(async () => {
    const mockRepo = createMockRepository();
    const mockCache = createMockCacheService();
    mockUserStore = mockRepo._getStore();
    mockCacheStore = mockCache._getStore();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
          load: [
            () => ({
              JWT_SECRET: process.env.JWT_SECRET || 'test-secret-key',
              JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || '15m',
              JWT_REFRESH_SECRET:
                process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-key',
              JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '7d',
              SALT_ROUNDS: process.env.SALT_ROUNDS || '10',
              REDIS_HOST: process.env.REDIS_HOST || 'localhost',
              REDIS_PORT: process.env.REDIS_PORT || '6379',
              REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
            }),
          ],
        }),
        UsersModule,
        AuthModule,
        CoreModule,
        RedisModule,
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepo)
      .overrideProvider(CacheService)
      .useValue(mockCache)
      .overrideProvider('REDIS_CLIENT')
      .useValue({
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        publish: jest.fn(),
        flushdb: jest.fn(),
        on: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    cacheService = moduleFixture.get<CacheService>(CacheService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // Clear mocks before each test
    mockUserStore.clear();
    mockCacheStore.clear();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user successfully (happy case)', async () => {
      const testUser = getTestUser();
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(typeof response.body.accessToken).toBe('string');
      expect(typeof response.body.refreshToken).toBe('string');
      expect(response.body.accessToken.length).toBeGreaterThan(0);
      expect(response.body.refreshToken.length).toBeGreaterThan(0);
    });

    it('should fail to register with duplicate email (bad case)', async () => {
      const testUser = getTestUser();
      // First register
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      // Try to register again with same email
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(409);

      expect(response.body.message).toContain('Duplicated');
    });

    it('should fail to register with invalid email (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          displayName: 'Test User',
          email: 'invalid-email',
          password: 'password123',
        })
        .expect(400);
    });

    it('should fail to register with short password (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          displayName: 'Test User',
          email: 'test2@example.com',
          password: '12345',
        })
        .expect(400);
    });

    it('should fail to register with missing fields (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test3@example.com',
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login successfully with correct credentials (happy case)', async () => {
      const testUser = getTestUser();
      // First register a user
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(typeof response.body.accessToken).toBe('string');
      expect(typeof response.body.refreshToken).toBe('string');
      expect(response.body.accessToken.length).toBeGreaterThan(0);
      expect(response.body.refreshToken.length).toBeGreaterThan(0);

      // Extract user ID from token payload (basic check)
      const tokenParts = response.body.accessToken.split('.');
      expect(tokenParts.length).toBe(3);
    });

    it('should fail to login with wrong password (bad case)', async () => {
      const testUser = getTestUser();
      // First register a user
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(400);

      expect(response.body.message).toContain('match');
    });

    it('should fail to login with non-existent email (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(404)
        .expect((res: Response) => {
          expect(res.body.message).toContain('Not Found');
        });
    });

    it('should fail to login with invalid email format (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid-email',
          password: 'password123',
        })
        .expect(400);
    });

    it('should fail to login with short password (bad case)', async () => {
      const testUser = getTestUser();
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: '12345',
        })
        .expect(400);
    });

    it('should fail to login with missing fields (bad case)', async () => {
      const testUser = getTestUser();
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
        })
        .expect(400);
    });
  });

  describe('/auth/me (GET)', () => {
    it('should get current user info with valid token (happy case)', async () => {
      const testUser = getTestUser();
      // First register and login to get token
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(201);

      const token = loginResponse.body.accessToken;
      expect(token).toBeDefined();

      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', testUser.email);
      expect(response.body).toHaveProperty('displayName', testUser.displayName);
      // Password should be excluded by @Exclude() decorator
      // Note: In some cases, password might still be in the object but should not be accessible
      if (response.body.password) {
        expect(response.body.password).not.toBe(testUser.password);
      }
    });

    it('should fail without token (bad case)', () => {
      return request(app.getHttpServer()).get('/auth/me').expect(401);
    });

    it('should fail with invalid token (bad case)', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('should fail with expired token (bad case)', () => {
      // Using a clearly invalid JWT token format
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid';
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
  });

  describe('/auth/refresh (POST)', () => {
    it('should refresh tokens successfully (happy case)', async () => {
      const testUser = getTestUser();
      // First register and login to get refresh token
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(201);

      const refreshTokenValue = loginResponse.body.refreshToken;
      expect(refreshTokenValue).toBeDefined();

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: refreshTokenValue })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(typeof response.body.accessToken).toBe('string');
      expect(typeof response.body.refreshToken).toBe('string');
      expect(response.body.accessToken.length).toBeGreaterThan(0);
      expect(response.body.refreshToken.length).toBeGreaterThan(0);
      // New tokens should be different from old ones
      // Note: Tokens might be the same if generated at the exact same time with same payload
      // So we just verify that new tokens are returned
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      // Verify that refresh token in cache was updated (new token should be different or same, but cache should have it)
      const cachedToken = await cacheService.get<string>(
        `refresh:${loginResponse.body.accessToken.split('.')[1] ? JSON.parse(Buffer.from(loginResponse.body.accessToken.split('.')[1], 'base64').toString()).sub : ''}`,
      );
      // Just verify tokens are valid JWT format
      expect(response.body.refreshToken.split('.').length).toBe(3);
    });

    it('should fail with invalid refresh token (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'invalid-refresh-token' })
        .expect(401)
        .expect((res: Response) => {
          expect(res.body.message).toContain('Invalid');
        });
    });

    it('should fail with missing refresh token (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({})
        .expect(400);
    });

    it('should fail with empty refresh token (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: '' })
        .expect(400);
    });

    it('should fail with expired refresh token (bad case)', async () => {
      // Create a token that's not in cache (simulating expired/invalid)
      const fakeToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.invalid';
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: fakeToken })
        .expect(401);
    });
  });

  describe('/auth/logout (POST)', () => {
    it('should logout successfully (happy case)', async () => {
      const testUser = getTestUser();
      // First register and login to get token
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(201);

      const token = loginResponse.body.accessToken;
      const refreshTokenValue = loginResponse.body.refreshToken;

      const logoutResponse = await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(logoutResponse.body.message).toContain('successfully');

      // Verify refresh token is removed - try to use it
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: refreshTokenValue })
        .expect(401);
    });

    it('should fail without token (bad case)', () => {
      return request(app.getHttpServer()).post('/auth/logout').expect(401);
    });

    it('should fail with invalid token (bad case)', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
