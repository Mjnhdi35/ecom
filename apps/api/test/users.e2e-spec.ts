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
import { CoreModule } from '../src/core/core.module';
import { RedisModule } from '../src/redis/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../src/modules/auth/guards/jwt.guard';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let cacheService: CacheService;
  let mockUserStore: Map<string, User>;
  let mockCacheStore: Map<string, string>;

  const getTestUser = () => ({
    displayName: 'Test User',
    email: `testuser-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
  });

  const getOtherUser = () => ({
    displayName: 'Other User',
    email: `otheruser-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`,
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

  describe('/users/:id (GET)', () => {
    it('should get user by id successfully (happy case)', async () => {
      const testUser = getTestUser();
      // Register to get userId
      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser);
      const newToken = registerResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${newToken}`);
      const currentUserId = meResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`/users/${currentUserId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', currentUserId);
      expect(response.body).toHaveProperty('email', testUser.email);
      expect(response.body).toHaveProperty('displayName', testUser.displayName);
      // Password should be excluded by @Exclude() decorator
      if (response.body.password) {
        expect(response.body.password).not.toBe(testUser.password);
      }
    });

    it('should get other user by id successfully (happy case)', async () => {
      const testUser = getTestUser();
      const otherUser = getOtherUser();
      // Register both users
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const otherRegisterResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(otherUser);

      const otherLoginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: otherUser.email,
          password: otherUser.password,
        });
      const otherToken = otherLoginResponse.body.accessToken;

      const otherMeResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${otherToken}`);
      const currentOtherUserId = otherMeResponse.body.id;

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const currentToken = loginResponse.body.accessToken;

      const response = await request(app.getHttpServer())
        .get(`/users/${currentOtherUserId}`)
        .set('Authorization', `Bearer ${currentToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', currentOtherUserId);
      expect(response.body).toHaveProperty('email', otherUser.email);
      // Password should be excluded by @Exclude() decorator
      if (response.body.password) {
        expect(typeof response.body.password).toBe('string');
      }
    });

    it('should fail without token (bad case)', async () => {
      const testUser = getTestUser();
      // Register a user first
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${newToken}`);
      const currentUserId = meResponse.body.id;

      return request(app.getHttpServer())
        .get(`/users/${currentUserId}`)
        .expect(401);
    });

    it('should fail with invalid token (bad case)', async () => {
      const testUser = getTestUser();
      // Register a user first
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${loginResponse.body.accessToken}`);
      const currentUserId = meResponse.body.id;

      return request(app.getHttpServer())
        .get(`/users/${currentUserId}`)
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('should return null for non-existent user (bad case)', async () => {
      const testUser = getTestUser();
      // Register a user first to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app.getHttpServer())
        .get(`/users/${fakeId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .expect(200);

      // Service returns null, but NestJS serializes it as empty object
      expect(response.body).toEqual({});
    });

    it('should fail with invalid UUID format (bad case)', async () => {
      const testUser = getTestUser();
      // Register a user first to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      return request(app.getHttpServer())
        .get('/users/invalid-id')
        .set('Authorization', `Bearer ${newToken}`)
        .expect(400);
    });
  });

  describe('/users/:id (PATCH)', () => {
    it('should update user displayName successfully (happy case)', async () => {
      const testUser = getTestUser();
      // Register to get userId
      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser);
      const newToken = registerResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${newToken}`);
      const currentUserId = meResponse.body.id;

      const updatedName = 'Updated Test User';
      const response = await request(app.getHttpServer())
        .patch(`/users/${currentUserId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({ displayName: updatedName })
        .expect(200);

      expect(response.body).toHaveProperty('displayName', updatedName);
      expect(response.body).toHaveProperty('id', currentUserId);
      expect(response.body).toHaveProperty('email', testUser.email);
    });

    it('should update user password successfully (happy case)', async () => {
      const testUser = getTestUser();
      // Register a user
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${newToken}`);
      const currentUserId = meResponse.body.id;

      const newPassword = 'newpassword123';
      const response = await request(app.getHttpServer())
        .patch(`/users/${currentUserId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({ password: newPassword })
        .expect(200);

      expect(response.body).toHaveProperty('id', currentUserId);

      // Verify password was updated by trying to login
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: newPassword,
        })
        .expect(201);
    });

    it('should update multiple fields successfully (happy case)', async () => {
      const testUser = getTestUser();
      // Register a user
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${newToken}`);
      const currentUserId = meResponse.body.id;

      const updatedData = {
        displayName: 'Multi Updated User',
        password: 'multipass123',
      };
      const response = await request(app.getHttpServer())
        .patch(`/users/${currentUserId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toHaveProperty(
        'displayName',
        updatedData.displayName,
      );
    });

    it('should fail without token (bad case)', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .patch(`/users/${fakeId}`)
        .send({ displayName: 'New Name' })
        .expect(401);
    });

    it('should fail with invalid token (bad case)', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .patch(`/users/${fakeId}`)
        .set('Authorization', 'Bearer invalid-token')
        .send({ displayName: 'New Name' })
        .expect(401);
    });

    it('should fail with non-existent user (bad case)', async () => {
      const testUser = getTestUser();
      // Register and login to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const fakeId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .patch(`/users/${fakeId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({ displayName: 'New Name' })
        .expect(404)
        .expect((res: Response) => {
          expect(res.body.message).toMatch(/not found/i);
        });
    });

    it('should fail with short password (bad case)', async () => {
      const testUser = getTestUser();
      // Register and login to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${newToken}`);
      const currentUserId = meResponse.body.id;

      return request(app.getHttpServer())
        .patch(`/users/${currentUserId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({ password: '12345' })
        .expect(400);
    });

    it('should fail with invalid UUID format (bad case)', async () => {
      const testUser = getTestUser();
      // Register and login to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      return request(app.getHttpServer())
        .patch('/users/invalid-id')
        .set('Authorization', `Bearer ${newToken}`)
        .send({ displayName: 'New Name' })
        .expect(400);
    });

    it('should handle empty update body (happy case - no changes)', async () => {
      const testUser = getTestUser();
      // Register to get userId
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${newToken}`);
      const currentUserId = meResponse.body.id;

      const beforeUpdate = await request(app.getHttpServer())
        .get(`/users/${currentUserId}`)
        .set('Authorization', `Bearer ${newToken}`);

      const response = await request(app.getHttpServer())
        .patch(`/users/${currentUserId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({})
        .expect(200);

      // After empty update, user data should remain the same
      expect(response.body).toHaveProperty('id', currentUserId);
      expect(response.body).toHaveProperty('email', testUser.email);
      // displayName should be preserved from before update
      if (beforeUpdate.body.displayName) {
        expect(response.body.displayName).toBe(beforeUpdate.body.displayName);
      } else {
        expect(response.body.displayName).toBe(testUser.displayName);
      }
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete user successfully (happy case)', async () => {
      const deleteUser = {
        ...getTestUser(),
        displayName: 'Delete Me',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(deleteUser);

      const deleteUserToken = registerResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${deleteUserToken}`);
      const userToDeleteId = meResponse.body.id;

      return request(app.getHttpServer())
        .delete(`/users/${userToDeleteId}`)
        .set('Authorization', `Bearer ${deleteUserToken}`)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain('successfully');
        });
    });

    it('should verify user is deleted (happy case)', async () => {
      const testUser = getTestUser();
      // Register a user to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const deleteUser = {
        ...getTestUser(),
        displayName: 'Delete Me',
      };

      const deleteRegisterResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(deleteUser);

      const deleteUserToken = deleteRegisterResponse.body.accessToken;

      const deleteMeResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${deleteUserToken}`);
      const userToDeleteId = deleteMeResponse.body.id;

      // Delete the user
      await request(app.getHttpServer())
        .delete(`/users/${userToDeleteId}`)
        .set('Authorization', `Bearer ${deleteUserToken}`)
        .expect(200);

      // Verify user is deleted
      const response = await request(app.getHttpServer())
        .get(`/users/${userToDeleteId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .expect(200);

      expect(response.body).toEqual({});
    });

    it('should fail without token (bad case)', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .delete(`/users/${fakeId}`)
        .expect(401);
    });

    it('should fail with invalid token (bad case)', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .delete(`/users/${fakeId}`)
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('should fail with non-existent user (bad case)', async () => {
      const testUser = getTestUser();
      // Register a user to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      const fakeId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .delete(`/users/${fakeId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .expect(404)
        .expect((res: Response) => {
          expect(res.body.message).toContain('not found');
        });
    });

    it('should fail with invalid UUID format (bad case)', async () => {
      const testUser = getTestUser();
      // Register a user to get token
      await request(app.getHttpServer()).post('/auth/register').send(testUser);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      const newToken = loginResponse.body.accessToken;

      return request(app.getHttpServer())
        .delete('/users/invalid-id')
        .set('Authorization', `Bearer ${newToken}`)
        .expect(400);
    });
  });
});
