import { treatment_products, treatments } from '@/database/schema';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { InferInsertModel } from 'drizzle-orm';

export class CreateTreatmentDto implements InferInsertModel<typeof treatments> {
  @IsString()
  @IsNotEmpty()
  treatment_name: string;

  @IsString()
  @IsNotEmpty()
  treatment_description: string;

  @IsString()
  @IsNotEmpty()
  treatment_cost: string;

  @IsIn(['Y', 'N', 'A'])
  @IsOptional()
  treatment_is_active?: 'Y' | 'N' | 'A';

  @IsInt()
  @IsOptional()
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}

export class CreateTreatmenProductDto
  implements InferInsertModel<typeof treatment_products>
{
  @IsInt()
  @IsOptional()
  treatment_id: number;

  @IsInt()
  product_variant_id: number;

  @IsInt()
  quantity_to_use: number;

  @IsIn(['Y', 'N', 'A'])
  @IsOptional()
  treatment_product_is_active?: 'Y' | 'N' | 'A';

  @IsInt()
  @IsOptional()
  created_by: number;

  @IsOptional()
  @IsInt()
  updated_by: number;
}

export class CreateTreatmentWithProductDto {
  @ValidateNested()
  @Type(() => CreateTreatmentDto)
  treatment: CreateTreatmentDto;

  @ValidateNested()
  @ValidateNested({ each: true })
  @Type(() => CreateTreatmenProductDto)
  treatment_products: CreateTreatmenProductDto[];
}
