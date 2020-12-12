import { Injectable } from '@nestjs/common';
import { FindRecordDto } from '../dtos/find-record.dto';
import { FindRecordResponseDto } from '../dtos/find-record-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordDocument } from '../schemas/record.schema';

@Injectable()
export class RecordsService {

  constructor(@InjectModel('Record') private recordModel: Model<RecordDocument>) { }

  async findAll(findRecord: FindRecordDto): Promise<FindRecordResponseDto> {
    try {
      let records: RecordDocument[] = (await this.recordModel.find({
        createdAt: {
          $gte: new Date(findRecord.startDate),
          $lt: new Date(findRecord.endDate)
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
      return {
        code: 1,
        message: `Internal server error. ${error.error}`,
        records: []
      };
    }

  }
}
