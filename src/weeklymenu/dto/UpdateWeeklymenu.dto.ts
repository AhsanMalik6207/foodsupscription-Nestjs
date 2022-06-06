import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsOptional,IsDateString } from "class-validator";

export class UpdateWeeklymenuDto{
    @IsOptional()
    @IsString()
    @ApiProperty({type:String,description:"day"})
    day:string;

    @IsOptional()
    @IsDateString()
    @ApiProperty({type:String,description:"date"})
    date: string;

    @IsOptional()
    @ApiProperty({type:String,description:"items"})
    @IsString()
    items:string;
}