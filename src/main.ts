import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
const dotenv = require('dotenv');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([join(__dirname, '.', 'modules/jenosize/views')]);
  app.setViewEngine('hbs');

  await app
    .listen(process.env.PORT)
    .then(() => {
      console.log(`Server running on PORT:${process.env.PORT}`);
    })
    .catch((error) => {
      console.error(`Failed to start server: ${error}`);
    });
}
bootstrap();
