import { PaymentType } from "../payment-type.enum";
export declare class CreatePaymentDto {
    paymenttype: PaymentType;
    price: number;
    client: any;
}
