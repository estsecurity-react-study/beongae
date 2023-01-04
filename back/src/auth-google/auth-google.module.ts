import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [AuthGoogleService, GoogleStrategy],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
