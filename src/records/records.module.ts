import { Module } from '@nestjs/common';
import { RecordsService } from './services/records.service';
import { RecordsController } from './controllers/records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordSchema } from './schemas/record.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema }])],
  controllers: [RecordsController],
  providers: [RecordsService]
})
export class RecordsModule {}
