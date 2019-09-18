import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

import { UsersEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  /**
   * Находит пользователя в БД по телефонному номеру
   * @param phone телефонный номер
   */
  public findOneByPhone(phone: string): Promise<User> {
    return this.usersRepo.findOne({ where: phone });
  }

  /**
   * Находит в БД один объект пользователя по значению в указнной колонке
   * @param column колонка для поиска
   * @param value значение
   */
  public findOneBySpecifiedColumn(
    column: string,
    value: string,
  ): Promise<User> {
    const findConditions: FindConditions<UsersEntity> = {};

    findConditions[column] = value;

    return this.usersRepo.findOne({ where: findConditions });
  }
}