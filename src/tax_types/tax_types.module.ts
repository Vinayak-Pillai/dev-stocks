import { Module } from '@nestjs/common';
import { TaxTypesService } from './tax_types.service';
import { TaxTypesController } from './tax_types.controller';

@Module({
  controllers: [TaxTypesController],
  providers: [TaxTypesService],
})
export class TaxTypesModule {}
