import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // JwtStrategy 의 ignoreExpiration 값과 연관해서 알아보자.(상관 없는 거 같음)
  // constructor(
  //   private readonly configService: ConfigService,
  //   private readonly jwtService: JwtService,
  // ) {
  //   super();
  // }
  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   await super.canActivate(context);
  //   const request = context.switchToHttp().getRequest();
  //   const token = request?.cookies?.Authorization;
  //   console.log('JwtAuthGuard token', token);
  //   if (token === undefined) {
  //     throw new UnauthorizedException();
  //   }
  //   return this.validateToken(token);
  // }
  // validateToken(token: string) {
  //   const secretKey = this.configService.get('JWT_SECRET');
  //   try {
  //     const verify = this.jwtService.verify(token, { secret: secretKey });
  //     console.log('verify', verify);
  //     return verify ? true : false;
  //   } catch (e) {
  //     switch (e.message) {
  //       // 토큰에 대한 오류를 판단합니다.
  //       case 'INVALID_TOKEN':
  //       case 'TOKEN_IS_ARRAY':
  //       case 'NO_USER':
  //         throw new HttpException('유효하지 않은 토큰입니다.', 401);
  //       case 'EXPIRED_TOKEN':
  //         throw new HttpException('토큰이 만료되었습니다.', 410);
  //       default:
  //         throw new HttpException('서버 오류입니다.', 500);
  //     }
  //   }
  // }
}
