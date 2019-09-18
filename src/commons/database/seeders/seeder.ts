import { Injectable, Logger } from '@nestjs/common';
import { UsersSeeds } from './seeds/users.seeds';

@Injectable()
export class Seeder {
  constructor(
    private readonly usersSeeds: UsersSeeds,
    private readonly logger: Logger,
  ) {}

  async seed() {
    try {
      // заполняет данными таблицу users
      await this.usersSeeds.run();
    } catch (err) {
      throw err;
    }
  }
}
