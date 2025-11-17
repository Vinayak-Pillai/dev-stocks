import { users } from '@/database/schema';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { InferInsertModel } from 'drizzle-orm';

export enum UserIsActiveEnum {
  ACTIVE = 'Y',
  INACTIVE = 'N',
  ARCHIEVED = 'A',
}

export class CreateUserDto implements InferInsertModel<typeof users> {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  pincode: string;

  @IsNumber()
  role_id: number;

  @IsEnum(UserIsActiveEnum)
  is_active: UserIsActiveEnum;

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
