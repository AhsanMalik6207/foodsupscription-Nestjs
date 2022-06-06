import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaidinvoiceRepository } from './paidinvoice.repository';
import { UploadPaidinvoiceDto } from './dto/UploadPaidinvoice.dto';
import { UpdatePaidinvoiceDto } from './dto/UpdatePaidinvoice.dto';

@Injectable()
export class PaidinvoiceService {
  constructor(@InjectRepository(PaidinvoiceRepository) private paidinvoiceRepository: PaidinvoiceRepository) { }

  getPaidinvoicebyCLientId(id: number) {
    if (!id) {
      return null
    }
    return this.paidinvoiceRepository.findOne({
      where: { client: id },
    });
  }
  getPaidinvoice(id: number) {
    if (!id) {
      return null
    }
    return this.paidinvoiceRepository.findOne(id);
  }
  async getAllPaidinvoices() {
    return await this.paidinvoiceRepository.find();
  }
  async createNewPaidinvoice(paidinvoice: UploadPaidinvoiceDto) {
    return await this.paidinvoiceRepository.save(paidinvoice)
  }
  async updatePaidinvoice(id: number, paidinvoice: UpdatePaidinvoiceDto) {
    const update = await this.getPaidinvoice(id);
    if (paidinvoice.receipt) {
      update.receipt = paidinvoice.receipt;
    }
    return await this.paidinvoiceRepository.save(update);
  }
  async deletePaidinvoice(id: number) {
    const paidinvoice = await this.getPaidinvoice(id);
    if (!paidinvoice) {
      throw new NotFoundException('Paid Invoice not found')
    }
    return this.paidinvoiceRepository.remove(paidinvoice)
  }
}