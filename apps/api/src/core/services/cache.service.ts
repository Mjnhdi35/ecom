import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';

@Injectable()
export class CacheService {
  private redlock: Redlock;

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
    // Redlock cho distributed lock
    this.redlock = new Redlock([this.redisClient], {
      driftFactor: 0.01,
      retryCount: 10,
      retryDelay: 200,
    });
  }

  // --- basic get/set/del ---
  async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T; // cast T → safe enough
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds?: number) {
    const val = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redisClient.set(key, val, 'EX', ttlSeconds);
    } else {
      await this.redisClient.set(key, val);
    }
  }

  async del(key: string) {
    await this.redisClient.del(key);
  }

  // --- Redlock ---
  async lock(key: string, ttl: number) {
    try {
      const lock = await this.redlock.acquire([key], ttl);
      return lock; // lock.release() để unlock
    } catch {
      return null; // failed to acquire
    }
  }

  // --- Pub/Sub ---
  async pub(channel: string, message: string) {
    await this.redisClient.publish(channel, message);
  }

  async subscribe(channel: string, handler: (msg: string) => void) {
    const sub = new Redis(this.redisClient.options);
    await sub.subscribe(channel);
    sub.on('message', (_ch, message) => handler(message));
  }

  // --- Reset toàn bộ cache (cẩn thận) ---
  async reset() {
    await this.redisClient.flushdb();
  }
}
