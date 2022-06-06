import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional} from "class-validator";
import { PaymentType } from "../payment-type.enum";

export class CreatePaymentDto{
    @IsNotEmpty()
    @IsEnum(PaymentType)
    @ApiProperty({
        enum: PaymentType,
    })
    paymenttype: PaymentType;

    @IsNotEmpty({message:'The payment should have a price'})
    @ApiProperty({type:Number,description:"price"})
    price:number;

    @IsOptional()
    client;
}