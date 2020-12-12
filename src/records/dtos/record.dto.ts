import { ApiProperty } from "@nestjs/swagger";

export class RecordDto { 
    @ApiProperty()
    key: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    totalCount: number;
}