import { Module } from '@nestjs/common';
import { DatabaseModule } from '@commons/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';

import { AppController } from './app.controller';
import { LoggerModule } from './commons/logger/logger.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, LoggerModule],
  controllers: [AppController],
})
export class AppModule {}
