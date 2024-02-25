import { Controller, Get, Query, Render, Req } from '@nestjs/common';
import { ApiResource } from '@common/reponses/api-resource';
import { JenosizeService } from '@modules/jenosize/services/jenosize.service';

@Controller('jenosize')
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
  @Render('widget')
  async login(): Promise<ApiResource> {
    try {
      return { message: 'Hello world! 👋' };
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get('test')
  async test(@Req() request: Request): Promise<ApiResource> {
    try {
      return { message: `Hello ${request['user'].email}! 👋` };
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
