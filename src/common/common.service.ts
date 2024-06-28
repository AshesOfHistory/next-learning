/*
 * @Author: 沧澜
 * @Date: 2024-06-27 15:47:27
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-27 16:33:12
 * @Description:
 */
import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { GlobalService } from 'src/global/global.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';

@Injectable()
export class CommonService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly globalService: GlobalService) {}

  onModuleInit() {
    console.log('CommonService onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CommonService onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('CommonService OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('CommonService beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('CommonService onApplicationShutdown', signal);
  }
  create(createCommonDto: CreateCommonDto) {
    return 'This action adds a new common';
  }

  findAll() {
    return `This action returns all common` + this.globalService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  update(id: number, updateCommonDto: UpdateCommonDto) {
    return `This action updates a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }
}
