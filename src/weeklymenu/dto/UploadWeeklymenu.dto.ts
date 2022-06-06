import { ApiProperty } from "@nestjs/swagger";
import {  IsDateString, IsNotEmpty,IsOptional,IsString } from "class-validator";

export class UploadWeeklymenuDto{
    @IsNotEmpty({message:'The weekly menu should have a day mentioned'})
    @IsString()
    @ApiProperty({type:String,description:"day"})
    day:string;

    @IsNotEmpty({message:'The weekly menu should have a date mentioned'})
    @IsDateString()
    @ApiProperty({type:String,description:"date"})
    date: string;

    @IsNotEmpty({message:'The weekly menu should have a detail of item'})
    @ApiProperty({type:String,description:"items"})
    @IsString()
    items:string;

    @IsOptional()
    admin;
}