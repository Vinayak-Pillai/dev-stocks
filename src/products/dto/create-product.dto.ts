import { products } from '@/database/schema';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsIn,
  IsUrl,
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
  product_default_uom: number;

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
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}
