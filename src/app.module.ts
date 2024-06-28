/*
 * @Author: 沧澜
 * @Date: 2024-06-26 10:01:08
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-28 11:30:54
 * @Description:
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';
import { GlobalModule } from './global/global.module';
import { CommonModule } from './common/common.module';
import { LogMiddleware } from './log.middleware';
// import { APP_FILTER } from '@nestjs/core';
// import { TestFilter } from './test.filter';
// import { APP_PIPE } from '@nestjs/core';
// import { ValidatePipe } from './validate.pipe';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { TimeInterceptor } from './time.interceptor';
// import { APP_GUARD } from '@nestjs/core';
// import { LoginGuard } from './login.guard';

// 声明模块
@Module({
  imports: [PersonModule, OtherModule, GlobalModule, CommonModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局路由守卫 方式二
    // provider 的方式声明的 Guard 是在 IoC 容器里的，可以注入别的 provider
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // },
    // 全局拦截器 方式二
    // provider 的方式声明的 Guard 是在 IoC 容器里的，可以注入别的 provider
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeInterceptor,
    // },
    // 全局 pipe 方式二
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe,
    // },
    // 全局 filter 方式二
    // {
    //   provide: APP_FILTER,
    //   useClass: TestFilter,
    // },
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    {
      provide: 'person2',
      // 对象属性简写
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      inject: ['person', AppService],
    },
    {
      provide: 'person4',
      // 给 person2 起一个新的别名 person4
      useExisting: 'person2',
    },
    {
      provide: 'person5',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'person5bbb',
          desc: 'person5cccc',
        };
      },
    },
  ],
  /**
   * 完整写法
   * 通过 provide 指定 token，通过 useClass 指定对象的类
   * providers: [
   *   {
   *     provide: AppService,
   *     useClass: AppService
   *   }
   * ]
   * provide也可以是字符串
   * * providers: [
   *   {
   *     provide: 'app_service',
   *     useClass: AppService
   *   }
   * ]
   */
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('aaa*');
  }
}
