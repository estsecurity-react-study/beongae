import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(userId: string, plaintextPassword: string): Promise<any> {
    const user = await this.usersService.findByUserId(userId);
    console.log('AuthService validateUser', user);
    if (user) {
      const isMatching = await bcrypt.compare(plaintextPassword, user.password);
      if (isMatching) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { password, ...userWithoutPassword } = user;
        // return userWithoutPassword; // user entity 에서 @Exclude 로 처리
        return user;
      }
      return null;
    }
    return null;
  }

  async login(user: User) {
    console.log('AuthService login user', user);
    return {
      access_token: this.createAccessToken(user),
      refresh_token: this.createRefreshToken(user),
    };
  }

  getJwtPayload(user: User) {
    const payload: JwtPayload = { username: user.userName, sub: user.id }; // TODO: 토큰 payload 는 다시 생각해 보자
    return payload;
  }

  createAccessToken(user: User) {
    const payload = this.getJwtPayload(user);
    return this.jwtService.sign(payload);
  }

  createRefreshToken(user: User) {
    const payload = this.getJwtPayload(user);
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: +this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  updateRefreshToken(id: number, refreshToken: string) {
    return this.usersService.updateRefreshToken(id, refreshToken);
  }
}
