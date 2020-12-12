import { ApiProperty } from "@nestjs/swagger";
import { RecordDto } from "./record.dto";

export class FindRecordResponseDto {
    @ApiProperty()
    code: number;

    @ApiProperty()
    message: string;

    @ApiProperty({ type: [RecordDto] })
    records: RecordDto[];
}
