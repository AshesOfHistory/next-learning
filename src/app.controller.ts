/*
 * @Author: 沧澜
 * @Date: 2024-06-26 10:01:08
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-28 18:16:59
 * @Description:
 */
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Headers,
  Ip,
  Session,
  HostParam,
  Req,
  Res,
  Next,
  HttpCode,
  Header,
  Render,
  // Redirect,
  // UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import { CreateCommonDto } from './common/dto/create-common.dto';
import { NextFunction, Request, Response } from 'express';

// @Controller 类声明该类可被注入：只需要被注入
@Controller({ host: ':hostparam.0.0.1', path: 'app' })
// 在 controller 级别启动拦截器，作用于下面的全部 handler
// @UseInterceptors(TimeInterceptor)
// controller级别 pipe
// @UsePipes(ValidatePipe)
// controller 级别 Filter
// @UseFilters(TestFilter)
@SetMetadata('roles', ['user'])
export class AppController {
  // 方式一：构造器注入
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; desc: string },
    @Inject('person3') private readonly person3: { name: string; desc: string },
    @Inject('person4') private readonly person4: { name: string; desc: string },
    @Inject('person5') private readonly person5: { name: string; desc: string },
  ) {}

  // 方式二：属性注入
  // 通过 @Inject 指定注入的 provider 的 token 即可。
  // @Inject(AppService)
  // private readonly appService: AppService;

  // 如果 prividers 的 provide 为 'app_service' 字符串,需要@Inject 手动指定注入对象的 token
  // constructor(@Inject('app_service') private readonly appService: AppService) {}

  @Get()
  @SetMetadata('roles', ['admin'])
  getHello(): string {
    console.log(this.person);
    console.log(this.person2);
    console.log(this.person3);
    console.log(this.person4);
    console.log(this.person5);
    return this.appService.getHello();
  }

  @Get('aaa')
  @SetMetadata('roles', ['aaa'])
  // 路由级别的路由守卫
  @UseGuards(LoginGuard)
  // 路由级别拦截器
  @UseInterceptors(TimeInterceptor)
  aaa(): string {
    console.log('aaa...');
    return 'aaa';
  }

  @Get('bbb')
  bbb(): string {
    console.log('bbb...');
    return 'bbb';
  }

  @Post('bbbpost')
  bbbpost(@Body() bbbpost: CreateCommonDto): string {
    console.log(bbbpost);
    return 'bbbpost';
  }

  @Get('ccc')
  // 路由级别 Filter
  @UseFilters(TestFilter)
  // 参数级pipe
  ccc(
    @Query('num', ValidatePipe) num: number,
    @Headers('Accept') accept: string,
    @Headers() headers: string,
  ): number {
    console.log('ccc...validatePipe number');
    console.log('Accept: ' + accept, 'headers: ', headers);
    return num + 1;
  }

  @Get('ip')
  ip(@Ip() ip: string) {
    console.log('ip: ' + ip);
    return 'ip: ' + ip;
  }

  @Get('session')
  session(@Session() session) {
    console.log(session);
    if (!session.count) {
      session.count = 0;
    }
    session.count += 1;
    console.log('session count: ', session.count);
    return 'session: ' + JSON.stringify(session);
  }

  @Get('host')
  host(@HostParam('hostparam') hostP) {
    return hostP;
  }

  @Get('req')
  req(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url);
  }

  @Get('res')
  // @Res({passthrough: true}) // 表明自己并不会手动指定返回响应，使用 Next 默认的响应
  // 注入 Next 也并不会返回响应
  res(@Res() res: Response) {
    res.end('res end');
  }

  // 有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler
  @Get('next')
  next(@Next() next: NextFunction) {
    console.log('handler1');
    next();
    return 'next111';
  }

  @Get('next')
  next2() {
    console.log('handler2');
    return 'next222';
  }

  // handler 默认返回的是 200 的状态码，你可以通过 @HttpCode 修改它
  @Get('httpcode')
  @HttpCode(222)
  // 修改 response header
  @Header('responseHeaderKeyAaa', 'responseHeaderValueBbb')
  // @Redirect('http://juejin.cn')
  httpcode() {
    return 'httpcode 222';
  }

  @Get('user')
  @Render('user')
  user() {
    return { name: 'canglan', age: 28 };
  }
}
