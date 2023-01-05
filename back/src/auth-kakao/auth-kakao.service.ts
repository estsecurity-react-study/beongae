import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthKakaoService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async findByMailOrSave(email: string, userName: string) {
    const user = await this.usersService.findByUserId(email);

    if (user) return user;

    const newUser = new CreateUserDto();
    newUser.userId = email;
    newUser.userName = userName;

    return this.usersService.createEmptyPassword(newUser);
  }

  async createTokensAndUpdateRefreshToken(user: User) {
    const payload: JwtPayload = this.authService.getJwtPayload(user);
    const { access_token, refresh_token } = await this.authService.createTokens(payload);

    // refresh token update - user db table
    await this.authService.updateRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token };
  }
}
