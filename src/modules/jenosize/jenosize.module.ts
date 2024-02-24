import { Module } from '@nestjs/common';
import { JenosizeService } from './services/jenosize.service';
import { JenosizeController } from './controllers/jenosize.controller';

@Module({
  imports: [],
  controllers: [JenosizeController],
  providers: [JenosizeService],
})
export class JenosizeModule {}
