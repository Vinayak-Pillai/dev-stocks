import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaxTypesService } from './tax_types.service';
import { CreateTaxTypeDto } from './dto/create-tax_type.dto';
import { UpdateTaxTypeDto } from './dto/update-tax_type.dto';
import { User } from '@/utils/decorators';
import { type TAuthData } from '@/types/auth';

@Controller('tax-types')
export class TaxTypesController {
  constructor(private readonly taxTypesService: TaxTypesService) {}

  @Post()
  create(@Body() createTaxTypeDto: CreateTaxTypeDto, @User() user: TAuthData) {
    createTaxTypeDto['created_by'] = user.user_id;
    return this.taxTypesService.create(createTaxTypeDto);
  }

  @Get()
  findAll(@Query('status') status: 'Y' | 'N' | '') {
    return this.taxTypesService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxTypeDto: UpdateTaxTypeDto) {
    return this.taxTypesService.update(+id, updateTaxTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxTypesService.remove(+id);
  }
}
