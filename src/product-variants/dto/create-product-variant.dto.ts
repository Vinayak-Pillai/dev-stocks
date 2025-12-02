import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsDecimal,
} from 'class-validator';
import { TStatusEnum } from '@/types/global';
import { product_variants } from '@/database/schema';
import { InferInsertModel } from 'drizzle-orm';

export class CreateProductVariantDto
  implements InferInsertModel<typeof product_variants>
{
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  product_variant_name: string;

  @IsInt()
  @IsNotEmpty()
  product_variant_uom_id: number;

  @IsInt()
  @IsNotEmpty()
  product_variant_tax_id: number;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,4', force_decimal: false })
  product_variant_price: string;

  @IsEnum(TStatusEnum)
  @IsOptional()
  product_variant_is_active: TStatusEnum;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  product_variant_image: string;

  @IsOptional()
  @IsInt()
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}
