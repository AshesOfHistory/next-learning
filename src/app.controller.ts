// Inject
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller 类声明该类可被注入：只需要被注入
@Controller()
export class AppController {
  // 方式一：构造器注入
  constructor(private readonly appService: AppService) {}

  // 方式二：属性注入
  // 通过 @Inject 指定注入的 provider 的 token 即可。
  // @Inject(AppService)
  // private readonly appService: AppService;

  @Get()
  getHello(): string {
    // debugger;
    return this.appService.getHello();
  }
}
