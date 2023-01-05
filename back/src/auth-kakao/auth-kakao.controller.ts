import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { jwtCookieOptions } from 'src/auth/jwt-cookie.options';
import { AuthKakaoService } from './auth-kakao.service';
import { KakaoOAuthGuard } from './guards/kakao-oauth.guard';

@Controller('auth/kakao')
export class AuthKakaoController {
  constructor(private readonly authKakaoService: AuthKakaoService) {}

  @Get('login')
  @UseGuards(KakaoOAuthGuard)
  async kakaoAuth() {
    // kakao login 페이지로 이동됨
  }

  @Get('callback')
  @UseGuards(KakaoOAuthGuard)
  async kakaoAuthRedirect(@Req() req, @Res() res) {
    // kakao 인증 성공 (req.user 에 카카오에서 전달받은 사용자 정보 있음)
    console.log('kakaoAuthRedirect', req.user);

    // 사용자가 있으면 리턴 없으면 생성
    const { email, userName } = req.user;
    const user = await this.authKakaoService.findByMailOrSave(email, userName);

    // db에 있는 사용자로 토큰 발급
    const { access_token, refresh_token } =
      await this.authKakaoService.createTokensAndUpdateRefreshToken(user);

    // 쿠키에 token 설정
    res.cookie('Authorization', access_token, jwtCookieOptions);
    res.cookie('REFRESH_TOKEN', refresh_token, jwtCookieOptions);

    // return req.user;
    res.redirect('http://localhost:5173'); // TODO: port 만 바꿔서 리다이렉트 하는 방법 찾아보자
  }
}
