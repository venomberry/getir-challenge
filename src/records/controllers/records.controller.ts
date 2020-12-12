import { Controller, Post, Body } from '@nestjs/common';
import { RecordsService } from '../services/records.service';
import { FindRecordDto } from '../dtos/find-record.dto';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { FindRecordResponseDto } from '../dtos/find-record-response.dto';


@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiOkResponse({ description: "The records have been successfully retreived", type: FindRecordResponseDto })
  @ApiBadRequestResponse({ description: "The body is invalid." })
  @ApiInternalServerErrorResponse({ description: "Inernal server error."})
  getRecords(@Body() findRecordDto: FindRecordDto): Promise<FindRecordResponseDto> {
    return this.recordsService.findAll(findRecordDto);
  }
}
