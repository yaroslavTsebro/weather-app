import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { AuthGrantTokenExpiredException } from 'src/shared/exceptions/auth/auth-grant-token-expired.exception';

@Injectable()
export class GoogleAuthClient extends OAuth2Client {
  constructor(private readonly configService: ConfigService) {
    super({
      clientId: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      redirectUri: configService.get<string>('GOOGLE_CLIENT_REDIRECT_URI'),
    });
  }

  async getPayloadFromCode(
    code: string
  ): Promise<TokenPayload> {
    const {
      tokens
    } = await this.getToken(code)
      .catch(
        err => {
          if (err.response?.data?.error === 'invalid_grant') {
            throw new AuthGrantTokenExpiredException();
          }

          throw new BadRequestException();
        }
      );

    const { id_token: idToken } = tokens;

    const ticket = await this.verifyIdToken({ idToken });

    return ticket.getPayload();
  }
}