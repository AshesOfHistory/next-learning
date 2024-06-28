/*
 * @Author: 沧澜
 * @Date: 2024-06-27 17:43:03
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-27 17:43:48
 * @Description:
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('LogMiddleware before', req.url);
    next();
    console.log('LogMiddleware after');
  }
}
