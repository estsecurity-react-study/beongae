import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { jwtCookieOptions } from 'src/auth/jwt-cookie.options';
import { AuthGoogleService } from './auth-google.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller('auth/google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    // google login 페이지로 이동됨
  }

  @Get('callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    // google 인증 성공 (req.user 에 구글에서 전달받은 사용자 정보 있음)
    // console.log('googleAuthRedirect', req.user);

    // 사용자가 있으면 리턴 없으면 생성
    const { email, firstName, lastName } = req.user;
    const user = await this.authGoogleService.findByMailOrSave(email, firstName, lastName);

    // db에 있는 사용자로 토큰 발급
    const { access_token, refresh_token } =
      await this.authGoogleService.createTokensAndUpdateRefreshToken(user);

    // 쿠키에 token 설정
    res.cookie('Authorization', access_token, jwtCookieOptions);
    res.cookie('REFRESH_TOKEN', refresh_token, jwtCookieOptions);

    res.redirect('http://localhost:5173'); // TODO: port 만 바꿔서 리다이렉트 하는 방법 찾아보자
  }
}
