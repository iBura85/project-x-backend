import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Entities
 */
import { UsersEntity } from '@modules/users/entities/user.entity';
import { VerifyEntity } from '@modules/auth/verify/verify.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5531,
      username: 'root',
      password: 'toor',
      database: 'projectx',
      entities: [VerifyEntity, UsersEntity],
      synchronize: true,
      logging: 'all',
    };
  }
}
