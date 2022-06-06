import { Client } from '../client/client.entity';
import { PaymentType } from "./payment-type.enum";
export declare class Payment {
    id: number;
    paymenttype: PaymentType;
    price: number;
    subscribedAt: Date;
    client: Client;
}
