import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthException } from '@exceptions/app/auth.exception';
import * as firebase from 'firebase-admin';
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.PORT);

const firebase_params = {
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderX509CertUrl: process.env.AUTH_CERT_URL,
  clientX509CertUrl: process.env.CLIENT_CERT_URL,
  universeDomain: process.env.UNIVERSAL_DOMAIN,
};

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: '',
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return AuthException.Unauthorized();

    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    if (type === 'Bearer' && token) {
      await this.defaultApp
        .auth()
        .verifyIdToken(token)
        .then(async (decodedToken) => {
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.log(error);
          AuthException.Unauthorized();
        });
    } else {
      next();
    }
  }
}
