import { Test, TestingModule } from '@nestjs/testing';
import { PaidinvoiceService } from './paidinvoice.service';

describe('PaidinvoiceService', () => {
  let service: PaidinvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaidinvoiceService],
    }).compile();

    service = module.get<PaidinvoiceService>(PaidinvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
