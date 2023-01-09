import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (info?.message === 'jwt expired') {
      throw new UnauthorizedException('EXPIRED_TOKEN');
    } else if (info?.message === 'invalid token') {
      throw new UnauthorizedException('INVALID_TOKEN');
    } else if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
