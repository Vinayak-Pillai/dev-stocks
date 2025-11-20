import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DRIZZLE, type TDrizzleDB } from '@/database/database.module';
import { products } from '@/database/schema';

@Injectable()
export class ProductsService {
  constructor(@Inject(DRIZZLE) private db: TDrizzleDB) {}
  async create(createProductDto: CreateProductDto) {
    const productId = await this.db.insert(products).values(createProductDto);

    return productId;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
