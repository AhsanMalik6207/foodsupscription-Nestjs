import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEnum } from "class-validator";
import { PaymentType } from "../payment-type.enum";

export class UpdatePaymentDto{
    @IsOptional()
    @IsEnum(PaymentType)
    @ApiProperty({
        enum: PaymentType,
    })
    paymenttype: PaymentType;

    @IsOptional()
    @ApiProperty({type:Number,description:"price"})
    price: number;

}