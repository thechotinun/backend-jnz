import { Controller, Get } from '@nestjs/common';
import { ApiResource } from '@common/reponses/api-resource';
import { JenosizeService } from '@modules/jenosize/services/jenosize.service';

@Controller('api/v1/jenosize')
export class JenosizeController {
  constructor(private readonly jenosizeService: JenosizeService) {}

  @Get()
  async hello(): Promise<ApiResource> {
    try {
      const reponse = await this.jenosizeService.hello();

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
