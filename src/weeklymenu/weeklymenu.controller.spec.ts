import { Test, TestingModule } from '@nestjs/testing';
import { WeeklymenuController } from './weeklymenu.controller';

describe('WeeklymenuController', () => {
  let controller: WeeklymenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklymenuController],
    }).compile();

    controller = module.get<WeeklymenuController>(WeeklymenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
