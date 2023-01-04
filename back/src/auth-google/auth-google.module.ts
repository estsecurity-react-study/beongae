import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  providers: [AuthGoogleService, GoogleStrategy],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
