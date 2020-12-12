import { ApiProperty } from "@nestjs/swagger";
import { RecordDto } from "./record.dto";
import { RecordDocument } from "../schemas/record.schema";

export class FindRecordResponseDto {
    @ApiProperty()
    code: number;

    @ApiProperty()
    message: string;

    @ApiProperty({ type: [RecordDto] })
    records: RecordDto[];
}
