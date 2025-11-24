import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto, CreateTaxWithTypesDto } from './dto/create-tax.dto';
import { UpdateTaxDto, UpdateTaxWithTypesDto } from './dto/update-tax.dto';
import { User } from '@/utils/decorators';
import type { TAuthData } from '@/types/auth';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  create(@Body() createTaxDto: CreateTaxDto, @User() user: TAuthData) {
    createTaxDto['created_by'] = user.user_id;
    return this.taxService.create(createTaxDto);
  }

  @Get('tax-with-types/:id')
  async findTaxWithTypes(@Param('id') id: number) {
    return this.taxService.getTaxWithTaxTypes(+id);
  }

  @Post('tax-with-types')
  createTaxWithTypes(
    @Body() createTaxAndTypesDto: CreateTaxWithTypesDto,
    @User() user: TAuthData,
  ) {
    return this.taxService.createTaxAndTaxTypes(
      createTaxAndTypesDto,
      user.user_id,
    );
  }

  @Put('update-tax-with-types')
  updateTaxWithTypes(
    @Body() updateTaxAndTypesDto: UpdateTaxWithTypesDto,
    @User() user: TAuthData,
  ) {
    return this.taxService.updateTaxAndTaxTypes(
      updateTaxAndTypesDto,
      user.user_id,
    );
  }

  @Get()
  findAll(@Query('status') status: 'Y' | 'N' | '') {
    return this.taxService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxService.update(+id, updateTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxService.remove(+id);
  }
}
