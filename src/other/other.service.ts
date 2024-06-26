/*
 * @Author: 沧澜
 * @Date: 2024-06-26 15:26:16
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-26 15:30:49
 * @Description:
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtherService {
  otherServiceMethod() {
    return 'This is other module of otherservice method';
  }
}
