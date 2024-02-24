import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('BASE_URL_AUTHEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [HttpModule],
})
export class ExternalApiModule {}
