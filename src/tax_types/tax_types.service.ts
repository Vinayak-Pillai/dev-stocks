import { Inject, Injectable } from '@nestjs/common';
import { CreateTaxTypeDto } from './dto/create-tax_type.dto';
import { UpdateTaxTypeDto } from './dto/update-tax_type.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { and, eq } from 'drizzle-orm';
import { SQL } from 'drizzle-orm';
import { tax_types } from '@/database/schema';

@Injectable()
export class TaxTypesService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  async create(createTaxTypeDto: CreateTaxTypeDto) {
    const taxId = await this.db
      .insert(tax_types)
      .values(createTaxTypeDto)
      .returning({ id: tax_types.tax_type_id });
    return taxId;
  }

  async findAll(status: 'Y' | 'N' | '') {
    const conditions: (SQL | undefined)[] = [];
    if (status) {
      conditions.push(eq(tax_types.tax_type_is_active, status));
    }

    const response = await this.db
      .select({
        tax_type_name: tax_types.tax_type_name,
        tax_type_percentage: tax_types.tax_type_percentage,
        tax_type_is_active: tax_types.tax_type_is_active,
        priority: tax_types.priority,
      })
      .from(tax_types)
      .where(conditions.length ? and(...conditions) : undefined);
    return response;
  }

  async findOne(id: number) {
    const response = await this.db
      .select({
        tax_type_name: tax_types.tax_type_name,
        tax_type_percentage: tax_types.tax_type_percentage,
        tax_type_is_active: tax_types.tax_type_is_active,
        priority: tax_types.priority,
      })
      .from(tax_types)
      .where(eq(tax_types.tax_type_id, id));
    return response;
  }

  async update(id: number, updateTaxTypeDto: UpdateTaxTypeDto) {
    await this.db
      .update(tax_types)
      .set(updateTaxTypeDto)
      .where(eq(tax_types.tax_type_id, id));
    return `${id} updated`;
  }

  async remove(id: number) {
    await this.db
      .update(tax_types)
      .set({ tax_type_is_active: 'A' })
      .where(eq(tax_types.tax_type_id, id));
    return `This action removes a #${id} taxType`;
  }
}
