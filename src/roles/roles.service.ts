import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { roles } from '@/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RolesService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}

  async create(createRoleDto: CreateRoleDto) {
    const insertRoleId = await this.db.insert(roles).values(createRoleDto);
    return { status: true, records: [insertRoleId] };
  }

  async findAll(status: 'Y' | 'N' | '') {
    const rolesData = await this.db
      .select()
      .from(roles)
      .where(status ? eq(roles.role_is_active, status) : undefined);

    return rolesData;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
