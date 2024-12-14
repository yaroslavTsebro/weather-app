import { Body, Controller, Post } from '@nestjs/common';
import { GoogleSignInPayload } from 'src/shared/dto/auth/google-sign-in.dto';
import { RefreshPayload, TokenResponse } from 'src/shared/dto/token';
import { EmailSignInStrategy } from './strategies/email/sign-in.strategy';
import { EmailSignUpStrategy } from './strategies/email/sign-up.strategy';
import { GoogleSignInStrategy } from './strategies/google/sign-in.strategy';
import { GoogleSignUpStrategy } from './strategies/google/sign-up.strategy';
import { EmailAuthPayload } from 'src/shared/dto/auth/email.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailSignUpStrategy: EmailSignUpStrategy,
    private readonly emailSignInStrategy: EmailSignInStrategy,
    private readonly googleSignUpStrategy: GoogleSignUpStrategy,
    private readonly googleSignInStrategy: GoogleSignInStrategy,
    private readonly authService: AuthService,
  ) { }

  @Post('/sign-up/email')
  async signUpViaEmail(@Body() payload: EmailAuthPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.emailSignUpStrategy, payload);
  }

  @Post('/sign-in/email')
  async signInViaEmail(@Body() payload: EmailAuthPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.emailSignInStrategy, payload);
  }

  @Post('/sign-up/google')
  async signUpViaGoogle(@Body() payload: GoogleSignInPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.googleSignUpStrategy, payload);
  }

  @Post('/sign-in/google')
  async signInViaGoogle(@Body() payload: GoogleSignInPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.googleSignInStrategy, payload);
  }
  
  @Post('/refresh')
  async refresh(@Body() payload: RefreshPayload): Promise<TokenResponse> {
    return this.authService.refreshTokens(payload);
  }
}
