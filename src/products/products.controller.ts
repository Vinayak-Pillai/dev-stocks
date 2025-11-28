import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  CreateProductWithVariantsDto,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductWithVariantsDto,
} from './dto/update-product.dto';
import { User } from '@/utils/decorators';
import { type TAuthData } from '@/types/auth';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @User() user: TAuthData) {
    createProductDto['created_by'] = user.user_id;
    return this.productsService.create(createProductDto);
  }

  @Post('product-with-variants')
  createProductWithVariants(
    @Body() createProductWithVariants: CreateProductWithVariantsDto,
    @User() user: TAuthData,
  ) {
    createProductWithVariants.product['created_by'] = user.user_id;
    return this.productsService.createProductWithVariants(
      createProductWithVariants,
      user,
    );
  }

  @Get('product-with-variants/:id')
  getProductWithVariants(@Param('id') id: string) {
    return this.productsService.findProductWithVariants(+id);
  }

  @Patch('product-with-variants/:id')
  updateProductWithVariants(
    @Param('id') id: string,
    @Body() updateProductWithVariantsDto: UpdateProductWithVariantsDto,
    @User() user: TAuthData,
  ) {
    updateProductWithVariantsDto.product['updated_by'] = user.user_id;
    return this.productsService.updateProductWithVariants(
      +id,
      updateProductWithVariantsDto,
      user,
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: TAuthData,
  ) {
    updateProductDto['updated_by'] = user.user_id;
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
