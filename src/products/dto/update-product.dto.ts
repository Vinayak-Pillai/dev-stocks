import { PartialType } from '@nestjs/mapped-types';
import {
  CreateProductDto,
  CreateProductVariantsDto,
} from './create-product.dto';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsInt()
  @IsNotEmpty()
  updated_by: number;
}

export class UpdateProductVariantsDto extends PartialType(
  CreateProductVariantsDto,
) {
  @IsNumber()
  @IsOptional()
  product_variant_id?: number;

  @IsString()
  @IsNotEmpty()
  product_variant_name: string;

  @IsInt()
  @IsNotEmpty()
  product_variant_uom_id: number;

  @Matches(/^\d{1,6}(\.\d{1,4})?$/, {
    message:
      'product_variant_price must be a decimal with up to 10 digits total and 4 decimals',
  })
  product_variant_price: string;

  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsInt()
  @IsNotEmpty()
  updated_by: number;
}

export class UpdateProductWithVariantsDto {
  @ValidateNested()
  @Type(() => UpdateProductDto)
  product: UpdateProductDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantsDto)
  product_variants: UpdateProductVariantsDto[];
}
