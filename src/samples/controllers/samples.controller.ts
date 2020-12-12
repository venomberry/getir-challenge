import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SamplesService } from '../services/samples.service';
import { CreateSampleDto } from '../dtos/create-sample.dto';
import { UpdateSampleDto } from '../dtos/update-sample.dto';

@Controller('samples')
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.samplesService.create(createSampleDto);
  }

  @Get()
  findAll() {
    return this.samplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.samplesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.samplesService.update(+id, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.samplesService.remove(+id);
  }
}
