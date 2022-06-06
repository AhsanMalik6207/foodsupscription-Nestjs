import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaidinvoiceController } from './paidinvoice.controller';
import { PaidinvoiceRepository } from './paidinvoice.repository';
import { PaidinvoiceService } from './paidinvoice.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaidinvoiceRepository]), JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [PaidinvoiceController],
  providers: [PaidinvoiceService],
})
export class PaidinvoiceModule { }