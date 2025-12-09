import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentDto } from './create-treatment.dto';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTreatmentDto extends PartialType(CreateTreatmentDto) {
  @IsInt()
  @IsNotEmpty()
  treatment_id: number;

  @IsInt()
  @IsNotEmpty()
  updated_by: number;
}

export class UpdateTreatmentProductDto extends PartialType(CreateTreatmentDto) {
  @IsInt()
  @IsOptional()
  treatment_product_id: number;

  @IsInt()
  @IsOptional()
  treatment_id: number;

  @IsInt()
  product_variant_id: number;

  @IsInt()
  @IsNotEmpty()
  updated_by: number;
}

export class UpdateTreatmentWithProductDto {
  @ValidateNested()
  @Type(() => UpdateTreatmentDto)
  treatment: UpdateTreatmentDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTreatmentProductDto)
  treatment_products: UpdateTreatmentProductDto[];
}
