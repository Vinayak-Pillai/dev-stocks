import { product_variants, products } from '@/database/schema';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsIn,
  ValidateNested,
  IsArray,
  Matches,
} from 'class-validator';
import { InferInsertModel } from 'drizzle-orm';

export class CreateProductDto implements InferInsertModel<typeof products> {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  product_code: string;

  @IsInt()
  product_default_uom_id: number;

  @IsString()
  @IsOptional()
  product_description?: string;

  @IsString()
  @IsOptional()
  product_image?: string;

  @IsIn(['Y', 'N', 'A'])
  @IsOptional()
  product_is_active?: 'Y' | 'N' | 'A';

  @IsInt()
  @IsOptional()
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}

export class CreateProductVariantsDto
  implements InferInsertModel<typeof product_variants>
{
  @IsInt()
  @IsOptional()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  product_variant_name: string;

  @IsInt()
  @IsNotEmpty()
  product_variant_uom_id: number;

  @IsInt()
  @IsNotEmpty()
  product_variant_tax_id: number;

  @Matches(/^\d{1,6}(\.\d{1,4})?$/, {
    message:
      'product_variant_price must be a decimal with up to 10 digits total and 4 decimals',
  })
  product_variant_price: string;

  @IsIn(['Y', 'N', 'A'])
  @IsOptional()
  product_variant_is_active?: 'Y' | 'N' | 'A';

  @IsString()
  @IsOptional()
  product_variant_image?: string;

  @IsInt()
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}

export class CreateProductWithVariantsDto {
  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantsDto)
  product_variants: CreateProductVariantsDto[];
}
