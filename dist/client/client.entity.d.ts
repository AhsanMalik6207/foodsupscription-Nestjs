import { Paidinvoice } from "src/paidinvoice/paidinvoice.entity";
import { Payment } from "src/payment/payment.entity";
export declare class Client {
    id: number;
    name: string;
    email: string;
    password: string;
    payment: Payment;
    paidinvoice: Paidinvoice;
}
