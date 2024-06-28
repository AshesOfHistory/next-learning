/*
 * @Author: 沧澜
 * @Date: 2024-06-27 15:46:38
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-27 17:17:12
 * @Description:
 */
import {
  Module,
  Global,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';

// 全局模块装饰器，可以在别的模块省略 imports 步骤
@Global()
@Module({
  controllers: [GlobalController],
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    console.log('GlobalModule onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('GlobalModule onApplicationBootstrap');
  }

  // 主要用于模块级别的资源清理，如关闭模块内部使用的数据库连接、停止模块内启动的定时任务等。
  onModuleDestroy() {
    console.log('GlobalModule OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('GlobalModule beforeApplicationShutdown', signal);
  }

  // 这个钩子用于在应用程序级别进行清理，比如当接收到停止信号时确保所有数据都已经保存到数据库，或者发送一个关闭通知到外部监控服务。
  onApplicationShutdown(signal?: string) {
    const globalService = this.moduleRef.get<GlobalService>(GlobalService);
    console.log('-------------------------------', globalService.findAll());
    console.log('GlobalModule onApplicationShutdown', signal);
  }
}
