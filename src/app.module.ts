import { Module } from '@nestjs/common';
import { SamplesModule } from './samples/samples.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    SamplesModule,
    MongooseModule.forRoot('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
