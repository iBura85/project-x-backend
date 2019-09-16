import { Module } from '@nestjs/common';

import { DatabaseModule } from '@commons/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSeeds } from './seeds/users.seeds';
import { Seeder } from './seeder';
import { UsersEntity } from '@modules/users/entities/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersSeeds, Seeder],
})
export class SeederModule {}
