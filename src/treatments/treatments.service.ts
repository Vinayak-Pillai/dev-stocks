import { Inject, Injectable } from '@nestjs/common';
import { CreateTreatmentWithProductDto } from './dto/create-treatment.dto';
import { UpdateTreatmentWithProductDto } from './dto/update-treatment.dto';
import type { TAuthData } from '@/types/auth';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import {
  product_variants,
  tax_types,
  treatment_products,
  treatments,
} from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { TStatusEnum } from '@/types/global';
import { inArray } from 'drizzle-orm';

@Injectable()
export class TreatmentsService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  async create(
    createTreatmentDto: CreateTreatmentWithProductDto,
    user: TAuthData,
  ) {
    createTreatmentDto.treatment['created_by'] = user.user_id;
    await this.db.transaction(async (tx) => {
      const treatmentId = await tx
        .insert(treatments)
        .values(createTreatmentDto.treatment)
        .returning({ id: treatments.treatment_id });

      if (!treatmentId?.[0]?.id) {
        tx.rollback();
        throw new Error('Failed to create treatment');
      }

      createTreatmentDto.treatment_products.forEach((treatmentProduct) => {
        treatmentProduct['treatment_id'] = treatmentId[0].id;
        treatmentProduct['created_by'] = Number(user.user_id);
      });
      const treatmentProductsId = await tx
        .insert(treatment_products)
        .values(createTreatmentDto.treatment_products)
        .returning({ id: treatment_products.treatment_product_id });

      if (!treatmentProductsId?.[0]?.id) {
        tx.rollback();
        throw new Error('Failed to create treatment product');
      }
    });

    return 'Treatment created successfully';
  }

  async findAll() {
    const response = await this.db
      .select({
        treatment_id: treatments.treatment_id,
        treatment_name: treatments.treatment_name,
        treatment_description: treatments.treatment_description,
        treatment_cost: treatments.treatment_cost,
        treatment_is_active: treatments.treatment_is_active,
      })
      .from(treatments);

    return response;
  }

  async findOne(id: number) {
    const response = await this.db
      .select({
        treatment: {
          treatment_id: treatments.treatment_id,
          treatment_name: treatments.treatment_name,
          treatment_description: treatments.treatment_description,
          treatment_cost: treatments.treatment_cost,
          treatment_is_active: treatments.treatment_is_active,
        },
        treatment_products: {
          treatment_product_id: treatment_products.treatment_product_id,
          product_variant_id: treatment_products.product_variant_id,
          quantity_to_use: treatment_products.quantity_to_use,
          treatment_product_is_active:
            treatment_products.treatment_product_is_active,
        },
      })
      .from(treatments)
      .leftJoin(
        treatment_products,
        eq(treatments.treatment_id, treatment_products.treatment_id),
      )
      .where(eq(treatments.treatment_id, id));

    const data: {
      treatment: (typeof response)[number]['treatment'];
      treatment_products: (typeof response)[number]['treatment_products'][];
    } = {
      treatment: response[0].treatment,
      treatment_products: response.map((item) => item.treatment_products) || [],
    };
    return data;
  }

  async findTreatmentkitProducts(id: number) {
    const response = await this.db
      .select({
        product_variant_id: treatment_products.product_variant_id,
        quantity: treatment_products.quantity_to_use,
        product_name: product_variants.product_variant_name,
        price: product_variants.product_variant_price,
        tax_id: product_variants.product_variant_tax_id,
      })
      .from(treatment_products)
      .leftJoin(
        product_variants,
        eq(
          product_variants.product_variant_id,
          treatment_products.product_variant_id,
        ),
      )
      .where(
        and(
          eq(treatment_products.treatment_id, id),
          eq(treatment_products.treatment_product_is_active, TStatusEnum.Y),
        ),
      );

    console.log(
      this.db
        .select({
          product_variant_id: treatment_products.product_variant_id,
          quantity: treatment_products.quantity_to_use,
          product_name: product_variants.product_variant_name,
          price: product_variants.product_variant_price,
          tax_id: product_variants.product_variant_tax_id,
        })
        .from(treatment_products)
        .leftJoin(
          product_variants,
          eq(
            product_variants.product_variant_id,
            treatment_products.product_variant_id,
          ),
        )
        .where(
          and(
            eq(treatment_products.treatment_id, id),
            eq(treatment_products.treatment_product_is_active, TStatusEnum.A),
          ),
        )
        .toSQL(),
    );

    if (response.length) {
      const taxTypesToFetch: number[] = response.map((tax) => {
        return Number(tax.tax_id);
      });

      if (taxTypesToFetch.length) {
        const taxTypes = await this.db
          .select()
          .from(tax_types)
          .where(inArray(tax_types.tax_id, taxTypesToFetch));

        console.log({ taxTypes });
      }
    }

    return response;
  }

  async update(
    id: number,
    updateTreatmentDto: UpdateTreatmentWithProductDto,
    user_id: TAuthData['user_id'],
  ) {
    await this.db.transaction(async (tx) => {
      await tx
        .update(treatments)
        .set(updateTreatmentDto.treatment)
        .where(eq(treatments.treatment_id, id));

      await tx
        .update(treatment_products)
        .set({ treatment_product_is_active: TStatusEnum.A })
        .where(eq(treatment_products.treatment_id, id));

      for (const treatmentProduct of updateTreatmentDto.treatment_products) {
        treatmentProduct['updated_by'] = user_id;
        const { treatment_product_id = null, ...rest } = treatmentProduct;
        rest['treatment_id'] = id;

        if (treatment_product_id) {
          await tx
            .update(treatment_products)
            .set(rest)
            .where(
              eq(treatment_products.treatment_product_id, treatment_product_id),
            );
        } else {
          await tx.insert(treatment_products).values(rest);
        }
      }
    });
    return `${id} is updated`;
  }

  async remove(id: number) {
    await this.db
      .update(treatments)
      .set({ treatment_is_active: TStatusEnum.A })
      .where(eq(treatments.treatment_id, id));
    return `${id} is removed`;
  }
}
