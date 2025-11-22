import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthRequest, Public } from '../../core';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Get('me')
  async me(@Req() req: AuthRequest) {
    return await this.authService.me(req.user.sub);
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body() token: RefreshDto) {
    return await this.authService.refreshToken(token);
  }

  @Post('logout')
  async logout(@Req() req: AuthRequest) {
    await this.authService.logout(req.user.sub);
    return { message: 'Logged out successfully' };
  }
}
