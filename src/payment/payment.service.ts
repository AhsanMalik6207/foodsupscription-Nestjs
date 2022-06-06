import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/CreatePayment.dto';
import { UpdatePaymentDto } from './dto/UpdatePayment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(PaymentRepository) private paymentRepository: PaymentRepository) { }

  getPayment(id: number) {
    if (!id) {
      return null
    }
    return this.paymentRepository.findOne(id);
  }
  async getAllPayments() {
    return await this.paymentRepository.find();
  }
  async createNewPayment(payment: CreatePaymentDto) {
    return await this.paymentRepository.save(payment)
  }
  async updatePayment(id: number, payment: UpdatePaymentDto){
    const update = await this.getPayment(id);
    if (payment.paymenttype) {
        update.paymenttype = payment.paymenttype;
    }
    if (payment.price) {
        update.price = payment.price;
    }
    return await this.paymentRepository.save(update);
}
  async deletePayment(id: number){
      const payment = await this.getPayment(id);
      if(!payment){
          throw new NotFoundException('Payment not found')
      }
      return  this.paymentRepository.remove(payment)
  }
}
