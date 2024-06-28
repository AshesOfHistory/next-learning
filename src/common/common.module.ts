/*
 * @Author: 沧澜
 * @Date: 2024-06-27 15:47:27
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-27 16:04:57
 * @Description:
 */
import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
// 全局模块不需要 imports 引入即可使用其暴露出来的 globalService，但是在 service 文件中依然需要引入 service 文件
// 全局模块尽量少用，不然注入的很多 provider 都不知道来源，会降低代码的可维护性。
// import { GlobalModule } from 'src/global/global.module';

@Module({
  // imports: [GlobalModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('CommonModule onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CommonModule onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('CommonModule OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('CommonModule beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('CommonModule onApplicationShutdown', signal);
  }
}
