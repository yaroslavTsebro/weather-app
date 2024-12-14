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

@Module({
  imports: [HashModule, UserModule, JwtModule],
  providers: [
    GoogleSignInStrategy,
    GoogleSignUpStrategy,
    EmailSignInStrategy,
    EmailSignUpStrategy,
    GoogleAuthClient,
    AuthService
  ],
  controllers: [AuthController]
})
export class AuthModule { }
