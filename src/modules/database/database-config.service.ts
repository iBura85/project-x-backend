import { Injectable } from "@nestjs/common";
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm'

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
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: 'all',
      };
    }
  }