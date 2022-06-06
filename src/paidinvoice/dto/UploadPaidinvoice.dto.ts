import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class  UploadPaidinvoiceDto{
    @ApiProperty({type:String,description:"receipt"})
    receipt:string;

    @IsOptional()
    client;
}