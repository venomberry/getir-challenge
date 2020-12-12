import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsModule } from './records/records.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true'),
    RecordsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
