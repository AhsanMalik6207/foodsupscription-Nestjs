import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/CreatePayment.dto';
import { UpdatePaymentDto } from './dto/UpdatePayment.dto';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    getAllPayments(): Promise<import("./payment.entity").Payment[]>;
    getPayment(id: number): Promise<import("./payment.entity").Payment>;
    createPayment(clientId: number, paymentData: CreatePaymentDto): Promise<CreatePaymentDto & import("./payment.entity").Payment>;
    updatePayment(id: number, paymentData: UpdatePaymentDto): Promise<import("./payment.entity").Payment>;
    deletePayment(id: number): Promise<import("./payment.entity").Payment>;
}
