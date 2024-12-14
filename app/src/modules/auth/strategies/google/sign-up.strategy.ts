import { Injectable } from '@nestjs/common';
import { AuthProviderRepository } from 'src/modules/db/repositories/auth-provider.repository';
import { JwtService } from 'src/modules/system/jwt/jwt.service';
import { UsersService } from 'src/modules/user/user.service';
import { AuthProviderType, IAuthProvider } from 'src/shared/contracts/entity/auth-provider';
import { IAuthStrategy } from 'src/shared/contracts/modules/auth';
import { TokenResponse, AuthTokenPayload } from 'src/shared/dto/token';
import { GoogleAuthClient } from '../../clients/google-auth.client';
import { IUser } from 'src/shared/contracts/entity/user';
import { GoogleSignInPayload } from 'src/shared/dto/auth/google-sign-in.dto';

@Injectable()
export class GoogleSignUpStrategy implements IAuthStrategy<GoogleSignInPayload, TokenResponse> {
  constructor(
    private readonly googleAuthClient: GoogleAuthClient,
    private readonly usersService: UsersService,
    private readonly authProviderRepository: AuthProviderRepository,
    private readonly jwtService: JwtService,
  ) { }

  async authenticate(payload: GoogleSignInPayload): Promise<TokenResponse> {
    const userPayload = await this.googleAuthClient.getPayloadFromCode(payload.code);

    let user = (await this.authProviderRepository.findByPayloadAndType(userPayload.sub, AuthProviderType.GOOGLE))?.user;

    if (!user) {
      user = await this.usersService.findByEmail(userPayload.email);

      if (user) {
        await this.authProviderRepository.save({
          user,
          type: AuthProviderType.GOOGLE,
          payload: userPayload.sub,
        } as IAuthProvider);
      } else {

        user = await this.usersService.create({
          email: userPayload.email,
          name: userPayload.given_name.concat(userPayload.family_name),
          authProvider: {
            payload: userPayload.sub,
            type: AuthProviderType.GOOGLE,
          } as IAuthProvider,
        } as IUser);
      }
    }


    const tokenPayload = new AuthTokenPayload(user.id.toString(), user.email);

    const accessToken = this.jwtService.generateAccessToken(tokenPayload);
    const refreshToken = this.jwtService.generateRefreshToken(tokenPayload);

    return new TokenResponse(accessToken, refreshToken);
  }
}
