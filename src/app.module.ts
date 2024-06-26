/*
 * @Author: 沧澜
 * @Date: 2024-06-26 10:01:08
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-26 18:25:22
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';

// 声明模块
@Module({
  imports: [PersonModule, OtherModule],
  controllers: [AppController],
  providers: [AppService],
  /**
   * 完整写法
   * 通过 provide 指定 token，通过 useClass 指定对象的类
   * providers: [
   *   {
   *     provide: AppService,
   *     useClass: AppService
   *   }
   * ]
   */
})
export class AppModule {}
