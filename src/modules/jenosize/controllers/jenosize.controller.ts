import {
  Controller,
  Get,
  Query,
  Render,
  Req,
  Post,
  Body,
} from '@nestjs/common';
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
  @Render('game24')
  async game24(): Promise<ApiResource> {
    try {
      return { message: 'Hello world! 👋' };
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get('gamexo')
  @Render('tictactoe')
  async gamexo(): Promise<ApiResource> {
    try {
      return { message: 'Hello world! 👋' };
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Post('minimax')
  async minimax(
    @Body()
    payload: {
      gameData: string[];
      PLAYER: string;
    },
  ): Promise<ApiResource> {
    try {
      const reponse = await this.jenosizeService.minimax(payload);
      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
