import { Controller, Get, Query } from '@nestjs/common';
import { ApiResource } from '@common/reponses/api-resource';
import { JenosizeService } from '@modules/jenosize/services/jenosize.service';

@Controller('api/v1/jenosize')
export class JenosizeController {
  constructor(private readonly jenosizeService: JenosizeService) {}

  @Get()
  async placeSearch(
    @Query()
    query: {
      pagetoken: string;
    },
  ): Promise<ApiResource> {
    try {
      const reponse = await this.jenosizeService.placeSearch(query);

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get('login')
  async login(): Promise<ApiResource> {
    try {
      return ApiResource.successResponse('Hello world 👋');
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
