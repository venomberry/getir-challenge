import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsDateString } from "class-validator";

export class FindRecordDto {
    
    // we can use @IsDateString() decorator to enforce date validation
    @ApiProperty()
    @IsNotEmpty()
    // @IsDateString()
    startDate: Date;

    // we can use @IsDateString() decorator to enforce date validation
    @ApiProperty()
    @IsNotEmpty()
    // @IsDateString()
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
