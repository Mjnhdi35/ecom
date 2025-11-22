import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import request, { Response } from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/modules/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../src/core/services/cache.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let userRepository: Repository<User>;
  let cacheService: CacheService;
  let accessToken: string;
  let refreshToken: string;
  let userId: string;

  const getTestUser = () => ({
    displayName: 'Test User',
    email: `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

    dataSource = moduleFixture.get<DataSource>(DataSource);
    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    cacheService = moduleFixture.get<CacheService>(CacheService);

    await app.init();
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await app.close();
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

      accessToken = response.body.accessToken;
      refreshToken = response.body.refreshToken;
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
      expect(response.body).not.toHaveProperty('password');
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
      // New tokens should be different from old ones (at least refresh token should be different)
      expect(response.body.refreshToken).not.toBe(refreshTokenValue);
      // Access token might be the same if generated at the same time, so we just check it exists
      expect(response.body.accessToken).toBeDefined();
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
