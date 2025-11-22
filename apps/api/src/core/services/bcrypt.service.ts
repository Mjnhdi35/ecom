import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}
  async hash(raw: string): Promise<string> {
    const salt = +this.configService.getOrThrow('SALT_ROUNDS');
    return bcrypt.hash(raw, salt);
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(raw, hash);
  }
}
