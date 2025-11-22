import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: (configServicce: ConfigService) => {
        const redis = new Redis({
          host: configServicce.getOrThrow<string>('REDIS_HOST'),
          port: +configServicce.getOrThrow<number>('REDIS_PORT'),
          password: configServicce.getOrThrow<string>('REDIS_PASSWORD'),
          maxRetriesPerRequest: null,
          enableReadyCheck: true,
        });
        redis.on('connect', () => console.log('Redis connected'));
        redis.on('error', (error) => console.error('Redis error', error));
        redis.on('close', () => console.warn('Redis connection closed'));
        return redis;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
