import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleSignInStrategy } from './strategies/google/sign-in.strategy';
import { GoogleSignUpStrategy } from './strategies/google/sign-up.strategy';
import { EmailSignInStrategy } from './strategies/email/sign-in.strategy';
import { EmailSignUpStrategy } from './strategies/email/sign-up.strategy';
import { GoogleAuthClient } from './clients/google-auth.client';
import { HashModule } from '../system/hash/hash.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../system/jwt/jwt.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationGuard } from './guards/authorization.guard';

@Module({
  imports: [HashModule, UserModule, JwtModule, ConfigModule],
  providers: [
    GoogleSignInStrategy,
    GoogleSignUpStrategy,
    EmailSignInStrategy,
    EmailSignUpStrategy,
    GoogleAuthClient,
    AuthService,
    AuthorizationGuard
  ],
  exports: [AuthorizationGuard],
  controllers: [AuthController]
})
export class AuthModule { }
