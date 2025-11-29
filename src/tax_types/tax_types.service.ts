import { Inject, Injectable } from '@nestjs/common';
import { CreateTaxTypeDto } from './dto/create-tax_type.dto';
import { UpdateTaxTypeDto } from './dto/update-tax_type.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { and, eq } from 'drizzle-orm';
import { SQL } from 'drizzle-orm';
import { tax_types } from '@/database/schema';
import { TStatusEnum } from '@/types/global';

@Injectable()
export class TaxTypesService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  async create(
    createTaxTypeDto: CreateTaxTypeDto[],
    trx?: TDrizzleDB | Parameters<Parameters<TDrizzleDB['transaction']>[0]>[0],
  ) {
    const dbClient = trx ?? this.db;
    const taxId = await dbClient
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

  async findOneByTaxId(id: number) {
    if (!id) {
      throw new Error('Invalid tax ID');
    }

    const response = await this.db
      .select({
        tax_type_id: tax_types.tax_type_id,
        tax_type_name: tax_types.tax_type_name,
        tax_type_percentage: tax_types.tax_type_percentage,
        tax_type_is_active: tax_types.tax_type_is_active,
        priority: tax_types.priority,
      })
      .from(tax_types)
      .where(
        and(
          eq(tax_types.tax_id, id),
          eq(tax_types.tax_type_is_active, TStatusEnum.Y),
        ),
      )
      .orderBy(tax_types.priority);
    return response;
  }

  async taxCalculation(id: number, gross_price: number) {
    const taxTypes = await this.findOneByTaxId(id);

    if (!taxTypes.length) throw new Error('Tax type not found');

    const taxInclusivePrice = gross_price;
    const response = {};
    taxTypes.map((taxType) => {
      const taxExclusiveTotal =
        Number(taxType.tax_type_percentage) /
        (1 + Number(taxType.tax_type_percentage) / 100);
      response[taxType.tax_type_id] = {
        ...taxType,
        tax_amount: taxExclusiveTotal - taxInclusivePrice,
      };
    });

    return response;
  }

  async update(
    id: number,
    updateTaxTypeDto: UpdateTaxTypeDto,
    trx?: TDrizzleDB | Parameters<Parameters<TDrizzleDB['transaction']>[0]>[0],
  ) {
    const dbClient = trx ?? this.db;
    await dbClient
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
