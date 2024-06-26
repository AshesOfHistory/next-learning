/*
 * @Author: 沧澜
 * @Date: 2024-06-26 15:25:18
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-26 15:28:35
 * @Description:
 */
import { Module } from '@nestjs/common';
import { OtherService } from './other.service';

@Module({
  providers: [OtherService],
  exports: [OtherService],
})
export class OtherModule {}
