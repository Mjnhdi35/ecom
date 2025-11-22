import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { BcryptService } from '../../core/services/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(body: CreateUserDto) {
    const user = await this.userService.create(body);
    if (!user) {
      throw new NotFoundException('Not Found');
    }
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
    const payload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
    });

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
    if (!body.refreshToken) {
      throw new NotFoundException('Not Found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(body.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      return await this.generatedTokens(payload.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid Resource');
    }
  }
}
