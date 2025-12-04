import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentWithProductDto } from './dto/create-treatment.dto';
import { UpdateTreatmentWithProductDto } from './dto/update-treatment.dto';
import type { TAuthData } from '@/types/auth';
import { User } from '@/utils/decorators';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  create(
    @Body() createTreatmentDto: CreateTreatmentWithProductDto,
    @User() user: TAuthData,
  ) {
    return this.treatmentsService.create(createTreatmentDto, user);
  }

  @Get()
  findAll() {
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentDto: UpdateTreatmentWithProductDto,
    @User() user: TAuthData,
  ) {
    return this.treatmentsService.update(+id, updateTreatmentDto, user.user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentsService.remove(+id);
  }
}
