import { Inject, Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { product_variants } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { TStatusEnum } from '@/types/global';

@Injectable()
export class ProductVariantsService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  create(createProductVariantDto: CreateProductVariantDto) {
    console.log({ createProductVariantDto });
    return 'This action adds a new productVariant';
  }

  findAll() {
    const response = this.db
      .select({
        product_variant_id: product_variants.product_variant_id,
        product_variant_name: product_variants.product_variant_name,
      })
      .from(product_variants)
      .where(eq(product_variants.product_variant_is_active, TStatusEnum.Y));
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariant`;
  }

  update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    console.log({ updateProductVariantDto });
    return `This action updates a #${id} productVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} productVariant`;
  }
}
