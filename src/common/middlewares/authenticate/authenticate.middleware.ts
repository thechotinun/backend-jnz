import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthException } from '@exceptions/app/auth.exception';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './serviceAccount.json';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientX509CertUrl: serviceAccount.client_x509_cert_url,
  universeDomain: serviceAccount.universe_domain,
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
