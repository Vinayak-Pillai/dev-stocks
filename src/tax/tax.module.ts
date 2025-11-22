import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { TaxTypesService } from '@/tax_types/tax_types.service';

@Module({
  controllers: [TaxController],
  providers: [TaxService, TaxTypesService],
})
export class TaxModule {}
