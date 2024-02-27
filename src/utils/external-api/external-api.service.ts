import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExternalApi {
  constructor(private readonly httpService: HttpService) {}

  async getPlaceSearch(baseURL: string, config?: any): Promise<any> {
    const reponses = this.httpService.get(baseURL, config);
    const { data } = await lastValueFrom(reponses);
    return data;
  }
}
