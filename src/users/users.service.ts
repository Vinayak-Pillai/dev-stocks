import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import bcrypt from 'bcryptjs';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = bcrypt.genSaltSync(10);
      createUserDto['password'] = bcrypt.hashSync(
        createUserDto['password'],
        salt,
      );

      const insertUserId = await this.db
        .insert(users)
        .values(createUserDto)
        .returning({ id: users.user_id });

      return { status: true, records: insertUserId };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll(status: 'Y' | 'N' | '') {
    try {
      const query = this.db
        .select({
          user_id: users.user_id,
          role_id: users.role_id,
          username: users.username,
          is_active: users.is_active,
          created_at: users.created_at,
        })
        .from(users);
      if (status) {
        query.where(eq(users.is_active, status));
      }
      const usersData = await query;

      return {
        status: true,
        records: usersData,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to get users');
    }
  }

  async findOne(username: string) {
    try {
      const usersData = await this.db
        .select({
          user_id: users.user_id,
          role_id: users.role_id,
          password: users.password,
          username: users.username,
          is_active: users.is_active,
          created_at: users.created_at,
        })
        .from(users)
        .where(eq(users.username, username));

      return {
        status: true,
        records: usersData,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to get users');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.db
        .update(users)
        .set(updateUserDto)
        .where(eq(users.user_id, id));

      return {
        status: true,
        records: ``,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to get users');
    }
  }

  async remove(id: number) {
    try {
      await this.db
        .update(users)
        .set({ is_active: 'A' })
        .where(eq(users.user_id, id));

      return {
        status: true,
        records: ``,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to get users');
    }
  }
}
