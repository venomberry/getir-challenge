import { Module } from '@nestjs/common';
import { SamplesService } from './services/samples.service';
import { SamplesController } from './controllers/samples.controller';

@Module({
  controllers: [SamplesController],
  providers: [SamplesService]
})
export class SamplesModule {}
