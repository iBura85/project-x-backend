import { Module, Logger } from '@nestjs/common';

import { DatabaseModule } from '@commons/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSeeds } from './seeds/users.seeds';
import { Seeder } from './seeder';
import { UsersEntity } from '@modules/users/entities/user.entity';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UsersEntity]), AuthModule],
  providers: [UsersSeeds, Seeder, Logger],
})
export class SeederModule {}
