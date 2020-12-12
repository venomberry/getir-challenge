import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsDateString } from "class-validator";

export class FindRecordDto {
    @ApiProperty()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    minCount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    maxCount: number;
}
