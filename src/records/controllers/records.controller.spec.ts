import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from './records.controller';
import { RecordsService } from '../services/records.service';
import { Model } from 'mongoose';
import { RecordDocument } from '../schemas/record.schema';
import { FindRecordResponseDto } from '../dtos/find-record-response.dto';
import { ValidationPipe, ArgumentMetadata } from '@nestjs/common';
import { FindRecordDto } from '../dtos/find-record.dto';

describe('RecordsController', () => {
  let recordsController: RecordsController;
  let recordsService: RecordsService;
  let recordModel: Model<RecordDocument>
  let validInput: FindRecordDto;
  let emptyInput: FindRecordDto;
  let validResponse : FindRecordResponseDto;

  beforeEach(async () => {
    recordsService = new RecordsService(recordModel);
    recordsController = new RecordsController(recordsService);
    validInput = {
      startDate: new Date('2017-01-27T01:22:14.398Z'),
      endDate: new Date('2017-01-29T01:22:14.398Z'),
      minCount: 310,
      maxCount: 310
    };
    validResponse = {
      code: 0,
      message: 'success',
      records: [
        {
          key: 'TAKwGc6Jr4i8Z487',
          createdAt: new Date('2017-01-28T01:22:14.398Z'),
          totalCount: 310
        }
      ]
    }
    emptyInput = {startDate: null, endDate: null, minCount: null, maxCount: null};
  });

  describe('when instanciating the controller', () => {
    it('record service should be defined', () => {
      expect(recordsService).toBeDefined();
    });
    it('record controller should be defined', () => {
      expect(recordsController).toBeDefined();
    });
  });
  describe('when requesting findAll method', () => {
    describe('and the input is invalid', () => {
      it('should not validate DTO', async () => {
        let target: ValidationPipe = new ValidationPipe({ transform: true, whitelist: true });
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: FindRecordDto,
          data: ''
        };
        await target.transform(emptyInput, metadata)
          .catch(err => {
            expect(err.getResponse().message).toEqual([
              "startDate should not be empty", 
              "endDate should not be empty", 
              "minCount must be a positive number",
              "minCount must be a number conforming to the specified constraints",
              "minCount should not be empty",
              "maxCount must be a positive number",
              "maxCount must be a number conforming to the specified constraints",
              "maxCount should not be empty"
            ])
          })
      });
    });
    describe('and the input is valid', () => {
      it('should return a success response', async () => {
        const result = new Promise<FindRecordResponseDto>((resolve) => resolve(validResponse));
        jest.spyOn(recordsService, 'findAll').mockImplementation(() => result);

        expect(await recordsController.getRecords(validInput)).toStrictEqual(validResponse);
      });
    });

  });
});
