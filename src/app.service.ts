/*
 * @Author: 沧澜
 * @Date: 2024-06-26 10:01:08
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-26 15:57:39
 * @Description:
 */
import { Injectable, Inject } from '@nestjs/common';
import { OtherService } from './other/other.service';

// @Injectable 类声明该类可被注入: 可以被注入，也可以注入别的对象
@Injectable()
export class AppService {
  @Inject(OtherService)
  private otherService: OtherService;
  getHello(): string {
    return 'Hello World!' + this.otherService.otherServiceMethod();
  }
}
