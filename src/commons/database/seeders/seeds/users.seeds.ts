import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { UsersEntity } from '@modules/users/entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { IUser } from '@modules/users/interfaces/user.interface';

const users: IUser[] = [
  {
    name: 'test',
    phone: '222',
    email: 'dsad',
    password: 'das',
  },
];

@Injectable()
export class UsersSeeds {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
  ) {}

  /**
   * Запускает миграцию
   */
  public run() {
    return this.userRepo.save({
      name: 'test',
      phone: '222',
      email: 'dsad',
      password: 'das',
    });
  }
}
