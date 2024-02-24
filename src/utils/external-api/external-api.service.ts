import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExternalApi {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string, config?: any): Promise<any> {
    const reponses = this.httpService.get(url, config);
    const { data } = await lastValueFrom(reponses);
    return data;
  }

  async post(url: string, reqBody: any, config?: any): Promise<any> {
    const reponses = this.httpService.post(url, reqBody, config);
    const { data } = await lastValueFrom(reponses);
    return data;
  }
}
