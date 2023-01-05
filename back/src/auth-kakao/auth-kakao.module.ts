import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthKakaoService } from './auth-kakao.service';
import { AuthKakaoController } from './auth-kakao.controller';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [HttpModule, UsersModule, AuthModule],
  providers: [AuthKakaoService, KakaoStrategy],
  controllers: [AuthKakaoController],
})
export class AuthKakaoModule {}
