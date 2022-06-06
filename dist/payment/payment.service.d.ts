import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/CreatePayment.dto';
import { UpdatePaymentDto } from './dto/UpdatePayment.dto';
export declare class PaymentService {
    private paymentRepository;
    constructor(paymentRepository: PaymentRepository);
    getPayment(id: number): Promise<import("./payment.entity").Payment>;
    getAllPayments(): Promise<import("./payment.entity").Payment[]>;
    createNewPayment(payment: CreatePaymentDto): Promise<CreatePaymentDto & import("./payment.entity").Payment>;
    updatePayment(id: number, payment: UpdatePaymentDto): Promise<import("./payment.entity").Payment>;
    deletePayment(id: number): Promise<import("./payment.entity").Payment>;
}
