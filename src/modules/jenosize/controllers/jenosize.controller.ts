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
    @Req() request: Request,
  ): Promise<ApiResource> {
    try {
      console.log(`Hello ${request['user'].email}! 👋🍺`);
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

  @Get('game24')
  async game24(@Query() query: { nums: number[] }): Promise<ApiResource> {
    try {
      const reponse = await this.jenosizeService.game24(query);
      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get('gamexo')
  async gamexo(@Query() query: { nums: number }): Promise<ApiResource> {
    try {
      const reponse = await this.jenosizeService.gamexo(query);
      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
