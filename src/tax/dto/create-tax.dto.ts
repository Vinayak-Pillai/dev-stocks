import { taxes } from '@/database/schema';
import { TStatusEnum } from '@/types/global';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { InferInsertModel } from 'drizzle-orm';

export class CreateTaxDto implements InferInsertModel<typeof taxes> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  tax_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tax_code: string;

  @IsEnum(TStatusEnum)
  @IsOptional()
  tax_is_active?: TStatusEnum;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt()
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}
