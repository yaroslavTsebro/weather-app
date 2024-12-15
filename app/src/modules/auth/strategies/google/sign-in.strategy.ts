import { Injectable } from '@nestjs/common';
import { AuthProviderRepository } from 'src/modules/system/db/repositories/auth-provider.repository';
import { JwtService } from 'src/modules/system/jwt/jwt.service';
import { AuthProviderType, IAuthProvider } from 'src/shared/contracts/entity/auth-provider';
import { IAuthStrategy } from 'src/shared/contracts/modules/auth';
import { TokenResponse, AuthTokenPayload } from 'src/shared/dto/token';
import { GoogleAuthClient } from '../../clients/google-auth.client';
import { UserService } from 'src/modules/user/user.service';
import { GoogleSignInPayload } from 'src/shared/dto/auth/google-sign-in.dto';
import { UserNotFoundByEmailException } from 'src/shared/exceptions/user/user-not-found-by-email.exception';

@Injectable()
export class GoogleSignInStrategy implements IAuthStrategy<GoogleSignInPayload, TokenResponse> {
  constructor(
    private readonly googleAuthClient: GoogleAuthClient,
    private readonly userService: UserService,
    private readonly authProviderRepository: AuthProviderRepository,
    private readonly jwtService: JwtService,
  ) { }

  async authenticate(payload: GoogleSignInPayload): Promise<TokenResponse> {
    const { sub, email } = await this.googleAuthClient.getPayloadFromCode(payload.code);

    const authProvider = await this.authProviderRepository.findByPayloadAndType(sub, AuthProviderType.GOOGLE);

    let user = authProvider ? authProvider.user : null;

    if (!user) {
      user = await this.userService.findByEmail(email);

      if (!user) { throw new UserNotFoundByEmailException(email); }

      await this.authProviderRepository.save({
        user,
        type: AuthProviderType.GOOGLE,
        payload: sub,
      } as IAuthProvider);
    }

    const tokenPayload = new AuthTokenPayload(user.id.toString(), user.email);

    const accessToken = this.jwtService.generateAccessToken(tokenPayload);
    const refreshToken = this.jwtService.generateRefreshToken(tokenPayload);

    return new TokenResponse(accessToken, refreshToken);
  }
}