/*
 * @Author: 沧澜
 * @Date: 2024-06-28 09:51:11
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-28 16:58:34
 * @Description:
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  // interceptor 可以拿到调用的 controller 和 handler
  // Interceptor 支持每个路由单独启用，只作用于某个 handler
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context.getClass(), context.getHandler());
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log('time: ', Date.now() - startTime);
      }),
    );
  }
}
