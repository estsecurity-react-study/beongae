import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'), // process.env.GOOGLE_CLIENT_ID,
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'), // process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'), // Google이 사용자를 인증한 후 리디렉션할 앱의 엔드포인트
      scope: ['email', 'profile'],
      // proxy: true,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails, photos } = profile;
    // console.log('GoogleStrategy profile ====== ', profile);

    return {
      provider: 'google',
      providerId: id,
      // name: name.givenName,
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
      picture: photos[0].value,
      // accessToken,
      // refreshToken,
    }; // req.user 에 저장됨
  }
}
