import { Inject, Injectable } from '@nestjs/common';
import { CreateTaxDto, CreateTaxWithTypesDto } from './dto/create-tax.dto';
import { UpdateTaxDto, UpdateTaxWithTypesDto } from './dto/update-tax.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { tax_types, taxes } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { SQL } from 'drizzle-orm';
import { TaxTypesService } from '@/tax_types/tax_types.service';
import { TStatusEnum } from '@/types/global';
import { CreateTaxTypeDto } from '@/tax_types/dto/create-tax_type.dto';

@Injectable()
export class TaxService {
  constructor(
    @Inject(DRIZZLE) private db: TDrizzleDB,
    private readonly taxTypesService: TaxTypesService,
  ) {}
  async create(createTaxDto: CreateTaxDto) {
    const taxId = await this.db
      .insert(taxes)
      .values(createTaxDto)
      .returning({ id: taxes.tax_id });
    return taxId;
  }

  async createTaxAndTaxTypes(
    createTaxWithTypesDto: CreateTaxWithTypesDto,
    userId: number,
  ) {
    const taxId = await this.create(createTaxWithTypesDto.tax);
    if (!taxId) throw new Error('Tax Creation Failed');

    createTaxWithTypesDto.tax_types.forEach((taxType) => {
      taxType['tax_id'] = taxId[0].id;
      taxType['created_by'] = userId;
    });
    await this.taxTypesService.create(createTaxWithTypesDto.tax_types);

    return taxId;
  }

  async updateTaxAndTaxTypes(
    updateTaxWithTypesDto: UpdateTaxWithTypesDto,
    userId: number,
  ) {
    await this.db.transaction(async (trx) => {
      updateTaxWithTypesDto.tax['updated_by'] = userId;
      const taxUpdate = await trx
        .update(taxes)
        .set(updateTaxWithTypesDto.tax)
        .where(eq(taxes.tax_id, updateTaxWithTypesDto.tax.tax_id))
        .returning();

      if (!taxUpdate) throw new Error('Tax update failed');

      await this.db
        .update(tax_types)
        .set({ tax_type_is_active: 'A', updated_by: userId })
        .where(eq(tax_types.tax_id, updateTaxWithTypesDto.tax.tax_id));

      for (const taxType of updateTaxWithTypesDto.tax_types) {
        if (taxType['tax_type_id']) {
          taxType['tax_type_is_active'] = TStatusEnum.Y;
          await this.taxTypesService.update(taxType.tax_type_id, taxType, trx);
        } else {
          const createDto: CreateTaxTypeDto = {
            tax_id: updateTaxWithTypesDto.tax.tax_id,
            tax_type_name: String(taxType.tax_type_name),
            tax_type_percentage: String(taxType.tax_type_percentage),
            tax_type_is_active: TStatusEnum.Y,
            priority: taxType.priority,
            created_by: userId,
            updated_by: userId,
          };

          await this.taxTypesService.create([createDto], trx);
        }
      }

      return 'Tax updated';
    });
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
