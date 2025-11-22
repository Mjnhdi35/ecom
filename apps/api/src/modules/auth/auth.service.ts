import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshDto } from './dto/refresh.dto';
import ms, { StringValue } from 'ms';
import { BcryptService, CacheService, JwtPayload } from '../../core';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cache: CacheService,
  ) {}
  async register(body: CreateUserDto) {
    const user = await this.userService.create(body);
    const tokens = await this.generatedTokens(user.id);
    return tokens;
  }

  async login(body: LoginDto) {
    const { email, password } = body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Not Found');
    }
    const isMatch = await this.bcryptService.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Not match');
    }
    const tokens = await this.generatedTokens(user.id);
    return tokens;
  }

  private async generatedTokens(userId: string) {
    const payload: JwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES'),
    });
    const msValueRf = ms(
      this.configService.getOrThrow<StringValue>('JWT_REFRESH_EXPIRES'),
    );
    if (typeof msValueRf !== 'number' || msValueRf <= 0) {
      throw new Error('Invalid JWT_REFRESH_EXPIRES value');
    }
    const refreshTTL = (msValueRf ?? 0) / 1000;
    await this.cache.set(`refresh:${userId}`, refreshToken, refreshTTL);
    return { accessToken, refreshToken };
  }

  async me(id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('Not Found');
    }
    return user;
  }

  async refreshToken(body: RefreshDto) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(body.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      if (!payload || typeof payload.sub !== 'string') {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const cachedToken = await this.cache.get<string>(
        `refresh:${payload.sub}`,
      );
      if (!cachedToken || cachedToken !== body.refreshToken) {
        throw new UnauthorizedException('Refresh token invalid or expired');
      }

      return await this.generatedTokens(payload.sub);
    } catch {
      throw new UnauthorizedException('Invalid Resource');
    }
  }

  async logout(userId: string) {
    await this.cache.del(`refresh:${userId}`);
  }
}
