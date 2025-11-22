import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxTypeDto } from './create-tax_type.dto';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaxTypeDto extends PartialType(CreateTaxTypeDto) {
  @IsInt()
  @IsOptional()
  tax_type_id?: number;

  @IsInt()
  @IsNotEmpty()
  tax_id: number;

  @IsInt()
  @IsNotEmpty()
  updated_by: number;

  @IsOptional()
  created_by?: number | undefined;
}
