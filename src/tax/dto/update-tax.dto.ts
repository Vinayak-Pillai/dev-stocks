import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxDto } from './create-tax.dto';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateTaxTypeDto } from '@/tax_types/dto/update-tax_type.dto';

export class UpdateTaxDto extends PartialType(CreateTaxDto) {
  @IsInt()
  @IsNotEmpty()
  tax_id: number;

  @IsInt()
  @IsNotEmpty()
  updated_by: number;
}

export class UpdateTaxWithTypesDto {
  @ValidateNested()
  @Type(() => UpdateTaxDto)
  tax: UpdateTaxDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTaxTypeDto)
  tax_types: UpdateTaxTypeDto[];
}
