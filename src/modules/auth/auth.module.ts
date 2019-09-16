import { Module } from '@nestjs/common';
import { Auth } from './auth';

@Module({
  providers: [Auth],
  exports: [Auth],
})
export class AuthModule {}
