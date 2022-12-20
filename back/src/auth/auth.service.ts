import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
