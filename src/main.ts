/*
 * @Author: 沧澜
 * @Date: 2024-06-26 10:01:08
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-28 18:13:58
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TestFilter } from './test.filter';
import * as session from 'express-session';
import { join } from 'path';
// import { ValidatePipe } from './validate.pipe';
// import { TimeInterceptor } from './time.interceptor';
// import { NextFunction, Request, Response } from 'express';
// import { LoginGuard } from './login.guard';

async function bootstrap() {
  //  nest 就会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 以项目根目录路径开始，prefix 是浏览器访问的虚拟目录
  app.useStaticAssets('static', { prefix: '/static' });
  app.use(session({ secret: 'canglan', cookie: { maxAge: 100000 } }));

  // 全局中间件
  // app.use(function (req: Request, res: Response, next: NextFunction) {
  //   console.log('before global middleware work', req.url);
  //   next();
  //   console.log('after global middleware work');
  // });

  // 全局路由守卫 声明方式一
  // 手动 new 的 Guard 实例，不在 IoC 容器里，所以不能注入其他的服务，loginguard中@Inject 的依赖需要删除
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截器 方式一
  // app.useGlobalInterceptors(new TimeInterceptor());

  // 全局 pipe 方式一
  // app.useGlobalPipes(new ValidatePipe());

  // 全局 filter 方式一
  // app.useGlobalFilters(new TestFilter());

  // 渲染引擎 分别指定静态资源的路径和模版的路径，并指定模版引擎为 handlerbars。
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);

  // 必须加上该方法，否则无法监听到onApplicationShutdown方法
  app.enableShutdownHooks();

  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
