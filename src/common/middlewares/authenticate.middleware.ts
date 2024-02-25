import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ExternalApi } from '@utils/external-api/external-api.service';
import { ConfigService } from '@nestjs/config';
import { AuthException } from '@exceptions/app/auth.exception';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(
    private readonly externalApi: ExternalApi,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return AuthException.Unauthorized();

    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    if (type === 'Bearer' && token) {
      try {
        // const user = await this.externalApi.get(
        //   `/usermanagement/getUserDetail?application=${this.configService.get<string>('APP_NAME')}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${this.configService.get<string>('APP_TOKEN')}`,
        //     },
        //   },
        // );
        // console.log(user);
      } catch (error) {
        return AuthException.Unauthorized();
      }
    }

    next();
  }
}
