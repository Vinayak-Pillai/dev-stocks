import { roles } from '@/database/schema';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { InferInsertModel } from 'drizzle-orm';

export enum RoleIsActiveEnum {
  ACTIVE = 'Y',
  INACTIVE = 'N',
  ARCHIEVED = 'A',
}

export class CreateRoleDto implements InferInsertModel<typeof roles> {
  @IsString()
  @Length(1, 100)
  role_name: string;

  @IsEnum(RoleIsActiveEnum)
  is_active: RoleIsActiveEnum;

  @IsOptional()
  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  updated_by: number | null = null;

  @IsOptional()
  @IsString()
  updated_at: Date | null = null;
}
