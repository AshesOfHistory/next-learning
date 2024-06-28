/*
 * @Author: 沧澜
 * @Date: 2024-06-27 15:46:38
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-27 16:34:52
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
import { CreateGlobalDto } from './dto/create-global.dto';
import { UpdateGlobalDto } from './dto/update-global.dto';

@Injectable()
export class GlobalService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('GlobalService onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('GlobalService onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('GlobalService OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('GlobalService beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('GlobalService onApplicationShutdown', signal);
  }
  create(createGlobalDto: CreateGlobalDto) {
    return 'This action adds a new global';
  }

  findAll() {
    return `This action returns all global`;
  }

  findOne(id: number) {
    return `This action returns a #${id} global`;
  }

  update(id: number, updateGlobalDto: UpdateGlobalDto) {
    return `This action updates a #${id} global`;
  }

  remove(id: number) {
    return `This action removes a #${id} global`;
  }
}
