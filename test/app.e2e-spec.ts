import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { FindRecordDto } from 'src/records/dtos/find-record.dto';

describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

    it('/records (POST) :: valid input', () => {
      const findRecordDto: FindRecordDto = {
        startDate: new Date('2017-01-27T01:22:14.398Z'),
        endDate: new Date('2017-01-29T01:22:14.398Z'),
        minCount: 310,
        maxCount: 310
      };
      return request(app.getHttpServer())
        .post("/records")
        .set("Accept", "application/json")
        .send(findRecordDto)
        .expect(HttpStatus.CREATED);
    });

    it('/records (POST) :: invalid input', () => {
      return request(app.getHttpServer())
        .post("/records")
        .set("Accept", "application/json")
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('/any (GET)', () => {
      return request(app.getHttpServer())
        .get("/any")
        .expect(HttpStatus.NOT_FOUND);
    });

    it('/any (POST)', () => {
      return request(app.getHttpServer())
        .post("/any")
        .expect(HttpStatus.NOT_FOUND);
    });

    it('/any (PUT)', () => {
      return request(app.getHttpServer())
        .put("/any")
        .expect(HttpStatus.NOT_FOUND);
    });

    it('/any (DELETE)', () => {
      return request(app.getHttpServer())
        .delete("/any")
        .expect(HttpStatus.NOT_FOUND);
    });
});
