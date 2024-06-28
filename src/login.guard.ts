/*
 * @Author: 沧澜
 * @Date: 2024-06-28 08:52:46
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-28 17:04:31
 * @Description:
 */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AppService } from './app.service';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(AppService)
  private appService: AppService;
  @Inject(Reflector)
  private readonly reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('login check', this.appService.getHello());
    const classMetadata = this.reflector.get('roles', context.getClass());
    const methodMetadata = this.reflector.get('roles', context.getHandler());
    console.log(
      'classMetadata',
      classMetadata,
      'methodMetadata',
      methodMetadata,
    );
    return true;
  }
}
