import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  CreateProductWithVariantsDto,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductWithVariantsDto,
} from './dto/update-product.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { product_variants, products } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { TAuthData } from '@/types/auth';

@Injectable()
export class ProductsService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  async create(createProductDto: CreateProductDto) {
    const productId = await this.db
      .insert(products)
      .values(createProductDto)
      .returning({ id: products.product_id });

    return productId;
  }

  async createProductWithVariants(
    createProductWithVariants: CreateProductWithVariantsDto,
    user: TAuthData,
  ) {
    const productId = await this.create(createProductWithVariants.product);

    if (!productId?.length || !productId[0].id) {
      throw new Error('Failed to create product');
    }
    createProductWithVariants.product_variants.forEach((productVariant) => {
      productVariant['product_id'] = productId[0].id;
      productVariant['created_by'] = user.user_id;
    });

    await this.db
      .insert(product_variants)
      .values(createProductWithVariants.product_variants)
      .returning({ id: product_variants.product_variant_id });

    return productId;
  }

  async findProductWithVariants(id: number) {
    const response = await this.db
      .select({
        product: {
          product_id: products.product_id,
          product_name: products.product_name,
          product_code: products.product_code,
          product_image: products.product_image,
          product_is_active: products.product_is_active,
        },
        product_variants: {
          product_variant_id: product_variants.product_variant_id,
          product_id: product_variants.product_id,
          product_variant_name: product_variants.product_variant_name,
          product_variant_image: product_variants.product_variant_image,
          product_variant_price: product_variants.product_variant_price,
        },
      })
      .from(products)
      .leftJoin(
        product_variants,
        eq(product_variants.product_id, products.product_id),
      )
      .where(
        and(
          eq(products.product_id, id),
          eq(product_variants.product_variant_is_active, 'Y'),
        ),
      );

    const data: {
      product: (typeof response)[number]['product'];
      product_variants: (typeof response)[number]['product_variants'][];
    } = {
      product: response?.[0]?.product || {
        product_id: 0,
        product_code: '',
        product_name: '',
        product_image: '',
        product_is_active: 'A',
      },
      product_variants: response.map((item) => item.product_variants) || [],
    };

    return data;
  }

  async updateProductWithVariants(
    id: number,
    updateProductWithVariants: UpdateProductWithVariantsDto,
    user: TAuthData,
  ) {
    await this.db.transaction(async (tx) => {
      await this.update(id, updateProductWithVariants.product, tx);

      for (const productVariant of updateProductWithVariants.product_variants) {
        productVariant['updated_by'] = user.user_id;
        const { product_variant_id = null, ...rest } = productVariant;
        if (product_variant_id) {
          await tx
            .update(product_variants)
            .set(rest)
            .where(eq(product_variants.product_variant_id, product_variant_id));
        } else {
          productVariant['created_by'] = user.user_id;
          productVariant['updated_by'] = user.user_id;
          await tx.insert(product_variants).values(rest);
        }
      }
    });
  }

  async findAll(status: 'Y' | 'N' | '' = '') {
    const response = await this.db
      .select()
      .from(products)
      .where(status ? eq(products.product_is_active, status) : undefined);
    return response;
  }

  async findOne(id: number) {
    const response = await this.db
      .select()
      .from(products)
      .where(eq(products.product_id, id));
    return response;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    trx?: TDrizzleDB | Parameters<Parameters<TDrizzleDB['transaction']>[0]>[0],
  ) {
    const dbClient = trx ?? this.db;

    await dbClient
      .update(products)
      .set(updateProductDto)
      .where(eq(products.product_id, id));

    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    await this.db
      .update(products)
      .set({ product_is_active: 'A' })
      .where(eq(products.product_id, id));
    await this.db
      .update(product_variants)
      .set({ product_variant_is_active: 'A' })
      .where(eq(product_variants.product_id, id));
    return `This action removes a #${id} product`;
  }
}
