import { Module } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyEntity } from './verify.entity';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([VerifyEntity]), UsersModule],
  providers: [VerifyService],
  exports: [VerifyService],
})
export class VerifyModule {}
