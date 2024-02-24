import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('ENDPOINT_API'),
        params: {
          type: configService.get<string>('TYPE_PLACE_SEARCH'),
          key: configService.get<string>('GOOGLE_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [HttpModule],
})
export class ExternalApiModule {}
