import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExternalApi {
  constructor(private readonly httpService: HttpService) {}

  async get(path: string, config?: any): Promise<any> {
    const reponses = this.httpService.get(path, config);
    const { data } = await lastValueFrom(reponses);
    return data;
  }
}
