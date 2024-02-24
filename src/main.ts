import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
const dotenv = require('dotenv');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
