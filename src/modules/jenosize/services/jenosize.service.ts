import { Injectable } from '@nestjs/common';
import { ExternalApi } from '@utils/external-api/external-api.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JenosizeService {
  constructor(
    private readonly externalApi: ExternalApi,
    private readonly configService: ConfigService,
  ) {}

  async placeSearch(query: { pagetoken: string }) {
    try {
      const reponses = await this.externalApi.getPlaceSearch(
        this.configService.get<string>('ENDPOINT_API'),
        {
          params: {
            type: this.configService.get<string>('TYPE_PLACE_SEARCH'),
            key: this.configService.get<string>('GOOGLE_API_KEY'),
            ...query,
          },
        },
      );

      return reponses;
    } catch (error) {
      return error;
    }
  }
}
