import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindRecordDto } from '../dtos/find-record.dto';
import { FindRecordResponseDto } from '../dtos/find-record-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordDocument } from '../schemas/record.schema';

@Injectable()
export class RecordsService {

  constructor(@InjectModel('Record') private recordModel: Model<RecordDocument>) { }

  // Find all the records that match the condition specified in findRecord
  async findAll(findRecord: FindRecordDto): Promise<FindRecordResponseDto> {
    try {
      let records: RecordDocument[] = (await this.recordModel.find({
        createdAt: {
          $gte: findRecord.startDate,
          $lt: findRecord.endDate
        }
      }).exec()).filter(record => {
        let counts = record.counts.reduce((total, value) => total + value);
        return counts >= findRecord.minCount && counts <= findRecord.maxCount;
      });

      return {
        code: 0,
        message: "success",
        records: records.map(record => {
          return {
            key: record.key,
            createdAt: record.createdAt,
            totalCount: record.counts.reduce((total, value) => total + value)
          }
        })
      };
    } catch (error) {
      // In case of an error return the following object.
      return {
        code: 1,
        message: `Internal server error. ${error}`,
        records: []
      };
      // We can also throw an InternalServerErrorException
      // throw new InternalServerErrorException(`Internal server error :: findAll(findRecord: FindRecordDto) :: records.service.ts :: ${error.error}`);
    }

  }
}
