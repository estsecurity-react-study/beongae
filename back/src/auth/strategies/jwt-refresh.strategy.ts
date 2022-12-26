import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.REFRESH_TOKEN;
        },
      ]),
      // ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    console.log('JwtRefreshStrategy validate', payload);
    const refreshToken = req.cookies?.REFRESH_TOKEN;

    const user = await this.usersService.getUserRefreshTokenMatching(payload.sub, refreshToken);
    if (!user) {
      throw new UnauthorizedException('INVALID_USER');
    }

    return user; // req.user 에 할당됨
    // return { id: payload.sub, userName: payload.username }; // req.user 에 할당됨
  }
}
