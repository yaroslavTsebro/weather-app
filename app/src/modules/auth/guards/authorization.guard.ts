import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.cookies['accessToken'];
    
    if (!accessToken) {
      throw new UnauthorizedException('No access token in cookies');
    }

    try {
      const payload = verify(accessToken, this.configService.get<string>('JWT_ACCESS_SECRET')) as { sub: string; email: string; };
      const user = await this.userService.findById(+payload.sub);

      if (!user) { throw new UnauthorizedException('User not found'); }

      request.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
