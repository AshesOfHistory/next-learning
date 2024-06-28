import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { GlobalService } from './global.service';
import { CreateGlobalDto } from './dto/create-global.dto';
import { UpdateGlobalDto } from './dto/update-global.dto';

@Controller('global')
export class GlobalController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly globalService: GlobalService) {}

  onModuleInit() {
    console.log('GlobalController onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('GlobalController onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('GlobalController OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('GlobalController beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('GlobalController onApplicationShutdown', signal);
  }

  @Post()
  create(@Body() createGlobalDto: CreateGlobalDto) {
    return this.globalService.create(createGlobalDto);
  }

  @Get()
  findAll() {
    return this.globalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalDto: UpdateGlobalDto) {
    return this.globalService.update(+id, updateGlobalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalService.remove(+id);
  }
}
