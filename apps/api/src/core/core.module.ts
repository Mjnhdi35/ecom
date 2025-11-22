import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';

@Global()
@Module({
  imports: [],
  exports: [BcryptService],
  providers: [BcryptService],
})
export class CoreModule {}
