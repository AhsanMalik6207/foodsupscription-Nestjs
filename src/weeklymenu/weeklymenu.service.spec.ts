import { Test, TestingModule } from '@nestjs/testing';
import { WeeklymenuService } from './weeklymenu.service';

describe('WeeklymenuService', () => {
  let service: WeeklymenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklymenuService],
    }).compile();

    service = module.get<WeeklymenuService>(WeeklymenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
