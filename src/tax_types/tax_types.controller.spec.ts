import { Test, TestingModule } from '@nestjs/testing';
import { TaxTypesController } from './tax_types.controller';
import { TaxTypesService } from './tax_types.service';

describe('TaxTypesController', () => {
  let controller: TaxTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxTypesController],
      providers: [TaxTypesService],
    }).compile();

    controller = module.get<TaxTypesController>(TaxTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
