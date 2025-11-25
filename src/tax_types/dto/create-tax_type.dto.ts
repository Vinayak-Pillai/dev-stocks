import { TStatusEnum } from '@/types/global';
import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaxTypeDto {
  @IsNumber()
  @IsOptional()
  tax_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  tax_type_name: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,4', force_decimal: false })
  tax_type_percentage: string;

  @IsEnum(TStatusEnum)
  @IsOptional()
  tax_type_is_active?: TStatusEnum;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsOptional()
  @IsInt()
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}
