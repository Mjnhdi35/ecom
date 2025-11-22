import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}
  async hash(raw: string): Promise<string> {
    const salt = +this.configService.getOrThrow('SALT_ROUNDS');
    return bcrypt.hashSync(raw, salt);
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(raw, hash);
  }
}
