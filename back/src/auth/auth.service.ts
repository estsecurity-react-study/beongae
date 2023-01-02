import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

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
    }
    return null;
  }

  register(registerUserDto: RegisterUserDto) {
    return this.usersService.create(registerUserDto);
  }

  me(id: number) {
    return this.usersService.findById(id);
  }

  async createTokens(payload: JwtPayload) {
    console.log('AuthService createTokens payload', payload);
    return {
      access_token: this.createAccessToken(payload),
      refresh_token: this.createRefreshToken(payload),
    };
  }

  createAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  createRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: +this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  getJwtPayload(user: User) {
    const payload: JwtPayload = { username: user.userName, sub: user.id }; // TODO: 토큰 payload 는 다시 생각해 보자
    return payload;
  }

  updateRefreshToken(id: number, refreshToken: string | null) {
    return this.usersService.updateRefreshToken(id, refreshToken);
  }
}
