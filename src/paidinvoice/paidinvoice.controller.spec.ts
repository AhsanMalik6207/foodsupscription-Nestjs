import { Test, TestingModule } from '@nestjs/testing';
import { PaidinvoiceController } from './paidinvoice.controller';

describe('PaidinvoiceController', () => {
  let controller: PaidinvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaidinvoiceController],
    }).compile();

    controller = module.get<PaidinvoiceController>(PaidinvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
