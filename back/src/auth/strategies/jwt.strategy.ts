import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청 패킷 헤더의 Authorization 키에 저장된 값을 사용
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authorization;
        },
      ]),
      // 토큰이 만료되었는지 검사
      // true: strategy 단에서 에러로 리턴하지 않도록 설정 - 토큰 체크는 JwtAuthGuard 에서
      // false: jwt token 보증을 passport 모듈에 위임함
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // api 요청시 마다 호출됨
  async validate(payload: JwtPayload) {
    console.log('JwtStrategy validate', payload);
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('INVALID_USER');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...userWithoutPassword } = user;
    // return userWithoutPassword; // User Entity 에서 @Exclude 로 처리함.

    // return user; // req.user 에 할당됨
    return payload; // req.user 에 할당됨
  }
}
