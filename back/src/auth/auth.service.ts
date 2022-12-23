import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(userId: string, plaintextPassword: string): Promise<any> {
    const user = await this.usersService.findByUserId(userId);
    console.log('AuthService validateUser', user);
    if (user) {
      const isMatching = await bcrypt.compare(plaintextPassword, user.password);
      if (isMatching) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      return null;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload: JwtPayload = { username: user.userName, sub: user.id }; // TODO: 토큰 payload 는 다시 생각해 보자
    console.log('AuthService login', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
