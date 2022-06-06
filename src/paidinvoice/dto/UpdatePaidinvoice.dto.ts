import { ApiProperty } from "@nestjs/swagger";
import {IsOptional } from "class-validator";

export class UpdatePaidinvoiceDto{
    @ApiProperty({type:String,description:"receipt"})
    @IsOptional()
    receipt:string;
}