import { Injectable } from '@nestjs/common';
import { UsersSeeds } from './seeds/users.seeds';

@Injectable()
export class Seeder {
  constructor(private readonly usersSeeds: UsersSeeds) {}

  async seed() {
    await this.usersSeeds
      .run()
      .then(() => console.log('success seed'))
      .catch(err => console.log(err));
  }
}
