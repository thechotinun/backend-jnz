import { Injectable } from '@nestjs/common';
import { ExternalApi } from '@utils/external-api/external-api.service';

@Injectable()
export class JenosizeService {
  constructor(private readonly externalApi: ExternalApi) {}

  async placeSearch(query: { pagetoken: string }) {
    try {
      const reponses = await this.externalApi.get('', {
        params: {
          ...query,
        },
      });

      return reponses;
    } catch (error) {
      return error;
    }
  }
}
