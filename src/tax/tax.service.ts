import { Inject, Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { taxes } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { SQL } from 'drizzle-orm';

@Injectable()
export class TaxService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  async create(createTaxDto: CreateTaxDto) {
    const taxId = await this.db
      .insert(taxes)
      .values(createTaxDto)
      .returning({ id: taxes.tax_id });
    return taxId;
  }

  async findAll(status: 'Y' | 'N' | '') {
    const conditions: (SQL | undefined)[] = [];
    if (status) {
      conditions.push(eq(taxes.tax_is_active, status));
    }

    const response = await this.db
      .select({
        tax_id: taxes.tax_id,
        tax_name: taxes.tax_name,
        tax_description: taxes.description,
        tax_is_active: taxes.tax_is_active,
      })
      .from(taxes)
      .where(conditions.length ? and(...conditions) : undefined);
    return response;
  }

  async findOne(id: number) {
    const response = await this.db
      .select({
        tax_id: taxes.tax_id,
        tax_name: taxes.tax_name,
        tax_description: taxes.description,
        tax_is_active: taxes.tax_is_active,
      })
      .from(taxes)
      .where(eq(taxes.tax_id, id));
    return response;
  }

  async update(id: number, updateTaxDto: UpdateTaxDto) {
    await this.db.update(taxes).set(updateTaxDto).where(eq(taxes.tax_id, id));
    return `${id} updated`;
  }

  async remove(id: number) {
    await this.db
      .update(taxes)
      .set({ tax_is_active: 'A' })
      .where(eq(taxes.tax_id, id));
    return `${id} removed`;
  }
}
