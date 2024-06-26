/*
 * @Author: 沧澜
 * @Date: 2024-06-26 10:01:08
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-26 15:19:14
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  //  nest 就会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 以项目根目录路径开始，prefix 是浏览器访问的虚拟目录
  app.useStaticAssets('static', { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
