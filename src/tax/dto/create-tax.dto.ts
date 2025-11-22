import { taxes } from '@/database/schema';
import { CreateTaxTypeDto } from '@/tax_types/dto/create-tax_type.dto';
import { TStatusEnum } from '@/types/global';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
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

export class CreateTaxWithTypesDto {
  @ValidateNested()
  @Type(() => CreateTaxDto)
  tax: CreateTaxDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaxTypeDto)
  tax_types: CreateTaxTypeDto[];
}
