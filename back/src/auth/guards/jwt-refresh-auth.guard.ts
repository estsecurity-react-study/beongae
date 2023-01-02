import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}
// TODO: refresh token expired 체크해서 커스텀 예외 발생은 나중에 하자.
