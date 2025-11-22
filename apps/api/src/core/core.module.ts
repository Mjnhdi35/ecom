import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { CacheService } from './services/cache.service';

@Global()
@Module({
  imports: [],
  exports: [BcryptService, CacheService],
  providers: [BcryptService, CacheService],
})
export class CoreModule {}
