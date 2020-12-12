import { ApiProperty } from "@nestjs/swagger";

export class FindRecordDto {
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    endDate: Date;
    @ApiProperty()
    minCount: number;
    @ApiProperty()
    maxCount: number;
}
