/*
 * @Author: 沧澜
 * @Date: 2024-06-28 10:36:58
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-28 11:11:37
 * @Description:
 */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  // 这里的 value 就是传入的参数，如果不能转成数字，就返回参数错误，否则乘 10 再传入 handler：
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}只能是字符串或者数字`);
    }
    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
