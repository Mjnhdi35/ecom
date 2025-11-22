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

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let userRepository: Repository<User>;
  let cacheService: CacheService;

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

  describe('/users/:id (GET)', () => {
    it('should get user by id successfully (happy case)', async () => {
      const testUser = getTestUser();
      // Re-register to get fresh userId after beforeEach cleanup
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
      expect(response.body).not.toHaveProperty('password');
    });

    it('should get other user by id successfully (happy case)', async () => {
      const testUser = getTestUser();
      const otherUser = getOtherUser();
      // Re-register both users after beforeEach cleanup
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
      expect(response.body).not.toHaveProperty('password');
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
      // Re-register to get fresh userId after beforeEach cleanup
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
      // Re-register to get fresh userId after beforeEach cleanup
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
      // Re-register to get fresh userId after beforeEach cleanup
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
      // Re-register to get fresh userId after beforeEach cleanup
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

      expect(response.body.displayName).toBe(beforeUpdate.body.displayName);
    });
  });

  describe('/users/:id (DELETE)', () => {
    let userToDeleteId: string;
    let deleteUserToken: string;

    beforeAll(async () => {
      // Create a user specifically for deletion tests
      const deleteUser = {
        ...getTestUser(),
        displayName: 'Delete Me',
      };

      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(deleteUser);

      deleteUserToken = registerResponse.body.accessToken;

      const meResponse = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${deleteUserToken}`);
      userToDeleteId = meResponse.body.id;
    });

    it('should delete user successfully (happy case)', () => {
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

      return request(app.getHttpServer())
        .get(`/users/${userToDeleteId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toBeFalsy();
        });
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
