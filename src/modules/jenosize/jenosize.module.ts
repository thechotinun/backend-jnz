import { Module } from '@nestjs/common';
import { JenosizeService } from './services/jenosize.service';
import { JenosizeController } from './controllers/jenosize.controller';
import { ExternalApiModule } from '@utils/external-api/external-api.module';
import { ExternalApi } from '@utils/external-api/external-api.service';

@Module({
  imports: [ExternalApiModule],
  controllers: [JenosizeController],
  providers: [JenosizeService, ExternalApi],
})
export class JenosizeModule {}
