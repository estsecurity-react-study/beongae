import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청 패킷 헤더의 Authorization 키에 저장된 값을 사용
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authorization;
        },
      ]),
      ignoreExpiration: false, // 토큰이 만료되었는지 검사 (true: strategy 단에서 에러로 리턴하지 않도록 설정, false: jwt token 보증을 passport 모듈에 위임함)
      secretOrKey: jwtConstants.secret,
    });
  }

  // api 요청시 마다 호출됨
  async validate(payload: any) {
    console.log('JwtStrategy validate', payload);
    const user = await this.usersService.findById(payload.sub);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword; // req.user 에 할당됨
    // return { id: payload.sub, userName: payload.username }; // req.user 에 할당됨
  }
}
