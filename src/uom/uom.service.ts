import { Inject, Injectable } from '@nestjs/common';
import { CreateUomDto } from './dto/create-uom.dto';
import { UpdateUomDto } from './dto/update-uom.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { uom } from '@/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UomService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  create(createUomDto: CreateUomDto) {
    return 'This action adds a new uom';
  }

  async findAll() {
    const response = await this.db.select().from(uom);
    return response;
  }

  async findOne(id: number) {
    const response = await this.db.select().from(uom).where(eq(uom.id, id));
    return response;
  }

  update(id: number, updateUomDto: UpdateUomDto) {
    return `This action updates a #${id} uom`;
  }

  remove(id: number) {
    return `This action removes a #${id} uom`;
  }
}
