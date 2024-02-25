import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { JenosizeService } from './services/jenosize.service';
import { JenosizeController } from './controllers/jenosize.controller';
import { ExternalApiModule } from '@utils/external-api/external-api.module';
import { ExternalApi } from '@utils/external-api/external-api.service';
import { AuthenticateMiddleware } from '@common/middlewares/authenticate/authenticate.middleware';

@Module({
  imports: [ExternalApiModule],
  controllers: [JenosizeController],
  providers: [JenosizeService, ExternalApi],
})
export class JenosizeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: 'jenosize/login', method: RequestMethod.GET },
        { path: 'jenosize/game24', method: RequestMethod.GET },
        { path: 'jenosize/gamexo', method: RequestMethod.GET },
      )
      .forRoutes(JenosizeController);
  }
}
