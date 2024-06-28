/*
 * @Author: 沧澜
 * @Date: 2024-06-27 15:47:27
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-27 16:27:45
 * @Description:
 */
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
import { CommonService } from './common.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';

@Controller('common')
export class CommonController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly commonService: CommonService) {}

  onModuleInit() {
    console.log('CommonController onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CommonController onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('CommonController OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('CommonController beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('CommonController onApplicationShutdown', signal);
  }

  @Post()
  create(@Body() createCommonDto: CreateCommonDto) {
    return this.commonService.create(createCommonDto);
  }

  @Get()
  findAll() {
    return this.commonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommonDto: UpdateCommonDto) {
    return this.commonService.update(+id, updateCommonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonService.remove(+id);
  }
}
