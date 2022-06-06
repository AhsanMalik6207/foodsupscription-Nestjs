import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';

@Module({
  imports:[TypeOrmModule.forFeature([PaymentRepository]),  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}