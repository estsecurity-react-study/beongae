import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { jwtCookieOptions } from './jwt-cookie.options';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
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

    const { access_token, refresh_token } = await this.authService.login(req.user);

    // refresh token update - user db table
    await this.authService.updateRefreshToken(req.user.id, refresh_token);

    // 쿠키에 token 설정
    res.cookie('Authorization', access_token, jwtCookieOptions);
    res.cookie('REFRESH_TOKEN', refresh_token, jwtCookieOptions);

    return req.user; // 필요에 맞게 token or user 리턴
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() res) {
    const options = {
      ...jwtCookieOptions,
      expires: new Date(),
    };
    res.cookie('Authorization', '', options);
    res.cookie('REFRESH_TOKEN', '', options);
    res.sendStatus(200);
  }

  @ApiOperation({ summary: 'Refresh Token 검증으로 Access Token 발급' })
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res) {
    const accessToken = this.authService.createAccessToken(req.user);

    // 쿠키에 accessToken 설정
    res.cookie('Authorization', accessToken, jwtCookieOptions);

    return req.user;
  }

  @ApiOperation({ summary: '내 정보' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    console.log('AuthController getProfile', req.user);
    return req.user;
  }
}
