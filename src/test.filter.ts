/*
 * @Author: 沧澜
 * @Date: 2024-06-28 11:13:07
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-28 18:12:44
 * @Description:
 */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class TestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    response.status(400).json({
      statusCode: 400,
      message: 'test: ' + exception.message,
    });
  }
}
