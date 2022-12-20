import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    console.log('AuthController login', req.user);

    const { access_token } = await this.authService.login(req.user);
    res.cookie('Authorization', access_token, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
    return req.user; // 필요에 맞게 token or user 리턴
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() res) {
    res.cookie('Authorization', '', {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      expires: new Date(),
    });
    res.sendStatus(200);
  }
}
