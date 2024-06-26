/*
 * @Author: 沧澜
 * @Date: 2024-06-26 10:20:58
 * @LastEditors: 沧澜
 * @LastEditTime: 2024-06-26 14:20:25
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person' + JSON.stringify(createPersonDto);
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person ${JSON.stringify(updatePersonDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
