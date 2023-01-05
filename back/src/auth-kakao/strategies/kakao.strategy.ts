import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      // clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('KAKAO_CALLBACK_URL'),
      scope: ['account_email', 'profile_nickname'],
      // proxy: true,
    });
  }

  private readonly USER_URL = 'https://kapi.kakao.com/v2/user/me';

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username, _json } = profile;
    // console.log('KakaoStrategy profile ====== ', profile);

    const {
      kakao_account: { email },
    } = _json;

    if (!email) {
      throw new UnauthorizedException('INVALID_EMAIL');
    }

    // TODO: email 정보(사용자 선택없이) 못가져오는 듯
    // oauth 는 전반적으로 이메일이 아닌 다른 방법으로 유니크한 값 처리 필요
    // ex) provider 와 id 로 유니크 체크(구글, 네이버, 카카오 모두 동일하게 처리 할 수 있는지 확인 먼저)
    // const loggedUser = await firstValueFrom(
    //   this.httpService.get(this.USER_URL, {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }),
    // );
    // console.log('KakaoStrategy loggedUser ====== ', loggedUser);

    return {
      provider: 'kakao',
      providerId: id,
      userName: username,
      email,
      accessToken,
      // refreshToken,
    }; // req.user 에 저장됨
  }
}
