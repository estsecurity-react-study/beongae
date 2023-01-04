import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller('auth-google')
export class AuthGoogleController {
  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    // google login 페이지로 이동됨
  }

  @Get('redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req) {
    // return this.appService.googleLogin(req);
    console.log('googleAuthRedirect', req.user);

    // res.redirect('/');
    return req.user;
  }
}
