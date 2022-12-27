import {
  ExecutionContext,
  // HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const request = context.switchToHttp().getRequest();
    const token = request?.cookies?.Authorization;
    if (!token) {
      throw new UnauthorizedException('NO_TOKEN');
    }
    this.validateToken(token);

    return super.canActivate(context); // 호출하면 jwt strategey 실행됨
  }
  // handleRequest(err, user, info) {
  //   // You can throw an exception based on either "info" or "err" arguments
  //   console.log('handleRequest');
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }

  validateToken(token: string) {
    const secretKey = this.configService.get('JWT_SECRET');
    try {
      // jsonwebtoken
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify; // jwt payload 를 리턴
    } catch (err) {
      // TODO: 예외 발생시 request 의 headers 정보를 그대로 살리면서 발생시키는 방법 찾아보자
      if (err.message === 'jwt expired') {
        console.log('expired token');
        // throw new HttpException('EXPIRED_TOKEN', 410);
        throw new UnauthorizedException('EXPIRED_TOKEN');
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        // throw new HttpException('INVALID_TOKEN', 401);
        throw new UnauthorizedException('INVALID_TOKEN');
      } else {
        // throw new HttpException('서버 오류입니다.', 500);
        throw new InternalServerErrorException('서버 오류입니다.');
      }
    }
  }
}
