import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { jwtCookieOptions } from './jwt-cookie.options';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

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
  async logout(@Req() req, @Res() res) {
    // const options = {
    //   ...jwtCookieOptions,
    //   expires: new Date(),
    // };
    // res.cookie('Authorization', '', options);
    // res.cookie('REFRESH_TOKEN', '', options);
    // TODO: logout 예외처리 해야함 (JwtAuthGuard 사용할지 따로 guard 만들지 생각해보자)
    res.clearCookie('Authorization', jwtCookieOptions);
    res.clearCookie('REFRESH_TOKEN', jwtCookieOptions);
    await this.authService.updateRefreshToken(req.user.id, null);

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
    return req.user;
  }
}
